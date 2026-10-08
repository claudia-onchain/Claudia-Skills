---
id: claudia.p6.balcony-night
version: 1.0.0
status: draft
character: claudia
identity: CLAUDIA ID v1
pillar: P6
series: none
scene: balcony-night
look: night-out
kind: image
model: midjourney/v7
fallback_models: [google/nano-banana-2.1]
params: {aspect: "4:5", oref_weight: 250, style: raw}
refs: [01-front-neutral]
seed: 2210
cost_usd: none
scores: {drift: 6, runs: 2, pass_rate: 0.5}
outputs:
  - {path: library/2026-10/example-balcony-mj.png, sha256: 1a2b3c4d}
tags: [night, balcony, city-lights, wine, midjourney, manual]
created: 2026-10-08
updated: 2026-10-08
retires: none
---
## Prompt
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on her arms (small stars, a rose, a sun).
Midjourney (manual, in the Midjourney app — not available through @useclaudia/media). Omni Reference is V7-only, so pin
`--v 7` (checked 2026-10):

```text
candid photo of a 28-year-old woman with a glossy jet-black jaw-length blunt bob, heavy straight bangs, copper-orange streak
panels in the bangs, small orange hair clip, thin gold hoops, light freckles, warm brown eyes, wearing a black ribbed cami and
layered silver chains with a star pendant, leaning on a glass balcony railing of a high-rise at night, a glass of white wine
in her hand, the city lights glittering below in warm bokeh, she looks back over her shoulder at the camera with a knowing
half-smile, 35mm film photo, Cinestill 800T halation, soft grain --ar 4:5 --oref <url of 01-front-neutral> --ow 250
--style raw --v 7 --seed 2210 --no teenager, childlike face, long hair, text, watermark
```

## Negative
handled inline with `--no` above

## Notes
- Draft: pass rate 0.5 — Midjourney sometimes lengthens the bob. Try `--ow 350` next (A/B logged).
- Midjourney seeds on V8 are only ~99 % reproducible; on V7 with --oref expect variation anyway.
- Upload the ref from the approved pack only; never a real person's photo.
