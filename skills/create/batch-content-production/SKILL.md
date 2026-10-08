---
name: batch-content-production
description: Runs a week of AI-influencer content as one controlled batch with @useclaudia/media — a JSON manifest of every still, clip, voice-over and lip-sync, estimates for each item plus a batch total before anything spends, spend caps (perJobUsd, perDayUsd, perMonthUsd, approveAboveUsd), dry runs, staged generation (stills → picked first frames → video → lip-sync), human approval of every job above the threshold, waiting and resuming from jobs.json, QA gates (drift score, safety, disclosure), and handoff to @useclaudia/social drafts that a person approves. Includes a runnable batch.mjs (estimate by default, no network) and CLI/MCP equivalents. Use when producing more than a handful of assets at once, planning a content budget, or wiring an agent to generate safely.
license: MIT
metadata:
  title: "Batch content production"
  category: create
  summary: "A week of posts in one run: manifest, estimates and a total first, caps and approvals, staged jobs, QA, then drafts."
  level: intermediate
  tags: "batch, pipeline, budget, spend caps, approvals, dry run, media jobs, workflow, qa"
  uses: "@useclaudia/media, @useclaudia/social, @useclaudia/cli, @useclaudia/mcp"
  time: "2–3 h per week of content"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Batch content production

Generating one post at a time is slow and leaks money in rerolls. A batch turns a week of calendar rows into one
manifest, prices every item before a cent is spent, runs stills first so a person picks the frames, then animates only
the winners, scores them, and hands finished assets to social drafts that a person approves. Nothing spends or publishes
without a human yes.

## When to use this

- More than ~5 assets to make (a week of posts, a launch, a series season).
- You need to tell someone what the week will cost before starting.
- An agent is generating media and you want caps and approvals enforced, not hoped for.
- A run crashed or the laptop closed mid-batch and you need to resume without paying twice.

## What you need

- `@useclaudia/media` (Node ≥ 18.17) and/or `@useclaudia/cli` (`npm i -g @useclaudia/cli @useclaudia/media`).
- Your own provider keys: `claudia keys set google` / `openai` / `fal` / `elevenlabs` (or `CLAUDIA_KEY_<NAME>` env vars).
  Never paste keys into manifests, prompts, logs or chat.
- The week's rows from [../content-pillars-and-series/SKILL.md](../content-pillars-and-series/SKILL.md) and an approved
  ref pack ([../character-consistency/SKILL.md](../character-consistency/SKILL.md)).
- A named human approver.
- [scripts/batch.mjs](scripts/batch.mjs) (Node ≥ 20) and [templates/batch-manifest.json](templates/batch-manifest.json).
- Read [references/cost-table.md](references/cost-table.md) when choosing models for a budget, and
  [references/pipeline-internals.md](references/pipeline-internals.md) when something gets stuck (statuses, resume, expiry).

## Steps

### 1. Turn calendar rows into a manifest

One item per generation. Shared text (identity block, wardrobe) goes in `blocks` and is referenced as `{{ID}}`, so a
typo can't fork her identity across 30 prompts. Every item names an explicit `model` (defaults change; budgets shouldn't).

```json
{
  "batch": "claudia-2026-w42",
  "approver": "@owner",
  "budget": { "perBatchUsd": 16, "rerollPct": 30 },
  "limits": { "perJobUsd": 3.5, "perDayUsd": 8, "perMonthUsd": 60, "approveAboveUsd": 0.5 },
  "blocks": { "ID": "[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) …" },
  "items": [
    { "id": "w42-rain-ep1-still", "stage": 1, "kind": "image", "model": "google/nano-banana-2.1",
      "prompt": "{{ID}} … running selfie in the rain at a warehouse lot …", "aspect": "9:16", "resolution": "2K",
      "refs": ["refs/claudia/01-front-neutral.jpg", "refs/claudia/09-phone-arm.jpg"] },
    { "id": "w42-rain-ep1-video", "stage": 2, "kind": "video", "model": "fal/kling-3-pro",
      "prompt": "Front-camera selfie, she runs forward … ambient rain, no music.", "aspect": "9:16", "durationSec": 10,
      "refs": ["out/w42-rain-ep1-still.png"] }
  ]
}
```

Stages: **1** stills and voice-overs · **2** image-to-video from picked stills · **3** lip-sync/avatar on picked clips
and audio. Full template with 9 items: [templates/batch-manifest.json](templates/batch-manifest.json).

### 2. Estimate every item and the total — before anything else

```sh
node scripts/batch.mjs estimate batch.json            # no keys, no network, writes nothing
node scripts/batch.mjs estimate batch.json --json     # for an agent to read
```

```text
Batch claudia-2026-w42 · 9 items
w42-talk-ep1-still   image   google/nano-banana-2.1   9:16 2K     $0.0504  list
w42-talk-ep1-video   video   google/omni-flash        9:16 10s      $1.00  estimate
w42-rain-ep1-video   video   fal/kling-3-pro          9:16 10s      $1.68  list
…
Total $4.32 · reroll budget 30% $1.30 · plan for $5.62 · cap $16.00
```

It uses `media.estimate()` from the installed package (live model table) and falls back to a built-in price snapshot
(checked 2026-10-08). It exits 3 if total + reroll budget is over `budget.perBatchUsd`, and warns about models that are
retiring (Veo 3.1 previews shut down 2026-10-22). **Show the person the total and get a yes before step 4.**

The same estimate in code:

```ts
import { createMedia, envKeys } from "@useclaudia/media";
const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 3.5, perDayUsd: 8, perMonthUsd: 60, approveAboveUsd: 0.5 } });
const total = manifest.items.reduce((s, it) => s + media.estimate(toRequest(it)).usd * (it.repeat ?? 1), 0);
```

### 3. Dry-run the risky requests

For any item using a model or option for the first time, look at the exact provider request (keys show as `***`):

```sh
claudia generate video "Front-camera selfie, she runs forward…" --model fal/kling-3-pro --aspect 9:16 --duration 10 \
  --ref out/w42-rain-ep1-still.png --dry-run
```

```ts
const r = await media.generate(req, { dryRun: true }); // { dryRun: true, request: {...}, estimate: {...} } — spends nothing
```

### 4. Run stage 1 with caps and approvals on

```sh
node scripts/batch.mjs run batch.json --yes --stage 1
```

- `limits` come from the manifest. Jobs estimated above `approveAboveUsd` are created as `needs_approval` and **nothing
  is sent** until a person approves. A job that would break `perJobUsd`, `perDayUsd` or `perMonthUsd` is refused with
  `over_budget` and a plain-English hint.
- For the CLI, caps live in `~/.claudia/config.json` (there is no `claudia config set` key for them):

```json
{ "media": { "limits": { "perJobUsd": 0.5, "perDayUsd": 3, "approveAboveUsd": 0.25 } } }
```

- `claudia generate` always shows the estimate and today's spend and asks before spending; `--max-usd` refuses anything
  pricier; `--yes` skips only the confirmation, never the caps.

### 5. A person approves

Approvals are a human act. Options, in order of preference:

1. **Claudia Local** dashboard (`127.0.0.1:3939`) shows `needs_approval` jobs with Approve / Cancel.
2. `node scripts/batch.mjs approve <jobId> …` — shows model, estimate and prompt, asks the person to type `yes`.
   It refuses without an interactive terminal, so an agent can't approve its own jobs.
3. Package API in the host's own approval UI: `await media.approve(id)` / `await media.cancel(id)`.

Agents never approve their own jobs (the MCP README says so too). `CLAUDIA_MCP_APPROVE_ABOVE_USD` and
`CLAUDIA_MCP_MEDIA_PER_DAY_USD` (default `5`) set the same guardrails when an assistant uses the `generate_media` tool.

### 6. Wait, watch and resume

```ts
media.on("job", (j) => console.log(j.id, j.status, j.progress ?? ""));
const done = await media.wait(id, { timeoutMs: 10 * 60_000 }); // resolves "running" on timeout, never hangs on needs_approval
```

```sh
node scripts/batch.mjs status          # every job, its output path or error hint, and today's / month's spend
```

Closing the process is safe: jobs persist in `~/.claudia/media/jobs.json` and the next `createMedia()` (CLI, Claudia
Local, `batch.mjs status`) resumes polling without resubmitting. Outputs download immediately into
`~/.claudia/media/library/YYYY-MM/` with a `.json` provenance sidecar — Veo deletes results after 2 days and fal/Runway/
BytePlus links expire in 24–48 h, so don't leave jobs un-downloaded over a weekend.

### 7. QA gate 1 — pick the stills

For each stage-1 item: contact sheet against the anchor, 7-point drift score
([../character-consistency/SKILL.md](../character-consistency/SKILL.md)). Copy the winner to the path the next stage
expects (`out/w42-rain-ep1-still.png`). Reroll only items under 5/7, from the reroll budget.

```sh
cp ~/.claudia/media/library/2026-10/mj_…-2.png out/w42-rain-ep1-still.png
node scripts/batch.mjs run batch.json --yes --stage 2   # refuses if a stage-2 ref file is missing
```

### 8. QA gate 2 — clips and audio

- Score first, middle and last frames (`ffmpeg -ss 5 -i clip.mp4 -frames:v 1 mid.jpg`): face, age, hands, phone, streaks.
- Watch at full speed with sound: lip-sync drift, music where you asked for "no music", garbled on-screen text.
- Then stage 3 (lip-sync) and the edit ([../short-form-editing/SKILL.md](../short-form-editing/SKILL.md)).

### 9. QA gate 3 — safety and disclosure

- [ ] Adult, late twenties, nothing sexualised; background people anonymous; no real-person likeness or readable logos.
- [ ] Music licensed for this account type ([../music-and-sound-for-shorts/SKILL.md](../music-and-sound-for-shorts/SKILL.md)).
- [ ] Sidecar kept next to the final file; AI label planned per network ([../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md)).
- [ ] No price/return promises; coin mentions carry "not financial advice"; nothing coin-related for TikTok.

### 10. Hand off to social drafts — a person publishes

```ts
import { createSocial, envKeys } from "@useclaudia/social";
const social = createSocial({ keys: envKeys() });
const post = social.draft({
  text: "rain check? never heard of her",
  media: ["final/w42-rain-ep1.mp4"],
  targets: [{ account: "tiktok-main" }, { account: "ig-main" }, { account: "yt-main", text: "rain check? never heard of her #shorts" }],
  scheduleAt: "2026-10-13T17:30:00-04:00",
});
console.log(social.preview(post.id)); // labels added per network (X made_with_ai, TikTok is_aigc, IG is_ai_generated, YouTube containsSyntheticMedia)
social.submit(post.id);               // → pending_approval; the person approves in their UI, then it schedules/publishes once
```

CLI: `claudia post x "…" --media final/w42-rain-ep1.mp4 --dry-run` previews labels, length, cost and warnings first.
Scheduling details: [../../build/social-publishing/SKILL.md](../../build/social-publishing/SKILL.md),
[../../grow/posting-schedule/SKILL.md](../../grow/posting-schedule/SKILL.md).

### 11. Close the books

`media.spend()` (or `batch.mjs status`) → actual vs plan, rerolls used, cost per published asset. Log prompts that scored
7/7 back into the library ([../prompt-library-management/SKILL.md](../prompt-library-management/SKILL.md)).

## Templates

- [templates/batch-manifest.json](templates/batch-manifest.json) — 9-item manifest (stills, VO, video, lip-sync, carousel).
- [templates/batch-runbook.md](templates/batch-runbook.md) — the checklist a person follows on batch day, with sign-offs.
- [scripts/batch.mjs](scripts/batch.mjs) — `estimate` · `run --stage n --yes` · `status` · `approve` (human, TTY only).
- [examples/week-42-batch.md](examples/week-42-batch.md) — a real-shaped run: estimate, approvals, rejects, final cost.

## Check before you finish

- [ ] Estimate shown and total approved by a person before any spend.
- [ ] `approveAboveUsd` set; no job approved by the agent that created it.
- [ ] Every stage-2/3 input is a picked, scored output from the previous stage.
- [ ] All outputs downloaded (no `expired`), sidecars kept with finals.
- [ ] QA gates 1–3 passed and noted per asset.
- [ ] Posts are drafts in `pending_approval`; nothing auto-published.
- [ ] Actual spend logged against plan.

## Pitfalls

- **Queuing videos before stills are picked.** You pay to animate rejects. Stages exist for this; `run` checks refs.
- **No explicit models.** A default can change with a new key (defaults are tried in order); estimates lie.
- **Approving in bulk without looking.** Read the prompt in the approval prompt; it's the last cheap moment.
- **Leaving results on provider servers.** Veo keeps 2 days; others 24–48 h. Keep a process running or resume soon.
- **One giant day.** `perDayUsd` is per UTC day; a batch that crosses midnight UTC gets a fresh day budget — plan with the
  month cap.
- **Omni length.** `google/omni-flash` picks its own duration (3–10 s per generation, checked 2026-10), so its estimate is
  an estimate; set the duration in the prompt.

## Related skills

- [../content-pillars-and-series/SKILL.md](../content-pillars-and-series/SKILL.md) · [../storyboarding-shorts/SKILL.md](../storyboarding-shorts/SKILL.md)
- [../character-consistency/SKILL.md](../character-consistency/SKILL.md) · [../prompt-library-management/SKILL.md](../prompt-library-management/SKILL.md)
- [../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md) · [../short-form-editing/SKILL.md](../short-form-editing/SKILL.md)
- [../../build/media-pipelines/SKILL.md](../../build/media-pipelines/SKILL.md) · [../../build/mcp-setup/SKILL.md](../../build/mcp-setup/SKILL.md) · [../../build/cli-power-user/SKILL.md](../../build/cli-power-user/SKILL.md)
- [../../grow/kpi-reporting/SKILL.md](../../grow/kpi-reporting/SKILL.md)
