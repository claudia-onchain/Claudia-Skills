#!/usr/bin/env node
// UTM link builder. Node >= 20, no network, no dependencies.
//
// One link:
//   node utm.mjs --url https://useclaudia.xyz/skills --source tiktok --medium social --campaign 2026-10-skills-launch \
//                --content claudia-rain-run-v2
// A plan file (CSV with columns url,source,medium,campaign,content,term; writes a utm_url column to stdout):
//   node utm.mjs --csv ../templates/utm-plan.csv > utm-plan.filled.csv
//
// Rules enforced (see references/utm-and-attribution.md): lowercase, hyphens instead of spaces/underscores, no PII,
// source and medium from the allowed lists, campaign starts with YYYY-MM.

import fs from "node:fs";

const SOURCES = ["x", "tiktok", "instagram", "threads", "youtube", "telegram", "discord", "bluesky", "farcaster",
  "mastodon", "nostr", "linkedin", "pinterest", "facebook", "newsletter", "claudia-thread", "partner", "email"];
const MEDIUMS = ["social", "social-paid", "bio", "story", "dm", "community", "email", "referral", "affiliate", "qr"];

function slug(v) {
  return String(v ?? "").trim().toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9.\-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (!k.startsWith("--")) continue;
    const name = k.slice(2);
    const v = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
    a[name] = v;
  }
  return a;
}

export function buildUtm({ url, source, medium, campaign, content, term, id }) {
  const errors = [];
  let u;
  try { u = new URL(url); } catch { errors.push(`bad url: ${url}`); }
  const s = slug(source), m = slug(medium), c = slug(campaign);
  if (!SOURCES.includes(s)) errors.push(`source '${s}' not in list: ${SOURCES.join(", ")}`);
  if (!MEDIUMS.includes(m)) errors.push(`medium '${m}' not in list: ${MEDIUMS.join(", ")}`);
  if (!/^\d{4}-\d{2}-[a-z0-9-]+$/.test(c)) errors.push(`campaign '${c}' should look like 2026-10-skills-launch`);
  for (const [k, v] of Object.entries({ content, term, campaign })) {
    if (v && /@|%40|\b\d{7,}\b/.test(String(v))) errors.push(`${k} looks like it contains personal data; remove it`);
  }
  if (errors.length) return { ok: false, errors };
  u.searchParams.set("utm_source", s);
  u.searchParams.set("utm_medium", m);
  u.searchParams.set("utm_campaign", c);
  if (content) u.searchParams.set("utm_content", slug(content));
  if (term) u.searchParams.set("utm_term", slug(term));
  if (id) u.searchParams.set("utm_id", slug(id));
  const out = u.toString();
  const warn = out.length > 200 ? ["URL is over 200 characters; consider a shorter utm_content"] : [];
  return { ok: true, url: out, warnings: warn };
}

function splitCsv(line) {
  const out = []; let cur = "", q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (ch === "," && !q) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}
const csvCell = (v) => (/[",\n]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : String(v));

function main() {
  const a = parseArgs(process.argv.slice(2));
  if (a.help || (!a.url && !a.csv)) {
    console.log("usage: node utm.mjs --url <https://…> --source <x|tiktok|…> --medium <social|bio|…> --campaign <YYYY-MM-name> [--content v] [--term v] [--id v]\n       node utm.mjs --csv plan.csv");
    process.exit(a.help ? 0 : 2);
  }
  if (a.csv) {
    const rows = fs.readFileSync(a.csv, "utf8").trim().split(/\r?\n/);
    const head = splitCsv(rows[0]);
    const idx = (n) => head.indexOf(n);
    const outHead = head.includes("utm_url") ? head : [...head, "utm_url"];
    console.log(outHead.map(csvCell).join(","));
    let bad = 0;
    for (const r of rows.slice(1)) {
      const c = splitCsv(r);
      const res = buildUtm({ url: c[idx("url")], source: c[idx("source")], medium: c[idx("medium")], campaign: c[idx("campaign")], content: c[idx("content")], term: idx("term") >= 0 ? c[idx("term")] : "" });
      const val = res.ok ? res.url : `ERROR: ${res.errors.join("; ")}`;
      if (!res.ok) bad++;
      const outRow = head.includes("utm_url") ? c.map((v, i) => (i === idx("utm_url") ? val : v)) : [...c, val];
      console.log(outRow.map(csvCell).join(","));
    }
    if (bad) { console.error(`${bad} row(s) need fixing`); process.exit(1); }
    return;
  }
  const res = buildUtm(a);
  if (!res.ok) { for (const e of res.errors) console.error(`error: ${e}`); process.exit(1); }
  for (const w of res.warnings) console.error(`warning: ${w}`);
  console.log(res.url);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
