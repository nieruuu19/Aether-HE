import pathlib
"""protocol_sparkplay.py — Exact magnet.aulastar.com v1.0.9 driver for Aula WIN 68 HE MAX (1CA2:1901).

Decoded directly from official WebHID captures:
  * Per-key Actuation / RT / Deadzone / Remap: CMD 0x23 (5c 39 23 ed 01 [key_id prop val_lo val_hi]...)
  * Global Actuation / Deadzone: CMD 0x29 (5c 0f 29 c9 01 00 00 [act_u16] [dz_p_u16] [dz_r_u16]...)
  * RGB Lighting: CMD 0x18 (5c 2c 18 d6/d5 01 ...)
  * SOCD / DKS: CMD 0x2C (5c 0b 2c c8 01 [k1] [k2] ...)
  * Poll Rate: CMD 0x00 subcmd 0x50 (5c 04 00 94 50 [code] ff ff)
  * Live Analog Travel: CMD 0x12 (5c 04 12 a6 02 [half] ff ff)
"""

import json
import os
import threading
import time

REPORT_ID = 0x00
FRAME_LEN = 64
MAGIC = 0x5C
CHECKSUM_SEED = 0x35

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
    if 0 < r <= 60 and (r + 3) < len(pkt64):
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


def _read_rm6x21_frame(raw_dev, expected_subcmd: int, timeout: float = 0.06) -> bytearray | None:
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
        resp = _read_rm6x21_frame(raw_dev, expected_subcmd=0x03, timeout=0.025)
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
        response = _read_rm6x21_frame(raw_dev, expected_subcmd=0x02, timeout=0.03)

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


class SparkPlayDriver:
    """Exact magnet.aulastar.com v1.0.9 hardware driver for Aula WIN 68 HE MAX."""

    name = "SparkPlayJoy v1.0.9"
    DEADBAND_SCOPE = "per-key"
    MACRO_SLOTS = 8
    MACRO_MAX_EVENTS = 64
    MACRO_MAX_DELAY_MS = 5000
    MACRO_MAX_REPEAT = 255
    MACRO_PLAY_MODES = (0, 1, 2)

    # Default 28-byte RGB palette from capture:
    # ff 00 00, ff 7f 00, ff ff 00, 00 ff 00, 00 ff ff, 00 00 ff, 7f 00 ff, ff 00 ff, etc.
    DEFAULT_PALETTE_28 = [
        0xFF, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0x7F, 0x7F, 0xFF, 0xFF, 0x00, 0x00, 0xFF,
        0x7F, 0x00, 0x7F, 0xFF, 0x7F, 0x7F, 0x00, 0xFF, 0x7F, 0x7F, 0x7F, 0xFF, 0x00, 0x00,
    ]

    def __init__(self, board, dev, lock):
        self.board = board
        self.dev = dev
        self.lock = lock
        self._actuation_cache = {sp_idx: 1.5 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        self._rt_press_cache = {sp_idx: 0.2 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        self._rt_release_cache = {sp_idx: 0.2 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        self._dz_top_cache = {sp_idx: 0.20 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        self._user_dz_top_cache = {sp_idx: 0.20 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        self._global_dz_top_mm = 0.20
        self._user_dz_top_mm = 0.20
        self._dz_bot_cache = {sp_idx: 0.20 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        self._user_dz_bot_cache = {sp_idx: 0.20 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        self._rt_cont_cache = {sp_idx: False for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        self._global_dz_bot_mm = 0.20
        self._db_mem_path = pathlib.Path(__file__).resolve().parent / "user_deadband_memory.json"
        self._load_dz_memory()
        self._keymap_cache = {sp_idx: key_id for sp_idx, key_id, _, _ in AULA_WIN68_KEYS}
        self._macros = {}
        self._macro_bindings = {}

    def _load_dz_memory(self):
        try:
            if self._db_mem_path.exists():
                data = json.loads(self._db_mem_path.read_text(encoding="utf-8"))
                for k, v in data.get("top", {}).items():
                    self._user_dz_top_cache[int(k)] = round(max(0.0, min(1.0, float(v))), 2)
                for k, v in data.get("bot", {}).items():
                    self._user_dz_bot_cache[int(k)] = round(max(0.0, min(1.0, float(v))), 2)
                for k, v in data.get("cont", {}).items():
                    self._rt_cont_cache[int(k)] = bool(v)
        except Exception:
            pass

    def _save_dz_memory(self):
        try:
            self._db_mem_path.write_text(json.dumps({
                "top": {str(k): v for k, v in self._user_dz_top_cache.items()},
                "bot": {str(k): v for k, v in self._user_dz_bot_cache.items()},
                "cont": {str(k): v for k, v in self._rt_cont_cache.items()},
            }), encoding="utf-8")
        except Exception:
            pass

    def supports(self, feature: str) -> bool:
        return True

    def _write_frames(self, frames: list[list[int]], delay_s: float = 0.004):
        """Write frames without consuming input reports.

        The captured WebHID protocol establishes the outbound frames, but does
        not establish an ACK frame or ACK lifecycle. Reading here can steal the
        travel-matrix response from the live reader, so input is owned by the
        command-specific reader instead.
        """
        with self.lock:
            if not self.dev.is_open():
                self.dev.open()
            raw_dev = getattr(self.dev, "_dev", None) or getattr(self.dev, "dev", None)
            if raw_dev is None:
                raise RuntimeError("Aula HID device is open but has no raw device handle")
            for f in frames:
                raw_dev.write(bytes(f))
                if delay_s > 0:
                    time.sleep(min(delay_s, 0.003))

    def connect(self):
        info = self.dev.open()
        # Send official handshake: 5c 06 01 97 01 02 03 04 ff ff
        try:
            handshake = [REPORT_ID, 0x5C, 0x06, 0x01, 0x97, 0x01, 0x02, 0x03, 0x04, 0xFF, 0xFF] + [0x00] * 54
            self._write_frames([handshake])
        except Exception:
            pass
        return info or {"interface_number": 2}

    def make_live_reader(self, km, idxs=None):
        ensure_keymap_populated(km)
        if not self.dev.is_open():
            try:
                self.dev.open()
            except Exception:
                pass
        return SparkPlayLiveReader(self.dev, self.lock, km, idxs, driver=self)

    def open_trigger_test(self, idxs=None):
        if not self.dev.is_open():
            self.dev.open()
        self._write_frames([_pack_aula_frame(CMD_TRAVEL_MATRIX, [0x03, 0x01, 0xFF, 0xFF])])
        return True

    def close_trigger_test(self):
        return True

    def set_actuation(self, idxs, mode, travel_mm, rt_press_mm=None, rt_release_mm=None):
        if not hasattr(self, "_global_travel_mm"):
            self._global_travel_mm = 2.00
        if not hasattr(self, "_touch_mode_cache"):
            self._touch_mode_cache = {}
        if not hasattr(self, "_user_dz_top_cache"):
            self._user_dz_top_cache = {sp_idx: 0.20 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        if not hasattr(self, "_user_dz_bot_cache"):
            self._user_dz_bot_cache = {sp_idx: 0.20 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        if not hasattr(self, "_rt_cont_cache"):
            self._rt_cont_cache = {sp_idx: False for sp_idx, _, _, _ in AULA_WIN68_KEYS}

        travel_mm = round(max(0.10, min(3.40, float(travel_mm))), 2)
        mode_int = int(mode) if mode is not None else 0

        if mode_int == 98:
            self._global_travel_mm = travel_mm
            target_sp_idxs = [
                sp_idx for sp_idx, _, _, _ in AULA_WIN68_KEYS
                if self._touch_mode_cache.get(sp_idx, 0) == 0
            ]
            rt_on = False
            continuous_rt = False
            touch_mode = 0
        elif mode_int == 99:
            travel_mm = float(getattr(self, "_global_travel_mm", 2.00))
            target_sp_idxs = [int(i) for i in idxs] if idxs else [sp for sp, _, _, _ in AULA_WIN68_KEYS]
            rt_on = False
            continuous_rt = False
            touch_mode = 0
        else:
            target_sp_idxs = [int(i) for i in idxs] if idxs else [sp for sp, _, _, _ in AULA_WIN68_KEYS]
            rt_on = (mode_int in (12, 13, 14)) or (rt_press_mm is not None and float(rt_press_mm) > 0 and mode_int != 0)
            continuous_rt = (mode_int in (13, 14))
            touch_mode = 2 if rt_on else 1

        p_mm = round(max(0.01, min(3.40, float(rt_press_mm if rt_press_mm is not None else 0.05))), 2)
        r_mm = round(max(0.01, min(3.40, float(rt_release_mm if rt_release_mm is not None else 0.05))), 2)

        effective_db0_mm = travel_mm
        act_um = int(round(effective_db0_mm * 1000))
        act_lo, act_hi = act_um & 0xFF, (act_um >> 8) & 0xFF

        base_top_dz_mm = float(getattr(self, "_global_dz_top_mm", 0.20))

        if mode_int == 98 or (mode_int == 99 and len(target_sp_idxs) >= 60):
            g_um = int(round(float(self._global_travel_mm) * 1000))
            dz_p = int(round(base_top_dz_mm * 1000))
            dz_r = int(round(float(getattr(self, "_global_dz_bot_mm", 0.20)) * 1000))
            db_payload = [
                0x01, 0x00, 0x00,
                g_um & 0xFF, (g_um >> 8) & 0xFF,
                dz_p & 0xFF, (dz_p >> 8) & 0xFF,
                dz_r & 0xFF, (dz_r >> 8) & 0xFF,
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00
            ]
            self._write_frames([_pack_aula_frame(0x29, db_payload, fill=0x00)])

        records = []
        seen_key_ids = set()
        for sp_idx in target_sp_idxs:
            canon_idx = _MIRROR_SLOTS.get(sp_idx, sp_idx)
            key_id = SP_IDX_TO_KEY_ID.get(canon_idx)
            if not key_id or key_id in seen_key_ids:
                continue
            seen_key_ids.add(key_id)

            adv_type = getattr(self, "_adv_type_cache", {}).get(canon_idx, 0) & 0x0F
            mode_byte = ((touch_mode & 0x03) << 4) | adv_type

            self._actuation_cache[canon_idx] = effective_db0_mm
            self._touch_mode_cache[canon_idx] = touch_mode
            self._rt_cont_cache[canon_idx] = bool(rt_on and continuous_rt)

            records.append((key_id, PROP_MODE_FLAGS, mode_byte, 0x00))
            records.append((key_id, PROP_ACTUATION_UM, act_lo, act_hi))
            records.append((key_id, 0x05, act_lo, act_hi))

            # Per-key saved user deadband (from Dead Band Settings)
            user_top_mm = float(self._user_dz_top_cache.get(canon_idx, 0.20))
            user_bot_mm = float(self._user_dz_bot_cache.get(canon_idx, 0.20))

            if rt_on and not continuous_rt:
                # Basic RT (mode 12): dynamically set hardware top deadband to max(user_top_mm, travel_mm - 0.05)
                # (matches Aula Web Driver: e.g. 2.00mm travel -> 1.95mm top deadband on keycap!)
                dp_mm = round(max(0.05, min(3.39, travel_mm - 0.01)), 2)
                self._dz_top_cache[canon_idx] = dp_mm
                dp_um = int(round(dp_mm * 1000))
                records.append((key_id, PROP_DZ_TOP_UM, dp_um & 0xFF, (dp_um >> 8) & 0xFF))
            else:
                # Continuous RT (mode 13), Single-Key (mode 0), or Reset Travel (mode 99):
                # Restore the key's saved user deadband from memory!
                self._dz_top_cache[canon_idx] = user_top_mm
                self._dz_bot_cache[canon_idx] = user_bot_mm
                top_um = int(round(user_top_mm * 1000))
                bot_um = int(round(user_bot_mm * 1000))
                records.append((key_id, PROP_DZ_TOP_UM, top_um & 0xFF, (top_um >> 8) & 0xFF))
                records.append((key_id, PROP_DZ_BOT_UM, bot_um & 0xFF, (bot_um >> 8) & 0xFF))

            if rt_on:
                self._rt_press_cache[canon_idx] = p_mm
                self._rt_release_cache[canon_idx] = r_mm
                p_um = int(round(p_mm * 1000))
                r_um = int(round(r_mm * 1000))
                records.append((key_id, PROP_RT_PRESS_UM, p_um & 0xFF, (p_um >> 8) & 0xFF))
                records.append((key_id, PROP_RT_RELEASE_UM, r_um & 0xFF, (r_um >> 8) & 0xFF))
            else:
                self._rt_press_cache[canon_idx] = 0.0
                self._rt_release_cache[canon_idx] = 0.0
                records.append((key_id, PROP_RT_PRESS_UM, 0x00, 0x00))
                records.append((key_id, PROP_RT_RELEASE_UM, 0x00, 0x00))

        self._save_dz_memory()
        if records:
            self._write_frames(build_cmd23_write(records))
        return True

    def read_actuation(self, km):
        ensure_keymap_populated(km)
        key_id_to_sp = {key_id: sp_idx for sp_idx, key_id, _, _ in AULA_WIN68_KEYS}
        all_key_ids = [key_id for _, key_id, _, _ in AULA_WIN68_KEYS]
        if not hasattr(self, "_touch_mode_cache"):
            self._touch_mode_cache = {}
        if not hasattr(self, "_user_dz_top_cache"):
            self._user_dz_top_cache = {sp_idx: 0.20 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        if not hasattr(self, "_user_dz_bot_cache"):
            self._user_dz_bot_cache = {sp_idx: 0.20 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        if not hasattr(self, "_rt_cont_cache"):
            self._rt_cont_cache = {sp_idx: False for sp_idx, _, _, _ in AULA_WIN68_KEYS}

        try:
            with self.lock:
                if not self.dev.is_open():
                    self.dev.open()
                for _ in range(8):
                    try:
                        if not self.dev.read(64, timeout_ms=1):
                            break
                    except Exception:
                        break
                raw_dev = getattr(self.dev, "_dev", None) or getattr(self.dev, "dev", None)
                if raw_dev is not None:
                    try:
                        while raw_dev.read(65):
                            pass
                    except Exception:
                        pass

                    for prop_id in (PROP_MODE_FLAGS, PROP_ACTUATION_UM, PROP_RT_PRESS_UM, PROP_RT_RELEASE_UM, PROP_DZ_TOP_UM, PROP_DZ_BOT_UM):
                        for i in range(0, len(all_key_ids), 14):
                            chunk = all_key_ids[i:i + 14]
                            payload = [0x00]
                            for kid in chunk:
                                payload.extend([kid & 0xFF, prop_id & 0xFF, 0x00, 0x00])
                            while len(payload) < 57:
                                payload.extend([0xFF, 0xFF, 0xFF, 0x00])
                            frame = _pack_aula_frame(CMD_KEY_CONFIG, payload[:57], fill=0x00)
                            raw_dev.write(bytes(frame))

                            deadline = time.perf_counter() + 0.045
                            while time.perf_counter() < deadline:
                                pkt = raw_dev.read(65)
                                if not pkt:
                                    time.sleep(0.0008)
                                    continue
                                b = bytes(pkt)
                                if len(b) == 65 and b[0] == REPORT_ID:
                                    b = b[1:]
                                if len(b) >= 60 and b[0] in (0x5C, 0xDC) and b[2] == 0xA3:
                                    offset = 5
                                    for _ in range(14):
                                        if offset + 4 > len(b):
                                            break
                                        r_kid = b[offset]
                                        r_prop = b[offset + 1]
                                        r_val = b[offset + 2] | (b[offset + 3] << 8)
                                        offset += 4
                                        sp_idx = key_id_to_sp.get(r_kid)
                                        if sp_idx is None:
                                            continue
                                        if r_prop == PROP_MODE_FLAGS:
                                            t_mode = (r_val >> 4) & 0x0F
                                            adv_mode = r_val & 0x0F
                                            self._touch_mode_cache[sp_idx] = t_mode
                                            if hasattr(self, "_adv_type_cache"):
                                                self._adv_type_cache[sp_idx] = adv_mode
                                        elif r_prop == PROP_ACTUATION_UM and 50 <= r_val <= 4000:
                                            self._actuation_cache[sp_idx] = round(r_val / 1000.0, 2)
                                        elif r_prop == PROP_RT_PRESS_UM and 10 <= r_val <= 4000:
                                            self._rt_press_cache[sp_idx] = round(r_val / 1000.0, 2)
                                        elif r_prop == PROP_RT_RELEASE_UM and 10 <= r_val <= 4000:
                                            self._rt_release_cache[sp_idx] = round(r_val / 1000.0, 2)
                                        elif r_prop == PROP_DZ_TOP_UM and 0 <= r_val <= 3400:
                                            dz_t = round(r_val / 1000.0, 2)
                                            self._dz_top_cache[sp_idx] = dz_t
                                            t_m = self._touch_mode_cache.get(sp_idx, 0)
                                            act_m = self._actuation_cache.get(sp_idx, 1.50)
                                            # Determine if this RT key on hardware is Basic RT (dz_t near act_m) or Continuous RT
                                            if t_m == 2:
                                                if abs(dz_t - (act_m - 0.05)) <= 0.06 or abs(dz_t - (act_m - 0.01)) <= 0.06 or dz_t > 1.00:
                                                    self._rt_cont_cache[sp_idx] = False
                                                else:
                                                    self._rt_cont_cache[sp_idx] = True
                                                    if dz_t <= 1.00:
                                                        self._user_dz_top_cache[sp_idx] = dz_t
                                            else:
                                                self._rt_cont_cache[sp_idx] = False
                                                if dz_t <= 1.00:
                                                    self._user_dz_top_cache[sp_idx] = dz_t
                                                    self._global_dz_top_mm = dz_t
                                                else:
                                                    # Auto-heal leftover >1.00mm Basic RT ceiling on a non-RT key!
                                                    healed_top = float(self._user_dz_top_cache.get(sp_idx, 0.20))
                                                    self._dz_top_cache[sp_idx] = healed_top
                                        elif r_prop == PROP_DZ_BOT_UM and 0 <= r_val <= 1000:
                                            dz_b = round(r_val / 1000.0, 2)
                                            self._dz_bot_cache[sp_idx] = dz_b
                                            self._user_dz_bot_cache[sp_idx] = dz_b
                                            self._global_dz_bot_mm = dz_b
                                    break
        except Exception:
            pass

        self._save_dz_memory()
        out = {}
        for sp_idx, _, _, _ in AULA_WIN68_KEYS:
            act_val = self._actuation_cache.get(sp_idx, 1.5)
            t_mode = self._touch_mode_cache.get(sp_idx, 0)
            rtp_val = self._rt_press_cache.get(sp_idx, 0.0) if t_mode == 2 else 0.0
            rtr_val = self._rt_release_cache.get(sp_idx, 0.0) if t_mode == 2 else 0.0
            dz_top_hw = self._dz_top_cache.get(sp_idx, 0.20)
            dz_bot_hw = self._dz_bot_cache.get(sp_idx, 0.20)
            u_top = self._user_dz_top_cache.get(sp_idx, 0.20)
            u_bot = self._user_dz_bot_cache.get(sp_idx, 0.20)
            rt_cont = bool(self._rt_cont_cache.get(sp_idx, False)) if t_mode == 2 else False
            info_obj = {
                "actuation": act_val,
                "rtPress": rtp_val,
                "rtRelease": rtr_val,
                "touchMode": t_mode,
                "rtContinuous": rt_cont,
                "deadTop": dz_top_hw,
                "deadBottom": dz_bot_hw,
                "userDeadTop": u_top,
                "userDeadBottom": u_bot,
            }
            for a in AULA_WIN68_ALIASES.get(sp_idx, ()):
                out[a] = info_obj
                out[a.upper()] = info_obj
                out[a.lower()] = info_obj
        return out

    def set_deadband(self, per_key_map, top_mm=0.20, bottom_mm=0.20):
        """Write Top Deadzone (Layout_DP = 0x16) and Bottom Deadzone (Layout_DR = 0x17)
        per-key (for keys in per_key_map) or board-wide via CMD 0x23.
        """
        if not hasattr(self, "_user_dz_top_cache"):
            self._user_dz_top_cache = {sp_idx: 0.20 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        if not hasattr(self, "_user_dz_bot_cache"):
            self._user_dz_bot_cache = {sp_idx: 0.20 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        if not hasattr(self, "_rt_cont_cache"):
            self._rt_cont_cache = {sp_idx: False for sp_idx, _, _, _ in AULA_WIN68_KEYS}

        top_clamped = round(max(0.00, min(1.00, float(top_mm))), 2)
        bot_clamped = round(max(0.00, min(1.00, float(bottom_mm))), 2)
        self._global_dz_top_mm = top_clamped
        self._global_dz_bot_mm = bot_clamped

        if isinstance(per_key_map, dict) and len(per_key_map) > 0:
            target_items = []
            for sp_idx, pair in per_key_map.items():
                if isinstance(pair, (list, tuple)) and len(pair) >= 2 and float(pair[0]) <= 1.0 and float(pair[1]) <= 1.0:
                    t_v = round(max(0.00, min(1.00, float(pair[0]))), 2)
                    b_v = round(max(0.00, min(1.00, float(pair[1]))), 2)
                else:
                    t_v, b_v = top_clamped, bot_clamped
                target_items.append((int(sp_idx), t_v, b_v))
        else:
            target_items = [(sp_idx, top_clamped, bot_clamped) for sp_idx, _, _, _ in AULA_WIN68_KEYS]

        records = []
        seen_key_ids = set()
        for sp_idx, t_v, b_v in target_items:
            canon_idx = _MIRROR_SLOTS.get(int(sp_idx), int(sp_idx))
            key_id = SP_IDX_TO_KEY_ID.get(canon_idx)
            if not key_id or key_id in seen_key_ids:
                continue
            seen_key_ids.add(key_id)

            # Always update user deadband memory for this key
            self._user_dz_top_cache[canon_idx] = t_v
            self._user_dz_bot_cache[canon_idx] = b_v
            self._dz_bot_cache[canon_idx] = b_v

            top_um = int(round(max(0.00, min(1.00, t_v)) * 1000))
            bot_um = int(round(max(0.00, min(1.00, b_v)) * 1000))

            # Only write PROP_DZ_TOP_UM to hardware if this key is NOT currently locked in Basic RT
            t_mode = getattr(self, "_touch_mode_cache", {}).get(canon_idx, 0)
            is_basic_rt = (t_mode == 2 and not self._rt_cont_cache.get(canon_idx, False))
            if not is_basic_rt:
                self._dz_top_cache[canon_idx] = t_v
                records.append((key_id, PROP_DZ_TOP_UM, top_um & 0xFF, (top_um >> 8) & 0xFF))
            records.append((key_id, PROP_DZ_BOT_UM, bot_um & 0xFF, (bot_um >> 8) & 0xFF))

        self._save_dz_memory()
        if len(target_items) >= 60:
            g_um = int(round(float(getattr(self, "_global_travel_mm", 2.00)) * 1000))
            t_um = int(round(top_clamped * 1000))
            b_um = int(round(bot_clamped * 1000))
            db_payload = [
                0x01, 0x00, 0x00,
                g_um & 0xFF, (g_um >> 8) & 0xFF,
                t_um & 0xFF, (t_um >> 8) & 0xFF,
                b_um & 0xFF, (b_um >> 8) & 0xFF,
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00
            ]
            self._write_frames([_pack_aula_frame(0x29, db_payload, fill=0x00)])
        if records:
            self._write_frames(build_cmd23_write(records))
        return True

    @staticmethod
    def _aula_checksum(pkt64: list[int]) -> int:
        return _aula_compute_checksum(pkt64)

    @classmethod
    def _pack_aula(cls, cmd: int, payload: list[int], fill: int = 0x00) -> list[int]:
        return _pack_aula_frame(cmd, payload, fill=fill)

    AULA_PRESET_RGB = [
        (255, 0, 0),
        (255, 127, 0),
        (255, 255, 0),
        (0, 255, 0),
        (0, 255, 255),
        (0, 0, 255),
        (127, 0, 255),
    ]

    @classmethod
    def _nearest_color_slot(cls, r, g, b):
        best_slot = 0
        best_dist = 10**9
        for idx, (pr, pg, pb) in enumerate(cls.AULA_PRESET_RGB):
            d = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2
            if d < best_dist:
                best_dist = d
                best_slot = idx
        return best_slot

    def _send_cmd18(self, mode_byte=0x15, brt_byte=4, spd_byte=3, dir_byte=0,
                    static_slot=0, dyn_slot=4, pwr_byte=1, custom_rgb=None, super_resp=False):
        bitmap = 0
        if pwr_byte:
            bitmap |= 1
        if dir_byte:
            bitmap |= 2
        if super_resp:
            bitmap |= 16

        pal = list(self.DEFAULT_PALETTE_28)
        if custom_rgb is not None:
            r_b, g_b, b_b = int(custom_rgb[0]) & 0xFF, int(custom_rgb[1]) & 0xFF, int(custom_rgb[2]) & 0xFF
            pal[0], pal[1], pal[2], pal[3] = b_b, g_b, r_b, 0xFF

        payload = (
            [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
            + pal[:28]
            + [0x00, 0x00,
               bitmap & 0xFF,
               max(0, min(4, int(brt_byte))),
               max(0, min(21, int(mode_byte))),
               max(0, min(4, int(spd_byte))),
               0x02,
               static_slot & 0xFF,
               dyn_slot & 0xFF]
        )
        frame = self._pack_aula(CMD_LIGHTING, payload, fill=0x00)
        self._write_frames([frame], delay_s=0.004)

    def _write_all_keys_rgb(self, colors_by_index, default_rgb=(0, 0, 0), diff_only=False):
        last_sent = getattr(self, "_last_key_rgb", {}) if diff_only else {}
        new_sent = dict(last_sent)
        def_r, def_g, def_b = int(default_rgb[0]) & 0xFF, int(default_rgb[1]) & 0xFF, int(default_rgb[2]) & 0xFF

        changed_entries = []
        for sp_idx, hid_id, _, _ in AULA_WIN68_KEYS:
            rgb = colors_by_index.get(sp_idx)
            if rgb and len(rgb) >= 3:
                target = (int(rgb[0]) & 0xFF, int(rgb[1]) & 0xFF, int(rgb[2]) & 0xFF)
            else:
                target = (def_r, def_g, def_b)
            if diff_only and last_sent.get(sp_idx) == target:
                continue
            new_sent[sp_idx] = target
            changed_entries.append((hid_id & 0xFF, target[0], target[1], target[2]))

        self._last_key_rgb = new_sent
        if not changed_entries:
            return

        frames = []
        for i in range(0, len(changed_entries), 14):
            batch = changed_entries[i:i + 14]
            payload = [0x01]
            for hid_id, r_b, g_b, b_b in batch:
                payload.extend([hid_id, r_b, g_b, b_b])
            frames.append(self._pack_aula(CMD_PER_KEY_RGB, payload, fill=0xFF))

        self._write_frames(frames, delay_s=0.004)

    def set_lighting(self, mode, fg, bg=(0, 0, 0), brightness=4, speed=3,
                     direction=0, full_color=0, power_on=True):
        r, g, b = (int(fg[0]) & 0xFF, int(fg[1]) & 0xFF, int(fg[2]) & 0xFF) if fg else (255, 255, 255)
        if not power_on or int(brightness) == 0:
            self._send_cmd18(mode_byte=0, brt_byte=0, spd_byte=speed, dir_byte=direction, static_slot=0, dyn_slot=0, pwr_byte=0)
            self._in_custom_rgb_mode = False
            return True

        slot = 7 if full_color else self._nearest_color_slot(r, g, b)
        if int(mode) == 0 and not full_color:
            self._send_cmd18(mode_byte=0x15, brt_byte=brightness, spd_byte=speed, dir_byte=direction,
                             static_slot=0, dyn_slot=slot, pwr_byte=1, custom_rgb=(r, g, b))
            self._in_custom_rgb_mode = True
            self._write_all_keys_rgb({}, default_rgb=(r, g, b), diff_only=False)
        else:
            aula_mode = int(mode)
            self._send_cmd18(mode_byte=aula_mode, brt_byte=brightness, spd_byte=speed, dir_byte=direction,
                             static_slot=slot, dyn_slot=slot, pwr_byte=1, custom_rgb=(r, g, b))
            self._in_custom_rgb_mode = False
        return True

    def set_per_key_rgb(self, colors_by_index, brightness=4, speed=3):
        if not colors_by_index:
            return True
        if not getattr(self, "_in_custom_rgb_mode", False):
            self._send_cmd18(mode_byte=0x15, brt_byte=brightness, spd_byte=speed, dir_byte=0, static_slot=0, dyn_slot=4, pwr_byte=1)
            self._in_custom_rgb_mode = True
        self._write_all_keys_rgb(colors_by_index, default_rgb=(0, 0, 0), diff_only=False)
        return True

    def set_poll_rate(self, code):
        """Official CMDPack(80, rate_code) from index-C7aUVaaC.js."""
        code_map = {1: 0x00, 2: 0x01, 4: 0x02, 8: 0x03, 8000: 0x00, 4000: 0x01, 2000: 0x02, 1000: 0x03, 500: 0x04, 250: 0x05, 125: 0x06}
        aula_code = code_map.get(int(code), 0x00)
        frame = _pack_aula_frame(0x00, [0x50, aula_code, 0xFF, 0xFF], fill=0x00)
        self._write_frames([frame])
        return True

    def set_switch(self, table):
        """Official Layout_AXIS (prop 25 = 0x19) from index-C7aUVaaC.js."""
        if not isinstance(table, dict) or not table:
            return True
        records = []
        seen = set()
        for sp_idx, sw_id in table.items():
            canon_idx = _MIRROR_SLOTS.get(int(sp_idx), int(sp_idx))
            key_id = SP_IDX_TO_KEY_ID.get(canon_idx)
            if key_id and key_id not in seen:
                seen.add(key_id)
                records.append((key_id, 25, int(sw_id) & 0xFF, 0x00))
        if records:
            self._write_frames(build_cmd23_write(records))
        return True

    def write_keymap(self, defaults, remaps, layer_indices, fn_layer_raw, restore_indices=()):
        """Write key remaps using Layout_Fn0 (prop 0) via CMD 0x23."""
        records = []
        for sp_idx in restore_indices:
            canon_idx = _MIRROR_SLOTS.get(int(sp_idx), int(sp_idx))
            key_id = SP_IDX_TO_KEY_ID.get(canon_idx)
            if key_id:
                self._keymap_cache[canon_idx] = key_id
                records.append((key_id, PROP_REMAP_L0, key_id, 0x00))

        if isinstance(remaps, dict):
            for sp_idx, target_hid in remaps.items():
                canon_idx = _MIRROR_SLOTS.get(int(sp_idx), int(sp_idx))
                key_id = SP_IDX_TO_KEY_ID.get(canon_idx)
                if key_id:
                    self._keymap_cache[canon_idx] = int(target_hid) & 0xFF
                    records.append((key_id, PROP_REMAP_L0, int(target_hid) & 0xFF, 0x00))

        if records:
            self._write_frames(build_cmd23_write(records))
        return True

    def set_key_remap(self, idx, hid_usage, modifiers=0):
        canon_idx = _MIRROR_SLOTS.get(int(idx), int(idx))
        key_id = SP_IDX_TO_KEY_ID.get(canon_idx)
        if key_id:
            records = [(key_id, PROP_REMAP_L0, int(hid_usage) & 0xFF, int(modifiers) & 0xFF)]
            self._write_frames(build_cmd23_write(records))
        return True

    def set_socd(self, pairs):
        """Official SOCDV3Pack / SOCDV4Pack (CMD 0x2C = 44) + Layout_Mode (advanceKeyType=8) from index-C7aUVaaC.js."""
        if not hasattr(self, "_adv_type_cache"):
            self._adv_type_cache = {}
        frames = []
        mode_records = []
        for p in (pairs or []):
            k1 = int(p.get("key1_hid", 0)) & 0xFF
            k2 = int(p.get("key2_hid", 0)) & 0xFF
            socd_mode = int(p.get("model", p.get("mode", 0))) & 0xFF
            if k1 and k2:
                # SOCDV4Pack: [1, k1, k2, dks1_lo, dks1_hi, dks2_lo, dks2_hi, mode, type(0), delay_lo, delay_hi]
                payload = [0x01, k1, k2, k1, 0x00, k2, 0x00, socd_mode, 0x00, 0x00, 0x00]
                frames.append(_pack_aula_frame(CMD_SOCD, payload, fill=0x00))
                # Set advanceKeyType = 8 on both keys while preserving QuickMode (0x20 | 8 = 0x28)
                mode_records.append((k1, PROP_MODE_FLAGS, 0x28, 0x00))
                mode_records.append((k2, PROP_MODE_FLAGS, 0x28, 0x00))
        if frames:
            self._write_frames(frames)
        if mode_records:
            self._write_frames(build_cmd23_write(mode_records))
        return True

    def set_advanced_socd(self, ia, ib, hid_a, hid_b, mode=0):
        k1 = SP_IDX_TO_KEY_ID.get(_MIRROR_SLOTS.get(int(ia), int(ia)), int(hid_a))
        k2 = SP_IDX_TO_KEY_ID.get(_MIRROR_SLOTS.get(int(ib), int(ib)), int(hid_b))
        return self.set_socd([{"key1_hid": k1, "key2_hid": k2, "model": int(mode)}])

    def set_advanced_rs(self, ia, ib, hid_a, hid_b):
        """Official RSPack (CMD 0x2D = 45) + Layout_Mode (advanceKeyType=9) from index-C7aUVaaC.js."""
        k1 = SP_IDX_TO_KEY_ID.get(_MIRROR_SLOTS.get(int(ia), int(ia)), int(hid_a)) & 0xFF
        k2 = SP_IDX_TO_KEY_ID.get(_MIRROR_SLOTS.get(int(ib), int(ib)), int(hid_b)) & 0xFF
        if k1 and k2:
            frame = _pack_aula_frame(0x2D, [0x01, k1, k2], fill=0x00)
            self._write_frames([frame])
            self._write_frames(build_cmd23_write([
                (k1, PROP_MODE_FLAGS, 0x29, 0x00),
                (k2, PROP_MODE_FLAGS, 0x29, 0x00),
            ]))
        return True

    def set_advanced_mt(self, idx, delay, tap_hid=0, hold_hid=0):
        """Official MTPack (CMD 0x24 = 36, advancedKeyV2) + Layout_Mode (advanceKeyType=3) from index-C7aUVaaC.js."""
        canon_idx = _MIRROR_SLOTS.get(int(idx), int(idx))
        key_id = SP_IDX_TO_KEY_ID.get(canon_idx)
        if key_id:
            d_ticks = max(1, min(255, int(round(float(delay) / 10.0)))) if int(delay) > 20 else max(1, int(delay))
            tap = int(tap_hid or key_id) & 0xFFFF
            hold = int(hold_hid or key_id) & 0xFFFF
            payload = [0x01, key_id & 0xFF, tap & 0xFF, (tap >> 8) & 0xFF, hold & 0xFF, (hold >> 8) & 0xFF, d_ticks & 0xFF]
            self._write_frames([_pack_aula_frame(0x24, payload, fill=0x00)])
            self._write_frames(build_cmd23_write([(key_id, PROP_MODE_FLAGS, 0x13, 0x00)]))
        return True

    def set_advanced_tgl(self, idx, hid_usage=0):
        """Official TGLPack (CMD 0x25 = 37, advancedKeyV2) + Layout_Mode (advanceKeyType=4) from index-C7aUVaaC.js."""
        canon_idx = _MIRROR_SLOTS.get(int(idx), int(idx))
        key_id = SP_IDX_TO_KEY_ID.get(canon_idx)
        if key_id:
            u = int(hid_usage or key_id) & 0xFFFF
            payload = [0x01, key_id & 0xFF, u & 0xFF, (u >> 8) & 0xFF, 0x14]
            self._write_frames([_pack_aula_frame(0x25, payload, fill=0x00)])
            self._write_frames(build_cmd23_write([(key_id, PROP_MODE_FLAGS, 0x14, 0x00)]))
        return True

    def clear_advanced_key(self, idx):
        canon_idx = _MIRROR_SLOTS.get(int(idx), int(idx))
        key_id = SP_IDX_TO_KEY_ID.get(canon_idx, 0)
        if key_id:
            if hasattr(self, "_adv_type_cache"):
                self._adv_type_cache.pop(canon_idx, None)
            self._write_frames(build_cmd23_write([
                (key_id, PROP_REMAP_L0, key_id, 0x00),
                (key_id, PROP_MODE_FLAGS, 0x10, 0x00),
            ]))
        return True

    def set_calibration(self, start, any_key=False):
        """Official CMDPack(12) = Start Adjusting, CMDPack(13) = Save Adjusting from index-C7aUVaaC.js."""
        order = 12 if start else 13
        frame = _pack_aula_frame(0x00, [order, 0xFF, 0xFF], fill=0x00)
        self._write_frames([frame])
        return True

    def set_gamepad_mode(self, on):
        return True

    def read_key_records(self):
        return []

    def list_macros(self):
        return dict(self._macros)

    def read_macro(self, slot):
        return self._macros.get(int(slot))

    def write_macro(self, slot, events, play_mode=0, repeat_count=1):
        if events is None:
            self._macros.pop(int(slot), None)
        else:
            self._macros[int(slot)] = {
                "events": list(events),
                "play_mode": int(play_mode),
                "repeat_count": int(repeat_count),
            }
        return True

    def read_macro_bindings(self):
        return dict(self._macro_bindings)

    def bind_macro(self, idx, slot, play_mode=None, repeat_count=None, **kwargs):
        self._macro_bindings[int(idx)] = int(slot)
        return True

    def unbind_key(self, idx, **kwargs):
        self._macro_bindings.pop(int(idx), None)
        return True

    def send_raw(self, payload):
        self.dev.write([REPORT_ID] + list(payload[:64]))
        return True

    def begin_host_stream(self):
        return True

    def end_host_stream(self):
        return True

    def stream_frame(self, colors_by_index, force=False):
        if not colors_by_index:
            return True
        now = time.perf_counter()
        if not force and (now - getattr(self, "_last_stream_ts", 0.0)) < 0.055:
            return True
        self._last_stream_ts = now

        if not getattr(self, "_in_custom_rgb_mode", False) or force:
            self._send_cmd18(mode_byte=0x15, brt_byte=4, spd_byte=4, dir_byte=0, static_slot=0, dyn_slot=4, pwr_byte=1)
            self._in_custom_rgb_mode = True
            self._write_all_keys_rgb(colors_by_index, default_rgb=(0, 0, 0), diff_only=False)
        else:
            self._write_all_keys_rgb(colors_by_index, default_rgb=(0, 0, 0), diff_only=True)
        return True

    def read_keymap_layer(self, fn_layer=False):
        return None
