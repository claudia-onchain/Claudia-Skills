---
id: claudia.p3.lounge-sunglasses
version: 1.1.0
status: approved
character: claudia
identity: CLAUDIA ID v1
pillar: P3
series: sunglasses-on-off
scene: vintage-lounge
look: signature
kind: video
model: fal/kling-2.6-pro
fallback_models: [runway/gen4.5, fal/hailuo-2.3]
first_frame_model: openai/gpt-image-2.5-flare
params: {aspect: "9:16", durationSec: 5, audio: false}
refs: [01-front-neutral, 06-sunglasses]
seed: none
cost_usd: 0.40
scores: {drift: 7, runs: 6, pass_rate: 0.83}
outputs:
  - {path: library/2026-10/example-lounge-1.mp4, sha256: c21f9a7b}
tags: [style, reveal, sunglasses, lamp, vintage, loop, portrait]
created: 2026-10-08
updated: 2026-10-14
retires: none
---
## First frame
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on her arms (small stars, a rose, a sun). wearing an olive-green fine-knit crop cami with a scalloped copper-orange edged neckline and small orange embroidered stars, a star pendant on layered silver chains, a red-and-green tartan pleated mini skirt with a studded black belt and hanging silver chains, a chunky silver chain bracelet, plus oversized black oval sunglasses with dark lenses, worn on her face. Vertical 9:16 medium shot in a lamp-lit
vintage lounge: she leans back against a dark polished wood dresser with brass drop handles, one elbow resting on it, head
tilted slightly, a calm half-smile with a soft rose lip. Warm butter-yellow walls, three framed botanical cross-stitch prints
(red poppies, green leaves) behind her, a brass table lamp with a pleated cream shade on the left glowing tungsten-warm.
50mm lens, f/2.2, eye level, warm 3200K key from the lamp, soft shadow side, Kodak Portra 400 colour, fine grain. Image 1 is
her face reference, image 2 shows her in sunglasses. No text, no logos.

## Prompt
Slow, confident sunglasses reveal. [0-1s] she holds still with the sunglasses on, half-smile; [1-3s] she lifts her right hand
and slowly lowers the sunglasses down her nose with two fingers, revealing warm brown eyes looking straight into the lens;
[3-5s] the half-smile widens slightly, a tiny eyebrow raise. Locked-off camera with an almost imperceptible push-in. Lamp
light flickers very gently. Her face, freckles, bob, copper bangs, orange clip and tattoos stay exactly as in the first frame.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo, aviator sunglasses, coloured lenses, extra fingers on the glasses hand

## Notes
- v1.1.0 (A/B 2026-10-14): 50mm beat 35mm — 35mm widened her jaw and read younger.
- Loop in edit: play forward, then reverse 3–5 s → 8 s seamless "on/off" loop.
- Hands on glasses are the failure point; check frames at 2 s and 3 s.
