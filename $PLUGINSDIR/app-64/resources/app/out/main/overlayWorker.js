"use strict";
const node_worker_threads = require("node:worker_threads");
const node_child_process = require("node:child_process");
const node_fs = require("node:fs");
const node_events = require("node:events");
const customText = require("./customText-BOXBpQRz.cjs");
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function hslShift(_base, t) {
  return `hsl(${t * 360 % 360}, 90%, 60%)`;
}
function buildSpectrumDrawer(cfg, src, W, H, fps, winStart, winEnd) {
  if (!cfg.enabled || !src.count) return null;
  const bands = Math.max(16, Math.min(160, cfg.bars));
  const smooth = new Array(bands).fill(0);
  const smoothing = Math.min(0.95, Math.max(0, cfg.smoothing));
  const valsPerFrame = [];
  for (let f = winStart; f < winEnd; f++) {
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
  const drawFrame = (ctx, f) => {
    const idx = Math.max(0, Math.min(valsPerFrame.length - 1, f - winStart));
    customText.drawSpectrum(ctx, cfg, valsPerFrame[idx], W, H, f / fps);
  };
  return { totalFrames: winEnd, drawFrame };
}
function buildSpectrumLayersDrawer(layers, src, W, H, fps, winStart, winEnd) {
  const enabled = layers.filter((l) => l.enabled);
  if (!enabled.length || !src.count) return null;
  const rawFrames = [];
  for (let f = winStart; f < winEnd; f++) rawFrames.push(Array.from(src.at(f)));
  const smoothBufs = /* @__PURE__ */ new Map();
  for (const layer of enabled) smoothBufs.set(layer.id, new Array(layer.bars).fill(0));
  const drawFrame = (ctx, f) => {
    const raw = rawFrames[Math.max(0, Math.min(rawFrames.length - 1, f - winStart))];
    const nowSec = f / fps;
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
  return { totalFrames: winEnd, drawFrame };
}
function buildLogoDrawer(project, src, beats, img, W, H, fps, winStart, winEnd, renderDur) {
  const logo = project.logo;
  if (!logo.enabled || !logo.path || !src.count) return null;
  const useBeats = beats.length >= 4;
  const minDim = Math.min(W, H);
  const cx = W * logo.posX;
  const cy = H * logo.posY;
  const logoR = minDim * logo.size / 2;
  const ringBase = minDim * logo.ringRadius;
  const bars = logo.bars;
  const doRotate = logo.rotate ?? false;
  const reqSecPerRev = Math.max(2, Math.min(20, logo.rotateSecPerRev ?? 8));
  const revs = Math.max(1, Math.round(renderDur / reqSecPerRev));
  const effSecPerRev = renderDur / revs;
  const ringFrames = [];
  for (let f = winStart; f < winEnd; f++) ringFrames.push(Array.from(src.at(f)));
  const doPulse = logo.logoPulse ?? false;
  const doBounce = logo.logoBeatBounce ?? false;
  const doParticles = logo.particles ?? false;
  const pf = customText.createParticleField();
  let prevBass = 0;
  let bounce = 0;
  let beatIdx = 0;
  const dtNative = 30 / fps;
  const drawFrame = (ctx, f) => {
    const frame = ringFrames[Math.max(0, Math.min(ringFrames.length - 1, f - winStart))];
    const energy = customText.bassEnergy(frame);
    let beatHere;
    if (useBeats) {
      const tSec = f / fps;
      const tNext = (f + 1) / fps;
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
        t: f / fps,
        dt: dtNative,
        spawnRadius: effRadius,
        style: logo.particleStyle ?? "burst",
        speed: logo.particleSpeed ?? 1,
        forceBurst: bassBeat
      });
    }
    customText.drawRingBands(ctx, {
      cx,
      cy,
      ringBase,
      minDim,
      bars,
      thickness: logo.ringThickness,
      color: logo.ringColor,
      rgb: logo.rgb,
      glow: logo.glow,
      glowScale: 30,
      intensity: logo.intensity,
      mode: logo.mode,
      style: logo.ringStyle ?? "bars",
      t: f / Math.max(1, winEnd),
      frame,
      colorAt: (i, n, _v) => logo.rgb ? hslShift(logo.ringColor, (i / n + f / Math.max(1, winEnd)) % 1) : logo.ringColor
    });
    ctx.shadowBlur = 0;
    ctx.save();
    ctx.globalAlpha = logo.opacity;
    if (doRotate) {
      const angle = f / fps / effSecPerRev * Math.PI * 2;
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
  return { totalFrames: winEnd, drawFrame };
}
function buildOverlayLayersDrawer(project, W, H, fps, winEnd) {
  const enabled = (project.overlayLayers ?? []).filter((l) => l.enabled);
  if (!enabled.length) return null;
  return {
    totalFrames: winEnd,
    drawFrame: (ctx, f) => customText.drawOverlayLayers(ctx, enabled, f / fps, W, H)
  };
}
function buildCustomTextDrawer(project, W, H, fps, winEnd) {
  const texts = (project.customTexts ?? []).filter((tx) => tx.enabled && tx.text);
  if (!texts.length) return null;
  return {
    totalFrames: winEnd,
    drawFrame: (ctx, f) => customText.drawCustomTexts(ctx, texts, f / fps, W, H)
  };
}
const { createCanvas, loadImage } = require("@napi-rs/canvas");
function frameSourceFromBin(info) {
  const buf = node_fs.readFileSync(info.path);
  const data = new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.byteLength / 4));
  const b = info.bands;
  const empty = new Float32Array(b);
  return {
    count: info.count,
    at: (f) => {
      if (info.count <= 0) return empty;
      const i = Math.max(0, Math.min(info.count - 1, f));
      return data.subarray(i * b, i * b + b);
    }
  };
}
async function run(job) {
  const { project, W, H, fps } = job;
  const srcFor = (bands) => {
    const info = job.bins[String(bands)];
    return info ? frameSourceFromBin(info) : null;
  };
  const drawers = [];
  if (project.spectrum.enabled) {
    const s = srcFor(Math.max(16, Math.min(160, project.spectrum.bars)));
    const d = s && buildSpectrumDrawer(project.spectrum, s, W, H, fps, job.winStart, job.blockEnd);
    if (d) drawers.push(d);
  }
  const layers = (project.spectrumLayers ?? []).filter((l) => l.enabled);
  if (layers.length) {
    const maxBands = Math.max(...layers.map((l) => l.bars));
    const s = srcFor(maxBands);
    const d = s && buildSpectrumLayersDrawer(project.spectrumLayers ?? [], s, W, H, fps, job.winStart, job.blockEnd);
    if (d) drawers.push(d);
  }
  const ov = buildOverlayLayersDrawer(project, W, H, fps, job.blockEnd);
  if (ov) drawers.push(ov);
  if (project.logo.enabled && project.logo.path && job.logoPath) {
    const s = srcFor(project.logo.bars);
    const img = await loadImage(job.logoPath);
    const d = s && buildLogoDrawer(project, s, job.beats, img, W, H, fps, job.winStart, job.blockEnd, job.renderDur);
    if (d) drawers.push(d);
  }
  const tx = buildCustomTextDrawer(project, W, H, fps, job.blockEnd);
  if (tx) drawers.push(tx);
  if (!drawers.length) throw new Error("no drawers");
  const segLen = (job.blockEnd - job.blockStart) / fps;
  const args = ["-hide_banner", "-y"];
  if (job.footage.type === "image" && job.footage.imagePath) {
    args.push("-loop", "1", "-t", segLen.toFixed(3), "-i", job.footage.imagePath);
  } else {
    args.push("-f", "lavfi", "-t", segLen.toFixed(3), "-i", `color=c=black:s=${W}x${H}:r=${fps}`);
  }
  args.push("-f", "rawvideo", "-pixel_format", "rgba", "-video_size", `${W}x${H}`, "-framerate", String(fps), "-i", "pipe:0");
  const fc = `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${fps},format=yuv420p[base];[1:v]format=rgba[ov];[base][ov]overlay=0:0:format=auto[v];[v]format=yuv420p[vf]`;
  args.push("-filter_complex", fc, "-map", "[vf]", "-t", segLen.toFixed(3), "-r", String(fps));
  args.push("-c:v", job.vcodec, ...job.encoderArgs, "-pix_fmt", "yuv420p", "-an", job.segPath);
  const ff = node_child_process.spawn(job.ffmpeg, args, { windowsHide: true });
  let ffErr = "";
  ff.stderr.on("data", (d) => {
    ffErr += d.toString();
    if (ffErr.length > 8e3) ffErr = ffErr.slice(-8e3);
  });
  const exitP = node_events.once(ff, "close");
  ff.on("error", (e) => {
    throw e;
  });
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  const stdin = ff.stdin;
  for (let f = job.winStart; f < job.blockEnd; f++) {
    ctx.clearRect(0, 0, W, H);
    for (const d of drawers) d.drawFrame(ctx, f);
    if (f < job.blockStart) continue;
    const data = ctx.getImageData(0, 0, W, H).data;
    const buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
    if (!stdin.write(buf)) await node_events.once(stdin, "drain");
  }
  stdin.end();
  const [code] = await exitP;
  if (code !== 0) throw new Error(`segment ffmpeg exit ${code}: ${ffErr.slice(-500)}`);
}
run(node_worker_threads.workerData).then(() => node_worker_threads.parentPort?.postMessage({ ok: true, segIndex: node_worker_threads.workerData.segIndex })).catch((e) => node_worker_threads.parentPort?.postMessage({ ok: false, error: e.message, segIndex: node_worker_threads.workerData.segIndex }));
