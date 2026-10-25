<script data-mod="theme">
/* Theme customizer popup â€” palette (1-4 colors) + image backdrop */
(() => {
  const {
    useState,
    useEffect,
    useRef
  } = React;
  const {
    IPalette,
    IWaves,
    IDownload,
    ICheck,
    ITrash,
    IPlus,
    IRefresh
  } = window.AetherIcons;

  /* ===== Curated palettes (each up to 4 colors) ===== */
  const PALETTE_PRESETS = [{
    name: "Lagoon",
    colors: ["#6fe8c0"]
  }, {
    name: "Ember",
    colors: ["#f4b268"]
  }, {
    name: "Tide",
    colors: ["#6fe8c0", "#8ae0ff"]
  }, {
    name: "Moss",
    colors: ["#7be3b0", "#c9e07a"]
  }, {
    name: "Aurora",
    colors: ["#6fe8c0", "#f4b268"]
  }, {
    name: "Mono Slate",
    colors: ["#94a3b8"]
  }];
  const IMAGE_PRESETS = [{
    name: "Ember",
    url: "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><radialGradient id='g' cx='70%' cy='110%' r='120%'><stop offset='0' stop-color='%230c1a17'/><stop offset='0.55' stop-color='%23050b0e'/><stop offset='1' stop-color='%23000000'/></radialGradient><radialGradient id='b1' cx='40%' cy='40%' r='65%'><stop offset='0' stop-color='%23f5a952' stop-opacity='0.35'/><stop offset='1' stop-color='%23f5a952' stop-opacity='0'/></radialGradient><radialGradient id='b2' cx='60%' cy='60%' r='65%'><stop offset='0' stop-color='%231d5c52' stop-opacity='0.35'/><stop offset='1' stop-color='%231d5c52' stop-opacity='0'/></radialGradient></defs><rect width='800' height='500' fill='url(%23g)'/><rect width='800' height='500' fill='url(%23b1)'/><rect width='800' height='500' fill='url(%23b2)'/></svg>`)
  }, {
    name: "Tide",
    url: "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><radialGradient id='g' cx='30%' cy='110%' r='120%'><stop offset='0' stop-color='%2308131f'/><stop offset='0.55' stop-color='%2304080e'/><stop offset='1' stop-color='%23000000'/></radialGradient><radialGradient id='b1' cx='40%' cy='40%' r='65%'><stop offset='0' stop-color='%233aa6c9' stop-opacity='0.3'/><stop offset='1' stop-color='%233aa6c9' stop-opacity='0'/></radialGradient><radialGradient id='b2' cx='60%' cy='60%' r='65%'><stop offset='0' stop-color='%2314456e' stop-opacity='0.35'/><stop offset='1' stop-color='%2314456e' stop-opacity='0'/></radialGradient></defs><rect width='800' height='500' fill='url(%23g)'/><rect width='800' height='500' fill='url(%23b1)'/><rect width='800' height='500' fill='url(%23b2)'/></svg>`)
  }, {
    name: "Moss",
    url: "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><radialGradient id='g' cx='50%' cy='120%' r='120%'><stop offset='0' stop-color='%230b1510'/><stop offset='0.55' stop-color='%2305090a'/><stop offset='1' stop-color='%23000000'/></radialGradient><radialGradient id='b1' cx='40%' cy='40%' r='65%'><stop offset='0' stop-color='%236f9a3e' stop-opacity='0.3'/><stop offset='1' stop-color='%236f9a3e' stop-opacity='0'/></radialGradient><radialGradient id='b2' cx='60%' cy='60%' r='65%'><stop offset='0' stop-color='%231e4d36' stop-opacity='0.35'/><stop offset='1' stop-color='%231e4d36' stop-opacity='0'/></radialGradient></defs><rect width='800' height='500' fill='url(%23g)'/><rect width='800' height='500' fill='url(%23b1)'/><rect width='800' height='500' fill='url(%23b2)'/></svg>`)
  }, {
    name: "Violet Hour",
    url: "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><radialGradient id='g' cx='80%' cy='120%' r='120%'><stop offset='0' stop-color='%23150f1d'/><stop offset='0.55' stop-color='%23070510'/><stop offset='1' stop-color='%23000000'/></radialGradient><radialGradient id='b1' cx='40%' cy='40%' r='65%'><stop offset='0' stop-color='%238a5cf6' stop-opacity='0.3'/><stop offset='1' stop-color='%238a5cf6' stop-opacity='0'/></radialGradient><radialGradient id='b2' cx='60%' cy='60%' r='65%'><stop offset='0' stop-color='%23d4638a' stop-opacity='0.3'/><stop offset='1' stop-color='%23d4638a' stop-opacity='0'/></radialGradient></defs><rect width='800' height='500' fill='url(%23g)'/><rect width='800' height='500' fill='url(%23b1)'/><rect width='800' height='500' fill='url(%23b2)'/></svg>`)
  }];

  /* ===== Helpers ===== */
  function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16)
    } : null;
  }
  function isLight(hex) {
    const r = hexToRgb(hex);
    if (!r) return false;
    const L = 0.299 * r.r + 0.587 * r.g + 0.114 * r.b;
    return L > 160;
  }
  function glowFor(hex, alpha = 0.45) {
    const r = hexToRgb(hex);
    if (!r) return "rgba(255,255,255,0.3)";
    return `rgba(${r.r},${r.g},${r.b},${alpha})`;
  }
  const DEFAULT_THEME = {
    palette: ["#6fe8c0"],
    // 1-4 colors
    gradientAngle: 135,
    useImage: false,
    image: null,
    imageOpacity: 0.6
  };
  function applyTheme(theme) {
    const root = document.documentElement;
    const colors = theme.palette && theme.palette.length ? theme.palette : ["#6fe8c0"];
    const c1 = colors[0];
    root.style.setProperty("--accent", c1);
    root.style.setProperty("--accent-2", colors[1] || c1);
    root.style.setProperty("--accent-3", colors[2] || c1);
    root.style.setProperty("--accent-4", colors[3] || c1);
    root.style.setProperty("--accent-glow", glowFor(c1, 0.45));
    root.style.setProperty("--accent-fg", isLight(c1) ? "#0b0f19" : "#ffffff");
    const gradient = colors.length > 1 ? `linear-gradient(${theme.gradientAngle ?? 135}deg, ${colors.join(", ")})` : c1;
    root.style.setProperty("--accent-gradient", gradient);
    if (colors.length > 1) document.body.classList.add("accent-is-gradient");else document.body.classList.remove("accent-is-gradient");
    const bg = document.getElementById("__bg-image-layer");
    if (theme.useImage && theme.image && bg) {
      bg.style.backgroundImage = `url("${theme.image}")`;
      bg.style.opacity = theme.imageOpacity ?? 0.6;
      bg.style.display = "block";
    } else if (bg) {
      bg.style.display = "none";
    }
  }

  /* Migrate older themes (single accent / gradient mode) to palette */
  function migrate(t) {
    if (Array.isArray(t.palette)) return t;
    // Legacy structure
    const palette = [];
    if (t.mode === "gradient" && t.gradient) {
      palette.push(t.gradient.from, t.gradient.to);
    } else if (t.accent) {
      palette.push(t.accent);
    } else {
      palette.push("#6fe8c0");
    }
    return {
      palette,
      gradientAngle: t.gradient?.angle ?? 135,
      useImage: t.mode === "image",
      image: t.image || null,
      imageOpacity: t.imageOpacity ?? 0.35
    };
  }

  /* ===== Public hook ===== */
  function useTheme() {
    const [theme, setThemeState] = useState(() => {
      try {
        const raw = JSON.parse(localStorage.getItem("aether-theme"));
        if (!raw) return DEFAULT_THEME;
        return {
          ...DEFAULT_THEME,
          ...migrate(raw)
        };
      } catch {
        return DEFAULT_THEME;
      }
    });
    useEffect(() => {
      applyTheme(theme);
      try {
        localStorage.setItem("aether-theme", JSON.stringify(theme));
      } catch {}
    }, [theme]);
    return [theme, setThemeState];
  }

  /* ===== Multi-color slot ===== */
  const ColorSlot = ({
    color,
    onChange,
    onRemove,
    removable
  }) => /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-16 rounded-2xl overflow-hidden ring-1 ring-white/10",
    style: {
      background: color,
      boxShadow: `0 0 24px ${color}55, inset 0 0 0 1px rgba(255,255,255,0.06)`
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: color,
    onChange: e => onChange(e.target.value),
    className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
  }), /*#__PURE__*/React.createElement("span", {
    className: `absolute bottom-1.5 left-2 text-[10px] font-mono ${isLight(color) ? "text-black/70" : "text-white/80"} drop-shadow`,
    style: {
      textShadow: isLight(color) ? "none" : "0 1px 4px rgba(0,0,0,0.6)"
    }
  }, color.toUpperCase()), removable && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    title: "Remove",
    className: `absolute top-1.5 right-1.5 w-5 h-5 rounded-full grid place-items-center ${isLight(color) ? "bg-black/30 text-white" : "bg-white/80 text-black"} hover:scale-110 transition-transform`
  }, "\u2715")));
  const AddSlot = ({
    onAdd
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    className: "flex-1 min-w-0 h-16 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] text-slate-400 hover:border-white/30 hover:bg-white/[0.04] hover:text-white grid place-items-center transition-all"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.18em]"
  }, /*#__PURE__*/React.createElement(IPlus, {
    size: 13
  }), " Add"));

  /* ===== Popup ===== */
  const ThemePopup = ({
    open,
    onClose,
    theme,
    setTheme
  }) => {
    const [tab, setTab] = useState("palette");
    const [draft, setDraft] = useState(theme);
    const fileRef = useRef(null);
    useEffect(() => {
      if (open) {
        setDraft(theme);
        setTab("palette");
      }
    }, [open]);
    useEffect(() => {
      if (open) applyTheme(draft);
    }, [draft, open]);
    useEffect(() => {
      const onKey = e => {
        if (e.key === "Escape" && open) handleClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [open]);
    const handleClose = () => {
      applyTheme(theme);
      onClose();
    };
    const handleApply = () => {
      setTheme(draft);
      onClose();
    };
    const handleReset = () => {
      setDraft(DEFAULT_THEME);
    };
    const palette = draft.palette || ["#6fe8c0"];
    const setSlot = (i, value) => {
      const p = [...palette];
      p[i] = value;
      setDraft(d => ({
        ...d,
        palette: p
      }));
    };
    const addSlot = () => {
      if (palette.length >= 4) return;
      const next = ["#f4b268", "#8ae0ff", "#c9e07a"][palette.length - 1] || "#ffffff";
      setDraft(d => ({
        ...d,
        palette: [...palette, next]
      }));
    };
    const removeSlot = i => {
      if (palette.length <= 1) return;
      setDraft(d => ({
        ...d,
        palette: palette.filter((_, idx) => idx !== i)
      }));
    };
    const usePreset = colors => setDraft(d => ({
      ...d,
      palette: [...colors]
    }));
    const onImageFile = file => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        setDraft(d => ({
          ...d,
          image: e.target.result,
          useImage: true
        }));
      };
      reader.readAsDataURL(file);
    };
    if (!open) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 z-[120] flex items-center justify-center",
      onMouseDown: e => {
        if (e.target === e.currentTarget) handleClose();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-black/65 backdrop-blur-md animate-[fadeIn_180ms_ease-out]"
    }), /*#__PURE__*/React.createElement("div", {
      className: "relative w-[680px] max-w-[92vw] max-h-[90vh] overflow-hidden rounded-3xl bg-[#0e1220]/95 border border-white/[0.06] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset] animate-[popIn_220ms_cubic-bezier(.2,.9,.3,1.1)]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "px-7 pt-6 pb-3 flex items-start justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] font-mono uppercase tracking-[0.28em] text-slate-500"
    }, "Appearance"), /*#__PURE__*/React.createElement("div", {
      className: "text-[22px] font-display font-semibold tracking-[0.02em] text-slate-50 mt-1"
    }, "Customize Theme"), /*#__PURE__*/React.createElement("div", {
      className: "text-[12px] text-slate-500 mt-1"
    }, "Pick up to 4 colors \u2014 they'll cascade through the app, accents and lighting.")), /*#__PURE__*/React.createElement("button", {
      onClick: handleClose,
      className: "w-9 h-9 rounded-full grid place-items-center text-slate-500 hover:text-slate-100 hover:bg-white/[0.06] transition-colors"
    }, "\u2715")), /*#__PURE__*/React.createElement("div", {
      className: "px-7 pb-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.04]"
    }, [{
      id: "palette",
      label: "Palette",
      icon: /*#__PURE__*/React.createElement(IPalette, {
        size: 13
      })
    }, {
      id: "image",
      label: "Background",
      icon: /*#__PURE__*/React.createElement(IDownload, {
        size: 13
      })
    }].map(t => {
      const isActive = tab === t.id;
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        onClick: () => setTab(t.id),
        className: `relative flex items-center gap-2 px-4 h-8 rounded-lg text-[12px] font-display uppercase tracking-[0.18em] transition-all
                              ${isActive ? "text-slate-50 bg-white/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.3)]" : "text-slate-400 hover:text-slate-200"}`
      }, t.icon, t.label);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "px-7 py-5 overflow-y-auto max-h-[60vh]"
    }, tab === "palette" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2.5 mb-4"
    }, palette.map((c, i) => /*#__PURE__*/React.createElement(ColorSlot, {
      key: i,
      color: c,
      onChange: v => setSlot(i, v),
      onRemove: () => removeSlot(i),
      removable: palette.length > 1
    })), palette.length < 4 && /*#__PURE__*/React.createElement(AddSlot, {
      onAdd: addSlot
    })), /*#__PURE__*/React.createElement("div", {
      className: "relative h-10 rounded-xl overflow-hidden ring-1 ring-white/10 mb-5",
      style: {
        background: palette.length > 1 ? `linear-gradient(${draft.gradientAngle ?? 135}deg, ${palette.join(", ")})` : palette[0]
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_55%)]"
    }), /*#__PURE__*/React.createElement("span", {
      className: "absolute bottom-1.5 right-3 font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/80",
      style: {
        textShadow: "0 1px 4px rgba(0,0,0,0.5)"
      }
    }, palette.length === 1 ? "Solid" : `Gradient Â· ${palette.length} stops`)), palette.length > 1 && /*#__PURE__*/React.createElement("div", {
      className: "rounded-2xl bg-white/[0.025] border border-white/[0.05] p-4 mb-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11.5px] uppercase tracking-[0.22em] text-slate-300"
    }, "Gradient angle"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-slate-100"
    }, draft.gradientAngle ?? 135, "\xB0")), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: 0,
      max: 360,
      step: 1,
      value: draft.gradientAngle ?? 135,
      onChange: e => setDraft(d => ({
        ...d,
        gradientAngle: parseInt(e.target.value)
      })),
      className: "aether w-full",
      style: {
        "--pct": (draft.gradientAngle ?? 135) / 360 * 100 + "%"
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] font-mono uppercase tracking-[0.22em] text-slate-500 mb-2"
    }, "Presets"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-2.5"
    }, PALETTE_PRESETS.map((p, i) => {
      const isSel = JSON.stringify(palette) === JSON.stringify(p.colors);
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        onClick: () => usePreset(p.colors),
        className: `relative text-left p-2.5 rounded-xl border transition-all
                                  ${isSel ? "border-white/30 bg-white/[0.06]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex gap-1 mb-1.5"
      }, p.colors.map((c, j) => /*#__PURE__*/React.createElement("span", {
        key: j,
        className: "flex-1 h-4 rounded-md ring-1 ring-white/10",
        style: {
          background: c,
          boxShadow: `0 0 8px ${c}55`
        }
      })), Array.from({
        length: 4 - p.colors.length
      }).map((_, j) => /*#__PURE__*/React.createElement("span", {
        key: `e${j}`,
        className: "flex-1 h-4 rounded-md bg-white/[0.04]"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-display text-[11px] uppercase tracking-[0.14em] text-slate-200"
      }, p.name), isSel && /*#__PURE__*/React.createElement(ICheck, {
        size: 11,
        className: "text-[var(--accent)]"
      })));
    }))), tab === "image" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      className: "flex items-center gap-2.5 mb-4 cursor-pointer"
    }, /*#__PURE__*/React.createElement("span", {
      onClick: () => setDraft(d => ({
        ...d,
        useImage: !d.useImage
      })),
      className: `w-5 h-5 rounded-md border grid place-items-center transition
                                  ${draft.useImage ? "border-[var(--accent)] bg-[var(--accent)]/20" : "border-white/15 bg-white/[0.02]"}`
    }, draft.useImage && /*#__PURE__*/React.createElement(ICheck, {
      size: 12,
      className: "text-[var(--accent)]"
    })), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[13px] uppercase tracking-[0.16em] text-slate-200"
    }, "Use background image")), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-3 mb-5"
    }, IMAGE_PRESETS.map(p => {
      const active = draft.image === p.url;
      return /*#__PURE__*/React.createElement("button", {
        key: p.name,
        onClick: () => setDraft(d => ({
          ...d,
          image: p.url,
          useImage: true
        })),
        className: `relative aspect-[4/3] rounded-2xl overflow-hidden transition-all
                                  ${active ? "ring-2 ring-white/80 scale-[1.02]" : "ring-1 ring-white/10 hover:scale-[1.02]"}`,
        style: {
          background: `url("${p.url}") center/cover`
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "absolute bottom-2 left-2.5 text-[10.5px] font-display uppercase tracking-[0.18em] text-white/90",
        style: {
          textShadow: "0 1px 4px rgba(0,0,0,0.7)"
        }
      }, p.name), active && /*#__PURE__*/React.createElement("span", {
        className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-white/85 grid place-items-center"
      }, /*#__PURE__*/React.createElement(ICheck, {
        size: 11,
        className: "text-black",
        strokeWidth: 3
      })));
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-2xl bg-white/[0.025] border border-white/[0.05] p-4 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] font-mono uppercase tracking-[0.22em] text-slate-500 mb-2"
    }, "Upload custom image"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => fileRef.current?.click(),
      className: "flex-1 h-11 rounded-lg border border-dashed border-white/15 bg-white/[0.025] hover:border-white/30 hover:bg-white/[0.05] text-slate-300 hover:text-white text-[12px] font-display uppercase tracking-[0.18em] transition-all"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center justify-center gap-2"
    }, /*#__PURE__*/React.createElement(IDownload, {
      size: 13
    }), " Choose image")), draft.image && /*#__PURE__*/React.createElement("button", {
      onClick: () => setDraft(d => ({
        ...d,
        image: null
      })),
      className: "w-11 h-11 rounded-lg border border-white/[0.08] bg-white/[0.025] hover:bg-rose-500/15 hover:border-rose-400/40 text-slate-400 hover:text-rose-300 transition-colors grid place-items-center",
      title: "Remove"
    }, /*#__PURE__*/React.createElement(ITrash, {
      size: 14
    })), /*#__PURE__*/React.createElement("input", {
      ref: fileRef,
      type: "file",
      accept: "image/*",
      className: "hidden",
      onChange: e => onImageFile(e.target.files?.[0])
    }))), draft.image && draft.useImage && /*#__PURE__*/React.createElement("div", {
      className: "rounded-2xl bg-white/[0.025] border border-white/[0.05] p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] font-mono uppercase tracking-[0.22em] text-slate-500"
    }, "Opacity"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-slate-200"
    }, Math.round((draft.imageOpacity ?? 0.35) * 100), "%")), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: 5,
      max: 100,
      step: 1,
      value: Math.round((draft.imageOpacity ?? 0.35) * 100),
      onChange: e => setDraft(d => ({
        ...d,
        imageOpacity: parseInt(e.target.value) / 100
      })),
      className: "aether w-full",
      style: {
        "--pct": (draft.imageOpacity ?? 0.35) * 100 + "%"
      }
    })))), /*#__PURE__*/React.createElement("div", {
      className: "px-7 py-4 border-t border-white/[0.05] bg-black/20 flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleReset,
      className: "flex items-center gap-1.5 px-3 h-9 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/[0.04] text-[12px] font-display uppercase tracking-[0.18em] transition-colors"
    }, /*#__PURE__*/React.createElement(IRefresh, {
      size: 13
    }), " Reset"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleClose,
      className: "px-5 h-10 rounded-lg border border-white/[0.08] bg-white/[0.025] text-slate-300 hover:text-white hover:border-white/20 text-[12px] font-display uppercase tracking-[0.18em] transition-all"
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      onClick: handleApply,
      className: "px-6 h-10 rounded-lg font-display text-[12px] uppercase tracking-[0.18em] text-[var(--accent-fg)] transition-all hover:brightness-110",
      style: {
        background: `var(--accent-gradient, var(--accent))`,
        boxShadow: "0 10px 30px -8px var(--accent-glow)"
      }
    }, "Apply")))));
  };

  /* ===== Reusable multi-color picker (1-4 colors) for other settings ===== */
  const ColorPalettePicker = ({
    colors,
    onChange,
    max = 4,
    label
  }) => {
    const setSlot = (i, value) => {
      const p = [...colors];
      p[i] = value;
      onChange(p);
    };
    const add = () => {
      if (colors.length >= max) return;
      const seeds = ["#6fe8c0", "#f4b268", "#8ae0ff", "#c9e07a"];
      onChange([...colors, seeds[colors.length] || "#ffffff"]);
    };
    const remove = i => {
      if (colors.length <= 1) return;
      onChange(colors.filter((_, idx) => idx !== i));
    };
    return /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-slate-400 mb-2"
    }, label), /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2"
    }, colors.map((c, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "relative w-12 h-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative w-full h-full rounded-xl overflow-hidden ring-1 ring-white/10",
      style: {
        background: c,
        boxShadow: `0 0 12px ${c}55`
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "color",
      value: c,
      onChange: e => setSlot(i, e.target.value),
      className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
    })), colors.length > 1 && /*#__PURE__*/React.createElement("button", {
      onClick: () => remove(i),
      title: "Remove",
      className: "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-900 ring-1 ring-white/20 text-slate-300 hover:text-rose-300 grid place-items-center text-[9px]"
    }, "\u2715"))), colors.length < max && /*#__PURE__*/React.createElement("button", {
      onClick: add,
      className: "w-12 h-12 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] text-slate-400 hover:border-white/30 hover:bg-white/[0.04] hover:text-white grid place-items-center transition-all"
    }, /*#__PURE__*/React.createElement(IPlus, {
      size: 14
    }))));
  };
  window.AetherTheme = {
    ThemePopup,
    useTheme,
    applyTheme,
    DEFAULT_THEME,
    ColorPalettePicker
  };
})();
</script>
<script data-mod="desktop">
(() => {
  /* ============================================================
     Desktop-widget shell for AetherHE.
     Exposes window.AetherDesktop = { WidgetFrame, Workspace, Dock, TopBar }.
     Plain JSX, uses global React (no libs). Vanilla pointer events for
     drag + resize. Geometry persists per (workspace,widget) in localStorage
     under key `aether-wgt:{workspace}:{id}`.
     ============================================================ */
  const {
    useState,
    useEffect,
    useRef,
    useCallback
  } = React;
  const I = window.AetherIcons || {};
  const IKeyboard = I.IKeyboard,
    IBulb = I.IBulb,
    IGauge = I.IGauge,
    ICrosshair = I.ICrosshair,
    IZap = I.IZap,
    ISettings = I.ISettings,
    IPlug = I.IPlug,
    IPower = I.IPower,
    ICheck = I.ICheck,
    IMore = I.IMore,
    ILayers = I.ILayers;
  const GRID = 8;
  const snap = v => Math.max(0, Math.round(v / GRID) * GRID);

  /* ============================================================
     Active-board name for the top-bar status chip (additive).
     The chip used to be the hardcoded string "WIN 68 HE MAX", which read wrong
     the moment Aether became multi-board. It now shows whichever board is
     actually selected.
  
     Resolved at module scope so the hook below is unconditional: if the
     board-context module isn't loaded (or nothing is selected) we fall back
     to a private context whose value is null, and the chip renders exactly
     the string it always did. The Win60 keeps its historical label verbatim
     via BOARD_CHIP_LABEL rather than a derived one, so its UI is unchanged.
     ============================================================ */
  const BOARD_CTX = window.AetherBoard && window.AetherBoard.BoardContext || React.createContext(null);
  const BOARD_CHIP_LABEL = {
    "aula-win60-he": "WIN 68 HE MAX"
  };
  const boardChipName = board => {
    if (!board) return "WIN 68 HE MAX"; // fail-open: today's string
    if (BOARD_CHIP_LABEL[board.slug]) return BOARD_CHIP_LABEL[board.slug];
    return String(board.name || "").replace(/^aula\s+/i, "") // vendor prefix is noise here
    .replace(/\s*\([^)]*\)\s*/g, " ") // drop "(wired)" / "(2.4GHz dongle)"
    .trim().toUpperCase() || "KEYBOARD";
  };

  /* ---- geometry persistence ---- */
  const geoKey = (workspace, id) => `aether-wgt:${workspace}:${id}`;
  const loadGeo = (workspace, id) => {
    try {
      const raw = localStorage.getItem(geoKey(workspace, id));
      if (!raw) return null;
      const g = JSON.parse(raw);
      if (!g || typeof g !== "object") return null;
      return g;
    } catch {
      return null;
    }
  };
  const saveGeo = (workspace, id, geo) => {
    try {
      localStorage.setItem(geoKey(workspace, id), JSON.stringify(geo));
    } catch {}
  };

  /* ============================================================
     WidgetFrame â€” a draggable + resizable window with an Impact title bar.
     Drag by the title bar, resize by the bottom-right handle, minimize button.
     ============================================================ */
  function WidgetFrame({
    id,
    workspace,
    title,
    defaultPos,
    defaultSize,
    minSize,
    onMinimize,
    z,
    onFocus,
    children
  }) {
    const min = minSize || {
      w: 220,
      h: 140
    };
    const init = loadGeo(workspace, id);
    const [pos, setPos] = useState(() => init && init.pos || defaultPos || {
      x: 40,
      y: 40
    });
    const [size, setSize] = useState(() => init && init.size || defaultSize || {
      w: 360,
      h: 300
    });
    const [minimized, setMinimized] = useState(() => !!(init && init.minimized));
    const [drag, setDrag] = useState(false);
    const [resizing, setResizing] = useState(false);
    const gesture = useRef(null);

    // Persist geometry whenever it settles.
    useEffect(() => {
      saveGeo(workspace, id, {
        pos,
        size,
        minimized
      });
    }, [workspace, id, pos, size, minimized]);

    // Report minimized transitions up so the Workspace can drive the dock.
    useEffect(() => {
      if (onMinimize) onMinimize(id, minimized);
    }, [minimized]);
    const onTitleDown = useCallback(e => {
      if (e.target.closest("button, input, textarea, select, a")) return;
      gesture.current = {
        kind: "drag",
        px: e.clientX,
        py: e.clientY,
        x: pos.x,
        y: pos.y
      };
      setDrag(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }, [pos.x, pos.y]);
    const onResizeDown = useCallback(e => {
      e.stopPropagation();
      gesture.current = {
        kind: "resize",
        px: e.clientX,
        py: e.clientY,
        w: size.w,
        h: size.h
      };
      setResizing(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }, [size.w, size.h]);
    const onMove = useCallback(e => {
      const g = gesture.current;
      if (!g) return;
      if (g.kind === "drag") {
        setPos({
          x: snap(g.x + (e.clientX - g.px)),
          y: snap(g.y + (e.clientY - g.py))
        });
      } else if (g.kind === "resize") {
        setSize({
          w: Math.max(min.w, snap(g.w + (e.clientX - g.px))),
          h: Math.max(min.h, snap(g.h + (e.clientY - g.py)))
        });
      }
    }, [min.w, min.h]);
    const endGesture = useCallback(() => {
      gesture.current = null;
      setDrag(false);
      setResizing(false);
    }, []);
    if (minimized) return null;
    return /*#__PURE__*/React.createElement("section", {
      className: `widget glass${drag ? " dragging" : ""}${resizing ? " resizing" : ""}`,
      style: {
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        zIndex: z || 1
      },
      onPointerDownCapture: () => onFocus && onFocus(id)
    }, /*#__PURE__*/React.createElement("header", {
      className: "widget-head",
      onPointerDown: onTitleDown,
      onPointerMove: onMove,
      onPointerUp: endGesture,
      onPointerCancel: endGesture
    }, /*#__PURE__*/React.createElement("span", {
      className: "widget-dot",
      "aria-hidden": true
    }), /*#__PURE__*/React.createElement("span", {
      className: "widget-title font-title"
    }, title), /*#__PURE__*/React.createElement("button", {
      className: "widget-min",
      title: "Minimize",
      "aria-label": `Minimize ${title}`,
      onClick: e => {
        e.stopPropagation();
        setMinimized(true);
      }
    }, "\u2013")), /*#__PURE__*/React.createElement("div", {
      className: "widget-body"
    }, children), /*#__PURE__*/React.createElement("div", {
      className: "widget-resize",
      title: "Resize",
      onPointerDown: onResizeDown,
      onPointerMove: onMove,
      onPointerUp: endGesture,
      onPointerCancel: endGesture
    }));
  }

  /* ============================================================
     Dock â€” bottom-center pill of minimized-widget buttons.
     ============================================================ */
  function Dock({
    items,
    onRestore
  }) {
    if (!items || !items.length) return null;
    return /*#__PURE__*/React.createElement("nav", {
      className: "dock glass"
    }, items.map(w => /*#__PURE__*/React.createElement("button", {
      key: w.id,
      className: "font-title",
      title: `Restore ${w.title}`,
      onClick: () => onRestore(w.id)
    }, w.title)));
  }

  /* ============================================================
     Workspace â€” absolute-positioned desktop surface. Renders each widget in a
     WidgetFrame, plus a per-workspace Dock of minimized widgets to restore.
     widgets = [{ id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }]
     ============================================================ */
  function Workspace({
    section,
    widgets,
    ctx
  }) {
    const list = widgets || [];
    // Track which widgets are minimized (seeded from persisted geometry).
    const [minimized, setMinimized] = useState(() => {
      const s = {};
      list.forEach(w => {
        const g = loadGeo(section, w.id);
        if (g && g.minimized) s[w.id] = true;
      });
      return s;
    });
    // Reset when the workspace (section) changes.
    useEffect(() => {
      const s = {};
      list.forEach(w => {
        const g = loadGeo(section, w.id);
        if (g && g.minimized) s[w.id] = true;
      });
      setMinimized(s);
    }, [section]);
    const handleMinimize = useCallback((id, isMin) => {
      setMinimized(prev => prev[id] === isMin ? prev : {
        ...prev,
        [id]: isMin
      });
    }, []);
    const restore = useCallback(id => {
      // Flip persisted geometry and force a remount of that frame.
      const g = loadGeo(section, id) || {};
      saveGeo(section, id, {
        ...g,
        minimized: false
      });
      setMinimized(prev => ({
        ...prev,
        [id]: false
      }));
      setNonce(n => n + 1);
    }, [section]);
    const [nonce, setNonce] = useState(0);

    // Stacking order: clicking a widget raises it above the others and it stays
    // there until another is clicked. Seeded so array order is the initial stack.
    const zTop = useRef(10 + list.length);
    const [zmap, setZmap] = useState(() => {
      const m = {};
      list.forEach((w, i) => {
        m[w.id] = 10 + i;
      });
      return m;
    });
    useEffect(() => {
      const m = {};
      list.forEach((w, i) => {
        m[w.id] = 10 + i;
      });
      zTop.current = 10 + list.length;
      setZmap(m);
    }, [section]);
    const raise = useCallback(id => {
      setZmap(prev => prev[id] === zTop.current ? prev : {
        ...prev,
        [id]: ++zTop.current
      });
    }, []);
    const dockItems = list.filter(w => minimized[w.id]);
    return /*#__PURE__*/React.createElement("div", {
      className: "workspace",
      "data-section": section
    }, list.map(w => /*#__PURE__*/React.createElement(WidgetFrame, {
      key: `${section}:${w.id}:${nonce}`,
      id: w.id,
      workspace: section,
      title: w.title,
      defaultPos: {
        x: w.default.x,
        y: w.default.y
      },
      defaultSize: {
        w: w.default.w,
        h: w.default.h
      },
      minSize: w.min,
      onMinimize: handleMinimize,
      z: zmap[w.id],
      onFocus: raise
    }, React.createElement(w.render, ctx))), /*#__PURE__*/React.createElement(Dock, {
      items: dockItems,
      onRestore: restore
    }));
  }

  /* ============================================================
     TopBar â€” horizontal section tabs (Impact) + brand + connect cluster.
     Sections: keymap, macros, lighting, actuation, socd, gamepad, settings.
     (app.jsx filters this list per board â€” "macros" is capability-gated.)
     ============================================================ */
  const SECTION_DEFS = [{
    id: "keymap",
    label: "Keymap",
    icon: IKeyboard
  }, {
    id: "macros",
    label: "Macros",
    icon: ILayers
  }, {
    id: "lighting",
    label: "Lighting",
    icon: IBulb
  }, {
    id: "actuation",
    label: "Actuation",
    icon: IGauge
  }, {
    id: "socd",
    label: "SOCD",
    icon: ICrosshair
  }, {
    id: "gamepad",
    label: "Gamepad",
    icon: IZap
  }, {
    id: "settings",
    label: "Settings",
    icon: ISettings
  }];
  function TopBar({
    sections,
    active,
    onSelect,
    connected,
    connecting,
    onTogglePair,
    autoConnect,
    setAutoConnect,
    onOpenSettings,
    zoom,
    setZoom
  }) {
    const defs = sections || SECTION_DEFS;
    const bctx = React.useContext(BOARD_CTX);
    const chipName = boardChipName(bctx && bctx.board);
    return /*#__PURE__*/React.createElement("header", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "topbar-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "topbar-brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: window.__resources && window.__resources.logo || "assets/logo.png",
      alt: "",
      className: "topbar-logo"
    }), /*#__PURE__*/React.createElement("span", {
      className: "topbar-name font-title"
    }, "AETHER")), /*#__PURE__*/React.createElement("nav", {
      className: "topbar-tabs"
    }, defs.map(s => {
      const Icon = s.icon;
      const on = active === s.id;
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        onClick: () => onSelect(s.id),
        className: `topbar-tab font-title${on ? " on" : ""}`
      }, Icon && /*#__PURE__*/React.createElement(Icon, {
        size: 14
      }), /*#__PURE__*/React.createElement("span", null, s.label));
    })), /*#__PURE__*/React.createElement("div", {
      className: "topbar-right"
    }, /*#__PURE__*/React.createElement("div", {
      className: `topbar-status${connected ? " linked" : ""}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "topbar-dot"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-title",
      title: bctx && bctx.board && bctx.board.vidPid || ""
    }, chipName), /*#__PURE__*/React.createElement("span", {
      className: "topbar-state"
    }, connected ? "Linked" : "Offline")), /*#__PURE__*/React.createElement("label", {
      className: "topbar-auto",
      title: "Connect automatically on launch"
    }, /*#__PURE__*/React.createElement("span", {
      onClick: () => setAutoConnect(!autoConnect),
      className: `topbar-check${autoConnect ? " on" : ""}`
    }, autoConnect && ICheck && /*#__PURE__*/React.createElement(ICheck, {
      size: 9
    })), /*#__PURE__*/React.createElement("span", {
      className: "font-title"
    }, "Auto")), /*#__PURE__*/React.createElement("button", {
      onClick: onTogglePair,
      disabled: connecting,
      className: `topbar-pair${connected ? " on" : ""}`
    }, connected ? IPower && /*#__PURE__*/React.createElement(IPower, {
      size: 13
    }) : IPlug && /*#__PURE__*/React.createElement(IPlug, {
      size: 13
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-title"
    }, connecting ? "â€¦" : connected ? "Connected" : "Pair")), setZoom && /*#__PURE__*/React.createElement("div", {
      className: "topbar-zoom",
      title: "Zoom the workspace"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setZoom(z => Math.max(0.5, +(z - 0.1).toFixed(2))),
      "aria-label": "Zoom out"
    }, "\u2013"), /*#__PURE__*/React.createElement("span", {
      className: "font-title",
      onClick: () => setZoom(1),
      title: "Reset zoom"
    }, Math.round((zoom || 1) * 100), "%"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setZoom(z => Math.min(2, +(z + 0.1).toFixed(2))),
      "aria-label": "Zoom in"
    }, "+")), /*#__PURE__*/React.createElement("button", {
      title: "Settings",
      onClick: onOpenSettings,
      className: "topbar-gear"
    }, ISettings && /*#__PURE__*/React.createElement(ISettings, {
      size: 14
    })))));
  }
  window.AetherDesktop = {
    WidgetFrame,
    Workspace,
    Dock,
    TopBar,
    SECTION_DEFS
  };
})();
</script>
<script data-mod="ws_actuation">
(() => {
  /* ============================================================
     Actuation workspace â€” the REFERENCE workspace for the desktop-widget shell.
     Exports window.AetherWorkspaces.ACTUATION_WIDGETS â€” an array of widget descriptors:
       { id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }
     Each render() reads/calls ONLY ctx.* (state + handlers app.jsx passes down).
     Control JSX + telemetry (SwitchRender depth math, live depth) reused verbatim
     from the old ActuationSection via window.AetherSections shared primitives.
     ============================================================ */
  const {
    useState
  } = React;
  const S = window.AetherSections || {};
  const Slider = S.Slider,
    Chip = S.Chip,
    SwitchRender = S.SwitchRender;
  const I = window.AetherIcons || {};
  const ICheck = I.ICheck,
    ICrosshair = I.ICrosshair;

  /* Shared apply-button class + confirm toast (from ActuationSection). */
  const applyBtnCls = enabled => `px-4 h-9 rounded-md border font-display text-[12px] uppercase tracking-[0.16em] transition-all ${enabled ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_18px_var(--accent-glow)] hover:brightness-110" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] cursor-not-allowed"}`;
  const useFlash = () => {
    const [confirm, setConfirm] = useState(null);
    const flash = msg => {
      setConfirm(msg);
      setTimeout(() => setConfirm(null), 2400);
    };
    return [confirm, flash];
  };
  const ConfirmToast = ({
    confirm
  }) => confirm ? /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
  }, "\u2713 ", confirm) : null;

  /* ============================================================
     Board-awareness helpers (additive â€” PER_BOARD_PARITY_PLAN step 6).
     ctx.board is the board-context value from components/board-context.jsx
     (locked contract). Everything falls back to today's hardcoded values when
     the board declares nothing, so the Win60 (and any unknown board) renders
     exactly as before.
     ============================================================ */
  const boardCtxOf = ctx => ctx && ctx.board || window.AetherBoard && window.AetherBoard.UNKNOWN_BOARD || {
    board: null,
    lighting: null,
    actuation: null,
    cap: () => undefined,
    capState: () => "unknown",
    isSupported: () => true
  };

  /* [min, max] from a registry range with a hardcoded fallback (today's values). */
  const rangeOr = (r, fallback) => Array.isArray(r) && r.length === 2 && isFinite(r[0]) && isFinite(r[1]) ? r : fallback;

  /* ===== Travel widget (actuation point + rapid trigger + live switch render) ===== */
  function TravelWidget(ctx) {
    const {
      actuation,
      setActuation,
      rtPress,
      setRtPress,
      rtRelease,
      setRtRelease,
      rtEnabled,
      setRtEnabled,
      travelTest,
      setTravelTest,
      liveMax = 0,
      selectedKeys,
      applyActuation
    } = ctx;
    const selectedCount = selectedKeys ? selectedKeys.size : 0;
    React.useEffect(() => {
      if (!selectedKeys || selectedKeys.size === 0 || !ctx.perKeyActuation) return;
      const code = Array.from(selectedKeys)[selectedKeys.size - 1];
      const ov = ctx.perKeyActuation[code];
      if (ov && typeof ov === "object") {
        const tMode = Number(ov.touchMode) || 0;
        const actVal = Number(ov.actuation) || (tMode === 0 ? 2.00 : 1.50);
        ctx.setActuation(actVal);
        if (tMode === 2) {
          ctx.setRtEnabled(true);
          ctx.setRtPress(Number(ov.rtPress) || 0.05);
          ctx.setRtRelease(Number(ov.rtRelease) || 0.05);
        } else {
          ctx.setRtEnabled(false);
        }
      } else if (typeof ov === "number") {
        ctx.setActuation(ov);
        ctx.setRtEnabled(false);
      } else {
        ctx.setActuation(2.00);
        ctx.setRtEnabled(false);
      }
    }, [selectedKeys, ctx.perKeyActuation]);
    const scope = selectedCount > 0 ? `${selectedCount} selected key${selectedCount > 1 ? "s" : ""}` : "no keys (select some)";
    const canApply = selectedCount > 0;
    const [confirm, flash] = useFlash();

    /* Board awareness (additive): ranges from the registry actuation block when
       present (the Win60's block equals today's hardcoded values), rapid-trigger
       gated on the capability flag ("wip" = source-only = unavailable; unknown =
       fail-open = render as today). */
    const bctx = boardCtxOf(ctx);
    const bact = bctx.actuation;
    const boardName = bctx.board && bctx.board.name || "this board";
    const [travelMin, travelMax] = rangeOr(bact && bact.travelRange, [0.1, 3.4]);
    const [rtMin, rtMax] = rangeOr(bact && bact.rtRange, [0.05, 2.0]);
    const rtState = bctx.capState ? bctx.capState("rapidTrigger") : "unknown";
    const rtAvailable = rtState === "yes" || rtState === "unknown";
    const handleApplyTravel = () => {
      if (!canApply || !applyActuation) return;
      applyActuation();
      const rt = rtEnabled && rtAvailable ? ` Â· RT press ${rtPress.toFixed(2)}mm / release ${rtRelease.toFixed(2)}mm` : "";
      flash(`Wrote ${actuation.toFixed(2)}mm to ${selectedCount} key${selectedCount === 1 ? "" : "s"}${rt}`);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Travel Test"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setTravelTest(!travelTest),
      className: `relative w-10 h-5 rounded-full border transition-colors
                        ${travelTest ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-white/[0.04] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                              ${travelTest ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-slate-400"}`
    }))), /*#__PURE__*/React.createElement(SwitchRender, {
      depth: travelTest ? liveMax : 0,
      actuation: actuation
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "mb-5 inline-flex items-center gap-2 px-3 h-7 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.06]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Applying to"), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
    }, scope)), /*#__PURE__*/React.createElement("div", {
      className: "mb-5"
    }, /*#__PURE__*/React.createElement(() => {
      const [gTravel, setGTravel] = React.useState(() => Number(window.__globalTravelMm) || 2.00);
      // Sync initial global travel from an unconfigured key (touchMode === 0) when perKeyActuation loads
      React.useEffect(() => {
        if (!ctx.perKeyActuation) return;
        for (const v of Object.values(ctx.perKeyActuation)) {
          if (v && typeof v === "object" && v.touchMode === 0 && v.actuation) {
            const val = Number(v.actuation);
            window.__globalTravelMm = val;
            setGTravel(val);
            break;
          }
        }
      }, [ctx.perKeyActuation]);
      const applyGlobal = async (val) => {
        const clamped = Math.max(0.10, Math.min(3.40, Math.round(Number(val) * 100) / 100));
        window.__globalTravelMm = clamped;
        setGTravel(clamped);
        if (!ctx.connected) return;
        const allC = (window.AetherKeyboard && window.AetherKeyboard.KB_ROWS || []).flat().map(k => k[2]);
        await ctx.apiCall("set_trigger_codes", allC, clamped, 0, 0, 98);
        if (ctx.refreshPerKeyActuation) ctx.refreshPerKeyActuation();
        flash(`Global Travel set to ${clamped.toFixed(2)}mm (all non-custom keys)`);
      };
      return /*#__PURE__*/React.createElement("div", {
        className: "rounded-xl border border-[var(--line)] bg-white/[0.015] p-3.5 space-y-2.5 mb-2"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-display text-[11.5px] uppercase tracking-[0.16em] text-[var(--text)] font-semibold"
      }, "Global Travel"), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => applyGlobal(gTravel),
        className: "px-2.5 py-1 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--accent)] transition"
      }, "Apply Global")), /*#__PURE__*/React.createElement("p", {
        className: "text-[11px] text-[var(--text-faint)] leading-relaxed"
      }, "Sets the default trigger travel for all unconfigured keys (not displayed on keycaps)."), /*#__PURE__*/React.createElement(Slider, {
        label: "Global Trigger Travel",
        value: gTravel,
        min: travelMin,
        max: travelMax,
        step: 0.01,
        unit: "mm",
        onChange: v => setGTravel(Math.round(v * 100) / 100)
      }));
    }), /*#__PURE__*/React.createElement(Slider, {
      label: "Key Trigger Travel",
      value: actuation,
      min: travelMin,
      max: travelMax,
      step: 0.01,
      unit: "mm",
      onChange: setActuation
    })), rtAvailable ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
      className: "flex items-center gap-2 cursor-pointer select-none mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-4 h-4 rounded border grid place-items-center transition
                                ${rtEnabled ? "border-[var(--accent)] bg-[var(--accent)]/20" : "border-[var(--line)] bg-white/[0.02]"}`,
      onClick: () => setRtEnabled(!rtEnabled)
    }, rtEnabled && ICheck && /*#__PURE__*/React.createElement(ICheck, {
      size: 10,
      className: "text-[var(--accent)]"
    })), /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: rtEnabled,
      onChange: e => setRtEnabled(e.target.checked),
      className: "sr-only"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11.5px] uppercase tracking-[0.16em] text-[var(--text)]"
    }, "Rapid Trigger"), Chip && /*#__PURE__*/React.createElement(Chip, {
      color: "accent"
    }, "RT")), /*#__PURE__*/React.createElement("p", {
      className: "text-[11.5px] text-[var(--text-faint)] leading-relaxed mb-4"
    }, "Rapid Trigger dynamically actuates and resets your key based on your intent \u2014 perfect for counter-strafing and rebound presses."), rtEnabled && /*#__PURE__*/React.createElement("div", {
      className: "mt-4 p-4 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/[0.05] space-y-4"
    }, /*#__PURE__*/React.createElement(() => {
      const [cont, setCont] = React.useState(() => !!window.__rtContinuous);
      const choose = (val) => {
        window.__rtContinuous = !!val;
        setCont(!!val);
      };
      return /*#__PURE__*/React.createElement("div", {
        className: "flex flex-col gap-2 pb-3 border-b border-[var(--line)]"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between gap-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-display text-[11px] uppercase tracking-[0.15em] text-[var(--text)]"
      }, "Rapid Trigger Mode"), /*#__PURE__*/React.createElement("div", {
        className: "inline-flex rounded-md border border-[var(--line)] bg-black/30 p-0.5 gap-1"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => choose(false),
        className: `px-2.5 py-1 rounded text-[10.5px] font-mono uppercase tracking-[0.12em] transition ${!cont ? "bg-[var(--accent)] text-black font-semibold shadow-sm" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`
      }, "Basic RT"), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => choose(true),
        className: `px-2.5 py-1 rounded text-[10.5px] font-mono uppercase tracking-[0.12em] transition ${cont ? "bg-[var(--accent)] text-black font-semibold shadow-sm" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`
      }, "Continuous RT"))), /*#__PURE__*/React.createElement("span", {
        className: "text-[11px] text-[var(--text-faint)]"
      }, cont ? "Continuous RT: Active across full keystroke (0.10mm-3.40mm) until key is completely released." : "Basic RT: Activates at your actuation point and immediately resets as soon as the key rises above it."));
    }), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-5"
    }, /*#__PURE__*/React.createElement(Slider, {
      label: "Press Sensitivity",
      value: rtPress,
      min: 0.01,
      max: 2.0,
      step: 0.01,
      unit: "mm",
      onChange: setRtPress
    }), /*#__PURE__*/React.createElement(Slider, {
      label: "Release Sensitivity",
      value: rtRelease,
      min: 0.01,
      max: 2.0,
      step: 0.01,
      unit: "mm",
      onChange: setRtRelease
    })))) :
    /*#__PURE__*/
    /* Unavailable â€” same info-box idiom as Dead Band / Switch / Calibration
       (and the pre-existing Polling readout): bordered ink card, mono body. */
    React.createElement("div", {
      className: "mb-4 p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11.5px] uppercase tracking-[0.16em] text-[var(--text-dim)]"
    }, "Rapid Trigger"), Chip && /*#__PURE__*/React.createElement(Chip, {
      color: "accent"
    }, "RT")), /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--text-dim)] leading-relaxed"
    }, rtState === "wip" ? `Rapid trigger is not yet available on ${boardName} â€” its protocol is known only from vendor driver source and has not been verified on hardware, so Aether will not drive it.` : `${boardName} does not support rapid trigger.`)), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleApplyTravel,
      disabled: !canApply,
      className: applyBtnCls(canApply)
    }, "Apply to ", selectedCount || 0, " key", selectedCount === 1 ? "" : "s"), confirm ? /*#__PURE__*/React.createElement(ConfirmToast, {
      confirm: confirm
    }) : /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, canApply ? "writes only the selected keys" : "select keys on the board to enable"))));
  }

  /* ===== Dead Band widget ===== */
  function DeadBandWidget(ctx) {
    const {
      deadTop,
      setDeadTop,
      deadBottom,
      setDeadBottom,
      selectedKeys,
      applyDeadband
    } = ctx;
    const selectedCount = selectedKeys ? selectedKeys.size : 0;
    const [confirm, flash] = useFlash();

    /* Board awareness (additive). deadzoneScope "global" means the dead zones
       live in ONE whole-board config table â€” a per-key control CANNOT work on
       that hardware, so the widget becomes a single board-wide control. The
       Win60 declares "per-key" (and unknown boards declare nothing), so both
       take the original per-key path unchanged. */
    const bctx = boardCtxOf(ctx);
    const bact = bctx.actuation;
    const boardName = bctx.board && bctx.board.name || "this board";
    const globalScope = !!(bact && bact.deadzoneScope === "global");
    const [dzMin, dzMax] = rangeOr(bact && bact.deadzoneRange, [0.0, 0.5]);
    const dzState = bctx.capState ? bctx.capState("deadzone") : "unknown";
    const canApply = globalScope ? true : selectedCount > 0;
    const handleApplyDead = () => {
      if (!canApply || !applyDeadband) return;
      applyDeadband();
      flash(`Wrote dead band ${(deadTop ?? 0.04).toFixed(2)}/${(deadBottom ?? 0.05).toFixed(2)}mm to ${globalScope ? "the whole board" : `${selectedCount} key${selectedCount === 1 ? "" : "s"}`}`);
    };

    /* Capability gate: "wip" = decoded from vendor source only, never proven on
       hardware â€” do not drive it. The Win60 flag is a hard true (and unknown
       boards fail open), so this branch never renders there. */
    if (dzState === "wip" || dzState === "no") {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        className: "text-[12px] text-[var(--text-dim)] mb-4"
      }, "Configure the dead-band region near the keycap's rest and bottom-out positions \u2014 noise inside this band is ignored."), /*#__PURE__*/React.createElement("div", {
        className: "p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed"
      }, dzState === "wip" ? `Dead-band control is not yet available on ${boardName} â€” its protocol is known only from vendor driver source and has not been verified on hardware, so Aether will not drive it.` : `${boardName} does not support dead-band configuration.`));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mb-5"
    }, globalScope ? /*#__PURE__*/React.createElement(React.Fragment, null, "Configure the dead-band region near the keycap's rest and bottom-out positions \u2014 noise inside this band is ignored. On ", boardName, " the dead zones are a ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "single board-wide setting"), ": per-key dead bands are not possible on this hardware, so these values apply to every key at once.") : /*#__PURE__*/React.createElement(React.Fragment, null, "Configure the dead-band region near the keycap's rest and bottom-out positions \u2014 noise inside this band is ignored. Press ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Apply"), " to write to the selected keys.")), globalScope && /*#__PURE__*/React.createElement("div", {
      className: "mb-5 inline-flex items-center gap-2 px-3 h-7 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.06]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Scope"), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
    }, "Whole board \xB7 every key")), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-6"
    }, /*#__PURE__*/React.createElement(Slider, {
      label: "Top Dead Band",
      value: deadTop ?? 0.04,
      min: dzMin,
      max: dzMax,
      step: 0.01,
      unit: "mm",
      onChange: setDeadTop
    }), /*#__PURE__*/React.createElement(Slider, {
      label: "Bottom Dead Band",
      value: deadBottom ?? 0.05,
      min: dzMin,
      max: dzMax,
      step: 0.01,
      unit: "mm",
      onChange: setDeadBottom
    })), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleApplyDead,
      disabled: !canApply,
      className: applyBtnCls(canApply)
    }, globalScope ? "Apply to whole board" : /*#__PURE__*/React.createElement(React.Fragment, null, "Apply to ", selectedCount || 0, " key", selectedCount === 1 ? "" : "s")), confirm ? /*#__PURE__*/React.createElement(ConfirmToast, {
      confirm: confirm
    }) : /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, globalScope ? "one pair of values for every key â€” key selection is ignored" : canApply ? "writes only the selected keys" : "select keys on the board to enable")));
  }

  /* ===== Switch widget ===== */
  const SWITCHES = [{
    id: "hm1",
    name: "HM1",
    sub: "Magnetic Switch",
    dot: "#3b82f6",
    maker: "Gateron",
    travel: "4.0 mm",
    force: "30 gf",
    range: "0.1 â€“ 4.0 mm",
    poles: "Single",
    life: "100 M"
  }, {
    id: "hh1",
    name: "HH1",
    sub: "Magnetic Switch",
    dot: "#a3a300",
    maker: "Gateron",
    travel: "3.5 mm",
    force: "40 gf",
    range: "0.1 â€“ 3.5 mm",
    poles: "Single",
    life: "100 M"
  }, {
    id: "cy1",
    name: "CY1",
    sub: "Magnetic Switch",
    dot: "#cbd5e1",
    maker: "KZZI",
    travel: "3.4 mm",
    force: "35 gf",
    range: "0.1 â€“ 3.4 mm",
    poles: "Single",
    life: "80 M"
  }, {
    id: "tc1",
    name: "TC1",
    sub: "TTC Kom",
    dot: "#c026d3",
    maker: "TTC",
    travel: "3.6 mm",
    force: "45 gf",
    range: "0.2 â€“ 3.6 mm",
    poles: "Dual",
    life: "100 M"
  }];
  function SwitchWidget(ctx) {
    const {
      switchId,
      handlePickSwitch
    } = ctx;

    /* Board awareness (additive): the switch/axis list comes from the registry
       actuation block when the board declares one. The Win60's registry list
       carries the same four ids as the hardcoded list below, and matching ids
       keep the hardcoded display fields verbatim â€” so the Win60 renders
       byte-identically. A board that declares an EMPTY list (axis ids never
       verified on hardware) gets an honest explanation instead of a picker.
       No board data at all -> today's hardcoded list (fail-open). */
    const bctx = boardCtxOf(ctx);
    const bact = bctx.actuation;
    const boardName = bctx.board && bctx.board.name || "this board";
    let switchList = SWITCHES;
    if (bact && Array.isArray(bact.switches)) {
      if (bact.switches.length === 0) {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
          className: "text-[12px] text-[var(--text-dim)] mb-5"
        }, "Select the magnetic switch profile installed in your board. Calibration curves load automatically."), /*#__PURE__*/React.createElement("div", {
          className: "p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed"
        }, "No verified switch list for ", boardName, " yet \u2014 this board selects its magnetic axis per key by an id that has never been read back from hardware. Aether will not guess axis ids, so the switch picker stays disabled."));
      }
      switchList = bact.switches.map(s => {
        const legacy = SWITCHES.find(x => x.id === s.id);
        return legacy ? {
          ...s,
          ...legacy
        } : s;
      });
    }
    const defaultId = switchList[0] && switchList[0].id || "hm1";
    const cur = switchList.find(s => s.id === (switchId || defaultId)) || switchList[0];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mb-5"
    }, "Select the magnetic switch profile installed in your board. Calibration curves load automatically."), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-3 mb-5"
    }, switchList.map(s => {
      const active = (switchId || defaultId) === s.id;
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        onClick: () => handlePickSwitch && handlePickSwitch(s.id),
        className: `text-left rounded-lg border p-3 transition-all
                        ${active ? "border-[var(--accent)]/50 bg-[var(--accent)]/[0.06] shadow-[0_0_14px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("div", {
        className: "font-display text-[14px] text-[var(--text)]"
      }, s.name), /*#__PURE__*/React.createElement("span", {
        className: "w-2.5 h-2.5 rounded-full",
        style: {
          background: s.dot,
          boxShadow: `0 0 8px ${s.dot}`
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: "font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em] mt-0.5"
      }, s.sub));
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-2.5 h-2.5 rounded-full",
      style: {
        background: cur.dot,
        boxShadow: `0 0 8px ${cur.dot}`
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[13px] text-[var(--text)]"
    }, cur.name), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em]"
    }, cur.maker, " \xB7 ", cur.sub)), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 font-mono text-[11px]"
    }, [["Total Travel", cur.travel || "â€”"], ["Actuation Range", cur.range || "â€”"], ["Initial Force", cur.force || "â€”"], ["Sensing", cur.poles ? cur.poles + " Hall" : "â€”"], ["Rated Life", cur.life ? cur.life + " presses" : "â€”"], ["Tech", "Magnetic / Analog"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
      key: k
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text-faint)] uppercase tracking-[0.14em] text-[9.5px]"
    }, k), /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text)] mt-0.5"
    }, v))))));
  }

  /* ===== Polling Rate widget ===== */
  function PollingWidget(ctx) {
    const {
      polling,
      handleSetPolling
    } = ctx;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mb-5"
    }, "Switch the polling rate of the device. The keyboard will restart and disconnect briefly after switching."), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-nowrap gap-2"
    }, [1, 2, 4, 8].map(p => /*#__PURE__*/React.createElement("button", {
      key: p,
      onClick: () => handleSetPolling(p),
      className: `px-4 h-9 rounded-md border font-display text-[12px] uppercase tracking-[0.16em] transition-all
                        ${polling === p ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_18px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, p, "KHz"))), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "current"), " \xB7 ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, polling, "000 Hz"), " \xB7 ", (1 / polling).toFixed(2), "ms tick"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "latency"), " \xB7 ~", (0.5 + 1 / polling).toFixed(2), "ms end-to-end")));
  }

  /* ===== Calibration widget ===== */
  function CalibrationWidget(ctx) {
    const {
      calibrating,
      handleCalibrate
    } = ctx;

    /* Board awareness (additive): gate on the calibration capability. "wip"
       means the commands are only known from vendor driver source â€” never
       verified on hardware â€” and must not be driven. The Win60 flag is a hard
       true (and unknown boards fail open), so it renders exactly as today. */
    const bctx = boardCtxOf(ctx);
    const calState = bctx.capState ? bctx.capState("calibration") : "unknown";
    if (calState === "wip" || calState === "no") {
      const boardName = bctx.board && bctx.board.name || "this board";
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)] mb-3"
      }, "Key Calibration"), /*#__PURE__*/React.createElement("div", {
        className: "p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed max-w-2xl"
      }, calState === "wip" ? `Calibration is not yet available on ${boardName} â€” its protocol is known only from vendor driver source and has not been verified on hardware, so Aether will not drive it.` : `${boardName} does not support key calibration.`));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)] mb-3"
    }, "Key Calibration"), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleCalibrate && handleCalibrate(!calibrating),
      className: "px-5 h-10 rounded-md border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] font-display text-[12px] uppercase tracking-[0.18em] shadow-[0_0_18px_var(--accent-glow)] mb-5"
    }, calibrating ? "Stop Calibration" : "Start Calibration"), /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-2"
    }, "Calibration steps:"), /*#__PURE__*/React.createElement("ol", {
      className: "space-y-2 text-[12px] text-[var(--text-dim)] max-w-2xl"
    }, ["Click the Start Calibration button", "Press the required key (Hit bottom)", "Wait for the corresponding key to change color, and the key calibration is complete", "Click the Stop Calibration button"].map((step, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      className: "flex items-start gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "shrink-0 grid place-items-center w-5 h-5 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-[10px]"
    }, i + 1), /*#__PURE__*/React.createElement("span", null, step)))));
  }
    const ActuationBoardWidget = (ctx) => {
    const KB = window.AetherKeyboard || {};
    const KeyboardPanel = KB.KeyboardPanel;
    const allCodes = React.useMemo(() => (KB.KB_ROWS || []).flat().map(k => k[2]), []);
    const selectPreset = (codes) => ctx.setSelectedKeys(new Set(codes));
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full h-full flex flex-col justify-between px-3 py-2 overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between gap-2 mb-1.5 px-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--text-dim)]"
    }, /*#__PURE__*/React.createElement("span", { className: "flex items-center gap-1.5" }, /*#__PURE__*/React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#4ade80]" }), "Actuation (mm)"),
       /*#__PURE__*/React.createElement("span", { className: "flex items-center gap-1.5" }, /*#__PURE__*/React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#38bdf8]" }), "RT Press"),
       /*#__PURE__*/React.createElement("span", { className: "flex items-center gap-1.5" }, /*#__PURE__*/React.createElement("span", { className: "w-2 h-2 rounded-full bg-[#fb923c]" }), "RT Release")),
    /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => selectPreset(["KeyW", "KeyA", "KeyS", "KeyD"]),
      className: "px-2 py-1 rounded border border-[var(--line)] bg-white/[0.03] hover:border-[var(--accent)]/50 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-dim)] hover:text-[var(--text)] transition"
    }, "WASD"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => selectPreset(allCodes),
      className: "px-2 py-1 rounded border border-[var(--line)] bg-white/[0.03] hover:border-[var(--accent)]/50 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-dim)] hover:text-[var(--text)] transition"
    }, "Select All"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => selectPreset([]),
      className: "px-2 py-1 rounded border border-[var(--line)] bg-white/[0.03] hover:border-[var(--accent)]/50 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-dim)] hover:text-[var(--text)] transition"
    }, "Uncheck"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: async () => {
        if (!ctx.connected) return;
        const allC = (KB.KB_ROWS || []).flat().map(k => k[2]);
        const targets = ctx.selectedKeys && ctx.selectedKeys.size > 0 ? Array.from(ctx.selectedKeys) : allC;
        const gMm = Number(window.__globalTravelMm) || 2.00;
        await ctx.apiCall("set_trigger_codes", targets, gMm, 0, 0, 99);
        if (ctx.refreshPerKeyActuation) await ctx.refreshPerKeyActuation();
        ctx.setRtEnabled(false);
        ctx.setActuation(gMm);
      },
      className: "px-2 py-1 rounded border border-rose-400/40 bg-rose-500/10 hover:bg-rose-500/20 text-[10px] font-mono uppercase tracking-[0.12em] text-rose-300 transition"
    }, "Reset Travel"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => ctx.refreshPerKeyActuation && ctx.refreshPerKeyActuation(),
      className: "px-2.5 py-1 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--accent)] transition"
    }, "Sync Board"))), /*#__PURE__*/React.createElement("div", {
      className: "w-full flex-1 flex items-center justify-center"
    }, /*#__PURE__*/React.createElement(KeyboardPanel, {
      mode: "actuation",
      layer: ctx.layer || "default",
      selectedKeys: ctx.selectedKeys,
      setSelectedKeys: (updater) => {
        ctx.setSelectedKeys(prev => {
          const next = typeof updater === "function" ? updater(prev) : updater;
          if (next && next.size === 1) {
            const code = Array.from(next)[0];
            const ov = ctx.perKeyActuation && ctx.perKeyActuation[code];
            if (ov && typeof ov === "object" && (ov.touchMode === 1 || ov.touchMode === 2)) {
              ctx.setActuation(Number(ov.actuation) || 1.50);
              ctx.setRtEnabled(ov.touchMode === 2);
              if (ov.touchMode === 2) {
                ctx.setRtPress(Number(ov.rtPress) || 0.05);
                ctx.setRtRelease(Number(ov.rtRelease) || 0.05);
              } else {
                ctx.setRtPress(0.05);
                ctx.setRtRelease(0.05);
              }
            } else {
              // Unconfigured key (Global travel mode = 0): sync to its saved Global travel (e.g. 2.00mm)
              // and clear the previous key's Rapid Trigger state and sensitivities!
              const globalAct = (ov && typeof ov === "object" && ov.actuation) ? Number(ov.actuation) : 2.00;
              ctx.setActuation(globalAct);
              ctx.setRtEnabled(false);
              ctx.setRtPress(0.05);
              ctx.setRtRelease(0.05);
            }
          }
          return next;
        });
      },
      actuationPoint: ctx.actuation,
      rtPress: ctx.rtPress,
      rtRelease: ctx.rtRelease,
      perKeyOverride: ctx.perKeyActuation,
      liveDepths: ctx.liveDepths,
      showPill: false,
      compact: false
    })));
  };

  const ACTUATION_WIDGETS = [{
    id: "board",
    title: "Keyboard - Per-Key Actuation & RT",
    default: { x: 40, y: 24, w: 980, h: 340 },
    min: { w: 680, h: 280 },
    render: ActuationBoardWidget
  }, {

    id: "travel",
    title: "Travel",
    default: {
      x: 40,
      y: 384,
      w: 680,
      h: 430
    },
    min: {
      w: 420,
      h: 320
    },
    render: TravelWidget
  }, {
    id: "dead",
    title: "Dead Band",
    default: {
      x: 736,
      y: 32,
      w: 460,
      h: 300
    },
    min: {
      w: 320,
      h: 240
    },
    render: DeadBandWidget
  }, {
    id: "switch",
    title: "Switch",
    default: {
      x: 736,
      y: 352,
      w: 460,
      h: 430
    },
    min: {
      w: 340,
      h: 300
    },
    render: SwitchWidget
  }, {
    id: "poll",
    title: "Polling Rate",
    default: {
      x: 40,
      y: 488,
      w: 380,
      h: 300
    },
    min: {
      w: 300,
      h: 240
    },
    render: PollingWidget
  }, {
    id: "calib",
    title: "Calibration",
    default: {
      x: 440,
      y: 488,
      w: 456,
      h: 360
    },
    min: {
      w: 340,
      h: 280
    },
    render: CalibrationWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.ACTUATION_WIDGETS = ACTUATION_WIDGETS;
  // Pure board-awareness helpers exported for verification (no UI reads these).
  window.AetherWorkspaces.ACTUATION_BOARD = {
    SWITCHES,
    rangeOr,
    boardCtxOf
  };
})();
</script>
<script data-mod="ws_gamepad">
(() => {
  /* ============================================================
     Gamepad workspace â€” window.AetherWorkspaces.GAMEPAD_WIDGETS.
     Reuses GamepadSection JSX verbatim (split into 3 widgets) from
     ui/runtime_src/src/sections.jsx â€” no re-implementation of the
     virtual-pad capture / mapping UI, only layout is split.
     ============================================================ */
  const I = window.AetherIcons || {};
  const {
    IZap,
    IRefresh,
    IPlus,
    ITrash
  } = I;
  const PAD_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Space", "Enter", "L-Shift", "L-Ctrl", "Up", "Down", "Left", "Right"];
  const PAD_AXES = [{
    id: "LX",
    label: "Left Stick X",
    stick: true
  }, {
    id: "LY",
    label: "Left Stick Y",
    stick: true
  }, {
    id: "RX",
    label: "Right Stick X",
    stick: true
  }, {
    id: "RY",
    label: "Right Stick Y",
    stick: true
  }, {
    id: "LT",
    label: "Left Trigger",
    stick: false
  }, {
    id: "RT",
    label: "Right Trigger",
    stick: false
  }, {
    id: "BTN_A",
    label: "Button A",
    stick: false,
    btn: true
  }, {
    id: "BTN_B",
    label: "Button B",
    stick: false,
    btn: true
  }, {
    id: "BTN_X",
    label: "Button X",
    stick: false,
    btn: true
  }, {
    id: "BTN_Y",
    label: "Button Y",
    stick: false,
    btn: true
  }, {
    id: "BTN_LB",
    label: "Bumper L",
    stick: false,
    btn: true
  }, {
    id: "BTN_RB",
    label: "Bumper R",
    stick: false,
    btn: true
  }];
  const axisMeta = id => PAD_AXES.find(a => a.id === id) || PAD_AXES[0];

  /* ===== Enable / Status widget ===== */
  function EnableStatusWidget(ctx) {
    const {
      connected,
      gamepadOn,
      handleGamepadToggle,
      gamepadError,
      handleInstallVigem
    } = ctx;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[13px] uppercase tracking-[0.18em] text-[var(--text)] flex items-center gap-2"
    }, IZap && /*#__PURE__*/React.createElement(IZap, {
      size: 15
    }), " Virtual Gamepad"), /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mt-1.5 max-w-xl"
    }, "Streams live key travel into a system gamepad \u2014 press a key deeper for more throttle / steering. Maps below drive the analog axes & buttons. ", !connected && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Connect the board to capture."))), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleGamepadToggle(!gamepadOn),
      disabled: !connected,
      className: `relative w-12 h-6 rounded-full border transition-colors shrink-0 ml-4
                      ${!connected ? "opacity-40 cursor-not-allowed" : ""}
                      ${gamepadOn ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-[rgba(5,11,14,0.5)] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all
                            ${gamepadOn ? "left-[26px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-[var(--text-faint)]"}`,
      style: {
        width: 18,
        height: 18
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "mt-3 font-mono text-[11px]"
    }, gamepadOn ? /*#__PURE__*/React.createElement("span", {
      className: "text-emerald-400"
    }, "\u25CF Capturing \u2192 \"Aula Win60 HE Virtual Gamepad\"") : /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "\u25CB Idle")), gamepadError && /*#__PURE__*/React.createElement("div", {
      className: "mt-3 rounded-md border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-[11.5px] text-rose-100 flex items-center justify-between gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, gamepadError.msg), gamepadError.needsDriver && /*#__PURE__*/React.createElement("button", {
      onClick: handleInstallVigem,
      className: "shrink-0 px-3 h-7 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25"
    }, "Install ViGEmBus")));
  }

  /* ===== Axis Mapping widget ===== */
  function AxisMappingWidget(ctx) {
    const {
      gamepadMap,
      handleGamepadMapApply,
      DEFAULT_PAD_MAP
    } = ctx;
    const rows = gamepadMap || [];
    const setRow = (i, patch) => handleGamepadMapApply(rows.map((r, j) => j === i ? {
      ...r,
      ...patch
    } : r));
    const addRow = () => handleGamepadMapApply([...rows, {
      key: "W",
      axis: "RT",
      direction: 1,
      threshold_mm: 1.5
    }]);
    const removeRow = i => handleGamepadMapApply(rows.filter((_, j) => j !== i));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Key \u2192 Control Mapping"), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleGamepadMapApply((DEFAULT_PAD_MAP || []).map(r => ({
        ...r
      }))),
      className: "px-3 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] flex items-center gap-1.5"
    }, IRefresh && /*#__PURE__*/React.createElement(IRefresh, {
      size: 12
    }), " Driving Defaults"), /*#__PURE__*/React.createElement("button", {
      onClick: addRow,
      className: "px-3 h-8 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 flex items-center gap-1.5"
    }, IPlus && /*#__PURE__*/React.createElement(IPlus, {
      size: 12
    }), " Add"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-[1fr_1.4fr_1.2fr_28px] gap-2 px-1 mb-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, /*#__PURE__*/React.createElement("span", null, "Key"), /*#__PURE__*/React.createElement("span", null, "Control"), /*#__PURE__*/React.createElement("span", null, "Behaviour"), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2"
    }, rows.map((r, i) => {
      const meta = axisMeta(r.axis);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "grid grid-cols-[1fr_1.4fr_1.2fr_28px] gap-2 items-center"
      }, /*#__PURE__*/React.createElement("select", {
        value: r.key,
        onChange: e => setRow(i, {
          key: e.target.value
        }),
        className: "h-9 rounded-md bg-[rgba(5,11,14,0.5)] border border-[var(--line)] px-2 font-mono text-[12px] text-[var(--text)] outline-none focus:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
      }, PAD_KEYS.map(k => /*#__PURE__*/React.createElement("option", {
        key: k,
        value: k
      }, k))), /*#__PURE__*/React.createElement("select", {
        value: r.axis,
        onChange: e => setRow(i, {
          axis: e.target.value
        }),
        className: "h-9 rounded-md bg-[rgba(5,11,14,0.5)] border border-[var(--line)] px-2 font-mono text-[12px] text-[var(--text)] outline-none focus:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
      }, PAD_AXES.map(a => /*#__PURE__*/React.createElement("option", {
        key: a.id,
        value: a.id
      }, a.label))), meta.stick ? /*#__PURE__*/React.createElement("div", {
        className: "flex gap-1"
      }, [["âˆ’", -1], ["+", 1]].map(([lbl, val]) => /*#__PURE__*/React.createElement("button", {
        key: val,
        onClick: () => setRow(i, {
          direction: val
        }),
        className: `flex-1 h-9 rounded-md border font-mono text-[13px] transition-all
                                  ${(r.direction || 1) === val ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, lbl))) : meta.btn ? /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("input", {
        type: "range",
        className: "aether flex-1",
        min: 0.2,
        max: 3.4,
        step: 0.1,
        value: r.threshold_mm ?? 1.5,
        style: {
          "--pct": ((r.threshold_mm ?? 1.5) - 0.2) / 3.2 * 100 + "%"
        },
        onChange: e => setRow(i, {
          threshold_mm: parseFloat(e.target.value)
        })
      }), /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[10px] text-[var(--text-dim)] w-12 text-right"
      }, (r.threshold_mm ?? 1.5).toFixed(1), "mm")) : /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[10px] text-[var(--text-faint)] pl-1"
      }, "analog 0\u2192max"), /*#__PURE__*/React.createElement("button", {
        onClick: () => removeRow(i),
        className: "w-7 h-7 grid place-items-center rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] hover:text-rose-300 hover:border-rose-400/30"
      }, ITrash && /*#__PURE__*/React.createElement(ITrash, {
        size: 12
      })));
    }), !rows.length && /*#__PURE__*/React.createElement("div", {
      className: "text-[12px] text-[var(--text-faint)] py-4 text-center"
    }, "No mappings \u2014 add one or load driving defaults.")), /*#__PURE__*/React.createElement("p", {
      className: "text-[11px] text-[var(--text-faint)] mt-4 leading-relaxed"
    }, "Sticks combine opposing keys (e.g. A=\u2212 and D=+ on Left Stick X). Triggers & sticks are analog \u2014 deeper press = larger value. Buttons fire past their threshold. Changes apply live while capturing."));
  }

  /* ===== Driver Install widget (ViGEmBus) ===== */
  function DriverInstallWidget(ctx) {
    const {
      handleInstallVigem,
      gamepadError
    } = ctx;
    const needsDriver = !!(gamepadError && gamepadError.needsDriver);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)] mb-3"
    }, "Driver"), /*#__PURE__*/React.createElement("p", {
      className: "text-[12px] text-[var(--text-dim)] mb-5 leading-relaxed"
    }, "The virtual gamepad is emulated through ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "ViGEmBus"), " \u2014 a kernel driver that exposes an Xbox 360-compatible controller to Windows. Install it once; no reboot is normally required."), /*#__PURE__*/React.createElement("button", {
      onClick: handleInstallVigem,
      className: "px-5 h-10 rounded-md border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] font-display text-[12px] uppercase tracking-[0.18em] shadow-[0_0_18px_var(--accent-glow)] mb-4"
    }, "Install ViGEmBus"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px]"
    }, needsDriver ? /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Driver missing \u2014 install required before capture will work.") : /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-faint)]"
    }, "No driver issue detected.")));
  }
  const GAMEPAD_WIDGETS = [{
    id: "enable",
    title: "Enable / Status",
    default: {
      x: 40,
      y: 32,
      w: 620,
      h: 300
    },
    min: {
      w: 380,
      h: 220
    },
    render: EnableStatusWidget
  }, {
    id: "axes",
    title: "Axis Mapping",
    default: {
      x: 680,
      y: 32,
      w: 640,
      h: 520
    },
    min: {
      w: 460,
      h: 340
    },
    render: AxisMappingWidget
  }, {
    id: "driver",
    title: "Driver Install",
    default: {
      x: 40,
      y: 352,
      w: 500,
      h: 300
    },
    min: {
      w: 340,
      h: 240
    },
    render: DriverInstallWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.GAMEPAD_WIDGETS = GAMEPAD_WIDGETS;
})();
</script>
<script data-mod="ws_keymap">
(() => {
  /* ============================================================
     Keymap workspace â€” mirrors the Actuation reference workspace shape.
     Exports window.AetherWorkspaces.KEYMAP_WIDGETS â€” an array of widget descriptors:
       { id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }
     Each render() reads/calls ONLY ctx.* (state + handlers app.jsx passes down).
     Reuses KeyGrid JSX from sections.jsx's KeymapSection (basic/extended key picker)
     and the existing keyboard.jsx KeyboardPanel for the selectable board â€” its
     per-key device-color/actuation styling stays byte-identical, untouched here.
     ============================================================ */
  const {
    useState
  } = React;
  const S = window.AetherSections || {};
  const {
    Chip,
    ToolbarButton,
    LayerPicker
  } = S;
  const KB = window.AetherKeyboard || {};
  const KeyboardPanel = KB.KeyboardPanel;

  /* ===== Key label sets (verbatim from sections.jsx KeymapSection) ===== */
  const BASIC_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1!", "2@", "3#", "$4", "5%", "6^", "7&", "8*", "9(", "0)", "-_", "=+", "{[", "}]", "\\|", "<>", ";:", "'\"", "`~", ",<", ".>", "/?"];
  const EXTENDED_KEYS = ["Esc", "Tab", "Caps", "Back", "Enter", "Space", "L-Ctrl", "R-Ctrl", "L-Shift", "R-Shift", "L-Alt", "R-Alt", "L-Win", "R-Win", "Menu", "Left", "Up", "Right", "Down", "PrtSc", "ScrLk", "Pause", "Ins", "Home", "Del", "End", "PgUp", "PgDn", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];

  /* KeyGrid â€” collapsible label picker (verbatim JSX from sections.jsx). */
  const KeyGrid = ({
    title,
    keys,
    picked,
    onPick
  }) => {
    const [open, setOpen] = useState(true);
    const I = window.AetherIcons || {};
    const IChevronD = I.IChevronD;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      className: "flex items-center gap-2 mb-2 text-[var(--text-dim)] hover:text-[var(--text)]"
    }, IChevronD && /*#__PURE__*/React.createElement(IChevronD, {
      size: 12,
      className: open ? "" : "-rotate-90"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[12px] uppercase tracking-[0.18em]"
    }, title)), open && /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-[repeat(auto-fill,minmax(46px,1fr))] gap-1.5"
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

  /* ===== Key Grid widget â€” the selectable keyboard board ===== */
  function KeyGridWidget(ctx) {
    const {
      selectedKeys,
      setSelectedKeys,
      layer,
      ledMap,
      calibrating,
      calibratedKeys,
      liveDepths
    } = ctx;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center"
    }, KeyboardPanel ? React.createElement(KeyboardPanel, {
      mode: "keymap",
      layer: layer || "default",
      selectedKeys,
      setSelectedKeys,
      ledMap,
      showPill: false,
      compact: true,
      calibrating: !!calibrating,
      calibratedCodes: calibratedKeys,
      liveDepths
    }) : /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Keyboard render unavailable."));
  }

  /* ===== Remap Editor widget â€” assign HID to selected keys ===== */
  function RemapEditorWidget(ctx) {
    const {
      selectedKeys,
      selectedKey,
      HID_BY_LABEL,
      remapSelected,
      resetRemapSelected
    } = ctx;
    const [picked, setPicked] = useState(null);
    const [flash, setFlash] = useState(null);
    const showFlash = kind => {
      setFlash(kind);
      setTimeout(() => setFlash(null), 1400);
    };
    const selectedCount = selectedKeys ? selectedKeys.size : 0;
    const curLabel = selectedKey || (selectedCount ? `${selectedCount} keys` : "None");
    const doApply = () => {
      if (!picked || !selectedCount || !remapSelected) return;
      remapSelected(picked);
      showFlash("applied");
    };
    const doReset = () => {
      if (resetRemapSelected) resetRemapSelected();
      setPicked(null);
      showFlash("reset");
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ol", {
      className: "text-[12px] text-[var(--text-dim)] leading-relaxed space-y-2 mb-4 font-mono"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "01."), " Click a key on the Key Grid widget."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "02."), " Pick the new mapping below."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "03."), " Hit ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "Apply"), " to flash.")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid place-items-center px-3 min-w-[64px] rounded-md border border-[var(--line)] bg-white/[0.02] font-mono text-[11px] text-[var(--text-dim)]"
    }, curLabel), /*#__PURE__*/React.createElement("div", {
      className: "grid place-items-center text-[var(--text-faint)]"
    }, "\u2192"), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 rounded-md border border-[var(--line)] bg-white/[0.02] px-3 grid place-items-start py-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--text)]"
    }, picked || "â€”"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, "remap target"))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2 mb-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: doReset,
      className: "flex-1 h-9 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] font-display text-[11px] uppercase tracking-[0.18em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
    }, "Default"), /*#__PURE__*/React.createElement("button", {
      disabled: !picked || !selectedCount,
      onClick: doApply,
      className: `flex-1 h-9 rounded-md border font-display text-[11px] uppercase tracking-[0.18em] transition-all
                      ${!picked || !selectedCount ? "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] cursor-not-allowed" : "border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] hover:bg-[var(--accent)]/25 shadow-[0_0_12px_var(--accent-glow)]"}`
    }, "Apply")), /*#__PURE__*/React.createElement("div", {
      className: "h-5 mb-3 text-[11px] font-mono tracking-[0.14em]"
    }, !selectedCount && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Select a key on the Key Grid first."), flash === "applied" && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "\u2713 Remapped ", selectedCount, " key", selectedCount > 1 ? "s" : "", " \u2192 ", picked), flash === "reset" && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text-dim)]"
    }, "\u21A9 Restored default mapping")), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4"
    }, /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Basic Keys",
      keys: BASIC_KEYS,
      picked: picked,
      onPick: setPicked
    }), /*#__PURE__*/React.createElement(KeyGrid, {
      title: "Extended Keys",
      keys: EXTENDED_KEYS,
      picked: picked,
      onPick: setPicked
    })));
  }

  /* ===== Layer Picker widget ===== */
  function LayerPickerWidget(ctx) {
    const {
      layer,
      setLayer,
      selectAllKeys,
      selectInvertKeys,
      deselectAllKeys
    } = ctx;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Active Layer"), LayerPicker ? /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row lg:flex-col gap-2"
    }, React.createElement(LayerPicker, {
      layer,
      setLayer
    })) : /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Layer picker unavailable.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Selection"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1.5"
    }, ToolbarButton ? [{
      label: "Select All",
      onClick: selectAllKeys
    }, {
      label: "Select Invert",
      onClick: selectInvertKeys
    }, {
      label: "Deselect All",
      onClick: deselectAllKeys
    }].map(b => /*#__PURE__*/React.createElement("div", {
      key: b.label
    }, React.createElement(ToolbarButton, {
      onClick: b.onClick
    }, b.label))) : /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Toolbar unavailable."))), Chip && /*#__PURE__*/React.createElement("div", null, React.createElement(Chip, {
      color: "accent"
    }, layer === "fn" ? "Fn Layer" : "Default Layer")));
  }
  const KEYMAP_WIDGETS = [{
    id: "keygrid",
    title: "Key Grid",
    default: {
      x: 40,
      y: 32,
      w: 760,
      h: 460
    },
    min: {
      w: 520,
      h: 360
    },
    render: KeyGridWidget
  }, {
    id: "remap",
    title: "Remap Editor",
    default: {
      x: 820,
      y: 32,
      w: 460,
      h: 460
    },
    min: {
      w: 340,
      h: 340
    },
    render: RemapEditorWidget
  }, {
    id: "layer",
    title: "Layer Picker",
    default: {
      x: 40,
      y: 516,
      w: 320,
      h: 300
    },
    min: {
      w: 260,
      h: 240
    },
    render: LayerPickerWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.KEYMAP_WIDGETS = KEYMAP_WIDGETS;
})();
</script>
<script data-mod="ws_lighting">
(() => {
  /* ============================================================
     Lighting workspace â€” window.AetherWorkspaces.LIGHTING_WIDGETS.
     Control JSX ported verbatim from the old LightingSection (sections.jsx)
     and split across four widget bodies. Color values (hex swatches, style=
     {{background:c}}, PatternPreview) are byte-identical â€” these are real
     device RGB values, never re-tokenized.
     ============================================================ */
  const {
    useState,
    useRef,
    useEffect
  } = React;
  const S = window.AetherSections || {};
  const Slider = S.Slider,
    Chip = S.Chip,
    SubTabs = S.SubTabs,
    ToolbarButton = S.ToolbarButton;
  const I = window.AetherIcons || {};
  const IPlus = I.IPlus;

  /* ===== shared static data (verbatim from sections.jsx) ===== */
  const LIGHT_MODES = [{
    id: "wave",
    label: "Wave",
    icon: "ã€°"
  }, {
    id: "neon",
    label: "Neon",
    icon: "â—Ž"
  }, {
    id: "radar",
    label: "Radar",
    icon: "â—’"
  }, {
    id: "cross",
    label: "Cross",
    icon: "âœš"
  }, {
    id: "breath",
    label: "Breath",
    icon: "â—‹"
  }, {
    id: "static",
    label: "Static",
    icon: "â– "
  }, {
    id: "aurora",
    label: "Aurora",
    icon: "â—"
  }, {
    id: "ripple",
    label: "Ripple",
    icon: "â—Ž"
  }, {
    id: "twinkle",
    label: "Twinkle",
    icon: "âœ¸"
  }, {
    id: "reactive",
    label: "Reactive",
    icon: "â˜¼"
  }, {
    id: "striation",
    label: "Striation",
    icon: "â¦¹"
  }, {
    id: "fireworks",
    label: "Fireworks",
    icon: "âœ»"
  }, {
    id: "frenzy",
    label: "Frenzy",
    icon: "âœº"
  }, {
    id: "autorip",
    label: "Auto Ripple",
    icon: "â—ˆ"
  }, {
    id: "speedres",
    label: "Speed Respond",
    icon: "â¦¿"
  }, {
    id: "rain",
    label: "Rain",
    icon: "â˜‚"
  }, {
    id: "comet",
    label: "Comet",
    icon: "â˜„"
  }, {
    id: "tide",
    label: "Tide",
    icon: "â‰ˆ"
  }, {
    id: "custom",
    label: "Custom",
    icon: "â—‡"
  }];
  const ZONE_MODES = [{
    id: "twinkle",
    label: "Twinkle"
  }, {
    id: "wave",
    label: "Wave"
  }, {
    id: "striation",
    label: "Striation"
  }, {
    id: "radar",
    label: "Radar"
  }, {
    id: "ripple",
    label: "Ripple"
  }, {
    id: "cross",
    label: "Cross"
  }, {
    id: "fireworks",
    label: "Fireworks"
  }, {
    id: "aurora",
    label: "Aurora"
  }, {
    id: "breath",
    label: "Breath"
  }, {
    id: "static",
    label: "Static"
  }, {
    id: "rain",
    label: "Rain"
  }, {
    id: "comet",
    label: "Comet"
  }, {
    id: "tide",
    label: "Tide"
  }];
  const PRESET_PALETTES = [["#9d4edd"], ["#00f5ff"], ["#ff3d6e"], ["#39ff8a"], ["#9d4edd", "#00f5ff"], ["#ff7a59", "#ffaa1f"], ["#ff3d6e", "#ffaa1f", "#39ff8a"], ["#ff3d6e", "#ffaa1f", "#39ff8a", "#3b82f6"]];
  const BG_SWATCHES = ["#000000", "#0b0f19", "#1a0833", "#001318", "#0a1f10", "#241400", "#2a0814", "#ffffff"];

  /* ============================================================
     Board-awareness helpers (additive â€” PER_BOARD_PARITY_PLAN step 5).
     Every helper falls back to today's hardcoded behaviour when the board
     declares nothing, so the Win60 (and any unknown board) renders exactly
     as before. ctx.board is the board-context value from
     components/board-context.jsx (locked contract).
     ============================================================ */
  const boardCtxOf = ctx => ctx && ctx.board || window.AetherBoard && window.AetherBoard.UNKNOWN_BOARD || {
    board: null,
    lighting: null,
    actuation: null,
    cap: () => undefined,
    capState: () => "unknown",
    isSupported: () => true
  };

  /* Icons for registry-declared firmware modes today's hardcoded grid doesn't
     know about (e.g. the HFD boards' own effect set). Fallback glyph: â–£ */
  const DATA_MODE_ICONS = {
    "reactive-single": "â˜¼",
    "extinguish-single": "â—Œ",
    "starry-sky": "âœ¦",
    "snowfall": "â†",
    "blossoming": "âœ»",
    "dynamic-breathing": "â—‹",
    "spectrum-cycle": "â—Ž",
    "color-spring": "â†Ÿ",
    "colorful-cross": "âœš",
    "drifting": "ã€°",
    "twisting-path": "âˆ¿",
    "double-tap": "â—‰",
    "ripple-spread": "â—Ž",
    "flowing": "â‰ˆ",
    "mountain-peaks": "â‹€",
    "gentle-rain": "â˜‚",
    "shuttle": "â‡„"
  };

  /* Per-mode control rule from the board's registry mode table (or null). */
  const modeRuleFor = (bl, id) => bl && Array.isArray(bl.modes) && bl.modes.find(m => m.id === id) || null;

  /* Build the mode grid for the active board.
     - No board lighting data  -> today's hardcoded LIGHT_MODES (fail-open).
     - hostEngine board (Win60 family) -> today's grid IS the product (host
       effects + firmware modes share it); only append registry modes the grid
       doesn't already know. For the Win60 the registry ids are a strict subset
       of LIGHT_MODES, so this returns LIGHT_MODES unchanged.
     - firmware-only board (hostEngine === false) -> the registry mode table is
       the whole truth: host-animated entries (rain/comet/tide/â€¦) are not
       offered, because they stream per-key RGB frames from the PC and that
       path is unproven on such boards (see the note rendered under the grid). */
  const modeGridFor = bl => {
    if (!bl || !Array.isArray(bl.modes) || bl.modes.length === 0) return LIGHT_MODES;
    if (bl.hostEngine !== false) {
      const known = new Set(LIGHT_MODES.map(m => m.id));
      const extra = bl.modes.filter(m => !known.has(m.id)).map(m => ({
        id: m.id,
        label: m.name || m.id,
        icon: DATA_MODE_ICONS[m.id] || "â–£"
      }));
      return extra.length ? LIGHT_MODES.concat(extra) : LIGHT_MODES;
    }
    return bl.modes.map(m => {
      const legacy = LIGHT_MODES.find(x => x.id === m.id);
      return {
        id: m.id,
        label: m.name || legacy && legacy.label || m.id,
        icon: DATA_MODE_ICONS[m.id] || legacy && legacy.icon || "â–£"
      };
    });
  };

  /* ============================================================
     Host-engine frame-rate awareness (additive).
     The host effect engine runs at 60 fps (effects.FPS â€” a 120 bump was
     reverted because it saturated the USB pipe; keep the constant below in
     step with effects.FPS). A board that sustains the per-key stream at a
     lower rate declares `hostEngineMaxFps` in its registry lighting block
     (e.g. the MINI 60 HE PRO: measured 28). A MISSING hostEngineMaxFps means
     "no cap / full speed", so a board that does not declare it â€” and the
     fail-open no-board path â€” renders exactly as today.
  
     Motion-rate classification is owned HERE (the registry does not carry
     it). Press-reactive effects need live key travel and fast response, so
     they read as choppy on a low-fps board; the ambient/slow set looks right
     even at ~28 fps. From CLAUDE.md + effects.py:
       press-reactive: reactive, ripple, speedres, cross, fireworks
       ambient/slow:   rain, aurora, autorip, striation, twinkle, breath,
                       frenzy, comet, tide
     wave / neon / radar are classified ambient here as well (slow sweeps /
     pulses, no press input); static has no motion; custom is the zone
     container (its zone modes carry the same â‰ˆ marker in the Effect Preview
     widget â€” the fps fact itself is stated ONCE, under the mode grid). */
  const HOST_ENGINE_TARGET_FPS = 60;
  const HOST_FX_FAST = new Set(["reactive", "ripple", "speedres", "cross", "fireworks"]);
  /* Declared cap in fps, or null when the board declares none (= full speed). */
  const hostFpsCapOf = bl => bl && bl.hostEngine !== false && typeof bl.hostEngineMaxFps === "number" && bl.hostEngineMaxFps > 0 ? bl.hostEngineMaxFps : null;
  /* The cap, but only when it is meaningfully below the engine target
     (< 75% of 60 fps) â€” otherwise null, i.e. nothing worth surfacing. */
  const hostFpsLimited = bl => {
    const cap = hostFpsCapOf(bl);
    return cap != null && cap < HOST_ENGINE_TARGET_FPS * 0.75 ? cap : null;
  };

  /* ============================================================
     Per-board lighting dispatch (firmware set_light vs host start_multicolor).
  
     THE BUG THIS FIXES: app.jsx used to decide with
         useHost = power && !fullColor && pattern !== "static";
         else set_light(MODE_BYTE[pattern] ?? 0, ...)
     where MODE_BYTE is the hardcoded Win60 cmd-7 table. On any other board that
     is wrong twice over: the board's own firmware modes (e.g. the MINI 60 HE
     PRO's starry-sky/snowfall/...) are missing from that table, so `?? 0`
     silently sends byte 0 â€” which on the MINI means LIGHTS OFF â€” and shared ids
     resolve to the WRONG byte (static is 0 on the Win60 but 1 on the MINI).
  
     THE RULE LANDED HERE (single source of truth, used by app.jsx at send time
     and by the verification harness against raw registry data):
       1. Boards with a registry mode table (board.lighting.modes) resolve the
          selected id against THAT table. While powered and not in Full-RGB, an
          id the host engine can generate (HOST_FX_IDS == effects.py's table)
          runs on the host when the board allows it (hostEngine !== false) â€”
          the exact precedence the shipped Win60 build has always used.
          Everything else is a firmware set_light with THIS board's byte.
       2. An unknown id NEVER falls back to `?? 0`: it resolves to the board's
          own declared static mode (never a byte that can mean OFF) and carries
          a `notice` string so the UI can say so out loud.
       3. Power-off prefers the board's declared offModeByte (MINI: 0). Boards
          that don't declare one (Win60) keep today's byte-identical behaviour:
          the resolved mode byte with the power flag low.
       4. Per-mode registry rules are honoured when building the set_light args:
          brightness/speed scale to the board's brightnessMax/speedMax (Win60
          4 == the legacy constants, so its bytes are unchanged; MINI is 0..5),
          and a `direction: true` rule (2-way byte) clamps the 4-way dial to 0/1.
       5. No registry table at all (no bridge / no board data) -> call:"legacy",
          and app.jsx falls through to exactly today's shipped code path.
     ============================================================ */
  /* Host-engine effect generators that exist in effects.py (its `gens` table),
     minus the internal 'static'/'calibrate' entries â€” static dispatches to
     firmware (today's rule) and calibrate is engine-internal. Keep in step with
     effects.py; ids sent to start_multicolor MUST come from this set so the
     engine never silently falls back on an id it doesn't know. */
  const HOST_FX_IDS = new Set(["wave", "neon", "radar", "cross", "breath", "aurora", "ripple", "twinkle", "reactive", "striation", "fireworks", "frenzy", "autorip", "speedres", "rain", "comet", "tide"]);

  /* Local copies of app.jsx's color/step helpers (this file loads first, so it
     cannot import them; keep in step). briByteFor/spdByteFor generalise the
     legacy briByte/spdByte to a per-board max â€” with max 4 they are the same
     function, so Win60 bytes are provably unchanged. */
  const hexToRgb = hex => {
    const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex || "");
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
  };
  const briByteFor = (pct, max) => pct <= 0 ? 0 : Math.max(1, Math.min(max, Math.ceil(pct / 100 * max)));
  const spdByteFor = (pct, max) => Math.max(1, Math.min(max, Math.round(pct / 100 * (max - 1)) + 1));

  /* resolveLightDispatch(bl, {pattern, power, fullColor}) -> decision.
     bl = board.lighting (registry block) or null. Returns one of:
       { call:"legacy" }                          no mode table -> today's code
       { call:"host", id }                        start_multicolor(id, ...)
       { call:"fw", byte, rule, off? , fallback?, reason? }
                                                  set_light(byte, ...) with THIS
                                                  board's byte; `fallback` marks
                                                  the honest static substitution */
  const resolveLightDispatch = (bl, {
    pattern,
    power,
    fullColor
  }) => {
    const modes = bl && Array.isArray(bl.modes) && bl.modes.length ? bl.modes : null;
    if (!modes) return {
      call: "legacy"
    };
    const rule = modes.find(m => m.id === pattern) || null;
    const hostOk = bl.hostEngine !== false;
    if (power && !fullColor && pattern !== "static" && hostOk && HOST_FX_IDS.has(pattern)) return {
      call: "host",
      id: pattern
    };
    if (!power && bl.offModeByte != null) return {
      call: "fw",
      byte: bl.offModeByte,
      rule: null,
      off: true
    };
    if (rule) return {
      call: "fw",
      byte: rule.byte,
      rule
    };
    // Unknown on this board (or a host-only id while Full-RGB / host-less):
    // NEVER guess a raw byte â€” 0 means OFF on some boards. Fall back to the
    // board's own declared static mode. (On the Win60 static IS byte 0, so the
    // legacy `?? 0` bytes are reproduced exactly there.)
    const off = bl.offModeByte;
    const fb = modes.find(m => m.id === "static") || modes.find(m => off == null || m.byte !== off) || modes[0];
    return {
      call: "fw",
      byte: fb.byte,
      rule: fb,
      fallback: "static",
      reason: `"${pattern}" is not available on this board`
    };
  };

  /* buildLightCalls(bl, s) -> null | { dispatch, notice, calls:[[api, ...args]] }.
     The COMPLETE per-board send for one lighting state â€” app.jsx executes the
     list verbatim; the harness asserts it against every board's registry data.
     s: { pattern, power, fullColor, colors:[hex], bgColor:hex, brightness,
          speed, direction, striOrient }. Returns null for call:"legacy" (the
     caller keeps today's exact MODE_BYTE code path). */
  const buildLightCalls = (bl, s) => {
    const d = resolveLightDispatch(bl, s);
    if (d.call === "legacy") return null;
    if (d.call === "host") {
      return {
        dispatch: d,
        notice: null,
        calls: [["start_multicolor", d.id, (s.colors || []).map(hexToRgb), hexToRgb(s.bgColor), s.brightness, s.speed, s.direction, s.striOrient]]
      };
    }
    const briMax = bl.brightnessMax || 4;
    const spdMax = bl.speedMax || 4;
    const [r, g, b] = hexToRgb(s.colors && s.colors[0] || "#ffffff");
    const [br, bg2, bb] = hexToRgb(s.bgColor);
    // 2-way direction rule (registry `direction: true`): the firmware takes a
    // plain 0/1 byte, so clamp the 4-way dial value. Directional *kinds*
    // ("lr"/"all"/...) and rule-less modes pass the dial byte through untouched
    // (the Win60's rules are all kinds or absent -> byte-identical).
    const dirOut = d.rule && d.rule.direction === true ? s.direction === 1 ? 1 : 0 : s.direction;
    return {
      dispatch: d,
      // Only the powered, non-Full-RGB substitution is worth saying out loud:
      // power-off lands on off/static intentionally, and Full-RGB over a
      // host-only id has always quietly used the static slot (Win60 shipped
      // behaviour â€” keep it silent there too).
      notice: d.fallback && s.power && !s.fullColor ? `${d.reason} â€” showing ${d.rule && d.rule.name || "Static"} instead` : null,
      calls: [["stop_multicolor"], ["set_light", d.byte, r, g, b, briByteFor(s.brightness, briMax), spdByteFor(s.speed, spdMax), br, bg2, bb, dirOut, s.power, s.fullColor ? 1 : 0]]
    };
  };

  /* ============================================================
     Schematic-preview color honesty (the "yellow in my purple twinkle" fix).
  
     previewSimColor(bl, s, idx) -> the hex color the Live Keyboard's STATIC
     fallback schematic paints on flat key index `idx` whenever there is no
     live host frame to mirror (board-firmware effects, disconnected, engine
     stopped). app.jsx's ledMap memo calls this per key.
  
     THE BUG THIS FIXES: the old inline sim painted EVERY non-static pattern as
         hit ? colors[idx % colors.length] : bgColor
     i.e. it scattered the WHOLE palette across the board. A mode that
     dispatches to the board's own firmware (the MINI 60 HE PRO's
     starry-sky/snowfall/... and everything on a firmware-only board) only ever
     receives colors[0] + bgColor â€” set_light carries ONE foreground. So the
     schematic showed palette slots the effect can never display; with the
     out-of-the-box palette seed (which contains #ffd400) a purple firmware
     twinkle over white gained a literal YELLOW key that exists nowhere on the
     hardware. Modes whose registry rule says `color: false` are worse: the
     firmware picks its own colors, so ANY foreground we draw is a guess â€”
     only the user's background is honest.
  
     Legacy grid ids on host-engine boards (the whole shipped Win60 surface,
     and the no-board fail-open path) keep the old scatter BYTE-IDENTICAL:
     the fw branch below only fires where resolveLightDispatch sends the
     powered pattern to firmware â€” ids beyond the legacy grid, or any id on a
     hostEngine:false board â€” never for static/custom. */
  const previewSimColor = (bl, s, idx) => {
    const colors = s.colors || [];
    if (s.pattern === "static") return colors[0];
    const rule = modeRuleFor(bl, s.pattern);
    const legacyId = LIGHT_MODES.some(m => m.id === s.pattern);
    if (rule && s.pattern !== "custom" && (!legacyId || bl.hostEngine === false)) {
      if (rule.color === false) return s.bgColor; // firmware-chosen colors â€” show only the user's bg
      return idx % 6 === 0 ? colors[0] || "#ffffff" : s.bgColor; // exactly the fg byte sent (buildLightCalls)
    }
    const hit = idx % 6 === 0 || colors.length === 1;
    return hit ? colors[idx % colors.length] : s.bgColor;
  };

  /* PatternPreview â€” verbatim from sections.jsx (real RGB color prop). */
  const PatternPreview = ({
    kind,
    color
  }) => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 30",
    className: "w-full h-8 mt-3",
    preserveAspectRatio: "none"
  }, kind === "static" && Array.from({
    length: 8
  }).map((_, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: i * 13 + 2,
    y: 6,
    width: "10",
    height: "18",
    rx: "2",
    fill: color,
    opacity: "0.7"
  })), kind === "wave" && Array.from({
    length: 8
  }).map((_, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: i * 13 + 2,
    y: 6,
    width: "10",
    height: "18",
    rx: "2",
    fill: color,
    opacity: 0.2 + (Math.sin(i) + 1) * 0.4
  })), kind === "react" && Array.from({
    length: 8
  }).map((_, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: i * 13 + 2,
    y: 6,
    width: "10",
    height: "18",
    rx: "2",
    fill: color,
    opacity: i === 3 ? 1 : 0.15
  })), kind === "ripple" && [10, 18, 26].map((r, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: "50",
    cy: "15",
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: "0.8",
    opacity: 1 - i * 0.3
  })), kind === "breathe" && /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "6",
    width: "96",
    height: "18",
    rx: "3",
    fill: color,
    opacity: "0.5"
  }), kind === "rain" && Array.from({
    length: 6
  }).map((_, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: i * 18 + 8,
    x2: i * 18 + 8,
    y1: i * 4,
    y2: i * 4 + 12,
    stroke: color,
    strokeWidth: "1.5"
  })));

  /* Preview "kind" for a given firmware pattern id (best-effort mapping). */
  const previewKindFor = pattern => {
    if (pattern === "static") return "static";
    if (pattern === "wave" || pattern === "aurora" || pattern === "tide" || pattern === "comet") return "wave";
    if (pattern === "reactive" || pattern === "cross" || pattern === "speedres") return "react";
    if (pattern === "ripple" || pattern === "autorip" || pattern === "radar") return "ripple";
    if (pattern === "breath" || pattern === "neon") return "breathe";
    if (pattern === "rain" || pattern === "twinkle" || pattern === "fireworks" || pattern === "frenzy" || pattern === "striation") return "rain";
    return "static";
  };

  /* ===== Effect zones panel (custom mode) â€” verbatim behavior from sections.jsx.
     `degraded` (Set|null): press-reactive mode ids to mark â‰ˆ on fps-capped boards â€”
     same marker idiom as the Mode Picker grid, whose footnote explains it. Null on
     uncapped boards, so labels render exactly as before. ===== */
  const ZonesPanel = ({
    zones,
    selectedKeys,
    onAdd,
    onUpdate,
    onRemove,
    degraded
  }) => /*#__PURE__*/React.createElement("div", {
    className: "glass p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)]"
  }, "Effect Zones"), /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5"
  }, "Select keys on the board, add a zone, give it its own effect")), /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    disabled: !selectedKeys || selectedKeys.size === 0,
    className: "px-2.5 h-8 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] disabled:opacity-40 font-display text-[10.5px] uppercase tracking-[0.16em]"
  }, "+ Zone (", selectedKeys?.size ?? 0, ")")), (!zones || zones.length === 0) && /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[11px] text-[var(--text-faint)]"
  }, "No zones yet \u2014 select keys, then click \"+ Zone\". Keys outside every zone stay off."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, (zones || []).map(z => /*#__PURE__*/React.createElement("div", {
    key: z.id,
    className: "rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.35)] p-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("select", {
    value: z.mode,
    onChange: e => onUpdate(z.id, {
      mode: e.target.value
    }),
    className: "flex-1 h-8 rounded-md bg-[rgba(5,11,14,0.5)] border border-[var(--line)] text-[var(--text)] font-display text-[11px] uppercase tracking-[0.12em] px-2 outline-none"
  }, ZONE_MODES.map(m => /*#__PURE__*/React.createElement("option", {
    key: m.id,
    value: m.id
  }, degraded && degraded.has(m.id) ? m.label + " â‰ˆ" : m.label))), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[10px] text-[var(--text-faint)] whitespace-nowrap"
  }, z.codes.length, " keys"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(z.id),
    title: "Remove zone",
    className: "w-7 h-7 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-rose-300 hover:border-rose-400/40"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, (z.colors || []).map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "relative w-7 h-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full rounded-md ring-1 ring-white/10",
    style: {
      background: c
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: c,
    onChange: e => {
      const cs = [...z.colors];
      cs[i] = e.target.value;
      onUpdate(z.id, {
        colors: cs
      });
    },
    className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
  })), z.colors.length > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => onUpdate(z.id, {
      colors: z.colors.filter((_, j) => j !== i)
    }),
    className: "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-900 ring-1 ring-white/20 text-[var(--text-dim)] hover:text-rose-300 grid place-items-center text-[9px]"
  }, "\u2715"))), (z.colors || []).length < 4 && /*#__PURE__*/React.createElement("button", {
    onClick: () => onUpdate(z.id, {
      colors: [...(z.colors || []), "#ffffff"]
    }),
    className: "w-7 h-7 rounded-md border-2 border-dashed border-[var(--line)] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] grid place-items-center text-[12px]"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
  }, "Spd"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "aether flex-1",
    min: 0,
    max: 100,
    step: 1,
    value: z.speed != null ? z.speed : 60,
    style: {
      "--pct": (z.speed != null ? z.speed : 60) + "%"
    },
    onChange: e => onUpdate(z.id, {
      speed: parseFloat(e.target.value)
    })
  })))))));

  /* ============================================================
     Widget 1 â€” Mode Picker: firmware pattern grid, power/full-RGB,
     brightness/speed sliders, direction, striation orientation.
     ============================================================ */
  /* DirectionDial â€” an angle picker for effect flow direction. The firmware
     supports 4 cardinal directions (right0 left1 up2 down3), so the dial snaps
     to the nearest. Drag or click anywhere on the ring to set the angle. */
  const DIR_BYTE_AT = [0, 2, 1, 3]; // round(angle/90)%4 -> byte
  const DIR_ANGLE_OF = {
    0: 0,
    2: 90,
    1: 180,
    3: 270
  };
  const DIR_NAME = {
    0: "Right",
    1: "Left",
    2: "Up",
    3: "Down"
  };
  function DirectionDial({
    direction,
    setDirection
  }) {
    const ref = useRef(null);
    const angle = DIR_ANGLE_OF[direction] != null ? DIR_ANGLE_OF[direction] : 0;
    const pick = e => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      let a = Math.atan2(r.top + r.height / 2 - e.clientY, e.clientX - (r.left + r.width / 2)) * 180 / Math.PI;
      if (a < 0) a += 360;
      setDirection(DIR_BYTE_AT[Math.round(a / 90) % 4]);
    };
    const marks = [["â†’", 0, {
      right: 6,
      top: "50%",
      transform: "translateY(-50%)"
    }], ["â†‘", 2, {
      top: 6,
      left: "50%",
      transform: "translateX(-50%)"
    }], ["â†", 1, {
      left: 6,
      top: "50%",
      transform: "translateY(-50%)"
    }], ["â†“", 3, {
      bottom: 6,
      left: "50%",
      transform: "translateX(-50%)"
    }]];
    return /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      ref: ref,
      onPointerDown: e => {
        e.currentTarget.setPointerCapture(e.pointerId);
        pick(e);
      },
      onPointerMove: e => e.buttons && pick(e),
      style: {
        width: 112,
        height: 112,
        cursor: "pointer",
        touchAction: "none"
      },
      className: "relative rounded-full border border-[var(--line)] bg-white/[0.02]"
    }, marks.map(([glyph, byte, css]) => /*#__PURE__*/React.createElement("span", {
      key: byte,
      style: {
        position: "absolute",
        fontSize: 11,
        ...css,
        color: direction === byte ? "var(--accent)" : "var(--text-faint)"
      }
    }, glyph)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 44,
        height: 3,
        borderRadius: 3,
        background: "linear-gradient(90deg, transparent, var(--accent))",
        transformOrigin: "left center",
        transform: `rotate(${-angle}deg)`,
        boxShadow: "0 0 10px var(--accent-glow)",
        transition: "transform 0.2s var(--ease-out)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 8,
        height: 8,
        marginLeft: -4,
        marginTop: -4,
        borderRadius: "50%",
        background: "var(--accent)"
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]"
    }, "Angle"), /*#__PURE__*/React.createElement("div", {
      className: "font-title text-[20px] text-[var(--text)] leading-tight"
    }, DIR_NAME[direction] || "Right"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5"
    }, angle, "\xB0 \xB7 snaps to 4-way")));
  }

  /* Two-way direction toggle â€” for firmware-only boards whose registry declares
     `direction: true` (a plain 0/1 byte) for the current mode. Boards with a
     directional *kind* ("lr"/"ud"/â€¦) keep the DirectionDial. */
  function DirectionToggle({
    direction,
    setDirection
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-1.5 max-w-[260px]"
    }, [["Forward", 0, "â†’"], ["Reverse", 1, "â†"]].map(([lbl, val, ic]) => {
      const active = (direction === 1 ? 1 : 0) === val;
      return /*#__PURE__*/React.createElement("button", {
        key: val,
        onClick: () => setDirection(val),
        className: `h-9 rounded-lg border text-[11px] uppercase tracking-[0.12em] flex items-center justify-center gap-1.5 transition-all
                        ${active ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-[14px]"
      }, ic), lbl);
    }));
  }
  function ModePickerWidget(ctx) {
    const {
      pattern,
      setPattern,
      brightness,
      setBrightness,
      speed,
      setSpeed,
      power,
      setPower,
      fullColor,
      setFullColor,
      direction,
      setDirection,
      striOrient,
      setStriOrient
    } = ctx;
    const fullColorOk = pattern !== "static" && pattern !== "custom";

    /* Board awareness (additive). firmwareOnly === false for the Win60 (its
       registry sets hostEngine true) and whenever no board data is available,
       so every branch below falls back to today's exact rendering. */
    const bctx = boardCtxOf(ctx);
    const bl = bctx.lighting;
    const boardName = bctx.board && bctx.board.name || "this board";
    const modeGrid = modeGridFor(bl);
    const firmwareOnly = !!bl && bl.hostEngine === false;
    const rule = firmwareOnly ? modeRuleFor(bl, pattern) : null;
    // A host-engine board's OWN firmware mode beyond the legacy grid (e.g. the
    // MINI's starry-sky): its registry rule drives the direction control below.
    // null for every legacy grid id and whenever there is no board data, so the
    // Win60 (whose ids are all legacy) renders exactly as before.
    const hfdRule = !firmwareOnly && bl && !LIGHT_MODES.some(m => m.id === pattern) ? modeRuleFor(bl, pattern) : null;
    // Discrete firmware brightness/speed levels â€” only on firmware-only boards
    // (on host-engine boards the % is genuinely continuous in the host engine).
    const briMax = firmwareOnly && bl.brightnessMax || 0;
    const spdMax = firmwareOnly && bl.speedMax || 0;
    const speedOff = !!(firmwareOnly && rule && rule.speed === false);
    // Host-engine fps cap â€” null unless the board declares one meaningfully
    // below the 60fps engine rate (missing hostEngineMaxFps => null => no change).
    const fpsCap = !firmwareOnly ? hostFpsLimited(bl) : null;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-end gap-4 mb-1"
    }, fullColorOk && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2",
      title: "Cycle the full RGB spectrum (rainbow) instead of the chosen colors"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Full RGB"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setFullColor(!fullColor),
      className: `relative w-10 h-5 rounded-full border transition-colors
                          ${fullColor ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-white/[0.04] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                                ${fullColor ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-slate-400"}`
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]"
    }, "Power"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setPower(!power),
      className: `relative w-10 h-5 rounded-full border transition-colors
                        ${power ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-white/[0.04] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                              ${power ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-slate-400"}`
    })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Light Mode"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-1.5"
    }, modeGrid.map(m => {
      const active = pattern === m.id;
      // Press-reactive host effect on a low-fps board: mark it (â‰ˆ) so the
      // footnote below can be specific. degraded is always false when the
      // board declares no cap, so nothing changes on such boards.
      const degraded = fpsCap != null && HOST_FX_FAST.has(m.id);
      return /*#__PURE__*/React.createElement("button", {
        key: m.id,
        onClick: () => setPattern(m.id),
        title: degraded ? `Press-reactive â€” ${boardName} sustains ~${fpsCap} fps, so this effect will look choppy` : undefined,
        className: `h-9 rounded-lg border font-display text-[11px] tracking-[0.06em] flex items-center justify-center gap-1.5 transition-all
                            ${active ? "border-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_14px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`,
        style: active ? {
          background: "var(--accent-gradient, var(--accent))"
        } : {}
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-[12px]"
      }, m.icon), " ", m.label, degraded && /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[9px] opacity-70"
      }, "\u2248"));
    })), firmwareOnly && /*#__PURE__*/React.createElement("div", {
      className: "mt-2 font-mono text-[10px] text-[var(--text-faint)] leading-relaxed"
    }, "This is ", boardName, "'s own firmware effect set. Aether's host-animated effects (Rain, Comet, Tide, Aurora and the rest) stream per-key RGB frames from the PC, and that streaming path is not yet proven on this board \u2014 so they are not offered. Static per-key painting still works."), fpsCap != null && /*#__PURE__*/React.createElement("div", {
      className: "mt-2 font-mono text-[10px] text-[var(--text-faint)] leading-relaxed"
    }, "Host-animated effects stream from this PC at ~", fpsCap, " fps on ", boardName, " (engine target ~", HOST_ENGINE_TARGET_FPS, " fps). Ambient effects like Rain, Aurora, Comet and Tide look right at that rate; press-reactive effects \u2014 marked \u2248 \u2014 need faster updates and will look choppy.")), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Brightness"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--accent)]"
    }, briMax > 0 ? `${Math.round(brightness / 100 * briMax)} / ${briMax}` : /*#__PURE__*/React.createElement(React.Fragment, null, Math.round(brightness), "%"))), /*#__PURE__*/React.createElement("input", {
      type: "range",
      className: "aether w-full",
      min: 0,
      max: 100,
      step: briMax > 0 ? 100 / briMax : 1,
      value: brightness,
      style: {
        "--pct": brightness + "%"
      },
      onChange: e => setBrightness(parseFloat(e.target.value))
    })), !speedOff ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Speed"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--accent)]"
    }, spdMax > 0 ? `${Math.round(speed / 100 * spdMax)} / ${spdMax}` : /*#__PURE__*/React.createElement(React.Fragment, null, Math.round(speed), "%"))), /*#__PURE__*/React.createElement("input", {
      type: "range",
      className: "aether w-full",
      min: 0,
      max: 100,
      step: spdMax > 0 ? 100 / spdMax : 1,
      value: speed,
      style: {
        "--pct": speed + "%"
      },
      onChange: e => setSpeed(parseFloat(e.target.value))
    })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Speed"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, "n/a")), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] leading-relaxed"
    }, "This mode has no speed control on ", boardName, "."))), !firmwareOnly ?
    // Host-engine board. A board-specific firmware mode (hfdRule) honours
    // its own registry rule: `direction: true` is a 2-way 0/1 byte ->
    // toggle; no direction declared -> no control (the firmware ignores
    // it). Legacy grid ids (hfdRule null) keep today's 4-way dial.
    hfdRule ? hfdRule.direction === true ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Direction"), /*#__PURE__*/React.createElement(DirectionToggle, {
      direction: direction,
      setDirection: setDirection
    }), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] mt-1.5"
    }, "This effect takes a 2-way direction on ", boardName, ".")) : null : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Direction"), /*#__PURE__*/React.createElement(DirectionDial, {
      direction: direction,
      setDirection: setDirection
    })) : rule && rule.direction ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Direction"), rule.direction === true ? /*#__PURE__*/React.createElement(DirectionToggle, {
      direction: direction,
      setDirection: setDirection
    }) : /*#__PURE__*/React.createElement(DirectionDial, {
      direction: direction,
      setDirection: setDirection
    }), rule.direction === true && /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] mt-1.5"
    }, "This effect takes a 2-way direction on ", boardName, ".")) : null, pattern === "striation" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Stripe Orientation"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-1.5 max-w-[260px]"
    }, [["Vertical", "v", "â–¥"], ["Horizontal", "h", "â–¤"], ["Both", "both", "â–¦"]].map(([lbl, val, ic]) => {
      const active = (striOrient || "v") === val;
      return /*#__PURE__*/React.createElement("button", {
        key: val,
        onClick: () => setStriOrient && setStriOrient(val),
        className: `h-9 rounded-lg border text-[11px] uppercase tracking-[0.12em] flex items-center justify-center gap-1.5 transition-all
                              ${active ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-[14px]"
      }, ic), lbl);
    }))));
  }

  /* ============================================================
     Widget 2 â€” Color Palette: effect-colors palette + presets + background color.
     ============================================================ */
  function ColorPaletteWidget(ctx) {
    const {
      colors,
      setColors,
      bgColor,
      setBgColor,
      pattern
    } = ctx;
    const palette = colors || [];
    const [activeSlot, setActiveSlot] = useState(0);
    // Draft for the bg hex text field: lets the user type intermediate values
    // without committing an invalid color (which would stream black to the
    // device). Only a full valid #RRGGBB is pushed to bgColor; external changes
    // (picker, swatches, Off) sync back into the field.
    const [bgText, setBgText] = useState(bgColor);
    useEffect(() => {
      setBgText(bgColor);
    }, [bgColor]);

    /* Board awareness (additive): some boards' firmware forces random colors
       for certain modes (registry rule `color: false`) â€” the picker cannot
       apply. The Win60 declares no such mode, so this never triggers there. */
    const bctx = boardCtxOf(ctx);
    const boardName = bctx.board && bctx.board.name || "this board";
    const colorRule = modeRuleFor(bctx.lighting, pattern);
    const colorLocked = !!(colorRule && colorRule.color === false);
    const setSlot = (i, value) => {
      const p = [...palette];
      p[i] = value;
      setColors(p);
    };
    const addSlot = () => {
      if (palette.length >= 4) return;
      const seeds = ["#663390", "#009fa6", "#a62848", "#a66e14"];
      const next = seeds[palette.length] || "#a6a6a6";
      setColors([...palette, next]);
      setActiveSlot(palette.length);
    };
    const removeSlot = i => {
      if (palette.length <= 0) return;
      const p = palette.filter((_, idx) => idx !== i);
      setColors(p);
      if (activeSlot >= p.length) setActiveSlot(p.length - 1);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4"
    }, pattern !== "custom" && colorLocked ? /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)] leading-relaxed"
    }, "\"", colorRule && colorRule.name || pattern, "\" uses firmware-forced random colors on", " ", boardName, " \u2014 the effect color picker does not apply while it is active. The other controls still work.") : pattern !== "custom" ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Effect colors \xB7 ", palette.length, "/4"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, palette.length > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: () => setColors([]),
      className: "font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-dim)] hover:text-rose-300"
    }, "Clear all"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, "click slot to recolor"))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2 mb-3"
    }, palette.map((c, i) => {
      const isActive = activeSlot === i;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "relative flex-1 min-w-0 group"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => setActiveSlot(i),
        className: `relative w-full h-16 rounded-2xl overflow-hidden ring-1 transition-all
                                ${isActive ? "ring-2 ring-white/80 scale-[1.02]" : "ring-white/10 hover:scale-[1.01]"}`,
        style: {
          background: c,
          boxShadow: `0 0 24px ${c}55, inset 0 0 0 1px rgba(255,255,255,0.06)`
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "absolute bottom-1.5 left-2 text-[10px] font-mono text-white/85",
        style: {
          textShadow: "0 1px 4px rgba(0,0,0,0.6)"
        }
      }, c.toUpperCase()), /*#__PURE__*/React.createElement("input", {
        type: "color",
        value: c,
        onChange: e => setSlot(i, e.target.value),
        onClick: e => e.stopPropagation(),
        className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
      })), palette.length > 0 && /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          removeSlot(i);
        },
        title: "Remove",
        className: "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900 ring-1 ring-white/20 text-slate-300 hover:text-rose-300 grid place-items-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
      }, "\u2715"));
    }), palette.length < 4 && /*#__PURE__*/React.createElement("button", {
      onClick: addSlot,
      className: "flex-1 min-w-0 h-16 rounded-2xl border-2 border-dashed border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:bg-white/[0.04] hover:text-white grid place-items-center transition-all"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.18em]"
    }, IPlus && /*#__PURE__*/React.createElement(IPlus, {
      size: 13
    }), " Add"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-4 gap-2"
    }, PRESET_PALETTES.map((p, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => {
        setColors([...p]);
        setActiveSlot(0);
      },
      className: "h-7 rounded-lg ring-1 ring-white/10 hover:scale-[1.02] transition-transform overflow-hidden",
      title: p.join(", ")
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-full h-full flex"
    }, p.map((c, j) => /*#__PURE__*/React.createElement("span", {
      key: j,
      className: "flex-1",
      style: {
        background: c
      }
    }))))))) : /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Custom mode drives colors per Effect Zone (see the Effect Preview widget) \u2014 the shared palette is hidden while Custom is active."), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-2.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Background color"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, "underlies the effect")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative w-14 h-12 rounded-xl overflow-hidden ring-1 ring-white/10",
      style: {
        background: bgColor,
        boxShadow: `0 0 18px ${bgColor}55`
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "color",
      value: bgColor,
      onChange: e => setBgColor(e.target.value),
      className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
    })), /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: (bgText || "").toUpperCase(),
      onChange: e => {
        const v = e.target.value;
        setBgText(v);
        if (/^#[0-9a-fA-F]{6}$/.test(v)) setBgColor(v);
      },
      className: "flex-1 h-10 px-3 rounded-lg bg-[rgba(5,11,14,0.5)] border border-[var(--line)] font-mono text-[12px] text-[var(--text)] outline-none focus:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => setBgColor("#000000"),
      className: "px-2.5 h-10 rounded-lg border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[10.5px] uppercase tracking-[0.16em]"
    }, "Off")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5 mt-2.5"
    }, BG_SWATCHES.map(c => /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => setBgColor(c),
      className: `w-6 h-6 rounded-md ring-1 ${bgColor.toLowerCase() === c.toLowerCase() ? "ring-white scale-110" : "ring-white/15 hover:scale-105"} transition-transform`,
      style: {
        background: c
      },
      title: c
    })))));
  }

  /* ============================================================
     Widget 3 â€” Effect Preview: live SVG pattern preview + Custom effect zones.
     ============================================================ */
  function EffectPreviewWidget(ctx) {
    const {
      pattern,
      colors,
      bgColor,
      zones,
      addZone,
      updateZone,
      removeZone,
      selectedKeys
    } = ctx;
    const palette = colors || [];
    const previewColor = palette[0] || bgColor || "#9d4edd";
    const kind = previewKindFor(pattern);

    /* Board awareness (additive): Effect Zones animate via the host streaming
       engine, so they are only offered when the board allows it (hostEngine
       true, or no board data â€” fail-open, exactly today's behaviour). */
    const bctx = boardCtxOf(ctx);
    const hostFx = !bctx.lighting || bctx.lighting.hostEngine !== false;
    const boardName = bctx.board && bctx.board.name || "this board";
    // Streaming fps cap â€” drives the â‰ˆ markers on zone modes (null = no cap).
    const fpsCap = hostFx ? hostFpsLimited(bctx.lighting) : null;

    /* Dispatch honesty: a mode that is one of THIS board's own firmware effects
       (beyond the legacy host grid â€” e.g. the MINI's starry-sky) runs on the
       keyboard itself, so the host-animation schematic would be a lie. Show
       what actually happens instead. Legacy grid ids (and the no-board path)
       render exactly today's preview. */
    const fwRule = modeRuleFor(bctx.lighting, pattern);
    const fwOnlyMode = !!fwRule && !LIGHT_MODES.some(m => m.id === pattern);
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)]"
    }, "Preview"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.16em]"
    }, fwOnlyMode ? pattern + " Â· firmware" : pattern)), fwOnlyMode ? /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] leading-relaxed mt-2"
    }, "\"", fwRule.name || pattern, "\" is one of ", boardName, "'s built-in firmware effects \u2014 the animation runs on the keyboard itself, not through Aether's host engine, so there is no host preview to mirror here. The board plays it live.") : /*#__PURE__*/React.createElement(PatternPreview, {
      kind: kind,
      color: previewColor
    })), pattern === "custom" && (hostFx ? /*#__PURE__*/React.createElement(ZonesPanel, {
      zones: zones,
      selectedKeys: selectedKeys,
      onAdd: addZone,
      onUpdate: updateZone,
      onRemove: removeZone,
      degraded: fpsCap != null ? HOST_FX_FAST : null
    }) : /*#__PURE__*/React.createElement("div", {
      className: "glass p-4 font-mono text-[11px] text-[var(--text-dim)] leading-relaxed"
    }, "Effect Zones animate through Aether's host streaming engine, and that streaming path is not yet proven on ", boardName, " \u2014 so zones are not offered. Static per-key colors still work: use the Per-key Paint widget.")), pattern !== "custom" && /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Switch Light Mode to \"Custom\" (Mode Picker widget) to build per-zone effects here."));
  }

  /* ============================================================
     Widget 4 â€” Per-key Paint: assign/clear the active palette color to
     the current key selection.
     ============================================================ */
  function PerKeyPaintWidget(ctx) {
    const {
      colors,
      perKeyColors,
      setPerKeyColors,
      selectedKeys,
      setSelectedKeys,
      ledMap
    } = ctx;
    const palette = colors || [];
    const [activeSlot, setActiveSlot] = useState(0);
    const selCount = selectedKeys ? selectedKeys.size : 0;
    const assignToSelection = () => {
      if (!selectedKeys || selectedKeys.size === 0) return;
      const c = palette[activeSlot] || palette[0] || "#ffffff";
      const next = {
        ...(perKeyColors || {})
      };
      selectedKeys.forEach(code => {
        next[code] = c;
      });
      setPerKeyColors(next);
    };
    const clearPerKeyForSelection = () => {
      if (!selectedKeys || selectedKeys.size === 0) return;
      const next = {
        ...(perKeyColors || {})
      };
      selectedKeys.forEach(code => {
        delete next[code];
      });
      setPerKeyColors(next);
    };
    const selectAll = () => {
      if (!setSelectedKeys) return;
      setSelectedKeys(new Set(Object.keys(ledMap || {})));
    };
    const clearSelection = () => {
      if (!setSelectedKeys) return;
      setSelectedKeys(new Set());
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4"
    }, palette.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.22em] text-[var(--text-dim)] mb-2"
    }, "Active slot"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, palette.map((c, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setActiveSlot(i),
      className: `w-9 h-9 rounded-lg ring-1 transition-all ${activeSlot === i ? "ring-2 ring-white/80 scale-110" : "ring-white/10 hover:scale-105"}`,
      style: {
        background: c,
        boxShadow: `0 0 12px ${c}55`
      },
      title: c.toUpperCase()
    })))), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)]"
    }, "Per-key colors"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5"
    }, selCount, " key", selCount === 1 ? "" : "s", " selected \xB7 Ctrl/\u2318-click to toggle")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: selectAll,
      className: "px-2.5 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[10.5px] uppercase tracking-[0.16em]"
    }, "Select all"), /*#__PURE__*/React.createElement("button", {
      onClick: clearSelection,
      className: "px-2.5 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[10.5px] uppercase tracking-[0.16em]"
    }, "Clear"))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: assignToSelection,
      disabled: !selectedKeys || selectedKeys.size === 0,
      className: "flex-1 h-10 rounded-lg font-display text-[12px] uppercase tracking-[0.18em] text-[var(--accent-fg)] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:brightness-110",
      style: {
        background: "var(--accent-gradient, var(--accent))",
        boxShadow: "0 8px 24px -8px var(--accent-glow)"
      }
    }, "Paint selected with slot ", activeSlot + 1), /*#__PURE__*/React.createElement("button", {
      onClick: clearPerKeyForSelection,
      disabled: !selectedKeys || selectedKeys.size === 0,
      className: "px-3 h-10 rounded-lg border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] disabled:opacity-40 font-display text-[11.5px] uppercase tracking-[0.18em]"
    }, "Reset"))));
  }

  /* ============================================================
     Widget 5 â€” Live Keyboard: the real board painted with the live animated
     effect frame (ctx.ledMapLive, polled from get_light_frame on the Lighting
     tab). Click keys to build a selection for Per-key Paint. This is the
     animated keyboard preview from the previous UI.
     ============================================================ */
  function LiveKeyboardWidget(ctx) {
    const KB = window.AetherKeyboard || {};
    const KeyboardPanel = KB.KeyboardPanel;
    const {
      ledMap,
      ledMapLive,
      perKeyColors,
      selectedKeys,
      setSelectedKeys,
      connected,
      pattern
    } = ctx;
    /* Board awareness (additive): a mode that runs on the BOARD's firmware has
       no host frames to mirror, so the keyboard below shows the static
       schematic (fg/bg only). Say so, instead of letting the still image read
       as a broken animation. Never fires for legacy grid ids on host-engine
       boards (the shipped Win60 surface) or without board data. */
    const bctx = boardCtxOf(ctx);
    const fwRule = modeRuleFor(bctx.lighting, pattern);
    const fwLive = !!fwRule && pattern !== "static" && pattern !== "custom" && (!LIGHT_MODES.some(m => m.id === pattern) || bctx.lighting && bctx.lighting.hostEngine === false);
    if (typeof KeyboardPanel !== "function") {
      return /*#__PURE__*/React.createElement("div", {
        className: "font-mono text-[11px] text-[var(--text-faint)] p-2"
      }, "keyboard layout unavailable");
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2"
    }, !connected && /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, "connect the board to see the live effect"), fwLive && /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] leading-relaxed text-center"
    }, "\"", fwRule.name || pattern, "\" animates on the keyboard's own firmware \u2014 the board plays it live. Keys below show ", fwRule.color === false ? "your background color only (this effect uses firmware-chosen colors)" : "the exact colors sent (effect color over your background)", ", not the animation."), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center"
    }, React.createElement(KeyboardPanel, {
      mode: "lighting",
      layer: "default",
      ledMap: ledMapLive || ledMap,
      perKeyOverride: perKeyColors,
      selectedKeys: selectedKeys || new Set(),
      setSelectedKeys: setSelectedKeys || (() => {}),
      showPill: false
    })));
  }

  /* ============================================================
     Layout â€” Live Keyboard is the hero (wide, top); controls below/around.
     ============================================================ */
  const LIGHTING_WIDGETS = [{
    id: "live",
    title: "Live Keyboard",
    default: {
      x: 40,
      y: 32,
      w: 1000,
      h: 330
    },
    min: {
      w: 560,
      h: 240
    },
    render: LiveKeyboardWidget
  }, {
    id: "mode",
    title: "Mode Picker",
    default: {
      x: 40,
      y: 382,
      w: 460,
      h: 520
    },
    min: {
      w: 340,
      h: 420
    },
    render: ModePickerWidget
  }, {
    id: "palette",
    title: "Color Palette",
    default: {
      x: 520,
      y: 382,
      w: 460,
      h: 460
    },
    min: {
      w: 340,
      h: 340
    },
    render: ColorPaletteWidget
  }, {
    id: "preview",
    title: "Effect Preview",
    default: {
      x: 1000,
      y: 382,
      w: 380,
      h: 460
    },
    min: {
      w: 300,
      h: 300
    },
    render: EffectPreviewWidget
  }, {
    id: "perkey",
    title: "Per-key Paint",
    default: {
      x: 1060,
      y: 32,
      w: 380,
      h: 330
    },
    min: {
      w: 340,
      h: 260
    },
    render: PerKeyPaintWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.LIGHTING_WIDGETS = LIGHTING_WIDGETS;
  // Pure board-awareness helpers. app.jsx reads resolveLightDispatch /
  // buildLightCalls at send time (this file loads before app.jsx â€” see
  // build_runtime.py's dependency order); the rest is for verification.
  window.AetherWorkspaces.LIGHTING_BOARD = {
    LIGHT_MODES,
    modeGridFor,
    modeRuleFor,
    boardCtxOf,
    HOST_ENGINE_TARGET_FPS,
    HOST_FX_FAST,
    hostFpsCapOf,
    hostFpsLimited,
    HOST_FX_IDS,
    resolveLightDispatch,
    buildLightCalls,
    briByteFor,
    spdByteFor,
    previewSimColor
  };
})();
</script>
<script data-mod="ws_macros">
(() => {
  /* ============================================================
     Macros workspace â€” Aula Win60 HE macro slots (cmd 25) + key binds.
     Exports window.AetherWorkspaces.MACROS_WIDGETS â€” widget descriptors
       { id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }
     like every other workspace. Widgets talk to the bridge through ctx.apiCall
     ONLY (list_macros / read_macro / save_macro / delete_macro / bind_macro /
     unbind_macro â€” see app_web.py Api) and share state through a tiny local
     store, since widget frames are independent React roots of one workspace.
  
     Capability gate: the whole section is hidden by app.jsx unless the active
     board's registry flag `macros` is true (fail-open when no board data is
     available, like every other gate); each widget also re-checks at render
     so a board switch while the tab is open degrades to a notice.
     ============================================================ */
  const {
    useState,
    useEffect,
    useRef,
    useMemo
  } = React;
  const KB = window.AetherKeyboard || {};
  const KeyboardPanel = KB.KeyboardPanel;
  const KB_ROWS = KB.KB_ROWS || [];

  /* ===== board-context (looked up at render â€” components/ compile after
     workspaces/, see socd.jsx) ===== */
  const FALLBACK_BOARD_CTX = React.createContext(null);
  const useBoardSafe = () => {
    const B = window.AetherBoard;
    const val = React.useContext(B && B.BoardContext || FALLBACK_BOARD_CTX);
    return val || B && B.UNKNOWN_BOARD || null;
  };
  const macrosState = b => b && typeof b.capState === "function" ? b.capState("macros") : "unknown";

  /* ===== HID usage <-> labels (USB HID keyboard page 0x07) ===== */
  const HID_KEYS = [];
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((c, i) => HID_KEYS.push([c, 0x04 + i]));
  [["1", 0x1e], ["2", 0x1f], ["3", 0x20], ["4", 0x21], ["5", 0x22], ["6", 0x23], ["7", 0x24], ["8", 0x25], ["9", 0x26], ["0", 0x27], ["Enter", 0x28], ["Esc", 0x29], ["Back", 0x2a], ["Tab", 0x2b], ["Space", 0x2c], ["-_", 0x2d], ["=+", 0x2e], ["[{", 0x2f], ["]}", 0x30], ["\\|", 0x31], [";:", 0x33], ["'\"", 0x34], ["`~", 0x35], [",<", 0x36], [".>", 0x37], ["/?", 0x38], ["Caps", 0x39], ["F1", 0x3a], ["F2", 0x3b], ["F3", 0x3c], ["F4", 0x3d], ["F5", 0x3e], ["F6", 0x3f], ["F7", 0x40], ["F8", 0x41], ["F9", 0x42], ["F10", 0x43], ["F11", 0x44], ["F12", 0x45], ["PrtSc", 0x46], ["ScrLk", 0x47], ["Pause", 0x48], ["Ins", 0x49], ["Home", 0x4a], ["PgUp", 0x4b], ["Del", 0x4c], ["End", 0x4d], ["PgDn", 0x4e], ["Right", 0x4f], ["Left", 0x50], ["Down", 0x51], ["Up", 0x52], ["Menu", 0x65], ["L-Ctrl", 0xe0], ["L-Shift", 0xe1], ["L-Alt", 0xe2], ["L-Win", 0xe3], ["R-Ctrl", 0xe4], ["R-Shift", 0xe5], ["R-Alt", 0xe6], ["R-Win", 0xe7]].forEach(p => HID_KEYS.push(p));
  const HID_LABEL = {};
  HID_KEYS.forEach(([l, c]) => {
    HID_LABEL[c] = l;
  });
  const hidLabel = c => HID_LABEL[c] || "0x" + (c & 0xff).toString(16).toUpperCase().padStart(2, "0");

  /* KeyboardEvent.code -> HID usage, for the recorder. */
  const CODE_TO_HID = (() => {
    const m = {};
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((c, i) => {
      m["Key" + c] = 0x04 + i;
    });
    "1234567890".split("").forEach((d, i) => {
      m["Digit" + d] = 0x1e + i;
    });
    Object.assign(m, {
      Enter: 0x28,
      Escape: 0x29,
      Backspace: 0x2a,
      Tab: 0x2b,
      Space: 0x2c,
      Minus: 0x2d,
      Equal: 0x2e,
      BracketLeft: 0x2f,
      BracketRight: 0x30,
      Backslash: 0x31,
      Semicolon: 0x33,
      Quote: 0x34,
      Backquote: 0x35,
      Comma: 0x36,
      Period: 0x37,
      Slash: 0x38,
      CapsLock: 0x39,
      PrintScreen: 0x46,
      ScrollLock: 0x47,
      Pause: 0x48,
      Insert: 0x49,
      Home: 0x4a,
      PageUp: 0x4b,
      Delete: 0x4c,
      End: 0x4d,
      PageDown: 0x4e,
      ArrowRight: 0x4f,
      ArrowLeft: 0x50,
      ArrowDown: 0x51,
      ArrowUp: 0x52,
      ContextMenu: 0x65,
      ControlLeft: 0xe0,
      ShiftLeft: 0xe1,
      AltLeft: 0xe2,
      MetaLeft: 0xe3,
      ControlRight: 0xe4,
      ShiftRight: 0xe5,
      AltRight: 0xe6,
      MetaRight: 0xe7
    });
    for (let i = 1; i <= 12; i++) m["F" + i] = 0x3a + i - 1;
    return m;
  })();

  /* Design code -> key label, for the bindings list. */
  const LABEL_OF_CODE = {};
  KB_ROWS.flat().forEach(([label, _u, code]) => {
    LABEL_OF_CODE[code] = label;
  });

  /* Playback modes = macro slot header byte 1 (vendor getMacroType). Only 0 and
     1 were seen on the wire; 2 and 3 exist in the vendor UI but are unverified. */
  const PLAY_MODES = [{
    v: 0,
    label: "Once",
    hint: "Plays the sequence once per press.",
    verified: true
  }, {
    v: 1,
    label: "Repeat Ã—N",
    hint: "Plays the sequence N times per press.",
    verified: true
  }, {
    v: 2,
    label: "Toggle",
    hint: "Vendor macroType3 â€” press to start, press again to stop. NOT verified on hardware.",
    verified: false
  }, {
    v: 3,
    label: "Hold",
    hint: "Vendor macroType4 â€” repeats while held. NOT verified on hardware.",
    verified: false
  }];

  /* ===== shared store ===== */
  const store = {
    macros: [],
    // [{slot, name, play_mode, repeat_count, events:[{delay,hid,down}]}]
    bindings: {},
    // {designCode: slot}
    bindingsError: null,
    limits: {
      slots: 10,
      maxEvents: 62,
      maxDelay: 65535,
      maxRepeat: 65535,
      playModes: [0, 1, 2, 3]
    },
    sel: null,
    // selected slot (editor target)
    draft: null,
    // {slot, name, playMode, repeat, events:[{delay,hid,down}]}
    dirty: false,
    loaded: false,
    busy: false,
    status: null,
    // {tone:"ok"|"warn"|"bad", msg}
    listeners: new Set()
  };
  const emit = () => store.listeners.forEach(fn => {
    try {
      fn();
    } catch (e) {}
  });
  const useStore = () => {
    const [, force] = useState(0);
    useEffect(() => {
      const fn = () => force(n => n + 1);
      store.listeners.add(fn);
      return () => store.listeners.delete(fn);
    }, []);
    return store;
  };
  const setStatus = (tone, msg) => {
    store.status = msg ? {
      tone,
      msg,
      id: Date.now()
    } : null;
    emit();
    if (msg) setTimeout(() => {
      if (store.status && store.status.msg === msg) {
        store.status = null;
        emit();
      }
    }, 4500);
  };
  const macroAt = slot => store.macros.find(m => m.slot === slot) || null;
  const blankDraft = slot => ({
    slot,
    name: "",
    playMode: 0,
    repeat: 1,
    events: []
  });
  const draftFrom = m => ({
    slot: m.slot,
    name: m.name || "",
    playMode: m.play_mode || 0,
    repeat: Math.max(1, m.repeat_count || 1),
    events: (m.events || []).map(e => ({
      delay: e.delay | 0,
      hid: e.hid | 0,
      down: !!e.down
    }))
  });
  const selectSlot = slot => {
    store.sel = slot;
    const m = macroAt(slot);
    store.draft = m ? draftFrom(m) : blankDraft(slot);
    store.dirty = false;
    emit();
  };
  const updateDraft = patch => {
    store.draft = Object.assign({}, store.draft || blankDraft(store.sel == null ? 0 : store.sel), patch);
    store.dirty = true;
    emit();
  };
  const refresh = async (apiCall, quiet) => {
    if (!apiCall) return;
    store.busy = true;
    emit();
    try {
      const r = await apiCall("list_macros");
      if (r && r.ok) {
        store.macros = Array.isArray(r.macros) ? r.macros : [];
        store.bindings = r.bindings && typeof r.bindings === "object" ? r.bindings : {};
        store.bindingsError = r.bindings ? null : r.bindings_error || null;
        store.limits = {
          slots: r.slots || 10,
          maxEvents: r.max_events || 62,
          maxDelay: r.max_delay_ms || 65535,
          maxRepeat: r.max_repeat || 65535,
          playModes: Array.isArray(r.play_modes) ? r.play_modes : [0, 1, 2, 3]
        };
        store.loaded = true;
        if (store.sel != null && !store.dirty) {
          const m = macroAt(store.sel);
          store.draft = m ? draftFrom(m) : blankDraft(store.sel);
        }
        if (!quiet) setStatus("ok", `Read ${store.macros.length} macro${store.macros.length === 1 ? "" : "s"} from the board`);
      } else if (!quiet) {
        setStatus("bad", r && r.error || "list_macros failed");
      }
    } finally {
      store.busy = false;
      emit();
    }
  };

  /* ===== small shared bits ===== */
  const Label = ({
    children
  }) => /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1.5"
  }, children);
  const Note = ({
    children,
    tone
  }) => /*#__PURE__*/React.createElement("div", {
    className: `text-[11px] leading-relaxed ${tone === "warn" ? "text-amber-300/90" : tone === "bad" ? "text-rose-300/90" : "text-[var(--text-dim)]"}`
  }, children);
  const Btn = ({
    children,
    onClick,
    disabled,
    variant = "ghost",
    title,
    small
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    title: title,
    className: `${small ? "px-2 h-7 text-[10px]" : "px-3 h-9 text-[11px]"} rounded-md border font-display uppercase tracking-[0.16em] transition-all
                ${disabled ? "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] cursor-not-allowed" : variant === "primary" ? "border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] hover:bg-[var(--accent)]/25 shadow-[0_0_12px_var(--accent-glow)]" : variant === "danger" ? "border-rose-400/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20" : variant === "rec" ? "border-rose-400/60 bg-rose-500/20 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.45)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:text-[var(--text)]"}`
  }, children);
  const StatusLine = () => {
    const s = useStore();
    const st = s.status;
    return /*#__PURE__*/React.createElement("div", {
      className: "h-4 text-[11px] font-mono tracking-[0.12em] truncate"
    }, st && /*#__PURE__*/React.createElement("span", {
      className: st.tone === "ok" ? "text-[var(--accent)]" : st.tone === "warn" ? "text-amber-300/90" : "text-rose-300/90"
    }, st.msg));
  };
  const Gate = ({
    children
  }) => {
    const b = useBoardSafe();
    const st = macrosState(b);
    if (st === "yes" || st === "unknown") return children;
    return /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-amber-400/35 bg-amber-500/[0.06] p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10.5px] uppercase tracking-[0.18em] text-amber-300 mb-1"
    }, "Macros \xB7 unavailable"), /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, st === "wip" ? "This board's macro protocol is source-only (never verified on hardware) â€” nothing here is sent." : "The active board does not declare macro support."));
  };
  const bindingsOfSlot = slot => Object.keys(store.bindings).filter(c => store.bindings[c] === slot);

  /* ============================================================
     Widget: Key Grid (the selectable board; selection is shared via ctx)
     ============================================================ */
  function KeyGridWidget(ctx) {
    const {
      selectedKeys,
      setSelectedKeys,
      layer,
      ledMap,
      liveDepths
    } = ctx;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center"
    }, KeyboardPanel ? React.createElement(KeyboardPanel, {
      mode: "keymap",
      layer: layer || "default",
      selectedKeys,
      setSelectedKeys,
      ledMap,
      showPill: false,
      compact: true,
      liveDepths
    }) : /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] text-[var(--text-faint)]"
    }, "Keyboard render unavailable."));
  }

  /* ============================================================
     Widget: Macro Library â€” the 10 board slots
     ============================================================ */
  function LibraryWidget(ctx) {
    const s = useStore();
    const {
      apiCall,
      connected
    } = ctx;
    useEffect(() => {
      if (connected && !s.loaded && !s.busy) refresh(apiCall, true);
    }, [connected]);
    const slots = Array.from({
      length: s.limits.slots
    }, (_, i) => i);
    const doDelete = async () => {
      if (s.sel == null || !macroAt(s.sel)) return;
      const m = macroAt(s.sel);
      if (!window.confirm(`Erase macro slot ${s.sel + 1}${m.name ? ` ("${m.name}")` : ""} on the board and release its keys?`)) return;
      store.busy = true;
      emit();
      const r = await apiCall("delete_macro", s.sel);
      store.busy = false;
      if (r && r.ok) {
        setStatus("ok", `Slot ${s.sel + 1} erased${r.released && r.released.length ? ` Â· released ${r.released.map(c => LABEL_OF_CODE[c] || c).join(", ")}` : ""}`);
        store.dirty = false;
        await refresh(apiCall, true);
        selectSlot(s.sel);
      } else setStatus("bad", r && r.error || "delete failed");
    };
    return /*#__PURE__*/React.createElement(Gate, null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(Btn, {
      onClick: () => refresh(apiCall),
      disabled: !connected || s.busy,
      small: true,
      title: "Re-read every slot from the board"
    }, "\u21BB Read board"), /*#__PURE__*/React.createElement(Btn, {
      onClick: doDelete,
      disabled: !connected || s.busy || s.sel == null || !macroAt(s.sel),
      variant: "danger",
      small: true
    }, "Erase slot"), /*#__PURE__*/React.createElement("span", {
      className: "ml-auto font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em]"
    }, s.macros.length, "/", s.limits.slots, " used")), !connected && /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, "Pair the keyboard to read its macro slots."), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 overflow-y-auto flex flex-col gap-1.5 pr-1"
    }, slots.map(slot => {
      const m = macroAt(slot);
      const active = s.sel === slot;
      const bound = bindingsOfSlot(slot);
      const mode = PLAY_MODES.find(p => p.v === (m ? m.play_mode : 0)) || PLAY_MODES[0];
      return /*#__PURE__*/React.createElement("button", {
        key: slot,
        onClick: () => selectSlot(slot),
        className: `w-full text-left px-3 py-2 rounded-md border transition-all
                            ${active ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: `font-mono text-[10px] w-7 ${active ? "text-[var(--accent)]" : "text-[var(--text-faint)]"}`
      }, "M", slot + 1), /*#__PURE__*/React.createElement("span", {
        className: `font-display text-[12.5px] truncate ${m ? "text-[var(--text)]" : "text-[var(--text-faint)] italic"}`
      }, m ? m.name || `Macro ${slot + 1}` : "empty"), m && /*#__PURE__*/React.createElement("span", {
        className: "ml-auto flex items-center gap-1.5 shrink-0"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[9px] text-[var(--text-faint)]"
      }, m.events.length, " ev"), /*#__PURE__*/React.createElement("span", {
        className: "chip"
      }, mode.label, m.play_mode === 1 ? ` ${m.repeat_count}` : ""))), bound.length > 0 && /*#__PURE__*/React.createElement("div", {
        className: "mt-1 flex flex-nowrap gap-1"
      }, bound.map(c => /*#__PURE__*/React.createElement("span", {
        key: c,
        className: "px-1.5 py-0.5 rounded border border-[var(--accent)]/30 bg-[var(--accent)]/10 font-mono text-[9px] text-[var(--accent)]"
      }, LABEL_OF_CODE[c] || c))));
    })), /*#__PURE__*/React.createElement(StatusLine, null)));
  }

  /* ============================================================
     Widget: Macro Editor â€” record / compose steps, playback, save
     ============================================================ */
  function EditorWidget(ctx) {
    const s = useStore();
    const {
      apiCall,
      connected
    } = ctx;
    const [recording, setRecording] = useState(false);
    const [pickKey, setPickKey] = useState(0x04);
    const recRef = useRef(null);
    const lastT = useRef(0);
    const held = useRef(new Set());
    useEffect(() => {
      if (recording && recRef.current) recRef.current.focus();
    }, [recording]);
    const d = s.draft;
    const events = d ? d.events : [];
    const full = events.length >= s.limits.maxEvents;
    const push = (hid, down, delay) => {
      if (full) {
        setStatus("warn", `Slot holds at most ${s.limits.maxEvents} events`);
        return;
      }
      updateDraft({
        events: events.concat([{
          delay: Math.min(s.limits.maxDelay, Math.max(0, delay | 0)),
          hid,
          down
        }])
      });
    };
    const startRec = () => {
      if (!d) return;
      held.current = new Set();
      lastT.current = 0;
      setRecording(true);
    };
    const stopRec = () => {
      // close any key still held so the macro never leaves a key stuck down
      let evs = (store.draft ? store.draft.events : []).slice();
      held.current.forEach(hid => {
        if (evs.length < s.limits.maxEvents) evs.push({
          delay: 50,
          hid,
          down: false
        });
      });
      held.current = new Set();
      updateDraft({
        events: evs
      });
      setRecording(false);
    };
    const onRecKey = (e, down) => {
      // The native shell suppresses key events outside editable elements; the
      // recorder is a focused input so they reach us here, and we swallow them.
      e.preventDefault();
      e.stopPropagation();
      if (!recording) return;
      if (down && e.repeat) return; // OS auto-repeat
      if (e.code === "Escape" && !down && !held.current.has(0x29)) {
        stopRec();
        return;
      }
      const hid = CODE_TO_HID[e.code];
      if (hid == null) return;
      if (down && held.current.has(hid)) return;
      if (!down && !held.current.has(hid)) return;
      const now = performance.now();
      const delay = lastT.current ? Math.round(now - lastT.current) : 0;
      lastT.current = now;
      if (down) held.current.add(hid);else held.current.delete(hid);
      const cur = store.draft ? store.draft.events : [];
      if (cur.length >= s.limits.maxEvents) {
        setStatus("warn", `Slot full (${s.limits.maxEvents} events) â€” recording stopped`);
        stopRec();
        return;
      }
      updateDraft({
        events: cur.concat([{
          delay,
          hid,
          down
        }])
      });
    };
    const setEv = (i, patch) => updateDraft({
      events: events.map((e, j) => j === i ? Object.assign({}, e, patch) : e)
    });
    const delEv = i => updateDraft({
      events: events.filter((_, j) => j !== i)
    });
    const moveEv = (i, dir) => {
      const j = i + dir;
      if (j < 0 || j >= events.length) return;
      const n = events.slice();
      const t = n[i];
      n[i] = n[j];
      n[j] = t;
      updateDraft({
        events: n
      });
    };
    const unbalanced = useMemo(() => {
      const open = new Set();
      for (const e of events) {
        if (e.down) open.add(e.hid);else open.delete(e.hid);
      }
      return Array.from(open);
    }, [events]);
    const save = async () => {
      if (!d) return;
      if (!events.length) {
        setStatus("warn", "Add at least one step");
        return;
      }
      if (recording) stopRec();
      store.busy = true;
      emit();
      const r = await apiCall("save_macro", d.slot, d.name, events, d.playMode, d.playMode === 1 ? d.repeat : 1);
      store.busy = false;
      if (r && r.ok) {
        setStatus("ok", `Saved ${r.events} events to slot ${d.slot + 1}`);
        store.dirty = false;
        await refresh(apiCall, true);
        selectSlot(d.slot);
      } else setStatus("bad", r && r.error || "save failed");
    };
    if (!d) {
      return /*#__PURE__*/React.createElement(Gate, null, /*#__PURE__*/React.createElement("div", {
        className: "flex flex-col gap-3"
      }, /*#__PURE__*/React.createElement("ol", {
        className: "text-[12px] text-[var(--text-dim)] leading-relaxed space-y-2 font-mono"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--accent)]"
      }, "01."), " Pick a slot in the Macro Library (M1\u2013M10)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--accent)]"
      }, "02."), " Record keystrokes or add steps by hand; tune the delays."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--accent)]"
      }, "03."), " ", /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--text)]"
      }, "Save to board"), ", then bind it to a key in the Bind widget.")), /*#__PURE__*/React.createElement(Note, null, "Delays are the wait ", /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--text)]"
      }, "before"), " each step, in milliseconds \u2014 the same convention as the vendor's recorder. The board stores up to ", s.limits.maxEvents, " steps per slot (a press and a release are two steps)."), /*#__PURE__*/React.createElement(StatusLine, null)));
    }
    return /*#__PURE__*/React.createElement(Gate, null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full min-h-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-end gap-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(Label, null, "Slot M", d.slot + 1, " \xB7 name (kept in Aether, the board stores only the steps)"), /*#__PURE__*/React.createElement("input", {
      className: "input",
      value: d.name,
      maxLength: 32,
      placeholder: `Macro ${d.slot + 1}`,
      onChange: e => updateDraft({
        name: e.target.value
      })
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-nowrap"
    }, !recording ? /*#__PURE__*/React.createElement(Btn, {
      onClick: startRec,
      disabled: full,
      variant: "primary",
      small: true
    }, "\u25CF Record") : /*#__PURE__*/React.createElement(Btn, {
      onClick: stopRec,
      variant: "rec",
      small: true
    }, "\u25A0 Stop (Esc)"), /*#__PURE__*/React.createElement("input", {
      ref: recRef,
      readOnly: true,
      value: recording ? "recordingâ€¦ type here" : "",
      placeholder: "click Record, then type",
      onKeyDown: e => onRecKey(e, true),
      onKeyUp: e => onRecKey(e, false),
      onBlur: () => {
        if (recording) stopRec();
      },
      className: `input flex-1 min-w-[140px] h-8 py-0 font-mono text-[11px] ${recording ? "border-rose-400/60 text-rose-200" : ""}`
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-nowrap"
    }, /*#__PURE__*/React.createElement("select", {
      value: pickKey,
      onChange: e => setPickKey(+e.target.value),
      className: "input w-auto h-8 py-0 font-mono text-[11px]"
    }, HID_KEYS.map(([l, c]) => /*#__PURE__*/React.createElement("option", {
      key: c,
      value: c
    }, l))), /*#__PURE__*/React.createElement(Btn, {
      onClick: () => push(pickKey, true, 50),
      disabled: full,
      small: true
    }, "+ Down"), /*#__PURE__*/React.createElement(Btn, {
      onClick: () => push(pickKey, false, 50),
      disabled: full,
      small: true
    }, "+ Up"), /*#__PURE__*/React.createElement(Btn, {
      onClick: () => {
        push(pickKey, true, 50);
        setTimeout(() => push(pickKey, false, 50), 0);
      },
      disabled: full || events.length + 2 > s.limits.maxEvents,
      small: true
    }, "+ Tap"), /*#__PURE__*/React.createElement(Btn, {
      onClick: () => updateDraft({
        events: []
      }),
      disabled: !events.length,
      small: true
    }, "Clear")), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-h-[90px] overflow-y-auto rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)]"
    }, events.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "p-3 font-mono text-[11px] text-[var(--text-faint)]"
    }, "No steps yet.") : events.map((e, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex items-center gap-2 px-2 h-8 border-b border-[var(--line)]/60 last:border-b-0"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] w-5 text-[var(--text-faint)]"
    }, i + 1), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] w-7 text-[var(--text-faint)]"
    }, "wait"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: 0,
      max: s.limits.maxDelay,
      value: e.delay,
      onChange: ev => setEv(i, {
        delay: Math.max(0, Math.min(s.limits.maxDelay, +ev.target.value || 0))
      }),
      className: "input w-[72px] h-6 py-0 px-1.5 font-mono text-[11px] text-right"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] text-[var(--text-faint)]"
    }, "ms"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setEv(i, {
        down: !e.down
      }),
      title: "Toggle press / release",
      className: `w-8 h-6 rounded border font-mono text-[10px] ${e.down ? "border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)]"}`
    }, e.down ? "â–¼" : "â–²"), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--text)] flex-1 truncate"
    }, hidLabel(e.hid)), /*#__PURE__*/React.createElement("button", {
      onClick: () => moveEv(i, -1),
      disabled: i === 0,
      className: "text-[var(--text-faint)] hover:text-[var(--text)] disabled:opacity-30 px-1"
    }, "\u2191"), /*#__PURE__*/React.createElement("button", {
      onClick: () => moveEv(i, 1),
      disabled: i === events.length - 1,
      className: "text-[var(--text-faint)] hover:text-[var(--text)] disabled:opacity-30 px-1"
    }, "\u2193"), /*#__PURE__*/React.createElement("button", {
      onClick: () => delEv(i),
      className: "text-[var(--text-faint)] hover:text-rose-300 px-1"
    }, "\u2715")))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 font-mono text-[10px] text-[var(--text-faint)]"
    }, /*#__PURE__*/React.createElement("span", null, events.length, "/", s.limits.maxEvents, " steps"), unbalanced.length > 0 && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-300/90"
    }, "held at end: ", unbalanced.map(hidLabel).join(", ")), s.dirty && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "unsaved")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "Playback (stored in the slot header)"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5 flex-nowrap"
    }, PLAY_MODES.map(p => /*#__PURE__*/React.createElement("button", {
      key: p.v,
      onClick: () => updateDraft({
        playMode: p.v
      }),
      title: p.hint,
      className: `px-2.5 h-8 rounded-md border font-display text-[10.5px] uppercase tracking-[0.14em] transition-all
                            ${d.playMode === p.v ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:text-[var(--text)]"}
                            ${p.verified ? "" : "opacity-70"}`
    }, p.label, p.verified ? "" : " ?")), d.playMode === 1 && /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: 1,
      max: s.limits.maxRepeat,
      value: d.repeat,
      onChange: e => updateDraft({
        repeat: Math.max(1, Math.min(s.limits.maxRepeat, +e.target.value || 1))
      }),
      className: "input w-[72px] h-8 py-0 px-2 font-mono text-[11px] text-right",
      title: "Repeat count"
    })), d.playMode >= 2 && /*#__PURE__*/React.createElement("div", {
      className: "mt-1"
    }, /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, "Toggle / Hold come from the vendor UI's option list and were never captured on the wire \u2014 the board may ignore them."))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(Btn, {
      onClick: save,
      disabled: !connected || s.busy || !events.length,
      variant: "primary"
    }, "Save to board"), /*#__PURE__*/React.createElement(Btn, {
      onClick: () => selectSlot(d.slot),
      disabled: !s.dirty,
      small: true
    }, "Revert"), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement(StatusLine, null)))));
  }

  /* ============================================================
     Widget: Bind â€” point the selected key at the selected slot
     ============================================================ */
  function BindWidget(ctx) {
    const s = useStore();
    const {
      apiCall,
      connected,
      selectedKeys,
      selectedKey
    } = ctx;
    const codes = selectedKeys ? Array.from(selectedKeys) : [];
    const m = s.sel != null ? macroAt(s.sel) : null;
    const canBind = connected && !s.busy && codes.length > 0 && s.sel != null && !!m;
    const boundCodes = Object.keys(s.bindings);
    const bind = async () => {
      if (!canBind) return;
      store.busy = true;
      emit();
      let ok = 0,
        err = null;
      for (const code of codes) {
        const r = await apiCall("bind_macro", code, s.sel);
        if (r && r.ok) ok++;else {
          err = r && r.error || "bind failed";
          break;
        }
      }
      store.busy = false;
      if (err) setStatus("bad", err);else setStatus("ok", `Bound ${codes.map(c => LABEL_OF_CODE[c] || c).join(", ")} â†’ M${s.sel + 1}`);
      await refresh(apiCall, true);
    };
    const unbind = async list => {
      if (!connected || !list.length) return;
      store.busy = true;
      emit();
      let err = null;
      for (const code of list) {
        const r = await apiCall("unbind_macro", code);
        if (!(r && r.ok)) {
          err = r && r.error || "unbind failed";
          break;
        }
      }
      store.busy = false;
      if (err) setStatus("bad", err);else setStatus("ok", `Restored ${list.map(c => LABEL_OF_CODE[c] || c).join(", ")}`);
      await refresh(apiCall, true);
    };
    return /*#__PURE__*/React.createElement(Gate, null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full min-h-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-stretch gap-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid place-items-center px-3 min-w-[64px] rounded-md border border-[var(--line)] bg-white/[0.02] font-mono text-[11px] text-[var(--text-dim)]"
    }, codes.length > 1 ? `${codes.length} keys` : selectedKey ? LABEL_OF_CODE[selectedKey] || selectedKey : "None"), /*#__PURE__*/React.createElement("div", {
      className: "grid place-items-center text-[var(--text-faint)]"
    }, "\u2192"), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 rounded-md border border-[var(--line)] bg-white/[0.02] px-3 grid place-items-start py-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[12px] text-[var(--text)] truncate w-full"
    }, s.sel == null ? "â€”" : `M${s.sel + 1}${m ? ` Â· ${m.name || `Macro ${s.sel + 1}`}` : " Â· empty"}`), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, "macro slot"))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement(Btn, {
      onClick: () => unbind(codes.filter(c => c in s.bindings)),
      disabled: !connected || s.busy || !codes.some(c => c in s.bindings)
    }, "Unbind"), /*#__PURE__*/React.createElement(Btn, {
      onClick: bind,
      disabled: !canBind,
      variant: "primary"
    }, "Bind")), /*#__PURE__*/React.createElement("div", {
      className: "h-4 text-[11px] font-mono tracking-[0.14em]"
    }, !codes.length && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Select a key on the Key Grid first."), codes.length > 0 && s.sel != null && !m && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Slot M", s.sel + 1, " is empty \u2014 save a macro into it first."), codes.length > 0 && s.sel == null && /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400/80"
    }, "Pick a macro in the Library.")), /*#__PURE__*/React.createElement(Note, null, "Binding rewrites the base keymap layer as a read-modify-write, so remaps and other bindings on the board are kept. The playback mode lives in the macro slot, so every key bound to a slot shares it."), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-h-0 overflow-y-auto"
    }, /*#__PURE__*/React.createElement(Label, null, "Bound keys", s.bindingsError ? " Â· read failed" : ""), s.bindingsError && /*#__PURE__*/React.createElement(Note, {
      tone: "bad"
    }, s.bindingsError), !s.bindingsError && boundCodes.length === 0 && /*#__PURE__*/React.createElement(Note, null, "No key on the board points at a macro."), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1"
    }, boundCodes.map(c => {
      const slot = s.bindings[c];
      const mm = macroAt(slot);
      return /*#__PURE__*/React.createElement("div", {
        key: c,
        className: "flex items-center gap-2 px-2 h-8 rounded-md border border-[var(--line)] bg-white/[0.02]"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[12px] text-[var(--text)] w-14 truncate"
      }, LABEL_OF_CODE[c] || c), /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--text-faint)]"
      }, "\u2192"), /*#__PURE__*/React.createElement("span", {
        className: "font-mono text-[11px] text-[var(--accent)] flex-1 truncate"
      }, "M", slot + 1, mm ? ` Â· ${mm.name || `Macro ${slot + 1}`}` : " Â· (empty slot)"), /*#__PURE__*/React.createElement("button", {
        onClick: () => unbind([c]),
        disabled: !connected || s.busy,
        className: "text-[var(--text-faint)] hover:text-rose-300 px-1 text-[11px]"
      }, "\u2715"));
    }))), /*#__PURE__*/React.createElement(StatusLine, null)));
  }
  const MACROS_WIDGETS = [{
    id: "keygrid",
    title: "Key Grid",
    default: {
      x: 40,
      y: 32,
      w: 760,
      h: 400
    },
    min: {
      w: 520,
      h: 320
    },
    render: KeyGridWidget
  }, {
    id: "library",
    title: "Macro Library",
    default: {
      x: 820,
      y: 32,
      w: 420,
      h: 400
    },
    min: {
      w: 300,
      h: 260
    },
    render: LibraryWidget
  }, {
    id: "editor",
    title: "Macro Editor",
    default: {
      x: 40,
      y: 456,
      w: 760,
      h: 520
    },
    min: {
      w: 520,
      h: 420
    },
    render: EditorWidget
  }, {
    id: "bind",
    title: "Bind to Key",
    default: {
      x: 820,
      y: 456,
      w: 420,
      h: 520
    },
    min: {
      w: 300,
      h: 340
    },
    render: BindWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.MACROS_WIDGETS = MACROS_WIDGETS;
})();
</script>
<script data-mod="ws_settings">
(() => {
  /* ============================================================
     Settings workspace â€” app configuration & profile management.
     Exports window.AetherWorkspaces.SETTINGS_WIDGETS â€” an array of widget descriptors:
       { id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }
     Each render() reads/calls ONLY ctx.* (state + handlers app.jsx passes down).
     ============================================================ */
  const {
    useState,
    useEffect
  } = React;
  const S = window.AetherSections || {};
  const Slider = S.Slider,
    Chip = S.Chip,
    SubTabs = S.SubTabs,
    ToolbarButton = S.ToolbarButton;
  const I = window.AetherIcons || {};
  const ICheck = I.ICheck,
    IPlus = I.IPlus,
    ITrash = I.ITrash,
    IEdit = I.IEdit,
    IDownload = I.IDownload,
    IRefresh = I.IRefresh,
    ISettings = I.ISettings;

  /* ===== Profiles widget ===== */
  function ProfilesWidget(ctx) {
    const {
      profiles = [],
      activeId,
      activeProfileName = "Default",
      switchProfile,
      renameProfile,
      addProfile,
      duplicateProfile,
      deleteProfile
    } = ctx;
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [toast, setToast] = useState(null);
    const flash = msg => {
      setToast(msg);
      setTimeout(() => setToast(null), 2400);
    };
    const handleAdd = () => {
      if (addProfile) {
        addProfile();
        flash("Profile added");
      }
    };
    const handleSwitch = id => {
      if (switchProfile) {
        switchProfile(id);
      }
    };
    const handleStartEdit = (id, name) => {
      setEditId(id);
      setEditName(name);
    };
    const handleSaveEdit = id => {
      if (editName.trim() && renameProfile) {
        renameProfile(id, editName.trim());
        setEditId(null);
        flash(`Renamed to "${editName.trim()}"`);
      }
    };
    const handleDuplicate = id => {
      if (duplicateProfile) {
        duplicateProfile(id);
        flash("Profile duplicated");
      }
    };
    const handleDelete = id => {
      if (deleteProfile && profiles.length > 1) {
        deleteProfile(id);
        flash("Profile deleted");
      }
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-2"
    }, "Profile Management"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between gap-2 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[13px] text-[var(--text)]"
    }, profiles.length, " profile", profiles.length !== 1 ? "s" : ""), /*#__PURE__*/React.createElement("button", {
      onClick: handleAdd,
      className: "px-2.5 h-8 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25"
    }, IPlus && /*#__PURE__*/React.createElement("span", {
      className: "inline mr-1"
    }, IPlus && "+"), "Add"))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2 mb-4"
    }, profiles.map(p => {
      const isActive = activeId === p.id;
      const isEditing = editId === p.id;
      return /*#__PURE__*/React.createElement("div", {
        key: p.id,
        className: `rounded-lg border p-3 transition-all ${isActive ? "border-[var(--accent)]/50 bg-[var(--accent)]/[0.06]" : "border-[var(--line)] bg-white/[0.02]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between gap-2"
      }, isEditing ? /*#__PURE__*/React.createElement("input", {
        type: "text",
        value: editName,
        onChange: e => setEditName(e.target.value),
        onKeyDown: e => {
          if (e.key === "Enter") handleSaveEdit(p.id);
          if (e.key === "Escape") setEditId(null);
        },
        className: "flex-1 h-7 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-2 text-[12px] text-[var(--text)] font-display outline-none",
        autoFocus: true
      }) : /*#__PURE__*/React.createElement("button", {
        onClick: () => handleSwitch(p.id),
        className: `flex-1 text-left px-2 h-7 rounded-md border transition-all ${isActive ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)]" : "border-transparent bg-white/[0.02] text-[var(--text)] hover:border-[var(--line)]"} font-display text-[12px]`
      }, p.name || "Untitled", isActive && /*#__PURE__*/React.createElement("span", {
        className: "ml-2 text-[10px]"
      }, "\u2713")), /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-1"
      }, isEditing ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        onClick: () => handleSaveEdit(p.id),
        className: "w-6 h-6 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center text-[11px]"
      }, "\u2713"), /*#__PURE__*/React.createElement("button", {
        onClick: () => setEditId(null),
        className: "w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] flex items-center justify-center text-[11px]"
      }, "\u2715")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        onClick: () => handleStartEdit(p.id, p.name || "Untitled"),
        className: "w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] flex items-center justify-center text-[10px]",
        title: "Rename"
      }, IEdit ? "âœŽ" : "E"), /*#__PURE__*/React.createElement("button", {
        onClick: () => handleDuplicate(p.id),
        className: "w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] flex items-center justify-center text-[9px]",
        title: "Duplicate"
      }, "\u25C8"), /*#__PURE__*/React.createElement("button", {
        onClick: () => handleDelete(p.id),
        disabled: profiles.length <= 1,
        className: "w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-rose-400/40 hover:text-rose-300 disabled:opacity-40 flex items-center justify-center text-[10px]",
        title: "Delete"
      }, "\u2715")))));
    })), toast && /*#__PURE__*/React.createElement("div", {
      className: "mt-2 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--accent)]"
    }, "\u2713 ", toast));
  }

  /* ===== Theme widget ===== */
  function ThemeWidget(ctx) {
    const {
      theme = "dark",
      setTheme,
      setThemeOpen
    } = ctx;
    const themes = [{
      id: "dark",
      label: "Dark",
      desc: "Dim background, bright accents"
    }, {
      id: "light",
      label: "Light",
      desc: "Bright background, muted accents"
    }, {
      id: "auto",
      label: "Auto",
      desc: "Match system preference"
    }];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3"
    }, "Appearance"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2 mb-4"
    }, themes.map(t => /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setTheme && setTheme(t.id),
      className: `text-left rounded-lg border p-2.5 transition-all ${theme === t.id ? "border-[var(--accent)]/50 bg-[var(--accent)]/[0.06]" : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[12px] text-[var(--text)]"
    }, t.label), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5"
    }, t.desc)), theme === t.id && /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "\u2713"))))), /*#__PURE__*/React.createElement("button", {
      onClick: () => setThemeOpen && setThemeOpen(true),
      className: "w-full h-9 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 transition-all"
    }, "Customize Colors"));
  }

  /* ===== System widget: launch behaviour (Windows) =====
     Two independent toggles, both read/written through the bridge:
       Start on launch  â†’ HKCU\...\Run entry (get_autostart / set_autostart)
       Start minimized  â†’ settings.json `startMinimized` (get_tray_prefs /
                          set_start_minimized): every launch begins hidden in
                          the tray with the lighting running.
     The widget hides itself on platforms where neither is supported. */
  const Toggle = ({
    on,
    onClick,
    label,
    desc
  }) => /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-white/[0.02] p-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-display text-[12px] text-[var(--text)]"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] text-[var(--text-faint)] mt-0.5 leading-snug"
  }, desc)), /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    role: "switch",
    "aria-checked": on,
    "aria-label": label,
    className: `relative w-12 h-6 rounded-full border transition-colors shrink-0
                  ${on ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-[rgba(5,11,14,0.5)] border-[var(--line)]"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `absolute top-0.5 rounded-full transition-all
                        ${on ? "left-[26px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-[var(--text-faint)]"}`,
    style: {
      width: 18,
      height: 18
    }
  })));
  function SystemWidget() {
    const [autostart, setAutostart] = useState({
      supported: false,
      enabled: false
    });
    const [tray, setTray] = useState({
      supported: false,
      startMinimized: false
    });
    const [err, setErr] = useState("");

    // The bridge can mount after first paint (WebView2) â€” poll until it answers
    // once, then stop; both reads are cheap registry/JSON lookups.
    useEffect(() => {
      let cancelled = false,
        done = false;
      const probe = () => {
        const api = window.pywebview?.api;
        if (!api || done) return;
        done = true;
        if (api.get_autostart) api.get_autostart().then(r => {
          if (!cancelled && r && r.ok) setAutostart({
            supported: !!r.supported,
            enabled: !!r.enabled
          });
        }).catch(() => {});
        if (api.get_tray_prefs) api.get_tray_prefs().then(r => {
          if (!cancelled && r && r.ok) setTray({
            supported: !!r.supported,
            startMinimized: !!r.startMinimized
          });
        }).catch(() => {});
      };
      probe();
      const id = setInterval(() => {
        probe();
        if (done) clearInterval(id);
      }, 500);
      return () => {
        cancelled = true;
        clearInterval(id);
      };
    }, []);
    const flip = async (fn, next, apply, revert) => {
      apply(next);
      setErr("");
      const api = window.pywebview?.api;
      if (!api || !api[fn]) return;
      try {
        const r = await api[fn](next);
        if (!(r && r.ok)) {
          revert();
          setErr(r && r.error || "failed");
        }
      } catch (e) {
        revert();
        setErr(String(e));
      }
    };
    const toggleAutostart = () => flip("set_autostart", !autostart.enabled, v => setAutostart(s => ({
      ...s,
      enabled: v
    })), () => setAutostart(s => ({
      ...s,
      enabled: !s.enabled
    })));
    const toggleMinimized = () => flip("set_start_minimized", !tray.startMinimized, v => setTray(s => ({
      ...s,
      startMinimized: v
    })), () => setTray(s => ({
      ...s,
      startMinimized: !s.startMinimized
    })));
    if (!autostart.supported && !tray.supported) {
      return /*#__PURE__*/React.createElement("div", {
        className: "font-mono text-[10.5px] text-[var(--text-faint)] leading-relaxed"
      }, "Launch options (start with the OS, start minimized to the tray) are available on Windows.");
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3"
    }, "Launch"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2"
    }, autostart.supported && /*#__PURE__*/React.createElement(Toggle, {
      on: autostart.enabled,
      onClick: toggleAutostart,
      label: "Start on launch",
      desc: "Open Aether automatically when you sign in to Windows."
    }), tray.supported && /*#__PURE__*/React.createElement(Toggle, {
      on: tray.startMinimized,
      onClick: toggleMinimized,
      label: "Start minimized",
      desc: "Launch hidden in the system tray with your lighting running. Open the window from the tray icon."
    })), err && /*#__PURE__*/React.createElement("div", {
      className: "mt-2 font-mono text-[10px] text-rose-300/90"
    }, err), /*#__PURE__*/React.createElement("div", {
      className: "mt-3 font-mono text-[10px] text-[var(--text-faint)] leading-relaxed"
    }, "Closing the window keeps Aether in the tray; right-click the icon for Open, Hide window, Mini mode and Exit."));
  }

  /* ===== Backup/Import widget ===== */
  function BackupWidget(ctx) {
    const {
      applyState,
      collectState,
      profiles
    } = ctx;
    const [message, setMessage] = useState("");
    const handleExport = () => {
      try {
        // Capture the REAL current configuration. collectState() is the exact
        // flat shape applyState() consumes on import, so export->import round-
        // trips; profiles is included so the whole saved set travels with it.
        const live = typeof collectState === "function" && collectState() || {};
        const state = {
          timestamp: new Date().toISOString(),
          app: "AetherHE",
          profiles: Array.isArray(profiles) ? profiles : [],
          ...live
        };
        const json = JSON.stringify(state, null, 2);
        const blob = new Blob([json], {
          type: "application/json"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `aether-backup-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        setMessage("Settings exported");
        setTimeout(() => setMessage(""), 2400);
      } catch (e) {
        setMessage("Export failed");
        setTimeout(() => setMessage(""), 2400);
      }
    };
    const handleImport = async () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json";
      input.onchange = async e => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
          const text = await file.text();
          const data = JSON.parse(text);
          if (applyState && typeof applyState === "function") {
            applyState(data);
            setMessage("Settings imported");
            setTimeout(() => setMessage(""), 2400);
          }
        } catch (err) {
          setMessage("Import failed");
          setTimeout(() => setMessage(""), 2400);
        }
      };
      input.click();
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3"
    }, "Settings"), /*#__PURE__*/React.createElement("p", {
      className: "text-[11.5px] text-[var(--text-faint)] leading-relaxed mb-4"
    }, "Export or import your configuration. Backups include profiles, keymaps, lighting effects, and all settings."), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleExport,
      className: "h-9 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 transition-all"
    }, IDownload ? "â†“" : "Export", " Export"), /*#__PURE__*/React.createElement("button", {
      onClick: handleImport,
      className: "h-9 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 transition-all"
    }, IDownload ? "â†‘" : "Import", " Import")), message && /*#__PURE__*/React.createElement("div", {
      className: "mt-3 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--accent)]"
    }, "\u2713 ", message));
  }

  /* ===== About/Update widget ===== */
  function AboutWidget(ctx) {
    const {
      setWizardOpen,
      setSubmitOpen
    } = ctx;
    const [version, setVersion] = useState("â€”");
    // `info` holds the check_update() result â€” apply_update REQUIRES the asset
    // url/name from it (Api.apply_update(asset_url, asset_name)); calling it bare
    // raises a missing-argument TypeError.
    const [updateState, setUpdateState] = useState({
      phase: "idle",
      msg: "",
      info: null
    });
    useEffect(() => {
      const api = window.pywebview?.api;
      if (!api?.app_version) return;
      api.app_version().then(r => {
        if (r?.ok) setVersion(r.version);
      }).catch(() => {});
    }, []);
    const checkUpdate = async () => {
      const api = window.pywebview?.api;
      if (!api?.check_update) return;
      setUpdateState({
        phase: "checking",
        msg: "Checking for updatesâ€¦",
        info: null
      });
      try {
        const r = await api.check_update();
        if (!r?.ok) {
          // Surface the real reason (rate limit, offline, DNS) instead of a bare
          // "Check failed" â€” this is the only place the user can see it.
          setUpdateState({
            phase: "error",
            msg: `Check failed: ${r?.error || "unknown error"}`,
            info: null
          });
          return;
        }
        // updater.check_for_update() returns `update` / `latest` / `asset_url`.
        // (It has never returned `available` or `version`: reading those meant
        // this button reported "You're up to date" even when a release existed.)
        if (r.update) {
          setUpdateState({
            phase: "available",
            msg: `Update available: v${r.latest}`,
            info: r
          });
        } else if (r.newer) {
          // Newer release exists but ships no asset this OS can install.
          setUpdateState({
            phase: "uptodate",
            msg: `v${r.latest} available, but no installer for this platform`,
            info: null
          });
        } else {
          setUpdateState({
            phase: "uptodate",
            msg: "You're up to date",
            info: null
          });
        }
      } catch (e) {
        setUpdateState({
          phase: "error",
          msg: `Check failed: ${e}`,
          info: null
        });
      }
    };
    const applyUpdate = async () => {
      const api = window.pywebview?.api;
      const info = updateState.info;
      if (!api?.apply_update || !info?.asset_url) return;
      setUpdateState(s => ({
        ...s,
        phase: "installing",
        msg: "Downloadingâ€¦"
      }));
      // The installer is ~20 MB; poll so the window isn't silently frozen. The
      // timer is cleared in every exit path below (including the throw).
      let poll = null;
      if (api.update_progress) {
        poll = setInterval(async () => {
          try {
            const p = await api.update_progress();
            if (!p?.ok) return;
            if (p.phase === "downloading" && p.total) {
              const mb = n => (n / 1048576).toFixed(1);
              setUpdateState(s => s.phase === "installing" ? {
                ...s,
                msg: `Downloadingâ€¦ ${p.pct}%  (${mb(p.done)} / ${mb(p.total)} MB)`
              } : s);
            } else if (p.phase === "verified") {
              setUpdateState(s => s.phase === "installing" ? {
                ...s,
                msg: "Verifying downloadâ€¦"
              } : s);
            } else if (p.phase === "installing") {
              setUpdateState(s => s.phase === "installing" ? {
                ...s,
                msg: "Installingâ€¦"
              } : s);
            }
          } catch {}
        }, 400);
      }
      const stop = () => {
        if (poll) {
          clearInterval(poll);
          poll = null;
        }
      };
      try {
        const r = await api.apply_update(info.asset_url, info.asset_name, info.asset_size, info.asset_sha256);
        stop();
        if (!r?.ok) {
          setUpdateState(s => ({
            ...s,
            phase: "error",
            msg: `Installation failed: ${r?.error || "unknown error"}`
          }));
          return;
        }
        // Windows launches the installer and the app must quit; Flatpak installs
        // in place and needs a manual restart. Say which one happened.
        const msg = r.quit ? "Installer launched â€” Aether will close and reopen." : r.restart ? "Update installed â€” quit and reopen Aether to apply it." : r.path ? `Downloaded to ${r.path}` : "Update complete";
        setUpdateState(s => ({
          ...s,
          phase: "installed",
          msg
        }));
      } catch (e) {
        stop();
        setUpdateState(s => ({
          ...s,
          phase: "error",
          msg: `Installation failed: ${e}`
        }));
      }
    };
    const openWizard = () => {
      if (setWizardOpen) setWizardOpen(true);
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3"
    }, "About"), /*#__PURE__*/React.createElement("div", {
      className: "rounded-lg border border-[var(--line)] bg-white/[0.02] p-3 mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
    }, "Version"), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[13px] text-[var(--text)]"
    }, version)), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[9px] text-[var(--text-faint)]"
    }, "AetherHE Desktop Controller")), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-2 mb-4"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: checkUpdate,
      disabled: updateState.phase === "checking",
      className: "h-9 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 disabled:opacity-50 transition-all"
    }, IRefresh ? "â†»" : "Check", " Check for Updates"), (updateState.phase === "available" || updateState.phase === "installing") && /*#__PURE__*/React.createElement("button", {
      onClick: applyUpdate,
      disabled: updateState.phase === "installing",
      className: "h-9 rounded-md border border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 disabled:opacity-50 transition-all"
    }, updateState.phase === "installing" ? "Installingâ€¦" : "Install Update"), /*#__PURE__*/React.createElement("button", {
      onClick: openWizard,
      className: "h-9 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] font-display text-[11px] uppercase tracking-[0.16em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] transition-all"
    }, "Setup Wizard"), /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => setSubmitOpen && setSubmitOpen(true)
    }, "Submit a board")), updateState.msg && /*#__PURE__*/React.createElement("div", {
      className: `text-[11px] font-mono uppercase tracking-[0.16em] ${updateState.phase === "error" ? "text-rose-300" : "text-[var(--text-faint)]"}`
    }, updateState.msg));
  }

  /* ===== Widget array export ===== */
  const SETTINGS_WIDGETS = [{
    id: "profiles",
    title: "Profiles",
    default: {
      x: 40,
      y: 32,
      w: 380,
      h: 380
    },
    min: {
      w: 300,
      h: 280
    },
    render: ProfilesWidget
  }, {
    id: "theme",
    title: "Theme",
    default: {
      x: 440,
      y: 32,
      w: 340,
      h: 280
    },
    min: {
      w: 280,
      h: 220
    },
    render: ThemeWidget
  }, {
    id: "backup",
    title: "Backup",
    default: {
      x: 40,
      y: 432,
      w: 380,
      h: 240
    },
    min: {
      w: 300,
      h: 180
    },
    render: BackupWidget
  }, {
    id: "about",
    title: "About/Update",
    default: {
      x: 440,
      y: 432,
      w: 340,
      h: 320
    },
    min: {
      w: 280,
      h: 240
    },
    render: AboutWidget
  }, {
    id: "system",
    title: "System",
    default: {
      x: 800,
      y: 32,
      w: 360,
      h: 300
    },
    min: {
      w: 300,
      h: 220
    },
    render: SystemWidget
  }];
  window.AetherWorkspaces = window.AetherWorkspaces || {};
  window.AetherWorkspaces.SETTINGS_WIDGETS = SETTINGS_WIDGETS;
})();
</script>
<script data-mod="ws_socd">
(() => {
  /* SOCD Workspace: 3-widget layout for key pair editor, hotkey control, and active pairs list */
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

  /* ===== Pair Editor Widget ===== */
  const PairEditorWidget = ctx => {
    const {
      socdProfiles,
      setSocdProfiles,
      socdActive,
      setSocdActive
    } = ctx;
    const [editTarget, setEditTarget] = useState("k1"); // "k1" or "k2"
    const cur = socdProfiles.find(p => p.id === socdActive) || socdProfiles[0];
    const updateActive = patch => {
      setSocdProfiles(ps => ps.map(p => p.id === socdActive ? {
        ...p,
        ...patch
      } : p));
    };
    const addProfile = () => {
      if (socdProfiles.length >= 20) return; // enforce the advertised /20 cap
      // Smallest unused SOCDn id â€” length-based ids collide after a delete.
      const used = new Set(socdProfiles.map(p => p.id));
      let n = 1;
      while (used.has(`SOCD${n}`)) n++;
      const next = `SOCD${n}`;
      setSocdProfiles([...socdProfiles, {
        id: next,
        k1: "",
        k2: "",
        mode: 1
      }]);
      setSocdActive(next);
    };
    const delActive = () => {
      if (socdProfiles.length <= 1) return;
      const remaining = socdProfiles.filter(p => p.id !== socdActive);
      setSocdProfiles(remaining);
      setSocdActive(remaining[0].id);
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
    }, cur?.k1 || "â€”")), /*#__PURE__*/React.createElement("div", {
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
    }, cur?.k2 || "â€”"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-1.5"
    }, [1, 2, 3, 4].map(m => /*#__PURE__*/React.createElement("button", {
      key: m,
      onClick: () => updateActive({
        mode: m
      }),
      className: `flex items-center gap-2 px-3 h-9 rounded-md border font-mono text-[12px] transition-all
                        ${cur?.mode === m ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-3 h-3 rounded-full border ${cur?.mode === m ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--text-faint)]"}`
    }), "Model ", m))), editTarget === "k1" && /*#__PURE__*/React.createElement("div", {
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
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3 text-[11.5px] text-[var(--text-dim)] leading-relaxed"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[var(--text)] font-display uppercase tracking-[0.18em] text-[10.5px] mb-2"
    }, "When both Key1 and Key2 fire:"), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1.5 font-mono text-[10px]"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 1"), " \xB7 First press wins; second is interrupted."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 2"), " \xB7 Key1 interrupts Key2."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 3"), " \xB7 Key2 interrupts Key1."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--accent)]"
    }, "Model 4"), " \xB7 Later-triggered key wins (Snap Tap)."))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: addProfile,
      className: "flex-1 flex items-center justify-center gap-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[11px] uppercase tracking-[0.16em]"
    }, IPlus && /*#__PURE__*/React.createElement(IPlus, {
      size: 12
    }), " New"), /*#__PURE__*/React.createElement("button", {
      onClick: delActive,
      className: "flex-1 flex items-center justify-center gap-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-rose-400/40 hover:text-rose-300 font-display text-[11px] uppercase tracking-[0.16em]"
    }, ITrash && /*#__PURE__*/React.createElement(ITrash, {
      size: 12
    }), " Delete")));
  };

  /* ===== Hotkey Widget ===== */
  const HotkeyWidget = ctx => {
    const {
      hotkey,
      hotkeyEnabled,
      setHotkeyEnabled,
      handleSocdApply,
      socdProfiles
    } = ctx;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-4 h-full"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-2"
    }, "Switch hotkey"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setHotkeyEnabled(!hotkeyEnabled),
      className: `relative w-10 h-5 rounded-full border transition-colors w-full flex items-center justify-between px-3
                      ${hotkeyEnabled ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-[rgba(5,11,14,0.5)] border-[var(--line)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                            ${hotkeyEnabled ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-[var(--text-faint)]"}`
    }))), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)] mb-1"
    }, "Active hotkey"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[13px] text-[var(--accent)]"
    }, hotkey || "â€”")), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3 flex-1 flex flex-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)] mb-2"
    }, "Status"), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 flex flex-col justify-center"
    }, hotkeyEnabled ? /*#__PURE__*/React.createElement("div", {
      className: "text-[11.5px] text-[var(--text)]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display uppercase tracking-[0.16em] text-[var(--accent)] mb-1"
    }, "Enabled"), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px] text-[var(--text-dim)]"
    }, "Press ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[var(--accent)]"
    }, hotkey), " to cycle SOCD profiles")) : /*#__PURE__*/React.createElement("div", {
      className: "text-[11.5px] text-[var(--text-dim)]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display uppercase tracking-[0.16em] mb-1"
    }, "Disabled"), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px]"
    }, "Toggle to enable hotkey switching")))), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleSocdApply && handleSocdApply(socdProfiles, hotkeyEnabled),
      className: "px-4 h-9 rounded-md border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] font-display text-[12px] uppercase tracking-[0.16em] shadow-[0_0_18px_var(--accent-glow)] hover:brightness-110"
    }, "Apply"));
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
     Board-aware dispatch (ADDITIVE â€” the Win60 path is untouched).
  
     The three widget bodies above are the Aula Win60 HE's SOCD UI, driven by
     that board's own cmd-36 PRCS mechanism. Boards that instead keep their
     bindings in a 512-byte key table (the MINI 60 HE PRO's advanced keys:
     DKS/MT/TGL/SOCD/RS + plain remap) get a different body, supplied by
     src/components/advanced-keys.jsx.
  
     The switch is a capability gate. It resolves to show:false for the
     Win60 AND for the no-board / plain-browser fail-open path, so those
     render exactly the same element tree as before this file changed â€” the
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
    title: "Hotkey",
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
    render: boardAware(HotkeyWidget, "AdvancedKeyStatus")
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
</script>
<script data-mod="comp_advanced-keys">
(() => {
  /* ============================================================
     AdvancedKeys â€” MINI 60 HE PRO advanced key types + plain remap.
  
     ADDITIVE ONLY. Nothing in this file runs on the Aula Win60 HE:
     `advancedKeysGate()` returns show:false for that board (and for the
     no-board / plain-browser fail-open path), so socd.jsx renders its
     original widgets byte-for-byte unchanged.
  
     WHAT THIS SURFACES
     ------------------
     The MINI 60 HE PRO keeps EVERY key binding â€” plain remap and all five
     advanced key types â€” in one 512-byte key table (GET 0x12 / SET 0x22,
     126 x 4-byte records indexed by MATRIX position). The Fn layer is a
     second, identically formatted table (0x16 / 0x26). A record is
     [pageType, p1, p2, p3]:
  
       pageType  2  REMAP  [02, modmask, hidUsage, 00]
       pageType  8  DKS    [08, dksSlot,  00, 00]  + 1024-byte travel table (0x18/0x28)
       pageType  9  MT     [09, tapHid, holdHid, delayRaw]
       pageType 10  TGL    [0A, hidUsage, 00, 00]
       pageType 11  SOCD   [0B, mode, hidA, hidB]   written to BOTH keys of the pair
       pageType 12  RS     [0C, 00,   hidA, hidB]   written to BOTH keys of the pair
  
     PROVENANCE (docs/context/issue-6-mini60-pro-raw/)
       CAPTURED  = byte-matched against a real frame in the 2.4GHz / wired
                   WebHID captures (FULL_APP_CAPTURE_NOTES.md Â§3,
                   analyze_advkeys.py output).
       SOURCE    = read from the vendor's own bundle (HFD_SDK_DECODE.md Â§5)
                   and NEVER seen on the wire. Shown, never trusted.
  
     WRITE PATH: app_web.py now exposes the bridge â€” set_key_remap,
     set_advanced_socd / _rs / _mt / _tgl, clear_advanced_key and
     read_key_records â€” each resolving design codes to firmware key indices
     through the active board's keymap and refusing loudly if that resolution
     fails (an unbound record reads back all-zero, so a table cannot be searched
     for "the key that sends 0x04"; writing to a guessed slot is not an option).
     The driver underneath does strict read-modify-write and aborts before any
     write if the read fails.
  
     WRITE_PATH_EXISTS below is the single switch. It is ON. What is still
     disabled is disabled on evidence, not plumbing: DKS (its action slots are
     authored by physically pressing keys in the vendor app and the encoding is
     undecoded) and the three SOCD modes never observed on the wire.
  
     Exposes window.AetherAdvancedKeys = {
       advancedKeysGate, AdvancedKeyEditor, AdvancedKeyStatus,
       AdvancedKeyBindings, CompetitiveWarning, ADV_TYPES, HID_KEYS
     }.
     ============================================================ */

  const {
    useState,
    useEffect
  } = React;

  /* ---- the one switch: is there a backend that can write the key table? ---- */
  const WRITE_PATH_EXISTS = true; // app_web.py Api: set_key_remap / set_advanced_* / clear_advanced_key

  /* Boards whose advanced keys are decoded from a real capture but whose
     registry entry does not (yet) carry an `advancedKeys` flag. The registry is
     owned elsewhere; when it declares the flag, the flag wins and this list is
     never consulted. Matching a slug here yields "wip" â€” surfaced, never driven. */
  const CAPTURED_ADV_SLUGS = /^aula-mini60he-pro(-24g)?$/;

  /* ============================================================
     Capability gate
     ============================================================ */
  function advancedKeysGate(board) {
    const b = board || {};
    const raw = typeof b.cap === "function" ? b.cap("advancedKeys") : undefined;
    const slug = b.board && b.board.slug || "";
    let state, source;
    if (raw !== undefined) {
      state = b.capState("advancedKeys"); // "yes" | "wip" | "no"
      source = "registry";
    } else if (CAPTURED_ADV_SLUGS.test(slug)) {
      state = "wip"; // decoded on the wire, not wired up
      source = "capture";
    } else {
      // Flag absent AND board unknown to us -> behave exactly like today.
      state = b.capabilities ? "no" : "unknown";
      source = "registry";
    }
    return {
      state,
      source,
      show: state === "yes" || state === "wip",
      drivable: state === "yes" && !!b.drivable && WRITE_PATH_EXISTS,
      reason: !WRITE_PATH_EXISTS ? "No write path yet: the driver can build these records, but no bridge method exposes it to the UI â€” nothing on this panel is sent to the keyboard." : state === "wip" ? "Capability is marked work-in-progress in the board registry â€” read-only." : ""
    };
  }

  /* ============================================================
     HID usage codes (USB HID Keyboard/Keypad page 0x07)
     Cross-checked against the capture: SOCD pair wrote 04/07 (A/D),
     RS pair wrote 14/08 (Q/E).
     ============================================================ */
  const HID_KEYS = [];
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((c, i) => HID_KEYS.push([c, 0x04 + i]));
  [["1", 0x1e], ["2", 0x1f], ["3", 0x20], ["4", 0x21], ["5", 0x22], ["6", 0x23], ["7", 0x24], ["8", 0x25], ["9", 0x26], ["0", 0x27], ["Enter", 0x28], ["Esc", 0x29], ["Back", 0x2a], ["Tab", 0x2b], ["Space", 0x2c], ["-_", 0x2d], ["=+", 0x2e], ["[{", 0x2f], ["]}", 0x30], ["\\|", 0x31], [";:", 0x33], ["'\"", 0x34], ["`~", 0x35], [",<", 0x36], [".>", 0x37], ["/?", 0x38], ["Caps", 0x39], ["F1", 0x3a], ["F2", 0x3b], ["F3", 0x3c], ["F4", 0x3d], ["F5", 0x3e], ["F6", 0x3f], ["F7", 0x40], ["F8", 0x41], ["F9", 0x42], ["F10", 0x43], ["F11", 0x44], ["F12", 0x45], ["PrtSc", 0x46], ["ScrLk", 0x47], ["Pause", 0x48], ["Ins", 0x49], ["Home", 0x4a], ["PgUp", 0x4b], ["Del", 0x4c], ["End", 0x4d], ["PgDn", 0x4e], ["Right", 0x4f], ["Left", 0x50], ["Down", 0x51], ["Up", 0x52], ["L-Ctrl", 0xe0], ["L-Shift", 0xe1], ["L-Alt", 0xe2], ["L-Win", 0xe3], ["R-Ctrl", 0xe4], ["R-Shift", 0xe5], ["R-Alt", 0xe6], ["R-Win", 0xe7]].forEach(p => HID_KEYS.push(p));
  const HID_BY_CODE = {};
  HID_KEYS.forEach(([label, code]) => {
    HID_BY_CODE[code] = label;
  });
  const hidLabel = code => code ? HID_BY_CODE[code] || "?" : "â€”";
  const hex2 = n => (n & 0xff).toString(16).toUpperCase().padStart(2, "0");

  /* ============================================================
     SOCD behaviour modes.
     The vendor's own SOCDOptions list carries FOUR values (3, 1, 2, 4) whose
     labels are i18n keys that are not present in the unpacked bundle. Exactly
     ONE of them â€” 0x03 â€” was ever seen on the wire. The other three are listed
     so the user knows they exist, and are NOT selectable.
     ============================================================ */
  const SOCD_MODES = [{
    v: 0x03,
    label: "Key 1 priority",
    verified: true,
    note: "The one mode proven on the wire: the vendor's \"Key 1 Priority\" wrote 0B 03 04 07 into BOTH keys of the pair (indices 49 and 51)."
  }, {
    v: 0x01,
    label: "Undecoded mode",
    verified: false,
    note: "The vendor's list holds four values (3, 1, 2, 4) and its UI shows four labels (last input / key 1 priority / key 2 priority / neutralize). Only the 0x03 pairing was captured; which label 0x01 carries is not decoded."
  }, {
    v: 0x02,
    label: "Undecoded mode",
    verified: false,
    note: "A separate wired session did write 0x02 for a pair the vendor UI called \"absolute button 2 priority\", but that single unlabelled-in-code observation is not enough to publish a behaviour, so Aether does not offer it."
  }, {
    v: 0x04,
    label: "Undecoded mode",
    verified: false,
    note: "Present in the vendor's value list, never captured, behaviour not decoded."
  }];
  const ADV_TYPES = [{
    id: "remap",
    page: 2,
    name: "Remap",
    blurb: "Plain key remap â€” one HID usage code."
  }, {
    id: "socd",
    page: 11,
    name: "SOCD",
    blurb: "Two keys + behaviour mode. Same record written to BOTH keys."
  }, {
    id: "rs",
    page: 12,
    name: "RS",
    blurb: "Rapid SOCD / snap keys â€” two keys, deeper press wins."
  }, {
    id: "mt",
    page: 9,
    name: "MT",
    blurb: "Mod-tap: hold vs tap on one key, plus a trigger-delay byte."
  }, {
    id: "tgl",
    page: 10,
    name: "TGL",
    blurb: "Toggle on/off on one key. No parameters."
  }, {
    id: "dks",
    page: 8,
    name: "DKS",
    blurb: "Up to 4 actions on one key by press depth + a travel table."
  }];

  /* ============================================================
     Local (host-side) binding store â€” shared by the three widgets, which are
     independent widget frames and cannot share App state (app.jsx is owned
     elsewhere). Nothing here is persisted or transmitted.
     ============================================================ */
  const store = {
    bindings: [],
    sel: null,
    listeners: new Set(),
    seq: 1
  };
  const emit = () => store.listeners.forEach(fn => {
    try {
      fn();
    } catch (e) {}
  });
  const useStore = () => {
    const [, force] = useState(0);
    useEffect(() => {
      const fn = () => force(n => n + 1);
      store.listeners.add(fn);
      return () => store.listeners.delete(fn);
    }, []);
    return store;
  };
  const addBinding = b => {
    b.id = "B" + store.seq++;
    store.bindings = store.bindings.concat([b]);
    store.sel = b.id;
    emit();
  };
  const removeBinding = id => {
    store.bindings = store.bindings.filter(b => b.id !== id);
    if (store.sel === id) store.sel = store.bindings.length ? store.bindings[0].id : null;
    emit();
  };
  const selectBinding = id => {
    store.sel = id;
    emit();
  };

  /* Compose the 4-byte key-table record for a draft binding. */
  function recordFor(d) {
    switch (d.type) {
      case "remap":
        return [0x02, d.mod & 0xff, d.hidA & 0xff, 0x00];
      case "dks":
        return [0x08, d.slot & 0xff, 0x00, 0x00];
      case "mt":
        return [0x09, 0x00, 0x00, d.delayRaw & 0xff];
      case "tgl":
        return [0x0a, 0x00, 0x00, 0x00];
      case "socd":
        return [0x0b, d.mode & 0xff, d.hidA & 0xff, d.hidB & 0xff];
      case "rs":
        return [0x0c, 0x00, d.hidA & 0xff, d.hidB & 0xff];
      default:
        return [0, 0, 0, 0];
    }
  }
  const recordHex = d => recordFor(d).map(hex2).join(" ");

  /* ============================================================
     Small presentational helpers
     ============================================================ */
  const Label = ({
    children
  }) => /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)] mb-1"
  }, children);
  const Note = ({
    tone = "dim",
    children
  }) => /*#__PURE__*/React.createElement("div", {
    className: `text-[10.5px] leading-relaxed ${tone === "warn" ? "text-amber-300/90" : tone === "bad" ? "text-rose-300/90" : "text-[var(--text-dim)]"}`
  }, children);
  const Tag = ({
    kind
  }) => {
    const map = {
      captured: ["Captured", "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"],
      source: ["Source only", "border-amber-400/30 bg-amber-500/10 text-amber-300"],
      unknown: ["Not decoded", "border-rose-400/30 bg-rose-500/10 text-rose-300"]
    };
    const [text, cls] = map[kind] || map.unknown;
    return /*#__PURE__*/React.createElement("span", {
      className: `inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-[0.18em] border ${cls}`
    }, text);
  };

  /* The competitive-play warning the vendor's own UI carries. Real user-harm
     issue: shown wherever SOCD or RS is exposed. */
  function CompetitiveWarning({
    compact
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-rose-400/40 bg-rose-500/[0.07] p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10.5px] uppercase tracking-[0.18em] text-rose-300 mb-1"
    }, "Competitive-play warning"), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px] leading-relaxed text-rose-200/90"
    }, "SOCD / snap-tap style key resolution is ", /*#__PURE__*/React.createElement("span", {
      className: "font-semibold"
    }, "restricted or banned"), " by some competitive games \u2014 the vendor's own driver names ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "CS2"), " explicitly and warns that using it can get your account banned.", !compact && " Aether repeats that warning rather than hiding it: enabling SOCD or RS is your call and your risk."));
  }

  /* Compact HID key picker. */
  const HidPicker = ({
    title,
    value,
    onPick
  }) => {
    const [open, setOpen] = useState(false);
    const IChevronD = window.AetherIcons && window.AetherIcons.IChevronD;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      className: "flex items-center gap-2 mb-1.5 text-[var(--text-dim)] hover:text-[var(--text)]"
    }, IChevronD && /*#__PURE__*/React.createElement(IChevronD, {
      size: 12,
      className: open ? "" : "-rotate-90"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.18em]"
    }, title), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[11px] text-[var(--accent)]"
    }, hidLabel(value), value ? ` Â· 0x${hex2(value)}` : "")), open && /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-[repeat(auto-fill,minmax(46px,1fr))] gap-1.5 mb-2"
    }, HID_KEYS.map(([label, code]) => /*#__PURE__*/React.createElement("button", {
      key: label,
      onClick: () => {
        onPick(code);
        setOpen(false);
      },
      className: `h-8 rounded-md border font-mono text-[10.5px] transition-all
                          ${value === code ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:text-[var(--text)]"}`
    }, label))));
  };

  /* ============================================================
     Editor widget body (replaces the Win60 pair editor ONLY on a board that
     declares the capability).
     ============================================================ */
  function AdvancedKeyEditor({
    ctx,
    gate
  }) {
    const [type, setType] = useState("socd");
    const [keyIndex, setKeyIndex] = useState(49);
    const [keyIndexB, setKeyIndexB] = useState(51);
    const [hidA, setHidA] = useState(0x04);
    const [hidB, setHidB] = useState(0x07);
    const [mode, setMode] = useState(0x03);
    const [delayRaw, setDelayRaw] = useState(40);
    const [slot, setSlot] = useState(0);
    useStore();
    const draft = {
      type,
      keyIndex,
      keyIndexB,
      hidA,
      hidB,
      mode,
      delayRaw,
      slot
    };
    const def = ADV_TYPES.find(t => t.id === type) || ADV_TYPES[0];
    const isPair = type === "socd" || type === "rs";
    const stage = () => addBinding(Object.assign({}, draft, {
      rec: recordFor(draft)
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3.5 h-full overflow-y-auto"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-amber-400/35 bg-amber-500/[0.06] p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[10.5px] uppercase tracking-[0.18em] text-amber-300"
    }, "Advanced keys \xB7 unverified"), /*#__PURE__*/React.createElement(Tag, {
      kind: gate.state === "yes" ? "captured" : "source"
    })), /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, ctx && ctx.board && ctx.board.name || "This board", " exposes its key bindings through one 512-byte key table (GET ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x12"), " / SET ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x22"), ", 126 records of 4 bytes, indexed by matrix position; the Fn layer is a second table on", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " 0x16/0x26"), "). Every type below rides that table.", /*#__PURE__*/React.createElement("div", {
      className: "mt-1.5 text-rose-300/90"
    }, gate.reason))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-1.5"
    }, ADV_TYPES.map(t => /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setType(t.id),
      className: `flex flex-col items-start px-2.5 py-1.5 rounded-md border transition-all
                        ${type === t.id ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.16em]"
    }, t.name), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] text-[var(--text-faint)]"
    }, "page ", t.page)))), /*#__PURE__*/React.createElement(Note, null, def.blurb), /*#__PURE__*/React.createElement("div", {
      className: "flex items-end gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(Label, null, isPair ? "Key 1 Â· table index" : "Key Â· table index"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: 0,
      max: 125,
      value: keyIndex,
      onChange: e => setKeyIndex(Math.max(0, Math.min(125, +e.target.value || 0))),
      className: "w-full h-9 px-2 rounded-md border border-[var(--line)] bg-white/[0.02] font-mono text-[13px] text-[var(--text)]"
    })), isPair && /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(Label, null, "Key 2 \xB7 table index"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: 0,
      max: 125,
      value: keyIndexB,
      onChange: e => setKeyIndexB(Math.max(0, Math.min(125, +e.target.value || 0))),
      className: "w-full h-9 px-2 rounded-md border border-[var(--line)] bg-white/[0.02] font-mono text-[13px] text-[var(--text)]"
    }))), /*#__PURE__*/React.createElement(Note, null, "Records are indexed by ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "matrix"), " position, not by on-screen key order (16-column stride; row bases 0/16/32/48/64/80). The index is entered directly here because Aether's key picker for this board maps design codes, not matrix slots."), type === "remap" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] flex flex-col gap-2"
    }, /*#__PURE__*/React.createElement(HidPicker, {
      title: "HID usage",
      value: hidA,
      onPick: setHidA
    }), /*#__PURE__*/React.createElement(Note, null, "Byte 1 of a remap record is a modifier bitmask (a modifier-only entry", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " 02 40 00 00"), " exists in the stock Fn table). Aether composes it as", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " 0x00"), " here \u2014 the mask bit order was never exercised in the capture.", /*#__PURE__*/React.createElement(Tag, {
      kind: "captured"
    }), " record shape \xB7 ", /*#__PURE__*/React.createElement(Tag, {
      kind: "source"
    }), " modifier bit order")), (type === "socd" || type === "rs") && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] flex flex-col gap-2.5"
    }, /*#__PURE__*/React.createElement(HidPicker, {
      title: "Key 1 HID",
      value: hidA,
      onPick: setHidA
    }), /*#__PURE__*/React.createElement(HidPicker, {
      title: "Key 2 HID",
      value: hidB,
      onPick: setHidB
    }), /*#__PURE__*/React.createElement(Note, null, "The pair is stored as HID usage codes inside the record, and the identical record is written into", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, " both"), " keys' slots. ", /*#__PURE__*/React.createElement(Tag, {
      kind: "captured"
    })), type === "socd" && /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1.5"
    }, /*#__PURE__*/React.createElement(Label, null, "Behaviour mode"), SOCD_MODES.map(m => {
      const sel = mode === m.v;
      return /*#__PURE__*/React.createElement("button", {
        key: m.v,
        disabled: !m.verified,
        onClick: () => m.verified && setMode(m.v),
        className: `text-left px-3 py-2 rounded-md border transition-all
                                ${!m.verified ? "border-[var(--line)] bg-white/[0.01] opacity-60 cursor-not-allowed" : sel ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: `font-mono text-[11px] ${m.verified ? "text-[var(--accent)]" : "text-[var(--text-faint)]"}`
      }, "0x", hex2(m.v)), /*#__PURE__*/React.createElement("span", {
        className: `font-display text-[11px] uppercase tracking-[0.14em] ${m.verified ? "text-[var(--text)]" : "text-[var(--text-faint)]"}`
      }, m.label), /*#__PURE__*/React.createElement(Tag, {
        kind: m.verified ? "captured" : "unknown"
      })), /*#__PURE__*/React.createElement("div", {
        className: "mt-1 text-[10px] leading-relaxed text-[var(--text-dim)]"
      }, m.note));
    }), /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, "The vendor UI offers four modes. Aether offers the one that was actually observed. The other three are shown greyed out and are deliberately not selectable \u2014 presenting them as working would be a guess, and a wrong guess here silently changes which key wins in-game.")), type === "rs" && /*#__PURE__*/React.createElement(Note, null, "RS carries no mode byte at all \u2014 byte 1 was ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x00"), " in every captured frame. Resolution is \"deeper press wins\", decided by the firmware. ", /*#__PURE__*/React.createElement(Tag, {
      kind: "captured"
    })), /*#__PURE__*/React.createElement(CompetitiveWarning, null)), type === "mt" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] flex flex-col gap-2.5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "Trigger delay \xB7 raw byte"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: 0,
      max: 255,
      value: delayRaw,
      onChange: e => setDelayRaw(+e.target.value),
      className: "flex-1"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[13px] text-[var(--accent)] w-20 text-right"
    }, delayRaw, " \xB7 0x", hex2(delayRaw)))), /*#__PURE__*/React.createElement(Note, {
      tone: "warn"
    }, "Shown as the ", /*#__PURE__*/React.createElement("span", {
      className: "text-[var(--text)]"
    }, "raw byte"), " on purpose. The only value ever captured on this board was ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x28"), " (40) \u2014 which is also the vendor's factory default, so it proves nothing about the unit. The vendor's own bundle describes the field as", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " sliderValue / 10"), " (i.e. 10 ms per count, 40 \u2192 400 ms), but that reading is ", /*#__PURE__*/React.createElement(Tag, {
      kind: "source"
    }), " and was never confirmed against a value we chose. Aether will not print a millisecond figure it cannot stand behind."), /*#__PURE__*/React.createElement(Note, null, "Bytes 1 and 2 are the tap and hold actions. They were ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "00 00"), " in every captured frame because the vendor UI fills them only after you physically press the key on the board. Aether therefore writes them as zero and does not offer an action picker. ", /*#__PURE__*/React.createElement(Tag, {
      kind: "unknown"
    }))), type === "tgl" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)]"
    }, /*#__PURE__*/React.createElement(Note, null, "Toggle takes no parameters: the captured record was exactly", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " 0A 00 00 00"), ". ", /*#__PURE__*/React.createElement(Tag, {
      kind: "captured"
    }), " The vendor bundle claims byte 1 can hold a HID usage (", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "[10, hidUsage, 0, 0]"), "); that was never observed, so Aether composes the captured all-zero form. ", /*#__PURE__*/React.createElement(Tag, {
      kind: "source"
    }))), type === "dks" && /*#__PURE__*/React.createElement("div", {
      className: "p-3 rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] flex flex-col gap-2.5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "DKS slot (byte 1)"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: 0,
      max: 15,
      value: slot,
      onChange: e => setSlot(Math.max(0, Math.min(15, +e.target.value || 0))),
      className: "w-28 h-9 px-2 rounded-md border border-[var(--line)] bg-white/[0.02] font-mono text-[13px] text-[var(--text)]"
    })), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-rose-400/40 bg-rose-500/[0.07] p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-display text-[10.5px] uppercase tracking-[0.18em] text-rose-300 mb-1"
    }, "DKS cannot be authored in Aether"), /*#__PURE__*/React.createElement("div", {
      className: "text-[10.5px] leading-relaxed text-rose-200/90"
    }, "DKS assigns up to four actions by how deep the key is pressed. In the vendor app those four action slots are filled by ", /*#__PURE__*/React.createElement("span", {
      className: "font-semibold"
    }, "physically pressing the key on the keyboard"), " ", "\u2014 the UI literally waits for the press. Aether has no such capture flow, and because the vendor capture never filled the slots, their encoding is undecoded. So Aether can show the record shape and the travel points, and nothing more: it will not ship a control that cannot produce a working DKS key.")), /*#__PURE__*/React.createElement(Note, null, "The companion travel table is a separate 1024-byte table (", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x18"), " / ", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, "0x28"), "), four points in 0.1 mm units \u2014 press / bottom-out / release / reset. The one captured entry was", /*#__PURE__*/React.createElement("span", {
      className: "font-mono"
    }, " 10 1E 1E 10"), " = 1.6 / 3.0 / 3.0 / 1.6 mm, written at offset 0, with byte 1 of the key record acting as the slot index into it. One entry is consistent with that reading but does not prove it. ", /*#__PURE__*/React.createElement(Tag, {
      kind: "captured"
    }), " values \xB7 ", /*#__PURE__*/React.createElement(Tag, {
      kind: "source"
    }), " slot indexing")), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3"
    }, /*#__PURE__*/React.createElement(Label, null, "Record that would be written"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[13px] text-[var(--accent)]"
    }, recordHex(draft)), /*#__PURE__*/React.createElement("div", {
      className: "mt-1 font-mono text-[10px] text-[var(--text-faint)]"
    }, "key table 0x22 \xB7 index ", keyIndex, " (byte offset ", keyIndex * 4, ")", isPair && /*#__PURE__*/React.createElement(React.Fragment, null, " + index ", keyIndexB, " (byte offset ", keyIndexB * 4, ") \u2014 same record"))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: stage,
      className: "flex-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] font-display text-[11px] uppercase tracking-[0.16em]"
    }, "Stage binding"), /*#__PURE__*/React.createElement("button", {
      disabled: true,
      title: gate.reason,
      className: "flex-1 h-8 rounded-md border border-[var(--line)] bg-white/[0.01] text-[var(--text-faint)] opacity-60 cursor-not-allowed font-display text-[11px] uppercase tracking-[0.16em]"
    }, "Write \xB7 unavailable")), /*#__PURE__*/React.createElement(Note, {
      tone: "bad"
    }, gate.reason, " Staged bindings live in this window only."));
  }

  /* ============================================================
     Status widget body (replaces the Win60 hotkey widget on capable boards).
     ============================================================ */
  function AdvancedKeyStatus({
    ctx,
    gate
  }) {
    const board = ctx && ctx.board || null;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full overflow-y-auto"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "Board"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[12px] text-[var(--text)]"
    }, board && board.name || "â€”"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, board && board.vidPid || "")), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3"
    }, /*#__PURE__*/React.createElement(Label, null, "Capability"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[11px] uppercase tracking-[0.16em] text-[var(--text)]"
    }, "advancedKeys"), /*#__PURE__*/React.createElement(Tag, {
      kind: gate.state === "yes" ? "captured" : "source"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] text-[var(--text-faint)]"
    }, gate.state, " \xB7 from ", gate.source)), /*#__PURE__*/React.createElement("div", {
      className: "mt-2"
    }, /*#__PURE__*/React.createElement(Note, {
      tone: "bad"
    }, gate.reason))), /*#__PURE__*/React.createElement(CompetitiveWarning, {
      compact: true
    }), /*#__PURE__*/React.createElement("div", {
      className: "rounded-md border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-3"
    }, /*#__PURE__*/React.createElement(Label, null, "Transport"), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10.5px] text-[var(--text-dim)] leading-relaxed"
    }, "key table GET 0x12 / SET 0x22 \xB7 512 B \xB7 126 x 4", /*#__PURE__*/React.createElement("br", null), "Fn layer GET 0x16 / SET 0x26 \xB7 same format", /*#__PURE__*/React.createElement("br", null), "DKS travel GET 0x18 / SET 0x28 \xB7 1024 B", /*#__PURE__*/React.createElement("br", null), "writes are whole-table (read, patch, write back)")));
  }

  /* ============================================================
     Staged-bindings widget body (replaces the Win60 active-pairs widget).
     ============================================================ */
  function AdvancedKeyBindings({
    ctx,
    gate
  }) {
    const s = useStore();
    const ITrash = window.AetherIcons && window.AetherIcons.ITrash;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3 h-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)]"
    }, s.bindings.length, " staged \xB7 0 written"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1.5 flex-1 overflow-y-auto"
    }, !s.bindings.length && /*#__PURE__*/React.createElement(Note, null, "Nothing staged. Bindings composed here are held in this window and never sent to the keyboard."), s.bindings.map(b => {
      const def = ADV_TYPES.find(t => t.id === b.type) || ADV_TYPES[0];
      const pair = b.type === "socd" || b.type === "rs";
      return /*#__PURE__*/React.createElement("div", {
        key: b.id,
        onClick: () => selectBinding(b.id),
        className: `px-3 py-2 rounded-md border cursor-pointer transition-all
                          ${s.sel === b.id ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 shadow-[0_0_10px_var(--accent-glow)]" : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/React.createElement("span", {
        className: "font-display text-[11px] uppercase tracking-[0.16em] text-[var(--text)]"
      }, def.name, " ", /*#__PURE__*/React.createElement("span", {
        className: "text-[var(--text-faint)]"
      }, "\xB7 page ", def.page)), /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          removeBinding(b.id);
        },
        className: "text-[var(--text-faint)] hover:text-rose-300",
        "aria-label": "Remove"
      }, ITrash ? /*#__PURE__*/React.createElement(ITrash, {
        size: 12
      }) : "x")), /*#__PURE__*/React.createElement("div", {
        className: "mt-1 font-mono text-[10px] text-[var(--text-faint)]"
      }, "idx ", b.keyIndex, pair ? ` + ${b.keyIndexB}` : "", pair ? ` Â· ${hidLabel(b.hidA)} / ${hidLabel(b.hidB)}` : "", b.type === "remap" ? ` Â· ${hidLabel(b.hidA)}` : "", b.type === "mt" ? ` Â· delay raw ${b.delayRaw}` : ""), /*#__PURE__*/React.createElement("div", {
        className: "mt-0.5 font-mono text-[11px] text-[var(--accent)]"
      }, recordHex(b)));
    })), /*#__PURE__*/React.createElement(Note, {
      tone: "bad"
    }, gate.reason));
  }
  window.AetherAdvancedKeys = {
    advancedKeysGate,
    AdvancedKeyEditor,
    AdvancedKeyStatus,
    AdvancedKeyBindings,
    CompetitiveWarning,
    ADV_TYPES,
    HID_KEYS
  };
})();
</script>
<script data-mod="comp_board-context">
(() => {
  /* ============================================================
     Board-awareness context â€” wave "UI board-awareness" of
     docs/context/PER_BOARD_PARITY_PLAN.md (step 4).
  
     Exposes window.AetherBoard = {
       BoardContext, useBoard, capState, makeBoardContextValue, UNKNOWN_BOARD
     }.
  
     The context VALUE shape (the locked contract for the next wave of
     workspace files):
  
       {
         board:        object|null   // get_board().active verbatim:
                                     //   {slug, name, vidPid, formFactor, status,
                                     //    capabilities, drivable, lighting?, actuation?}
         roster:       array         // list_boards().boards verbatim (adds
                                     //   `connected` + `active` booleans per entry)
         capabilities: object|null   // board.capabilities pass-through; values are
                                     //   true | false | "wip"
         lighting:     object|null   // board.lighting pass-through (per-board mode
                                     //   table + slider scales). null until the
                                     //   backend serializes the block in get_board.
         actuation:    object|null   // board.actuation pass-through (deadzoneScope,
                                     //   ranges, switches). Same null caveat.
         drivable:     bool          // protocol wired for the active board
         cap(name)          -> true | false | "wip" | undefined (raw flag)
         capState(name)     -> "yes" | "no" | "wip" | "unknown"
         isSupported(name)  -> bool  // ONLY true for a hard `true`. "wip" means
                                     // SOURCE-ONLY (read from vendor driver source,
                                     // never verified on hardware) and MUST be
                                     // treated as unavailable â€” label it
                                     // "unverified", don't drive it.
         selectBoard(slug)  -> Promise<select_board result>
         refreshBoards()    -> Promise
         switching:    bool          // a select_board round-trip is in flight
       }
  
     Fail-open rule: when NO board data is available at all (bridge not up,
     get_board failed, running in a plain browser) capState() returns "unknown"
     and isSupported() returns true, so the UI renders exactly like today's
     Win60-only build. The UI gate is cosmetic; the backend is the enforcement
     layer (unsupported ops return {ok:false, unsupported:true} regardless).
     ============================================================ */

  const BoardContext = React.createContext(null);

  // Normalize one capability flag. `caps` may be null (no board data).
  const capState = (caps, name) => {
    if (!caps || typeof caps !== "object") return "unknown";
    const v = caps[name];
    if (v === true) return "yes";
    if (v === "wip") return "wip";
    return "no"; // false or missing â€” registry semantics: absent flag = false
  };

  // Build the full context value from App-owned state + actions.
  const makeBoardContextValue = ({
    board,
    roster,
    selectBoard,
    refreshBoards,
    switching
  }) => {
    const caps = board && board.capabilities || null;
    return {
      board: board || null,
      roster: Array.isArray(roster) ? roster : [],
      capabilities: caps,
      lighting: board && board.lighting || null,
      actuation: board && board.actuation || null,
      drivable: !!(board && board.drivable),
      cap: name => caps ? caps[name] : undefined,
      capState: name => capState(caps, name),
      isSupported: name => caps ? caps[name] === true : true,
      // fail-open on unknown
      selectBoard: selectBoard || (() => Promise.resolve({
        ok: false,
        error: "no bridge"
      })),
      refreshBoards: refreshBoards || (() => Promise.resolve()),
      switching: !!switching
    };
  };

  // What consumers get if they render outside the provider (or the provider has
  // no data yet): behave exactly like the pre-board-awareness UI.
  const UNKNOWN_BOARD = makeBoardContextValue({
    board: null,
    roster: []
  });
  const useBoard = () => React.useContext(BoardContext) || UNKNOWN_BOARD;
  window.AetherBoard = {
    BoardContext,
    useBoard,
    capState,
    makeBoardContextValue,
    UNKNOWN_BOARD
  };
})();
</script>
<script data-mod="comp_board-picker">
(() => {
  /* ============================================================
     BoardPicker â€” multi-board chooser (PER_BOARD_PARITY_PLAN.md step 4).
  
     Lists every board the registry OFFERS (`offered`, resolved from
     `offerInUi`) â€” the same flag the setup wizard reads â€” whether or not the
     hardware is plugged in right now. Renders NOTHING when the live roster
     hasn't arrived (no bridge / plain-browser preview).
  
     Rules:
     - The active board is marked; drivable offered boards can be switched
       to via select_board(slug).
     - Non-drivable boards (protocol not decoded â€” e.g. the Mini 60 HE Pro
       2.4GHz dongle) are listed but NOT selectable as drive targets, with the
       reason spelled out instead of a mute grey-out.
  
     Exposes window.AetherBoardPicker = { BoardPicker }.
     ============================================================ */
  const {
    useState,
    useEffect,
    useRef
  } = React;
  const I = window.AetherIcons || {};
  const IChevronD = I.IChevronD,
    ICheck = I.ICheck;

  // Why a board can't be driven, in words. `status` comes from the registry.
  const undrivableReason = b => {
    const name = b && b.name || "this board";
    return `${name} can be identified but not driven â€” its protocol hasn't been ` + `decoded, so Aether has no verified frames to send it.`;
  };
  function BoardRow({
    b,
    switching,
    onSelect
  }) {
    const selectable = b.drivable && !b.active && !switching;
    const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-2 min-w-0"
    }, /*#__PURE__*/React.createElement("span", {
      className: `inline-block w-1.5 h-1.5 rounded-full shrink-0
                          ${b.active ? "bg-[var(--good)]" : b.drivable ? "bg-[var(--text-faint)]" : "bg-[var(--warn)]"}`
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[13px] text-[var(--text)] truncate"
    }, b.name)), /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-2 ml-auto shrink-0"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-faint)]"
    }, b.vidPid), b.active && /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--good)]"
    }, ICheck && /*#__PURE__*/React.createElement(ICheck, {
      size: 10
    }), "Active"), !b.active && b.drivable && /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--accent)]"
    }, switching ? "â€¦" : "Switch"), !b.drivable && /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--warn)]"
    }, "Not drivable")));
    if (selectable) {
      return /*#__PURE__*/React.createElement("button", {
        onClick: () => onSelect(b.slug),
        className: "w-full flex items-center gap-2 px-2.5 h-9 rounded-lg text-left transition-colors hover:bg-white/[0.04]"
      }, inner);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-full flex items-center gap-2 px-2.5 h-9 rounded-lg
                       ${b.active ? "bg-[var(--accent)]/10" : ""}`
    }, inner), !b.drivable && /*#__PURE__*/React.createElement("div", {
      className: "px-2.5 pb-2 -mt-0.5 text-[10.5px] leading-relaxed text-[var(--text-dim)]"
    }, undrivableReason(b)));
  }
  function BoardPicker({
    roster,
    active,
    switching,
    onSelect
  }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
      const h = e => {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", h);
      return () => document.removeEventListener("mousedown", h);
    }, []);

    // The boards this picker lists = registry entries the registry says may be
    // OFFERED (`offered`, resolved from `offerInUi`) â€” the SAME flag the wizard
    // reads, so the two pickers can never disagree. It is deliberately NOT a
    // filter on `connected`: an offered board is pickable whether or not it is
    // plugged in right now (select_board() rebinds; connect() then reports
    // honestly if the hardware is absent). Filtering on `connected` was the bug
    // this replaces â€” the KP-TE153 shares the Win60's VID:PID, so it read as
    // "connected" and appeared here while never being offered at all.
    // `offered` is undefined on older payloads -> fall back to `drivable`.
    const offered = (roster || []).filter(b => b && (b.offered !== undefined ? b.offered : b.drivable));
    // No roster yet (no bridge / plain-browser preview): stay invisible.
    if (offered.length < 2) return null;
    const current = active || offered.find(b => b.active) || null;
    const label = current ? current.name : "Select board";
    const doSelect = slug => {
      setOpen(false);
      onSelect && onSelect(slug);
    };
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: "fixed z-[60]",
      style: {
        top: 62,
        right: 20
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      disabled: !!switching,
      title: "Choose which board Aether drives",
      className: "flex items-center gap-2 h-[34px] pl-3 pr-2.5 rounded-[11px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--ink)_70%,transparent)] backdrop-blur-xl text-[var(--text)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] transition-colors disabled:opacity-60"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-1.5 h-1.5 rounded-full shrink-0",
      style: {
        background: "var(--good)",
        boxShadow: "0 0 8px var(--good)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-title text-[13px] tracking-[0.04em] uppercase"
    }, switching ? "Switchingâ€¦" : label), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--text-faint)]"
    }, offered.length, " boards"), IChevronD && /*#__PURE__*/React.createElement(IChevronD, {
      size: 12,
      className: `text-[var(--text-faint)] transition-transform ${open ? "rotate-180" : ""}`
    })), open && /*#__PURE__*/React.createElement("div", {
      className: "absolute top-full right-0 mt-1.5 w-[340px] p-1.5 menu-pop z-[61] animate-[fadeIn_140ms_ease-out]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "px-2.5 pt-1.5 pb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-faint)]"
    }, "Boards"), offered.map(b => /*#__PURE__*/React.createElement(BoardRow, {
      key: b.slug,
      b: b,
      switching: !!switching,
      onSelect: doSelect
    })), /*#__PURE__*/React.createElement("div", {
      className: "h-px bg-[var(--line)] my-1"
    }), /*#__PURE__*/React.createElement("div", {
      className: "px-2.5 py-1.5 text-[10px] leading-relaxed text-[var(--text-faint)]"
    }, "Switching disconnects the current board and rebinds Aether to the one you choose.")));
  }
  window.AetherBoardPicker = {
    BoardPicker
  };
})();
</script>
<script data-mod="comp_unsupported-notices">
(() => {
  /* ============================================================
     UnsupportedNotices â€” honest failure surfacing
     (PER_BOARD_PARITY_PLAN.md step 4, "honest toasts").
  
     When any bridge call resolves {ok:false, unsupported:true, feature, error}
     the App pushes the backend's reason here instead of letting the call fail
     silently. Presentation-only: notices arrive via props, so nothing here
     runs (or renders) on a board where every operation is supported â€” on the
     Aula Win60 HE this component always renders null.
  
     Styling follows the app's existing timed flash-message idiom
     (ConfirmToast / settings.jsx toast): short uppercase display text on a
     bordered card, auto-dismissed by the owner.
  
     Exposes window.AetherNotices = { UnsupportedNotices }.
     ============================================================ */

  function UnsupportedNotices({
    notices,
    onDismiss
  }) {
    if (!notices || !notices.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] flex flex-col items-center gap-2 pointer-events-none"
    }, notices.map(n => /*#__PURE__*/React.createElement("div", {
      key: n.id,
      className: "pointer-events-auto flex items-center gap-3 pl-3.5 pr-2 py-2 rounded-xl border bg-[color-mix(in_srgb,var(--ink)_90%,transparent)] backdrop-blur-md shadow-2xl animate-[fadeIn_140ms_ease-out]",
      style: {
        borderColor: "color-mix(in srgb, var(--warn) 45%, transparent)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--warn)] shrink-0"
    }, "Not supported"), /*#__PURE__*/React.createElement("span", {
      className: "font-display text-[12px] text-[var(--text)] max-w-[420px]"
    }, n.msg), /*#__PURE__*/React.createElement("button", {
      onClick: () => onDismiss && onDismiss(n.id),
      "aria-label": "Dismiss",
      className: "ml-1 w-6 h-6 grid place-items-center rounded-md text-[var(--text-faint)] hover:text-[var(--text)] hover:bg-white/[0.05]"
    }, "\xD7"))));
  }
  window.AetherNotices = {
    UnsupportedNotices
  };
})();
</script>
<script data-mod="board-submit">
(() => {
  const {
    useState,
    useEffect,
    useRef
  } = React;
  const api = () => window.pywebview && window.pywebview.api || {};
  const ISSUE_BASE = "https://github.com/MrWhosNexus/Aether-HE/issues/new";
  function buildIssueUrl(meta, dev) {
    // Pre-fills the add-a-board.yml form fields via query params.
    const p = new URLSearchParams({
      template: "add-a-board.yml",
      title: `[Board] ${meta.brand} ${meta.model} â€” add support`
    });
    p.append("brand-model", `${meta.brand} ${meta.model}`);
    p.append("switch-type", meta.switch_type || "");
    p.append("form-factor", meta.form_factor || "");
    p.append("vid-pid", `${dev.vid}:${dev.pid}`);
    return `${ISSUE_BASE}?${p.toString()}`;
  }
  function BoardSubmit({
    open,
    onClose
  }) {
    const [step, setStep] = useState(0); // 0 detect,1 meta,2 capture,3 submit
    const [devices, setDevices] = useState([]);
    const [dev, setDev] = useState(null);
    const [meta, setMeta] = useState({
      brand: "",
      model: "",
      switch_type: "Hall-effect",
      form_factor: "",
      size: "60"
    });
    const [reports, setReports] = useState([]);
    const [capturing, setCapturing] = useState(false);
    const [keysSeen, setKeysSeen] = useState(0);
    const [result, setResult] = useState(null);
    const pollRef = useRef(null);
    useEffect(() => {
      if (open) {
        setStep(0);
        api().list_hid_devices?.().then(r => r && r.ok && setDevices(r.devices));
      }
    }, [open]);
    useEffect(() => () => {
      if (pollRef.current) clearInterval(pollRef.current);
      api().stop_capture?.();
    }, []);
    useEffect(() => {
      if (!open && capturing) {
        stopCapture();
      }
    }, [open]);
    if (!open) return null;
    const startCapture = async () => {
      // A second click while a poll is already running would overwrite pollRef
      // and orphan the first interval (it would poll forever, past close).
      if (pollRef.current) return;
      setReports([]);
      setKeysSeen(0);
      await api().open_capture?.(dev.path, dev.vid, dev.pid);
      setCapturing(true);
      pollRef.current = setInterval(async () => {
        const r = await api().read_capture?.();
        if (r && r.ok && r.count) {
          setReports(prev => {
            const next = prev.concat(r.reports);
            // Count DISTINCT KEYS, not distinct byte-prefixes. HE Travel-Test frames
            // are all "01 21 .. 05 .." â€” the key identity is row/col at bytes 7-8
            // (see LiveReader). For those, key on bytes 7-8; otherwise fall back to
            // the whole frame so non-HE input reports still count sensibly.
            const keyOf = h => h.length >= 18 && h.slice(2, 4) === "21" && h.slice(10, 12) === "05" ? h.slice(14, 18) : h;
            setKeysSeen(new Set(next.map(x => keyOf(x.hex))).size);
            return next;
          });
        }
      }, 200);
    };
    const stopCapture = async () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      setCapturing(false);
      await api().stop_capture?.();
    };
    const submit = async () => {
      const interfaces = (devices || []).filter(d => d.vid === dev.vid && d.pid === dev.pid).map(d => ({
        interface_number: d.interface_number,
        usage_page: d.usage_page
      }));
      const {
        path,
        ...devNoPath
      } = dev; // drop raw HID path (public issue)
      const deviceObj = {
        ...devNoPath,
        hid_descriptor_b64: "",
        interfaces
      };
      const obj = {
        schema: "aether-board-submission/1",
        submitted_at: new Date().toISOString(),
        app_version: window.__resources && window.__resources.version || "0.2.0",
        device: deviceObj,
        meta,
        size_template: `generic-${meta.size}`,
        input_capture: {
          duration_ms: reports.length ? reports[reports.length - 1].t : 0,
          report_len: 64,
          reports,
          keys_seen: keysSeen
        },
        output_pcap: {
          attached: false,
          filename: null
        },
        notes: ""
      };
      const r = await api().save_submission?.(obj);
      setResult(r);
      if (r && r.ok) await api().open_submission_url?.(buildIssueUrl(meta, dev));
    };

    // --- render: a glass modal with the 4 steps (detect / meta / capture / submit) ---
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "grid",
        placeItems: "center",
        background: "rgba(3,7,9,0.6)",
        backdropFilter: "blur(6px)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        width: "min(760px,94vw)",
        maxHeight: "90vh",
        overflow: "auto",
        padding: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-title",
      style: {
        fontSize: 24
      }
    }, "SUBMIT YOUR BOARD"), /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => {
        stopCapture();
        onClose();
      }
    }, "\u2715")), step === 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--text-faint)] mb-3"
    }, "Pick your keyboard from connected HID devices."), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-1.5",
      style: {
        maxHeight: 320,
        overflow: "auto"
      }
    }, devices.map((d, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setDev(d),
      className: `btn ${dev && dev.path === d.path ? "on" : ""}`,
      style: {
        textAlign: "left"
      }
    }, d.product || "(unknown)", " \xB7 ", d.vid, ":", d.pid, " \xB7 iface ", d.interface_number, " \xB7 ", (d.usage_pages || [d.usage_page]).join(", ")))), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-end mt-4"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn accent",
      disabled: !dev,
      onClick: () => setStep(1)
    }, "Next"))), step === 1 && /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-3"
    }, [["brand", "Brand"], ["model", "Model"], ["form_factor", "Form factor"]].map(([k, lbl]) => /*#__PURE__*/React.createElement("label", {
      key: k,
      className: "flex flex-col gap-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]"
    }, lbl), /*#__PURE__*/React.createElement("input", {
      className: "input",
      value: meta[k],
      onChange: e => setMeta({
        ...meta,
        [k]: e.target.value
      })
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, ["60", "65", "75", "tkl"].map(s => /*#__PURE__*/React.createElement("button", {
      key: s,
      className: `btn ${meta.size === s ? "on" : ""}`,
      onClick: () => setMeta({
        ...meta,
        size: s
      })
    }, s.toUpperCase()))), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between mt-3"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => setStep(0)
    }, "Back"), /*#__PURE__*/React.createElement("button", {
      className: "btn accent",
      disabled: !meta.brand || !meta.model,
      onClick: () => setStep(2)
    }, "Next"))), step === 2 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--text-dim)] mb-2"
    }, "We\u2019ll record what the board ", /*#__PURE__*/React.createElement("b", null, "sends"), " (read-only \u2014 we never write to it). Press every key once, then a few keys slowly."), /*#__PURE__*/React.createElement("div", {
      className: "glass p-4 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-title text-[28px] text-[var(--accent)]"
    }, keysSeen), /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]"
    }, "distinct reports \xB7 ", reports.length, " total")), !capturing ? /*#__PURE__*/React.createElement("button", {
      className: "btn accent",
      onClick: startCapture
    }, "Start capture") : /*#__PURE__*/React.createElement("button", {
      className: "btn danger",
      onClick: stopCapture
    }, "Stop capture"), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between mt-4"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => {
        stopCapture();
        setStep(1);
      }
    }, "Back"), /*#__PURE__*/React.createElement("button", {
      className: "btn accent",
      disabled: reports.length === 0,
      onClick: () => {
        stopCapture();
        setStep(3);
      }
    }, "Next"))), step === 3 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--text-dim)] mb-3"
    }, "Submitting saves a file locally and opens a pre-filled GitHub issue. ", /*#__PURE__*/React.createElement("b", null, "Attach the saved file"), " to the issue. (Optional: record a USBPcap capture for lighting and attach it too.)"), /*#__PURE__*/React.createElement("button", {
      className: "btn accent",
      onClick: submit
    }, "Save & open GitHub issue"), result && result.ok && /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--good)] mt-3"
    }, "Saved: ", result.path), result && !result.ok && /*#__PURE__*/React.createElement("p", {
      className: "font-mono text-[11px] text-[var(--bad)] mt-3"
    }, (result.errors || [result.error]).join("; ")), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-start mt-4"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => setStep(2)
    }, "Back")))));
  }
  window.AetherBoardSubmit = {
    BoardSubmit
  };
})();
</script>
<script data-mod="wizard">
(() => {
  /* ============================================================
     SetupWizard â€” first-run guided setup for AetherHE.
     Exposes window.AetherWizard = { SetupWizard }.
     Plain JSX, global React (no libs). Glass panels + Impact (.font-title)
     titles, matching desktop.jsx / sections.jsx styling. UI ONLY â€” reads/calls
     ctx.* and window.pywebview.api.* exactly like the existing sections.
  
     4 steps:
       1) Board selection   (drivable registry boards only â€” decoded protocol)
       2) Board layout preview (reuses window.AetherKeyboard.KeyboardPanel, read-only)
       3) Animation how-to  (points at the Lighting workspace)
       4) JSON import       (returning users: file -> parse -> ctx.applyState)
  
     Persistence:
       - board choice -> localStorage "aether-board"
       - done flag    -> localStorage "aether-setup-done" = "1"
         (coordinator can key first-run detection off the missing flag /
          missing settings file, and re-open via ctx.setWizardOpen(true).)
     ============================================================ */
  const {
    useState,
    useEffect,
    useMemo,
    useRef
  } = React;
  const BOARD_ISSUE_URL = "https://github.com/MrWhosNexus/Aether-HE/issues/new?template=add-a-board.yml";
  const LS_BOARD = "aether-board";
  const LS_DONE = "aether-setup-done";

  /* Static fallback list â€” mirrors the data/board_registry.json entries the
     registry marks OFFERED (`offerInUi`), used only when the live roster isn't up
     yet (no bridge, plain-browser preview). Keep it in step with the registry:
     the live roster is authoritative, this is just what shows before it loads.
  
     Offered is stricter than drivable. Boards deliberately NOT offered, each for
     a stated reason in the registry's `_offerNote`:
       aula-kp-te153     â€” decoded by family, never run on a physical KP-TE153
       aula-win60he-pro  â€” SayoDevice; captures decode, but nobody owns the board
       aula-mini60he-max â€” decoded from a contributor capture, never hardware-run
     They stay in the registry so a plugged-in board is still detected, named and
     drawn with an honest explanation â€” they are simply never pickable here. */
  const BOARDS = [{
    slug: "aula-win60-he",
    name: "Aula Win60 HE",
    form: "60%",
    status: "supported"
  }, {
    slug: "aula-win68-he",
    name: "Aula WIN 68 HE",
    form: "65%",
    status: "bringup"
  }, {
    slug: "aula-mini60he-pro",
    name: "Aula Mini 60 HE Pro (wired)",
    form: "60%",
    status: "supported"
  }, {
    slug: "aula-mini60he-pro-24g",
    name: "Aula Mini 60 HE Pro (2.4GHz)",
    form: "60%",
    status: "supported"
  }];
  const STATUS_LABEL = {
    supported: "Supported",
    bringup: "Bring-up"
  };

  /* The boards the wizard offers = registry entries the registry says may be
     OFFERED (`offered`, resolved from `offerInUi`), which is a stricter thing
     than `drivable`. A board can have a fully decoded protocol and still not
     belong in a picker â€” e.g. decoded from a contributor's capture but never
     run on physical hardware by anyone. Reading `offered` keeps that judgement
     in the registry as data instead of re-deriving it at each UI site, where
     the two inevitably drift.
  
     `offered` is undefined on older payloads, so fall back to `drivable` â€” that
     preserves today's behaviour for any board that declares nothing.
  
     Prefers the LIVE roster the app already fetched over the bridge
     (ctx.board.roster mirrors list_boards() â€” see board-context.jsx), so the
     wizard tracks the registry with no rebuild; falls back to the static mirror
     above. Filter is NOT on `connected`: an offered board appears whether or not
     it is plugged in right now. */
  const drivableBoards = ctx => {
    const roster = ctx && ctx.board && Array.isArray(ctx.board.roster) ? ctx.board.roster : [];
    const live = roster.filter(b => b && (b.offered !== undefined ? b.offered : b.drivable));
    if (live.length) {
      return live.map(b => ({
        slug: b.slug,
        name: b.name,
        form: b.formFactor || "",
        status: b.status || "bringup"
      }));
    }
    return BOARDS;
  };

  /* Recognised-but-not-drivable boards that are attached RIGHT NOW (identity-only
     registry entries â€” e.g. the 2.4GHz dongles). Not pickable, but if one is
     plugged in the wizard says so honestly instead of silently hiding it. */
  const recognisedUndrivable = ctx => {
    const roster = ctx && ctx.board && Array.isArray(ctx.board.roster) ? ctx.board.roster : [];
    return roster.filter(b => b && b.connected && !b.drivable);
  };
  const STEPS = ["Board", "Layout", "Animations", "Import"];

  /* ---- persistence helpers ---- */
  const loadBoard = () => {
    try {
      return localStorage.getItem(LS_BOARD) || "aula-win60-he";
    } catch {
      return "aula-win60-he";
    }
  };
  const saveBoard = slug => {
    try {
      localStorage.setItem(LS_BOARD, slug);
    } catch {}
  };
  const markDone = () => {
    try {
      localStorage.setItem(LS_DONE, "1");
    } catch {}
  };

  /* ============================================================
     Step 1 â€” Board selection.
     ============================================================ */
  function StepBoard({
    board,
    setBoard,
    ctx,
    onClose
  }) {
    const boards = drivableBoards(ctx);
    const detected = recognisedUndrivable(ctx);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "font-title",
      style: {
        fontSize: 28,
        letterSpacing: "0.04em",
        marginBottom: 6
      }
    }, "SELECT YOUR BOARD"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        opacity: 0.7,
        marginBottom: 16
      }
    }, "Every board listed here has a decoded protocol \u2014 Aether can drive it today. More are being brought up. Don't see yours?", " ", /*#__PURE__*/React.createElement("a", {
      href: BOARD_ISSUE_URL,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        color: "var(--accent)",
        textDecoration: "underline"
      }
    }, "Submit your board"), "."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }
    }, boards.map(b => {
      const on = board === b.slug;
      return /*#__PURE__*/React.createElement("button", {
        key: b.slug,
        onClick: () => setBoard(b.slug),
        className: "glass",
        style: {
          textAlign: "left",
          padding: "12px 14px",
          borderRadius: 10,
          cursor: "pointer",
          outline: on ? "2px solid var(--accent)" : "1px solid var(--line)",
          boxShadow: on ? "0 0 18px var(--accent-glow)" : "none",
          transition: "all 150ms"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "font-title",
        style: {
          fontSize: 15,
          letterSpacing: "0.02em"
        }
      }, b.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          opacity: 0.65,
          marginTop: 4,
          display: "flex",
          gap: 8,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("span", null, b.form), /*#__PURE__*/React.createElement("span", {
        style: {
          padding: "1px 7px",
          borderRadius: 999,
          fontSize: 9.5,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: b.status === "supported" ? "var(--accent)" : "var(--text-dim)",
          border: "1px solid var(--line)"
        }
      }, STATUS_LABEL[b.status] || b.status)));
    })), detected.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        marginTop: 12,
        padding: "10px 14px",
        borderRadius: 10,
        fontSize: 12,
        opacity: 0.8,
        lineHeight: 1.5
      }
    }, detected.map(b => /*#__PURE__*/React.createElement("div", {
      key: b.slug
    }, "Detected ", /*#__PURE__*/React.createElement("strong", null, b.name), " (", b.vidPid, ") \u2014 Aether recognises it, but its protocol hasn't been decoded yet, so it can't be set up here."))), /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => {
        onClose();
        ctx && ctx.setSubmitOpen && ctx.setSubmitOpen(true);
      },
      style: {
        marginTop: 14
      }
    }, "My board isn\u2019t listed \u2192 Submit it"));
  }

  /* ============================================================
     Step 2 â€” Board layout preview (reuse KeyboardPanel, read-only).
     ============================================================ */
  function StepLayout({
    board,
    ctx
  }) {
    const KB = window.AetherKeyboard || {};
    const KeyboardPanel = KB.KeyboardPanel;
    const boards = drivableBoards(ctx);
    const info = boards.find(b => b.slug === board) || boards[0];
    // Read-only preview: a frozen empty selection + no-op setter so nothing is
    // editable and no device is needed. Only the Win60 HE layout is bundled in
    // keyboard.jsx today; other boards show the layout note instead.
    const emptySel = useMemo(() => new Set(), []);
    const noop = useRef(() => {}).current;
    const canRender = (board === "aula-win60-he" || board === "aula-win68he-max" || board === "aula-win68-he-max") && typeof KeyboardPanel === "function";
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "font-title",
      style: {
        fontSize: 28,
        letterSpacing: "0.04em",
        marginBottom: 6
      }
    }, info.name.toUpperCase(), " \xB7 LAYOUT"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        opacity: 0.7,
        marginBottom: 16
      }
    }, "This is your board's key layout. Later you'll click keys here to scope actuation, remaps and lighting \u2014 no device needed to look around."), canRender ? /*#__PURE__*/React.createElement("div", {
      style: {
        pointerEvents: "none"
      }
    }, React.createElement(KeyboardPanel, {
      mode: "keymap",
      layer: "default",
      selectedKeys: emptySel,
      setSelectedKeys: noop,
      actuationPoint: 1.70,
      rtPress: 0.05,
      rtRelease: 0.05,
      showPill: false,
      compact: true
    })) : /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        padding: 20,
        borderRadius: 10,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-title",
      style: {
        fontSize: 16
      }
    }, "Layout preview coming soon"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.65,
        marginTop: 6
      }
    }, "The interactive layout for ", info.name, " lands when its bring-up completes.")));
  }

  /* ============================================================
     Step 3 â€” Animation how-to (static instructional content + small preview).
     ============================================================ */
  function StepAnimations({
    ctx
  }) {
    const goLighting = () => {
      if (ctx && typeof ctx.setSection === "function") ctx.setSection("lighting");
    };
    const steps = [["Open Lighting", "Jump to the Lighting workspace from the top bar."], ["Pick a pattern", "Choose an effect (Wave, Ripple, Aurora, Rainâ€¦) and set its colors."], ["Tune it", "Adjust brightness, speed and direction â€” changes stream live to the board."], ["Scope per-key", "Select keys on the board to paint per-key colors on top of the effect."]];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "font-title",
      style: {
        fontSize: 28,
        letterSpacing: "0.04em",
        marginBottom: 6
      }
    }, "SET UP LIGHTING"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        opacity: 0.7,
        marginBottom: 16
      }
    }, "Aether streams multi-color animations from the host in real time. Here's the short version \u2014 the full controls live in the Lighting workspace."), /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        padding: 12,
        borderRadius: 10,
        marginBottom: 16,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4
      }
    }, Array.from({
      length: 14
    }).map((_, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        flex: 1,
        height: 22,
        borderRadius: 4,
        background: `hsl(${i * 26 % 360} 85% 55%)`,
        animation: "aetherWizPulse 1.6s ease-in-out infinite",
        animationDelay: `${i * 0.08}s`
      }
    }))), /*#__PURE__*/React.createElement("style", null, `@keyframes aetherWizPulse{0%,100%{opacity:.35}50%{opacity:1}}`)), /*#__PURE__*/React.createElement("ol", {
      style: {
        display: "grid",
        gap: 10,
        margin: 0,
        padding: 0,
        listStyle: "none"
      }
    }, steps.map(([t, d], i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: "flex",
        gap: 12,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-title",
      style: {
        width: 26,
        height: 26,
        borderRadius: 999,
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        fontSize: 13,
        border: "1px solid var(--accent)",
        color: "var(--accent)"
      }
    }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-title",
      style: {
        fontSize: 13.5,
        letterSpacing: "0.02em"
      }
    }, t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.68,
        marginTop: 2
      }
    }, d))))), /*#__PURE__*/React.createElement("button", {
      onClick: goLighting,
      className: "glass font-title",
      style: {
        marginTop: 16,
        padding: "8px 16px",
        borderRadius: 8,
        cursor: "pointer",
        color: "var(--accent)",
        outline: "1px solid var(--accent)",
        fontSize: 12
      }
    }, "Open Lighting workspace"));
  }

  /* ============================================================
     Step 4 â€” JSON import (returning users).
     ============================================================ */
  function StepImport({
    ctx
  }) {
    const [status, setStatus] = useState({
      kind: "idle",
      msg: ""
    });
    const fileRef = useRef(null);
    const applyImported = parsed => {
      // Accept either a full settings blob {profiles:[...]} or a bare state object.
      let state = parsed;
      if (parsed && Array.isArray(parsed.profiles) && parsed.profiles.length) {
        const aid = parsed.activeProfile;
        const active = parsed.profiles.find(p => p.id === aid) || parsed.profiles[0];
        state = active && active.state || {};
      }
      if (ctx && typeof ctx.applyState === "function") ctx.applyState(state);
      // Persist through the same bridge the app uses (best-effort; the app's
      // own save effect will also mirror the applied state after hydration).
      try {
        const api = window.pywebview && window.pywebview.api;
        if (api && api.save_settings && parsed && Array.isArray(parsed.profiles)) {
          Promise.resolve(api.save_settings(parsed)).catch(() => {});
        }
      } catch {}
    };
    const onFile = e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          applyImported(parsed);
          setStatus({
            kind: "ok",
            msg: `Imported ${file.name} â€” settings applied.`
          });
        } catch (err) {
          setStatus({
            kind: "err",
            msg: "Couldn't parse that file â€” is it a valid Aether JSON?"
          });
        }
      };
      reader.onerror = () => setStatus({
        kind: "err",
        msg: "Couldn't read that file."
      });
      reader.readAsText(file);
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "font-title",
      style: {
        fontSize: 28,
        letterSpacing: "0.04em",
        marginBottom: 6
      }
    }, "IMPORT SETTINGS"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        opacity: 0.7,
        marginBottom: 16
      }
    }, "Returning from another install? Import an exported Aether settings JSON to restore your profiles, lighting, actuation and SOCD in one shot. New here? Just skip this and hit Finish."), /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        padding: 20,
        borderRadius: 10,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("input", {
      ref: fileRef,
      type: "file",
      accept: "application/json,.json",
      onChange: onFile,
      style: {
        display: "none"
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => fileRef.current && fileRef.current.click(),
      className: "font-title",
      style: {
        padding: "10px 20px",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 13,
        color: "var(--accent)",
        outline: "1px solid var(--accent)",
        background: "transparent"
      }
    }, "Choose settings JSON\u2026"), status.kind !== "idle" && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        fontSize: 12,
        color: status.kind === "err" ? "#fca5a5" : "var(--accent)"
      }
    }, status.msg)));
  }

  /* ============================================================
     SetupWizard â€” modal overlay orchestrating the 4 steps.
     Props: { open, onClose, ctx }
     ============================================================ */
  function SetupWizard({
    open,
    onClose,
    ctx
  }) {
    const [step, setStep] = useState(0);
    const [board, setBoardState] = useState(loadBoard);

    // Reset to first step each time the wizard is (re)opened.
    useEffect(() => {
      if (open) setStep(0);
    }, [open]);

    // If the remembered board is no longer offered (e.g. an identity-only slug
    // left over from an older build), snap to the first drivable board.
    useEffect(() => {
      if (!open) return;
      const boards = drivableBoards(ctx);
      if (boards.length && !boards.some(b => b.slug === board)) {
        setBoardState(boards[0].slug);
        saveBoard(boards[0].slug);
      }
    }, [open]);
    const setBoard = slug => {
      setBoardState(slug);
      saveBoard(slug);
    };
    const finish = () => {
      saveBoard(board);
      markDone();
      // If the coordinator wired a board setter into ctx, tell it too.
      if (ctx && typeof ctx.setBoard === "function") ctx.setBoard(board);
      if (typeof onClose === "function") onClose();
    };
    const close = () => {
      if (typeof onClose === "function") onClose();
    };
    if (!open) return null;
    const last = step === STEPS.length - 1;
    const c = ctx || {};
    let body = null;
    if (step === 0) body = /*#__PURE__*/React.createElement(StepBoard, {
      board: board,
      setBoard: setBoard,
      ctx: c,
      onClose: close
    });else if (step === 1) body = /*#__PURE__*/React.createElement(StepLayout, {
      board: board,
      ctx: c
    });else if (step === 2) body = /*#__PURE__*/React.createElement(StepAnimations, {
      ctx: c
    });else body = /*#__PURE__*/React.createElement(StepImport, {
      ctx: c
    });
    return /*#__PURE__*/React.createElement("div", {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Aether first-run setup",
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(3,7,10,0.72)",
        backdropFilter: "blur(6px)",
        display: "grid",
        placeItems: "center",
        padding: 24
      },
      onClick: e => {
        if (e.target === e.currentTarget) close();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        width: "min(1060px, 96vw)",
        maxHeight: "90vh",
        overflow: "auto",
        borderRadius: 16,
        padding: 28,
        position: "relative",
        border: "1px solid var(--line)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: close,
      title: "Close",
      "aria-label": "Close setup",
      style: {
        position: "absolute",
        top: 14,
        right: 16,
        background: "transparent",
        border: "none",
        color: "var(--text-dim)",
        fontSize: 20,
        cursor: "pointer",
        lineHeight: 1
      }
    }, "\xD7"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 22
      }
    }, STEPS.map((label, i) => /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-title",
      style: {
        fontSize: 10.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: i === step ? "var(--accent)" : "var(--text-faint)"
      }
    }, label), i < STEPS.length - 1 && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 1,
        background: "var(--line)"
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 320
      }
    }, body), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 24,
        borderTop: "1px solid var(--line)",
        paddingTop: 18
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: close,
      className: "font-title",
      style: {
        background: "transparent",
        border: "none",
        color: "var(--text-dim)",
        fontSize: 11.5,
        letterSpacing: "0.1em",
        cursor: "pointer",
        textTransform: "uppercase"
      }
    }, "Skip setup"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setStep(s => Math.max(0, s - 1)),
      disabled: step === 0,
      className: "glass font-title",
      style: {
        padding: "8px 18px",
        borderRadius: 8,
        fontSize: 12,
        cursor: step === 0 ? "not-allowed" : "pointer",
        opacity: step === 0 ? 0.4 : 1
      }
    }, "Back"), last ? /*#__PURE__*/React.createElement("button", {
      onClick: finish,
      className: "font-title",
      style: {
        padding: "8px 22px",
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer",
        color: "var(--accent)",
        outline: "1px solid var(--accent)",
        background: "var(--accent-glow, transparent)"
      }
    }, "Finish") : /*#__PURE__*/React.createElement("button", {
      onClick: () => setStep(s => Math.min(STEPS.length - 1, s + 1)),
      className: "font-title",
      style: {
        padding: "8px 22px",
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer",
        color: "var(--accent)",
        outline: "1px solid var(--accent)",
        background: "transparent"
      }
    }, "Next")))));
  }
  window.AetherWizard = {
    SetupWizard
  };
})();
</script>

