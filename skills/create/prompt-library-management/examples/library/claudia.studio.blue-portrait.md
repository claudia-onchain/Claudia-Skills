---
id: claudia.studio.blue-portrait
version: 1.0.0
status: approved
character: claudia
identity: CLAUDIA ID v1
pillar: none
series: none
scene: studio-cobalt
look: studio
kind: image
model: fal/flux-2-pro
fallback_models: [google/nano-banana-2.1, openai/gpt-image-2.5-flare]
params: {aspect: "2:3", resolution: "2K"}
refs: [01-front-neutral]
seed: 41120
cost_usd: 0.075
scores: {drift: 7, runs: 4, pass_rate: 1.0}
outputs:
  - {path: library/2026-10/example-blue-portrait.jpg, sha256: aa90c7d1}
tags: [portrait, studio, headshot, press, avatar, cobalt]
created: 2026-10-08
updated: 2026-10-08
retires: none
---
## Prompt
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on her arms (small stars, a rose, a sun).
Structured prompt (FLUX.2 reads JSON well; image 1 is her face reference):
```json
{
  "scene": "studio headshot against a seamless cobalt blue backdrop, color #2f6bff",
  "subjects": [{
    "description": "Claudia, 28-year-old adult woman, glossy jet-black jaw-length blunt bob with heavy straight bangs, vivid copper-orange streak panels through the front bangs and one side, small orange hair clip, thin gold hoops, light freckles, warm brown eyes, straight dark brows",
    "wardrobe": "soft lime-olive unstructured blazer, color #8db04a, over an olive ribbed top",
    "pose": "head and shoulders, square to camera, chin level, a knowing closed-lip half-smile",
    "position": "centred, eyes on the upper third line"
  }],
  "lighting": "large softbox key slightly above and left of camera, white bounce fill right, subtle hair light",
  "camera": "Canon EOS R5, 85mm f/1.8 at f/2.8, eye level, 1/200s",
  "style": "clean editorial headshot, true-to-life skin texture with visible pores, minimal makeup, soft rose lip",
  "mood": "calm, confident, approachable"
}
```

## Negative
(FLUX.2 has no negative prompt — describe what you want; keep "adult" and "28-year-old" in the description.)

## Notes
- Seed 41120 is only for A/B tests of one variable (lens, light) on FLUX; it doesn't carry identity.
- Crops: 512×512 avatar from the face, 400×400 X profile, 320×320 Instagram, 800×800 YouTube.
