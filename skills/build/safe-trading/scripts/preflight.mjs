#!/usr/bin/env node
// preflight.mjs — read-only checks to run BEFORE asking for a quote on a Solana coin. It never trades, never signs,
// never reads keys or ~/.claudia. Caps and balance come from flags you pass, so the arithmetic is explicit.
//
// Usage:
//   npm i @useclaudia/sdk
//   node preflight.mjs <mint | sol:<mint> | claudia> --side buy --sol 0.02 [--max-per-trade 0.05] [--max-per-day 0.2]
//        [--spent-today 0] [--balance <SOL>] [--slippage-bps 1500] [--json] [--base-url https://useclaudia.xyz]
//   node preflight.mjs <coin> --side sell --pct 50 [--slippage-bps 1500]
//
// Network: three sequential GET requests to the Claudia server: /api/token/:key (live board numbers),
// /api/insights/token/:key (security) and /api/insights/token/:key/scores. No keys, nothing written.
// Exit codes: 0 every check passed or only warnings · 3 at least one STOP · 1 error · 2 bad usage · 5 rate limited.
// A pass is not advice to trade. It only means nothing in this data says stop.
import { ClaudiaApiError, ClaudiaClient, toTokenKey } from "@useclaudia/sdk";

const FEE_RESERVE_SOL = 0.005; // the CLI keeps this aside for network fees and token-account rent
const HELP = `preflight.mjs <coin> --side buy --sol <SOL> [--max-per-trade 0.05] [--max-per-day 0.2] [--spent-today 0] [--balance <SOL>] [--slippage-bps 1500] [--json]
preflight.mjs <coin> --side sell --pct <1-100> [--slippage-bps 1500] [--json]`;

function parse(argv) {
  const o = { side: "buy", maxPerTrade: 0.05, maxPerDay: 0.2, spentToday: 0, slippageBps: 1500, json: false };
  const num = (v, name) => {
    const n = Number(v);
    if (!Number.isFinite(n) || n < 0) throw new Error(`${name} needs a number`);
    return n;
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") return { help: true };
    else if (a === "--json") o.json = true;
    else if (a === "--side") o.side = argv[++i];
    else if (a === "--sol") o.sol = num(argv[++i], "--sol");
    else if (a === "--pct") o.pct = num(argv[++i], "--pct");
    else if (a === "--max-per-trade") o.maxPerTrade = num(argv[++i], a);
    else if (a === "--max-per-day") o.maxPerDay = num(argv[++i], a);
    else if (a === "--spent-today") o.spentToday = num(argv[++i], a);
    else if (a === "--balance") o.balance = num(argv[++i], a);
    else if (a === "--slippage-bps") o.slippageBps = num(argv[++i], a);
    else if (a === "--base-url") o.baseUrl = argv[++i];
    else if (!a.startsWith("--") && !o.coin) o.coin = a;
    else throw new Error(`Unknown option ${a}`);
  }
  if (!o.coin) throw new Error("Give a coin");
  if (o.side !== "buy" && o.side !== "sell") throw new Error("--side is buy or sell");
  if (o.side === "buy" && !(o.sol > 0)) throw new Error("A buy needs --sol <amount>");
  if (o.side === "sell" && !(o.pct > 0 && o.pct <= 100)) throw new Error("A sell needs --pct between 1 and 100");
  return o;
}

async function main() {
  let o;
  try {
    o = parse(process.argv.slice(2));
  } catch (e) {
    console.error(`${e.message}\n\n${HELP}`);
    return 2;
  }
  if (o.help) return console.log(HELP), 0;
  let key;
  try {
    key = toTokenKey(o.coin);
  } catch (e) {
    return console.error(e.message), 2;
  }
  const c = new ClaudiaClient(o.baseUrl ? { baseUrl: o.baseUrl } : {});
  const soft = async (fn) => {
    try {
      return await fn();
    } catch (e) {
      if (e instanceof ClaudiaApiError && e.rateLimited) throw e;
      return null;
    }
  };
  const board = await soft(() => c.token(key));
  const ins = await soft(() => c.insights.token(key));
  const sc = await soft(() => c.insights.scores(key));
  if (!board && !ins) return console.error(`Claudia has no data for ${key}.`), 1;

  const checks = [];
  const add = (status, check, detail) => checks.push({ status, check, detail });
  const priceUsd = board?.priceUsd ?? ins?.stats?.priceUsd ?? null;
  const solUsd = board?.priceUsd && board?.priceNative ? board.priceUsd / board.priceNative : null;
  const liquidityUsd = board?.liquidityUsd ?? ins?.stats?.liquidityUsd ?? null;

  if (o.side === "buy") {
    add(o.sol <= o.maxPerTrade ? "ok" : "stop", "Per-trade cap", `${o.sol} SOL vs cap ${o.maxPerTrade} SOL`);
    const left = Math.max(0, o.maxPerDay - o.spentToday);
    add(o.sol <= left + 1e-12 ? "ok" : "stop", "Daily cap", `${o.sol} SOL vs ${round(left)} SOL left today (cap ${o.maxPerDay}, spent ${o.spentToday})`);
    if (o.maxPerTrade > o.maxPerDay) add("stop", "Cap settings", "max-per-trade is above max-per-day; the CLI refuses that too");
    if (o.balance !== undefined) {
      const need = o.sol + FEE_RESERVE_SOL;
      add(o.balance >= need ? "ok" : "stop", "Wallet balance", `${o.balance} SOL vs about ${round(need)} SOL needed (amount + ${FEE_RESERVE_SOL} reserve)`);
    } else add("warn", "Wallet balance", "not given (--balance); claudia buy checks it before sending");
    if (solUsd && liquidityUsd) {
      const share = (o.sol * solUsd) / liquidityUsd;
      add(share > 0.05 ? "stop" : share > 0.02 ? "warn" : "ok", "Size vs liquidity", `≈ $${round(o.sol * solUsd, 2)} against $${Math.round(liquidityUsd).toLocaleString("en-US")} liquidity (${round(share * 100, 3)}%) — larger shares mean larger price impact`);
    } else add("warn", "Size vs liquidity", "liquidity or SOL price unknown");
  } else add("ok", "Sell size", `${o.pct}% of the position (local SOL caps apply to buys, not sells)`);

  add(o.slippageBps > 3000 ? "stop" : o.slippageBps > 2000 ? "warn" : "ok", "Max slippage", `${o.slippageBps} bps (${o.slippageBps / 100}%) — catalog default 1500`);
  const sec = ins?.security;
  if (sec?.honeypot === true) add("stop", "Honeypot", "flagged as a honeypot: selling may be impossible");
  else add(sec ? "ok" : "warn", "Honeypot", sec ? "not flagged" : "security data unavailable");
  if (sec?.mintRenounced === false) add("stop", "Mint authority", "not renounced: supply can be increased");
  if (sec?.freezeRenounced === false) add("stop", "Freeze authority", "not renounced: tokens can be frozen");
  const tax = Math.max(sec?.buyTaxPct ?? 0, sec?.sellTaxPct ?? 0);
  if (tax > 0) add(tax >= 10 ? "stop" : "warn", "Token tax", `${tax}%`);
  const g = sc?.safety?.grade;
  add(g === "risky" ? "stop" : g === "good" ? "ok" : "warn", "Safety score", sc?.safety ? `${g === "unknown" ? "–" : Math.round(sc.safety.value)} ${g} · ${sc.safety.title}` : "unavailable");
  const hg = sc?.holders?.grade;
  add(hg === "risky" ? "stop" : hg === "good" ? "ok" : "warn", "Holder score", sc?.holders ? `${hg === "unknown" ? "–" : Math.round(sc.holders.value)} ${hg} · ${sc.holders.title}` : "unavailable");
  if (board?.phase && board.phase !== "migrated") add("warn", "Phase", `still on the bonding curve (${Math.round(board.bondingPct ?? 0)}%): a buy near 100% can be partly refunded`);

  const stops = checks.filter((x) => x.status === "stop").length;
  const warns = checks.filter((x) => x.status === "warn").length;
  const next = o.side === "buy"
    ? [`claudia quote ${key} buy ${o.sol}`, `claudia buy ${key} ${o.sol} --dry-run --slippage-bps ${o.slippageBps}`]
    : [`claudia quote ${key} sell ${o.pct}%`, `claudia sell ${key} ${o.pct}% --dry-run --slippage-bps ${o.slippageBps}`];
  const out = { key, side: o.side, amount: o.side === "buy" ? o.sol : o.pct, priceUsd, solUsd, liquidityUsd, checks, stops, warnings: warns, result: stops ? "STOP" : warns ? "PROCEED TO QUOTE WITH CARE" : "PROCEED TO QUOTE", next: stops ? [] : next, dataUpdatedAt: ins?.updatedAt ?? null, partial: ins?.partial ?? sc?.partial ?? null, disclaimer: "Not financial advice. A pass only means nothing here says stop." };
  if (o.json) process.stdout.write(JSON.stringify(out) + "\n");
  else {
    console.log(`Preflight · ${o.side} ${out.amount}${o.side === "buy" ? " SOL" : "%"} · ${key}`);
    for (const x of checks) console.log(`  ${x.status === "ok" ? "✓" : x.status === "warn" ? "!" : "✗"} ${x.check.padEnd(18)} ${x.detail}`);
    console.log("");
    console.log(`Result: ${out.result}${out.partial ? ` (partial data: ${out.partial})` : ""}`);
    if (out.next.length) {
      console.log("Next, still nothing is sent:");
      for (const n of out.next) console.log(`  ${n}`);
      console.log("Then a person reads the quote and confirms (y / --yes) — or doesn't.");
    }
    console.log(out.disclaimer);
  }
  return stops ? 3 : 0;
}

const round = (n, d = 6) => Math.round(n * 10 ** d) / 10 ** d;

main().then(
  (code) => (process.exitCode = code),
  (e) => {
    if (e instanceof ClaudiaApiError && e.rateLimited) {
      console.error(`Rate limited — wait ${e.retryAfter ?? 60} s.`);
      process.exitCode = 5;
    } else {
      console.error(e?.message ?? e);
      process.exitCode = 1;
    }
  },
);
