#!/usr/bin/env node
// Summarise the @useclaudia/social audit log: what was published, blocked, failed or missed, and what it cost.
// Node >= 20, no network, no dependencies. Reads only; never prints secrets (the log holds none).
//
//   node audit-summary.mjs                                   # ~/.claudia/social/audit.jsonl (or $CLAUDIA_HOME)
//   node audit-summary.mjs --since 2026-09-29 --until 2026-10-06
//   node audit-summary.mjs --file ./audit.jsonl --json
//
// Audit lines look like {"at":"2026-10-01T15:00:02.114Z","event":"published","post":"…","account":"…",
// "network":"x","remoteId":"…","url":"…","costUsd":0.015}. Events used here: account_connected, draft, approve,
// reject, schedule, published, publish_blocked, publish_failed, publish_blocked_kill_switch, schedule_missed, reply,
// reply_blocked, kill_switch_on, kill_switch_off.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };
const home = process.env.CLAUDIA_HOME || path.join(os.homedir(), ".claudia");
const file = opt("file") || path.join(home, "social", "audit.jsonl");
const since = opt("since"), until = opt("until"), asJson = args.includes("--json");

if (!fs.existsSync(file)) { console.error(`No audit log at ${file}. Has anything been drafted with @useclaudia/social yet?`); process.exit(4); }

const lines = fs.readFileSync(file, "utf8").split("\n").filter(Boolean);
const accountNet = {};
const per = {};
const totals = { drafts: 0, approvals: 0, rejections: 0, scheduled: 0, killSwitchOn: 0, killSwitchOff: 0 };
const blockedReasons = {};
const failures = [];
let bad = 0;

const bucket = (net) => (per[net] ??= { published: 0, costUsd: 0, blocked: 0, failed: 0, uncertain: 0, missed: 0, replies: 0, repliesBlocked: 0 });

for (const l of lines) {
  let e;
  try { e = JSON.parse(l); } catch { bad++; continue; }
  if (e.account && e.network) accountNet[e.account] = e.network;
  const day = (e.at || "").slice(0, 10);
  if (since && day < since) continue;
  if (until && day > until) continue;
  const net = e.network || accountNet[e.account] || "unknown";
  switch (e.event) {
    case "draft": totals.drafts++; break;
    case "approve": totals.approvals++; break;
    case "reject": totals.rejections++; break;
    case "schedule": totals.scheduled++; break;
    case "kill_switch_on": totals.killSwitchOn++; break;
    case "kill_switch_off": totals.killSwitchOff++; break;
    case "published": { const b = bucket(net); b.published++; b.costUsd += Number(e.costUsd || 0); break; }
    case "publish_blocked": { bucket(net).blocked++; const r = String(e.reason || "unknown").slice(0, 80); blockedReasons[r] = (blockedReasons[r] || 0) + 1; break; }
    case "publish_blocked_kill_switch": bucket(net).blocked++; blockedReasons["kill switch on"] = (blockedReasons["kill switch on"] || 0) + 1; break;
    case "publish_failed": { const b = bucket(net); b.failed++; if (e.uncertain) b.uncertain++; failures.push({ at: e.at, network: net, post: e.post, error: String(e.error || "").slice(0, 100), uncertain: !!e.uncertain }); break; }
    case "schedule_missed": bucket(net).missed++; break;
    case "reply": bucket(net).replies++; break;
    case "reply_blocked": bucket(net).repliesBlocked++; break;
    default: break;
  }
}

const out = { file, window: { since: since ?? null, until: until ?? null }, totals, perNetwork: per, blockedReasons, failures, unreadableLines: bad };
if (asJson) { console.log(JSON.stringify(out, null, 2)); process.exit(0); }

console.log(`Audit summary · ${file}${since || until ? ` · ${since ?? "…"} to ${until ?? "…"}` : ""}\n`);
console.log(`Drafts ${totals.drafts} · approved ${totals.approvals} · rejected ${totals.rejections} · scheduled ${totals.scheduled} · kill switch on ${totals.killSwitchOn}×\n`);
console.log("network      published  cost USD  blocked  failed (uncertain)  missed  replies  replies blocked");
for (const [n, b] of Object.entries(per).sort()) {
  console.log(`${n.padEnd(12)} ${String(b.published).padStart(9)}  ${b.costUsd.toFixed(3).padStart(8)}  ${String(b.blocked).padStart(7)}  ${`${b.failed} (${b.uncertain})`.padStart(18)}  ${String(b.missed).padStart(6)}  ${String(b.replies).padStart(7)}  ${String(b.repliesBlocked).padStart(15)}`);
}
if (Object.keys(blockedReasons).length) {
  console.log("\nBlocked, by reason:");
  for (const [r, c] of Object.entries(blockedReasons).sort((a, b) => b[1] - a[1])) console.log(`  ${String(c).padStart(4)}  ${r}`);
}
if (failures.some((f) => f.uncertain)) console.log("\nUncertain failures: a person must check the account before any retry (publish(id, { retryUncertain: true })).");
if (bad) console.log(`\n${bad} unreadable line(s) skipped.`);
