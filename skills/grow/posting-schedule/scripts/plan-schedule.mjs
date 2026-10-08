#!/usr/bin/env node
// plan-schedule.mjs — turn a posting-calendar CSV into a UTC schedule plan and check it against the
// @useclaudia/social rules (daily caps, link limits, duplicates, minimum gaps, price promises, TikTok coin content).
// It only PRINTS a plan. No network, no posting, no keys.
//
// Usage:
//   node scripts/plan-schedule.mjs templates/weekly-calendar.csv
//   node scripts/plan-schedule.mjs my-calendar.csv --json > plan.json      # machine-readable, scheduleAt in ms
//   node scripts/plan-schedule.mjs my-calendar.csv --now 2026-10-12T00:00:00Z
//
// CSV columns used (others are ignored): date (YYYY-MM-DD), time (HH:MM, 24 h), timezone (IANA, e.g. Europe/London),
// network, account, text, link, media, ad (yes/no). Node >= 20.

import fs from "node:fs";

const CAPS = { x: 10, linkedin: 5, youtube: 5, tiktok: 5, facebook: 10, pinterest: 10, farcaster: 20, instagram: 20,
  threads: 25, bluesky: 30, mastodon: 30, nostr: 30, telegram: 50, discord: 50, buffer: 10, zernio: 10, "upload-post": 10 };
const LINKS = { x: 3, linkedin: 3 };            // everything else 5
const MIN_GAP_MIN = { x: 60, tiktok: 180, instagram: 180, youtube: 240, threads: 60, linkedin: 240, telegram: 120,
  discord: 120, bluesky: 45, mastodon: 45, farcaster: 45, nostr: 45, pinterest: 60, facebook: 120 };
const X_COST = { post: 0.015, link: 0.2 };
const PROMISES = [/\b\d{2,4}x\b/i, /guaranteed/i, /can'?t lose/i, /risk[- ]free/i, /to the moon/i, /will (hit|reach) \$\d/i,
  /easy money/i, /\d+% (daily|a day|per day)/i, /will (pump|moon|double)/i];
const FINANCE = /(\$[A-Z]{2,10}\b|\btoken\b|\bcoin\b|\bmemecoin\b|\bpump\.fun\b|\bmint\b|\bcontract address\b|\bprice\b)/i;

function parseCsv(src) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '"' && src[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; continue; }
    if (c === '"') q = true; else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && src[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.some((x) => x.trim()));
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));
}

// Offset (ms) of an IANA zone at a UTC instant.
function offsetAt(tz, utcMs) {
  const f = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit",
    day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const p = Object.fromEntries(f.formatToParts(new Date(utcMs)).map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - utcMs;
}
// Local wall time → UTC ms, with DST gap/overlap detection.
function toUtc(date, time, tz) {
  const [y, mo, d] = date.split("-").map(Number); const [h, mi] = time.split(":").map(Number);
  if ([y, mo, d, h, mi].some(Number.isNaN)) throw new Error("bad date/time");
  const wall = Date.UTC(y, mo - 1, d, h, mi);
  const before = offsetAt(tz, wall - 432e5), after = offsetAt(tz, wall + 432e5);
  const valid = [...new Set([before, after])].map((o) => wall - o).filter((u) => u + offsetAt(tz, u) === wall).sort((m, n) => m - n);
  if (!valid.length) return { utc: wall - before, note: "DST gap: this local time does not exist; it lands one clock-change later" };
  return { utc: valid[0], note: valid.length > 1 ? "DST overlap: this local time happens twice; using the first" : "" };
}
const norm = (t) => t.toLowerCase().replace(/https?:\/\/\S+/g, "").replace(/[^\p{L}\p{N} ]/gu, "").replace(/\s+/g, " ").trim();

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
if (!file) { console.error("Usage: node plan-schedule.mjs <calendar.csv> [--json] [--now ISO]"); process.exit(2); }
const nowArg = args.includes("--now") ? Date.parse(args[args.indexOf("--now") + 1]) : Date.now();
const rows = parseCsv(fs.readFileSync(file, "utf8"));

const plan = [];
for (const [i, r] of rows.entries()) {
  const issues = [], notes = [];
  const network = (r.network || "").toLowerCase();
  if (!r.date || !r.time || !r.timezone || !network) { issues.push("missing date/time/timezone/network"); }
  let utc = NaN;
  try { const t = toUtc(r.date, r.time, r.timezone); utc = t.utc; if (t.note) notes.push(t.note); }
  catch { issues.push(`bad timezone '${r.timezone}' (use an IANA name like Europe/London)`); }
  if (utc < nowArg) issues.push("in the past: tick() would send it back to approval as 'Posting late?' if > 10 min late");
  const text = r.text || "";
  for (const re of PROMISES) if (re.test(text)) issues.push(`blocked phrase ${re} (price/return promise)`);
  if (FINANCE.test(text)) {
    notes.push("finance context: 'Not financial advice.' will be added");
    if (network === "tiktok") issues.push("TikTok: crypto promotion is removed; keep TikTok to education/news without tickers");
    if (network === "x" && (text.match(/\$[A-Z]{2,10}\b/g) || []).length > 1) issues.push("X API: max one $cashtag per post");
  }
  if (network === "x") notes.push(`X cost ≈ $${(r.link ? X_COST.link : X_COST.post).toFixed(3)}`);
  plan.push({ row: i + 2, ...r, network, account: r.account || network, utc, issues, notes });
}

// Rolling-window checks per account.
const byAcct = {};
for (const p of plan) if (!Number.isNaN(p.utc)) (byAcct[`${p.network}|${p.account}`] ??= []).push(p);
for (const [key, list] of Object.entries(byAcct)) {
  const [network] = key.split("|");
  list.sort((a, b) => a.utc - b.utc);
  list.forEach((p, idx) => {
    const win = list.filter((q) => q.utc > p.utc - 864e5 && q.utc <= p.utc);
    const cap = CAPS[network] ?? 10;
    if (win.length > cap) p.issues.push(`cap: ${win.length} posts in 24 h > ${cap} for ${network}`);
    const links = win.filter((q) => q.link).length; const lcap = LINKS[network] ?? 5;
    if (p.link && links > lcap) p.issues.push(`links: ${links} link posts in 24 h > ${lcap}`);
    const dup = win.find((q) => q !== p && q.text && norm(q.text) === norm(p.text));
    if (dup) p.issues.push(`near-duplicate of row ${dup.row} within 24 h (blocked)`);
    const prev = list[idx - 1]; const gap = MIN_GAP_MIN[network] ?? 60;
    if (prev && (p.utc - prev.utc) / 60000 < gap) p.notes.push(`only ${Math.round((p.utc - prev.utc) / 60000)} min after row ${prev.row} (suggested ≥ ${gap})`);
  });
}

plan.sort((a, b) => a.utc - b.utc);
if (args.includes("--json")) {
  console.log(JSON.stringify(plan.map((p) => ({ row: p.row, network: p.network, account: p.account,
    scheduleAt: p.utc, scheduleAtIso: new Date(p.utc).toISOString(), text: p.text, link: p.link || undefined, media: p.media || undefined,
    labels: { ai: true, ad: /^y(es)?$/i.test(p.ad || "") }, issues: p.issues, notes: p.notes })), null, 2));
} else {
  let xCost = 0, bad = 0;
  for (const p of plan) {
    if (p.network === "x") xCost += p.link ? X_COST.link : X_COST.post;
    const when = Number.isNaN(p.utc) ? "invalid".padEnd(17) : new Date(p.utc).toISOString().slice(0, 16).replace("T", " ") + "Z";
    console.log(`${p.issues.length ? "✗" : "✓"} row ${String(p.row).padStart(3)}  ${when}  ${`${p.date} ${p.time} ${p.timezone}`.padEnd(34)} ${p.network.padEnd(9)} ${(p.text || "").slice(0, 48)}`);
    for (const m of p.issues) console.log(`      ✗ ${m}`);
    for (const m of p.notes) console.log(`      · ${m}`);
    if (p.issues.length) bad++;
  }
  console.log(`\n${plan.length} posts · ${bad} with problems · X API cost ≈ $${xCost.toFixed(2)} (pay-per-use, checked 2026-10)`);
  console.log("Next: fix the ✗ rows, then draft each with scheduleAt and send them for approval (see SKILL.md step 6).");
  process.exit(bad ? 1 : 0);
}
