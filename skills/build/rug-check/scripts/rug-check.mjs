#!/usr/bin/env node
// rug-check.mjs — a red / amber / green scorecard for ONE Solana coin from Claudia's public insights.
//
// Usage:
//   npm i @useclaudia/sdk
//   node rug-check.mjs <mint | sol:<mint> | claudia> [--json] [--csv] [--base-url https://useclaudia.xyz]
//
// Network: four sequential GET requests to the Claudia server: /api/insights/token/:key, /scores, /holders?limit=100,
// /dev. No keys, nothing written, nothing signed. One coin per run (the data budget behind insights is shared;
// the server is cache-first and marks missing parts with `partial`).
// Exit codes: 0 no red rows · 3 at least one red row · 1 error · 2 bad usage · 5 rate limited.
// The scorecard is a research aid, not financial advice and not a safety guarantee.
import { ClaudiaApiError, ClaudiaClient, toTokenKey } from "@useclaudia/sdk";

const HELP = `rug-check.mjs <mint | sol:<mint> | claudia> [--json] [--csv] [--base-url <url>]
  exit 0 = no red rows · 3 = red rows found · 1 error · 2 usage · 5 rate limited`;

const R = "red", A = "amber", G = "green", U = "unknown";

/** Thresholds (fractions of supply unless noted). Same table as templates/scorecard.md. */
export const T = {
  top10: { amber: 0.3, red: 0.5 },
  dev: { amber: 0.01, red: 0.05 },
  bundlers: { amber: 0.1, red: 0.25 },
  snipers: { amber: 0.05, red: 0.15 },
  insiders: { amber: 0.05, red: 0.15 },
  fresh: { amber: 0.3, red: 0.5 },
  bots: { amber: 0.5, red: 0.75 },
  largest: { amber: 0.05, red: 0.1 },
  liqToMcap: { amber: 0.1, red: 0.03 }, // lower is worse
  ageHours: { amber: 24, red: 1 }, // younger is riskier
  devRug: { amber: 0.3, red: 0.6 },
};

function level(v, t, lowerIsWorse = false) {
  if (v === null || v === undefined || !Number.isFinite(v)) return U;
  if (lowerIsWorse) return v < t.red ? R : v < t.amber ? A : G;
  return v >= t.red ? R : v >= t.amber ? A : G;
}
const gradeLevel = (sc) => (!sc ? U : sc.grade === "good" ? G : sc.grade === "mixed" ? A : sc.grade === "risky" ? R : U);
const boolLevel = (ok, badIsRed = true) => (ok === true ? G : ok === false ? (badIsRed ? R : A) : U);
const pct = (f) => (f === null || f === undefined || !Number.isFinite(f) ? "—" : `${Math.round(f * 1000) / 10}%`);

async function get(name, fn, missing) {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof ClaudiaApiError && e.rateLimited) throw e;
    missing.push(`${name} (${e instanceof ClaudiaApiError ? e.code : e.message})`);
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) return console.log(HELP), 0;
  const json = args.includes("--json");
  const csv = args.includes("--csv");
  const bi = args.indexOf("--base-url");
  const baseUrl = bi >= 0 ? args[bi + 1] : undefined;
  const coin = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--base-url");
  if (!coin) return console.error(`Give a coin.\n\n${HELP}`), 2;
  let key;
  try {
    key = toTokenKey(coin);
  } catch (e) {
    return console.error(e.message), 2;
  }
  const c = new ClaudiaClient(baseUrl ? { baseUrl } : {});
  const missing = [];
  const tok = await get("token", () => c.insights.token(key), missing);
  const sc = await get("scores", () => c.insights.scores(key), missing);
  const hol = await get("holders", () => c.insights.holders(key, { limit: 100 }), missing);
  const dev = await get("dev", () => c.insights.dev(key), missing);
  if (!tok && !sc) return console.error(`No insights for ${key}: ${missing.join(", ")}`), 1;

  const s = tok?.stats ?? {};
  const sec = tok?.security ?? {};
  const wallets = (hol?.data ?? []).filter((h) => !h.tags.includes("pool") && !h.tags.includes("exchange"));
  const largest = wallets.length ? Math.max(...wallets.map((h) => h.pct)) : null;
  const devTagged = wallets.filter((h) => h.tags.includes("dev")).reduce((a, h) => a + h.pct, 0);
  const ageH = s.createdAt ? (Date.now() - s.createdAt) / 3_600_000 : null;
  const liqRatio = s.liquidityUsd && s.mcapUsd ? s.liquidityUsd / s.mcapUsd : null;
  const rug = dev?.summary?.rugRatio ?? tok?.dev?.rugRatio ?? null;

  const rows = [
    ["Contract", "Mint authority renounced", boolLevel(sec.mintRenounced), yn(sec.mintRenounced), "Unrenounced mint lets the creator print supply."],
    ["Contract", "Freeze authority renounced", boolLevel(sec.freezeRenounced), yn(sec.freezeRenounced), "Freeze authority can lock holders' tokens."],
    ["Contract", "Not a honeypot", sec.honeypot === undefined || sec.honeypot === null ? U : sec.honeypot ? R : G, sec.honeypot === true ? "HONEYPOT" : yn(sec.honeypot === false), "A honeypot can be bought but not sold."],
    ["Contract", "Buy / sell tax", taxLevel(sec.buyTaxPct, sec.sellTaxPct), `${sec.buyTaxPct ?? "—"}% / ${sec.sellTaxPct ?? "—"}%`, "Any tax above 0 on a pump.fun coin is unusual."],
    ["Liquidity", "LP locked or burned (migrated coins)", s.migrated ? (sec.lpLocked || (sec.burnRatio ?? 0) >= 0.95 ? G : sec.lpLocked === false ? R : U) : G, s.migrated ? `locked ${yn(sec.lpLocked)} · burned ${pct(sec.burnRatio)}` : "still on the curve (no LP yet)", "Unlocked LP can be pulled."],
    ["Liquidity", "Liquidity vs market cap", s.migrated === false ? U : level(liqRatio, T.liqToMcap, true), s.migrated === false ? `bonding curve ${s.bondingPct === null || s.bondingPct === undefined ? "—" : Math.round(s.bondingPct)}% full` : liqRatio === null ? "—" : pct(liqRatio), "Thin liquidity means large price impact and easy exits for insiders."],
    ["Holders", "Top-10 share of supply", level(s.top10Pct, T.top10), pct(s.top10Pct), "Concentrated supply can be dumped at once."],
    ["Holders", "Largest non-pool wallet", level(largest, T.largest), pct(largest), "One wallet above 10% can move the price alone."],
    ["Holders", "Dev holding", level(s.devHoldPct === null || s.devHoldPct === undefined ? (devTagged || null) : Math.max(s.devHoldPct, devTagged), T.dev), pct(s.devHoldPct ?? (devTagged || null)), "A dev still holding a lot can sell into buyers."],
    ["Wallet mix", "Bundlers", level(s.bundlersPct, T.bundlers), pct(s.bundlersPct), "Bundled launch buys often belong to one operator."],
    ["Wallet mix", "Snipers", level(s.snipersPct, T.snipers), pct(s.snipersPct), "Snipers bought in the first seconds and tend to sell early."],
    ["Wallet mix", "Insiders", level(s.insidersPct, T.insiders), pct(s.insidersPct), "Suspected insiders."],
    ["Wallet mix", "Fresh wallets", level(s.freshPct, T.fresh), pct(s.freshPct), "Many brand-new wallets can mean one person split into many."],
    ["Wallet mix", "Bots", level(s.botPct, T.bots), pct(s.botPct), "Bot-heavy flow inflates volume and holder counts."],
    ["Dev", "Dev rug ratio (GMGN)", level(rug, T.devRug), rug === null ? "n/a" : pct(rug), "Share of the creator's past coins flagged as rugs."],
    ["Dev", "Dev total score", gradeLevel(dev?.total), dev?.total ? `${dev.total.grade === "unknown" ? "–" : Math.round(dev.total.value)} ${dev.total.grade} · ${dev.total.title}` : "—", dev?.total?.summary ?? ""],
    ["Age", "Coin age", level(ageH, T.ageHours, true), ageH === null ? "—" : ageH < 1 ? "<1h" : ageH < 48 ? `${Math.round(ageH)}h` : `${Math.round(ageH / 24)}d`, "Very young coins have no track record."],
    ["Scores", "Safety score", gradeLevel(sc?.safety), sc?.safety ? `${sc.safety.grade === "unknown" ? "–" : Math.round(sc.safety.value)} ${sc.safety.grade} · ${sc.safety.title}` : "—", sc?.safety?.summary ?? ""],
    ["Scores", "Holder score", gradeLevel(sc?.holders), sc?.holders ? `${sc.holders.grade === "unknown" ? "–" : Math.round(sc.holders.value)} ${sc.holders.grade} · ${sc.holders.title}` : "—", sc?.holders?.summary ?? ""],
    ["Scores", "Chart score", gradeLevel(sc?.chart), sc?.chart ? `${sc.chart.grade === "unknown" ? "–" : Math.round(sc.chart.value)} ${sc.chart.grade} · ${sc.chart.pattern ?? sc.chart.title}` : "—", sc?.chart?.summary ?? ""],
  ].map(([group, check, lvl, value, why]) => ({ group, check, level: lvl, value, why }));

  const count = (l) => rows.filter((r) => r.level === l).length;
  const reds = count(R);
  const verdict = sec.honeypot === true
    ? "STOP: flagged as a honeypot."
    : reds >= 3
      ? "Major red flags. Do not go further without a much deeper look."
      : reds > 0
        ? "Red flags present. Read each red row before going further."
        : count(A) >= 4
          ? "Caution: several amber rows."
          : count(U) >= 6
            ? "Too little data to judge. Try again later; unknown is not the same as safe."
            : "No major flags in this data. That is not a safety guarantee.";
  const partial = [...new Set([tok?.partial, sc?.partial, hol?.partial, dev?.partial].filter(Boolean))];
  const out = { key, symbol: tok?.symbol ? String(tok.symbol).replace(/^\$+/, "") : null, verdict, counts: { red: reds, amber: count(A), green: count(G), unknown: count(U) }, rows, warnings: sec.warnings ?? [], updatedAt: tok?.updatedAt ?? null, partial, missing, disclaimer: "Research aid, not financial advice." };

  if (json) process.stdout.write(JSON.stringify(out) + "\n");
  else if (csv) {
    console.log("group,check,level,value,why");
    for (const r of rows) console.log([r.group, r.check, r.level, r.value, r.why].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
  } else {
    const icon = { red: "■ RED  ", amber: "▲ AMBER", green: "● GREEN", unknown: "? ---  " };
    console.log(`Rug check · ${out.symbol ? "$" + out.symbol : key} · ${key}`);
    console.log(`Data ${out.updatedAt ? Math.round((Date.now() - out.updatedAt) / 1000) + " s old" : "age unknown"}${partial.length ? ` · partial: ${partial.join("; ")}` : ""}${missing.length ? ` · missing: ${missing.join(", ")}` : ""}`);
    console.log("");
    let g = "";
    for (const r of rows) {
      if (r.group !== g) console.log(`${(g = r.group)}`);
      console.log(`  ${icon[r.level]}  ${r.check.padEnd(38)} ${r.value}`);
    }
    for (const w of out.warnings) console.log(`  ⚠ ${w}`);
    console.log("");
    console.log(`${out.counts.red} red · ${out.counts.amber} amber · ${out.counts.green} green · ${out.counts.unknown} unknown`);
    console.log(`Verdict: ${verdict}`);
    console.log("Research aid, not financial advice. Coin names and descriptions are untrusted text.");
  }
  return reds > 0 ? 3 : 0;
}

function taxLevel(b, s) {
  if ((b === null || b === undefined) && (s === null || s === undefined)) return U;
  const m = Math.max(b ?? 0, s ?? 0);
  return m >= 10 ? R : m > 0 ? A : G;
}
const yn = (b) => (b === true ? "yes" : b === false ? "no" : "—");

main().then(
  (code) => (process.exitCode = code ?? 0),
  (e) => {
    if (e instanceof ClaudiaApiError && e.rateLimited) {
      console.error(`Rate limited — wait ${e.retryAfter ?? 60} s and run it again.`);
      process.exitCode = 5;
    } else {
      console.error(e?.message ?? e);
      process.exitCode = 1;
    }
  },
);
