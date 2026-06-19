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
function rgbColor(cfg, t, energy) {
  if (cfg.rgb) {
    const hue = (t * 320 + energy * 40) % 360;
    return `hsl(${hue}, 95%, ${55 + energy * 15}%)`;
  }
  return cfg.color;
}
function darken(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (n >> 16 & 255) - 80);
  const g = Math.max(0, (n >> 8 & 255) - 80);
  const b = Math.max(0, (n & 255) - 80);
  return `rgb(${r},${g},${b})`;
}
function bandY(cfg, H) {
  const maxH = H * Math.min(0.9, Math.max(0.05, cfg.scale));
  if (cfg.position === "top") return { baseY: 0, maxH, growDir: 1 };
  if (cfg.position === "center") return { baseY: H / 2, maxH: maxH / 2, growDir: -1 };
  return { baseY: H - 8, maxH, growDir: -1 };
}
function roundRect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function drawSpectrum(ctx, cfg, vals, W, H, nowSec) {
  const n = vals.length;
  if (!n) return;
  ctx.save();
  ctx.globalAlpha = cfg.opacity;
  const glowColor = cfg.rgb ? "#ffffff" : cfg.color;
  switch (cfg.preset) {
    case "circular":
    case "radial": {
      const cx = W / 2;
      const cy = H / 2;
      const baseR = Math.min(W, H) * cfg.radius;
      const step = Math.PI * 2 / n;
      const rotOff = cfg.preset === "radial" ? nowSec * 0.3 : 0;
      ctx.lineWidth = cfg.thickness;
      ctx.lineCap = "round";
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 28;
        ctx.shadowColor = glowColor;
      }
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const len = baseR * 0.8 * v + 3;
        const angle = i * step - Math.PI / 2 + rotOff;
        const x1 = cx + Math.cos(angle) * baseR;
        const y1 = cy + Math.sin(angle) * baseR;
        const x2 = cx + Math.cos(angle) * (baseR + len);
        const y2 = cy + Math.sin(angle) * (baseR + len);
        ctx.strokeStyle = rgbColor(cfg, i / n, v);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      break;
    }
    case "waveform-glow": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      const ampDir = growDir * -1;
      ctx.lineWidth = cfg.thickness + 1;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 32;
        ctx.shadowColor = glowColor;
      }
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let i = 0; i < n; i++) {
        ctx.lineTo(i / (n - 1) * W, baseY + ampDir * vals[i] * maxH);
      }
      ctx.lineTo(W, baseY);
      ctx.closePath();
      const gf = ctx.createLinearGradient(0, 0, W, 0);
      if (cfg.rgb) {
        for (let s = 0; s <= 6; s++) gf.addColorStop(s / 6, `hsl(${s * 60},100%,60%)`);
      } else {
        gf.addColorStop(0, cfg.color);
        gf.addColorStop(1, cfg.color);
      }
      ctx.fillStyle = gf;
      ctx.globalAlpha = cfg.opacity * 0.35;
      ctx.fill();
      ctx.globalAlpha = cfg.opacity;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const x = i / (n - 1) * W;
        const y = baseY + ampDir * vals[i] * maxH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      if (cfg.rgb) {
        const gs = ctx.createLinearGradient(0, 0, W, 0);
        for (let s = 0; s <= 6; s++) gs.addColorStop(s / 6, `hsl(${s * 60},100%,65%)`);
        ctx.strokeStyle = gs;
      } else {
        ctx.strokeStyle = cfg.color;
      }
      ctx.stroke();
      break;
    }
    case "minimal-line": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      const ampDir = growDir * -1;
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const x = i / (n - 1) * W;
        const y = baseY + ampDir * vals[i] * maxH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = cfg.color;
      ctx.globalAlpha = cfg.opacity * 0.85;
      ctx.stroke();
      break;
    }
    case "vintage-radio": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      const ampDir = growDir * -1;
      ctx.lineWidth = cfg.thickness;
      ctx.lineJoin = "round";
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 20;
        ctx.shadowColor = glowColor;
      }
      for (const sign of [1, -1]) {
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const x = i / (n - 1) * W;
          const y = baseY + sign * ampDir * vals[i] * maxH * 0.5;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = cfg.color;
        ctx.globalAlpha = cfg.opacity * (sign === 1 ? 1 : 0.5);
        ctx.stroke();
      }
      break;
    }
    case "particle": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      const ampDir = growDir * -1;
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 18;
        ctx.shadowColor = glowColor;
      }
      const barW = W / n;
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const dotCount = Math.ceil(v * 8) + 1;
        for (let d = 0; d < dotCount; d++) {
          const x = (i + 0.5) * barW;
          const y = baseY + ampDir * (d / dotCount) * v * maxH;
          const r = Math.max(1, cfg.thickness * 0.4 * (1 - d / dotCount));
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = rgbColor(cfg, i / n, v);
          ctx.globalAlpha = cfg.opacity * (1 - d / dotCount * 0.6);
          ctx.fill();
        }
      }
      break;
    }
    case "bass-pulse": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 40;
        ctx.shadowColor = glowColor;
      }
      const gap = 3;
      const barW = (W - gap * (n + 1)) / n;
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const bh = Math.max(2, v * maxH);
        const x = gap + i * (barW + gap);
        const y = growDir === 1 ? baseY : baseY - bh;
        const pulse = i < n * 0.25 ? 1.3 : 1;
        ctx.globalAlpha = cfg.opacity * Math.min(1, v * pulse * 1.5 + 0.1);
        ctx.fillStyle = rgbColor(cfg, i / n, v);
        roundRect(ctx, x, y, barW, bh, 4);
        ctx.fill();
      }
      break;
    }
    case "smooth-jazz": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 14;
        ctx.shadowColor = glowColor;
      }
      const gap = Math.max(2, cfg.thickness * 0.4);
      const barW = (W - gap * (n + 1)) / n;
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const bh = Math.max(3, v * maxH);
        const x = gap + i * (barW + gap);
        const y = growDir === 1 ? baseY : baseY - bh;
        const gr = ctx.createLinearGradient(x, y, x, y + bh);
        const hue = cfg.rgb ? i / n * 240 : void 0;
        const base = hue !== void 0 ? `hsl(${hue},90%,65%)` : cfg.color;
        const top = hue !== void 0 ? `hsl(${hue},90%,45%)` : darken(cfg.color);
        if (growDir === 1) {
          gr.addColorStop(0, base);
          gr.addColorStop(1, top);
        } else {
          gr.addColorStop(0, top);
          gr.addColorStop(1, base);
        }
        ctx.fillStyle = gr;
        ctx.globalAlpha = cfg.opacity;
        roundRect(ctx, x, y, barW, bh, Math.min(barW / 2, 10));
        ctx.fill();
      }
      break;
    }
    case "youtube-music": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      const gap = 2;
      const barW = (W - gap * (n + 1)) / n;
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const bh = Math.max(4, v * maxH);
        const x = gap + i * (barW + gap);
        const y = growDir === 1 ? baseY : baseY - bh;
        ctx.fillStyle = rgbColor(cfg, i / n, v);
        ctx.globalAlpha = cfg.opacity;
        roundRect(ctx, x, y, barW, bh, Math.min(barW / 2, 5));
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + barW / 2, y - 3, Math.min(barW / 2, 4), 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case "neon-bars": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      const gap = 1;
      const barW = Math.max(1, (W - gap * (n + 1)) / n);
      ctx.shadowBlur = cfg.glow * 40 + 15;
      ctx.shadowColor = glowColor;
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const bh = Math.max(2, v * maxH);
        const x = gap + i * (barW + gap);
        const y = growDir === 1 ? baseY : baseY - bh;
        ctx.fillStyle = rgbColor(cfg, i / n, v);
        ctx.globalAlpha = cfg.opacity;
        ctx.fillRect(x, y, barW, bh);
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = cfg.opacity * 0.6;
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const bh = Math.max(2, v * maxH);
        const x = gap + i * (barW + gap) + barW * 0.3;
        const y = growDir === 1 ? baseY : baseY - bh;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, y, barW * 0.4, bh);
      }
      break;
    }
    case "rgb-bars": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 20;
        ctx.shadowColor = "#fff";
      }
      const gap = Math.max(1, cfg.thickness * 0.25);
      const barW = (W - gap * (n + 1)) / n;
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      for (let s = 0; s <= 7; s++) grad.addColorStop(s / 7, `hsl(${s * 51.4},100%,55%)`);
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const bh = Math.max(2, v * maxH);
        const x = gap + i * (barW + gap);
        const y = growDir === 1 ? baseY : baseY - bh;
        ctx.globalAlpha = cfg.opacity;
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barW, bh);
      }
      break;
    }
    case "mirror-bars": {
      const maxH2 = H * Math.min(0.9, cfg.scale) / 2;
      const baseY2 = H / 2;
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 18;
        ctx.shadowColor = glowColor;
      }
      const gap = Math.max(1, cfg.thickness * 0.3);
      const barW = (W - gap * (n + 1)) / n;
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const bh = Math.max(2, v * maxH2);
        const x = gap + i * (barW + gap);
        ctx.fillStyle = rgbColor(cfg, i / n, v);
        ctx.globalAlpha = cfg.opacity;
        roundRect(ctx, x, baseY2 - bh, barW, bh, Math.min(barW / 2, 6));
        ctx.fill();
        roundRect(ctx, x, baseY2, barW, bh, Math.min(barW / 2, 6));
        ctx.fill();
      }
      break;
    }
    case "oscilloscope": {
      const cy = H / 2;
      const amp = H * cfg.scale * 0.5;
      ctx.lineWidth = cfg.thickness;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 22;
        ctx.shadowColor = glowColor;
      }
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const x = i / (n - 1) * W;
        const y = cy + (i % 2 === 0 ? 1 : -1) * vals[i] * amp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = cfg.color;
      ctx.stroke();
      break;
    }
    case "dna-twist": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 20;
        ctx.shadowColor = glowColor;
      }
      const gap = Math.max(1, cfg.thickness * 0.25);
      const barW = Math.max(2, (W - gap * (n + 1)) / n);
      for (const phase of [0, Math.PI]) {
        for (let i = 0; i < n; i++) {
          const v = vals[i];
          const twist = Math.abs(Math.sin(i / n * Math.PI * 3 + phase + nowSec * 1.5));
          const bh = Math.max(2, v * maxH * twist);
          const x = gap + i * (barW + gap);
          const y = growDir === 1 ? baseY : baseY - bh;
          const hue = cfg.rgb ? (i / n * 360 + phase * 57) % 360 : void 0;
          ctx.fillStyle = hue !== void 0 ? `hsl(${hue},90%,60%)` : cfg.color;
          ctx.globalAlpha = cfg.opacity * (phase === 0 ? 1 : 0.65);
          roundRect(ctx, x, y, barW, bh, Math.min(barW / 2, 5));
          ctx.fill();
        }
      }
      break;
    }
    case "spiral": {
      const cx = W / 2;
      const cy = H / 2;
      const minDim = Math.min(W, H);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 22;
        ctx.shadowColor = glowColor;
      }
      ctx.lineWidth = cfg.thickness;
      ctx.lineCap = "round";
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const t2 = i / n;
        const angle = t2 * Math.PI * 4 + nowSec * 0.4;
        const r = minDim * cfg.radius * (0.1 + t2 * 0.9);
        const len = r * 0.18 * v + 2;
        const x1 = cx + Math.cos(angle) * r;
        const y1 = cy + Math.sin(angle) * r;
        const x2 = cx + Math.cos(angle) * (r + len);
        const y2 = cy + Math.sin(angle) * (r + len);
        ctx.strokeStyle = rgbColor(cfg, t2, v);
        ctx.globalAlpha = cfg.opacity * (0.4 + t2 * 0.6);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      break;
    }
    case "neon-tubes": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      ctx.shadowBlur = cfg.glow * 35 + 12;
      ctx.shadowColor = glowColor;
      ctx.lineWidth = Math.max(2, cfg.thickness);
      ctx.lineCap = "round";
      const step = W / n;
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const bh = Math.max(cfg.thickness, v * maxH);
        const x = (i + 0.5) * step;
        const y1 = growDir === 1 ? baseY : baseY - bh;
        const y2 = growDir === 1 ? baseY + bh : baseY;
        ctx.strokeStyle = rgbColor(cfg, i / n, v);
        ctx.globalAlpha = cfg.opacity;
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();
      }
      break;
    }
    case "hexagon": {
      const cols = Math.ceil(Math.sqrt(n * (W / H)));
      const rows = Math.ceil(n / cols);
      const hexW = W / cols;
      const hexH = H / rows;
      const r = Math.min(hexW, hexH) * 0.42;
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 20;
        ctx.shadowColor = glowColor;
      }
      for (let i = 0; i < n; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = (col + (row % 2 === 0 ? 0.5 : 1)) * hexW;
        const cy2 = (row + 0.5) * hexH;
        const v = vals[i];
        const hr = r * (0.3 + v * 0.7);
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = k / 6 * Math.PI * 2 - Math.PI / 6;
          if (k === 0) ctx.moveTo(cx + Math.cos(a) * hr, cy2 + Math.sin(a) * hr);
          else ctx.lineTo(cx + Math.cos(a) * hr, cy2 + Math.sin(a) * hr);
        }
        ctx.closePath();
        ctx.fillStyle = rgbColor(cfg, i / n, v);
        ctx.globalAlpha = cfg.opacity * (0.2 + v * 0.8);
        ctx.fill();
      }
      break;
    }
    case "orb-pulse": {
      const cx = W / 2;
      const cy = H / 2;
      const bass = vals2avg(vals, 0, Math.ceil(n * 0.2));
      const minDim = Math.min(W, H);
      const baseR = minDim * cfg.radius;
      const pulseR = baseR * (1 + bass * 0.5);
      for (let r = 3; r >= 0; r--) {
        const gr = ctx.createRadialGradient(cx, cy, pulseR * 0.3, cx, cy, pulseR * (1 + r * 0.4));
        gr.addColorStop(0, cfg.rgb ? `hsl(${nowSec * 80 % 360},90%,65%)` : cfg.color);
        gr.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gr;
        ctx.globalAlpha = cfg.opacity * bass * (0.35 - r * 0.08);
        ctx.beginPath();
        ctx.arc(cx, cy, pulseR * (1 + r * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }
      const coreGr = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseR);
      coreGr.addColorStop(0, "#ffffff");
      coreGr.addColorStop(0.3, cfg.rgb ? `hsl(${nowSec * 80 % 360},95%,70%)` : cfg.color);
      coreGr.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreGr;
      ctx.globalAlpha = cfg.opacity;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "waterfall": {
      const colW = W / n;
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 12;
        ctx.shadowColor = glowColor;
      }
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        let r = 0, g = 0, b = 0;
        if (cfg.rgb) {
          r = Math.round(v * 255);
          g = Math.round(v * v * 220);
          b = Math.round((1 - v) * 180);
        } else {
          const hex = cfg.color.replace("#", "");
          r = Math.round(parseInt(hex.slice(0, 2), 16) * v);
          g = Math.round(parseInt(hex.slice(2, 4), 16) * v);
          b = Math.round(parseInt(hex.slice(4, 6), 16) * v);
        }
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.globalAlpha = cfg.opacity;
        ctx.fillRect(i * colW, 0, colW, H);
      }
      break;
    }
    default:
    case "modern-bars": {
      const { baseY, maxH, growDir } = bandY(cfg, H);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 18;
        ctx.shadowColor = glowColor;
      }
      const gap = Math.max(1, cfg.thickness * 0.3);
      const barW = (W - gap * (n + 1)) / n;
      for (let i = 0; i < n; i++) {
        const v = vals[i];
        const bh = Math.max(2, v * maxH);
        const x = gap + i * (barW + gap);
        const y = growDir === 1 ? baseY : baseY - bh;
        ctx.fillStyle = rgbColor(cfg, i / n, v);
        ctx.globalAlpha = cfg.opacity;
        roundRect(ctx, x, y, barW, bh, Math.min(barW / 2, 6));
        ctx.fill();
      }
    }
  }
  ctx.restore();
}
function vals2avg(vals, a, b) {
  let s = 0;
  const end = Math.min(b, vals.length);
  for (let i = a; i < end; i++) s += vals[i];
  return s / Math.max(1, end - a);
}
function bandLen(o, v) {
  return o.minDim * 0.08 * v + o.thickness;
}
function bassEnergy(frame) {
  if (!frame.length) return 0;
  const k = Math.max(1, Math.round(frame.length * 0.25));
  let s = 0;
  for (let i = 0; i < k; i++) s += frame[i] || 0;
  return Math.min(1, s / k);
}
function smoothRadii(o, passes = 1) {
  const n = o.bars;
  const raw = new Array(n);
  const amp = o.minDim * 0.18;
  for (let i = 0; i < n; i++) {
    const v = Math.min(1, (o.frame[i % o.frame.length] || 0) * o.intensity);
    const len = amp * Math.pow(v, 0.7) + o.thickness;
    raw[i] = o.mode === "inside" ? Math.max(0, o.ringBase - len) : o.mode === "around" ? o.ringBase + (len - o.thickness) / 2 : o.ringBase + len;
  }
  let cur = raw;
  for (let p = 0; p < passes; p++) {
    const next = new Array(n);
    for (let i = 0; i < n; i++) {
      const a = cur[(i - 1 + n) % n];
      const b = cur[i];
      const c = cur[(i + 1) % n];
      next[i] = a * 0.25 + b * 0.5 + c * 0.25;
    }
    cur = next;
  }
  return cur;
}
const WAVE_FAMILY = /* @__PURE__ */ new Set([
  "wave",
  "line",
  "spike",
  "double",
  "teeth",
  "ribbon",
  "waveDots",
  "blobSoft",
  "waveFillRainbow",
  "petals",
  "spikeMirror"
]);
function innerOuter(o, len) {
  if (o.mode === "inside") return { outer: o.ringBase, inner: Math.max(0, o.ringBase - len) };
  if (o.mode === "around") return { inner: Math.max(0, o.ringBase - len / 2), outer: o.ringBase + len / 2 };
  return { inner: o.ringBase, outer: o.ringBase + len };
}
function drawRingBands(ctx, o) {
  const n = o.bars;
  if (n <= 0) return;
  const step = Math.PI * 2 / n;
  const glowScale = o.glowScale ?? 30;
  ctx.save();
  if (o.glow > 0.02) {
    ctx.shadowBlur = o.glow * glowScale;
    ctx.shadowColor = o.rgb ? "#ffffff" : o.color;
  }
  ctx.lineWidth = o.thickness;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const valAt = (i) => Math.min(1, (o.frame[i % o.frame.length] || 0) * o.intensity);
  const ang = (i) => i * step - Math.PI / 2;
  if (WAVE_FAMILY.has(o.style)) {
    const passes = o.style === "spike" || o.style === "spikeMirror" ? 0 : o.style === "blobSoft" ? 3 : 1;
    const r = smoothRadii(o, passes);
    const px = new Array(n);
    const py = new Array(n);
    for (let i = 0; i < n; i++) {
      const a = ang(i);
      px[i] = o.cx + Math.cos(a) * r[i];
      py[i] = o.cy + Math.sin(a) * r[i];
    }
    const sharp = o.style === "spike" || o.style === "spikeMirror";
    const buildPathAt = (rad) => {
      const qx = (i) => o.cx + Math.cos(ang(i)) * rad[i];
      const qy = (i) => o.cy + Math.sin(ang(i)) * rad[i];
      ctx.beginPath();
      if (sharp) {
        ctx.moveTo(qx(0), qy(0));
        for (let i = 1; i < n; i++) ctx.lineTo(qx(i), qy(i));
      } else {
        const m0x = (qx(n - 1) + qx(0)) / 2;
        const m0y = (qy(n - 1) + qy(0)) / 2;
        ctx.moveTo(m0x, m0y);
        for (let i = 0; i < n; i++) {
          const ex = (qx(i) + qx((i + 1) % n)) / 2;
          const ey = (qy(i) + qy((i + 1) % n)) / 2;
          ctx.quadraticCurveTo(qx(i), qy(i), ex, ey);
        }
      }
      ctx.closePath();
    };
    const buildPath = () => buildPathAt(r);
    const makeRainbow = () => {
      const grad = ctx.createConicGradient(o.t * Math.PI * 2 - Math.PI / 2, o.cx, o.cy);
      const STOPS = 12;
      for (let s = 0; s <= STOPS; s++) grad.addColorStop(s / STOPS, `hsl(${s / STOPS * 360}, 95%, 60%)`);
      return grad;
    };
    const canConic = o.rgb && typeof ctx.createConicGradient === "function";
    const strokePath = (rad) => {
      if (canConic) {
        buildPathAt(rad);
        ctx.strokeStyle = makeRainbow();
        ctx.stroke();
      } else if (o.rgb) {
        for (let i = 0; i < n; i++) {
          const a0 = ang(i);
          const a1 = ang((i + 1) % n);
          ctx.strokeStyle = o.colorAt(i, n, valAt(i));
          ctx.beginPath();
          ctx.moveTo(o.cx + Math.cos(a0) * rad[i], o.cy + Math.sin(a0) * rad[i]);
          ctx.lineTo(o.cx + Math.cos(a1) * rad[(i + 1) % n], o.cy + Math.sin(a1) * rad[(i + 1) % n]);
          ctx.stroke();
        }
      } else {
        buildPathAt(rad);
        ctx.strokeStyle = o.color;
        ctx.stroke();
      }
    };
    if (o.style === "wave" || o.style === "spike" || o.style === "teeth" || o.style === "blobSoft") {
      buildPath();
      ctx.fillStyle = o.color;
      ctx.fill();
    }
    if (o.style === "waveFillRainbow") {
      buildPath();
      if (o.rgb && typeof ctx.createRadialGradient === "function") {
        const maxR = Math.max(...r);
        const g = ctx.createRadialGradient(o.cx, o.cy, Math.max(1, o.ringBase * 0.3), o.cx, o.cy, Math.max(2, maxR));
        const base = o.t * 360 % 360;
        const STOPS = 6;
        for (let s = 0; s <= STOPS; s++) g.addColorStop(s / STOPS, `hsl(${(base + s / STOPS * 300) % 360}, 90%, 58%)`);
        ctx.fillStyle = g;
      } else {
        ctx.fillStyle = o.color;
      }
      ctx.fill();
    }
    if (o.style === "ribbon") {
      const baseR = Math.max(0, o.ringBase - o.minDim * 0.02);
      buildPath();
      ctx.arc(o.cx, o.cy, baseR, 0, Math.PI * 2);
      ctx.fillStyle = o.color;
      ctx.fill();
    }
    if (o.style === "petals") {
      const rainbow = canConic ? makeRainbow() : null;
      const half = step * 0.5;
      for (let i = 0; i < n; i++) {
        const a = ang(i);
        const baseR = o.ringBase;
        const tipX = o.cx + Math.cos(a) * r[i];
        const tipY = o.cy + Math.sin(a) * r[i];
        const lx = o.cx + Math.cos(a - half) * baseR;
        const ly = o.cy + Math.sin(a - half) * baseR;
        const rx = o.cx + Math.cos(a + half) * baseR;
        const ry = o.cy + Math.sin(a + half) * baseR;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.quadraticCurveTo(tipX, tipY, rx, ry);
        ctx.quadraticCurveTo(o.cx + Math.cos(a) * baseR, o.cy + Math.sin(a) * baseR, lx, ly);
        ctx.closePath();
        ctx.fillStyle = rainbow ?? (o.rgb ? o.colorAt(i, n, valAt(i)) : o.color);
        ctx.fill();
      }
      ctx.restore();
      return;
    }
    if (o.style === "waveDots") {
      const rainbow = canConic ? makeRainbow() : null;
      for (let i = 0; i < n; i++) {
        const dotR = o.thickness * 0.6 + o.minDim * 0.012 * valAt(i);
        ctx.fillStyle = rainbow ?? (o.rgb ? o.colorAt(i, n, valAt(i)) : o.color);
        ctx.beginPath();
        ctx.arc(px[i], py[i], Math.max(1, dotR), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      return;
    }
    strokePath(r);
    if (o.style === "double") {
      const r2 = r.map((v) => Math.max(0, v - o.minDim * 0.04 - o.thickness));
      strokePath(r2);
    }
    if (o.style === "spikeMirror") {
      const rIn = r.map((v) => Math.max(0, 2 * o.ringBase - v));
      strokePath(rIn);
    }
    if (o.style === "teeth") {
      const rainbow = canConic ? makeRainbow() : null;
      for (let i = 0; i < n; i++) {
        const a = ang(i);
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        const tick = o.thickness * 1.6 + o.minDim * 0.012 * valAt(i);
        ctx.strokeStyle = rainbow ?? (o.rgb ? o.colorAt(i, n, valAt(i)) : o.color);
        ctx.beginPath();
        ctx.moveTo(o.cx + cos * r[i], o.cy + sin * r[i]);
        ctx.lineTo(o.cx + cos * (r[i] + tick), o.cy + sin * (r[i] + tick));
        ctx.stroke();
      }
    }
    ctx.restore();
    return;
  }
  for (let i = 0; i < n; i++) {
    const v = valAt(i);
    const len = bandLen(o, v);
    const a = ang(i);
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const col = o.colorAt(i, n, v);
    if (o.style === "dots") {
      const dotR = o.thickness * 0.5 + o.minDim * 0.05 * v;
      const r = o.ringBase;
      ctx.beginPath();
      ctx.arc(o.cx + cos * r, o.cy + sin * r, Math.max(1, dotR), 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
      continue;
    }
    if (o.style === "mirror") {
      const inner2 = Math.max(0, o.ringBase - len / 2);
      const outer2 = o.ringBase + len / 2;
      ctx.strokeStyle = col;
      ctx.beginPath();
      ctx.moveTo(o.cx + cos * inner2, o.cy + sin * inner2);
      ctx.lineTo(o.cx + cos * outer2, o.cy + sin * outer2);
      ctx.stroke();
      continue;
    }
    if (o.style === "led" || o.style === "blocks2") {
      const { inner: inner2, outer: outer2 } = innerOuter(o, len);
      const dir = outer2 >= inner2 ? 1 : -1;
      const total = Math.abs(outer2 - inner2);
      const block = Math.max(2, o.minDim * (o.style === "blocks2" ? 0.03 : 0.016));
      const gap = block * (o.style === "blocks2" ? 0.8 : 0.6);
      ctx.lineCap = "butt";
      ctx.strokeStyle = col;
      let d = 0;
      while (d < total) {
        const r0 = inner2 + dir * d;
        const r1 = inner2 + dir * Math.min(d + block, total);
        ctx.beginPath();
        ctx.moveTo(o.cx + cos * r0, o.cy + sin * r0);
        ctx.lineTo(o.cx + cos * r1, o.cy + sin * r1);
        ctx.stroke();
        d += block + gap;
      }
      ctx.lineCap = "round";
      continue;
    }
    if (o.style === "barsTaper") {
      const { inner: inner2, outer: outer2 } = innerOuter(o, len);
      const hw = o.thickness;
      const px0 = o.cx + cos * inner2;
      const py0 = o.cy + sin * inner2;
      const tx = o.cx + cos * outer2;
      const ty = o.cy + sin * outer2;
      ctx.beginPath();
      ctx.moveTo(px0 - sin * hw, py0 + cos * hw);
      ctx.lineTo(tx, ty);
      ctx.lineTo(px0 + sin * hw, py0 - cos * hw);
      ctx.closePath();
      ctx.fillStyle = col;
      ctx.fill();
      continue;
    }
    if (o.style === "barsCap" || o.style === "pins") {
      const { inner: inner2, outer: outer2 } = innerOuter(o, len);
      const thin = o.style === "pins";
      ctx.lineWidth = thin ? Math.max(1, o.thickness * 0.35) : o.thickness;
      ctx.strokeStyle = col;
      ctx.beginPath();
      ctx.moveTo(o.cx + cos * inner2, o.cy + sin * inner2);
      ctx.lineTo(o.cx + cos * outer2, o.cy + sin * outer2);
      ctx.stroke();
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(o.cx + cos * outer2, o.cy + sin * outer2, Math.max(1, o.thickness * (thin ? 1.1 : 0.8)), 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = o.thickness;
      continue;
    }
    if (o.style === "wedge") {
      const { inner: inner2, outer: outer2 } = innerOuter(o, len);
      const half = step * 0.46;
      ctx.beginPath();
      ctx.moveTo(o.cx + Math.cos(a - half) * inner2, o.cy + Math.sin(a - half) * inner2);
      ctx.lineTo(o.cx + Math.cos(a - half) * outer2, o.cy + Math.sin(a - half) * outer2);
      ctx.lineTo(o.cx + Math.cos(a + half) * outer2, o.cy + Math.sin(a + half) * outer2);
      ctx.lineTo(o.cx + Math.cos(a + half) * inner2, o.cy + Math.sin(a + half) * inner2);
      ctx.closePath();
      ctx.fillStyle = col;
      ctx.fill();
      continue;
    }
    const { inner, outer } = innerOuter(o, len);
    ctx.strokeStyle = col;
    ctx.beginPath();
    ctx.moveTo(o.cx + cos * inner, o.cy + sin * inner);
    ctx.lineTo(o.cx + cos * outer, o.cy + sin * outer);
    ctx.stroke();
  }
  ctx.restore();
}
const SHAPE_STYLE = {
  hearts: 4,
  leaves: 5,
  stars: 6,
  diamonds: 7,
  rings: 8
};
function createParticleField() {
  return { parts: [], prevEnergy: 0 };
}
const BASS_GATE = 0.18;
const RISE_GATE = 0.04;
const MAX_PARTICLES = 700;
function rand(a, b) {
  return a + Math.random() * (b - a);
}
function stepParticles(ctx, field, o) {
  const dt = Math.max(1e-4, Math.min(3, o.dt));
  const style = o.style ?? "burst";
  const md = o.minDim;
  const spawnR = o.spawnRadius ?? 0;
  const spd = Math.max(0.1, o.speed ?? 1);
  const rise = o.energy - field.prevEnergy;
  field.prevEnergy = o.energy;
  const loud = o.energy > BASS_GATE;
  const beat = loud && (o.forceBurst === true || rise > RISE_GATE * dt);
  const over = loud ? Math.min(1, (o.energy - BASS_GATE) / (1 - BASS_GATE)) : 0;
  const hue0 = o.t * 120 % 360;
  const room = field.parts.length < MAX_PARTICLES;
  const push = (p) => {
    if (field.parts.length < MAX_PARTICLES) field.parts.push(p);
  };
  if (room) {
    if (style === "burst" && beat) {
      const count = Math.round(rand(20, 38) + over * 24);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = md * 0.03 * spd * rand(0.55, 1.45);
        push({ x: o.cx + Math.cos(a) * spawnR, y: o.cy + Math.sin(a) * spawnR, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: 0, life: 1, maxLife: 1, size: md * rand(6e-3, 0.016), hue: (hue0 + i * 9) % 360, twinkle: false, shape: 0, spin: a });
      }
    } else if (style === "fireworks" && beat) {
      const count = Math.round(rand(30, 56) + over * 30);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = md * 0.05 * spd * rand(0.5, 1.5);
        push({ x: o.cx + Math.cos(a) * spawnR, y: o.cy + Math.sin(a) * spawnR, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: md * 9e-4, life: 1, maxLife: 1, size: md * rand(5e-3, 0.012), hue: (hue0 + i * 7) % 360, twinkle: false, shape: 0, spin: a });
      }
    } else if (style === "fountain" && beat) {
      const count = Math.round(rand(16, 32) + over * 24);
      for (let i = 0; i < count; i++) {
        const a = -Math.PI / 2 + rand(-0.6, 0.6);
        const sp = md * 0.05 * spd * rand(0.7, 1.4);
        push({ x: o.cx + rand(-spawnR * 0.4, spawnR * 0.4), y: o.cy + spawnR * 0.4, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: md * 11e-4, life: 1, maxLife: 1, size: md * rand(5e-3, 0.012), hue: (hue0 + i * 8) % 360, twinkle: false, shape: 0, spin: a });
      }
    } else if (style === "embers" && loud) {
      const rate = Math.round(over * 6 * dt);
      for (let i = 0; i < rate; i++) {
        const a = Math.random() * Math.PI * 2;
        push({ x: o.cx + Math.cos(a) * spawnR * rand(0.8, 1.1), y: o.cy + Math.sin(a) * spawnR * rand(0.8, 1.1), vx: rand(-0.4, 0.4) * md * 3e-3 * spd, vy: -md * 6e-3 * spd * rand(0.6, 1.3), gy: -md * 15e-5, life: 1, maxLife: 1, size: md * rand(4e-3, 9e-3), hue: (hue0 + i * 11) % 360, twinkle: false, shape: 0, spin: 0 });
      }
    } else if (style === "sparkle" && loud) {
      const rate = Math.round(over * 4 * dt + (beat ? 6 : 0));
      for (let i = 0; i < rate; i++) {
        const a = Math.random() * Math.PI * 2;
        const rr = spawnR * rand(1, 1.6);
        push({ x: o.cx + Math.cos(a) * rr, y: o.cy + Math.sin(a) * rr, vx: 0, vy: 0, gy: 0, life: 1, maxLife: 1, size: md * rand(4e-3, 9e-3), hue: (hue0 + i * 13) % 360, twinkle: true, shape: 0, spin: 0 });
      }
    } else if ((style === "triangles" || style === "chevrons") && beat) {
      const shape = style === "triangles" ? 1 : 2;
      const count = Math.round(rand(8, 16) + over * 12);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = md * 0.025 * spd * rand(0.6, 1.3);
        push({ x: o.cx + Math.cos(a) * spawnR, y: o.cy + Math.sin(a) * spawnR, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: 0, life: 1, maxLife: 1, size: md * rand(0.016, 0.028), hue: (hue0 + i * 12) % 360, twinkle: false, shape, spin: a });
      }
    } else if (style === "comet" && beat) {
      const count = Math.round(rand(6, 12) + over * 10);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = md * 0.035 * spd * rand(0.7, 1.4);
        push({ x: o.cx + Math.cos(a) * spawnR, y: o.cy + Math.sin(a) * spawnR, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: 0, life: 1, maxLife: 1, size: md * rand(0.01, 0.018), hue: (hue0 + i * 14) % 360, twinkle: false, shape: 3, spin: a });
      }
    } else if (SHAPE_STYLE[style] !== void 0 && beat) {
      const shape = SHAPE_STYLE[style];
      const count = Math.round(rand(6, 12) + over * 10);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = md * 0.025 * spd * rand(0.6, 1.3);
        push({ x: o.cx + Math.cos(a) * spawnR, y: o.cy + Math.sin(a) * spawnR, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: 0, life: 1, maxLife: 1, size: md * rand(0.018, 0.03), hue: (hue0 + i * 12) % 360, twinkle: false, shape, spin: a });
      }
    }
  }
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.lineJoin = "round";
  const drag = Math.pow(0.95, dt);
  const next = [];
  for (const p of field.parts) {
    p.vy += p.gy * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= drag;
    if (p.gy === 0) p.vy *= drag;
    if (p.shape !== 0) p.spin = Math.atan2(p.vy, p.vx);
    const decay = (p.twinkle ? 0.05 : p.shape >= 3 ? 9e-3 : p.shape !== 0 ? 0.015 : 0.02) * dt;
    p.life -= decay;
    if (p.life <= 0) continue;
    next.push(p);
    let alpha = Math.max(0, p.life / p.maxLife);
    if (p.twinkle) alpha *= 0.4 + 0.6 * Math.abs(Math.sin((o.t + p.hue) * 6));
    const col = o.rgb ? `hsl(${p.hue}, 95%, 62%)` : o.color;
    const gr = p.size * 2.2;
    ctx.globalAlpha = alpha * 0.32;
    ctx.fillStyle = o.rgb ? `hsl(${p.hue}, 95%, 70%)` : o.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(1, gr), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = alpha;
    if (p.shape === 0) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size * (0.6 + alpha * 0.4)), 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === 1) {
      drawTriangle(ctx, p, col);
    } else if (p.shape === 2) {
      drawChevron(ctx, p, col);
    } else if (p.shape === 3) {
      drawComet(ctx, p, col);
    } else if (p.shape === 4) {
      drawHeart(ctx, p, col);
    } else if (p.shape === 5) {
      drawLeaf(ctx, p, col);
    } else if (p.shape === 6) {
      drawStar(ctx, p, col);
    } else if (p.shape === 7) {
      drawDiamond(ctx, p, col);
    } else {
      drawRingShape(ctx, p, col);
    }
  }
  field.parts = next;
  ctx.shadowBlur = 0;
  ctx.restore();
}
function drawTail(ctx, p, col, alpha, lenMul, wMul = 0.5) {
  const c = Math.cos(p.spin);
  const sn = Math.sin(p.spin);
  const L = p.size * lenMul;
  const w = p.size * wMul;
  const hlx = p.x - sn * w;
  const hly = p.y + c * w;
  const hrx = p.x + sn * w;
  const hry = p.y - c * w;
  const tx = p.x - c * L;
  const ty = p.y - sn * L;
  if (typeof ctx.createLinearGradient === "function") {
    const g = ctx.createLinearGradient(p.x, p.y, tx, ty);
    g.addColorStop(0, col);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
  } else {
    ctx.globalAlpha = alpha * 0.5;
    ctx.fillStyle = col;
  }
  ctx.beginPath();
  ctx.moveTo(hlx, hly);
  ctx.lineTo(hrx, hry);
  ctx.lineTo(tx, ty);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = alpha;
}
function drawTriangle(ctx, p, col) {
  drawTail(ctx, p, col, ctx.globalAlpha, 10);
  const s = p.size;
  const c = Math.cos(p.spin);
  const sn = Math.sin(p.spin);
  const pt = (lx, ly) => [p.x + lx * c - ly * sn, p.y + lx * sn + ly * c];
  const [ax, ay] = pt(s, 0);
  const [bx, by] = pt(-s * 0.7, s * 0.7);
  const [dx, dy] = pt(-s * 0.7, -s * 0.7);
  ctx.strokeStyle = col;
  ctx.lineWidth = Math.max(1, s * 0.18);
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.lineTo(dx, dy);
  ctx.closePath();
  ctx.stroke();
}
function drawChevron(ctx, p, col) {
  drawTail(ctx, p, col, ctx.globalAlpha, 10);
  const s = p.size;
  const c = Math.cos(p.spin);
  const sn = Math.sin(p.spin);
  const pt = (lx, ly) => [p.x + lx * c - ly * sn, p.y + lx * sn + ly * c];
  ctx.strokeStyle = col;
  ctx.lineWidth = Math.max(1, s * 0.16);
  for (let k = 0; k < 2; k++) {
    const off = -s * 0.5 + k * s * 0.7;
    const [a1x, a1y] = pt(off, -s * 0.7);
    const [a2x, a2y] = pt(off + s * 0.7, 0);
    const [a3x, a3y] = pt(off, s * 0.7);
    ctx.beginPath();
    ctx.moveTo(a1x, a1y);
    ctx.lineTo(a2x, a2y);
    ctx.lineTo(a3x, a3y);
    ctx.stroke();
  }
}
function drawComet(ctx, p, col) {
  drawTail(ctx, p, col, ctx.globalAlpha, 18, 0.9);
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);
  ctx.fill();
}
function drawHeart(ctx, p, col) {
  drawTail(ctx, p, col, ctx.globalAlpha, 10);
  const k = p.size / 16;
  ctx.fillStyle = col;
  ctx.beginPath();
  const N = 22;
  for (let i = 0; i <= N; i++) {
    const t = i / N * Math.PI * 2;
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    const x = p.x + hx * k;
    const y = p.y + hy * k;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}
function drawLeaf(ctx, p, col) {
  drawTail(ctx, p, col, ctx.globalAlpha, 10);
  const s = p.size;
  const c = Math.cos(p.spin);
  const sn = Math.sin(p.spin);
  const pt = (lx, ly) => [p.x + lx * c - ly * sn, p.y + lx * sn + ly * c];
  const [tipX, tipY] = pt(s * 1.3, 0);
  const [baseX, baseY] = pt(-s * 1.3, 0);
  const [c1x, c1y] = pt(0, s * 0.8);
  const [c2x, c2y] = pt(0, -s * 0.8);
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(tipX, tipY);
  ctx.quadraticCurveTo(c1x, c1y, baseX, baseY);
  ctx.quadraticCurveTo(c2x, c2y, tipX, tipY);
  ctx.closePath();
  ctx.fill();
}
function drawStar(ctx, p, col) {
  drawTail(ctx, p, col, ctx.globalAlpha, 10);
  const s = p.size;
  ctx.strokeStyle = col;
  ctx.lineWidth = Math.max(1, s * 0.16);
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? s : s * 0.42;
    const a = -Math.PI / 2 + i / 10 * Math.PI * 2;
    const x = p.x + Math.cos(a) * rr;
    const y = p.y + Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}
function drawDiamond(ctx, p, col) {
  drawTail(ctx, p, col, ctx.globalAlpha, 10);
  const s = p.size;
  ctx.strokeStyle = col;
  ctx.lineWidth = Math.max(1, s * 0.18);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y - s);
  ctx.lineTo(p.x + s * 0.7, p.y);
  ctx.lineTo(p.x, p.y + s);
  ctx.lineTo(p.x - s * 0.7, p.y);
  ctx.closePath();
  ctx.stroke();
}
function drawRingShape(ctx, p, col) {
  drawTail(ctx, p, col, ctx.globalAlpha, 10);
  ctx.strokeStyle = col;
  ctx.lineWidth = Math.max(1, p.size * 0.28);
  ctx.beginPath();
  ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);
  ctx.stroke();
}
function rng(seed) {
  let s = Math.sin(seed * 9301 + 49297) * 233280;
  return s - Math.floor(s);
}
function rng2(a, b) {
  return rng(a * 1e3 + b);
}
function loopT(t, cycle) {
  return (t % cycle + cycle) % cycle;
}
function particleColor(layer, idx, lt) {
  if (layer.rgb) {
    const hue = (rng2(idx, 0) * 360 + lt * 60) % 360;
    return `hsla(${hue.toFixed(0)},95%,65%,${layer.opacity})`;
  }
  const hex = layer.color || "#ffffff";
  return hexAlpha(hex, layer.opacity);
}
function hexAlpha(hex, alpha) {
  const h = (hex || "#ffffff").replace("#", "").padEnd(6, "f");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
}
function drawSnow(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const baseX = rng2(i, 1) * W;
    const baseY = rng2(i, 2) * H;
    const sz = (rng2(i, 3) * 3 + 1) * layer.size;
    const spd = (rng2(i, 4) * 0.6 + 0.4) * layer.speed;
    const wobbleAmp = rng2(i, 5) * 18 * Math.abs(layer.wind);
    const wobbleFreq = rng2(i, 6) * 1.5 + 0.5;
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const windSign = layer.wind >= 0 ? 1 : -1;
    const vy = layer.directionY >= 0 ? 1 : -1;
    const vx = layer.directionX;
    const x = (baseX + vx * fallT * H * 0.3 + wobbleAmp * Math.sin(fallT * Math.PI * 2 * wobbleFreq * windSign)) % W;
    const y = (baseY + vy * fallT * H * spd) % H;
    ctx.beginPath();
    ctx.arc(x < 0 ? x + W : x, y < 0 ? y + H : y, sz, 0, Math.PI * 2);
    ctx.fillStyle = particleColor(layer, i, lt);
    ctx.fill();
  }
}
function drawSakura(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.5 + 0.5) * layer.speed;
    const wobble = Math.sin(fallT * Math.PI * 4 + rng2(i, 8) * Math.PI * 2) * 30 * Math.abs(layer.wind + 1);
    const vy = layer.directionY >= 0 ? 1 : -1;
    const vx = layer.directionX;
    const x = (rng2(i, 1) * W + vx * fallT * H * 0.25 + wobble) % W;
    const y = (rng2(i, 2) * H + vy * fallT * H * spd) % H;
    const rot = rng2(i, 9) * Math.PI * 2 + lt * (rng2(i, 10) - 0.5) * 3;
    const sz = (rng2(i, 3) * 5 + 3) * layer.size;
    ctx.save();
    ctx.translate(x < 0 ? x + W : x, y < 0 ? y + H : y);
    ctx.rotate(rot);
    ctx.globalAlpha = layer.opacity;
    const col = layer.rgb ? `hsl(${(rng2(i, 0) * 30 + 330).toFixed(0)},90%,75%)` : layer.color || "#ffb7c5";
    ctx.fillStyle = col;
    ctx.beginPath();
    for (let p = 0; p < 5; p++) {
      const a = p / 5 * Math.PI * 2;
      const bx = Math.cos(a) * sz;
      const by = Math.sin(a) * sz;
      p === 0 ? ctx.moveTo(bx, by) : ctx.quadraticCurveTo(0, 0, bx, by);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
function drawLeaves(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  const leafColors = ["#8B4513", "#228B22", "#DC143C", "#DAA520", "#FF8C00"];
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.6 + 0.4) * layer.speed;
    const wobble = Math.sin(fallT * Math.PI * 3 + rng2(i, 8) * Math.PI * 2) * 40 * (Math.abs(layer.wind) + 0.5);
    const vy = layer.directionY >= 0 ? 1 : -1;
    const vx = layer.directionX;
    const x = (rng2(i, 1) * W + vx * fallT * H * 0.3 + wobble) % W;
    const y = (rng2(i, 2) * H + vy * fallT * H * spd) % H;
    const rot = rng2(i, 9) * Math.PI * 2 + lt * (rng2(i, 10) - 0.5) * 2;
    const sz = (rng2(i, 3) * 8 + 4) * layer.size;
    ctx.save();
    ctx.translate(x < 0 ? x + W : x, y < 0 ? y + H : y);
    ctx.rotate(rot);
    ctx.globalAlpha = layer.opacity;
    const col = layer.rgb ? `hsl(${(lt * 40 + i * 37) % 360},80%,50%)` : leafColors[i % leafColors.length];
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.ellipse(0, 0, sz * 0.5, sz, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
function drawRain(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.5 + 0.8) * layer.speed;
    const vy = layer.directionY >= 0 ? 1 : -1;
    const vx = layer.directionX * 0.3;
    const x = (rng2(i, 1) * W + vx * fallT * H) % W;
    const y = (vy * fallT * H * spd + rng2(i, 2) * H) % H;
    const len = (rng2(i, 3) * 14 + 8) * layer.size;
    const angle = Math.atan2(vy * spd, vx || 0.01);
    ctx.save();
    ctx.translate(x < 0 ? x + W : x, y < 0 ? y + H : y);
    ctx.rotate(angle);
    ctx.strokeStyle = particleColor(layer, i, lt);
    ctx.lineWidth = (rng2(i, 5) * 1.2 + 0.4) * layer.size;
    ctx.globalAlpha = layer.opacity * 0.7;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, len);
    ctx.stroke();
    ctx.restore();
  }
}
function drawDrizzle(ctx, layer, lt, W, H) {
  const savedCount = layer.count;
  const savedOpacity = layer.opacity;
  layer.count = layer.count * 1.5;
  layer.opacity = layer.opacity * 0.5;
  drawRain(ctx, layer, lt, W, H);
  layer.count = savedCount;
  layer.opacity = savedOpacity;
}
function drawFog(ctx, layer, lt, W, H) {
  const n = Math.min(Math.round(layer.count * 0.3), 40);
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * layer.cycleDuration;
    const lt2 = (lt + phase) % layer.cycleDuration / layer.cycleDuration;
    const x = (rng2(i, 1) * W * 1.4 - W * 0.2 + lt2 * W * 0.4 * layer.directionX) % W;
    const y = rng2(i, 2) * H + lt2 * H * 0.05 * layer.directionY;
    const rx = (rng2(i, 3) * W * 0.4 + W * 0.15) * layer.size;
    const ry = (rng2(i, 4) * H * 0.15 + H * 0.08) * layer.size;
    const alpha = (rng2(i, 5) * 0.12 + 0.04) * layer.opacity;
    const col = layer.color || "#ccddff";
    const grad = ctx.createRadialGradient(x, y, 0, x, y, rx);
    grad.addColorStop(0, hexAlpha(col, alpha));
    grad.addColorStop(1, hexAlpha(col, 0));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}
function drawFirefly(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count * 0.4);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const bx = rng2(i, 1) * W;
    const by = rng2(i, 2) * H;
    const freqX = rng2(i, 3) * 0.4 + 0.1;
    const freqY = rng2(i, 4) * 0.4 + 0.1;
    const ampX = rng2(i, 5) * 80 + 20;
    const ampY = rng2(i, 6) * 60 + 20;
    const phase = rng2(i, 7) * cycle;
    const lt2 = lt + phase;
    const x = bx + Math.sin(lt2 * freqX * Math.PI * 2 + layer.directionX) * ampX;
    const y = by + Math.sin(lt2 * freqY * Math.PI * 2 + layer.directionY) * ampY;
    const glow = (Math.sin(lt2 * (rng2(i, 8) * 2 + 1) * Math.PI * 2) + 1) / 2;
    const sz = (rng2(i, 9) * 3 + 1.5) * layer.size;
    const col = layer.rgb ? `hsl(${(i * 60 + lt * 30) % 360},100%,75%)` : layer.color || "#aaff44";
    const grad = ctx.createRadialGradient(x, y, 0, x, y, sz * 3);
    grad.addColorStop(0, hexAlpha(col, layer.opacity * glow));
    grad.addColorStop(1, hexAlpha(col, 0));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, sz * 3, 0, Math.PI * 2);
    ctx.fill();
  }
}
function drawBubbles(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const riseT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.5 + 0.3) * layer.speed;
    const wobble = Math.sin(riseT * Math.PI * 3 + rng2(i, 8) * Math.PI * 2) * 20;
    const vy = layer.directionY <= 0 ? -1 : 1;
    const x = (rng2(i, 1) * W + wobble * layer.wind) % W;
    const y = (rng2(i, 2) * H + vy * riseT * H * spd) % H;
    const sz = (rng2(i, 3) * 14 + 4) * layer.size;
    const alpha = (1 - riseT * 0.4) * layer.opacity * 0.7;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = particleColor(layer, i, lt);
    ctx.lineWidth = 1.2 * layer.size;
    ctx.beginPath();
    ctx.arc(x < 0 ? x + W : x, y < 0 ? y + H : y, sz, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = `rgba(255,255,255,0.15)`;
    ctx.beginPath();
    ctx.arc((x < 0 ? x + W : x) - sz * 0.25, (y < 0 ? y + H : y) - sz * 0.25, sz * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
function drawSmoke(ctx, layer, lt, W, H) {
  const n = Math.min(Math.round(layer.count * 0.25), 50);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const riseT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.4 + 0.2) * layer.speed;
    const vy = layer.directionY <= 0 ? -1 : 1;
    const vx = layer.directionX;
    const baseX = rng2(i, 1) * W;
    const drift = Math.sin(riseT * Math.PI * 2 + rng2(i, 8) * Math.PI * 2) * 40 * layer.wind;
    const x = baseX + vx * riseT * H * 0.2 + drift;
    const y = (rng2(i, 2) * H * 0.5 + H * 0.5 + vy * riseT * H * spd) % H;
    const sz = (rng2(i, 3) * 60 + 20) * riseT * layer.size;
    const alpha = (1 - riseT) * layer.opacity * 0.25;
    const col = layer.color || "#888888";
    const grad = ctx.createRadialGradient(x, y, 0, x, y, sz);
    grad.addColorStop(0, hexAlpha(col, alpha));
    grad.addColorStop(1, hexAlpha(col, 0));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y < 0 ? y + H : y, sz, 0, Math.PI * 2);
    ctx.fill();
  }
}
function drawDust(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const driftT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.3 + 0.1) * layer.speed;
    const x = (rng2(i, 1) * W + layer.directionX * driftT * W * spd * 2 + Math.sin(driftT * Math.PI * 4 + rng2(i, 8)) * 15 * layer.wind) % W;
    const y = (rng2(i, 2) * H + layer.directionY * driftT * H * spd) % H;
    const sz = (rng2(i, 3) * 1.5 + 0.3) * layer.size;
    ctx.beginPath();
    ctx.arc(x < 0 ? x + W : x, y < 0 ? y + H : y, sz, 0, Math.PI * 2);
    ctx.fillStyle = particleColor(layer, i, lt);
    ctx.globalAlpha = layer.opacity * (rng2(i, 9) * 0.5 + 0.3);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
function drawConfetti(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  const COLORS = ["#ff4444", "#ff8800", "#ffee00", "#44ff44", "#44aaff", "#cc44ff", "#ff44cc", "#ffffff"];
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.6 + 0.4) * layer.speed;
    const vy = layer.directionY >= 0 ? 1 : -1;
    const vx = layer.directionX;
    const wobble = Math.sin(fallT * Math.PI * 4 + rng2(i, 8) * Math.PI * 2) * 30 * layer.wind;
    const x = (rng2(i, 1) * W + vx * fallT * H * 0.3 + wobble) % W;
    const y = (rng2(i, 2) * H + vy * fallT * H * spd) % H;
    const rot = rng2(i, 9) * Math.PI * 2 + lt * (rng2(i, 10) * 4 - 2) + layer.rotation * Math.PI / 180;
    const w = (rng2(i, 11) * 8 + 4) * layer.size;
    const h = w * (rng2(i, 12) * 0.6 + 0.3);
    const col = layer.rgb ? `hsl(${(i * 47 + lt * 60) % 360},90%,60%)` : COLORS[i % COLORS.length];
    ctx.save();
    ctx.translate(x < 0 ? x + W : x, y < 0 ? y + H : y);
    ctx.rotate(rot);
    ctx.globalAlpha = layer.opacity;
    ctx.fillStyle = col;
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.restore();
  }
}
function drawGlitter(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  for (let i = 0; i < n; i++) {
    const x = rng2(i, 1) * W;
    const y = rng2(i, 2) * H;
    const twinkle = (Math.sin(lt * (rng2(i, 3) * 5 + 2) * Math.PI * 2 + rng2(i, 7) * Math.PI * 2) + 1) / 2;
    const sz = (rng2(i, 4) * 3 + 1) * layer.size * twinkle;
    const col = layer.rgb ? `hsl(${(i * 73 + lt * 80) % 360},100%,80%)` : layer.color || "#ffffaa";
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(lt * (rng2(i, 5) - 0.5) * 2 + layer.rotation * Math.PI / 180);
    ctx.globalAlpha = layer.opacity * twinkle;
    ctx.fillStyle = col;
    ctx.beginPath();
    for (let p = 0; p < 8; p++) {
      const a = p / 8 * Math.PI * 2;
      const r = p % 2 === 0 ? sz : sz * 0.35;
      p === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
function drawBokeh(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count * 0.3);
  for (let i = 0; i < n; i++) {
    const x = rng2(i, 1) * W + layer.directionX * lt * 15 * layer.speed;
    const y = rng2(i, 2) * H + layer.directionY * lt * 10 * layer.speed;
    const pulse = (Math.sin(lt * (rng2(i, 3) * 0.5 + 0.2) * Math.PI * 2 + rng2(i, 7) * Math.PI * 2) + 1) / 2;
    const sz = (rng2(i, 4) * 60 + 20) * layer.size * (0.7 + pulse * 0.3);
    const alpha = (rng2(i, 5) * 0.15 + 0.04) * layer.opacity;
    const col = layer.rgb ? `hsl(${(i * 53 + lt * 20) % 360},80%,75%)` : layer.color || "#88aaff";
    const grad = ctx.createRadialGradient(x % W, y % H, 0, x % W, y % H, sz);
    grad.addColorStop(0, hexAlpha(col, alpha * 0.8));
    grad.addColorStop(0.6, hexAlpha(col, alpha * 0.3));
    grad.addColorStop(1, hexAlpha(col, 0));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x % W, y % H, sz, 0, Math.PI * 2);
    ctx.fill();
  }
}
function drawSparkle(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const lt2 = (lt + phase) % cycle / cycle;
    const life = Math.sin(lt2 * Math.PI);
    if (life < 0.01) continue;
    const x = rng2(i, 1) * W + layer.directionX * lt2 * 40;
    const y = rng2(i, 2) * H + layer.directionY * lt2 * 40;
    const sz = (rng2(i, 3) * 6 + 2) * layer.size * life;
    const col = layer.rgb ? `hsl(${(i * 61 + lt * 80) % 360},100%,85%)` : layer.color || "#ffffff";
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(layer.rotation * Math.PI / 180 + lt * rng2(i, 8));
    ctx.globalAlpha = layer.opacity * life;
    ctx.fillStyle = col;
    ctx.shadowBlur = sz * 2;
    ctx.shadowColor = col;
    ctx.fillRect(-sz / 2, -sz * 2, sz, sz * 4);
    ctx.fillRect(-sz * 2, -sz / 2, sz * 4, sz);
    ctx.restore();
  }
}
function drawStardust(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const lt2 = (lt + phase) % cycle / cycle;
    const x = (rng2(i, 1) * W + layer.directionX * lt2 * W * 0.3) % W;
    const y = (rng2(i, 2) * H + layer.directionY * lt2 * H * 0.2) % H;
    const sz = (rng2(i, 3) * 1.5 + 0.4) * layer.size;
    const twinkle = (Math.sin(lt * rng2(i, 4) * 4 * Math.PI * 2 + rng2(i, 8) * Math.PI * 2) + 1) / 2;
    const col = layer.rgb ? `hsl(${(i * 83 + 200) % 360},80%,80%)` : layer.color || "#aaddff";
    ctx.beginPath();
    ctx.arc(x < 0 ? x + W : x, y < 0 ? y + H : y, sz, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.globalAlpha = layer.opacity * (0.4 + twinkle * 0.6);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
function drawGoldRain(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.7 + 0.5) * layer.speed;
    const vy = layer.directionY >= 0 ? 1 : -1;
    const vx = layer.directionX;
    const x = (rng2(i, 1) * W + vx * fallT * H * 0.2) % W;
    const y = (rng2(i, 2) * H + vy * fallT * H * spd) % H;
    const rot = rng2(i, 9) * Math.PI * 2 + lt * 2;
    const w = (rng2(i, 11) * 5 + 2) * layer.size;
    const h = w * 2.5;
    const hue = 45 + rng2(i, 12) * 20;
    const col = layer.rgb ? `hsl(${(i * 47 + lt * 30) % 360},100%,60%)` : `hsl(${hue},100%,60%)`;
    ctx.save();
    ctx.translate(x < 0 ? x + W : x, y < 0 ? y + H : y);
    ctx.rotate(rot);
    ctx.globalAlpha = layer.opacity;
    ctx.fillStyle = col;
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.restore();
  }
}
function drawHearts(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const lt2 = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.4 + 0.3) * layer.speed;
    const vy = layer.directionY <= 0 ? -1 : 1;
    const wobble = Math.sin(lt2 * Math.PI * 3 + rng2(i, 8) * Math.PI * 2) * 20 * layer.wind;
    const x = (rng2(i, 1) * W + wobble) % W;
    const y = (rng2(i, 2) * H + vy * lt2 * H * spd) % H;
    const sz = (rng2(i, 3) * 12 + 6) * layer.size;
    const col = layer.rgb ? `hsl(${(i * 40 + 340) % 360},90%,65%)` : layer.color || "#ff4466";
    ctx.save();
    ctx.translate(x < 0 ? x + W : x, y < 0 ? y + H : y);
    ctx.globalAlpha = layer.opacity;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(0, sz * 0.3);
    ctx.bezierCurveTo(-sz, -sz * 0.3, -sz * 1.2, sz * 0.8, 0, sz * 1.2);
    ctx.bezierCurveTo(sz * 1.2, sz * 0.8, sz, -sz * 0.3, 0, sz * 0.3);
    ctx.fill();
    ctx.restore();
  }
}
function drawStars(ctx, layer, lt, W, H) {
  const n = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n; i++) {
    const phase = rng2(i, 7) * cycle;
    const lt2 = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.8 + 0.4) * layer.speed;
    const angle = rng2(i, 9) * Math.PI * 2 + layer.rotation * Math.PI / 180;
    const x = (rng2(i, 1) * W + Math.cos(angle) * lt2 * H * spd * layer.directionX) % W;
    const y = (rng2(i, 2) * H + Math.sin(angle) * lt2 * H * spd * layer.directionY + lt2 * H * 0.4) % H;
    const trail = Math.min(1, lt2 * 5) * (1 - lt2) * 2;
    const sz = (rng2(i, 3) * 2 + 1) * layer.size;
    const col = layer.rgb ? `hsl(${(i * 67 + lt * 40) % 360},100%,85%)` : layer.color || "#ffffcc";
    ctx.save();
    ctx.translate(x < 0 ? x + W : x, y < 0 ? y + H : y);
    ctx.rotate(angle);
    ctx.globalAlpha = layer.opacity * trail;
    ctx.strokeStyle = col;
    ctx.lineWidth = sz;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-sz * 20 * trail, 0);
    ctx.stroke();
    ctx.restore();
  }
}
function drawLensFlare(ctx, layer, lt, W, H) {
  const n = Math.min(Math.round(layer.count * 0.1), 5);
  for (let i = 0; i < n; i++) {
    const cx = rng2(i, 1) * W;
    const cy = rng2(i, 2) * H * 0.4;
    const pulse = (Math.sin(lt * (rng2(i, 3) * 0.5 + 0.3) * Math.PI * 2) + 1) / 2;
    const sz = (rng2(i, 4) * 120 + 60) * layer.size;
    const col = layer.rgb ? `hsl(${(i * 60 + lt * 30) % 360},90%,90%)` : layer.color || "#ffffff";
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sz * (0.5 + pulse * 0.5));
    grad.addColorStop(0, hexAlpha(col, layer.opacity * (0.6 + pulse * 0.4)));
    grad.addColorStop(0.3, hexAlpha(col, layer.opacity * 0.2));
    grad.addColorStop(1, hexAlpha(col, 0));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, sz, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    ctx.globalAlpha = layer.opacity * 0.3 * pulse;
    ctx.strokeStyle = col;
    ctx.lineWidth = 2 * layer.size;
    ctx.shadowBlur = 12;
    ctx.shadowColor = col;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.stroke();
    ctx.restore();
  }
}
function drawFilmGrain(ctx, layer, lt, W, H) {
  const frameSeed = Math.floor(lt * 24);
  const grain = layer.size * 1.5;
  const step = Math.max(2, Math.round(4 / grain));
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const v = rng(frameSeed * 9999 + x * 1e3 + y);
      if (v > 0.5) {
        const bright = v > 0.75 ? 255 : 0;
        ctx.fillStyle = `rgba(${bright},${bright},${bright},${layer.opacity * (v - 0.5) * 0.5})`;
        ctx.fillRect(x, y, step, step);
      }
    }
  }
}
function drawVhsNoise(ctx, layer, lt, W, H) {
  const frameSeed = Math.floor(lt * 30);
  const bands = Math.round(layer.count * 0.1 + 3);
  for (let b = 0; b < bands; b++) {
    const y = rng2(frameSeed + b, b) * H;
    const h = rng2(frameSeed + b, b + 1) * 12 + 2;
    const shift = (rng2(frameSeed + b, b + 2) - 0.5) * 30 * layer.size;
    const alpha = (rng2(frameSeed + b, b + 3) * 0.4 + 0.1) * layer.opacity;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `rgb(${Math.round(rng2(b, 0) * 255)},${Math.round(rng2(b, 1) * 255)},${Math.round(rng2(b, 2) * 255)})`;
    ctx.fillRect(0, y, W, h);
    ctx.globalAlpha = 0.15 * layer.opacity;
    ctx.drawImage(ctx.canvas, shift, 0, W, H, 0, 0, W, H);
    ctx.restore();
  }
  ctx.globalAlpha = 0.06 * layer.opacity;
  ctx.fillStyle = "#000000";
  for (let y = 0; y < H; y += 3) {
    ctx.fillRect(0, y, W, 1);
  }
  ctx.globalAlpha = 1;
}
function drawScanlines(ctx, layer, lt, W, H) {
  const spacing = Math.max(2, Math.round(6 / layer.size));
  ctx.fillStyle = "#000000";
  ctx.globalAlpha = layer.opacity * 0.35;
  for (let y = 0; y < H; y += spacing) {
    ctx.fillRect(0, y, W, Math.ceil(spacing * 0.4));
  }
  ctx.globalAlpha = 1;
}
function drawVignettePulse(ctx, layer, lt, W, H) {
  const pulse = (Math.sin(lt * layer.speed * Math.PI * 2) + 1) / 2;
  const strength = layer.opacity * (0.4 + pulse * 0.6);
  const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
  const col = layer.color || "#000000";
  grad.addColorStop(0, hexAlpha(col, 0));
  grad.addColorStop(0.6, hexAlpha(col, 0));
  grad.addColorStop(1, hexAlpha(col, strength));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}
function drawChromatic(ctx, layer, lt, W, H) {
  const shift = Math.sin(lt * layer.speed * Math.PI * 2) * 6 * layer.size;
  const alpha = layer.opacity * 0.25;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = "rgba(255,0,0,0.5)";
  ctx.drawImage(ctx.canvas, shift, 0);
  ctx.fillStyle = "rgba(0,0,255,0.5)";
  ctx.drawImage(ctx.canvas, -shift, 0);
  ctx.restore();
}
function drawTvStatic(ctx, layer, lt, W, H) {
  const frameSeed = Math.floor(lt * 30);
  const step = Math.max(2, Math.round(3 / layer.size));
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const v = rng(frameSeed * 7919 + x / step * 1e3 + y / step) * 255;
      ctx.fillStyle = `rgba(${v},${v},${v},${layer.opacity * 0.7})`;
      ctx.fillRect(x, y, step, step);
    }
  }
}
function drawGlitchRgb(ctx, layer, lt, W, H) {
  const frameSeed = Math.floor(lt * 15);
  const glitches = Math.round(layer.count * 0.05 + 2);
  for (let g = 0; g < glitches; g++) {
    if (rng2(frameSeed + g, 99) > 0.6) continue;
    const y = rng2(frameSeed + g, g) * H;
    const h = rng2(frameSeed + g, g + 1) * 30 + 4;
    const shiftR = (rng2(frameSeed + g, g + 2) - 0.5) * 20 * layer.size;
    const shiftB = (rng2(frameSeed + g, g + 3) - 0.5) * 20 * layer.size;
    ctx.save();
    ctx.globalAlpha = layer.opacity * 0.5;
    ctx.globalCompositeOperation = "screen";
    ctx.drawImage(ctx.canvas, shiftR, 0, W, H, 0, y, W, h);
    ctx.drawImage(ctx.canvas, shiftB, 0, W, H, 0, y + h * 0.3, W, h * 0.6);
    ctx.restore();
  }
}
function drawPixelShatter(ctx, layer, lt, W, H) {
  const frameSeed = Math.floor(lt * 12);
  const blocks = Math.round(layer.count * 0.2 + 5);
  for (let b = 0; b < blocks; b++) {
    if (rng2(frameSeed + b, 77) > 0.5) continue;
    const x = rng2(frameSeed + b, b) * W;
    const y = rng2(frameSeed + b, b + 1) * H;
    const bw = (rng2(frameSeed + b, b + 2) * 60 + 10) * layer.size;
    const bh = (rng2(frameSeed + b, b + 3) * 20 + 4) * layer.size;
    const shift = (rng2(frameSeed + b, b + 4) - 0.5) * 40 * layer.size;
    ctx.save();
    ctx.globalAlpha = layer.opacity * 0.7;
    ctx.drawImage(ctx.canvas, x + shift, y, bw, bh, x, y, bw, bh);
    ctx.restore();
  }
}
function drawMatrix(ctx, layer, lt, W, H) {
  const fontSize = Math.round(12 * layer.size);
  const cols = Math.floor(W / fontSize);
  const cycle = layer.cycleDuration;
  const col = layer.color || "#00ff41";
  ctx.font = `${fontSize}px monospace`;
  for (let c = 0; c < cols; c++) {
    const phase = rng2(c, 99) * cycle;
    const lt2 = (lt * layer.speed + phase) % cycle / cycle;
    const dropY = lt2 * (H + 20 * fontSize) - 20 * fontSize;
    const chars = Math.round(rng2(c, 1) * 20 + 5);
    for (let r = 0; r < chars; r++) {
      const y = dropY - r * fontSize;
      if (y < -fontSize || y > H + fontSize) continue;
      const alpha = layer.opacity * (r === 0 ? 1 : Math.max(0, 1 - r / chars));
      const charCode = Math.floor(rng(c * 1e3 + r + Math.floor(lt * 5)) * 94) + 33;
      const isHead = r === 0;
      ctx.fillStyle = isHead ? `rgba(255,255,255,${alpha})` : layer.rgb ? `hsla(${(c * 37 + lt * 40) % 360},100%,55%,${alpha})` : hexAlpha(col, alpha);
      ctx.fillText(String.fromCharCode(charCode), c * fontSize, y);
    }
  }
}
function drawScanlineGlitch(ctx, layer, lt, W, H) {
  const frameSeed = Math.floor(lt * 20);
  ctx.globalAlpha = layer.opacity * 0.2;
  ctx.fillStyle = "#000";
  for (let y = 0; y < H; y += 4) {
    ctx.fillRect(0, y, W, 2);
  }
  ctx.globalAlpha = 1;
  const jumps = Math.round(layer.count * 0.05 + 1);
  for (let j = 0; j < jumps; j++) {
    if (rng2(frameSeed + j, 50) > 0.4) continue;
    const y = rng2(frameSeed + j, j) * H;
    const h = rng2(frameSeed + j, j + 1) * 8 + 2;
    const shift = (rng2(frameSeed + j, j + 2) - 0.5) * 30 * layer.size;
    ctx.save();
    ctx.globalAlpha = layer.opacity * 0.6;
    ctx.drawImage(ctx.canvas, shift, 0, W, H, 0, y, W, h);
    ctx.restore();
  }
}
const DRAW_FNS = {
  // Nature
  "snow": drawSnow,
  "sakura": drawSakura,
  "leaves": drawLeaves,
  "rain": drawRain,
  "drizzle": drawDrizzle,
  "fog": drawFog,
  "firefly": drawFirefly,
  "bubbles": drawBubbles,
  "smoke": drawSmoke,
  "dust": drawDust,
  // Light
  "confetti": drawConfetti,
  "glitter": drawGlitter,
  "bokeh": drawBokeh,
  "sparkle": drawSparkle,
  "stardust": drawStardust,
  "gold-rain": drawGoldRain,
  "hearts": drawHearts,
  "stars": drawStars,
  "lens-flare": drawLensFlare,
  // Cinematic
  "film-grain": drawFilmGrain,
  "vhs-noise": drawVhsNoise,
  "scanlines": drawScanlines,
  "vignette-pulse": drawVignettePulse,
  "chromatic": drawChromatic,
  // Glitch
  "tv-static": drawTvStatic,
  "glitch-rgb": drawGlitchRgb,
  "pixel-shatter": drawPixelShatter,
  "matrix": drawMatrix,
  "scanline-glitch": drawScanlineGlitch
};
function drawOverlayLayer(ctx, layer, t, W, H) {
  if (!layer.enabled) return;
  const cycle = layer.cycleDuration > 0 ? layer.cycleDuration : 8;
  const lt = loopT(t, cycle);
  ctx.save();
  const fn = DRAW_FNS[layer.preset];
  if (fn) fn(ctx, layer, lt, W, H);
  ctx.restore();
}
function drawOverlayLayers(ctx, layers, t, W, H) {
  for (const layer of layers) {
    if (layer.enabled) drawOverlayLayer(ctx, layer, t, W, H);
  }
}
async function overlayCanvasRender(layers, duration, fps, W, H, tmpDir, baseSeconds = 180) {
  const enabled = layers.filter((l) => l.enabled);
  if (!enabled.length) return null;
  const { createCanvas } = require("@napi-rs/canvas");
  const { promises: fs } = await import("node:fs");
  const { join } = await import("node:path");
  const renderDur = Math.min(duration, Math.max(20, baseSeconds));
  const effectiveFps = fps;
  const totalFrames = Math.ceil(renderDur * effectiveFps);
  const dir = join(tmpDir, "overlay");
  await fs.mkdir(dir, { recursive: true });
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  for (let f = 0; f < totalFrames; f++) {
    const t = f / effectiveFps;
    ctx.clearRect(0, 0, W, H);
    drawOverlayLayers(ctx, enabled, t, W, H);
    const buf = canvas.toBuffer("image/png");
    await fs.writeFile(join(dir, `ov${String(f + 1).padStart(6, "0")}.png`), buf);
  }
  return { dir, fps: effectiveFps, frames: totalFrames };
}
function drawCustomTexts(ctx, items, t, W, H) {
  if (!items?.length) return;
  const scale = H / 1080;
  for (const it of items) {
    if (!it.enabled || !it.text) continue;
    let x = it.posX * W;
    let y = it.posY * H;
    let size = Math.max(4, it.fontSize) * scale;
    let alpha = 1;
    switch (it.anim) {
      case "pulse":
        size *= 1 + 0.08 * Math.sin(t * 3);
        break;
      case "float":
        y += Math.sin(t * 2) * H * 0.012;
        break;
      case "blink":
        alpha = 0.45 + 0.55 * Math.abs(Math.sin(t * 2.5));
        break;
      case "sway":
        x += Math.sin(t * 1.4) * W * 0.02;
        break;
    }
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `700 ${size}px ${it.fontFamily}, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = it.color;
    if (it.glow > 0.02) {
      ctx.shadowBlur = it.glow * 28 * scale;
      ctx.shadowColor = it.glowColor || it.color;
    }
    ctx.fillText(it.text, x, y);
    ctx.restore();
  }
}
exports.bassEnergy = bassEnergy;
exports.createParticleField = createParticleField;
exports.drawCustomTexts = drawCustomTexts;
exports.drawOverlayLayers = drawOverlayLayers;
exports.drawRingBands = drawRingBands;
exports.drawSpectrum = drawSpectrum;
exports.overlayCanvasRender = overlayCanvasRender;
exports.stepParticles = stepParticles;
