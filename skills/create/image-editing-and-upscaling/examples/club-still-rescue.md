# Worked example: rescuing a club still (four edits, one upscale, one log)

**Goal.** A 1024×1024 still of Claudia at the club for a Club Diaries post, plus the same image as a 1500×500 X header.

**Source.** `mj_C1…-1.png` from `google/nano-banana-2.1` at 1K ($0.0336). Club look: silver quilted puffer, one bright
spotlight behind her, dancers in silver puffers out of focus, headset mic on.

## Score first

| Check | Result |
|---|---|
| Identity (five anchors) | 5/5: bob, peach streak, star clip, headset mic, freckled face |
| Age reads late twenties | yes |
| Composition | good: face upper third, spotlight halo behind the head |
| Hands | left hand on the cup has six fingers |
| Text / logos | a readable fake brand name on a speaker, back left |
| Size | 1K square; the header needs 3:1 at 1500 wide |

Two defects, identity intact: **edit, don't regenerate.**

## Edit 1: the hand (Sunburst)

```sh
claudia generate image "Edit image 1. Preserve exactly: her face and identity, freckles, grey-green eyes, expression, \
the glossy jet-black jaw-length bob, heavy straight bangs, the one peach-orange streak in the front bangs, the small \
peach star clip, the thin headset mic, outfit, pose, background, lighting and colour grade. Change only: her left \
hand has exactly five naturally proportioned fingers, holding the cup, short natural nails. Fix only that hand." \
  --model openai/gpt-image-2.5-sunburst --ref ./mj_C1-1.png --aspect 1:1 --max-usd 0.10
```

Estimate ~$0.013. Result: five fingers, but the cup turned from frosted to clear. Not acceptable (something outside the
change moved).

**Retry with crop-edit-composite.** The hand sits in a 320×320 box at x 600, y 640:

```sh
ffmpeg -i mj_C1-1.png -vf "crop=320:320:600:640" hand.png
claudia generate image "Edit image 1. Fix only the hand: exactly five naturally proportioned fingers around a frosted \
cup. Keep the cup, colours, light and edges the same." \
  --model openai/gpt-image-2.5-sunburst --ref ./hand.png --aspect 1:1 --max-usd 0.10
ffmpeg -i mj_C1-1.png -i hand-fixed.png -filter_complex "[1]scale=320:320[f];[0][f]overlay=600:640" edit-1.png
```

Seam checked at 200%: clean, because the crop edges fall on the dark puffer and the dark background.

## Edit 2: the speaker logo (Sunburst)

```text
Edit image 1. {PRESERVE} Change only: remove all text, letters and logos from the speaker at the back left. Replace
them with plain matte black speaker grille, same light. Nothing else changes.
```

~$0.013. Clean on the first try.

## Edit 3: outpaint for the header (Nano Banana 2.1)

The X header crops to 3:1 and the avatar circle covers the lower left. Two passes:

```sh
ffmpeg -i edit-2.png -vf "pad=1824:1024:400:0:color=0x808080" padded.png
claudia generate image "Edit image 1. The flat grey areas on the left and right are empty canvas. Extend the scene into \
them: the same dark club, more dancers in silver puffers out of focus, the same single spotlight and haze. Do not \
change anything in the centre. No new faces in focus, no text." \
  --model google/nano-banana-2.1 --ref ./padded.png --aspect 16:9 --resolution 2K --max-usd 0.10
```

$0.0504 at 2K. The second pass was skipped: the 2K 16:9 result is wide enough to crop 3:1 with her face right of
centre and nothing important in the lower-left avatar zone.

## Upscale and export

The square post needs 1080×1350 (4:5 crop) and an archive master at 2048. Local upscale, then exact sizes:

```sh
realesrgan-ncnn-vulkan -i edit-2.png -o edit-2-4x.png -n realesrgan-x4plus
ffmpeg -i edit-2-4x.png -vf "scale=2048:2048:flags=lanczos" club-master-2048.png
ffmpeg -i club-master-2048.png -vf "crop=1638:2048:205:0,scale=1080:1350:flags=lanczos" -q:v 3 club-ig-1080x1350.jpg
ffmpeg -i outpaint-2k.png -vf "crop=iw:iw/3:0:(ih-iw/3)/2,scale=1500:500:flags=lanczos" -q:v 3 club-x-header-1500x500.jpg
```

Skin checked at 100% after the 4x: slightly waxy on the cheek, acceptable after the downscale to 2048.

## Provenance log

| step | parent | output | model / tool | change | cost |
|---|---|---|---|---|---|
| 0 | — | mj_C1-1.png | google/nano-banana-2.1 | source | $0.0336 |
| 1a | mj_C1-1.png | (rejected) | openai/gpt-image-2.5-sunburst | hand, whole image | ~$0.013 |
| 1b | hand.png | hand-fixed.png → edit-1.png | Sunburst + ffmpeg crop/overlay | hand, crop only | ~$0.013 |
| 2 | edit-1.png | edit-2.png | Sunburst | remove speaker logo | ~$0.013 |
| 3 | padded.png (from edit-2) | outpaint-2k.png | google/nano-banana-2.1 2K | extend to 16:9 | $0.0504 |
| 4 | edit-2.png | club-master-2048.png | Real-ESRGAN x4 + lanczos | upscale | $0 |
| final | master / outpaint | club-ig-1080x1350.jpg, club-x-header-1500x500.jpg | ffmpeg | crop and export | $0 |

Total provider spend: about **$0.12**. `c2patool club-ig-1080x1350.jpg` reports no manifest (ffmpeg dropped it), so the
log above, saved as `edit-log.csv` next to the finals with each file's sha256, is the provenance.

## Labels on the post

- Instagram: AI info label on; alt text `AI-generated image: Claudia in a silver quilted puffer at the club, one
  spotlight behind her, holding a frosted cup.`
- X header: the profile already says she is an AI character; the pinned post carries the label.
- Caption, in her voice: `one spotlight, one puffer, five fingers. checked` and the platform's AI label.
