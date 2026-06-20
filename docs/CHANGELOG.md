# MASJAVAS RENDER PRO — CHANGELOG

All notable architectural upgrades and critical fixes implemented for MASJAVAS RENDER PRO (2026 Edition).

---

## [v1.7.2] - 2026-06-20

### Fixed
* **Disk Space Check**: Fixed a critical bug where the disk space check displayed "Kurang (NaNMB)" on Windows machines and blocked the render queue, caused by `statfs` returning an undefined fundamental block size (`frsize`). Defensive fallbacks (`stats.frsize || stats.bsize || 4096`) and explicit type casting were implemented across all disk check locations.

### Added
* **Panduan Memulai Cepat (Onboarding)**: Added a collapsible, user-friendly onboarding checklist banner on the HomeScreen for first-time users.
* **Prasyarat Render Checklist**: Introduced a checklist in the Render Panel that checks audio, footage, and disk storage space (minimum 500 MB) in real-time, preventing renders unless prerequisites are met.
* **Step-by-Step Progress Checklist**: Integrated sequential status checkmarks (`✓ Persiapan audio`, `✓ Lirik/Subtitle`, `⚡ Rendering video`) next to the active progress bar during rendering.
* **Settings Health Monitor Panel**: Created a system status monitoring panel displaying real-time green/red health indicators for FFmpeg, Sidecar, and storage space.
* **Export Diagnostics Option**: Added a button to export secure diagnostics (including hardware specs, service status, settings, and recent render/crash log tails) to a JSON file in the user's Documents folder.
* **Simulated Auto-Updater**: Implemented file-based auto-updater architecture that checks for new package versions online, automatically backs up `app.asar` to `app.asar.bak`, and supports rolling back in case of startup failures.
* **Automatic Project Backups & Recovery**: Configured `ProjectService` to generate `.masjavas.bak` backups upon save, with automatic recovery from the backup if a project file is corrupted.
* **Uncaught Exception & Rejection Logging**: Enabled main process crash reporter writing to `crash_report.log` for background diagnostic analysis.

## [v1.7.1] - 2026-06-20

### Added
* **Render Mutex Guard**: Added `isRendering` flag lock inside `RenderService.render` to prevent resource-heavy concurrent render execution.
* **Pre-Render Disk Check**: Added automatic validation of free disk space (requiring at least 500 MB) in the `userData` directory before launching any render.
* **Sidecar Spawning Lock**: Introduced `startPromise` lock in `SidecarService.start` to serialize concurrent requests and eliminate Python orphan process leaks.
* **Atomic File Saving**: Implemented write-temp-then-rename pattern for `ProjectService.save()`, `ProjectService.store()`, and `ConfigService.flush()` to prevent file corruption during crashes.
* **LRU Cache Eviction**: Added a 200-entry maximum size limit and insertion-order update to `ProbeService.probeCache` to resolve memory leaks.
* **Groq Concurrency Rate-Limiter**: Restricted `GroqService.transcribeMany` parallel transcription tasks to 3 concurrent requests to avoid HTTP 429 rate limit errors.
* **Telegram Secrets Encryption**: Extended `electron.safeStorage` encryption to the Telegram bot token settings.

### Changed
* **Async I/O in main process**: Replaced synchronous blocking `node_fs.statSync` with asynchronous `node_fs.promises.stat` inside `GroqService.transcribe` to resolve main event-loop freezes.
* **Graceful FFmpeg Termination**: Modified `RenderService.cancel()` to send `"q"` to stdin and `SIGTERM` first, with a fallback to `SIGKILL` after 5 seconds.
* **Render Error & Cancel Cleanup**: Ensured automatic deletion of `tmpDir` on error/cancel, and removed corrupted partial output files on cancel/failure.

### Removed
* **Dead Code**: Cleaned up the unused beats map expression statement in `buildBeatEffectFilter` (line 2418).
