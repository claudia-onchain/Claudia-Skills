---
id: claudia.banner.platform
version: 2.0.0
status: approved
character: claudia
identity: CLAUDIA ID v2
pillar: P5
series: banners
scene: the-club
look: club
kind: image
model: google/nano-banana-2.1
fallback_models: [fal/flux-2-pro]
params: {aspect: "3:1", size: "3000x1000"}
refs: [01-front-neutral, 10-club-light]
seed: none
cost_usd: 0.08
scores: {drift: 6, runs: 3, pass_rate: 0.67}
outputs:
  - {path: library/2026-10/example-banner-platform.jpg, sha256: 5d4740a6}
tags: [banner, club, crowd, platform]
created: 2026-10-09
updated: 2026-10-09
retires: none
---
## Prompt
[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs; one peach-orange streak panel through the front bangs on one side, the rest jet-black; a small peach star-shaped hair clip at the side; a thin headset microphone along her cheek; light freckles across the nose and cheeks; grey-green eyes; straight dark brows; glossy coral lips; a cool, direct gaze; natural skin texture with visible pores. wearing a silver quilted puffer. A 3:1 banner in a dark club: her face large at the right of centre, leaning into the lens, one bright
spotlight behind her flaring across the frame, a crowd of dancers in silver puffers soft on both sides. Hard backlight,
warm-silver colour, light haze, 35mm, fine grain. No readable logos, no text.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, gold jewellery, tattoos, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo, readable logos

## Notes
- Matches the site's "What Claudia is" banner (`banner-platform-*.jpg`): one agent, every channel, the crowd follows.
