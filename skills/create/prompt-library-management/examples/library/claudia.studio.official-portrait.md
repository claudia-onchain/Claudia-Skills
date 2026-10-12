---
id: claudia.studio.official-portrait
version: 2.0.0
status: approved
character: claudia
identity: CLAUDIA ID v2
pillar: —
series: portraits
scene: silver-foil
look: signature
kind: image
model: google/nano-banana-2.1
fallback_models: [fal/flux-2-pro, byteplus/seedream-4.5]
params: {aspect: "2:3"}
refs: [01-front-neutral]
seed: none
cost_usd: 0.04
scores: {drift: 7, runs: 6, pass_rate: 0.83}
outputs:
  - {path: library/2026-10/example-official-portrait.jpg, sha256: d0affb6f}
tags: [portrait, face-anchor, silver-foil, flash]
created: 2026-10-09
updated: 2026-10-09
retires: none
---
## Prompt
[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs; one peach-orange streak panel through the front bangs on one side, the rest jet-black; a small peach star-shaped hair clip at the side; a thin headset microphone along her cheek; light freckles across the nose and cheeks; grey-green eyes; straight dark brows; glossy coral lips; a cool, direct gaze; natural skin texture with visible pores. wearing a white glossy vinyl top with huge crinkled puffed sleeves and a high ruched neck. A 2:3 portrait on crinkled silver foil under hard on-camera flash: she looks back over her
shoulder, half profile, one hand at her collar, eyes to lens, the headset mic along her cheek, the peach streak and the star
clip clearly visible. 85mm, f/2.8, eye level, deep dark edges, sparkle highlights, fine grain. No text.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, gold jewellery, tattoos, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo

## Notes
- The face anchor for the ref pack (`portrait-official-*.jpg` on the site). Regenerate the whole pack if this changes.
