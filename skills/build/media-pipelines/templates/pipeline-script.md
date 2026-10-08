# Template: keyframe → vertical clip → voiceover, with approvals

Save as `pipeline.mjs` next to a `package.json` with `@useclaudia/media`. Run `node pipeline.mjs --dry-run` first: it
prints every request and estimate and spends nothing. Without `--dry-run` it still stops at each approval gate and
asks the person in the terminal. Keys come from `CLAUDIA_KEY_GOOGLE`, `CLAUDIA_KEY_FAL`, `CLAUDIA_KEY_ELEVENLABS`
(or pass your own KeyProvider). Outputs and sidecars land in `~/.claudia/media/library/YYYY-MM/`.

```js
import { createInterface } from "node:readline/promises";
import { createMedia, envKeys, ClaudiaMediaError } from "@useclaudia/media";

const DRY = process.argv.includes("--dry-run");
const VOICE = process.env.ELEVENLABS_VOICE_ID; // the person's own voice id
const media = createMedia({ keys: envKeys(), dryRun: DRY, limits: { perJobUsd: 2, perDayUsd: 6, perMonthUsd: 60, approveAboveUsd: 0 } });
const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = async (q) => DRY || (await rl.question(`${q} [y/N] `)).trim().toLowerCase() === "y";

async function run(label, req) {
  const est = media.estimate(req);
  console.log(`\n${label}: ${req.model} ≈ $${est.usd.toFixed(3)} (${est.confidence}) — ${est.basis}`);
  const job = await media.generate(req);
  if ("dryRun" in job) { console.log(`  dry run → ${job.request.method} ${job.request.url}`); return null; }
  if (job.status === "needs_approval") {
    if (!(await ask(`  Approve ${label} for ≈ $${est.usd.toFixed(2)}?`))) { await media.cancel(job.id); console.log("  canceled"); return null; }
    await media.approve(job.id);
  }
  const done = await media.wait(job.id, { timeoutMs: 15 * 60_000 });
  if (done.status !== "succeeded") throw new Error(`${label} ended ${done.status}: ${done.error?.message ?? ""} ${done.error?.hint ?? ""}`);
  console.log(`  ✓ ${done.outputs[0].path} · cost $${done.provenance.costUsd} · watermark ${done.provenance.watermark ?? "none"}`);
  return done;
}

try {
  const still = await run("Keyframe", {
    kind: "image", model: "google/nano-banana-2.1", aspect: "9:16", brand: "claudia",
    prompt: "Vertical film still: Claudia in her lamp-lit bedroom at dusk, sitting cross-legged on the bed with a laptop that has a butterfly sticker, city lights through the window, warm practical light, 35mm, shallow depth of field. Adult. No text, no logos.",
  });
  if (!DRY && still && !(await ask("Keyframe looks right (face, wardrobe, hands)? Animate it?"))) process.exit(0);

  await run("Clip", {
    kind: "video", model: "fal/kling-2.6-pro", aspect: "9:16", durationSec: 5, meta: { audio: false },
    refs: still ? [still.outputs[0].path] : [],
    prompt: "She looks up from the laptop, laughs softly, tucks her bangs behind her ear; slight handheld sway; natural skin texture.",
  });

  if (VOICE || DRY) await run("Voiceover", {
    kind: "speech", model: "elevenlabs/flash-v2.5", voice: VOICE ?? "voice-id-here",
    text: "gm. Quiet night on the board. Three numbers worth a look tomorrow, none of them advice.",
  });

  console.log(`\nSpend now: ${JSON.stringify(media.spend())}`);
} catch (e) {
  if (e instanceof ClaudiaMediaError) console.error(`${e.code}: ${e.message}${e.hint ? `\nhint: ${e.hint}` : ""}`);
  else console.error(e);
  process.exitCode = 1;
} finally {
  rl.close();
  await media.close();
}
```

Notes:
- `approveAboveUsd: 0` makes every job a gate — right for a person-in-the-loop script; raise it for trusted batches.
- With `meta.audio: false` Kling's list price is $0.07/s instead of $0.14/s, but the package's estimate (and so the cap
  check) still uses the with-audio rate — a conservative number (checked 2026-10).
- Hand the outputs to posting with their sidecars: [social-publishing](../../social-publishing/SKILL.md).
