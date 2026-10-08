---
name: media-pipelines
description: Builds cost-controlled AI media pipelines with @useclaudia/media and claudia generate — images (Nano Banana, GPT Image, FLUX, Seedream), video (Gemini Omni, Veo 3.1, Kling, Seedance, Hailuo, Wan, Runway), speech and music (ElevenLabs, Gemini TTS, Lyria), talking avatars and lip-sync (HeyGen, OmniHuman) on the person's own provider keys, with dry-run estimates for a whole shot list, per-job/day/month caps, approvals, a restart-safe job queue, brand kits, a local library with provenance sidecars, ffmpeg post-processing and hand-off to social posting. Use when someone wants to batch-produce content, price a shoot before spending, chain image → video → voice → avatar, wire media into an agent or app, or debug over_budget, needs_approval, blocked or expired jobs.
license: MIT
metadata:
  title: "Media pipelines with your own keys"
  category: "build"
  summary: "Price a shot list, generate images, video, voice and avatars inside caps and approvals, keep provenance, hand off to posting."
  level: "intermediate"
  tags: "media, image generation, video generation, tts, avatars, lip-sync, cost control, provenance, ffmpeg"
  uses: "@useclaudia/media, @useclaudia/cli, @useclaudia/social"
  time: "40 min"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Media pipelines with your own keys

The person gets a repeatable pipeline: a written shot list is priced in full before anything runs, jobs go through
caps and an approval line, results land in a local library with a provenance record, and finished files flow into
posting with AI labels intact. Claudia hosts no provider keys; every request goes straight from the person's machine
to the provider on their account.

## When to use this

- Producing a week of content (stills, vertical clips, voiceovers) for an AI character or a coin community.
- "How much will this cost?" before generating anything.
- Chaining steps: keyframe image → image-to-video → speech → talking avatar or lip-sync.
- Adding media generation to an agent, an app or Claudia Local, with approvals that an agent can't bypass.
- A job is stuck in `needs_approval`, refused `over_budget`, `blocked`, or `expired`.

Prompt craft lives in the create skills (see Related); this skill is the machinery.

## What you need

- Node.js 18.17+ (20+ recommended) and `npm i @useclaudia/media` (v0.2.0), or the CLI with `npm i -g @useclaudia/media`
  for `claudia generate`, or Claudia Local (Generate tab).
- The person's own provider keys — only the ones they'll use:

| Key name | Provider | Makes (checked 2026-10) |
|---|---|---|
| `google` | Gemini API | images (Nano Banana), video (Gemini Omni Flash, Veo 3.1), music (Lyria), speech (Gemini TTS) |
| `openai` | OpenAI | images (GPT Image: generate, edit with refs, transparent background), speech. **No video** (the Sora / Videos API shut down 2026-09-24) |
| `fal` | fal.ai | video (Kling, Seedance, Hailuo, Wan), images (FLUX), avatars (OmniHuman), lip-sync |
| `elevenlabs` | ElevenLabs | speech with own voice ids, sound effects, music |
| `heygen` | HeyGen | talking-head avatar video |
| `runway`, `byteplus` | optional | Runway video/edit/images; BytePlus Seedance video, Seedream images |

Keys come from a `KeyProvider`: Claudia Local's vault, the CLI's `claudia keys set <name>`, or env vars
`CLAUDIA_KEY_<NAME>` (e.g. `CLAUDIA_KEY_FAL`). Never in code or chat.

## Steps

### 1. Write the brief and shot list

Fill [templates/media-brief.md](templates/media-brief.md) with the person (goal, networks, aspect ratios, character
rules, budget, disclosure), then turn it into rows in [templates/shotlist.csv](templates/shotlist.csv): `id, kind,
model, prompt, text, aspect, duration_sec, n, resolution`. One row per output. Aspects: `1:1 16:9 9:16 4:5 3:2 2:3`.

### 2. Price the whole list (no keys, no network)

```sh
node scripts/estimate-shotlist.mjs templates/shotlist.csv --budget 3
```

Real output for the template (2026-10-08):

```text
✓ banner     image  google/nano-banana-2.1       $  0.0504  list       $0.0336 per 1K image, $0.0504 2K, $0.113 4K
✓ portrait   image  openai/gpt-image-2.5-flare   $  0.0132  estimate
✓ room-talk  video  google/omni-flash            $  0.8000  estimate   ~$0.10 per second at 720p …; 8 s assumed
✓ rain-run   video  fal/kling-2.6-pro            $  0.7000  list       $0.14 per second with audio ($0.07 without) × 5s
✓ voiceover  speech elevenlabs/flash-v2.5        $  0.0030  list
✓ bed-loop   music  google/lyria-3.5             $  0.0800  list
Total ≈ $1.65 for 6 shot(s) · budget $3.00
```

`list` = read off the provider's price page; `estimate` = worked out (token rates, assumed lengths). Retired or unknown
models fail here with the replacement named, before money is at stake. `--requests` shows each exact provider request.
Single shots from the CLI: `claudia generate video "…" --model fal/kling-2.6-pro --duration 5 --dry-run`.

### 3. Set caps and the approval line

```ts
import { createMedia, chainKeys, envKeys } from "@useclaudia/media";
const media = createMedia({
  keys: chainKeys(myVault, envKeys()),           // host store first, then CLAUDIA_KEY_* env vars
  limits: { perJobUsd: 2, perDayUsd: 10, perMonthUsd: 100, approveAboveUsd: 0.5,
            perProvider: { fal: { perJobUsd: 1 } } },   // stricter of global/provider wins
});
```

Day and month caps count spent + reserved (queued) + the new job; going over throws `ClaudiaMediaError("over_budget")`
with a plain-English hint. Jobs above `approveAboveUsd` are created as `needs_approval` and nothing is sent until
`media.approve(id)`. Presets: [templates/media-limits.json](templates/media-limits.json). For agents: keep
`approveAboveUsd` set and never let an agent call `approve()` on its own jobs.

### 4. Generate and wait

```ts
const job = await media.generate({ kind: "image", model: "google/nano-banana-2.1", prompt, aspect: "4:5", brand: "claudia" });
const done = await media.wait(job.id);                        // resolves on succeeded / failed / blocked / needs_approval …
console.log(done.status, done.outputs[0]?.path, done.provenance.costUsd);

const clip = await media.generate({ kind: "video", model: "fal/kling-2.6-pro", prompt, aspect: "9:16", durationSec: 5, refs: [done.outputs[0].path] });
const v = await media.wait(clip.id, { timeoutMs: 10 * 60_000 }); // still "running" on timeout — it keeps going
media.on("job", (j) => console.log(j.id, j.status, j.progress ?? ""));
```

The queue survives restarts (`<dataDir>/media/jobs.json`): close with `await media.close()`; the next `createMedia()`
resumes polling without resubmitting. Polling backs off 5 s → 15 s; 429s honour `Retry-After`; provider concurrency is
2 (HeyGen and Runway 1). Chained recipes (keyframe → video, voice → avatar, lip-sync), with code:
[references/pipeline-recipes.md](references/pipeline-recipes.md) and [templates/pipeline-script.md](templates/pipeline-script.md).

CLI equivalent with approval prompts and a hard cap per command:

```sh
claudia generate image "…" --model google/nano-banana-2.1 --aspect 4:5 --brand claudia --max-usd 0.10
claudia generate video "…" --model google/omni-flash --aspect 9:16 --duration 8 --ref keyframe.png --max-usd 1
claudia generate speech "gm. Three things on the board today." --model elevenlabs/flash-v2.5 --voice <voice id>
```

### 5. Keep consistency with a brand kit

```ts
media.brands.save({ ...media.brands.get("claudia"), refs: ["/abs/path/approved-face-1.png", "/abs/path/approved-face-2.png"] });
```

A kit adds its `style` to image/video/avatar prompts, supplies `refs` when a request has none, sets the `voice` for
speech/avatars on that provider, and blocks prompts containing `banned` words (`blocked`). The seeded `claudia` kit has
no reference images until the person adds their own approved ones. Character rules:
[../../create/character-consistency/SKILL.md](../../create/character-consistency/SKILL.md).

### 6. Library, provenance and post-processing

Outputs download immediately (Google deletes Veo results after 2 days; other providers' links expire too) into
`<dataDir>/media/library/YYYY-MM/` with a `<file>.json` sidecar: final prompt, model, provider, `costUsd`, watermark
(SynthID for Google, C2PA for OpenAI images), terms URL, time, SHA-256. Keep the sidecar next to every derivative.
ffmpeg crops, square versions, posters and faststart encodes: [references/pipeline-recipes.md](references/pipeline-recipes.md).
Re-encoding drops embedded C2PA metadata, so the sidecar and the post's AI label carry the disclosure.

### 7. Hand off to posting

Pass `job.outputs[].path` as `media: [{ path, alt }]` to `@useclaudia/social` drafts (or "Use in post" in Claudia
Local). Networks that pull from a URL get a short-lived `https://useclaudia.xyz/relay/media` link deleted after
publishing. The AI label is on by default; keep it. See [social-publishing](../social-publishing/SKILL.md).

### 8. Review spend

`media.spend()` → `{ today, month, byProvider }`; the append-only ledger is `<dataDir>/media/spend.jsonl` (reserved on
submit, settled on success, voided on failure; canceled-while-running keeps the reservation). The provider dashboard is
the final word on bills. Errors and statuses: [references/jobs-and-errors.md](references/jobs-and-errors.md).

## Templates

- [templates/media-brief.md](templates/media-brief.md) — one-page brief for a batch.
- [templates/shotlist.csv](templates/shotlist.csv) — input for `estimate-shotlist.mjs`.
- [templates/media-limits.json](templates/media-limits.json) — cap presets for `createMedia({ limits })`.
- [templates/pipeline-script.md](templates/pipeline-script.md) — a full keyframe → video → voice script with approvals.

Prompt skeleton that survives model switches:

```text
[format] vertical 9:16 film still | [subject] Claudia (adult, late twenties; glossy black jaw-length bob, heavy bangs,
copper-red streaks, small orange clip, gold hoops, light freckles) | [action] … | [setting] … | [light] … |
[camera] 35mm, eye level, shallow depth of field | [constraints] no text, no logos, no real people, natural skin texture
```

## Check before you finish

- [ ] The whole shot list was dry-run priced and the total fits the agreed budget.
- [ ] `limits` (per job, day, month, approve-above) are set; agents can't approve their own jobs.
- [ ] No retired model in the list (Veo 3.1 previews end 2026-10-22; GPT Image 1.5 / 1 Mini end 2026-12-01; OpenAI TTS ends 2027-01-06).
- [ ] Every output has its provenance sidecar; derivatives keep it.
- [ ] Anything posted keeps the AI label; no real person is depicted or imitated; the character is always an adult.
- [ ] Keys came from the KeyProvider/env; dry-run output shows `***` and no key appears in logs.

## Pitfalls

- **Site docs mismatch**: the website's Generators table lists OpenAI for video and fal.ai for music/sound effects; the package (source of truth) has no OpenAI video and fal makes video, images, avatars and lip-sync. ElevenLabs and Google make music.
- **Estimates vs bills**: Omni picks its own length; TTS and HeyGen are estimates. Exact cost after the job only for OpenAI images and Runway.
- **Expired results**: closing the app for more than 2 days loses Veo outputs; Runway and BytePlus keep 24–48 h.
- **Crash during submit**: that job is marked failed with a hint to check the provider dashboard (failing is cheaper than paying twice).
- **Two processes**: the CLI and Claudia Local can share a data dir safely (per-job leases); two different data dirs means two ledgers and two sets of caps.
- **ElevenLabs premade voices stop working 2026-12-31**: use the person's own voice ids.
- **HeyGen v1/v2 retire 2026-10-31**: the package already uses v3; older scripts break.

## Related skills

- [claudia-local-studio](../claudia-local-studio/SKILL.md) — the same pipeline with a UI and an approvals queue
- [social-publishing](../social-publishing/SKILL.md) · [cli-power-user](../cli-power-user/SKILL.md) · [mcp-setup](../mcp-setup/SKILL.md)
- [../../create/video-prompting/SKILL.md](../../create/video-prompting/SKILL.md) · [../../create/selfie-and-ugc-video-prompts/SKILL.md](../../create/selfie-and-ugc-video-prompts/SKILL.md) · [../../create/voice-and-lip-sync/SKILL.md](../../create/voice-and-lip-sync/SKILL.md)
- [../../create/batch-content-production/SKILL.md](../../create/batch-content-production/SKILL.md) · [../../create/ai-disclosure-and-provenance/SKILL.md](../../create/ai-disclosure-and-provenance/SKILL.md) · [../../create/short-form-editing/SKILL.md](../../create/short-form-editing/SKILL.md)

References in this skill:
- [references/models-and-prices.md](references/models-and-prices.md) — every model id, defaults, price hints and dates. Read when picking models.
- [references/pipeline-recipes.md](references/pipeline-recipes.md) — chained jobs, refs per model, ffmpeg post-processing. Read when building a chain.
- [references/jobs-and-errors.md](references/jobs-and-errors.md) — statuses, error codes, resume, events. Read when a job misbehaves.
- Worked example: [examples/weekly-batch.md](examples/weekly-batch.md).
