#!/usr/bin/env node
// Totals a revenue mix plan CSV (templates/revenue-mix-plan.csv format).
// Usage: node scripts/revenue-mix.mjs <plan.csv>
// Node >= 20, no dependencies, no network. Reads one local file and prints a summary.
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/revenue-mix.mjs <revenue-mix-plan.csv>");
  process.exit(2);
}

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

let rows;
try {
  rows = parseCsv(readFileSync(file, "utf8"));
} catch (e) {
  console.error(`Can't read ${file}: ${e.message}`);
  process.exit(1);
}
const [header, ...data] = rows;
const col = (name) => {
  const i = header.indexOf(name);
  if (i < 0) { console.error(`Missing column "${name}" in ${file}`); process.exit(2); }
  return i;
};
const C = {
  stream: col("stream"), type: col("type"), eligible: col("eligible_now"), hours: col("hours_per_month"),
  low: col("low_monthly_usd"), high: col("high_monthly_usd"), actual: col("actual_last_month_usd"), confidence: col("confidence"),
};
const num = (v) => { const n = Number(String(v).replace(/[$,\s]/g, "")); return Number.isFinite(n) ? n : 0; };

let low = 0, high = 0, actual = 0, hours = 0, costLow = 0, costActual = 0;
const streams = [];
const warnings = [];
for (const r of data) {
  if (r[C.type] === "cost") { costLow += num(r[C.low]); costActual += num(r[C.actual]); continue; }
  const s = { name: r[C.stream], low: num(r[C.low]), high: num(r[C.high]), actual: num(r[C.actual]), hours: num(r[C.hours]), eligible: r[C.eligible] };
  if (s.eligible !== "yes" && s.low > 0) warnings.push(`"${s.name}" is not eligible now but has a low estimate of $${s.low}; plan it at $0 until eligible.`);
  if (r[C.confidence] === "low" && s.low > 0.3 * s.high && s.high > 0) warnings.push(`"${s.name}" has low confidence; consider a lower low estimate.`);
  streams.push(s);
  low += s.eligible === "yes" ? s.low : 0; high += s.high; actual += s.actual; hours += s.hours;
}
const fmt = (n) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const basis = actual > 0 ? "actual" : "low";
const total = actual > 0 ? actual : low;
const top = streams.map((s) => ({ name: s.name, v: actual > 0 ? s.actual : (s.eligible === "yes" ? s.low : 0) })).sort((a, b) => b.v - a.v)[0];
const share = total > 0 && top ? Math.round((top.v / total) * 100) : 0;

const line = (label, value) => console.log(`  ${label.padEnd(19)}${value}`);
console.log(`Revenue mix — ${file}`);
line("Streams", streams.length);
line("Planned per month", `low ${fmt(low)} (eligible streams only) · high ${fmt(high)}`);
line("Actual last month", fmt(actual));
line("Hours per month", hours);
line("Costs per month", `${fmt(costLow)}${costActual ? ` (actual ${fmt(costActual)})` : ""}`);
line(`Net (${basis})`, fmt(total - (costActual || costLow)));
if (top) line("Largest stream", `${top.name}: ${share}% of ${basis}`);
if (hours > 0) line(`Per hour (${basis})`, fmt(total / hours));
if (share > 50) warnings.push(`One stream is ${share}% of income. Aim for no stream above 50% after month 6.`);
if (total < (costActual || costLow)) warnings.push("Income is below costs: the account doesn't break even yet.");
for (const w of warnings) console.log(`  ! ${w}`);
