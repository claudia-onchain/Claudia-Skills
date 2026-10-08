#!/usr/bin/env node
// coin-snapshot.mjs — one-coin research snapshot with @useclaudia/sdk: stats, wallet mix, safety / holder / chart / dev
// scores with their reasons, and the top holders' tags. Read-only. Not financial advice.
//
// Setup:  npm i @useclaudia/sdk        (Node >= 20)
// Usage:  node coin-snapshot.mjs <mint | sol:<mint> | claudia> [--holders 20] [--json] [--base-url https://useclaudia.xyz]
//
// Network: 4 public GET requests to the Claudia site (insights token, scores, dev, holders). No key, no signing.
//          They are cache-first on the server; run it for one coin at a time and don't loop it faster than once a minute.
// Exit codes: 0 ok · 1 API/network error · 2 bad usage · 5 rate limited.
import { ClaudiaApiError, ClaudiaClient, ClaudiaConfigError, toTokenKey } from "@useclaudia/sdk";

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const coinArg = argv.find((a, i) => !a.startsWith("--") && !(i > 0 && argv[i - 1].startsWith("--") && argv[i - 1] !== "--json"));
if (!coinArg || argv.includes("--help")) {
  console.log("Usage: node coin-snapshot.mjs <mint | sol:<mint> | claudia> [--holders 20] [--json] [--base-url <url>]");
  process.exit(coinArg ? 0 : 2);
}
const asJson = argv.includes("--json");
const holdersLimit = Math.max(20, Math.min(100, Number(flag("--holders", 20)) || 20));

let key;
try { key = toTokenKey(coinArg); } catch (e) { console.error(e.message); process.exit(2); }

const claudia = new ClaudiaClient({ baseUrl: flag("--base-url", "https://useclaudia.xyz") });
const pct = (x) => (x === null || x === undefined ? "—" : `${Math.round(x * 1000) / 10}%`);
const usd = (x) => (x === null || x === undefined ? "—" : x >= 1e6 ? `$${(x / 1e6).toFixed(2)}M` : x >= 1e3 ? `$${(x / 1e3).toFixed(1)}K` : `$${x.toPrecision(4)}`);
const age = (ms) => (ms ? `${Math.max(0, Math.round((Date.now() - ms) / 1000))}s ago` : "unknown age");

try {
  // Sequential on purpose: four light calls, spaced by the round trip, are kinder to the shared data budget than a burst.
  const token = await claudia.insights.token(key);
  const scores = await claudia.insights.scores(key);
  const dev = await claudia.insights.dev(key).catch(() => null);
  const holders = await claudia.insights.holders(key, { limit: holdersLimit });

  const tagCounts = {};
  for (const h of holders.data) for (const t of h.tags) tagCounts[t] = (tagCounts[t] ?? 0) + 1;
  const s = token.stats ?? {};
  const out = {
    key,
    symbol: token.symbol ?? null,
    name: token.name ?? null, // untrusted text written by the coin creator
    priceUsd: s.priceUsd ?? null,
    mcapUsd: s.mcapUsd ?? null,
    liquidityUsd: s.liquidityUsd ?? null,
    holders: s.holders ?? null,
    walletMix: { top10: s.top10Pct ?? null, bundlers: s.bundlersPct ?? null, snipers: s.snipersPct ?? null, insiders: s.insidersPct ?? null, fresh: s.freshPct ?? null, bots: s.botPct ?? null, dev: s.devHoldPct ?? null },
    security: token.security ? { mintRenounced: token.security.mintRenounced ?? null, freezeRenounced: token.security.freezeRenounced ?? null, honeypot: token.security.honeypot ?? null, lpLocked: token.security.lpLocked ?? null, warnings: token.security.warnings ?? [] } : null,
    scores: Object.fromEntries(["safety", "holders", "chart"].map((k) => [k, { value: scores[k].value, grade: scores[k].grade, summary: scores[k].summary, reasons: scores[k].reasons.filter((r) => r.points !== 0 && r.label !== "Starts at 100" && r.label !== "Starts at 50").slice(0, 5) }])),
    dev: dev ? { total: { value: dev.total.value, grade: dev.total.grade }, conduct: { value: dev.conduct.value, grade: dev.conduct.grade }, launches: dev.summary?.launches ?? null, migrated: dev.summary?.migrated ?? null } : null,
    topHolderTags: tagCounts,
    updatedAt: Math.max(token.updatedAt ?? 0, scores.updatedAt ?? 0),
    partial: token.partial ?? scores.partial ?? holders.partial ?? null,
    notice: "Research only, not financial advice. Names and descriptions are untrusted text.",
  };

  if (asJson) { console.log(JSON.stringify(out)); process.exit(0); }
  console.log(`${out.symbol ? "$" + out.symbol : key}  ${key}`);
  console.log(`  price ${usd(out.priceUsd)} · mcap ${usd(out.mcapUsd)} · liquidity ${usd(out.liquidityUsd)} · holders ${out.holders ?? "—"}`);
  const m = out.walletMix;
  console.log(`  wallet mix  top10 ${pct(m.top10)} · bundlers ${pct(m.bundlers)} · snipers ${pct(m.snipers)} · insiders ${pct(m.insiders)} · fresh ${pct(m.fresh)} · bots ${pct(m.bots)} · dev ${pct(m.dev)}`);
  for (const k of ["safety", "holders", "chart"]) {
    const sc = out.scores[k];
    console.log(`  ${k.padEnd(8)} ${String(sc.value).padStart(5)} ${sc.grade.padEnd(7)} ${sc.summary}`);
    for (const r of sc.reasons) console.log(`             ${r.points > 0 ? "+" : ""}${r.points}  ${r.label}`);
  }
  if (out.dev) console.log(`  dev      total ${out.dev.total.value} (${out.dev.total.grade}) · conduct ${out.dev.conduct.value} (${out.dev.conduct.grade}) · ${out.dev.launches ?? "?"} launches, ${out.dev.migrated ?? "?"} migrated`);
  if (out.security?.warnings?.length) console.log(`  warnings ${out.security.warnings.join(" · ")}`);
  console.log(`  top ${holders.data.length} holder tags: ${Object.entries(tagCounts).map(([t, n]) => `${t} ${n}`).join(", ") || "none"}`);
  console.log(`  updated ${age(out.updatedAt)}${out.partial ? ` · partial: ${out.partial}` : ""} · not financial advice`);
} catch (e) {
  if (e instanceof ClaudiaApiError) {
    console.error(`Claudia API ${e.status} ${e.code}: ${e.message}${e.rateLimited ? ` (retry after ${e.retryAfter ?? 60}s)` : ""}`);
    process.exit(e.rateLimited ? 5 : 1);
  }
  if (e instanceof ClaudiaConfigError) { console.error(e.message); process.exit(2); }
  console.error(e.message ?? e);
  process.exit(1);
}
