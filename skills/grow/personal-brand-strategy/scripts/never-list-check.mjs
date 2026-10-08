#!/usr/bin/env node
// Check a draft against the brand never-list before submitting it for approval.
// Usage:
//   node scripts/never-list-check.mjs templates/never-list.json "draft text"
//   echo "draft text" | node scripts/never-list-check.mjs templates/never-list.json
//   node scripts/never-list-check.mjs templates/never-list.json --file drafts/post.txt [--json]
// Exit codes: 0 clean · 1 review needed (a person looks) · 3 blocked · 2 bad usage.
// Node >= 20. Local files only. No network, no secrets. This adds brand rules on top of
// the rules @useclaudia/social always runs in preview() and publish(); it does not replace them.
import fs from "node:fs";

const args = process.argv.slice(2);
const json = args.includes("--json");
const rest = args.filter((a) => a !== "--json");
const listPath = rest[0];
if (!listPath) {
  console.error('Usage: node scripts/never-list-check.mjs <never-list.json> "<draft>" | --file <path> [--json]');
  process.exit(2);
}

let list;
try {
  list = JSON.parse(fs.readFileSync(listPath, "utf8"));
} catch (e) {
  console.error(`Can't read never-list ${listPath}: ${e.message}`);
  process.exit(2);
}

async function readDraft() {
  const i = rest.indexOf("--file");
  if (i >= 0) return fs.readFileSync(rest[i + 1], "utf8");
  if (rest[1]) return rest.slice(1).join(" ");
  if (process.stdin.isTTY) return "";
  let s = "";
  for await (const chunk of process.stdin) s += chunk;
  return s;
}

const draft = (await readDraft()).trim();
if (!draft) {
  console.error("No draft text given.");
  process.exit(2);
}

const hits = [];
for (const rule of list.rules ?? []) {
  let re;
  try {
    re = new RegExp(rule.pattern, "gi");
  } catch (e) {
    console.error(`Bad pattern for "${rule.reason}": ${e.message}`);
    process.exit(2);
  }
  const found = [...draft.matchAll(re)].map((m) => m[0]);
  if (found.length) hits.push({ level: rule.level, reason: rule.reason, matches: [...new Set(found)] });
}

const blocked = hits.some((h) => h.level === "block");
const review = hits.some((h) => h.level === "review");
const verdict = blocked ? "BLOCK" : review ? "REVIEW" : "CLEAN";

if (json) {
  console.log(JSON.stringify({ ok: !blocked, verdict, hits }, null, 2));
} else {
  for (const h of hits) {
    console.log(`${h.level === "block" ? "BLOCK " : "REVIEW"}  ${h.reason}: ${h.matches.map((m) => `"${m}"`).join(", ")}`);
  }
  if (verdict === "CLEAN") console.log("CLEAN  no never-list hits. Still needs preview() and a person's approval.");
  else if (verdict === "REVIEW") console.log("→ a person checks the flagged lines before submit().");
  else console.log("→ rewrite the draft; blocked drafts are never submitted.");
}
process.exit(blocked ? 3 : review ? 1 : 0);
