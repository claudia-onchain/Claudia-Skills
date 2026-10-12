#!/usr/bin/env node
// alert-gate.mjs: thresholds, de-duplication, quiet hours and an hourly cap in front of `claudia watch --json`.
// Reads JSON lines ({ event, at, data }) on stdin. By default it only PRINTS what it would send (dry run).
// With --send it makes network calls: it posts each passing alert to ONE destination you configure in the environment:
//   ALERT_DISCORD_WEBHOOK=<discord webhook url>              Discord
//   ALERT_TELEGRAM_TOKEN=<bot token> ALERT_TELEGRAM_CHAT=<chat id>   Telegram Bot API
//   ALERT_WEBHOOK_URL=<https url>                            any webhook (JSON { source, text, data, at })
// No dependencies. Node >= 20. Secrets are read from the environment and never printed.
//
//   claudia watch claudia --json | node alert-gate.mjs --min-usd 1000 --quiet 23:00-07:00 --tz Europe/London
//   claudia watch wallet <addr> --json | node alert-gate.mjs --exclude-tags bot,wash --dedupe-minutes 60 --send
//
// Flags:
//   --min-usd <n>          drop trades below n USD (for launches: market cap below n)
//   --tags a,b             keep trades only when the wallet has one of these tags (kol, smart, whale, …)
//   --exclude-tags a,b     drop trades whose wallet has any of these tags (default: bot,wash,rat)
//   --match <regex>        keep only alerts whose text matches (case-insensitive)
//   --dedupe-minutes <n>   suppress the same event key for n minutes (default 30)
//   --per-hour <n>         at most n alerts per rolling hour; the rest are counted (default 20)
//   --quiet HH:MM-HH:MM    quiet hours; alerts are held and sent as one summary when quiet hours end
//   --quiet-drop           during quiet hours drop alerts instead of holding them
//   --tz <IANA zone>       time zone for quiet hours (default UTC)
//   --state <file>         remember de-dupe keys across restarts (JSON file in the working directory)
//   --send                 actually send (otherwise: dry run, print only)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createInterface } from "node:readline";

const argv = process.argv.slice(2);
const has = (n) => argv.includes(`--${n}`);
const val = (n, d) => {
  const i = argv.indexOf(`--${n}`);
  return i === -1 ? d : argv[i + 1];
};
const list = (s) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : []);

const minUsd = Number(val("min-usd", 0));
const wantTags = list(val("tags"));
const dropTags = list(val("exclude-tags", "bot,wash,rat"));
const match = val("match") ? new RegExp(val("match"), "i") : null;
const dedupeMs = Number(val("dedupe-minutes", 30)) * 60_000;
const perHour = Number(val("per-hour", 20));
const tz = val("tz", "UTC");
const quiet = val("quiet");
const quietDrop = has("quiet-drop");
const statePath = val("state");
const send = has("send");

const qm = quiet && /^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/.exec(quiet);
if ((quiet && !qm) || !Number.isFinite(minUsd) || !Number.isFinite(dedupeMs) || !(perHour > 0)) {
  console.error("Usage: claudia watch … --json | node alert-gate.mjs [--min-usd n] [--tags a,b] [--exclude-tags a,b] [--match re] [--dedupe-minutes n] [--per-hour n] [--quiet HH:MM-HH:MM [--quiet-drop]] [--tz Zone] [--state file] [--send]");
  process.exit(2);
}
const qStart = qm ? +qm[1] * 60 + +qm[2] : 0;
const qEnd = qm ? +qm[3] * 60 + +qm[4] : 0;
const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const minutesNow = () => {
  const [h, m] = fmt.format(new Date()).split(":").map(Number);
  return h * 60 + m;
};
const inQuiet = () => {
  if (!qm) return false;
  const t = minutesNow();
  return qStart <= qEnd ? t >= qStart && t < qEnd : t >= qStart || t < qEnd; // handles 23:00-07:00
};

// --- destination (only used with --send)
const env = process.env;
const dest = env.ALERT_DISCORD_WEBHOOK ? "discord" : env.ALERT_TELEGRAM_TOKEN && env.ALERT_TELEGRAM_CHAT ? "telegram" : env.ALERT_WEBHOOK_URL ? "webhook" : null;
if (send && !dest) {
  console.error("--send needs ALERT_DISCORD_WEBHOOK, or ALERT_TELEGRAM_TOKEN + ALERT_TELEGRAM_CHAT, or ALERT_WEBHOOK_URL in the environment.");
  process.exit(4);
}
async function deliver(text, data) {
  if (!send) return console.log(`[dry run] would send: ${text}`);
  const req =
    dest === "discord" ? { url: env.ALERT_DISCORD_WEBHOOK, body: { content: text.slice(0, 1900), allowed_mentions: { parse: [] } } }
    : dest === "telegram" ? { url: `https://api.telegram.org/bot${env.ALERT_TELEGRAM_TOKEN}/sendMessage`, body: { chat_id: env.ALERT_TELEGRAM_CHAT, text: text.slice(0, 4000) } }
    : { url: env.ALERT_WEBHOOK_URL, body: { source: "claudia-alert-gate", text, data, at: new Date().toISOString() } };
  const res = await fetch(req.url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(req.body), signal: AbortSignal.timeout(10_000) });
  if (!res.ok) console.error(`send failed: HTTP ${res.status} (${dest})`);
  else console.log(`sent (${dest}): ${text.slice(0, 120)}`);
}

// --- de-dupe state
const seen = new Map(statePath && existsSync(statePath) ? Object.entries(JSON.parse(readFileSync(statePath, "utf8"))) : []);
const saveState = () => statePath && writeFileSync(statePath, JSON.stringify(Object.fromEntries(seen)));
const usd = (n) => `$${Math.round(n).toLocaleString("en-US")}`;
const short = (a) => (a && a.length > 10 ? `${a.slice(0, 4)}…${a.slice(-4)}` : a ?? "");

/** Returns { key, text, usd, tags } for a watch event, or null for events we don't alert on. */
function describe({ event, data }) {
  if (event === "trade" && data.wallet) {
    const coin = data.symbol ? `$${data.symbol}` : data.tokenKey; // FeedTrade (watch wallet)
    return { key: `w:${data.tx ?? `${data.tokenKey}:${data.at}`}:${data.side}`, usd: data.amountUsd, tags: data.wallet.tags ?? [], text: `${short(data.wallet.address)} ${data.side === "buy" ? "bought" : "sold"} ${usd(data.amountUsd)} of ${coin}` };
  }
  if (event === "trade") {
    return { key: `t:${data.tx}:${data.trader}:${data.side}`, usd: data.amountUsd, tags: data.tags ?? [], text: `${data.side.toUpperCase()} ${usd(data.amountUsd)} by ${short(data.trader)}${data.tags?.length ? ` [${data.tags.join(", ")}]` : ""} · mcap ${usd(data.mcapUsd ?? 0)}` };
  }
  if (event === "launch") return { key: `l:${data.key}`, usd: data.mcapUsd ?? 0, tags: [], text: `New coin $${data.symbol} · mcap ${usd(data.mcapUsd ?? 0)} · ${data.key}` };
  if (event === "message") return { key: `m:${data.id}`, usd: Infinity, tags: [], text: `#${data.room ?? "thread"} ${data.agent?.name ?? ""}: ${String(data.content).slice(0, 300)}` };
  if (event === "alert") return { key: `a:${data.alert?.message}`, usd: Infinity, tags: [], text: `Alert: ${data.alert?.message}` };
  return null; // board upserts are too frequent to alert on
}

const sentTimes = [];
let overCap = 0;
const held = [];

async function maybeFlushHeld() {
  if (!held.length || inQuiet()) return;
  const lines = held.splice(0);
  await deliver(`Quiet hours ended. ${lines.length} alert(s) while quiet:\n- ${lines.slice(0, 15).join("\n- ")}${lines.length > 15 ? `\n- …and ${lines.length - 15} more` : ""}\nResearch alert, not financial advice.`);
}
setInterval(() => void maybeFlushHeld(), 60_000).unref();

const rl = createInterface({ input: process.stdin });
for await (const line of rl) {
  if (!line.trim()) continue;
  let ev;
  try { ev = JSON.parse(line); } catch { continue; } // ignore non-JSON lines
  const d = ev?.data && describe(ev);
  if (!d) continue;
  if (d.usd < minUsd) continue;
  if (dropTags.some((t) => d.tags.includes(t))) continue;
  if (wantTags.length && ev.event === "trade" && !wantTags.some((t) => d.tags.includes(t))) continue;
  if (match && !match.test(d.text)) continue;
  const now = Date.now();
  if (now - (seen.get(d.key) ?? 0) < dedupeMs) continue;
  seen.set(d.key, now);
  for (const [k, t] of seen) if (now - t > dedupeMs) seen.delete(k);
  saveState();
  if (inQuiet()) {
    if (!quietDrop) held.push(d.text);
    continue;
  }
  await maybeFlushHeld();
  while (sentTimes.length && now - sentTimes[0] > 3_600_000) sentTimes.shift();
  if (sentTimes.length >= perHour) { overCap++; continue; }
  sentTimes.push(now);
  const prefix = overCap ? `(+${overCap} over the hourly cap) ` : "";
  overCap = 0;
  await deliver(`${prefix}${d.text}\nResearch alert, not financial advice.`, ev.data);
}
await maybeFlushHeld();
if (held.length) console.error(`${held.length} alert(s) were still held for quiet hours when the input ended; not sent.`);
