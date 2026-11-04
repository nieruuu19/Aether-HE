(() => {
/* ============================================================
   Actuation workspace — the REFERENCE workspace for the desktop-widget shell.
   Exports window.AetherWorkspaces.ACTUATION_WIDGETS — an array of widget descriptors:
     { id, title, default:{x,y,w,h}, min:{w,h}, render:(ctx)=>JSX }
   Each render() reads/calls ONLY ctx.* (state + handlers app.jsx passes down).
   Control JSX + telemetry (SwitchRender depth math, live depth) reused verbatim
   from the old ActuationSection via window.AetherSections shared primitives.
   ============================================================ */
const { useState, useEffect, useMemo } = React;
const S = window.AetherSections || {};
const Slider = S.Slider, Chip = S.Chip, SwitchRender = S.SwitchRender;
const I = window.AetherIcons || {};
const ICheck = I.ICheck, ICrosshair = I.ICrosshair;

/* Shared apply-button class + confirm toast (from ActuationSection). */
const applyBtnCls = (enabled) =>
  `px-4 h-9 rounded-md border font-display text-[12px] uppercase tracking-[0.16em] transition-all ${
    enabled
      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_18px_var(--accent-glow)] hover:brightness-110"
      : "border-[var(--line)] bg-white/[0.02] text-[var(--text-faint)] cursor-not-allowed"
  }`;
const useFlash = () => {
  const [confirm, setConfirm] = useState(null);
  const flash = (msg) => { setConfirm(msg); setTimeout(() => setConfirm(null), 2400); };
  return [confirm, flash];
};
const ConfirmToast = ({ confirm }) => confirm ? (
  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">✓ {confirm}</span>
) : null;

/* ============================================================
   Board-awareness helpers (additive — PER_BOARD_PARITY_PLAN step 6).
   ctx.board is the board-context value from components/board-context.jsx
   (locked contract). Everything falls back to today's hardcoded values when
   the board declares nothing, so the Win60 (and any unknown board) renders
   exactly as before.
   ============================================================ */
const boardCtxOf = (ctx) =>
  (ctx && ctx.board)
  || (window.AetherBoard && window.AetherBoard.UNKNOWN_BOARD)
  || { board: null, lighting: null, actuation: null,
       cap: () => undefined, capState: () => "unknown", isSupported: () => true };

/* [min, max] from a registry range with a hardcoded fallback (today's values). */
const rangeOr = (r, fallback) =>
  (Array.isArray(r) && r.length === 2 && isFinite(r[0]) && isFinite(r[1])) ? r : fallback;

/* Pull everything the board reports for one key into the widgets' local
   controls (travel, RT mode/pair, user dead band). Used when the selection
   becomes a single key, so the sliders always describe what is stored. */
const loadKeySettings = (ctx, code) => {
  const detail = (ctx.perKeyTrigger || {})[code];
  const mm = ctx.perKeyActuation ? ctx.perKeyActuation[code] : undefined;
  if (detail) {
    const tMode = Number(detail.touchMode) || 0;
    if (tMode === 2) {
      if (ctx.setRtEnabled) ctx.setRtEnabled(true);
      if (ctx.setRtPress) ctx.setRtPress(Number(detail.rt_press_mm) || 0.05);
      if (ctx.setRtRelease) ctx.setRtRelease(Number(detail.rt_release_mm) || 0.05);
      window.__rtContinuous = !!detail.rtContinuous;
      window.dispatchEvent(new CustomEvent("aether:rt-mode-change", { detail: { continuous: !!detail.rtContinuous } }));
    } else if (ctx.setRtEnabled) {
      ctx.setRtEnabled(false);
    }
    const top = detail.userDeadTop != null ? detail.userDeadTop
      : (detail.deadTop != null && detail.deadTop <= 1.0 ? detail.deadTop : 0.20);
    const bot = detail.userDeadBottom != null ? detail.userDeadBottom
      : (detail.deadBottom != null ? detail.deadBottom : 0.20);
    if (ctx.setDeadTop) ctx.setDeadTop(Number(top));
    if (ctx.setDeadBottom) ctx.setDeadBottom(Number(bot));
  } else if (ctx.setRtEnabled) {
    ctx.setRtEnabled(false);
  }
  const actVal = detail ? Number(detail.travel_mm) : Number(mm);
  if (actVal > 0 && ctx.setActuation) ctx.setActuation(actVal);
};

/* ===== Travel widget (actuation point + rapid trigger + live switch render) ===== */
function TravelWidget(ctx) {
  const {
    actuation, setActuation, rtPress, setRtPress, rtRelease, setRtRelease,
    rtEnabled, setRtEnabled, travelTest, setTravelTest, liveMax = 0,
    selectedKeys, applyActuation,
  } = ctx;
  const selectedCount = selectedKeys ? selectedKeys.size : 0;
  const [rtCont, setRtCont] = useState(() => !!window.__rtContinuous);
  const [gTravel, setGTravel] = useState(() => Number(window.__globalTravelMm) || 2.00);

  const chooseRtMode = (val) => {
    const nextCont = !!val;
    window.__rtContinuous = nextCont;
    setRtCont(nextCont);
  };

  // Restore the sliders / RT mode only when the SELECTION changes — not when
  // the read-back refreshes after Apply, or the user's toggle would be lost.
  const selectedKeySig = useMemo(
    () => (selectedKeys ? Array.from(selectedKeys).join(",") : ""),
    [selectedKeys]
  );
  useEffect(() => {
    if (!selectedKeys || selectedKeys.size === 0) return;
    const code = Array.from(selectedKeys)[selectedKeys.size - 1];
    const detail = (ctx.perKeyTrigger || {})[code] || null;
    const mm = ctx.perKeyActuation ? ctx.perKeyActuation[code] : undefined;
    const tMode = detail ? (Number(detail.touchMode) || 0) : (mm != null ? 1 : 0);
    const actVal = (detail && Number(detail.travel_mm)) || Number(mm) || gTravel;
    if (actVal > 0) setActuation(actVal);
    if (tMode === 2) {
      setRtEnabled(true);
      setRtPress(Number(detail.rt_press_mm) || 0.05);
      setRtRelease(Number(detail.rt_release_mm) || 0.05);
      const isKeyCont = !!detail.rtContinuous;
      window.__rtContinuous = isKeyCont;
      setRtCont(isKeyCont);
    } else {
      setRtEnabled(false);
    }
  }, [selectedKeySig]);

  // Discover the board-wide travel value from any key still in global mode.
  useEffect(() => {
    const trigger = ctx.perKeyTrigger || {};
    for (const detail of Object.values(trigger)) {
      if (detail && Number(detail.touchMode) === 0 && Number(detail.travel_mm) > 0) {
        const val = Number(detail.travel_mm);
        window.__globalTravelMm = val;
        setGTravel(val);
        return;
      }
    }
  }, [ctx.perKeyTrigger]);

  const scope = selectedCount > 0 ? `${selectedCount} selected key${selectedCount > 1 ? "s" : ""}` : "no keys (select some)";
  const canApply = selectedCount > 0;
  const [confirm, flash] = useFlash();

  /* Board awareness (additive): ranges from the registry actuation block when
     present (the Win60's block equals today's hardcoded values), rapid-trigger
     gated on the capability flag ("wip" = source-only = unavailable; unknown =
     fail-open = render as today). */
  const bctx = boardCtxOf(ctx);
  const bact = bctx.actuation;
  const boardName = (bctx.board && bctx.board.name) || "this board";
  const [travelMin, travelMax] = rangeOr(bact && bact.travelRange, [0.1, 3.4]);
  const [rtMin, rtMax] = rangeOr(bact && bact.rtRange, [0.01, 2.0]);
  const rtState = bctx.capState ? bctx.capState("rapidTrigger") : "unknown";
  const rtAvailable = rtState === "yes" || rtState === "unknown";
  const [busy, setBusy] = useState(false);

  const applyGlobal = async (val) => {
    const clamped = Math.max(travelMin, Math.min(travelMax, Math.round(Number(val) * 100) / 100));
    window.__globalTravelMm = clamped;
    setGTravel(clamped);
    if (!ctx.connected) return;
    const allC = (window.AetherKeyboard && window.AetherKeyboard.KB_ROWS || []).flat().map(k => k[2]);
    await ctx.apiCall("set_trigger_codes", allC, clamped, 0, 0, 98);
    if (ctx.refreshPerKeyActuation) ctx.refreshPerKeyActuation();
    flash(`Global Travel set to ${clamped.toFixed(2)}mm (all non-custom keys)`);
  };

  const handleApplyTravel = async () => {
    if (!canApply || !applyActuation || busy) return;
    window.__rtContinuous = rtCont;
    const rt = (rtEnabled && rtAvailable)
      ? ` · ${rtCont ? "Continuous RT" : "Basic RT"} press ${rtPress.toFixed(2)}mm / release ${rtRelease.toFixed(2)}mm`
      : "";
    const n = selectedCount, mm = actuation;
    setBusy(true);
    try {
      const r = await applyActuation();
      // Confirm only a write the board took (failures surface as a notice).
      if (r && r.ok) flash(`Wrote ${mm.toFixed(2)}mm to ${n} key${n === 1 ? "" : "s"}${rt}`);
    } finally { setBusy(false); }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5"
         onPointerDownCapture={() => {
           if (window.__actBoardViewMode !== "actuation") {
             window.__actBoardViewMode = "actuation";
             window.dispatchEvent(new CustomEvent("aether:board-view-mode", { detail: "actuation" }));
           }
         }}>
      {/* Live switch render */}
      <div className="glass p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]">Travel Test</span>
          <button onClick={() => setTravelTest(!travelTest)}
            className={`relative w-10 h-5 rounded-full border transition-colors
                        ${travelTest ? "bg-[var(--accent)]/30 border-[var(--accent)]/60" : "bg-white/[0.04] border-[var(--line)]"}`}>
            <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all
                              ${travelTest ? "left-[20px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" : "left-0.5 bg-slate-400"}`}/>
          </button>
        </div>
        <SwitchRender depth={travelTest ? liveMax : 0} actuation={actuation}/>
      </div>
      {/* Controls */}
      <div>
        <div className="mb-5 inline-flex items-center gap-2 px-3 h-7 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.06]">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)]">Applying to</span>
          <span className="font-display text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">{scope}</span>
        </div>
        <div className="mb-5">
          <div className="rounded-xl border border-[var(--line)] bg-white/[0.015] p-3.5 space-y-2.5 mb-2">
            <div className="flex items-center justify-between">
              <span className="font-display text-[11.5px] uppercase tracking-[0.16em] text-[var(--text)] font-semibold">Global Travel</span>
              <button type="button" onClick={() => applyGlobal(gTravel)}
                className="px-2.5 py-1 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--accent)] transition">
                Apply Global
              </button>
            </div>
            <p className="text-[11px] text-[var(--text-faint)] leading-relaxed">
              Sets the default trigger travel for all unconfigured keys (not displayed on keycaps).
            </p>
            <Slider label="Global Trigger Travel" value={gTravel} min={travelMin} max={travelMax}
                    step={0.01} unit="mm" onChange={(v) => setGTravel(Math.round(v * 100) / 100)}/>
          </div>
          <Slider label="Key Trigger Travel" value={actuation} min={travelMin} max={travelMax} step={0.01} unit="mm" onChange={setActuation}/>
        </div>
        {rtAvailable ? (
          <>
            <label className="flex items-center gap-2 cursor-pointer select-none mb-3">
              <span className={`w-4 h-4 rounded border grid place-items-center transition
                                ${rtEnabled ? "border-[var(--accent)] bg-[var(--accent)]/20" : "border-[var(--line)] bg-white/[0.02]"}`}
                    onClick={() => setRtEnabled(!rtEnabled)}>
                {rtEnabled && ICheck && <ICheck size={10} className="text-[var(--accent)]"/>}
              </span>
              <input type="checkbox" checked={rtEnabled} onChange={(e) => setRtEnabled(e.target.checked)} className="sr-only"/>
              <span className="font-display text-[11.5px] uppercase tracking-[0.16em] text-[var(--text)]">Rapid Trigger</span>
              {Chip && <Chip color="accent">RT</Chip>}
            </label>
            <p className="text-[11.5px] text-[var(--text-faint)] leading-relaxed mb-4">
              Rapid Trigger dynamically actuates and resets your key based on your intent — perfect for counter-strafing and rebound presses.
            </p>
            {rtEnabled && (
              <div className="mt-4 p-4 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/[0.05] space-y-4">
                <div className="flex flex-col gap-2 pb-3 border-b border-[var(--line)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-[11px] uppercase tracking-[0.15em] text-[var(--text)]">Rapid Trigger Mode</span>
                    <div className="inline-flex rounded-md border border-[var(--line)] bg-black/30 p-0.5 gap-1">
                      <button type="button" onClick={() => chooseRtMode(false)}
                        className={`px-2.5 py-1 rounded text-[10.5px] font-mono uppercase tracking-[0.12em] transition ${!rtCont
                          ? "bg-[var(--accent)] text-black font-semibold shadow-sm" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`}>
                        Basic RT
                      </button>
                      <button type="button" onClick={() => chooseRtMode(true)}
                        className={`px-2.5 py-1 rounded text-[10.5px] font-mono uppercase tracking-[0.12em] transition ${rtCont
                          ? "bg-[var(--accent)] text-black font-semibold shadow-sm" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`}>
                        Continuous RT
                      </button>
                    </div>
                  </div>
                  <span className="text-[11px] text-[var(--text-faint)]">
                    {rtCont
                      ? "Continuous RT: active across the full keystroke (0.10mm–3.40mm) until the key is completely released."
                      : "Basic RT: actuates at your actuation point and immediately resets as soon as the key rises above it."}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <Slider label="Press Sensitivity" value={rtPress} min={rtMin} max={rtMax} step={0.01} unit="mm" onChange={setRtPress}/>
                  <Slider label="Release Sensitivity" value={rtRelease} min={rtMin} max={rtMax} step={0.01} unit="mm" onChange={setRtRelease}/>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Unavailable — same info-box idiom as Dead Band / Switch / Calibration
             (and the pre-existing Polling readout): bordered ink card, mono body. */
          <div className="mb-4 p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-display text-[11.5px] uppercase tracking-[0.16em] text-[var(--text-dim)]">Rapid Trigger</span>
              {Chip && <Chip color="accent">RT</Chip>}
            </div>
            <p className="font-mono text-[11px] text-[var(--text-dim)] leading-relaxed">
              {rtState === "wip"
                ? `Rapid trigger is not yet available on ${boardName} — its protocol is known only from vendor driver source and has not been verified on hardware, so Aether will not drive it.`
                : `${boardName} does not support rapid trigger.`}
            </p>
          </div>
        )}
        <div className="mt-6 flex items-center gap-3">
          <button onClick={handleApplyTravel} disabled={!canApply || busy} className={applyBtnCls(canApply && !busy)}>
            {busy ? "Writing…" : <>Apply to {selectedCount || 0} key{selectedCount === 1 ? "" : "s"}</>}
          </button>
          {confirm ? <ConfirmToast confirm={confirm}/>
            : <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                {canApply ? "writes only the selected keys" : "select keys on the board to enable"}
              </span>}
        </div>
      </div>
    </div>
  );
}

/* ===== Dead Band widget ===== */
function DeadBandWidget(ctx) {
  const { deadTop, setDeadTop, deadBottom, setDeadBottom, selectedKeys, applyDeadband } = ctx;
  const selectedCount = selectedKeys ? selectedKeys.size : 0;
  const [confirm, flash] = useFlash();

  /* Board awareness (additive). deadzoneScope "global" means the dead zones
     live in ONE whole-board config table — a per-key control CANNOT work on
     that hardware, so the widget becomes a single board-wide control. The
     Win60 declares "per-key" (and unknown boards declare nothing), so both
     take the original per-key path unchanged. */
  const bctx = boardCtxOf(ctx);
  const bact = bctx.actuation;
  const boardName = (bctx.board && bctx.board.name) || "this board";
  const globalScope = !!(bact && bact.deadzoneScope === "global");
  const [dzMin, dzMax] = rangeOr(bact && bact.deadzoneRange, [0.0, 1.0]);
  const dzState = bctx.capState ? bctx.capState("deadzone") : "unknown";
  const canApply = globalScope ? true : selectedCount > 0;

  // Basic RT owns the press dead band (firmware locks it to travel - 0.01mm),
  // so the press slider must not pretend it can write while that mode is on.
  const isBasicRtLocked = useMemo(() => {
    if (!selectedKeys || selectedKeys.size === 0) return false;
    const trig = ctx.perKeyTrigger || {};
    for (const code of selectedKeys) {
      const t = trig[code];
      if (t && Number(t.touchMode) === 2 && !t.rtContinuous) return true;
    }
    return false;
  }, [selectedKeys, ctx.perKeyTrigger]);

  const selKeySig = useMemo(
    () => (selectedKeys ? Array.from(selectedKeys).join(",") : ""),
    [selectedKeys]
  );
  useEffect(() => {
    if (!selectedKeys || selectedKeys.size === 0) return;
    const code = Array.from(selectedKeys)[selectedKeys.size - 1];
    const t = (ctx.perKeyTrigger || {})[code];
    if (!t) return;
    const topVal = t.userDeadTop != null ? t.userDeadTop
      : (t.deadTop != null && t.deadTop <= 1.0 ? t.deadTop : 0.20);
    const botVal = t.userDeadBottom != null ? t.userDeadBottom
      : (t.deadBottom != null ? t.deadBottom : 0.20);
    if (setDeadTop) setDeadTop(Number(topVal));
    if (setDeadBottom) setDeadBottom(Number(botVal));
  }, [selKeySig]);

  const activateDeadbandView = () => {
    if (window.__actBoardViewMode !== "deadband") {
      window.__actBoardViewMode = "deadband";
      window.dispatchEvent(new CustomEvent("aether:board-view-mode", { detail: "deadband" }));
    }
  };

  const handleApplyDead = async () => {
    activateDeadbandView();
    if (!canApply || !applyDeadband) return;
    const top = deadTop ?? 0.20, bot = deadBottom ?? 0.20;
    window.__savedContDeadTop = top;
    window.__savedContDeadBottom = bot;
    const r = await applyDeadband(top, bot);
    if (r && r.ok)
      flash(`Wrote dead band ${top.toFixed(2)}/${bot.toFixed(2)}mm to ${globalScope ? "the whole board" : `${selectedCount} key${selectedCount === 1 ? "" : "s"}`}`);
  };

  const handleResetDefaultDead = async () => {
    activateDeadbandView();
    if (setDeadTop) setDeadTop(0.20);
    if (setDeadBottom) setDeadBottom(0.20);
    if (selectedCount > 0 && applyDeadband) {
      await applyDeadband(0.20, 0.20);
      flash(`Reset dead band to 0.20mm (${selectedCount} key${selectedCount === 1 ? "" : "s"})`);
    } else {
      const allC = (window.AetherKeyboard && window.AetherKeyboard.KB_ROWS || []).flat().map(k => k[2]);
      if (ctx.connected && ctx.apiCall) {
        await ctx.apiCall("set_deadband_codes", allC, 0.20, 0.20);
        if (ctx.refreshPerKeyActuation) await ctx.refreshPerKeyActuation();
      }
      flash(`Reset dead band to 0.20mm (${allC.length} keys)`);
    }
  };

  /* Capability gate: "wip" = decoded from vendor source only, never proven on
     hardware — do not drive it. The Win60 flag is a hard true (and unknown
     boards fail open), so this branch never renders there. */
  if (dzState === "wip" || dzState === "no") {
    return (
      <div>
        <p className="text-[12px] text-[var(--text-dim)] mb-4">
          Configure the dead-band region near the keycap's rest and bottom-out positions — noise inside this band is ignored.
        </p>
        <div className="p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed">
          {dzState === "wip"
            ? `Dead-band control is not yet available on ${boardName} — its protocol is known only from vendor driver source and has not been verified on hardware, so Aether will not drive it.`
            : `${boardName} does not support dead-band configuration.`}
        </div>
      </div>
    );
  }

  return (
    <div onPointerDownCapture={activateDeadbandView}>
      <p className="text-[12px] text-[var(--text-dim)] mb-4">
        To prevent miscontact or broken contact on selected keys, you are advised to set the deadzone to{" "}
        <span className="text-[var(--accent)] underline font-semibold cursor-pointer" onClick={handleResetDefaultDead}>0.2mm</span>
        {globalScope ? " — on this board the values apply to every key at once." : "."}
      </p>
      {globalScope && (
        <div className="mb-5 inline-flex items-center gap-2 px-3 h-7 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.06]">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)]">Scope</span>
          <span className="font-display text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">Whole board · every key</span>
        </div>
      )}
      {isBasicRtLocked && (
        <div className="mb-4 px-3 py-2 rounded-lg border border-amber-400/40 bg-amber-500/10 font-mono text-[11px] text-amber-200">
          Press (Trigger) dead band is locked while Basic RT is applied on the selected key. Disable Rapid Trigger or apply Continuous RT to unlock and restore press dead band.
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        <div className={isBasicRtLocked ? "opacity-50 pointer-events-none select-none" : ""}>
          <Slider label={isBasicRtLocked ? "Press (Trigger) [Locked]" : "Press (Trigger)"}
                  value={deadTop ?? 0.20} min={dzMin} max={dzMax} step={0.01} unit="mm"
                  onChange={(v) => {
                    if (!isBasicRtLocked) {
                      window.__savedContDeadTop = v;
                      setDeadTop(v);
                    }
                  }}/>
        </div>
        <div>
          <Slider label="Release (Reset)" value={deadBottom ?? 0.20} min={dzMin} max={dzMax} step={0.01} unit="mm"
                  onChange={(v) => {
                    window.__savedContDeadBottom = v;
                    setDeadBottom(v);
                  }}/>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <button onClick={handleApplyDead} disabled={!canApply} className={applyBtnCls(canApply)}>
          {globalScope ? "Apply to whole board" : <>Apply to {selectedCount || 0} key{selectedCount === 1 ? "" : "s"}</>}
        </button>
        <button type="button" onClick={handleResetDefaultDead}
          className="px-3 h-9 rounded-md border border-[var(--line)] bg-white/[0.03] hover:border-[var(--accent)]/50 font-display text-[11px] uppercase tracking-[0.14em] text-[var(--text-dim)] hover:text-[var(--text)] transition">
          Default (0.20mm)
        </button>
        {confirm ? <ConfirmToast confirm={confirm}/>
          : <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
              {globalScope ? "one pair of values for every key — key selection is ignored"
                : canApply ? "writes only the selected keys" : "select keys on the board to enable"}
            </span>}
      </div>
    </div>
  );
}

/* ===== Switch widget ===== */
const SWITCHES = [
  { id: "hm1", name: "HM1", sub: "Magnetic Switch", dot: "#3b82f6",
    maker: "Gateron", travel: "4.0 mm", force: "30 gf", range: "0.1 – 4.0 mm", poles: "Single", life: "100 M" },
  { id: "hh1", name: "HH1", sub: "Magnetic Switch", dot: "#a3a300",
    maker: "Gateron", travel: "3.5 mm", force: "40 gf", range: "0.1 – 3.5 mm", poles: "Single", life: "100 M" },
  { id: "cy1", name: "CY1", sub: "Magnetic Switch", dot: "#cbd5e1",
    maker: "KZZI",    travel: "3.4 mm", force: "35 gf", range: "0.1 – 3.4 mm", poles: "Single", life: "80 M" },
  { id: "tc1", name: "TC1", sub: "TTC Kom",         dot: "#c026d3",
    maker: "TTC",     travel: "3.6 mm", force: "45 gf", range: "0.2 – 3.6 mm", poles: "Dual",   life: "100 M" },
];
function SwitchWidget(ctx) {
  const { switchId, handlePickSwitch, perKeyTrigger, connected,
          refreshPerKeyActuation } = ctx;
  const [reading, setReading] = useState(false);

  /* Board awareness (additive): the switch/axis list comes from the registry
     actuation block when the board declares one. The Win60's registry list
     carries the same four ids as the hardcoded list below, and matching ids
     keep the hardcoded display fields verbatim — so the Win60 renders
     byte-identically. A board that declares an EMPTY list (axis ids never
     verified on hardware) gets an honest explanation instead of a picker.
     No board data at all -> today's hardcoded list (fail-open). */
  const bctx = boardCtxOf(ctx);
  const bact = bctx.actuation;
  const boardName = (bctx.board && bctx.board.name) || "this board";
  let switchList = SWITCHES;
  if (bact && Array.isArray(bact.switches) && bact.switches.length) {
    switchList = bact.switches.map(s => {
      const legacy = SWITCHES.find(x => x.id === s.id);
      return legacy ? { ...s, ...legacy } : s;
    });
  }
  const defaultId = (switchList[0] && switchList[0].id) || "hm1";
  // Keys the firmware has never reassigned keep L_AXIS 0 but still run the
  // switch the board shipped with (Yongchun on the WIN 68 HE Max) — axis 0 is
  // that switch, not "none".
  const factorySwitch = (bact && bact.defaultSwitch
    && switchList.find(s => s.id === bact.defaultSwitch)) || null;

  /* What the keys actually run, read back from the board. The saved id is
     only what was last clicked here; L_AXIS per key is what the firmware
     stores, so that wins whenever the board has reported. */
  const boardRead = useMemo(() => {
    const byCode = new Map();
    switchList.forEach(s => { if (s.code != null) byCode.set(Number(s.code), s); });
    const resolve = (axis) => (axis === 0 ? factorySwitch : (byCode.get(axis) || null));
    const counts = new Map();
    // verify_actuation answers with every design-code alias (hundreds for a
    // 68-key board). Count the keys the on-screen board actually draws so
    // "N keys" means physical keys, not aliases.
    const rows = (window.AetherKeyboard || {}).KB_ROWS || [];
    const drawn = rows.length ? rows.flat().map(k => k[2]) : null;
    const codes = (drawn ? drawn : Object.keys(perKeyTrigger || {}))
      .filter(c => perKeyTrigger && perKeyTrigger[c]);
    codes.forEach(c => {
      const axis = Number(perKeyTrigger[c] && perKeyTrigger[c].axis) || 0;
      counts.set(axis, (counts.get(axis) || 0) + 1);
    });
    const keys = codes.length;
    let dominantAxis = null, dominantCount = -1;
    counts.forEach((n, axis) => {
      if (n > dominantCount) { dominantCount = n; dominantAxis = axis; }
    });
    const ordered = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    return {
      keys,
      stored: keys - (counts.get(0) || 0),
      dominantAxis,
      dominant: dominantAxis == null ? null : resolve(dominantAxis),
      mixed: new Set(ordered.map(([axis]) => {
        const s = resolve(axis);
        return s ? s.id : `axis ${axis}`;
      })).size > 1,
      summary: ordered.map(([axis, n]) => {
        const s = resolve(axis);
        return `${s ? s.name : (axis ? `Axis ${axis}` : "Unset")} ${n}`;
      }).join(", "),
    };
  }, [perKeyTrigger, switchList, factorySwitch]);

  const sync = async () => {
    if (!connected || !refreshPerKeyActuation || reading) return;
    setReading(true);
    try { await refreshPerKeyActuation(); } finally { setReading(false); }
  };
  // Nothing read yet (fresh connect/open): fetch the stored axes so the picker
  // reflects the keyboard without the user having to press Sync.
  useEffect(() => {
    if (connected && boardRead.keys === 0) sync();
  }, [connected]);

  const boardId = boardRead.dominant ? boardRead.dominant.id : null;
  const savedId = switchList.some(s => s.id === switchId) ? switchId : defaultId;
  const effectiveId = boardId || savedId;
  const cur = switchList.find(s => s.id === effectiveId) || switchList[0];
  const readLine = !connected
    ? "Keyboard offline — showing the last selection, not a read-back"
    : boardRead.keys === 0
      ? "Keyboard: not read yet — press Sync to read the stored switches"
      : boardRead.mixed
        ? `Keyboard: mixed — ${boardRead.summary}`
        : boardRead.dominant
          ? (factorySwitch && boardRead.dominant.id === factorySwitch.id
              ? `Keyboard: ${boardRead.dominant.name} (factory default) on all ${boardRead.keys} keys`
              : `Keyboard: ${boardRead.dominant.name} on ${boardRead.stored} of ${boardRead.keys} keys`)
          : `Keyboard: no switch stored on any of ${boardRead.keys} keys`;

  if (bact && Array.isArray(bact.switches) && bact.switches.length === 0) {
    return (
      <div>
        <p className="text-[12px] text-[var(--text-dim)] mb-5">
          Select the magnetic switch profile installed in your board. Calibration curves load automatically.
        </p>
        <div className="p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed">
          No verified switch list for {boardName} yet — this board selects its magnetic
          axis per key by an id that has never been read back from hardware. Aether
          will not guess axis ids, so the switch picker stays disabled.
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-[12px] text-[var(--text-dim)]">
          Select the magnetic switch profile installed in your board. Calibration curves load automatically.
        </p>
        <button onClick={sync} disabled={!connected || reading}
          className="shrink-0 px-2 py-1 rounded border border-[var(--line)] bg-white/[0.03] hover:border-[var(--accent)]/50 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-dim)] hover:text-[var(--text)] transition disabled:opacity-40">
          {reading ? "Reading…" : "Sync"}
        </button>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-faint)] mb-5"
           data-testid="switch-readback">
        {readLine}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {switchList.map(s => {
          const active = effectiveId === s.id;
          return (
          <button key={s.id} onClick={() => handlePickSwitch && handlePickSwitch(s.id)}
            className={`text-left rounded-lg border p-3 transition-all
                        ${active
                          ? "border-[var(--accent)]/50 bg-[var(--accent)]/[0.06] shadow-[0_0_14px_var(--accent-glow)]"
                          : "border-[var(--line)] bg-white/[0.02] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`}>
            <div className="flex items-center gap-2">
              <div className="font-display text-[14px] text-[var(--text)]">{s.name}</div>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.dot, boxShadow: `0 0 8px ${s.dot}` }}/>
            </div>
            <div className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em] mt-0.5">{s.sub}</div>
          </button>
          );
        })}
      </div>
      <div className="rounded-xl border border-[var(--line)] bg-[rgba(5,11,14,0.5)] p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: cur.dot, boxShadow: `0 0 8px ${cur.dot}` }}/>
          <span className="font-display text-[13px] text-[var(--text)]">{cur.name}</span>
          <span className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-[0.18em]">{cur.maker} · {cur.sub}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 font-mono text-[11px]">
          {[
            ["Total Travel", cur.travel || "—"], ["Actuation Range", cur.range || "—"],
            ["Initial Force", cur.force || "—"], ["Sensing", cur.poles ? cur.poles + " Hall" : "—"],
            ["Rated Life", cur.life ? cur.life + " presses" : "—"], ["Tech", "Magnetic / Analog"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-[var(--text-faint)] uppercase tracking-[0.14em] text-[9.5px]">{k}</div>
              <div className="text-[var(--text)] mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Polling Rate widget ===== */
function PollingWidget(ctx) {
  const { polling, handleSetPolling, pollRestarting } = ctx;
  return (
    <div>
      <p className="text-[12px] text-[var(--text-dim)] mb-5">
        Switch the polling rate of the device. The keyboard will restart and disconnect briefly after switching.
      </p>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 4, 8].map(p => (
          <button key={p} onClick={() => handleSetPolling(p)} disabled={!!pollRestarting}
            className={`px-4 h-9 rounded-md border font-display text-[12px] uppercase tracking-[0.16em] transition-all
                        ${pollRestarting ? "opacity-50 cursor-wait " : ""}
                        ${polling === p
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] shadow-[0_0_18px_var(--accent-glow)]"
                          : "border-[var(--line)] bg-white/[0.02] text-[var(--text-dim)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]"}`}>
            {p}KHz
          </button>
        ))}
      </div>
      {pollRestarting && (
        <div data-testid="poll-restarting"
             className="mt-4 inline-flex items-center gap-2 px-3 h-7 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/[0.06]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse"/>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--accent)]">Restarting keyboard…</span>
        </div>
      )}
      <div className="mt-6 p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed">
        <div><span className="text-[var(--text-faint)]">current</span> · <span className="text-[var(--accent)]">{polling}000 Hz</span> · {(1/polling).toFixed(2)}ms tick</div>
        <div><span className="text-[var(--text-faint)]">latency</span> · ~{(0.5 + 1/polling).toFixed(2)}ms end-to-end</div>
      </div>
    </div>
  );
}

/* ===== Calibration widget ===== */
function CalibrationWidget(ctx) {
  const { calibrating, handleCalibrate } = ctx;

  /* Board awareness (additive): gate on the calibration capability. "wip"
     means the commands are only known from vendor driver source — never
     verified on hardware — and must not be driven. The Win60 flag is a hard
     true (and unknown boards fail open), so it renders exactly as today. */
  const bctx = boardCtxOf(ctx);
  const calState = bctx.capState ? bctx.capState("calibration") : "unknown";
  if (calState === "wip" || calState === "no") {
    const boardName = (bctx.board && bctx.board.name) || "this board";
    return (
      <div>
        <div className="font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)] mb-3">Key Calibration</div>
        <div className="p-4 rounded-lg border border-[var(--line)] bg-[rgba(5,11,14,0.5)] font-mono text-[11px] text-[var(--text-dim)] leading-relaxed max-w-2xl">
          {calState === "wip"
            ? `Calibration is not yet available on ${boardName} — its protocol is known only from vendor driver source and has not been verified on hardware, so Aether will not drive it.`
            : `${boardName} does not support key calibration.`}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="font-display text-[12px] uppercase tracking-[0.18em] text-[var(--text)] mb-3">Key Calibration</div>
      <button onClick={() => handleCalibrate && handleCalibrate(!calibrating)}
        className="px-5 h-10 rounded-md border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)] font-display text-[12px] uppercase tracking-[0.18em] shadow-[0_0_18px_var(--accent-glow)] mb-5">
        {calibrating ? "Stop Calibration" : "Start Calibration"}
      </button>
      <div className="font-display text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] mb-2">Calibration steps:</div>
      <ol className="space-y-2 text-[12px] text-[var(--text-dim)] max-w-2xl">
        {[
          "Click the Start Calibration button",
          "Press the required key (Hit bottom)",
          "Wait for the corresponding key to change color, and the key calibration is complete",
          "Click the Stop Calibration button"
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="shrink-0 grid place-items-center w-5 h-5 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-[10px]">{i+1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ===== Keyboard widget — the board itself, in actuation mode =====
   Same KeyboardPanel the Keymap tab's Key Grid uses (selection is the one
   shared ctx.selectedKeys, so a selection made here is the selection every
   other tab sees), drawn with what the FIRMWARE stores per key: actuation
   point, rapid-trigger press/release (RT keys only), and the live travel
   depth while Travel Test streams. Values come from verify_actuation's
   read-back (on connect and after every Apply), never from the sliders. */
function ActuationKeyboardWidget(ctx) {
  const {
    selectedKeys, setSelectedKeys, perKeyActuation, perKeyTrigger, liveDepths,
    actuation, calibrating, calibratedKeys, connected, refreshPerKeyActuation, travelTest,
  } = ctx;
  const KB = window.AetherKeyboard || {};
  const KeyboardPanel = KB.KeyboardPanel;
  const allCodes = useMemo(() => (KB.KB_ROWS || []).flat().map(k => k[2]), []);
  const [boardMode, setBoardMode] = useState(() => window.__actBoardViewMode || "actuation");
  const bctx = boardCtxOf(ctx);
  const switchTable = (bctx.actuation && Array.isArray(bctx.actuation.switches))
    ? bctx.actuation.switches : [];

  useEffect(() => {
    const handler = (e) => setBoardMode(e.detail || "actuation");
    window.addEventListener("aether:board-view-mode", handler);
    return () => window.removeEventListener("aether:board-view-mode", handler);
  }, []);
  const [reading, setReading] = useState(false);
  const reread = async () => {
    if (!refreshPerKeyActuation || reading) return;
    setReading(true);
    try { await refreshPerKeyActuation(); } finally { setReading(false); }
  };
  const switchView = (m) => {
    window.__actBoardViewMode = m;
    setBoardMode(m);
    // Switch View draws the switches the firmware stores, so don't reuse a
    // read taken on connect — fetch L_AXIS again when the view is opened.
    if (m === "switch" && connected) reread();
  };

  const perKeyOverride = useMemo(() => {
    const out = {};
    const act = perKeyActuation || {}, trig = perKeyTrigger || {};
    const codes = new Set([...Object.keys(act), ...Object.keys(trig)]);
    codes.forEach(c => {
      const t = trig[c];
      const tm = t ? (Number(t.touchMode) || 0) : (act[c] != null ? 1 : 0);
      const userTop = t
        ? (t.userDeadTop != null ? t.userDeadTop : (t.deadTop != null && t.deadTop <= 1.0 ? t.deadTop : 0.20))
        : 0.20;
      const userBot = t
        ? (t.userDeadBottom != null ? t.userDeadBottom : (t.deadBottom != null ? t.deadBottom : 0.20))
        : 0.20;
      out[c] = {
        actuation: act[c] != null ? act[c] : (t ? t.travel_mm : undefined),
        // A fixed-mode key keeps a stored RT pair it does not use: show none.
        rtPress: tm === 2 ? (t.rt_press_mm || 0) : 0,
        rtRelease: tm === 2 ? (t.rt_release_mm || 0) : 0,
        touchMode: tm,
        rtContinuous: !!(t && t.rtContinuous),
        deadTop: t && t.deadTop != null ? t.deadTop : 0.20,
        deadBottom: t && t.deadBottom != null ? t.deadBottom : 0.20,
        userDeadTop: userTop,
        userDeadBottom: userBot,
      };
    });
    return out;
  }, [perKeyActuation, perKeyTrigger]);

  // Per-key switch (L_AXIS) -> registry switch. Axis 0 is the board's factory
  // switch (Yongchun on the WIN 68 HE Max): the firmware stores nothing for a
  // key the user never reassigned, but the key still runs that switch.
  const factorySwitch = (bctx.actuation && bctx.actuation.defaultSwitch)
    ? switchTable.find(s => s.id === bctx.actuation.defaultSwitch) || null
    : null;
  const switchMap = useMemo(() => {
    const out = {};
    const byCode = new Map();
    switchTable.forEach(s => { if (s.code != null) byCode.set(Number(s.code), s); });
    // Only the drawn keys: perKeyTrigger also carries design-code aliases.
    allCodes.filter(c => perKeyTrigger && perKeyTrigger[c]).forEach(c => {
      const axis = Number(perKeyTrigger[c] && perKeyTrigger[c].axis) || 0;
      const s = byCode.get(axis);
      if (s && factorySwitch && s.id === factorySwitch.id) {
        // Stored 0 and "set to the factory switch" are the same wire value;
        // label them as the default rather than as an explicit assignment.
        out[c] = { axis, set: false, default: true, color: s.dot,
                   short: s.short || s.name, name: s.name };
      } else if (s) {
        out[c] = { axis, set: true, color: s.dot, short: s.short || s.name, name: s.name };
      } else if (axis === 0 && factorySwitch) {
        out[c] = { axis, set: false, default: true, color: factorySwitch.dot,
                   short: factorySwitch.short || factorySwitch.name, name: factorySwitch.name };
      } else {
        out[c] = { axis, set: axis > 0, color: axis > 0 ? "#94a3b8" : null,
                   short: axis > 0 ? `#${axis}` : "def",
                   name: axis > 0 ? `Unknown axis ${axis}` : "Default (unset)" };
      }
    });
    return out;
  }, [perKeyTrigger, switchTable, factorySwitch, allCodes]);
  const switchAssigned = useMemo(
    () => Object.values(switchMap).filter(s => s.set).length,
    [switchMap]
  );
  const switchOnDefault = useMemo(
    () => Object.values(switchMap).filter(s => s.default).length,
    [switchMap]
  );
  const known = useMemo(
    () => allCodes.filter(c => perKeyTrigger && perKeyTrigger[c]).length,
    [allCodes, perKeyTrigger]
  );
  if (typeof KeyboardPanel !== "function") {
    return <div className="font-mono text-[11px] text-[var(--text-faint)] p-2">keyboard layout unavailable</div>;
  }
  const n = selectedKeys ? selectedKeys.size : 0;

  const setSelection = (updater) => {
    setSelectedKeys(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (next && next.size === 1) loadKeySettings(ctx, Array.from(next)[0]);
      return next;
    });
  };

  const resetTravel = async () => {
    if (!connected || !ctx.apiCall) return;
    const targets = selectedKeys && selectedKeys.size > 0 ? Array.from(selectedKeys) : allCodes;
    const gMm = Number(window.__globalTravelMm) || 2.00;
    await ctx.apiCall("set_trigger_codes", targets, gMm, 0, 0, 99);
    if (refreshPerKeyActuation) await refreshPerKeyActuation();
    ctx.setRtEnabled(false);
    ctx.setActuation(gMm);
  };

  return (
    <div className="flex flex-col gap-2" data-testid="actuation-keyboard">
      <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)] flex-wrap">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded border border-[var(--line)] bg-black/30 p-0.5 mr-1">
            <button type="button" onClick={() => switchView("actuation")}
              className={`px-2 py-0.5 rounded text-[9.5px] font-mono uppercase transition ${boardMode === "actuation"
                ? "bg-[var(--accent)] text-black font-semibold" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`}>
              Actuation View
            </button>
            <button type="button" onClick={() => switchView("deadband")}
              className={`px-2 py-0.5 rounded text-[9.5px] font-mono uppercase transition ${boardMode === "deadband"
                ? "bg-[var(--accent)] text-black font-semibold" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`}>
              Dead Band View
            </button>
            <button type="button" onClick={() => switchView("switch")}
              className={`px-2 py-0.5 rounded text-[9.5px] font-mono uppercase transition ${boardMode === "switch"
                ? "bg-[var(--accent)] text-black font-semibold" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`}>
              Switch View
            </button>
          </div>
          {boardMode === "switch" ? (
            switchTable.length === 0 ? (
              <span className="text-[var(--text-dim)]">No verified switch list for this board</span>
            ) : (
              <>
                {switchTable.map(s => (
                  <span key={s.id} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: s.dot }}/>
                    {s.name}{factorySwitch && factorySwitch.id === s.id ? " (default)" : ""}
                  </span>
                ))}
                {!factorySwitch && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/20"/>Default (unset)
                  </span>
                )}
              </>
            )
          ) : boardMode === "deadband" ? (
            <>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#22c55e]"/>Top Dead Band (Press)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3b82f6]"/>Bottom Dead Band (Release)</span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#4ade80]"/>Actuation (mm)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#38bdf8]"/>RT Press</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#fb923c]"/>RT Release</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={() => setSelectedKeys(new Set(["W", "A", "S", "D"]))}
            className="px-2 py-1 rounded border border-[var(--line)] bg-white/[0.03] hover:border-[var(--accent)]/50 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-dim)] hover:text-[var(--text)] transition">
            WASD
          </button>
          <button type="button" onClick={() => setSelectedKeys(new Set(allCodes))}
            className="px-2 py-1 rounded border border-[var(--line)] bg-white/[0.03] hover:border-[var(--accent)]/50 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-dim)] hover:text-[var(--text)] transition">
            Select All
          </button>
          <button type="button" onClick={() => setSelectedKeys(new Set())}
            className="px-2 py-1 rounded border border-[var(--line)] bg-white/[0.03] hover:border-[var(--accent)]/50 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-dim)] hover:text-[var(--text)] transition">
            Uncheck
          </button>
          <button type="button" onClick={resetTravel}
            className="px-2 py-1 rounded border border-rose-400/40 bg-rose-500/10 hover:bg-rose-500/20 text-[10px] font-mono uppercase tracking-[0.12em] text-rose-300 transition">
            Reset Travel
          </button>
          <button onClick={reread} disabled={!connected || reading}
            className="px-2.5 py-1 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--accent)] transition disabled:opacity-40">
            {reading ? "Reading…" : "Sync Board"}
          </button>
        </div>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
        {n ? <span className="text-[var(--accent)]">{n} selected</span> : "click or drag keys to select"}
        {" · "}live travel {travelTest ? "on" : "off"}
        {" · "}{!connected ? "offline: values are not from the board"
          : boardMode === "switch"
            ? (known
                ? `${switchAssigned} of ${known} keys have a switch stored`
                  + (switchOnDefault
                      ? ` · ${switchOnDefault} on factory ${factorySwitch ? factorySwitch.name : "default"}`
                      : "")
                : "not read yet")
            : known ? `${known} keys read from the board` : "not read yet"}
      </div>
      {React.createElement(KeyboardPanel, {
        mode: boardMode,
        layer: "default",
        selectedKeys, setSelectedKeys: setSelection,
        // Fallbacks for keys the board has not reported yet: the slider's
        // point, and no RT (never a made-up pair).
        actuationPoint: actuation, rtPress: 0, rtRelease: 0,
        perKeyOverride,
        liveDepths,
        showPill: false,
        compact: true,
        calibrating: !!calibrating,
        calibratedCodes: calibratedKeys,
        switchMap,
      })}
    </div>
  );
}

/* ---- default placement ----
   Geometry persists per widget in localStorage and is written the first time
   a widget mounts, so every user who has opened this tab has entries for the
   five older widgets. Two cases:
     * none saved, or every saved entry is still exactly its old default
       (never moved/resized/minimized): use the new arrangement, keyboard on
       top and the controls below it. The pristine old entries are dropped so
       the shifted defaults apply (nothing the user chose is lost).
     * anything customised: keep every saved entry as it is and put the
       keyboard under the lowest widget, so it overlaps nothing. */
const OLD_DEFAULTS = {
  travel: { x: 40,  y: 32,  w: 680, h: 430 },
  dead:   { x: 736, y: 32,  w: 460, h: 300 },
  switch: { x: 736, y: 352, w: 460, h: 430 },
  poll:   { x: 40,  y: 488, w: 380, h: 300 },
  calib:  { x: 440, y: 488, w: 456, h: 360 },
};
const KB_H = 440, KB_GAP = 20;
const KB_TOP = { x: 40, y: 32, w: 1156, h: KB_H };
const shifted = (d) => ({ ...d, y: d.y + KB_H + KB_GAP });
const planLayout = (storage) => {
  const geoKey = (id) => `aether-wgt:actuation:${id}`;
  const saved = {};
  let customised = false;
  try {
    if (!storage || storage.getItem(geoKey("keyboard"))) {
      return { defaults: OLD_DEFAULTS, keyboard: KB_TOP, migrated: false };   // keyboard already placed
    }
    Object.entries(OLD_DEFAULTS).forEach(([id, d]) => {
      const raw = storage.getItem(geoKey(id));
      if (!raw) return;
      const g = JSON.parse(raw);
      saved[id] = g;
      const p = (g && g.pos) || {}, s = (g && g.size) || {};
      if (g && (g.minimized || p.x !== d.x || p.y !== d.y || s.w !== d.w || s.h !== d.h)) customised = true;
    });
  } catch { return { defaults: OLD_DEFAULTS, keyboard: KB_TOP, migrated: false }; }
  if (!customised) {
    try { Object.keys(saved).forEach(id => storage.removeItem(geoKey(id))); } catch {}
    const defaults = {};
    Object.entries(OLD_DEFAULTS).forEach(([id, d]) => { defaults[id] = shifted(d); });
    return { defaults, keyboard: KB_TOP, migrated: Object.keys(saved).length > 0 };
  }
  let bottom = 0;
  Object.entries(OLD_DEFAULTS).forEach(([id, d]) => {
    const g = saved[id];
    if (g && g.minimized) return;
    const y = g && g.pos ? g.pos.y : d.y, h = g && g.size ? g.size.h : d.h;
    bottom = Math.max(bottom, (y || 0) + (h || 0));
  });
  return { defaults: OLD_DEFAULTS, keyboard: { ...KB_TOP, y: bottom + KB_GAP }, migrated: false };
};
let LAYOUT;
try { LAYOUT = planLayout(window.localStorage); }
catch { LAYOUT = planLayout(null); }
const D = LAYOUT.defaults;

const ACTUATION_WIDGETS = [
  { id: "keyboard", title: "Keyboard",    default: LAYOUT.keyboard, min: { w: 640, h: 300 }, render: ActuationKeyboardWidget },
  { id: "travel",  title: "Travel",       default: D.travel, min: { w: 420, h: 320 }, render: TravelWidget },
  { id: "dead",    title: "Dead Band",    default: D.dead,   min: { w: 320, h: 240 }, render: DeadBandWidget },
  { id: "switch",  title: "Switch",       default: D.switch, min: { w: 340, h: 300 }, render: SwitchWidget },
  { id: "poll",    title: "Polling Rate", default: D.poll,   min: { w: 300, h: 240 }, render: PollingWidget },
  { id: "calib",   title: "Calibration",  default: D.calib,  min: { w: 340, h: 280 }, render: CalibrationWidget },
];

window.AetherWorkspaces = window.AetherWorkspaces || {};
window.AetherWorkspaces.ACTUATION_WIDGETS = ACTUATION_WIDGETS;
// Pure board-awareness helpers exported for verification (no UI reads these).
window.AetherWorkspaces.ACTUATION_BOARD = { SWITCHES, rangeOr, boardCtxOf, planLayout, OLD_DEFAULTS };
})();
