#!/usr/bin/env node
// contrast.mjs — WCAG 2.2 contrast ratio for text colour on background colour, with AA/AAA verdicts.
// Node >= 20, no dependencies, no network.
//
//   node contrast.mjs <text-hex> <bg-hex>                  e.g. node contrast.mjs "#ece9e2" "#0a0b0d"
//   node contrast.mjs <text-hex> <bg-hex> --px 40 --bold    judge at a size on a 1080 px canvas
//   node contrast.mjs --palette                             check the Claudia palette pairs
//
// Size note: WCAG "large text" is 18 pt (24 CSS px) regular or 14 pt (about 18.7 CSS px) bold, as seen on screen.
// A 1080 px wide card shown on a phone about 390 px wide is scaled to roughly 0.36, so --px converts canvas pixels
// to on-screen pixels before deciding which threshold applies. Exit 0 when AA passes, 2 when it fails, 1 on bad input.

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const SCREEN_SCALE = Number(opt("--scale") ?? 390 / 1080);

function lum(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) throw new Error(`not a 6-digit hex colour: ${hex}`);
  const c = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
export function ratio(fg, bg) {
  const a = lum(fg);
  const b = lum(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function judge(fg, bg, px, bold) {
  const r = ratio(fg, bg);
  const screenPx = px ? px * SCREEN_SCALE : undefined;
  const large = screenPx ? screenPx >= 24 || (bold && screenPx >= 18.66) : undefined;
  const aaNormal = r >= 4.5;
  const aaLarge = r >= 3;
  const aaaNormal = r >= 7;
  const aaaLarge = r >= 4.5;
  const aa = large === undefined ? aaNormal : large ? aaLarge : aaNormal;
  const size = screenPx ? ` · ${px}px on canvas ≈ ${screenPx.toFixed(1)}px on screen (${large ? "large" : "normal"} text)` : "";
  console.log(`${fg} on ${bg}: ${r.toFixed(2)}:1${size}`);
  console.log(`  AA normal ${aaNormal ? "pass" : "fail"} · AA large ${aaLarge ? "pass" : "fail"} · AAA normal ${aaaNormal ? "pass" : "fail"} · AAA large ${aaaLarge ? "pass" : "fail"}`);
  if (screenPx && screenPx < 14) console.log("  warning: under ~14px on screen; most people will squint whatever the contrast");
  return aa;
}

try {
  if (args.includes("--palette")) {
    const pairs = [
      ["#ece9e2", "#0a0b0d", "off-white ink on near-black"],
      ["#ff6fa5", "#0a0b0d", "rose accent on near-black"],
      ["#80858c", "#0a0b0d", "muted label on near-black"],
      ["#ff9a6b", "#0a0b0d", "peach on near-black"],
      ["#ece9e2", "#1f3a8a", "off-white on cobalt"],
      ["#0a0b0d", "#c9ccd3", "near-black on silver"],
      ["#ece9e2", "#d63a76", "off-white on rose fill"],
      ["#ff6fa5", "#ece9e2", "rose on off-white"],
    ];
    for (const [fg, bg, name] of pairs) {
      console.log(`\n${name}`);
      judge(fg, bg);
    }
    process.exit(0);
  }
  const [fg, bg] = args.filter((a, i) => !a.startsWith("--") && !["--px", "--scale"].includes(args[i - 1]));
  if (!fg || !bg) {
    console.error('usage: node contrast.mjs "#text" "#background" [--px <canvas px>] [--bold] [--scale 0.36] | --palette');
    process.exit(1);
  }
  const px = opt("--px") ? Number(opt("--px")) : undefined;
  process.exit(judge(fg, bg, px, args.includes("--bold")) ? 0 : 2);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
