"""AETHER HE — native webview shell."""
import contextlib
import json
import logging
import os
import re
import sys
import threading
import time

import hid
import webview

from aula_device import AulaDevice
import boards
import drivers
from drivers import UnsupportedFeature
import protocol_sparkplay

# Allow "protocol_sparkplay" in boards.py validator if it checks KNOWN_PROTOCOLS
for _attr in ("KNOWN_PROTOCOLS", "VALID_PROTOCOLS", "ALLOWED_PROTOCOLS", "_PROTOCOLS"):
    _val = getattr(boards, _attr, None)
    if isinstance(_val, (set, frozenset)):
        setattr(boards, _attr, set(_val) | {"protocol_sparkplay"})
    elif isinstance(_val, (list, tuple)):
        setattr(boards, _attr, tuple(_val) + ("protocol_sparkplay",))

_orig_connected_profiles = getattr(drivers, "connected_profiles", None)
def _patched_connected_profiles(reg=None):
    if reg is not None and hasattr(reg, "by_slug"):
        w68 = reg.by_slug("aula-win68he-max")
        if w68 and hid.enumerate(0x1CA2, 0x1901):
            return [w68]
    if _orig_connected_profiles and reg is not None:
        try:
            return _orig_connected_profiles(reg)
        except Exception:
            pass
    return []
drivers.connected_profiles = _patched_connected_profiles

_orig_get_driver = drivers.get_driver
def _patched_get_driver(board, dev, lock):
    if (board is None
            or getattr(board, "protocol", None) == "protocol_sparkplay"
            or getattr(board, "slug", None) in ("aula-win68he-max", "aula-win60he-max")
            or getattr(board, "vid", None) == 0x1CA2):
        return protocol_sparkplay.SparkPlayDriver(board, dev, lock)
    return _orig_get_driver(board, dev, lock)
drivers.get_driver = _patched_get_driver

import effects
import device_state
import gamepad
import updater
import tray
import single_instance
from tools import board_submission

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("aether.web")


def user_data_dir():
    if sys.platform.startswith("win"):
        root = os.environ.get("LOCALAPPDATA") or os.path.expanduser("~")
    elif sys.platform == "darwin":
        root = os.path.expanduser("~/Library/Application Support")
    else:
        root = os.environ.get("XDG_CONFIG_HOME") or os.path.expanduser("~/.config")
    d = os.path.join(root, "AetherHE")
    os.makedirs(d, exist_ok=True)
    return d


def _install_file_logging():
    try:
        import faulthandler
        from logging.handlers import RotatingFileHandler
        path = os.path.join(user_data_dir(), "aether.log")
        fh = RotatingFileHandler(path, maxBytes=512 * 1024, backupCount=2, encoding="utf-8")
        fh.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(name)s %(message)s"))
        logging.getLogger().addHandler(fh)
        crash = open(os.path.join(user_data_dir(), "aether-crash.log"), "a", encoding="utf-8")
        faulthandler.enable(file=crash, all_threads=True)

        def _hook(exc_type, exc, tb):
            log.critical("uncaught exception", exc_info=(exc_type, exc, tb))
        sys.excepthook = _hook
        log.info("Aether %s starting (frozen=%s, argv=%s, log=%s)",
                 getattr(__import__("version"), "__version__", "?"),
                 bool(getattr(sys, "frozen", False)), sys.argv[1:], path)
    except Exception as e:
        log.warning("file logging unavailable: %s", e)

if getattr(sys, "frozen", False):
    HERE = getattr(sys, "_MEIPASS", os.path.dirname(sys.executable))
else:
    HERE = os.path.dirname(os.path.abspath(__file__))
_RUNTIME = os.path.join(HERE, "ui", "index_runtime.html")
_BUNDLE = os.path.join(HERE, "ui", "index.html")
INDEX = _RUNTIME if os.path.exists(_RUNTIME) else _BUNDLE

_UNIT_MM = 0.01


def _mm_to_raw(mm):
    return max(0, round(float(mm) / _UNIT_MM))


def _host_engine_max_fps(board):
    slug = getattr(board, "slug", None)
    if not slug:
        return None
    try:
        with open(boards.REGISTRY_PATH, "r", encoding="utf-8") as f:
            raw = json.load(f)
        for b in raw.get("boards", []):
            if b.get("slug") == slug:
                v = (b.get("lighting") or {}).get("hostEngineMaxFps")
                return int(v) if v else None
    except Exception as e:
        log.warning("hostEngineMaxFps lookup failed for %s: %s", slug, e)
    return None


def _lighting_block(board):
    lt = getattr(board, "lighting", None)
    if lt is None:
        return None
    fps = _host_engine_max_fps(board)
    if fps:
        lt = dict(lt)
        lt["hostEngineMaxFps"] = fps
    return lt


class _FallbackWin68MaxProfile:
    slug = "aula-win68he-max"
    name = "Aula WIN 68 HE Max"
    vid = 0x1CA2
    pid = 0x1901
    vid_pid = "0x1CA2:0x1901"
    form_factor = "65%"
    usage_page = 0xFFA0
    keymap = "ui/layouts/aula-win68he-max.json"
    protocol = "protocol_sparkplay"
    status = "supported"
    drivable = True
    offered = True
    issues = (7,)
    lighting = None
    capabilities = {
        "lighting": True,
        "actuation": True,
        "perKeyRgb": False,
        "rapidTrigger": True,
        "deadzone": True,
        "socd": False,
        "gamepad": True,
        "macros": False,
        "calibration": False,
    }
    actuation = {
        "deadzoneScope": "per_key",
        "travelRange": [0.1, 3.4],
        "rtRange": [0.01, 3.4],
        "deadzoneRange": [0.0, 1.0],
        "switches": [],
    }


class Api:
    _CAP_MAX_REPORTS = 512
    _CAP_MAX_PER_KEY = 6

    def list_hid_devices(self):
        try:
            groups = {}
            order = []
            for d in hid.enumerate():
                iface = d.get("interface_number", -1)
                key = (d.get("vendor_id", 0), d.get("product_id", 0), iface)
                path = d.get("path")
                path = path.decode("utf-8", "replace") if isinstance(path, bytes) else str(path)
                up = f"0x{d.get('usage_page', 0):04x}"
                if key not in groups:
                    order.append(key)
                    groups[key] = {
                        "path": path,
                        "vid": f"0x{d.get('vendor_id', 0):04x}",
                        "pid": f"0x{d.get('product_id', 0):04x}",
                        "manufacturer": d.get("manufacturer_string") or "",
                        "product": d.get("product_string") or "",
                        "usage_page": up,
                        "usage_pages": [up],
                        "interface_number": iface,
                    }
                elif up not in groups[key]["usage_pages"]:
                    groups[key]["usage_pages"].append(up)
            return {"ok": True, "devices": [groups[k] for k in order]}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def _capture_arm_indices(self, vid, pid):
        try:
            if not (self.board and vid and pid):
                return None
            if int(str(vid), 16) != self.board.vid or int(str(pid), 16) != self.board.pid:
                return None
            drv = getattr(self, "driver", None)
            if drv is not None and not drv.supports("travel_stream"):
                return None
            return list(self.km.indices()) if self.km else None
        except Exception:
            return None

    def _arm_capture(self, dev, idxs):
        try:
            drv = getattr(self, "driver", None)
            if drv is not None:
                drv.open_trigger_test(list(idxs))
            else:
                import protocol
                dev.write(protocol.build_open_trigger_test(idxs))
        except Exception:
            pass

    def _disarm_capture(self):
        try:
            drv = getattr(self, "driver", None)
            if drv is not None:
                drv.close_trigger_test()
            else:
                import protocol
                self.dev.write(protocol.build_close_trigger_test())
        except Exception:
            pass

    def open_capture(self, path, vid=None, pid=None):
        try:
            self.stop_capture()
            self._cap_buf = []
            self._cap_t0 = time.time()
            self._cap_lock = threading.Lock()
            self._cap_stop = threading.Event()

            arm_indices = self._capture_arm_indices(vid, pid)
            _dev = getattr(self, "dev", None)
            shared = bool(arm_indices) and _dev is not None and _dev.is_open()
            self._cap_shared = shared
            self._cap_armed = shared

            lock = self._cap_lock
            buf = self._cap_buf
            stop_ev = self._cap_stop
            t0 = self._cap_t0

            if shared:
                if self.reader:
                    try: self.reader.stop()
                    except Exception: pass
                    self.reader = None
                dev = self.dev
                self._arm_capture(dev, arm_indices)

                def loop():
                    last_arm = time.time()
                    kept = 0
                    per_key = {}
                    while not stop_ev.is_set() and kept < self._CAP_MAX_REPORTS:
                        if time.time() - last_arm > 0.8:
                            last_arm = time.time()
                            self._arm_capture(dev, arm_indices)
                        got = False
                        try:
                            with dev._lock:
                                if not dev._dev:
                                    break
                                dev._dev.set_nonblocking(True)
                                for _ in range(256):
                                    r = dev._dev.read(64)
                                    if not r:
                                        break
                                    if len(r) >= 11 and r[1] == 33 and r[5] == 5:
                                        kid = (r[7], r[8])
                                    else:
                                        kid = bytes(r).hex()
                                    if per_key.get(kid, 0) >= self._CAP_MAX_PER_KEY:
                                        continue
                                    per_key[kid] = per_key.get(kid, 0) + 1
                                    with lock:
                                        buf.append({"t": int((time.time() - t0) * 1000), "hex": bytes(r).hex()})
                                    kept += 1
                                    got = True
                                    if kept >= self._CAP_MAX_REPORTS:
                                        break
                        except Exception:
                            time.sleep(0.05); continue
                        if not got:
                            time.sleep(0.01)
            else:
                dev = hid.device()
                dev.open_path(path.encode() if isinstance(path, str) else path)
                dev.set_nonblocking(True)
                self._cap_dev = dev

                def loop():
                    last_hex = None
                    kept = 0
                    while not stop_ev.is_set() and kept < self._CAP_MAX_REPORTS:
                        try:
                            r = dev.read(64, timeout_ms=50)
                        except Exception:
                            break
                        if r:
                            hx = bytes(r).hex()
                            if hx == last_hex:
                                continue
                            last_hex = hx
                            with lock:
                                buf.append({"t": int((time.time() - t0) * 1000), "hex": hx})
                            kept += 1
                        else:
                            time.sleep(0.005)

            self._cap_thread = threading.Thread(target=loop, daemon=True)
            self._cap_thread.start()
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def read_capture(self):
        try:
            buf = getattr(self, "_cap_buf", None)
            if buf is None:
                return {"ok": True, "reports": [], "count": 0}
            with self._cap_lock:
                out = self._cap_buf[:]
                self._cap_buf.clear()
            return {"ok": True, "reports": out, "count": len(out)}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def stop_capture(self):
        try:
            ev = getattr(self, "_cap_stop", None)
            if ev:
                ev.set()
            th = getattr(self, "_cap_thread", None)
            if th:
                th.join(timeout=0.3)
            self._cap_thread = None
            if getattr(self, "_cap_shared", False):
                self._disarm_capture()
                self._restore_shared_reader()
            else:
                dev = getattr(self, "_cap_dev", None)
                if dev:
                    dev.close()
            self._cap_dev = None
            self._cap_shared = False
            self._cap_armed = False
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def __init__(self):
        self.board = None
        self._registry = None
        try:
            reg = boards.load_registry()
            self._registry = reg
            connected = drivers.connected_profiles(reg)
            if connected:
                self.board = connected[0]
            else:
                self.board = reg.by_slug("aula-win68he-max") or reg.default
            log.info("Active board: %s (%s)", self.board.name, self.board.vid_pid)
        except Exception as e:
            log.warning("board registry unavailable, using Aula WIN 68 HE Max fallback: %s", e)
            self.board = _FallbackWin68MaxProfile()
        self._lock = threading.RLock()
        self.dev = AulaDevice(self.board) if self.board else AulaDevice()
        self.driver = drivers.get_driver(self.board, self.dev, self._lock)
        self.pad = None
        self._pad_stop = threading.Event()
        self._pad_thread = None
        try:
            self.km = device_state.KeyMap(self.board.keymap) if self.board else device_state.KeyMap()
        except Exception as e:
            self.km = None
            log.warning("keymap load failed: %s", e)
        protocol_sparkplay.ensure_keymap_populated(self.km)
        try:
            self.connect()
        except Exception:
            pass
        self.fx = (effects.PerKeyEffectEngine(
                       self.km, self._send_frame,
                       max_fps=_host_engine_max_fps(self.board))
                   if self.km else None)
        self.reader = None
        self._reader_users = set()
        self._remaps = {}
        self._pad_map = None
        self.calib_reader = None
        self._calibrating = False
        self._fn_layer_raw = None
        self._trigger_state = {}
        self._deadband_state = {}

    @staticmethod
    def _fail(e):
        out = {"ok": False, "error": str(e)}
        if isinstance(e, UnsupportedFeature):
            out["unsupported"] = True
            out["feature"] = e.feature
        return out

    def connect(self):
        try:
            info = self.driver.connect()
            try:
                self._fn_layer_raw = self.driver.read_keymap_layer(fn_layer=True)
            except UnsupportedFeature:
                self._fn_layer_raw = None
            except Exception as ex:
                log.warning("Fn-layer snapshot failed: %s", ex)
                self._fn_layer_raw = None
            return {"ok": True, "iface": info["interface_number"]}
        except Exception as e:
            return self._fail(e)

    def get_board(self):
        try:
            reg = getattr(self, "_registry", None) or boards.load_registry()
            roster = [
                {"slug": p.slug, "name": p.name, "vidPid": p.vid_pid,
                 "formFactor": p.form_factor, "status": p.status,
                 "capabilities": p.capabilities, "drivable": p.drivable,
                 "issues": list(p.issues)}
                for p in reg.profiles
            ]
        except Exception as e:
            log.warning("get_board roster failed: %s", e)
            p = _FallbackWin68MaxProfile()
            roster = [{"slug": p.slug, "name": p.name, "vidPid": p.vid_pid,
                       "formFactor": p.form_factor, "status": p.status,
                       "capabilities": p.capabilities, "drivable": p.drivable,
                       "issues": list(p.issues)}]
        b = self.board
        active = None if b is None else {
            "slug": b.slug, "name": b.name, "vidPid": b.vid_pid,
            "formFactor": b.form_factor, "status": b.status,
            "capabilities": b.capabilities, "drivable": b.drivable,
            "lighting": _lighting_block(b),
            "actuation": getattr(b, "actuation", None),
        }
        return {"active": active, "boards": roster}

    def list_boards(self):
        try:
            reg = getattr(self, "_registry", None) or boards.load_registry()
            profiles = reg.profiles
        except Exception:
            profiles = [_FallbackWin68MaxProfile()]
        active_slug = self.board.slug if self.board else None
        out = [
            {"slug": p.slug, "name": p.name, "vidPid": p.vid_pid,
             "formFactor": p.form_factor, "status": p.status,
             "capabilities": p.capabilities, "drivable": p.drivable,
             "offered": p.offered,
             "connected": True if p.slug == "aula-win68he-max" and hid.enumerate(0x1CA2, 0x1901) else False,
             "active": p.slug == active_slug}
            for p in profiles
        ]
        return {"ok": True, "boards": out, "active": active_slug}

    def select_board(self, slug):
        try:
            reg = getattr(self, "_registry", None) or boards.load_registry()
            p = reg.by_slug(str(slug))
        except Exception:
            p = _FallbackWin68MaxProfile() if str(slug) == "aula-win68he-max" else None
        if p is None:
            return {"ok": False, "error": f"unknown board: {slug}"}
        try:
            for teardown in (self.stop_capture, self.stop_multicolor,
                             lambda: self.set_gamepad_capture(False)):
                try:
                    teardown()
                except Exception:
                    pass
            if self._calibrating:
                try: self.driver.set_calibration(False)
                except Exception: pass
                self._calibrating = False
            self._stop_readers()
            try:
                self.dev.close()
            except Exception:
                pass
            self.board = p
            self.dev = AulaDevice(p)
            self.driver = drivers.get_driver(p, self.dev, self._lock)
            try:
                self.km = device_state.KeyMap(p.keymap)
            except Exception as e:
                self.km = None
                log.warning("keymap load failed for %s: %s", p.slug, e)
            protocol_sparkplay.ensure_keymap_populated(self.km)
            self.fx = (effects.PerKeyEffectEngine(
                           self.km, self._send_frame,
                           max_fps=_host_engine_max_fps(p))
                       if self.km else None)
            self._remaps = {}
            self._trigger_state = {}
            self._deadband_state = {}
            self._fn_layer_raw = None
            self._idx2code = None
            log.info("Board selected: %s (%s)", p.name, p.vid_pid)
            try: self.connect()
            except Exception: pass
            return {"ok": True, "active": {
                "slug": p.slug, "name": p.name, "vidPid": p.vid_pid,
                "formFactor": p.form_factor, "status": p.status,
                "capabilities": p.capabilities, "drivable": p.drivable,
                "lighting": _lighting_block(p),
                "actuation": getattr(p, "actuation", None),
            }}
        except Exception as e:
            return self._fail(e)

    def read_live(self):
        return self.reader.snapshot() if self.reader else {}

    def status(self):
        return {"connected": self.dev.is_open()}

    def _acquire_reader(self, who, make):
        with self._lock:
            self._reader_users.add(who)
            if self.reader is None and self.km:
                self.reader = make()
                self.reader.start()
            return self.reader

    def _release_reader(self, who):
        r = None
        with self._lock:
            self._reader_users.discard(who)
            if not self._reader_users and self.reader is not None:
                r, self.reader = self.reader, None
        if r is not None:
            try:
                r.stop()
            except Exception:
                pass

    def _restore_shared_reader(self):
        try:
            if not self._reader_users or self.reader is not None or not self.km:
                return
            if not self.dev.is_open():
                return
            self.reader = self.driver.make_live_reader(self.km)
            self.reader.start()
        except Exception as e:
            log.warning("could not restore live reader after capture: %s", e)

    @contextlib.contextmanager
    def _reader_paused(self):
        with self._lock:
            paused = None
            r = getattr(self, "reader", None)
            if r is not None:
                self.reader = None
                try:
                    r.stop()
                except Exception:
                    pass
                paused = r
            try:
                yield
            finally:
                if paused is not None:
                    self._restore_shared_reader()

    def _stop_readers(self):
        stopping = []
        with self._lock:
            self._reader_users.clear()
            for attr in ("reader", "calib_reader"):
                r = getattr(self, attr, None)
                if r is not None:
                    setattr(self, attr, None)
                    stopping.append(r)
        for r in stopping:
            try:
                r.stop()
            except Exception:
                pass

    def disconnect(self):
        self.stop_multicolor()
        self.set_gamepad_capture(False)
        if self._calibrating:
            try:
                self.driver.set_calibration(False)
            except Exception:
                pass
            self._calibrating = False
        self._stop_readers()
        self.dev.close()
        return {"ok": True}

    def set_light(self, mode, r, g, b, brightness=4, speed=4,
                  bg_r=0, bg_g=0, bg_b=0, direction=0, power_on=True, full_color=0):
        try:
            self.driver.set_lighting(
                int(mode), (int(r), int(g), int(b)),
                bg=(int(bg_r), int(bg_g), int(bg_b)),
                brightness=int(brightness), speed=int(speed),
                direction=int(direction), full_color=int(full_color),
                power_on=bool(power_on))
            return {"ok": True}
        except Exception as e:
            return self._fail(e)

    def set_color(self, r, g, b, brightness=4, mode=0, speed=4):
        return self.set_light(mode, r, g, b, brightness, speed)

    _TRIGGER_MODES = {0, 1, 2, 12, 13, 14, 98, 99}

    def _clamp_mm(self, range_key, mm):
        mm = float(mm)
        rng = (getattr(self.board, "actuation", None) or {}).get(range_key)
        if rng:
            lo, hi = float(rng[0]), float(rng[1])
            mm = min(hi, max(lo, mm))
        return mm

    def set_trigger_all(self, travel_mm, rt_press_mm=0.0, rt_release_mm=0.0,
                        key_count=64, mode=0):
        try:
            mode = int(mode)
            if mode not in self._TRIGGER_MODES:
                return {"ok": False, "error": f"invalid trigger mode {mode}"}
            km = getattr(self, "km", None)
            idxs = list(km.indices()) if km else list(range(int(key_count)))
            if mode == 0:
                with self._reader_paused():
                    self.driver.set_actuation(idxs, 0, float(travel_mm), None, None)
            else:
                self.driver.set_actuation(idxs, mode,
                                          float(travel_mm), float(rt_press_mm),
                                          float(rt_release_mm))
            return {"ok": True, "keys": len(idxs)}
        except Exception as e:
            return self._fail(e)

    def open_analog(self, key_count=64):
        return self.open_analog_codes([])

    def open_analog_codes(self, codes=None):
        try:
            if self.km:
                idxs = self.km.indices_for_codes(codes or []) if codes else self.km.indices()
                if not idxs:
                    idxs = self.km.indices()
                with self._lock:
                    others = self._reader_users - {"analog"}
                    self._reader_users.add("analog")
                    if others and len(idxs) < len(self.km.indices()):
                        idxs = self.km.indices()
                    old, self.reader = self.reader, None
                    if old:
                        old.stop()
                    self.reader = self.driver.make_live_reader(self.km, idxs)
                    self.reader.start()
            else:
                self.driver.open_trigger_test(list(range(64)))
            return {"ok": True, "keys": len(idxs) if self.km else 64}
        except Exception as e:
            return self._fail(e)

    def close_analog(self):
        try:
            if "analog" in self._reader_users or self.reader is not None:
                self._release_reader("analog")
            else:
                self.driver.close_trigger_test()
            return {"ok": True}
        except Exception as e:
            return self._fail(e)

    _POLL_CODES = (1, 2, 4, 8)

    def set_poll(self, rate):
        try:
            code = int(rate)
            if code not in self._POLL_CODES:
                return {"ok": False,
                        "error": f"invalid poll-rate code {rate}"}
            self.driver.set_poll_rate(code)
            return {"ok": True}
        except Exception as e:
            return self._fail(e)

    def _flush_triggers(self, edited_idxs=None):
        if not self._trigger_state:
            return
        edited = set(edited_idxs) if edited_idxs else None
        groups = {}
        for idx, cfg in self._trigger_state.items():
            groups.setdefault(cfg, []).append(idx)
        for cfg, idxs in groups.items():
            target_idxs = [i for i in idxs if i in edited] if edited is not None else list(idxs)
            if not target_idxs:
                continue
            mode, travel, i1, i2 = cfg
            self.driver.set_actuation(target_idxs, int(mode),
                                      travel * _UNIT_MM,
                                      None if i1 is None else i1 * _UNIT_MM,
                                      None if i2 is None else i2 * _UNIT_MM)
            threading.Event().wait(0.005)

    def set_trigger_codes(self, codes, travel_mm, rt_press_mm=0.0, rt_release_mm=0.0, mode=0):
        if not self.km:
            return {"ok": False, "error": "no keymap"}
        idxs = self.km.indices_for_codes(codes) if codes else []
        if not idxs:
            return {"ok": False, "error": "no keys"}
        mode = int(mode)
        if mode not in self._TRIGGER_MODES:
            return {"ok": False, "error": f"invalid trigger mode {mode}"}
        travel_mm = self._clamp_mm("travelRange", travel_mm)
        if mode not in (0, 98, 99):
            rt_press_mm = self._clamp_mm("rtRange", rt_press_mm)
            rt_release_mm = self._clamp_mm("rtRange", rt_release_mm)
            cfg = (mode,
                   _mm_to_raw(travel_mm),
                   _mm_to_raw(rt_press_mm),
                   _mm_to_raw(rt_release_mm))
        else:
            cfg = (mode, _mm_to_raw(travel_mm), None, None)
        for i in idxs:
            self._trigger_state[i] = cfg
        try:
            with self._reader_paused():
                self._flush_triggers(edited_idxs=idxs)
            return {"ok": True, "keys": len(idxs), "idxs": sorted(idxs)}
        except Exception as e:
            return self._fail(e)

    def verify_actuation(self, codes):
        if not self.km or not self.dev.is_open():
            return {"ok": False, "error": "not connected"}
        try:
            with self._reader_paused():
                vals_by_name = self.driver.read_actuation(self.km)
            all_by_code = {}
            for design_code, idx in self.km.index_of_code.items():
                name = self.km.by_index[idx]["name"]
                mm = vals_by_name.get(name)
                if mm is not None:
                    all_by_code[design_code] = mm
            if codes:
                out = {c: all_by_code.get(c) for c in codes if c in all_by_code}
            else:
                out = all_by_code
            return {"ok": True, "actuation_mm": out}
        except Exception as e:
            return self._fail(e)

    def set_custom_colors(self, colors_by_code, brightness=4, speed=4):
        if not self.km:
            return {"ok": False, "error": "no keymap"}
        colors_by_index = {}
        for code, rgb in (colors_by_code or {}).items():
            idx = self.km.index_of_code.get(code)
            if idx is not None and rgb and len(rgb) >= 3:
                colors_by_index[idx] = tuple(int(c) for c in rgb[:3])
        if not colors_by_index:
            return {"ok": False, "error": "no colors"}
        try:
            self.driver.set_per_key_rgb(colors_by_index,
                                        brightness=int(brightness),
                                        speed=int(speed))
            return {"ok": True, "keys": len(colors_by_index)}
        except Exception as e:
            return self._fail(e)

    def set_deadband_codes(self, codes, top_mm=0.20, bottom_mm=0.20):
        if not self.km:
            return {"ok": False, "error": "no keymap"}
        idxs = self.km.indices_for_codes(codes) if codes else []
        scope = getattr(self.driver, "DEADBAND_SCOPE", "per-key")
        if scope == "global" and not idxs:
            idxs = list(getattr(self.km, "by_index", {}).keys())
        if not idxs and scope != "global":
            return {"ok": False, "error": "no keys"}
        top_mm = self._clamp_mm("deadzoneRange", top_mm)
        bottom_mm = self._clamp_mm("deadzoneRange", bottom_mm)
        top = _mm_to_raw(top_mm)
        bottom = _mm_to_raw(bottom_mm)
        for i in idxs:
            self._deadband_state[i] = (top, bottom)
        try:
            with self._reader_paused():
                self.driver.set_deadband(dict(self._deadband_state),
                                         top_mm=float(top_mm),
                                         bottom_mm=float(bottom_mm))
            written = len(idxs)
            if scope == "global" and not written:
                try:
                    written = len(self.km.indices())
                except Exception:
                    written = 0
            return {"ok": True, "keys": written, "scope": scope}
        except Exception as e:
            return self._fail(e)

    def _resolve_switch_code(self, switch_id):
        table = (getattr(self.board, "actuation", None) or {}).get("switches") or ()
        by_id, codes = {}, set()
        for s in table:
            if not isinstance(s, dict) or s.get("code") is None:
                continue
            codes.add(int(s["code"]))
            if s.get("id") is not None:
                by_id[str(s["id"])] = int(s["code"])
        name = getattr(self.board, "name", None) or "this board"
        if isinstance(switch_id, str) and switch_id.strip() not in by_id:
            try:
                switch_id = int(switch_id.strip())
            except (TypeError, ValueError):
                return None, f"unknown switch {switch_id!r} for {name}"
        elif isinstance(switch_id, str):
            return by_id[switch_id.strip()], None
        try:
            code = int(switch_id)
        except (TypeError, ValueError):
            return None, f"invalid switch id {switch_id!r}"
        if codes and code not in codes:
            return None, f"switch code {code} is not declared by {name}"
        return code, None

    def set_switch_codes(self, codes, switch_id=1):
        if not self.km:
            return {"ok": False, "error": "no keymap"}
        idxs = self.km.indices_for_codes(codes) if codes else self.km.indices()
        if not idxs:
            return {"ok": False, "error": "no keys"}
        code, err = self._resolve_switch_code(switch_id)
        if err:
            return {"ok": False, "error": err}
        table = {idx: code for idx in idxs}
        try:
            with self._reader_paused():
                self.driver.set_switch(table)
            return {"ok": True, "keys": len(idxs), "code": code}
        except Exception as e:
            return self._fail(e)

    def _flush_remaps(self, restore_indices=()):
        defaults = {i: self.km.by_index[i]["hid"] for i in self.km.by_index}
        with self._reader_paused():
            self.driver.write_keymap(defaults, dict(self._remaps),
                                     self.km.layer_indices, self._fn_layer_raw,
                                     restore_indices=list(restore_indices))

    def set_remap(self, codes, target_hid):
        if not self.km:
            return {"ok": False, "error": "no keymap"}
        idxs = self.km.indices_for_codes(codes) if codes else []
        if not idxs:
            return {"ok": False, "error": "no keys selected"}
        try:
            for i in idxs:
                self._remaps[i] = int(target_hid) & 0xFF
            self._flush_remaps()
            return {"ok": True, "keys": len(idxs)}
        except Exception as e:
            return self._fail(e)

    def reset_remap(self, codes):
        if not self.km:
            return {"ok": False, "error": "no keymap"}
        try:
            if not codes:
                restore = set(self._remaps)
                self._remaps = {}
            else:
                restore = set(self.km.indices_for_codes(codes))
                for i in restore:
                    self._remaps.pop(i, None)
            self._flush_remaps(restore_indices=restore)
            return {"ok": True}
        except Exception as e:
            return self._fail(e)

    def set_socd(self, pairs):
        if not self.km:
            return {"ok": False, "error": "no keymap"}
        try:
            plist = []
            for p in pairs:
                key1_hid = self.km.hid_for_code(p["key1"])
                key2_hid = self.km.hid_for_code(p["key2"])
                if not key1_hid or not key2_hid:
                    return {"ok": False, "error": f"unknown SOCD key: {p}"}
                plist.append({"model": int(p["model"]), "key1_hid": key1_hid, "key2_hid": key2_hid})
            self.driver.set_socd(plist)
            return {"ok": True}
        except Exception as e:
            return self._fail(e)

    def _render_calib(self, calibrated):
        if not self.km:
            return
        lit = set()
        for c in calibrated:
            idx = self.km.index_of_code.get(c)
            if idx is not None:
                lit.add(idx)
        colors = {idx: ((0, 255, 0) if idx in lit else (6, 10, 8))
                  for idx in self.km.indices()}
        try:
            self.driver.stream_frame(colors, force=True)
        except UnsupportedFeature:
            pass

    def calibrate(self, start, any_key=False):
        try:
            if start:
                self.driver.set_calibration(True, bool(any_key))
                self._calibrating = True
                self.calib_reader = self.driver.make_calibration_reader(self.km)
                self.calib_reader.start()
            else:
                if self.calib_reader:
                    self.calib_reader.stop()
                    self.calib_reader = None
                self.driver.set_calibration(False, bool(any_key))
                self._calibrating = False
            return {"ok": True}
        except Exception as e:
            return self._fail(e)

    def read_calibrated(self):
        if not self.calib_reader:
            return {"ok": True, "codes": [], "done": False}
        return {"ok": True, "codes": self.calib_reader.snapshot(),
                "done": bool(self.calib_reader.done)}

    def gamepad_mode(self, on):
        try:
            self.driver.set_gamepad_mode(bool(on))
            return {"ok": True}
        except Exception as e:
            return self._fail(e)

    def set_gamepad_capture(self, on):
        if not on:
            self._pad_stop.set()
            if self._pad_thread:
                self._pad_thread.join(timeout=0.7)
            self._pad_thread = None
            if self.pad:
                self.pad.close()
            self.pad = None
            self._release_reader("gamepad")
            return {"ok": True}
        try:
            if self.pad is None:
                self.pad = gamepad.VirtualGamepad(self._pad_map).open()
            self._acquire_reader("gamepad",
                                 lambda: self.driver.make_live_reader(self.km))
            self._pad_stop.clear()
            if not self._pad_thread or not self._pad_thread.is_alive():
                self._pad_thread = threading.Thread(target=self._gamepad_loop,
                                                    name="aether-gamepad", daemon=True)
                self._pad_thread.start()
            return {"ok": True}
        except Exception as e:
            if self.pad:
                self.pad.close()
                self.pad = None
            self._release_reader("gamepad")
            msg = str(e)
            need_driver = (sys.platform.startswith("win")
                           and gamepad.EVDEV_AVAILABLE
                           and "ViGEmBus" in msg)
            return dict(self._fail(e), needs_vigembus=need_driver)

    def set_gamepad_map(self, mappings):
        try:
            kms = [gamepad.KeyMap(
                       str(m.get("key", "")), str(m.get("axis", "LX")),
                       int(m.get("direction", 1)), float(m.get("threshold_mm", 1.5)))
                   for m in (mappings or []) if m.get("key") and m.get("axis")]
            bad = sorted({k.axis for k in kms if k.axis not in gamepad.KNOWN_AXES})
            if bad:
                return {"ok": False, "error": f"unknown gamepad control(s): {', '.join(bad)}"}
            self._pad_map = kms or None
            if self.pad:
                was_on = self._pad_thread and self._pad_thread.is_alive()
                self.set_gamepad_capture(False)
                if was_on:
                    return self.set_gamepad_capture(True)
            return {"ok": True, "count": len(kms)}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def gamepad_status(self):
        return {"ok": True,
                "capturing": bool(self._pad_thread and self._pad_thread.is_alive()),
                "evdev": gamepad.EVDEV_AVAILABLE,
                "platform": sys.platform,
                "vigembus": gamepad.vigembus_present() if sys.platform.startswith("win") else None,
                "can_install_vigembus": bool(
                    sys.platform.startswith("win") and gamepad._vigembus_installer_path()
                )}

    def install_vigembus(self):
        return gamepad.install_vigembus_driver()

    _AUTOSTART_KEY = r"Software\Microsoft\Windows\CurrentVersion\Run"
    _AUTOSTART_NAME = "AetherHE"

    def _autostart_target(self):
        if getattr(sys, "frozen", False):
            return f'"{sys.executable}"'
        py = sys.executable.replace("python.exe", "pythonw.exe")
        return f'"{py}" "{os.path.join(HERE, "app_web.py")}"'

    def get_autostart(self):
        if not sys.platform.startswith("win"):
            return {"ok": True, "enabled": False, "supported": False}
        try:
            import winreg
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, self._AUTOSTART_KEY) as k:
                val, _ = winreg.QueryValueEx(k, self._AUTOSTART_NAME)
                return {"ok": True, "supported": True, "enabled": True, "command": val}
        except FileNotFoundError:
            return {"ok": True, "supported": True, "enabled": False}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def _settings_path(self):
        return os.path.join(user_data_dir(), "settings.json")

    def load_settings(self):
        try:
            import json
            with open(self._settings_path(), "r", encoding="utf-8") as f:
                return {"ok": True, "settings": json.load(f)}
        except FileNotFoundError:
            return {"ok": True, "settings": None}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def save_settings(self, settings):
        try:
            import json
            path = self._settings_path()
            existing = {}
            try:
                with open(path, encoding="utf-8") as f:
                    loaded = json.load(f)
                if isinstance(loaded, dict):
                    existing = loaded
            except (OSError, ValueError):
                existing = {}
            merged = dict(existing)
            merged.update(settings or {})
            with open(path, "w", encoding="utf-8") as f:
                json.dump(merged, f, indent=2)
            return {"ok": True, "path": path}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def settings_info(self):
        p = self._settings_path()
        return {"ok": True, "path": p, "exists": os.path.exists(p)}

    def get_tray_prefs(self):
        return {"ok": True, "supported": tray.backend_supported(),
                "startMinimized": tray.start_minimized_pref(self._settings_path())}

    def set_start_minimized(self, on):
        try:
            val = tray.set_start_minimized_pref(self._settings_path(), bool(on))
            return {"ok": True, "startMinimized": val}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def tray_sync(self, state):
        if not isinstance(state, dict):
            return {"ok": False, "error": "state must be an object"}
        cur = dict(getattr(self, "_tray_state", None) or {})
        cur.update({
            "pattern": state.get("pattern"),
            "speed": state.get("speed", cur.get("speed", 60)),
            "connected": bool(state.get("connected")),
            "board": state.get("board"),
            "effects": [
                {"id": str(e.get("id")), "label": str(e.get("label") or e.get("id")),
                 "icon": str(e.get("icon") or "")}
                for e in (state.get("effects") or []) if isinstance(e, dict) and e.get("id")
            ],
        })
        self._tray_state = cur
        return {"ok": True}

    def _key_indices(self, codes):
        if not self.km:
            raise ValueError("no keymap loaded for the active board")
        idxs = self.km.indices_for_codes(codes if isinstance(codes, (list, tuple)) else [codes])
        if not idxs or len(idxs) != len(codes if isinstance(codes, (list, tuple)) else [codes]):
            raise ValueError(f"could not resolve every key: {codes!r}")
        return idxs

    def _adv(self, fn, *args, **kwargs):
        drv = getattr(self, "driver", None)
        if drv is None:
            return {"ok": False, "error": "not connected"}
        try:
            result = fn(drv, *args, **kwargs)
            return {"ok": True, "result": result}
        except UnsupportedFeature as e:
            return {"ok": False, "error": str(e), "unsupported": True,
                    "feature": getattr(e, "feature", None)}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def read_key_records(self):
        return self._adv(lambda d: d.read_key_records())

    def set_key_remap(self, code, hid_usage, modifiers=0):
        try:
            idx = self._key_indices([code])[0]
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        return self._adv(lambda d: d.set_key_remap(idx, int(hid_usage), int(modifiers)))

    def set_advanced_socd(self, code_a, code_b, hid_a, hid_b, mode=3):
        try:
            ia, ib = self._key_indices([code_a, code_b])
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        return self._adv(lambda d: d.set_advanced_socd(ia, ib, int(hid_a), int(hid_b), int(mode)))

    def set_advanced_rs(self, code_a, code_b, hid_a, hid_b):
        try:
            ia, ib = self._key_indices([code_a, code_b])
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        return self._adv(lambda d: d.set_advanced_rs(ia, ib, int(hid_a), int(hid_b)))

    def set_advanced_mt(self, code, delay, tap_hid=0, hold_hid=0):
        try:
            idx = self._key_indices([code])[0]
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        return self._adv(lambda d: d.set_advanced_mt(idx, int(delay), int(tap_hid), int(hold_hid)))

    def set_advanced_tgl(self, code, hid_usage=0):
        try:
            idx = self._key_indices([code])[0]
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        return self._adv(lambda d: d.set_advanced_tgl(idx, int(hid_usage)))

    def clear_advanced_key(self, code):
        try:
            idx = self._key_indices([code])[0]
        except ValueError as e:
            return {"ok": False, "error": str(e)}
        return self._adv(lambda d: d.clear_advanced_key(idx))

    MACRO_NAMES_KEY = "macroNames"
    MACRO_NAME_MAX = 32

    def _keymap_context(self):
        km = getattr(self, "km", None)
        if not km:
            return {}
        return {
            "default_hids": {i: km.by_index[i]["hid"] for i in km.by_index},
            "layer_indices": set(km.layer_indices),
            "overrides": dict(getattr(self, "_remaps", None) or {}),
            "fn_layer_raw": getattr(self, "_fn_layer_raw", None),
        }

    def _macro_names(self):
        r = self.load_settings()
        s = r.get("settings") if r.get("ok") else None
        names = (s or {}).get(self.MACRO_NAMES_KEY) if isinstance(s, dict) else None
        return dict(names) if isinstance(names, dict) else {}

    def _set_macro_name(self, slot, name):
        names = self._macro_names()
        if name:
            names[str(int(slot))] = name
        else:
            names.pop(str(int(slot)), None)
        r = self.save_settings({self.MACRO_NAMES_KEY: names})
        if not r.get("ok"):
            raise RuntimeError("could not persist macro name: %s" % r.get("error"))

    @staticmethod
    def _macro_events_json(events):
        return [{"delay": int(d), "hid": int(h), "down": bool(down)}
                for d, h, down in events]

    @staticmethod
    def _macro_events(events, drv):
        out = []
        for ev in list(events or ()):
            if isinstance(ev, dict):
                delay, hid, down = ev.get("delay", 0), ev.get("hid"), ev.get("down")
            else:
                delay, hid, down = ev
            try:
                delay, hid = int(delay), int(hid)
            except (TypeError, ValueError):
                raise ValueError("macro event needs integer delay and hid: %r" % (ev,))
            if not 0 <= hid <= 0xFF:
                raise ValueError("macro HID usage must be 0..255, got %d" % hid)
            if not 0 <= delay <= drv.MACRO_MAX_DELAY_MS:
                raise ValueError("macro delay must be 0..%d ms, got %d"
                                 % (drv.MACRO_MAX_DELAY_MS, delay))
            out.append((delay, hid, bool(down)))
        if len(out) > drv.MACRO_MAX_EVENTS:
            raise ValueError("macro too long: max %d events" % drv.MACRO_MAX_EVENTS)
        return out

    @staticmethod
    def _macro_slot(slot, drv):
        if not drv.supports("macros"):
            raise UnsupportedFeature(drv.name, "macros")
        slot = int(slot)
        if not 0 <= slot < drv.MACRO_SLOTS:
            raise ValueError("macro slot must be 0..%d" % (drv.MACRO_SLOTS - 1))
        return slot

    @staticmethod
    def _macro_playback(play_mode, repeat_count, drv):
        if play_mode is not None:
            play_mode = int(play_mode)
            if play_mode not in drv.MACRO_PLAY_MODES:
                raise ValueError("play mode must be one of %s"
                                 % (list(drv.MACRO_PLAY_MODES),))
        if repeat_count is not None:
            repeat_count = int(repeat_count)
            if not 1 <= repeat_count <= drv.MACRO_MAX_REPEAT:
                raise ValueError("repeat count must be 1..%d" % drv.MACRO_MAX_REPEAT)
        return play_mode, repeat_count

    def _macro_json(self, slot, m, names):
        events = m["events"] if isinstance(m, dict) else list(m or [])
        out = {"slot": int(slot), "name": names.get(str(int(slot)), ""),
               "events": self._macro_events_json(events)}
        if isinstance(m, dict):
            out["play_mode"] = int(m.get("play_mode", 0))
            out["repeat_count"] = int(m.get("repeat_count", 1))
        return out

    def _macro_bindings_by_code(self):
        binds = self.driver.read_macro_bindings()
        out = {}
        for idx, slot in binds.items():
            code = self.km.code_of(int(idx)) if self.km else None
            out[code or ("idx%d" % idx)] = int(slot)
        return out

    def list_macros(self):
        drv = getattr(self, "driver", None)
        if drv is None:
            return {"ok": False, "error": "not connected"}
        try:
            names = self._macro_names()
            with self._reader_paused():
                stored = drv.list_macros()
                macros = [self._macro_json(s, m, names) for s, m in sorted(stored.items())]
                out = {"ok": True, "macros": macros,
                       "slots": drv.MACRO_SLOTS,
                       "max_events": drv.MACRO_MAX_EVENTS,
                       "max_delay_ms": drv.MACRO_MAX_DELAY_MS,
                       "max_repeat": drv.MACRO_MAX_REPEAT,
                       "play_modes": list(drv.MACRO_PLAY_MODES)}
                try:
                    out["bindings"] = self._macro_bindings_by_code()
                except UnsupportedFeature:
                    out["bindings"] = None
                except Exception as e:
                    out["bindings"] = None
                    out["bindings_error"] = str(e)
            return out
        except Exception as e:
            return self._fail(e)

    def read_macro(self, slot):
        drv = getattr(self, "driver", None)
        if drv is None:
            return {"ok": False, "error": "not connected"}
        try:
            slot = self._macro_slot(slot, drv)
            with self._reader_paused():
                m = drv.read_macro(slot)
            return {"ok": True,
                    "macro": None if m is None else self._macro_json(slot, m, self._macro_names())}
        except Exception as e:
            return self._fail(e)

    def save_macro(self, slot, name, events, play_mode=0, repeat_count=1):
        drv = getattr(self, "driver", None)
        if drv is None:
            return {"ok": False, "error": "not connected"}
        try:
            slot = self._macro_slot(slot, drv)
            evs = self._macro_events(events, drv)
            if not evs:
                raise ValueError("a macro needs at least one event")
            play_mode, repeat_count = self._macro_playback(
                0 if play_mode is None else play_mode,
                1 if repeat_count is None else repeat_count, drv)
            name = str(name or "").strip()[:self.MACRO_NAME_MAX]
            drv.write_macro(slot, evs, play_mode=play_mode, repeat_count=repeat_count)
            self._set_macro_name(slot, name)
            return {"ok": True, "slot": slot, "events": len(evs)}
        except Exception as e:
            return self._fail(e)

    def delete_macro(self, slot):
        drv = getattr(self, "driver", None)
        if drv is None:
            return {"ok": False, "error": "not connected"}
        try:
            slot = self._macro_slot(slot, drv)
            released = []
            with self._lock, self._reader_paused():
                try:
                    binds = drv.read_macro_bindings()
                except UnsupportedFeature:
                    binds = {}
                ctx = self._keymap_context()
                for idx, s in binds.items():
                    if int(s) == slot:
                        drv.unbind_key(int(idx), **ctx)
                        released.append(self.km.code_of(int(idx)) if self.km else int(idx))
                drv.write_macro(slot, None)
            self._set_macro_name(slot, "")
            return {"ok": True, "slot": slot, "released": released}
        except Exception as e:
            return self._fail(e)

    def bind_macro(self, code, slot, play_mode=None, repeat_count=None):
        drv = getattr(self, "driver", None)
        if drv is None:
            return {"ok": False, "error": "not connected"}
        try:
            idx = self._key_indices([code])[0]
            slot = self._macro_slot(slot, drv)
            play_mode, repeat_count = self._macro_playback(play_mode, repeat_count, drv)
            with self._reader_paused():
                drv.bind_macro(idx, slot, play_mode, repeat_count, **self._keymap_context())
            return {"ok": True, "code": code, "index": idx, "slot": slot}
        except Exception as e:
            return self._fail(e)

    def unbind_macro(self, code):
        drv = getattr(self, "driver", None)
        if drv is None:
            return {"ok": False, "error": "not connected"}
        try:
            idx = self._key_indices([code])[0]
            with self._reader_paused():
                drv.unbind_key(idx, **self._keymap_context())
            return {"ok": True, "code": code, "index": idx}
        except Exception as e:
            return self._fail(e)

    def _submissions_dir(self):
        base = os.path.dirname(self._settings_path())
        d = os.path.join(base, "submissions")
        os.makedirs(d, exist_ok=True)
        return d

    def save_submission(self, obj):
        meta = obj.get("meta")
        if isinstance(meta, dict):
            for k in ("brand", "model", "form_factor"):
                if isinstance(meta.get(k), str):
                    meta[k] = meta[k].strip()
        errors = board_submission.validate_submission(obj)
        if errors:
            return {"ok": False, "errors": errors}
        try:
            slug = "".join(c for c in (obj.get("meta", {}).get("model", "board")).lower()
                           if c.isalnum() or c == "-") or "board"
            fn = f"board-{slug}-{time.strftime('%Y%m%d-%H%M%S')}.json"
            path = os.path.join(self._submissions_dir(), fn)
            with open(path, "w", encoding="utf-8") as f:
                json.dump(obj, f, indent=2)
            return {"ok": True, "path": path}
        except Exception as e:
            return {"ok": False, "errors": [str(e)]}

    def open_submission_url(self, url):
        try:
            import webbrowser
            webbrowser.open(str(url))
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def app_version(self):
        import version
        return {"ok": True, "version": version.__version__, "kind": updater.platform_kind()}

    def check_update(self):
        return updater.check_for_update()

    def get_auto_update(self):
        return {"ok": True, "autoUpdate": updater.get_auto_update(self._settings_path())}

    def set_auto_update(self, on):
        try:
            val = updater.set_auto_update(self._settings_path(), bool(on))
            return {"ok": True, "autoUpdate": val}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def update_progress(self):
        return {"ok": True, **updater.get_progress()}

    def apply_update(self, asset_url, asset_name=None, asset_size=None, asset_sha256=None):
        res = updater.apply_update(asset_url, asset_name, asset_size, asset_sha256)
        if res.get("ok") and res.get("quit"):
            def _bye():
                threading.Event().wait(0.6)
                os._exit(0)
            threading.Thread(target=_bye, daemon=True).start()
        return res

    def reveal_settings(self):
        p = self._settings_path()
        d = os.path.dirname(p)
        try:
            if sys.platform.startswith("win"):
                os.startfile(d)
            elif sys.platform == "darwin":
                import subprocess; subprocess.Popen(["open", d])
            else:
                import subprocess; subprocess.Popen(["xdg-open", d])
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def set_autostart(self, on):
        if not sys.platform.startswith("win"):
            return {"ok": False, "error": "autostart is Windows-only"}
        try:
            import winreg
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, self._AUTOSTART_KEY,
                                0, winreg.KEY_SET_VALUE) as k:
                if on:
                    winreg.SetValueEx(k, self._AUTOSTART_NAME, 0, winreg.REG_SZ,
                                      self._autostart_target())
                else:
                    try: winreg.DeleteValue(k, self._AUTOSTART_NAME)
                    except FileNotFoundError: pass
            return {"ok": True, "enabled": bool(on)}
        except Exception as e:
            return {"ok": False, "error": str(e)}

    def _gamepad_loop(self):
        stop = self._pad_stop
        while not stop.wait(1 / 120):
            try:
                pad, reader = self.pad, self.reader
                if pad is not None and reader is not None:
                    pad.update(reader.snapshot())
            except Exception as e:
                log.warning("gamepad capture stopped: %s", e)
                break

    _HEX_BYTE = re.compile(r"^(?:0[xX])?[0-9a-fA-F]{1,2}$")

    def send_raw(self, hex_str):
        try:
            tokens = str(hex_str or "").replace(",", " ").split()
            if not tokens:
                return {"ok": False, "error": "empty report"}
            payload = []
            for t in tokens:
                if not self._HEX_BYTE.match(t):
                    return {"ok": False,
                            "error": f"invalid hex byte {t!r}"}
                payload.append(int(t, 16))
            if len(payload) > 64:
                return {"ok": False,
                        "error": f"report too long: {len(payload)} bytes"}
            payload += [0] * (64 - len(payload))
            self.driver.send_raw(payload)
            return {"ok": True}
        except Exception as e:
            return self._fail(e)

    def _send_frame(self, colors_by_index):
        if not self.dev.is_open():
            return
        try:
            self.driver.stream_frame(colors_by_index)
        except Exception:
            pass

    def _ensure_reactive(self, modes):
        if not self.fx:
            return
        if any(m in effects.PRESS_REACTIVE for m in modes):
            try:
                self._acquire_reader(
                    "reactive", lambda: self.driver.make_live_reader(self.km))
            except UnsupportedFeature:
                pass
            if self.reader is None:
                self.fx.get_depths = None
                return
            km = self.km

            def get_depths():
                rdr = self.reader
                if rdr is None:
                    return {}
                by_idx = getattr(rdr, "snapshot_by_index", None)
                if by_idx is not None:
                    return by_idx()
                idx_of = km.index_of_code
                return {idx_of[c]: mm for c, mm in rdr.snapshot().items()
                        if c in idx_of}

            self.fx.get_depths = get_depths
        else:
            self.fx.get_depths = None
            self._release_reader("reactive")

    def get_light_frame(self):
        if not self.fx or not self.fx.is_running():
            return {}
        out = {}
        for idx, rgb in list(self.fx.last_frame.items()):
            for a in protocol_sparkplay.AULA_WIN68_ALIASES.get(idx, ()):
                out[a] = rgb
            if self.km and idx in self.km.by_index:
                c = self.km.by_index[idx].get("code")
                if c:
                    out[c] = rgb
        return out

    def start_multicolor(self, pattern, colors, bg=(0, 0, 0), brightness=80,
                         speed=60, direction=0, orient="v"):
        if not self.fx:
            return {"ok": False, "error": "no keymap"}
        try:
            self.driver.begin_host_stream()
            self._ensure_reactive([str(pattern)])
            pal = [tuple(int(c) for c in p[:3]) for p in (colors or []) if p]
            self.fx.start(str(pattern), pal or [(255, 255, 255)],
                          tuple(int(c) for c in (bg or (0, 0, 0))[:3]),
                          float(speed) / 100.0, float(brightness) / 100.0,
                          int(direction), str(orient))
            return {"ok": True, "keys": len(self.fx.indices)}
        except Exception as e:
            return self._fail(e)

    def start_zones(self, zones):
        if not self.fx:
            return {"ok": False, "error": "no keymap"}
        try:
            norm = []
            for z in (zones or []):
                idxs = [self.km.index_of_code[c] for c in z.get("codes", [])
                        if c in self.km.index_of_code]
                if not idxs:
                    continue
                norm.append({
                    "indices": idxs,
                    "mode": str(z.get("mode", "wave")),
                    "palette": [tuple(int(c) for c in p[:3]) for p in (z.get("colors") or []) if p]
                               or [(255, 255, 255)],
                    "bg": tuple(int(c) for c in (z.get("bg") or (0, 0, 0))[:3]),
                    "speed": float(z.get("speed", 60)) / 100.0,
                    "bright": float(z.get("brightness", 80)) / 100.0,
                    "direction": int(z.get("direction", 0)),
                    "orient": str(z.get("orient", "v")),
                })
            if not norm:
                return {"ok": False, "error": "no zones"}
            self.driver.begin_host_stream()
            self._ensure_reactive([z["mode"] for z in norm])
            gbg = norm and norm[0].get("bg") or (0, 0, 0)
            self.fx.start_zones(norm, global_bg=gbg)
            return {"ok": True, "zones": len(norm)}
        except Exception as e:
            return self._fail(e)

    def stop_multicolor(self):
        if self.fx and self.fx.is_running():
            self.fx.stop()
            try:
                self.driver.end_host_stream()
            except Exception:
                pass
        return {"ok": True}

    def stop_effect(self):
        return self.stop_multicolor()

    @staticmethod
    def _hex(h):
        h = h.lstrip("#")
        return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


NATIVE_JS = r"""
(() => {
  function isEditable(el) {
    return !!el && !!el.closest('input, textarea, select, [contenteditable="true"]');
  }
  ['keydown', 'keyup', 'keypress'].forEach(type => {
    window.addEventListener(type, e => {
      if (!isEditable(e.target)) { e.preventDefault(); e.stopImmediatePropagation(); }
    }, true);
  });

  console.log('AETHER native shell: key-suppression ready');
})();
"""


def _on_start(window):
    import time
    time.sleep(1.5)
    try:
        window.evaluate_js(NATIVE_JS)
    except Exception as e:
        log.warning("native inject failed: %s", e)
    time.sleep(0.8)
    try:
        state = window.evaluate_js("""
          (() => ({
            ready: document.readyState,
            rootChildren: document.getElementById('root') ? document.getElementById('root').children.length : -1,
            react: !!window.React,
            reactDOM: !!window.ReactDOM,
            bridge: !!(window.pywebview && window.pywebview.api),
            errors: (window.__aetherErrors || []).slice(0, 5),
            text: (document.body && document.body.innerText || '').slice(0, 160)
          }))()
        """)
        log.info("Webview render state: %s", state)
    except Exception as e:
        log.warning("render-state probe failed: %s", e)


def main():
    if not os.path.exists(INDEX):
        raise SystemExit(f"UI not found: {INDEX}")
    _install_file_logging()
    inst = single_instance.SingleInstance()
    if not inst.acquire():
        if inst.poke_existing():
            log.info("Aether is already running — brought its window up")
        else:
            log.warning("Aether is already running but could not be reached")
            inst.notify_unreachable(tray.APP_NAME)
        return
    api = Api()
    from pathlib import Path
    url = Path(INDEX).as_uri() + f"#v={int(os.path.getmtime(INDEX))}"
    minimized = (tray.wants_minimized(sys.argv[1:])
                 or tray.start_minimized_pref(api._settings_path()))
    if sys.platform.startswith("win"):
        extra = "--disable-background-timer-throttling"
        cur = os.environ.get("WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS", "")
        if extra not in cur:
            os.environ["WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS"] = (cur + " " + extra).strip()
    tray_ctl = tray.TrayController(api, webview)
    window = webview.create_window(
        "Aether", url, js_api=api,
        width=1340, height=900, min_size=(1160, 800),
        background_color="#07080d", hidden=minimized,
    )
    tray_ctl.main_window = window
    tray_ctl.main_visible = not minimized
    window.events.closing += tray_ctl.on_main_closing
    api._tray = tray_ctl
    try:
        webview.settings['OPEN_DEVTOOLS_IN_DEBUG'] = False
    except Exception:
        pass
    debug = os.environ.get("AETHER_DEBUG") == "1"
    def _boot(w):
        if not tray_ctl.start() and minimized:
            log.warning("no tray backend; start-minimized ignored, showing the window")
            tray_ctl.show_main()
        _on_start(w)

    inst.listen(lambda: (tray_ctl.hide_panel(), tray_ctl.show_main()))

    storage = os.path.join(os.path.dirname(api._settings_path()), "webview")
    try:
        webview.start(_boot, window, debug=debug, private_mode=False,
                      storage_path=storage)
    finally:
        try:
            tray_ctl.exit()
        except Exception:
            pass
        inst.release()


if __name__ == "__main__":
    main()
