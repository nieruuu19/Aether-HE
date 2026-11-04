"""This build is offline for updates.

The user's copy is customised, and the launch updater used to download and run
the installer (quitting Aether) whenever a newer release existed. The bridge
must refuse every update call without reaching updater.py's network paths, so
no check, download, installer launch or process exit can happen.
"""
import app_web
import updater


def _api():
    return app_web.Api.__new__(app_web.Api)


def test_check_update_returns_disabled_without_touching_github(monkeypatch):
    called = []
    monkeypatch.setattr(updater, "check_for_update",
                        lambda *a, **k: called.append(1) or {"ok": True, "update": True})
    r = _api().check_update()
    assert r["ok"] is True and r["disabled"] is True and r["update"] is False
    assert not called


def test_apply_update_refuses_without_downloading_or_quitting(monkeypatch):
    called = []
    monkeypatch.setattr(updater, "apply_update",
                        lambda *a, **k: called.append(1) or {"ok": True, "quit": True})
    r = _api().apply_update("https://example.com/AetherHE-Setup.exe", "AetherHE-Setup.exe")
    assert r["ok"] is False and r["disabled"] is True
    assert "github" in r["error"].lower()
    assert not called


def test_saved_auto_update_preference_cannot_re_enable_the_launch_flow(monkeypatch):
    a = _api()
    assert a.get_auto_update()["autoUpdate"] is False
    assert a.set_auto_update(True)["autoUpdate"] is False


def test_progress_and_version_report_updates_off():
    a = _api()
    p = a.update_progress()
    assert p["ok"] is True and p["disabled"] is True and p["phase"] == "idle"
    v = a.app_version()
    assert v["ok"] is True and v["updates"] is False
