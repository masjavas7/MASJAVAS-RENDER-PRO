# MASJAVAS RENDER PRO — CHANGELOG

All notable architectural upgrades and critical fixes implemented for MASJAVAS RENDER PRO (2026 Edition).

---

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
