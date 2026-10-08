---
id: claudia.banner.network
version: 1.0.0
status: approved
character: claudia
identity: CLAUDIA ID v1
pillar: P5
series: none
scene: desk-night
look: cosy-black
kind: image
model: google/nano-banana-pro
fallback_models: [openai/gpt-image-2.5-sunburst]
params: {aspect: "16:9", resolution: "4K", crop: "3:1 centre band"}
refs: [01-front-neutral, 08-seated-cosy, cat-01]
seed: none
cost_usd: 0.24
scores: {drift: 6, runs: 4, pass_rate: 0.75}
outputs:
  - {path: library/2026-10/example-network-banner.png, sha256: e8a3b412}
tags: [banner, 3x1, laptop, network, mcp, api, neon, text-in-image, platform]
created: 2026-10-08
updated: 2026-10-08
retires: none
---
## Prompt
[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks; warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line tattoos on her arms (small stars, a rose, a sun). wearing an oversized fuzzy black knit jumper with sleeves pulled over her hands. Wide 16:9 cinematic image composed for a 3:1 crop. Centre: she rests her cheek on her folded arms on a dark desk
behind an open silver laptop whose lid shows a single glowing pink butterfly sticker, looking into the lens with a sleepy,
knowing smile. A grey tabby cat with white paws sleeps beside the keyboard; a black mug with a pink butterfly print; small
warm desk lights. Left third: a floating, softly glowing stack of social post cards (generic short-video and photo post
layouts with tiny thumbnails of her, no real app logos), connected by thin rose light lines. Right third: a glowing
butterfly-shaped hub in a rounded square, wired with luminous rose and violet cables to small labelled chips reading exactly
"MCP" and "API", a dim globe of city lights, and a few small hexagonal chain-link nodes; a terminal panel with short lines of
monospace text. Blue-violet night palette with rose #ff6fa5 highlights and copper #ff9a6b accents, deep near-black
background, subtle bokeh. 35mm, f/2.8, eye level with the desk.

## Negative
teenager, childlike face, school uniform, long hair, ponytail, blonde, red hair all over, thin highlights, side-swept bangs, extra streaks, plastic skin, airbrushed, heavy makeup, extra fingers, warped hands, text, watermark, logo, real social media logos, garbled letters, extra butterflies, green matrix code

## Notes
- Only "MCP" and "API" are asked for as text — short, in quotes. Fix any letter errors with a GPT Image 2.5 Sunburst
  preserve-list edit rather than rerolling.
- Real platform logos (X, Instagram, TikTok, YouTube) are trademarks: add official marks yourself in design, following each
  brand's guidelines, or leave generic cards.
- Chain icons, if any are labelled, list Solana first.
