#!/usr/bin/env node
// estimate-shotlist.mjs — price a whole shot list before spending anything. Reads a CSV or JSON shot list, builds each
// job as a @useclaudia/media DRY RUN (no keys needed, nothing sent, no job created), and prints model, estimate and
// confidence per shot, the total, retired-model and budget warnings, and (with --requests) the exact provider requests
// with secrets shown as ***.
//
// Setup:  npm i @useclaudia/media          (Node >= 20)
// Usage:  node estimate-shotlist.mjs <shotlist.csv|.json> [--budget 5] [--brand claudia] [--requests] [--json]
// CSV columns (header row required): id,kind,model,prompt,text,aspect,duration_sec,n,resolution
//   kind = image|video|speech|music|sfx|avatar; model optional (default per kind); text is for speech/avatar.
// Network: none. Dry runs return the request instead of sending it; a temporary data dir is used so nothing is written
//          to ~/.claudia. Prices come from the package's model table (each with its own "as of" date).
// Exit codes: 0 ok · 1 a shot failed to build (bad model, retired, invalid) · 2 bad usage · 3 over --budget.
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createMedia, staticKeys } from "@useclaudia/media";

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const file = argv.find((a, i) => !a.startsWith("--") && !["--budget", "--brand"].includes(argv[i - 1]));
if (!file || argv.includes("--help")) {
  console.log("Usage: node estimate-shotlist.mjs <shotlist.csv|.json> [--budget 5] [--brand claudia] [--requests] [--json]");
  process.exit(file ? 0 : 2);
}
const budget = flag("--budget") !== undefined ? Number(flag("--budget")) : null;
const brand = flag("--brand");
const showRequests = argv.includes("--requests");
const asJson = argv.includes("--json");

function parseCsv(src) {
  const rows = [];
  let row = [], cell = "", q = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (q) {
      if (ch === '"' && src[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((c) => c.trim())) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c.trim())) rows.push(row);
  const [head, ...body] = rows;
  const keys = head.map((h) => h.trim());
  return body.filter((r) => !r[0]?.trim().startsWith("#")).map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? "").trim()])));
}

let shots;
try {
  const src = readFileSync(file, "utf8");
  shots = file.endsWith(".json") ? JSON.parse(src) : parseCsv(src);
  if (!Array.isArray(shots) || !shots.length) throw new Error("no shots found");
} catch (e) { console.error(`Can't read ${file}: ${e.message}`); process.exit(2); }

const dataDir = mkdtempSync(join(tmpdir(), "claudia-shotlist-"));
const media = createMedia({ keys: staticKeys({}), dataDir, dryRun: true, defaultBrand: true });
const num = (v) => (v === undefined || v === null || v === "" ? undefined : Number(v));
const results = [];
for (const [i, s] of shots.entries()) {
  const req = {
    kind: s.kind,
    model: s.model || undefined,
    prompt: s.prompt || undefined,
    text: s.text || undefined,
    aspect: s.aspect || undefined,
    durationSec: num(s.duration_sec ?? s.durationSec),
    n: num(s.n),
    resolution: s.resolution || undefined,
    brand: s.brand || brand || undefined,
  };
  const id = s.id || `shot-${i + 1}`;
  try {
    const r = await media.generate(req, { dryRun: true });
    const model = media.models({ kind: req.kind }).find((m) => m.id === (req.model ?? r.request?.model)) ?? null;
    results.push({ id, kind: req.kind, model: req.model ?? "(default)", usd: r.estimate?.usd ?? null, confidence: r.estimate?.confidence ?? null, basis: r.estimate?.basis ?? "", unverified: !!model?.unverified, request: showRequests ? r.request : undefined });
  } catch (e) {
    results.push({ id, kind: req.kind, model: req.model ?? "(default)", error: `${e.code ?? "error"}: ${e.message}${e.hint ? ` — ${e.hint}` : ""}` });
  }
}
await media.close?.();
rmSync(dataDir, { recursive: true, force: true });

const total = results.reduce((a, r) => a + (r.usd ?? 0), 0);
const failed = results.filter((r) => r.error).length;
const over = budget !== null && total > budget;
if (asJson) console.log(JSON.stringify({ shots: results, totalUsd: Math.round(total * 10000) / 10000, budgetUsd: budget, overBudget: over, failed }));
else {
  for (const r of results) {
    if (r.error) { console.log(`✗ ${r.id.padEnd(10)} ${r.kind.padEnd(6)} ${r.model}\n    ${r.error}`); continue; }
    console.log(`✓ ${r.id.padEnd(10)} ${r.kind.padEnd(6)} ${r.model.padEnd(28)} $${r.usd.toFixed(4).padStart(8)}  ${r.confidence}${r.unverified ? " · id unverified" : ""}\n    ${r.basis}`);
    if (r.request) console.log(`    ${r.request.method} ${r.request.url}\n    ${JSON.stringify(r.request.body).slice(0, 400)}`);
  }
  console.log(`\nTotal ≈ $${total.toFixed(2)} for ${results.length - failed} shot(s)${budget !== null ? ` · budget $${budget.toFixed(2)}${over ? " · OVER BUDGET" : ""}` : ""}${failed ? ` · ${failed} failed` : ""}`);
  console.log("Dry run: nothing was sent, no key was used, nothing was spent. Estimates marked 'estimate' can be off; see each basis.");
}
process.exit(failed ? 1 : over ? 3 : 0);
