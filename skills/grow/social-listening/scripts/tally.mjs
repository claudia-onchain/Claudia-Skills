#!/usr/bin/env node
// Weekly numbers from a social-listening mention log (templates/mention-log.csv).
// Node >= 20, no dependencies, no network. Reads one local CSV file.
//
//   node scripts/tally.mjs mention-log.csv                      last 7 days up to the newest date in the file
//   node scripts/tally.mjs mention-log.csv --from 2026-10-05 --to 2026-10-11
//   node scripts/tally.mjs mention-log.csv --json
//
// Rows coded "n/a" (false positives) are counted separately and left out of every other number.
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const file = args.find((a, i) => !a.startsWith("--") && !["--from", "--to"].includes(args[i - 1]));
if (!file) {
  console.error("Usage: node scripts/tally.mjs <mention-log.csv> [--from YYYY-MM-DD] [--to YYYY-MM-DD] [--json]");
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((f) => f.trim() !== "")) rows.push(row);
      row = [];
    } else field += ch;
  }
  row.push(field);
  if (row.some((f) => f.trim() !== "")) rows.push(row);
  const [head, ...body] = rows;
  const keys = head.map((h) => h.trim());
  return body.map((r) => Object.fromEntries(keys.map((k, j) => [k, (r[j] ?? "").trim()])));
}

const DAY = 864e5;
const all = parseCsv(readFileSync(file, "utf8")).filter((r) => /^\d{4}-\d{2}-\d{2}$/.test(r.date));
if (!all.length) {
  console.error("No dated rows found. Is this the mention-log.csv format?");
  process.exit(1);
}
const newest = all.map((r) => r.date).sort().at(-1);
const to = flag("--to") ?? newest;
const from = flag("--from") ?? new Date(Date.parse(to) - 6 * DAY).toISOString().slice(0, 10);
const span = Math.round((Date.parse(to) - Date.parse(from)) / DAY) + 1;
const prevTo = new Date(Date.parse(from) - DAY).toISOString().slice(0, 10);
const prevFrom = new Date(Date.parse(prevTo) - (span - 1) * DAY).toISOString().slice(0, 10);

const inRange = (a, b) => all.filter((r) => r.date >= a && r.date <= b);
const count = (rows, key) => {
  const m = {};
  for (const r of rows) { const k = r[key] || "(blank)"; m[k] = (m[k] ?? 0) + 1; }
  return Object.fromEntries(Object.entries(m).sort((x, y) => y[1] - x[1]));
};

function summarise(rows) {
  const na = rows.filter((r) => r.sentiment === "n/a").length;
  const coded = rows.filter((r) => r.sentiment && r.sentiment !== "n/a");
  const s = count(coded, "sentiment");
  const pos = s.positive ?? 0, neg = s.negative ?? 0;
  const net = coded.length ? (pos - neg) / coded.length : null;
  const sovRows = coded.filter((r) => ["brand", "ticker", "competitor"].includes(r.query_group));
  const bySubject = count(sovRows, "subject");
  const sov = Object.fromEntries(Object.entries(bySubject).map(([k, v]) => [k, +(v / sovRows.length * 100).toFixed(1)]));
  return {
    mentions: coded.length,
    falsePositives: na,
    sentiment: s,
    netSentiment: net === null ? null : +net.toFixed(2),
    bySource: count(coded, "source"),
    byQueryGroup: count(coded, "query_group"),
    shareOfVoicePct: sov,
    topTopics: Object.fromEntries(Object.entries(count(coded, "topic")).slice(0, 5)),
    intents: count(coded, "intent"),
    openActions: coded.filter((r) => r.action && r.action !== "none" && r.status !== "done").length,
    unchecked: coded.filter((r) => ["negative"].includes(r.sentiment) || ["complaint", "bug", "scam-or-impersonation"].includes(r.intent))
      .filter((r) => !r.checked_by || /agent/i.test(r.checked_by)).length,
  };
}

const cur = summarise(inRange(from, to));
const prevRows = inRange(prevFrom, prevTo);
const prev = prevRows.length ? summarise(prevRows) : null;
const out = { window: { from, to }, previous: prev ? { from: prevFrom, to: prevTo } : null, current: cur, prev };

if (args.includes("--json")) {
  console.log(JSON.stringify(out, null, 2));
  process.exit(0);
}

const fmt = (o) => Object.entries(o).map(([k, v]) => `${k} ${v}`).join(" · ") || "none";
const delta = (a, b) => (b === undefined || b === null ? "" : ` (prev ${b})`);
console.log(`Listening tally · ${from} to ${to}${prev ? ` · compared with ${prevFrom} to ${prevTo}` : ""}`);
console.log(`Mentions (coded): ${cur.mentions}${delta(cur.mentions, prev?.mentions)} · false positives excluded: ${cur.falsePositives}`);
console.log(`Net sentiment: ${cur.netSentiment ?? "n/a"}${delta(cur.netSentiment, prev?.netSentiment)} · ${fmt(cur.sentiment)}`);
console.log(`By source: ${fmt(cur.bySource)}`);
console.log(`By query group: ${fmt(cur.byQueryGroup)}`);
console.log(`Share of voice %: ${fmt(cur.shareOfVoicePct)}`);
console.log(`Top topics: ${fmt(cur.topTopics)}`);
console.log(`Intents: ${fmt(cur.intents)}`);
console.log(`Open actions: ${cur.openActions}`);
if (cur.unchecked) console.log(`Needs a person: ${cur.unchecked} negative / complaint / bug / scam rows not checked by a person yet`);
// Spike rule: negatives this period > 2x the median of the 4 periods before it, with at least 10 negatives.
const negNow = cur.sentiment.negative ?? 0;
const priorNeg = [1, 2, 3, 4].map((k) => {
  const b = new Date(Date.parse(from) - ((k - 1) * span + 1) * DAY).toISOString().slice(0, 10);
  const a = new Date(Date.parse(b) - (span - 1) * DAY).toISOString().slice(0, 10);
  return inRange(a, b).filter((r) => r.sentiment === "negative").length;
}).sort((x, y) => x - y);
const median = (priorNeg[1] + priorNeg[2]) / 2;
if (negNow >= 10 && negNow > 2 * median) console.log(`Spike: ${negNow} negatives vs a 4-period median of ${median}. Read the rows; alert the operator if it is one live event.`);
else if (negNow > 0 && negNow < 10) console.log(`Negatives: ${negNow} (under 10, read them all rather than applying the spike rule)`);
