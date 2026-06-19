# MASJAVAS RENDER PRO — ARCHITECTURE SPECIFICATIONS

This document outlines the core architecture, data flows, process lifecycle, and security models of MASJAVAS RENDER PRO.

---

## 1. Process Architecture

MASJAVAS RENDER PRO runs on Electron, splitting operations between two main environments:

```
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│        Renderer Process         │           │          Main Process           │
│        (UI/React/Zustand)       │           │         (Node.js/ESM)           │
│                                 │   IPC     │                                 │
│  - Modern welcome dashboard     │ ◄───────► │  - Singleton Services           │
│  - Mode Pemula/Lanjutan toggles │           │  - Process Manager (FFmpeg)     │
│  - UI state and assets layout   │           │  - safeStorage key encryption   │
└─────────────────────────────────┘           └────────────────┬────────────────┘
                                                               │
                                                               │ Stdin/Stdout (JSON-RPC)
                                                               ▼
                                              ┌─────────────────────────────────┐
                                              │         Python Sidecar          │
                                              │      (masjavas-sidecar.exe)     │
                                              │                                 │
                                              │  - Audio analysis (BPM/Beats)   │
                                              │  - Local Whisper Transcription  │
                                              └─────────────────────────────────┘
```

### Context Isolation & Preload
* The Renderer process has no direct access to Node.js APIs or disk filesystem.
* Communication goes through the `preload.cjs` script which exposes a secure IPC bridge `window.electron` containing strict invoke/receive endpoints.

---

## 2. Audio & Video Render Pipeline

The video rendering flow orchestrated by `RenderService` consists of the following steps:

```
[UI/Queue Enqueue]
        │
        ▼
[Statfs Disk Check] ──(Under 500MB free)──► [Abort & Emit Error]
        │
        ▼
[Audio Prep & Mastering] ──► Merges multi-tracks, applies mastering & limiter
        │
        ▼
[Timeline Calculation]  ──► Matches base video loop duration to audio length
        │
        ▼
[Assets Validation]     ──► Validates and registers fonts/footage
        │
        ▼
[Stage A: Audio Mix]    ──► Mixes footage background audio & primary tracks
        │
        ▼
[Stage B: Base Loop]    ──► Renders base footage loops in parallel/GPU
        │
        ▼
[Stage C: Subtitle Burn]──► Overlays dynamic spectrum/lyrics/playlist to final output
        │
        ▼
[Graceful Exit / Cleanup]─► Deletes tmpDir cache; deletes corrupt output on failure
```

---

## 3. Security Model

* **Secrets Hardening**: API Keys (`groqApiKey`, `telegramBotToken`) are encrypted at rest using OS-native credentials store via `electron.safeStorage`. On systems where safeStorage is unavailable, it gracefully falls back to masked Base64 encoding.
* **Masked Display**: Decrypted keys never enter the renderer process; only masked keys (e.g., `gsk_****abcd`) are sent to the UI.
* **Path Traversal Protection**: Subtitle filenames and paths are sanitized and escaped to prevent arguments injection in FFmpeg CLI.
