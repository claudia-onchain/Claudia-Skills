// Shared helpers for validate.mjs, build.mjs and sync-site.mjs. Node >= 20, no dependencies.
import { readdirSync, readFileSync, statSync, lstatSync, existsSync } from "node:fs";
import { join, relative, sep, posix } from "node:path";

export const CATEGORIES = [
  { id: "create", title: "Create", summary: "Content creation and AI generation: images, video, voice, editing, captions." },
  { id: "grow", title: "Grow", summary: "Influencer growth, marketing and business: platforms, schedules, deals, reporting." },
  { id: "build", title: "Build", summary: "Agents, the Claudia platform, packages and onchain operations." },
];
export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);
export const LEVELS = ["beginner", "intermediate", "advanced"];

/** The 54 binding slugs (SKILLS-SPEC.md). Cross-links between skills rely on these names. */
export const ROSTER = {
  create: [
    "claudia-character-bible", "character-consistency", "image-prompting-fundamentals", "photoreal-portrait-prompts",
    "lifestyle-scene-prompts", "banner-and-collage-design", "video-prompting", "selfie-and-ugc-video-prompts", "voice-and-lip-sync",
    "short-form-editing", "storyboarding-shorts", "music-and-sound-for-shorts", "thumbnails-and-covers", "captions-and-hooks",
    "content-pillars-and-series", "batch-content-production", "ai-disclosure-and-provenance", "prompt-library-management",
  ],
  grow: [
    "x-playbook", "tiktok-playbook", "instagram-reels-playbook", "youtube-shorts-playbook", "telegram-and-discord-community",
    "posting-schedule", "engagement-and-replies", "growth-experiments", "collabs-and-cross-promotion", "brand-deals-and-sponsorships",
    "trend-research", "personal-brand-strategy", "launch-campaigns", "crypto-marketing-compliance", "crisis-and-reputation",
    "monetization-streams", "media-kit-and-pitching", "kpi-reporting",
  ],
  build: [
    "claudia-platform-overview", "create-an-agent", "agent-persona-and-system-prompt", "autonomous-posting-loop",
    "thread-etiquette-and-trust", "mcp-setup", "sdk-quickstart", "cli-power-user", "media-pipelines", "social-publishing",
    "claudia-local-studio", "coin-research", "rug-check", "launch-a-coin", "safe-trading", "wallet-and-key-security",
    "automation-and-webhooks", "agent-ops-runbook",
  ],
};
export const ROSTER_SLUGS = new Set(Object.values(ROSTER).flat());

/** H2 sections every SKILL.md must have, in this order (matched case-insensitively by prefix). */
export const REQUIRED_SECTIONS = [
  "When to use this",
  "What you need",
  "Steps",
  "Templates",
  "Check before you finish",
  "Pitfalls",
  "Related skills",
];

export const TEXT_EXT = new Set([".md", ".markdown", ".txt", ".json", ".csv", ".tsv", ".yaml", ".yml", ".sh", ".mjs", ".js", ".cjs", ".ts", ".py", ".toml", ".env.example"]);
export const IGNORED = new Set([".DS_Store", "Thumbs.db", ".gitkeep", "node_modules", ".git"]);

export function isTextFile(path) {
  const lower = path.toLowerCase();
  for (const ext of TEXT_EXT) if (lower.endsWith(ext)) return true;
  return !lower.includes(".") || lower.endsWith("license");
}

/** Every skill folder: <root>/skills/<category>/<slug>/ (whether or not SKILL.md exists yet). */
export function findSkillDirs(root) {
  const base = join(root, "skills");
  const out = [];
  if (!existsSync(base)) return out;
  for (const category of readdirSync(base).sort()) {
    const cdir = join(base, category);
    if (IGNORED.has(category) || category.startsWith(".") || !statSync(cdir).isDirectory()) continue;
    for (const slug of readdirSync(cdir).sort()) {
      const dir = join(cdir, slug);
      if (IGNORED.has(slug) || slug.startsWith(".") || !statSync(dir).isDirectory()) continue;
      out.push({ category, slug, dir });
    }
  }
  return out;
}

/** All files under a skill folder as posix paths relative to it. SKILL.md first, then sorted. Dotfiles skipped. */
export function listFiles(dir) {
  const files = [];
  const walk = (d) => {
    for (const name of readdirSync(d).sort()) {
      if (IGNORED.has(name) || name.startsWith(".")) continue;
      const p = join(d, name);
      const st = lstatSync(p);
      if (st.isSymbolicLink()) {
        files.push({ path: relative(dir, p).split(sep).join(posix.sep), symlink: true, size: 0, mode: 0o644 });
        continue;
      }
      if (st.isDirectory()) walk(p);
      else if (st.isFile()) files.push({ path: relative(dir, p).split(sep).join(posix.sep), size: st.size, mode: st.mode & 0o777 });
    }
  };
  walk(dir);
  files.sort((a, b) => (a.path === "SKILL.md" ? -1 : b.path === "SKILL.md" ? 1 : a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  return files;
}

// ---------------------------------------------------------------------------------------------------------------
// Frontmatter: a YAML subset that covers the Agent Skills shape.
//   key: scalar            plain, "double quoted" (with \" \\ \n \t escapes) or 'single quoted' ('' = ')
//   key: >- / > / |- / |   folded or literal block scalar (indented lines that follow)
//   key:                   followed by an indented block of `child: scalar` lines (one level, e.g. metadata)
//   # comments, blank lines
// Anything else (lists, flow maps, anchors, deeper nesting) is reported as an error rather than guessed at.
// Each scalar keeps `quoted` so callers can tell "1.0" (a string) from 1.0 (a YAML number).
// ---------------------------------------------------------------------------------------------------------------

/** Splits a file into frontmatter text and body. Returns null frontmatter when the file doesn't start with ---. */
export function splitFrontmatter(text) {
  const src = text.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  if (!src.startsWith("---\n")) return { fm: null, body: src, bodyStartLine: 1 };
  const end = src.indexOf("\n---", 3);
  if (end === -1) return { fm: null, body: src, bodyStartLine: 1, error: "frontmatter has no closing ---" };
  const after = src.indexOf("\n", end + 4);
  const fm = src.slice(4, end + 1);
  const body = after === -1 ? "" : src.slice(after + 1);
  const bodyStartLine = fm.split("\n").length + 2;
  return { fm, body, bodyStartLine };
}

function stripComment(s) {
  // Remove a trailing " # comment" that is not inside quotes.
  let q = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === "\\" && q === '"') i++;
      else if (c === q) q = null;
    } else if (c === '"' || c === "'") {
      if (i === 0 || /\s/.test(s[i - 1])) q = c;
    } else if (c === "#" && (i === 0 || /\s/.test(s[i - 1]))) return s.slice(0, i).trimEnd();
  }
  return s.trimEnd();
}

function parseScalar(raw, line, errors) {
  const s = stripComment(raw).trim();
  if (s.startsWith('"')) {
    let out = "";
    let i = 1;
    for (; i < s.length; i++) {
      const c = s[i];
      if (c === "\\") {
        const n = s[++i];
        out += n === "n" ? "\n" : n === "t" ? "\t" : n === '"' ? '"' : n === "\\" ? "\\" : n === "/" ? "/" : `\\${n}`;
      } else if (c === '"') break;
      else out += c;
    }
    if (i >= s.length) errors.push({ line, msg: "unterminated double-quoted string" });
    else if (s.slice(i + 1).trim()) errors.push({ line, msg: "unexpected text after closing quote" });
    return { value: out, quoted: true };
  }
  if (s.startsWith("'")) {
    let out = "";
    let i = 1;
    for (; i < s.length; i++) {
      if (s[i] === "'") {
        if (s[i + 1] === "'") {
          out += "'";
          i++;
        } else break;
      } else out += s[i];
    }
    if (i >= s.length) errors.push({ line, msg: "unterminated single-quoted string" });
    else if (s.slice(i + 1).trim()) errors.push({ line, msg: "unexpected text after closing quote" });
    return { value: out, quoted: true };
  }
  if (/^[[{&*!|>%@`]/.test(s) && !/^[|>][-+]?$/.test(s)) errors.push({ line, msg: `unsupported YAML syntax: ${s.slice(0, 30)}` });
  if (/:\s/.test(s)) errors.push({ line, msg: `plain value contains ": " — quote it` });
  return { value: s, quoted: false };
}

/** How YAML would type an unquoted plain scalar (so we can insist on strings where the spec wants strings). */
export function yamlType(sc) {
  if (sc.quoted || sc.block) return "string";
  const v = sc.value;
  if (v === "" || v === "~" || /^null$/i.test(v)) return "null";
  if (/^(true|false|yes|no|on|off)$/i.test(v)) return "boolean";
  if (/^[-+]?(\d+|\d*\.\d+|\d+\.\d*)([eE][-+]?\d+)?$/.test(v) || /^0x[0-9a-f]+$/i.test(v)) return "number";
  if (/^\d{4}-\d{2}-\d{2}([Tt ].*)?$/.test(v)) return "date";
  return "string";
}

function readBlock(lines, start, parentIndent) {
  // Collect lines more indented than parentIndent (blank lines included) starting at `start`.
  const out = [];
  for (let i = start; i < lines.length; i++) {
    const l = lines[i];
    if (l.trim() === "") {
      out.push("");
      continue;
    }
    const ind = l.length - l.trimStart().length;
    if (ind <= parentIndent) break;
    out.push(l);
  }
  while (out.length && out[out.length - 1] === "") out.pop();
  return { lines: out, next: start + out.length };
}

function blockScalar(indicator, blockLines) {
  const nonEmpty = blockLines.filter((l) => l.trim());
  const ind = nonEmpty.length ? Math.min(...nonEmpty.map((l) => l.length - l.trimStart().length)) : 0;
  const ls = blockLines.map((l) => l.slice(ind));
  let text;
  if (indicator.startsWith("|")) text = ls.join("\n");
  else {
    // Folded: single newlines become spaces, blank lines become newlines.
    text = "";
    for (let k = 0; k < ls.length; k++) {
      const l = ls[k];
      if (l === "") text += "\n";
      else text += (text && !text.endsWith("\n") ? " " : "") + l;
    }
  }
  const chomp = indicator.endsWith("-") ? "strip" : indicator.endsWith("+") ? "keep" : "clip";
  if (chomp === "strip") return text.replace(/\n+$/, "");
  if (chomp === "keep") return `${text}\n`;
  return `${text.replace(/\n+$/, "")}\n`;
}

/**
 * Parses frontmatter text into { data, errors }. data values are { value, quoted, line } scalars or, for nested maps,
 * { map: { key: scalar }, line }. Line numbers are 1-based file lines (frontmatter starts on line 2).
 */
export function parseFrontmatter(fm) {
  const errors = [];
  const data = {};
  const lines = fm.split("\n");
  let i = 0;
  const L = (k) => k + 2;
  while (i < lines.length) {
    const raw = lines[i];
    if (!raw.trim() || raw.trimStart().startsWith("#")) {
      i++;
      continue;
    }
    if (/^\s/.test(raw)) {
      errors.push({ line: L(i), msg: "unexpected indentation" });
      i++;
      continue;
    }
    if (raw.includes("\t")) errors.push({ line: L(i), msg: "tab character in frontmatter (YAML forbids tabs for indentation)" });
    const m = /^([A-Za-z0-9_-]+):(?:\s+(.*))?$/.exec(raw) ?? /^([A-Za-z0-9_-]+):$/.exec(raw);
    if (!m) {
      errors.push({ line: L(i), msg: `cannot parse line: ${raw.slice(0, 60)}` });
      i++;
      continue;
    }
    const key = m[1];
    const rest = stripComment(m[2] ?? "").trim();
    if (key in data) errors.push({ line: L(i), msg: `duplicate key "${key}"` });
    if (rest === "") {
      // nested map
      const blk = readBlock(lines, i + 1, 0);
      const map = {};
      let childIndent = null;
      blk.lines.forEach((l, k) => {
        const ln = L(i + 1 + k);
        if (!l.trim() || l.trimStart().startsWith("#")) return;
        const ind = l.length - l.trimStart().length;
        if (l.trim().startsWith("- ") || l.trim() === "-") {
          errors.push({ line: ln, msg: `lists are not allowed in "${key}" — use a comma-separated string` });
          return;
        }
        if (childIndent === null) childIndent = ind;
        if (ind !== childIndent) {
          errors.push({ line: ln, msg: `"${key}" supports one level of "key: value" lines (inconsistent indentation)` });
          return;
        }
        const cm = /^([A-Za-z0-9_.-]+):(?:\s+(.*))?$/.exec(l.trim());
        if (!cm) {
          errors.push({ line: ln, msg: l.trim().startsWith("-") ? `lists are not allowed in "${key}" — use a comma-separated string` : `cannot parse "${key}" entry: ${l.trim().slice(0, 50)}` });
          return;
        }
        if (cm[1] in map) errors.push({ line: ln, msg: `duplicate key "${key}.${cm[1]}"` });
        const v = cm[2] ?? "";
        if (/^[|>][-+]?$/.test(v.trim())) {
          errors.push({ line: ln, msg: `block scalars are not supported inside "${key}"` });
          return;
        }
        map[cm[1]] = { ...parseScalar(v, ln, errors), line: ln };
      });
      data[key] = { map, line: L(i) };
      i = blk.next;
      continue;
    }
    if (/^[|>][-+]?$/.test(rest)) {
      const blk = readBlock(lines, i + 1, 0);
      data[key] = { value: blockScalar(rest, blk.lines), quoted: false, block: true, line: L(i) };
      i = blk.next;
      continue;
    }
    data[key] = { ...parseScalar(m[2] ?? "", L(i), errors), line: L(i) };
    // Plain multi-line continuation (YAML folds these) — support it, quoted multi-line is rejected for clarity.
    let j = i + 1;
    while (j < lines.length && /^\s+\S/.test(lines[j]) && !lines[j].trimStart().startsWith("#")) {
      if (data[key].quoted) {
        errors.push({ line: L(j), msg: "multi-line quoted strings are not supported — keep the string on one line" });
      } else data[key].value += ` ${lines[j].trim()}`;
      j++;
    }
    i = j;
  }
  return { data, errors };
}

/** Reads and parses SKILL.md. Returns { text, fm, body, bodyStartLine, data, errors, meta } where meta is plain strings. */
export function readSkill(dir) {
  const file = join(dir, "SKILL.md");
  const text = readFileSync(file, "utf8");
  const split = splitFrontmatter(text);
  const errors = [];
  if (split.error) errors.push({ line: 1, msg: split.error });
  if (split.fm === null) {
    if (!split.error) errors.push({ line: 1, msg: "SKILL.md must start with YAML frontmatter (---)" });
    return { text, body: split.body, bodyStartLine: 1, data: {}, errors, fields: {}, metadata: {} };
  }
  const parsed = parseFrontmatter(split.fm);
  errors.push(...parsed.errors);
  const fields = {};
  const metadata = {};
  for (const [k, v] of Object.entries(parsed.data)) {
    if (v.map) {
      if (k === "metadata") for (const [mk, mv] of Object.entries(v.map)) metadata[mk] = mv.value;
    } else fields[k] = v.value;
  }
  return { text, body: split.body, bodyStartLine: split.bodyStartLine, data: parsed.data, errors, fields, metadata };
}

export const splitList = (s) =>
  String(s ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

/** Markdown links outside fenced code blocks and inline code: [{ text, href, line }]. */
export function markdownLinks(text, firstLine = 1) {
  const out = [];
  let fence = null;
  text.split("\n").forEach((line, k) => {
    const f = /^\s{0,3}(`{3,}|~{3,})/.exec(line);
    if (f) {
      if (!fence) fence = f[1][0];
      else if (f[1][0] === fence) fence = null;
      return;
    }
    if (fence) return;
    const clean = line.replace(/`[^`]*`/g, (s) => " ".repeat(s.length));
    const re = /!?\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g;
    let m;
    while ((m = re.exec(clean))) out.push({ text: m[1], href: m[2], line: firstLine + k });
  });
  return out;
}

/** Slugs referenced by relative links to ../../<category>/<slug>/SKILL.md (or ../<slug>/SKILL.md). */
export function relatedSlugs(body) {
  const seen = new Set();
  for (const l of markdownLinks(body)) {
    const m = /^(?:\.\.\/\.\.\/([a-z]+)\/|\.\.\/)([a-z0-9-]+)\/SKILL\.md(?:#.*)?$/.exec(l.href);
    if (m) seen.add(m[2]);
  }
  return [...seen];
}

export function readText(path) {
  return readFileSync(path, "utf8");
}
