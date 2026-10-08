# Worked example: "Rain diaries" episode 12 — thumbnail and Reels cover

The episode is the 13 s rain selfie from `../../short-form-editing/examples/rain-13s-stitch.md`, plus a 4-minute
YouTube "rain walk" vlog that needs a long-form thumbnail.

## Reels / TikTok cover: use a frame, not a new image

The edit already has the perfect cover frame — the laugh at 1.2 s. Pull it at full quality:

```sh
ffmpeg -ss 1.2 -i out/rain-0412-vertical.mp4 -frames:v 1 -q:v 2 work/cover-still.jpg
cp templates/cover.html work/rain-cover-v.html
```

Edits to `work/rain-cover-v.html` `:root`: `--img-pos: 50% 30%`, `--title-size: 170px`, `--text-max: 84%`,
`--text-bottom: 420px`, `--fade: 0deg`. Text: label `12 · rain diaries`, title `Rain check? <em>Never</em>`.

```sh
sh scripts/render-cover.sh work/rain-cover-v.html out/rain-0412-cover.png 1080 1920
ffmpeg -i out/rain-0412-cover.png -vf "crop=1080:1440:0:240" -q:v 3 work/check-grid-3x4.jpg
ffmpeg -i out/rain-0412-cover.png -vf "drawbox=x=0:y=1600:w=1080:h=320:color=red@0.35:t=fill,drawbox=x=960:y=0:w=120:h=1920:color=red@0.35:t=fill" -q:v 3 work/check-ui.jpg
```

Result (rendered on 2026-10-08 with this template from the owner's rain clip): her face sits in the middle third, the
two-line title ends at y ≈ 1500, both lines survive the 3:4 grid crop, nothing under the red UI boxes.

## YouTube thumbnail: generate a 16:9 still

A vertical frame cropped to 16:9 loses her body and looks zoomed, so we generate a proper still (prompt: "Rain diaries"
in `../references/cover-prompt-bank.md`):

```sh
claudia generate image "<rain diaries prompt>" --model google/nano-banana-2.1 \
  --ref refs/claudia/01-front-neutral.jpg,refs/claudia/05-laugh.jpg,refs/claudia/09-phone-arm.jpg \
  --aspect 16:9 --resolution 2K --n 3 --max-usd 0.20
```

≈ $0.15 for three. Scores: 7/7, 6/7 (clip missing), 5/7 (streak on both sides). Kept #1 as `work/cover-still.jpg`
(face right third, empty wet lot on the left).

Template values for 16:9: defaults (`--fade: 90deg`, `--text-bottom: 64px`, `--title-size: 132px`), `--img-pos: 70% 35%`.
Three title options set side by side and judged at 168×94:

| Option | At 168×94 |
|---|---|
| `RAIN CHECK? NEVER` | readable, the rose NEVER pops |
| `I RAN IN THE RAIN` | readable but flat — describes, doesn't tease |
| `ZERO UMBRELLAS, FULL SEROTONIN` | unreadable at small size — too many words |

```sh
sh scripts/render-cover.sh work/rain-cover.html out/rain-walk-thumb-a.png 1280 720
ffmpeg -i out/rain-walk-thumb-a.png -vf scale=168:94 work/check-small.png
ffmpeg -i out/rain-walk-thumb-a.png -q:v 2 out/rain-walk-thumb-a.jpg
```

## Test

Uploaded `thumb-a` (RAIN CHECK? NEVER) and `thumb-b` (I RAN IN THE RAIN) to Test & Compare in YouTube Studio. The tool
judges by watch-time share; we'll log the winner in the prompt library with the still's prompt id.

## Disclosure

- YouTube: "altered or synthetic content" = yes at upload (the video and thumbnail show a realistic AI character).
- Reels: AI info label on; TikTok: AIGC label on.
- Alt text: `Claudia, an AI-generated character with a black bob and copper streaks, laughing into her phone while running
  through a rainy warehouse lot. Title: "Rain check? Never".`
