#!/usr/bin/env node
// Verifiable giveaway draw. Node >= 20, no dependencies, no network.
//
//   node scripts/draw-winner.mjs <entries.csv|entries.txt> --seed "<public seed>" [--alternates 2] [--column 1] [--json]
//
// How it works: every unique, eligible entry id gets the score sha256("<seed>:<entry id>"). Entries are sorted by score;
// the lowest is the winner, the next ones are alternates. Anyone with the same entry file and the same seed gets the same
// result, so the draw can be checked after the fact. Announce the seed source BEFORE the entry window closes (for example
// "the first 16 hex characters of the drand / Bitcoin block / lottery result published after <time>"), so nobody,
// including you, can pick a seed that favours one entry.
//
// Input: one entry id per line (.txt) or a CSV with a header row (.csv, id in --column, 1-based, default 1).
// Remove ineligible entries before the draw and log why in templates/winner-selection-log.csv.
// Exit codes: 0 ok, 1 bad input.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const opts = { alternates: "2", column: "1" };
const positional = [];
let asJson = false;
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a === "--json") asJson = true;
  else if (a.startsWith("--")) opts[a.slice(2)] = process.argv[++i];
  else positional.push(a);
}
const file = positional[0];
const seed = opts.seed;
const alternates = Number(opts.alternates);
const column = Number(opts.column);

if (!file || !seed) {
  console.error('usage: node scripts/draw-winner.mjs <entries.csv|entries.txt> --seed "<public seed>" [--alternates 2] [--column 1] [--json]');
  process.exit(1);
}
if (!Number.isInteger(alternates) || alternates < 0 || !Number.isInteger(column) || column < 1) {
  console.error("--alternates must be 0 or more and --column must be 1 or more");
  process.exit(1);
}

let raw;
try {
  raw = readFileSync(file);
} catch (e) {
  console.error(`cannot read ${file}: ${e.message}`);
  process.exit(1);
}
const fileSha256 = createHash("sha256").update(raw).digest("hex");
let lines = raw.toString("utf8").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
if (file.toLowerCase().endsWith(".csv")) {
  lines = lines.slice(1).map((l) => (l.split(",")[column - 1] ?? "").replace(/^"|"$/g, "").trim()).filter(Boolean);
}

const seen = new Set();
const duplicates = [];
for (const id of lines) {
  const key = id.toLowerCase();
  if (seen.has(key)) duplicates.push(id);
  else seen.add(key);
}
const unique = [...new Set(lines.map((l) => l.toLowerCase()))];
if (unique.length === 0) {
  console.error("no entries found");
  process.exit(1);
}

const scored = unique
  .map((id) => ({ id, score: createHash("sha256").update(`${seed}:${id}`).digest("hex") }))
  .sort((a, b) => (a.score < b.score ? -1 : a.score > b.score ? 1 : 0));

const result = {
  file,
  fileSha256,
  seed,
  rawEntries: lines.length,
  duplicatesRemoved: duplicates.length,
  eligibleEntries: unique.length,
  winner: scored[0].id,
  alternates: scored.slice(1, 1 + alternates).map((s) => s.id),
  method: 'lowest sha256("<seed>:<entry id>"), ids lowercased and de-duplicated',
  drawnAt: new Date().toISOString(),
};

if (asJson) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`entries file   ${file}`);
  console.log(`file sha256    ${fileSha256}`);
  console.log(`seed           ${seed}`);
  console.log(`entries        ${lines.length} raw, ${duplicates.length} duplicates removed, ${unique.length} in the draw`);
  console.log(`winner         ${result.winner}`);
  result.alternates.forEach((a, i) => console.log(`alternate ${i + 1}    ${a}`));
  console.log(`method         ${result.method}`);
  console.log("Publish the seed, the file hash and this method with the winner announcement so anyone can re-run it.");
}
