#!/usr/bin/env node
// index-prompts.mjs — index a folder of prompt files (Markdown + YAML front matter) into CSV or JSON. Offline, no deps.
//
//   node index-prompts.mjs <folder> [--json] [--warn-days 45] [--today 2026-10-08]
//
// Writes the index to stdout and warnings to stderr. Exit 0 = clean, 1 = warnings found, 2 = bad usage.
// Front matter supports the subset the library uses: `key: value`, `key: [a, b]`, `key: {a: 1, b: "x"}`, and
// block lists of scalars or inline maps (`  - item` / `  - {path: x, sha256: y}`).

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const args = process.argv.slice(2);
const root = args.find((a) => !a.startsWith("--") && !/^\d/.test(a));
const flag = (k) => { const i = args.indexOf(`--${k}`); return i >= 0 ? (args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : true) : undefined; };
if (!root) { process.stderr.write("Usage: node index-prompts.mjs <folder> [--json] [--warn-days 45] [--today YYYY-MM-DD]\n"); process.exit(2); }
const warnDays = Number(flag("warn-days") ?? 45);
const today = new Date(String(flag("today") ?? new Date().toISOString().slice(0, 10)) + "T00:00:00Z");

// Shutdown dates from @useclaudia/media (checked 2026-10-08).
const RETIRE = {
  "google/veo-3.1": "2026-10-22", "google/veo-3.1-fast": "2026-10-22", "google/veo-3.1-lite": "2026-10-22",
  "openai/gpt-image-1.5": "2026-12-01", "openai/gpt-image-1-mini": "2026-12-01",
  "openai/tts-1-hd": "2027-01-06", "openai/gpt-4o-mini-tts": "2027-01-06",
  "google/imagen-4": "2026-08-17", "google/gemini-2.5-flash-image": "2026-10-02",
};
const REQUIRED = ["id", "version", "status", "kind", "model", "identity"];
const STATUSES = ["draft", "approved", "deprecated", "retired"];
const MINOR_WORDS = /\b(teen|teenage|teenager|schoolgirl|school uniform|minor|underage|child|kid)\b/i;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".md")) out.push(p);
  }
  return out.sort();
}

function scalar(v) {
  v = v.trim();
  if (v === "") return "";
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
  if (v === "true") return true;
  if (v === "false") return false;
  if (v === "null" || v === "none" || v === "~") return null;
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  if (v.startsWith("[") && v.endsWith("]")) return splitTop(v.slice(1, -1)).map(scalar);
  if (v.startsWith("{") && v.endsWith("}")) {
    const o = {};
    for (const part of splitTop(v.slice(1, -1))) {
      const i = part.indexOf(":");
      if (i > 0) o[part.slice(0, i).trim()] = scalar(part.slice(i + 1));
    }
    return o;
  }
  return v;
}

function splitTop(s) {
  const parts = [];
  let depth = 0, cur = "", q = null;
  for (const ch of s) {
    if (q) { cur += ch; if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
    if (ch === "[" || ch === "{") depth++;
    if (ch === "]" || ch === "}") depth--;
    if (ch === "," && depth === 0) { parts.push(cur); cur = ""; continue; }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function parse(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const fm = {};
  let listKey = null;
  for (const raw of m[1].split("\n")) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const item = raw.match(/^\s+-\s+(.*)$/);
    if (item && listKey) { fm[listKey].push(scalar(item[1])); continue; }
    const kv = raw.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, k, v] = kv;
    if (v.trim() === "") { fm[k] = []; listKey = k; } else { fm[k] = scalar(v.replace(/\s+#.*$/, "")); listKey = null; }
  }
  return { fm, body: m[2] };
}

const rows = [];
const warnings = [];
const seen = new Map();
for (const file of walk(root)) {
  const rel = relative(process.cwd(), file);
  const parsed = parse(readFileSync(file, "utf8"));
  if (!parsed) continue; // READMEs and notes without front matter are skipped
  const { fm, body } = parsed;
  for (const k of REQUIRED) if (fm[k] === undefined || fm[k] === "") warnings.push(`${rel}: missing ${k}`);
  if (fm.status && !STATUSES.includes(fm.status)) warnings.push(`${rel}: status "${fm.status}" is not one of ${STATUSES.join("/")}`);
  if (fm.id) { if (seen.has(fm.id)) warnings.push(`${rel}: duplicate id ${fm.id} (also ${seen.get(fm.id)})`); else seen.set(fm.id, rel); }
  if (fm.identity && fm.identity !== "none" && !body.includes(`[${fm.identity}]`)) warnings.push(`${rel}: body has no [${fm.identity}] tag — paste the identity block, don't reference it`);
  if (MINOR_WORDS.test(body.replace(/^## Negative[\s\S]*?(?=^## |(?![\s\S]))/gim, "").replace(/--no [^\n]*/g, ""))) warnings.push(`${rel}: minor-coded word outside a negative line — rewrite with an adult age`);
  const models = [fm.model, fm.first_frame_model, ...(Array.isArray(fm.fallback_models) ? fm.fallback_models : [])].filter(Boolean);
  let retires = fm.retires && fm.retires !== null ? String(fm.retires) : "";
  for (const mdl of models) {
    const d = RETIRE[mdl];
    if (!d) continue;
    const days = Math.round((new Date(d + "T00:00:00Z") - today) / 86400000);
    if (mdl === fm.model || mdl === fm.first_frame_model) retires = retires || d;
    if (days < 0) warnings.push(`${rel}: ${mdl} retired on ${d} — move to _retired/ or migrate`);
    else if (days <= warnDays) warnings.push(`${rel}: ${mdl} retires ${d} (in ${days} days) — make a variant on its replacement`);
  }
  const sc = fm.scores && typeof fm.scores === "object" ? fm.scores : {};
  if (fm.status === "approved" && !(Number(sc.runs) >= 3)) warnings.push(`${rel}: approved with fewer than 3 scored runs`);
  rows.push({
    id: fm.id ?? "", version: fm.version ?? "", status: fm.status ?? "", character: fm.character ?? "", identity: fm.identity ?? "",
    kind: fm.kind ?? "", model: fm.model ?? "", pillar: fm.pillar ?? "", series: fm.series ?? "", scene: fm.scene ?? "", look: fm.look ?? "",
    aspect: fm.params?.aspect ?? "", cost_usd: fm.cost_usd ?? "", drift: sc.drift ?? "", runs: sc.runs ?? "", pass_rate: sc.pass_rate ?? "",
    tags: Array.isArray(fm.tags) ? fm.tags.join("|") : (fm.tags ?? ""), outputs: Array.isArray(fm.outputs) ? fm.outputs.length : 0,
    retires, updated: fm.updated ?? "", path: rel,
  });
}

if (args.includes("--json")) process.stdout.write(JSON.stringify({ count: rows.length, prompts: rows, warnings }, null, 2) + "\n");
else {
  const cols = Object.keys(rows[0] ?? { id: "" });
  const esc = (v) => { const s = String(v ?? ""); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  process.stdout.write(cols.join(",") + "\n" + rows.map((r) => cols.map((c) => esc(r[c])).join(",")).join("\n") + "\n");
}
for (const w of warnings) process.stderr.write(`! ${w}\n`);
process.stderr.write(`${rows.length} prompt(s) indexed · ${warnings.length} warning(s)\n`);
process.exit(warnings.length ? 1 : 0);
