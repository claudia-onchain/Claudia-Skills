# Worked example: the butterfly network banner (MCP / API)

Brief: the platform banner — Claudia at her laptop, social post cards floating on the left, a glowing butterfly hub wired
to "MCP", "API", social badges, a globe and chain badges on the right. Text that must read: "MCP", "API", six terminal
words. Logos: composited from official files, chains Solana first.

## Route A — GPT Image 2.5 Flare, native 3:1 (text-led)

Prompt: SKILL.md step 4 (saved as `banners/network@v1.txt`).

```sh
claudia generate image "$(cat banners/network@v1.txt)" --model openai/gpt-image-2.5-flare --resolution 3840x1280 \
  --ref refs/claudia/01-front-neutral.jpg,refs/props/laptop-butterfly.jpg,refs/props/cat.jpg --max-usd 0.30
```

Check list after the first run:
- "MCP" and "API" spelled right; terminal words "Agents, Create, Post, Engage, Analyze, Onchain" — "Analyze" came out
  "Analyse" (acceptable, but the brief said US spelling) → fixed in the edit with the exact quoted word.
- Badges blank as asked (two had invented glyphs → edit "make these two badges plain dark glass circles").
- Face 6/7 (clip hidden behind her arm — fine).

## Route B — FLUX.2 Pro JSON (palette-led), text added later

```json
{
  "scene": "ultra-wide night desk scene with a glowing network diagram world around a woman at a laptop",
  "subjects": [
    {"description": "Claudia from image 1: 28-year-old adult woman, glossy jet-black jaw-length blunt bob, heavy straight bangs, copper-orange streak panels, small orange hair clip, thin gold hoops, freckles", "wardrobe": "oversized fuzzy black knit jumper", "position": "centre", "action": "chin resting on folded arms behind a laptop, knowing half-smile to camera"},
    {"description": "grey tabby cat with white paws from image 3", "position": "right of centre on the desk", "action": "asleep"}
  ],
  "props": "silver-grey unbranded laptop from image 2 with one glowing pink butterfly on the lid, matte black mug with a pink butterfly",
  "left": "four floating translucent glass post cards in depth with small photos of the same woman and blank circular badges",
  "right": "a glowing rounded-square hub with an outline butterfly #ff6fa5, luminous curved wires to blank glass tags, blank circular badges, a row of blank hexagon badges, and a night-side globe with city lights at the far right",
  "lighting": "deep blue-violet night #1a1640, rose #ff6fa5 and violet #8a6bff glows, laptop light on her face",
  "camera": "35mm, desk height, shallow depth of field on her face",
  "style": "photoreal subject with clean holographic UI elements, gentle film grain, no text, no logos"
}
```

`--model fal/flux-2-pro --aspect 16:9 --ref refs/claudia/01-front-neutral.jpg,refs/props/laptop-butterfly.jpg,refs/props/cat.jpg`
then crop to 3:1. All labels ("MCP", "API", terminal lines) added as DM Mono / Barlow Condensed text layers.
Route B took longer but gave pixel-exact rose glows; Route A was faster. The owner picked B.

## Logos (edit step)

| Badge | Source | Variant |
|---|---|---|
| X | X brand toolkit (about.x.com) | white |
| Instagram | Meta brand resources | glyph, white |
| TikTok | TikTok developer logo pack | white |
| YouTube | YouTube brand resources | white |
| Discord, Telegram, LinkedIn, Reddit | each brand's press/brand page | white |
| Chains (hexagons, in order) | Solana brand assets first, then the other supported chains | white/mono |

Placed unmodified at ≥ minimum size with clear space, on the blank badges. `logo-sources.md` saved with the design.
None of them is presented as a partner; the banner says "works with", not "partnered with".

## Export

`sh scripts/banner-export.sh network-3x1.jpg banners-out network`. At 800 px wide, 16 badges were too many to read —
removed four and enlarged the rest. Alt text: "AI-generated banner: Claudia at a laptop with a butterfly sticker,
surrounded by floating social posts and a glowing butterfly hub connected to MCP and API labels."
