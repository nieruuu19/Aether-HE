(() => {
/* ============================================================
   Settings workspace — app configuration & profile management.
   Exports window.AetherWorkspaces.SETTINGS_WIDGETS — an array of widget descriptors:
     { id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }
   Each render() reads/calls ONLY ctx.* (state + handlers app.jsx passes down).
   ============================================================ */
const { useState, useEffect } = React;
const S = window.AetherSections || {};
const Slider = S.Slider, Chip = S.Chip, SubTabs = S.SubTabs, ToolbarButton = S.ToolbarButton;
const I = window.AetherIcons || {};
const ICheck = I.ICheck, IPlus = I.IPlus, ITrash = I.ITrash, IEdit = I.IEdit,
      IDownload = I.IDownload, IRefresh = I.IRefresh, ISettings = I.ISettings;

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
    deleteProfile,
  } = ctx;
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [toast, setToast] = useState(null);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const handleAdd = () => {
    if (addProfile) {
      addProfile();
      flash("Profile added");
    }
  };

  const handleSwitch = (id) => {
    if (switchProfile) {
      switchProfile(id);
    }
  };

  const handleStartEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  const handleSaveEdit = (id) => {
    if (editName.trim() && renameProfile) {
      renameProfile(id, editName.trim());
      setEditId(null);
      flash(`Renamed to "${editName.trim()}"`);
    }
  };

  const handleDuplicate = (id) => {
    if (duplicateProfile) {
      duplicateProfile(id);
      flash("Profile duplicated");
    }
  };

  const handleDelete = (id) => {
    if (deleteProfile && profiles.length > 1) {
      deleteProfile(id);
      flash("Profile deleted");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-2">
          Profile Management
        </div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="text-[13px] text-[var(--text)]">{profiles.length} profile{profiles.length !== 1 ? "s" : ""}</div>
          <button onClick={handleAdd}
            className="px-2.5 h-8 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[10.5px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25">
            {IPlus && <span className="inline mr-1">{IPlus && "+"}</span>}Add
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {profiles.map(p => {
          const isActive = activeId === p.id;
          const isEditing = editId === p.id;
          return (
            <div key={p.id} className={`rounded-lg border p-3 transition-all ${
              isActive
                ? "border-[var(--accent)]/50 bg-[var(--accent)]/[0.06]"
                : "border-[var(--line)] bg-white/[0.02]"
            }`}>
              <div className="flex items-center justify-between gap-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit(p.id);
                      if (e.key === "Escape") setEditId(null);
                    }}
                    className="flex-1 h-7 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-2 text-[12px] text-[var(--text)] font-display outline-none"
                    autoFocus
                  />
                ) : (
                  <button onClick={() => handleSwitch(p.id)}
                    className={`flex-1 text-left px-2 h-7 rounded-md border transition-all ${
                      isActive
                        ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "border-transparent bg-white/[0.02] text-[var(--text)] hover:border-[var(--line)]"
                    } font-display text-[12px]`}>
                    {p.name || "Untitled"}
                    {isActive && <span className="ml-2 text-[10px]">✓</span>}
                  </button>
                )}
                <div className="flex items-center gap-1">
                  {isEditing ? (
                    <>
                      <button onClick={() => handleSaveEdit(p.id)}
                        className="w-6 h-6 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center text-[11px]">
                        ✓
                      </button>
                      <button onClick={() => setEditId(null)}
                        className="w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] flex items-center justify-center text-[11px]">
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleStartEdit(p.id, p.name || "Untitled")}
                        className="w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] flex items-center justify-center text-[10px]"
                        title="Rename">
                        {IEdit ? "✎" : "E"}
                      </button>
                      <button onClick={() => handleDuplicate(p.id)}
                        className="w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] flex items-center justify-center text-[9px]"
                        title="Duplicate">
                        ◈
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={profiles.length <= 1}
                        className="w-6 h-6 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-rose-400/40 hover:text-rose-300 disabled:opacity-40 flex items-center justify-center text-[10px]"
                        title="Delete">
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {toast && (
        <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--accent)]">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}

/* ===== Theme widget ===== */
function ThemeWidget(ctx) {
  const {
    theme = "dark",
    setTheme,
    setThemeOpen,
  } = ctx;

  const themes = [
    { id: "dark", label: "Dark", desc: "Dim background, bright accents" },
    { id: "light", label: "Light", desc: "Bright background, muted accents" },
    { id: "auto", label: "Auto", desc: "Match system preference" },
  ];

  return (
    <div>
      <div className="font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3">
        Appearance
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {themes.map(t => (
          <button key={t.id} onClick={() => setTheme && setTheme(t.id)}
            className={`text-left rounded-lg border p-2.5 transition-all ${
              theme === t.id
                ? "border-[var(--accent)]/50 bg-[var(--accent)]/[0.06]"
                : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
            }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-[12px] text-[var(--text)]">{t.label}</div>
                <div className="font-mono text-[10px] text-[var(--text-faint)] mt-0.5">{t.desc}</div>
              </div>
              {theme === t.id && <span className="text-[var(--accent)]">✓</span>}
            </div>
          </button>
        ))}
      </div>

      <button onClick={() => setThemeOpen && setThemeOpen(true)}
        className="w-full h-9 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 transition-all">
        Customize Colors
      </button>
    </div>
  );
}

/* ===== System widget: launch behaviour (Windows) =====
   Two independent toggles, both read/written through the bridge:
     Start on launch  → HKCU\...\Run entry (get_autostart / set_autostart)
     Start minimized  → settings.json `startMinimized` (get_tray_prefs /
                        set_start_minimized): the sign-in (autostart) launch
                        begins hidden in the tray with the lighting running;
                        opening Aether yourself always shows the window.
   The widget hides itself on platforms where neither is supported. */
const Toggle = ({ on, onClick, label, desc }) => (
  <div className="flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-white/[0.02] p-2.5">
    <div className="min-w-0">
      <div className="font-display text-[12px] text-[var(--text)]">{label}</div>
      <div className="font-mono text-[10px] text-[var(--text-faint)] mt-0.5 leading-snug">{desc}</div>
    </div>
    <button onClick={onClick} role="switch" aria-checked={on} aria-label={label}
      className={`relative w-12 h-6 rounded-full border transition-colors shrink-0
                  ${on ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-[rgba(5,11,14,0.5)] border-[var(--line)]"}`}>
      <span className={`absolute top-0.5 rounded-full transition-all
                        ${on ? "left-[26px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-[var(--text-faint)]"}`}
            style={{ width: 18, height: 18 }}/>
    </button>
  </div>
);

function SystemWidget() {
  const [autostart, setAutostart] = useState({ supported: false, enabled: false });
  const [tray, setTray] = useState({ supported: false, startMinimized: false });
  const [err, setErr] = useState("");

  // The bridge can mount after first paint (WebView2) — poll until it answers
  // once, then stop; both reads are cheap registry/JSON lookups.
  useEffect(() => {
    let cancelled = false, done = false;
    const probe = () => {
      const api = window.pywebview?.api;
      if (!api || done) return;
      done = true;
      if (api.get_autostart) api.get_autostart().then(r => {
        if (!cancelled && r && r.ok) setAutostart({ supported: !!r.supported, enabled: !!r.enabled });
      }).catch(() => {});
      if (api.get_tray_prefs) api.get_tray_prefs().then(r => {
        if (!cancelled && r && r.ok) setTray({ supported: !!r.supported, startMinimized: !!r.startMinimized });
      }).catch(() => {});
    };
    probe();
    const id = setInterval(() => { probe(); if (done) clearInterval(id); }, 500);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  const flip = async (fn, next, apply, revert) => {
    apply(next); setErr("");
    const api = window.pywebview?.api;
    if (!api || !api[fn]) return;
    try {
      const r = await api[fn](next);
      if (!(r && r.ok)) { revert(); setErr((r && r.error) || "failed"); }
    } catch (e) { revert(); setErr(String(e)); }
  };
  const toggleAutostart = () => flip("set_autostart", !autostart.enabled,
    v => setAutostart(s => ({ ...s, enabled: v })),
    () => setAutostart(s => ({ ...s, enabled: !s.enabled })));
  const toggleMinimized = () => flip("set_start_minimized", !tray.startMinimized,
    v => setTray(s => ({ ...s, startMinimized: v })),
    () => setTray(s => ({ ...s, startMinimized: !s.startMinimized })));

  if (!autostart.supported && !tray.supported) {
    return (
      <div className="font-mono text-[10.5px] text-[var(--text-faint)] leading-relaxed">
        Launch options (start with the OS, start minimized to the tray) are available on Windows.
      </div>
    );
  }
  return (
    <div>
      <div className="font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3">
        Launch
      </div>
      <div className="flex flex-col gap-2">
        {autostart.supported && (
          <Toggle on={autostart.enabled} onClick={toggleAutostart} label="Start on launch"
                  desc="Open Aether automatically when you sign in to Windows." />
        )}
        {tray.supported && (
          <Toggle on={tray.startMinimized} onClick={toggleMinimized} label="Start minimized"
                  desc="When Aether starts at sign-in, keep it in the system tray with your lighting running. Opening Aether yourself always shows the window." />
        )}
      </div>
      {err && <div className="mt-2 font-mono text-[10px] text-rose-300/90">{err}</div>}
      <div className="mt-3 font-mono text-[10px] text-[var(--text-faint)] leading-relaxed">
        Closing the window keeps Aether in the tray; right-click the icon for Open, Hide window, Mini mode and Exit.
      </div>
    </div>
  );
}

/* ===== Backup/Import widget ===== */
function BackupWidget(ctx) {
  const { applyState, collectState, profiles } = ctx;
  const [message, setMessage] = useState("");

  const handleExport = () => {
    try {
      // Capture the REAL current configuration. collectState() is the exact
      // flat shape applyState() consumes on import, so export->import round-
      // trips; profiles is included so the whole saved set travels with it.
      const live = (typeof collectState === "function" && collectState()) || {};
      const state = {
        timestamp: new Date().toISOString(),
        app: "AetherHE",
        profiles: Array.isArray(profiles) ? profiles : [],
        ...live,
      };
      const json = JSON.stringify(state, null, 2);
      const blob = new Blob([json], { type: "application/json" });
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
    input.onchange = async (e) => {
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

  return (
    <div>
      <div className="font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3">
        Settings
      </div>

      <p className="text-[11.5px] text-[var(--text-faint)] leading-relaxed mb-4">
        Export or import your configuration. Backups include profiles, keymaps, lighting effects, and all settings.
      </p>

      <div className="flex flex-col gap-2">
        <button onClick={handleExport}
          className="h-9 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 transition-all">
          {IDownload ? "↓" : "Export"} Export
        </button>
        <button onClick={handleImport}
          className="h-9 rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/15 text-[var(--accent)] font-display text-[11px] uppercase tracking-[0.16em] hover:bg-[var(--accent)]/25 transition-all">
          {IDownload ? "↑" : "Import"} Import
        </button>
      </div>

      {message && (
        <div className="mt-3 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--accent)]">
          ✓ {message}
        </div>
      )}
    </div>
  );
}

/* ===== About widget ===== */
function AboutWidget(ctx) {
  const { setWizardOpen, setSubmitOpen } = ctx;
  const [version, setVersion] = useState("—");

  useEffect(() => {
    const api = window.pywebview?.api;
    if (!api?.app_version) return;
    api.app_version().then(r => {
      if (r?.ok) setVersion(r.version);
    }).catch(() => {});
  }, []);

  // Updates are disabled in this build: nothing here calls GitHub.

  const openWizard = () => {
    if (setWizardOpen) setWizardOpen(true);
  };

  return (
    <div>
      <div className="font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-3">
        About
      </div>

      <div className="rounded-lg border border-[var(--line)] bg-white/[0.02] p-3 mb-4">
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">Version</span>
          <span className="font-display text-[13px] text-[var(--text)]">{version}</span>
        </div>
        <div className="font-mono text-[9px] text-[var(--text-faint)]">AetherHE Desktop Controller</div>
      </div>

      <div className="rounded-lg border border-[var(--line)] bg-white/[0.02] p-3 mb-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">Updates disabled</div>
        <div className="text-[11px] text-[var(--text-dim)] mt-1 leading-relaxed">
          This build never checks GitHub or downloads an installer.
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <button onClick={openWizard}
          className="h-9 rounded-md border border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] font-display text-[11px] uppercase tracking-[0.16em] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] transition-all">
          Setup Wizard
        </button>
        <button className="btn" onClick={() => setSubmitOpen && setSubmitOpen(true)}>
          Submit a board
        </button>
      </div>
    </div>
  );
}

/* ===== Widget array export ===== */
const SETTINGS_WIDGETS = [
  { id: "profiles", title: "Profiles",      default: { x: 40,  y: 32,  w: 380, h: 380 }, min: { w: 300, h: 280 }, render: ProfilesWidget },
  { id: "theme",    title: "Theme",         default: { x: 440, y: 32,  w: 340, h: 280 }, min: { w: 280, h: 220 }, render: ThemeWidget },
  { id: "backup",   title: "Backup",        default: { x: 40,  y: 432, w: 380, h: 240 }, min: { w: 300, h: 180 }, render: BackupWidget },
  { id: "about",    title: "About/Update",  default: { x: 440, y: 432, w: 340, h: 320 }, min: { w: 280, h: 240 }, render: AboutWidget },
  { id: "system",   title: "System",        default: { x: 800, y: 32,  w: 360, h: 300 }, min: { w: 300, h: 220 }, render: SystemWidget },
];

window.AetherWorkspaces = window.AetherWorkspaces || {};
window.AetherWorkspaces.SETTINGS_WIDGETS = SETTINGS_WIDGETS;
})();
