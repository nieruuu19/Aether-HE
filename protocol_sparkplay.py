"""protocol_sparkplay.py — protocol driver for the Aula WIN 68 HE MAX (1CA2:1901).

Wire format and every packet builder below are transcribed verbatim from the
official web driver (magnet.aulastar.com, SparkPlay/Magnet v1.0.9):

  * a frame is 64 bytes [0x5C, payload_len, cmd, checksum, payload...] sent
    with HID report id 0x00; replies start with 0xDC and cmd | 0x80
  * checksum = (53 + pkt[0] + pkt[1] + pkt[2] + pkt[pkt[1] + 3]) & 0xFF
  * per-key records are addressed by the key's HID/key value (e.g. 41 = Esc)
  * live travel is polled through CMD 0x12 sub-commands (126 matrix slots)
"""

import contextlib
import json
import os
import threading
import time

from drivers.base import BoardDriver


REPORT_ID = 0x00
FRAME_LEN = 64
MAGIC = 0x5C
CHECKSUM_SEED = 0x35

CMD_SYNC = 0x01
CMD_SYS = 0x00
CMD_TRAVEL_MATRIX = 0x12
CMD_LIGHTING = 0x18
CMD_AMBIENT = 0x19
CMD_KEY_CONFIG = 0x23
CMD_GLOBAL_TRAVEL = 0x29
CMD_PER_KEY_RGB = 0x2A
CMD_HID_MATRIX = 0x2B
CMD_SOCD = 0x2C

# CMD 0x23 Property IDs (from magnet.aulastar.com capture)
PROP_REMAP_L0 = 0x00
PROP_ACTUATION_UM = 0x04
PROP_MODE_FLAGS = 0x08
PROP_RT_PRESS_UM = 0x14
PROP_RT_RELEASE_UM = 0x15
PROP_DZ_TOP_UM = 0x16
PROP_DZ_BOT_UM = 0x17
PROP_RELEASE_TRAVEL_UM = 0x18

MATRIX_KEYS = 126  # 6 rows x 21 cols

# Exact 68-key order and key_id values reported by magnet.aulastar.com:
# 所有按键value：41,30,31,32,33,34,35,36,37,38,39,45,46,42,73,
#               43,20,26,8,21,23,28,24,12,18,19,47,48,49,76,
#               57,4,22,7,9,10,11,13,14,15,51,52,40,75,
#               225,29,27,6,25,5,17,16,54,55,56,229,82,78,
#               224,227,226,44,230,1,228,80,81,79
#
# Mapped to their verified 6x21 live travel sensor index (sp_idx):
AULA_WIN68_KEYS = [
    # Row 1 (sp_idx 21..35)
    (21, 41, "Escape", "Esc"),
    (22, 30, "Digit1", "1"),
    (23, 31, "Digit2", "2"),
    (24, 32, "Digit3", "3"),
    (25, 33, "Digit4", "4"),
    (26, 34, "Digit5", "5"),
    (27, 35, "Digit6", "6"),
    (28, 36, "Digit7", "7"),
    (29, 37, "Digit8", "8"),
    (30, 38, "Digit9", "9"),
    (31, 39, "Digit0", "0"),
    (32, 45, "Minus", "-"),
    (33, 46, "Equal", "="),
    (34, 42, "Backspace", "Backspace"),
    (35, 73, "Insert", "Ins"),
    # Row 2 (sp_idx 42..56)
    (42, 43, "Tab", "Tab"),
    (43, 20, "KeyQ", "Q"),
    (44, 26, "KeyW", "W"),
    (45, 8, "KeyE", "E"),
    (46, 21, "KeyR", "R"),
    (47, 23, "KeyT", "T"),
    (48, 28, "KeyY", "Y"),
    (49, 24, "KeyU", "U"),
    (50, 12, "KeyI", "I"),
    (51, 18, "KeyO", "O"),
    (52, 19, "KeyP", "P"),
    (53, 47, "BracketLeft", "["),
    (54, 48, "BracketRight", "]"),
    (55, 49, "Backslash", "\\"),
    (56, 76, "Delete", "Del"),
    # Row 3 (sp_idx 63..77)
    (63, 57, "CapsLock", "Caps"),
    (64, 4, "KeyA", "A"),
    (65, 22, "KeyS", "S"),
    (66, 7, "KeyD", "D"),
    (67, 9, "KeyF", "F"),
    (68, 10, "KeyG", "G"),
    (69, 11, "KeyH", "H"),
    (70, 13, "KeyJ", "J"),
    (71, 14, "KeyK", "K"),
    (72, 15, "KeyL", "L"),
    (73, 51, "Semicolon", ";"),
    (74, 52, "Quote", "'"),
    (76, 40, "Enter", "Enter"),
    (77, 75, "PageUp", "PgUp"),
    # Row 4 (sp_idx 84..98)
    (84, 225, "ShiftLeft", "LShift"),
    (86, 29, "KeyZ", "Z"),
    (87, 27, "KeyX", "X"),
    (88, 6, "KeyC", "C"),
    (89, 25, "KeyV", "V"),
    (90, 5, "KeyB", "B"),
    (91, 17, "KeyN", "N"),
    (92, 16, "KeyM", "M"),
    (93, 54, "Comma", ","),
    (94, 55, "Period", "."),
    (95, 56, "Slash", "/"),
    (96, 229, "ShiftRight", "RShift"),
    (97, 82, "ArrowUp", "Up"),
    (98, 78, "PageDown", "PgDn"),
    # Row 5 (sp_idx 105..119)
    (105, 224, "ControlLeft", "LCtrl"),
    (106, 227, "MetaLeft", "LWin"),
    (107, 226, "AltLeft", "LAlt"),
    (111, 44, "Space", "Space"),
    (114, 230, "AltRight", "RAlt"),
    (115, 1, "KeyFn", "Fn"),
    (116, 228, "ControlRight", "RCtrl"),
    (117, 80, "ArrowLeft", "Left"),
    (118, 81, "ArrowDown", "Down"),
    (119, 79, "ArrowRight", "Right"),
]

# Lookup tables between matrix index (sp_idx) and Aula key_id (hidCode)
SP_IDX_TO_KEY_ID = {sp_idx: key_id for sp_idx, key_id, _, _ in AULA_WIN68_KEYS}
KEY_ID_TO_SP_IDX = {key_id: sp_idx for sp_idx, key_id, _, _ in AULA_WIN68_KEYS}

# sp_idx -> the design code the UI's on-screen keyboard uses (KB_ROWS). The
# short name matches it for most keys; these spellings differ.
_UI_CODE_OVERRIDES = {
    21: "Escape", 32: "Minus", 33: "Equal", 53: "Lbr", 54: "Rbr", 55: "Bsl",
    73: "Semi", 74: "Quot", 93: "Comma", 94: "Dot", 95: "Slash",
}
UI_CODE_BY_SP = {sp_idx: _UI_CODE_OVERRIDES.get(sp_idx, short)
                 for sp_idx, _kid, _web, short in AULA_WIN68_KEYS}

AULA_WIN68_ALIASES = {}
for _sp_idx, _key_id, _web_code, _short_name in AULA_WIN68_KEYS:
    AULA_WIN68_ALIASES[_sp_idx] = (
        _web_code,
        _short_name,
        _short_name.upper(),
        _short_name.lower(),
    )

# Extra common UI aliases
_EXTRA_ALIASES = {
    21: ("ESC",),
    35: ("Ins", "INS", "Insert", "Backquote", "`"),
    53: ("Lbr", "{["),
    54: ("Rbr", "}]"),
    55: ("Bsl", "\\|"),
    56: ("Del", "DEL", "Delete"),
    63: ("Caps", "CAPS", "CapsLock"),
    73: ("Semi", ";:"),
    74: ("Quot", "'\""),
    77: ("PgUp", "PGUP", "PageUp"),
    94: ("Dot", ".>"),
    97: ("Up", "UP", "ArrowUp", "?"),
    98: ("PgDn", "PGDN", "PageDown"),
    117: ("Left", "LEFT", "ArrowLeft", "?"),
    118: ("Down", "DOWN", "ArrowDown", "?"),
    119: ("Right", "RIGHT", "ArrowRight", "?"),
    34: ("Bksp", "Back", "BSPC", "BS"),
    35: ("INS", "Backquote", "`"),
    56: ("DEL",),
    63: ("CAPS", "Caps Lock"),
    76: ("Return", "ENT"),
    77: ("PGUP",),
    84: ("Shift", "LSFT", "LSHIFT"),
    96: ("RSFT", "RSHIFT"),
    97: ("UP", "UpArrow"),
    98: ("PGDN", "End", "END"),
    105: ("Ctrl", "LCTL", "LCTRL"),
    106: ("Win", "GUI", "LGUI", "Super"),
    107: ("Alt", "LALT"),
    111: ("Spacebar", "SPC", "SPACE", " "),
    114: ("RALT",),
    115: ("FN", "Fn", "Function"),
    116: ("RCTL", "RCTRL"),
    117: ("LEFT", "LeftArrow"),
    118: ("DOWN", "DownArrow"),
    119: ("RIGHT", "RightArrow"),
}
for _idx, _extras in _EXTRA_ALIASES.items():
    AULA_WIN68_ALIASES[_idx] = AULA_WIN68_ALIASES.get(_idx, ()) + _extras

_MIRROR_SLOTS = {
    75: 76,   # Enter
    85: 86,   # Z
    108: 111, # Space
    109: 111, # Space
    110: 111, # Space
    112: 114, # RAlt
    113: 115, # Fn
}
_CANONICAL_SP_IDXS = frozenset(SP_IDX_TO_KEY_ID) - frozenset(_MIRROR_SLOTS)
for _alt, _canon in _MIRROR_SLOTS.items():
    AULA_WIN68_ALIASES[_alt] = AULA_WIN68_ALIASES[_canon]
    SP_IDX_TO_KEY_ID[_alt] = SP_IDX_TO_KEY_ID[_canon]

AULA_WIN68_MATRIX = {idx: (aliases[0], aliases[1]) for idx, aliases in AULA_WIN68_ALIASES.items()}
DEFAULT_SLOT_HIDS = dict(SP_IDX_TO_KEY_ID)


def ensure_keymap_populated(km):
    """Ensure Aether's KeyMap object maps all UI codes to the true Row 1..5 (21..119) hardware slots."""
    if km is None:
        return km
    for attr in ("by_index", "by_name", "by_code", "index_of_code"):
        if not hasattr(km, attr) or getattr(km, attr) is None:
            setattr(km, attr, {})
    if not hasattr(km, "layer_indices") or km.layer_indices is None:
        km.layer_indices = set()

    loaded_entries = list(km.by_index.values()) + list(km.by_code.values()) + list(km.by_name.values())
    token_to_loaded = {}
    for e in loaded_entries:
        if isinstance(e, dict):
            for fld in ("code", "name", "label"):
                val = e.get(fld)
                if val:
                    token_to_loaded[str(val).lower()] = e

    km.by_index.clear()
    km.by_name.clear()
    km.by_code.clear()
    km.index_of_code.clear()

    for sp_idx in range(MATRIX_KEYS):
        r = sp_idx // 21
        c = sp_idx % 21
        aliases = AULA_WIN68_ALIASES.get(sp_idx, (f"KeyR{r}C{c}", f"{r},{c}"))
        web_code = aliases[0]
        short_name = aliases[1] if len(aliases) > 1 else web_code
        key_id = SP_IDX_TO_KEY_ID.get(sp_idx, 0)

        base = None
        for a in aliases:
            if a.lower() in token_to_loaded:
                base = token_to_loaded[a.lower()]
                break
        entry = dict(base) if isinstance(base, dict) else {}
        entry["name"] = entry.get("name") or short_name
        entry["code"] = entry.get("code") or web_code
        entry["matrix"] = sp_idx
        entry["index"] = sp_idx
        entry["hid"] = key_id
        entry["row"] = r
        entry["col"] = c
        entry["x"] = float(entry.get("x", c))
        entry["y"] = float(entry.get("y", max(0, r - 1)))
        entry["w"] = float(entry.get("w", 1.0))
        entry["h"] = float(entry.get("h", 1.0))

        km.by_index[sp_idx] = entry
        for a in aliases:
            for variant in (a, a.upper(), a.lower()):
                km.by_name[variant] = entry
                km.by_code[variant] = entry
                if sp_idx not in _MIRROR_SLOTS or variant not in km.index_of_code:
                    km.index_of_code[variant] = sp_idx

    def _indices():
        return [sp_idx for sp_idx, _, _, _ in AULA_WIN68_KEYS]

    def _indices_for_codes(codes):
        if not codes:
            return _indices()
        out = []
        for c in codes:
            s = str(c).strip()
            matched = False
            for sp_idx, _, _, _ in AULA_WIN68_KEYS:
                aliases = AULA_WIN68_ALIASES.get(sp_idx, ())
                if any(s.lower() == a.lower() for a in aliases):
                    if sp_idx not in out:
                        out.append(sp_idx)
                    matched = True
            if not matched:
                idx = km.index_of_code.get(s) or km.index_of_code.get(s.upper()) or km.index_of_code.get(s.lower())
                if idx is not None and idx not in out:
                    out.append(idx)
        return out or _indices()

    def _code_of(idx):
        # Return the UI's design code, not the layout file's browser event code:
        # the macro bindings list is matched against the keyboard grid's codes
        # ("A"), and a browser code ("KeyA") never matched.
        ui = UI_CODE_BY_SP.get(int(idx))
        if ui:
            return ui
        e = km.by_index.get(int(idx))
        if isinstance(e, dict) and e.get("code"):
            return e["code"]
        aliases = AULA_WIN68_ALIASES.get(int(idx))
        return aliases[0] if aliases else str(idx)

    def _hid_for_code(code):
        idx = km.index_of_code.get(str(code))
        if idx is not None:
            return SP_IDX_TO_KEY_ID.get(idx, 4)
        return 4

    km.indices = _indices
    km.indices_for_codes = _indices_for_codes
    km.code_of = _code_of
    km.hid_for_code = _hid_for_code
    return km


def compute_checksum(payload_len: int, cmd: int, flag_byte: int = 0) -> int:
    """Magnet.aulastar.com checksum: (0x35 + 0x5C + len + cmd + first_payload_byte) & 0xFF."""
    return (CHECKSUM_SEED + MAGIC + (payload_len & 0xFF) + (cmd & 0xFF) + (flag_byte & 0xFF)) & 0xFF


def build_frame(cmd: int, payload: list[int] | bytes, include_report_id: bool = True,
                use_last_byte_chk: bool = False) -> list[int]:
    payload_list = list(payload)
    plen = len(payload_list)
    chk_byte = (payload_list[-1] if plen > 0 else 0) if use_last_byte_chk else (payload_list[0] if plen > 0 else 0)
    chk = compute_checksum(plen, cmd, chk_byte)
    body = [MAGIC, plen & 0xFF, cmd & 0xFF, chk] + payload_list
    if len(body) < FRAME_LEN:
        body.extend([0x00] * (FRAME_LEN - len(body)))
    else:
        body = body[:FRAME_LEN]
    return ([REPORT_ID] + body) if include_report_id else body


def _aula_compute_checksum(pkt64: list[int]) -> int:
    # Exact ve.ComputeCheckSum from index-C7aUVaaC.js:
    # t = 53 + pkt[0] + pkt[1] + pkt[2] + (pkt[pkt[1] + 3] if 0 < pkt[1] <= 252 else 0)
    r = pkt64[1] & 0xFF
    t = 53 + (pkt64[0] & 0xFF) + r + (pkt64[2] & 0xFF)
    if 0 < r <= 252 and (r + 3) < len(pkt64):
        t += (pkt64[r + 3] & 0xFF)
    return t & 0xFF


def _pack_aula_frame(cmd: int, payload: list[int], fill: int = 0x00) -> list[int]:
    pkt = [fill & 0xFF] * 64
    pkt[0] = 0x5C
    pkt[1] = len(payload) & 0xFF
    pkt[2] = cmd & 0xFF
    for i, b in enumerate(payload[:60]):
        pkt[4 + i] = b & 0xFF
    pkt[3] = _aula_compute_checksum(pkt)
    return [REPORT_ID] + pkt


def _read_rm6x21_frame(raw_dev, expected_subcmd: int, timeout: float = 0.06,
                       dev=None) -> bytearray | None:
    """Read a complete 3-report (192-byte) 0x92 response matching expected_subcmd (0x02 or 0x03)."""
    response = bytearray()
    skip_reports = 0
    deadline = time.perf_counter() + timeout

    while len(response) < 192 and time.perf_counter() < deadline:
        try:
            report = raw_dev.read(65)
        except Exception:
            break
        if not report:
            time.sleep(0.0005)
            continue

        report = bytes(report)
        if len(report) == 65 and report[0] == REPORT_ID:
            report = report[1:]
        if not report:
            continue

        if skip_reports > 0:
            skip_reports -= 1
            continue

        if not response:
            # Header report for CMD 0x12 reply:
            # [0x5C/0xDC, 0x80 (for 0x02) or 0x82 (for 0x03), 0x92, chk, 0x00, subcmd]
            if len(report) >= 6 and report[0] in (MAGIC, 0xDC) and report[2] == (CMD_TRAVEL_MATRIX | 0x80):
                if report[5] == expected_subcmd:
                    response.extend(report[:64])
                else:
                    skip_reports = 2
            continue

        response.extend(report[:64])

    if len(response) >= 132 and dev is not None:
        dev.note_rx()
    return response if len(response) >= 132 else None


def query_press_bitmap(dev, lock) -> list[int]:
    """Send RM6X21Pack(3, 1) once per scan to tick the MCU and read the 126-key hardware trigger state."""
    with lock:
        if not dev.is_open():
            dev.open()
        raw_dev = getattr(dev, "_dev", None) or getattr(dev, "dev", None)
        if raw_dev is None:
            return [0] * 126
        raw_dev.write(bytes(_pack_aula_frame(CMD_TRAVEL_MATRIX, [0x03, 0x01, 0xFF, 0xFF])))
        resp = _read_rm6x21_frame(raw_dev, expected_subcmd=0x03, timeout=0.025, dev=dev)
        if not resp or len(resp) < 132:
            return [0] * 126
        return [resp[6 + i] for i in range(126)]


def query_half_matrix(dev, lock, half: int, tick_mcu: bool = False) -> list[float]:
    """Query one 3x21 half of the live travel matrix (half=1 -> indices 0..62, half=2 -> indices 63..125)."""
    half = int(half)
    if half not in (1, 2):
        raise ValueError("half must be 1 or 2")

    with lock:
        if not dev.is_open():
            dev.open()
        raw_dev = getattr(dev, "_dev", None) or getattr(dev, "dev", None)
        if raw_dev is None:
            return [0.0] * 63

        if tick_mcu:
            raw_dev.write(bytes(_pack_aula_frame(CMD_TRAVEL_MATRIX, [0x03, 0x01, 0xFF, 0xFF])))
            _read_rm6x21_frame(raw_dev, expected_subcmd=0x03, timeout=0.025)

        raw_dev.write(bytes(_pack_aula_frame(CMD_TRAVEL_MATRIX, [0x02, half, 0xFF, 0xFF])))
        response = _read_rm6x21_frame(raw_dev, expected_subcmd=0x02, timeout=0.03, dev=dev)

        if not response or len(response) < 132:
            return [0.0] * 63

        out = []
        for i in range(63):
            um = response[6 + i * 2] | (response[7 + i * 2] << 8)
            out.append(round(um / 1000.0, 3) if 30 <= um <= 4500 else 0.0)
        return out


def build_cmd23_write(records: list[tuple[int, int, int, int]]) -> list[list[int]]:
    """Official oe.LayoutDataPack (CMD 0x23 = 35) from index-C7aUVaaC.js:
    Uses exact dynamic payload length (1 + 4*N) so ve.ComputeCheckSum adds the last record's high byte!
    """
    frames = []
    for i in range(0, len(records), 14):
        chunk = records[i:i + 14]
        payload = [0x01]
        for key_id, prop_id, lo, hi in chunk:
            payload.extend([key_id & 0xFF, prop_id & 0xFF, lo & 0xFF, hi & 0xFF])
        frames.append(_pack_aula_frame(CMD_KEY_CONFIG, payload, fill=0x00))
    return frames


class SparkPlayLiveReader:
    """Polls Half 1 (0..62) and Half 2 (63..125) and maps Row 1..5 keys + per-key RT state to Aether UI."""

    # UI codes used by KB_ROWS in ui/index_runtime.html (WITHOUT numeric str(sp_idx) or str(key_id) aliases!)
    UI_ALIASES_BY_SP = {
        21: ("Escape", "Esc"),
        22: ("Digit1", "1", "!1"),
        23: ("Digit2", "2", "@2"),
        24: ("Digit3", "3", "#3"),
        25: ("Digit4", "4", "$4"),
        26: ("Digit5", "5", "%5"),
        27: ("Digit6", "6", "^6"),
        28: ("Digit7", "7", "&7"),
        29: ("Digit8", "8", "*8"),
        30: ("Digit9", "9", "(9"),
        31: ("Digit0", "0", ")0"),
        32: ("Minus", "-"),
        33: ("Equal", "="),
        34: ("Backspace", "Back"),
        35: ("Insert", "Ins"),
        42: ("Tab",),
        43: ("KeyQ", "Q"),
        44: ("KeyW", "W"),
        45: ("KeyE", "E"),
        46: ("KeyR", "R"),
        47: ("KeyT", "T"),
        48: ("KeyY", "Y"),
        49: ("KeyU", "U"),
        50: ("KeyI", "I"),
        51: ("KeyO", "O"),
        52: ("KeyP", "P"),
        53: ("BracketLeft", "Lbr", "["),
        54: ("BracketRight", "Rbr", "]"),
        55: ("Backslash", "Bsl", "\\"),
        56: ("Delete", "Del"),
        63: ("CapsLock", "Caps"),
        64: ("KeyA", "A"),
        65: ("KeyS", "S"),
        66: ("KeyD", "D"),
        67: ("KeyF", "F"),
        68: ("KeyG", "G"),
        69: ("KeyH", "H"),
        70: ("KeyJ", "J"),
        71: ("KeyK", "K"),
        72: ("KeyL", "L"),
        73: ("Semicolon", "Semi", ";"),
        74: ("Quote", "Quot", "'"),
        76: ("Enter",),
        77: ("PageUp", "PgUp"),
        84: ("ShiftLeft", "LShift", "Shift"),
        86: ("KeyZ", "Z"),
        87: ("KeyX", "X"),
        88: ("KeyC", "C"),
        89: ("KeyV", "V"),
        90: ("KeyB", "B"),
        91: ("KeyN", "N"),
        92: ("KeyM", "M"),
        93: ("Comma", ","),
        94: ("Period", "Dot", "."),
        95: ("Slash", "/"),
        96: ("ShiftRight", "RShift"),
        97: ("ArrowUp", "Up"),
        98: ("PageDown", "PgDn"),
        105: ("ControlLeft", "LCtrl", "Ctrl"),
        106: ("MetaLeft", "LWin", "Win"),
        107: ("AltLeft", "LAlt", "Alt"),
        111: ("Space",),
        114: ("AltRight", "RAlt"),
        115: ("KeyFn", "Fn"),
        116: ("ControlRight", "RCtrl"),
        117: ("ArrowLeft", "Left"),
        118: ("ArrowDown", "Down"),
        119: ("ArrowRight", "Right"),
    }

    def __init__(self, dev, lock, km, idxs=None, driver=None):
        self.dev = dev
        self.lock = lock
        self.km = ensure_keymap_populated(km)
        self.idxs = set(idxs) if idxs else None
        self.driver = driver
        self._stop = threading.Event()
        self._thread = None
        self._snap_lock = threading.Lock()
        self._by_code = {}
        self._by_idx = {}
        self._key_trig_state = {}
        self._key_anchor_mm = {}

    def start(self):
        if self._thread and self._thread.is_alive():
            return
        self._stop.clear()
        self._thread = threading.Thread(target=self._loop, name="sparkplay-reader", daemon=True)
        self._thread.start()

    def stop(self):
        self._stop.set()
        if self._thread:
            self._thread.join(timeout=0.4)
        self._thread = None

    def alive(self) -> bool:
        return bool(self._thread and self._thread.is_alive())

    def _eval_key_actuation(self, canon_idx: int, mm: float, hw_pressed: bool = False) -> bool:
        drv = self.driver
        top_dz = float(getattr(drv, "_global_dz_top_mm", 0.10)) if drv else 0.10
        global_mm = float(getattr(drv, "_global_travel_mm", 2.00)) if drv else 2.00

        t_mode = int(getattr(drv, "_touch_mode_cache", {}).get(canon_idx, 0)) if drv else 0
        if t_mode == 0:
            act_mm = float(getattr(drv, "_actuation_cache", {}).get(canon_idx, global_mm)) if drv else global_mm
        else:
            act_mm = float(getattr(drv, "_actuation_cache", {}).get(canon_idx, 1.50)) if drv else 1.50

        rt_p = float(getattr(drv, "_rt_press_cache", {}).get(canon_idx, 0.0)) if drv else 0.0
        rt_r = float(getattr(drv, "_rt_release_cache", {}).get(canon_idx, 0.0)) if drv else 0.0

        # Use integer hundredths of a mm (0.01mm = 1 unit) to eliminate float rounding bugs!
        cur_c = int(round(mm * 100))
        dz_c = max(4, int(round(top_dz * 100)))
        act_c = max(10, int(round(act_mm * 100)))
        rtp_c = max(1, int(round(rt_p * 100)))
        rtr_c = max(1, int(round(rt_r * 100)))

        # Full release at or above top deadzone
        if cur_c <= dz_c:
            self._key_trig_state[canon_idx] = False
            self._key_anchor_mm[canon_idx] = cur_c
            return False

        was_trig = self._key_trig_state.get(canon_idx, False)
        anchor_c = self._key_anchor_mm.get(canon_idx, 0)

        if t_mode == 2 and rt_p > 0.0 and rt_r > 0.0:
            # Rapid Trigger Mode: exact 0.01mm (1-centimillimeter) integer state machine
            if not was_trig:
                # Track highest lifted trough (lowest depth value) while released
                if anchor_c == 0 or cur_c < anchor_c:
                    anchor_c = cur_c
                # First cross of act_c from above, OR pressed down by >= rtp_c while below act_c
                if cur_c >= act_c and ((cur_c - anchor_c) >= rtp_c or anchor_c < act_c):
                    was_trig = True
                    anchor_c = cur_c
            else:
                # Track deepest pressed peak (highest depth value) while actuated
                if cur_c > anchor_c:
                    anchor_c = cur_c
                # Release immediately when lifted by >= rtr_c from peak (or above act_c in Basic RT)
                if (anchor_c - cur_c) >= rtr_c or (act_c > 11 and cur_c < act_c):
                    was_trig = False
                    anchor_c = cur_c
        else:
            # Fixed Actuation (Single-Key t_mode == 1 or Global t_mode == 0)
            if not was_trig:
                if cur_c >= act_c:
                    was_trig = True
                    anchor_c = cur_c
            else:
                if cur_c < act_c:
                    was_trig = False
                    anchor_c = cur_c

        self._key_trig_state[canon_idx] = was_trig
        self._key_anchor_mm[canon_idx] = anchor_c
        return was_trig

    def _loop(self):
        while not self._stop.is_set():
            try:
                with self.lock:
                    if self._stop.is_set():
                        break
                    if not self.dev.is_open():
                        self.dev.open()
                    # 1. Read real-time hardware actuation state from MCU (RM6X21Pack(3, 1) / subcmd 0x03)
                    hw_bmp = query_press_bitmap(self.dev, self.lock)
                    if self._stop.is_set():
                        break
                    # 2. Read live analog travel depths (RM6X21Pack(2, 1) & (2, 2))
                    h1 = query_half_matrix(self.dev, self.lock, 1, tick_mcu=False)
                    if self._stop.is_set():
                        break
                    h2 = query_half_matrix(self.dev, self.lock, 2, tick_mcu=False)
                full = h1 + h2

                canon_mm = {}
                canon_hw = {}
                by_idx = {}
                for sp_idx, mm in enumerate(full):
                    val = mm if mm > 0.03 else 0.0
                    by_idx[sp_idx] = val
                    canon_idx = _MIRROR_SLOTS.get(sp_idx, sp_idx)
                    if val > canon_mm.get(canon_idx, 0.0):
                        canon_mm[canon_idx] = val
                    if sp_idx < len(hw_bmp) and hw_bmp[sp_idx] != 0:
                        canon_hw[canon_idx] = True

                by_code = {}
                for sp_idx, aliases in self.UI_ALIASES_BY_SP.items():
                    val = canon_mm.get(sp_idx, 0.0)
                    # Use the actual hardware trigger bitmap directly from the keyboard MCU!
                    is_trig = bool(canon_hw.get(sp_idx, False)) and (val > 0.04)
                    if val > 0.03:
                        base = round(val, 2)
                        encoded = round(base + (0.0001 if is_trig else 0.0), 4)
                        for a in aliases:
                            by_code[a] = encoded

                with self._snap_lock:
                    self._by_code = by_code
                    self._by_idx = by_idx
            except Exception:
                try:
                    self.dev.close()
                except Exception:
                    pass
                time.sleep(0.25)
            time.sleep(0.001)

    def snapshot(self) -> dict:
        with self._snap_lock:
            return dict(self._by_code)

    def snapshot_by_index(self) -> dict[int, float]:
        with self._snap_lock:
            return dict(self._by_idx)


# ============================================================================
# Official magnet.aulastar.com v1.0.9 protocol driver
# ============================================================================
# Packet builders below are byte-for-byte transcriptions of the vendor
# bundle (ve.*Pack). Every payload starts at frame offset 4 and the frame
# length byte is the *payload* length, exactly like the vendor's uint8[64]
# frames (head 0x5C, len, cmd, checksum).

CMD_MACRO = 0x20
CMD_MACRO_MODE = 0x21
CMD_MT = 0x24
CMD_TGL = 0x25
CMD_TDKS = 0x26        # DKS travel table (not implemented)
CMD_MPT = 0x27         # multi-point trigger (not implemented)
CMD_END = 0x28
CMD_DEFKEY = 0x2B
CMD_RS = 0x2D

# KeyLayout property ids (vendor oe.KeyLayout)
L_FN0, L_FN1, L_FN2, L_FN3 = 0, 1, 2, 3
L_DB0, L_DB1, L_DB2, L_DB3 = 4, 5, 6, 7
L_MODE = 8
L_DKS1, L_DKS2, L_DKS3, L_DKS4 = 9, 10, 11, 12
L_TRPS1, L_TRPS2, L_TRPS3, L_TRPS4 = 13, 14, 15, 16
L_MACRO_ADDR, L_MACRO_SIZE = 17, 18
L_MT_DELAY = 19
L_RTP, L_RTR = 20, 21
L_DP, L_DR, L_KR, L_AXIS = 22, 23, 24, 25

TOUCH_GLOBAL, TOUCH_SINGLE, TOUCH_QUICK = 0, 1, 2

ADV_NONE, ADV_DKS, ADV_MPT, ADV_MT, ADV_TGL, ADV_END, ADV_MACRO, ADV_SOCD, ADV_RS = (
    0, 1, 2, 3, 4, 5, 6, 8, 9)

ADV_TYPE_NAMES = {0: "none", 1: "dks", 2: "mpt", 3: "mt", 4: "tgl", 5: "end",
                  6: "macro", 8: "socd", 9: "rs"}

# Aether SOCD model -> payload index. The payload index is 0-based and follows
# the vendor's option order in highSet.SOCDOptions: last input priority, key 1
# priority, key 2 priority, neutralise. The previous table was rotated by one
# (model 1 sent 3 = neutralise), so "Model 1" behaved as Neutral on hardware.
_SOCD_MODEL_INDEX = {1: 0, 2: 1, 3: 2, 4: 3}
_SOCD_V2_BITS = ((0, 0), (0, 1), (1, 0), (1, 1))

_POLL_RATE_INDEX = {8: 0, 4: 1, 2: 2, 1: 3, 500: 4, 250: 5, 125: 6}

_DEFAULT_PALETTE = [
    (255, 0, 0), (255, 127, 0), (255, 255, 0), (0, 255, 0),
    (0, 255, 255), (0, 0, 255), (127, 0, 255),
]

_KID_TO_SP_IDXS = {}
for _sp, _kid in SP_IDX_TO_KEY_ID.items():
    _KID_TO_SP_IDXS.setdefault(_kid, []).append(_sp)


def _chunks(seq, n):
    for i in range(0, len(seq), n):
        yield seq[i:i + n]


def _ver_parts(v):
    out = []
    for part in str(v).split("."):
        try:
            out.append(int(part))
        except (TypeError, ValueError):
            out.append(0)
    while len(out) < 3:
        out.append(0)
    return tuple(out[:3])


def _ver_cmp(a, b):
    pa, pb = _ver_parts(a), _ver_parts(b)
    return (pa > pb) - (pa < pb)


class SparkPlayCalibrationReader:
    """Polls the calibration travel halves while the firmware measures travel.

    Success per key mirrors the vendor store: a key counts as calibrated once
    its measured travel reaches the nominal maximum minus 0.01 mm.
    """

    def __init__(self, driver, keymap):
        self.drv = driver
        self.km = ensure_keymap_populated(keymap)
        self.done = False
        self._stop = threading.Event()
        self._thread = None
        self._lock = threading.Lock()
        self._ok = set()
        self._max_seen = {sp: 0.0 for sp in SP_IDX_TO_KEY_ID}

    def start(self):
        if self._thread and self._thread.is_alive():
            return
        self._stop.clear()
        self._thread = threading.Thread(target=self._loop, name="sparkplay-calib",
                                        daemon=True)
        self._thread.start()

    def stop(self):
        self._stop.set()
        if self._thread:
            self._thread.join(timeout=0.5)
        self._thread = None

    def alive(self) -> bool:
        return bool(self._thread and self._thread.is_alive())

    def snapshot(self):
        with self._lock:
            codes = []
            for sp in sorted(self._ok):
                canon = _MIRROR_SLOTS.get(sp, sp)
                codes.extend(SparkPlayLiveReader.UI_ALIASES_BY_SP.get(canon, ()))
            return codes

    def _consume(self, response, half):
        start = 0 if half == 1 else 63
        target = self.drv._max_travel_mm - 0.01
        with self._lock:
            for i in range(63):
                sp = start + i
                if sp not in self._max_seen:
                    continue
                base = 6 + i * 2
                if base + 1 >= len(response):
                    break
                um = response[base] | (response[base + 1] << 8)
                mm = um / 1000.0
                if mm > self._max_seen[sp]:
                    self._max_seen[sp] = mm
                if mm >= target:
                    self._ok.add(sp)
            covered = {_MIRROR_SLOTS.get(sp, sp) for sp in self._ok}
            self.done = covered >= _CANONICAL_SP_IDXS

    def _loop(self):
        half = 1
        while not self._stop.is_set():
            resp = None
            try:
                with self.drv._lock:
                    if not self.drv.dev.is_open():
                        self.drv.dev.open()
                    raw = getattr(self.drv.dev, "_dev", None)
                    if raw is None:
                        break
                    raw.write(bytes(_pack_aula_frame(CMD_TRAVEL_MATRIX,
                                                     [0x02, half, 0xFF, 0xFF])))
                    resp = _read_rm6x21_frame(raw, 0x02, timeout=0.03, dev=self.drv.dev)
                    raw.write(bytes(_pack_aula_frame(CMD_TRAVEL_MATRIX,
                                                     [0x06, half, 0xFF, 0xFF])))
                    _read_rm6x21_frame(raw, 0x06, timeout=0.02, dev=self.drv.dev)
            except Exception:
                time.sleep(0.05)
            if resp:
                self._consume(resp, half)
            half = 2 if half == 1 else 1
            time.sleep(0.002)


class SparkPlayDriver(BoardDriver):
    """Aula WIN 68 HE MAX (1CA2:1901) driver — official web driver protocol."""

    name = "Aula WIN 68 HE MAX (SparkPlay v1.0.9)"
    DEADBAND_SCOPE = "per-key"

    FEATURES = frozenset({
        "device_info", "lighting", "lighting_read", "per_key_rgb", "host_effects",
        "actuation", "actuation_read", "deadband", "poll_rate", "remap",
        "key_remap", "socd", "calibration", "travel_stream", "gamepad_mode",
        "raw_send", "macros",
    })

    MACRO_SLOTS = 8
    MACRO_MAX_EVENTS = 64          # vendor UI/firmware limit per macro
    MACRO_MAX_DELAY_MS = 0xFFFFFF  # 24-bit per-event delay field
    MACRO_MAX_REPEAT = 0xFFFF
    MACRO_PLAY_MODES = (0, 1, 2, 3)

    FEATURE_WINDOWS = {
        "socdV2": (("1.0.0", "1.0.4"), ("1.2.0", None)),
        "rs": (("1.0.0", "1.2.5"), ("1.3.0", None)),
        "signalDead": (("1.0.1", None),),
        "signalSwitch": (("1.0.2", None),),
        "advancedKeyV2": (("1.0.3", None),),
        "macroV2": (("1.0.4", None),),
        "socdV3": (("1.0.5", "1.0.6"),),
        "topDeadSwitch": (("1.0.6", None),),
        "SOCDDynamicDelay": (("1.0.7", None),),
        "DynamicLightColor": (("1.0.9", None),),
    }

    def __init__(self, profile, device, lock=None):
        super().__init__(profile, device, lock)
        self.board = profile
        self.lock = self._lock

        self._version = "1.0.9"
        self._device = {}
        self._run_mode = 0

        keys = list(SP_IDX_TO_KEY_ID)
        self._actuation_cache = {sp: 0.0 for sp in keys}
        self._rt_press_cache = {sp: 0.0 for sp in keys}
        self._rt_release_cache = {sp: 0.0 for sp in keys}
        self._touch_mode_cache = {sp: TOUCH_SINGLE for sp in keys}
        self._adv_type_cache = {sp: ADV_NONE for sp in keys}
        self._dz_top_cache = {sp: 0.10 for sp in keys}
        self._dz_bot_cache = {sp: 0.00 for sp in keys}
        # User dead band + RT flavour, kept apart from the hardware caches:
        # Basic RT borrows the press dead band as its ceiling, so the value the
        # user actually chose must survive until the key leaves Basic RT.
        self._user_dz_top_cache = {sp: 0.20 for sp in keys}
        self._user_dz_bot_cache = {sp: 0.20 for sp in keys}
        self._rt_cont_cache = {sp: False for sp in keys}
        self._load_dz_memory()
        self._axis_cache = {sp: 0 for sp in keys}
        # CMD_SYS 118: the firmware's ordered axis table. L_AXIS stores an
        # INDEX into it (0 = the factory switch), never the axis id itself.
        self._axis_ids = None
        self._socd_partner = {}

        act = getattr(profile, "actuation", None) or {}
        rng = act.get("travelRange") or [0.1, 3.4]
        self._min_travel_mm = float(rng[0])
        self._max_travel_mm = float(rng[1])
        self._global_travel_mm = self._max_travel_mm
        self._global_dz_top_mm = 0.20
        self._global_dz_bot_mm = 0.20

        st = {
            "palette": list(_DEFAULT_PALETTE),
            "switch": True,
            "big": 1,
            "mode": 0,
            "lum": 4,
            "speed": 4,
            "sleep": 30,
            "static": 0,
            "dyn": 0,
            "direction": 0,
            "super": 0,
        }
        self._light_state = st
        self._key_rgb_cache = {}
        self._stream_last = {}
        self._last_stream_ts = 0.0

        self._macros = {}
        self._bindings = {}
        self._bindings_loaded = False
        self._modes_loaded = False
        self._load_macro_store()

    # ------------------------------------------------- dead band memory
    # Basic RT compresses the press dead band to (travel - 0.01); the value the
    # user configured has to be restored when the key goes back to fixed or
    # Continuous RT. The firmware no longer holds it at that point, so it lives
    # beside settings.json instead of next to the module (a packaged install is
    # read-only).
    def _dz_memory_path(self):
        try:
            import boot
            root = boot.user_data_dir()
        except Exception:
            root = os.path.dirname(os.path.abspath(__file__))
        return os.path.join(root, "user_deadband_memory.json")

    def _load_dz_memory(self):
        try:
            with open(self._dz_memory_path(), encoding="utf-8") as f:
                data = json.load(f)
            for k, v in (data.get("top") or {}).items():
                self._user_dz_top_cache[int(k)] = round(max(0.0, min(1.0, float(v))), 2)
            for k, v in (data.get("bot") or {}).items():
                self._user_dz_bot_cache[int(k)] = round(max(0.0, min(1.0, float(v))), 2)
            for k, v in (data.get("cont") or {}).items():
                self._rt_cont_cache[int(k)] = bool(v)
        except Exception:
            pass   # missing/corrupt memory just means the 0.20 default

    def _save_dz_memory(self):
        path = self._dz_memory_path()
        tmp = path + ".tmp"
        try:
            with open(tmp, "w", encoding="utf-8") as f:
                json.dump({
                    "top": {str(k): v for k, v in self._user_dz_top_cache.items()},
                    "bot": {str(k): v for k, v in self._user_dz_bot_cache.items()},
                    "cont": {str(k): v for k, v in self._rt_cont_cache.items()},
                }, f)
            os.replace(tmp, path)
        except Exception:
            try:
                os.remove(tmp)
            except Exception:
                pass

    # ------------------------------------------------------------------ infra
    def _feature(self, name):
        windows = self.FEATURE_WINDOWS.get(name) or ()
        for since, until in windows:
            if _ver_cmp(self._version, since) >= 0 and (
                    until is None or _ver_cmp(self._version, until) <= 0):
                return True
        return False

    @contextlib.contextmanager
    def _fast_writes(self, ms=1.5):
        old = getattr(self.dev, "sleep_s", 0.012)
        try:
            self.dev.sleep_s = max(0.0, float(ms)) / 1000.0
            yield
        finally:
            self.dev.sleep_s = old

    @staticmethod
    def _normalize(raw):
        b = bytes(raw)
        if len(b) == 65 and b[0] == 0x00:
            b = b[1:]
        return b

    def _drain(self):
        for _ in range(128):
            try:
                raw = self.dev.read(65)
            except Exception:
                return
            if not raw:
                return

    def _read_report(self, timeout):
        deadline = time.perf_counter() + max(0.0, timeout)
        while True:
            try:
                raw = self.dev.read(65)
            except Exception:
                return None
            if raw:
                return self._normalize(raw)
            if time.perf_counter() >= deadline:
                return None
            time.sleep(0.001)

    def _query(self, cmd, payload, timeout=0.2, want_sub=None):
        frame = _pack_aula_frame(cmd, list(payload))
        with self._lock:
            if not self.dev.is_open():
                self.dev.open()
            self._drain()
            self.dev.write(bytes(frame))
            deadline = time.perf_counter() + timeout
            while time.perf_counter() < deadline:
                rep = self._read_report(max(0.005, deadline - time.perf_counter()))
                if not rep or len(rep) < 5:
                    continue
                if rep[0] not in (MAGIC, 0xDC):
                    continue
                if (rep[2] & 0x7F) != (cmd & 0x7F):
                    continue
                n = rep[1]
                if n < 1 or len(rep) < 4 + n:
                    continue
                body = rep[4:4 + n]
                if want_sub is not None and (len(body) < 2 or body[1] != want_sub):
                    continue
                return bytes(body)
        return None

    # ---- link liveness (Api.status) -------------------------------------
    def ping_link(self):
        """Write the cheap version query WITHOUT reading the reply: a running
        live reader drains every report and records the rx itself."""
        try:
            with self._lock:
                if not self.dev.is_open():
                    return False
                self._write(_pack_aula_frame(CMD_SYS, [1, 0xFF, 0xFF]))
            return True
        except Exception:
            return False

    def probe_link(self, timeout_s=0.5):
        """Send the version query and wait for its reply. True = the board
        answered now, False = no reply (stale handle)."""
        try:
            return self._query(CMD_SYS, [1, 0xFF, 0xFF],
                               timeout=timeout_s, want_sub=1) is not None
        except Exception:
            return False

    def _send(self, cmd, payload, fill=0x00):
        self._write(_pack_aula_frame(cmd, list(payload), fill=fill))

    def _kid(self, sp_idx):
        try:
            sp = int(sp_idx)
        except (TypeError, ValueError):
            raise ValueError("invalid key index %r" % (sp_idx,))
        kid = SP_IDX_TO_KEY_ID.get(sp)
        if kid is None:
            raise ValueError("key index %r is not a WIN 68 HE MAX key" % (sp_idx,))
        return kid

    # ---------------------------------------------------------- packet bodies
    @staticmethod
    def _layout_payload(records):
        payload = [0x01]
        for kid, prop, value in records:
            value = int(value)
            payload.extend([kid & 0xFF, prop & 0xFF, value & 0xFF, (value >> 8) & 0xFF])
        return payload

    @staticmethod
    def _db_payload(e, travel_um, press_um, release_um):
        return [e, 0, 0,
                travel_um & 0xFF, (travel_um >> 8) & 0xFF,
                press_um & 0xFF, (press_um >> 8) & 0xFF,
                release_um & 0xFF, (release_um >> 8) & 0xFF,
                0, 0, 0, 0, 0, 0]

    @staticmethod
    def _prgb_payload(e, palette, switch, direction, super_mode, lum, mode,
                      speed, sleep, static_mode, dyn_id=None):
        payload = [e, 0, 0, 0, 0]
        for (r, g, b) in palette[:7]:
            payload.extend([int(b) & 0xFF, int(g) & 0xFF, int(r) & 0xFF, 0xFF])
        payload.extend([0, 0, 0, 0])
        bitmap = (1 if switch else 0) | (2 if direction else 0) | (16 if super_mode else 0)
        payload.extend([bitmap, lum & 0xFF, mode & 0xFF, speed & 0xFF,
                        sleep & 0xFF, static_mode & 0xFF])
        if dyn_id is not None:
            payload.append(dyn_id & 0xFF)
        return payload

    # --------------------------------------------------------------- read ops
    def _read_prop(self, prop, key_ids, timeout=0.12):
        out = {}
        for chunk in _chunks(list(key_ids), 14):
            entries = [(int(k), prop) for k in chunk]
            while len(entries) < 14:
                entries.append((0xFF, 0xFF))
            payload = [0x00]
            for kid, p in entries:
                payload.extend([kid & 0xFF, p & 0xFF, 0, 0])
            body = self._query(CMD_KEY_CONFIG, payload, timeout=timeout)
            if not body:
                continue
            i = 1
            while i + 3 < len(body):
                kid = body[i]
                pr = body[i + 1]
                val = body[i + 2] | (body[i + 3] << 8)
                i += 4
                if kid in (0, 0xFF) or pr == 0xFF:
                    continue
                out[kid] = val
        return out

    def _seed_from_modes(self, modes):
        for kid, value in modes.items():
            for sp in _KID_TO_SP_IDXS.get(kid, ()):
                low = value & 0xFF
                self._touch_mode_cache[sp] = (low >> 4) & 0x0F
                self._adv_type_cache[sp] = low & 0x0F

    def _seed_from_db0(self, values):
        for kid, value in values.items():
            mm = value / 1000.0 if value > 0 else self._global_travel_mm
            for sp in _KID_TO_SP_IDXS.get(kid, ()):
                self._actuation_cache[sp] = mm

    # ------------------------------------------------------------- lifecycle
    def connect(self):
        info = self.dev.open()
        with self._lock:
            self._drain()
        rep = self._query(CMD_SYNC, [1, 2, 3, 4, 0xFF, 0xFF], timeout=0.35)
        if rep and len(rep) >= 8:
            self._parse_sync(rep)
            if self._run_mode == 0xFF:
                raise RuntimeError("WIN 68 HE MAX is in bootloader mode; "
                                   "finish the firmware update first")
        rep = self._query(CMD_SYS, [1, 0xFF, 0xFF], want_sub=1, timeout=0.2)
        if rep and len(rep) >= 4:
            major = rep[3] & 0x0F
            minor = (rep[2] >> 4) & 0x0F
            patch = rep[2] & 0x0F
            self._version = "%d.%d.%d" % (major, minor, patch)
        rep = self._query(CMD_SYS, [38, 0xFF, 0xFF], want_sub=38, timeout=0.2)
        if rep and len(rep) >= 4:
            name = bytes(rep[2:34]).split(b"\x00", 1)[0]
            try:
                self._device["name"] = name.decode("utf-8", "ignore")
            except Exception:
                pass
        rep = self._query(CMD_SYS, [37, 0xFF, 0xFF], want_sub=37, timeout=0.2)
        if rep and len(rep) >= 7:
            self._device["precision_mm"] = rep[2] / 1000.0
            self._min_travel_mm = (rep[3] | (rep[4] << 8)) / 1000.0
            self._max_travel_mm = (rep[5] | (rep[6] << 8)) / 1000.0
            self._global_travel_mm = self._max_travel_mm
        rep = self._query(CMD_GLOBAL_TRAVEL, self._db_payload(0, 0, 0, 0), timeout=0.2)
        if rep and len(rep) >= 9:
            travel = (rep[3] | (rep[4] << 8)) / 1000.0
            self._global_dz_top_mm = (rep[5] | (rep[6] << 8)) / 1000.0
            self._global_dz_bot_mm = (rep[7] | (rep[8] << 8)) / 1000.0
            if travel > 0:
                self._global_travel_mm = travel
        self._read_light_state()

        kids = sorted(set(SP_IDX_TO_KEY_ID.values()))
        self._seed_from_modes(self._read_prop(L_MODE, kids))
        self._modes_loaded = True
        self._seed_from_db0(self._read_prop(L_DB0, kids))
        return info

    def _parse_sync(self, p):
        p = bytes(p) + bytes(64 - len(p))
        board_id = int.from_bytes(p[1:5], "little")
        hw = p[6] << 8 | p[5]
        self._run_mode = p[7]
        sn = bytes(p[9:25]).split(b"\x00", 1)[0].decode("utf-8", "ignore")
        fw = bytes(p[26:37] if bytes(p[26:30]) == b"Boot" else p[26:36])
        fw = fw.split(b"\x00", 1)[0].decode("utf-8", "ignore")
        build = bytes(p[43:54]).split(b"\x00", 1)[0].decode("utf-8", "ignore")
        self._device = {
            "board_id": board_id,
            "layout": p[4],
            "key_type": p[3],
            "hardware": hw,
            "hardware_version": ("V%d.%d.%d" % (hw // 100, (hw % 100) // 10, hw % 10))
            if hw < 1000 else "",
            "run_mode": self._run_mode,
            "serial": sn,
            "firmware": fw,
            "build_date": build,
            "protocol": self._version,
        }

    def device_info(self):
        info = dict(self._device)
        info["protocol_version"] = self._version
        info["name"] = info.get("name") or self.name
        return info

    # -------------------------------------------------------------- lighting
    def _read_light_state(self):
        payload = self._prgb_payload(
            0, self._light_state["palette"], 0, 0, 0, 4, 0, 4, 30, 0)
        rep = self._query(CMD_LIGHTING, payload, timeout=0.2)
        if not rep or len(rep) < 43:
            return None
        st = self._light_state
        colors = []
        for i in range(7):
            base = 5 + i * 4
            colors.append((rep[base + 2], rep[base + 1], rep[base]))
        st["palette"] = colors
        bitmap = rep[37]
        st["switch"] = bool(bitmap & 1)
        st["direction"] = 1 if bitmap & 2 else 0
        st["super"] = 1 if bitmap & 16 else 0
        st["lum"] = rep[38]
        st["mode"] = rep[39]
        st["speed"] = rep[40]
        st["sleep"] = rep[41]
        st["static"] = rep[42]
        if len(rep) > 43:
            st["dyn"] = rep[43]
        if not st["switch"]:
            st["big"] = 0
        elif st["mode"] == 0:
            st["big"] = 1
        elif 0 < st["mode"] <= 20:
            st["big"] = 2
        else:
            st["big"] = 3
        self._light_payload = rep
        return dict(st)

    def _send_light(self):
        st = self._light_state
        dyn = st["dyn"] if self._feature("DynamicLightColor") else None
        payload = self._prgb_payload(
            1, st["palette"], st["switch"], st["direction"], st["super"],
            max(0, min(4, int(st["lum"]))), st["mode"],
            max(0, min(4, int(st["speed"]))), st["sleep"], st["static"], dyn)
        self._send(CMD_LIGHTING, payload)

    def _palette_index(self, rgb):
        rgb = tuple(int(c) & 0xFF for c in rgb[:3])
        palette = self._light_state["palette"]
        try:
            return palette.index(rgb)
        except ValueError:
            palette[0] = rgb
            return 0

    def set_lighting(self, mode, fg, bg=(0, 0, 0), brightness=4, speed=4,
                     direction=0, full_color=0, power_on=True,
                     palette=None, color_slot=None):
        mode = int(mode)
        fg = tuple(int(c) & 0xFF for c in (fg or (255, 255, 255))[:3])
        st = self._light_state
        # The vendor's colour UI is the keyboard's own 7-slot table plus a
        # full-spectrum entry: editing a colour rewrites that slot and selects
        # it. `palette` replaces the stored slots, `color_slot` picks one;
        # both stay None for callers that only speak a single foreground.
        if palette is not None:
            slots = []
            for p in list(palette)[:7]:
                try:
                    slots.append(tuple(int(c) & 0xFF for c in p[:3]))
                except (TypeError, ValueError):
                    slots.append((0, 0, 0))
            while len(slots) < 7:
                slots.append((0, 0, 0))
            st["palette"] = slots
        slot = None if color_slot is None else max(0, min(6, int(color_slot)))
        st["lum"] = max(0, min(4, int(brightness)))
        st["speed"] = max(0, min(4, int(speed)))
        st["direction"] = 1 if int(direction) else 0
        if not power_on:
            st["switch"] = False
            st["big"] = 0
            self._send_light()
            return
        if mode == 21:
            st.update(switch=True, big=3, mode=21)
        elif mode == 0:
            st.update(switch=True, big=1, mode=0)
            st["static"] = (7 if int(full_color) else
                            slot if slot is not None else self._palette_index(fg))
        else:
            st.update(switch=True, big=2, mode=max(1, min(20, mode)))
            # Dynamic colour id: 0 is the vendor's full-spectrum ("rainbow")
            # entry and 1..7 select palette slots 0..6 (see the official
            # PRGBPack caller). Static mode numbers its slots 0..6 + 7 for
            # full colour instead, so the two fields do not share an index.
            st["dyn"] = (0 if int(full_color) else
                         slot + 1 if slot is not None else self._palette_index(fg) + 1)
        self._send_light()

    def get_lighting(self):
        state = self._read_light_state()
        if state is None:
            raise RuntimeError("no lighting reply from keyboard")
        mode = state["mode"]
        palette = state["palette"]
        if mode == 0:
            full = 1 if state["static"] == 7 else 0
            slot = None if full else state["static"] % 7
        else:
            # Dynamic colour id 0 = full spectrum; 1..7 = palette 0..6.
            dyn = state.get("dyn", 0)
            full = 1 if dyn == 0 else 0
            slot = None if full else (dyn - 1) % 7
        fg = (255, 255, 255) if full else palette[slot if slot is not None else 0]
        return {
            "mode": 21 if mode > 20 else mode,
            "fg": fg,
            "bg": (0, 0, 0),
            # The device-stored colour table the vendor UI shows as
            # Color1..Color7, plus which slot the effect is using.
            "palette": ["#%02x%02x%02x" % tuple(int(c) & 0xFF for c in p)
                        for p in palette],
            "slot": slot,
            "brightness": state["lum"],
            "speed": state["speed"],
            "direction": state["direction"],
            "full_color": full,
            "power_on": state["switch"],
        }

    # ---------------------------------------------------------- per-key RGB
    def _enter_custom(self):
        st = self._light_state
        if st["big"] != 3 or not st["switch"]:
            st.update(big=3, switch=True, mode=21)
            self._send_light()

    def _krgb_frames(self, records, e=0x01):
        frames = []
        for chunk in _chunks(records, 14):
            payload = [e]
            for kid, (r, g, b) in chunk:
                payload.extend([kid & 0xFF, int(r) & 0xFF, int(g) & 0xFF, int(b) & 0xFF])
            frames.append(_pack_aula_frame(CMD_PER_KEY_RGB, payload, fill=0xFF))
        return frames

    def set_per_key_rgb(self, colors_by_index, brightness=4, speed=4):
        st = self._light_state
        changed = (st["big"] != 3 or not st["switch"])
        new_lum = max(0, min(4, int(brightness)))
        new_speed = max(0, min(4, int(speed)))
        if st["lum"] != new_lum or st["speed"] != new_speed:
            st["lum"] = new_lum
            st["speed"] = new_speed
            changed = True
        if changed:
            st.update(big=3, switch=True, mode=21)
            self._send_light()
        records = []
        for sp, rgb in (colors_by_index or {}).items():
            if not rgb or len(rgb) < 3:
                continue
            kid = SP_IDX_TO_KEY_ID.get(int(sp))
            if kid is None:
                continue
            rgb = tuple(int(c) & 0xFF for c in rgb[:3])
            records.append((kid, rgb))
            self._key_rgb_cache[int(sp)] = rgb
        if not records:
            return
        with self._fast_writes(1.2):
            for frame in self._krgb_frames(records):
                self._write(frame)
                time.sleep(0.001)

    def begin_host_stream(self):
        self._enter_custom()
        self._stream_last = {}

    def stream_frame(self, colors_by_index, force=False):
        if not colors_by_index:
            return
        now = time.perf_counter()
        if not force and (now - self._last_stream_ts) < 0.033:
            return
        self._last_stream_ts = now
        self._enter_custom()
        pending = {}
        for sp, rgb in colors_by_index.items():
            if not rgb or len(rgb) < 3:
                continue
            sp = int(sp)
            rgb = tuple(int(c) & 0xFF for c in rgb[:3])
            if self._stream_last.get(sp) != rgb:
                pending[sp] = rgb
        if not force and not pending:
            return
        if force:
            pending = {int(sp): tuple(int(c) & 0xFF for c in rgb[:3])
                       for sp, rgb in colors_by_index.items() if rgb and len(rgb) >= 3}
        records = []
        for sp, rgb in pending.items():
            kid = SP_IDX_TO_KEY_ID.get(sp)
            if kid is None:
                continue
            records.append((kid, rgb))
        if not records:
            return
        with self._fast_writes(1.0):
            for frame in self._krgb_frames(records):
                self._write(frame)
        self._stream_last.update(pending)

    def end_host_stream(self):
        self._stream_last = {}

    # ------------------------------------------------------------- actuation
    def _write_global_table(self, travel_mm):
        self._send(CMD_GLOBAL_TRAVEL, self._db_payload(
            1, int(round(float(travel_mm) * 1000.0)),
            int(round(self._global_dz_top_mm * 1000.0)),
            int(round(self._global_dz_bot_mm * 1000.0))))

    def set_actuation(self, indices, mode, travel_mm, rt_press_mm=0.0,
                      rt_release_mm=0.0):
        """Write trigger configuration.

        Modes beyond the fixed/RT pair (decoded from the Aula web driver):
          98  global travel — board-wide table, plus the keys still in
              global touch mode so their stored travel follows it
          99  reset travel — keys go back to global touch/global travel,
              rapid trigger cleared, user dead band restored
          12  Basic RT — press dead band becomes (travel - 0.01)mm, so the
              key re-arms as soon as it rises above the actuation point
          13  Continuous RT — full-keystroke rapid trigger; the user's own
              dead band is restored (the DP field is not owned by RT)
        """
        mode = int(mode)
        travel_mm = round(max(self._min_travel_mm, min(self._max_travel_mm,
                            float(travel_mm))), 2)

        if mode in (98, 99):
            if mode == 98:
                self._global_travel_mm = travel_mm
                targets = [sp for sp in SP_IDX_TO_KEY_ID
                           if self._touch_mode_cache.get(sp, TOUCH_GLOBAL) == TOUCH_GLOBAL]
            else:
                travel_mm = self._global_travel_mm
                targets = [int(sp) for sp in (indices or SP_IDX_TO_KEY_ID)]
            travel_um = int(round(travel_mm * 1000.0))
            self._write_global_table(travel_mm)   # both modes re-assert the table
            records = []
            seen = set()
            for sp in targets:
                kid = SP_IDX_TO_KEY_ID.get(sp)
                if kid is None or kid in seen:
                    continue
                seen.add(kid)
                adv = self._adv_type_cache.get(sp, ADV_NONE)
                records.append((kid, L_MODE, adv & 0x0F))          # touch = global
                records.append((kid, L_DB0, travel_um))
                # 0x05 shadows the travel point (vendor writes both).
                records.append((kid, L_DB1, travel_um))
                # Global keys never own an RT pair and get their saved dead
                # band back (a prior Basic RT ceiling must not linger).
                top_um, bot_um = self._user_dz_um(sp)
                records.append((kid, L_DP, top_um))
                records.append((kid, L_DR, bot_um))
                if mode == 99:
                    records.append((kid, L_RTP, 0))
                    records.append((kid, L_RTR, 0))
                self._touch_mode_cache[sp] = TOUCH_GLOBAL
                self._actuation_cache[sp] = travel_mm
                self._rt_cont_cache[sp] = False
                self._dz_top_cache[sp] = top_um / 1000.0
                self._dz_bot_cache[sp] = bot_um / 1000.0
                if mode == 99:
                    self._rt_press_cache[sp] = 0.0
                    self._rt_release_cache[sp] = 0.0
            self._save_dz_memory()
            self._write_records(records)
            return

        rapid = mode in (2, 12, 13, 14)
        basic = mode == 12
        continuous = mode in (13, 14)
        touch = TOUCH_QUICK if rapid else TOUCH_SINGLE
        write_rt = rapid and rt_press_mm is not None and rt_release_mm is not None
        press_um = int(round(float(rt_press_mm or 0.0) * 1000.0))
        release_um = int(round(float(rt_release_mm or 0.0) * 1000.0))
        travel_um = int(round(travel_mm * 1000.0))
        # Basic RT: the apex of the keycap becomes the press dead band, one
        # hundredth under the travel point (matches the Aula web driver).
        basic_top_um = int(round(max(0.05, min(3.39, travel_mm - 0.01)) * 1000.0))

        records = []
        seen = set()
        for sp in indices:
            sp = int(sp)
            kid = SP_IDX_TO_KEY_ID.get(sp)
            if kid is None or kid in seen:
                continue
            seen.add(kid)
            adv = self._adv_type_cache.get(sp, ADV_NONE)
            records.append((kid, L_MODE, (touch << 4) | (adv & 0x0F)))
            records.append((kid, L_DB0, travel_um))
            # 0x05 shadows the travel point: the vendor driver writes the
            # same value under both ids on every key-config write, and the
            # Basic RT re-arm point is read back through it.
            records.append((kid, L_DB1, travel_um))
            if basic:
                records.append((kid, L_DP, basic_top_um))
                self._dz_top_cache[sp] = basic_top_um / 1000.0
            else:
                top_um, bot_um = self._user_dz_um(sp)
                records.append((kid, L_DP, top_um))
                records.append((kid, L_DR, bot_um))
                self._dz_top_cache[sp] = top_um / 1000.0
                self._dz_bot_cache[sp] = bot_um / 1000.0
            if write_rt:
                records.append((kid, L_RTP, press_um))
                records.append((kid, L_RTR, release_um))
            self._touch_mode_cache[sp] = touch
            self._actuation_cache[sp] = travel_mm
            self._rt_cont_cache[sp] = bool(rapid and continuous)
            if write_rt:
                self._rt_press_cache[sp] = press_um / 1000.0
                self._rt_release_cache[sp] = release_um / 1000.0
        self._save_dz_memory()
        self._write_records(records)

    def _user_dz_um(self, sp):
        top = int(round(max(0.0, min(1.0, float(
            self._user_dz_top_cache.get(sp, 0.20)))) * 1000.0))
        bot = int(round(max(0.0, min(1.0, float(
            self._user_dz_bot_cache.get(sp, 0.20)))) * 1000.0))
        return top, bot

    def _write_records(self, records, delay=0.002):
        if not records:
            return
        with self._fast_writes(1.5):
            for chunk in _chunks(records, 14):
                self._send(CMD_KEY_CONFIG, self._layout_payload(chunk))
                if delay:
                    time.sleep(delay)

    def get_actuation(self):
        return {sp: self._actuation_cache.get(sp, self._global_travel_mm)
                for sp in SP_IDX_TO_KEY_ID}

    def read_actuation(self, keymap):
        keymap = ensure_keymap_populated(keymap)
        kids = sorted(set(SP_IDX_TO_KEY_ID.values()))
        self._seed_from_db0(self._read_prop(L_DB0, kids))
        self._seed_from_modes(self._read_prop(L_MODE, kids))
        out = {}
        for sp, entry in getattr(keymap, "by_index", {}).items():
            name = entry.get("name") or entry.get("code") or str(sp)
            out[name] = self._actuation_cache.get(int(sp), self._global_travel_mm)
        return out

    def read_trigger_detail(self, keymap):
        """{key name: travel + trigger mode + RT pair + both dead bands}.

        One sweep of the seven per-key properties. The RT flavour is inferred
        from the stored press dead band because the firmware records no
        Basic/Continuous flag: Basic RT parks DP just under the actuation
        point, Continuous RT keeps the user's own (small) dead band.

        Also refreshes the user dead band caches — including reading a
        Continuous RT key's own DP back — so a later switch to Basic RT does
        not permanently lose the value the user chose.
        """
        keymap = ensure_keymap_populated(keymap)
        kids = sorted(set(SP_IDX_TO_KEY_ID.values()))
        modes = self._read_prop(L_MODE, kids)
        db0 = self._read_prop(L_DB0, kids)
        rtp = self._read_prop(L_RTP, kids)
        rtr = self._read_prop(L_RTR, kids)
        dzt = self._read_prop(L_DP, kids)
        dzb = self._read_prop(L_DR, kids)
        axes = self._read_prop(L_AXIS, kids)
        axis_ids = self.read_axis_ids()
        self._seed_from_modes(modes)
        self._seed_from_db0(db0)

        for sp in SP_IDX_TO_KEY_ID:
            kid = SP_IDX_TO_KEY_ID[sp]
            if kid in rtp and 10 <= rtp[kid] <= 4000:
                self._rt_press_cache[sp] = round(rtp[kid] / 1000.0, 2)
            if kid in rtr and 10 <= rtr[kid] <= 4000:
                self._rt_release_cache[sp] = round(rtr[kid] / 1000.0, 2)
            if kid in dzb and 0 <= dzb[kid] <= 1000:
                bot = round(dzb[kid] / 1000.0, 2)
                self._dz_bot_cache[sp] = bot
                self._user_dz_bot_cache[sp] = bot
            if kid not in dzt or not (0 <= dzt[kid] <= 3400):
                continue
            top = round(dzt[kid] / 1000.0, 2)
            touch = self._touch_mode_cache.get(sp, TOUCH_SINGLE)
            act = self._actuation_cache.get(sp, self._global_travel_mm)
            if touch == TOUCH_QUICK:
                # Continuous RT leaves the user's dead band in DP; Basic RT
                # overwrites it with (actuation - ~0.01) / the travel ceiling.
                basic = (top > 1.0
                         or abs(top - (act - 0.05)) <= 0.06
                         or abs(top - (act - 0.01)) <= 0.06)
                self._rt_cont_cache[sp] = not basic
                if not basic and top <= 1.0:
                    self._user_dz_top_cache[sp] = top
                self._dz_top_cache[sp] = top
            else:
                self._rt_cont_cache[sp] = False
                if top <= 1.0:
                    self._dz_top_cache[sp] = top
                    self._user_dz_top_cache[sp] = top
                else:
                    # A stale Basic RT ceiling on a key that is no longer in
                    # RT: show (and keep) the user's saved value instead.
                    healed = float(self._user_dz_top_cache.get(sp, 0.20))
                    self._dz_top_cache[sp] = healed
                if touch == TOUCH_GLOBAL:
                    self._global_dz_top_mm = self._dz_top_cache[sp]
        self._save_dz_memory()

        out = {}
        for sp, entry in getattr(keymap, "by_index", {}).items():
            sp = int(sp)
            name = entry.get("name") or entry.get("code") or str(sp)
            touch = self._touch_mode_cache.get(sp, TOUCH_SINGLE)
            cont = bool(self._rt_cont_cache.get(sp, False)) if touch == TOUCH_QUICK else False
            out[name] = {
                "mode": (13 if cont else 12) if touch == TOUCH_QUICK else touch,
                "travel_mm": round(self._actuation_cache.get(sp, self._global_travel_mm), 2),
                "rt_press_mm": round(self._rt_press_cache.get(sp, 0.0), 2),
                "rt_release_mm": round(self._rt_release_cache.get(sp, 0.0), 2),
                "touchMode": touch,
                "rtContinuous": cont,
                "deadTop": round(self._dz_top_cache.get(sp, 0.20), 2),
                "deadBottom": round(self._dz_bot_cache.get(sp, 0.20), 2),
                "userDeadTop": round(self._user_dz_top_cache.get(sp, 0.20), 2),
                "userDeadBottom": round(self._user_dz_bot_cache.get(sp, 0.20), 2),
                # L_AXIS holds a POSITION in the board's axis list (0 = the
                # factory switch); report the stable axis id instead.
                "axis": self._axis_id_of(axes.get(SP_IDX_TO_KEY_ID.get(sp), 0),
                                         axis_ids),
            }
        return out

    # -------------------------------------------------------------- deadband
    def set_deadband(self, raw_by_index, top_mm=None, bottom_mm=None):
        if top_mm is not None:
            self._global_dz_top_mm = round(max(0.0, min(1.0, float(top_mm))), 2)
        if bottom_mm is not None:
            self._global_dz_bot_mm = round(max(0.0, min(1.0, float(bottom_mm))), 2)

        records = []
        seen = set()
        for sp, pair in (raw_by_index or {}).items():
            sp = int(sp)
            kid = SP_IDX_TO_KEY_ID.get(sp)
            if kid is None or kid in seen:
                continue
            seen.add(kid)
            top_raw, bot_raw = pair
            top_um = int(round(max(0.0, min(100.0, float(top_raw))) * 10.0))
            bot_um = int(round(max(0.0, min(100.0, float(bot_raw))) * 10.0))
            top, bot = top_um / 1000.0, bot_um / 1000.0
            # The value the user picked is ALWAYS what comes back after RT is
            # turned off, even while Basic RT is pinning the hardware DP.
            self._user_dz_top_cache[sp] = top
            self._user_dz_bot_cache[sp] = bot
            self._dz_bot_cache[sp] = bot
            basic_locked = (self._touch_mode_cache.get(sp, TOUCH_SINGLE) == TOUCH_QUICK
                            and not self._rt_cont_cache.get(sp, False))
            if not basic_locked:
                records.append((kid, L_DP, top_um))
                self._dz_top_cache[sp] = top
            records.append((kid, L_DR, bot_um))
        self._save_dz_memory()
        if len(seen) >= 60:
            # The whole-board table is what unconfigured keys inherit; keep it
            # in step when a board-wide dead band is written.
            self._write_global_table(self._global_travel_mm)
        if records:
            self._write_records(records)

    # ------------------------------------------------------------- switches
    def read_axis_ids(self, timeout=0.6):
        """The switch ids in the firmware's axis table (CMD_SYS 118).

        The stored L_AXIS value is a POSITION in this list, not the id: index 0
        is the switch the board ships with (Yongchun on the WIN 68 HE Max), and
        the vendor UI displays `axisList[stored]`. Writing an id such as 11
        lands past the end of the four-entry list, which the vendor site can
        only show as "???"; writing 0 is exactly the factory default. Every
        axis write/read therefore goes through this list.
        """
        if self._axis_ids is not None:
            return list(self._axis_ids)
        try:
            rep = self._query(CMD_SYS, [118, 0xFF, 0xFF], want_sub=118,
                              timeout=timeout)
        except Exception:
            rep = None
        ids = []
        if rep:
            for a in range(32):
                i = 2 + 2 * a
                if i + 1 >= len(rep):
                    break
                v = (rep[i] << 8) | rep[i + 1]
                if v in (0, 0xFFFF):
                    break
                ids.append(v)
        self._axis_ids = ids
        return list(ids)

    def _axis_id_of(self, raw, ids=None):
        """Stored L_AXIS position -> stable axis id (registry `code`).

        An out-of-range position is returned unchanged so the UI can label it
        as unknown rather than silently claiming another switch.
        """
        raw = int(raw)
        ids = self.read_axis_ids() if ids is None else ids
        return ids[raw] if 0 <= raw < len(ids) else raw

    def set_switch(self, switch_by_index):
        ids = self.read_axis_ids()
        records = []
        for sp, code in (switch_by_index or {}).items():
            kid = SP_IDX_TO_KEY_ID.get(int(sp))
            if kid is None:
                continue
            code = int(code)
            if not ids:
                raise ValueError("board axis list unavailable (CMD_SYS 118 gave no reply)")
            if code in ids:
                code = ids.index(code)          # the wire value is the position
            else:
                # Writing an id as if it were a position is what corrupted the
                # vendor's view; refuse instead of sending bytes past the list.
                raise ValueError(
                    "axis id %r is not in the board's axis list %r" % (code, ids))
            records.append((kid, L_AXIS, code & 0xFFFF))
        self._write_records(records)

    def set_poll_rate(self, rate):
        rate = int(rate)
        if rate not in _POLL_RATE_INDEX:
            raise ValueError("poll rate must be one of 8000/4000/2000/1000/500/250/125")
        self._send(CMD_SYS, [80, _POLL_RATE_INDEX[rate], 0xFF, 0xFF])

    # ---------------------------------------------------------------- keymap
    def write_keymap(self, default_hids, overrides, layer_indices, fn_layer_raw,
                     restore_indices=()):
        records = []
        done = set()
        for sp, hid in (overrides or {}).items():
            kid = SP_IDX_TO_KEY_ID.get(int(sp))
            if kid is None or kid in done:
                continue
            done.add(kid)
            records.append((kid, L_FN0, int(hid) & 0xFFFF))
        for sp in restore_indices or ():
            kid = SP_IDX_TO_KEY_ID.get(int(sp))
            if kid is None or kid in done:
                continue
            value = (default_hids or {}).get(int(sp))
            if value is None:
                value = DEFAULT_SLOT_HIDS.get(int(sp))
            if value is None:
                continue
            done.add(kid)
            records.append((kid, L_FN0, int(value) & 0xFFFF))
        self._write_records(records)

    def read_keymap_layer(self, fn_layer=False, timeout_s=1.5):
        # This board keeps a single base layer in the key table; the Fn layer
        # is resolved by the keyboard itself and has no readable table.
        return None

    def set_key_remap(self, key_index, hid_usage, modifiers=0):
        kid = self._kid(key_index)
        value = (int(hid_usage) & 0xFF) | ((int(modifiers) & 0xFF) << 8)
        self._write_records([(kid, L_FN0, value)])

    def read_key_records(self):
        kids = sorted(set(SP_IDX_TO_KEY_ID.values()))
        values = {}
        axis_ids = self.read_axis_ids()
        with self._fast_writes(1.2):
            for prop in (L_FN0, L_DB0, L_DB1, L_DB2, L_DB3, L_MODE, L_DKS1,
                         L_DKS2, L_MT_DELAY, L_DP, L_DR, L_KR, L_AXIS):
                for kid, value in self._read_prop(prop, kids).items():
                    values.setdefault(kid, {})[prop] = value
        out = {}
        for kid, props in values.items():
            for sp in _KID_TO_SP_IDXS.get(kid, ()):
                mode = props.get(L_MODE, 0)
                out[sp] = {
                    "key_id": kid,
                    "remap": props.get(L_FN0, 0),
                    "actuation_mm": props.get(L_DB0, 0) / 1000.0,
                    "mode": mode & 0xFF,
                    "touch": (mode >> 4) & 0x0F,
                    "type": ADV_TYPE_NAMES.get(mode & 0x0F, "none"),
                    "dks1": props.get(L_DKS1, 0),
                    "dks2": props.get(L_DKS2, 0),
                    "delay": props.get(L_MT_DELAY, 0),
                    "deadzone_press_mm": props.get(L_DP, 0) / 1000.0,
                    "deadzone_release_mm": props.get(L_DR, 0) / 1000.0,
                    "release_travel_mm": props.get(L_KR, 0) / 1000.0,
                    "axis": self._axis_id_of(props.get(L_AXIS, 0), axis_ids),
                }
        return out

    # ----------------------------------------------------------------- SOCD
    SOCD_DELAY_MAX_MS = 50

    def _socd_payload(self, k1, k2, mode_model, bind=0, delay=0, v1=None, v2=None):
        """SOCD frame: [1, key1, key2, val1 (u16), val2 (u16), bind, mode, delay (u16)].

        `bind` 0 pairs the two physical keys, 1 pairs their key values (the
        vendor's "Binding position" / "Binding key values"). In key-value mode
        the two value slots are independent of the keys: the vendor's dialog
        lets each position be bound to a different key value. They default to
        the two keys when not supplied. Delay is the interaction delay in
        milliseconds (0..50) and needs firmware 1.0.7+; position binding sends
        zeros in the value slots.
        """
        idx = _SOCD_MODEL_INDEX.get(int(mode_model), 0)
        bind = 1 if int(bind) else 0
        v1 = int(k1) if v1 is None else int(v1)
        v2 = int(k2) if v2 is None else int(v2)
        if not bind:
            v1 = v2 = 0
        if self._feature("SOCDDynamicDelay"):
            delay = max(0, min(self.SOCD_DELAY_MAX_MS, int(delay)))
            return [1, k1 & 0xFF, k2 & 0xFF, v1 & 0xFF, (v1 >> 8) & 0xFF,
                    v2 & 0xFF, (v2 >> 8) & 0xFF, bind, idx,
                    delay & 0xFF, (delay >> 8) & 0xFF]
        if self._feature("socdV3"):
            return [1, k1 & 0xFF, k2 & 0xFF, v1 & 0xFF, (v1 >> 8) & 0xFF,
                    v2 & 0xFF, (v2 >> 8) & 0xFF, bind, idx]
        if self._feature("socdV2"):
            bits = _SOCD_V2_BITS[idx]
            return [1, k1 & 0xFF, k2 & 0xFF, bits[0], k2 & 0xFF, k1 & 0xFF, bits[1]]
        return [1, k1 & 0xFF, k2 & 0xFF, k2 & 0xFF, k1 & 0xFF]

    def _apply_socd(self, spa, spb, kid_a, kid_b, mode_model, bind=0, delay=0,
                    val_a=None, val_b=None):
        self._send(CMD_SOCD, self._socd_payload(kid_a, kid_b, mode_model, bind, delay,
                                                val_a, val_b))
        for sp, partner in ((spa, spb), (spb, spa)):
            self._adv_type_cache[sp] = ADV_SOCD
            self._socd_partner[sp] = partner

    def clear_socd(self):
        """Unbind every SOCD pair the board holds.

        The firmware accumulates pairs: writing a new one never retires an old
        one, so Apply must clear first or stale pairs keep firing. The key table
        is the source of truth (the caches only know pairs this session wrote).
        """
        targets = {sp for sp, t in self._adv_type_cache.items() if t == ADV_SOCD}
        try:
            for sp, rec in self.read_key_records().items():
                if rec.get("type") == ADV_TYPE_NAMES[ADV_SOCD]:
                    targets.add(sp)
        except Exception:
            # A read failure must not block the write path; the cached set is
            # still cleared below.
            pass
        records = []
        for sp in sorted(targets):
            kid = SP_IDX_TO_KEY_ID.get(sp)
            if kid is None:
                continue
            touch = self._touch_mode_cache.get(sp, TOUCH_SINGLE)
            records.append((kid, L_MODE, touch << 4))
            self._adv_type_cache[sp] = ADV_NONE
            self._socd_partner.pop(sp, None)
        self._write_records(records)

    def set_socd(self, prcs_list):
        self.clear_socd()
        for pair in prcs_list or ():
            kid_a = int(pair.get("key1_hid") or 0)
            kid_b = int(pair.get("key2_hid") or 0)
            if not kid_a or not kid_b:
                continue
            spa = KEY_ID_TO_SP_IDX.get(kid_a)
            spb = KEY_ID_TO_SP_IDX.get(kid_b)
            if spa is None or spb is None:
                continue
            self._apply_socd(spa, spb, kid_a, kid_b, pair.get("model", 1),
                             bind=pair.get("bind", 0), delay=pair.get("delay", 0),
                             val_a=pair.get("val1_hid") or None,
                             val_b=pair.get("val2_hid") or None)

    def set_advanced_socd(self, key_index_a, key_index_b, hid_a, hid_b, mode):
        kid_a = self._kid(key_index_a)
        kid_b = self._kid(key_index_b)
        self._apply_socd(int(key_index_a), int(key_index_b), kid_a, kid_b, mode)

    def set_advanced_rs(self, key_index_a, key_index_b, hid_a, hid_b):
        kid_a = self._kid(key_index_a)
        kid_b = self._kid(key_index_b)
        self._send(CMD_RS, [1, kid_a & 0xFF, kid_b & 0xFF, kid_b & 0xFF, kid_a & 0xFF])
        for sp, partner in ((int(key_index_a), int(key_index_b)),
                            (int(key_index_b), int(key_index_a))):
            self._adv_type_cache[sp] = ADV_RS
            self._socd_partner[sp] = partner

    def set_advanced_mt(self, key_index, delay, tap_hid=0, hold_hid=0):
        kid = self._kid(key_index)
        sp = int(key_index)
        delay = int(delay) & 0xFF
        if self._feature("advancedKeyV2"):
            tap = int(tap_hid) & 0xFFFF
            hold = int(hold_hid) & 0xFFFF
            self._send(CMD_MT, [1, kid & 0xFF, tap & 0xFF, (tap >> 8) & 0xFF,
                                hold & 0xFF, (hold >> 8) & 0xFF, delay])
        else:
            self._send(CMD_MT, [1, kid & 0xFF, int(tap_hid) & 0xFF,
                                int(hold_hid) & 0xFF, delay])
        self._adv_type_cache[sp] = ADV_MT

    def set_advanced_tgl(self, key_index, hid_usage=0):
        kid = self._kid(key_index)
        sp = int(key_index)
        delay = 20
        if self._feature("advancedKeyV2"):
            hid = int(hid_usage) & 0xFFFF
            self._send(CMD_TGL, [1, kid & 0xFF, hid & 0xFF, (hid >> 8) & 0xFF, delay])
        else:
            self._send(CMD_TGL, [1, kid & 0xFF, int(hid_usage) & 0xFF, delay])
        self._adv_type_cache[sp] = ADV_TGL

    def clear_advanced_key(self, key_index):
        sp = int(key_index)
        kid = self._kid(sp)
        adv = self._adv_type_cache.get(sp, ADV_NONE)
        records = [(kid, L_MODE, (self._touch_mode_cache.get(sp, TOUCH_SINGLE) << 4))]
        partner = self._socd_partner.pop(sp, None)
        if adv in (ADV_SOCD, ADV_RS) and partner is not None:
            pkid = SP_IDX_TO_KEY_ID.get(partner)
            if pkid is not None:
                touch = self._touch_mode_cache.get(partner, TOUCH_SINGLE)
                records.append((pkid, L_MODE, touch << 4))
                self._adv_type_cache[partner] = ADV_NONE
                self._adv_type_cache[sp] = ADV_NONE
                self._write_records(records)
                return
        if adv == ADV_MACRO:
            self._bindings.pop(sp, None)
            self._save_macro_store()
        self._adv_type_cache[sp] = ADV_NONE
        self._write_records(records)

    # ------------------------------------------------------------- calibration
    def set_calibration(self, start, any_key=False):
        if start:
            self._send(CMD_SYS, [12, 0xFF, 0xFF])
        else:
            self._send(CMD_SYS, [13, 0xFF, 0xFF])

    def make_calibration_reader(self, keymap):
        return SparkPlayCalibrationReader(self, keymap)

    def make_live_reader(self, keymap, indices=None):
        return SparkPlayLiveReader(self.dev, self._lock, keymap, indices, driver=self)

    def open_trigger_test(self, indices):
        return None

    def close_trigger_test(self):
        return None

    def set_gamepad_mode(self, on):
        # The Aether gamepad is a host-side virtual pad fed by the travel
        # stream; the keyboard needs no mode change.
        return True

    # ------------------------------------------------------------- raw send
    def send_raw(self, report):
        body = bytes(report)
        if len(body) == 64:
            body = b"\x00" + body
        if len(body) != 65 or body[0] != REPORT_ID:
            raise ValueError("raw report must be a 65-byte vendor frame")
        frame = bytearray(body[1:])
        if len(frame) != 64 or frame[0] != MAGIC:
            raise ValueError("raw frame must start with 0x5C after the report id")
        cmd = frame[2]
        if 8 <= cmd <= 14:
            raise ValueError("bootloader commands (0x%02X) are refused" % cmd)
        frame[3] = _aula_compute_checksum(list(frame))
        self._write([REPORT_ID] + list(frame))

    # ---------------------------------------------------------------- macros
    def _macro_store_path(self):
        base = os.environ.get("LOCALAPPDATA")
        if not base:
            base = os.path.join(os.path.expanduser("~"), ".local", "share")
        return os.path.join(base, "AetherHE", "sparkplay_macros.json")

    def _load_macro_store(self):
        path = self._macro_store_path()
        try:
            with open(path, "r", encoding="utf-8") as fh:
                data = json.load(fh)
        except Exception:
            return
        macros = {}
        for key, value in (data.get("macros") or {}).items():
            try:
                slot = int(key)
                events = [(int(e[0]), int(e[1]), bool(e[2]))
                          for e in (value.get("events") or [])]
            except (TypeError, ValueError, IndexError):
                continue
            if not 0 <= slot < self.MACRO_SLOTS:
                continue
            macros[slot] = {"events": events,
                            "play_mode": int(value.get("play_mode", 0)) & 3,
                            "repeat_count": max(1, int(value.get("repeat_count", 1)))}
        bindings = {}
        for key, value in (data.get("bindings") or {}).items():
            try:
                bindings[int(key)] = int(value)
            except (TypeError, ValueError):
                continue
        self._macros = macros
        self._bindings = bindings

    def _save_macro_store(self):
        path = self._macro_store_path()
        data = {"macros": {str(s): {"events": [list(e) for e in m["events"]],
                                    "play_mode": m["play_mode"],
                                    "repeat_count": m["repeat_count"]}
                           for s, m in self._macros.items()},
                "bindings": {str(k): int(v) for k, v in self._bindings.items()}}
        os.makedirs(os.path.dirname(path), exist_ok=True)
        tmp = path + ".tmp"
        with open(tmp, "w", encoding="utf-8") as fh:
            json.dump(data, fh, ensure_ascii=False, indent=1)
        os.replace(tmp, path)

    def _macro_blob_frames(self, macro):
        events = macro["events"]
        frames = []
        if self._feature("macroV2"):
            step = 9
            for start in range(0, len(events), step):
                chunk = events[start:start + step]
                addr = 256 + start
                payload = [1, addr & 0xFF, (addr >> 8) & 0xFF, len(chunk) & 0xFF]
                for delay, hid, down in chunk:
                    flag = 1 if down else 8
                    word = ((flag & 0xFF) << 24) | (int(delay) & 0xFFFFFF)
                    payload.extend([hid & 0xFF, (hid >> 8) & 0xFF,
                                    word & 0xFF, (word >> 8) & 0xFF,
                                    (word >> 16) & 0xFF, (word >> 24) & 0xFF])
                frames.append(_pack_aula_frame(CMD_MACRO, payload))
        else:
            step = 14
            for start in range(0, len(events), step):
                chunk = events[start:start + step]
                addr = 256 + start
                payload = [1, addr & 0xFF, (addr >> 8) & 0xFF, len(chunk) & 0xFF]
                for delay, hid, down in chunk:
                    flag = 1 if down else 8
                    word = ((flag & 0x0F) << 12) | (int(delay) & 0x0FFF)
                    payload.extend([hid & 0xFF, (hid >> 8) & 0xFF,
                                    word & 0xFF, (word >> 8) & 0xFF])
                frames.append(_pack_aula_frame(CMD_MACRO, payload))
        return frames

    def _write_macro_blob(self, macro):
        with self._fast_writes(1.2):
            for frame in self._macro_blob_frames(macro):
                self._write(frame)
                time.sleep(0.001)

    def _macro_binding_records(self, sp, slot, kid):
        macro = self._macros.get(slot)
        if not macro or not macro["events"]:
            raise ValueError("macro slot %d is empty" % slot)
        touch = self._touch_mode_cache.get(sp, TOUCH_SINGLE) or TOUCH_SINGLE
        count = len(macro["events"])
        return [(kid, L_MODE, (touch << 4) | ADV_MACRO),
                (kid, L_MACRO_ADDR, 256),
                (kid, L_MACRO_SIZE, count)]

    def _send_macro_mode(self, kid, slot):
        macro = self._macros[slot]
        play = int(macro.get("play_mode", 0)) & 3
        repeat = max(1, int(macro.get("repeat_count", 1))) & 0xFFFF
        steps = len(macro["events"]) & 0xFF
        delay = int(macro.get("repeat_delay_ms", 0)) & 0xFFFFFF
        payload = [1, kid & 0xFF, slot & 0xFF, (slot >> 8) & 0xFF, steps, play,
                   repeat & 0xFF, (repeat >> 8) & 0xFF,
                   delay & 0xFF, (delay >> 8) & 0xFF, (delay >> 16) & 0xFF]
        self._send(CMD_MACRO_MODE, payload)

    def list_macros(self):
        return {slot: {"events": list(m["events"]),
                       "play_mode": m["play_mode"],
                       "repeat_count": m["repeat_count"]}
                for slot, m in sorted(self._macros.items())}

    def read_macro(self, index):
        macro = self._macros.get(int(index))
        if not macro:
            return None
        return {"events": list(macro["events"]),
                "play_mode": macro["play_mode"],
                "repeat_count": macro["repeat_count"]}

    def write_macro(self, index, events, **playback):
        slot = int(index)
        if not 0 <= slot < self.MACRO_SLOTS:
            raise ValueError("macro slot must be 0..%d" % (self.MACRO_SLOTS - 1))
        if not events:
            self._macros.pop(slot, None)
            self._save_macro_store()
            return
        clean = []
        for delay, hid, down in events:
            delay = int(delay)
            hid = int(hid)
            if not 0 <= hid <= 0xFFFF:
                raise ValueError("macro key value must be 0..65535")
            if not 0 <= delay <= self.MACRO_MAX_DELAY_MS:
                raise ValueError("macro delay must be 0..%d" % self.MACRO_MAX_DELAY_MS)
            clean.append((delay, hid, bool(down)))
        if len(clean) > self.MACRO_MAX_EVENTS:
            raise ValueError("macro too long: max %d events" % self.MACRO_MAX_EVENTS)
        self._macros[slot] = {
            "events": clean,
            "play_mode": int(playback.get("play_mode", 0) or 0) & 3,
            "repeat_count": max(1, int(playback.get("repeat_count", 1) or 1)),
        }
        self._save_macro_store()
        bound = [sp for sp, s in self._bindings.items() if s == slot]
        if bound:
            self._write_macro_blob(self._macros[slot])
            for sp in bound:
                kid = SP_IDX_TO_KEY_ID.get(sp)
                if kid is None:
                    continue
                self._write_records(
                    self._macro_binding_records(sp, slot, kid), delay=0)
                time.sleep(0.005)
                self._send_macro_mode(kid, slot)

    def bind_macro(self, key_index, macro_index, play_mode=0, loop_count=1,
                   **context):
        sp = int(key_index)
        slot = int(macro_index)
        if slot not in self._macros:
            raise ValueError("macro slot %d is empty" % slot)
        kid = self._kid(sp)
        macro = self._macros[slot]
        if play_mode is not None:
            macro["play_mode"] = int(play_mode) & 3
        if loop_count is not None:
            macro["repeat_count"] = max(1, int(loop_count))
        self._bindings[sp] = slot
        self._bindings_loaded = True
        self._save_macro_store()
        self._write_macro_blob(macro)
        self._write_records(self._macro_binding_records(sp, slot, kid), delay=0)
        time.sleep(0.005)
        self._send_macro_mode(kid, slot)
        self._adv_type_cache[sp] = ADV_MACRO

    def unbind_key(self, key_index, **context):
        sp = int(key_index)
        kid = self._kid(sp)
        touch = self._touch_mode_cache.get(sp, TOUCH_SINGLE) or TOUCH_SINGLE
        self._bindings.pop(sp, None)
        self._adv_type_cache[sp] = ADV_NONE
        self._save_macro_store()
        self._write_records([(kid, L_MODE, touch << 4)])

    def read_macro_bindings(self):
        if not self._bindings_loaded:
            self._bindings_loaded = True
            if not self._modes_loaded:
                kids = sorted(set(SP_IDX_TO_KEY_ID.values()))
                self._seed_from_modes(self._read_prop(L_MODE, kids))
                self._modes_loaded = True
            for sp, adv in list(self._adv_type_cache.items()):
                if adv != ADV_MACRO or sp in self._bindings:
                    continue
                kid = SP_IDX_TO_KEY_ID.get(sp)
                if kid is None:
                    continue
                rep = self._query(CMD_MACRO_MODE,
                                  [0, kid & 0xFF, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                  timeout=0.05)
                if rep and len(rep) >= 4:
                    slot = rep[2] | (rep[3] << 8)
                    if slot in self._macros:
                        self._bindings[sp] = slot
        return {int(sp): int(slot) for sp, slot in self._bindings.items()}

