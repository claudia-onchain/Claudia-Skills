#!/usr/bin/env node
// pnl-from-ledger.mjs: positions, average cost basis, realized P&L, fees and fee income from a ledger CSV
// (templates/ledger.csv format). Offline: no network calls, no keys, reads only the file you name.
//
//   node pnl-from-ledger.mjs ledger.csv
//   node pnl-from-ledger.mjs ledger.csv --price sol:<mint>=0.000012 --price hood:0x…=0.0004   (USD per token, for unrealized)
//   node pnl-from-ledger.mjs ledger.csv --json
//
// Method: average cost per coin, in USD at the time of each row. Network fees and gas on a buy are added to its cost;
// on a sell they are taken from the proceeds. This is a bookkeeping view, not a tax calculation.
// Exit codes: 0 ok · 1 error · 2 bad usage.
import { readFileSync } from "node:fs";

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith("--") && !argv[argv.indexOf(a) - 1]?.startsWith("--price"));
const json = argv.includes("--json");
const prices = new Map();
argv.forEach((a, i) => {
  if (a === "--price" && argv[i + 1]) {
    const [k, v] = argv[i + 1].split("=");
    prices.set(k, Number(v));
  }
});
if (!file) {
  console.error("Usage: node pnl-from-ledger.mjs <ledger.csv> [--price <coin_key>=<usd per token> ...] [--json]");
  process.exit(2);
}

/** Minimal CSV parser: commas, double-quoted fields, "" escapes. */
function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim()));
}

let rows;
try {
  const [head, ...body] = parseCsv(readFileSync(file, "utf8"));
  rows = body.map((r, n) => ({ ...Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? "").trim()])), _line: n + 2 }));
} catch (e) {
  console.error(`Can't read ${file}: ${e.message}`);
  process.exit(1);
}

const num = (r, k) => {
  const v = r[k];
  if (v === "" || v === undefined) return 0;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`line ${r._line}: ${k} is not a number ("${v}")`);
  return n;
};

const coins = new Map();
const totals = { realizedUsd: 0, feesUsd: 0, feeIncomeUsd: 0, otherCostsUsd: 0, skipped: [] };
const pos = (r) => {
  const key = r.coin_key;
  if (!coins.has(key)) coins.set(key, { coin_key: key, chain: r.chain, symbol: r.symbol, qty: 0, costUsd: 0, realizedUsd: 0, feesUsd: 0, buys: 0, sells: 0 });
  return coins.get(key);
};

try {
  for (const r of [...rows].sort((a, b) => a.date_utc.localeCompare(b.date_utc))) {
    const px = num(r, "native_usd");
    const amt = num(r, "native_amount");
    const fee = num(r, "network_fee_native");
    const qty = num(r, "qty_tokens");
    const feeUsd = fee * px;
    switch (r.kind) {
      case "buy": {
        const p = pos(r);
        p.qty += qty; p.costUsd += (amt + fee) * px; p.feesUsd += feeUsd; p.buys++;
        totals.feesUsd += feeUsd;
        break;
      }
      case "sell": {
        const p = pos(r);
        if (qty > p.qty + 1e-9) throw new Error(`line ${r._line}: sells ${qty} ${r.symbol} but only ${p.qty} are on the ledger (a missing buy or transfer_in?)`);
        const avg = p.qty ? p.costUsd / p.qty : 0;
        const basis = avg * qty;
        const proceeds = (amt - fee) * px;
        p.qty -= qty; p.costUsd -= basis; p.realizedUsd += proceeds - basis; p.feesUsd += feeUsd; p.sells++;
        totals.realizedUsd += proceeds - basis; totals.feesUsd += feeUsd;
        break;
      }
      case "transfer_in": { // tokens received without a purchase: basis = native_amount × native_usd you record (often 0)
        const p = pos(r);
        p.qty += qty; p.costUsd += amt * px;
        break;
      }
      case "transfer_out": { // tokens sent away (not sold): remove at average cost, no P&L
        const p = pos(r);
        const avg = p.qty ? p.costUsd / p.qty : 0;
        p.qty -= qty; p.costUsd -= avg * qty;
        break;
      }
      case "fee_income":
        totals.feeIncomeUsd += amt * px;
        break;
      case "launch_cost":
      case "harvest_gas":
      case "other_cost":
        totals.otherCostsUsd += (amt + fee) * px; totals.feesUsd += feeUsd;
        break;
      default:
        totals.skipped.push(`line ${r._line}: unknown kind "${r.kind}"`);
    }
  }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

const list = [...coins.values()].map((c) => {
  const price = prices.get(c.coin_key);
  const valueUsd = price !== undefined ? c.qty * price : null;
  return { ...c, avgCostUsd: c.qty > 1e-12 ? c.costUsd / c.qty : 0, valueUsd, unrealizedUsd: valueUsd === null ? null : valueUsd - c.costUsd };
});
const unrealized = list.reduce((s, c) => (c.unrealizedUsd === null ? s : s + c.unrealizedUsd), 0);
const missingPrice = list.filter((c) => c.qty > 1e-12 && c.valueUsd === null).map((c) => c.symbol || c.coin_key);

if (json) {
  console.log(JSON.stringify({ file, method: "average cost, USD", coins: list, totals: { ...totals, unrealizedUsd: unrealized, missingPrice } }, null, 2));
  process.exit(0);
}

const $ = (n) => (n === null ? "n/a" : `${n < 0 ? "-" : ""}$${Math.abs(n).toFixed(2)}`);
const q = (n) => (Math.abs(n) < 1e-9 ? "0" : n.toLocaleString("en-US", { maximumFractionDigits: 4 }));
console.log(`P&L from ${file} · average cost, USD at the time of each row`);
console.log("");
console.log("| Coin | Chain | Held | Avg cost / token | Cost basis left | Realized | Fees paid | Value now | Unrealized |");
console.log("|---|---|---|---|---|---|---|---|---|");
for (const c of list) {
  console.log(`| ${c.symbol} | ${c.chain} | ${q(c.qty)} | ${c.qty > 1e-12 ? "$" + c.avgCostUsd.toPrecision(4) : "-"} | ${$(c.costUsd)} | ${$(c.realizedUsd)} | ${$(c.feesUsd)} | ${$(c.valueUsd)} | ${$(c.unrealizedUsd)} |`);
}
console.log("");
console.log(`Realized P&L on coins: ${$(totals.realizedUsd)}`);
console.log(`Unrealized P&L: ${$(unrealized)}${missingPrice.length ? ` (no --price for: ${missingPrice.join(", ")})` : ""}`);
console.log(`Creator-fee income: ${$(totals.feeIncomeUsd)}`);
console.log(`Launch costs and other gas: ${$(totals.otherCostsUsd)}`);
console.log(`Network fees and gas paid (already inside the figures above): ${$(totals.feesUsd)}`);
for (const s of totals.skipped) console.log(`Skipped ${s}`);
console.log("");
console.log("Bookkeeping view, not tax advice. SOL and ETH price changes are not included; see the skill's tax note.");
