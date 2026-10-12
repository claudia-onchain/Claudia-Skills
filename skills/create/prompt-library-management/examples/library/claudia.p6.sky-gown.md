---
id: claudia.p6.sky-gown
version: 2.0.0
status: approved
character: claudia
identity: CLAUDIA ID v2
pillar: P6
series: lookbook
scene: white-studio
look: sky
kind: image
model: byteplus/seedream-4.5
fallback_models: [google/nano-banana-2.1, fal/flux-2-pro]
params: {aspect: "2:3"}
refs: [01-front-neutral, 07-full-body]
seed: none
cost_usd: 0.04
scores: {drift: 6, runs: 4, pass_rate: 0.75}
outputs:
  - {path: library/2026-10/example-sky-gown.jpg, sha256: c936353c}
tags: [lookbook, editorial, full-length, studio]
created: 2026-10-09
updated: 2026-10-09
retires: none
---
## Prompt
[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs; one peach-orange streak panel through the front bangs on one side, the rest jet-black; a small peach star-shaped hair clip at the side; a thin headset microphone along her cheek; light freckles across the nose and cheeks; grey-green eyes; straight dark brows; glossy coral lips; a cool, direct gaze; natural skin texture with visible pores. wearing a floor-length cloud-print halter gown with a mint satin halter band and an orange shield visor. A 2:3 full-length editorial photograph in a white studio: seamless pale grey-white paper, hard sun-like
light from the left throwing a long shadow on the floor, the gown's train spread on the paper. She stands three-quarter on,
one hand behind her back, chin lifted. 50mm, f/4, slightly low camera, Kodak Portra 400 colour, fine grain. No text.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, gold jewellery, tattoos, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo

## Notes
- Seedream: generate the whole lookbook set as one sequential batch so identity holds across tiles (refs + outputs ≤ 15
  per batch, checked 2026-10).
