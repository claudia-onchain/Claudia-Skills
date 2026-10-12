#!/usr/bin/env node
// owner-bot.mjs — a private Telegram control bot for your agent. Node >= 20, no dependencies.
//
// What it does:
//   - Long-polls getUpdates (no webhook, no open port). Only this program may read this bot's updates.
//   - Pairs with ONE owner: prints a 6-digit code to THIS terminal; the owner sends "/pair <code>" in a private chat.
//   - Answers the paired owner's numeric id only, in private chats only. Strangers get one "This bot is private."
//   - Shows items your app writes to approvals.json as messages with Approve / Deny buttons, and records the
//     owner's answer back into approvals.json. It never posts, trades or changes settings itself: your app reads
//     the answer and does the work (with its own dry run, caps and confirm rules).
//   - Forwarded and quoted text is wrapped as <outside source="channel"> before your agent sees it.
//
// Usage:
//   export TELEGRAM_CONTROL_BOT_TOKEN="<your-bot-token>"     # never print it, never commit it
//   node owner-bot.mjs [--dir ./telegram-control]           # state + approvals.json live in --dir
//
// approvals.json (written by your app; the bot only fills `answer`):
//   [{ "id": "p_101", "kind": "social_post", "title": "Publish this post?", "body": "…",
//      "options": ["Approve", "Deny"], "status": "pending" }]
// After a press: status "answered", answer { "option": "Approve", "by": <owner id>, "at": "<ISO time>" }.
//
// Exit codes: 0 stopped with Ctrl-C · 1 error · 4 no token.
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync, chmodSync } from "node:fs";
import { join, resolve } from "node:path";
import { randomInt } from "node:crypto";

const TOKEN = process.env.TELEGRAM_CONTROL_BOT_TOKEN?.trim();
if (!TOKEN) { console.error("Set TELEGRAM_CONTROL_BOT_TOKEN (from your key store) first."); process.exit(4); }

const argDir = process.argv.indexOf("--dir");
const DIR = resolve(argDir > 0 ? process.argv[argDir + 1] : "./telegram-control");
mkdirSync(DIR, { recursive: true, mode: 0o700 });
const STATE = join(DIR, "state.json");          // { owner, offset, strangers, sent }
const APPROVALS = join(DIR, "approvals.json");  // your app's queue
const INBOX = join(DIR, "inbox.jsonl");         // owner messages for your agent, one JSON line each

const readJson = (f, d) => { try { return JSON.parse(readFileSync(f, "utf8")); } catch { return d; } };
function writeJson(f, v) {
  const tmp = `${f}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(v, null, 2) + "\n", { mode: 0o600 });
  chmodSync(tmp, 0o600);
  renameSync(tmp, f);
}
const state = { owner: null, offset: 0, strangers: [], sent: {}, ...readJson(STATE, {}) };
const save = () => writeJson(STATE, state);

// ── Bot API ─────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(method, params = {}, timeoutMs = 15_000) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(params),
      signal: AbortSignal.timeout(timeoutMs), redirect: "error",
    });
    const j = await r.json().catch(() => ({}));
    if (j.ok) return j.result;
    if (r.status === 429) { await sleep(((j.parameters?.retry_after ?? 5) + 1) * 1000); continue; } // flood control
    const e = new Error(`Telegram ${method}: ${j.description || r.status}`); // never includes the token
    e.status = r.status;
    throw e;
  }
  throw new Error(`Telegram ${method}: still rate limited`);
}
const send = (chat_id, text, extra = {}) =>
  api("sendMessage", { chat_id, text: String(text).slice(0, 4000), link_preview_options: { is_disabled: true }, ...extra });

// ── pairing ─────────────────────────────────────────────────────────────────
let pairing = null; // { code, expiresAt, tries }
function newPairing() {
  pairing = { code: String(randomInt(0, 1_000_000)).padStart(6, "0"), expiresAt: Date.now() + 10 * 60_000, tries: 0 };
  console.log(`Pair from your phone: send "/pair ${pairing.code}" to the bot in a private chat (valid 10 min).`);
}
const isOwner = (id) => state.owner && String(state.owner.id) === String(id);

async function stranger(m) {
  const id = String(m.from.id);
  if (state.strangers.includes(id)) return;
  state.strangers = [id, ...state.strangers].slice(0, 500);
  save();
  await send(m.chat.id, "This bot is private.").catch(() => {});
}

async function tryPair(m, code) {
  if (isOwner(m.from.id)) return send(m.chat.id, "You're already paired.");
  if (!pairing || pairing.expiresAt < Date.now()) return stranger(m);
  if (code !== pairing.code) {
    if (++pairing.tries >= 5) { pairing = null; console.log("Five wrong codes: pairing canceled. Restart to get a new code."); }
    return send(m.chat.id, "That code doesn't match.");
  }
  pairing = null;
  state.owner = { id: String(m.from.id), pairedAt: new Date().toISOString() };
  state.strangers = state.strangers.filter((x) => x !== String(m.from.id));
  save();
  console.log(`Paired with Telegram user id ${state.owner.id}.`);
  return send(m.chat.id, "Paired. Approvals arrive here with buttons. /pending lists what's waiting.");
}

// ── approvals ───────────────────────────────────────────────────────────────
const approvals = () => { const v = readJson(APPROVALS, []); return Array.isArray(v) ? v : []; };
const buttons = (it) => ({
  inline_keyboard: [(it.options || ["Approve", "Deny"]).slice(0, 4).map((label, n) => ({
    text: String(label).slice(0, 40), callback_data: `a:${String(it.id).slice(0, 48)}:${n}`, // 1-64 bytes
  }))],
});
const itemText = (it) => `${it.title || "Approval"}\n\n${it.body || ""}`.trim();

async function pushPending() {
  if (!state.owner) return;
  for (const it of approvals().filter((x) => x.status === "pending" && !state.sent[x.id])) {
    const msg = await send(state.owner.id, itemText(it), { reply_markup: buttons(it) });
    state.sent[it.id] = { chat_id: msg.chat.id, message_id: msg.message_id };
    save();
  }
}

async function onCallback(q) {
  const ack = (text) => api("answerCallbackQuery", { callback_query_id: q.id, ...(text ? { text: String(text).slice(0, 190) } : {}) }).catch(() => {});
  if (!isOwner(q.from?.id)) return ack("This bot is private.");
  const [kind, id, n] = String(q.data || "").split(":");
  if (kind !== "a") return ack();
  const list = approvals();
  const it = list.find((x) => String(x.id) === id);
  if (!it) return ack("That approval is gone.");
  if (it.status !== "pending") return ack(`Already ${it.status}.`);
  const option = (it.options || ["Approve", "Deny"])[Number(n)];
  if (option === undefined) return ack("Unknown button.");
  it.status = "answered";
  it.answer = { option, by: String(q.from.id), at: new Date().toISOString() };
  writeJson(APPROVALS, list); // your app picks this up and does the work, or not
  await ack(option);
  if (q.message) {
    await api("editMessageText", {
      chat_id: q.message.chat.id, message_id: q.message.message_id,
      text: `${itemText(it)}\n\n${option} by you, ${it.answer.at.slice(11, 16)} UTC`.slice(0, 4000),
      reply_markup: { inline_keyboard: [] }, // no second press on an old message
    }).catch(() => {});
  }
}

// ── owner messages → your agent ────────────────────────────────────────────
function wrapOutside(text, from) {
  const body = String(text).slice(0, 8000).replaceAll("</outside>", "<\\/outside>");
  return `<outside source="channel" from="${String(from).replace(/["<>\n]/g, "").slice(0, 80)}">\n${body}\n</outside>`;
}
function promptFrom(m, text) {
  if (m.forward_origin) {
    const who = m.forward_origin.sender_user?.username || m.forward_origin.chat?.title || m.forward_origin.sender_user_name || "someone";
    return { origin: "channel", prompt: `I forwarded you this message:\n${wrapOutside(text, `forwarded from ${who}`)}` };
  }
  const quoted = m.quote?.text || m.reply_to_message?.text || "";
  if (quoted) return { origin: "user", prompt: `${text}\n\nThe message I'm replying to:\n${wrapOutside(quoted, "quoted message")}` };
  return { origin: "user", prompt: text };
}

async function onMessage(m) {
  if (!m?.from || m.from.is_bot || m.chat?.type !== "private") return; // private chats only
  const text = String(m.text || m.caption || "").trim();
  const pair = /^\/pair(?:@\w+)?\s+(\d{6})\s*$/i.exec(text);
  if (pair) return tryPair(m, pair[1]);
  if (!isOwner(m.from.id)) return stranger(m);
  if (/^\/pending\b/i.test(text)) {
    const p = approvals().filter((x) => x.status === "pending");
    if (!p.length) return send(m.chat.id, "Nothing is waiting for you.");
    for (const it of p.slice(0, 10)) await send(m.chat.id, itemText(it), { reply_markup: buttons(it) });
    return;
  }
  if (!text) return send(m.chat.id, "I can read text messages.");
  // Hand the owner's message to your agent. `origin` says whether it may lead to an action proposal at all;
  // even "user" messages only ever create approvals, never actions.
  const line = { at: new Date().toISOString(), ...promptFrom(m, text) };
  writeFileSync(INBOX, JSON.stringify(line) + "\n", { flag: "a", mode: 0o600 });
  return send(m.chat.id, "Got it. Anything that needs your yes will arrive here with buttons.");
}

// ── loop ───────────────────────────────────────────────────────────────────
let running = true;
process.on("SIGINT", () => { running = false; console.log("\nStopping."); setTimeout(() => process.exit(0), 200); });

async function main() {
  const me = await api("getMe");
  console.log(`Control bot @${me.username} is up. Data folder: ${DIR}`);
  if (!existsSync(APPROVALS)) writeJson(APPROVALS, []);
  if (!state.owner) newPairing();
  let wait = 1000;
  while (running) {
    try {
      await pushPending();
      const updates = await api("getUpdates", { offset: state.offset, timeout: 25, allowed_updates: ["message", "callback_query"] }, 40_000);
      for (const u of updates) {
        state.offset = u.update_id + 1;
        save();
        if (u.callback_query) await onCallback(u.callback_query).catch((e) => console.error(e.message));
        else if (u.message) await onMessage(u.message).catch((e) => console.error(e.message));
      }
      wait = 1000;
    } catch (e) {
      if (e.status === 409) console.error("Another program reads this bot's updates (a webhook or a second copy). Use a bot only this program reads.");
      else if (e.status === 401) { console.error("Telegram doesn't accept this token. Regenerate it with /token in @BotFather."); process.exit(1); }
      else console.error(e.message);
      await sleep(wait);
      wait = Math.min(wait * 2, 60_000);
    }
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); });
