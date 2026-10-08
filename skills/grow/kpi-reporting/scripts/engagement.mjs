#!/usr/bin/env node
// Engagement-rate calculator and anomaly flagger over the KPI sheet CSV (templates/kpi-sheet.csv columns).
// Node >= 20, no network, no dependencies.
//
//   node engagement.mjs ../templates/kpi-sheet.csv                 # per-platform medians + flagged posts
//   node engagement.mjs kpi.csv --from 2026-09-29 --to 2026-10-05  # one reporting week
//   node engagement.mjs kpi.csv --json                             # machine-readable
//
// Formulas (see references/metric-definitions.md):
//   er_reach     = (likes + comments + shares + saves) / reach          (reach falls back to views when reach is empty)
//   er_views     = (likes + comments + shares + saves) / views
//   er_followers = (likes + comments + shares + saves) / followers_at_post
//   sends_per_reach = shares / reach                                     (Instagram "shares" are DM sends)
//   follow_rate  = follows_gained / views * 1000                         (new follows per 1k views)
//   ctr          = link_clicks / views
// Paid rows (is_paid = yes) are excluded from organic medians and listed separately.

import fs from "node:fs";

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

function readCsv(file) {
  const lines = fs.readFileSync(file, "utf8").trim().split(/\r?\n/).filter((l) => l.trim() && !l.startsWith("#"));
  const head = splitCsv(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((l) => Object.fromEntries(splitCsv(l).map((v, i) => [head[i], v.trim()])));
}

const num = (v) => (v === undefined || v === "" || v === "n/a" ? null : Number(v));
const div = (a, b) => (a === null || b === null || !b ? null : a / b);
const median = (xs) => {
  const s = xs.filter((x) => x !== null && Number.isFinite(x)).sort((a, b) => a - b);
  if (!s.length) return null;
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const pct = (x) => (x === null ? "—" : `${(x * 100).toFixed(1)}%`);
const k = (x) => (x === null ? "—" : x >= 1000 ? `${(x / 1000).toFixed(1)}k` : String(Math.round(x)));

function metrics(r) {
  const likes = num(r.likes) ?? 0, comments = num(r.comments) ?? 0, shares = num(r.shares) ?? 0, saves = num(r.saves) ?? 0;
  const inter = likes + comments + shares + saves;
  const views = num(r.views) ?? num(r.impressions);
  const reach = num(r.reach) ?? views;
  return {
    views, reach, interactions: inter,
    er_reach: div(inter, reach), er_views: div(inter, views), er_followers: div(inter, num(r.followers_at_post)),
    sends_per_reach: div(num(r.shares), reach), follow_rate: div(num(r.follows_gained), views) === null ? null : div(num(r.follows_gained), views) * 1000,
    ctr: div(num(r.link_clicks), views), completion: num(r.completion_rate), swiped: num(r.viewed_vs_swiped),
  };
}

function main() {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith("--"));
  if (!file) { console.error("usage: node engagement.mjs <kpi.csv> [--from YYYY-MM-DD] [--to YYYY-MM-DD] [--json]"); process.exit(2); }
  const opt = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };
  const from = opt("from"), to = opt("to"), asJson = args.includes("--json");
  let rows = readCsv(file);
  if (from) rows = rows.filter((r) => r.date >= from);
  if (to) rows = rows.filter((r) => r.date <= to);
  const enriched = rows.map((r) => ({ ...r, m: metrics(r) }));
  const platforms = [...new Set(enriched.map((r) => r.platform))];
  const summary = {}, flags = [];
  for (const p of platforms) {
    const organic = enriched.filter((r) => r.platform === p && r.is_paid !== "yes");
    const paid = enriched.filter((r) => r.platform === p && r.is_paid === "yes");
    const med = (key) => median(organic.map((r) => r.m[key]));
    summary[p] = {
      posts: organic.length, paidPosts: paid.length,
      medianViews: med("views"), medianErReach: med("er_reach"), medianErFollowers: med("er_followers"),
      medianSendsPerReach: med("sends_per_reach"), medianFollowsPer1k: med("follow_rate"), medianCtr: med("ctr"),
      medianCompletion: med("completion"),
    };
    const mv = summary[p].medianViews, me = summary[p].medianErReach;
    for (const r of organic) {
      if (mv && r.m.views >= 5 * mv) flags.push({ platform: p, post: r.post_id, flag: "outlier-high", detail: `${k(r.m.views)} views = ${(r.m.views / mv).toFixed(1)}x median; report separately, don't fold into averages` });
      if (mv && r.m.views !== null && r.m.views <= 0.2 * mv) flags.push({ platform: p, post: r.post_id, flag: "outlier-low", detail: `${k(r.m.views)} views = ${(r.m.views / mv).toFixed(2)}x median; check for a label, policy or upload problem` });
      if (me && r.m.er_reach !== null && r.m.er_reach >= 3 * me && r.m.views >= mv) flags.push({ platform: p, post: r.post_id, flag: "er-spike", detail: `ER ${pct(r.m.er_reach)} vs median ${pct(me)}; read the comments for brigading or giveaway spam` });
      const likes = num(r.likes), comments = num(r.comments);
      if (likes && comments !== null && comments > likes) flags.push({ platform: p, post: r.post_id, flag: "comments>likes", detail: "more comments than likes: often a controversy or a bot swarm; check crisis-and-reputation" });
      if (r.m.views && num(r.follows_gained) !== null && r.m.views > 2 * (mv ?? 0) && num(r.follows_gained) === 0) flags.push({ platform: p, post: r.post_id, flag: "views-no-follows", detail: "high views, zero follows: reach without fit, or non-human traffic" });
      if (r.ai_label && r.ai_label !== "yes") flags.push({ platform: p, post: r.post_id, flag: "no-ai-label", detail: "AI label not recorded as on; fix the post and the sheet" });
    }
    for (const r of paid) if (!/#ad|paid/i.test(r.notes ?? "") && r.ad_label !== "yes") flags.push({ platform: p, post: r.post_id, flag: "paid-no-ad-label", detail: "paid row without ad_label=yes" });
  }
  if (asJson) { console.log(JSON.stringify({ rows: rows.length, summary, flags }, null, 2)); return; }
  console.log(`KPI summary · ${rows.length} rows${from || to ? ` · ${from ?? "…"} to ${to ?? "…"}` : ""} · organic medians (paid excluded)\n`);
  console.log("platform    posts  med views  ER/reach  ER/followers  sends/reach  follows/1k  CTR    completion");
  for (const [p, s] of Object.entries(summary)) {
    console.log(`${p.padEnd(11)} ${String(s.posts).padStart(5)}  ${k(s.medianViews).padStart(9)}  ${pct(s.medianErReach).padStart(8)}  ${pct(s.medianErFollowers).padStart(12)}  ${pct(s.medianSendsPerReach).padStart(11)}  ${(s.medianFollowsPer1k === null ? "—" : s.medianFollowsPer1k.toFixed(2)).padStart(10)}  ${pct(s.medianCtr).padStart(5)}  ${pct(s.medianCompletion).padStart(10)}${s.paidPosts ? `   (+${s.paidPosts} paid)` : ""}`);
  }
  console.log(flags.length ? `\nFlags (${flags.length}):` : "\nNo flags.");
  for (const f of flags) console.log(`  [${f.flag}] ${f.platform} ${f.post}: ${f.detail}`);
}

main();
