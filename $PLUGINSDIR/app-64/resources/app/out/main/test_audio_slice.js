const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const util = require('util');
const pexec = util.promisify(execFile);

const ffmpegPath = "C:\\Users\\DELL\\Documents\\MASJAVAS-RENDER-PRO\\$PLUGINSDIR\\app-64\\resources\\bin\\ffmpeg.exe";
const mediaFile = "C:\\Users\\DELL\\Documents\\Bahan Vidio\\Audio Musik\\Despacito ｜ Latin Afro House Remix ｜ Club DJ Mix ｜ Groovy Beats.mp3";
const outputFile = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\470808b8-a8b2-4771-ab19-1307c0678ddf\\scratch\\test_slice_out.mp3";

console.log("Checking if files exist...");
console.log("FFmpeg exists:", fs.existsSync(ffmpegPath));
console.log("Media file exists:", fs.existsSync(mediaFile));

async function run() {
  try {
    const args = [
      "-y",
      "-ss", "30",
      "-t", "10",
      "-i", mediaFile,
      "-c:a", "libmp3lame",
      "-b:a", "128k",
      outputFile
    ];
    console.log("Running FFmpeg...");
    const { stdout, stderr } = await pexec(ffmpegPath, args, { windowsHide: true });
    console.log("FFmpeg finished successfully!");
    console.log("Output file exists:", fs.existsSync(outputFile));
    if (fs.existsSync(outputFile)) {
      console.log("Output file size:", fs.statSync(outputFile).size);
    }
  } catch (e) {
    console.error("FFmpeg error:", e);
  }
}

run();
