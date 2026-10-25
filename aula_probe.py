"""aula_probe.py — diagnostics for the Aula WIN 68 HE MAX.
Close Aether AND the magnet.aulastar.com tab first.

  python aula_probe.py raw            dump raw replies of the travel query (CMD 0x12)
  python aula_probe.py props KeyW     read every per-key property of a key
  python aula_probe.py watch KeyW     live depth + firmware 'actuated' state of a key
"""
import sys, threading, time
from aula_device import AulaDevice
import protocol_sparkplay as sp


def find_key(name):
    for idx, kid, code, short in sp.AULA_WIN68_KEYS:
        if name.lower() in (code.lower(), short.lower()):
            return idx, kid
    sys.exit(f"unknown key {name!r} (use names like KeyW, Space, ShiftLeft)")


def hexrows(buf):
    return "\n".join(bytes(buf[i:i + 32]).hex(" ") for i in range(0, len(buf), 32))


def main():
    if len(sys.argv) < 2:
        print(__doc__); return
    dev = AulaDevice(); dev.open(); lock = threading.RLock()
    cmd = sys.argv[1]
    if cmd == "raw":
        for sub, half in ((2, 1), (2, 2), (3, 1)):
            buf = sp.transact(dev, lock, sp.rm6x21_frame(sub, half), 0.25, n_reports=4)
            print(f"--- sub={sub} half={half}: {len(buf or [])} bytes")
            print(hexrows(buf or []) or "(no reply)")
    elif cmd == "props":
        idx, kid = find_key(sys.argv[2])
        payload = [0]
        for p in sp.ALL_PROPS:
            payload += [kid, p, 0, 0]
        r = sp.transact(dev, lock, sp.pack_frame(sp.CMD_KEY, payload), 0.2)
        print("raw reply:\n" + (hexrows(r) if r else "(none)"))
        if r:
            for j in range(len(sp.ALL_PROPS)):
                o = 5 + 4 * j
                k, p, v = r[o], r[o + 1], r[o + 2] | (r[o + 3] << 8)
                print(f"  key {k:3d}  {sp.PROP_NAMES.get(p, p):<14} = {v} (0x{v:04x})")
    elif cmd == "watch":
        idx, kid = find_key(sys.argv[2])
        half, pos = (1, idx) if idx < 63 else (2, idx - 63)
        print("Ctrl+C to stop")
        while True:
            v = sp.query_half_matrix(dev, lock, half)
            st = sp.query_press_states(dev, lock)
            mm = (v or [0.0] * 63)[pos]
            on = bool(st and st[idx])
            print(f"\r{mm:4.2f} mm |{'#' * int(mm * 12):<44}| {'ACTUATED' if on else '        '}",
                  end="", flush=True)
            time.sleep(0.01)
    dev.close()


if __name__ == "__main__":
    main()
