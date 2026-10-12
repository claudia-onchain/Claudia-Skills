#!/usr/bin/env node
// check-print-png.mjs — pre-flight a PNG print file for print-on-demand (DTG tees, hoodies, stickers, prints).
// Reports canvas size, the design's real bounding box, the DPI it will print at for a given print width,
// transparency (fully clear / semi-transparent / opaque pixels) and colour-profile chunks. Optionally writes a copy
// with every semi-transparent pixel snapped to fully clear or fully opaque (DTG prints a white underbase under
// semi-transparent pixels, which shows up as a faint box or halo).
// Node >= 20, no dependencies, no network. Reads only the file you pass.
//
//   --width-in = the width of the print area the whole canvas fills (Printful standard tee 12, Printify 4500 px canvas 15)
//   node check-print-png.mjs design.png --width-in 12 --min-dpi 150
//   node check-print-png.mjs design.png --width-in 15 --min-dpi 300 --fix-alpha design-hard.png [--threshold 128]
//
// Exit codes: 0 all checks pass · 3 at least one check failed · 2 usage or unsupported file · 1 other error
import { readFileSync, writeFileSync } from "node:fs";
import { inflateSync, deflateSync } from "node:zlib";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--") && !/^\d/.test(a));
const opt = {};
for (let i = 0; i < args.length; i++) if (args[i].startsWith("--")) opt[args[i].slice(2)] = args[i + 1] && !args[i + 1].startsWith("--") ? args[++i] : "true";
if (!file || file === opt["fix-alpha"]) {
  console.error("usage: node check-print-png.mjs <design.png> [--width-in 12] [--min-dpi 150] [--fix-alpha out.png] [--threshold 128]");
  process.exit(2);
}
const widthIn = Number(opt["width-in"] ?? 12);
const minDpi = Number(opt["min-dpi"] ?? 150);
const threshold = Number(opt.threshold ?? 128);

const buf = readFileSync(file);
const SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
if (!buf.subarray(0, 8).equals(SIG)) { console.error(`${file}: not a PNG`); process.exit(2); }

let ihdr, plte, trns, phys, idat = [], colourChunks = [];
for (let p = 8; p < buf.length; ) {
  const len = buf.readUInt32BE(p);
  const type = buf.toString("latin1", p + 4, p + 8);
  const data = buf.subarray(p + 8, p + 8 + len);
  if (type === "IHDR") ihdr = { w: data.readUInt32BE(0), h: data.readUInt32BE(4), depth: data[8], ct: data[9], interlace: data[12] };
  else if (type === "PLTE") plte = data;
  else if (type === "tRNS") trns = data;
  else if (type === "pHYs") phys = { x: data.readUInt32BE(0), unit: data[8] };
  else if (type === "IDAT") idat.push(data);
  else if (["sRGB", "iCCP", "gAMA", "cHRM"].includes(type)) colourChunks.push(type === "iCCP" ? `iCCP (${data.toString("latin1", 0, data.indexOf(0))})` : type);
  if (type === "IEND") break;
  p += 12 + len;
}
if (!ihdr) { console.error("no IHDR chunk"); process.exit(2); }
if (ihdr.interlace) { console.error("interlaced PNG: re-export without interlacing (Adobe: 'None'; most tools default to none)"); process.exit(2); }
const CH = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[ihdr.ct];
if (!CH || ![8, 16].includes(ihdr.depth) && !(ihdr.ct === 3 && ihdr.depth <= 8)) {
  console.error(`unsupported PNG (colour type ${ihdr.ct}, bit depth ${ihdr.depth}); export as 8-bit RGBA ("PNG-24 with transparency")`);
  process.exit(2);
}

// --- decode to 8-bit RGBA -------------------------------------------------------------------------------------
const raw = inflateSync(Buffer.concat(idat));
const bitsPP = CH * ihdr.depth;
const stride = Math.ceil((ihdr.w * bitsPP) / 8);
const bpp = Math.max(1, bitsPP >> 3);
const rgba = Buffer.alloc(ihdr.w * ihdr.h * 4);
let prev = Buffer.alloc(stride);
for (let y = 0; y < ihdr.h; y++) {
  const off = y * (stride + 1);
  const ft = raw[off];
  const line = Buffer.from(raw.subarray(off + 1, off + 1 + stride));
  for (let i = 0; i < stride; i++) {
    const a = i >= bpp ? line[i - bpp] : 0, b = prev[i], c = i >= bpp ? prev[i - bpp] : 0;
    let v = line[i];
    if (ft === 1) v += a;
    else if (ft === 2) v += b;
    else if (ft === 3) v += (a + b) >> 1;
    else if (ft === 4) { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
    line[i] = v & 255;
  }
  for (let x = 0; x < ihdr.w; x++) {
    const o = (y * ihdr.w + x) * 4;
    const s = (k) => (ihdr.depth === 16 ? line[(x * CH + k) * 2] : line[x * CH + k]);
    if (ihdr.ct === 6) { rgba[o] = s(0); rgba[o + 1] = s(1); rgba[o + 2] = s(2); rgba[o + 3] = s(3); }
    else if (ihdr.ct === 2) { rgba[o] = s(0); rgba[o + 1] = s(1); rgba[o + 2] = s(2); rgba[o + 3] = 255; }
    else if (ihdr.ct === 4) { rgba[o] = rgba[o + 1] = rgba[o + 2] = s(0); rgba[o + 3] = s(1); }
    else if (ihdr.ct === 0) { rgba[o] = rgba[o + 1] = rgba[o + 2] = s(0); rgba[o + 3] = 255; }
    else { // palette
      const bit = x * ihdr.depth, idx = (line[bit >> 3] >> (8 - ihdr.depth - (bit & 7))) & ((1 << ihdr.depth) - 1);
      rgba[o] = plte[idx * 3]; rgba[o + 1] = plte[idx * 3 + 1]; rgba[o + 2] = plte[idx * 3 + 2]; rgba[o + 3] = trns && idx < trns.length ? trns[idx] : 255;
    }
  }
  prev = line;
}

// --- measure ---------------------------------------------------------------------------------------------------
let clear = 0, semi = 0, opaque = 0, x0 = ihdr.w, y0 = ihdr.h, x1 = -1, y1 = -1;
for (let y = 0; y < ihdr.h; y++) for (let x = 0; x < ihdr.w; x++) {
  const a = rgba[(y * ihdr.w + x) * 4 + 3];
  if (a === 0) { clear++; continue; }
  a === 255 ? opaque++ : semi++;
  if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
}
const total = ihdr.w * ihdr.h;
const pct = (n) => `${((n / total) * 100).toFixed(2)}%`;
const bw = x1 >= 0 ? x1 - x0 + 1 : 0, bh = y1 >= 0 ? y1 - y0 + 1 : 0;
const tagDpi = phys && phys.unit === 1 ? Math.round(phys.x * 0.0254) : null;
const canvasDpi = ihdr.w / widthIn;
const inch = (px) => (px / canvasDpi).toFixed(2);
const touches = bw > 0 && (x0 === 0 || y0 === 0 || x1 === ihdr.w - 1 || y1 === ihdr.h - 1);
const fails = [];
const row = (ok, label, detail) => { console.log(`${ok === null ? "info" : ok === "warn" ? "warn" : ok ? " ok " : "FAIL"}  ${label.padEnd(26)} ${detail}`); if (ok === false) fails.push(label); };

console.log(`${file}`);
row(null, "canvas", `${ihdr.w} × ${ihdr.h} px, ${ihdr.depth}-bit, colour type ${ihdr.ct}${ihdr.ct === 6 || ihdr.ct === 4 || trns ? " (has alpha)" : " (no alpha)"}`);
row(null, "DPI tag in file", tagDpi ? `${tagDpi} (the tag alone changes nothing; pixels count)` : "none (fine; pixels count)");
row(canvasDpi >= minDpi, `canvas at ${widthIn} in wide`, `${Math.round(canvasDpi)} DPI (need ≥ ${minDpi})`);
row(bw === 0 ? false : touches ? "warn" : null, "artwork box", bw
  ? `${bw} × ${bh} px at x ${x0}, y ${y0} → prints about ${inch(bw)} × ${inch(bh)} in${touches ? "; touches the canvas edge (check nothing is meant to be cut off)" : ""}`
  : "image is fully transparent");
row(ihdr.ct === 6 || ihdr.ct === 4 || !!trns, "transparent background", clear ? `${pct(clear)} of pixels fully clear` : "no clear pixels: the background will print as a rectangle");
// A thin ring of anti-aliased edge pixels is normal; soft shadows, glows and faded areas are not.
const semiShare = semi / Math.max(1, semi + opaque);
row(semi === 0 ? true : semiShare < 0.02 ? "warn" : false, "semi-transparent pixels",
  semi === 0 ? "none" : `${semi} (${(semiShare * 100).toFixed(2)}% of the artwork) — ${semiShare < 0.02 ? "edge anti-aliasing only; usually fine, --fix-alpha makes edges crisp" : "soft glows, shadows or fades: DTG prints a white underbase under them; redesign or use --fix-alpha"}`);
row(null, "colour chunks", colourChunks.length ? colourChunks.join(", ") : "none (most tools treat untagged PNG as sRGB)");
row(null, "file size", `${(buf.length / 1024 / 1024).toFixed(2)} MB`);

if (opt["fix-alpha"]) {
  const out = Buffer.from(rgba);
  let changed = 0;
  for (let i = 3; i < out.length; i += 4) if (out[i] !== 0 && out[i] !== 255) { out[i] = out[i] >= threshold ? 255 : 0; changed++; }
  const rows = Buffer.alloc((ihdr.w * 4 + 1) * ihdr.h);
  for (let y = 0; y < ihdr.h; y++) out.copy(rows, y * (ihdr.w * 4 + 1) + 1, y * ihdr.w * 4, (y + 1) * ihdr.w * 4);
  const CRC = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
  const crc = (b) => { let c = -1; for (const v of b) c = CRC[(c ^ v) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
  const chunk = (type, data) => { const t = Buffer.from(type, "latin1"), l = Buffer.alloc(4), c = Buffer.alloc(4); l.writeUInt32BE(data.length); c.writeUInt32BE(crc(Buffer.concat([t, data]))); return Buffer.concat([l, t, data, c]); };
  const hdr = Buffer.alloc(13); hdr.writeUInt32BE(ihdr.w, 0); hdr.writeUInt32BE(ihdr.h, 4); hdr[8] = 8; hdr[9] = 6;
  const parts = [SIG, chunk("IHDR", hdr), chunk("sRGB", Buffer.from([0]))];
  if (phys) { const ph = Buffer.alloc(9); ph.writeUInt32BE(phys.x, 0); ph.writeUInt32BE(phys.x, 4); ph[8] = phys.unit; parts.push(chunk("pHYs", ph)); }
  parts.push(chunk("IDAT", deflateSync(rows, { level: 9 })), chunk("IEND", Buffer.alloc(0)));
  writeFileSync(opt["fix-alpha"], Buffer.concat(parts));
  console.log(`\nwrote ${opt["fix-alpha"]}: ${changed} semi-transparent pixels snapped (alpha ≥ ${threshold} → opaque, else clear), tagged sRGB.`);
  console.log(`check it: node check-print-png.mjs ${opt["fix-alpha"]} --width-in ${widthIn} --min-dpi ${minDpi} (and look at it: hard edges can show stair-steps on curves)`);
}

console.log(fails.length ? `\n${fails.length} check(s) failed on ${file}: ${fails.join("; ")}` : "\nall checks passed — still order a sample before selling");
process.exit(fails.length ? 3 : 0);
