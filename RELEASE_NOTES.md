# Release Notes - MASJAVAS RENDER PRO v1.7.2

We are excited to announce the production release of **MASJAVAS RENDER PRO v1.7.2**, featuring security hardening, system observability logging, crash recovery shields, installer compilation, and a fully repaired subtitle and lyrics processing pipeline.

## Release Summary

This update focuses on making the application highly reliable, user-friendly, and stable in production environments. Key achievements include correcting the preview and render burn-in bugs for lyrics/subtitles, fixing disk-space calculation errors on Windows, adding a beginner-friendly layout interface, and building a professional desktop installation package.

---

## Key Highlights

### 1. Subtitle & Lyrics Pipeline Repair
We resolved the long-standing bug where lyrics were truncated or failed to render fully:
- **Unified Normalization (`normalizeLyrics`)**: Restructures and aligns imported LRC/SRT subtitle files, typed raw text, and Whisper/Groq transcripts into a standardized timed lines schema.
- **Full Preview Render**: Displays full-sentence lyrics scrollable on playhead positions (karaoke highlights per word are shown seamlessly when selected, rather than truncating other words).
- **Karaoke Video Burn-In**: Employs standard ASS `\kf` karaoke tags within single dialogue events, ensuring FFmpeg burns in the entire timed sentences smoothly.

### 2. Beginner Mode vs. Advanced Mode
- **Beginner Mode**: Designed for novice content creators. Simplifies the sidebar navigation, providing a guided 5-step video creation layout: **Audio** 🎧 → **Media** 🎬 → **Lirik** 💬 → **Style** 🎨 → **Ekspor** 🚀.
- **Advanced Mode**: Designed for power users, unlocking all 12 options for visualizers, layers, particles, presets, and customized overlays.

### 3. Release Hardening & Recovery Shields
- **Atomic File Saving**: Minimizes data corruption by writing files to `.tmp` files before renaming them atomically.
- **Auto-Recovery**: Automatic backup creation (`.bak`) before saving. If database load/read corruption is encountered, the app automatically recovers your progress from the backup snapshot.
- **Disk Check Accuracy**: Corrected the `NaNMB` disk-space display bug on Windows. Real-time disk availability calculations now display correctly, enabling render queue additions without issues.

### 4. Diagnostics & Observability
- **Crash Log Trap**: Formatted crash stack traces are saved to `userData/logs/crash_report.log`.
- **Diagnostics Exporter**: Collects system specifications, GPU hardware capabilities, sidecar process states, and recent log tails into a single JSON file.
- **Health Indicators**: Real-time status lights in Settings for FFmpeg, python sidecar link, and disk storage.

### 5. Desktop Windows Installer
- Replaces portable zip extraction with a professional, lightweight setup wizard (`MASJAVAS-RENDER-PRO-Setup-v1.7.2.exe`) which registers uninstall handles, places start menu shortcuts, and configures UAC-free single-user path permissions.

---

## Verification Checksum

- **Setup Installer**: `MASJAVAS-RENDER-PRO-Setup-v1.7.2.exe`
- **SHA-256 Checksum**: `5403B237FE5709AAF233C99E059524418FB7E67D0ED38C2ADA57C71565556C39`
