---
name: thumbnails-and-covers
description: Designs thumbnails and covers that get tapped — YouTube thumbnails (1280×720), Shorts frame picks, Reels covers (1080×1920 with the 3:4 profile-grid crop), TikTok covers and X/feed stills — in Claudia's brand (Barlow Condensed uppercase, DM Mono labels, near-black, off-white ink, one rose accent). Covers prompting the cover still itself (face big, eyes to lens, negative space for text) across Nano Banana, GPT Image, FLUX.2 and Midjourney, adding text in edit with licensed fonts via a tested HTML + headless-Chrome renderer, crop and legibility checks, series systems and A/B testing with YouTube Test & Compare. Use when a short or video needs a cover, when covers look cluttered or get cropped, or when building a recognisable series look.
license: MIT
metadata:
  title: "Thumbnails and covers"
  category: create
  summary: "Covers that read at thumbnail size: the still, the type, the crops, the checks — in Claudia's editorial look."
  level: intermediate
  tags: "thumbnails, covers, reels cover, youtube thumbnail, design, typography, barlow condensed, a/b test, brand"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "15 min per cover"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Thumbnails and covers

A cover has one job: make someone scrolling at speed recognise Claudia and want the next second. That means one face,
one idea, at most four words, and a layout that survives every crop the apps apply. This skill makes the still, sets the
type in her editorial look, checks the crops and legibility, and keeps a series recognisable.

## When to use this

- Any YouTube upload (long-form needs a custom 1280×720 thumbnail; Shorts use a chosen frame).
- Reels and TikTok covers, especially for series that live on the profile grid.
- Feed stills for X, Threads, Bluesky or Telegram announcements.
- Covers look busy, text gets cut off by the grid, or the series doesn't read as one thing.

## What you need

- A cover still: a frame from the edit (`ffmpeg -ss <t> -i master.mp4 -frames:v 1 -q:v 2 still.jpg`) or a generated
  image (step 2). Image keys if generating: `claudia keys set google|openai|fal`.
- Brand fonts, all SIL Open Font License (commercial use allowed): **Barlow Condensed** 700/800, **DM Sans**, **DM Mono**.
- Google Chrome/Chromium for [scripts/render-cover.sh](scripts/render-cover.sh) (no ImageMagick or ffmpeg freetype needed),
  or any design tool (Figma, Canva with licensed fonts, Resolve/Premiere title export).
- ffmpeg for crops and checks (`drawbox` and `crop` work on slim builds).
- Sizes and crops: [references/cover-specs.md](references/cover-specs.md) (checked 2026-10). Prompts:
  [references/cover-prompt-bank.md](references/cover-prompt-bank.md).

## Steps

### 1. Pick the format and its safe area

| Where | Canvas | What survives | Text zone |
|---|---|---|---|
| YouTube long-form thumbnail | 1280×720 JPG/PNG | whole frame; the duration badge sits bottom-right | left 45 % or right 45 %, never bottom-right corner |
| YouTube Shorts | chosen frame of the video (mobile app) | 9:16 frame | design a strong frame in the edit instead |
| Instagram Reels cover | 1080×1920 | the grid shows the centre **1080×1440 (3:4)**: 240 px cut top and bottom | keep face + title inside the centred **1080×1350** (survives 9:16, 4:5 and 3:4) |
| TikTok cover | chosen frame + in-app text, or uploaded image | 9:16; profile grid crops toward the centre | same centred 1080×1350 rule |
| X / Threads / Bluesky still | 1080×1350 (4:5) for single images, 1600×900 for 16:9 | depends on client | centre third |

Rule for every vertical cover: the title sits **above y = 1500** and below y = 300 (out of the app chrome and inside the grid crop).

### 2. Make (or pick) the still — face big, eyes to lens, room for type

Good cover stills share four traits: her face fills 35–50 % of the frame height on 16:9 (25–35 % on 9:16), eyes look into
the lens, the expression *is* the hook (laugh, raised brow, sunglasses half-down), and one side is quiet enough for text.

Prompt shape: `[CLAUDIA ID v1] + wardrobe + "cover composition: her face on the right third, eyes to lens, <expression>,
empty <surface> on the left third for a title, <light>, 50mm, f/2" + aspect`. Paste the full identity block from
[../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md) where you see `[CLAUDIA ID v1] …`.

```sh
# 16:9 YouTube thumbnail still, Nano Banana 2.1 (≈ $0.05 at 2K, checked 2026-10)
claudia generate image "[CLAUDIA ID v1] … wearing an oversized fuzzy black knit jumper. Cover composition: tight \
close-up, her face on the right third, eyes to lens, a knowing half-smile with one eyebrow raised, chin resting on her \
folded arms on a white duvet. The left 45 percent is a softly blurred floor-to-ceiling window with the Manhattan skyline \
at sunset and plenty of empty sky for a title. Warm golden backlight, gentle lens flare, 50mm lens, f/2, natural skin \
texture, editorial film still. No text, no letters, no logos." \
  --model google/nano-banana-2.1 --ref refs/claudia/01-front-neutral.jpg,refs/claudia/08-seated.jpg \
  --aspect 16:9 --resolution 2K --max-usd 0.10
```

Variants for GPT Image 2.5, FLUX.2 and Midjourney, and five series stills, are in the prompt bank. Always say "No text,
no letters, no logos" — type goes on in step 3, never from the model (models garble words, you can't A/B baked text,
and the brand fonts can't be guaranteed).

Score the still with the drift check in [../character-consistency/SKILL.md](../character-consistency/SKILL.md); a
cover is the most-seen image of a post, so publish only 7/7.

### 3. Set the type in her look

- **Title:** Barlow Condensed 800, UPPERCASE, line-height 0.9, tracking -0.01em, off-white `#ece9e2`. 1–4 words,
  2 lines max. One word may be rose `#ff6fa5`. Size: 110–150 px on 1280×720; 150–190 px on 1080×1920.
- **Label:** DM Mono 500, 18–22 px, UPPERCASE, tracking 0.14em, rose — the series number and name: `01 · rain diaries`.
- **Rule:** one 2 px rose hairline under the title (optional). No boxes, no stickers, no outline strokes, no emoji.
- **Contrast:** a near-black `#0a0b0d` gradient behind the text side (≥ 4.5:1 for the ink on it).
- **AI label:** a small DM Mono `AI-GENERATED` in a corner on covers that leave the platform (site, press, X stills).

Render with the template (tested 2026-10-08 at 1280×720 and 1080×1920):

```sh
cp templates/cover.html work/rain-cover.html && cp stills/rain-cover.jpg work/cover-still.jpg
# edit the :root values (image position, sizes) and the label/title text in work/rain-cover.html, then:
sh scripts/render-cover.sh work/rain-cover.html out/rain-0412-thumb.png 1280 720
sh scripts/render-cover.sh work/rain-cover.html out/rain-0412-cover.png 1080 1920   # set --text-bottom: 420px; --fade: 0deg first
ffmpeg -i out/rain-0412-thumb.png -q:v 2 out/rain-0412-thumb.jpg                     # YouTube: JPG, well under 2 MB
```

If the ffmpeg build has freetype, `drawtext` with `fontfile=BarlowCondensed-ExtraBold.ttf` also works; most slim builds don't have it.

### 4. Check crops and legibility (2 minutes)

```sh
ffmpeg -i cover.png -vf "crop=1080:1440:0:240" -q:v 3 check-grid-3x4.jpg      # what the Reels profile grid shows
ffmpeg -i cover.png -vf "crop=1080:1350:0:285" -q:v 3 check-4x5.jpg           # the strictest centred crop
ffmpeg -i cover.png -vf "drawbox=x=0:y=1600:w=1080:h=320:color=red@0.35:t=fill,drawbox=x=960:y=0:w=120:h=1920:color=red@0.35:t=fill" \
  -q:v 3 check-ui.jpg                                                          # red = app UI on vertical covers
ffmpeg -i thumb.png -vf "scale=168:94" check-small.png                        # YouTube's smallest thumbnail size
```

Pass when: the face and the whole title are inside both crops and outside the red zones, and the title is readable at
168×94 (if not, cut words, not font size).

### 5. Build a series system

A series cover is a template plus one variable. Fix these per series and change only the still and the title:

| Series | Label | Still | Title colour word |
|---|---|---|---|
| Rain diaries | `01 · rain diaries` | arm's-length selfie, laughing, wet lot | weather word in rose |
| Desk nights | `02 · desk nights` | laptop glow, butterfly sticker, cat | the shipped thing in rose |
| After hours | `03 · after hours` | club haze, sunglasses | the track/time in rose |
| Lamp light | `04 · lamp light` | lounge, sunglasses half-down | the reveal word in rose |
| Out of office | `05 · out of office` | travel window/balcony | the place in rose |

Same corner, same size, same gradient side every time — the profile grid should look like a magazine shelf.
See [../content-pillars-and-series/SKILL.md](../content-pillars-and-series/SKILL.md).

### 6. Test

- **YouTube long-form:** Test & Compare in YouTube Studio (desktop) runs up to 3 thumbnails (and titles, as of 2026)
  and picks a winner by **watch-time share**, not clicks. It is not available for Shorts per YouTube's help page and
  third-party guides; some 2026 guides claim otherwise — treat Shorts testing as unverified (checked 2026-10).
- **Reels/TikTok:** no native cover A/B. Alternate two cover styles across consecutive posts of the same series for two
  weeks and compare profile-visit → view rate. Never repost the same video to test covers (duplicate-content penalties).
- Log the winner in the prompt library ([../prompt-library-management/SKILL.md](../prompt-library-management/SKILL.md)).

### 7. Write alt text

`Claudia, an AI-generated character with a black bob and copper streaks, laughing into her phone in the rain at a
warehouse lot. Title: "Rain check? Never".` — describe her, the scene and the title; say AI-generated.

## Templates

- [templates/cover.html](templates/cover.html) — the brand cover (title, label, rule, AI tag), size-agnostic.
- [templates/cover-brief.md](templates/cover-brief.md) — fill-in brief: format, still prompt, title options, checks.
- [scripts/render-cover.sh](scripts/render-cover.sh) — HTML → PNG with headless Chrome.
- [examples/rain-diaries-cover.md](examples/rain-diaries-cover.md) — one episode's thumbnail and Reels cover, start to finish.

## Check before you finish

- [ ] Still scores 7/7 on the drift check; she reads as a woman in her late twenties; nothing sexualised in the crop.
- [ ] No model-rendered text; title set in Barlow Condensed/DM fonts (OFL) or other fonts licensed for commercial use.
- [ ] 1–4 words; readable at 168×94; one rose accent at most.
- [ ] Face + title inside the 3:4 and 4:5 centred crops and outside the app-UI zones (vertical).
- [ ] The cover matches the content (no misleading promise — YouTube treats misleading thumbnails as a policy issue).
- [ ] No real people, no fake platform UI, no fake verification badges, no third-party logos.
- [ ] AI label: platform flag at upload; `AI-GENERATED` tag on covers used off-platform; alt text says AI-generated.

## Pitfalls

- **Text from the model.** Even good text models drift letters at small sizes; you can't change it later.
- **Face in the text zone.** Decide the text side before generating and prompt the empty side explicitly.
- **Grid crop surprise.** A title near the top of a 9:16 cover vanishes on the 3:4 profile grid.
- **Too many words.** A sentence on a cover reads as a caption. Four words max.
- **Thumbnail clickbait.** Claudia's voice is wry, not "YOU WON'T BELIEVE". Under-promise, then deliver.
- **Duration badge.** YouTube's timestamp covers the bottom-right corner; keep text and her face away from it.
- **Upscaled 1K stills** look soft at 1280×720 after platform compression; generate at 2K.

## Related skills

- [../photoreal-portrait-prompts/SKILL.md](../photoreal-portrait-prompts/SKILL.md) · [../banner-and-collage-design/SKILL.md](../banner-and-collage-design/SKILL.md) · [../captions-and-hooks/SKILL.md](../captions-and-hooks/SKILL.md)
- [../short-form-editing/SKILL.md](../short-form-editing/SKILL.md) · [../content-pillars-and-series/SKILL.md](../content-pillars-and-series/SKILL.md) · [../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md)
- [../../grow/youtube-shorts-playbook/SKILL.md](../../grow/youtube-shorts-playbook/SKILL.md) · [../../grow/instagram-reels-playbook/SKILL.md](../../grow/instagram-reels-playbook/SKILL.md) · [../../grow/growth-experiments/SKILL.md](../../grow/growth-experiments/SKILL.md)
