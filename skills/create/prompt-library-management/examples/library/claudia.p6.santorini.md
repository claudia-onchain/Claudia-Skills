---
id: claudia.p6.santorini
version: 1.0.0
status: approved
character: claudia
identity: CLAUDIA ID v1
pillar: P6
series: window-seat
scene: travel-santorini
look: travel
kind: image
model: byteplus/seedream-4.5
fallback_models: [google/nano-banana-2.1, fal/flux-2-pro]
params: {aspect: "4:5"}
refs: [01-front-neutral, 02-34-left, 11-golden-hour]
seed: none
cost_usd: 0.04
scores: {drift: 6, runs: 4, pass_rate: 0.75}
outputs:
  - {path: library/2026-10/example-santorini.jpg, sha256: 2e8f60b9}
tags: [travel, golden-hour, santorini, headphones, carousel]
created: 2026-10-08
updated: 2026-10-08
retires: none
---
## Prompt
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on her arms (small stars, a rose, a sun). wearing a white linen shirt open over a black top, large cream over-ear headphones around her neck, sunglasses pushed up into her hair. Vertical 4:5 travel
photograph in Oia, Santorini at golden hour: she sits sideways on a whitewashed wall, knees up, looking over her shoulder at
the lens with a relaxed smile; behind her, white cubic houses cascade down the cliff to a deep blue caldera, a blue dome soft
in the distance, the sun low and warm on her face. Warm backlight rims her bob and makes the copper streaks glow. 50mm, f/2,
eye level, Kodak Portra 400 colour, fine grain, gentle haze. No other people in focus, no text.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo, crowds of tourists in focus

## Notes
- Seedream: send the refs and generate the whole "window seat" set as one sequential batch so identity holds across tiles
  (refs + outputs ≤ 15 per batch, checked 2026-10).
- Place, not event: never caption it as a real trip on a real date with real people.
