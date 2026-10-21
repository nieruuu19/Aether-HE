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
CMD_DKS_INIT = 0x2A
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
        str(_sp_idx),
        str(_key_id),
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


def build_cmd23_write(records: list[tuple[int, int, int, int]]) -> list[list[int]]:
    """Official oe.LayoutDataPack (CMD 0x23 = 35) from index-C7aUVaaC.js:
    Wait-free 14-record batches with dynamic length (1 + 4*N) and exact ComputeCheckSum!
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
    """Polls Half 1 (0..62) and Half 2 (63..125) and maps Row 1..5 keys to Aether UI."""

    def __init__(self, dev, lock, km, idxs=None):
        self.dev = dev
        self.lock = lock
        self.km = ensure_keymap_populated(km)
        self.idxs = set(idxs) if idxs else None
        self._stop = threading.Event()
        self._thread = None
        self._snap_lock = threading.Lock()
        self._by_code = {}
        self._by_idx = {}

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

    def _loop(self):
        while not self._stop.is_set():
            try:
                if not self.dev.is_open():
                    self.dev.open()
                h1 = query_half_matrix(self.dev, self.lock, 1)
                h2 = query_half_matrix(self.dev, self.lock, 2)
                full = h1 + h2
                by_code = {}
                by_idx = {}
                for sp_idx, mm in enumerate(full):
                    val = mm if mm > 0.02 else 0.0
                    by_idx[sp_idx] = val
                    if val > 0.0:
                        canon_idx = _MIRROR_SLOTS.get(sp_idx, sp_idx)
                        by_idx[canon_idx] = max(by_idx.get(canon_idx, 0.0), val)
                        for a in AULA_WIN68_ALIASES.get(sp_idx, ()):
                            for variant in (a, a.upper(), a.lower()):
                                if val > by_code.get(variant, 0.0):
                                    by_code[variant] = val
                        if self.km and canon_idx in self.km.by_index:
                            entry = self.km.by_index[canon_idx]
                            for k in ("code", "name", "label"):
                                v = entry.get(k)
                                if v and val > by_code.get(str(v), 0.0):
                                    by_code[str(v)] = val
                with self._snap_lock:
                    self._by_code = by_code
                    self._by_idx = by_idx
            except Exception:
                time.sleep(0.02)
            time.sleep(0.004)

    def snapshot(self):
        with self._snap_lock:
            return dict(self._by_code)

    def snapshot_by_index(self):
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
        self._dz_top_cache = {sp_idx: 0.1 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        self._dz_bot_cache = {sp_idx: 0.1 for sp_idx, _, _, _ in AULA_WIN68_KEYS}
        self._keymap_cache = {sp_idx: key_id for sp_idx, key_id, _, _ in AULA_WIN68_KEYS}
        self._macros = {}
        self._macro_bindings = {}

    def supports(self, feature: str) -> bool:
        return True

    def _write_frames(self, frames: list[list[int]], delay_s: float = 0.004):
        with self.lock:
            if not self.dev.is_open():
                self.dev.open()
            raw_dev = getattr(self.dev, "_dev", None) or getattr(self.dev, "dev", None)
            if raw_dev is None:
                return
            for f in frames:
                cmd_byte = f[3] if len(f) > 3 else None
                for attempt in range(2):
                    raw_dev.write(bytes(f))
                    deadline = time.perf_counter() + max(0.045, delay_s)
                    got_ack = False
                    while time.perf_counter() < deadline:
                        try:
                            r = raw_dev.read(65)
                            if r and (cmd_byte is None or r[0] == 0xDC):
                                got_ack = True
                                break
                        except Exception:
                            break
                        time.sleep(0.0008)
                    if got_ack:
                        break
                    time.sleep(0.005)
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
        return SparkPlayLiveReader(self.dev, self.lock, km, idxs)

    def open_trigger_test(self, idxs=None):
        if not self.dev.is_open():
            self.dev.open()
        return True

    def close_trigger_test(self):
        return True

    def set_actuation(self, idxs, mode, travel_mm, rt_press_mm=None, rt_release_mm=None):
        """Official LayoutDataPack (CMD 0x23) & DBPack (CMD 0x29) from index-C7aUVaaC.js.
        Supports:
          - Mode 0: Fixed Single-Key / Global Actuation (KeyTouchMode.SingleMode = 1 -> 0x10)
          - Mode 12 (Basic Rapid Trigger): KeyTouchMode.QuickMode = 2 (0x20), First Trigger (DB0) = travel_mm
          - Mode 13 (Continuous Rapid Trigger): KeyTouchMode.QuickMode = 2 (0x20), First Trigger (DB0) = 0.10mm (full stroke RT!)
        """
        travel_mm = max(0.1, min(3.4, float(travel_mm)))
        rt_on = (mode in (12, 13)) or (rt_press_mm is not None and float(rt_press_mm) > 0 and int(mode) != 0)
        continuous_rt = (int(mode) == 13)

        # In Continuous RT, DB0 (First Trigger stroke) is set to 0.10mm (100um) so RT stays active across the entire 0.10-3.40mm travel
        effective_travel_mm = 0.10 if (rt_on and continuous_rt) else travel_mm
        act_um = int(round(effective_travel_mm * 1000))
        act_lo, act_hi = act_um & 0xFF, (act_um >> 8) & 0xFF

        target_sp_idxs = [int(i) for i in idxs] if idxs else [sp for sp, _, _, _ in AULA_WIN68_KEYS]

        # If all 68 keys are updated in normal mode without RT, also update Global Travel via DBPack (CMD 0x29 = 41)
        if len(target_sp_idxs) >= 60 and not rt_on:
            dz_p = int(round(getattr(self, "_global_dz_top_mm", 0.1) * 1000))
            dz_r = int(round(getattr(self, "_global_dz_bot_mm", 0.1) * 1000))
            db_payload = [
                0x01, 0x00, 0x00,
                act_lo, act_hi,
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
            mode_byte = ((0x02 if rt_on else 0x01) << 4) | adv_type

            self._actuation_cache[canon_idx] = travel_mm
            records.append((key_id, PROP_MODE_FLAGS, mode_byte, 0x00))
            records.append((key_id, PROP_ACTUATION_UM, act_lo, act_hi))

            if rt_on:
                p_mm = max(0.01, min(3.4, float(rt_press_mm if rt_press_mm is not None else 0.2)))
                r_mm = max(0.01, min(3.4, float(rt_release_mm if rt_release_mm is not None else 0.2)))
                self._rt_press_cache[canon_idx] = p_mm
                self._rt_release_cache[canon_idx] = r_mm
                p_um = int(round(p_mm * 1000))
                r_um = int(round(r_mm * 1000))
                records.append((key_id, PROP_RT_PRESS_UM, p_um & 0xFF, (p_um >> 8) & 0xFF))
                records.append((key_id, PROP_RT_RELEASE_UM, r_um & 0xFF, (r_um >> 8) & 0xFF))

        if records:
            self._write_frames(build_cmd23_write(records))
        return True

    def read_actuation(self, km):
        ensure_keymap_populated(km)
        out = {}
        for sp_idx, _, _, _ in AULA_WIN68_KEYS:
            val = self._actuation_cache.get(sp_idx, 1.5)
            for a in AULA_WIN68_ALIASES.get(sp_idx, ()):
                out[a] = val
                out[a.upper()] = val
                out[a.lower()] = val
        return out

    def set_deadband(self, per_key_map, top_mm=0.1, bottom_mm=0.1):
        """Write per-key Top Deadzone (Layout_DP = 22) and Bottom Deadzone (Layout_DR = 23) via CMD 0x23."""
        self._global_dz_top_mm = float(top_mm)
        self._global_dz_bot_mm = float(bottom_mm)
        top_um_default = int(round(max(0.0, min(1.0, float(top_mm))) * 1000))
        bot_um_default = int(round(max(0.0, min(1.0, float(bottom_mm))) * 1000))

        records = []
        if isinstance(per_key_map, dict) and per_key_map:
            items = list(per_key_map.items())
        else:
            items = [(sp_idx, (top_um_default // 10, bot_um_default // 10)) for sp_idx, _, _, _ in AULA_WIN68_KEYS]

        seen_key_ids = set()
        for sp_idx, pair in items:
            canon_idx = _MIRROR_SLOTS.get(int(sp_idx), int(sp_idx))
            key_id = SP_IDX_TO_KEY_ID.get(canon_idx)
            if not key_id or key_id in seen_key_ids:
                continue
            seen_key_ids.add(key_id)
            if isinstance(pair, (list, tuple)) and len(pair) >= 2:
                t_um = max(0, min(1000, int(pair[0]) * 10))
                b_um = max(0, min(1000, int(pair[1]) * 10))
            else:
                t_um, b_um = top_um_default, bot_um_default
            records.append((key_id, PROP_DZ_TOP_UM, t_um & 0xFF, (t_um >> 8) & 0xFF))
            records.append((key_id, PROP_DZ_BOT_UM, b_um & 0xFF, (b_um >> 8) & 0xFF))

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
        for sp_idx, hid_id in SP_IDX_TO_KEY_ID.items():
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
