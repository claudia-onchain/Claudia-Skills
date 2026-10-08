---
id: claudia.p4.rain-selfie
version: 1.1.0
status: approved
character: claudia
identity: CLAUDIA ID v1
pillar: P4
series: forecast-dared-me
scene: warehouse-rain
look: signature
kind: video
model: fal/kling-3-pro
fallback_models: [fal/kling-2.6-pro, google/omni-flash]
first_frame_model: google/nano-banana-2.1
params: {aspect: "9:16", durationSec: 10, audio: true}
refs: [01-front-neutral, 05-laugh, 09-phone-arm]
seed: none
cost_usd: 1.73
scores: {drift: 7, runs: 5, pass_rate: 0.8}
outputs:
  - {path: library/2026-10/example-rain-1.mp4, sha256: 9a41c2e0}
tags: [ugc, selfie, rain, running, motion, city, laugh]
created: 2026-10-08
updated: 2026-10-13
retires: none
---
## First frame
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on her arms (small stars, a rose, a sun). In this shot she is laughing with her mouth wide open, delighted, hair damp at the ends. wearing an olive-green fine-knit crop cami with a scalloped copper-orange edged neckline and small orange embroidered stars, a star pendant on layered silver chains, a red-and-green tartan pleated mini skirt with a studded black belt and hanging silver chains, a chunky silver chain bracelet. Vertical 9:16
front-camera selfie at arm's length while she runs across an empty warehouse lot in light rain at dusk: her outstretched
forearm with fine-line tattoos and the chunky chain bracelet enters from the bottom-left corner holding the phone (phone
not visible), wet black asphalt with puddle reflections, a row of grey roll-up loading-dock doors, yellow concrete bollards,
an overcast blue-grey sky. 24mm phone-lens look, slight wide-angle distortion at the edges, cool ambient light with a warm
skin tone, raindrops on the lens edge. No people, no readable signs, no logos.

## Prompt
Front-camera selfie while running, phone held at arm's length. [0-4s] she runs forward laughing, the camera bouncing gently
with her steps, rain streaks crossing the frame, splashes at her feet; [4-7s] she does a small spin, the background whips
past, she shrieks with laughter; [7-10s] she slows down, catches her breath and grins into the lens with a wink. Her arm and
bracelet stay in the bottom-left of frame the whole time. Keep her face, bob, copper bangs and outfit exactly as in the first
frame. Audio: steady rain, splashing footsteps, her breathless laughter. No music.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo, umbrella, bystanders, melted hand, phone visible in her hand, sunny sky

## Notes
- v1.1.0: added "her arm and bracelet stay in the bottom-left" — v1.0 let the arm drift and fuse with the bracelet.
- Spin is the riskiest beat for face drift; score the frame at 5–6 s.
- Native audio is fine to keep (no music → no Content ID risk on Shorts).
