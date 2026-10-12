# Worked example: the club platform banner

Brief: the site's "What Claudia is" banner — one agent, every channel, the crowd follows. Claudia at the club in the silver
puffer, one spotlight, a crowd in silver behind her. Optional "works with" logos in the left third, chains Solana first.
No other text.

## Route A — Nano Banana 2.1 at 4K 16:9, cropped to 3:1 (identity-led)

Prompt: SKILL.md step 4 (saved as `banners/platform@v1.txt`).

```sh
claudia generate image "$(cat banners/platform@v1.txt)" --model google/nano-banana-2.1 --aspect 16:9 --resolution 4K \
  --ref refs/claudia/01-front-neutral.jpg,refs/claudia/10-club-light.jpg --max-usd 0.15
ffmpeg -i out/platform-16x9.png -vf "crop=iw:trunc(iw/3/2)*2:0:(ih-iw/3)*0.40,scale=3000:1000" -q:v 3 platform-3x1.jpg
```

Check list after the first run:
- Face 7/7: streak, star clip and headset mic all visible; the puffer silver, not gold.
- Two background dancers had sharp faces → edit "make the dancers on the left soft and out of focus, faces turned away".
- The spotlight clipped to pure white over her bangs → regenerated with "the spotlight sits above her head, not behind
  her face".

## Route B — FLUX.2 Pro JSON (light-led)

```json
{
  "scene": "ultra-wide dark club, one bright spotlight, a crowd in silver puffers",
  "subjects": [
    {"description": "Claudia from image 1: 28-year-old adult woman, glossy jet-black jaw-length blunt bob, heavy straight bangs, one peach-orange streak panel, small peach star hair clip, a thin headset mic, freckles", "wardrobe": "a silver quilted puffer", "position": "right of centre", "action": "leaning toward the lens, head tilted, eyes to camera"}
  ],
  "background": "dancers in silver puffers soft and anonymous on both sides, light haze",
  "lighting": "one hard spotlight behind and above her, warm-silver colour, rose #ff6fa5 rim on her cheek",
  "camera": "35mm, f/2, eye level, shallow depth of field on her face",
  "style": "photoreal editorial, gentle film grain, no text, no logos"
}
```

`--model fal/flux-2-pro --aspect 16:9 --ref refs/claudia/01-front-neutral.jpg,refs/claudia/10-club-light.jpg` then crop to 3:1.
Route B gave a cleaner spotlight; Route A held her face better. The owner picked A.

## Logos (edit step, only for the "works with" version)

| Badge | Source | Variant |
|---|---|---|
| X | X brand toolkit (about.x.com) | white |
| Instagram | Meta brand resources | glyph, white |
| TikTok | TikTok developer logo pack | white |
| YouTube | YouTube brand resources | white |
| Discord, Telegram, LinkedIn, Reddit | each brand's press/brand page | white |
| Chains (in order) | Solana brand assets first, then the other supported chains | white/mono |

Placed unmodified at ≥ minimum size with clear space in the dark left third. `logo-sources.md` saved with the design.
None of them is presented as a partner; the banner says "works with", not "partnered with".

## Export

`sh scripts/banner-export.sh platform-3x1.jpg banners-out platform`. At 800 px wide, ten badges were too many to read —
kept six. Alt text: "AI-generated banner: Claudia in a silver puffer under a bright spotlight, a crowd in silver behind her."
