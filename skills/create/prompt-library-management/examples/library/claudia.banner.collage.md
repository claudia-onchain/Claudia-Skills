---
id: claudia.banner.collage
version: 1.0.0
status: approved
character: claudia
identity: CLAUDIA ID v1
pillar: P6
series: window-seat
scene: travel
look: mixed
kind: image
model: google/nano-banana-2.1
fallback_models: [byteplus/seedream-4.5, fal/flux-2-pro]
params: {aspect: "4:5", resolution: "2K", tiles: 8, assemble: "3:1 collage in design tool"}
refs: [01-front-neutral, 02-34-left, 05-laugh, 11-golden-hour]
seed: none
cost_usd: 0.41
scores: {drift: 7, runs: 3, pass_rate: 1.0}
outputs:
  - {path: library/2026-10/example-collage-tiles.zip, sha256: 0fd2b9c3}
tags: [banner, 3x1, collage, travel, lifestyle, carousel, tiles]
created: 2026-10-08
updated: 2026-10-08
retires: none
---
## Prompt
Generate each tile separately with this prefix, then assemble. Prefix for every tile:
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on her arms (small stars, a rose, a sun).

Tile 1 (Santorini): wearing a white linen shirt open over a black top, large cream over-ear headphones; sitting on a whitewashed wall above the caldera at golden hour,
blue domes soft in the background, eyes closed, smiling. 50mm, f/2, Portra 400.
Tile 2 (wine wink): wearing a black ribbed cami, layered silver chains with a star pendant; candlelit restaurant table at night, holding a glass of white wine near her face, winking. 50mm, f/1.8.
Tile 3 (airplane window): wearing an oversized fuzzy black knit jumper with sleeves pulled over her hands; seen from behind and slightly to the side, looking out an airplane window at a sunset sea of
clouds. 35mm.
Tile 4 (centre close-up): wearing an oversized fuzzy black knit jumper with sleeves pulled over her hands; close-up, cheek on her folded arms, looking into the lens with a knowing half-smile, warm
desk light. 50mm, f/2. This is the hero tile.
Tile 5 (trading desk): wearing an oversized fuzzy black knit jumper with sleeves pulled over her hands, thin round black glasses; chin on her hand at a desk with monitors showing soft green and red
candlestick charts, out of focus, no readable numbers. 35mm.
Tile 6 (mirror selfie): wearing a black sports bra and high-waist black leggings, hair half-up with the bangs down; standard
gym mirror selfie holding a phone in a plain black case, neutral confident expression. 26mm phone look. Non-sexual framing.
Tile 7 (balcony): wearing a black ribbed cami, layered silver chains with a star pendant; seen from behind on a high-rise balcony at night over a glittering city, hair in a small bun,
a glass on the railing. 35mm, f/2.
Tile 8 (cat): wearing an oversized fuzzy black knit jumper with sleeves pulled over her hands; lying on a white duvet, cheek pressed against a grey tabby cat with white paws, both looking at the
lens. 35mm, f/2.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo, logos on the phone, readable chart numbers

## Notes
- Assemble at 3000×1000 (3:1) with 6–8 px near-black gutters; hero tile 4 in the centre third, wordmark on the right third.
- Cost: 8 tiles × $0.0504 (2K) = $0.40 + one reroll budget.
- The same tiles double as a "window seat" carousel (4:5, 1080×1350).
