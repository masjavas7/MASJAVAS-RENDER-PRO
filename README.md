# MASJAVAS V1.7

MASJAVAS is a powerful desktop application featuring a video editor, audio visualizer, karaoke & playlist maker, batch renderer, and audio mastering tools. 

Originally built as Sonara, this application has been fully rebranded to **MASJAVAS** and is ready for production deployment.

## Features

- **Video Editor & Compositor**: Render videos with transitions, logo overlays, and custom lyrics.
- **Audio Visualizer**: Generate dynamic spectrum visualizations reactive to audio frequencies.
- **Karaoke & Lyrics Maker**: Transcribe and align lyrics (supports LRC/SRT import and automated transcription via Groq/Whisper).
- **Playlist Creator**: Organize and render audio collections into video compilations.
- **Audio Mastering Tool**: Process and normalize audio tracks using presets and TARGET LUFS levels.
- **Batch Renderer**: Enqueue multiple video/audio processing jobs for sequential batch rendering.
- **Telegram Notifications**: Receive live status updates for render queues directly on your Telegram channel/chat.

## Tech Stack

- **Frontend**: React + Vite (HTML, CSS, modern JS)
- **Backend / Desktop Wrapper**: Electron (Main process, Preload script, IPC bridge)
- **Engine / Media Processing**: Node-canvas (`@napi-rs/canvas`) & FFmpeg/FFprobe binaries
- **Design System**: Modern, responsive dark-mode dashboard interface

## Project Structure

```
Sonara-V1.7-portable/
│
└── $PLUGINSDIR/
    ├── nsis7z.dll                    # NSIS extraction helper
    ├── StdUtils.dll                  # NSIS utility plugin
    ├── System.dll                    # NSIS system plugin
    ├── app-64.7z                     # Compressed portable package
    └── app-64/                       # Uncompressed application directory
        ├── MASJAVAS V1.7.exe         # Main application executable
        ├── chrome_100_percent.pak    # Chromium resource package
        ├── locales/                  # Language localization packages
        └── resources/                # App resources
            ├── app.asar              # Packaged Electron source code archive
            ├── bin/                  # Embedded FFmpeg and FFprobe binaries
            ├── fonts/                # Built-in font library
            └── sidecar/              # Sidecar services (masjavas-sidecar.exe)
```

## How to Run (Portable Mode)

To run the portable application directly:
1. Navigate to `$PLUGINSDIR/app-64/`
2. Double-click `MASJAVAS V1.7.exe`

## Development & Build

The source code of the Electron app is compiled and packed inside `app.asar`. 
To modify the code:
1. Extract `app.asar` using `@electron/asar`:
   ```bash
   npx @electron/asar extract app.asar app
   ```
2. Make your edits inside the `app` directory.
3. Pack it back:
   ```bash
   npx @electron/asar pack app app.asar
   ```

## License and Author

Created by **Budiman YB**. Rebranded and maintained as **MASJAVAS**.
