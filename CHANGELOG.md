# Changelog

All notable changes to **MASJAVAS RENDER PRO** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.2] - 2026-06-20

### Added
- **Quick Start Onboarding Guide**: Contextual collapsible onboarding wizard on the home screen dashboard for first-time users.
- **Beginner Mode vs. Advanced Mode Switcher**: A global layout filter toggling between a simplified 5-step workflow (Audio -> Media -> Lyrics -> Style -> Export) and full feature set dashboard options.
- **Active Render Progress Indicators**: Checklist milestones displaying active render steps (`✓ Persiapan audio`, `✓ Transkripsi lirik`, `⚡ Rendering video`).
- **Unified Health Monitor Dashboard**: Diagnostics statuses for the FFmpeg binary path, python sidecar subprocess link, and local disk space capacities in Settings.
- **Diagnostics Exporter**: Export comprehensive environment audits, system configurations, and recent log tails directly to a JSON file.
- **Crash Logging & Observability**: Configured global exceptions and unhandled promise rejections traps to write formatted traces to `crash_report.log`.
- **Atomic File Writes**: Atomic overwrite wrapper patterns utilizing a write-temp-then-rename swap strategy for projects and settings to eliminate database corruption risks.
- **Automatic Backups**: Creation of `.masjavas.bak` project backup archives prior to save/overwrite.
- **Project Auto-Recovery**: Automatic restoration of corrupted project files from their `.bak` snapshots.
- **Unified Lyrics Normalization Layer**: Helper `normalizeLyrics(input, audioDuration)` ensuring all sources (LRC/SRT imports, typed text, Whisper/Groq transcripts) conform to a validated timed lines schema.

### Fixed
- **Disk Space Calculation Bug**: Fixed a Windows-specific bug where stats block size returned `undefined` (resulting in `NaNMB` disk check warnings and blocking render queue additions). Corrected by using `stats.bsize` or `4096` fallback values.
- **Single-Word Lyrics Truncation Bug**: Resolved a bug in preview rendering (`drawLyrics`) where setting highlight mode to `"word"` truncated the sentence and displayed only one active word on screen.
- **Flickering Lyrics Bug**: Resolved lyric visibility disappearing on playhead positions aligned with brief timing gaps. Text now dims gracefully in gaps.
- **Disjoint Subtitle Event Burn-In**: Fixed a bug where word-level highlights split sentence tracks into disjoint Dialogue streams in final video renders. Now writes complete ASS dialogue event lines utilizing standard `\kf` karaoke sweeps.
- **Auto-Updater Asset Recovery**: Added auto-updater backups of original `app.asar` runs prior to applying patch modifications.

---

## [1.7.0] - 2026-05-12
- Initial Release of MASJAVAS RENDER PRO.
- Integrated video composition, audio spectrum rendering, and batch queue managers.
