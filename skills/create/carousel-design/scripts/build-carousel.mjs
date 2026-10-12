#!/usr/bin/env node
// build-carousel.mjs — turn a slides JSON file into one HTML file per slide plus a deck.html for PDF export,
// and (with --render) PNG slides and a PDF through headless Chrome. Node >= 20, no dependencies.
//
//   node build-carousel.mjs <slides.json> <out-dir>            write slide-01.html … and deck.html, print checks
//   node build-carousel.mjs <slides.json> <out-dir> --render   also render slide-NN.png and deck.pdf with Chrome
//
// The script itself makes no network calls. The HTML loads Barlow Condensed, DM Sans and DM Mono (SIL OFL) from
// Google Fonts, so Chrome fetches them when it renders; offline it falls back to system fonts.
// Set CHROME=/path/to/chrome if Chrome or Chromium is not found. Exit codes: 0 ok, 1 bad input, 2 checks failed, 4 no Chrome.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve, relative, join, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const SIZES = {
  "ig-4x5": { w: 1080, h: 1350, pad: [96, 88, 110, 88], max: 20, note: "Instagram 4:5 (in-app 20 slides, API 10)" },
  "ig-3x4": { w: 1080, h: 1440, pad: [110, 88, 120, 88], max: 20, note: "Instagram 3:4 (in-app; API crops to 4:5–1.91:1)" },
  "square": { w: 1080, h: 1080, pad: [88, 88, 96, 88], max: 20, note: "1:1 for Instagram, LinkedIn, X, Bluesky" },
  tiktok: { w: 1080, h: 1920, pad: [260, 150, 440, 88], max: 35, note: "TikTok photo mode 9:16 (up to 35 photos)" },
  linkedin: { w: 1080, h: 1350, pad: [96, 88, 110, 88], max: 300, note: "LinkedIn document (PDF, one page size)" },
};

const [, , inPath, outDir, ...flags] = process.argv;
if (!inPath || !outDir) {
  console.error("usage: node build-carousel.mjs <slides.json> <out-dir> [--render]");
  process.exit(1);
}
const render = flags.includes("--render");

let spec;
try {
  spec = JSON.parse(readFileSync(inPath, "utf8"));
} catch (e) {
  console.error(`cannot read ${inPath}: ${e.message}`);
  process.exit(1);
}
const size = typeof spec.size === "object" ? { pad: [96, 88, 110, 88], max: 20, note: "custom", ...spec.size } : SIZES[spec.size ?? "ig-4x5"];
if (!size || !size.w || !size.h) {
  console.error(`unknown size "${spec.size}". Use one of ${Object.keys(SIZES).join(", ")} or { "w": 1080, "h": 1350 }`);
  process.exit(1);
}
const slides = Array.isArray(spec.slides) ? spec.slides : [];
if (!slides.length) {
  console.error("slides.json needs a non-empty \"slides\" array");
  process.exit(1);
}
const theme = { bg: "#0a0b0d", ink: "#ece9e2", accent: "#ff6fa5", muted: "#80858c", ...(spec.theme ?? {}) };
const aiLabel = spec.aiLabel ?? "AI-generated";
const inDir = dirname(resolve(inPath));
const out = resolve(outDir);
mkdirSync(out, { recursive: true });

const esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
// *word* → accent colour. One accent per slide is the house rule; the check below warns on more.
const rich = (s = "") => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>").replace(/\n/g, "<br>");
const imgUrl = (p) => {
  if (!p) return "";
  if (/^(https?:|data:)/.test(p)) return p;
  const abs = resolve(inDir, p);
  if (!existsSync(abs)) warnings.push(`image not found: ${p}`);
  return relative(out, abs).split(sep).join("/");
};

const warnings = [];
const errors = [];
if (slides.length > size.max) errors.push(`${slides.length} slides; ${size.note} allows ${size.max}`);
if (spec.size === "ig-4x5" && slides.length > 10) warnings.push("more than 10 slides: post in the Instagram app (the API and @useclaudia/social take 10)");
if (slides.length < 3 && spec.size !== "linkedin") warnings.push("fewer than 3 slides: a single image post may do the job better");
if (slides[0]?.type !== "hook") warnings.push("slide 1 is not type \"hook\": the first slide decides the swipe");

slides.forEach((s, i) => {
  const n = i + 1;
  const words = `${s.title ?? ""} ${s.body ?? ""}`.trim().split(/\s+/).filter(Boolean).length;
  const limit = s.type === "hook" ? 14 : 45;
  if (words > limit) warnings.push(`slide ${n}: ${words} words (aim for ≤ ${limit} on a ${s.type ?? "point"} slide)`);
  const accents = ((s.title ?? "") + (s.body ?? "")).match(/\*[^*]+\*/g)?.length ?? 0;
  if (accents > 1) warnings.push(`slide ${n}: ${accents} accent words (one per slide)`);
  if (!s.alt) warnings.push(`slide ${n}: no "alt" text`);
  else if (s.image && !/ai-generated/i.test(s.alt)) warnings.push(`slide ${n}: alt text should say "AI-generated" for a generated image`);
});

const [pt, pr, pb, pl] = size.pad;
const css = `
  @page { size: ${size.w}px ${size.h}px; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: ${theme.bg}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .s { position: relative; width: ${size.w}px; height: ${size.h}px; overflow: hidden; background: ${theme.bg} center / cover no-repeat;
       color: ${theme.ink}; font-family: "DM Sans", system-ui, sans-serif; page-break-after: always; break-after: page; }
  .s.img::before { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(10,11,13,.92) 0%, rgba(10,11,13,.6) 38%, rgba(10,11,13,0) 66%); }
  .in { position: absolute; top: ${pt}px; right: ${pr}px; bottom: ${pb}px; left: ${pl}px; display: flex; flex-direction: column; justify-content: flex-end; }
  .s.text .in { justify-content: center; }
  .k { font: 500 26px/1.2 "DM Mono", monospace; letter-spacing: .14em; text-transform: uppercase; color: ${theme.accent}; margin: 0 0 22px; }
  .t { font: 800 ${size.h >= 1900 ? 124 : 108}px/.92 "Barlow Condensed", "Arial Narrow", sans-serif; text-transform: uppercase; letter-spacing: -.01em; margin: 0; }
  .s.point .t, .s.cta .t { font-size: ${size.h >= 1900 ? 92 : 80}px; }
  .b { font: 500 ${size.h >= 1900 ? 44 : 40}px/1.3 "DM Sans", system-ui, sans-serif; margin: 28px 0 0; max-width: 92%; }
  em { font-style: normal; color: ${theme.accent}; }
  .n { font: 800 200px/1 "Barlow Condensed", sans-serif; color: ${theme.accent}; opacity: .9; margin: 0 0 8px; }
  .foot { position: absolute; left: ${pl}px; right: ${pr}px; bottom: ${Math.max(36, pb - 70)}px; display: flex; justify-content: space-between;
          font: 500 22px/1 "DM Mono", monospace; letter-spacing: .12em; text-transform: uppercase; color: ${theme.muted}; }
  .ai { position: absolute; right: ${pr}px; top: ${Math.max(32, pt - 56)}px; font: 500 20px/1 "DM Mono", monospace; letter-spacing: .14em;
        text-transform: uppercase; color: ${theme.muted}; background: rgba(10,11,13,.6); padding: 6px 8px; }
`;

const slideHtml = (s, i) => {
  const n = i + 1;
  const type = s.type ?? "point";
  const img = imgUrl(s.image);
  const style = img ? ` style="background-image:url('${esc(img)}');background-position:${esc(s.imagePos ?? "50% 30%")}"` : "";
  const kicker = s.kicker ?? (type === "hook" ? spec.series : "");
  return `<section class="s ${type} ${img ? "img" : "text"}"${style}>
  ${img && aiLabel ? `<div class="ai">${esc(aiLabel)}</div>` : ""}
  <div class="in">
    ${type === "point" && s.n != null ? `<p class="n">${esc(String(s.n).padStart(2, "0"))}</p>` : ""}
    ${kicker ? `<p class="k">${esc(kicker)}</p>` : ""}
    ${s.title ? `<h1 class="t">${rich(s.title)}</h1>` : ""}
    ${s.body ? `<p class="b">${rich(s.body)}</p>` : ""}
  </div>
  <div class="foot"><span>${esc(spec.handle ?? "")}</span><span>${n} / ${slides.length}${n === 1 ? " &rarr;" : ""}</span></div>
</section>`;
};

const page = (body, title) => `<!doctype html>
<html><head><meta charset="utf-8"><title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Mono:wght@500&family=DM+Sans:wght@500;700&display=block" rel="stylesheet">
<style>${css}</style></head><body>
${body}
</body></html>
`;

const files = [];
slides.forEach((s, i) => {
  const name = `slide-${String(i + 1).padStart(2, "0")}.html`;
  writeFileSync(join(out, name), page(slideHtml(s, i), name));
  files.push(name);
});
writeFileSync(join(out, "deck.html"), page(slides.map(slideHtml).join("\n"), "deck"));
writeFileSync(join(out, "alt-text.txt"), slides.map((s, i) => `${i + 1}. ${s.alt ?? "(missing)"}`).join("\n") + "\n");

console.log(`${size.note}: ${slides.length} slides at ${size.w}x${size.h} → ${out}`);
for (const e of errors) console.log(`  error  ${e}`);
for (const w of warnings) console.log(`  check  ${w}`);

if (render && !errors.length) {
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
  const base = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--virtual-time-budget=4000"];
  for (const f of files) {
    const png = join(out, f.replace(/\.html$/, ".png"));
    spawnSync(chrome, [...base, `--window-size=${size.w},${size.h}`, `--screenshot=${png}`, pathToFileURL(join(out, f)).href], { stdio: "ignore" });
    console.log(existsSync(png) ? `  png    ${png}` : `  fail   ${png}`);
  }
  const pdf = join(out, "deck.pdf");
  spawnSync(chrome, [...base, "--no-pdf-header-footer", `--print-to-pdf=${pdf}`, pathToFileURL(join(out, "deck.html")).href], { stdio: "ignore" });
  console.log(existsSync(pdf) ? `  pdf    ${pdf}` : `  fail   ${pdf}`);
}
process.exit(errors.length ? 2 : 0);
