#!/usr/bin/env node
// beat-grid.mjs — turn a track's BPM and first-beat offset into a beat grid (times + frame numbers), word-per-beat
// kinetic captions (.ass), and layer timings for animate-layer.sh that land each move on a beat.
// Node >= 20, no dependencies, no network.
//
//   node beat-grid.mjs --bpm 118 --offset 0.42 --beats 16                      # CSV grid to stdout
//   node beat-grid.mjs --bpm 118 --offset 0.42 --words "SILVER|FOIL|AND A|DEADLINE" --every 2 --start-beat 0 --out words.ass
//   node beat-grid.mjs --bpm 118 --offset 0.42 --layer title:0-8 --layer l3:8-20 --ease 0.35
//
// Options: --bpm (required) · --offset first downbeat in seconds (default 0) · --beats how many rows (default 16)
//          --fps (default 30) · --per-bar beats per bar (default 4) · --every beats per word (default 1)
//          --start-beat first word's beat (default 0) · --y caption centre y on 1080x1920 (default 820)
//          --accent words to colour with the accent, comma-separated · --accent-hex (default ff6fa5) · --out file
//          --layer name:fromBeat-toBeat (repeatable) · --ease seconds (default 0.35)
import { writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const opt = { layer: [] };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (!a.startsWith("--")) continue;
  const key = a.slice(2);
  const val = args[i + 1] && !args[i + 1].startsWith("--") ? args[++i] : "true";
  if (key === "layer") opt.layer.push(val);
  else opt[key] = val;
}
const num = (k, d) => (opt[k] === undefined ? d : Number(opt[k]));
const bpm = num("bpm", NaN);
if (!Number.isFinite(bpm) || bpm < 40 || bpm > 240) {
  console.error("usage: node beat-grid.mjs --bpm <40-240> [--offset s] [--beats n] [--fps n] [--words \"A|B|C\" --out f.ass] [--layer name:a-b]");
  process.exit(2);
}
const offset = num("offset", 0);
const fps = num("fps", 30);
const perBar = num("per-bar", 4);
const spb = 60 / bpm; // seconds per beat
const beatTime = (b) => offset + b * spb;
const r3 = (x) => Math.round(x * 1000) / 1000;

const assTime = (s) => {
  const cs = Math.max(0, Math.round(s * 100));
  const h = Math.floor(cs / 360000);
  const m = Math.floor((cs % 360000) / 6000);
  const sec = Math.floor((cs % 6000) / 100);
  return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(cs % 100).padStart(2, "0")}`;
};
const hexToAss = (hex) => {
  const h = hex.replace("#", "");
  return `&H00${h.slice(4, 6)}${h.slice(2, 4)}${h.slice(0, 2)}&`.toUpperCase();
};

let done = false;

if (opt.words) {
  const words = opt.words.split("|").map((w) => w.trim()).filter(Boolean);
  const every = num("every", 1);
  const start = num("start-beat", 0);
  const y = num("y", 820);
  const accent = new Set((opt.accent || "").split(",").map((w) => w.trim().toUpperCase()).filter(Boolean));
  const accentAss = hexToAss(opt["accent-hex"] || "ff6fa5");
  const lines = [
    "[Script Info]",
    "; Word-per-beat kinetic captions from beat-grid.mjs. Burn with an ffmpeg that has libass, or import into an editor.",
    `; bpm ${bpm}, offset ${offset}s, one word every ${every} beat(s) from beat ${start}. Centre y=${y} on 1080x1920.`,
    "ScriptType: v4.00+",
    "PlayResX: 1080",
    "PlayResY: 1920",
    "WrapStyle: 2",
    "ScaledBorderAndShadow: yes",
    "",
    "[V4+ Styles]",
    "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
    "Style: Slam,Barlow Condensed ExtraBold,150,&H00E2E9EC,&H00E2E9EC,&H000D0B0A,&H990D0B0A,0,0,0,0,100,100,-1,0,1,6,0,5,90,120,0,1",
    "",
    "[Events]",
    "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
  ];
  words.forEach((w, i) => {
    const t0 = beatTime(start + i * every);
    const t1 = i === words.length - 1 ? t0 + every * spb * 1.5 : beatTime(start + (i + 1) * every);
    const colour = accent.has(w.toUpperCase()) ? `\\c${accentAss}` : "";
    // pop: 125% → 100% in 120 ms, hard cut out 40 ms before the next word so two words never overlap
    lines.push(`Dialogue: 0,${assTime(t0)},${assTime(t1 - 0.04)},Slam,,0,0,0,,{\\an5\\pos(540,${y})\\fscx125\\fscy125\\t(0,120,\\fscx100\\fscy100)${colour}}${w.toUpperCase()}`);
  });
  const text = lines.join("\n") + "\n";
  if (opt.out) {
    writeFileSync(opt.out, text);
    console.log(`wrote ${words.length} word cues to ${opt.out} (last word ends at ${r3(beatTime(start + (words.length - 1) * every) + every * spb * 1.5)} s)`);
  } else process.stdout.write(text);
  done = true;
}

if (opt.layer.length) {
  const ease = num("ease", 0.35);
  console.log("# animate-layer.sh timings: the arrival ends on the first beat, the exit starts on the second");
  for (const spec of opt.layer) {
    const m = /^([\w.-]+):(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)$/.exec(spec);
    if (!m) { console.error(`bad --layer "${spec}" (want name:fromBeat-toBeat)`); process.exit(2); }
    const [, name, a, b] = m;
    const start = r3(Math.max(0, beatTime(Number(a)) - ease));
    const end = r3(beatTime(Number(b)) + ease);
    console.log(`sh scripts/animate-layer.sh <in.mp4> ${name}.png <out.mp4> ${start} ${end} left 120 ${ease}   # in on beat ${a} (${r3(beatTime(Number(a)))} s), out from beat ${b}`);
  }
  done = true;
}

if (!done) {
  const n = num("beats", 16);
  console.log("beat,bar,beat_in_bar,time_s,frame,downbeat");
  for (let b = 0; b < n; b++) {
    const t = beatTime(b);
    console.log([b, Math.floor(b / perBar) + 1, (b % perBar) + 1, r3(t), Math.round(t * fps), b % perBar === 0 ? "yes" : ""].join(","));
  }
  console.error(`# ${bpm} BPM = ${r3(spb)} s per beat = ${r3(spb * fps)} frames at ${fps} fps; a bar of ${perBar} = ${r3(spb * perBar)} s`);
}
