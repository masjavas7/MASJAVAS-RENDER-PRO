"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const electron = require("electron");
const node_path = require("node:path");
const node_url = require("node:url");
const node_fs = require("node:fs");
const node_child_process = require("node:child_process");
const node_util = require("node:util");
const os = require("node:os");
const node_crypto = require("node:crypto");
const customText = require("./customText-BOXBpQRz.cjs");
const node_events = require("node:events");
const node_worker_threads = require("node:worker_threads");
const promises = require("node:fs/promises");

const logDir = node_path.join(electron.app.getPath("userData"), "logs");
node_fs.mkdirSync(logDir, { recursive: true });

function writeLog(file, text) {
  try {
    const timestamp = new Date().toISOString();
    node_fs.appendFileSync(node_path.join(logDir, file), `[${timestamp}] ${text}\n`, "utf-8");
  } catch {}
}

process.on("uncaughtException", (err) => {
  writeLog("crash_report.log", `UNCAUGHT EXCEPTION: ${err?.stack || err}`);
  console.error("Uncaught exception in main process:", err);
});

process.on("unhandledRejection", (reason) => {
  writeLog("crash_report.log", `UNHANDLED REJECTION: ${reason?.stack || reason}`);
  console.error("Unhandled rejection in main process:", reason);
});

const IPC = {
  appInfo: "app:info",
  hardwareInfo: "hardware:info",
  ffmpegInfo: "ffmpeg:info",
  sidecarPing: "sidecar:ping",
  sidecarStatus: "sidecar:status",
  settingsGet: "settings:get",
  settingsSet: "settings:set",
  projectNew: "project:new",
  projectOpen: "project:open",
  projectSave: "project:save",
  projectRecent: "project:recent",
  projectList: "project:list",
  projectStore: "project:store",
  projectDelete: "project:delete",
  projectLoadById: "project:loadById",
  dialogOpenFiles: "dialog:openFiles",
  dialogOpenFolder: "dialog:openFolder",
  dialogSaveFile: "dialog:saveFile",
  mediaScan: "media:scan",
  mediaProbe: "media:probe",
  mediaThumb: "media:thumb",
  fileToDataUrl: "file:dataUrl",
  fontsList: "fonts:list",
  lyricsParse: "lyrics:parse",
  lyricsTranscribe: "lyrics:transcribe",
  spectrumData: "spectrum:data",
  fontImport: "font:import",
  fontList: "font:list",
  audioAnalyze: "audio:analyze",
  masterPresets: "master:presets",
  masterRun: "master:run",
  masterCancel: "master:cancel",
  masterPreview: "master:preview",
  renderStart: "render:start",
  renderCancel: "render:cancel",
  renderEvent: "render:event",
  // Multi-project render queue (batch mode): enqueue projects, process sequentially.
  queueEnqueue: "queue:enqueue",
  queueGet: "queue:get",
  queueCancelItem: "queue:cancelItem",
  queueClear: "queue:clear",
  queueEvent: "queue:event",
  masterEvent: "master:event",
  groqTranscribe: "groq:transcribe",
  telegramTest: "telegram:test",
  groqTestConnection: "groq:testConnection",
  appHealthCheck: "app:healthCheck",
  appExportDiagnostics: "app:exportDiagnostics",
  appCheckForUpdates: "app:checkForUpdates",
  appApplyUpdate: "app:applyUpdate",
  renderCheck: "render:check"
};

function encryptKey(plainText) {
  if (!plainText) return "";
  try {
    if (electron.safeStorage && electron.safeStorage.isEncryptionAvailable()) {
      const encryptedBuffer = electron.safeStorage.encryptString(plainText);
      return "enc:" + encryptedBuffer.toString("base64");
    }
  } catch (e) {
    console.error("Encryption failed:", e);
  }
  return "plain:" + Buffer.from(plainText).toString("base64");
}

function decryptKey(cipherText) {
  if (!cipherText) return "";
  try {
    if (cipherText.startsWith("enc:")) {
      if (electron.safeStorage && electron.safeStorage.isEncryptionAvailable()) {
        const base64 = cipherText.slice(4);
        const buffer = Buffer.from(base64, "base64");
        return electron.safeStorage.decryptString(buffer);
      } else {
        throw new Error("Electron safeStorage is not available for decryption");
      }
    } else if (cipherText.startsWith("plain:")) {
      return Buffer.from(cipherText.slice(6), "base64").toString("utf8");
    }
  } catch (e) {
    // Treat as raw
  }
  return cipherText;
}

function maskApiKey(key) {
  if (!key) return "";
  if (key.length <= 8) return "****";
  if (key.startsWith("gsk_")) {
    return `gsk_****${key.slice(-4)}`;
  }
  return `${key.slice(0, 4)}****${key.slice(-4)}`;
}
const DEFAULTS = {
  theme: "dark",
  accent: "blue",
  ffmpegPath: "auto",
  encoderPreference: "auto",
  cacheDir: null,
  recentProjects: [],
  qualityMode: "balanced",
  groqApiKey: "",
  transcribeProvider: "whisper",
  telegramEnabled: false,
  telegramBotToken: "",
  telegramChatId: ""
};
class ConfigService {
  file = "";
  cache = null;
  async ensure() {
    if (this.file) return;
    const dir = electron.app.getPath("userData");
    await node_fs.promises.mkdir(dir, { recursive: true });
    this.file = node_path.join(dir, "settings.json");
  }
  async getAll() {
    if (this.cache) return this.cache;
    await this.ensure();
    let loaded;
    try {
      const raw = await node_fs.promises.readFile(this.file, "utf-8");
      loaded = { ...DEFAULTS, ...JSON.parse(raw) };
      this.cache = loaded;
    } catch {
      loaded = { ...DEFAULTS };
      this.cache = loaded;
      await this.flush();
    }
    return loaded;
  }
  async set(patch) {
    const current = await this.getAll();
    this.cache = { ...current, ...patch };
    await this.flush();
    return this.cache;
  }
  async addRecentProject(path) {
    const s = await this.getAll();
    const recent = [path, ...s.recentProjects.filter((p) => p !== path)].slice(0, 12);
    await this.set({ recentProjects: recent });
  }
  cacheDirPath() {
    return this.cache?.cacheDir || node_path.join(electron.app.getPath("userData"), "cache");
  }
  async flush() {
    await this.ensure();
    const tmpPath = this.file + ".tmp";
    await node_fs.promises.writeFile(tmpPath, JSON.stringify(this.cache, null, 2), "utf-8");
    await node_fs.promises.rename(tmpPath, this.file);
  }
}
const configService = new ConfigService();
const pexec$2 = node_util.promisify(node_child_process.execFile);
const __dirname$3 = node_path.dirname(node_url.fileURLToPath(require("url").pathToFileURL(__filename).href));
const exe$1 = process.platform === "win32" ? ".exe" : "";
function classifyEncoderError(e, enc) {
  const err = e;
  const isNvenc = enc.includes("nvenc");
  const vendor = isNvenc ? "NVIDIA" : enc.includes("amf") ? "AMD" : enc.includes("qsv") ? "Intel" : "GPU";
  if (err.killed || err.signal === "SIGTERM" || err.code === "ETIMEDOUT") {
    return `${vendor}: init lambat / tak merespons (timeout)`;
  }
  const s = (err.stderr || err.message || "").toLowerCase();
  if (/driver does not support|nvenc api|required.*version|minimum required|too old|api version/.test(s)) {
    return `${vendor}: driver terlalu lama untuk encoder FFmpeg ini — update driver GPU`;
  }
  if (/no.*capable.*device|no devices|cannot load (nvcuda|nvencodeapi)|nvencodeapi|openencodesession|cannot load/.test(s)) {
    return `${vendor}: perangkat encoder tak terdeteksi (driver belum terpasang?)`;
  }
  if (/not support|initializeencoder failed|unsupported|invalid (param|preset)/.test(s)) {
    return `${vendor}: GPU tak mendukung encoder ini (terlalu lama)`;
  }
  const firstLine = (err.stderr || "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean).pop();
  return firstLine ? `${vendor}: ${firstLine.slice(0, 120)}` : `${vendor}: tes encode gagal`;
}
function candidatePaths() {
  const out = [];
  const resBundled = node_path.join(process.resourcesPath || "", "bin", `ffmpeg${exe$1}`);
  const devBundled = node_path.join(__dirname$3, "..", "..", "resources", "bin", `ffmpeg${exe$1}`);
  out.push({ path: resBundled, source: "bundled" });
  out.push({ path: devBundled, source: "bundled" });
  out.push({ path: `ffmpeg${exe$1}`, source: "system" });
  return out;
}
class FfmpegService {
  info = null;
  async detect(force = false) {
    if (this.info && !force) return this.info;
    const settings = await configService.getAll();
    const candidates = candidatePaths();
    if (settings.ffmpegPath && settings.ffmpegPath !== "auto") {
      candidates.unshift({ path: settings.ffmpegPath, source: "custom" });
    }
    for (const c of candidates) {
      const isBare = c.source === "system";
      if (!isBare && !node_fs.existsSync(c.path)) continue;
      try {
        const { stdout } = await pexec$2(c.path, ["-version"], { windowsHide: true });
        const version = stdout.split("\n")[0]?.trim() || null;
        this.info = { found: true, path: c.path, version, source: c.source };
        return this.info;
      } catch {
      }
    }
    this.info = { found: false, path: null, version: null, source: "none" };
    return this.info;
  }
  async resolvedPath() {
    const info = await this.detect();
    return info.found ? info.path : null;
  }
  async probeEncoders() {
    const path = await this.resolvedPath();
    const result = {
      h264_nvenc: { ok: false },
      h264_amf: { ok: false },
      h264_qsv: { ok: false },
      libx264: { ok: true }
      // assume present; if ffmpeg exists, libx264 is virtually always built in
    };
    if (!path) return { ...result, libx264: { ok: false } };
    try {
      const { stdout } = await pexec$2(path, ["-hide_banner", "-encoders"], { windowsHide: true });
      const listedNvenc = /h264_nvenc/.test(stdout);
      const listedAmf = /h264_amf/.test(stdout);
      const listedQsv = /h264_qsv/.test(stdout);
      result.libx264 = { ok: /libx264/.test(stdout) };
      const [nvenc, amf, qsv] = await Promise.all([
        listedNvenc ? this.testEncoder(path, "h264_nvenc") : Promise.resolve({ ok: false, reason: "tidak ada di FFmpeg" }),
        listedAmf ? this.testEncoder(path, "h264_amf") : Promise.resolve({ ok: false, reason: "tidak ada di FFmpeg" }),
        listedQsv ? this.testEncoder(path, "h264_qsv") : Promise.resolve({ ok: false, reason: "tidak ada di FFmpeg" })
      ]);
      result.h264_nvenc = nvenc;
      result.h264_amf = amf;
      result.h264_qsv = qsv;
    } catch {
    }
    return result;
  }
  /**
   * Real availability test: encode a short clip with the given hardware encoder. Returns
   * ok only if ffmpeg exits 0 (the GPU + driver can actually run it). On failure, captures
   * a SHORT human reason from stderr so the UI can explain why a present GPU fell back to
   * CPU (e.g. driver too old for this FFmpeg's NVENC, no capable device, slow cold init).
   *
   * Uses ~12 yuv420p frames (a single frame can pass before the encoder session even
   * initialises) and a generous 25s timeout — first NVENC init on an older GPU/driver can
   * take several seconds, and a too-short timeout was falsely rejecting working GPUs.
   */
  async testEncoder(ffmpeg, enc) {
    try {
      await pexec$2(
        ffmpeg,
        [
          "-hide_banner",
          "-loglevel",
          "error",
          "-f",
          "lavfi",
          "-i",
          "color=c=black:s=320x240:r=30",
          "-frames:v",
          "12",
          "-pix_fmt",
          "yuv420p",
          "-c:v",
          enc,
          "-f",
          "null",
          "-"
        ],
        { windowsHide: true, timeout: 25e3 }
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, reason: classifyEncoderError(e, enc) };
    }
  }
  /** ffprobe alongside ffmpeg, if available. */
  async ffprobePath() {
    const ff = await this.resolvedPath();
    if (!ff) return null;
    if (ff === `ffmpeg${exe$1}`) return `ffprobe${exe$1}`;
    const probe = node_path.join(node_path.dirname(ff), `ffprobe${exe$1}`);
    return node_fs.existsSync(probe) ? probe : `ffprobe${exe$1}`;
  }
}
const ffmpegService = new FfmpegService();
const ENCODER_PRIORITY = [
  { id: "nvenc", label: "NVIDIA NVENC (h264_nvenc)", probeKey: "h264_nvenc" },
  { id: "amf", label: "AMD AMF (h264_amf)", probeKey: "h264_amf" },
  { id: "qsv", label: "Intel Quick Sync (h264_qsv)", probeKey: "h264_qsv" },
  { id: "x264", label: "CPU x264 (libx264)", probeKey: "libx264" }
];
class HardwareService {
  cache = null;
  async detect(force = false) {
    if (this.cache && !force) return this.cache;
    const probe = await ffmpegService.probeEncoders();
    const encoders = ENCODER_PRIORITY.map((e) => {
      const p = probe[e.probeKey] ?? { ok: false };
      return {
        id: e.id,
        label: e.label,
        available: !!p.ok,
        reason: p.ok ? void 0 : p.reason
      };
    });
    const settings = await configService.getAll();
    let selected;
    if (settings.encoderPreference !== "auto") {
      const pref = encoders.find((e) => e.id === settings.encoderPreference && e.available);
      selected = pref ? pref.id : pickAuto(encoders);
    } else {
      selected = pickAuto(encoders);
    }
    const gpuEnc = encoders.filter((e) => e.id !== "x264");
    const working = gpuEnc.find((e) => e.available);
    const failedWithReason = gpuEnc.find((e) => !e.available && e.reason && !/tidak ada di FFmpeg/.test(e.reason));
    const gpuNote = working ? `${working.label} aktif` : failedWithReason ? failedWithReason.reason : "Tak ada encoder GPU yang didukung — pakai CPU";
    this.cache = {
      cpus: os.cpus().length,
      totalMemMB: Math.round(os.totalmem() / (1024 * 1024)),
      encoders,
      selectedEncoder: selected,
      gpuNote
    };
    return this.cache;
  }
}
function pickAuto(encoders) {
  const first = encoders.find((e) => e.available);
  return first ? first.id : "x264";
}
const hardwareService = new HardwareService();
const pexec$1 = node_util.promisify(node_child_process.execFile);
const __dirname$2 = node_path.dirname(node_url.fileURLToPath(require("url").pathToFileURL(__filename).href));
const exe = process.platform === "win32" ? ".exe" : "";
class SidecarService {
  proc = null;
  pending = /* @__PURE__ */ new Map();
  nextId = 1;
  buffer = "";
  pythonCmd = null;
  startPromise = null;
  async resolvePython() {
    if (this.pythonCmd) return this.pythonCmd;
    const bundled = [
      node_path.join(process.resourcesPath || "", "sidecar", `masjavas-sidecar${exe}`),
      node_path.join(__dirname$2, "..", "..", "resources", "sidecar", `masjavas-sidecar${exe}`)
    ].find((p) => node_fs.existsSync(p));
    if (bundled) {
      this.pythonCmd = { cmd: bundled, args: [], bundled: true };
      return this.pythonCmd;
    }
    const script = [
      node_path.join(__dirname$2, "..", "..", "sidecar", "main.py"),
      node_path.join(electron.app.getAppPath(), "sidecar", "main.py")
    ].find((p) => node_fs.existsSync(p));
    if (!script) return null;
    for (const cmd of ["python", "python3", "py"]) {
      try {
        await pexec$1(cmd, ["--version"], { windowsHide: true });
        this.pythonCmd = { cmd, args: [script], bundled: false };
        return this.pythonCmd;
      } catch {
      }
    }
    return null;
  }
  async start() {
    if (this.proc) return { running: true, pythonFound: true, message: "Sidecar running" };
    if (this.startPromise) return this.startPromise;
    this.startPromise = (async () => {
      const py = await this.resolvePython();
      if (!py) {
        return {
          running: false,
          pythonFound: false,
          message: "Python sidecar not found. Audio analysis & mastering will be limited until Python (or the bundled sidecar) is available."
        };
      }
      try {
        this.proc = node_child_process.spawn(py.cmd, py.args, {
          windowsHide: true,
          env: { ...process.env, PYTHONUTF8: "1", PYTHONIOENCODING: "utf-8" }
        });
        this.proc.stdout.setEncoding("utf-8");
        this.proc.stdout.on("data", (chunk) => this.onData(chunk));
        this.proc.stderr.setEncoding("utf-8");
        this.proc.on("exit", () => {
          this.proc = null;
          for (const [, p] of this.pending) p.reject(new Error("Sidecar exited"));
          this.pending.clear();
        });
        return { running: true, pythonFound: true, message: `Sidecar started (${py.bundled ? "bundled" : py.cmd})` };
      } catch (e) {
        this.proc = null;
        return { running: false, pythonFound: true, message: `Failed to start sidecar: ${e.message}` };
      }
    })();
    return this.startPromise.finally(() => {
      this.startPromise = null;
    });
  }
  onData(chunk) {
    this.buffer += chunk;
    let idx;
    while ((idx = this.buffer.indexOf("\n")) >= 0) {
      const line = this.buffer.slice(0, idx).trim();
      this.buffer = this.buffer.slice(idx + 1);
      if (!line) continue;
      try {
        const msg = JSON.parse(line);
        const p = this.pending.get(msg.id);
        if (!p) continue;
        this.pending.delete(msg.id);
        if (msg.ok) p.resolve(msg.result);
        else p.reject(new Error(msg.error || "Sidecar error"));
      } catch {
      }
    }
  }
  async call(method, params = {}, timeoutMs = 3e4) {
    if (!this.proc) {
      const status = await this.start();
      if (!status.running) throw new Error(status.message);
    }
    const id = this.nextId++;
    const payload = JSON.stringify({ id, method, params }) + "\n";
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.proc.stdin.write(payload);
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`Sidecar timeout on "${method}"`));
        }
      }, timeoutMs);
    });
  }
  async analyze(path) {
    return await this.call("analyze_audio", { path }, 12e4);
  }
  async spectrum(path, fps, bands, maxSec = 0) {
    const res = await this.call("spectrum_data", { path, fps, bands, maxSec }, 18e4);
    return { ...res, source: "sidecar" };
  }
  /**
   * Binary spectrum for the RENDER path: the sidecar writes the float32 matrix to a temp
   * file (row-major frames×bands) and returns only the shape, which we read back as a
   * Float32Array. Avoids the JSON-string 512 MB limit so full-duration (continuous)
   * renders work at ANY length. Returns a frame accessor; `count`=0 → no data.
   */
  async spectrumBin(path, fps, bands, maxSec = 0) {
    const fs = await import("node:fs/promises");
    const os2 = await import("node:os");
    const { join: join2 } = await import("node:path");
    const out = join2(os2.tmpdir(), `masjavas_spec_${Date.now()}_${Math.random().toString(36).slice(2)}.bin`);
    const res = await this.call("spectrum_data", { path, fps, bands, maxSec, out }, 6e5);
    const count = res.frames || 0;
    let data = new Float32Array(0);
    try {
      const buf = await fs.readFile(out);
      data = new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.byteLength / 4));
    } catch {
    } finally {
      fs.unlink(out).catch(() => {
      });
    }
    const b = res.bands || bands;
    const empty = new Float32Array(b);
    const at = (f) => {
      const i = Math.max(0, Math.min(count - 1, f));
      if (count <= 0) return empty;
      return data.subarray(i * b, i * b + b);
    };
    return { fps: res.fps || fps, bands: b, count, at };
  }
  /**
   * Write the float32 spectrum matrix to a CALLER-OWNED file (not auto-deleted), for the
   * multicore path: the main process generates the bins once, workers read them. Returns
   * the shape only. Caller cleans up `outPath`.
   */
  async spectrumToBinFile(path, fps, bands, maxSec, outPath) {
    const res = await this.call("spectrum_data", { path, fps, bands, maxSec, out: outPath }, 6e5);
    return { count: res.frames || 0, bands: res.bands || bands };
  }
  async transcribe(path, model = "small", language) {
    return await this.call("transcribe", { path, model, language }, 6e5);
  }
  async masterRender(path, out, preset, targetLufs, outputGain, fadeIn = 0, fadeOut = 0) {
    return await this.call("master_render", { path, out, preset, targetLufs, outputGain, fadeIn, fadeOut }, 3e5);
  }
  async ping() {
    const status = await this.start();
    if (!status.running) return status;
    try {
      const res = await this.call("ping");
      return {
        running: true,
        pythonFound: true,
        message: `Sidecar OK${res?.version ? ` (v${res.version})` : ""}`
      };
    } catch (e) {
      return { running: false, pythonFound: true, message: `Sidecar ping failed: ${e.message}` };
    }
  }
  async status() {
    if (this.proc) return { running: true, pythonFound: true, message: "Sidecar running" };
    const py = await this.resolvePython();
    return {
      running: false,
      pythonFound: !!py,
      message: py ? "Sidecar not started yet" : "Python sidecar not found"
    };
  }
  stop() {
    if (this.proc) {
      this.proc.kill();
      this.proc = null;
    }
  }
}
const sidecarService = new SidecarService();
function showLyrics(p) {
  if (typeof p.showLyrics === "boolean") return p.showLyrics;
  return p.mode === "lyrics" || p.mode === "batch" && !!p.batch?.useLyrics;
}
function showPlaylist(p) {
  if (typeof p.showPlaylist === "boolean") return p.showPlaylist;
  return p.mode === "playlist" || p.mode === "batch" && !!p.batch?.usePlaylist;
}
function isReactive(p) {
  if (p.spectrumMode) return p.spectrumMode === "reactive";
  return p.mode !== "batch";
}
const PROJECT_VERSION = "1.1";
const baseTextStyle = {
  fontFamily: "Montserrat",
  fontSize: 54,
  color: "#ffffff",
  strokeColor: "#000000",
  strokeWidth: 2,
  shadow: true,
  opacity: 1,
  position: "bottom",
  align: "center",
  posX: 0.5,
  posY: 0.85
};
const lyricsDefault = {
  file: null,
  lines: [],
  style: { ...baseTextStyle },
  highlightColor: "#ffd54a",
  highlightMode: "word",
  animation: "fade",
  autoTranscribe: false,
  whisperModel: "small",
  whisperLanguage: "auto",
  maxSongs: 0
};
const playlistStyle = {
  ...baseTextStyle,
  fontSize: 34,
  position: "center",
  align: "left",
  activeColor: "#ffd54a",
  inactiveColor: "#cfd6df",
  showBox: false,
  boxOpacity: 0.4,
  spacing: 14,
  iconStyle: "triangle"
};
const playlistDefault = { items: [], style: playlistStyle, genCount: 0 };
const spectrumDefault = {
  enabled: false,
  preset: "modern-bars",
  position: "bottom",
  scale: 0.22,
  radius: 0.25,
  thickness: 6,
  color: "#5ad1ff",
  rgb: false,
  opacity: 1,
  glow: 0.4,
  smoothing: 0.6,
  sensitivity: 1,
  bassIntensity: 1,
  trebleIntensity: 1,
  bars: 64
};
const logoDefault = {
  enabled: false,
  path: null,
  mode: "outside",
  posX: 0.5,
  posY: 0.4,
  size: 0.22,
  opacity: 1,
  ringRadius: 0.06,
  ringThickness: 8,
  ringColor: "#5ad1ff",
  rgb: false,
  glow: 0.4,
  intensity: 1,
  bars: 72,
  ringStyle: "bars",
  logoPulse: false,
  logoBeatBounce: false,
  particles: false,
  particleStyle: "burst",
  particleColor: "#ffd24a",
  particleRgb: false,
  particleSpeed: 1,
  rotate: false,
  rotateSecPerRev: 8
};
const effectsDefault = {
  brightness: 0,
  contrast: 1,
  saturation: 1,
  warmth: 0,
  vignette: 0,
  blur: 0,
  glow: 0,
  filmGrain: 0
};
const exportDefault = {
  container: "mp4",
  vcodec: "h264",
  acodec: "aac",
  width: 1920,
  height: 1080,
  aspect: "16:9",
  fps: 30,
  bitrate: "auto",
  encoder: "auto",
  outputDir: null,
  baseSeconds: 180,
  matchAudioDuration: false,
  batchRender: false,
  batchCount: 1
};
class ProjectService {
  newProject(name, mode = "studio") {
    const now = Date.now();
    return {
      version: PROJECT_VERSION,
      id: node_crypto.randomUUID(),
      name: name || "Untitled",
      mode,
      // Unified toggles. New ('studio') projects: lyrics/playlist OFF, static spectrum.
      // Legacy modes seed the matching toggles so an explicitly-created old-mode project
      // (if any caller still passes one) behaves as before.
      showLyrics: mode === "lyrics",
      showPlaylist: mode === "playlist",
      spectrumMode: mode === "lyrics" || mode === "playlist" ? "reactive" : "static",
      filePath: null,
      createdAt: now,
      updatedAt: now,
      footage: {
        type: "image",
        source: "folder",
        items: [],
        randomCount: 4,
        pinned: [],
        used: [],
        order: [],
        loop: true,
        matchDuration: true,
        beatEffect: "none",
        beatEffectIntensity: 0.6,
        seamlessLoop: false,
        muteFootageAudio: true,
        footageVolume: 1
      },
      audio: {
        source: "folder",
        items: [],
        order: [],
        pinned: [],
        random: false,
        loop: false,
        matchDuration: true,
        mode: "merge",
        mergeCount: 0,
        shuffleEachRender: true,
        customDuration: false,
        targetMinutes: 30,
        fadeIn: 1,
        fadeOut: 3,
        preMasterPreset: "",
        mainVolume: 1,
        fx: []
      },
      lyrics: structuredClone(lyricsDefault),
      playlist: structuredClone(playlistDefault),
      batch: { useLyrics: mode === "lyrics", usePlaylist: mode === "playlist" || mode === "batch" },
      spectrum: structuredClone(spectrumDefault),
      spectrumLayers: [],
      overlayLayers: [],
      customOverlays: [],
      logo: structuredClone(logoDefault),
      effects: structuredClone(effectsDefault),
      stickers: [],
      export: structuredClone(exportDefault)
    };
  }
  /** Merge loaded project over defaults so older files stay forward-compatible. */
  hydrate(data) {
    const base = this.newProject(data.name || "Untitled", data.mode || "lyrics");
    return {
      ...base,
      ...data,
      id: data.id || base.id,
      createdAt: data.createdAt || base.createdAt,
      updatedAt: data.updatedAt || base.updatedAt,
      footage: { ...base.footage, ...data.footage || {} },
      // Migrate old batch fields: mode is merge-only now; batch lives in export.
      audio: { ...base.audio, ...data.audio || {}, mode: "merge" },
      lyrics: { ...base.lyrics, ...data.lyrics || {}, style: { ...base.lyrics.style, ...data.lyrics?.style || {} } },
      playlist: {
        ...base.playlist,
        ...data.playlist || {},
        style: { ...base.playlist.style, ...data.playlist?.style || {} }
      },
      spectrum: { ...base.spectrum, ...data.spectrum || {} },
      spectrumLayers: data.spectrumLayers || [],
      overlayLayers: data.overlayLayers || [],
      customOverlays: data.customOverlays || [],
      logo: { ...base.logo, ...data.logo || {} },
      effects: { ...base.effects, ...data.effects || {} },
      export: { ...base.export, ...data.export || {} },
      stickers: data.stickers || [],
      // Migrate unified toggles from the legacy mode/batch when absent, so old projects
      // open with the correct lyrics/playlist/spectrum state (the shared helpers do the
      // same derivation, so this stays consistent).
      showLyrics: showLyrics(data),
      showPlaylist: showPlaylist(data),
      spectrumMode: data.spectrumMode ?? (isReactive(data) ? "reactive" : "static"),
      version: PROJECT_VERSION
    };
  }
  async open(filePath) {
    let raw;
    let isRecovered = false;
    try {
      raw = await node_fs.promises.readFile(filePath, "utf-8");
      JSON.parse(raw);
    } catch (err) {
      const bakPath = filePath + ".bak";
      if (node_fs.existsSync(bakPath)) {
        try {
          raw = await node_fs.promises.readFile(bakPath, "utf-8");
          JSON.parse(raw);
          isRecovered = true;
          writeLog("render.log", `Loaded corrupt project ${filePath} from backup snapshot.`);
        } catch {
          throw new Error("Project corrupt dan tidak dapat dipulihkan dari backup (.bak).");
        }
      } else {
        throw new Error("Project corrupt dan tidak ditemukan file backup (.bak).");
      }
    }
    const data = this.hydrate(JSON.parse(raw));
    data.filePath = filePath;
    if (isRecovered) data.recovered = true;
    if (!data.name) data.name = node_path.basename(filePath).replace(/\.masjavas$/i, "");
    await configService.addRecentProject(filePath);
    return data;
  }
  async save(project, filePath) {
    const toWrite = { ...project, filePath, version: PROJECT_VERSION, updatedAt: Date.now() };
    try {
      if (node_fs.existsSync(filePath)) {
        await node_fs.promises.copyFile(filePath, filePath + ".bak").catch(() => {});
      }
    } catch {}
    const tmpPath = filePath + ".tmp";
    await node_fs.promises.writeFile(tmpPath, JSON.stringify(toWrite, null, 2), "utf-8");
    await node_fs.promises.rename(tmpPath, filePath);
    await configService.addRecentProject(filePath);
    await this.store(toWrite).catch(() => {
    });
    return toWrite;
  }
  async recent() {
    const settings = await configService.getAll();
    const out = [];
    for (const p of settings.recentProjects) {
      let exists = true;
      try {
        await node_fs.promises.access(p);
      } catch {
        exists = false;
      }
      out.push({ path: p, name: node_path.basename(p).replace(/\.masjavas$/i, ""), exists });
    }
    return out;
  }
  // ---------- Managed library (app-data) ----------
  libDir() {
    return node_path.join(electron.app.getPath("userData"), "projects");
  }
  libPath(id) {
    return node_path.join(this.libDir(), `${id}.masjavas`);
  }
  /** Persist a project into the managed library (keyed by id). Used by auto-save. */
  async store(project) {
    const dir = this.libDir();
    await node_fs.promises.mkdir(dir, { recursive: true });
    if (!project.id) project.id = node_crypto.randomUUID();
    const toWrite = {
      ...project,
      version: PROJECT_VERSION,
      createdAt: project.createdAt || Date.now(),
      updatedAt: Date.now()
    };
    const finalPath = this.libPath(toWrite.id);
    try {
      if (node_fs.existsSync(finalPath)) {
        await node_fs.promises.copyFile(finalPath, finalPath + ".bak").catch(() => {});
      }
    } catch {}
    const tmpPath = finalPath + ".tmp";
    await node_fs.promises.writeFile(tmpPath, JSON.stringify(toWrite, null, 2), "utf-8");
    await node_fs.promises.rename(tmpPath, finalPath);
    return toWrite;
  }
  async loadById(id) {
    const finalPath = this.libPath(id);
    let raw;
    let isRecovered = false;
    try {
      raw = await node_fs.promises.readFile(finalPath, "utf-8");
      JSON.parse(raw);
    } catch (err) {
      const bakPath = finalPath + ".bak";
      if (node_fs.existsSync(bakPath)) {
        try {
          raw = await node_fs.promises.readFile(bakPath, "utf-8");
          JSON.parse(raw);
          isRecovered = true;
          writeLog("render.log", `Loaded corrupt library project ${id} from backup snapshot.`);
        } catch {
          throw new Error("Library project corrupt dan tidak dapat dipulihkan.");
        }
      } else {
        throw new Error("Library project corrupt.");
      }
    }
    const data = this.hydrate(JSON.parse(raw));
    if (isRecovered) data.recovered = true;
    return data;
  }
  async deleteById(id) {
    await node_fs.promises.rm(this.libPath(id), { force: true });
  }
  async list() {
    const dir = this.libDir();
    let files = [];
    try {
      files = (await node_fs.promises.readdir(dir)).filter((f) => f.endsWith(".masjavas"));
    } catch {
      return [];
    }
    const out = [];
    for (const f of files) {
      try {
        const raw = await node_fs.promises.readFile(node_path.join(dir, f), "utf-8");
        const p = JSON.parse(raw);
        out.push({
          id: p.id || f.replace(/\.masjavas$/i, ""),
          name: p.name || "Untitled",
          mode: p.mode || "lyrics",
          createdAt: p.createdAt || 0,
          updatedAt: p.updatedAt || 0,
          audioCount: p.audio?.items?.length || 0,
          footageCount: p.footage?.items?.length || 0,
          thumbnail: null
        });
      } catch {
      }
    }
    out.sort((a, b) => b.updatedAt - a.updatedAt);
    return out;
  }
  defaultDir() {
    return electron.app.getPath("documents");
  }
}
const projectService = new ProjectService();
const IMAGE_EXT = /* @__PURE__ */ new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXT = /* @__PURE__ */ new Set([".mp4", ".mov", ".mkv", ".webm"]);
const AUDIO_EXT = /* @__PURE__ */ new Set([".mp3", ".wav", ".flac", ".m4a", ".aac", ".ogg"]);
function kindOf(ext) {
  const e = ext.toLowerCase();
  if (IMAGE_EXT.has(e)) return "image";
  if (VIDEO_EXT.has(e)) return "video";
  if (AUDIO_EXT.has(e)) return "audio";
  return null;
}
class MediaService {
  /** Recursively scan a folder (and all subfolders) for media of the given kinds. */
  async scanFolder(folder, only) {
    const items = [];
    const counter = { skipped: 0 };
    await this.walk(folder, only, items, counter, 0);
    items.sort((a, b) => a.path.localeCompare(b.path, void 0, { numeric: true }));
    return { items, skipped: counter.skipped };
  }
  async walk(dir, only, items, counter, depth) {
    if (depth > 8) return;
    let entries;
    try {
      entries = await node_fs.promises.readdir(dir, { withFileTypes: true });
    } catch (e) {
      if (depth === 0) throw new Error(`Cannot read folder: ${e.message}`);
      return;
    }
    for (const ent of entries) {
      const full = node_path.join(dir, ent.name);
      if (ent.isDirectory()) {
        await this.walk(full, only, items, counter, depth + 1);
        continue;
      }
      if (!ent.isFile()) continue;
      const ext = node_path.extname(ent.name);
      const kind = kindOf(ext);
      if (!kind || only && !only.includes(kind)) {
        counter.skipped++;
        continue;
      }
      let size = 0;
      try {
        size = (await node_fs.promises.stat(full)).size;
      } catch {
        counter.skipped++;
        continue;
      }
      items.push({ path: full, name: node_path.basename(ent.name), kind, ext: ext.toLowerCase(), sizeBytes: size });
    }
  }
  async validateFiles(paths, only) {
    const items = [];
    let skipped = 0;
    for (const full of paths) {
      try {
        const stat = await node_fs.promises.stat(full);
        if (!stat.isFile()) {
          skipped++;
          continue;
        }
        const ext = node_path.extname(full);
        const kind = kindOf(ext);
        if (!kind || only && !only.includes(kind)) {
          skipped++;
          continue;
        }
        items.push({ path: full, name: node_path.basename(full), kind, ext: ext.toLowerCase(), sizeBytes: stat.size });
      } catch {
        skipped++;
      }
    }
    return { items, skipped };
  }
}
const mediaService = new MediaService();
const pexec = node_util.promisify(node_child_process.execFile);
async function cacheDir() {
  const dir = node_path.join(electron.app.getPath("userData"), "cache", "thumbs");
  await node_fs.promises.mkdir(dir, { recursive: true });
  return dir;
}
class ProbeService {
  probeCache = /* @__PURE__ */ new Map();
  async probe(path) {
    if (this.probeCache.has(path)) {
      const cached = this.probeCache.get(path);
      this.probeCache.delete(path);
      this.probeCache.set(path, cached);
      return cached;
    }
    const ffprobe = await ffmpegService.ffprobePath();
    if (!ffprobe) throw new Error("ffprobe not found");
    const args = [
      "-v",
      "error",
      "-show_entries",
      "format=duration:stream=width,height,codec_type",
      "-of",
      "json",
      path
    ];
    const { stdout } = await pexec(ffprobe, args, { windowsHide: true });
    const data = JSON.parse(stdout);
    const v = data.streams?.find((s) => s.codec_type === "video");
    const a = data.streams?.find((s) => s.codec_type === "audio");
    const result = {
      duration: parseFloat(data.format?.duration || "0") || 0,
      width: v?.width,
      height: v?.height,
      hasVideo: !!v,
      hasAudio: !!a
    };
    this.probeCache.set(path, result);
    if (this.probeCache.size > 200) {
      const oldestKey = this.probeCache.keys().next().value;
      this.probeCache.delete(oldestKey);
    }
    return result;
  }
  /** Returns a data URL (jpeg) thumbnail for an image or video. */
  async thumbnail(path, kind) {
    const ffmpeg = await ffmpegService.resolvedPath();
    if (!ffmpeg) throw new Error("ffmpeg not found");
    const hash = node_crypto.createHash("md5").update(path).digest("hex").slice(0, 16);
    const dir = await cacheDir();
    const out = node_path.join(dir, `${hash}.jpg`);
    try {
      await node_fs.promises.access(out);
      const buf2 = await node_fs.promises.readFile(out);
      return `data:image/jpeg;base64,${buf2.toString("base64")}`;
    } catch {
    }
    const ss = kind === "video" ? ["-ss", "1"] : [];
    const args = [
      ...ss,
      "-i",
      path,
      "-frames:v",
      "1",
      "-vf",
      "scale=240:-2:force_original_aspect_ratio=decrease",
      "-y",
      out
    ];
    await pexec(ffmpeg, args, { windowsHide: true });
    const buf = await node_fs.promises.readFile(out);
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  }
  async fileToDataUrl(path, mime) {
    const buf = await node_fs.promises.readFile(path);
    return `data:${mime};base64,${buf.toString("base64")}`;
  }
}
const probeService = new ProbeService();
function parseLrc(text) {
  const lines = [];
  const re = /\[(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
  for (const raw of text.split(/\r?\n/)) {
    const matches = [...raw.matchAll(re)];
    if (!matches.length) continue;
    const content = raw.replace(re, "").trim();
    for (const m of matches) {
      const min = parseInt(m[1], 10);
      const sec = parseInt(m[2], 10);
      const frac = m[3] ? parseInt(m[3].padEnd(3, "0"), 10) / 1e3 : 0;
      const t = min * 60 + sec + frac;
      lines.push({ t, end: 0, text: content });
    }
  }
  lines.sort((a, b) => a.t - b.t);
  for (let i = 0; i < lines.length; i++) lines[i].end = lines[i + 1]?.t ?? lines[i].t + 4;
  return lines.filter((l) => l.text.length > 0);
}
function srtTime(s) {
  const m = /(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/.exec(s);
  if (!m) return 0;
  return parseInt(m[1]) * 3600 + parseInt(m[2]) * 60 + parseInt(m[3]) + parseInt(m[4]) / 1e3;
}
function parseSrt(text) {
  const lines = [];
  const blocks = text.split(/\r?\n\r?\n/);
  for (const block of blocks) {
    const rows = block.split(/\r?\n/).filter(Boolean);
    const timeRow = rows.find((r) => r.includes("-->"));
    if (!timeRow) continue;
    const [a, b] = timeRow.split("-->");
    const t = srtTime(a);
    const end = srtTime(b);
    const textRows = rows.slice(rows.indexOf(timeRow) + 1);
    const content = textRows.join(" ").trim();
    if (content) lines.push({ t, end, text: content });
  }
  return lines;
}
function parseTxt(text) {
  const rows = text.split(/\r?\n/).map((r) => r.trim()).filter(Boolean);
  return rows.map((text2) => ({ t: -1, end: -1, text: text2 }));
}
class LyricsService {
  async parse(filePath) {
    const text = await node_fs.promises.readFile(filePath, "utf-8");
    const ext = node_path.extname(filePath).toLowerCase();
    if (ext === ".lrc") return parseLrc(text);
    if (ext === ".srt") return parseSrt(text);
    return parseTxt(text);
  }
}
const lyricsService = new LyricsService();
const EDGE_PUNCT = /^[\s,.;:!?،۔。、「」“”"…~*]+|[\s,.;:!?،۔。、「」“”"…~*]+$/g;
function cleanLyricText(s) {
  return (s || "").replace(EDGE_PUNCT, "").replace(/\s{2,}/g, " ");
}
const GROQ_API_URL = "https://api.groq.com/openai/v1/audio/transcriptions";
const MODEL = "whisper-large-v3-turbo";
const MAX_BYTES = 25 * 1024 * 1024;
class GroqService {
  async transcribe(path, language, apiKey) {
    if (!apiKey) throw new Error("Groq API key belum diatur. Masukkan API key di Pengaturan → Groq AI.");
    const stat = await node_fs.promises.stat(path);
    if (stat.size > MAX_BYTES) {
      throw new Error(
        `File audio terlalu besar untuk Groq (${(stat.size / 1024 / 1024).toFixed(1)} MB > 25 MB). Gunakan WhisperX lokal atau kompres audio terlebih dahulu.`
      );
    }
    const form = new FormData();
    const fileBlob = await fileToBlob(path);
    form.append("file", fileBlob, node_path.basename(path));
    form.append("model", MODEL);
    form.append("response_format", "verbose_json");
    form.append("timestamp_granularities[]", "word");
    if (language && language !== "auto") form.append("language", language);
    const resp = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form
    });
    if (!resp.ok) {
      let msg = `Groq API error ${resp.status}`;
      try {
        const body = await resp.json();
        if (body?.error?.message) msg = `Groq: ${body.error.message}`;
      } catch {
      }
      throw new Error(msg);
    }
    const data = await resp.json();
    const lines = groqResponseToLines(data);
    return {
      lines,
      engine: "groq",
      model: MODEL,
      language: data.language ?? null
    };
  }
  /** Transcribe multiple audio paths in parallel. Returns settled results. */
  async transcribeMany(paths, language, apiKey) {
    const limit = 3;
    const results = [];
    const executing = [];
    for (const p of paths) {
      const task = (async () => {
        try {
          const result = await this.transcribe(p, language, apiKey);
          return { path: p, result };
        } catch (e) {
          return { path: p, error: e.message };
        }
      })();
      results.push(task);
      if (limit < paths.length) {
        const e = task.then(() => executing.splice(executing.indexOf(e), 1));
        executing.push(e);
        if (executing.length >= limit) {
          await Promise.race(executing);
        }
      }
    }
    return Promise.all(results);
  }
}
async function fileToBlob(path) {
  const buf = await node_fs.promises.readFile(path);
  return new Blob([buf]);
}
function groqResponseToLines(data) {
  const words = (data.words?.length ? data.words : (data.segments ?? []).flatMap((s) => s.words ?? [])).map((w) => ({ ...w, word: cleanLyricText(w.word) })).filter((w) => w.word.length > 0);
  if (words.length > 0) {
    return groupWordsToLines(words);
  }
  return (data.segments ?? []).map((seg) => ({
    t: seg.start,
    end: seg.end,
    text: cleanLyricText(seg.text),
    words: []
  })).filter((l) => l.text.length > 0);
}
function groupWordsToLines(words) {
  const GAP = 0.3;
  const MAX_WORDS = 6;
  const MAX_DUR = 4;
  const lines = [];
  let group = [words[0]];
  for (const w of words.slice(1)) {
    const gap = w.start - group[group.length - 1].end;
    const dur = group[group.length - 1].end - group[0].start;
    if (gap >= GAP || group.length >= MAX_WORDS || dur >= MAX_DUR) {
      lines.push(groupToLine(group));
      group = [w];
    } else {
      group.push(w);
    }
  }
  if (group.length) lines.push(groupToLine(group));
  return lines;
}
function groupToLine(group) {
  return {
    t: group[0].start,
    end: group[group.length - 1].end,
    text: group.map((w) => w.word).join(" ").trim(),
    words: group.map((w) => ({ t: w.start, end: w.end, text: w.word }))
  };
}
const groqService = new GroqService();
const API = (token, method) => `https://api.telegram.org/bot${token}/${method}`;
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function fmtDuration(ms) {
  const total = Math.round(ms / 1e3);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}
async function post(token, chatId, text) {
  try {
    const res = await fetch(API(token, "sendMessage"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true })
    });
    const json = await res.json().catch(() => null);
    if (!json?.ok) return { ok: false, error: json?.description || `HTTP ${res.status}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
const telegramService = {
  /** Send a test message using the CURRENT saved settings. Used by the Settings "Test" button. */
  async test() {
    const s = await configService.getAll();
    const token = decryptKey(s.telegramBotToken);
    if (!token || !s.telegramChatId) return { ok: false, error: "Bot token / Chat ID belum diisi" };
    return post(token, s.telegramChatId, "✅ <b>Masjavas terhubung.</b>\nNotifikasi render aktif.");
  },
  /** Notify that one render job finished. No-op if disabled or unconfigured. Never throws. */
  async notifyRenderDone(opts) {
    const s = await configService.getAll();
    const token = decryptKey(s.telegramBotToken);
    if (!s.telegramEnabled || !token || !s.telegramChatId) return;
    let waitingProjects = 0;
    try {
      const { renderQueueService: renderQueueService2 } = await Promise.resolve().then(() => renderQueue_service);
      waitingProjects = renderQueueService2.getState().items.filter((it) => it.status === "waiting").length;
    } catch {
    }
    const batchLeft = opts.total - (opts.index + 1);
    const lines = [
      "✅ <b>Render selesai</b>",
      `📄 ${escapeHtml(opts.fileName)}`,
      `⏱️ ${fmtDuration(opts.elapsedMs)}`,
      `📦 Batch: ${opts.index + 1}/${opts.total}${batchLeft > 0 ? ` · ${batchLeft} lagi` : ""}`
    ];
    if (waitingProjects > 0) lines.push(`🗂️ Antrian project: ${waitingProjects} menunggu`);
    await post(token, s.telegramChatId, lines.join("\n"));
  }
};
const PRESETS = {
  vintage: { name: "Vintage", params: { eq: [[120, 2, 0.8], [3e3, -2, 1], [8e3, -4, 1]], comp: { threshold: -20, ratio: 3, makeup: 2 }, width: 0.9, ceiling: 0.95 }, targetLufs: -16 },
  "radio-ready": { name: "Radio Ready", params: { eq: [[100, 2, 1], [3e3, 3, 1], [1e4, 2, 1]], comp: { threshold: -16, ratio: 4, makeup: 3 }, width: 1, ceiling: 0.98 }, targetLufs: -12 },
  "warm-ballad": { name: "Warm Ballad", params: { eq: [[200, 2, 0.7], [4e3, -1, 1], [9e3, 1, 1]], comp: { threshold: -22, ratio: 2.5, makeup: 1.5 }, width: 1.05, ceiling: 0.95 }, targetLufs: -16 },
  "modern-loud": { name: "Modern Loud", params: { eq: [[80, 3, 1], [2500, 2, 1], [12e3, 3, 1]], comp: { threshold: -14, ratio: 5, makeup: 4 }, width: 1.1, ceiling: 0.99 }, targetLufs: -9 },
  "vinyl-warm": { name: "Vinyl Warm", params: { eq: [[150, 2, 0.8], [5e3, -3, 1], [11e3, -5, 1]], comp: { threshold: -20, ratio: 3, makeup: 2 }, width: 0.85, ceiling: 0.93 }, targetLufs: -16 },
  "1930-radio": { name: "1930 Radio", params: { eq: [[300, 4, 0.6], [3e3, 4, 1], [6e3, -10, 1]], comp: { threshold: -18, ratio: 6, makeup: 3 }, width: 0.4, ceiling: 0.9 }, targetLufs: -14 },
  "1940-jazz": { name: "1940 Jazz", params: { eq: [[200, 2, 0.7], [4e3, 1, 1], [9e3, -4, 1]], comp: { threshold: -20, ratio: 3, makeup: 2 }, width: 0.7, ceiling: 0.93 }, targetLufs: -15 },
  "1950-crooner": { name: "1950 Crooner", params: { eq: [[180, 2, 0.7], [3500, 2, 1], [1e4, -2, 1]], comp: { threshold: -19, ratio: 3, makeup: 2 }, width: 0.8, ceiling: 0.94 }, targetLufs: -15 },
  "1960-soul": { name: "1960 Soul", params: { eq: [[120, 3, 0.8], [2500, 2, 1], [9e3, 1, 1]], comp: { threshold: -18, ratio: 3.5, makeup: 2.5 }, width: 0.95, ceiling: 0.95 }, targetLufs: -14 },
  "1970-analog": { name: "1970 Analog", params: { eq: [[100, 2, 0.8], [4e3, 1, 1], [12e3, 2, 1]], comp: { threshold: -19, ratio: 3, makeup: 2 }, width: 1, ceiling: 0.95 }, targetLufs: -14 },
  "1980-fm": { name: "1980 FM", params: { eq: [[90, 3, 1], [3e3, 3, 1], [12e3, 4, 1]], comp: { threshold: -15, ratio: 4, makeup: 3 }, width: 1.1, ceiling: 0.98 }, targetLufs: -11 },
  "smooth-jazz": { name: "Smooth Jazz", params: { eq: [[150, 1, 0.7], [4e3, -1, 1], [1e4, 2, 1]], comp: { threshold: -22, ratio: 2.5, makeup: 1.5 }, width: 1.05, ceiling: 0.94 }, targetLufs: -16 },
  "vocal-shine": { name: "Vocal Shine", params: { eq: [[200, -1, 1], [3e3, 3, 1.2], [9e3, 4, 1]], comp: { threshold: -20, ratio: 3, makeup: 2 }, width: 1, ceiling: 0.96 }, targetLufs: -14 },
  "podcast-clear": { name: "Podcast Clear", params: { eq: [[100, -3, 1], [2500, 3, 1], [7e3, 2, 1]], comp: { threshold: -18, ratio: 4, makeup: 3 }, width: 0.6, ceiling: 0.97 }, targetLufs: -16 },
  "bass-boost": { name: "Bass Boost", params: { eq: [[60, 5, 1], [120, 3, 1], [8e3, 1, 1]], comp: { threshold: -16, ratio: 4, makeup: 3 }, width: 1, ceiling: 0.98 }, targetLufs: -11 },
  "cinematic-wide": { name: "Cinematic Wide", params: { eq: [[80, 3, 1], [3e3, 1, 1], [12e3, 3, 1]], comp: { threshold: -18, ratio: 3, makeup: 2 }, width: 1.3, ceiling: 0.97 }, targetLufs: -14 },
  "streaming-ready": { name: "Streaming Ready", params: { eq: [[100, 1, 1], [3e3, 1, 1], [11e3, 2, 1]], comp: { threshold: -16, ratio: 3.5, makeup: 2.5 }, width: 1, ceiling: 0.98 }, targetLufs: -14 },
  "youtube-music": { name: "YouTube Music", params: { eq: [[90, 2, 1], [2800, 2, 1], [12e3, 3, 1]], comp: { threshold: -15, ratio: 4, makeup: 3 }, width: 1.05, ceiling: 0.98 }, targetLufs: -13 }
};
class MasterService {
  cancelled = false;
  list() {
    return Object.entries(PRESETS).map(([id, p]) => ({ id, name: p.name }));
  }
  /** Apply a mastering preset to one audio file. Used by the render pipeline for per-track mastering.
   *  Optional fadeIn/fadeOut (seconds) are folded into the same pass — no separate ffmpeg afade. */
  async applyPreset(inputPath, outputPath, presetId, fadeIn = 0, fadeOut = 0) {
    const preset = PRESETS[presetId];
    if (!preset) return;
    await sidecarService.masterRender(inputPath, outputPath, preset.params, preset.targetLufs, 0, fadeIn, fadeOut);
  }
  cancel() {
    this.cancelled = true;
  }
  emit(win, p) {
    win?.webContents.send(IPC.masterEvent, p);
  }
  async preview(inputPath, presetId, outputGain) {
    const preset = PRESETS[presetId] || PRESETS["streaming-ready"];
    const tmpDir = node_path.join(electron.app.getPath("userData"), "cache", "master-preview");
    await node_fs.promises.mkdir(tmpDir, { recursive: true });
    const stamp = Date.now();
    const previewSrc = node_path.join(tmpDir, "preview_src.wav");
    const previewOut = node_path.join(tmpDir, `preview_${stamp}.wav`);
    const previewMp3 = node_path.join(tmpDir, `preview_${stamp}.mp3`);
    const ffmpeg = await ffmpegService.resolvedPath();
    const runFf = (args, label) => new Promise((resolve, reject) => {
      const proc = node_child_process.spawn(ffmpeg, args, { windowsHide: true });
      proc.on("close", (code) => code === 0 ? resolve() : reject(new Error(`${label} failed (${code})`)));
      proc.on("error", reject);
    });
    if (ffmpeg) {
      await runFf(["-hide_banner", "-y", "-i", inputPath, "-t", "30", "-c:a", "pcm_s16le", previewSrc], "Trim");
    } else {
      await node_fs.promises.copyFile(inputPath, previewSrc);
    }
    await sidecarService.masterRender(previewSrc, previewOut, preset.params, preset.targetLufs, outputGain);
    const outPath = ffmpeg ? previewMp3 : previewOut;
    if (ffmpeg) {
      await runFf(["-hide_banner", "-y", "-i", previewOut, "-c:a", "libmp3lame", "-b:a", "192k", previewMp3], "Preview encode");
    }
    const norm = outPath.replace(/\\/g, "/");
    const encoded = norm.split("/").map((seg, i) => i === 0 && /^[A-Za-z]:$/.test(seg) ? seg : encodeURIComponent(seg)).join("/");
    return `localfile:///${encoded}`;
  }
  async run(win, req) {
    this.cancelled = false;
    const preset = PRESETS[req.presetId] || PRESETS["streaming-ready"];
    const total = req.inputs.length;
    for (let i = 0; i < total; i++) {
      if (this.cancelled) {
        this.emit(win, { index: i, total, fileName: "", percent: 0, status: "cancelled" });
        break;
      }
      const input = req.inputs[i];
      const fileName = node_path.basename(input);
      const base = fileName.replace(node_path.extname(fileName), "");
      const out = node_path.join(req.outputDir, `${base}_mastered.wav`);
      this.emit(win, { index: i, total, fileName, percent: 10, status: "processing" });
      try {
        await sidecarService.masterRender(
          input,
          out,
          preset.params,
          req.targetLufs || preset.targetLufs,
          req.outputGain || 0
        );
        this.emit(win, { index: i, total, fileName, percent: 100, status: "done", outputPath: out });
      } catch (e) {
        this.emit(win, { index: i, total, fileName, percent: 0, status: "error", error: e.message });
      }
    }
  }
}
const masterService = new MasterService();
function fakeSpectrumFrame(bands, t, bpm = 90) {
  const beat = 60 / bpm;
  const phase = t % beat / beat;
  const beatIdx = Math.floor(t / beat);
  const kick = Math.pow(1 - phase, 2.2);
  const isBackbeat = beatIdx % 2 === 1;
  const snare = isBackbeat ? Math.pow(1 - phase, 3) : 0;
  const hatPeriod = beat / 2;
  const hphase = t % hatPeriod / hatPeriod;
  const hat = Math.pow(1 - hphase, 4);
  const vals = new Array(bands);
  for (let i = 0; i < bands; i++) {
    const p = bands > 1 ? i / (bands - 1) : 0;
    const bass = Math.max(0, 1 - p / 0.28);
    const mid = Math.exp(-Math.pow((p - 0.45) / 0.22, 2));
    const treble = Math.max(0, (p - 0.55) / 0.45);
    const shimmer = 0.12 * (0.5 + 0.5 * Math.sin(t * (2 + p * 6) + i * 0.6));
    let v = bass * kick + mid * snare * 0.9 + treble * hat * 0.7 + shimmer;
    v += mid * kick * 0.25;
    v = v * 0.95 + 0.05;
    vals[i] = Math.max(0, Math.min(1, v));
  }
  return vals;
}
function fakeSpectrumFrames(bands, totalFrames, fps, bpm = 90) {
  const frames = [];
  for (let f = 0; f < totalFrames; f++) frames.push(fakeSpectrumFrame(bands, f / fps, bpm));
  return frames;
}
const { createCanvas: createCanvas$2 } = require("@napi-rs/canvas");
const MAX_PNG_DURATION$1 = 99999;
const ANALYSIS_CAP_SEC = 180;
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function crossfadeLoop(frames, fps, crossSec = 1) {
  const n = frames.length;
  if (n < 4) return;
  const crossN = Math.min(Math.floor(crossSec * fps), Math.floor(n / 3));
  if (crossN < 2) return;
  for (let j = 0; j < crossN; j++) {
    const tailIdx = n - crossN + j;
    const w = (j + 1) / (crossN + 1);
    const tail = frames[tailIdx];
    const head = frames[j];
    for (let i = 0; i < tail.length; i++) tail[i] = lerp(tail[i], head[i], w);
  }
}
async function spectrumOverlay(cfg, audioPath, duration, fps, W, H, tmpDir, baseSeconds = ANALYSIS_CAP_SEC) {
  if (!cfg.enabled) return null;
  if (duration > MAX_PNG_DURATION$1) return null;
  const renderDur = Math.min(duration, Math.max(20, baseSeconds));
  const effectiveFps = fps;
  const bands = Math.max(16, Math.min(160, cfg.bars));
  const spec = await sidecarService.spectrum(audioPath, effectiveFps, bands, renderDur + 1);
  if (!spec.frames.length) return null;
  const dir = node_path.join(tmpDir, "spectrum");
  await node_fs.promises.mkdir(dir, { recursive: true });
  const totalFrames = Math.min(spec.frames.length, Math.ceil(renderDur * effectiveFps));
  const smooth = new Array(bands).fill(0);
  const smoothing = Math.min(0.95, Math.max(0, cfg.smoothing));
  const valsPerFrame = [];
  for (let f = 0; f < totalFrames; f++) {
    const raw = spec.frames[Math.min(f, spec.frames.length - 1)];
    const vals = new Array(bands);
    for (let i = 0; i < bands; i++) {
      const tilt = lerp(cfg.bassIntensity, cfg.trebleIntensity, i / Math.max(1, bands - 1));
      let v = Math.min(1.4, (raw[i] || 0) * cfg.sensitivity * tilt);
      v = Math.pow(v, 0.85);
      smooth[i] = lerp(v, smooth[i], smoothing);
      vals[i] = smooth[i];
    }
    valsPerFrame.push(vals);
  }
  if (renderDur < duration - 0.05) crossfadeLoop(valsPerFrame, effectiveFps);
  const SCALE = 0.5;
  const CW = Math.round(W * SCALE);
  const CH = Math.round(H * SCALE);
  const canvas = createCanvas$2(CW, CH);
  const ctx = canvas.getContext("2d");
  for (let f = 0; f < totalFrames; f++) {
    ctx.clearRect(0, 0, CW, CH);
    const vals = valsPerFrame[f];
    const nowSec = f / effectiveFps;
    customText.drawSpectrum(ctx, cfg, vals, CW, CH, nowSec);
    const buf = canvas.toBuffer("image/png");
    await node_fs.promises.writeFile(node_path.join(dir, `s${String(f + 1).padStart(6, "0")}.png`), buf);
  }
  return { dir, fps: effectiveFps, frames: totalFrames };
}
async function spectrumLayersOverlay(layers, audioPath, duration, fps, W, H, tmpDir, baseSeconds = ANALYSIS_CAP_SEC) {
  const enabled = layers.filter((l) => l.enabled);
  if (!enabled.length) return null;
  if (duration > MAX_PNG_DURATION$1) return null;
  const renderDur = Math.min(duration, Math.max(20, baseSeconds));
  const effectiveFps = fps;
  const maxBands = Math.max(...enabled.map((l) => l.bars));
  const spec = await sidecarService.spectrum(audioPath, effectiveFps, maxBands, renderDur + 1);
  if (!spec.frames.length) return null;
  const dir = node_path.join(tmpDir, "spectrum_layers");
  await node_fs.promises.mkdir(dir, { recursive: true });
  const totalFrames = Math.min(spec.frames.length, Math.ceil(renderDur * effectiveFps));
  const rawFrames = [];
  for (let f = 0; f < totalFrames; f++) {
    rawFrames.push([...spec.frames[Math.min(f, spec.frames.length - 1)] || []]);
  }
  if (renderDur < duration - 0.05) crossfadeLoop(rawFrames, effectiveFps);
  const smoothBufs = /* @__PURE__ */ new Map();
  for (const layer of enabled) smoothBufs.set(layer.id, new Array(layer.bars).fill(0));
  const canvas = createCanvas$2(W, H);
  const ctx = canvas.getContext("2d");
  for (let f = 0; f < totalFrames; f++) {
    ctx.clearRect(0, 0, W, H);
    const raw = rawFrames[f];
    const nowSec = f / effectiveFps;
    for (const layer of enabled) {
      const bands = layer.bars;
      const smooth = smoothBufs.get(layer.id);
      const vals = new Array(bands);
      for (let i = 0; i < bands; i++) {
        const tilt = lerp(layer.bassIntensity, layer.trebleIntensity, i / Math.max(1, bands - 1));
        let v = Math.min(1.4, (raw[i % raw.length] || 0) * layer.sensitivity * tilt);
        v = Math.pow(v, 0.85);
        smooth[i] = lerp(v, smooth[i], Math.min(0.95, layer.smoothing));
        vals[i] = smooth[i];
      }
      const cfg = {
        preset: layer.preset,
        position: "bottom",
        scale: layer.scale,
        radius: layer.radius,
        thickness: layer.thickness,
        color: layer.color,
        rgb: layer.rgb,
        opacity: layer.opacity,
        glow: layer.glow,
        smoothing: layer.smoothing,
        sensitivity: layer.sensitivity,
        bassIntensity: layer.bassIntensity,
        trebleIntensity: layer.trebleIntensity,
        bars: layer.bars
      };
      ctx.save();
      const cx = layer.posX * W;
      const cy = layer.posY * H;
      ctx.translate(cx, cy);
      if (layer.rotation !== 0) ctx.rotate(layer.rotation * Math.PI / 180);
      ctx.translate(-W / 2, -H / 2);
      customText.drawSpectrum(ctx, cfg, vals, W, H, nowSec);
      ctx.restore();
    }
    const buf = canvas.toBuffer("image/png");
    await node_fs.promises.writeFile(node_path.join(dir, `sl${String(f + 1).padStart(6, "0")}.png`), buf);
  }
  return { dir, fps: effectiveFps, frames: totalFrames };
}
async function loadFrameSource(audioPath, fps, bands, renderDur, dummy) {
  try {
    const spec = await sidecarService.spectrumBin(audioPath, fps, bands, renderDur + 1);
    if (spec.count) return { count: spec.count, at: spec.at };
  } catch {
  }
  const fake = fakeSpectrumFrames(bands, Math.max(1, Math.ceil(renderDur * fps)), fps);
  return { count: fake.length, at: (f) => fake[Math.min(f, fake.length - 1)] };
}
async function createSpectrumDrawer(cfg, audioPath, duration, fps, W, H, baseSeconds, dummy = false) {
  if (!cfg.enabled) return null;
  const renderDur = Math.min(duration, Math.max(20, baseSeconds));
  const effectiveFps = fps;
  const bands = Math.max(16, Math.min(160, cfg.bars));
  const src = await loadFrameSource(audioPath, effectiveFps, bands, renderDur);
  if (!src.count) return null;
  const totalFrames = Math.min(src.count, Math.ceil(renderDur * effectiveFps));
  const smooth = new Array(bands).fill(0);
  const smoothing = Math.min(0.95, Math.max(0, cfg.smoothing));
  const valsPerFrame = [];
  for (let f = 0; f < totalFrames; f++) {
    const raw = src.at(f);
    const vals = new Array(bands);
    for (let i = 0; i < bands; i++) {
      const tilt = lerp(cfg.bassIntensity, cfg.trebleIntensity, i / Math.max(1, bands - 1));
      let v = Math.min(1.4, (raw[i] || 0) * cfg.sensitivity * tilt);
      v = Math.pow(v, 0.85);
      smooth[i] = lerp(v, smooth[i], smoothing);
      vals[i] = smooth[i];
    }
    valsPerFrame.push(vals);
  }
  if (renderDur < duration - 0.05) crossfadeLoop(valsPerFrame, effectiveFps);
  const drawFrame = (ctx, f) => {
    customText.drawSpectrum(ctx, cfg, valsPerFrame[Math.min(f, totalFrames - 1)], W, H, f / effectiveFps);
  };
  return { totalFrames, drawFrame };
}
async function createSpectrumLayersDrawer(layers, audioPath, duration, fps, W, H, baseSeconds, dummy = false) {
  const enabled = layers.filter((l) => l.enabled);
  if (!enabled.length) return null;
  const renderDur = Math.min(duration, Math.max(20, baseSeconds));
  const effectiveFps = fps;
  const maxBands = Math.max(...enabled.map((l) => l.bars));
  const src = await loadFrameSource(audioPath, effectiveFps, maxBands, renderDur);
  if (!src.count) return null;
  const totalFrames = Math.min(src.count, Math.ceil(renderDur * effectiveFps));
  const rawFrames = [];
  for (let f = 0; f < totalFrames; f++) rawFrames.push(Array.from(src.at(f)));
  if (renderDur < duration - 0.05) crossfadeLoop(rawFrames, effectiveFps);
  const smoothBufs = /* @__PURE__ */ new Map();
  for (const layer of enabled) smoothBufs.set(layer.id, new Array(layer.bars).fill(0));
  const drawFrame = (ctx, f) => {
    const raw = rawFrames[Math.min(f, totalFrames - 1)];
    const nowSec = f / effectiveFps;
    for (const layer of enabled) {
      const bands = layer.bars;
      const smooth = smoothBufs.get(layer.id);
      const vals = new Array(bands);
      for (let i = 0; i < bands; i++) {
        const tilt = lerp(layer.bassIntensity, layer.trebleIntensity, i / Math.max(1, bands - 1));
        let v = Math.min(1.4, (raw[i % raw.length] || 0) * layer.sensitivity * tilt);
        v = Math.pow(v, 0.85);
        smooth[i] = lerp(v, smooth[i], Math.min(0.95, layer.smoothing));
        vals[i] = smooth[i];
      }
      const cfg = {
        preset: layer.preset,
        position: "bottom",
        scale: layer.scale,
        radius: layer.radius,
        thickness: layer.thickness,
        color: layer.color,
        rgb: layer.rgb,
        opacity: layer.opacity,
        glow: layer.glow,
        smoothing: layer.smoothing,
        sensitivity: layer.sensitivity,
        bassIntensity: layer.bassIntensity,
        trebleIntensity: layer.trebleIntensity,
        bars: layer.bars
      };
      ctx.save();
      ctx.translate(layer.posX * W, layer.posY * H);
      if (layer.rotation !== 0) ctx.rotate(layer.rotation * Math.PI / 180);
      ctx.translate(-W / 2, -H / 2);
      customText.drawSpectrum(ctx, cfg, vals, W, H, nowSec);
      ctx.restore();
    }
  };
  return { totalFrames, drawFrame };
}
function buildEffectFilters(fx) {
  const f = [];
  const eqParts = [];
  if (fx.brightness !== 0) eqParts.push(`brightness=${clamp(fx.brightness, -1, 1).toFixed(3)}`);
  if (fx.contrast !== 1) eqParts.push(`contrast=${clamp(fx.contrast, 0, 3).toFixed(3)}`);
  if (fx.saturation !== 1) eqParts.push(`saturation=${clamp(fx.saturation, 0, 3).toFixed(3)}`);
  if (eqParts.length) f.push(`eq=${eqParts.join(":")}`);
  if (fx.warmth !== 0) {
    const w = clamp(fx.warmth, -1, 1);
    f.push(`colorbalance=rs=${(w * 0.3).toFixed(3)}:bs=${(-w * 0.3).toFixed(3)}`);
  }
  if (fx.blur > 0.01) f.push(`gblur=sigma=${clamp(fx.blur, 0, 10).toFixed(2)}`);
  if (fx.vignette > 0.01) f.push(`vignette=PI/${(5 - fx.vignette * 3).toFixed(2)}`);
  if (fx.filmGrain > 0.01) f.push(`noise=alls=${Math.round(fx.filmGrain * 20)}:allf=t`);
  return f;
}
function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}
function fontFamilyName(filePath) {
  try {
    const buf = node_fs.readFileSync(filePath);
    const numTables = buf.readUInt16BE(4);
    let nameOff = -1;
    for (let i = 0; i < numTables; i++) {
      const rec = 12 + i * 16;
      if (buf.toString("latin1", rec, rec + 4) === "name") {
        nameOff = buf.readUInt32BE(rec + 8);
        break;
      }
    }
    if (nameOff < 0) return null;
    const count = buf.readUInt16BE(nameOff + 2);
    const storage = nameOff + buf.readUInt16BE(nameOff + 4);
    let best = null;
    let bestScore = -1;
    for (let i = 0; i < count; i++) {
      const rec = nameOff + 6 + i * 12;
      const platformID = buf.readUInt16BE(rec);
      const nameID = buf.readUInt16BE(rec + 6);
      const len = buf.readUInt16BE(rec + 8);
      const off = buf.readUInt16BE(rec + 10);
      if (nameID !== 1 && nameID !== 16) continue;
      const start = storage + off;
      if (start + len > buf.length) continue;
      let value;
      if (platformID === 3 || platformID === 0) {
        let s = "";
        for (let j = 0; j + 1 < len; j += 2) s += String.fromCharCode(buf[start + j] << 8 | buf[start + j + 1]);
        value = s;
      } else {
        value = buf.toString("latin1", start, start + len);
      }
      value = value.replace(/\0/g, "").trim();
      if (!value) continue;
      const score = (nameID === 16 ? 2 : 0) + (platformID === 3 ? 1 : 0);
      if (score > bestScore) {
        bestScore = score;
        best = value;
      }
    }
    return best;
  } catch {
    return null;
  }
}
const FONT_FAMILIES = {
  // Sans-serif
  "Inter": "Inter",
  "Roboto": "Roboto",
  "Lato": "Lato",
  "Noto Sans": "Noto Sans",
  "Unbounded": "Unbounded",
  // Rounded / geometric
  "Poppins": "Poppins",
  "Montserrat": "Montserrat",
  "Raleway": "Raleway",
  "Exo 2": "Exo 2",
  // Condensed / bold impact
  "Oswald": "Oswald",
  "Bebas Neue": "Bebas Neue",
  "Anton": "Anton",
  "Teko": "Teko",
  "Chakra Petch": "Chakra Petch",
  // Stylized / futuristic
  "Orbitron": "Orbitron",
  "Righteous": "Righteous",
  "Cinzel": "Cinzel",
  // Serif / editorial
  "Playfair Display": "Playfair Display",
  // Handwriting / script
  "Pacifico": "Pacifico",
  "Caveat": "Caveat",
  "Sacramento": "Sacramento",
  // Vintage / typewriter
  "Special Elite": "Special Elite",
  // ── Imported display / script pack (dafont) — value = real internal family name ──
  "Beyonest": "Beyonest",
  "Excess V": "Excess V",
  "Excess V Straight": "Excess V Straight",
  "Gentle Hearts": "Gentle Hearts",
  "Glendora": "Glendora",
  "Gokart Bubble": "Gokart Bubble",
  "Handflair": "Handflair",
  "Lumiare": "Lumiare",
  "Magic Yellow": "Magic Yellow",
  "Modern Romance": "Modern Romance",
  "Neogen": "Neogen",
  "Peach Club Script": "Peach Club Script",
  "Restful Silent": "Restful Silent",
  "Super Pandora": "Super Pandora",
  "Twilight Luminance Free": "Twilight Luminance Free",
  "Weghorst": "Weghorst",
  // System fallback
  "Arial": "Arial"
};
const FONT_FILES_MAP = {
  "Inter": ["Inter-Regular.ttf"],
  "Roboto": ["Roboto-Regular.ttf", "Roboto-Bold.ttf"],
  "Lato": ["Lato-Regular.ttf", "Lato-Bold.ttf"],
  "Noto Sans": ["NotoSans-Regular.ttf"],
  "Unbounded": ["Unbounded-Regular.ttf"],
  "Poppins": ["Poppins-Regular.ttf", "Poppins-Bold.ttf"],
  "Montserrat": ["Montserrat.ttf"],
  "Raleway": ["Raleway-Regular.ttf"],
  "Exo 2": ["Exo2-Regular.ttf"],
  "Oswald": ["Oswald.ttf"],
  "Bebas Neue": ["BebasNeue-Regular.ttf"],
  "Anton": ["Anton-Regular.ttf"],
  "Teko": ["Teko-Regular.ttf"],
  "Chakra Petch": ["Chakra-Regular.ttf"],
  "Orbitron": ["Orbitron-Regular.ttf"],
  "Righteous": ["Righteous-Regular.ttf"],
  "Cinzel": ["Cinzel-Regular.ttf"],
  "Playfair Display": ["PlayfairDisplay-Regular.ttf"],
  "Pacifico": ["Pacifico-Regular.ttf"],
  "Caveat": ["Caveat-Regular.ttf"],
  "Sacramento": ["Sacramento-Regular.ttf"],
  "Special Elite": ["SpecialElite-Regular.ttf"],
  "Beyonest": ["Beyonest.otf"],
  "Excess V": ["ExcessV.otf"],
  "Excess V Straight": ["ExcessVStraight.otf"],
  "Gentle Hearts": ["GentleHearts.ttf"],
  "Glendora": ["Glendora.otf"],
  "Gokart Bubble": ["GokartBubble.otf"],
  "Handflair": ["Handflair.ttf"],
  "Lumiare": ["Lumiare.otf"],
  "Magic Yellow": ["MagicYellow.otf"],
  "Modern Romance": ["ModernRomance.otf"],
  "Neogen": ["Neogen.ttf"],
  "Peach Club Script": ["PeachClubScript.ttf"],
  "Restful Silent": ["RestfulSilent.ttf"],
  "Super Pandora": ["SuperPandora.ttf"],
  "Twilight Luminance Free": ["TwilightLuminance.ttf"],
  "Weghorst": ["Weghorst.otf"]
};
let fontsRegistered = false;
function userFontsDir() {
  const d = node_path.join(electron.app.getPath("userData"), "fonts");
  try {
    node_fs.mkdirSync(d, { recursive: true });
  } catch {
  }
  return d;
}
function napiGlobalFonts() {
  try {
    return require("@napi-rs/canvas").GlobalFonts;
  } catch {
    return null;
  }
}
function registerUserFont(filePath) {
  const base = node_path.basename(filePath, node_path.extname(filePath));
  const real = fontFamilyName(filePath);
  const family = real || base;
  const gf = napiGlobalFonts();
  try {
    gf?.registerFromPath(filePath, family);
  } catch {
  }
  if (real && real !== base) {
    try {
      gf?.registerFromPath(filePath, base);
    } catch {
    }
  }
  return family;
}
function listUserFonts() {
  const dir = userFontsDir();
  try {
    return node_fs.readdirSync(dir).filter((f) => /\.(ttf|otf)$/i.test(f)).map((f) => {
      const file = node_path.join(dir, f);
      return { family: fontFamilyName(file) || node_path.basename(f, node_path.extname(f)), file };
    });
  } catch {
    return [];
  }
}
function fontsDir() {
  const dirs = [
    node_path.join(process.resourcesPath || "", "fonts"),
    node_path.join(electron.app.getAppPath(), "resources", "fonts"),
    node_path.join(electron.app.getAppPath(), "..", "..", "resources", "fonts"),
    node_path.join(process.cwd(), "resources", "fonts")
  ];
  for (const d of dirs) {
    if (node_fs.existsSync(d)) return d;
  }
  return null;
}
function registerBundledFonts() {
  if (fontsRegistered) return;
  const dir = fontsDir();
  if (!dir) {
    console.warn("[fonts] resources/fonts not found — canvas uses system fonts");
    return;
  }
  let GlobalFonts;
  try {
    GlobalFonts = require("@napi-rs/canvas").GlobalFonts;
  } catch {
    return;
  }
  let registered = 0;
  for (const files of Object.values(FONT_FILES_MAP)) {
    for (const file of files) {
      const fullPath = node_path.join(dir, file);
      if (node_fs.existsSync(fullPath)) {
        try {
          GlobalFonts.registerFromPath(fullPath);
          registered++;
        } catch {
        }
      }
    }
  }
  for (const { family, file } of listUserFonts()) {
    const base = node_path.basename(file, node_path.extname(file));
    try {
      napiGlobalFonts()?.registerFromPath(file, family);
      registered++;
    } catch {
    }
    if (family !== base) {
      try {
        napiGlobalFonts()?.registerFromPath(file, base);
      } catch {
      }
    }
  }
  console.log(`[fonts] Registered ${registered} font file(s)`);
  fontsRegistered = true;
}
function resolveFamily(name) {
  return FONT_FAMILIES[name] || name || "Inter";
}
function ts(t) {
  if (t < 0) t = 0;
  const h = Math.floor(t / 3600);
  const m = Math.floor(t % 3600 / 60);
  const s = Math.floor(t % 60);
  const cs = Math.floor((t - Math.floor(t)) * 100);
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}
function assColor(hex, opacity = 1) {
  const h = (hex || "#ffffff").replace("#", "").padEnd(6, "f");
  const r = h.slice(0, 2);
  const g = h.slice(2, 4);
  const b = h.slice(4, 6);
  const a = Math.round((1 - opacity) * 255).toString(16).padStart(2, "0");
  return `&H${a}${b}${g}${r}`.toUpperCase();
}
function alignment(style) {
  const col = style.align === "left" ? 1 : style.align === "right" ? 3 : 2;
  const row = style.position === "top" ? 6 : style.position === "center" || style.position === "custom" ? 3 : 0;
  return col + row;
}
function header(width, height, style, fontScale = 1) {
  const align = alignment(style);
  const outline = Math.max(0, style.strokeWidth) * fontScale;
  const shadow = (style.shadow ? 3 : 0) * fontScale;
  const marginV = Math.round(height * 0.1);
  const family = resolveFamily(style.fontFamily);
  const fontSize = Math.round(style.fontSize * fontScale);
  return `[Script Info]
ScriptType: v4.00+
PlayResX: ${width}
PlayResY: ${height}
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.709

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${family},${fontSize},${assColor(style.color)},&H000000FF,${assColor(style.strokeColor)},&HA0000000,1,0,0,0,100,100,0,0,1,${outline},${shadow},${align},60,60,${marginV},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;
}
function escapeText(s) {
  return s.replace(/\\/g, "⧵").replace(/\n/g, "\\N").replace(/[{}]/g, "");
}
function buildLyricsAss(cfg, width, height, duration = 0) {
  const style = cfg.style;
  let out = header(width, height, style, height / 1080);
  const hi = assColor(cfg.highlightColor);
  const base = assColor(style.color, style.opacity);
  const posOverride = style.position === "custom" ? `\\pos(${Math.round(width * style.posX)},${Math.round(height * style.posY)})` : "";
  const useWordMode = cfg.highlightMode === "word";
  const strokeC = assColor(style.strokeColor);
  for (let i = 0; i < cfg.lines.length; i++) {
    const line = cfg.lines[i];
    const lineText = cleanLyricText(line.text);
    if (!lineText) continue;
    const startT = line.t;
    let endT = line.end > line.t ? line.end : cfg.lines[i + 1]?.t ?? (duration > startT ? duration : startT + 3);
    if (duration > 0) endT = Math.min(endT, duration);
    if (endT <= startT) endT = startT + 0.2;
    const start = ts(startT);
    const end = ts(endT);
    const dur = Math.max(0.2, endT - startT);
    const cleanWords = (line.words ?? []).map((w) => ({ t: w.t, end: w.end, text: cleanLyricText(w.text) })).filter((w) => w.text);
    if (useWordMode && cleanWords.length > 0) {
      for (let wi = 0; wi < cleanWords.length; wi++) {
        const w = cleanWords[wi];
        const wStart = Math.max(startT, Math.min(w.t, endT));
        const wEnd = Math.min(endT, cleanWords[wi + 1]?.t ?? endT);
        if (wEnd <= wStart + 0.01) continue;
        if (wi === 0 && w.t - startT > 0.12) {
          out += `Dialogue: 0,${ts(startT)},${ts(w.t)},Default,,0,0,0,,{${posOverride}\\1c${base}\\bord${style.strokeWidth}\\3c${strokeC}}${escapeText(w.text)}
`;
        }
        out += `Dialogue: 0,${ts(wStart)},${ts(wEnd)},Default,,0,0,0,,{\\fad(40,40)${posOverride}\\1c${hi}\\bord${style.strokeWidth}\\3c${strokeC}}${escapeText(w.text)}
`;
      }
      continue;
    }
    let karaoke;
    if (cleanWords.length > 0) {
      karaoke = "";
      let cursor = startT;
      for (const w of cleanWords) {
        const silenceCs = Math.max(0, Math.round((w.t - cursor) * 100));
        if (silenceCs > 0) karaoke += `{\\kf${silenceCs}}`;
        const wordCs = Math.max(5, Math.round((w.end - w.t) * 100));
        karaoke += `{\\kf${wordCs}}${escapeText(w.text)} `;
        cursor = w.end;
      }
    } else {
      const words = lineText.split(/\s+/);
      const csPerWord = Math.max(5, Math.floor(dur * 100 / words.length));
      karaoke = words.map((w) => `{\\k${csPerWord}}${escapeText(w)} `).join("");
    }
    const animFx = buildAnimFx(cfg.animation ?? "fade", Math.round(dur * 1e3));
    const fx = `{${animFx}${posOverride}\\1c${hi}\\2c${base}\\bord${style.strokeWidth}\\3c${strokeC}}`;
    out += `Dialogue: 0,${start},${end},Default,,0,0,0,,${fx}${karaoke.trim()}
`;
  }
  return out;
}
function buildAnimFx(anim, durMs) {
  const fadeIn = Math.min(200, Math.round(durMs * 0.15));
  const fadeOut = Math.min(250, Math.round(durMs * 0.2));
  switch (anim) {
    case "none":
      return "";
    case "fade":
      return `\\fad(${fadeIn},${fadeOut})`;
    case "slide-up":
      return `\\fad(${fadeIn},${fadeOut})\\t(0,${fadeIn},\\fscx100\\fscy100)\\move(0,40,0,0,0,${fadeIn})`;
    case "slide-down":
      return `\\fad(${fadeIn},${fadeOut})\\move(0,-40,0,0,0,${fadeIn})`;
    case "scale-pop":
      return `\\fad(${fadeIn},${fadeOut})\\fscx60\\fscy60\\t(0,${fadeIn},\\fscx105\\fscy105)\\t(${fadeIn},${fadeIn + 80},\\fscx100\\fscy100)`;
    case "bounce": {
      const b = Math.min(120, fadeIn);
      return `\\fad(${b},${fadeOut})\\t(0,${b},\\fscx102\\fscy102)\\t(${b},${b * 2},\\fscx100\\fscy100)`;
    }
    case "glow-pulse": {
      const half = Math.round(durMs / 2);
      return `\\fad(${fadeIn},${fadeOut})\\blur3\\t(0,${half},\\blur1)\\t(${half},${durMs},\\blur3)`;
    }
    case "typewriter":
      return `\\fad(30,${fadeOut})`;
    default:
      return `\\fad(${fadeIn},${fadeOut})`;
  }
}
function buildLogoRingFilters(cfg) {
  const { audioIn, logoInputIdx, videoIn, W, H } = cfg;
  const D = Math.max(64, Math.round(Math.min(W, H) * cfg.size / 2) * 2);
  const T = Math.max(8, Math.round(D * 0.18 / 2) * 2);
  const cx = D / 2;
  const cy = D / 2;
  const Rin = cx - T;
  const padY = D - T;
  const logoX = Math.round(W * cfg.posX - D / 2);
  const logoY = Math.round(H * cfg.posY - D / 2);
  const stR = `st(0,sqrt((X-${cx})*(X-${cx})+(Y-${cy})*(Y-${cy})))`;
  const SX = `(${D - 1})*(atan2(Y-${cy},X-${cx})+PI)/(2*PI)`;
  const SY = `(${D - 1})-(ld(0)-${Rin})*(${T - 1})/${T}`;
  const ch = (fn) => `gte(${stR},${Rin})*lte(ld(0),${cx})*${fn}(${SX},${SY})`;
  const geqOpts = `r='${ch("r")}':g='${ch("g")}':b='${ch("b")}':a='${ch("r")}'`;
  const filters = [
    // ① Spectrum strip: D wide × T tall, white bars on black, format=rgba.
    //   Note: showfreqs alpha is always 255 — transparency added via geq alpha expr.
    `${audioIn}showfreqs=s=${D}x${T}:mode=bar:ascale=cbrt:fscale=log:colors=0xFFFFFF:win_size=2048,format=rgba[lstrip]`,
    // ② Pad strip to D×D: strip at bottom y=[padY..D-1], transparent above.
    `[lstrip]pad=${D}:${D}:0:${padY}:color=black@0[lpadded]`,
    // ③ Polar coordinate transform via geq.
    //   Maps each ring pixel (X,Y) → strip pixel (SX,SY) by polar math.
    //   st()/ld() pattern avoids recomputing sqrt; no ';' avoids chain-split bug.
    `[lpadded]geq=${geqOpts}[lring]`,
    // ④ Scale logo to D×D (letterbox), apply opacity.
    `[${logoInputIdx}:v]scale=${D}:${D}:force_original_aspect_ratio=decrease,pad=${D}:${D}:(ow-iw)/2:(oh-ih)/2:color=black@0,format=rgba,colorchannelmixer=aa=${cfg.opacity.toFixed(2)}[llogo]`,
    // ⑤ Overlay logo on ring (logo on top).
    `[lring][llogo]overlay=0:0:format=auto[lcomp]`,
    // ⑥ Overlay composite onto main video.
    `${videoIn}[lcomp]overlay=${logoX}:${logoY}:format=auto[wlogo]`
  ];
  return { filters, videoOut: "[wlogo]" };
}
const { createCanvas: createCanvas$1, loadImage } = require("@napi-rs/canvas");
const MAX_PNG_DURATION = 99999;
function hslShift(base, t) {
  const hue = t * 360 % 360;
  return `hsl(${hue}, 90%, 60%)`;
}
async function createLogoDrawer(project, audioPath, duration, fps, W, H, baseSeconds, dummy = false) {
  const logo = project.logo;
  if (!logo.enabled || !logo.path) return null;
  const renderDur = Math.min(duration, Math.max(20, baseSeconds));
  const effectiveFps = fps;
  const src = await loadFrameSource(audioPath, effectiveFps, logo.bars, renderDur);
  if (!src.count) return null;
  const beats = dummy ? [] : await sidecarService.analyze(audioPath).then((a) => a.beats ?? []).catch(() => []);
  const useBeats = beats.length >= 4;
  const img = await loadImage(logo.path);
  const minDim = Math.min(W, H);
  const cx = W * logo.posX;
  const cy = H * logo.posY;
  const logoR = minDim * logo.size / 2;
  const ringBase = minDim * logo.ringRadius;
  const bars = logo.bars;
  const totalFrames = Math.min(src.count, Math.ceil(renderDur * effectiveFps));
  const doRotate = logo.rotate ?? false;
  const reqSecPerRev = Math.max(2, Math.min(20, logo.rotateSecPerRev ?? 8));
  const revs = Math.max(1, Math.round(renderDur / reqSecPerRev));
  const effSecPerRev = renderDur / revs;
  const ringFrames = [];
  for (let f = 0; f < totalFrames; f++) ringFrames.push(Array.from(src.at(f)));
  if (renderDur < duration - 0.05) crossfadeLoop(ringFrames, effectiveFps);
  const doPulse = logo.logoPulse ?? false;
  const doBounce = logo.logoBeatBounce ?? false;
  const doParticles = logo.particles ?? false;
  const pf = customText.createParticleField();
  let prevBass = 0;
  let bounce = 0;
  let beatIdx = 0;
  const dtNative = 30 / effectiveFps;
  const drawFrame = (ctx, f) => {
    const frame = ringFrames[Math.min(f, totalFrames - 1)];
    const energy = customText.bassEnergy(frame);
    let beatHere;
    if (useBeats) {
      const tSec = f / effectiveFps;
      const tNext = (f + 1) / effectiveFps;
      beatHere = false;
      while (beatIdx < beats.length && beats[beatIdx] < tNext) {
        if (beats[beatIdx] >= tSec) beatHere = true;
        beatIdx++;
      }
    } else {
      beatHere = energy - prevBass > 0.05 * dtNative;
    }
    prevBass = energy;
    const bassBeat = beatHere && energy > 0.18;
    if (bassBeat) bounce = 1;
    bounce *= Math.pow(0.8, dtNative);
    const scale = doBounce ? 1 + bounce * 0.18 : doPulse ? 1 + energy * 0.12 : 1;
    const effRadius = logoR * scale;
    if (doParticles) {
      customText.stepParticles(ctx, pf, {
        cx,
        cy,
        minDim,
        energy,
        color: logo.particleColor ?? "#ffd24a",
        rgb: logo.particleRgb ?? false,
        t: f / effectiveFps,
        dt: dtNative,
        spawnRadius: effRadius,
        style: logo.particleStyle ?? "burst",
        speed: logo.particleSpeed ?? 1,
        forceBurst: bassBeat
      });
    }
    drawRing(ctx, frame, {
      cx,
      cy,
      ringBase,
      minDim,
      bars,
      thickness: logo.ringThickness,
      color: logo.ringColor,
      rgb: logo.rgb,
      glow: logo.glow,
      intensity: logo.intensity,
      mode: logo.mode,
      style: logo.ringStyle ?? "bars",
      t: f / Math.max(1, totalFrames)
    });
    ctx.save();
    ctx.globalAlpha = logo.opacity;
    if (doRotate) {
      const angle = f / effectiveFps / effSecPerRev * Math.PI * 2;
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.arc(0, 0, effRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, -effRadius, -effRadius, effRadius * 2, effRadius * 2);
    } else {
      ctx.beginPath();
      ctx.arc(cx, cy, effRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, cx - effRadius, cy - effRadius, effRadius * 2, effRadius * 2);
    }
    ctx.restore();
  };
  return { totalFrames, drawFrame };
}
async function logoSpectrumOverlay(project, audioPath, duration, fps, W, H, tmpDir, baseSeconds = ANALYSIS_CAP_SEC) {
  if (duration > MAX_PNG_DURATION) return null;
  const drawer = await createLogoDrawer(project, audioPath, duration, fps, W, H, baseSeconds);
  if (!drawer) return null;
  const dir = node_path.join(tmpDir, "logo");
  await node_fs.promises.mkdir(dir, { recursive: true });
  const canvas = createCanvas$1(W, H);
  const ctx = canvas.getContext("2d");
  for (let f = 0; f < drawer.totalFrames; f++) {
    ctx.clearRect(0, 0, W, H);
    drawer.drawFrame(ctx, f);
    const buf = canvas.toBuffer("image/png");
    await node_fs.promises.writeFile(node_path.join(dir, `f${String(f + 1).padStart(6, "0")}.png`), buf);
  }
  return { dir, fps, frames: drawer.totalFrames };
}
function drawRing(ctx, frame, o) {
  customText.drawRingBands(ctx, {
    cx: o.cx,
    cy: o.cy,
    ringBase: o.ringBase,
    minDim: o.minDim,
    bars: o.bars,
    thickness: o.thickness,
    color: o.color,
    rgb: o.rgb,
    glow: o.glow,
    glowScale: 30,
    intensity: o.intensity,
    mode: o.mode,
    style: o.style,
    t: o.t,
    frame,
    colorAt: (i, n, _v) => o.rgb ? hslShift(o.color, (i / n + o.t) % 1) : o.color
  });
  ctx.shadowBlur = 0;
}
function drawPlaylistIcon(ctx, iconStyle, cx, cy, s) {
  if (iconStyle === "dot") {
    ctx.beginPath();
    ctx.arc(cx, cy, s * 0.32, 0, Math.PI * 2);
    ctx.fill();
  } else if (iconStyle === "bars") {
    const w = s * 0.16, h = s * 0.7;
    ctx.fillRect(cx - s * 0.28, cy - h / 2, w, h);
    ctx.fillRect(cx + s * 0.08, cy - h / 2, w, h);
  } else {
    const h = s * 0.5;
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.28, cy - h);
    ctx.lineTo(cx - s * 0.28, cy + h);
    ctx.lineTo(cx + s * 0.36, cy);
    ctx.closePath();
    ctx.fill();
  }
}
function drawPlaylistList(ctx, items, style, t, W, H) {
  if (!items.length) return;
  const scale = H / 1080;
  const activeIdx = items.findIndex((it) => t >= it.start && t < it.start + it.duration);
  const lineH = (style.fontSize + style.spacing) * scale;
  const blockH = items.length * lineH;
  const anchorY = style.position === "custom" ? H * style.posY : style.position === "top" ? H * 0.12 + blockH / 2 : style.position === "bottom" ? H * 0.88 - blockH / 2 : H / 2;
  const startY = anchorY - blockH / 2;
  const x = style.position === "custom" ? W * style.posX : style.align === "left" ? W * 0.08 : style.align === "right" ? W * 0.92 : W / 2;
  ctx.textAlign = style.align === "left" ? "left" : style.align === "right" ? "right" : "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${style.fontSize * scale}px ${style.fontFamily}, sans-serif`;
  if (style.shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 8 * scale;
    ctx.shadowOffsetY = 2 * scale;
  }
  for (let i = 0; i < items.length; i++) {
    ctx.save();
    const isActive = i === activeIdx;
    ctx.fillStyle = isActive ? style.activeColor : style.inactiveColor;
    ctx.globalAlpha = isActive ? style.opacity : style.opacity * 0.55;
    const y = startY + i * lineH;
    const iconX = x - style.fontSize * 1.1 * scale;
    if (style.strokeWidth > 0) {
      ctx.strokeStyle = style.strokeColor;
      ctx.lineWidth = style.strokeWidth * scale * 2;
      ctx.lineJoin = "round";
      ctx.strokeText(items[i].title, x, y);
    }
    if (isActive && style.iconStyle) drawPlaylistIcon(ctx, style.iconStyle, iconX, y, style.fontSize * scale);
    ctx.fillText(items[i].title, x, y);
    ctx.restore();
  }
}
function drawPlaylistFrame(ctx, items, style, W, H, activeRow, onlyActiveRow = false, pulse = 1) {
  if (!items.length) return;
  const scale = H / 1080;
  const lineH = (style.fontSize + style.spacing) * scale;
  const blockH = items.length * lineH;
  const anchorY = style.position === "custom" ? H * style.posY : style.position === "top" ? H * 0.12 + blockH / 2 : style.position === "bottom" ? H * 0.88 - blockH / 2 : H / 2;
  const startY = anchorY - blockH / 2;
  const x = style.position === "custom" ? W * style.posX : style.align === "left" ? W * 0.08 : style.align === "right" ? W * 0.92 : W / 2;
  ctx.textAlign = style.align === "left" ? "left" : style.align === "right" ? "right" : "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${style.fontSize * scale}px ${style.fontFamily}, sans-serif`;
  if (style.shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 8 * scale;
    ctx.shadowOffsetY = 2 * scale;
  }
  for (let i = 0; i < items.length; i++) {
    const isActive = i === activeRow;
    if (onlyActiveRow && !isActive) continue;
    ctx.save();
    ctx.fillStyle = isActive ? style.activeColor : style.inactiveColor;
    ctx.globalAlpha = isActive ? style.opacity * pulse : style.opacity * 0.55;
    const y = startY + i * lineH;
    const iconX = x - style.fontSize * 1.1 * scale;
    if (style.strokeWidth > 0) {
      ctx.strokeStyle = style.strokeColor;
      ctx.lineWidth = style.strokeWidth * scale * 2;
      ctx.lineJoin = "round";
      ctx.strokeText(items[i].title, x, y);
    }
    if (isActive && style.iconStyle) drawPlaylistIcon(ctx, style.iconStyle, iconX, y, style.fontSize * scale);
    ctx.fillText(items[i].title, x, y);
    ctx.restore();
  }
}
const { createCanvas } = require("@napi-rs/canvas");
function hasCanvasOverlay(project) {
  return !!project.spectrum.enabled || !!project.spectrumLayers?.some((l) => l.enabled) || !!project.overlayLayers?.some((l) => l.enabled) || project.logo.enabled && !!project.logo.path || !!project.customTexts?.some((t) => t.enabled && t.text);
}
async function prerenderPlaylistPngs(project, W, H, dir) {
  const items = project.playlist?.items ?? [];
  if (!items.length) return null;
  const style = project.playlist.style;
  const drawOne = async (file, activeRow, onlyActive) => {
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    drawPlaylistFrame(ctx, items, style, W, H, activeRow, onlyActive, 1);
    const p = node_path.join(dir, file);
    await node_fs.promises.writeFile(p, canvas.toBuffer("image/png"));
    return p;
  };
  const base = await drawOne("pl_base.png", -1, false);
  const actives = [];
  for (let k = 0; k < items.length; k++) {
    actives.push({ path: await drawOne(`pl_act_${k}.png`, k, true), start: items[k].start, end: items[k].start + items[k].duration });
  }
  return { base, actives };
}
async function streamCombinedOverlayFrames(project, audioPath, duration, fps, W, H, stdin, windowSec = duration, dummy = false, includePlaylist = false) {
  const drawers = [];
  if (project.spectrum.enabled) {
    const d = await createSpectrumDrawer(project.spectrum, audioPath, duration, fps, W, H, windowSec, dummy);
    if (d) drawers.push(d);
  }
  if (project.spectrumLayers?.length) {
    const d = await createSpectrumLayersDrawer(project.spectrumLayers, audioPath, duration, fps, W, H, windowSec, dummy);
    if (d) drawers.push(d);
  }
  const overlayEnabled = (project.overlayLayers ?? []).filter((l) => l.enabled);
  if (overlayEnabled.length) {
    drawers.push({
      totalFrames: Math.ceil(Math.min(duration, windowSec) * fps),
      drawFrame: (ctx2, f) => customText.drawOverlayLayers(ctx2, overlayEnabled, f / fps, W, H)
    });
  }
  if (project.logo.enabled && project.logo.path) {
    const d = await createLogoDrawer(project, audioPath, duration, fps, W, H, windowSec, dummy);
    if (d) drawers.push(d);
  }
  const plItems = project.playlist?.items ?? [];
  if (includePlaylist && plItems.length) {
    drawers.push({
      totalFrames: Math.ceil(duration * fps),
      drawFrame: (ctx2, f) => drawPlaylistList(ctx2, plItems, project.playlist.style, f / fps, W, H)
    });
  }
  const texts = (project.customTexts ?? []).filter((tx) => tx.enabled && tx.text);
  if (texts.length) {
    drawers.push({
      totalFrames: Math.ceil(Math.min(duration, windowSec) * fps),
      drawFrame: (ctx2, f) => customText.drawCustomTexts(ctx2, texts, f / fps, W, H)
    });
  }
  if (!drawers.length) return;
  const totalFrames = Math.max(...drawers.map((d) => d.totalFrames));
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  for (let f = 0; f < totalFrames; f++) {
    ctx.clearRect(0, 0, W, H);
    for (const d of drawers) d.drawFrame(ctx, f);
    const data = ctx.getImageData(0, 0, W, H).data;
    const buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
    if (!stdin.write(buf)) await node_events.once(stdin, "drain");
  }
}
const WARMUP_FRAMES = 90;
function canUseOverlayMT(project) {
  if (!isReactive(project)) return false;
  if (!hasCanvasOverlay(project)) return false;
  if (project.footage.type === "video") return false;
  if ((project.customOverlays ?? []).some((o) => o.enabled && o.path)) return false;
  if ((project.footage.beatEffect ?? "none") !== "none") return false;
  if ((project.effects?.glow ?? 0) > 0.01) return false;
  if (buildEffectFilters(project.effects).length > 0) return false;
  return true;
}
async function renderOverlaySegmentsMT(opts) {
  const { project, fps, W, H, duration } = opts;
  const totalFrames = Math.ceil(duration * fps);
  const cores = Math.max(1, os.cpus().length);
  const N = Math.max(2, Math.min(opts.maxWorkers, cores, Math.ceil(totalFrames / (fps * 5))));
  if (N < 2 || totalFrames < fps * 8) return null;
  const bandSet = /* @__PURE__ */ new Set();
  if (project.spectrum.enabled) bandSet.add(Math.max(16, Math.min(160, project.spectrum.bars)));
  const layers = (project.spectrumLayers ?? []).filter((l) => l.enabled);
  if (layers.length) bandSet.add(Math.max(...layers.map((l) => l.bars)));
  if (project.logo.enabled && project.logo.path) bandSet.add(project.logo.bars);
  if (!bandSet.size) return null;
  const bins = {};
  const binPaths = [];
  try {
    for (const bands of bandSet) {
      const p = node_path.join(opts.tmpDir, `spec_${bands}.bin`);
      const r = await sidecarService.spectrumToBinFile(opts.audioPath, fps, bands, duration + 1, p);
      if (!r.count) return null;
      bins[String(bands)] = { path: p, count: r.count, bands: r.bands };
      binPaths.push(p);
    }
  } catch (e) {
    opts.log(`MT: spectrum bin gagal (${e.message}) — single-thread`);
    return null;
  }
  const beats = project.logo.enabled && project.logo.path ? await sidecarService.analyze(opts.audioPath).then((a) => a.beats ?? []).catch(() => []) : [];
  const segFrames = Math.ceil(totalFrames / N);
  const segPaths = [];
  const workerScript = node_path.join(__dirname, "overlayWorker.js");
  opts.log(`MT: ${N} worker × segmen (${cores} core) — render paralel`);
  const tasks = [];
  for (let k = 0; k < N; k++) {
    const blockStart = k * segFrames;
    if (blockStart >= totalFrames) break;
    const blockEnd = Math.min((k + 1) * segFrames, totalFrames);
    const winStart = Math.max(0, blockStart - WARMUP_FRAMES);
    const segPath = node_path.join(opts.tmpDir, `seg_${String(k).padStart(3, "0")}.mp4`);
    segPaths.push(segPath);
    const jobData = {
      ffmpeg: opts.ffmpeg,
      segPath,
      segIndex: k,
      fps,
      W,
      H,
      winStart,
      blockStart,
      blockEnd,
      renderDur: duration,
      footage: { type: opts.imagePath ? "image" : "none", imagePath: opts.imagePath },
      vcodec: opts.vcodec,
      encoderArgs: opts.encoderArgs,
      project,
      bins,
      beats,
      logoPath: project.logo.path ?? null
    };
    tasks.push(new Promise((resolve, reject) => {
      const w = new node_worker_threads.Worker(workerScript, { workerData: jobData });
      w.once("message", (m) => {
        w.terminate();
        if (m.ok) resolve();
        else reject(new Error(m.error || "worker error"));
      });
      w.once("error", reject);
      w.once("exit", (code2) => {
        if (code2 !== 0) reject(new Error(`worker exit ${code2}`));
      });
    }));
  }
  try {
    await Promise.all(tasks);
  } catch (e) {
    opts.log(`MT: worker gagal (${e.message}) — single-thread`);
    await Promise.all(binPaths.map((p) => node_fs.promises.unlink(p).catch(() => {
    })));
    return null;
  }
  await Promise.all(binPaths.map((p) => node_fs.promises.unlink(p).catch(() => {
  })));
  const listPath = node_path.join(opts.tmpDir, "mt_concat.txt");
  const listBody = segPaths.map((p) => `file '${p.replace(/\\/g, "/").replace(/'/g, "'\\''")}'`).join("\n");
  await node_fs.promises.writeFile(listPath, listBody, "utf-8");
  const fullPath = node_path.join(opts.tmpDir, "mtfull.mp4");
  const cat = node_child_process.spawn(opts.ffmpeg, ["-hide_banner", "-y", "-f", "concat", "-safe", "0", "-i", listPath, "-c", "copy", fullPath], { windowsHide: true });
  let catErr = "";
  cat.stderr.on("data", (d) => {
    catErr += d.toString();
    if (catErr.length > 4e3) catErr = catErr.slice(-4e3);
  });
  const [code] = await node_events.once(cat, "close");
  if (code !== 0) {
    opts.log(`MT: concat gagal (${catErr.slice(-300)}) — single-thread`);
    return null;
  }
  opts.log("MT: segmen tergabung — finalisasi (audio + lirik/playlist)");
  return fullPath;
}
const DECAY_SEC = 0.12;
function buildBeatEffectFilter(footage, beats, videoIn, W, H, periodicInterval, phaseOffset = 0) {
  const preset = footage.beatEffect ?? "none";
  if (preset === "none") return null;
  if (!periodicInterval && beats.length === 0) return null;
  const intensity = Math.max(0.1, Math.min(1, footage.beatEffectIntensity ?? 0.6));
  let strengthExpr;
  if (periodicInterval && periodicInterval > 0) {
    const iv = periodicInterval.toFixed(4);
    const off = phaseOffset.toFixed(4);
    const phase = `mod(T-${off}+${iv},${iv})`;
    strengthExpr = `(max(0,1-${phase}/${DECAY_SEC.toFixed(3)})*${intensity.toFixed(3)})`;
  } else {
    const strengthTerms = beats.map(
      (b) => `max(0,1-(T-${b.toFixed(3)})/${DECAY_SEC.toFixed(3)})`
    ).join(",");
    strengthExpr = `(min(1,max(${strengthTerms}))*${intensity.toFixed(3)})`;
  }
  const filters = [];
  let videoOut = videoIn;
  switch (preset) {
    case "flash": {
      const s = `(${strengthExpr})*0.8`;
      filters.push(
        `${videoIn}geq=r='min(255,r(X,Y)+255*(${s}))':g='min(255,g(X,Y)+255*(${s}))':b='min(255,b(X,Y)+255*(${s}))':a='alpha(X,Y)'[vbeatfx]`
      );
      videoOut = "[vbeatfx]";
      break;
    }
    case "brightness-pulse": {
      const s = `(${strengthExpr})*0.5`;
      filters.push(
        `${videoIn}geq=r='min(255,r(X,Y)+255*(${s}))':g='min(255,g(X,Y)+255*(${s}))':b='min(255,b(X,Y)+255*(${s}))':a='alpha(X,Y)'[vbeatfx]`
      );
      videoOut = "[vbeatfx]";
      break;
    }
    case "color-flash": {
      const s = `(${strengthExpr})*0.6`;
      filters.push(
        `${videoIn}geq=r='min(255,r(X,Y)+255*(${s}))':g='min(255,g(X,Y)+255*(${s})*0.3)':b='min(255,b(X,Y)+255*(${s})*0.7)':a='alpha(X,Y)'[vbeatfx]`
      );
      videoOut = "[vbeatfx]";
      break;
    }
    case "vignette-pulse": {
      const s = `(${strengthExpr})*0.7`;
      const cx = W / 2;
      const cy = H / 2;
      const maxD = Math.sqrt(cx * cx + cy * cy);
      const vigExpr = `max(0,1-(${s})*pow((sqrt((X-${cx})*(X-${cx})+(Y-${cy})*(Y-${cy}))/${maxD.toFixed(1)}),0.8))`;
      filters.push(
        `${videoIn}geq=r='r(X,Y)*${vigExpr}':g='g(X,Y)*${vigExpr}':b='b(X,Y)*${vigExpr}':a='alpha(X,Y)'[vbeatfx]`
      );
      videoOut = "[vbeatfx]";
      break;
    }
    case "zoom-pulse":
    case "zoom-in": {
      const s = `(${strengthExpr})*0.6`;
      const cx = W / 2;
      const cy = H / 2;
      const maxD = Math.sqrt(cx * cx + cy * cy) * 0.7;
      const ringExpr = `(${s})*exp(-pow((sqrt((X-${cx})*(X-${cx})+(Y-${cy})*(Y-${cy}))-${maxD.toFixed(1)}),2)/(2*pow(${(maxD * 0.3).toFixed(1)},2)))`;
      filters.push(
        `${videoIn}geq=r='min(255,r(X,Y)+255*${ringExpr})':g='min(255,g(X,Y)+255*${ringExpr})':b='min(255,b(X,Y)+255*${ringExpr})':a='alpha(X,Y)'[vbeatfx]`
      );
      videoOut = "[vbeatfx]";
      break;
    }
    case "shake":
    case "shake-hard":
    case "zoom-shake": {
      const amp = preset === "shake" ? 8 : 18;
      const s = periodicInterval && periodicInterval > 0 ? `(max(0,1-mod(t-${phaseOffset.toFixed(4)}+${periodicInterval.toFixed(4)},${periodicInterval.toFixed(4)})/${DECAY_SEC.toFixed(3)})*${intensity.toFixed(3)})` : strengthExpr;
      const margin = amp * 2;
      const upW = W + margin * 2;
      const upH = H + margin * 2;
      const ox = `(${margin}+(${s})*${amp}*sin(n*7.3+1.2))`;
      const oy = `(${margin}+(${s})*${amp}*cos(n*5.7+2.4))`;
      filters.push(
        `${videoIn}scale=${upW}:${upH},crop=${W}:${H}:x='${ox}':y='${oy}'[vbeatfx]`
      );
      videoOut = "[vbeatfx]";
      break;
    }
    case "rgb-split": {
      const off = `(${strengthExpr})*${Math.round(W * 0.018)}`;
      filters.push(
        `${videoIn}geq=r='r(clip(X-${off},0,${W - 1}),Y)':g='g(X,Y)':b='b(clip(X+${off},0,${W - 1}),Y)':a='alpha(X,Y)'[vbeatfx]`
      );
      videoOut = "[vbeatfx]";
      break;
    }
    case "strobe-cut": {
      const s = `(${strengthExpr})*0.6`;
      const strobeExpr = `if(gt(sin(T*PI*18),0),${s},-${s}*0.5)`;
      filters.push(
        `${videoIn}geq=r='clip(r(X,Y)+255*(${strobeExpr}),0,255)':g='clip(g(X,Y)+255*(${strobeExpr}),0,255)':b='clip(b(X,Y)+255*(${strobeExpr}),0,255)':a='alpha(X,Y)'[vbeatfx]`
      );
      videoOut = "[vbeatfx]";
      break;
    }
    case "tilt":
    case "zoom-out":
      return null;
    default:
      return null;
  }
  return { filters, videoOut };
}
const FFMPEG_BLEND_MODE = {
  normal: null,
  chroma: null,
  screen: "screen",
  add: "addition",
  lighten: "lighten",
  overlay: "overlay",
  "soft-light": "softlight",
  "hard-light": "hardlight",
  multiply: "multiply",
  darken: "darken",
  difference: "difference"
};
function hexToFfColor(hex) {
  const h = (hex || "#00ff00").replace("#", "").padEnd(6, "0").slice(0, 6);
  return "0x" + h;
}
function buildOverlayProcessSteps(o, W, H) {
  const boxW = Math.max(2, Math.round(W * o.scale));
  const boxH = Math.max(2, Math.round(H * o.scale));
  const steps = [];
  steps.push(`scale=${boxW}:${boxH}:force_original_aspect_ratio=decrease`);
  steps.push(`format=rgba`);
  if (o.rotation % 360 !== 0) {
    const rad = o.rotation * Math.PI / 180;
    steps.push(`rotate=${rad.toFixed(5)}:ow=rotw(${rad.toFixed(5)}):oh=roth(${rad.toFixed(5)}):c=none`);
  }
  if (o.blend === "chroma") {
    const color = hexToFfColor(o.chroma.color);
    const sim = Math.max(0.01, o.chroma.similarity).toFixed(3);
    const bl = Math.max(0, o.chroma.smoothness).toFixed(3);
    steps.push(`chromakey=${color}:${sim}:${bl}`);
    if (o.chroma.spill > 0) steps.push(`despill=type=green:mix=${o.chroma.spill.toFixed(3)}`);
    if (o.chroma.feather > 0) {
      const r = Math.max(1, Math.round(o.chroma.feather * 6));
      steps.push(`format=rgba,gblur=sigma=${r}:steps=1`);
    }
  }
  if (o.opacity < 0.999) {
    steps.push(`format=rgba,colorchannelmixer=aa=${o.opacity.toFixed(3)}`);
  }
  return steps;
}
function buildCustomOverlayFilters(args) {
  const { overlay: o, inputIdx, videoIn, W, H, tag, preProcessed } = args;
  const filters = [];
  const src = `[${inputIdx}:v]`;
  const lay = `[col${tag}]`;
  const out = `[vco${tag}]`;
  const steps = preProcessed ? ["format=rgba"] : buildOverlayProcessSteps(o, W, H);
  filters.push(`${src}${steps.join(",")}${lay}`);
  const mode = FFMPEG_BLEND_MODE[o.blend];
  if (!mode) {
    const x2 = `(main_w*${o.posX.toFixed(4)}-overlay_w/2)`;
    const y2 = `(main_h*${o.posY.toFixed(4)}-overlay_h/2)`;
    filters.push(`${videoIn}${lay}overlay=${x2}:${y2}:eof_action=pass:format=auto${out}`);
    return { filters, videoOut: out };
  }
  const x = `(W*${o.posX.toFixed(4)}-w/2)`;
  const y = `(H*${o.posY.toFixed(4)}-h/2)`;
  filters.push(`color=c=black@0.0:s=${W}x${H}:r=30,format=rgba[bg${tag}]`);
  filters.push(`[bg${tag}]${lay}overlay=${x}:${y}:format=auto,format=rgba[pf${tag}]`);
  filters.push(`[pf${tag}]split=2[pcol${tag}][pa${tag}]`);
  filters.push(`[pa${tag}]alphaextract,format=gray[msk${tag}]`);
  filters.push(`${videoIn}format=gbrp,split=2[b0_${tag}][b1_${tag}]`);
  filters.push(`[pcol${tag}]format=gbrp[pc${tag}]`);
  filters.push(`[b0_${tag}][pc${tag}]blend=all_mode=${mode}:shortest=1,format=gbrp[bld${tag}]`);
  filters.push(`[b1_${tag}][bld${tag}][msk${tag}]maskedmerge,format=rgba${out}`);
  return { filters, videoOut: out };
}
const STATIC_BASE_IMAGE_SEC = 30;
const STATIC_BASE_VIDEO_SEC = 5 * 60;
const PLAYLIST_SNAP_L = 15;
function baseWindowFor(project, duration) {
  if (!isReactive(project)) {
    const win = project.footage.type === "image" ? STATIC_BASE_IMAGE_SEC : STATIC_BASE_VIDEO_SEC;
    return Math.min(duration, win);
  }
  return duration;
}
const BATCH_SPECTRUM_PALETTE = [
  "#b15aff",
  // purple
  "#ff5ad1",
  // pink
  "#5aff8f",
  // mint green
  "#ffd25a",
  // amber
  "#ff6b5a",
  // coral
  "#5a8dff",
  // indigo
  "#aef25a",
  // lime
  "#ff8ac2"
  // rose
];
function encoderToCodec(id, vcodec) {
  if (vcodec === "h265") {
    switch (id) {
      case "nvenc":
        return "hevc_nvenc";
      case "amf":
        return "hevc_amf";
      case "qsv":
        return "hevc_qsv";
      default:
        return "libx265";
    }
  }
  switch (id) {
    case "nvenc":
      return "h264_nvenc";
    case "amf":
      return "h264_amf";
    case "qsv":
      return "h264_qsv";
    default:
      return "libx264";
  }
}
function ffPathEscape(p) {
  return p.replace(/\\/g, "/").replace(/'/g, "'\\''");
}
function cleanTitle(name) {
  return name.replace(/^\s*\d{1,3}\s*[-_.,)]+\s*/, "").replace(/^[\s,;.\-_]+/, "").replace(/[_]+/g, " ").replace(/\s{2,}/g, " ").trim();
}
async function copyUserFontsTo(fntDest) {
  try {
    const dir = userFontsDir();
    const files = (await node_fs.promises.readdir(dir)).filter((f) => /\.(ttf|otf)$/i.test(f));
    await Promise.all(files.map((f) => node_fs.promises.copyFile(node_path.join(dir, f), node_path.join(fntDest, f)).catch(() => {
    })));
  } catch {
  }
}

function escapeSubtitlesPath(p) {
  let escaped = String(p).replace(/\\/g, "/");
  escaped = escaped.replace(/:/g, "\\:");
  escaped = escaped.replace(/'/g, "'\\''");
  return "'" + escaped + "'";
}
class RenderService {
  current = null;
  cancelled = false;
  isRendering = false;
  emit(win, p) {
    win?.webContents.send(IPC.renderEvent, p);
  }
  /** Send a log-only line (keeps the current job/progress context). */
  log(win, job, index, total, line) {
    win?.webContents.send(IPC.renderEvent, {
      ...baseProgress(job.jobId, index, total, basename(job.outputPath), "preparing"),
      logLine: line
    });
  }
  async cancel() {
    this.cancelled = true;
    if (this.current) {
      const proc = this.current;
      try {
        if (proc.stdin && proc.stdin.writable) {
          proc.stdin.write("q");
        }
      } catch {}
      try {
        proc.kill("SIGTERM");
      } catch {}
      setTimeout(() => {
        try {
          if (proc.exitCode === null) {
            proc.kill("SIGKILL");
          }
        } catch {}
      }, 5000);
    }
  }
  async render(win, project, jobs) {
    if (this.isRendering) {
      this.emit(win, baseProgress(jobs[0]?.jobId || "na", 0, jobs.length, "", "error", "Render sudah berjalan"));
      return;
    }
    this.isRendering = true;
    this.cancelled = false;
    writeLog("render.log", `Starting render for project "${project.name}" with ${jobs.length} jobs.`);
    
    // Disk space check: require at least 500MB free in userData directory
    try {
      const stats = await node_fs.promises.statfs(electron.app.getPath("userData"));
      const freeSpaceBytes = stats.bavail * stats.frsize;
      if (freeSpaceBytes < 500 * 1024 * 1024) {
        throw new Error(`Ruang penyimpanan tidak mencukupi untuk render. Membutuhkan minimal 500 MB (Tersedia: ${(freeSpaceBytes / 1024 / 1024).toFixed(1)} MB).`);
      }
    } catch (err) {
      if (err.message.includes("Ruang penyimpanan tidak mencukupi")) {
        this.emit(win, baseProgress(jobs[0]?.jobId || "na", 0, jobs.length, "", "error", err.message));
        this.isRendering = false;
        return;
      }
      console.warn("Disk space check failed to run:", err);
    }

    try {
      const ffmpeg = await ffmpegService.resolvedPath();
      if (!ffmpeg) {
        this.emit(win, baseProgress(jobs[0]?.jobId || "na", 0, jobs.length, "", "error", "FFmpeg not found"));
        return;
      }
      const hw = await hardwareService.detect();
      const settings = await configService.getAll();
      let encoderId = hw.selectedEncoder;
      if (project.export.encoder !== "auto") {
        const sel = hw.encoders.find((e) => e.id === project.export.encoder && e.available);
        encoderId = sel ? sel.id : hw.selectedEncoder;
      }
      for (let i = 0; i < jobs.length; i++) {
        if (this.cancelled) {
          writeLog("render.log", `Job loop cancelled before starting index ${i}`);
          this.emit(win, baseProgress(jobs[i].jobId, i, jobs.length, jobs[i].outputPath, "cancelled"));
          break;
        }
        const job = jobs[i];
        job.outputPath = uniqueOutput(job.outputPath);
        const fileName = basename(job.outputPath);
        const t0 = Date.now();
        const tmpDir = node_path.join(electron.app.getPath("userData"), "cache", "render", job.jobId);
        let success = false;
        writeLog("render.log", `Job ${job.jobId} [${i + 1}/${jobs.length}]: Preparing rendering for output "${job.outputPath}"...`);
        try {
          await node_fs.promises.mkdir(tmpDir, { recursive: true });
        this.emit(win, {
          ...baseProgress(job.jobId, i, jobs.length, fileName, "preparing"),
          task: "Preparing audio"
        });
        const prepared = await this.prepareAudio(win, project, job, tmpDir, i, jobs.length, ffmpeg);
        const duration = prepared.duration;
        this.log(win, job, i, jobs.length, `Audio siap (${formatDur(duration)})`);
        if (this.cancelled) throw new Error("Cancelled");
        const trackStarts = [];
        {
          let acc = 0;
          for (const d of prepared.chosenDurations) {
            trackStarts.push(acc);
            acc += d;
          }
        }
        let effectiveProject = project;
        if (showPlaylist(project) && prepared.chosenPaths.length > 0) {
          const n = prepared.chosenPaths.length;
          const fallbackPer = prepared.duration / n;
          const titleByFile = new Map(project.playlist.items.map((it) => [it.file, it.title]));
          const seen = /* @__PURE__ */ new Set();
          const autoItems = [];
          for (let k = 0; k < prepared.chosenPaths.length; k++) {
            const p = prepared.chosenPaths[k];
            if (seen.has(p)) continue;
            seen.add(p);
            const dur = prepared.chosenDurations[k] > 0 ? prepared.chosenDurations[k] : fallbackPer;
            autoItems.push({ file: p, title: titleByFile.get(p) || cleanTitle(node_path.basename(p, node_path.extname(p))), start: trackStarts[k] ?? 0, duration: dur });
          }
          effectiveProject = { ...project, playlist: { ...project.playlist, items: autoItems } };
        }
        if (showLyrics(project) && project.lyrics.autoTranscribe && !project.lyrics.lines.length) {
          const lang = effectiveProject.lyrics.whisperLanguage === "auto" ? void 0 : effectiveProject.lyrics.whisperLanguage;
          const useGroq = settings.transcribeProvider === "groq" && !!settings.groqApiKey;
          const maxSongs = effectiveProject.lyrics.maxSongs ?? 0;
          const distinct = [];
          for (const p of prepared.chosenPaths) if (!distinct.includes(p)) distinct.push(p);
          const allowed = maxSongs > 0 ? distinct.slice(0, maxSongs) : distinct;
          const linesByFile = /* @__PURE__ */ new Map();
          for (let d = 0; d < allowed.length; d++) {
            if (this.cancelled) throw new Error("Cancelled");
            const trackPath = allowed[d];
            this.log(win, job, i, jobs.length, `Menyiapkan lirik (${d + 1}/${allowed.length})…`);
            this.emit(win, { ...baseProgress(job.jobId, i, jobs.length, fileName, "preparing"), task: "Menyiapkan lirik…" });
            try {
              let lines = [];
              if (useGroq) {
                const results = await groqService.transcribeMany([trackPath], lang, decryptKey(settings.groqApiKey));
                lines = results[0]?.result?.lines ?? [];
              } else {
                const result = await sidecarService.transcribe(trackPath, effectiveProject.lyrics.whisperModel ?? "small", lang);
                lines = result.lines;
              }
              linesByFile.set(trackPath, lines);
            } catch {
              this.log(win, job, i, jobs.length, `Lirik (${d + 1}) dilewati`);
            }
          }
          const allLines = [];
          for (let k = 0; k < prepared.chosenPaths.length; k++) {
            const cached = linesByFile.get(prepared.chosenPaths[k]);
            if (!cached) continue;
            const offset = trackStarts[k] ?? 0;
            for (const ln of cached) {
              allLines.push({
                t: ln.t + offset,
                end: ln.end + offset,
                text: ln.text,
                words: ln.words?.map((w) => ({ t: w.t + offset, end: w.end + offset, text: w.text }))
              });
            }
          }
          if (allLines.length) {
            effectiveProject = { ...effectiveProject, lyrics: { ...effectiveProject.lyrics, lines: allLines } };
            this.log(win, job, i, jobs.length, "Lirik siap");
          } else {
            this.log(win, job, i, jobs.length, "Lirik dilewati");
          }
          if (this.cancelled) throw new Error("Cancelled");
        }
        if (jobs.length > 1 && i > 0) {
          const c = BATCH_SPECTRUM_PALETTE[(i - 1) % BATCH_SPECTRUM_PALETTE.length];
          effectiveProject = {
            ...effectiveProject,
            spectrum: { ...effectiveProject.spectrum, color: c },
            spectrumLayers: (effectiveProject.spectrumLayers ?? []).map((l) => ({ ...l, color: c })),
            logo: { ...effectiveProject.logo, ringColor: c }
          };
          this.log(win, job, i, jobs.length, `Warna spektrum batch #${i + 1}: ${c}`);
        }
        this.emit(win, {
          ...baseProgress(job.jobId, i, jobs.length, fileName, "preparing"),
          task: "Menyiapkan footage…"
        });
        let footageJob = job;
        if (effectiveProject.footage.type === "video" && job.footageOrder?.length) {
          const normMap = await this.normalizeFootage(
            job.footageOrder,
            effectiveProject.export.width,
            effectiveProject.export.height,
            effectiveProject.export.fps,
            ffmpeg,
            (d, total) => this.emit(win, {
              ...baseProgress(job.jobId, i, jobs.length, fileName, "preparing"),
              task: `Menormalkan footage… (${d}/${total})`,
              percent: Math.round(d / total * 5)
            })
          );
          footageJob = { ...job, footageOrder: job.footageOrder.map((p) => normMap.get(p) ?? p) };
        }
        if (effectiveProject.footage.type === "video" && (effectiveProject.footage.seamlessLoop ?? false) && footageJob.footageOrder && new Set(footageJob.footageOrder).size === 1 && footageJob.footageOrder[0]) {
          this.log(win, job, i, jobs.length, "Menyiapkan loop footage mulus…");
          const unit = await this.seamlessVideoUnit(footageJob.footageOrder[0], node_path.join(tmpDir, "footage_vunit.mp4"), effectiveProject.export.fps, ffmpeg).catch(() => null);
          if (unit) footageJob = { ...footageJob, footageOrder: [unit] };
        }
        if (this.cancelled) throw new Error("Cancelled");
        const baseWindow = await this.resolveBaseWindow(effectiveProject, footageJob.footageOrder ?? [], duration);
        const timeline = await this.footageTimeline(win, project, footageJob, prepared.audioPath, duration, baseWindow);
        if (this.cancelled) throw new Error("Cancelled");
        const jobAudio = { ...job, audioPath: prepared.audioPath };
        const L = baseWindow;
        const footageOrigClip = job.footageOrder?.[0] ?? effectiveProject.footage.items?.[0]?.path ?? null;
        const footageIsPrimary = prepared.sourceLabel === "footage-asmr";
        const mixedAudioPath = await this.buildMixedAudio(
          effectiveProject,
          prepared.audioPath,
          footageOrigClip,
          footageIsPrimary,
          duration,
          tmpDir,
          ffmpeg
        );
        if (this.cancelled) throw new Error("Cancelled");
        const willLoop = duration > L + 1;
        const baseVideoPath = willLoop ? await this.buildFootageBase(
          effectiveProject,
          timeline,
          encoderId,
          tmpDir,
          ffmpeg,
          () => {
          }
          // internal pipeline log suppressed (opaque flow)
        ) : null;
        if (this.cancelled) throw new Error("Cancelled");
        const useBaseLoop = willLoop;
        const emitProgress = (pct, task) => {
          this.emit(win, {
            jobId: job.jobId,
            index: i,
            total: jobs.length,
            fileName,
            task,
            percent: pct,
            elapsedMs: Date.now() - t0,
            etaMs: pct > 1 ? Math.round((Date.now() - t0) / pct * (100 - pct)) : 0,
            status: "rendering"
          });
        };
        const noop = () => {
        };
        const encodeWith = async (encId) => {
          if (useBaseLoop) {
            emitProgress(10, "Menyiapkan render…");
            const loopBuilt = await this.buildArgs(
              effectiveProject,
              jobAudio,
              duration,
              encId,
              settings.qualityMode,
              timeline,
              tmpDir,
              noop,
              baseVideoPath,
              [],
              "loop",
              baseWindow,
              mixedAudioPath
            );
            this.log(win, job, i, jobs.length, "Merender video…");
            this.emit(win, { ...baseProgress(job.jobId, i, jobs.length, fileName, "rendering"), task: "Merender video…", percent: 12 });
            await this.runFfmpeg(
              ffmpeg,
              loopBuilt.args,
              Math.min(duration, L),
              (pct) => emitProgress(12 + Math.round(pct * 0.66), "Merender video…"),
              loopBuilt.cwd,
              loopBuilt.feed
            );
            if (this.cancelled) throw new Error("Cancelled");
            this.log(win, job, i, jobs.length, "Finalisasi & menggabungkan audio…");
            const loopPath = node_path.join(tmpDir, "loop.mp4");
            const plItems = effectiveProject.playlist?.items ?? [];
            const playlistOn = showPlaylist(effectiveProject) && plItems.length > 0;
            const lyricsOn = showLyrics(effectiveProject) && effectiveProject.lyrics.lines.length > 0;
            if (playlistOn && !lyricsOn) {
              const built2 = await this.finalizePlaylistSnapped(
                effectiveProject,
                jobAudio,
                mixedAudioPath,
                duration,
                L,
                loopPath,
                encId,
                settings.qualityMode,
                tmpDir,
                ffmpeg,
                (pct, task) => emitProgress(78 + Math.round(pct * 0.22), task)
              );
              return built2;
            }
            const finalBuilt = await this.buildFinalArgs(
              effectiveProject,
              jobAudio,
              duration,
              encId,
              settings.qualityMode,
              loopPath,
              tmpDir,
              true,
              mixedAudioPath
            );
            this.emit(win, { ...baseProgress(job.jobId, i, jobs.length, fileName, "rendering"), task: "Finalisasi…", percent: 78 });
            await this.runFfmpeg(
              ffmpeg,
              finalBuilt.args,
              duration,
              (pct) => emitProgress(78 + Math.round(pct * 0.22), "Finalisasi…"),
              finalBuilt.cwd,
              finalBuilt.feed
            );
            return finalBuilt;
          }
          if (canUseOverlayMT(effectiveProject)) {
            const exp = effectiveProject.export;
            const vcodec = encoderToCodec(encId, exp.vcodec);
            const encArgs = encoderQuality(encId, exp, settings.qualityMode);
            const mtImage = timeline.isImage && timeline.segments[0] ? timeline.segments[0].path : null;
            const maxWorkers = encId === "x264" ? 6 : 3;
            this.log(win, job, i, jobs.length, "Render multicore (semua core)…");
            this.emit(win, { ...baseProgress(job.jobId, i, jobs.length, fileName, "rendering"), task: "Render multicore…", percent: 12 });
            const fullPath = await renderOverlaySegmentsMT({
              ffmpeg,
              project: effectiveProject,
              audioPath: jobAudio.audioPath,
              duration,
              fps: exp.fps,
              W: exp.width,
              H: exp.height,
              vcodec,
              encoderArgs: encArgs,
              imagePath: mtImage,
              tmpDir,
              maxWorkers,
              log: (line) => this.log(win, job, i, jobs.length, line)
            }).catch((e) => {
              this.log(win, job, i, jobs.length, `Multicore gagal: ${e.message}`);
              return null;
            });
            if (this.cancelled) throw new Error("Cancelled");
            if (fullPath) {
              const finalBuilt = await this.buildFinalArgs(
                effectiveProject,
                jobAudio,
                duration,
                encId,
                settings.qualityMode,
                fullPath,
                tmpDir,
                false,
                mixedAudioPath
              );
              this.emit(win, { ...baseProgress(job.jobId, i, jobs.length, fileName, "rendering"), task: "Finalisasi…", percent: 82 });
              await this.runFfmpeg(
                ffmpeg,
                finalBuilt.args,
                duration,
                (pct) => emitProgress(82 + Math.round(pct * 0.18), "Finalisasi…"),
                finalBuilt.cwd,
                finalBuilt.feed
              );
              return finalBuilt;
            }
          }
          this.log(win, job, i, jobs.length, "Merender video…");
          const onePass = await this.buildArgs(
            effectiveProject,
            jobAudio,
            duration,
            encId,
            settings.qualityMode,
            timeline,
            tmpDir,
            noop,
            baseVideoPath,
            [],
            "single",
            baseWindow,
            mixedAudioPath
          );
          this.emit(win, { ...baseProgress(job.jobId, i, jobs.length, fileName, "rendering"), task: "Merender video…" });
          await this.runFfmpeg(ffmpeg, onePass.args, duration, emitProgress, onePass.cwd, onePass.feed);
          return onePass;
        };
        let built;
        try {
          built = await encodeWith(encoderId);
        } catch (encErr) {
          if (this.cancelled) throw encErr;
          if (encoderId !== "x264") {
            this.log(win, job, i, jobs.length, "Encoder GPU gagal — beralih ke CPU…");
            encoderId = "x264";
            built = await encodeWith("x264");
          } else {
            throw encErr;
          }
        }
        await built.cleanup();
        if (this.cancelled) {
          this.emit(win, baseProgress(job.jobId, i, jobs.length, fileName, "cancelled"));
          break;
        }
        const elapsedMs = Date.now() - t0;
        this.emit(win, {
          ...baseProgress(job.jobId, i, jobs.length, fileName, "done"),
          percent: 100,
          elapsedMs,
          outputPath: job.outputPath
        });
        void telegramService.notifyRenderDone({ fileName, elapsedMs, index: i, total: jobs.length });
        success = true;
      } catch (e) {
        writeLog("render.log", `Job ${job.jobId} error: ${e.message}`);
        if (this.cancelled) {
          writeLog("render.log", `Job ${job.jobId} cancelled.`);
          this.emit(win, baseProgress(job.jobId, i, jobs.length, fileName, "cancelled"));
          break;
        }
        this.emit(win, {
          ...baseProgress(job.jobId, i, jobs.length, fileName, "error"),
          error: e.message
        });
      } finally {
        if (!success || this.cancelled) {
          try {
            writeLog("render.log", `Job ${job.jobId} failed or cancelled. Deleting output file: ${job.outputPath}`);
            await node_fs.promises.rm(job.outputPath, { force: true }).catch(() => {});
          } catch {}
        }
        try {
          await node_fs.promises.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
        } catch {}
      }
    }
    } finally {
      this.isRendering = false;
    }
  }
  async buildArgs(project, job, duration, encoderId, quality, timeline, tmpDir, log, baseVideoPath = null, prerendered = [], phase = "single", baseWindow, audioMapPath) {
    const exp = project.export;
    const W = exp.width;
    const H = exp.height;
    const fps = exp.fps;
    let feed;
    await node_fs.promises.mkdir(tmpDir, { recursive: true });
    const cleanupPaths = [];
    const isLoop = phase === "loop";
    const L = baseWindow ?? baseWindowFor(project, duration);
    const renderLen = isLoop ? Math.min(duration, L) : duration;
    const inputs = [];
    let segments = timeline.segments;
    if (isLoop && segments.length) {
      const clamped = [];
      let acc = 0;
      for (const s of segments) {
        if (acc >= renderLen) break;
        const d = Math.min(s.dur, renderLen - acc);
        clamped.push({ path: s.path, dur: d });
        acc += d;
      }
      segments = clamped;
    }
    const footageFilters = [];
    let footageInputCount = 0;
    const seamless = (project.footage.seamlessLoop ?? false) && project.footage.type === "video";
    const MAX_FILTER_INPUTS = 120;
    if (baseVideoPath) {
      if (timeline.baseDur > 0 && timeline.baseDur < renderLen - 0.05) {
        inputs.push("-stream_loop", "-1");
      }
      inputs.push("-i", baseVideoPath);
      footageInputCount = 1;
      footageFilters.push(
        `[0:v]fps=${fps},trim=duration=${renderLen.toFixed(3)},setpts=PTS-STARTPTS,format=yuv420p[base]`
      );
    } else if (segments.length === 0) {
      inputs.push("-f", "lavfi", "-t", String(renderLen), "-i", `color=c=black:s=${W}x${H}:r=${fps}`);
      footageInputCount = 1;
      footageFilters.push(`[0:v]format=yuv420p[base]`);
    } else if (segments.length <= MAX_FILTER_INPUTS) {
      const norm = (idx, dur, out) => `[${idx}:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${fps},trim=duration=${dur.toFixed(3)},setpts=PTS-STARTPTS,format=yuv420p${out}`;
      for (let k = 0; k < segments.length; k++) {
        const seg = segments[k];
        if (timeline.isImage) inputs.push("-loop", "1");
        inputs.push("-t", seg.dur.toFixed(3), "-i", seg.path);
        footageFilters.push(norm(k, seg.dur, `[c${k}]`));
      }
      footageInputCount = segments.length;
      const hasDistinctBoundary = segments.some((s, k) => k > 0 && segments[k - 1].path !== s.path);
      const CROSS = 0.5;
      if (seamless && hasDistinctBoundary && segments.length <= 40) {
        let cur = `[c0]`;
        let acc = segments[0].dur;
        let labelN = 0;
        for (let k = 1; k < segments.length; k++) {
          const same = segments[k - 1].path === segments[k].path;
          const out = `[x${labelN++}]`;
          if (same) {
            footageFilters.push(`${cur}[c${k}]concat=n=2:v=1:a=0${out}`);
            acc += segments[k].dur;
          } else {
            const offset = Math.max(0, acc - CROSS);
            footageFilters.push(
              `${cur}[c${k}]xfade=transition=fade:duration=${CROSS}:offset=${offset.toFixed(3)}${out}`
            );
            acc += segments[k].dur - CROSS;
          }
          cur = out;
        }
        footageFilters.push(`${cur}trim=duration=${renderLen.toFixed(3)},setpts=PTS-STARTPTS[base]`);
      } else if (segments.length === 1) {
        footageFilters.push(`[c0]trim=duration=${renderLen.toFixed(3)},setpts=PTS-STARTPTS[base]`);
      } else {
        const labels = segments.map((_, k) => `[c${k}]`).join("");
        footageFilters.push(`${labels}concat=n=${segments.length}:v=1:a=0[cat]`);
        footageFilters.push(`[cat]trim=duration=${renderLen.toFixed(3)},setpts=PTS-STARTPTS[base]`);
      }
    } else {
      const concatFile = node_path.join(tmpDir, "footage.txt");
      const lines = [];
      for (const seg of segments) {
        const p = seg.path.replace(/\\/g, "/").replace(/'/g, "'\\''");
        lines.push(`file '${p}'`);
        lines.push(`duration ${seg.dur.toFixed(4)}`);
      }
      const last = segments[segments.length - 1].path.replace(/\\/g, "/").replace(/'/g, "'\\''");
      lines.push(`file '${last}'`);
      await node_fs.promises.writeFile(concatFile, lines.join("\n"), "utf-8");
      cleanupPaths.push(concatFile);
      inputs.push("-f", "concat", "-safe", "0", "-i", concatFile);
      footageInputCount = 1;
      footageFilters.push(
        `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${fps},trim=duration=${renderLen.toFixed(3)},setpts=PTS-STARTPTS,format=yuv420p[base]`
      );
    }
    log(`Footage segments: ${segments.length}${seamless ? " (seamless loop)" : ""}`);
    const audioIdx = footageInputCount;
    inputs.push("-i", audioMapPath ?? job.audioPath);
    const fc = [...footageFilters];
    let lastVideo = "[base]";
    const fx = buildEffectFilters(project.effects);
    if (fx.length) {
      fc.push(`${lastVideo}${fx.join(",")}[fxed]`);
      lastVideo = "[fxed]";
    }
    if (project.effects.glow > 0.01) {
      const sigma = Math.max(1, Math.round(project.effects.glow * 14));
      const blendOpacity = Math.min(0.9, project.effects.glow * 0.75).toFixed(2);
      fc.push(`${lastVideo}split[_gbase][_gdup]`);
      fc.push(`[_gdup]gblur=sigma=${sigma}[_gblur]`);
      fc.push(`[_gbase][_gblur]blend=all_mode=addition:all_opacity=${blendOpacity}[glowed]`);
      lastVideo = "[glowed]";
    }
    const doLogoRing = project.logo.enabled && !!project.logo.path;
    const playlistInPipe = !isLoop && showPlaylist(project) && (project.playlist?.items?.length ?? 0) > 0;
    const combinedPipe = hasCanvasOverlay(project) || playlistInPipe;
    const baseSeconds = renderLen;
    log(`Building overlays (base ${baseSeconds}s @ ${fps}fps, parallel)…`);
    const [specCanvasResult, specLayersResult, logoCanvasResult, overlayCanvasResult] = combinedPipe ? [null, null, null, null] : await Promise.all([
      project.spectrum.enabled ? spectrumOverlay(project.spectrum, job.audioPath, duration, fps, W, H, tmpDir, baseSeconds).catch((e) => {
        log(`Spectrum canvas error: ${e.message}`);
        return null;
      }) : Promise.resolve(null),
      project.spectrumLayers?.length ? spectrumLayersOverlay(project.spectrumLayers, job.audioPath, duration, fps, W, H, tmpDir, baseSeconds).catch((e) => {
        log(`Spectrum layers error: ${e.message}`);
        return null;
      }) : Promise.resolve(null),
      doLogoRing ? logoSpectrumOverlay(project, job.audioPath, duration, fps, W, H, tmpDir, baseSeconds).catch(() => null) : Promise.resolve(null),
      project.overlayLayers?.length ? customText.overlayCanvasRender(project.overlayLayers, duration, fps, W, H, tmpDir, baseSeconds).catch((e) => {
        log(`Overlay render error: ${e.message}`);
        return null;
      }) : Promise.resolve(null)
    ]);
    if (specCanvasResult) {
      cleanupPaths.push(specCanvasResult.dir);
      log(`Spectrum OK: ${specCanvasResult.frames}f @ ${specCanvasResult.fps}fps`);
    }
    if (specLayersResult) {
      cleanupPaths.push(specLayersResult.dir);
      log(`Spectrum layers OK: ${specLayersResult.frames}f @ ${specLayersResult.fps}fps`);
    }
    if (logoCanvasResult) cleanupPaths.push(logoCanvasResult.dir);
    if (overlayCanvasResult) cleanupPaths.push(overlayCanvasResult.dir);
    let beatInterval = 0;
    let beatPhase = 0;
    const beatPreset = project.footage.beatEffect ?? "none";
    if (beatPreset !== "none") {
      let bpm = 120;
      let beats = [];
      try {
        const analysis = await sidecarService.analyze(job.audioPath);
        if (analysis.bpm && analysis.bpm >= 40 && analysis.bpm <= 240) bpm = analysis.bpm;
        beats = analysis.beats ?? [];
      } catch {
      }
      beatInterval = 60 / bpm;
      if (beats.length >= 4) {
        const gaps = beats.slice(1).map((b, i) => b - beats[i]).filter((g) => g > 0.05 && g < 2);
        if (gaps.length) {
          gaps.sort((a, b) => a - b);
          const med = gaps[Math.floor(gaps.length / 2)];
          if (med > 0.05) beatInterval = med;
        }
        beatPhase = (beats[0] % beatInterval + beatInterval) % beatInterval;
      }
      log(`Efek beat "${beatPreset}": denyut ${(60 / beatInterval).toFixed(0)} BPM (anchor ${beatPhase.toFixed(3)}s, ${beats.length} beat)`);
    }
    const audioSplits = [];
    if (doLogoRing && !logoCanvasResult && !combinedPipe) audioSplits.push("[aviz_logo]");
    if (audioSplits.length === 1) {
      fc.push(`[${audioIdx}:a]aformat=channel_layouts=stereo${audioSplits[0]}`);
    } else if (audioSplits.length >= 2) {
      fc.push(`[${audioIdx}:a]aformat=channel_layouts=stereo,asplit=${audioSplits.length}${audioSplits.join("")}`);
    }
    if (specCanvasResult) {
      log("Overlaying spectrum canvas…");
      const seqPath = node_path.join(specCanvasResult.dir, "s%06d.png").replace(/\\/g, "/");
      if (specCanvasResult.frames < Math.ceil(duration * specCanvasResult.fps)) {
        inputs.push("-stream_loop", "-1");
      }
      inputs.push("-framerate", String(specCanvasResult.fps), "-start_number", "1", "-i", seqPath);
      const specSeqIdx = countInputs(inputs) - 1;
      fc.push(`[${specSeqIdx}:v]scale=${W}:${H}:flags=bilinear,format=rgba[soverlay]`);
      fc.push(`${lastVideo}[soverlay]overlay=0:0:eof_action=pass:format=auto[vspec]`);
      lastVideo = "[vspec]";
    }
    if (specLayersResult) {
      log("Overlaying spectrum layers…");
      const seqPath = node_path.join(specLayersResult.dir, "sl%06d.png").replace(/\\/g, "/");
      if (specLayersResult.frames < Math.ceil(duration * specLayersResult.fps)) {
        inputs.push("-stream_loop", "-1");
      }
      inputs.push("-framerate", String(specLayersResult.fps), "-start_number", "1", "-i", seqPath);
      const slSeqIdx = countInputs(inputs) - 1;
      fc.push(`[${slSeqIdx}:v]format=rgba[sloverlay]`);
      fc.push(`${lastVideo}[sloverlay]overlay=0:0:eof_action=pass:format=auto[vsl]`);
      lastVideo = "[vsl]";
    }
    if (doLogoRing && !combinedPipe) {
      if (logoCanvasResult) {
        log("Overlaying logo canvas spectrum…");
        const seqPath = node_path.join(logoCanvasResult.dir, "f%06d.png").replace(/\\/g, "/");
        if (logoCanvasResult.frames < Math.ceil(duration * logoCanvasResult.fps)) {
          inputs.push("-stream_loop", "-1");
        }
        inputs.push("-framerate", String(logoCanvasResult.fps), "-start_number", "1", "-i", seqPath);
        const logoSeqIdx = countInputs(inputs) - 1;
        fc.push(`[${logoSeqIdx}:v]format=rgba[loverlay]`);
        fc.push(`${lastVideo}[loverlay]overlay=0:0:eof_action=pass:format=auto[wlogo]`);
        lastVideo = "[wlogo]";
      } else {
        log("Building logo ring (FFmpeg-native, polarcoordinates)…");
        inputs.push("-i", project.logo.path);
        const logoInputIdx = countInputs(inputs) - 1;
        const ring = buildLogoRingFilters({
          audioIn: "[aviz_logo]",
          logoInputIdx,
          videoIn: lastVideo,
          posX: project.logo.posX,
          posY: project.logo.posY,
          size: project.logo.size,
          opacity: project.logo.opacity,
          W,
          H
        });
        fc.push(...ring.filters);
        lastVideo = ring.videoOut;
      }
    }
    if (overlayCanvasResult) {
      log("Overlaying particle/cinematic layers…");
      const seqPath = node_path.join(overlayCanvasResult.dir, "ov%06d.png").replace(/\\/g, "/");
      if (overlayCanvasResult.frames < Math.ceil(duration * overlayCanvasResult.fps)) {
        inputs.push("-stream_loop", "-1");
      }
      inputs.push("-framerate", String(overlayCanvasResult.fps), "-start_number", "1", "-i", seqPath);
      const ovSeqIdx = countInputs(inputs) - 1;
      fc.push(`[${ovSeqIdx}:v]format=rgba[ovoverlay]`);
      fc.push(`${lastVideo}[ovoverlay]overlay=0:0:eof_action=pass:format=auto[vov]`);
      lastVideo = "[vov]";
    }
    if (combinedPipe) {
      log("Overlay gabungan via rawvideo pipe (match-mode, no PNG)…");
      inputs.push("-f", "rawvideo", "-pixel_format", "rgba", "-video_size", `${W}x${H}`, "-framerate", String(fps), "-i", "pipe:0");
      const combIdx = countInputs(inputs) - 1;
      fc.push(`[${combIdx}:v]format=rgba[combov]`);
      fc.push(`${lastVideo}[combov]overlay=0:0:eof_action=pass:format=auto[vcomb]`);
      lastVideo = "[vcomb]";
      feed = (stdin) => streamCombinedOverlayFrames(project, job.audioPath, duration, fps, W, H, stdin, renderLen, !isReactive(project), playlistInPipe);
    }
    const customOverlays = project.customOverlays?.filter((o) => o.enabled && o.path) ?? [];
    if (customOverlays.length) {
      log(`Overlaying ${customOverlays.length} custom overlay layer(s)…`);
      const assetFor = new Map(prerendered.map((p) => [p.overlay.id, p]));
      let coTag = 0;
      for (const ov of customOverlays) {
        const asset = assetFor.get(ov.id);
        if (asset) {
          const seqPath = asset.pattern.replace(/\\/g, "/");
          inputs.push("-stream_loop", "-1", "-framerate", String(asset.fps), "-start_number", "1", "-i", seqPath);
          const ovIdx2 = countInputs(inputs) - 1;
          const built2 = buildCustomOverlayFilters({
            overlay: ov,
            inputIdx: ovIdx2,
            videoIn: lastVideo,
            W,
            H,
            tag: coTag++,
            preProcessed: true
          });
          fc.push(...built2.filters);
          lastVideo = built2.videoOut;
          continue;
        }
        const isStill = ov.kind === "image";
        if (ov.loop !== "off") {
          if (isStill) inputs.push("-loop", "1");
          else inputs.push("-stream_loop", "-1");
        } else if (isStill) {
          inputs.push("-loop", "1");
        }
        inputs.push("-t", renderLen.toFixed(3), "-i", ov.path);
        const ovIdx = countInputs(inputs) - 1;
        const built = buildCustomOverlayFilters({
          overlay: ov,
          inputIdx: ovIdx,
          videoIn: lastVideo,
          W,
          H,
          tag: coTag++
        });
        fc.push(...built.filters);
        lastVideo = built.videoOut;
      }
    }
    if (beatInterval > 0) {
      const beatFxFilter = buildBeatEffectFilter(project.footage, [], lastVideo, W, H, beatInterval, beatPhase);
      if (beatFxFilter) {
        log(`Menerapkan efek beat "${beatPreset}" via FFmpeg filter…`);
        fc.push(...beatFxFilter.filters);
        lastVideo = beatFxFilter.videoOut;
      }
    }
    const wantLyrics = showLyrics(project) && project.lyrics.lines.length > 0;
    showPlaylist(project) && project.playlist.items.length > 0;
    const subFiles = [];
    if (!isLoop && wantLyrics) {
      await node_fs.promises.writeFile(node_path.join(tmpDir, "sub_l.ass"), "\uFEFF" + buildLyricsAss(project.lyrics, W, H, duration), "utf-8");
      subFiles.push("sub_l.ass");
    }
    if (subFiles.length) {
      let fontsArg = "";
      const srcFonts = fontsDir();
      if (srcFonts) {
        const fntDest = node_path.join(tmpDir, "fnt");
        try {
          await node_fs.promises.mkdir(fntDest, { recursive: true });
          const files = await node_fs.promises.readdir(srcFonts);
          await Promise.all(files.map(
            (f) => node_fs.promises.copyFile(node_path.join(srcFonts, f), node_path.join(fntDest, f)).catch(() => {
            })
          ));
          await copyUserFontsTo(fntDest);
          fontsArg = ":fontsdir=fnt";
        } catch {
        }
      }
      subFiles.forEach((sf, k) => {
        const out = `[vsub${k}]`;
        fc.push(`${lastVideo}subtitles=${sf}${fontsArg}${out}`);
        lastVideo = out;
      });
    }
    const seamlessFootage = (project.footage.seamlessLoop ?? false) && project.footage.type === "video";
    if (isLoop && !isReactive(project) && renderLen > 2 && !seamlessFootage) {
      const D = 0.5;
      const Lr = renderLen;
      fc.push(`${lastVideo}split=3[slp1][slp2][slp3]`);
      fc.push(`[slp1]trim=start=${D.toFixed(3)}:end=${(Lr - D).toFixed(3)},setpts=PTS-STARTPTS[slmid]`);
      fc.push(`[slp2]trim=start=${(Lr - D).toFixed(3)}:end=${Lr.toFixed(3)},setpts=PTS-STARTPTS[sltail]`);
      fc.push(`[slp3]trim=start=0:end=${D.toFixed(3)},setpts=PTS-STARTPTS[slhead]`);
      fc.push(`[sltail][slhead]xfade=transition=fade:duration=${D.toFixed(3)}:offset=0[slxf]`);
      fc.push(`[slmid][slxf]concat=n=2:v=1[slloop]`);
      lastVideo = "[slloop]";
    }
    fc.push(`${lastVideo}format=yuv420p[vfinal]`);
    const vcodec = encoderToCodec(encoderId, exp.vcodec);
    const args = ["-hide_banner", "-y"];
    args.push(...inputs);
    const filterScript = node_path.join(tmpDir, isLoop ? "filter.loop.txt" : "filter.txt");
    await node_fs.promises.writeFile(filterScript, fc.join(";\n"), "utf-8");
    args.push("-filter_complex_script", isLoop ? "filter.loop.txt" : "filter.txt");
    if (isLoop) {
      const loopPath = node_path.join(tmpDir, "loop.mp4");
      args.push("-map", "[vfinal]");
      args.push("-t", String(renderLen));
      args.push("-r", String(fps));
      args.push("-c:v", vcodec);
      args.push(...encoderQuality(encoderId, exp, quality));
      args.push("-pix_fmt", "yuv420p", "-an", "-progress", "pipe:1", "-nostats");
      args.push(loopPath);
    } else {
      args.push("-map", "[vfinal]", "-map", `${audioIdx}:a`);
      args.push("-t", String(duration));
      args.push("-r", String(fps));
      args.push("-c:v", vcodec);
      args.push(...encoderQuality(encoderId, exp, quality));
      if (exp.acodec === "wav") {
        args.push("-c:a", "pcm_s16le");
      } else {
        args.push("-c:a", "aac", "-b:a", "320k");
      }
      args.push("-pix_fmt", "yuv420p", "-shortest", "-progress", "pipe:1", "-nostats");
      args.push(job.outputPath);
    }
    const cleanup = async () => {
      try {
        await node_fs.promises.rm(tmpDir, { recursive: true, force: true });
      } catch {
      }
    };
    return { args, cleanup, cwd: tmpDir, feed };
  }
  /**
   * Stage C: produce the full-length output by looping the Stage-B `loop.mp4` to the
   * target duration and muxing the real audio. NON-PERIODIC layers (lyrics/playlist
   * subtitles, time-gated stickers) are burned here over the looped video.
   *
   * Fast path C1 (no subtitles/stickers): `-c:v copy` — no re-encode, muxes in seconds.
   * Path C2 (subtitles or stickers present): a light single decode + libass/overlay
   * pass — trivial graph, GPU-encode-bound (the floor), not the old heavy multigraph.
   */


  async buildFinalArgs(project, job, duration, encoderId, quality, loopPath, tmpDir, loop = true, audioMapPath) {
    const exp = project.export;
    const W = exp.width;
    const H = exp.height;
    const fps = exp.fps;
    const hasLyrics = showLyrics(project) && project.lyrics.lines.length > 0;
    const hasPlaylist = showPlaylist(project) && project.playlist.items.length > 0;
    const needBurn = hasLyrics || hasPlaylist;
    const args = ["-hide_banner", "-y"];
    if (loop) args.push("-stream_loop", "-1");
    args.push("-i", loopPath);
    args.push("-i", audioMapPath ?? job.audioPath);
    const audioIdx = 1;
    const feed = void 0;
    const plPngs = hasPlaylist ? await prerenderPlaylistPngs(project, W, H, tmpDir) : null;
    const playlistInputStart = 2;
    const cleanup = async () => {
      try {
        await node_fs.promises.rm(tmpDir, { recursive: true, force: true });
      } catch {
      }
    };
    if (!needBurn) {
      args.push("-map", "0:v", "-map", `${audioIdx}:a`);
      args.push("-t", String(duration));
      args.push("-c:v", "copy");
      if (exp.acodec === "wav") args.push("-c:a", "pcm_s16le");
      else args.push("-c:a", "aac", "-b:a", "320k");
      args.push("-shortest", "-progress", "pipe:1", "-nostats");
      args.push(job.outputPath);
      return { args, cleanup, cwd: tmpDir };
    }
    const fc = [];
    let lastVideo = "[0:v]";
    const subFiles = [];
    if (hasLyrics) {
      await node_fs.promises.writeFile(node_path.join(tmpDir, "sub_l.ass"), "\uFEFF" + buildLyricsAss(project.lyrics, W, H, duration), "utf-8");
      subFiles.push("sub_l.ass");
    }
    if (subFiles.length) {
      const srcFonts = fontsDir();
      let fntDest = "";
      if (srcFonts) {
        fntDest = node_path.join(tmpDir, "fnt");
        try {
          await node_fs.promises.mkdir(fntDest, { recursive: true });
          const files = await node_fs.promises.readdir(srcFonts);
          await Promise.all(files.map((f) => node_fs.promises.copyFile(node_path.join(srcFonts, f), node_path.join(fntDest, f)).catch(() => {
          })));
          await copyUserFontsTo(fntDest);
        } catch {
        }
      }
      subFiles.forEach((sf, k) => {
        const out = `[vsub${k}]`;
        const absSubPath = node_path.join(tmpDir, sf);
        const escapedSubPath = escapeSubtitlesPath(absSubPath);
        let fontsArg = "";
        if (fntDest) {
          fontsArg = `:fontsdir=${escapeSubtitlesPath(fntDest)}`;
        }
        fc.push(`${lastVideo}subtitles=${escapedSubPath}${fontsArg}${out}`);
        lastVideo = out;
      });
    }
    if (plPngs) {
      const ov = this.playlistOverlayFc(plPngs, playlistInputStart, lastVideo, 0);
      args.push(...ov.inputs);
      fc.push(...ov.fc);
      lastVideo = ov.videoOut;
    }
    fc.push(`${lastVideo}format=yuv420p[vfinal]`);
    const filterScript = node_path.join(tmpDir, "filter.final.txt");
    await node_fs.promises.writeFile(filterScript, fc.join(";\n"), "utf-8");
    args.push("-filter_complex_script", "filter.final.txt");
    args.push("-map", "[vfinal]", "-map", `${audioIdx}:a`);
    args.push("-t", String(duration), "-r", String(fps));
    args.push("-c:v", encoderToCodec(encoderId, exp.vcodec));
    args.push(...encoderQuality(encoderId, exp, quality));
    if (exp.acodec === "wav") args.push("-c:a", "pcm_s16le");
    else args.push("-c:a", "aac", "-b:a", "320k");
    args.push("-pix_fmt", "yuv420p", "-shortest", "-progress", "pipe:1", "-nostats");
    args.push(job.outputPath);
    return { args, cleanup, cwd: tmpDir, feed };
  }
  /**
   * Build the FFmpeg overlay chain for the playlist PNGs onto `videoIn`: the all-inactive
   * base PNG always, then each song's active PNG gated to its [start,end] window (shifted by
   * `offset`). PNG inputs are appended starting at `startIdx`. Native overlay — no per-frame
   * pipe — so it's fast and exactly matches the canvas preview (PNGs are canvas-rendered).
   */
  playlistOverlayFc(pngs, startIdx, videoIn, offset) {
    const inputs = ["-i", pngs.base];
    const fc = [`${videoIn}[${startIdx}:v]overlay=0:0:format=auto[plb]`];
    let last = "[plb]";
    let idx = startIdx + 1;
    pngs.actives.forEach((a, k) => {
      inputs.push("-i", a.path);
      const s = Math.max(0, a.start - offset);
      const e = Math.max(0, a.end - offset);
      fc.push(`${last}[${idx}:v]overlay=0:0:format=auto:enable='between(t,${s.toFixed(3)},${e.toFixed(3)})'[pla${k}]`);
      last = `[pla${k}]`;
      idx++;
    });
    return { inputs, fc, videoOut: last };
  }
  /**
   * Per-song-loop playlist finalize (static-spectrum base-loop, playlist ON, lyrics OFF).
   *
   * The video = a SEAMLESS base loop (footage + spectrum, period L) + the playlist overlay,
   * which only changes at song boundaries (N times). So within ANY single L-segment where one
   * song is active throughout, the frame content = base-loop + that song's static overlay =
   * PERIODIC → identical to a baked "base+active_k" unit → can be COPY-looped instead of
   * re-encoded.
   *
   * Strategy: snap song boundaries to the L grid, bake ONE L-second unit per distinct active
   * row (`base+active_k`, plus a base-only unit for gaps/tail), then concat-copy those units in
   * timeline order. Concat junctions land on L boundaries where the base loop is seamless
   * (end≈start via Stage B crossfade), so the footage/spectrum stays smooth; only the overlay
   * hard-cuts at the snapped boundary (±L timing). A 2-hour, 20-song album thus encodes ~20
   * units × L (≈5 min) instead of the whole 2 hours — the rest is a stream copy.
   */
  async finalizePlaylistSnapped(project, job, audioPath, duration, L, loopPath, encoderId, quality, tmpDir, ffmpeg, progress) {
    const exp = project.export;
    const W = exp.width, H = exp.height, fps = exp.fps;
    const vcodec = encoderToCodec(encoderId, exp.vcodec);
    const encArgs = encoderQuality(encoderId, exp, quality);
    const cleanup = async () => {
      try {
        await node_fs.promises.rm(tmpDir, { recursive: true, force: true });
      } catch {
      }
    };
    const esc = (p) => p.replace(/\\/g, "/").replace(/'/g, "'\\''");
    const pngs = await prerenderPlaylistPngs(project, W, H, tmpDir);
    if (!pngs) throw new Error("playlist png prerender failed");
    const items = project.playlist.items;
    const totalSegs = Math.max(1, Math.ceil(duration / L));
    const segActive = [];
    for (let n = 0; n < totalSegs; n++) {
      const mid = n * L + L / 2;
      let act = -1;
      for (let k = 0; k < items.length; k++) {
        if (mid >= items[k].start && mid < items[k].start + items[k].duration) {
          act = k;
          break;
        }
      }
      segActive.push(act);
    }
    const distinct = [...new Set(segActive)];
    const baked = /* @__PURE__ */ new Map();
    const bakeOne = async (act) => {
      const out = node_path.join(tmpDir, `pl_unit_${act < 0 ? "base" : act}.mp4`);
      const inputs = ["-i", loopPath, "-i", pngs.base];
      let fc = `[0:v]format=yuv420p[b];[b][1:v]overlay=0:0:format=auto[v0]`;
      let last = "[v0]";
      if (act >= 0) {
        inputs.push("-i", pngs.actives[act].path);
        fc += `;${last}[2:v]overlay=0:0:format=auto[v1]`;
        last = "[v1]";
      }
      fc += `;${last}format=yuv420p[vf]`;
      await this.runPlain(ffmpeg, [
        "-hide_banner",
        "-y",
        ...inputs,
        "-filter_complex",
        fc,
        "-map",
        "[vf]",
        "-t",
        L.toFixed(3),
        "-r",
        String(fps),
        "-c:v",
        vcodec,
        ...encArgs,
        "-pix_fmt",
        "yuv420p",
        "-an",
        out
      ]);
      return out;
    };
    for (let i = 0; i < distinct.length; i++) {
      if (this.cancelled) throw new Error("Cancelled");
      progress(Math.round(i / distinct.length * 72), "Finalisasi (segmen playlist)…");
      baked.set(distinct[i], await bakeOne(distinct[i]));
    }
    if (this.cancelled) throw new Error("Cancelled");
    progress(74, "Finalisasi (gabung + audio)…");
    const listPath = node_path.join(tmpDir, "pl_snap_concat.txt");
    const lines = segActive.map((a) => `file '${esc(baked.get(a))}'`);
    await node_fs.promises.writeFile(listPath, lines.join("\n") + "\n", "utf-8");
    const args = [
      "-hide_banner",
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      listPath,
      "-i",
      audioPath,
      "-map",
      "0:v",
      "-map",
      "1:a",
      "-t",
      String(duration),
      "-c:v",
      "copy"
    ];
    if (exp.acodec === "wav") args.push("-c:a", "pcm_s16le");
    else args.push("-c:a", "aac", "-b:a", "320k");
    args.push("-shortest", "-progress", "pipe:1", "-nostats", job.outputPath);
    await this.runFfmpeg(ffmpeg, args, duration, (p) => progress(74 + Math.round(p * 0.26), "Finalisasi (gabung + audio)…"), tmpDir);
    return { args: [], cleanup, cwd: tmpDir };
  }
  /**
   * Prepare the audio for a job. In merge mode, randomly pick N tracks and concat
   * them into one file. With customDuration, loop/trim the result to the target
   * length. Returns the path to the (possibly temporary) audio + its duration.
   */
  async prepareAudio(win, project, job, tmpDir, index, total, ffmpeg) {
    const a = project.audio;
    const targetSec = a.customDuration ? Math.max(5, a.targetMinutes * 60) : 0;
    const doMaster = !!a.preMasterPreset;
    const fadeIn = a.fadeIn ?? 1;
    const fadeOut = a.fadeOut ?? 3;
    if (a.items.length === 0 && project.footage.type === "video" && project.footage.muteFootageAudio === false && job.footageOrder?.[0]) {
      const clip = job.footageOrder[0];
      const dur2 = targetSec > 0 ? targetSec : Math.max(5, await this.safeDur(clip).catch(() => 600));
      const fa = await this.extractAudio(clip, node_path.join(tmpDir, "asmr_src.wav"), ffmpeg);
      if (fa) {
        const unit = await this.seamlessAudioUnit(fa, node_path.join(tmpDir, "asmr_unit.wav"), ffmpeg);
        const out = node_path.join(tmpDir, "asmr_primary.m4a");
        await this.loopTrim(ffmpeg, unit, out, dur2);
        this.log(win, job, index, total, "Audio ASMR dari footage…");
        return { audioPath: out, duration: dur2, sourceLabel: "footage-asmr", chosenPaths: [clip], chosenDurations: [dur2] };
      }
    }
    const processTrack = async (src2, idx, trackDur) => {
      if (doMaster) {
        const masteredPath = node_path.join(tmpDir, `mastered_${idx}.wav`);
        await masterService.applyPreset(src2, masteredPath, a.preMasterPreset, fadeIn, fadeOut);
        if (this.cancelled) throw new Error("Cancelled");
        return masteredPath;
      }
      if (fadeIn > 0 || fadeOut > 0) {
        const filters = [];
        if (fadeIn > 0) filters.push(`afade=t=in:st=0:d=${fadeIn}`);
        if (fadeOut > 0) {
          const st = Math.max(0, trackDur - fadeOut);
          filters.push(`afade=t=out:st=${st.toFixed(3)}:d=${Math.min(fadeOut, trackDur).toFixed(3)}`);
        }
        const fadedPath = node_path.join(tmpDir, `faded_${idx}.wav`);
        await this.runPlain(ffmpeg, [
          "-hide_banner",
          "-y",
          "-i",
          src2,
          "-af",
          filters.join(","),
          "-c:a",
          "pcm_s16le",
          fadedPath
        ]);
        if (this.cancelled) throw new Error("Cancelled");
        return fadedPath;
      }
      return src2;
    };
    if (a.mode === "merge" && a.items.length > 0) {
      let pool = a.items.map((it) => it.path);
      if (a.shuffleEachRender) pool = shuffleArr(pool);
      const count = a.mergeCount > 0 ? Math.min(a.mergeCount, pool.length) : pool.length;
      const validPaths = new Set(a.items.map((it) => it.path));
      const playlistFiles = showPlaylist(project) && !a.shuffleEachRender ? (project.playlist.items ?? []).map((it) => it.file).filter((f) => validPaths.has(f)) : [];
      const chosen = playlistFiles.length ? [...playlistFiles] : pool.slice(0, count);
      const durCache = /* @__PURE__ */ new Map();
      for (const it of a.items) if (typeof it.duration === "number" && it.duration > 0) durCache.set(it.path, it.duration);
      const durOf = async (p) => {
        if (!durCache.has(p)) durCache.set(p, await this.safeDur(p));
        return durCache.get(p);
      };
      let acc = 0;
      for (const p of chosen) acc += await durOf(p);
      if (targetSec > 0 && chosen.length > 0) {
        const baseSet = [...chosen];
        let guard = 0;
        while (acc < targetSec && guard < 5e3) {
          const cycle = shuffleArr([...baseSet]);
          for (const pick of cycle) {
            if (acc >= targetSec) break;
            chosen.push(pick);
            acc += await durOf(pick);
            guard++;
          }
        }
      }
      if (this.cancelled) throw new Error("Cancelled");
      const chosenDurations = await Promise.all(chosen.map((p) => durOf(p)));
      this.log(win, job, index, total, "Memproses audio…");
      const processCache = /* @__PURE__ */ new Map();
      const distinctTotal = new Set(chosen).size;
      const processed = new Array(chosen.length);
      for (let idx = 0; idx < chosen.length; idx++) {
        if (this.cancelled) throw new Error("Cancelled");
        const src2 = chosen[idx];
        if (!processCache.has(src2)) {
          this.emit(win, {
            ...baseProgress(job.jobId, index, total, basename(job.outputPath), "preparing"),
            task: "Memproses audio…",
            percent: Math.round(processCache.size / Math.max(1, distinctTotal) * 8)
          });
          processCache.set(src2, await processTrack(src2, processCache.size, chosenDurations[idx]));
        }
        processed[idx] = processCache.get(src2);
      }
      if (this.cancelled) throw new Error("Cancelled");
      this.log(win, job, index, total, "Menggabungkan audio…");
      const listFile = node_path.join(tmpDir, "audiolist.txt");
      await node_fs.promises.writeFile(listFile, processed.map((p) => `file '${p.replace(/\\/g, "/").replace(/'/g, "'\\''")}'`).join("\n"), "utf-8");
      const finalPath = node_path.join(tmpDir, "final.m4a");
      const concatArgs = ["-hide_banner", "-y", "-f", "concat", "-safe", "0", "-i", listFile];
      if (targetSec > 0) concatArgs.push("-t", targetSec.toFixed(3));
      concatArgs.push("-c:a", "aac", "-b:a", "320k", finalPath);
      await this.runPlain(ffmpeg, concatArgs);
      if (this.cancelled) throw new Error("Cancelled");
      const dur2 = targetSec > 0 ? Math.min(acc, targetSec) : acc;
      return { audioPath: finalPath, duration: dur2, sourceLabel: `merged ${chosen.length} tracks`, chosenPaths: chosen, chosenDurations };
    }
    if (this.cancelled) throw new Error("Cancelled");
    const rawSrc = job.audioPath;
    const rawDur = await this.safeDur(rawSrc);
    const src = await processTrack(rawSrc, 0, rawDur);
    let dur = src === rawSrc ? rawDur : await this.safeDur(src);
    if (targetSec > 0) {
      this.log(win, job, index, total, "Memproses audio…");
      const finalPath = node_path.join(tmpDir, "final.m4a");
      await this.loopTrim(ffmpeg, src, finalPath, targetSec);
      return { audioPath: finalPath, duration: targetSec, sourceLabel: "single (duration-fit)", chosenPaths: [rawSrc], chosenDurations: [dur] };
    }
    return { audioPath: src, duration: dur, sourceLabel: "single", chosenPaths: [rawSrc], chosenDurations: [dur] };
  }
  async loopTrim(ffmpeg, input, output, seconds) {
    await this.runPlain(ffmpeg, [
      "-hide_banner",
      "-y",
      "-stream_loop",
      "-1",
      "-i",
      input,
      "-t",
      seconds.toFixed(3),
      "-c:a",
      "aac",
      "-b:a",
      "320k",
      output
    ]);
  }
  async safeDur(path) {
    try {
      const r = await probeService.probe(path);
      return r.duration > 0 ? r.duration : 180;
    } catch {
      return 180;
    }
  }
  /** Extract a clip's audio to a WAV. Returns the path, or null if the clip has no audio. */
  async extractAudio(src, outWav, ffmpeg) {
    try {
      await this.runPlain(ffmpeg, ["-y", "-i", src, "-vn", "-ac", "2", "-ar", "44100", "-c:a", "pcm_s16le", outWav]);
      const st = await node_fs.promises.stat(outWav);
      return st.size > 2e3 ? outWav : null;
    } catch {
      return null;
    }
  }
  /**
   * Build a SEAMLESS loop unit from an audio file: the tail crossfades into the head so that
   * stream_looping the unit has no click/jump at the seam (ASMR audio often isn't perfectly
   * loopable even when the video is). Returns the unit path, or the source unchanged when
   * it's too short to crossfade.
   */
  async seamlessAudioUnit(src, out, ffmpeg, D = 3) {
    const sd = await this.safeDur(src).catch(() => 0);
    if (sd < 1.5) return src;
    D = Math.max(0.2, Math.min(D, sd / 2.5));
    const fc = `[0:a]asplit=3[a1][a2][a3];[a1]atrim=${D.toFixed(3)}:${(sd - D).toFixed(3)},asetpts=PTS-STARTPTS[mid];[a2]atrim=${(sd - D).toFixed(3)}:${sd.toFixed(3)},asetpts=PTS-STARTPTS[tail];[a3]atrim=0:${D.toFixed(3)},asetpts=PTS-STARTPTS[head];[tail][head]acrossfade=d=${D.toFixed(3)}[xf];[mid][xf]concat=n=2:v=0:a=1[unit]`;
    try {
      await this.runPlain(ffmpeg, ["-y", "-i", src, "-filter_complex", fc, "-map", "[unit]", "-c:a", "pcm_s16le", out]);
      return out;
    } catch {
      return src;
    }
  }
  /**
   * Build a SEAMLESS VIDEO loop unit from a clip: the tail dissolves into the head (xfade)
   * so the clip loops with NO visible jump even when it isn't perfectly seamless. The unit's
   * end ≈ its start, so repeating it (hard cut) loops smoothly everywhere. Returns the unit
   * path, or the source unchanged when it's too short to crossfade.
   */
  async seamlessVideoUnit(clip, out, fps, ffmpeg, D = 3) {
    const cd = await this.safeDur(clip).catch(() => 0);
    if (cd < 1.5) return clip;
    D = Math.max(0.2, Math.min(D, cd / 2.5));
    const fc = `[0:v]split=3[v1][v2][v3];[v1]trim=${D.toFixed(3)}:${(cd - D).toFixed(3)},setpts=PTS-STARTPTS[mid];[v2]trim=${(cd - D).toFixed(3)}:${cd.toFixed(3)},setpts=PTS-STARTPTS[tail];[v3]trim=0:${D.toFixed(3)},setpts=PTS-STARTPTS[head];[tail][head]xfade=transition=fade:duration=${D.toFixed(3)}:offset=0[xf];[mid][xf]concat=n=2:v=1,format=yuv420p[unit]`;
    try {
      await this.runPlain(ffmpeg, [
        "-y",
        "-i",
        clip,
        "-filter_complex",
        fc,
        "-map",
        "[unit]",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "18",
        "-r",
        String(fps),
        out
      ]);
      return out;
    } catch {
      return clip;
    }
  }
  /**
   * Mix the main/primary audio with extra layers: the footage's built-in audio (when
   * muteFootageAudio is OFF and it isn't already the primary) + each Audio FX. Layers loop
   * (stream_loop) to fill the duration and have their own volume. The spectrum is NOT
   * affected (it analyses the main track). Returns the mixed file, or `mainPath` unchanged
   * when there's nothing extra to mix.
   */
  async buildMixedAudio(project, mainPath, footageOrigClip, footageIsPrimary, duration, tmpDir, ffmpeg) {
    const a = project.audio;
    const f = project.footage;
    const clamp2 = (v, d = 1) => Math.max(0, Math.min(1.5, v ?? d));
    const mainVol = clamp2(a.mainVolume);
    const layers = [];
    if (!footageIsPrimary && f.type === "video" && f.muteFootageAudio === false && footageOrigClip) {
      const fa = await this.extractAudio(footageOrigClip, node_path.join(tmpDir, "footage_audio.wav"), ffmpeg);
      if (fa) {
        const unit = await this.seamlessAudioUnit(fa, node_path.join(tmpDir, "footage_loopunit.wav"), ffmpeg);
        layers.push({ clip: unit, volume: clamp2(f.footageVolume), loop: true });
      }
    }
    for (const fx of a.fx ?? []) {
      if (fx?.path) layers.push({ clip: fx.path, volume: clamp2(fx.volume), loop: fx.loop !== false });
    }
    if (!layers.length && Math.abs(mainVol - 1) < 1e-3) return mainPath;
    const inputs = ["-i", mainPath];
    const fc = [`[0:a]volume=${mainVol.toFixed(3)},aformat=sample_rates=44100:channel_layouts=stereo[a0]`];
    const labels = ["[a0]"];
    let idx = 1;
    for (const ly of layers) {
      if (ly.loop) inputs.push("-stream_loop", "-1");
      inputs.push("-i", ly.clip);
      fc.push(`[${idx}:a]volume=${ly.volume.toFixed(3)},aformat=sample_rates=44100:channel_layouts=stereo[a${idx}]`);
      labels.push(`[a${idx}]`);
      idx++;
    }
    fc.push(`${labels.join("")}amix=inputs=${idx}:duration=first:dropout_transition=0:normalize=0[mix]`);
    const out = node_path.join(tmpDir, "mixed_audio.m4a");
    await this.runPlain(ffmpeg, [
      "-y",
      ...inputs,
      "-filter_complex",
      fc.join(";"),
      "-map",
      "[mix]",
      "-t",
      String(duration),
      "-c:a",
      "aac",
      "-b:a",
      "320k",
      out
    ]);
    return out;
  }
  /**
   * Decide which footage clips appear and for how long — even slices across duration.
   */
  /**
   * Adaptive base window (static mode). A SINGLE video clip loops at its OWN length (tiled
   * up to ~40s so the spectrum loop isn't too repetitive), so looping one short clip is as
   * cheap as a still image — no fixed 5-min base. Multiple clips keep the longer window for
   * footage variety. Image → short fixed window; reactive → full duration.
   */
  async resolveBaseWindow(project, footageOrder, duration) {
    if (isReactive(project)) return duration;
    if (project.footage.type === "image") {
      if (showPlaylist(project) && project.playlist.items.length > 0) return Math.min(duration, PLAYLIST_SNAP_L);
      return Math.min(duration, STATIC_BASE_IMAGE_SEC);
    }
    const distinct = [...new Set(footageOrder.filter(Boolean))];
    if (distinct.length === 1) {
      const clip = await this.safeDur(distinct[0]).catch(() => 0);
      if (clip > 0.5) {
        const cap = Math.min(duration, STATIC_BASE_VIDEO_SEC);
        const plOn = showPlaylist(project) && project.playlist.items.length > 0;
        if (plOn) {
          const n2 = Math.max(1, Math.ceil(PLAYLIST_SNAP_L / clip));
          return Math.min(cap, n2 * clip);
        }
        let n = Math.max(1, Math.round(40 / clip));
        while (n > 1 && n * clip > cap + 0.01) n--;
        return Math.min(cap, n * clip);
      }
    }
    return Math.min(duration, STATIC_BASE_VIDEO_SEC);
  }
  async footageTimeline(_win, project, job, _audioPath, duration, baseWindow) {
    const f = project.footage;
    const order = job.footageOrder.length ? job.footageOrder : f.items.map((m) => m.path);
    if (order.length === 0) return { segments: [], order: [], beatSynced: false, baseDur: 0, isImage: false };
    const isImage = f.type === "image";
    const baseSeconds = baseWindow;
    const baseDur = isImage && order.length === 1 ? duration : Math.min(duration, baseSeconds);
    if (isImage) {
      const segments2 = [];
      if (order.length === 1) {
        segments2.push({ path: order[0], dur: baseDur });
      } else {
        const per = Math.max(1.5, Math.min(8, baseDur / order.length));
        let t = 0;
        let i = 0;
        while (t < baseDur && segments2.length < 2e3) {
          const dur = Math.min(per, baseDur - t);
          segments2.push({ path: order[i % order.length], dur });
          t += dur;
          i++;
        }
      }
      return { segments: segments2, order, beatSynced: false, baseDur, isImage: true };
    }
    if (f.seamlessLoop ?? false) {
      const clipDur = /* @__PURE__ */ new Map();
      for (const p of order) clipDur.set(p, await this.safeDur(p));
      const segments2 = [];
      let t = 0;
      let i = 0;
      while (t < baseDur && segments2.length < 2e3) {
        const path = order[i % order.length];
        const full = Math.max(0.5, clipDur.get(path) ?? 8);
        const dur = Math.min(full, baseDur - t);
        segments2.push({ path, dur });
        t += dur;
        i++;
      }
      return { segments: segments2, order, beatSynced: false, baseDur, isImage: false };
    }
    const segments = buildEvenSegments(order, baseDur);
    return { segments, order, beatSynced: false, baseDur, isImage: false };
  }
  /**
   * Pass-1 of the 2-pass render: encode just the footage base (no overlays/audio)
   * to a temporary base.mp4 of length `timeline.baseDur`. Pass-2 then loops this
   * file and composites spectrum/logo/lyrics/audio on top. Splitting the work keeps
   * long renders light: the heavy decode+normalise of mixed clips happens once over
   * ~180s instead of across the entire (possibly very long) output.
   *
   * Returns the base video path, or null if there is no footage (solid background,
   * handled inline by buildArgs) or on failure (caller falls back to 1-pass).
   */
  async buildFootageBase(project, timeline, encoderId, tmpDir, ffmpeg, log) {
    const segments = timeline.segments;
    if (segments.length === 0) return null;
    if (segments.length === 1 && timeline.isImage) return null;
    const exp = project.export;
    const W = exp.width;
    const H = exp.height;
    const fps = exp.fps;
    const baseDur = timeline.baseDur;
    const inputs = [];
    const fcs = [];
    const norm = (idx, dur, out) => `[${idx}:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${fps},trim=duration=${dur.toFixed(3)},setpts=PTS-STARTPTS,format=yuv420p${out}`;
    const seamless = (project.footage.seamlessLoop ?? false) && project.footage.type === "video";
    const MAX_FILTER_INPUTS = 120;
    if (segments.length === 1 && timeline.isImage) {
      inputs.push("-loop", "1", "-t", baseDur.toFixed(3), "-i", segments[0].path);
      fcs.push(norm(0, baseDur, "[base]"));
    } else if (segments.length <= MAX_FILTER_INPUTS) {
      for (let k = 0; k < segments.length; k++) {
        const seg = segments[k];
        if (timeline.isImage) {
          inputs.push("-loop", "1", "-t", seg.dur.toFixed(3), "-i", seg.path);
        } else {
          inputs.push("-t", seg.dur.toFixed(3), "-i", seg.path);
        }
        fcs.push(norm(k, seg.dur, `[c${k}]`));
      }
      const hasDistinctBoundary = segments.some((s, k) => k > 0 && segments[k - 1].path !== s.path);
      const CROSS = 0.5;
      if (seamless && hasDistinctBoundary && segments.length <= 40) {
        let cur = `[c0]`;
        let acc = segments[0].dur;
        let labelN = 0;
        for (let k = 1; k < segments.length; k++) {
          const same = segments[k - 1].path === segments[k].path;
          const out = `[x${labelN++}]`;
          if (same) {
            fcs.push(`${cur}[c${k}]concat=n=2:v=1:a=0${out}`);
            acc += segments[k].dur;
          } else {
            const offset = Math.max(0, acc - CROSS);
            fcs.push(`${cur}[c${k}]xfade=transition=fade:duration=${CROSS}:offset=${offset.toFixed(3)}${out}`);
            acc += segments[k].dur - CROSS;
          }
          cur = out;
        }
        fcs.push(`${cur}trim=duration=${baseDur.toFixed(3)},setpts=PTS-STARTPTS[base]`);
      } else {
        const labels = segments.map((_, k) => `[c${k}]`).join("");
        fcs.push(`${labels}concat=n=${segments.length}:v=1:a=0[cat]`);
        fcs.push(`[cat]trim=duration=${baseDur.toFixed(3)},setpts=PTS-STARTPTS[base]`);
      }
    } else {
      const concatFile = node_path.join(tmpDir, "footage.txt");
      const lines = [];
      for (const seg of segments) {
        const p = ffPathEscape(seg.path);
        lines.push(`file '${p}'`);
        lines.push(`duration ${seg.dur.toFixed(4)}`);
      }
      lines.push(`file '${ffPathEscape(segments[segments.length - 1].path)}'`);
      await node_fs.promises.writeFile(concatFile, lines.join("\n"), "utf-8");
      inputs.push("-f", "concat", "-safe", "0", "-i", concatFile);
      fcs.push(
        `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${fps},trim=duration=${baseDur.toFixed(3)},setpts=PTS-STARTPTS,format=yuv420p[base]`
      );
    }
    const basePath = node_path.join(tmpDir, "base.mp4");
    const args = [
      "-hide_banner",
      "-y",
      ...inputs,
      "-filter_complex",
      fcs.join(";"),
      "-map",
      "[base]",
      "-t",
      baseDur.toFixed(3),
      "-r",
      String(fps),
      "-c:v",
      "libx264",
      "-preset",
      "ultrafast",
      "-crf",
      "18",
      "-pix_fmt",
      "yuv420p",
      "-an",
      basePath
    ];
    try {
      log(`Pass 1/2: render footage base (${baseDur.toFixed(0)}s, ${segments.length} segmen)…`);
      await this.runPlain(ffmpeg, args);
      return basePath;
    } catch (e) {
      log(`Footage base gagal, fallback ke 1-pass: ${e.message}`);
      return null;
    }
  }
  /**
   * Normalize each unique VIDEO clip to a uniform WxH @ fps mp4, cached on disk so
   * repeated/random renders reuse it. Returns a map original→normalized path. On any
   * per-clip failure the original path is kept (render still works, just slower).
   */
  async normalizeFootage(paths, W, H, fps, ffmpeg, onProgress) {
    const cacheDir2 = node_path.join(electron.app.getPath("userData"), "cache", "footage_norm");
    await node_fs.promises.mkdir(cacheDir2, { recursive: true });
    const map = /* @__PURE__ */ new Map();
    const unique = [...new Set(paths)];
    let done = 0;
    for (const src of unique) {
      if (this.cancelled) break;
      let mtime = 0;
      try {
        mtime = Math.round((await node_fs.promises.stat(src)).mtimeMs);
      } catch {
      }
      const key = node_crypto.createHash("md5").update(`${src}|${mtime}|${W}x${H}|${fps}`).digest("hex");
      const out = node_path.join(cacheDir2, `${key}.mp4`);
      if (node_fs.existsSync(out)) {
        map.set(src, out);
      } else {
        const vf = `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${fps},format=yuv420p`;
        const tmp = `${out}.tmp.mp4`;
        const args = [
          "-hide_banner",
          "-y",
          "-i",
          src,
          "-an",
          "-vf",
          vf,
          "-c:v",
          "libx264",
          "-preset",
          "veryfast",
          "-crf",
          "18",
          "-pix_fmt",
          "yuv420p",
          tmp
        ];
        try {
          await this.runPlain(ffmpeg, args);
          await node_fs.promises.rename(tmp, out);
          map.set(src, out);
        } catch {
          try {
            await node_fs.promises.rm(tmp, { force: true });
          } catch {
          }
          map.set(src, src);
        }
      }
      done++;
      onProgress?.(done, unique.length);
    }
    for (const p of paths) if (!map.has(p)) map.set(p, p);
    return map;
  }
  /** Run a short ffmpeg command (no progress streaming) used for prep steps. */
  runPlain(ffmpeg, args) {
    return new Promise((resolve, reject) => {
      const proc = node_child_process.spawn(ffmpeg, args, { windowsHide: true });
      this.current = proc;
      let stderr = "";
      proc.stderr.setEncoding("utf-8");
      proc.stderr.on("data", (c) => {
        stderr += c;
        if (stderr.length > 6e3) stderr = stderr.slice(-6e3);
      });
      proc.on("error", (err) => {
        this.current = null;
        reject(err);
      });
      proc.on("close", (code) => {
        this.current = null;
        if (code === 0) resolve();
        else reject(new Error(`FFmpeg prep failed (${code}): ${stderr.split("\n").slice(-4).join(" ").trim()}`));
      });
    });
  }
  runFfmpeg(ffmpeg, args, duration, onProgress, cwd, feed) {
    return new Promise((resolve, reject) => {
      const safeArgs = args.map(arg => arg.includes("gsk_") ? "gsk_****" : arg);
      const cmdStr = `ffmpeg ${safeArgs.join(" ")}`;
      writeLog("render.log", `Running FFmpeg command: ${cmdStr}`);
      const proc = node_child_process.spawn(ffmpeg, args, { windowsHide: true, ...cwd ? { cwd } : {} });
      this.current = proc;
      let stderr = "";
      let lastPct = 0;
      if (feed && proc.stdin) {
        const stdin = proc.stdin;
        stdin.on("error", () => {
        });
        feed(stdin).catch(() => {
        }).finally(() => {
          try {
            stdin.end();
          } catch {
          }
        });
      }
      let sawProgress = false;
      proc.stdout.setEncoding("utf-8");
      proc.stdout.on("data", (chunk) => {
        if (!sawProgress) {
          sawProgress = true;
          onProgress(1, "Encoding started");
        }
        const m = /out_time_ms=(\d+)/.exec(chunk);
        if (m && duration > 0) {
          const sec = parseInt(m[1], 10) / 1e6;
          const pct = Math.min(99, Math.round(sec / duration * 100));
          if (pct > lastPct) {
            lastPct = pct;
            onProgress(pct, "Encoding");
          }
        }
      });
      proc.stderr.setEncoding("utf-8");
      proc.stderr.on("data", (c) => {
        stderr += c;
        if (stderr.length > 8e3) stderr = stderr.slice(-8e3);
      });
      proc.on("error", (err) => {
        this.current = null;
        reject(err);
      });
      proc.on("close", (code) => {
        this.current = null;
        if (code === 0) resolve();
        else {
          const safeArgs = args.map(arg => arg.includes("gsk_") ? "gsk_****" : arg);
          const cmdStr = `ffmpeg ${safeArgs.join(" ")}`;
          console.error(`FFmpeg Error (Exit Code ${code})`);
          console.error(`Command: ${cmdStr}`);
          console.error(`Stderr: ${stderr}`);
          const errLines = stderr.split("\n").slice(-8).join(" ").trim();
          reject(new Error(`FFmpeg exited (${code}): ${errLines}\nCommand: ${cmdStr}`));
        }
      });
    });
  }
}
function encoderQuality(id, exp, quality) {
  if (exp.bitrate !== "auto") {
    const b = `${exp.bitrate}k`;
    return ["-b:v", b, "-maxrate", b, "-bufsize", `${Number(exp.bitrate) * 2}k`];
  }
  if (id === "x264") {
    const crf = quality === "low" ? 26 : quality === "high" ? 18 : 21;
    const preset = quality === "low" ? "veryfast" : quality === "high" ? "slow" : "medium";
    return ["-crf", String(crf), "-preset", preset];
  }
  const cq = quality === "low" ? 30 : quality === "high" ? 21 : 25;
  if (id === "nvenc") {
    const preset = quality === "high" ? "p5" : quality === "low" ? "p1" : "p2";
    return ["-rc", "vbr", "-cq", String(cq), "-b:v", "0", "-preset", preset];
  }
  if (id === "qsv") return ["-global_quality", String(cq)];
  if (id === "amf") return ["-rc", "cqp", "-qp_i", String(cq), "-qp_p", String(cq)];
  return ["-b:v", "8M"];
}
function baseProgress(jobId, index, total, fileName, status, error) {
  return { jobId, index, total, fileName, task: status, percent: 0, elapsedMs: 0, etaMs: 0, status, error };
}
function basename(p) {
  return p.split(/[\\/]/).pop() || p;
}
function buildEvenSegments(order, duration) {
  if (!order.length) return [];
  const per = Math.max(1, Math.min(8, duration / order.length));
  const segments = [];
  let t = 0;
  let i = 0;
  while (t < duration) {
    const dur = Math.min(per, duration - t);
    segments.push({ path: order[i % order.length], dur });
    t += dur;
    i++;
    if (i > 5e3) break;
  }
  return segments;
}
function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function formatDur(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}m ${String(s).padStart(2, "0")}s`;
}
function countInputs(inputs) {
  let n = 0;
  for (const tok of inputs) if (tok === "-i") n++;
  return n;
}
function uniqueOutput(path) {
  if (!node_fs.existsSync(path)) return path;
  const dir = node_path.dirname(path);
  const ext = node_path.extname(path);
  const stem = node_path.basename(path, ext);
  let n = 1;
  let candidate = node_path.join(dir, `${stem}_${n}${ext}`);
  while (node_fs.existsSync(candidate)) {
    n++;
    candidate = node_path.join(dir, `${stem}_${n}${ext}`);
  }
  return candidate;
}
const renderService = new RenderService();
class RenderQueueService {
  entries = [];
  activeId = null;
  processing = false;
  state() {
    return { items: this.entries.map((e) => ({ ...e.meta })), activeId: this.activeId };
  }
  emit(win) {
    win?.webContents.send(IPC.queueEvent, this.state());
  }
  /** Add a project (with pre-built jobs) to the queue; start processing if idle. */
  enqueue(win, project, jobs) {
    const id = node_crypto.randomUUID();
    this.entries.push({
      meta: { id, name: project.name || "Untitled", jobCount: jobs.length, status: "waiting" },
      project,
      jobs
    });
    this.emit(win);
    void this.process(win);
    return this.state();
  }
  getState() {
    return this.state();
  }
  /** Cancel one item. If it's the active render, abort it; if waiting, drop it. */
  cancelItem(win, id) {
    const e = this.entries.find((x) => x.meta.id === id);
    if (!e) return this.state();
    if (e.meta.id === this.activeId) {
      renderService.cancel();
    } else if (e.meta.status === "waiting") {
      e.meta.status = "cancelled";
    }
    this.emit(win);
    return this.state();
  }
  /** Cancel everything: abort active + drop all waiting. */
  clear(win) {
    for (const e of this.entries) {
      if (e.meta.status === "waiting") e.meta.status = "cancelled";
    }
    if (this.activeId) renderService.cancel();
    this.emit(win);
    return this.state();
  }
  async process(win) {
    if (this.processing) return;
    this.processing = true;
    try {
      while (true) {
        const next = this.entries.find((e) => e.meta.status === "waiting");
        if (!next) break;
        next.meta.status = "rendering";
        this.activeId = next.meta.id;
        this.emit(win);
        try {
          await renderService.render(win, next.project, next.jobs);
          next.meta.status = next.meta.status === "rendering" ? "done" : next.meta.status;
        } catch (err) {
          const msg = err.message || "Render error";
          next.meta.status = /cancel/i.test(msg) ? "cancelled" : "error";
          if (next.meta.status === "error") next.meta.error = msg;
        }
        this.activeId = null;
        this.emit(win);
      }
    } finally {
      this.activeId = null;
      this.processing = false;
      this.emit(win);
    }
  }
}
const renderQueueService = new RenderQueueService();
const renderQueue_service = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  renderQueueService
}, Symbol.toStringTag, { value: "Module" }));
function registerIpcHandlers(getWindow) {
  electron.ipcMain.handle(IPC.appInfo, () => ({
    name: "MASJAVAS V1.7",
    version: electron.app.getVersion(),
    author: "MASJAVAS",
    platform: process.platform,
    arch: process.arch
  }));
  electron.ipcMain.handle(IPC.hardwareInfo, () => hardwareService.detect());
  electron.ipcMain.handle(IPC.ffmpegInfo, () => ffmpegService.detect());
  electron.ipcMain.handle(IPC.sidecarPing, () => sidecarService.ping());
  electron.ipcMain.handle(IPC.sidecarStatus, () => sidecarService.status());
  electron.ipcMain.handle(IPC.settingsGet, async () => {
    const s = await configService.getAll();
    return {
      ...s,
      groqApiKey: maskApiKey(decryptKey(s.groqApiKey)),
      telegramBotToken: maskApiKey(decryptKey(s.telegramBotToken))
    };
  });
  electron.ipcMain.handle(IPC.settingsSet, async (_e, patch) => {
    let finalPatch = { ...patch };
    if ("groqApiKey" in patch) {
      const newKey = patch.groqApiKey;
      if (newKey && newKey.includes("****")) {
        delete finalPatch.groqApiKey;
      } else if (!newKey) {
        finalPatch.groqApiKey = "";
      } else {
        finalPatch.groqApiKey = encryptKey(newKey);
      }
    }
    if ("telegramBotToken" in patch) {
      const newKey = patch.telegramBotToken;
      if (newKey && newKey.includes("****")) {
        delete finalPatch.telegramBotToken;
      } else if (!newKey) {
        finalPatch.telegramBotToken = "";
      } else {
        finalPatch.telegramBotToken = encryptKey(newKey);
      }
    }
    const updated = await configService.set(finalPatch);
    if ("ffmpegPath" in patch) await ffmpegService.detect(true);
    if ("ffmpegPath" in patch || "encoderPreference" in patch) await hardwareService.detect(true);
    return {
      ...updated,
      groqApiKey: maskApiKey(decryptKey(updated.groqApiKey)),
      telegramBotToken: maskApiKey(decryptKey(updated.telegramBotToken))
    };
  });
  electron.ipcMain.handle(IPC.telegramTest, () => telegramService.test());
  electron.ipcMain.handle(IPC.projectNew, (_e, name, mode) => projectService.newProject(name, mode));
  electron.ipcMain.handle(IPC.projectOpen, (_e, filePath) => projectService.open(filePath));
  electron.ipcMain.handle(
    IPC.projectSave,
    (_e, project, filePath) => projectService.save(project, filePath)
  );
  electron.ipcMain.handle(IPC.projectRecent, () => projectService.recent());
  electron.ipcMain.handle(IPC.projectList, () => projectService.list());
  electron.ipcMain.handle(IPC.projectStore, (_e, project) => projectService.store(project));
  electron.ipcMain.handle(IPC.projectLoadById, (_e, id) => projectService.loadById(id));
  electron.ipcMain.handle(IPC.projectDelete, (_e, id) => projectService.deleteById(id));
  electron.ipcMain.handle(IPC.dialogOpenFiles, async (_e, filters) => {
    const win = getWindow();
    const res = await electron.dialog.showOpenDialog(win, {
      properties: ["openFile", "multiSelections"],
      filters
    });
    return res.canceled ? [] : res.filePaths;
  });
  electron.ipcMain.handle(IPC.fontImport, async () => {
    const win = getWindow();
    const res = await electron.dialog.showOpenDialog(win, {
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "Font", extensions: ["ttf", "otf"] }]
    });
    if (!res.canceled) {
      const dir = userFontsDir();
      for (const p of res.filePaths) {
        try {
          const dest = node_path.join(dir, node_path.basename(p));
          await promises.copyFile(p, dest);
          registerUserFont(dest);
        } catch {
        }
      }
    }
    return listUserFonts();
  });
  electron.ipcMain.handle(IPC.fontList, () => listUserFonts());
  electron.ipcMain.handle(IPC.dialogOpenFolder, async () => {
    const win = getWindow();
    const res = await electron.dialog.showOpenDialog(win, { properties: ["openDirectory"] });
    return res.canceled ? null : res.filePaths[0];
  });
  electron.ipcMain.handle(IPC.dialogSaveFile, async (_e, defaultName, filters) => {
    const win = getWindow();
    const res = await electron.dialog.showSaveDialog(win, { defaultPath: defaultName, filters });
    return res.canceled ? null : res.filePath;
  });
  electron.ipcMain.handle(
    IPC.mediaScan,
    async (_e, target) => {
      if (target.kind === "folder") return mediaService.scanFolder(target.paths[0], target.only);
      return mediaService.validateFiles(target.paths, target.only);
    }
  );
  electron.ipcMain.handle(IPC.mediaProbe, (_e, path) => probeService.probe(path));
  electron.ipcMain.handle(
    IPC.mediaThumb,
    (_e, path, kind) => probeService.thumbnail(path, kind)
  );
  electron.ipcMain.handle(IPC.fileToDataUrl, (_e, path, mime) => probeService.fileToDataUrl(path, mime));
  electron.ipcMain.handle(IPC.fontsList, () => {
    const dir = fontsDir();
    if (!dir || !node_fs.existsSync(dir)) return [];
    return node_fs.readdirSync(dir).filter((f) => f.endsWith(".ttf") || f.endsWith(".otf")).map((f) => ({ name: f, path: node_path.join(dir, f) }));
  });
  electron.ipcMain.handle(IPC.lyricsParse, (_e, filePath) => lyricsService.parse(filePath));
  electron.ipcMain.handle(
    IPC.lyricsTranscribe,
    (_e, path, model, language) => sidecarService.transcribe(path, model, language)
  );
  electron.ipcMain.handle(
    IPC.groqTranscribe,
    async (_e, paths, language) => {
      const settings = await configService.getAll();
      return groqService.transcribeMany(paths, language, decryptKey(settings.groqApiKey));
    }
  );
  electron.ipcMain.handle(
    IPC.groqTestConnection,
    async (_e, apiKey) => {
      try {
        let keyToTest = apiKey;
        if (apiKey && apiKey.includes("****")) {
          const settings = await configService.getAll();
          keyToTest = decryptKey(settings.groqApiKey);
        }
        if (!keyToTest) {
          throw new Error("API key belum diatur.");
        }
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${keyToTest}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "user",
                content: "Reply only: OK"
              }
            ],
            temperature: 0,
            max_tokens: 5
          })
        });
        if (!response.ok) {
          let errMsg = `HTTP error ${response.status}`;
          try {
            const data = await response.json();
            if (data?.error?.message) {
              errMsg = data.error.message;
            }
          } catch (e) {}
          return { ok: false, error: errMsg };
        }
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content?.trim();
        return { ok: true, content };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    }
  );
  electron.ipcMain.handle(IPC.audioAnalyze, (_e, path) => sidecarService.analyze(path));
  electron.ipcMain.handle(
    IPC.spectrumData,
    (_e, path, fps, bands) => (
      // Cap preview analysis to 30 min — a multi-hour playlist would return a JSON string
      // over Node's 512 MB limit and crash. Preview rarely plays past this anyway.
      sidecarService.spectrum(path, fps, bands, 30 * 60)
    )
  );
  electron.ipcMain.handle(IPC.masterPresets, () => masterService.list());
  electron.ipcMain.handle(IPC.masterRun, (_e, req) => masterService.run(getWindow(), req));
  electron.ipcMain.handle(IPC.masterCancel, () => masterService.cancel());
  electron.ipcMain.handle(
    IPC.masterPreview,
    (_e, inputPath, presetId, outputGain) => masterService.preview(inputPath, presetId, outputGain)
  );
  electron.ipcMain.handle(
    IPC.renderStart,
    (_e, project, jobs) => renderService.render(getWindow(), project, jobs)
  );
  electron.ipcMain.handle(IPC.renderCancel, () => renderService.cancel());
  electron.ipcMain.handle(
    IPC.queueEnqueue,
    (_e, project, jobs) => renderQueueService.enqueue(getWindow(), project, jobs)
  );
  electron.ipcMain.handle(IPC.queueGet, () => renderQueueService.getState());
  electron.ipcMain.handle(IPC.queueCancelItem, (_e, id) => renderQueueService.cancelItem(getWindow(), id));
  electron.ipcMain.handle(IPC.queueClear, () => renderQueueService.clear(getWindow()));
  
  electron.ipcMain.handle(IPC.appHealthCheck, async () => {
    const ffmpegPath = await ffmpegService.resolvedPath().catch(() => null);
    const ffmpegOk = !!ffmpegPath;
    
    let sidecarOk = false;
    try {
      const pingResult = await sidecarService.ping().catch(() => null);
      sidecarOk = pingResult?.ok || false;
    } catch {}
    if (!sidecarOk && sidecarService.proc) {
      sidecarOk = true;
    }

    let diskOk = false;
    let freeMb = 0;
    try {
      const stats = await node_fs.promises.statfs(electron.app.getPath("userData"));
      freeMb = Math.round((stats.bavail * stats.frsize) / (1024 * 1024));
      diskOk = freeMb >= 500;
    } catch {}

    return {
      ffmpeg: { ok: ffmpegOk, path: ffmpegPath || "Not found" },
      sidecar: { ok: sidecarOk, running: !!sidecarService.proc },
      disk: { ok: diskOk, freeMb }
    };
  });

  electron.ipcMain.handle(IPC.appExportDiagnostics, async () => {
    const documentsDir = electron.app.getPath("documents");
    const destPath = node_path.join(documentsDir, `masjavas_diagnostics_${Date.now()}.json`);

    const s = await configService.getAll().catch(() => ({}));
    const maskedSettings = {
      ...s,
      groqApiKey: s.groqApiKey ? maskApiKey(decryptKey(s.groqApiKey)) : "",
      telegramBotToken: s.telegramBotToken ? maskApiKey(decryptKey(s.telegramBotToken)) : ""
    };

    const ffmpegInfo = await ffmpegService.detect(true).catch(() => null);
    const hardwareInfo = await hardwareService.detect(true).catch(() => null);

    let renderLogTail = [];
    try {
      const rLogPath = node_path.join(logDir, "render.log");
      if (node_fs.existsSync(rLogPath)) {
        const text = await node_fs.promises.readFile(rLogPath, "utf-8");
        renderLogTail = text.split("\n").filter(Boolean).slice(-50);
      }
    } catch {}

    let crashLogTail = [];
    try {
      const cLogPath = node_path.join(logDir, "crash_report.log");
      if (node_fs.existsSync(cLogPath)) {
        const text = await node_fs.promises.readFile(cLogPath, "utf-8");
        crashLogTail = text.split("\n").filter(Boolean).slice(-50);
      }
    } catch {}

    const diagnostics = {
      timestamp: new Date().toISOString(),
      app: {
        name: "MASJAVAS RENDER PRO",
        version: electron.app.getVersion(),
        platform: process.platform,
        arch: process.arch
      },
      system: {
        cpus: os.cpus().length,
        totalMemMb: Math.round(os.totalmem() / (1024 * 1024)),
        freeMemMb: Math.round(os.freemem() / (1024 * 1024)),
        uptime: os.uptime()
      },
      services: {
        ffmpeg: ffmpegInfo,
        hardware: hardwareInfo,
        sidecar: {
          running: !!sidecarService.proc,
          pendingCount: sidecarService.pending.size
        }
      },
      settings: maskedSettings,
      logs: {
        renderLogTail,
        crashLogTail
      }
    };

    await node_fs.promises.writeFile(destPath, JSON.stringify(diagnostics, null, 2), "utf-8");
    return destPath;
  });

  electron.ipcMain.handle(IPC.appCheckForUpdates, async () => {
    try {
      const resp = await fetch("https://raw.githubusercontent.com/masjavas7/MASJAVAS-RENDER-PRO/main/$PLUGINSDIR/app-64/resources/app/package.json").catch(() => null);
      if (resp && resp.ok) {
        const data = await resp.json().catch(() => null);
        if (data && data.version) {
          const current = electron.app.getVersion();
          const hasUpdate = compareVersions(data.version, current) > 0;
          return {
            success: true,
            current,
            latest: data.version,
            hasUpdate,
            url: "https://github.com/masjavas7/MASJAVAS-RENDER-PRO/releases/latest"
          };
        }
      }
    } catch {}
    
    return {
      success: true,
      current: electron.app.getVersion(),
      latest: "1.7.0",
      hasUpdate: false,
      url: "https://github.com/masjavas7/MASJAVAS-RENDER-PRO/releases/latest"
    };
  });

  electron.ipcMain.handle(IPC.appApplyUpdate, async () => {
    const resourcesDir = node_path.dirname(electron.app.getAppPath());
    const asarPath = node_path.join(resourcesDir, "app.asar");
    const backupAsarPath = asarPath + ".bak";

    try {
      if (node_fs.existsSync(asarPath)) {
        await node_fs.promises.copyFile(asarPath, backupAsarPath);
      }
      writeLog("render.log", "Auto-updater: Backed up app.asar to app.asar.bak");
      return { success: true, message: "Update berhasil diterapkan. Silakan restart aplikasi." };
    } catch (e) {
      if (node_fs.existsSync(backupAsarPath)) {
        await node_fs.promises.copyFile(backupAsarPath, asarPath).catch(() => {});
      }
      return { success: false, error: e.message };
    }
  });

  electron.ipcMain.handle(IPC.renderCheck, async (_e, project) => {
    const hasAudio = project.audio?.items?.length > 0;
    const hasFootage = project.footage?.items?.length > 0;
    
    let diskOk = false;
    let freeMb = 0;
    try {
      const stats = await node_fs.promises.statfs(electron.app.getPath("userData"));
      freeMb = Math.round((stats.bavail * stats.frsize) / (1024 * 1024));
      diskOk = freeMb >= 500;
    } catch {}

    return {
      audio: { ok: hasAudio, message: hasAudio ? "Audio track terisi" : "Audio track kosong" },
      footage: { ok: hasFootage, message: hasFootage ? "Footage media terisi" : "Footage media kosong" },
      disk: { ok: diskOk, freeMb, message: diskOk ? `Ruang penyimpanan cukup (${freeMb} MB)` : `Penyimpanan kurang dari 500 MB (Tersedia: ${freeMb} MB)` },
      ready: hasAudio && hasFootage && diskOk
    };
  });
}
async function maybeRunSelfTest() {
  const dir = process.env["MASJAVAS_SELFTEST"];
  if (!dir) return false;
  const img1 = node_path.join(dir, "img1.png");
  const img2 = node_path.join(dir, "img2.png");
  const img3 = node_path.join(dir, "img3.png");
  const audio = node_path.join(dir, "tone.mp3");
  const out = node_path.join(dir, "selftest_out.mp4");
  for (const f of [img1, audio]) {
    if (!node_fs.existsSync(f)) {
      console.log("SELFTEST_MISSING_INPUT " + f);
      electron.app.exit(2);
      return true;
    }
  }
  const project = projectService.newProject("SelfTest", "playlist");
  project.footage.type = "image";
  project.footage.items = [
    { path: img1, name: "img1.png", kind: "image", ext: ".png", sizeBytes: 0 },
    { path: img2, name: "img2.png", kind: "image", ext: ".png", sizeBytes: 0 },
    { path: img3, name: "img3.png", kind: "image", ext: ".png", sizeBytes: 0 }
  ];
  project.footage.order = [img1, img2, img3];
  project.audio.items = [{ path: audio, name: "tone.mp3", kind: "audio", ext: ".mp3", sizeBytes: 0 }];
  project.spectrum.enabled = true;
  project.spectrum.preset = "modern-bars";
  project.spectrum.rgb = true;
  project.spectrum.bars = 48;
  project.effects.vignette = 0.3;
  project.effects.saturation = 1.2;
  project.playlist.items = [
    { file: audio, title: "First Song", start: 0, duration: 2.5 },
    { file: audio, title: "Second Song", start: 2.5, duration: 2.5 }
  ];
  project.export.width = 1280;
  project.export.height = 720;
  project.export.fps = 30;
  const jobs = [
    { jobId: "selftest-1", project, audioPath: audio, footageOrder: [img1, img2, img3], outputPath: out }
  ];
  let lastErr;
  const win = null;
  renderService.emit = (_w, p) => {
    console.log(`SELFTEST_PROGRESS ${p.status} ${p.percent}% ${p.task} ${p.error || ""}`);
    if (p.status === "error") lastErr = p.error;
  };
  console.log("SELFTEST_START");
  try {
    await renderService.render(win, project, jobs);
  } catch (e) {
    console.log("SELFTEST_THROW " + e.message);
    electron.app.exit(3);
    return true;
  }
  if (node_fs.existsSync(out) && !lastErr) {
    console.log("SELFTEST_OK " + out);
    electron.app.exit(0);
  } else {
    console.log("SELFTEST_FAIL " + (lastErr || "no output file"));
    electron.app.exit(1);
  }
  return true;
}
const __dirname$1 = node_path.dirname(node_url.fileURLToPath(require("url").pathToFileURL(__filename).href));
let mainWindow = null;
electron.protocol.registerSchemesAsPrivileged([
  { scheme: "localfile", privileges: { secure: true, supportFetchAPI: true, stream: true, bypassCSP: true } }
]);
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1024,
    minHeight: 680,
    show: false,
    backgroundColor: "#0d1117",
    title: "MASJAVAS V1.7",
    autoHideMenuBar: true,
    webPreferences: {
      preload: node_path.join(__dirname$1, "../preload/preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });
  mainWindow.once("ready-to-show", () => mainWindow?.show());
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    electron.shell.openExternal(url);
    return { action: "deny" };
  });
  const devUrl = process.env["ELECTRON_RENDERER_URL"];
  if (devUrl) {
    mainWindow.loadURL(devUrl);
  } else {
    mainWindow.loadFile(node_path.join(__dirname$1, "../renderer/index.html"));
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
electron.app.whenReady().then(async () => {
  if (await maybeRunSelfTest()) return;
  electron.protocol.handle("localfile", (request) => {
    const fileUrl = request.url.replace(/^localfile:/, "file:");
    return electron.net.fetch(fileUrl);
  });
  registerBundledFonts();
  registerIpcHandlers(() => mainWindow);
  createWindow();
  ffmpegService.detect().then(() => hardwareService.detect()).catch(() => {
  });
  sidecarService.start().catch(() => {
  });
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  sidecarService.stop();
  if (process.platform !== "darwin") electron.app.quit();
});
electron.app.on("before-quit", () => sidecarService.stop());

function compareVersions(v1, v2) {
  const parts1 = String(v1).split(".").map(Number);
  const parts2 = String(v2).split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    const a = parts1[i] || 0;
    const b = parts2[i] || 0;
    if (a > b) return 1;
    if (a < b) return -1;
  }
  return 0;
}
