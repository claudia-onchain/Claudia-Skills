---
id: claudia.banner.sunset-bed
version: 1.0.0
status: approved
character: claudia
identity: CLAUDIA ID v1
pillar: P1
series: none
scene: sunset-bedroom-nyc
look: cosy-black
kind: image
model: google/nano-banana-pro
fallback_models: [openai/gpt-image-2.5-flare, google/nano-banana-2.1]
params: {aspect: "16:9", resolution: "4K", crop: "3:1 centre band"}
refs: [01-front-neutral, 08-seated-cosy, 11-golden-hour]
seed: none
cost_usd: 0.24
scores: {drift: 7, runs: 3, pass_rate: 1.0}
outputs:
  - {path: library/2026-10/example-sunset-banner.png, sha256: 51d0e7aa}
tags: [banner, 3x1, sunset, bedroom, skyline, golden-hour, header]
created: 2026-10-08
updated: 2026-10-08
retires: none
---
## Prompt
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on her arms (small stars, a rose, a sun). wearing an oversized fuzzy black knit jumper with sleeves pulled over her hands. Wide 16:9 photograph composed for a 3:1 crop (keep everything important in the middle horizontal band).
She lies on her stomach on an unmade white duvet, chin resting on her folded arms, face slightly right of centre, looking
straight into the lens with a knowing half-smile. Behind her on the right, a floor-to-ceiling window with the Manhattan
skyline at sunset, a slender art-deco spire, the low orange sun near the horizon and a soft lens flare; on the left, a white
wall covered in pinned instant photos and a trailing pothos plant, plus the corner of an open laptop on the bed. A film camera
and two glasses catch the light on the windowsill. Golden backlight rims her hair and the copper streaks glow; warm bounce
fill on her face. 35mm lens, f/2, low angle at bed height, shallow depth of field, Kodak Portra 400 look, fine grain.
Leave the left third calm and slightly darker for a wordmark. No text.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo

## Notes
- Crop: `ffmpeg -i in.png -vf "crop=iw:iw/3:0:(ih-iw/3)/2,scale=1500:500" -q:v 3 x-header.jpg` (X header 1500×500).
- Add the "CLAUDIA" wordmark in a design tool with a licensed font; don't ask the model to letter it.
- YouTube banner 2560×1440 needs her face inside the 1546×423 safe area — regenerate at 16:9 rather than cropping this.
