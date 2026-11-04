(() => {
  /* SOCD Workspace: 3-widget layout for key pair editor, apply, and active pairs list */
  const {
    useState,
    useEffect
  } = React;
  const {
    IPlus,
    ITrash,
    IUnlink,
    ICheck
  } = window.AetherIcons;
  const {
    Chip,
    ToolbarButton
  } = window.AetherSections;
  const BASIC_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1!", "2@", "3#", "$4", "5%", "6^", "7&", "8*", "9(", "0)", "-_", "=+", "{[", "}]", "\\|", "<>", ";:", "'\"", "`~", ",<", ".>", "/?"];
  const EXTENDED_KEYS = ["Esc", "Tab", "Caps", "Back", "Enter", "Space", "L-Ctrl", "R-Ctrl", "L-Shift", "R-Shift", "L-Alt", "R-Alt", "L-Win", "R-Win", "Menu", "Left", "Up", "Right", "Down", "PrtSc", "ScrLk", "Pause", "Ins", "Home", "Del", "End", "PgUp", "PgDn", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];

  /* ===== KeyGrid: collapsible key picker ===== */
  const KeyGrid = ({
    title,
    keys,
    picked,
    onPick
  }) => {
    const [open, setOpen] = useState(true);
    const IChevronD = window.AetherIcons?.IChevronD;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      className: "flex items-center gap-2 mb-2 text-[var(--text-dim)] hover:text-[var(--text)]"
    }, IChevronD && /*#__PURE__*/React.createElement(IChevronD, {
      size: 12,
      className: open ? "" : "-rotate-90"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[12px] uppercase tracking-[0.18em]"
    }, title)), open && /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-[repeat(auto-fill,minmax(46px,1fr))] gap-1.5 mb-3"
    }, keys.map(k => {
      const active = picked === k;
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        onClick: () => onPick(k),
        className: `h-9 rounded-md border font-mono text-[11px] transition-all
                            ${active ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:text-[var(--text)]"}`
      }, k);
    })));
  };

  /* SparkPlay boards (WIN 68 HE MAX) number their SOCD modes like the vendor's
     SOCDOptions: 1 last input, 2 key 1 priority, 3 key 2 priority, 4 neutral.
     The Win60's cmd-36 PRCS uses its own four models, so the labels follow the
     active board instead of being hardcoded. */
  const SOCD_MODELS = {
    sparkplay: [{
      n: 1,
      label: "Back cover",
      desc: "Last key pressed wins."
    }, {
      n: 2,
      label: "Key 1 priority",
      desc: "Key 1 (red box) overrides Key 2."
    }, {
      n: 3,
      label: "Key 2 priority",
      desc: "Key 2 (blue box) overrides Key 1."
    }, {
      n: 4,
      label: "Neutral",
      desc: "Both keys cancel out; neither reports."
    }],
    win60: [{
      n: 1,
      label: "Model 1",
      desc: "First press wins; second is interrupted."
    }, {
      n: 2,
      label: "Model 2",
      desc: "Key1 interrupts Key2."
    }, {
      n: 3,
      label: "Model 3",
      desc: "Key2 interrupts Key1."
    }, {
      n: 4,
      label: "Model 4",
      desc: "Later-triggered key wins (Snap Tap)."
    }]
  };

  /* ===== Pair Editor Widget ===== */
  const PairEditorWidget = ctx => {
    const {
      socdProfiles,
      setSocdProfiles,
      socdActive,
      setSocdActive
    } = ctx;
    const [editTarget, setEditTarget] = useState("k1"); // "k1" or "k2"
    const boardCtx = useBoardSafe();
    const isSpark = !!(boardCtx && boardCtx.board && boardCtx.board.protocol === "protocol_sparkplay");
    const models = isSpark ? SOCD_MODELS.sparkplay : SOCD_MODELS.win60;
    const cur = socdProfiles.find(p => p.id === socdActive) || socdProfiles[0];
    const bind = cur?.bind == null ? 1 : cur.bind;
    const delay = cur?.delay == null ? 10 : cur.delay;
    const updateActive = patch => {
      setSocdProfiles(ps => ps.map(p => p.id === socdActive ? {
        ...p,
        ...patch
      } : p));
    };
    const addProfile = () => {
      if (socdProfiles.length >= 20) return; // enforce the advertised /20 cap
      // Smallest unused SOCDn id — length-based ids collide after a delete.
      const used = new Set(socdProfiles.map(p => p.id));
      let n = 1;
      while (used.has(`SOCD${n}`)) n++;
      const next = `SOCD${n}`;
      setSocdProfiles([...socdProfiles, {
        id: next,
        k1: "",
        k2: "",
        mode: 1,
        ...(isSpark ? {
          bind: 1,
          delay: 10
        } : {})
      }]);
      setSocdActive(next);
    };
    const delActive = () => {
      // Deleting the last pair leaves one blank slot: Apply with no complete
      // pair is the path that clears SOCD on the keyboard, so removal must stay
      // reachable even when this is the only profile.
      const remaining = socdProfiles.filter(p => p.id !== socdActive);
      const next = remaining.length ? remaining : [{
        id: "SOCD1",
        k1: "",
        k2: "",
        mode: 1,
        ...(isSpark ? {
          bind: 1,
          delay: 10
        } : {})
      }];
      setSocdProfiles(next);
      setSocdActive(next[0].id);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4 h-full overflow-y-auto"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1"
    }, "Key 1"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setEditTarget("k1"),
      className: `w-full h-9 rounded-md border grid place-items-center font-mono text-[14px] transition-colors
                         ${editTarget === "k1" ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_8px_var(--accent-glow)]" : cur?.k1 ? "border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/10 hover:shadow-[0_0_8px_var(--accent-glow)]" : "border-[var(--line)] text-[var(--text-faint)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, cur?.k1 || "—")), /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text-faint)] mt-5"
    }, IUnlink && /*#__PURE__*/React.createElement(IUnlink, {
      size: 14
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1"
    }, "Key 2"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setEditTarget("k2"),
      className: `w-full h-9 rounded-md border grid place-items-center font-mono text-[14px] transition-colors
                         ${editTarget === "k2" ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_8px_var(--accent-glow)]" : cur?.k2 ? "border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/10 hover:shadow-[0_0_8px_var(--accent-glow)]" : "border-[var(--line)] text-[var(--text-faint)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, cur?.k2 || "—"))), isSpark && bind === 1 && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1"
    }, "Bound value 1"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setEditTarget("k1v"),
      className: `w-full h-9 rounded-md border grid place-items-center font-mono text-[14px] transition-colors
                           ${editTarget === "k1v" ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_8px_var(--accent-glow)]" : "border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/10 hover:shadow-[0_0_8px_var(--accent-glow)]"}`
    }, cur?.k1v || cur?.k1 || "—")), /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text-faint)] mt-5 text-[13px]"
    }, "\u2191"), /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1"
    }, "Bound value 2"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setEditTarget("k2v"),
      className: `w-full h-9 rounded-md border grid place-items-center font-mono text-[14px] transition-colors
                           ${editTarget === "k2v" ? "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_8px_var(--accent-glow)]" : "border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/10 hover:shadow-[0_0_8px_var(--accent-glow)]"}`
    }, cur?.k2v || cur?.k2 || "—"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-1.5"
    }, models.map(({
      n,
      label
    }) => /*#__PURE__*/React.createElement("button", {
      key: n,
      onClick: () => updateActive({
        mode: n
      }),
      className: `flex items-center gap-2 px-3 h-9 rounded-md border font-mono text-[12px] transition-all
                        ${cur?.mode === n ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-3 h-3 rounded-full border ${cur?.mode === n ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--text-faint)]"}`
    }), label))), isSpark && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] flex flex-col gap-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1.5"
    }, "Binding"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-1.5"
    }, [{
      v: 0,
      label: "Position",
      desc: "Pair the two physical keys."
    }, {
      v: 1,
      label: "Key values",
      desc: "Bind each position to a key value."
    }].map(({
      v,
      label,
      desc
    }) => /*#__PURE__*/React.createElement("button", {
      key: v,
      onClick: () => updateActive({
        bind: v
      }),
      title: desc,
      className: `flex flex-col items-start px-3 py-2 rounded-md border font-mono text-[11.5px] transition-all
                              ${bind === v ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-[var(--text-faint)] mt-0.5"
    }, desc))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)]"
    }, "Interaction delay"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--accent)]"
    }, delay, " ms")), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: 0,
      max: 50,
      step: 1,
      value: delay,
      onChange: e => updateActive({
        delay: Math.max(0, Math.min(50, +e.target.value))
      }),
      className: "w-full"
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between font-mono text-[9px] text-[var(--text-faint)] mt-0.5"
    }, /*#__PURE__*/React.createElement("span", null, "0 ms"), /*#__PURE__*/React.createElement("span", null, "50 ms"))), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px] leading-relaxed text-[var(--text-dim)]"
    }, "Both fields ride the SOCD frame: the firmware parses them only from 1.0.7 onward (the delay is a 16-bit millisecond count, clamped to 0\u201350 here). In key-values mode each position is bound to its own value and both values are sent; in position mode the value slots go out empty. The labels come from the vendor bundle \u2014 neither field changes which keys the firmware marks as the pair.")), editTarget === "k1" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.05]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10px] uppercase tracking-[0.16em] text-[var(--accent)] mb-2"
    }, "Select Key 1"), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Basic Keys",
      keys: BASIC_KEYS,
      picked: cur?.k1,
      onPick: k => {
        updateActive({
          k1: k
        });
        setEditTarget("k2");
      }
    }), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Extended Keys",
      keys: EXTENDED_KEYS,
      picked: cur?.k1,
      onPick: k => {
        updateActive({
          k1: k
        });
        setEditTarget("k2");
      }
    })), editTarget === "k2" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.05]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10px] uppercase tracking-[0.16em] text-[var(--accent)] mb-2"
    }, "Select Key 2"), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Basic Keys",
      keys: BASIC_KEYS,
      picked: cur?.k2,
      onPick: k => {
        updateActive({
          k2: k
        });
        setEditTarget(null);
      }
    }), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Extended Keys",
      keys: EXTENDED_KEYS,
      picked: cur?.k2,
      onPick: k => {
        updateActive({
          k2: k
        });
        setEditTarget(null);
      }
    })), editTarget === "k1v" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.05]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10px] uppercase tracking-[0.16em] text-[var(--accent)] mb-2"
    }, "Select Bound Value 1"), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Basic Keys",
      keys: BASIC_KEYS,
      picked: cur?.k1v || cur?.k1,
      onPick: k => {
        updateActive({
          k1v: k
        });
        setEditTarget("k2v");
      }
    }), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Extended Keys",
      keys: EXTENDED_KEYS,
      picked: cur?.k1v || cur?.k1,
      onPick: k => {
        updateActive({
          k1v: k
        });
        setEditTarget("k2v");
      }
    })), editTarget === "k2v" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.05]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10px] uppercase tracking-[0.16em] text-[var(--accent)] mb-2"
    }, "Select Bound Value 2"), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Basic Keys",
      keys: BASIC_KEYS,
      picked: cur?.k2v || cur?.k2,
      onPick: k => {
        updateActive({
          k2v: k
        });
        setEditTarget(null);
      }
    }), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Extended Keys",
      keys: EXTENDED_KEYS,
      picked: cur?.k2v || cur?.k2,
      onPick: k => {
        updateActive({
          k2v: k
        });
        setEditTarget(null);
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3 text-[11.5px] text-[var(--text-dim)] leading-relaxed"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text)] font-display uppercase tracking-[0.18em] text-[10.5px] mb-2"
    }, "When both Key1 and Key2 fire:"), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1.5 font-mono text-[10px]"
    }, models.map(({
      n,
      label,
      desc
    }) => /*#__PURE__*/React.createElement("div", {
      key: n
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, label), " \xB7 ", desc)))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: addProfile,
      className: "flex-1 flex items-center justify-center gap-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[11px] uppercase tracking-[0.16em]"
    }, IPlus && /*#__PURE__*/React.createElement(IPlus, {
      size: 12
    }), " New"), /*#__PURE__*/React.createElement("button", {
      onClick: delActive,
      title: "Delete the selected pair. With no complete pair left, Apply clears SOCD on the keyboard.",
      className: "flex-1 flex items-center justify-center gap-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-rose-400/40 hover:text-rose-300 font-display text-[11px] uppercase tracking-[0.16em]"
    }, ITrash && /*#__PURE__*/React.createElement(ITrash, {
      size: 12
    }), " Delete")));
  };

  /* ===== Apply Widget =====
     (Was "Hotkey": its switch-hotkey toggle and status were saved but never
     sent to the keyboard, so they are gone. The widget id stays "hotkey" so
     saved window geometry still applies.) */
  const ApplyWidget = ctx => {
    const {
      handleSocdApply,
      socdProfiles,
      connected
    } = ctx;
    const [busy, setBusy] = useState(false);
    const [done, setDone] = useState(null);
    const complete = (socdProfiles || []).filter(p => p.k1 && p.k2).length;
    const apply = async () => {
      if (!handleSocdApply || busy) return;
      setBusy(true);
      try {
        const r = await handleSocdApply(socdProfiles);
        // Confirm only what the keyboard took; failures surface as a notice.
        if (r && r.ok) {
          setDone(complete ? `Wrote ${complete} pair${complete === 1 ? "" : "s"}` : "Cleared SOCD on the keyboard");
          setTimeout(() => setDone(null), 2400);
        }
      } finally {
        setBusy(false);
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[11.5px] text-[var(--text-dim)] leading-relaxed"
    }, "Apply writes every complete pair to the keyboard, replacing what it holds.", complete === 0 && /*#__PURE__*/React.createElement(React.Fragment, null, " With no complete pair, Apply ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "clears"), " SOCD on the keyboard.")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 mt-auto"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: apply,
      disabled: busy || !connected,
      className: `px-4 h-9 rounded-md border font-display text-[12px] uppercase tracking-[0.16em] ${busy || !connected ? "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] cursor-not-allowed" : "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_18px_var(--accent-glow)] hover:brightness-110"}`
    }, busy ? "Writing…" : complete ? `Apply ${complete} pair${complete === 1 ? "" : "s"}` : "Clear SOCD"), done && /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
    }, "\u2713 ", done), !connected && /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, "connect to apply")));
  };

  /* ===== Active Pairs Widget ===== */
  const ActivePairsWidget = ctx => {
    const {
      socdProfiles,
      socdActive,
      setSocdActive
    } = ctx;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-2"
    }, socdProfiles.length, "/20 pairs")), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1.5 flex-1 overflow-y-auto"
    }, socdProfiles.map(p => /*#__PURE__*/React.createElement("button", {
      key: p.id,
      onClick: () => setSocdActive(p.id),
      className: `flex flex-col px-3 py-2 rounded-md border font-mono text-[12px] transition-all
                        ${socdActive === p.id ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.16em]"
    }, p.id), p.k1 && p.k2 ? /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-[var(--text-faint)] mt-1"
    }, p.k1, " ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "\u2194"), " ", p.k2, /*#__PURE__*/React.createElement("span", {
      className: "ml-2 font-display text-[9px]"
    }, "M", p.mode)) : /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-[var(--text-faint)] mt-1"
    }, "unconfigured")))));
  };

  /* ============================================================
     Board-aware dispatch (ADDITIVE — the Win60 path is untouched).
  
     The three widget bodies above are the Aula Win60 HE's SOCD UI, driven by
     that board's own cmd-36 PRCS mechanism. Boards that instead keep their
     bindings in a 512-byte key table (the MINI 60 HE PRO's advanced keys:
     DKS/MT/TGL/SOCD/RS + plain remap) get a different body, supplied by
     src/components/advanced-keys.jsx.
  
     The switch is a capability gate. It resolves to show:false for the
     Win60 AND for the no-board / plain-browser fail-open path, so those
     render exactly the same element tree as before this file changed — the
     only difference is one extra pass-through component layer, which emits
     no DOM of its own.
  
     Lookups are done at RENDER time (not module-eval time) because
     build_runtime.py compiles workspaces/ before src/components/, so
     window.AetherAdvancedKeys / window.AetherBoard do not exist yet when
     this file is evaluated.
     ============================================================ */
  const FALLBACK_BOARD_CTX = React.createContext(null);
  const useBoardSafe = () => {
    const B = window.AetherBoard;
    const val = React.useContext(B && B.BoardContext || FALLBACK_BOARD_CTX);
    return val || B && B.UNKNOWN_BOARD || null;
  };
  const boardAware = (Win60Body, advBodyName) => {
    const Dispatcher = ctx => {
      const board = useBoardSafe();
      const A = window.AetherAdvancedKeys;
      const gate = A ? A.advancedKeysGate(board) : {
        show: false
      };
      if (gate.show && A && A[advBodyName]) {
        return React.createElement(A[advBodyName], {
          ctx,
          gate
        });
      }
      return /*#__PURE__*/React.createElement(Win60Body, ctx);
    };
    Dispatcher.displayName = `BoardAware(${advBodyName})`;
    return Dispatcher;
  };

  /* ===== Widget Array Export ===== */
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.SOCD_WIDGETS = [{
    id: "pair-editor",
    title: "Pair Editor",
    default: {
      x: 20,
      y: 20,
      w: 440,
      h: 520
    },
    min: {
      w: 320,
      h: 400
    },
    render: boardAware(PairEditorWidget, "AdvancedKeyEditor")
  }, {
    id: "hotkey",
    title: "Apply",
    default: {
      x: 480,
      y: 20,
      w: 360,
      h: 160
    },
    min: {
      w: 280,
      h: 120
    },
    render: boardAware(ApplyWidget, "AdvancedKeyStatus")
  }, {
    id: "active-pairs",
    title: "Active Pairs",
    default: {
      x: 480,
      y: 200,
      w: 360,
      h: 340
    },
    min: {
      w: 280,
      h: 240
    },
    render: boardAware(ActivePairsWidget, "AdvancedKeyBindings")
  }];
})();