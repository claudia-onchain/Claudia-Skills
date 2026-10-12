#!/usr/bin/env node
// memory-lint.mjs — checks an agent's Markdown memory folder (Claudia Local format) and says what to fix.
//
// Usage:
//   node memory-lint.mjs [folder] [--stale-days 7] [--json]
//   folder defaults to ./memory. Reads MEMORY.md, USER.md, posts.md, YYYY-MM-DD.md, quarantine.md / quarantine.json.
//
// Read-only: no network, writes nothing, prints no secret (possible secrets are shown masked).
// Exit codes: 0 clean (notes only) · 3 something to fix · 1 error · 2 bad usage.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const HELP = `memory-lint.mjs [folder] [--stale-days <n>] [--json]
  exit 0 = clean · 3 = something to fix · 1 error · 2 usage`;

const SOURCES = ["user", "agent", "channel", "thread", "web", "file", "mcp", "skill", "provider"];
const OUTSIDE = new Set(["channel", "thread", "web", "file", "mcp", "skill", "provider"]);
const TYPES = ["note", "fact", "preference", "conversation", "task"];
const DAY = /^\d{4}-\d{2}-\d{2}\.md$/;
const MAX_FILE = 512 * 1024;
const MAX_ENTRY = 8000;

// Shapes of common secrets. Matches are reported masked, never printed in full.
const SECRETS = [
  [/\bsk-ant-[A-Za-z0-9_-]{20,}/, "Anthropic-style key"],
  [/\bsk-[A-Za-z0-9_-]{24,}/, "OpenAI-style key"],
  [/\bAIza[0-9A-Za-z_-]{30,}/, "Google API key"],
  [/\b(?:ck|cs|cmk)_live_[A-Za-z0-9]{12,}/, "Claudia agent or MCP key"],
  [/\bcmk_[A-Za-z0-9]{16,}/, "Claudia MCP key"],
  [/\b\d{6,12}:[A-Za-z0-9_-]{30,}\b/, "Telegram bot token"],
  [/discord(?:app)?\.com\/api\/webhooks\/\d+\/[A-Za-z0-9_-]{20,}/i, "Discord webhook URL"],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}/, "GitHub token"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "private key block"],
  [/(?<![A-Za-z0-9])[1-9A-HJ-NP-Za-km-z]{86,88}(?![A-Za-z0-9])/, "88-char base58 (Solana secret key?)"],
  [/\b0x[0-9a-fA-F]{64}\b/, "64-hex string (EVM private key?)"],
  [/\b(?:seed|recovery|secret) phrase\b.{0,40}\b(?:[a-z]{3,8}\s+){11,23}[a-z]{3,8}\b/i, "seed phrase"],
];
// Text that tries to act as a rule. Fine when the owner wrote it; suspicious from an outside source.
const INSTRUCTION = /\b(ignore (?:all |your |previous )|from now on|always (?:approve|buy|post|trust)|you (?:are|were) (?:allowed|authori[sz]ed|permitted)|pre-?approved|the owner (?:said|says|wants you to)|do not ask|without (?:asking|confirmation)|new system prompt|you must)\b/i;
// Facts that go stale within days.
const VOLATILE = /(\$\d|\bprice\b|\bmcap\b|market cap|\bholders?\b.*\d|trending|\bpumping\b|\bATH\b|\b\d+(?:\.\d+)?x\b)/i;

const args = process.argv.slice(2);
if (args.includes("-h") || args.includes("--help")) { console.log(HELP); process.exit(0); }
const json = args.includes("--json");
let staleDays = 7;
let folder = "./memory";
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--json") continue;
  if (a === "--stale-days") { staleDays = Number(args[++i]); if (!Number.isFinite(staleDays) || staleDays <= 0) { console.error(HELP); process.exit(2); } continue; }
  if (a.startsWith("-")) { console.error(`Unknown flag ${a}\n${HELP}`); process.exit(2); }
  folder = a;
}
const dir = resolve(folder.replace(/^~(?=$|\/)/, process.env.HOME || "~"));

const mask = (s) => (s.length <= 8 ? "***" : `${s.slice(0, 4)}…${s.slice(-2)} (${s.length} chars)`);
const norm = (s) => s.toLowerCase().replace(/<!--.*?-->/g, "").replace(/[^\p{L}\p{N}$ ]+/gu, " ").replace(/\s+/g, " ").trim();

function parseMeta(s) {
  const out = {};
  for (const part of s.split(/\s+/)) { const i = part.indexOf(":"); if (i > 0) out[part.slice(0, i)] = part.slice(i + 1); }
  return out;
}

/** Bullets (with indented continuation lines) and plain paragraphs, like Claudia Local reads them. */
function parseFile(name, text) {
  const lines = text.split(/\r?\n/);
  const blocks = [];
  let cur = null;
  const push = () => { if (cur && cur.lines.join("").trim()) blocks.push(cur); cur = null; };
  lines.forEach((l, i) => {
    if (/^\s*[-*]\s+/.test(l) && !/^\s{2,}/.test(l)) { push(); cur = { line: i + 1, lines: [l.replace(/^\s*[-*]\s+(\[[ x]\]\s+)?/, "")], bullet: true }; return; }
    if (cur?.bullet && /^\s{2,}\S/.test(l)) { cur.lines.push(l.trim()); return; }
    if (!l.trim() || /^#{1,6}\s/.test(l) || /^\s*<!--.*-->\s*$/.test(l) || /^\|/.test(l)) { push(); return; }
    if (cur && !cur.bullet) { cur.lines.push(l); return; }
    push(); cur = { line: i + 1, lines: [l], bullet: false };
  });
  push();
  const defType = name === "MEMORY.md" ? "fact" : name === "USER.md" ? "preference" : "note";
  return blocks.map((b) => {
    let body = b.lines.join("\n");
    const m = /\s*<!--\s*(m:[^>]*?)\s*-->\s*$/.exec(body);
    const meta = m ? parseMeta(m[1]) : null;
    if (m) body = body.slice(0, m.index);
    return { file: name, line: b.line, text: body.trim(), meta, type: meta?.type || defType, source: meta?.source || "user", ts: meta?.ts ? Date.parse(meta.ts) : NaN };
  }).filter((e) => e.text);
}

function lint() {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) throw new Error(`No memory folder at ${dir}`);
  const issues = []; // { level: "fix" | "note", where, msg }
  const add = (level, where, msg) => issues.push({ level, where, msg });
  const names = readdirSync(dir).filter((n) => ["MEMORY.md", "USER.md", "posts.md", "quarantine.md"].includes(n) || DAY.test(n));
  const entries = [];
  const now = Date.now();

  for (const name of names) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.size > MAX_FILE) add("fix", name, `file is ${Math.round(st.size / 1024)} KB; Claudia Local refuses files over 512 KB`);
    if (process.platform !== "win32" && (st.mode & 0o077)) add("note", name, `file mode ${(st.mode & 0o777).toString(8)}; 600 keeps it private`);
    const text = readFileSync(path, "utf-8");
    const list = parseFile(name, text);
    if (name !== "quarantine.md") entries.push(...list);
    for (const e of list) {
      const where = `${name}:${e.line}`;
      for (const [re, what] of SECRETS) {
        const m = re.exec(e.text);
        if (m) add("fix", where, `possible ${what} (${mask(m[0])}); delete it and rotate the key`);
      }
      if (name === "quarantine.md") continue;
      if (e.text.length > MAX_ENTRY) add("fix", where, `memory is ${e.text.length} characters; Claudia Local keeps 8,000 at most`);
      if (e.meta) {
        if (!SOURCES.includes(e.meta.source || "")) add("fix", where, `unknown or missing source "${e.meta.source ?? ""}"`);
        if (e.meta.type && !TYPES.includes(e.meta.type)) add("note", where, `unknown type "${e.meta.type}" (Claudia Local reads it as the file's default)`);
        if (!e.meta.ts || Number.isNaN(e.ts)) add("note", where, "no readable ts: in the comment");
      } else if (!["posts.md"].includes(name) && !DAY.test(name)) {
        add("note", where, "no metadata comment; counts as source:user (fine if the owner wrote it)");
      }
      if (OUTSIDE.has(e.source) && INSTRUCTION.test(e.text)) add("fix", where, `instruction-like text from an outside source (${e.source}): "${e.text.slice(0, 80)}"`);
      else if (OUTSIDE.has(e.source)) add("note", where, `approved from outside (${e.source}); keep only if still useful`);
      const age = Number.isNaN(e.ts) ? null : (now - e.ts) / 864e5;
      if (age !== null && age > staleDays && VOLATILE.test(e.text) && name !== "posts.md") add("fix", where, `volatile fact ${Math.floor(age)} days old: "${e.text.slice(0, 60)}"`);
    }
  }

  // Duplicates across the long-lived files.
  const seen = new Map();
  for (const e of entries.filter((x) => x.file === "MEMORY.md" || x.file === "USER.md")) {
    const k = norm(e.text);
    if (!k) continue;
    if (seen.has(k)) add("fix", `${e.file}:${e.line}`, `duplicate of ${seen.get(k)}`);
    else seen.set(k, `${e.file}:${e.line}`);
  }

  // Sizes and housekeeping.
  const memLines = entries.filter((e) => e.file === "MEMORY.md").length;
  if (memLines > 200) add("fix", "MEMORY.md", `${memLines} memories; prune to about 200`);
  const oldDays = names.filter((n) => DAY.test(n) && now - Date.parse(n.slice(0, 10)) > 30 * 864e5);
  if (oldDays.length) add("note", "daily notes", `${oldDays.length} daily notes older than 30 days; fold them into a monthly summary`);
  if (!names.includes("posts.md")) add("note", "posts.md", "no posted log; the agent can't check what it already said");

  // Claudia Local's waiting list.
  const qjson = join(dir, "quarantine.json");
  let waiting = 0;
  if (existsSync(qjson)) {
    try { const q = JSON.parse(readFileSync(qjson, "utf-8")); waiting = Array.isArray(q) ? q.length : 0; } catch { add("fix", "quarantine.json", "not valid JSON"); }
  }
  if (names.includes("quarantine.md")) waiting += (readFileSync(join(dir, "quarantine.md"), "utf-8").match(/^\s*-\s*\[ \]/gm) || []).length;
  if (waiting) add("note", "quarantine", `${waiting} ${waiting === 1 ? "memory" : "memories"} waiting for the owner`);

  const bySource = {};
  for (const e of entries) bySource[e.source] = (bySource[e.source] || 0) + 1;
  return { folder: dir, files: names.length, memories: entries.length, bySource, waiting, issues };
}

try {
  const r = lint();
  const fixes = r.issues.filter((i) => i.level === "fix");
  if (json) console.log(JSON.stringify(r, null, 2));
  else {
    console.log(`Memory lint · ${r.folder}`);
    console.log(`${r.files} files · ${r.memories} memories · by source ${Object.entries(r.bySource).map(([k, v]) => `${k} ${v}`).join(", ") || "none"} · ${r.waiting} waiting`);
    if (!r.issues.length) console.log("Clean.");
    for (const i of r.issues) console.log(`${i.level === "fix" ? "FIX " : "note"}  ${i.where}  ${i.msg}`);
    console.log(fixes.length ? `${fixes.length} to fix.` : "Nothing to fix.");
  }
  process.exit(fixes.length ? 3 : 0);
} catch (e) {
  console.error(`memory-lint: ${e.message}`);
  process.exit(1);
}
