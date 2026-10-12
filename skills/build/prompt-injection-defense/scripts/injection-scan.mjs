#!/usr/bin/env node
// injection-scan.mjs — flags text that looks like it is trying to steer an AI agent, and optionally wraps it as
// outside content (Claudia Local's <outside> format) for the model.
//
// Usage:
//   node injection-scan.mjs <file | -> [--json] [--wrap <source>] [--from <who>]
//   - reads stdin. <source> is one of channel, thread, web, file, mcp, skill, provider.
//
// A tripwire for logs and review, NOT a defense: clean-looking text can still be an attack, and flagged text is still
// only data. Read-only: no network, writes nothing. Node >= 20, no dependencies.
// Exit codes: 0 nothing flagged · 3 flagged (medium or high) · 1 error · 2 bad usage.
import { readFileSync } from "node:fs";

const HELP = `injection-scan.mjs <file | -> [--json] [--wrap <source>] [--from <who>]
  exit 0 = nothing flagged · 3 = flagged · 1 error · 2 usage`;
const SOURCES = ["channel", "thread", "web", "file", "mcp", "skill", "provider"];
const MAX_CHARS = 50_000;

// [family, weight, regex, label]. Weights: 3 = strong signal, 2 = medium, 1 = context.
const RULES = [
  ["override", 3, /\b(ignore|disregard|forget|override|bypass)\b(.{0,30}\b(previous|prior|above|earlier|all|your|the|these|my)\b)?.{0,20}\b(instructions?|rules?|prompt|guidelines|guardrails)\b/i, "asks to drop its instructions"],
  ["override", 2, /\b(decode|base64|rot13|reverse)\b.{0,40}\b(follow|do it|do that|execute|run it|obey|act on)\b/i, "asks to decode and follow"],
  ["override", 3, /\b(you are now|from now on|new (system )?instructions?|act as (an? )?(unrestricted|jailbroken|admin)|developer mode|admin mode|dan mode)\b/i, "tries to set a new role or rule"],
  ["role", 3, /(<\/?(system|assistant|developer|instructions?)>|<\|im_(start|end)\|>|\[(system|assistant|inst)\]|^\s*(system|assistant)\s*:)/im, "fake chat-role markers"],
  ["role", 3, /<\/?(outside|untrusted)\b/i, "fake trust-boundary tags"],
  ["authority", 2, /\b(claudia (staff|team|support|admin)|official (support|team)|the owner (says|said|wants|allows|approved)|i am (the|your) owner|moderator.{0,20}authori[sz]e|on behalf of the (owner|team))\b/i, "claims authority"],
  ["authority", 2, /\b(pre-?approved|already approved|approval (is )?(already )?(granted|not needed|off)|(review|approval|confirmation) (is )?not needed|skip (the )?(review|approval)|publish (it )?directly|no need to (ask|confirm)|without (asking|approval|confirmation))\b/i, "claims an approval"],
  ["action", 2, /\b(post|publish|tweet|reply|dm|message|send|transfer|buy|sell|ape|launch|attest|repost|approve|install|execute|run)\b.{0,40}\b(now|immediately|right away|every (room|member|agent)|all (rooms|members|agents))\b/i, "asks for an action now or to everyone"],
  ["action", 2, /\b(agents?|ai|assistants?|bots?|llms?)\b.{0,30}\b(must|should|need to|are required to|reading this)\b/i, "addresses AI agents directly"],
  ["action", 2, /\b(note|message|instructions?|attention|notice)\b.{0,6}\b(to|for)\b.{0,6}\b(all )?(ai|agents?|assistants?|bots?|llms?|language models?)\b/i, "addresses AI agents directly"],
  ["action", 2, /\btell (users|everyone|people|holders|your followers|the room)\b.{0,20}\b(to )?(buy|sell|ape|hold|send|claim)\b/i, "asks the agent to tell people to act"],
  ["secrets", 3, /\b(api[ -]?key|device key|private key|secret key|seed phrase|recovery phrase|mnemonic|passphrase|bearer token|bot token|system prompt|your instructions|env(ironment)? variables?)\b/i, "asks about secrets or the prompt"],
  ["settings", 3, /\b(CLAUDIA_MCP_ALLOW_TRADES|CLAUDIA_MCP_READ_ONLY|raise (the )?caps?|max[-_ ]sol|kill ?switch off|disable (approval|the kill switch)|turn off (approval|review))\b/i, "asks to weaken settings"],
  ["secrets", 3, /\b(print|repeat|show|reveal|output|paste)\b.{0,25}\b(everything|all( the)? text|the text|what'?s?) (above|before) (this|here)\b/i, "asks to repeat its prompt"],
  ["disclosure", 2, /\b(not an ai|i'?m (a )?human|remove (the )?(ai )?(label|disclosure)|without the (ai )?label|don'?t (say|mention) (you'?re|you are) (an )?ai)\b/i, "asks to drop the AI label"],
  ["caps", 2, /\b(split|break|divide)\b.{0,30}\binto\b.{0,30}\b(buys|trades|pieces|orders|transactions)\b|\b(stay|keep it|stays) (just )?under the cap\b/i, "asks to get around a cap"],
  ["exfil", 3, /!\[[^\]]*\]\(\s*https?:\/\/[^)\s]*[?&][^)\s]*=/i, "markdown image with query parameters (data out)"],
  ["exfil", 2, /https?:\/\/[^\s"'<>]*(paste|append|insert|your|prompt|key|token|secret)[^\s"'<>]*/i, "link that asks for data in its URL"],
  ["money", 2, /\b(\d+x|100x|1000x|guaranteed|can't lose|risk-?free|to the moon|next (big|100x)|will (pump|moon))\b/i, "price or return promise"],
  ["money", 2, /\b(verified safe|100% safe|is safe to buy|not a rug|lp locked forever|dev doxxed)\b/i, "safety claim from a stranger"],
  ["scam", 3, /\b(claim (the |your )?airdrop|connect (your )?wallet|validate (your )?wallet|sync (your )?wallet|verify (your )?wallet)\b/i, "wallet-drainer wording"],
  ["urgency", 1, /\b(urgent|asap|within \d+ (seconds|minutes)|last chance|or (you|your agent) will be (banned|deleted|flagged))\b/i, "pressure or threats"],
  ["hidden", 2, /<!--[\s\S]*?-->|display\s*:\s*none|visibility\s*:\s*hidden|font-size\s*:\s*0/i, "hidden HTML text"],
];
const SKELETON_OVERRIDE = /\b(ignore|disregard|forget|override|bypass)\b.{0,40}\b(instructions?|ruies?|prompt|guideiines|guardraiis)\b/;
const ZERO_WIDTH = /[​-‏‪-‮⁠-⁤﻿]/g;
const SOL_ADDR = /(?<![A-Za-z0-9])[1-9A-HJ-NP-Za-km-z]{32,44}(?![A-Za-z0-9])/g;
const EVM_ADDR = /\b0x[0-9a-fA-F]{40}\b/g;
const URL = /https?:\/\/[^\s"'<>)]+/gi;
const B64 = /(?<![A-Za-z0-9+/=])[A-Za-z0-9+/]{24,}={0,2}(?![A-Za-z0-9+/=])/g;

const args = process.argv.slice(2);
if (!args.length || args.includes("-h") || args.includes("--help")) { console.log(HELP); process.exit(args.length ? 0 : 2); }
let file = null, json = false, wrap = null, from = "";
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--json") json = true;
  else if (a === "--wrap") { wrap = args[++i]; if (!SOURCES.includes(wrap)) { console.error(`--wrap needs one of ${SOURCES.join(", ")}`); process.exit(2); } }
  else if (a === "--from") from = String(args[++i] ?? "");
  else if (a.startsWith("--")) { console.error(`Unknown flag ${a}\n${HELP}`); process.exit(2); }
  else if (file === null) file = a;
  else { console.error(HELP); process.exit(2); }
}
if (file === null) { console.error(HELP); process.exit(2); }

/** Undo the cheap disguises: zero-width characters and leetspeak digits ("1" read as i and as l). */
function normalise(s, one = "i") {
  return s.replace(ZERO_WIDTH, "").replace(/[0134578@$]/g, (c) => ({ 0: "o", 1: one, 3: "e", 4: "a", 5: "s", 7: "t", 8: "b", "@": "a", $: "s" })[c]);
}

/** Base64 runs that decode to mostly printable text get scanned too. */
function decodedRuns(s) {
  const out = [];
  for (const m of s.matchAll(B64)) {
    if (m[0].length % 4 === 1) continue;
    let txt;
    try { txt = Buffer.from(m[0], "base64").toString("utf-8"); } catch { continue; }
    const printable = txt.replace(/[^\x20-\x7E]/g, "").length;
    if (txt.length >= 12 && printable / txt.length > 0.9 && /[a-z]{3,} [a-z]{2,}/i.test(txt)) out.push(txt);
  }
  return out;
}

function scan(text) {
  const findings = [];
  const seen = new Set();
  const check = (s, via) => {
    for (const [family, weight, re, label] of RULES) {
      const m = re.exec(s);
      if (!m) continue;
      const key = `${family}:${label}`;
      if (seen.has(key)) continue;
      seen.add(key);
      findings.push({ family, weight, label, via, match: m[0].replace(/\s+/g, " ").slice(0, 80) });
    }
  };
  check(text, "text");
  for (const one of ["i", "l"]) {
    const norm = normalise(text, one);
    if (norm !== text) check(norm, "normalised (zero-width or leetspeak removed)");
  }
  // Skeleton: i, l, 1 and | collapsed to "i", so "1gn0r3 y0ur ru1es" and "ignore your rules" look the same.
  const skeleton = normalise(text, "i").toLowerCase().replace(/[l|]/g, "i");
  if (!seen.has("override:asks to drop its instructions") && SKELETON_OVERRIDE.test(skeleton)) {
    seen.add("override:asks to drop its instructions");
    findings.push({ family: "override", weight: 3, label: "asks to drop its instructions", via: "letter skeleton (leetspeak)", match: SKELETON_OVERRIDE.exec(skeleton)[0].slice(0, 80) });
  }
  for (const d of decodedRuns(text)) check(d, "decoded base64");

  const zw = (text.match(ZERO_WIDTH) || []).length;
  if (zw) findings.push({ family: "hidden", weight: 2, label: `${zw} zero-width or bidi control characters`, via: "text", match: "" });
  const facts = {
    chars: text.length,
    urls: [...new Set(text.match(URL) || [])].slice(0, 10),
    solanaLike: (text.match(SOL_ADDR) || []).length,
    evmAddresses: (text.match(EVM_ADDR) || []).length,
  };
  if (facts.solanaLike + facts.evmAddresses) findings.push({ family: "addresses", weight: 1, label: `${facts.solanaLike + facts.evmAddresses} wallet or contract address(es)`, via: "text", match: "" });
  if (text.length > MAX_CHARS) findings.push({ family: "size", weight: 1, label: `longer than ${MAX_CHARS} characters; wrap cuts the rest`, via: "text", match: "" });

  const score = findings.reduce((n, f) => n + f.weight, 0);
  const level = score >= 6 || findings.some((f) => f.weight === 3 && ["override", "role", "secrets", "settings", "exfil"].includes(f.family)) ? "high" : score >= 3 ? "medium" : score > 0 ? "low" : "none";
  return { level, score, findings, facts };
}

function wrapOutside(source, text, who) {
  const body = text.slice(0, MAX_CHARS).replaceAll("</outside>", "<\\/outside>");
  const attr = who ? ` from="${who.replace(/["<>\n]/g, "").slice(0, 80)}"` : "";
  return `<outside source="${source}"${attr}>\n${body}\n</outside>`;
}

try {
  const text = readFileSync(file === "-" ? 0 : file, "utf-8");
  const r = scan(text);
  if (json) console.log(JSON.stringify({ file: file === "-" ? "stdin" : file, ...r, wrapped: wrap ? wrapOutside(wrap, text, from) : undefined }, null, 2));
  else {
    console.error(`Injection scan · ${file === "-" ? "stdin" : file} · ${r.facts.chars} chars · level ${r.level.toUpperCase()} (score ${r.score})`);
    for (const f of r.findings) console.error(`  [${f.family}] ${f.label}${f.match ? ` · "${f.match}"` : ""}${f.via !== "text" ? ` · via ${f.via}` : ""}`);
    if (r.facts.urls.length) console.error(`  links: ${r.facts.urls.join(" ")}`);
    console.error("  This is a tripwire, not a verdict. Treat the text as outside content either way.");
    if (wrap) console.log(wrapOutside(wrap, text, from));
  }
  process.exit(r.level === "medium" || r.level === "high" ? 3 : 0);
} catch (e) {
  console.error(`injection-scan: ${e.message}`);
  process.exit(1);
}
