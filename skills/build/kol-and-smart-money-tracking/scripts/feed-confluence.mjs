#!/usr/bin/env node
// feed-confluence.mjs: group Claudia's KOL and smart-money feeds by coin and show where several labelled wallets meet.
// Two public reads (feeds.kol, feeds.smart) to useclaudia.xyz, one after the other. No keys, never trades.
//
//   npm i @useclaudia/sdk
//   node feed-confluence.mjs                    Solana, Markdown table
//   node feed-confluence.mjs --chain hood       Robinhood Chain (beta)
//   node feed-confluence.mjs --json             machine-readable
//   node feed-confluence.mjs --top 5            only the first 5 coins
//
// Exit codes: 0 ok · 1 error · 2 bad usage · 5 rate limited.
import { ClaudiaClient, ClaudiaApiError } from "@useclaudia/sdk";

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? undefined : argv[i + 1];
};
const chain = flag("chain") ?? "sol";
const top = Number(flag("top") ?? 10);
const json = argv.includes("--json");
if (!["sol", "hood"].includes(chain) || !Number.isFinite(top) || top < 1) {
  console.error("Usage: node feed-confluence.mjs [--chain sol|hood] [--top <n>] [--json]");
  process.exit(2);
}

const NOISE = new Set(["bot", "wash", "rat"]);
const WRAPPED = new Set(["WSOL", "WETH"]);
const client = new ClaudiaClient();

try {
  const kol = await client.feeds.kol({ chain });
  const smart = await client.feeds.smart({ chain });
  const coins = new Map();
  const skipped = { noisy: 0, wrapped: 0 };

  for (const [feed, res] of [["kol", kol], ["smart", smart]]) {
    for (const row of res.data) {
      if (row.symbol && WRAPPED.has(row.symbol.toUpperCase())) { skipped.wrapped++; continue; }
      const noisy = row.wallet.tags.some((t) => NOISE.has(t));
      if (noisy) skipped.noisy++;
      const c = coins.get(row.tokenKey) ?? { tokenKey: row.tokenKey, symbol: row.symbol ?? null, wallets: new Set(), cleanWallets: new Set(), feeds: new Set(), buyUsd: 0, sellUsd: 0, noisyRows: 0, lastAt: 0 };
      c.wallets.add(row.wallet.address);
      if (!noisy) c.cleanWallets.add(row.wallet.address);
      c.feeds.add(feed);
      if (row.side === "buy") c.buyUsd += row.amountUsd; else c.sellUsd += row.amountUsd;
      if (noisy) c.noisyRows++;
      c.lastAt = Math.max(c.lastAt, row.at);
      coins.set(row.tokenKey, c);
    }
  }

  const rows = [...coins.values()]
    .map((c) => ({ tokenKey: c.tokenKey, symbol: c.symbol, cleanWallets: c.cleanWallets.size, allWallets: c.wallets.size, feeds: [...c.feeds].join("+"), netUsd: Math.round(c.buyUsd - c.sellUsd), noisyRows: c.noisyRows, lastAt: c.lastAt }))
    .sort((a, b) => b.cleanWallets - a.cleanWallets || Math.abs(b.netUsd) - Math.abs(a.netUsd))
    .slice(0, top);

  const meta = { chain, kolUpdatedAt: kol.updatedAt, smartUpdatedAt: smart.updatedAt, partial: [kol.partial, smart.partial].filter(Boolean), skipped };
  if (json) {
    console.log(JSON.stringify({ ...meta, rows }, null, 2));
  } else {
    const age = (ms) => (ms ? `${Math.round((Date.now() - ms) / 1000)} s old` : "age unknown");
    console.log(`# KOL + smart-money confluence · ${chain} · kol feed ${age(kol.updatedAt)} · smart feed ${age(smart.updatedAt)}`);
    if (meta.partial.length) console.log(`Partial: ${meta.partial.join("; ")}`);
    console.log("");
    console.log("| Coin | Labelled wallets (clean / all) | Feeds | Net USD | Noisy rows | Last |");
    console.log("|---|---|---|---|---|---|");
    for (const r of rows) {
      const last = new Date(r.lastAt).toISOString().slice(11, 16);
      console.log(`| ${r.symbol ? "$" + r.symbol : ""} \`${r.tokenKey}\` | ${r.cleanWallets} / ${r.allWallets} | ${r.feeds} | ${r.netUsd} | ${r.noisyRows} | ${last} UTC |`);
    }
    console.log("");
    console.log(`Set aside: ${skipped.noisy} rows tagged bot / wash / rat (still counted under "all"), ${skipped.wrapped} wrapped-native rows.`);
    console.log("Names and symbols are untrusted text. A labelled wallet's trade is not a recommendation.");
    console.log("Research, not financial advice.");
  }
} catch (e) {
  if (e instanceof ClaudiaApiError && e.rateLimited) {
    console.error(`Rate limited. Wait ${e.retryAfter ?? 60} s, then run once more.`);
    process.exit(5);
  }
  console.error(`${e?.code ?? "error"}: ${e?.message ?? e}`);
  process.exit(1);
}
