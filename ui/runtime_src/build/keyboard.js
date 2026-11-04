(() => {
  /* WIN 68 HE MAX keyboard visualization with per-key live actuation. */
  const {
    useState,
    useEffect,
    useRef,
    useMemo
  } = React;

  /* 65% (68-key) layout — each row totals 64 cols (each 0.25u = 1 col).
     Geometry matches ui/layouts/aula-win68he-max.json: the nav column
     (Ins/Del/PgUp/PgDn) on the right edge and the arrow cluster on rows 4-5. */
  /* Each entry: [label, units, code, fn?] — `units` is in 0.25u increments. */
  /* FN-layer labels transcribed from the Aula Win60 HE box —
     "Magnetic Switch Keyboard · 30 Seconds Quick Operation Guide". */
  const KB_ROWS = [[["Esc", 4, "Escape", "`~"], ["1!", 4, "1", "F1"], ["2@", 4, "2", "F2"], ["3#", 4, "3", "F3"], ["4$", 4, "4", "F4"], ["5%", 4, "5", "F5"], ["6^", 4, "6", "F6"], ["7&", 4, "7", "F7"], ["8*", 4, "8", "F8"], ["9(", 4, "9", "F9"], ["0)", 4, "0", "F10"], ["-_", 4, "Minus", "F11"], ["=+", 4, "Equal", "F12"], ["Back", 8, "Backspace", "Color"], ["Ins", 4, "Ins", ""]], [["Tab", 6, "Tab", "Light FX"], ["Q", 4, "Q", ""], ["W", 4, "W", "↑"], ["E", 4, "E", "Vol−"], ["R", 4, "R", "Vol+"], ["T", 4, "T", "Prev"], ["Y", 4, "Y", "Next"], ["U", 4, "U", "Play"], ["I", 4, "I", ""], ["O", 4, "O", "Mail"], ["P", 4, "P", "Home"], ["{[", 4, "Lbr", ""], ["}]", 4, "Rbr", ""], ["\\|", 6, "Bsl", ""], ["Del", 4, "Del", ""]], [["Caps", 7, "Caps"], ["A", 4, "A", "←"], ["S", 4, "S", "↓"], ["D", 4, "D", "→"], ["F", 4, "F", "Brt+"], ["G", 4, "G", "Brt−"], ["H", 4, "H", ""], ["J", 4, "J", ""], ["K", 4, "K", ""], ["L", 4, "L", ""], [";:", 4, "Semi", "Ins"], ["'\"", 4, "Quot", ""], ["Enter", 9, "Enter", ""], ["PgUp", 4, "PgUp", ""]], [["L-Shift", 9, "LShift"], ["Z", 4, "Z", "Win"], ["X", 4, "X", "Mac"], ["C", 4, "C", ""], ["V", 4, "V", ""], ["B", 4, "B", ""], ["N", 4, "N", "Reset"], ["M", 4, "M", "End"], [",<", 4, "Comma", "PgUp"], [".>", 4, "Dot", "PgDn"], ["/?", 4, "Slash", "Del"], ["R-Shift", 7, "RShift"], ["↑", 4, "Up", ""], ["PgDn", 4, "PgDn", ""]], [["L-Ctrl", 5, "LCtrl"], ["L-Win", 5, "LWin", "WinLk"], ["L-Alt", 5, "LAlt"], ["Space", 25, "Space"], ["R-Alt", 4, "RAlt"], ["Fn", 4, "Fn", "Fn"], ["R-Ctrl", 4, "RCtrl"], ["←", 4, "Left", ""], ["↓", 4, "Down", ""], ["→", 4, "Right", ""]]];

  /* Compute a fractional width string given units in 0.25u increments out of 64 cols. */
  const ufrac = u => `${u / 64 * 100}%`;
  const Key = React.memo(({
    label,
    units,
    code,
    fnLabel,
    layer = "default",
    // default | fn
    depth = 0,
    actuationPoint = 1.70,
    rtPress = 0.05,
    rtRelease = 0.05,
    deadTop = 0.20,
    deadBottom = 0.20,
    selected = false,
    highlighted = false,
    mode = "keymap",
    calibrating = false,
    calibrated = false,
    ledColor = null,
    switchColor = null,
    switchShort = null,
    switchSet = false,
    switchDefault = false,
    onClick = () => {},
    onMouseDown = () => {},
    onMouseEnter = () => {},
    onContextMenu = () => {}
  }) => {
    // The HID bridge flags a firmware-triggered key by adding 0.0001 mm to the
    // reported depth. Strip it for display and use it as the actuated signal.
    const hwTriggered = Math.round(Number(depth) % 1 * 10000) === 1;
    const cleanDepth = Number(depth) - (hwTriggered ? 0.0001 : 0);
    const actuated = hwTriggered || cleanDepth >= actuationPoint && actuationPoint > 0;
    const progress = Math.min(1, cleanDepth / 4);

    // Background depending on mode. In lighting mode each key shows its real
    // color (effect foreground, or the background color underneath) at FULL
    // strength — so a key lit with the effect color and a key showing only the
    // background read at the same brightness. Near-black (an "off"/background
    // color) falls back to the faint unlit surface instead of a black box.
    let bg = "rgba(255,255,255,0.025)";
    if (mode === "lighting" && ledColor) {
      const hx = String(ledColor).replace("#", "");
      const r = parseInt(hx.slice(0, 2), 16) || 0;
      const g = parseInt(hx.slice(2, 4), 16) || 0;
      const b = parseInt(hx.slice(4, 6), 16) || 0;
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      // Lower threshold + brighter top stop so dim animation frames still show
      // their color (not the unlit surface). cc -> ff at top makes the keycap
      // read at the LED's intended brightness instead of a darkened gradient.
      bg = lum < 6 ? "rgba(255,255,255,0.025)" : `linear-gradient(180deg, ${ledColor}, ${ledColor})`;
    }

    // Switch view: tint each keycap with the switch the firmware reports for
    // it (L_AXIS -> registry dot). Keys on the board's factory switch get a
    // fainter tint than keys explicitly assigned another one.
    const swTint = mode === "switch" && switchColor;
    const swDim = switchSet ? "80" : "40";
    const swDimLow = switchSet ? "26" : "12";

    // Two-line labels (e.g. "1!" -> shifted/unshifted stack)
    const lines = label.length === 2 && !/^[a-zA-Z]+$/.test(label) && label !== "Fn" ? [label[0], label[1]] : null;
    const displayLabel = layer === "fn" && fnLabel ? fnLabel : label;
    const displayLines = layer === "fn" ? null : lines;
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      onMouseDown: onMouseDown,
      onMouseEnter: onMouseEnter,
      onDragStart: e => e.preventDefault(),
      draggable: false,
      onContextMenu: e => {
        e.preventDefault();
        onContextMenu(e);
      },
      style: {
        gridColumn: `span ${units}`,
        background: calibrated ? "linear-gradient(180deg, #10b98133, #10b98119)" : swTint ? `linear-gradient(180deg, ${switchColor}${swDim}, ${switchColor}${swDimLow})` : bg,
        ...(swTint && !selected && !calibrated ? {
          borderColor: `${switchColor}${switchSet ? "99" : "55"}`
        } : null)
      },
      "data-code": code,
      className: `relative rounded-[5px] border text-left
                  px-1.5 pt-1 pb-0.5 h-[46px] overflow-hidden
                  transition-[border-color,box-shadow] duration-150
                  ${calibrated ? "border-emerald-400 shadow-[0_0_0_1px_#10b981,0_0_14px_rgba(16,185,129,0.6)]" : calibrating ? "border-amber-400/40 animate-pulse" : selected ? mode === "lighting" ? "border-white shadow-[0_0_0_2px_#ffffff,0_0_12px_rgba(255,255,255,0.75)]" : "border-[var(--accent)]/80 shadow-[0_0_0_1px_var(--accent),0_0_18px_var(--accent-glow)]" : actuated ? "border-[var(--accent)]/60 shadow-[0_0_14px_var(--accent-glow)]" : highlighted ? "border-[color-mix(in_srgb,var(--accent)_30%,transparent)]" : "border-[var(--line)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, mode !== "lighting" && cleanDepth > 0.02 && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": true,
      className: "absolute inset-x-0 bottom-0 pointer-events-none",
      style: {
        height: progress * 100 + "%",
        background: actuated ? "linear-gradient(to top, var(--accent), transparent 90%)" : "linear-gradient(to top, rgba(148,163,184,0.18), transparent 90%)",
        opacity: actuated ? 0.45 : 0.55,
        transition: "height 120ms linear"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "relative z-10 flex items-start justify-between"
    }, displayLines ? /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col leading-[1.0]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-[var(--text)] font-medium"
    }, displayLines[1]), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-[var(--text-dim)] font-medium"
    }, displayLines[0])) : /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] font-medium tracking-wide
                            ${layer === "fn" && fnLabel ? "text-[var(--accent)]" : actuated ? "text-white" : "text-[var(--text)]"}`
    }, displayLabel)), mode === "deadband" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "absolute top-[3px] left-[4px] z-10 font-mono text-[8.5px] font-bold text-[#4ade80] leading-none tracking-tighter"
    }, Number(deadTop != null ? deadTop : 0.20).toFixed(2).replace(/0$/, "")), /*#__PURE__*/React.createElement("span", {
      className: "absolute bottom-[3px] left-[4px] z-10 font-mono text-[8.5px] font-bold text-[#38bdf8] leading-none tracking-tighter"
    }, Number(deadBottom != null ? deadBottom : 0.20).toFixed(2).replace(/0$/, ""))), mode === "actuation" && actuationPoint != null && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "absolute top-[3px] right-[4px] z-10 font-mono text-[8.5px] font-bold text-[#4ade80] leading-none tracking-tighter"
    }, Number(actuationPoint).toFixed(2)), (rtPress > 0 || rtRelease > 0) && /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-[3px] inset-x-[4px] z-10 flex items-center justify-between leading-none"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[8px] font-semibold text-[#38bdf8] tracking-tighter"
    }, Number(rtPress).toFixed(2)), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[8px] font-semibold text-[#fb923c] tracking-tighter"
    }, Number(rtRelease).toFixed(2)))), mode === "switch" && /*#__PURE__*/React.createElement(React.Fragment, null, (switchSet || switchDefault) && /*#__PURE__*/React.createElement("span", {
      className: switchSet ? "absolute top-[4px] right-[4px] z-10 w-2 h-2 rounded-full" : "absolute top-[4px] right-[4px] z-10 w-2 h-2 rounded-full border",
      style: {
        background: switchSet ? switchColor : "transparent",
        borderColor: switchColor,
        boxShadow: switchSet ? `0 0 6px ${switchColor}` : undefined
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: `absolute bottom-[3px] left-[4px] z-10 font-mono text-[8.5px] font-bold leading-none tracking-tighter
                            ${switchSet ? "text-white/85" : switchDefault ? "text-[var(--text-dim)]" : "text-[var(--text-faint)]"}`
    }, switchShort || (switchSet ? "?" : "def"))), mode === "actuation" && cleanDepth >= 0.05 && /*#__PURE__*/React.createElement("span", {
      className: "absolute bottom-[3px] right-[4px] z-20 px-1 rounded bg-black/80 font-mono text-[8.5px] font-bold text-[var(--accent)]"
    }, cleanDepth.toFixed(2)));
  }, (prev, next) => prev.code === next.code && prev.layer === next.layer && prev.depth === next.depth && prev.actuationPoint === next.actuationPoint && prev.rtPress === next.rtPress && prev.rtRelease === next.rtRelease && prev.deadTop === next.deadTop && prev.deadBottom === next.deadBottom && prev.switchColor === next.switchColor && prev.switchShort === next.switchShort && prev.switchSet === next.switchSet && prev.switchDefault === next.switchDefault && prev.selected === next.selected && prev.highlighted === next.highlighted && prev.mode === next.mode && prev.calibrating === next.calibrating && prev.calibrated === next.calibrated && prev.ledColor === next.ledColor);

  /* Top "WIN 68 HE MAX" pill */
  const DevicePill = ({
    connected
  }) => /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-4 py-1.5 rounded-md bg-[var(--accent)]/15 border border-[var(--accent)]/40 text-[var(--accent)] shadow-[0_0_18px_var(--accent-glow)] whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-ring text-[var(--accent)]"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-display font-semibold tracking-[0.18em] text-[12px]"
  }, "WIN 68 HE MAX"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent)]/70 ml-1"
  }, connected ? "Linked" : "Offline"));

  /* The full keyboard panel — handles live actuation telemetry and selection */
  const KeyboardPanel = ({
    mode,
    layer = "default",
    selectedKeys,
    setSelectedKeys,
    actuationPoint,
    rtPress,
    rtRelease,
    perKeyOverride,
    ledMap,
    accent,
    leftSlot,
    rightSlot,
    showPill = true,
    compact = false,
    liveDepths = null,
    calibrating = false,
    calibratedCodes = null,
    switchMap = null
  }) => {
    const calibSet = calibratedCodes || null;
    // Real per-key travel depth (mm), streamed from the board by the HID bridge
    // (App polls api.read_live() while Travel Test is on). When the bridge isn't
    // streaming, every key reads 0 — no simulated motion fighting the hardware.
    const depths = liveDepths || {};
    const _dv = Object.values(depths);
    const liveMax = _dv.length ? Math.max(0, ..._dv) : 0;
    const toggleSelect = (code, e) => {
      setSelectedKeys(prev => {
        const cur = new Set(prev);
        if (e.shiftKey || e.metaKey || e.ctrlKey) {
          cur.has(code) ? cur.delete(code) : cur.add(code);
        } else {
          if (cur.has(code) && cur.size === 1) cur.clear();else {
            cur.clear();
            cur.add(code);
          }
        }
        return cur;
      });
    };

    // Click-and-drag selection: press on a key to start (modifier = add to the
    // current selection, else start fresh), drag across keys to sweep-select.
    const dragging = useRef(false);
    const additive = useRef(false);
    const startDrag = (code, e) => {
      dragging.current = true;
      additive.current = e.shiftKey || e.metaKey || e.ctrlKey;
      setSelectedKeys(prev => {
        const cur = new Set(additive.current ? prev : []);
        if (additive.current && cur.has(code)) cur.delete(code); // ctrl-click toggles off
        else cur.add(code);
        return cur;
      });
    };
    const dragOver = code => {
      if (!dragging.current) return;
      setSelectedKeys(prev => {
        if (prev.has(code)) return prev;
        const cur = new Set(prev);
        cur.add(code);
        return cur;
      });
    };
    useEffect(() => {
      const up = () => {
        dragging.current = false;
      };
      window.addEventListener("mouseup", up);
      return () => window.removeEventListener("mouseup", up);
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, showPill && /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center mb-4"
    }, /*#__PURE__*/React.createElement(DevicePill, {
      connected: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-center gap-4"
    }, leftSlot && /*#__PURE__*/React.createElement("div", {
      className: "shrink-0 w-[110px] pt-2 flex flex-col gap-1.5"
    }, leftSlot), /*#__PURE__*/React.createElement("div", {
      className: "relative w-full max-w-[960px] rounded-2xl border border-[var(--line)] bg-gradient-to-b from-white/[0.025] to-black/30 p-3.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pointer-events-none absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-[3px]"
    }, KB_ROWS.map((row, ri) => /*#__PURE__*/React.createElement("div", {
      key: ri,
      className: "grid w-full gap-[3px]",
      style: {
        gridTemplateColumns: "repeat(64, minmax(0, 1fr))"
      }
    }, row.map(([label, units, code, fnLabel]) => {
      // Expose telemetry for the Travel Test switch render.
      window.__liveDepths = depths;
      window.__perKeyOverride = perKeyOverride;
      const rawOv = perKeyOverride?.[code];
      const override = rawOv && typeof rawOv === "object" ? rawOv : typeof rawOv === "number" ? {
        actuation: rawOv,
        touchMode: 1
      } : {};
      const hasCustom = override.touchMode === 1 || override.touchMode === 2;
      const sw = switchMap ? switchMap[code] : null;
      return /*#__PURE__*/React.createElement(Key, {
        key: code,
        label: label,
        units: units,
        code: code,
        fnLabel: fnLabel,
        layer: layer,
        depth: depths[code] || 0,
        actuationPoint: hasCustom ? override.actuation : null,
        rtPress: override.touchMode === 2 ? override.rtPress ?? 0 : 0,
        rtRelease: override.touchMode === 2 ? override.rtRelease ?? 0 : 0,
        deadTop: override.deadTop != null ? override.deadTop : 0.20,
        deadBottom: override.deadBottom != null ? override.deadBottom : 0.20,
        selected: selectedKeys.has(code),
        mode: mode,
        calibrating: calibrating,
        calibrated: !!(calibSet && calibSet.has(code)),
        ledColor: ledMap?.[code] || null,
        switchColor: sw ? sw.color : null,
        switchShort: sw ? sw.short : null,
        switchSet: !!(sw && sw.set),
        switchDefault: !!(sw && sw.default),
        onMouseDown: e => startDrag(code, e),
        onMouseEnter: () => dragOver(code),
        onContextMenu: () => setSelectedKeys(prev => {
          if (!prev.has(code)) return prev;
          const cur = new Set(prev);
          cur.delete(code);
          return cur;
        })
      });
    }))))), rightSlot && /*#__PURE__*/React.createElement("div", {
      className: "shrink-0 w-[110px] pt-2 flex flex-col gap-1.5 items-end"
    }, rightSlot)), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center mt-3 gap-1"
    }, /*#__PURE__*/React.createElement("button", {
      className: "grid place-items-center w-7 h-7 rounded-full border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] transition-colors",
      title: "Refresh device state"
    }, /*#__PURE__*/React.createElement(window.AetherIcons.IRefresh, {
      size: 13
    })), mode === "socd" && /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em]"
    }, "Right-click to uncheck all keys")));
  };
  window.AetherKeyboard = {
    KeyboardPanel,
    KB_ROWS,
    DevicePill
  };
})();