# Worked example: the bedroom vlog and the rain selfie, end to end

Goal: two TikTok/Reels/Shorts posts for Claudia's "unfiltered" pillar, matching the owner's `room` and `rain` loops.
Budget cap for the session: $10. Limits in `~/.claudia/config.json`:

```json
{ "media": { "limits": { "perJobUsd": 3, "perDayUsd": 10, "approveAboveUsd": 0.5 } } }
```

## Post 1 — "the cat walked in four times" (bedroom, 14 s)

### First frame

```sh
claudia generate image "[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black \
jaw-length blunt bob … wearing an olive-green fine-knit crop cami with a scalloped copper-orange edged neckline and small \
orange embroidered stars, a star pendant on layered silver chains. A paused frame from a front-camera phone video: she \
holds the phone at arm's length, mid-laugh. Plain white walls, round ceiling smoke detector, open doorway behind her on \
the left, soft overcast window light from the right. 24mm phone front camera look, slightly above eye level, slight \
sensor noise, vertical 9:16, natural skin texture with visible pores, no text, no UI overlay." \
  --model google/nano-banana-2.1 --ref refs/claudia/01-front-neutral.jpg,refs/claudia/05-laugh.jpg,refs/claudia/09-phone-arm.jpg \
  --aspect 9:16 --resolution 2K --n 2 --max-usd 0.15
```

Results (2 × $0.0504):
- `#1` — 5/7. Reject: reads about 19 (round cheeks, very wide eyes from the low angle).
- `#2` — 6/7. The clip is hidden behind the hand — acceptable. Ships as `frames/room-07-first.jpg`.

Fix tried on #1 instead of reroll (GPT Image 2.5 Sunburst edit, ≈ $0.05): "Edit image 1. Preserve exactly … Change only:
adult facial proportions of a woman in her late twenties, camera slightly higher." Result passed, but #2 was already
better, so #1-fixed went into the ref pool as a spare.

### Clip

Silent take (for consistent voice via lip-sync), from a script:

```ts
const job = await media.generate({
  kind: "video", model: "fal/kling-3-pro", aspect: "9:16", durationSec: 14, refs: ["frames/room-07-first.jpg"],
  meta: { audio: false },
  negativePrompt: "teenager, childlike face, extra fingers, warped hands, morphing face, text, logo",
  prompt: `Same woman as the first frame: Claudia, 28-year-old woman (adult), black jaw-length bob, heavy bangs with
copper-orange streak panels, orange clip, gold hoops, freckles, olive star crop cami and star pendant. She talks to her
phone's front camera held at arm's length. 0-4s: she laughs and playfully sticks her tongue out, then grins. 4-9s: she
glances away to the side toward the doorway, then back to the lens with a mock-exasperated look. 9-14s: she talks and
laughs, shoulders moving. Plain white walls, ceiling smoke detector, doorway behind her, soft overcast window light.
Handheld, subtle natural shake, slight auto-exposure breathing.`,
});
// estimate ≈ $1.57 → needs_approval → approved in Claudia Local → succeeded after ~4 min
```

QA: first 7/7, middle 6/7 (clip hidden), last 6/7. At 0:06 her left hand rose toward her face and showed six fingers for
3 frames. Fix: trimmed 0:05.8–0:06.3 out and covered the cut with the glance-away (no reroll). Then the line was
generated in her voice and lip-synced with `fal/lipsync-2` — see
[../../voice-and-lip-sync/examples/claudia-voice-session.md](../../voice-and-lip-sync/examples/claudia-voice-session.md).

Line: "ok so I tried to film this four times and the cat walked in all four times." Hook text on screen (0–1.5 s, upper
third): **attempt #5**. Caption: `the cat has notes` + AI label.

## Post 2 — "rain check? never heard of her" (warehouse lot, 13 s)

### First frame

Refs 01 + 05 + 09, same model. Prompt from the `rain-run` card in `templates/ugc-format-cards.yaml`.
- `#1` 7/7 — but heavy rain hid half her face. Changed "rain" → "light rain" in both prompts.
- `#2` 7/7, ships.

### Beats

| Beat | Model | Length | Cost | Result |
|---|---|---|---|---|
| A: jog toward lens, half-spin | `fal/kling-3-pro`, audio on | 8 s | $1.34 | 6/7 — copper panel flickered to red for 4 frames during the spin |
| A (reroll) | same, + "her copper bang streaks stay fixed and orange as she turns" and "half-spin" → "turns her head to look back" | 8 s | $1.34 | 7/7 |
| B: slow to a stop, catch breath | `fal/kling-3-pro --ref a-last.jpg`, audio on | 5 s | $0.84 | 7/7 |

```sh
ffmpeg -sseof -0.6 -i beatA.mp4 -update 1 -q:v 2 a-last.jpg   # -0.6 s: avoids the motion-blurred final frame
for f in beatA beatB; do ffmpeg -y -i $f.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30" \
  -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k $f-n.mp4; done
ffmpeg -i beatA-n.mp4 -i beatB-n.mp4 -filter_complex \
  "[0:v][1:v]xfade=transition=fade:duration=0.25:offset=7.75,format=yuv420p[v];[0:a][1:a]acrossfade=d=0.25[a]" \
  -map "[v]" -map "[a]" -c:v libx264 -crf 18 -c:a aac -movflags +faststart rain-13s.mp4
```

Native rain ambience kept; a licensed track ducked underneath at -18 dB in edit. Caption: `rain check? never heard of her`
+ AI label. Hook text: none — the running laugh at 0 s is the hook.

## Session total

Images 4 × $0.0504 ≈ $0.20 · image edit $0.05 · video $5.10 · lip-sync 14 s at $3.00/min $0.70 · speech < $0.01 →
**≈ $6.05** of the $10 cap (package prices, checked 2026-10). Two rerolls avoided by trimming and editing.
Both posts published only after a person approved them in `@useclaudia/social`, with `labels.ai` on (TikTok `is_aigc`,
YouTube `containsSyntheticMedia`, Instagram `is_ai_generated`).
