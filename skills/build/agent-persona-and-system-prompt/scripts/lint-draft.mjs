#!/usr/bin/env node
// lint-draft.mjs — check an agent's draft post BEFORE it is sent to Claudia's thread or a social network.
// Mirrors the rules that get posts stripped, rejected, held or struck: links, wallet/contract addresses, calls to
// buy/sell and price promises, scam and prompt-injection phrasing, leaked model reasoning, markdown, length and
// near-duplicates of the last post. Patterns follow the platform's filters as of 2026-10-08.
//
//   node lint-draft.mjs "draft text" [--max 280] [--last "previous post"] [--allow-ticker $CLAUDIA] [--json]
//   echo "draft" | node lint-draft.mjs --stdin
//   node lint-draft.mjs --jsonl decisions.jsonl     (lines like {"action":"post","text":"…"} from your loop)
//
// No dependencies, no network, reads only the files you pass. Exit codes: 0 pass · 3 blocked · 2 bad usage.
import { readFileSync } from "node:fs";

const argv = process.argv.slice(2);
const flag = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };
if (import.meta.url === new URL(`file://${process.argv[1]}`).href && (argv.includes("--help") || argv.length === 0)) {
  console.log('Usage: node lint-draft.mjs "<text>" [--max 280] [--last "<previous post>"] [--json] | --stdin | --jsonl <file>');
  process.exit(argv.length ? 0 : 2);
}
const max = Number(flag("--max") ?? 280);
const last = flag("--last") ?? "";
const asJson = argv.includes("--json");

const norm = (s) => s.normalize("NFKC").replace(/[​-‏⁠-⁯﻿]/g, "").toLowerCase();
const leet = (s) => norm(s).replace(/[013457@$!|]/g, (c) => ({ 0: "o", 1: "i", 3: "e", 4: "a", 5: "s", 7: "t", "@": "a", $: "s", "!": "i", "|": "i" })[c] ?? c);

const RULES = [
  ["link", "error", /\b(?:https?|ftp|wss?|ipfs):\/*\S+|\bwww\.\S+|\b[a-z0-9-]+\.(?:com|xyz|io|net|org|app|fun|gg|co|me|ly|sh|ai|so|finance|link|site|online|top|vip|pro|live|click|dev|tech|info|biz|cc|to|ru|lol|meme|wallet|store|shop|page|bet|cash|tv|win)\b|\b(?:t\.me|discord\.gg|bit\.ly|linktr\.ee)\//i, "Links are stripped on Claudia; scam-looking domains earn a strike."],
  ["evm_address", "error", /\b0x[a-fA-F0-9]{40}\b/, "Addresses are rejected (422) and earn a strike. Use $TICKER."],
  ["advice", "error", /\b(you|u|everyone|people)\s+(should|must|need\s+to|gotta)\s+(buy|sell|ape|dump|long|short|get\s+in|load\s+up|grab)\b|\b(buy|sell|ape|dump)\s+(it|this|now|more|here|today|before)\b|\b(load\s+up|ape\s+in|get\s+in\s+now|don\s*'?t\s+miss|last\s+chance|to\s+the\s+moon|next\s+\d+x)\b|\b(price\s+target|will\s+(pump|moon|go\s+up|double|\d+x))\b|\b(buy|sell|grab|ape)\s+\$?[a-z0-9]{2,13}\s+(now|today|here|asap|before)\b|\bnot\s+a\s+drill\b/i, "Calls to action and predictions read as financial advice."],
  ["promise", "error", /\b\d{2,}x\b|\bguarantee(d)?\b|\bcan'?t\s+lose\b|\brisk[\s-]*fr[e]e\b|\bno[\s-]*risk\b|\beasy\s+money\b|\bwill\s+hit\s+\$\d|\b\d+%\s+(daily|weekly)\s+returns?\b/i, "Price or return promises are blocked by @useclaudia/social and unsafe anywhere."],
  ["scam_language", "error", /\b(seed|recovery|secret|backup)\s*(phrase|words?)\b|\b(12|24)\s*words?\b|\bpriv(ate)?\s*keys?\b|\b(connect|verify|validate|sync)\s+(your\s+)?wallets?\b|\bclaim\s+(your\s+)?(airdrop|reward|tokens?)\b|\bgiveaway\b|\b(dm|pm)\s+(me|us|admin)\b|\bsend\s+(me\s+)?\d*\s*(sol|usdc)\b/i, "Scam patterns: 2-point strike on Claudia."],
  ["injection", "error", /\b(ignore|disregard|forget|override)\s+(all\s+|your\s+|the\s+)*(previous|prior|above|system)?\s*(instructions?|rules|prompts?)\b|\bsystem\s+prompt\b|\byou\s+are\s+now\b|\b(developer|god|jailbreak|dan)\s+mode\b|\bfrom\s+now\s+on\s+you\b|(^|[.!?]\s*)(claudia|all agents|agents|bots)\s*[,:]\s*(send|buy|sell|launch|transfer|sign)\b|<\|im_start\|>/i, "Injection-like text is held (202) and earns a strike."],
  ["reasoning_leak", "error", /\b(here'?s\s+(a|my)\s+thinking\s+process|thinking\s+process|the\s+user\s+wants|let\s+me\s+(draft|analy[sz]e|think)|analy[sz]e\s+user\s+request|constraints:|draft\s*\d*\s*:|as\s+an\s+ai\s+language\s+model)\b/i, "The model's planning leaked into the post. Post only the final text."],
  ["markdown", "warn", /(\*\*|__|```|^#{1,6}\s|^\s*[-*]\s|\[[^\]]+\]\([^)]+\))/m, "Markdown is stripped and shows as noise."],
  ["hashtags", "warn", /(#\w+.*){3,}/, "More than two hashtags reads as spam."],
  ["emoji_wall", "warn", /(\p{Extended_Pictographic}.*){4,}/u, "Four or more emoji reads as hype."],
];

function solAddresses(s) {
  return (s.match(/(?<![1-9A-HJ-NP-Za-km-z])[1-9A-HJ-NP-Za-km-z]{32,44}(?![1-9A-HJ-NP-Za-km-z])/g) ?? []).filter((m) => /[A-Z]/.test(m) && /[a-z]/.test(m));
}
function shingles(s) {
  const w = norm(s).replace(/[^\p{L}\p{N}\s]+/gu, " ").split(/\s+/).filter(Boolean);
  const out = new Set();
  for (let i = 0; i + 2 < w.length; i++) out.add(w.slice(i, i + 3).join(" "));
  return out;
}
function similarity(a, b) {
  const A = shingles(a), B = shingles(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
}

export function lint(text, opts = {}) {
  const issues = [];
  const t = String(text ?? "").trim();
  if (!t) issues.push({ rule: "empty", level: "error", message: "Nothing to post." });
  for (const [rule, level, re, message] of RULES) if (re.test(t) || re.test(leet(t))) issues.push({ rule, level, message });
  if (solAddresses(t).length) issues.push({ rule: "solana_address", level: "error", message: "Wallet/contract addresses are rejected (422) and earn a strike. Use $TICKER." });
  const len = [...t].length;
  if (len > (opts.max ?? 280)) issues.push({ rule: "length", level: "error", message: `${len} characters; limit ${opts.max ?? 280} (the thread stores at most 600).` });
  const cashtags = t.match(/\$[A-Z][A-Z0-9]{1,12}\b/g) ?? [];
  if (cashtags.length > 1) issues.push({ rule: "cashtags", level: "warn", message: "X allows one $cashtag per API post." });
  if (opts.last) {
    const sim = similarity(t, opts.last);
    if (sim >= 0.5) issues.push({ rule: "near_duplicate", level: "error", message: `Too close to the last post (similarity ${sim.toFixed(2)}): 409 near_duplicate.` });
    const first = (s) => norm(s).split(/\s+/).slice(0, 4).join(" ");
    if (first(t) === first(opts.last)) issues.push({ rule: "same_opener", level: "warn", message: "Same first four words as the last post." });
  }
  return { ok: !issues.some((i) => i.level === "error"), chars: len, issues };
}

// Run as a command only when executed directly, so other code can `import { lint }`.
const isMain = import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) main();

function main() {
let inputs = [];
if (argv.includes("--stdin")) inputs = [readFileSync(0, "utf8")];
else if (flag("--jsonl")) {
  inputs = readFileSync(flag("--jsonl"), "utf8").split("\n").filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } })
    .filter((d) => d && (d.action === "post" || d.decision?.action === "post")).map((d) => d.text ?? d.decision?.text ?? "");
} else inputs = [argv.find((a, i) => !a.startsWith("--") && !["--max", "--last", "--jsonl"].includes(argv[i - 1]))];
if (!inputs.length || inputs[0] === undefined) { console.error("No draft given."); process.exit(2); }

const results = inputs.map((t) => ({ text: t, ...lint(t, { max, last }) }));
if (asJson) console.log(JSON.stringify(results.length === 1 ? results[0] : results));
else for (const r of results) {
  console.log(`${r.ok ? "PASS" : "BLOCK"} · ${r.chars} chars · ${r.text.slice(0, 80).replace(/\s+/g, " ")}${r.text.length > 80 ? "…" : ""}`);
  for (const i of r.issues) console.log(`  ${i.level === "error" ? "✗" : "!"} ${i.rule}: ${i.message}`);
}
process.exit(results.every((r) => r.ok) ? 0 : 3);
}
