const fs = require('fs');

function cleanLyricText(s) {
  return (s || "").replace(/^[\s,.;:!?،۔。、「」“”"…~*]+|[\s,.;:!?،۔。、「」“”"…~*]+$/g, "").replace(/\s{2,}/g, " ");
}

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

function normalizeLyrics(input, audioDuration) {
  let rawLines = [];
  if (!input) {
    return { enabled: true, showLyrics: true, lines: [], lyrics: [] };
  }
  if (typeof input === "string") {
    if (input.includes("[") && input.includes("]")) {
      rawLines = parseLrc(input);
    } else if (input.includes("-->")) {
      rawLines = parseSrt(input);
    } else {
      rawLines = parseTxt(input);
    }
  } else if (Array.isArray(input)) {
    rawLines = input;
  } else if (typeof input === "object") {
    if (Array.isArray(input.lines)) {
      rawLines = input.lines;
    } else if (Array.isArray(input.segments)) {
      rawLines = input.segments.map((seg, idx) => ({
        t: seg.start,
        end: seg.end,
        text: seg.text || "",
        words: seg.words ? seg.words.map(w => ({ t: w.start ?? w.t, end: w.end, text: w.word ?? w.text })) : undefined
      }));
    } else if (typeof input.content === "string") {
      rawLines = normalizeLyrics(input.content, audioDuration).lines;
    } else if (Array.isArray(input.timestamps)) {
      rawLines = input.timestamps;
    } else {
      rawLines = [];
    }
  }
  let lines = rawLines.map((line, idx) => {
    if (!line) return null;
    let text = typeof line === "string" ? line : (line.text || line.word || "");
    text = cleanLyricText(text);
    if (!text) return null;
    let t = typeof line.t === "number" && !isNaN(line.t) ? line.t : (line.start ?? -1);
    let end = typeof line.end === "number" && !isNaN(line.end) ? line.end : -1;
    let words = undefined;
    if (Array.isArray(line.words)) {
      words = line.words.map(w => {
        const wText = cleanLyricText(w.text || w.word || "");
        if (!wText) return null;
        const wt = typeof w.t === "number" && !isNaN(w.t) ? w.t : (w.start ?? -1);
        const wend = typeof w.end === "number" && !isNaN(w.end) ? w.end : -1;
        return { text: wText, t: wt, end: wend };
      }).filter(Boolean);
    }
    return {
      id: line.id || `line-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      text,
      t,
      end,
      words
    };
  }).filter(Boolean);

  const dur = typeof audioDuration === "number" && audioDuration > 0 ? audioDuration : (lines.length * 4 || 15);
  const hasNoTimings = lines.every(l => l.t < 0);

  if (hasNoTimings) {
    const minLines = Math.max(3, Math.ceil(dur / 4));
    const allWords = lines.flatMap(l => (l.text || "").split(/\s+/)).map(w => w.trim()).filter(Boolean);
    
    if (allWords.length > 0) {
      const idealWordsPerLine = Math.floor(allWords.length / minLines);
      const targetWordsPerLine = Math.max(1, Math.min(8, idealWordsPerLine));
      
      const newLines = [];
      for (let i = 0; i < allWords.length; i += targetWordsPerLine) {
        const chunk = allWords.slice(i, i + targetWordsPerLine);
        newLines.push({
          id: `line-chunk-${Math.random().toString(36).slice(2, 6)}`,
          text: chunk.join(" "),
          t: -1,
          end: -1
        });
      }
      lines = newLines;
    }
    
    const perLine = dur / Math.max(1, lines.length);
    lines = lines.map((l, i) => {
      const startT = i * perLine;
      const endT = (i + 1) * perLine;
      let words = l.words;
      if (words && words.length > 0) {
        const perWord = perLine / words.length;
        words = words.map((w, wi) => ({
          text: w.text,
          t: startT + wi * perWord,
          end: startT + (wi + 1) * perWord
        }));
      }
      return {
        id: l.id || `line-${i}-${Math.random().toString(36).slice(2, 6)}`,
        text: l.text,
        t: startT,
        end: endT,
        words
      };
    });
  } else {
    lines.sort((a, b) => a.t - b.t);
    for (let i = 0; i < lines.length; i++) {
      const curr = lines[i];
      if (curr.t < 0) {
        curr.t = i > 0 ? lines[i - 1].end : 0;
      }
      if (curr.end <= curr.t) {
        const nextStart = lines[i + 1]?.t;
        curr.end = nextStart && nextStart > curr.t ? nextStart : Math.min(dur, curr.t + 4);
      }
      if (curr.words && curr.words.length > 0) {
        const lineDur = curr.end - curr.t;
        const perWord = lineDur / curr.words.length;
        curr.words = curr.words.map((w, wi) => {
          let wt = w.t >= 0 ? w.t : curr.t + wi * perWord;
          let wend = w.end > wt ? w.end : curr.t + (wi + 1) * perWord;
          return { text: w.text, t: wt, end: wend };
        });
      }
    }
  }
  lines.sort((a, b) => a.t - b.t);
  return { enabled: true, showLyrics: true, lines, lyrics: lines };
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

function groqResponseToLines(data) {
  const words = (data.words?.length ? data.words : (data.segments ?? []).flatMap((s) => s.words ?? [])).map((w) => ({ ...w, word: cleanLyricText(w.word) })).filter((w) => w.word.length > 0);
  if (words.length > 0) {
    return groupWordsToLines(words);
  }
  const segs = (data.segments ?? []).map((seg) => ({
    t: seg.start,
    end: seg.end,
    text: cleanLyricText(seg.text),
    words: []
  })).filter((l) => l.text.length > 0);

  if (segs.length > 0) {
    return segs;
  }

  // Fallback if we only have data.text
  if (data.text) {
    return [{
      t: -1,
      end: -1,
      text: cleanLyricText(data.text),
      words: []
    }];
  }

  return [];
}

// TEST SUITE
console.log("=== RUNNING V2 TEST CASES ===");

// 1. Audio 30 seconds: expected min 8 lines
console.log("\n--- TEST 1: Audio 30s with long plain text ---");
const longText30s = "Hear the spirit speak in the shadows of the night. Whispers of the ancient times guide us home through the desert sand, bringing peace to the troubled mind.";
const res30s = normalizeLyrics(longText30s, 30);
console.log("Result lines count:", res30s.lines.length);
console.log("Is output format correct (lyrics key)?", !!res30s.lyrics);
console.log("Lines overview:");
res30s.lines.forEach((l, idx) => {
  console.log(`Line ${idx} [${l.t.toFixed(2)}s - ${l.end.toFixed(2)}s]: "${l.text}"`);
});
if (res30s.lines.length >= 8) {
  console.log("✓ TEST 1 Passed!");
} else {
  console.error("✗ TEST 1 Failed! Expected >= 8 lines, got:", res30s.lines.length);
  process.exit(1);
}

// 2. Audio 3 minutes (180s): expected min 45 lines
console.log("\n--- TEST 2: Audio 3m with plain text ---");
const text3m = Array(50).fill("deep house afro beat dance music vibe").join(" ");
const res3m = normalizeLyrics(text3m, 180);
console.log("Result lines count:", res3m.lines.length);
if (res3m.lines.length >= 45) {
  console.log("✓ TEST 2 Passed!");
} else {
  console.error("✗ TEST 2 Failed! Expected >= 45 lines, got:", res3m.lines.length);
  process.exit(1);
}

// 3. Groq raw text response fallback
console.log("\n--- TEST 3: Groq response raw text fallback ---");
const groqResp = { text: "Hello this is a plain text transcription from Groq API with no timing segments." };
const linesFromGroq = groqResponseToLines(groqResp);
console.log("groqResponseToLines output:", JSON.stringify(linesFromGroq, null, 2));
const normalizedGroq = normalizeLyrics(linesFromGroq, 15);
console.log("Normalized Groq lines count:", normalizedGroq.lines.length);
normalizedGroq.lines.forEach((l, idx) => {
  console.log(`Line ${idx} [${l.t.toFixed(2)}s - ${l.end.toFixed(2)}s]: "${l.text}"`);
});
if (normalizedGroq.lines.length >= 4) {
  console.log("✓ TEST 3 Passed!");
} else {
  console.error("✗ TEST 3 Failed! Expected >= 4 lines, got:", normalizedGroq.lines.length);
  process.exit(1);
}

console.log("\nAll unit tests passed successfully!");
