---
id: claudia.p0.scene-slug
version: 0.1.0
status: draft
character: claudia
identity: CLAUDIA ID v1
pillar: P0
series: none
scene: scene-slug
look: signature
kind: image
model: google/nano-banana-2.1
fallback_models: []
first_frame_model: none
params: {aspect: "9:16", resolution: "2K"}
refs: [01-front-neutral]
seed: none
cost_usd: 0.05
scores: {drift: 0, runs: 0, pass_rate: 0}
outputs:
tags: [format, setting, motion]
created: 2026-10-08
updated: 2026-10-08
retires: none
---
## First frame
(video prompts only — delete for images) [CLAUDIA ID v1] <paste the full identity block> <wardrobe string> <scene, light,
camera, framing for the first frame>

## Prompt
[CLAUDIA ID v1] <paste the full identity block from _blocks/claudia-id-v1.md>
<one wardrobe string from the bible>.
<Format and aspect, e.g. "Vertical 9:16 front-camera phone frame">: <setting with 3–5 concrete props>, <light: source,
direction, colour temperature>, <subject: pose, expression, gaze>, <camera: focal length, aperture, angle, distance>,
<film/colour look>, <what to keep clean, e.g. "No text, no logos">.
(video) <timed beats: [0-3s] … [3-6s] … [6-10s] …>, <one camera move or "locked-off">, <"keep all character details
exactly as in the first frame">, <audio: ambience, SFX, "no music">.

## Negative
<negative block, or "none — this model has no negative prompt; describe what you want">

## Notes
- Why it works:
- Failure points to check (frame times):
- Crops / exports:
- A/B history:
