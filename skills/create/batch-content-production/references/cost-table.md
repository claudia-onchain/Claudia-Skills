# Cost table for batch planning

From `@useclaudia/media`'s model table (`MODEL_TABLE`, prices `asOf` 2026-10-08, "list" = read off the provider's
price page, "estimate" = worked out). Prices move: `media.estimate(req)` is the source of truth at run time; this page is
for planning. Read it when you pick models for a budget.

## Images (per image)

| Model id | Price | Confidence | Best for |
|---|---|---|---|
| `google/nano-banana-2.1` | $0.0336 1K · $0.0504 2K · $0.113 4K | list | default stills, multi-ref identity (up to 14 refs, ~4 character refs) |
| `google/nano-banana-2` | $0.045 512 · $0.067 1K · $0.101 2K · $0.151 4K | list | same family, 512 px drafts |
| `google/nano-banana-lite` | $0.0336 (1K only) | list | cheap drafts; weak with many refs |
| `google/nano-banana-pro` | $0.134 1K/2K · $0.24 4K | list | hero stills, text in image |
| `openai/gpt-image-2.5-flare` | ~$0.013 medium 1024² ($0.006 low, $0.053 high) | estimate | fast edits, transparent PNGs |
| `openai/gpt-image-2.5-sunburst` | ~$0.013 medium 1024² | estimate | precise preserve-list fixes |
| `openai/gpt-image-2` | $0.053 medium ($0.006 low, $0.211 high) | list | — |
| `fal/flux-2-pro` | $0.03 first MP + $0.015 per extra MP | list | photoreal with camera/film language; no negatives |
| `fal/flux-kontext-pro` | $0.04 | list | "change only X" edits |
| `byteplus/seedream-4.5` | $0.04 | list | sequential batch of one shoot |
| `byteplus/seedream-5-flash` | $0.018 | list | cheap batch variants |

## Video (per second unless noted)

| Model id | Price | Confidence | Notes |
|---|---|---|---|
| `google/omni-flash` | ~$0.10/s at 720p (model picks length; 8 s assumed) | estimate | Veo's replacement; 3–10 s per generation, up to 10 refs on Google's side (checked 2026-10) |
| `google/veo-3.1` | $0.40/s (720p/1080p), $0.60 4K | list | **shuts down 2026-10-22** |
| `google/veo-3.1-fast` | $0.10 720p · $0.12 1080p · $0.30 4K | list | **shuts down 2026-10-22** |
| `google/veo-3.1-lite` | $0.05 720p · $0.08 1080p | list | **shuts down 2026-10-22** |
| `fal/kling-2.6-pro` | $0.14/s with audio · $0.07 without | list | 5 or 10 s |
| `fal/kling-3-pro` | $0.168/s with audio · $0.112 without | list | 3–15 s |
| `fal/kling-2.5-turbo-pro` | $0.35 for 5 s + $0.07/extra s | list | no audio |
| `fal/seedance-2.0` | $0.3034/s 720p · $0.682 1080p | list | 4–15 s, audio |
| `fal/hailuo-2.3` | $0.28 per 6 s · $0.56 per 10 s | list | no aspect control; good for loops |
| `fal/wan-2.6` | $0.10/s 720p · $0.15 1080p | list | 5/10/15 s |
| `runway/gen4.5` | $0.12/s | list | 2–10 s |
| `runway/gen4-turbo` | $0.05/s | list | image-to-video only |
| `runway/aleph2` | $0.28/s, 56 credits ($0.56) minimum | list | video edit |
| `byteplus/seedance-2.0` | ~$0.15/s 720p · ~$0.37 1080p | estimate | needs ModelArk activation |

## Voice, music, avatar

| Model id | Price | Confidence |
|---|---|---|
| `elevenlabs/v3`, `elevenlabs/multilingual-v2` | $0.08 per 1,000 characters | list |
| `elevenlabs/flash-v2.5` | $0.04 per 1,000 characters | list |
| `google/gemini-3.8-flash-tts` | $0.50/1M input + $9.00/1M audio tokens (25 tok/s) until 2026-12-31, then $1.00/$18.00 | list |
| `elevenlabs/sfx-v2` | $0.12 per minute (10 s assumed) | estimate |
| `elevenlabs/music-v1`, `music-v2.5` | $0.15 per minute | list |
| `google/lyria-3.5` | $0.08 per song | list |
| `google/lyria-3-clip` | $0.04 per 30 s clip | list |
| `fal/omnihuman-1.5` | $0.16 per second of output | list |
| `fal/lipsync-2` | $3.00 per minute | list |
| `fal/veed-lipsync` | $0.40 per minute | list |
| `heygen/avatar-iv` | ~$0.05–0.10/s (upper end used) | estimate |

## Unit costs for Claudia's formats (planning numbers)

| Asset | Recipe | ≈ Cost |
|---|---|---|
| 4:5 feed still | nano-banana-2.1 2K | $0.05 |
| 6-tile carousel | 6 × nano-banana-2.1 2K | $0.30 |
| 3:1 banner | nano-banana-pro 4K 16:9 + crop | $0.24 |
| 8 s lounge reveal | still + kling-2.6-pro 5 s no audio, looped in edit | $0.40 |
| 10 s rain selfie | still + kling-3-pro 10 s with audio | $1.73 |
| 6 s cat loop | still + hailuo-2.3 6 s | $0.33 |
| 18 s talking vlog | still + omni-flash ~10 s + v3 VO + lipsync-2 18 s | ~$1.97 |
| 30 s talking head (photo-driven) | still + v3 VO + omnihuman-1.5 30 s | ~$4.88 |

Rule of thumb for a week of Claudia (14 posts, ~9 generated assets): **$10–15 including a 30 % reroll budget**.
