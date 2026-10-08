# Worked example: batch `claudia-2026-w42`

The agent prepared the manifest in `templates/batch-manifest.json` from the week-1 calendar rows
([../../content-pillars-and-series/templates/content-calendar-4wk.csv](../../content-pillars-and-series/templates/content-calendar-4wk.csv)).
Prices are the package's list/estimate figures (checked 2026-10-08).

## Monday 09:10 — estimate

```text
$ node scripts/batch.mjs estimate batch.json
Batch claudia-2026-w42 · 9 items
w42-talk-ep1-still     image   google/nano-banana-2.1   9:16 2K        $0.0504  list
w42-talk-ep1-video     video   google/omni-flash        9:16 10s         $1.00  estimate
w42-talk-ep1-vo        speech  elevenlabs/v3                           $0.0094  list
w42-talk-ep1-lipsync   avatar  fal/lipsync-2            18s            $0.9000  list
w42-rain-ep1-still     image   google/nano-banana-2.1   9:16 2K        $0.0504  list
w42-rain-ep1-video     video   fal/kling-3-pro          9:16 10s         $1.68  list
w42-cto-ep1-still      image   google/nano-banana-2.1   9:16 2K        $0.0504  list
w42-cto-ep1-video      video   fal/hailuo-2.3           6s             $0.2802  list
w42-window-seat-ep1    image   google/nano-banana-2.1   4:5 2K ×6      $0.3024  list
Total $4.32 · reroll budget 30% $1.30 · plan for $5.62 · cap $16.00
```

The agent posted the table to the owner: "Batch w42 first half: $4.32 planned, $5.62 with rerolls, cap $16. OK to start
stage 1 (stills + voice, $0.46)?" Owner: "go".

## 09:20 — stage 1

```text
$ node scripts/batch.mjs run batch.json --yes --stage 1
w42-talk-ep1-still     mj_7Q…a1  queued
w42-talk-ep1-vo        mj_7Q…a2  queued
w42-rain-ep1-still     mj_7Q…a3  queued
w42-cto-ep1-still      mj_7Q…a4  queued
w42-window-seat-ep1    mj_7Q…a5  queued   (×6)
10 job(s) created · 0 waiting for a person's approval
```

All stage-1 jobs were under `approveAboveUsd: 0.5`, so they queued directly. 4 minutes later all succeeded.

## 09:30 — QA gate 1

| Item | Score | Decision |
|---|---|---|
| talk-ep1-still | 7/7 | picked |
| rain-ep1-still | 5/7 — two copper panels (both sides) and a melted bracelet | fixed with GPT Image 2.5 Sunburst preserve-list edit ($0.013) → 7/7 |
| cto-ep1-still | 7/7 | picked (no Claudia; cat matches cat-01) |
| window-seat ×6 | 6, 7, 7, 4, 7, 6 | tile 4 rejected (looked young — rounder face, braces). Rerolled once ($0.05) → 7/7 |

Picks copied to `out/`. Rerolls/fixes so far: $0.063.

## 10:05 — stage 2 (approvals needed)

```text
$ node scripts/batch.mjs run batch.json --yes --stage 2
w42-talk-ep1-video     mj_8B…b1  needs_approval
w42-rain-ep1-video     mj_8B…b2  needs_approval
w42-cto-ep1-video      mj_8B…b3  queued
3 job(s) created · 2 waiting for a person's approval
```

The owner opened Claudia Local, read both prompts, approved them. (The agent did not and could not: `batch.mjs approve`
refuses without a terminal.)

## 10:20 — QA gate 2

- rain video: middle frame showed the phone hand fused with the bracelet for ~6 frames → trimmed 0.3 s in edit; 7/7 elsewhere.
- talk video: Omni added soft background music despite the prompt → regenerated once with "no music, only room tone" at the
  end of the prompt ($1.00 from the reroll budget). Second take clean.

## 10:40 — stage 3, edit, drafts

Lip-sync on the talk clip (approved by the owner), edit in CapCut with commercial-cleared assets only, captions
word-by-word. Four drafts created in `@useclaudia/social`; previews showed AI flags added for TikTok, Instagram and
YouTube; the owner approved and scheduled them for 2026-10-12 to 10-14.

## Close

```text
$ node scripts/batch.mjs status
…
Spent today $5.38 · this month $21.90
```

Planned $5.62 → actual $5.38 for 4 published shorts + 1 carousel: **$1.08 per published asset**. The fixed rain still and
the second talk prompt went into the prompt library as v1.1 with their scores.
