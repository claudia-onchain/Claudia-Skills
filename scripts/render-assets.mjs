#!/usr/bin/env node
// Renders the library's GitHub look: animated SVG banners and one card per skill (assets/), a README.md in every skill
// folder and every category folder, and the card grid for the root README. Node >= 20, no dependencies.
// build.mjs calls renderAssets() on every build, so the cards always match the skills. Same input → same bytes.
//
// The SVGs follow the @useclaudia developer art (useclaudia.xyz/media/dev): near-black panels, warm white type,
// Barlow Condensed headlines, monospace labels, CSS keyframe animation, and no motion under prefers-reduced-motion.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CATEGORIES } from "./lib/skills.mjs";

const C = {
  bg: "#0a0b0d", panel: "#111317", line: "#23262c", border: "#353941",
  muted: "#868b92", text: "#ece9e2", sub: "#b4b7bc", rose: "#ff6fa5",
};
export const ACCENT = { create: "#ff6fa5", grow: "#ffb48a", build: "#8fb3ff" };
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono','DejaVu Sans Mono',monospace";
const COND = "'Barlow Condensed','Roboto Condensed','Arial Narrow','Helvetica Neue',Arial,sans-serif";
const SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const REDUCED = "@media (prefers-reduced-motion:reduce){*{animation:none!important}}";

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const mono = (size, extra = "") => `font-family:${MONO};font-size:${size}px${extra}`;
const cond = (size) => `font-family:${COND};font-weight:700;font-size:${size}px`;
const sans = (size, extra = "") => `font-family:${SANS};font-size:${size}px${extra}`;
const pct = (n) => `${Math.max(0, Math.min(100, n)).toFixed(2)}%`;

/** Greedy word wrap to `max` characters per line; the last allowed line gets an ellipsis if text remains. */
export function wrap(text, max, lines = 2) {
  const words = String(text ?? "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const out = [];
  let cur = "";
  for (const w of words) {
    if (!cur) cur = w;
    else if ((cur + " " + w).length <= max) cur += " " + w;
    else {
      out.push(cur);
      cur = w;
    }
  }
  if (cur) out.push(cur);
  if (out.length > lines) {
    const kept = out.slice(0, lines);
    let last = kept[lines - 1];
    while (last.length > max - 1) last = last.slice(0, last.lastIndexOf(" ") > 0 ? last.lastIndexOf(" ") : max - 1);
    kept[lines - 1] = last.replace(/[,;:.\s—-]+$/, "") + "…";
    return kept;
  }
  return out;
}
const clip = (s, max) => (s.length <= max ? s : s.slice(0, max - 1).replace(/[\s,;:—-]+$/, "") + "…");

/** Step titles from a SKILL.md body: "1. **Title.** …" items, or "### 1. Title" headings, inside "## Steps". */
export function stepsOf(body) {
  const part = String(body).split(/\n## Steps[^\n]*\n/)[1];
  if (!part) return [];
  const section = part.split(/\n## /)[0];
  const clean = (t) =>
    t.replace(/`/g, "").replace(/\*\*/g, "").replace(/\s*\([^)]*\)\s*$/, "").replace(/[.:]\s*$/, "").replace(/\s+/g, " ").trim();
  const bold = [...section.matchAll(/^\d+\.\s+\*\*(.+?)\*\*/gm)].map((m) => clean(m[1]));
  if (bold.length >= 3) return bold;
  const h3 = [...section.matchAll(/^###\s+(?:\d+[.)]\s*)?(.+)$/gm)].map((m) => clean(m[1]));
  return h3.length ? h3 : bold;
}

const frame = (w, h, id, title, desc, style, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="${id}-t ${id}-d">
<title id="${id}-t">${esc(title)}</title><desc id="${id}-d">${esc(desc)}</desc>
<style>${style}${REDUCED}</style>
<rect width="${w}" height="${h}" rx="10" fill="${C.bg}"/>
<rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="10" fill="none" stroke="${C.border}"/>
${inner}
</svg>
`;

const RISE = ".r{animation:rise 900ms cubic-bezier(.2,.8,.2,1) both}.r2{animation-delay:120ms}.r3{animation-delay:240ms}.r4{animation-delay:360ms}@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}";

// ---------------------------------------------------------------------------------------------------------------
// Skill card: title, summary, level/time, and an animated "how it works" panel that ticks through the real steps.

export function cardSvg(skill, steps) {
  const W = 600, H = 340;
  const accent = ACCENT[skill.category] ?? C.rose;
  const cat = CATEGORIES.find((c) => c.id === skill.category)?.title ?? skill.category;
  const titleLines = wrap(String(skill.title).toUpperCase(), 34, 2);
  const tY = 74;
  const barY = tY + (titleLines.length - 1) * 32 + 16;
  const sumLines = wrap(skill.summary, 74, titleLines.length > 1 ? 2 : 3);
  const shown = steps.slice(0, 4);
  const T = 9000;
  const row0 = 226, rowH = 20;
  const start = (i) => 10 + i * 17; // % of the loop when row i appears
  let css = `${RISE}.lp{animation:lp ${T}ms linear infinite}@keyframes lp{0%,92%{opacity:1}97%,100%{opacity:0}}`;
  let rows = "";
  shown.forEach((s, i) => {
    const a = start(i), b = a + 7;
    css += `.s${i}{animation:s${i} ${T}ms linear infinite}@keyframes s${i}{0%,${pct(a)}{opacity:0;transform:translateX(-6px)}${pct(a + 2)},100%{opacity:1;transform:none}}`;
    css += `.k${i}{animation:k${i} ${T}ms linear infinite}@keyframes k${i}{0%,${pct(b)}{opacity:0}${pct(b + 1)},100%{opacity:1}}`;
    const y = row0 + i * rowH;
    rows += `<g class="s${i}"><rect x="40" y="${y - 11}" width="13" height="13" rx="3" fill="none" stroke="${C.border}"/><text x="64" y="${y}" fill="${C.text}" style="${mono(12)}">${esc(clip(s, 62))}</text></g>`;
    rows += `<g class="k${i}"><rect x="40" y="${y - 11}" width="13" height="13" rx="3" fill="${accent}"/><path d="M43 ${y - 4.5} l2.6 2.6 l4.6 -5" fill="none" stroke="${C.bg}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  });
  const more = steps.length > shown.length ? `+${steps.length - shown.length} more steps` : `${steps.length} steps`;
  const counts = ["templates", "examples", "references", "scripts"]
    .map((d) => [d, skill.files.filter((f) => f.startsWith(`${d}/`)).length])
    .filter(([, n]) => n)
    .map(([d, n]) => `${n} ${n === 1 ? d.replace(/s$/, "") : d}`);
  const uses = skill.uses.length ? skill.uses.join(" · ") : "";
  const foot = clip([counts.join(" · "), uses].filter(Boolean).join("  ·  "), Math.max(24, 80 - skill.slug.length));
  const inner = `<g class="r"><text x="28" y="40" fill="${accent}" style="${mono(11, ";letter-spacing:.14em")}">${esc(cat.toUpperCase())}</text><text x="${28 + (cat.length + 1) * 8.6}" y="40" fill="${C.muted}" style="${mono(11, ";letter-spacing:.14em")}">· ${esc(String(skill.level).toUpperCase())}</text>
<text x="${W - 28}" y="40" text-anchor="end" fill="${C.muted}" style="${mono(11)}">${esc(clip(skill.time, 34))}</text></g>
<g class="r r2">${titleLines.map((l, i) => `<text x="27" y="${tY + i * 32}" fill="${C.text}" style="${cond(30)}">${esc(l)}</text>`).join("")}</g>
<rect class="r r2" x="28" y="${barY}" width="40" height="3" fill="${accent}"/>
<g class="r r3">${sumLines.map((l, i) => `<text x="28" y="${barY + 26 + i * 19}" fill="${C.sub}" style="${sans(14)}">${esc(l)}</text>`).join("")}</g>
<rect x="24" y="186" width="${W - 48}" height="${H - 186 - 40}" rx="6" fill="${C.panel}" stroke="${C.line}"/>
<text x="40" y="204" fill="${C.muted}" style="${mono(9.5, ";letter-spacing:.14em")}">HOW IT WORKS</text>
<text x="${W - 40}" y="204" text-anchor="end" fill="${C.muted}" style="${mono(9.5, ";letter-spacing:.06em")}">${esc(more)}</text>
<g class="lp">${rows}</g>
<text x="28" y="${H - 16}" fill="${C.muted}" style="${mono(10.5)}">${esc(foot)}</text>
<text x="${W - 28}" y="${H - 16}" text-anchor="end" fill="${C.muted}" style="${mono(10.5)}">${esc(skill.slug)}</text>`;
  return frame(W, H, `card-${skill.slug}`, `${skill.title} — Claudia skill`, `${skill.summary} Steps: ${steps.join("; ")}.`, css, inner);
}

// ---------------------------------------------------------------------------------------------------------------
// Hero banner, category banners, "how a skill works" flow, and the install demo.

export function bannerSvg(index, face) {
  const names = index.skills.filter((_, i) => i % 9 === 0).slice(0, 8).map((s) => s.slug);
  const T = names.length * 1800;
  let css = RISE + `.cur{animation:blink 1s steps(1) infinite}@keyframes blink{50%{opacity:0}}`;
  const per = 100 / names.length;
  names.forEach((_, i) => {
    const a = i * per, b = a + per;
    css += `.n${i}{opacity:0;animation:n${i} ${T}ms linear infinite}@keyframes n${i}{0%,${pct(a)}{opacity:0}${pct(a + 1)},${pct(b - 2)}{opacity:1}${pct(b - 1)},100%{opacity:0}}`;
  });
  const counts = index.categories.map((c) => `${c.count} ${c.title.toLowerCase()}`).join(" · ");
  const img = face
    ? `<defs><clipPath id="hero-f"><rect x="56" y="50" width="200" height="200" rx="4"/></clipPath></defs><image href="data:image/webp;base64,${face}" x="56" y="50" width="200" height="200" clip-path="url(#hero-f)" preserveAspectRatio="xMidYMid slice"/><rect x="56.5" y="50.5" width="199" height="199" rx="4" fill="none" stroke="${C.border}"/>`
    : "";
  const inner = `${img}
<g class="r"><text x="300" y="92" fill="${C.muted}" style="${mono(15, ";letter-spacing:.14em")}">CLAUDIA SKILLS · ${index.count} SKILLS</text></g>
<g class="r r2"><text x="296" y="164" fill="${C.text}" style="${cond(64)}">SKILLS FOR YOUR AGENT</text></g>
<rect x="300" y="184" width="56" height="3" fill="${C.rose}"/>
<g class="r r3"><text x="300" y="220" fill="${C.sub}" style="${sans(20)}">${esc(counts)} · Agent Skills for Claude, Codex, Cursor</text></g>
<g class="r r4"><text x="300" y="258" fill="${C.muted}" style="${mono(14)}">loading</text>${names.map((n, i) => `<text class="n${i}" x="372" y="258" fill="${C.rose}" style="${mono(14)}">${esc(n)}/SKILL.md</text>`).join("")}</g>
<text x="1144" y="266" text-anchor="end" fill="${C.muted}" style="${mono(13, ";letter-spacing:.12em")}">USECLAUDIA.XYZ/SKILLS</text>`;
  return frame(1200, 300, "hero", `Claudia skills: ${index.count} Agent Skills`, `${counts}. Skills an agent loads to create, grow and build.`, css, inner);
}

export function categorySvg(cat, skills) {
  const accent = ACCENT[cat.id] ?? C.rose;
  const sample = skills.slice(0, 3);
  let css = RISE + `.f{animation:f 6s ease-in-out infinite}.f1{animation-delay:-2s}.f2{animation-delay:-4s}@keyframes f{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`;
  const mini = sample
    .map((s, i) => {
      const x = 700 + i * 164, y = 50 + (i % 2) * 12;
      const lines = wrap(s.title.toUpperCase(), 13, 3);
      return `<g class="f f${i}"><rect x="${x}" y="${y}" width="150" height="132" rx="8" fill="${C.panel}" stroke="${i === 1 ? accent : C.border}"/><rect x="${x + 14}" y="${y + 18}" width="24" height="3" fill="${accent}"/>${lines
        .map((l, k) => `<text x="${x + 14}" y="${y + 44 + k * 19}" fill="${C.text}" style="${cond(17)}">${esc(l)}</text>`)
        .join("")}<text x="${x + 14}" y="${y + 118}" fill="${C.muted}" style="${mono(9.5)}">${esc(s.level)}</text></g>`;
    })
    .join("");
  const sumLines = wrap(cat.summary, 62, 2);
  const inner = `<g class="r"><text x="48" y="58" fill="${accent}" style="${mono(13, ";letter-spacing:.14em")}">CLAUDIA SKILLS · ${esc(cat.title.toUpperCase())}</text></g>
<g class="r r2"><text x="46" y="118" fill="${C.text}" style="${cond(54)}">${esc(cat.title.toUpperCase())} · ${skills.length} SKILLS</text></g>
<rect x="48" y="136" width="48" height="3" fill="${accent}"/>
<g class="r r3">${sumLines.map((l, i) => `<text x="48" y="${170 + i * 22}" fill="${C.sub}" style="${sans(17)}">${esc(l)}</text>`).join("")}</g>
${mini}`;
  return frame(1200, 230, `cat-${cat.id}`, `${cat.title}: ${skills.length} skills`, cat.summary, css, inner);
}

export function flowSvg() {
  const nodes = [
    ["YOU ASK", "“Make a launch-day", "carousel for $DISCO”"],
    ["AGENT MATCHES", "the skill whose", "description fits"],
    ["LOADS SKILL.MD", "steps, templates,", "references on demand"],
    ["DOES THE WORK", "media · social ·", "cli · mcp, your keys"],
    ["HANDS BACK", "labelled, priced,", "waits for your yes"],
  ];
  const T = 7500, w = 196, gap = 30, x0 = 46, y = 92;
  let css = `.e{animation:flow 1.6s linear infinite}@keyframes flow{to{stroke-dashoffset:-20}}`;
  let out = "";
  nodes.forEach(([h, a, b], i) => {
    const x = x0 + i * (w + gap);
    const s = i * 20, e = s + 20;
    css += `.h${i}{opacity:0;animation:h${i} ${T}ms linear infinite}@keyframes h${i}{0%,${pct(s)}{opacity:0}${pct(s + 2)},${pct(e)}{opacity:1}${pct(e + 2)},100%{opacity:0}}`;
    out += `<rect x="${x}" y="${y}" width="${w}" height="120" rx="8" fill="${C.panel}" stroke="${C.border}"/><rect class="h${i}" x="${x}" y="${y}" width="${w}" height="120" rx="8" fill="none" stroke="${C.rose}" stroke-width="1.5"/>`;
    out += `<text x="${x + 18}" y="${y + 30}" fill="${C.muted}" style="${mono(10.5, ";letter-spacing:.12em")}">0${i + 1}</text><text x="${x + 18}" y="${y + 58}" fill="${C.text}" style="${cond(21)}">${esc(h)}</text>`;
    out += `<text x="${x + 18}" y="${y + 84}" fill="${C.sub}" style="${sans(13)}">${esc(a)}</text><text x="${x + 18}" y="${y + 102}" fill="${C.sub}" style="${sans(13)}">${esc(b)}</text>`;
    if (i < nodes.length - 1) out += `<path class="e" d="M${x + w + 2} ${y + 60} L${x + w + gap - 2} ${y + 60}" fill="none" stroke="${C.rose}" stroke-width="1.5" stroke-dasharray="4 6"/>`;
  });
  const inner = `<text x="46" y="44" fill="${C.muted}" style="${mono(11, ";letter-spacing:.14em")}">CLAUDIA SKILLS</text><text x="46" y="72" fill="${C.text}" style="${cond(26)}">HOW A SKILL WORKS</text>
${out}
<text x="46" y="250" fill="${C.muted}" style="${mono(11)}">Only the name and description sit in context until a request matches. Then the agent reads SKILL.md, and a reference only when a step says so.</text>`;
  return frame(1200, 270, "flow", "How a skill works", "You ask; the agent matches a skill by its description, loads SKILL.md, does the work with your own keys, then checks and hands back for approval.", css, inner);
}

export function installSvg(slug, steps) {
  const lines = [
    ["$ ", `curl -fsSLo /tmp/${slug}.zip https://useclaudia.xyz/skills/${slug}.zip`, C.text],
    ["$ ", `unzip -oq /tmp/${slug}.zip -d ~/.claude/skills`, C.text],
    ["> ", `/${slug} launch-day carousel for $DISCO`, C.text],
    ["✓ ", `loaded ${slug} · ${steps} steps`, C.rose],
  ];
  const T = 9000, cw = 7.8;
  let css = `.lp{animation:lp ${T}ms linear infinite}@keyframes lp{0%,94%{opacity:1}98%,100%{opacity:0}}`;
  let out = "";
  let t = 4;
  lines.forEach(([p, raw, fill], i) => {
    let text = raw;
    text = clip(text, 98);
    const y = 76 + i * 30, len = text.length, dur = Math.min(22, len * 0.28);
    const a = t, b = t + dur;
    css += `.p${i}{animation:p${i} ${T}ms linear infinite}@keyframes p${i}{0%,${pct(a)}{opacity:0}${pct(a + 0.1)},100%{opacity:1}}`;
    css += `.c${i}{animation:c${i} ${T}ms linear infinite}@keyframes c${i}{0%,${pct(a)}{transform:translateX(0);animation-timing-function:steps(${len},end)}${pct(b)},100%{transform:translateX(${(len * cw).toFixed(1)}px)}}`;
    out += `<g class="p${i}"><text x="24" y="${y}" fill="${i === 3 ? C.rose : C.muted}" style="${mono(13, ";white-space:pre")}">${esc(p)}</text><text x="44" y="${y}" fill="${fill}" style="${mono(13, ";white-space:pre")}">${esc(text)}</text><rect class="c${i}" x="44" y="${y - 15}" width="${len * cw + 12}" height="21" fill="${C.bg}"/></g>`;
    t = b + 6;
  });
  const inner = `<rect x="1" y="1" width="818" height="32" rx="9" fill="${C.panel}"/><rect y="32" width="820" height="1" fill="${C.line}"/>
<circle cx="18" cy="17" r="5" fill="${C.border}"/><circle cx="34" cy="17" r="5" fill="${C.border}"/><circle cx="50" cy="17" r="5" fill="${C.border}"/>
<text x="410" y="21" text-anchor="middle" fill="${C.muted}" style="${mono(11.5)}">install a skill · Claude Code</text>
<g class="lp">${out}</g>`;
  return frame(820, 210, "install", `Install the ${slug} skill`, `Download the zip, unzip it into ~/.claude/skills, then call /${slug}.`, css, inner);
}

// ---------------------------------------------------------------------------------------------------------------
// Markdown: per-skill README, per-category README, and the card grid for the root README.

const INSTALL_MD = (slug) => `\`\`\`sh
# Claude Code (all projects on this machine)
mkdir -p ~/.claude/skills
curl -fsSLo /tmp/${slug}.zip https://useclaudia.xyz/skills/${slug}.zip
unzip -oq /tmp/${slug}.zip -d ~/.claude/skills

# Codex and other agents that read ~/.agents/skills
mkdir -p ~/.agents/skills && unzip -oq /tmp/${slug}.zip -d ~/.agents/skills
\`\`\`

Or straight from GitHub with the [\`skills\` CLI](https://github.com/vercel-labs/skills):
\`npx skills add claudia-onchain/Claudia-Skills --skill ${slug}\`.

In the Claude apps: **Customize → Skills → + → Upload a skill**, and pick \`${slug}.zip\` (don't unzip it).
More apps: [install a skill](../../../README.md#install-a-skill).`;

export function skillReadme(skill, steps, bySlug) {
  const cat = CATEGORIES.find((c) => c.id === skill.category);
  const tree = (dir, label) => {
    const fs = skill.files.filter((f) => f.startsWith(`${dir}/`));
    return fs.length ? `- **${label}:** ${fs.map((f) => `[\`${f.slice(dir.length + 1)}\`](${f})`).join(" · ")}` : null;
  };
  const related = skill.related.map((r) => bySlug.get(r)).filter(Boolean);
  return `<!-- Generated by scripts/build.mjs from SKILL.md. Edit SKILL.md, not this page. Not included in the skill's zip. -->
[![${esc(skill.title)}](../../../assets/cards/${skill.slug}.svg)](SKILL.md)

# ${skill.title}

**${skill.summary}**

${skill.description}

| Category | Level | Time | Uses | Version |
| --- | --- | --- | --- | --- |
| [${cat?.title ?? skill.category}](../README.md) | ${skill.level} | ${skill.time} | ${skill.uses.length ? skill.uses.map((u) => `\`${u}\``).join(", ") : "—"} | ${skill.version} · ${skill.updated} |

## How it works

${steps.length ? steps.map((s, i) => `${i + 1}. ${s}`).join("\n") : "See [SKILL.md](SKILL.md)."}

The full instructions are in **[SKILL.md](SKILL.md)**: when to use it, what you need, every step, the checks before you
finish, and the pitfalls.

## What's inside

- **[SKILL.md](SKILL.md)** — the instructions your agent loads
${[tree("templates", "Templates"), tree("examples", "Examples"), tree("references", "References"), tree("scripts", "Scripts"), tree("assets", "Assets")].filter(Boolean).join("\n")}

## Install

${INSTALL_MD(skill.slug)}

Then ask for the task in your own words, or call it directly with \`/${skill.slug}\`.
${related.length ? `\n## Related skills\n\n${related.map((r) => `- [${r.title}](../../${r.category}/${r.slug}/) — ${r.summary}`).join("\n")}\n` : ""}
---

[All skills](../../../README.md) · [${cat?.title ?? skill.category}](../README.md) · [Download zip](https://useclaudia.xyz/skills/${skill.slug}.zip) · MIT
`;
}

/** An HTML grid of cards, two per row, each linking to the skill's folder. `base` is the path from the page to the repo root. */
export function cardGrid(skills, base = "") {
  const cells = skills.map(
    (s) => `<td width="50%" valign="top"><a href="${base}${s.path}/"><img src="${base}assets/cards/${s.slug}.svg" alt="${esc(`${s.title}: ${s.summary}`)}" width="100%"></a></td>`,
  );
  const rows = [];
  for (let i = 0; i < cells.length; i += 2) rows.push(`<tr>\n${cells[i]}\n${cells[i + 1] ?? '<td width="50%"></td>'}\n</tr>`);
  return `<table>\n${rows.join("\n")}\n</table>`;
}

export function categoryReadme(cat, skills) {
  return `<!-- Generated by scripts/build.mjs. Edit the skills, not this page. -->
[![${cat.title}](../../assets/categories/${cat.id}.svg)](../../README.md)

# ${cat.title} · ${skills.length} skills

${cat.summary}

${cardGrid(skills, "../../").replace(/href="\.\.\/\.\.\/skills\/[a-z]+\//g, 'href="')}

| Skill | What it does | Level | Time |
| --- | --- | --- | --- |
${skills.map((s) => `| [${s.title}](${s.slug}/) | ${String(s.summary).replace(/\|/g, "\\|")} | ${s.level} | ${s.time} |`).join("\n")}

[All skills](../../README.md) · [How a skill works](../../README.md#how-a-skill-works) · [Contributing](../../CONTRIBUTING.md)
`;
}

/** Everything renderAssets() writes, as a Map of repo-relative path → string. */
export function renderAssets(root, index) {
  const files = new Map();
  let face = null;
  try {
    face = readFileSync(join(root, "assets", "claudia-face.webp")).toString("base64");
  } catch {
    face = null;
  }
  const bySlug = new Map(index.skills.map((s) => [s.slug, s]));
  const stepMap = new Map();
  for (const s of index.skills) {
    const body = readFileSync(join(root, s.path, "SKILL.md"), "utf8");
    const steps = stepsOf(body);
    stepMap.set(s.slug, steps);
    files.set(`assets/cards/${s.slug}.svg`, cardSvg(s, steps));
    files.set(`${s.path}/README.md`, skillReadme(s, steps, bySlug));
  }
  for (const c of CATEGORIES) {
    const list = index.skills.filter((s) => s.category === c.id);
    files.set(`assets/categories/${c.id}.svg`, categorySvg(c, list));
    files.set(`skills/${c.id}/README.md`, categoryReadme(c, list));
  }
  files.set("assets/banner.svg", bannerSvg(index, face));
  files.set("assets/how-it-works.svg", flowSvg());
  const demo = bySlug.get("carousel-design") ?? index.skills[0];
  if (demo) files.set("assets/install.svg", installSvg(demo.slug, stepMap.get(demo.slug)?.length ?? 0));
  return { files, steps: stepMap };
}
