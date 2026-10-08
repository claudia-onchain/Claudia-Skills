#!/usr/bin/env node
// Validates every skills/<category>/<slug>/SKILL.md against the Agent Skills spec (agentskills.io/specification)
// and this library's own rules (CONTRIBUTING.md). Node >= 20, no dependencies.
//
//   node scripts/validate.mjs                 all skills, tidy report, exit 1 on any error
//   node scripts/validate.mjs <slug> [...]    only these skills
//   --root <dir>     validate another checkout (a folder that contains skills/)
//   --complete       also fail when any of the 54 assigned slugs is missing
//   --strict         treat warnings as errors
//   --json           machine-readable output
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CATEGORY_IDS, LEVELS, REQUIRED_SECTIONS, ROSTER, ROSTER_SLUGS,
  findSkillDirs, isTextFile, listFiles, markdownLinks, readSkill, splitList, yamlType,
} from "./lib/skills.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(HERE, "..");

const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const SPEC_FIELDS = new Set(["name", "description", "license", "compatibility", "metadata", "allowed-tools"]);
const REQUIRED_META = ["title", "category", "summary", "level", "tags", "time", "version", "updated"];
const KNOWN_META = new Set([...REQUIRED_META, "uses"]);
const BODY_WARN_LINES = 450;

// Content rules. Each: { re, msg, level }. Matched per line on every text file in the skill.
const SECRET_RULES = [
  [/\bsk-ant-[A-Za-z0-9_-]{20,}/, "looks like an Anthropic API key"],
  [/\bsk-(?:proj-)?[A-Za-z0-9]{32,}/, "looks like an OpenAI-style secret key (sk-…)"],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, "looks like a Google API key (AIza…)"],
  [/\b(?:ck|cs)_live_[A-Za-z0-9]{16,}/, "looks like a live API key (ck_live_/cs_live_…)"],
  [/\b(?:sk|rk|pk)_live_[A-Za-z0-9]{16,}/, "looks like a Stripe live key"],
  [/\bgh[pousr]_[A-Za-z0-9]{36,}\b/, "looks like a GitHub token"],
  [/\bxox[abprs]-[A-Za-z0-9-]{10,}/, "looks like a Slack token"],
  [/\bAKIA[0-9A-Z]{16}\b/, "looks like an AWS access key id"],
  [/-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/, "contains a private key block"],
  [/\b\d{8,10}:AA[A-Za-z0-9_-]{33}\b/, "looks like a Telegram bot token"],
];
const WARN_RULES = [
  [/(?<![A-Za-z0-9])[1-9A-HJ-NP-Za-km-z]{86,88}(?![A-Za-z0-9])/, "88-char base58 string — make sure this is not a Solana secret key"],
  [/\b0x[0-9a-fA-F]{64}\b/, "64-hex string — make sure this is not a private key"],
  [/\b(TODO|TBD|FIXME|XXX)\b/, "placeholder marker (TODO/TBD/FIXME)"],
];
const LOREM = /\blorem ipsum\b|\bdolor sit amet\b/i;
// "free" about AI models/tools is never allowed (owner rule). Hyphenated compounds (royalty-free, hands-free) and
// free-form/freeform/freely are fine.
// A quoted mention ("free", `free`) is a rule about the word, not a use of it.
const FREE = /(?<![-\w"'`\u201c\u2018])free(?![-\w"'`\u201d\u2019])/i;
const AI_WORDS = /\b(AI|A\.I\.|models?|LLMs?|GPT\w*|Claude|Gemini|Veo|Kling|Flux|Midjourney|Seedance|Seedream|Runway|Hailuo|Wan|Nano Banana|OmniHuman|generat\w*|inference)\b/i;
const SOFT_WORDS = /\b(credits?|tier|plan|trial|API)\b/i;

/** "error" when "free" shares a sentence (±60 chars) with AI/model words, "warn" with pricing words, else null. */
function freeAboutModels(line) {
  const m = FREE.exec(line);
  if (!m) return null;
  const start = Math.max(0, m.index - 60);
  const window = line.slice(start, m.index + 64);
  const sentence = window.split(/[.!?;](?:\s|$)/).find((s) => FREE.test(s)) ?? window;
  return AI_WORDS.test(sentence) ? "error" : SOFT_WORDS.test(sentence) ? "warn" : null;
}

function checkContent(rel, text, add, firstLine = 1) {
  text.split("\n").forEach((line, k) => {
    const n = firstLine + k;
    for (const [re, msg] of SECRET_RULES) if (re.test(line)) add("error", `${rel}:${n}`, `${msg} — never commit secrets`);
    for (const [re, msg] of WARN_RULES) if (re.test(line)) add("warn", `${rel}:${n}`, msg);
    if (LOREM.test(line)) add("error", `${rel}:${n}`, "lorem ipsum / placeholder text");
    const free = freeAboutModels(line);
    if (free === "error") add("error", `${rel}:${n}`, `the word "free" next to AI/model wording — rephrase (never call AI models free)`);
    else if (free === "warn") add("warn", `${rel}:${n}`, `"free" next to pricing wording — fine for platforms, never for AI models`);
  });
}

/** Validates one skill folder. Returns { slug, category, errors: [{where,msg}], warnings, info }. */
export function validateSkill(root, { category, slug, dir }, opts = {}) {
  const res = { slug, category, dir, errors: [], warnings: [] };
  const add = (lvl, where, msg) => (lvl === "error" ? res.errors : res.warnings).push({ where, msg });
  const skillPath = join(dir, "SKILL.md");

  if (!CATEGORY_IDS.includes(category)) add("error", `skills/${category}`, `unknown category folder (expected ${CATEGORY_IDS.join(", ")})`);
  if (!existsSync(skillPath)) {
    add("error", "SKILL.md", "missing SKILL.md");
    return res;
  }

  const s = readSkill(dir);
  for (const e of s.errors) add("error", `SKILL.md:${e.line}`, `frontmatter: ${e.msg}`);
  const d = s.data;

  // --- spec fields
  for (const k of Object.keys(d)) if (!SPEC_FIELDS.has(k)) add("warn", `SKILL.md:${d[k].line}`, `"${k}" is not an Agent Skills field (put extra data under metadata)`);
  const name = d.name?.value;
  if (!name) add("error", "SKILL.md", "frontmatter: name is required");
  else {
    if (name.length > 64) add("error", `SKILL.md:${d.name.line}`, `name is ${name.length} chars (max 64)`);
    if (!NAME_RE.test(name)) add("error", `SKILL.md:${d.name.line}`, `name "${name}" must be lowercase letters, digits and single hyphens, not starting/ending with "-"`);
    if (name !== slug) add("error", `SKILL.md:${d.name.line}`, `name "${name}" must equal the folder name "${slug}"`);
    if (/anthropic|claude/.test(name)) add("error", `SKILL.md:${d.name.line}`, `name contains a reserved word ("anthropic"/"claude")`);
  }
  if (!NAME_RE.test(slug) || slug.length > 64) add("error", `skills/${category}/${slug}`, "folder name is not a valid skill name");

  const desc = d.description?.value?.trim() ?? "";
  if (!desc) add("error", "SKILL.md", "frontmatter: description is required and must be non-empty");
  else {
    if (desc.length > 1024) add("error", `SKILL.md:${d.description.line}`, `description is ${desc.length} chars (max 1024)`);
    if (/<\/?[A-Za-z][^>]*>/.test(desc)) add("error", `SKILL.md:${d.description.line}`, "description must not contain XML/HTML tags");
    if (!/\b(use|when)\b/i.test(desc)) add("warn", `SKILL.md:${d.description.line}`, `description should say when to use the skill ("Use when …")`);
  }
  if (d.license?.value !== "MIT") add("error", `SKILL.md:${d.license?.line ?? 1}`, `license must be "MIT"`);
  if (d.compatibility && (d.compatibility.value.length < 1 || d.compatibility.value.length > 500)) add("error", `SKILL.md:${d.compatibility.line}`, "compatibility must be 1–500 chars");

  // --- metadata (string → string)
  const meta = d.metadata?.map;
  if (!d.metadata) add("error", "SKILL.md", "frontmatter: metadata block is required");
  else if (!meta) add("error", `SKILL.md:${d.metadata.line}`, "metadata must be a map of key: \"string\" lines");
  else {
    for (const [k, v] of Object.entries(meta)) {
      const t = yamlType(v);
      if (t !== "string") add("error", `SKILL.md:${v.line}`, `metadata.${k} would parse as a YAML ${t} — quote it ("${v.value}")`);
      if (!KNOWN_META.has(k)) add("warn", `SKILL.md:${v.line}`, `metadata.${k} is not a field this library uses`);
    }
    for (const k of REQUIRED_META) if (!meta[k] || !String(meta[k].value).trim()) add("error", `SKILL.md:${d.metadata.line}`, `metadata.${k} is required`);
    const m = (k) => meta[k]?.value ?? "";
    if (meta.category && m("category") !== category) add("error", `SKILL.md:${meta.category.line}`, `metadata.category "${m("category")}" must match the folder "${category}"`);
    if (meta.level && !LEVELS.includes(m("level"))) add("error", `SKILL.md:${meta.level.line}`, `metadata.level must be one of ${LEVELS.join(", ")}`);
    if (meta.summary && m("summary").length > 140) add("error", `SKILL.md:${meta.summary.line}`, `metadata.summary is ${m("summary").length} chars (max 140)`);
    if (meta.version && !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(m("version"))) add("error", `SKILL.md:${meta.version.line}`, "metadata.version must be semver (1.0.0)");
    if (meta.updated && !/^\d{4}-\d{2}-\d{2}$/.test(m("updated"))) add("error", `SKILL.md:${meta.updated.line}`, "metadata.updated must be YYYY-MM-DD");
    if (meta.tags) {
      const tags = splitList(m("tags"));
      if (!tags.length) add("error", `SKILL.md:${meta.tags.line}`, "metadata.tags needs at least one tag");
      if (tags.length > 10) add("warn", `SKILL.md:${meta.tags.line}`, `${tags.length} tags — keep it to 10 or fewer`);
    }
    if (meta.uses) for (const u of splitList(m("uses"))) if (!/^(@useclaudia\/[a-z0-9-]+|[a-z0-9][\w.-]*)$/i.test(u)) add("warn", `SKILL.md:${meta.uses.line}`, `metadata.uses entry "${u}" doesn't look like a package or tool name`);
  }

  // --- body
  const body = s.body;
  const bodyLines = body.split("\n");
  const nonBlank = bodyLines.length;
  if (nonBlank > BODY_WARN_LINES) add("warn", "SKILL.md", `body is ${nonBlank} lines (aim for ≤ ${BODY_WARN_LINES}; move depth into references/)`);
  const headings = [];
  let fence = false;
  bodyLines.forEach((l, k) => {
    if (/^\s{0,3}(```|~~~)/.test(l)) fence = !fence;
    if (fence) return;
    const h = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(l);
    if (h) headings.push({ depth: h[1].length, text: h[2], line: s.bodyStartLine + k });
  });
  if (fence) add("error", "SKILL.md", "unclosed code fence");
  const h1 = headings.filter((h) => h.depth === 1);
  if (!h1.length) add("error", "SKILL.md", "body needs a # Title heading");
  else if (h1.length > 1) add("warn", `SKILL.md:${h1[1].line}`, "more than one # heading");
  if (meta?.title && h1[0] && h1[0].text.trim() !== meta.title.value.trim())
    add("warn", `SKILL.md:${h1[0].line}`, `# heading "${h1[0].text}" differs from metadata.title "${meta.title.value}"`);
  const h2 = headings.filter((h) => h.depth === 2).map((h) => ({ ...h, norm: h.text.toLowerCase().replace(/[`*_]/g, "").trim() }));
  let lastIdx = -1;
  for (const want of REQUIRED_SECTIONS) {
    const w = want.toLowerCase();
    const idx = h2.findIndex((h) => h.norm === w || h.norm.startsWith(`${w} `) || h.norm.startsWith(`${w}:`) || h.norm.startsWith(`${w} (`) || h.norm.startsWith(`${w} —`));
    if (idx === -1) add("error", "SKILL.md", `missing section "## ${want}"`);
    else {
      if (idx < lastIdx) add("warn", `SKILL.md:${h2[idx].line}`, `section "## ${want}" is out of order`);
      lastIdx = Math.max(lastIdx, idx);
    }
  }

  // --- files
  const files = listFiles(dir);
  const hasExample = files.some((f) => /^(templates|examples)\/[^/]+/.test(f.path));
  if (!hasExample) add("error", "", "needs at least one file in templates/ or examples/");
  for (const f of files) {
    if (f.symlink) add("error", f.path, "symlinks are not allowed");
    if (/\s/.test(f.path)) add("warn", f.path, "file names should not contain spaces");
    if (f.size > 1_000_000) add("warn", f.path, `large file (${Math.round(f.size / 1024)} KB)`);
    const top = f.path.split("/")[0];
    if (f.path !== "SKILL.md" && !["references", "templates", "examples", "scripts", "assets"].includes(top))
      add("warn", f.path, "unexpected location (use references/, templates/, examples/, scripts/ or assets/)");
  }

  // --- content rules + links, every text file
  for (const f of files) {
    if (f.symlink || !isTextFile(f.path)) continue;
    const full = join(dir, f.path);
    const text = readFileSync(full, "utf8");
    if (text.includes("�")) add("warn", f.path, "file is not valid UTF-8");
    checkContent(f.path, text, add);
    if (!/\.(md|markdown)$/i.test(f.path)) continue;
    const base = dirname(full);
    for (const l of markdownLinks(text)) {
      const href = l.href;
      if (/^(https?:|mailto:|tel:|#|data:)/i.test(href)) continue;
      if (/^[a-z][a-z0-9+.-]*:/i.test(href)) {
        add("warn", `${f.path}:${l.line}`, `unusual link scheme: ${href}`);
        continue;
      }
      if (href.startsWith("/")) {
        add("error", `${f.path}:${l.line}`, `absolute link "${href}" — use a relative path`);
        continue;
      }
      const target = decodeURIComponent(href.split("#")[0].split("?")[0]);
      if (!target) continue;
      const abs = normalize(resolve(base, target));
      const skillsRoot = resolve(root, "skills") + sep;
      if (!abs.startsWith(skillsRoot)) {
        add("error", `${f.path}:${l.line}`, `link "${href}" points outside skills/`);
        continue;
      }
      if (!existsSync(abs)) {
        const m = /skills\/([a-z]+)\/([a-z0-9-]+)\/SKILL\.md$/.exec(abs.split(sep).join("/"));
        if (m && ROSTER_SLUGS.has(m[2]) && !opts.strict) {
          const where = Object.entries(ROSTER).find(([, v]) => v.includes(m[2]))?.[0];
          if (where !== m[1]) add("error", `${f.path}:${l.line}`, `link "${href}": ${m[2]} lives in ${where}/, not ${m[1]}/`);
          else add("warn", `${f.path}:${l.line}`, `link "${href}": ${m[2]} isn't written yet`);
        } else add("error", `${f.path}:${l.line}`, `broken link "${href}"`);
      }
    }
  }
  return res;
}

/** Validates all skill folders under root. */
export function validateAll(root = REPO_ROOT, { only = [], complete = false, strict = false } = {}) {
  let dirs = findSkillDirs(root);
  if (only.length) dirs = dirs.filter((d) => only.includes(d.slug));
  const results = dirs.map((d) => validateSkill(root, d, { strict }));
  // Slug uniqueness across categories.
  const seen = new Map();
  for (const r of results) {
    if (seen.has(r.slug)) r.errors.push({ where: "", msg: `slug also used in ${seen.get(r.slug)}/ — slugs must be unique` });
    else seen.set(r.slug, r.category);
  }
  // Roster placement + completeness.
  for (const r of results) {
    const want = Object.entries(ROSTER).find(([, v]) => v.includes(r.slug))?.[0];
    if (!want) r.warnings.push({ where: "", msg: "slug is not on the assigned roster (SKILLS-SPEC.md)" });
    else if (want !== r.category) r.errors.push({ where: "", msg: `assigned to ${want}/, found in ${r.category}/` });
  }
  const present = new Set(results.map((r) => r.slug));
  const missing = only.length ? [] : [...ROSTER_SLUGS].filter((s) => !present.has(s));
  if (strict) for (const r of results) r.errors.push(...r.warnings.splice(0));
  const errors = results.reduce((n, r) => n + r.errors.length, 0) + (complete ? missing.length : 0);
  const warnings = results.reduce((n, r) => n + r.warnings.length, 0);
  return { results, missing, errors, warnings };
}

export function printReport({ results, missing, errors, warnings }, { complete = false, out = console.log } = {}) {
  const tty = process.stdout.isTTY && !process.env.NO_COLOR;
  const c = (code, s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : s);
  const byCat = {};
  for (const r of results) (byCat[r.category] ??= []).push(r);
  for (const [cat, rs] of Object.entries(byCat)) {
    out(c("1", `\n${cat}/`) + c("2", `  ${rs.length} skill${rs.length === 1 ? "" : "s"}`));
    for (const r of rs) {
      const tag = r.errors.length ? c("31", "FAIL") : r.warnings.length ? c("33", "warn") : c("32", " ok ");
      const counts = [r.errors.length && `${r.errors.length} error${r.errors.length > 1 ? "s" : ""}`, r.warnings.length && `${r.warnings.length} warning${r.warnings.length > 1 ? "s" : ""}`].filter(Boolean).join(", ");
      out(`  ${tag}  ${r.slug}${counts ? c("2", `  (${counts})`) : ""}`);
      for (const e of r.errors) out(`        ${c("31", "error")} ${e.where ? c("2", `${e.where}  `) : ""}${e.msg}`);
      for (const w of r.warnings) out(`        ${c("33", "warn ")} ${w.where ? c("2", `${w.where}  `) : ""}${w.msg}`);
    }
  }
  if (missing.length) {
    out(c(complete ? "31" : "2", `\n${missing.length} of 54 assigned skills not present yet${complete ? " (error with --complete)" : ""}:`));
    out(c("2", `  ${missing.join(", ")}`));
  }
  const ok = results.filter((r) => !r.errors.length).length;
  out(`\n${results.length} skill${results.length === 1 ? "" : "s"} checked · ${ok} passing · ${errors ? c("31", `${errors} error${errors > 1 ? "s" : ""}`) : "0 errors"} · ${warnings} warning${warnings === 1 ? "" : "s"}`);
}

// CLI
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const flag = (f) => args.includes(f);
  const rootIdx = args.indexOf("--root");
  const root = rootIdx >= 0 ? resolve(args[rootIdx + 1]) : REPO_ROOT;
  const only = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--root");
  const opts = { only, complete: flag("--complete"), strict: flag("--strict") };
  const report = validateAll(root, opts);
  if (flag("--json")) console.log(JSON.stringify({ ...report, results: report.results.map(({ dir, ...r }) => r) }, null, 2));
  else printReport(report, opts);
  process.exit(report.errors ? 1 : 0);
}
