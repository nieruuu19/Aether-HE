"""aula_device.py — HID device lifecycle for Aether-HE supported keyboards."""

import threading
import time

try:
    import hid
except ImportError:
    hid = None

VID = 0x1CA2
PID = 0x1901
VENDOR_USAGE_PAGE = 0xFFA0
DEFAULT_SLEEP_MS = 12


class AulaDevice:
    def __init__(self, board=None, sleep_ms=DEFAULT_SLEEP_MS, vid=VID, pid=PID,
                 usage_page=VENDOR_USAGE_PAGE):
        if board is not None and not isinstance(board, int):
            b_vid = getattr(board, "vid", None)
            b_pid = getattr(board, "pid", None)
            b_up = getattr(board, "usage_page", None)
            # If board defaulted to Win60 (2E3C:C365) but WIN 68 HE MAX (1CA2:1901) is plugged in, use 1CA2:1901
            if hid is not None and b_vid == 0x2E3C and b_pid == 0xC365 and hid.enumerate(0x1CA2, 0x1901):
                self.vid = 0x1CA2
                self.pid = 0x1901
                self.usage_page = 0xFFA0
            else:
                self.vid = b_vid or VID
                self.pid = b_pid or PID
                self.usage_page = b_up or VENDOR_USAGE_PAGE
        else:
            if isinstance(board, int):
                sleep_ms = board
            self.vid = vid
            self.pid = pid
            self.usage_page = usage_page

        self.sleep_s = max(0, sleep_ms) / 1000.0
        self._lock = threading.RLock()
        self._dev = None
        self.dev = None
        self.path = None
        self.info = None

    def is_open(self):
        return self._dev is not None

    @staticmethod
    def enumerate_interfaces(vid=VID, pid=PID):
        if hid is None:
            raise RuntimeError("hidapi (python package 'hid') is not installed")
        return hid.enumerate(vid, pid)

    def find_vendor_interface(self):
        all_devs = self.enumerate_interfaces(self.vid, self.pid)
        if not all_devs:
            return None
        matches = [d for d in all_devs if d.get("usage_page") == self.usage_page]
        if not matches:
            matches = [d for d in all_devs if (d.get("usage_page", 0) & 0xFF00) == 0xFF00]
        if not matches:
            return None
        matches.sort(key=lambda d: (
            0 if d.get("usage") == 0x0001 else 1,
            d.get("interface_number", 99),
            d.get("usage", 99)
        ))
        return matches[0]

    def open(self):
        if hid is None:
            raise RuntimeError("hidapi (python package 'hid') is not installed")
        with self._lock:
            if self._dev is not None:
                return self.info
            all_devs = self.enumerate_interfaces(self.vid, self.pid)
            if not all_devs:
                raise OSError(f"Device ({self.vid:04X}:{self.pid:04X}) not found on USB.")

            candidates = [d for d in all_devs if d.get("usage_page") == self.usage_page]
            if not candidates:
                candidates = [d for d in all_devs if (d.get("usage_page", 0) & 0xFF00) == 0xFF00]
            if not candidates:
                candidates = all_devs

            candidates.sort(key=lambda d: (
                0 if d.get("usage_page") == self.usage_page else 1,
                0 if d.get("usage") == 0x0001 else 1,
                d.get("interface_number", 99)
            ))

            last_err = None
            for target in candidates:
                try:
                    d = hid.device()
                    p = target["path"]
                    d.open_path(p.encode() if isinstance(p, str) else p)
                    d.set_nonblocking(1)
                    self._dev = d
                    self.dev = d
                    self.path = target["path"]
                    self.info = target
                    return target
                except Exception as e:
                    last_err = e
                    continue

            raise OSError(
                f"Could not open ({self.vid:04X}:{self.pid:04X}). "
                f"Close HallJoy / Aula web driver first! Error: {last_err}"
            )

    def close(self):
        with self._lock:
            if self._dev is not None:
                try:
                    self._dev.close()
                except Exception:
                    pass
                finally:
                    self._dev = None
                    self.dev = None

    def write(self, payload):
        with self._lock:
            if self._dev is None:
                raise RuntimeError("Device is not open")
            buf = bytes(payload)
            if len(buf) == 64:
                buf = b"\x00" + buf
            n = self._dev.write(buf)
            if self.sleep_s:
                time.sleep(self.sleep_s)
            return n

    def read(self, size=65, timeout_ms=0):
        with self._lock:
            if self._dev is None:
                raise RuntimeError("Device is not open")
            if timeout_ms:
                return self.dev.read(size, timeout_ms=timeout_ms)
            return self._dev.read(size)