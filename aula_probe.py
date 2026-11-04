"""aula_probe.py — diagnostics for the Aula WIN 68 HE MAX.
Close Aether AND the magnet.aulastar.com tab first.

  python aula_probe.py raw            dump raw replies of the travel query (CMD 0x12)
  python aula_probe.py props KeyW     read every per-key property of a key
  python aula_probe.py watch KeyW     live depth + firmware 'actuated' state of a key
"""
import sys, threading, time
from aula_device import AulaDevice
import protocol_sparkplay as sp

PROP_NAMES = {
    0: "Fn0", 1: "Fn1", 2: "Fn2", 3: "Fn3",
    4: "DB0", 5: "DB1", 6: "DB2", 7: "DB3",
    8: "Mode", 9: "DKS1", 10: "DKS2", 11: "DKS3", 12: "DKS4",
    13: "TRPS1", 14: "TRPS2", 15: "TRPS3", 16: "TRPS4",
    17: "MacroAddr", 18: "MacroSize", 19: "MTDelay",
    20: "RTP", 21: "RTR", 22: "DP", 23: "DR", 24: "KR", 25: "AXIS",
}
ALL_PROPS = sorted(PROP_NAMES)


def find_key(name):
    for idx, kid, code, short in sp.AULA_WIN68_KEYS:
        if name.lower() in (code.lower(), short.lower()):
            return idx, kid
    sys.exit(f"unknown key {name!r} (use names like KeyW, Space, ShiftLeft)")


def hexrows(buf):
    return "\n".join(bytes(buf[i:i + 32]).hex(" ") for i in range(0, len(buf), 32))


def query(dev, lock, cmd, payload, timeout=0.2):
    raw_dev = getattr(dev, "_dev", None) or getattr(dev, "dev", None)
    with lock:
        raw_dev.write(bytes(sp._pack_aula_frame(cmd, list(payload))))
        deadline = time.perf_counter() + timeout
        while time.perf_counter() < deadline:
            rep = raw_dev.read(65)
            if not rep:
                time.sleep(0.001)
                continue
            rep = sp.SparkPlayDriver._normalize(rep)
            if len(rep) >= 5 and rep[0] in (sp.MAGIC, 0xDC) and (rep[2] & 0x7F) == (cmd & 0x7F):
                return bytes(rep[4:4 + rep[1]])
    return None


def main():
    if len(sys.argv) < 2:
        print(__doc__); return
    dev = AulaDevice(); dev.open(); lock = threading.RLock()
    cmd = sys.argv[1]
    try:
        if cmd == "raw":
            raw_dev = getattr(dev, "_dev", None) or getattr(dev, "dev", None)
            for sub, half in ((2, 1), (2, 2), (3, 1)):
                with lock:
                    raw_dev.write(bytes(sp._pack_aula_frame(
                        sp.CMD_TRAVEL_MATRIX, [sub, half, 0xFF, 0xFF])))
                    buf = sp._read_rm6x21_frame(raw_dev, sub, timeout=0.25)
                print(f"--- sub={sub} half={half}: {len(buf or [])} bytes")
                print(hexrows(buf or []) or "(no reply)")
        elif cmd == "props":
            idx, kid = find_key(sys.argv[2])
            for start in range(0, len(ALL_PROPS), 14):
                chunk = ALL_PROPS[start:start + 14]
                payload = [0]
                for p in chunk:
                    payload += [kid, p, 0, 0]
                r = query(dev, lock, sp.CMD_KEY_CONFIG, payload)
                print(f"--- props {chunk[0]}..{chunk[-1]}: "
                      + (hexrows(r) if r else "(none)"))
                if not r:
                    continue
                for j in range(len(chunk)):
                    o = 1 + 4 * j
                    if o + 3 >= len(r):
                        break
                    k, p, v = r[o], r[o + 1], r[o + 2] | (r[o + 3] << 8)
                    print(f"  key {k:3d}  {PROP_NAMES.get(p, p):<10} = {v} (0x{v:04x})")
        elif cmd == "watch":
            idx, kid = find_key(sys.argv[2])
            half, pos = (1, idx) if idx < 63 else (2, idx - 63)
            print("Ctrl+C to stop")
            while True:
                v = sp.query_half_matrix(dev, lock, half)
                bmp = sp.query_press_bitmap(dev, lock)
                mm = (v or [0.0] * 63)[pos]
                on = bool(bmp and idx < len(bmp) and bmp[idx])
                print(f"\r{mm:4.2f} mm |{'#' * int(mm * 12):<44}| "
                      f"{'ACTUATED' if on else '        '}", end="", flush=True)
                time.sleep(0.01)
        else:
            print(__doc__)
    finally:
        dev.close()


if __name__ == "__main__":
    main()
