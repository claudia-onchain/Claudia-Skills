#!/usr/bin/env node
// grid-preview.mjs — preview an Instagram-style profile grid (3 columns, 3:4 centre-cropped tiles) from image files,
// newest first, with optional pinned tiles, average-colour readout and a PNG render. Node >= 20, no dependencies.
//
//   node grid-preview.mjs <out.html> <newest.jpg> <next.jpg> …            write the preview page
//   node grid-preview.mjs <out.html> --list plan.txt                       image paths from a file, one per line (# comments ok)
//   options:  --pinned <n>     mark the first n images as pinned (Instagram allows up to 3)
//             --colors         print each image's average colour and the nearest palette token (needs ffmpeg)
//             --render <png>   screenshot the page with Chrome/Chromium (set CHROME=/path if not found)
//
// No network calls. Exit codes: 0 ok, 1 bad input, 4 a needed tool (ffmpeg / Chrome) was not found.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve, relative, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const PALETTE = {
  "near-black": "#0a0b0d",
  "off-white": "#ece9e2",
  rose: "#ff6fa5",
  peach: "#ff9a6b",
  "rose fill": "#d63a76",
  silver: "#c9ccd3",
  cobalt: "#1f3a8a",
  "visor orange": "#ff6a2b",
  "patent green": "#7fae4b",
};

const args = process.argv.slice(2);
const take = (name) => {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const flag = (name) => {
  const i = args.indexOf(name);
  if (i < 0) return false;
  args.splice(i, 1);
  return true;
};
const pinned = Math.max(0, Math.min(3, Number(take("--pinned") ?? 0)));
const renderPng = take("--render");
const listFile = take("--list");
const colors = flag("--colors");
const [outHtml, ...rest] = args;
let images = rest;
if (listFile) {
  images = readFileSync(listFile, "utf8").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
    .map((p) => resolve(dirname(resolve(listFile)), p));
}
if (!outHtml || !images.length) {
  console.error("usage: node grid-preview.mjs <out.html> <img1> [img2 …] | --list plan.txt [--pinned n] [--colors] [--render out.png]");
  process.exit(1);
}
const missing = images.filter((p) => !existsSync(p));
if (missing.length) {
  console.error(`not found:\n  ${missing.join("\n  ")}`);
  process.exit(1);
}

const hex = (r, g, b) => `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const nearest = (h) => {
  const [r, g, b] = rgb(h);
  let best = ["", Infinity];
  for (const [name, p] of Object.entries(PALETTE)) {
    const [pr, pg, pb] = rgb(p);
    const d = Math.sqrt(2 * (r - pr) ** 2 + 4 * (g - pg) ** 2 + 3 * (b - pb) ** 2);
    if (d < best[1]) best = [name, d];
  }
  return best;
};

const avg = [];
if (colors) {
  const probe = spawnSync("ffmpeg", ["-version"], { encoding: "utf8" });
  if (probe.error) {
    console.error("--colors needs ffmpeg on PATH");
    process.exit(4);
  }
  for (const p of images) {
    // Centre 3:4 crop (what the grid shows), averaged down to one pixel.
    const r = spawnSync("ffmpeg", ["-loglevel", "error", "-i", p, "-vf", "crop='min(iw,ih*3/4)':'min(ih,iw*4/3)',scale=1:1:flags=area", "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]);
    const b = r.stdout;
    avg.push(b && b.length >= 3 ? hex(b[0], b[1], b[2]) : null);
  }
}

const outDir = dirname(resolve(outHtml));
const src = (p) => relative(outDir, resolve(p)).split(sep).join("/");
const tiles = images.map((p, i) => {
  const c = avg[i];
  const note = c ? `<span class="c" style="background:${c}"></span>${c} · ${nearest(c)[0]}` : "";
  return `<figure class="t"><div class="img" style="background-image:url('${src(p).replace(/'/g, "%27")}')"></div>${i < pinned ? '<span class="pin">pinned</span>' : ""}<figcaption>${i + 1}${note ? ` · ${note}` : ""}</figcaption></figure>`;
});

const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>grid preview</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; background: #0a0b0d; color: #ece9e2; font: 500 13px/1.3 ui-monospace, Menlo, monospace; }
  .phone { width: 390px; margin: 24px auto; background: #000; padding: 0 0 24px; }
  .head { padding: 16px; color: #80858c; }
  .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2px; }
  .t { position: relative; margin: 0; }
  .img { aspect-ratio: 3 / 4; background: #222 center / cover no-repeat; }
  .pin { position: absolute; top: 6px; right: 6px; background: rgba(10,11,13,.7); padding: 2px 5px; font-size: 10px; }
  figcaption { font-size: 9px; color: #80858c; padding: 2px 4px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .c { display: inline-block; width: 8px; height: 8px; vertical-align: middle; margin-right: 3px; border: 1px solid #444; }
</style></head><body>
<div class="phone"><div class="head">profile grid preview · 3:4 centre crop · newest first · ${images.length} posts</div>
<div class="grid">
${tiles.join("\n")}
</div></div>
</body></html>
`;
writeFileSync(outHtml, html);
console.log(`wrote ${outHtml} (${images.length} tiles, ${Math.ceil(images.length / 3)} rows${pinned ? `, ${pinned} pinned` : ""})`);
if (colors) {
  images.forEach((p, i) => {
    const c = avg[i];
    console.log(`  ${String(i + 1).padStart(2)}  ${c ?? "n/a    "}  ${c ? nearest(c)[0].padEnd(13) : ""}  ${p}`);
  });
}

if (renderPng) {
  let chrome = process.env.CHROME;
  if (!chrome) {
    const which = (c) => spawnSync("sh", ["-c", `command -v ${c}`], { encoding: "utf8" }).stdout.trim();
    chrome = ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", which("google-chrome"), which("chromium"), which("chromium-browser")]
      .find((c) => c && existsSync(c));
  }
  if (!chrome) {
    console.error("Chrome/Chromium not found; set CHROME=/path/to/chrome");
    process.exit(4);
  }
  const rows = Math.ceil(images.length / 3);
  const h = 48 + 60 + rows * (Math.round(129 * 4 / 3) + 22);
  const out = resolve(renderPng);
  spawnSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2", `--window-size=480,${h}`,
    "--allow-file-access-from-files", `--screenshot=${out}`, pathToFileURL(resolve(outHtml)).href], { stdio: "ignore" });
  console.log(existsSync(out) ? `rendered ${out}` : `render failed: ${out}`);
}
