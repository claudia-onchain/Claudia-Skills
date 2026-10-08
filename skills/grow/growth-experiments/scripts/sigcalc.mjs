#!/usr/bin/env node
// sigcalc.mjs — sample sizes and significance for social-media experiments. Node >= 20, no network, no dependencies.
//
// Rate metrics (one denominator per viewer/impression, e.g. follows per view, completion per view, sends per reach):
//   node sigcalc.mjs size-rate --base 0.004 --lift 0.25 [--alpha 0.05 --power 0.8]
//   node sigcalc.mjs rate --a 41/10200 --b 63/9800
// Post-level metrics (one number per post, e.g. views, follows from post; compared on the log scale):
//   node sigcalc.mjs size-posts --sd 1.0 --lift 0.5 [--alpha 0.05 --power 0.8]
//   node sigcalc.mjs posts --a 1200,800,3100,950 --b 2200,1900,4100,1300
//   node sigcalc.mjs sd --values 1200,800,3100,950,2200     # log-scale SD of past posts (for size-posts)
// Add --json for machine-readable output.

const args = process.argv.slice(2);
const cmd = args[0];
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i > 0 ? args[i + 1] : d; };
const json = args.includes("--json");
const out = (o) => { if (json) console.log(JSON.stringify(o)); else for (const [k, v] of Object.entries(o)) console.log(`${k.padEnd(22)} ${v}`); };
const fail = (m) => { console.error(`sigcalc: ${m}`); process.exit(2); };

// --- normal distribution ---
function erf(x) { // Abramowitz–Stegun 7.1.26, |error| < 1.5e-7
  const s = Math.sign(x); x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
}
const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
function invPhi(p) { // Acklam's approximation
  if (p <= 0 || p >= 1) fail("probability must be between 0 and 1");
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  let q, r;
  if (p < pl) { q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (p > 1 - pl) { q = Math.sqrt(-2 * Math.log(1 - p)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  q = p - 0.5; r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

// --- Student t (two-sided p) via regularized incomplete beta ---
function lgamma(x) {
  const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1; let a = c[0]; const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
function betacf(a, b, x) {
  let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - (qab * x) / qap;
  if (Math.abs(d) < 1e-30) d = 1e-30; d = 1 / d; let h = d;
  for (let m = 1; m <= 200; m++) {
    const m2 = 2 * m; let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30; c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30; d = 1 / d; h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30; c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30; d = 1 / d;
    const del = d * c; h *= del; if (Math.abs(del - 1) < 3e-12) break;
  }
  return h;
}
function ibeta(x, a, b) {
  if (x <= 0) return 0; if (x >= 1) return 1;
  const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? (bt * betacf(a, b, x)) / a : 1 - (bt * betacf(b, a, 1 - x)) / b;
}
const tTwoSided = (t, df) => ibeta(df / (df + t * t), df / 2, 0.5);

// --- helpers ---
const parseFrac = (s, name) => { const m = /^(\d+)\/(\d+)$/.exec(s ?? ""); if (!m) fail(`--${name} must look like successes/trials, e.g. 41/10200`); const [x, n] = [+m[1], +m[2]]; if (n <= 0 || x > n) fail(`--${name}: bad numbers`); return { x, n, p: x / n }; };
const parseList = (s, name) => { const v = String(s ?? "").split(",").map(Number).filter((n) => Number.isFinite(n) && n >= 0); if (v.length < 2) fail(`--${name} needs at least 2 comma-separated numbers`); return v; };
const mean = (v) => v.reduce((a, b) => a + b, 0) / v.length;
const variance = (v) => { const m = mean(v); return v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1); };
const pct = (x, d = 1) => `${(x * 100).toFixed(d)}%`;
const alpha = Number(opt("alpha", 0.05)), power = Number(opt("power", 0.8));
const zA = invPhi(1 - alpha / 2), zB = invPhi(power);

switch (cmd) {
  case "size-rate": {
    const p1 = Number(opt("base")), lift = Number(opt("lift"));
    if (!(p1 > 0 && p1 < 1) || !(lift > 0)) fail("need --base (0–1) and --lift (relative, e.g. 0.25 for +25%)");
    const p2 = p1 * (1 + lift), pb = (p1 + p2) / 2;
    const n = Math.ceil(((zA * Math.sqrt(2 * pb * (1 - pb)) + zB * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2) / (p2 - p1) ** 2);
    out({ test: "two-proportion z-test", baseline: pct(p1, 2), target: pct(p2, 2), alpha, power, per_arm: n, total: 2 * n, note: "n = viewers (or impressions) per variant" });
    break;
  }
  case "rate": {
    const a = parseFrac(opt("a"), "a"), b = parseFrac(opt("b"), "b");
    const pp = (a.x + b.x) / (a.n + b.n);
    const se0 = Math.sqrt(pp * (1 - pp) * (1 / a.n + 1 / b.n));
    const z = (b.p - a.p) / se0, p = 2 * (1 - Phi(Math.abs(z)));
    const se = Math.sqrt((a.p * (1 - a.p)) / a.n + (b.p * (1 - b.p)) / b.n);
    const lo = b.p - a.p - zA * se, hi = b.p - a.p + zA * se;
    out({ a: `${a.x}/${a.n} = ${pct(a.p, 3)}`, b: `${b.x}/${b.n} = ${pct(b.p, 3)}`, relative_lift: pct(b.p / a.p - 1), diff_ci: `${pct(lo, 3)} to ${pct(hi, 3)} (abs, ${pct(1 - alpha, 0)})`, z: z.toFixed(2), p_value: p.toFixed(4), verdict: p < alpha ? "significant at alpha" : "not significant — keep testing or call it a tie", warning: Math.min(a.x, b.x) < 10 ? "fewer than 10 events in an arm: treat as anecdote" : "none" });
    break;
  }
  case "size-posts": {
    const sd = Number(opt("sd", 1)), lift = Number(opt("lift"));
    if (!(sd > 0) || !(lift > 0)) fail("need --sd (log-scale SD of past posts; run `sd`) and --lift (e.g. 0.5 for +50% median views)");
    const d = Math.log(1 + lift);
    const n = Math.ceil((2 * (zA + zB) ** 2 * sd ** 2) / d ** 2) + 1;
    out({ test: "Welch t-test on log(metric)", log_sd: sd, detectable_lift: pct(lift, 0), alpha, power, posts_per_arm: n, total_posts: 2 * n, note: "a post-level test needs this many posts in EACH variant" });
    break;
  }
  case "posts": {
    const A = parseList(opt("a"), "a").map((x) => Math.log(x + 1)), B = parseList(opt("b"), "b").map((x) => Math.log(x + 1));
    const va = variance(A) / A.length, vb = variance(B) / B.length;
    const t = (mean(B) - mean(A)) / Math.sqrt(va + vb);
    const df = (va + vb) ** 2 / (va ** 2 / (A.length - 1) + vb ** 2 / (B.length - 1));
    const p = tTwoSided(t, df);
    const ratio = Math.exp(mean(B) - mean(A));
    const half = zA * Math.sqrt(va + vb);
    out({ a_posts: A.length, b_posts: B.length, a_geo_mean: Math.round(Math.exp(mean(A)) - 1), b_geo_mean: Math.round(Math.exp(mean(B)) - 1), b_vs_a: `${pct(ratio - 1)} (approx CI ${pct(Math.exp(mean(B) - mean(A) - half) - 1)} to ${pct(Math.exp(mean(B) - mean(A) + half) - 1)})`, t: t.toFixed(2), df: df.toFixed(1), p_value: p.toFixed(4), verdict: p < alpha ? "significant at alpha" : "not significant — keep testing or call it a tie", warning: Math.min(A.length, B.length) < 8 ? "fewer than 8 posts in an arm: direction only, not proof" : "none" });
    break;
  }
  case "sd": {
    const v = parseList(opt("values"), "values").map((x) => Math.log(x + 1));
    out({ posts: v.length, log_sd: Math.sqrt(variance(v)).toFixed(2), geo_mean: Math.round(Math.exp(mean(v)) - 1), hint: "use log_sd with size-posts" });
    break;
  }
  default:
    console.log("usage: sigcalc.mjs size-rate|rate|size-posts|posts|sd [options] [--json]  (see the header of this file)");
    process.exit(cmd ? 2 : 0);
}
