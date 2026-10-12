#!/usr/bin/env node
// fees-snapshot.mjs: read the creator fees of one or more Claudia launches and print fee-ledger CSV rows.
// Public reads only (ClaudiaClient.launchFees). It makes network calls to useclaudia.xyz, one launch at a time.
// It never signs, never harvests and never reads keys.
//
//   npm i @useclaudia/sdk
//   node fees-snapshot.mjs <launch id> [<launch id> …]            CSV rows (no header)
//   node fees-snapshot.mjs --header <launch id> …                 with the header row
//   node fees-snapshot.mjs --json <launch id> …                   one JSON object per launch
//
// Exit codes: 0 ok · 1 error · 2 bad usage · 5 rate limited.
import { ClaudiaClient, ClaudiaApiError } from "@useclaudia/sdk";

const args = process.argv.slice(2);
const json = args.includes("--json");
const header = args.includes("--header");
const ids = args.filter((a) => !a.startsWith("--"));
const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

if (!ids.length || ids.some((id) => !ID_RE.test(id))) {
  console.error("Usage: node fees-snapshot.mjs [--header|--json] <launch id> [...]   (ids: 8-64 letters, digits, - or _; list them with: claudia fees)");
  process.exit(2);
}

const HEAD = "date_utc,chain,launch_id,coin,kind,amount_native,creator_share_native,native_symbol,native_usd_price,price_source,fee_or_gas_native,tx_link,note";
const csv = (v) => {
  const s = v === undefined || v === null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const when = (ms) => new Date(ms).toISOString().slice(0, 16).replace("T", " ");

const client = new ClaudiaClient();
if (header && !json) console.log(HEAD);

for (const id of ids) {
  try {
    const r = await client.launchFees(id); // { items: [{ label, amount, symbol, creatorShare?, note? }], at }
    if (json) {
      console.log(JSON.stringify({ launchId: id, at: r.at, items: r.items }));
      continue;
    }
    if (!r.items.length) {
      console.log([when(r.at), "", id, "", "reading", 0, 0, "", "", "", 0, "", "no fee readings yet"].map(csv).join(","));
      continue;
    }
    for (const it of r.items) {
      // chain, coin and USD price are left for the person to fill: the reading doesn't carry them.
      const note = [it.label, it.note].filter(Boolean).join(" · ");
      console.log([when(r.at), "", id, "", "reading", it.amount, it.creatorShare ?? "", it.symbol, "", "", 0, "", note].map(csv).join(","));
    }
  } catch (e) {
    if (e instanceof ClaudiaApiError && e.rateLimited) {
      console.error(`Rate limited. Wait ${e.retryAfter ?? 60} s, then run once more.`);
      process.exit(5);
    }
    console.error(`${id}: ${e?.code ?? "error"} ${e?.message ?? e}`);
    process.exitCode = 1;
  }
}
