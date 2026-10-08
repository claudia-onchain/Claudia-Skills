---
name: banner-and-collage-design
description: Designs and exports profile banners and photo collages for an AI influencer — Claudia's 3:1 sunset-bed NYC skyline banner with a serif wordmark, the laptop + glowing butterfly MCP/API network banner, and the travel/lifestyle photo-collage banner with a script wordmark — with full prompts per model, composition for each platform's crop and safe area (X 1500×500, YouTube 2560×1440 with the 1546×423 safe area, LinkedIn 1584×396, Twitch 1200×480, Discord, site 3:1 at 2000/1200/800), ffmpeg crop/collage/overlay/export commands, licensed-font wordmarks added in the edit step, and trademark-safe handling of platform and chain logos. Use when making or refreshing a header, channel art, website hero banner, collage, or any wide composite image.
license: MIT
metadata:
  title: "Banner and collage design"
  category: create
  summary: "Make her 3:1 banners and photo collages — sunset skyline, butterfly network, travel collage — and export every platform size."
  level: intermediate
  tags: "banner, header, channel art, collage, wordmark, fonts, ffmpeg, safe area, x header, youtube banner"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "45 min"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Banner and collage design

Banners are the first thing people see on a profile, and every platform crops them differently. This skill recreates
Claudia's three banner types — the sunset bedroom with the skyline, the butterfly network, and the travel collage —
and shows how to generate a clean master, add the wordmark with a licensed font, place logos legally, and export every
size so nothing important lands under an avatar or outside a safe area.

## When to use this

- New profile headers (X, LinkedIn, Twitch, Discord), YouTube channel art, website hero banners.
- A campaign or season refresh of the banners.
- Building a collage from existing lifestyle stills.
- Any wide composite where text and logos sit on top of generated imagery.

## What you need

- ID block, wardrobe and settings: [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md). Ref pack:
  [../character-consistency/SKILL.md](../character-consistency/SKILL.md) (01 face, 08 seated black knit, 11 golden hour).
- Image keys you bring: `openai` (GPT Image 2.5 can render 3:1 directly), `google` (Nano Banana 2.1 at 4K 16:9).
- `ffmpeg` (any 2024+ build; the commands here avoid `drawtext`, which needs a libfreetype build).
- A design tool for the wordmark PNG (Figma, Affinity, Photopea, Inkscape) and a licensed font (step 5).
- [references/banner-specs.md](references/banner-specs.md) — sizes, crops and safe areas per platform (read before exporting).
- [references/text-fonts-and-logos.md](references/text-fonts-and-logos.md) — font licences, wordmark styles, trademark rules
  for platform and chain logos (read before adding any text or logo).

## Steps

### 1. Choose the banner and its master format

| Banner | Master | Best model | Why |
|---|---|---|---|
| Sunset bed + skyline + serif wordmark | 3:1, 3840×1280 | `openai/gpt-image-2.5-flare` `--resolution 3840x1280` | native 3:1 (edges multiples of 16, ratio ≤ 3:1, edge ≤ 3840; checked 2026-10) |
| Same, best face fidelity | 16:9 4K → crop 3:1 | `google/nano-banana-2.1` `--resolution 4K` | strongest identity with refs; package aspect list has no 3:1 |
| Butterfly network | 3:1, 3840×1280 | GPT Image 2.5 (labels "MCP", "API" must read) | quoted text renders reliably |
| Travel collage | 3000×1000 canvas from 8 tiles | tiles from [../lifestyle-scene-prompts/SKILL.md](../lifestyle-scene-prompts/SKILL.md) | each tile is its own generation; layout is assembled |
| YouTube channel art | 16:9, 2560×1440 | its own generation, composed for the centre band | 3:1 masters lose their edges (see step 7) |

### 2. Compose for the crops before you prompt

Every 3:1 header shares one rule: **her face in the centre-to-right third, wordmark in the left or right third, nothing
important in the bottom-left quarter** (X and LinkedIn put the avatar there) and nothing within ~60 px of the top and
bottom edges (mobile crops). Write that into the prompt as composition.

```text
Composition: ultra-wide 3:1 banner. Her face sits slightly right of centre, eyes at about 45 % of the height. The left
third is calm, darker negative space for a wordmark. Keep the lower-left quarter empty of important detail.
```

### 3. Sunset bed banner (recreates `banner-sunset`)

```text
Create a photoreal ultra-wide 3:1 banner photograph.
Subject: [CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob
and heavy straight bangs just above the brows; vivid copper-orange streak panels through the front bangs and one side; a
small orange hair clip at the side of the bangs; small thin gold hoop earrings; light freckles across the nose and cheeks;
warm brown eyes; straight dark brows; a knowing closed-lip half-smile; natural skin texture with visible pores; fine-line
tattoos on her arms (small stars, a rose, a sun). Match the woman in image 1.
Wardrobe: an oversized fuzzy black knit jumper, sleeves over her hands.
Pose: lying on her front across an unmade white duvet, head resting on her folded arms, face slightly right of centre,
eyes to the lens, knowing closed-lip half-smile.
Setting: a New York bedroom at sunset. Left: a wall of pinned instant photos and trailing pothos, a laptop corner in the
foreground. Right: a floor-to-ceiling window with the Manhattan skyline, a tall art-deco spire and a low orange sun on the
horizon; a film camera and a glass on the sill.
Camera: 35mm lens at mattress height, f/2, focus on her eyes, background softly out of focus.
Light: warm golden backlight with a soft flare, a copper halo in her hair, window bounce on her face. Kodak Portra 400,
gentle grain.
Composition: her face slightly right of centre; the left third calmer and slightly darker for a wordmark; lower-left
quarter empty of important detail.
Constraints: no text, no logos, no extra people.
```

```sh
claudia generate image "$(cat banners/sunset.txt)" --model openai/gpt-image-2.5-flare --resolution 3840x1280 \
  --ref refs/claudia/01-front-neutral.jpg,refs/claudia/08-seated-black-knit.jpg --max-usd 0.30 --dry-run
```

Nano Banana variant: same text as a narrative paragraph, `--model google/nano-banana-2.1 --aspect 16:9 --resolution 4K`
($0.113), then crop to 3:1 (step 6). Add the "CLAUDIA" serif wordmark in step 5 — don't ask the model to letter it unless
you accept redoing it when it misspells.

### 4. Butterfly network banner (recreates `banner-network`)

```text
Create an ultra-wide 3:1 banner, photoreal subject with a glowing UI overlay world.
Subject: [CLAUDIA ID v1] (as above), matching image 1. Oversized fuzzy black knit jumper. Centre: she rests her chin on
her folded arms behind a silver-grey unbranded laptop whose lid shows one glowing pink butterfly; a matte black mug with
a pink butterfly and a sleeping grey tabby cat with white paws at the right of the desk.
Left third: four floating translucent glass "post cards" angled in depth, each showing a small photo of her (rooftop at
sunset, wearing headphones, city skyline) with simple generic UI lines and a small plain circular badge in the top-left
corner where a platform icon will go later. Thin rose-pink light trails connect them toward her.
Right third: a glowing rounded-square hub with a pink outline butterfly #ff6fa5 at its centre, wired by luminous
curving lines to small glass labels reading exactly "MCP" and "API", to eight small plain circular badges (icons added
later), to a glowing night-side globe with city lights at the far right, and to a row of small hexagon badges (chain
icons added later). A dark terminal panel under the hub lists: "Agents", "Create", "Post", "Engage", "Analyze", "Onchain".
Light: deep blue-violet night, rose-pink #ff6fa5 and soft violet glows, laptop light on her face. Gentle film grain.
Constraints: the only words in the image are "MCP", "API" and the six terminal words; no brand logos; no extra people.
```

```sh
claudia generate image "$(cat banners/network.txt)" --model openai/gpt-image-2.5-flare --resolution 3840x1280 \
  --ref refs/claudia/01-front-neutral.jpg,refs/props/laptop-butterfly.jpg,refs/props/cat.jpg --max-usd 0.30
```

Then composite the official platform and chain logo files onto the blank badges (step 5): order the chain badges
**Solana first**. Never let the model draw real logos — they come out distorted, and altering a logo breaks most brand
guidelines. FLUX.2 variant (exact palette): see [examples/network-banner.md](examples/network-banner.md).

### 5. Add wordmarks and logos in the edit step

1. Make the wordmark as a transparent PNG in a design tool: sunset banner = high-contrast serif (Playfair Display 400,
   tracking +120, off-white `#ece9e2`, a thin rose `#ff6fa5` arc and a four-point sparkle); collage = a handwritten
   script (Caveat 600 or a licensed script) in off-white with a rose underline stroke. All Google Fonts used here are
   licensed for commercial use (check each family's licence page; most are SIL OFL; checked 2026-10).
2. Overlay with ffmpeg:

```sh
ffmpeg -i master-3x1.jpg -i wordmark-claudia-serif.png \
  -filter_complex "[1]scale=840:-1[w];[0][w]overlay=180:(H-h)/2" -q:v 3 banner-3x1.jpg
```

3. Logos: download official files from each brand's own kit (X brand toolkit, TikTok developer logo pack, Meta/Instagram
   brand resources, YouTube brand resources, Solana brand assets, …), place them unmodified at their minimum size and
   clear space, and use them only to mean "find me here" or "works with" — never as if they endorse you. Details in
   [references/text-fonts-and-logos.md](references/text-fonts-and-logos.md).

### 6. Crop and export every size

`scripts/banner-export.sh master-3x1.jpg` writes the site sizes and every header (see [scripts/banner-export.sh](scripts/banner-export.sh)):

| Output | Size | Command core |
|---|---|---|
| Site hero 3:1 | 2000×667, 1200×400, 800×267 | `scale=2000:-2` (JPG q3–4, < 250 KB each) |
| X header | 1500×500 | `scale=1500:500` |
| LinkedIn personal | 1584×396 (4:1) | `scale=1584:528,crop=1584:396` (centre band) |
| Twitch profile | 1200×480 (5:2) | `scale=1440:480,crop=1200:480` |
| Discord profile | 680×240 | `scale=720:240,crop=680:240` |
| Discord server | 960×540 | its own 16:9 composition (like YouTube) |

16:9 → 3:1 crop of a Nano Banana master (y offset 45 % keeps the face; adjust per image):

```sh
ffmpeg -i master-16x9.png -vf "crop=iw:trunc(iw/3/2)*2:0:(ih-iw/3)*0.45,scale=3000:1000" -q:v 3 master-3x1.jpg
```

### 7. YouTube needs its own composition

Channel art is 2560×1440 but desktop shows a 2560×423 strip and only the centre **1546×423** is safe on every device
(checked 2026-10). A 3:1 master scaled into it loses the wordmark off the sides — the worked example shows this happen.
Generate a 16:9 image with "her face and the wordmark inside a narrow horizontal band across the exact centre; the
top and bottom thirds are soft out-of-focus room" and check it with the safe-area overlay:

```sh
ffmpeg -i yt-2560x1440.jpg -vf "drawbox=x=507:y=508:w=1546:h=423:color=0xff6fa5@0.9:t=4" -q:v 3 yt-safe-check.jpg
```

### 8. Collage banner (recreates `banner-collage`)

1. Generate 8 tiles as separate lifestyle images (prompts in [templates/collage-grid.md](templates/collage-grid.md)):
   Santorini headphones, wine-glass wink, airplane window, centre close-up (hero), glasses + trading screen, mirror
   selfie, city-night balcony, cat on bed. Same grade on all (Kodak Portra 400 / CineStill 800T for the night tiles).
2. Assemble with `scripts/collage-3x1.sh` (ffmpeg `xstack`, 6 px near-black `#0a0b0d` gutters, 3000×1000 canvas).
3. Overlay the script wordmark over the right-centre tiles.
4. Export with `banner-export.sh`.

### 9. Review at real size

Open the X header at 600 px wide and the LinkedIn banner on a phone-width preview: face clear of the avatar circle,
wordmark readable, no logo cut by a crop, no text artifacts left in the generated layer.

## Templates

- [templates/banner-brief.yaml](templates/banner-brief.yaml) — one brief per banner (concept, master, text, logos, exports).
- [templates/collage-grid.md](templates/collage-grid.md) — the 8-tile layout with coordinates and tile prompts.
- [scripts/banner-export.sh](scripts/banner-export.sh) · [scripts/collage-3x1.sh](scripts/collage-3x1.sh) — ffmpeg helpers.
- Examples: [examples/sunset-wordmark-banner.md](examples/sunset-wordmark-banner.md),
  [examples/network-banner.md](examples/network-banner.md), [examples/travel-collage-banner.md](examples/travel-collage-banner.md).

## Check before you finish

- [ ] Face scored ≥ 6/7 on the drift check; she reads as a woman in her late twenties.
- [ ] Composition respects the avatar zone and the top/bottom crop margins; YouTube checked against 1546×423.
- [ ] Wordmark added from a licensed font; spelled C-L-A-U-D-I-A; no stray generated text left.
- [ ] Logos are official, unmodified files with clear space; chains listed Solana first; no implied endorsement.
- [ ] Site sizes < 250 KB each; X/LinkedIn/Twitch/Discord sizes exported.
- [ ] Profile bio or alt text says the image is AI-generated; provenance sidecars kept.

## Pitfalls

- **Asking the model for the wordmark and logos.** It misspells, invents glyphs and distorts trademarks. Generate clean,
  letter in the edit.
- **One master for every platform.** 3:1 → YouTube fails; LinkedIn's 4:1 crops the top and bottom of a 3:1.
- **Face in the lower-left.** The avatar circle covers it on X and LinkedIn.
- **Over-busy network banners.** Max ~16 elements; tiny badges become noise at 600 px.
- **Mixed grades in a collage.** One tile in teal-orange breaks the set; regrade or regenerate it.
- **Fonts from random sites.** Use fonts with a clear commercial licence; keep the licence file with the design.

## Related skills

- [../lifestyle-scene-prompts/SKILL.md](../lifestyle-scene-prompts/SKILL.md) · [../photoreal-portrait-prompts/SKILL.md](../photoreal-portrait-prompts/SKILL.md)
- [../image-prompting-fundamentals/SKILL.md](../image-prompting-fundamentals/SKILL.md) · [../thumbnails-and-covers/SKILL.md](../thumbnails-and-covers/SKILL.md)
- [../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md) · [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md)
- [../../grow/personal-brand-strategy/SKILL.md](../../grow/personal-brand-strategy/SKILL.md) · [../../grow/x-playbook/SKILL.md](../../grow/x-playbook/SKILL.md)
