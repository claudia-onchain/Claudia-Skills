#!/usr/bin/env node
// batch.mjs — estimate (default), queue, check and approve a batch of @useclaudia/media jobs from a JSON manifest.
//
//   node batch.mjs estimate <manifest.json>           price every item + total. No keys, no network, nothing written.
//   node batch.mjs run <manifest.json> --yes          queue jobs with YOUR keys (CLAUDIA_KEY_*). Jobs above the manifest's
//                                                     approveAboveUsd stop at needs_approval. Network: provider APIs only.
//   node batch.mjs status [--limit 50]                list jobs in the media data dir (no network).
//   node batch.mjs approve <jobId> [...]              a PERSON approves jobs at an interactive prompt. Refuses without a TTY,
//                                                     so an agent cannot approve its own jobs.
// Items carry an optional "stage" (default 1): stills are stage 1, the videos/lip-syncs that use their picked outputs as
// refs are stage 2+. `run` queues one stage at a time (--stage 2), after a person has picked and copied the stage-1 outputs.
// Options: --stage <n> · --media <path to @useclaudia/media dist/index.js> (else resolved normally) · --data-dir <dir> · --json
// Node >= 20. Never prints keys. Exit codes: 0 ok · 1 error · 2 bad usage · 3 refused (over budget / no approval).

import { readFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const argv = process.argv.slice(2);
const flags = {};
const pos = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith("--")) {
    const k = a.slice(2);
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith("--") && ["media", "data-dir", "limit", "stage"].includes(k)) { flags[k] = next; i++; }
    else flags[k] = true;
  } else pos.push(a);
}
const cmd = pos[0];
const out = (s = "") => process.stdout.write(s + "\n");
const err = (s) => process.stderr.write(s + "\n");
const usd = (n) => `$${n.toFixed(n < 1 ? 4 : 2)}`;

if (!cmd || !["estimate", "run", "status", "approve"].includes(cmd)) {
  err("Usage: node batch.mjs estimate|run <manifest.json> · status · approve <jobId…>");
  process.exit(2);
}

// ---- built-in price snapshot (from @useclaudia/media's model table, checked 2026-10-08) -------------------------------
// Used only when the package can't be loaded. The package's own estimate() always wins when it is available.
const MP = { "512": 0.25, "1K": 1, "2K": 4, "4K": 16 };
const per = (rate, dflt, confidence = "list") => (r) => ({ usd: rate(r) * (r.durationSec ?? dflt), basis: `per second, ${r.durationSec ?? dflt} s`, confidence });
const SNAPSHOT = {
  "google/nano-banana-2.1": (r) => ({ usd: { "1K": 0.0336, "2K": 0.0504, "4K": 0.113 }[r.resolution ?? "1K"] ?? 0.0336, basis: "$0.0336 1K / $0.0504 2K / $0.113 4K", confidence: "list" }),
  "google/nano-banana-2": (r) => ({ usd: { "512": 0.045, "1K": 0.067, "2K": 0.101, "4K": 0.151 }[r.resolution ?? "1K"] ?? 0.067, basis: "$0.067 1K", confidence: "list" }),
  "google/nano-banana-lite": () => ({ usd: 0.0336, basis: "$0.0336 per image", confidence: "list" }),
  "google/nano-banana-pro": (r) => ({ usd: r.resolution === "4K" ? 0.24 : 0.134, basis: "$0.134 1K/2K, $0.24 4K", confidence: "list" }),
  "openai/gpt-image-2.5-flare": (r) => ({ usd: { low: 0.006, medium: 0.013, high: 0.053 }[r.meta?.quality ?? "medium"] ?? 0.053, basis: "~$0.013 medium 1024²", confidence: "estimate" }),
  "openai/gpt-image-2.5-sunburst": (r) => ({ usd: { low: 0.006, medium: 0.013, high: 0.053 }[r.meta?.quality ?? "medium"] ?? 0.053, basis: "~$0.013 medium 1024²", confidence: "estimate" }),
  "openai/gpt-image-2": (r) => ({ usd: { low: 0.006, medium: 0.053, high: 0.211 }[r.meta?.quality ?? "medium"] ?? 0.211, basis: "$0.053 medium 1024²", confidence: "list" }),
  "fal/flux-2-pro": (r) => { const mp = MP[r.resolution ?? "1K"] ?? 1; return { usd: 0.03 + 0.015 * Math.max(0, mp - 1), basis: "$0.03 first MP + $0.015 per extra MP", confidence: "list" }; },
  "fal/flux-kontext-pro": () => ({ usd: 0.04, basis: "$0.04 per image", confidence: "list" }),
  "byteplus/seedream-4.5": () => ({ usd: 0.04, basis: "$0.04 per image", confidence: "list" }),
  "byteplus/seedream-5-flash": () => ({ usd: 0.018, basis: "$0.018 per image", confidence: "list" }),
  "google/omni-flash": per(() => 0.1, 8, "estimate"),
  "google/veo-3.1": per(() => 0.4, 8),
  "google/veo-3.1-fast": per((r) => (r.resolution === "1080p" ? 0.12 : r.resolution === "4k" ? 0.3 : 0.1), 8),
  "google/veo-3.1-lite": per((r) => (r.resolution === "1080p" ? 0.08 : 0.05), 8),
  "fal/kling-2.6-pro": per((r) => (r.meta?.audio === false ? 0.07 : 0.14), 5),
  "fal/kling-3-pro": per((r) => (r.meta?.audio === false ? 0.112 : 0.168), 5),
  "fal/kling-2.5-turbo-pro": (r) => ({ usd: 0.35 + 0.07 * Math.max(0, (r.durationSec ?? 5) - 5), basis: "$0.35 for 5 s + $0.07/s", confidence: "list" }),
  "fal/seedance-2.0": per((r) => (r.resolution === "1080p" ? 0.682 : 0.3034), 5),
  "fal/hailuo-2.3": (r) => ({ usd: (r.durationSec ?? 6) > 6 ? 0.56 : 0.28, basis: "$0.28 per 6 s, $0.56 per 10 s", confidence: "list" }),
  "fal/wan-2.6": per((r) => (r.resolution === "1080p" ? 0.15 : 0.1), 5),
  "runway/gen4.5": per(() => 0.12, 5),
  "runway/gen4-turbo": per(() => 0.05, 5),
  "runway/aleph2": (r) => ({ usd: Math.max(0.56, 0.28 * (r.durationSec ?? 5)), basis: "$0.28/s, $0.56 minimum", confidence: "list" }),
  "fal/omnihuman-1.5": per(() => 0.16, 10),
  "fal/lipsync-2": per(() => 0.05, 10),
  "fal/veed-lipsync": per(() => 0.4 / 60, 10),
  "heygen/avatar-iv": per(() => 0.1, 10, "estimate"),
  "elevenlabs/v3": (r) => ({ usd: ((r.text ?? "").length / 1000) * 0.08, basis: "$0.08 per 1K chars", confidence: "list" }),
  "elevenlabs/multilingual-v2": (r) => ({ usd: ((r.text ?? "").length / 1000) * 0.08, basis: "$0.08 per 1K chars", confidence: "list" }),
  "elevenlabs/flash-v2.5": (r) => ({ usd: ((r.text ?? "").length / 1000) * 0.04, basis: "$0.04 per 1K chars", confidence: "list" }),
  "elevenlabs/sfx-v2": (r) => ({ usd: ((r.durationSec ?? 10) / 60) * 0.12, basis: "$0.12 per minute", confidence: "estimate" }),
  "elevenlabs/music-v1": (r) => ({ usd: ((r.durationSec ?? 30) / 60) * 0.15, basis: "$0.15 per minute", confidence: "list" }),
  "elevenlabs/music-v2.5": (r) => ({ usd: ((r.durationSec ?? 30) / 60) * 0.15, basis: "$0.15 per minute", confidence: "list" }),
  "google/lyria-3.5": () => ({ usd: 0.08, basis: "$0.08 per song", confidence: "list" }),
  "google/lyria-3-clip": () => ({ usd: 0.04, basis: "$0.04 per 30 s clip", confidence: "list" }),
};
const RETIRING = { "google/veo-3.1": "2026-10-22", "google/veo-3.1-fast": "2026-10-22", "google/veo-3.1-lite": "2026-10-22", "openai/gpt-image-1.5": "2026-12-01", "openai/gpt-image-1-mini": "2026-12-01", "openai/gpt-4o-mini-tts": "2027-01-06", "openai/tts-1-hd": "2027-01-06" };

async function loadMedia() {
  try {
    if (flags.media) return await import(pathToFileURL(resolve(flags.media)).href);
    return await import("@useclaudia/media");
  } catch {
    return null;
  }
}

function readManifest(path) {
  if (!path) { err("Give a manifest: node batch.mjs " + cmd + " batch.json"); process.exit(2); }
  let m;
  try { m = JSON.parse(readFileSync(path, "utf8")); } catch (e) { err(`Can't read ${path} as JSON: ${e.message}`); process.exit(2); }
  if (!Array.isArray(m.items) || !m.items.length) { err("Manifest needs a non-empty items array."); process.exit(2); }
  for (const [i, it] of m.items.entries()) {
    if (!it.id || !it.kind || !it.model) { err(`items[${i}] needs id, kind and model (explicit models keep estimates honest).`); process.exit(2); }
  }
  return m;
}

// Build the GenerateRequest the package expects from a manifest item (shared prefix blocks are expanded here).
function toRequest(m, it) {
  const blocks = m.blocks ?? {};
  const expand = (s) => (typeof s === "string" ? s.replace(/\{\{(\w+)\}\}/g, (_, k) => blocks[k] ?? `{{${k}}}`) : s);
  const req = { kind: it.kind, model: it.model };
  for (const k of ["prompt", "negativePrompt", "text", "voice", "aspect", "resolution", "durationSec", "n", "seed", "brand", "refs", "meta"]) {
    if (it[k] !== undefined) req[k] = k === "prompt" || k === "text" ? expand(it[k]) : it[k];
  }
  return req;
}

async function estimate() {
  const m = readManifest(pos[1]);
  const lib = await loadMedia();
  let media = null;
  if (lib?.createMedia) {
    // A dry instance in a throwaway dir: estimate() is local, nothing touches ~/.claudia.
    const { mkdtempSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    media = lib.createMedia({ dryRun: true, dataDir: mkdtempSync(join(tmpdir(), "claudia-batch-")), defaultBrand: false, keys: { get: async () => undefined } });
  } else err("note: @useclaudia/media not found — using the built-in price snapshot (checked 2026-10-08). Install it for live table prices.");

  const rows = [];
  let total = 0;
  const warnings = [];
  for (const it of m.items) {
    const req = toRequest(m, it);
    const reps = it.repeat ?? 1;
    let e;
    try {
      if (media) { const { brand, ...noBrand } = req; e = media.estimate(noBrand); }
      else {
        const f = SNAPSHOT[req.model];
        if (!f) throw new Error(`no snapshot price for ${req.model}`);
        e = f(req);
        e.usd *= req.n ?? 1;
      }
    } catch (x) {
      warnings.push(`${it.id}: ${x.message}`);
      e = { usd: 0, basis: "unknown", confidence: "estimate" };
    }
    const retire = RETIRING[req.model];
    if (retire) warnings.push(`${it.id}: ${req.model} shuts down ${retire} — pick a replacement before then.`);
    if (/\b(teen|teenager|schoolgirl|minor|underage)\b/i.test(req.prompt ?? "")) warnings.push(`${it.id}: prompt mentions a minor-coded word — refused by policy, rewrite with an adult age.`);
    const cost = e.usd * reps;
    total += cost;
    rows.push({ id: it.id, kind: req.kind, model: req.model, settings: [req.aspect, req.resolution, req.durationSec ? `${req.durationSec}s` : "", req.n ? `${req.n}x` : "", reps > 1 ? `×${reps}` : ""].filter(Boolean).join(" "), usd: cost, basis: e.basis, confidence: e.confidence });
  }
  const reroll = total * (m.budget?.rerollPct ?? 30) / 100;
  const cap = m.budget?.perBatchUsd;
  if (media) await media.close();

  if (flags.json) {
    out(JSON.stringify({ ok: true, items: rows, totalUsd: +total.toFixed(4), rerollUsd: +reroll.toFixed(4), withRerollUsd: +(total + reroll).toFixed(4), capUsd: cap ?? null, warnings }, null, 2));
  } else {
    out(`Batch ${m.batch ?? pos[1]} · ${rows.length} items`);
    out("-".repeat(96));
    for (const r of rows) out(`${r.id.padEnd(28)} ${r.kind.padEnd(7)} ${r.model.padEnd(28)} ${r.settings.padEnd(16)} ${usd(r.usd).padStart(9)}  ${r.confidence}`);
    out("-".repeat(96));
    out(`Total ${usd(total)} · reroll budget ${m.budget?.rerollPct ?? 30}% ${usd(reroll)} · plan for ${usd(total + reroll)}${cap ? ` · cap ${usd(cap)}` : ""}`);
    for (const w of warnings) out(`! ${w}`);
  }
  if (cap && total + reroll > cap) { err(`Over the batch cap (${usd(total + reroll)} > ${usd(cap)}). Cut items or pick cheaper models.`); process.exit(3); }
}

async function openReal(m) {
  const lib = await loadMedia();
  if (!lib?.createMedia) { err("run/status/approve need @useclaudia/media (npm i @useclaudia/media) or --media <dist/index.js>."); process.exit(4); }
  return lib.createMedia({ keys: lib.envKeys(), limits: m?.limits, dataDir: flags["data-dir"] });
}

async function run() {
  const m = readManifest(pos[1]);
  if (!m.limits?.approveAboveUsd && m.limits?.approveAboveUsd !== 0) { err("Manifest limits.approveAboveUsd is required for run (keeps a person in the loop)."); process.exit(3); }
  if (!flags.yes) { err("Run `estimate` first, then add --yes to queue. Nothing was sent."); process.exit(3); }
  const stage = Number(flags.stage ?? 1);
  const items = m.items.filter((it) => (it.stage ?? 1) === stage);
  if (!items.length) { err(`No items in stage ${stage}.`); process.exit(2); }
  const { existsSync } = await import("node:fs");
  const missing = items.flatMap((it) => (it.refs ?? []).filter((r) => !/^https?:/.test(r) && !existsSync(r)).map((r) => `${it.id}: ${r}`));
  if (missing.length) { err("Missing ref files (pick and copy the previous stage's outputs first):\n  " + missing.join("\n  ")); process.exit(3); }
  const media = await openReal(m);
  const queued = [];
  for (const it of items) {
    const req = toRequest(m, it);
    for (let k = 0; k < (it.repeat ?? 1); k++) {
      try {
        const job = await media.generate({ ...req, meta: { ...(req.meta ?? {}), batch: m.batch, item: it.id } });
        queued.push({ item: it.id, id: job.id, status: job.status, usd: job.estimate?.usd });
        out(`${it.id.padEnd(28)} ${job.id}  ${job.status}`);
      } catch (e) {
        out(`${it.id.padEnd(28)} refused  ${e.code ?? "error"}: ${e.message}${e.hint ? " · " + e.hint : ""}`);
      }
    }
  }
  const waiting = queued.filter((q) => q.status === "needs_approval").length;
  out(`\n${queued.length} job(s) created · ${waiting} waiting for a person's approval (Claudia Local dashboard, or: node batch.mjs approve <id>).`);
  out("Jobs keep running after this process exits; the next createMedia() (CLI, Claudia Local, this script's status) resumes them from jobs.json.");
  await media.close();
}

async function status() {
  const media = await openReal(null);
  const jobs = media.listJobs({ limit: Number(flags.limit ?? 50) });
  if (flags.json) out(JSON.stringify(jobs.map((j) => ({ id: j.id, status: j.status, model: j.request?.model, item: j.request?.meta?.item, outputs: (j.outputs ?? []).map((o) => o.path), error: j.error })), null, 2));
  else for (const j of jobs) out(`${j.id}  ${String(j.status).padEnd(15)} ${String(j.request?.meta?.item ?? "").padEnd(26)} ${(j.outputs ?? []).map((o) => o.path).join(", ") || (j.error ? `${j.error.code}: ${j.error.hint ?? j.error.message}` : "")}`);
  const s = media.spend();
  out(`Spent today ${usd(s.today)} · this month ${usd(s.month)}`);
  await media.close();
}

async function approve() {
  const ids = pos.slice(1);
  if (!ids.length) { err("node batch.mjs approve <jobId> [...]"); process.exit(2); }
  if (!process.stdin.isTTY || !process.stdout.isTTY) { err("Approval needs a person at an interactive terminal. Refusing (agents never approve their own jobs)."); process.exit(3); }
  const media = await openReal(null);
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  for (const id of ids) {
    const j = media.getJob(id);
    if (!j) { out(`${id}: not found`); continue; }
    if (j.status !== "needs_approval") { out(`${id}: ${j.status} (nothing to approve)`); continue; }
    out(`\n${id} · ${j.request.kind} · ${j.request.model} · ≈ ${usd(j.estimate?.usd ?? 0)}\n${(j.request.prompt ?? j.request.text ?? "").slice(0, 400)}`);
    const a = (await rl.question("Approve and spend? type yes: ")).trim().toLowerCase();
    if (a === "yes") { await media.approve(id); out(`${id}: approved → queued`); } else out(`${id}: left waiting`);
  }
  rl.close();
  await media.close();
}

try {
  if (cmd === "estimate") await estimate();
  else if (cmd === "run") await run();
  else if (cmd === "status") await status();
  else await approve();
} catch (e) {
  err(`${e.code ?? "error"}: ${e.message}${e.hint ? "\nTry: " + e.hint : ""}`);
  process.exit(1);
}
