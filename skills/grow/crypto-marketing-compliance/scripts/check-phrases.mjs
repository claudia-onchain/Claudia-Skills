#!/usr/bin/env node
// Local phrase check for coin posts. Node >= 20, no network, no dependencies.
// Usage:  node scripts/check-phrases.mjs "draft text"      or      echo "draft" | node scripts/check-phrases.mjs
//         add --json for machine output.
// Exit codes: 0 = no blocked phrase · 3 = blocked phrase found (same convention as `claudia post`) · 2 = bad usage.
// This is a helper on top of @useclaudia/social's own rules, not legal advice.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const lists = JSON.parse(fs.readFileSync(path.join(here, "..", "templates", "phrase-lists.json"), "utf8"));

const args = process.argv.slice(2);
const json = args.includes("--json");
let text = args.filter((a) => a !== "--json").join(" ");
if (!text && !process.stdin.isTTY) text = fs.readFileSync(0, "utf8");
if (!text.trim()) {
  console.error('Usage: node scripts/check-phrases.mjs "draft text" [--json]');
  process.exit(2);
}

const lower = text.toLowerCase();
const hits = (list) => list.filter((p) => new RegExp(p.pattern, "i").test(text)).map((p) => ({ pattern: p.pattern, why: p.why }));
const blocked = hits(lists.blocked);
const caution = hits(lists.caution);
// The disclaimer reminder is informational; it never raises the class on its own.
const raising = caution.filter((c) => !/disclaimers/.test(c.why));

const cashtags = text.match(/\$[A-Za-z][A-Za-z0-9]{1,9}\b/g) ?? [];
const address = /\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/.test(text) || /\b0x[a-fA-F0-9]{40}\b/.test(text);
const finance = cashtags.length > 0 || address || /\b(coin|token|memecoin|crypto|airdrop|presale|market ?cap|mcap|liquidity|holders|staking|yield|apy)\b/i.test(text);
const interest = lists.interest_markers.some((m) => lower.includes(m));
const specificCoin = cashtags.length > 0 || address;
const paidMarker = /#ad\b|paid by|sponsored|paid partnership/i.test(text);

const notes = [];
if (finance && !/not financial advice/i.test(text)) notes.push('"Not financial advice." will be added by @useclaudia/social; keep it visible in videos too.');
if (cashtags.length > 1) notes.push(`${cashtags.length} cashtags: X allows one per API post.`);
if (specificCoin && !interest) notes.push("No interest disclosure found. If the agent or operator holds, launched or earns from this coin, add it.");
if (paidMarker && !/\$\s?\d|\d+\s?(usdc|usd|sol|eur|gbp)/i.test(text)) notes.push("Paid marker found but no amount: US Section 17(b) needs the amount for security-like tokens.");

let suggestion = "GREEN";
if ((specificCoin && (interest || raising.length)) || raising.length) suggestion = "AMBER";
if (blocked.length) suggestion = "RED";

const out = { ok: blocked.length === 0, suggestion, finance, cashtags, interestDisclosed: interest, blocked, caution, notes };
if (json) {
  console.log(JSON.stringify(out, null, 2));
} else {
  console.log(`suggested class: ${suggestion}${finance ? " (crypto content)" : ""}`);
  for (const b of blocked) console.log(`  ✗ blocked  ${b.why}  [${b.pattern}]`);
  for (const c of caution) console.log(`  ! caution  ${c.why}  [${c.pattern}]`);
  for (const n of notes) console.log(`  · ${n}`);
  if (!blocked.length && !caution.length) console.log("  ✓ no blocked or caution phrases");
  console.log("  Run the decision tree (templates/coin-post-decision-tree.yaml) before approving. Not legal advice.");
}
process.exit(blocked.length ? 3 : 0);
