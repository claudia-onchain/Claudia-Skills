#!/usr/bin/env node
// voice-check.mjs — measure a voice from past posts, and lint drafts against a voice rules file.
// Node >= 20, no dependencies, no network. Reads only the files you pass.
//
//   node voice-check.mjs stats <posts.txt|posts.csv> [--json]
//   node voice-check.mjs lint <draft.txt> --rules <voice-rules.json> [--platform x] [--json]
//
// posts.txt: one post per block, blocks separated by a line containing only ---  (or one post per line if no --- found)
// posts.csv: needs a header row with a "text" column (quoted fields with commas and "" escapes are fine)
// draft.txt: one draft; several drafts separated by lines of ---
// Exit codes: 0 ok · 3 lint found errors · 1 bad input

import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const cmd = args[0];
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1] ?? true;
};
const asJson = args.includes("--json");

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((f) => f.trim()));
}

function loadPosts(path) {
  const raw = readFileSync(path, "utf8").replace(/^﻿/, "");
  if (path.toLowerCase().endsWith(".csv")) {
    const rows = parseCsv(raw);
    const head = rows.shift()?.map((h) => h.trim().toLowerCase()) ?? [];
    const col = head.indexOf("text");
    if (col === -1) fail('CSV needs a "text" column');
    return rows.map((r) => (r[col] ?? "").trim()).filter(Boolean);
  }
  const text = raw.replace(/\r\n?/g, "\n");
  if (/^---\s*$/m.test(text)) return text.split(/^---\s*$/m).map((s) => s.trim()).filter(Boolean);
  return text.split("\n").map((s) => s.trim()).filter(Boolean);
}

const EMOJI = /\p{Extended_Pictographic}/gu;
const STOP = new Set(("a an the and or but if then so to of in on at for with from by as is are was were be been it its " +
  "this that these those i me my we our you your he she they them their his her not no yes do does did done have has had " +
  "just about into out up down over than too very can will would should could what which who when where why how all any " +
  "more most some one two there here it's i'm don't im dont").split(" "));

const words = (s) => (s.toLowerCase().match(/[\p{L}\p{N}'$#@-]+/gu) ?? []).map((w) => w.replace(/^'+|'+$/g, ""));
const median = (xs) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
};
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);
const top = (map, n) => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
const bump = (map, k) => map.set(k, (map.get(k) ?? 0) + 1);

function stats(posts) {
  const lens = posts.map((p) => [...p].length);
  const wcount = posts.map((p) => words(p).length);
  const vocab = new Map();
  const bigrams = new Map();
  const openers = new Map();
  const emojis = new Map();
  let lowerStart = 0, endsQuestion = 0, hasExclaim = 0, hasEmoji = 0, hashtags = 0, links = 0, capsWords = 0;
  for (const p of posts) {
    const w = words(p);
    const first = p.trim().match(/\p{L}/u)?.[0];
    if (first && first === first.toLowerCase() && first !== first.toUpperCase()) lowerStart++;
    if (/\?\s*$/.test(p)) endsQuestion++;
    if (p.includes("!")) hasExclaim++;
    const em = p.match(EMOJI) ?? [];
    if (em.length) hasEmoji++;
    for (const e of em) bump(emojis, e);
    hashtags += (p.match(/(^|\s)#[\p{L}\p{N}_]+/gu) ?? []).length;
    links += (p.match(/https?:\/\/\S+/g) ?? []).length;
    capsWords += (p.match(/\b[A-Z]{3,}\b/g) ?? []).filter((x) => !/^(AI|NFA|USD|SOL|ETH|API|CEO|DM|UK|EU|US)$/.test(x)).length;
    const content = w.filter((x) => !STOP.has(x) && x.length > 2 && !/^https?/.test(x));
    for (const x of new Set(content)) bump(vocab, x);
    for (let i = 0; i < w.length - 1; i++) if (!STOP.has(w[i]) || !STOP.has(w[i + 1])) bump(bigrams, `${w[i]} ${w[i + 1]}`);
    if (w.length >= 2) bump(openers, `${w[0]} ${w[1]}`);
  }
  const n = posts.length;
  return {
    posts: n,
    chars: { median: median(lens), min: Math.min(...lens), max: Math.max(...lens) },
    wordsMedian: median(wcount),
    lowercaseStartPct: pct(lowerStart, n),
    endsWithQuestionPct: pct(endsQuestion, n),
    exclamationPct: pct(hasExclaim, n),
    emojiPostsPct: pct(hasEmoji, n),
    emojiTop: top(emojis, 8),
    hashtagsPerPost: n ? +(hashtags / n).toFixed(2) : 0,
    linksPerPost: n ? +(links / n).toFixed(2) : 0,
    allCapsWordsPerPost: n ? +(capsWords / n).toFixed(2) : 0,
    signatureWords: top(vocab, 25).filter(([, c]) => c >= 2),
    commonPairs: top(bigrams, 15).filter(([, c]) => c >= 2),
    commonOpeners: top(openers, 10).filter(([, c]) => c >= 2),
  };
}

function printStats(s) {
  const list = (xs) => xs.map(([k, v]) => `${k} (${v})`).join(", ") || "—";
  console.log(`Voice fingerprint · ${s.posts} posts`);
  console.log(`  length          median ${s.chars.median} chars (min ${s.chars.min}, max ${s.chars.max}), median ${s.wordsMedian} words`);
  console.log(`  case            ${s.lowercaseStartPct}% start lowercase · ${s.allCapsWordsPerPost} ALL-CAPS words per post`);
  console.log(`  punctuation     ${s.endsWithQuestionPct}% end with a question · ${s.exclamationPct}% use "!"`);
  console.log(`  emoji           ${s.emojiPostsPct}% of posts · top: ${list(s.emojiTop)}`);
  console.log(`  hashtags/links  ${s.hashtagsPerPost} hashtags · ${s.linksPerPost} links per post`);
  console.log(`  signature words ${list(s.signatureWords)}`);
  console.log(`  common pairs    ${list(s.commonPairs)}`);
  console.log(`  common openers  ${list(s.commonOpeners)}`);
}

function lint(draft, rules, platform) {
  const out = [];
  const add = (level, rule, msg) => out.push({ level, rule, msg });
  const lower = draft.toLowerCase();
  const p = (platform && rules.platforms?.[platform]) || {};
  const chars = [...draft].length;
  const esc = (x) => String(x).toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const has = (phrase) => new RegExp(`(?<![\\p{L}\\p{N}])${esc(phrase)}(?![\\p{L}\\p{N}])`, "u").test(lower);

  for (const b of rules.banned ?? []) if (has(b)) add("error", "banned", `uses a banned phrase: "${b}"`);
  for (const a of rules.avoid ?? []) if (has(a)) add("warn", "avoid", `uses a word the voice avoids: "${a}"`);

  const max = p.maxChars ?? rules.maxChars;
  if (max && chars > max) add("error", "length", `${chars} chars; ${platform ?? "default"} max is ${max}`);
  const target = p.targetChars ?? rules.targetChars;
  if (target && chars > target) add("warn", "length", `${chars} chars; the voice aims for ${target} or fewer here`);

  const em = draft.match(EMOJI) ?? [];
  const emMax = p.emojiMax ?? rules.emoji?.max;
  if (emMax !== undefined && em.length > emMax) add("error", "emoji", `${em.length} emoji; max ${emMax}`);
  const allowed = rules.emoji?.allowed;
  if (allowed?.length) for (const e of new Set(em)) if (!allowed.includes(e)) add("warn", "emoji", `emoji ${e} is not in the voice's set (${allowed.join(" ")})`);

  const tags = draft.match(/(^|\s)#[\p{L}\p{N}_]+/gu) ?? [];
  const tagMax = p.hashtagsMax ?? rules.hashtagsMax;
  if (tagMax !== undefined && tags.filter((t) => !/#ad\b/i.test(t)).length > tagMax) add("warn", "hashtags", `${tags.length} hashtags; max ${tagMax}`);

  const ex = (draft.match(/!/g) ?? []).length;
  if (rules.exclamationMax !== undefined && ex > rules.exclamationMax) add("warn", "exclamation", `${ex} "!"; max ${rules.exclamationMax}`);

  const caps = (draft.match(/(?<!\$)\b[A-Z]{3,}\b/g) ?? []).filter((x) => !(rules.capsAllowed ?? []).includes(x));
  if (rules.noAllCaps && caps.length) add("warn", "caps", `ALL-CAPS words: ${[...new Set(caps)].join(", ")}`);

  if (rules.lowercaseStart) {
    const lead = draft.trim().replace(/^([$@#]\S+|https?:\/\/\S+)\s*/u, "");
    const first = lead.match(/\p{L}/u)?.[0];
    if (first && first !== first.toLowerCase() && !/^(I|AI)\b/.test(lead)) add("warn", "case", "the voice starts posts in lowercase");
  }

  const coin = /\$[A-Z][A-Z0-9]{1,15}\b|\b0x[0-9a-fA-F]{40}\b|\b[1-9A-HJ-NP-Za-km-z]{32,44}\b|\b(coin|token|memecoin|market cap|mcap)\b/i;
  if (rules.requireNfaOnCoins !== false && coin.test(draft) && !/not financial advice/i.test(draft))
    add("error", "nfa", 'mentions a coin, ticker or address without "Not financial advice."');

  if (rules.requireAiLabel && platform && (rules.textLabelPlatforms ?? []).includes(platform) && !/ai-generated/i.test(draft))
    add("warn", "ai-label", `${platform} has no native AI flag: make sure "(AI-generated)" is added (the social package adds it by default)`);

  for (const r of rules.patterns ?? []) {
    try {
      if (new RegExp(r.regex, r.flags ?? "i").test(draft)) add(r.level ?? "warn", r.id ?? "pattern", r.message ?? `matches ${r.regex}`);
    } catch {
      add("warn", "rules", `bad regex in rules: ${r.regex}`);
    }
  }
  return { chars, findings: out, verdict: out.some((f) => f.level === "error") ? "fix" : out.length ? "check" : "pass" };
}

if (cmd === "stats") {
  const file = args[1];
  if (!file) fail("usage: node voice-check.mjs stats <posts.txt|posts.csv> [--json]");
  const posts = loadPosts(file);
  if (posts.length < 10) console.error(`warning: only ${posts.length} posts; 30+ gives a steadier fingerprint`);
  const s = stats(posts);
  if (asJson) console.log(JSON.stringify(s, null, 2));
  else printStats(s);
} else if (cmd === "lint") {
  const file = args[1];
  const rulesPath = flag("rules");
  if (!file || typeof rulesPath !== "string") fail("usage: node voice-check.mjs lint <draft.txt> --rules <voice-rules.json> [--platform x] [--json]");
  let rules;
  try {
    rules = JSON.parse(readFileSync(rulesPath, "utf8"));
  } catch (e) {
    fail(`cannot read rules: ${e.message}`);
  }
  const platform = typeof flag("platform") === "string" ? flag("platform") : undefined;
  const drafts = loadPosts(file);
  const results = drafts.map((d) => ({ draft: d, ...lint(d, rules, platform) }));
  if (asJson) console.log(JSON.stringify(results, null, 2));
  else {
    results.forEach((r, i) => {
      console.log(`Draft ${i + 1} · ${r.chars} chars · ${r.verdict.toUpperCase()}`);
      console.log(`  "${r.draft.length > 90 ? `${r.draft.slice(0, 87)}...` : r.draft}"`);
      for (const f of r.findings) console.log(`  ${f.level === "error" ? "error" : "warn "}  ${f.rule}: ${f.msg}`);
    });
  }
  process.exit(results.some((r) => r.verdict === "fix") ? 3 : 0);
} else {
  fail("usage:\n  node voice-check.mjs stats <posts.txt|posts.csv> [--json]\n  node voice-check.mjs lint <draft.txt> --rules <voice-rules.json> [--platform x] [--json]");
}
