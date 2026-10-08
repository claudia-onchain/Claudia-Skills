#!/usr/bin/env node
// Recompute trend scores from a trend log CSV and print the go / adapt / skip lists.
// Usage: node scripts/score-trends.mjs templates/trend-log.csv [--go 12] [--adapt 8]
// Node >= 20. Reads a local file only. No network, no secrets.
import fs from "node:fs";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
if (!file) {
  console.error("Usage: node scripts/score-trends.mjs <trend-log.csv> [--go 12] [--adapt 8]");
  process.exit(2);
}
const flag = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? Number(args[i + 1]) : dflt;
};
const GO = flag("go", 12);
const ADAPT = flag("adapt", 8);

// Minimal CSV parser: handles quoted fields with commas and doubled quotes.
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((f) => f.trim() !== ""));
}

let text;
try {
  text = fs.readFileSync(file, "utf8");
} catch (e) {
  console.error(`Can't read ${file}: ${e.message}`);
  process.exit(1);
}
const [header, ...rows] = parseCsv(text);
const col = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
for (const need of ["trend", "fit", "velocity", "window", "effort"]) {
  if (!(need in col)) {
    console.error(`Missing column '${need}'. Header: ${header.join(", ")}`);
    process.exit(2);
  }
}

const num = (v) => (v === undefined || v.trim() === "" ? NaN : Number(v));
const out = { go: [], adapt: [], skip: [], gated: [], incomplete: [] };
for (const r of rows) {
  const name = r[col.trend];
  const gate = col.gate_failed !== undefined ? (r[col.gate_failed] || "").trim() : "";
  if (gate) { out.gated.push(`${name} (gate ${gate})`); continue; }
  const [fit, vel, win, eff] = ["fit", "velocity", "window", "effort"].map((k) => num(r[col[k]]));
  if ([fit, vel, win, eff].some(Number.isNaN)) { out.incomplete.push(name); continue; }
  const bad = [fit, vel, win, eff].some((v) => v < 0 || v > 5);
  if (bad) { out.incomplete.push(`${name} (values must be 0-5)`); continue; }
  const score = 2 * fit + vel + win - eff;
  const line = `${String(score).padStart(3)}  ${name}  [fit ${fit} vel ${vel} win ${win} eff ${eff}]`;
  if (score >= GO) out.go.push([score, line]);
  else if (score >= ADAPT) out.adapt.push([score, line]);
  else out.skip.push([score, line]);
}
const show = (title, list) => {
  console.log(`\n${title} (${list.length})`);
  for (const item of list) console.log(`  ${Array.isArray(item) ? item[1] : item}`);
};
for (const k of ["go", "adapt", "skip"]) out[k].sort((a, b) => b[0] - a[0]);
show(`GO  (score >= ${GO})`, out.go);
show(`ADAPT / HOLD  (${ADAPT}-${GO - 1})`, out.adapt);
show(`SKIP  (< ${ADAPT})`, out.skip);
show("GATED (red gate failed, never posted)", out.gated);
if (out.incomplete.length) show("INCOMPLETE (fill in scores)", out.incomplete);
console.log("\nReminder: gates beat scores. A person approves each brief before production.");
