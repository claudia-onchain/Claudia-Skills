#!/usr/bin/env node
// Copies the built library into the website (DexPumpzip). Node >= 20, no dependencies.
//
//   node scripts/sync-site.mjs <path-to-DexPumpzip>            build, then sync
//   node scripts/sync-site.mjs <path-to-DexPumpzip> --check    exit 1 if the site copy is stale (writes nothing)
//   --allow-invalid    sync even if some skills fail validation
//   --root <dir>       use another checkout of this repo as the source
//
// The site gets (and only these paths are managed — anything else in the site is never touched):
//   server/skills/content/<slug>/**        raw skill files the server renders (/api/skills, /skills/<slug>.md)
//   server/skills/index.json               the index
//   client/public/skills/<slug>.zip        per-skill download
//   client/public/skills/claudia-skills-all.zip
//   client/public/skills/index.json
// Stale slugs and files are removed. Running it twice changes nothing the second time.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, rmdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { build, write, REPO_ROOT } from "./build.mjs";
import { printReport } from "./validate.mjs";
import { findSkillDirs, listFiles } from "./lib/skills.mjs";

const args = process.argv.slice(2);
const rootIdx = args.indexOf("--root");
const root = rootIdx >= 0 ? resolve(args[rootIdx + 1]) : REPO_ROOT;
const site = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--root");
const check = args.includes("--check");
if (!site) {
  console.error("usage: node scripts/sync-site.mjs <path-to-DexPumpzip> [--check] [--allow-invalid]");
  process.exit(2);
}
const siteRoot = resolve(site);
if (!existsSync(join(siteRoot, "package.json")) || !existsSync(join(siteRoot, "server")) || !existsSync(join(siteRoot, "client"))) {
  console.error(`${siteRoot} doesn't look like the website (needs package.json, server/ and client/)`);
  process.exit(2);
}

const result = build(root, { allowInvalid: args.includes("--allow-invalid") });
if (!result.ok) {
  printReport(result.report);
  console.error("\nSync stopped: fix the errors above (or pass --allow-invalid).");
  process.exit(1);
}
if (!check) write(root, result);

// Desired state of the managed paths: relative path (posix) → Buffer.
const MANAGED = ["server/skills/content", "client/public/skills"];
const want = new Map();
const indexJson = Buffer.from(`${JSON.stringify(result.index, null, 2)}\n`);
want.set("server/skills/index.json", indexJson);
want.set("client/public/skills/index.json", indexJson);
for (const [name, buf] of result.zips) want.set(`client/public/skills/${name}`, buf);
const included = new Set(result.index.skills.map((s) => s.slug));
for (const d of findSkillDirs(root)) {
  if (!included.has(d.slug)) continue;
  for (const f of listFiles(d.dir)) if (!f.symlink) want.set(`server/skills/content/${d.slug}/${f.path}`, readFileSync(join(d.dir, f.path)));
}

// Current state.
const have = new Set();
const walk = (abs) => {
  if (!existsSync(abs)) return;
  for (const name of readdirSync(abs)) {
    const p = join(abs, name);
    if (statSync(p).isDirectory()) walk(p);
    else have.add(relative(siteRoot, p).split(sep).join("/"));
  }
};
for (const m of MANAGED) walk(join(siteRoot, m));
if (existsSync(join(siteRoot, "server/skills/index.json"))) have.add("server/skills/index.json");

const added = [];
const changed = [];
const removed = [];
for (const [rel, buf] of want) {
  const abs = join(siteRoot, rel);
  if (!existsSync(abs)) added.push(rel);
  else if (!readFileSync(abs).equals(buf)) changed.push(rel);
}
for (const rel of have) if (!want.has(rel)) removed.push(rel);

const summary = `${added.length} added · ${changed.length} changed · ${removed.length} removed`;
if (check) {
  if (added.length + changed.length + removed.length === 0) {
    console.log(`Site copy is current (${result.index.count} skills).`);
    process.exit(0);
  }
  console.log(`Site copy is stale: ${summary}`);
  for (const [label, list] of [["+", added], ["~", changed], ["-", removed]]) for (const r of list.slice(0, 40)) console.log(`  ${label} ${r}`);
  console.log(`Run: node ${relative(process.cwd(), fileURLToPath(import.meta.url))} ${site}`);
  process.exit(1);
}

for (const rel of [...added, ...changed]) {
  const abs = join(siteRoot, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, want.get(rel));
}
for (const rel of removed) rmSync(join(siteRoot, rel), { force: true });
// Drop empty directories left behind under the managed roots.
const prune = (abs) => {
  if (!existsSync(abs) || !statSync(abs).isDirectory()) return;
  for (const n of readdirSync(abs)) prune(join(abs, n));
  if (readdirSync(abs).length === 0 && MANAGED.every((m) => join(siteRoot, m) !== abs)) rmdirSync(abs);
};
for (const m of MANAGED) prune(join(siteRoot, m));

console.log(`Synced ${result.index.count} skills into ${siteRoot}: ${summary}`);
if (result.skipped?.length) console.log(`Skipped (no SKILL.md yet): ${result.skipped.join(", ")}`);
if (result.failing?.size) console.log(`Note: ${result.failing.size} skill(s) synced with validation errors (--allow-invalid): ${[...result.failing].join(", ")}`);
