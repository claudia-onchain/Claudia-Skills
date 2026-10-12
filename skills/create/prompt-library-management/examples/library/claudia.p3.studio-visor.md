---
id: claudia.p3.studio-visor
version: 2.0.0
status: approved
character: claudia
identity: CLAUDIA ID v2
pillar: P3
series: visor-on-off
scene: white-studio
look: sky
kind: video
model: fal/kling-3-pro
fallback_models: [google/omni-flash]
first_frame_model: google/nano-banana-2.1
params: {aspect: "9:16", durationSec: 8, resolution: "1080p"}
refs: [01-front-neutral, 04-profile]
seed: none
cost_usd: 0.85
scores: {drift: 7, runs: 3, pass_rate: 0.67}
outputs:
  - {path: library/2026-10/example-visor-1.mp4, sha256: c6d4260f}
tags: [style, reveal, visor, loop]
created: 2026-10-09
updated: 2026-10-09
retires: none
---
## First frame
[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs; one peach-orange streak panel through the front bangs on one side, the rest jet-black; a small peach star-shaped hair clip at the side; a thin headset microphone along her cheek; light freckles across the nose and cheeks; grey-green eyes; straight dark brows; glossy coral lips; a cool, direct gaze; natural skin texture with visible pores. wearing a floor-length cloud-print halter gown with a mint satin halter band and an orange shield visor. Vertical 9:16 frame in a white studio: seamless pale grey-white paper, soft daylight from the left, a
long soft shadow on the floor. She stands three-quarter to camera, one hand behind her back, chin lifted, the orange visor
down over her eyes. 50mm, f/2.8, eye level, clean editorial colour. No text.

## Prompt
Visor reveal, 9:16, 8 seconds, locked-off camera. [0-1s] she holds still with the visor down; [1-4s] she raises one hand and
slowly lifts the visor up into her bangs; [4-6s] eye contact, a tiny eyebrow raise; [6-8s] she lowers the visor again, back
to the first frame for a seamless loop. Her face, freckles, bob, peach streak, star clip and headset mic stay exactly as in
the first frame. The gown barely moves.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, gold jewellery, tattoos, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo

## Notes
- The reveal must land by 0.5–1 s in the edit; trim the head if the model starts slow.
- The visor is always orange. Re-run if it renders any other colour.
