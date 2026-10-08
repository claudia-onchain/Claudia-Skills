---
id: claudia.p6.airplane-window
version: 1.0.0
status: approved
character: claudia
identity: CLAUDIA ID v1
pillar: P6
series: window-seat
scene: travel-airplane
look: travel
kind: image
model: fal/flux-2-pro
fallback_models: [google/nano-banana-2.1]
params: {aspect: "4:5", resolution: "2K"}
refs: [01-front-neutral, 02-34-left]
seed: 7781
cost_usd: 0.075
scores: {drift: 7, runs: 3, pass_rate: 0.67}
outputs:
  - {path: library/2026-10/example-airplane.jpg, sha256: b4c5d6e7}
tags: [travel, airplane, window, sunset, clouds, quiet, carousel]
created: 2026-10-08
updated: 2026-10-08
retires: none
---
## Prompt
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on her arms (small stars, a rose, a sun). wearing a white linen shirt open over a black top, large cream over-ear headphones on. Vertical 4:5 photograph in an airplane window seat at sunset: she leans
her temple against the cabin wall, three-quarter profile toward the oval window, eyes soft, a quiet half-smile. Through the
window a sea of pink and orange clouds and a thin gold horizon; warm window light falls across her freckles and the copper
streaks in her bangs; the cabin is dim and cool blue-grey. Image 1 is her face reference. Fujifilm X-T5, 35mm f/1.4 at f/2,
shallow depth of field, Kodachrome-warm colour, fine grain. No logos on the seat or headrest, no text.

## Negative
(FLUX.2: no negative prompt. Positive wording above already says "no logos", "no text".)

## Notes
- FLUX.2 weights early words more: keep the identity block first, setting second, camera last (checked 2026-10).
- Profile-leaning shots drift most at the nose and bang depth; include pack shot 02 (¾ left) as a ref.
