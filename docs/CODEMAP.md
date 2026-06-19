# MASJAVAS RENDER PRO — CODEBASE CODEMAP

This document maps the architectural layout and module boundaries of the MASJAVAS RENDER PRO codebase (2026 Edition).

---

## 1. Project Directory Layout

```
MASJAVAS-RENDER-PRO/
├── docs/                             # Project Architecture & Guidelines
│   ├── CODEMAP.md                    # Codebase index and service locations
│   ├── ARCHITECTURE.md               # Main and Renderer flow specifications
│   └── CHANGELOG.md                  # Evolution log of fixes and features
└── $PLUGINSDIR/                      # Distribution and execution payload
    ├── app-64.7z                     # Compressed portable distribution
    └── app-64/                       # Unpacked binary directory
        ├── MASJAVAS V1.7.exe         # Application launcher
        └── resources/                # Assets and compiled code
            ├── app.asar              # Re-packed Electron archive
            ├── bin/                  # Embedded static FFmpeg/FFprobe binaries
            ├── fonts/                # Built-in font library (.ttf/.otf)
            ├── sidecar/              # Python audio analysis executable
            └── app/                  # Extracted source directory
                ├── package.json      # Dependency definitions
                └── out/              # Compiled bundles
                    ├── main/
                    │   └── main.js   # Main Node.js backend logic
                    └── renderer/
                        └── assets/
                            ├── index-DiCxDF5E.css  # Refactored glassmorphism UI styles
                            └── index-EefoeIIN.js   # Minified React/Zustand frontend
```

---

## 2. Main Process Service Map (`main.js`)

The `main.js` file is the central core of the application backend. Below are the key modules and their responsibilities:

| Service / Component | Line Range | Core Responsibility |
|---|---|---|
| **Constants & Defaults** | `1` - `139` | IPC channel mappings, settings defaults, key encryption/decryption helpers. |
| **ConfigService** | `140` - `183` | Reads and atomic-writes `settings.json` in user local directory. |
| **FfmpegService** | `216` - `325` | Detects static/system binaries, runs hardware encoder tests. |
| **HardwareService** | `326` - `366` | Probes system CPU, RAM, and available GPU hardware encoders. |
| **SidecarService** | `367` - `504` | Spawns, locks, and communicates via JSON-RPC with the Python sidecar. |
| **ProjectService** | `680` - `860` | Creates, atomic-saves, loads, and hydrates projects for compatibility. |
| **MediaService** | `861` - `900` | Scans directories for importable audio/video footage files. |
| **ProbeService** | `944` - `1007` | Inspects audio/video properties with a 200-entry LRU cache. |
| **LyricsService** | `1008` - `1061` | Parses lyrics files (LRC, SRT, TXT) into timestamps. |
| **GroqService** | `1069` - `1120` | Audio transcription via Groq Whisper API (rate-limited to 3 concurrent tasks). |
| **TelegramService** | `1189` - `1216` | Dispatches render status updates via secure Telegram Bot API. |
| **MasterService** | `1217` - `1320` | Midside EQ and LUFS-based audio mastering. |
| **RenderService** | `2661` - `3051` | Orchestrates the video composition and FFmpeg rendering pipeline. |
| **RenderQueueService** | `4339` - `4413` | Serializes and enqueues render projects. |
| **IPC Registry** | `4418` - `4600` | Exposes backend capabilities to renderer windows. |

---

## 3. Communication Bridge (IPC Channels)

Renderer process calls these handlers via `window.electron.ipcRenderer.invoke(channel, ...)`:

* **Settings & System Info**: `app:info`, `hardware:info`, `ffmpeg:info`, `settings:get`, `settings:set`, `app:healthCheck`, `app:exportDiagnostics`, `app:checkForUpdates`, `app:applyUpdate`.
* **Projects**: `project:new`, `project:open`, `project:save`, `project:recent`, `project:list`, `project:store`, `project:delete`.
* **Asset Scanner**: `media:scan`, `media:thumbnails`.
* **Lyrics & Audio**: `lyrics:parse`, `lyrics:transcribe`, `groq:transcribe`, `groq:testConnection`, `telegram:test`.
* **Rendering Pipeline**: `render:start`, `render:cancel`, `queue:enqueue`, `queue:get`, `queue:cancelItem`, `queue:clear`, `render:check`.

