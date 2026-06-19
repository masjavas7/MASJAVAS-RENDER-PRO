"use strict";
const electron = require("electron");
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
const api = {
  getAppInfo: () => electron.ipcRenderer.invoke(IPC.appInfo),
  getHardwareInfo: () => electron.ipcRenderer.invoke(IPC.hardwareInfo),
  getFfmpegInfo: () => electron.ipcRenderer.invoke(IPC.ffmpegInfo),
  pingSidecar: () => electron.ipcRenderer.invoke(IPC.sidecarPing),
  getSidecarStatus: () => electron.ipcRenderer.invoke(IPC.sidecarStatus),
  getSettings: () => electron.ipcRenderer.invoke(IPC.settingsGet),
  setSettings: (patch) => electron.ipcRenderer.invoke(IPC.settingsSet, patch),
  newProject: (name, mode) => electron.ipcRenderer.invoke(IPC.projectNew, name, mode),
  openProject: (filePath) => electron.ipcRenderer.invoke(IPC.projectOpen, filePath),
  saveProject: (project, filePath) => electron.ipcRenderer.invoke(IPC.projectSave, project, filePath),
  recentProjects: () => electron.ipcRenderer.invoke(IPC.projectRecent),
  listProjects: () => electron.ipcRenderer.invoke(IPC.projectList),
  storeProject: (project) => electron.ipcRenderer.invoke(IPC.projectStore, project),
  loadProjectById: (id) => electron.ipcRenderer.invoke(IPC.projectLoadById, id),
  deleteProject: (id) => electron.ipcRenderer.invoke(IPC.projectDelete, id),
  openFiles: (filters) => electron.ipcRenderer.invoke(IPC.dialogOpenFiles, filters),
  openFolder: () => electron.ipcRenderer.invoke(IPC.dialogOpenFolder),
  saveFile: (defaultName, filters) => electron.ipcRenderer.invoke(IPC.dialogSaveFile, defaultName, filters),
  scanMedia: (target) => electron.ipcRenderer.invoke(IPC.mediaScan, target),
  probe: (path) => electron.ipcRenderer.invoke(IPC.mediaProbe, path),
  thumbnail: (path, kind) => electron.ipcRenderer.invoke(IPC.mediaThumb, path, kind),
  fileToDataUrl: (path, mime) => electron.ipcRenderer.invoke(IPC.fileToDataUrl, path, mime),
  fontsList: () => electron.ipcRenderer.invoke(IPC.fontsList),
  parseLyrics: (filePath) => electron.ipcRenderer.invoke(IPC.lyricsParse, filePath),
  transcribeLyrics: (path, model, language) => electron.ipcRenderer.invoke(IPC.lyricsTranscribe, path, model, language),
  groqTranscribe: (paths, language) => electron.ipcRenderer.invoke(IPC.groqTranscribe, paths, language),
  analyzeAudio: (path) => electron.ipcRenderer.invoke(IPC.audioAnalyze, path),
  getSpectrum: (path, fps, bands) => electron.ipcRenderer.invoke(IPC.spectrumData, path, fps, bands),
  importFonts: () => electron.ipcRenderer.invoke(IPC.fontImport),
  getUserFonts: () => electron.ipcRenderer.invoke(IPC.fontList),
  masterPresets: () => electron.ipcRenderer.invoke(IPC.masterPresets),
  runMaster: (req) => electron.ipcRenderer.invoke(IPC.masterRun, req),
  cancelMaster: () => electron.ipcRenderer.invoke(IPC.masterCancel),
  masterPreview: (inputPath, presetId, outputGain) => electron.ipcRenderer.invoke(IPC.masterPreview, inputPath, presetId, outputGain),
  onMasterEvent: (cb) => {
    const fn = (_e, p) => cb(p);
    electron.ipcRenderer.on(IPC.masterEvent, fn);
    return () => electron.ipcRenderer.removeListener(IPC.masterEvent, fn);
  },
  startRender: (project, jobs) => electron.ipcRenderer.invoke(IPC.renderStart, project, jobs),
  cancelRender: () => electron.ipcRenderer.invoke(IPC.renderCancel),
  onRenderEvent: (cb) => {
    const fn = (_e, p) => cb(p);
    electron.ipcRenderer.on(IPC.renderEvent, fn);
    return () => electron.ipcRenderer.removeListener(IPC.renderEvent, fn);
  },
  // Render queue (multi-project, batch mode)
  enqueueRender: (project, jobs) => electron.ipcRenderer.invoke(IPC.queueEnqueue, project, jobs),
  getRenderQueue: () => electron.ipcRenderer.invoke(IPC.queueGet),
  cancelQueueItem: (id) => electron.ipcRenderer.invoke(IPC.queueCancelItem, id),
  clearRenderQueue: () => electron.ipcRenderer.invoke(IPC.queueClear),
  onQueueEvent: (cb) => {
    const fn = (_e, s) => cb(s);
    electron.ipcRenderer.on(IPC.queueEvent, fn);
    return () => electron.ipcRenderer.removeListener(IPC.queueEvent, fn);
  },
  // Telegram notifications — test the saved bot token + chat id.
  telegramTest: () => electron.ipcRenderer.invoke(IPC.telegramTest),
  groqTestConnection: (apiKey) => electron.ipcRenderer.invoke(IPC.groqTestConnection, apiKey),
  appHealthCheck: () => electron.ipcRenderer.invoke(IPC.appHealthCheck),
  appExportDiagnostics: () => electron.ipcRenderer.invoke(IPC.appExportDiagnostics),
  appCheckForUpdates: () => electron.ipcRenderer.invoke(IPC.appCheckForUpdates),
  appApplyUpdate: () => electron.ipcRenderer.invoke(IPC.appApplyUpdate),
  renderCheck: (project) => electron.ipcRenderer.invoke(IPC.renderCheck, project)
};
electron.contextBridge.exposeInMainWorld("masjavas", api);
