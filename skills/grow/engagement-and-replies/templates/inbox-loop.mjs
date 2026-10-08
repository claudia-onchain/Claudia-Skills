// inbox-loop.mjs — read → pre-filter → classify → draft → queue for a person's approval → paced send.
// Node >= 20, ESM. Needs `npm i @useclaudia/social` and accounts already connected with the operator's own keys.
// NETWORK: `pull` reads the inbox (X reads are billed per post, see triage-rules.json budgets); `send --live` publishes.
// Everything else is local. `send` is a dry run unless --live is given. Nothing is sent without an approval.
//
//   node inbox-loop.mjs pull                     # fetch new items, triage, create reply drafts (pending_approval)
//   node inbox-loop.mjs list                     # show drafts waiting for approval, with previews
//   node inbox-loop.mjs approve <draftId> [--text "edited reply"]   # a person approves (optionally edits first)
//   node inbox-loop.mjs reject <draftId> [why]
//   node inbox-loop.mjs send [--live]            # publish approved replies, paced; dry run by default
//   node inbox-loop.mjs kill on|off              # kill switch
//
// Files: ./triage-rules.json and ./reply-library.json (convert the YAML once, e.g. with `npx js-yaml reply-library.yaml`),
// queue at $CLAUDIA_HOME/social/inbox-queue.jsonl, handoffs at $CLAUDIA_HOME/social/handoffs.md.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createSocial, envKeys, chainKeys } from "@useclaudia/social";

const HOME = process.env.CLAUDIA_HOME ?? path.join(os.homedir(), ".claudia");
const QUEUE = path.join(HOME, "social", "inbox-queue.jsonl");
const HANDOFFS = path.join(HOME, "social", "handoffs.md");
const rules = JSON.parse(fs.readFileSync(new URL("./triage-rules.json", import.meta.url), "utf8"));
const library = JSON.parse(fs.readFileSync(new URL("./reply-library.json", import.meta.url), "utf8"));

const social = createSocial({
  keys: chainKeys(envKeys()),
  inboxBudget: { x: { perDay: rules.budgets.xReadsPerDay } },
});
await social.ready();
social.on("warning", (w) => console.error("warning:", w.message));

// ---------- triage ----------
const filters = rules.preFilters.map((f) => ({ ...f, re: new RegExp(f.pattern, f.flags) }));
function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
function triage(item) {
  const own = Object.values(rules.agent.handles).map((h) => h.toLowerCase());
  const from = String(item.from ?? "").replace(/^@/, "").toLowerCase();
  if (from && !own.includes(from) && own.some((h) => editDistance(h, from) <= rules.lookalikeHandles.maxEditDistance))
    return { cls: "scam-impersonation", reason: `lookalike handle ${item.from}` };
  // Riskiest rule hit wins: order filters so safety and scams come first.
  const order = ["safety", "scam-impersonation", "press", "coin-talk", "collab-business"];
  const hits = filters.filter((f) => f.re.test(item.text ?? "")).sort((a, b) => order.indexOf(a.class) - order.indexOf(b.class));
  if (hits.length) return { cls: hits[0].class, reason: `rule ${hits[0].name}` };
  const urls = (item.text ?? "").match(/https?:\/\/[^\s)]+/g) ?? [];
  if (urls.some((u) => !rules.links.allow.some((d) => new URL(u).hostname.endsWith(d))))
    return { cls: "spam", reason: "unknown link" };
  return classifyLight(item.text ?? "");
}
// Light keyword fallback. Swap in a call to the operator's own model (with their key) for better classes;
// rule hits above always win over the model.
function classifyLight(t) {
  const s = t.toLowerCase();
  if (/\b(are you (real|ai|a bot)|real person|who made you)\b/.test(s)) return { cls: "question-persona", reason: "persona" };
  if (/\b(broken|error|bug|doesn'?t work|won'?t load|can'?t (log|sign))\b/.test(s)) return { cls: "feedback-bug", reason: "bug words" };
  if (/\?|\bhow (do|can)|\bwhere\b|\bwhen\b/.test(s)) return { cls: "question-product", reason: "question" };
  if (/\b(do a video|make one about|next video|can you do)\b/.test(s)) return { cls: "content-request", reason: "request" };
  if (/\b(wrong|incorrect|misleading|you said)\b/.test(s)) return { cls: "criticism-fair", reason: "criticism words" };
  if (/\b(love|amazing|unreal|beautiful|obsessed|so good)\b/.test(s)) return { cls: "praise", reason: "praise words" };
  return { cls: "troll-bait", reason: "no clear intent (person may reclassify)" };
}
function pickTemplate(cls, network) {
  const fixed = rules.classes[cls]?.fixedTemplate;
  const pool = library.templates.filter((t) => (fixed ? t.id === fixed : t.classes.includes(cls)) && t.networks.includes(network));
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}

// ---------- queue ----------
const readQueue = () => (fs.existsSync(QUEUE) ? fs.readFileSync(QUEUE, "utf8").trim().split("\n").filter(Boolean).map(JSON.parse) : []);
const appendQueue = (row) => { fs.mkdirSync(path.dirname(QUEUE), { recursive: true }); fs.appendFileSync(QUEUE, JSON.stringify(row) + "\n", { mode: 0o600 }); };
function handoff(item, cls, reason, draftId) {
  const risk = rules.classes[cls]?.risk?.toUpperCase() ?? "HIGH";
  const block = [
    `[${risk}] ${cls} on ${item.network} · ${new Date(item.at).toISOString()}`,
    `From: ${item.from}`, `Link: ${item.url ?? "(no url)"}`,
    `Said: "${String(item.text).slice(0, 200)}"`,
    `Why it's escalated: ${reason}`,
    `What I did: ${draftId ? `drafted ${draftId} (not sent)` : "nothing sent"}`,
    `Reply "done", "send draft", or edit the draft id ${draftId ?? "-"}.`, "",
  ].join("\n");
  fs.appendFileSync(HANDOFFS, block + "\n", { mode: 0o600 });
  console.log(block); // the host forwards this to the operator's own Telegram/Discord
}

// ---------- commands ----------
const [cmd, ...args] = process.argv.slice(2);

if (cmd === "pull") {
  const seen = new Set(readQueue().map((r) => r.itemId));
  const items = await social.inbox({ since: Date.now() - rules.pacing.staleAfterHours * 3600_000 });
  for (const item of items) {
    if (seen.has(item.id)) continue;
    const { cls, reason } = triage(item);
    const c = rules.classes[cls] ?? { risk: "high", escalate: true };
    let draftId = null;
    if (item.kind === "dm" && cls !== "collab-business") {
      appendQueue({ itemId: item.id, cls, reason, status: "dm-person-only", at: item.at });
      handoff(item, cls, `DM: ${reason}`, null);
      continue;
    }
    if (c.reply !== false) {
      const tpl = pickTemplate(cls, item.network);
      if (tpl) {
        const text = tpl.text.replace("{specific}", "").replace(/\s{2,}/g, " ").trim(); // person adds the specific clause
        const d = social.draft({ text, replyTo: { network: item.network, id: item.id }, targets: [{ account: item.account }] });
        const [pv] = social.preview(d.id);
        if (pv?.blocked) appendQueue({ itemId: item.id, cls, reason, status: `blocked: ${pv.blocked}` });
        else { social.submit(d.id); draftId = d.id; appendQueue({ itemId: item.id, cls, reason, draftId, template: tpl.id, status: "pending_approval", needsSpecific: !tpl.fixed, at: item.at }); }
      }
    } else appendQueue({ itemId: item.id, cls, reason, status: "no-reply", at: item.at });
    if (c.escalate || c.risk === "high" || c.risk === "critical") handoff(item, cls, reason, draftId);
  }
  console.log(`pulled ${items.length} item(s)`);
} else if (cmd === "list") {
  for (const p of social.posts({ status: "pending_approval" })) {
    const [pv] = social.preview(p.id);
    console.log(`${p.id}  ${pv?.network}  ${pv?.chars} chars  cost $${pv?.costUsd ?? 0}\n  ${pv?.text?.replace(/\n/g, "\n  ")}\n  warnings: ${(pv?.warnings ?? []).join("; ") || "none"}\n`);
  }
} else if (cmd === "approve") {
  const [id, flag, ...rest] = args;
  if (flag === "--text") social.update(id, { text: rest.join(" ") }); // editing sends it back to pending; approve below
  social.approve(id);
  console.log(`approved ${id} — it will go out on the next paced send`);
} else if (cmd === "reject") {
  social.reject(args[0], args.slice(1).join(" ") || "rejected by reviewer");
} else if (cmd === "send") {
  const live = args.includes("--live");
  if (social.killSwitch()) { console.log("kill switch is on — nothing sent"); process.exit(0); }
  const p = rules.pacing;
  const hhmm = new Date().toLocaleTimeString("en-GB", { timeZone: rules.agent.timezone, hour: "2-digit", minute: "2-digit" });
  const quiet = p.quietHours.start > p.quietHours.end ? hhmm >= p.quietHours.start || hhmm < p.quietHours.end : hhmm >= p.quietHours.start && hhmm < p.quietHours.end;
  if (quiet) { console.log(`quiet hours (${hhmm}) — nothing sent`); process.exit(0); }
  // One send per run per account; run `send` from a timer every rules.pacing.minGapMinutes minutes.
  const done = new Set();
  for (const post of social.posts({ status: "approved" })) {
    const acct = post.targets?.[0]?.account;
    if (done.has(acct)) continue;
    const res = await social.publish(post.id, { dryRun: !live });
    done.add(acct);
    console.log(live ? `${post.id} → ${res.status} ${res.results?.[0]?.url ?? res.results?.[0]?.error?.message ?? ""}` : `dry run ${post.id}: ${res.requests?.length ?? 0} request(s)`);
  }
} else if (cmd === "kill") {
  social.killSwitch(args[0] === "on");
  console.log(`kill switch ${social.killSwitch() ? "ON" : "off"}`);
} else {
  console.log("usage: pull | list | approve <id> [--text …] | reject <id> [why] | send [--live] | kill on|off");
}
await social.close?.();
