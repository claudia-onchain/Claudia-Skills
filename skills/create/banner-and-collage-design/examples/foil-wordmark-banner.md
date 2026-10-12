# Worked example: the silver-foil banner with the script wordmark

Brief: refresh the 3:1 silver-foil banner for the site and X/LinkedIn/Twitch, plus a YouTube version. Approver: the owner.
Cap: $0.60.

## 1. Master (GPT Image 2.5 Flare, native 3:1)

Prompt: the silver-foil prompt from SKILL.md step 3, saved as `banners/foil@v2.txt`.

```sh
claudia generate image "$(cat banners/foil@v2.txt)" --model openai/gpt-image-2.5-flare --resolution 3840x1280 \
  --ref refs/claudia/01-front-neutral.jpg,refs/claudia/08-hand-collar.jpg --dry-run
claudia generate image "$(cat banners/foil@v2.txt)" --model openai/gpt-image-2.5-flare --resolution 3840x1280 \
  --ref refs/claudia/01-front-neutral.jpg,refs/claudia/08-hand-collar.jpg --max-usd 0.30
```

The dry run showed `size: "3840x1280"` and two data-URI images. Output at this size is "more variable" per OpenAI
(checked 2026-10); the first result had a second peach streak on the right side of the centre close-up (5/7).

## 2. Fix (Sunburst edit, preserve list)

```text
Edit image 1. Preserve exactly: her face, freckles, eye colour, expression, the peach streak in the front bangs, the
star clip, the headset mic, the white puffed-sleeve top, the three poses, the silver foil, the chrome stars, the flash
light and the composition. Change only: make the hair on the right side of the centre close-up fully glossy jet-black
(remove the second peach streak there). Do not change anything else.
```

`--model openai/gpt-image-2.5-sunburst --ref out/foil-v2.png --resolution 3840x1280 --max-usd 0.30` → 7/7.

## 3. Wordmark

Figma, 3000×1000 frame: "Claudia" in Great Vibes, height ≈ 300 px, filled with a silver-glitter texture, three small chrome
stars along the tail; a soft dark glow behind it (black 30 %, blur 24) so it reads on the foil. Exported as
`wordmark-script.png` (transparent, 900 px wide). `OFL.txt` saved next to the file.

```sh
ffmpeg -i out/foil-v2-fixed.png -vf "scale=3000:1000" -q:v 2 master-3x1.jpg
ffmpeg -i master-3x1.jpg -i wordmark-script.png -filter_complex "[1]scale=900:-1[w];[0][w]overlay=380:(H-h)/2" \
  -q:v 2 foil-3x1-marked.jpg
sh scripts/banner-export.sh foil-3x1-marked.jpg banners-out foil
```

Exports: `foil-2000.jpg` (152 KB), `-1200` (78 KB), `-800` (45 KB), `-x-1500x500`, `-linkedin-1584x396`,
`-twitch-1200x480`, `-discord-680x240`.

## 4. The YouTube trap (what went wrong first)

Scaling the 3:1 master into 2560×1440 and drawing the 1546×423 safe box showed the wordmark sitting **outside** the safe
area on the left — on phones it would read "laudia" or vanish. So YouTube got its own generation:

```text
… same subject, wardrobe and light … Composition: 16:9 channel art. Her face and a calm area for a wordmark sit inside a
narrow horizontal band across the exact centre of the image (about 60 % of the width, 30 % of the height). The top and
bottom thirds are dark, out-of-focus silver foil with no important detail.
```

`--model google/nano-banana-2.1 --aspect 16:9 --resolution 4K --ref refs/claudia/01-front-neutral.jpg --max-usd 0.15`,
scaled to 2560×1440, wordmark placed at x 560–1200 inside the band, then checked:

```sh
ffmpeg -i yt.jpg -vf "drawbox=x=507:y=508:w=1546:h=423:color=0xff6fa5@0.9:t=4" yt-check.jpg
```

Face and wordmark both inside the box. Total spend ≈ $0.43.

## 5. Ship

Alt text: "AI-generated banner: three portraits of Claudia in a white puffed-sleeve top against silver foil, 'Claudia' in
silver script on the left." Master, wordmark PNG, font licence, brief and sidecars filed under `banners/foil@v2/`.
