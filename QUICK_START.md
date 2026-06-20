# Quick Start Guide - MASJAVAS RENDER PRO

Welcome to **MASJAVAS RENDER PRO**! This guide will walk you through installing the application, configuring your workspace, and rendering your first audio visualizer video with subtitles in less than 5 minutes.

---

## 1. Installation

1. Download the setup installer: `MASJAVAS-RENDER-PRO-Setup-v1.7.2.exe`.
2. Double-click the installer and follow the wizard.
3. Once completed, select **Jalankan MASJAVAS RENDER PRO** and click **Finish**.
4. The application will place shortcuts on your Desktop and Start Menu, installing files under your user directory (no Admin/UAC elevation needed).

---

## 2. Setting Up Your First Project

Upon opening, you will see the Onboarding Guide on the Home Screen dashboard.

1. Click **＋ Proyek Baru**.
2. Give your project a name (e.g. `My First Audio Visualizer`) and select **Studio Mode**.
3. You will be redirected to the workspace editor.

---

## 3. Creating a Video in 5 Easy Steps (Beginner Mode)

Ensure the toggle in the top bar is set to **Mode Pemula** (Beginner Mode).

### Step 1: Audio 🎧
- Click **Impor File Audio** and select your music track (MP3/WAV).

### Step 2: Media 🎬
- Click **Impor Gambar/Footage** and upload a background image or video loop.

### Step 3: Lirik 💬
- If you have an LRC/SRT file, click **⤓ Impor** to load it.
- Alternatively, select **🤖 Transkripsi** -> **Transkripsi Lirik** to let the built-in AI generate timed lines from your vocal tracks.
- To write custom lines, click **＋ Tulis Manual**. Fallback timings will automatically distribute based on the audio track duration.

### Step 4: Style 🎨
- Configure styling defaults: select a font family (e.g. *Outfit*), font size, text position, and outline thickness.
- Select **Per Kata (karaoke)** under **Mode sorotan** to activate sweeping karaoke highlight effects.

### Step 5: Ekspor 🚀
- Choose your video resolution (e.g., `1080p`) and frame rate.
- Click **＋ Tambah ke Antrian Render**.
- Click **⚡ Mulai Render** to compile the video. Once FFmpeg finishes processing, you can open and watch your completed karaoke audio visualizer video!

---

## 4. Troubleshooting & FAQs

- **Disk Space Prerequisites Show 'Kurang'**: Ensure your target export folder is located on a drive with at least 500MB of free space.
- **Whisper AI local is slow on first download**: The first execution of the local Whisper engine downloads the language models. This is done once; subsequent transcribing processes will start immediately.
- **FFmpeg path status red**: Go to **Pengaturan** (Settings) and verify the embedded FFmpeg binary path. Click **Health Check** to refresh the connection statuses.
