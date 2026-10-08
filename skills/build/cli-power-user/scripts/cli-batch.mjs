#!/usr/bin/env node
// cli-batch.mjs — run `claudia insights <coin> --json` for a short watchlist, politely spaced, and print one CSV row per
// coin (scores, grades, wallet mix, data age). Read-only research; not financial advice.
//
// Setup:  npm i -g @useclaudia/cli          (or pass --bin /path/to/cli.js)
// Usage:  node cli-batch.mjs <coin> [<coin> …] [--file watchlist.csv] [--gap 3] [--bin claudia] [--home <dir>]
//         coin = mint, sol:<mint> or claudia. watchlist.csv: first column is the coin, a header row is skipped.
//
// Network: whatever `claudia insights` does — public GETs to useclaudia.xyz (insights, scores, dev). No keys are read
//          unless your CLI home has them, and nothing is ever posted, signed or spent.
// Limits: at most 25 coins per run, at least 2 s between coins, so a batch can't drain the shared data budget.
// Exit codes: 0 all rows ok · 1 some rows failed · 2 bad usage · 5 stopped on a rate limit.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const valueFlags = new Set(["--file", "--gap", "--bin", "--home"]);
if (argv.includes("--help")) {
  console.log("Usage: node cli-batch.mjs <coin> [<coin> …] [--file watchlist.csv] [--gap 3] [--bin claudia] [--home <dir>]");
  process.exit(0);
}
let coins = argv.filter((a, i) => !a.startsWith("--") && !valueFlags.has(argv[i - 1]));
if (flag("--file")) {
  const rows = readFileSync(flag("--file"), "utf8").split(/\r?\n/).map((l) => l.split(",")[0].trim()).filter(Boolean);
  coins.push(...rows.filter((r) => !/^(coin|mint|key)$/i.test(r) && !r.startsWith("#")));
}
coins = [...new Set(coins)];
if (!coins.length) { console.error("Give at least one coin (mint, sol:<mint> or claudia), or --file watchlist.csv"); process.exit(2); }
if (coins.length > 25) { console.error(`${coins.length} coins: keep batches to 25 or fewer (shared data budget).`); process.exit(2); }
const gapMs = Math.max(2, Number(flag("--gap", 3)) || 3) * 1000;
const bin = flag("--bin", "claudia");
const home = flag("--home");

const cmd = bin.endsWith(".js") ? process.execPath : bin;
const pre = bin.endsWith(".js") ? [bin] : [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const csv = (v) => (v === null || v === undefined ? "" : /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
const r1 = (x) => (typeof x === "number" ? Math.round(x * 10) / 10 : null);

console.log(["coin", "key", "symbol", "mcap_usd", "holders", "safety", "safety_grade", "holder_score", "holder_grade", "chart", "chart_grade", "dev_total", "top10_pct", "bundlers_pct", "snipers_pct", "fresh_pct", "age_sec", "partial", "error"].join(","));
let failed = 0;
for (const [i, coin] of coins.entries()) {
  if (i) await sleep(gapMs);
  const args = [...pre, "insights", coin, "--json", ...(home ? ["--home", home] : [])];
  const p = spawnSync(cmd, args, { encoding: "utf8", timeout: 60_000 });
  let j = null;
  try { j = JSON.parse((p.stdout || "").trim().split("\n").pop() || "null"); } catch { j = null; }
  if (!j || !j.ok) {
    failed++;
    console.log([coin, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", j?.error ?? p.error?.code ?? `exit ${p.status}`].map(csv).join(","));
    if (p.status === 5) { console.error("Rate limited — stopping the batch. Try again in a few minutes."); process.exit(5); }
    continue;
  }
  const st = j.insights?.stats ?? {};
  const sc = j.scores ?? {};
  const updated = Math.max(j.insights?.updatedAt ?? 0, sc.updatedAt ?? 0);
  console.log([
    coin, j.key, j.insights?.symbol, r1(st.mcapUsd), st.holders,
    sc.safety?.value, sc.safety?.grade, sc.holders?.value, sc.holders?.grade, sc.chart?.value, sc.chart?.grade,
    j.dev?.total?.value ?? "", r1((st.top10Pct ?? NaN) * 100), r1((st.bundlersPct ?? NaN) * 100), r1((st.snipersPct ?? NaN) * 100), r1((st.freshPct ?? NaN) * 100),
    updated ? Math.round((Date.now() - updated) / 1000) : "", j.insights?.partial ?? sc.partial ?? "", "",
  ].map((v) => (Number.isNaN(v) ? "" : v)).map(csv).join(","));
}
process.exit(failed ? 1 : 0);
