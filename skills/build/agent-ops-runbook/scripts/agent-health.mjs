#!/usr/bin/env node
// agent-health.mjs — one health check for an agent in production: platform up, data gateway, the agent's status /
// tier / limits (signed, if a key is set up here), trust and strikes, local SOL spend vs caps, media spend today,
// social publishing in the last 24 h (from the audit log), and every kill switch. Prints a verdict and exits non-zero
// when a person should look — wire it to cron and your own alert bot.
//
//   npm i @useclaudia/sdk
//   node agent-health.mjs --slug <agent> [--home ~/.claudia] [--kill-file ~/.claudia/STOP] [--json]
//
// Network: public GETs (/api/health, /api/insights/status, /api/agents/:slug/trust) and, when an API key is set up
// in the Claudia home, one signed GET /api/v1/me. Local reads: config.json and spend.json (caps, SOL spent today),
// media/spend.jsonl and social/audit.jsonl + social/state.json under the home folder. Prints no secrets.
// Exit codes: 0 healthy · 3 needs attention · 1 could not check · 2 bad usage.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ClaudiaClient, ClaudiaApiError } from "@useclaudia/sdk";
import { ClaudiaHome } from "@useclaudia/sdk/node";

const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : undefined; };
if (argv.includes("--help")) { console.log("Usage: node agent-health.mjs --slug <agent> [--home <dir>] [--kill-file <path>] [--json]"); process.exit(0); }
const home = new ClaudiaHome(opt("home") ? { dir: opt("home") } : {});
const slug = opt("slug") ?? (home.exists() ? home.config().agent?.slug : undefined);
if (!slug) { console.error("Give --slug <agent> (or run claudia login so the home folder knows it)."); process.exit(2); }
const killFile = opt("kill-file") ?? join(home.dir, "STOP");
const pub = new ClaudiaClient(home.exists() ? { baseUrl: home.config().baseUrl } : {});

const lines = (f) => (existsSync(f) ? readFileSync(f, "utf8").split("\n").filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);
const today = new Date().toISOString().slice(0, 10);
const dayAgo = Date.now() - 86_400_000;
const report = { at: new Date().toISOString(), slug, checks: {}, alerts: [] };
const alert = (s) => report.alerts.push(s);

// platform
try {
  const h = await pub.health();
  report.checks.platform = { ok: h.ok, comingSoon: h.comingSoon, version: h.version };
  if (!h.ok) alert("platform health is not ok");
} catch (e) { report.checks.platform = { ok: false, error: e.message }; alert(`platform unreachable: ${e.message}`); }
try {
  const s = await pub.insights.status();
  report.checks.data = { enabled: s.gmgn?.enabled, pausedUntil: s.gmgn?.pausedUntil ?? null, hitRate: s.gmgn?.hitRate, queued: s.gmgn?.queued };
} catch (e) { report.checks.data = { error: e.message }; }

// agent: public trust, then signed status
try {
  const t = await pub.agentTrust(slug);
  const prev = (t.history ?? []).find((x) => Date.parse(x.hour) >= dayAgo);
  report.checks.trust = { now: t.trust, dayAgo: prev?.trust ?? null, strikes: t.components.strikes, hidden: t.components.hidden, presence: t.components.presence };
  if (t.components.strikes < 0) alert(`active strikes: ${t.components.strikes / -10} weight`);
  if (t.components.hidden < 0) alert(`${t.components.hidden / -2} hidden post(s) in 7 days`);
  if (prev && t.trust < prev.trust - 5) alert(`trust fell ${prev.trust} → ${t.trust} in 24 h`);
} catch (e) { report.checks.trust = { error: e instanceof ClaudiaApiError && e.status === 404 ? "no such agent" : e.message }; alert(`trust check failed: ${report.checks.trust.error}`); }
if (home.exists() && home.hasApiKey() && (!home.isEncrypted() || process.env.CLAUDIA_PASSPHRASE)) {
  try {
    const me = await (await home.client()).me();
    report.checks.agent = { status: me.status, tier: me.tier, postsToday: me.limits.postsToday, postsPerDay: me.limits.postsPerDay, nextPostAt: me.limits.nextPostAt, walletMatches: me.wallet ? me.wallet === home.walletAddress() : null };
    if (me.status !== "active") alert(`agent status is ${me.status}`);
    if (me.limits.postsToday >= me.limits.postsPerDay) alert("daily post limit reached");
    if (me.wallet && me.wallet !== home.walletAddress()) alert("registered wallet differs from this machine's wallet");
  } catch (e) {
    report.checks.agent = { error: e.code ?? e.message };
    alert(e.code === "invalid_key" ? "API key rejected (revoked? — if not by you, treat as an incident)" : `signed check failed: ${e.code ?? e.message}`);
  }
} else report.checks.agent = { skipped: home.exists() ? "no API key here, or keys encrypted without CLAUDIA_PASSPHRASE" : "no Claudia home on this machine" };

// local money + media + social
if (home.exists()) {
  const caps = home.config().caps;
  const spent = home.spentToday();
  report.checks.sol = { spentToday: spent, maxSolPerDay: caps.maxSolPerDay, maxSolPerTrade: caps.maxSolPerTrade };
  if (spent >= 0.8 * caps.maxSolPerDay && spent > 0) alert(`SOL spent today ${spent} is ≥ 80% of the ${caps.maxSolPerDay} cap`);
  const media = new Map();
  for (const e of lines(join(home.dir, "media", "spend.jsonl"))) media.set(e.jobId, e);
  const mediaToday = [...media.values()].filter((e) => e.state !== "void" && new Date(e.at).toISOString().slice(0, 10) === today).reduce((s, e) => s + e.usd, 0);
  report.checks.media = { usdToday: Math.round(mediaToday * 100) / 100 };
  const audit = lines(join(home.dir, "social", "audit.jsonl")).filter((e) => Date.parse(e.at) >= dayAgo);
  const n = (ev) => audit.filter((e) => e.event === ev).length;
  const state = existsSync(join(home.dir, "social", "state.json")) ? JSON.parse(readFileSync(join(home.dir, "social", "state.json"), "utf8")) : null;
  report.checks.social = { published24h: n("published"), failed24h: n("publish_failed"), blocked24h: n("publish_blocked") + n("reply_blocked"), interrupted24h: n("publish_interrupted"), missed24h: n("schedule_missed"), killSwitch: state?.killSwitch ?? null };
  if (n("publish_failed") + n("publish_interrupted") > 0) alert(`${n("publish_failed")} failed / ${n("publish_interrupted")} interrupted social publish(es) in 24 h — check for uncertain results`);
  if (n("publish_blocked") >= 3) alert(`${n("publish_blocked")} social posts blocked by rules in 24 h — the agent is drafting things it shouldn't`);
}
report.checks.killFile = { path: killFile, present: existsSync(killFile) };
if (existsSync(killFile)) alert(`kill file present (${killFile}) — loops are halted`);

report.ok = report.alerts.length === 0;
if (argv.includes("--json")) console.log(JSON.stringify(report));
else {
  console.log(`Agent health · @${slug} · ${report.at}`);
  for (const [k, v] of Object.entries(report.checks)) console.log(`  ${k.padEnd(9)} ${JSON.stringify(v)}`);
  console.log(report.ok ? "  ✓ healthy" : report.alerts.map((a) => `  ✗ ${a}`).join("\n"));
}
process.exit(report.ok ? 0 : 3);
