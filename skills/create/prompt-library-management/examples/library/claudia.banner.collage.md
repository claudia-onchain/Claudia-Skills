---
id: claudia.banner.collage
version: 2.0.0
status: approved
character: claudia
identity: CLAUDIA ID v2
pillar: P6
series: banners
scene: collage
look: silver-night
kind: image
model: google/nano-banana-2.1
fallback_models: [fal/flux-2-pro]
params: {aspect: "3:1", size: "3000x1000"}
refs: [01-front-neutral, 07-full-body]
seed: none
cost_usd: 0.12
scores: {drift: 6, runs: 3, pass_rate: 0.67}
outputs:
  - {path: library/2026-10/example-banner-collage.jpg, sha256: 0255c570}
tags: [banner, collage, silver, stars]
created: 2026-10-09
updated: 2026-10-09
retires: none
---
## Prompt
[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs; one peach-orange streak panel through the front bangs on one side, the rest jet-black; a small peach star-shaped hair clip at the side; a thin headset microphone along her cheek; light freckles across the nose and cheeks; grey-green eyes; straight dark brows; glossy coral lips; a cool, direct gaze; natural skin texture with visible pores. A 3:1 collage banner on silver foil: tiles of her in the Silver night look (liquid-silver gown, white fur, crystal
choker), a big centre close-up resting her cheek on her hand, film strips with her eyes, a chrome heart, white lilies,
chrome stars and a disco ball at the bottom right. Taped edges, torn paper, sparkle. Leave the centre top calm for a script
wordmark added in edit. Editorial flash, fine grain. No text in the image.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, gold jewellery, tattoos, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo

## Notes
- Build tiles separately and assemble in edit (see ../../../banner-and-collage-design/SKILL.md) when a model mangles faces
  across many tiles.
