# Worked example: one 13-second rain selfie from two generations

Goal: recreate the feel of the owner's `rain.mp4` — Claudia running through a wet warehouse lot at dusk, phone at arm's
length, laughing — as one continuous-feeling 13 s short. Most models give clean motion for 6–10 s, so we make two
clips and stitch them. Prices are the package's list figures (checked 2026-10); your estimate prints before anything runs.

## 0. Caps first

`~/.claudia/config.json` (the CLI reads `media.limits`):

```json
{ "media": { "limits": { "perJobUsd": 2, "perDayUsd": 10, "approveAboveUsd": 0.5 } } }
```

## 1. First frame (image)

```sh
claudia generate image "[CLAUDIA ID v1] Claudia, a 28-year-old woman (adult, late twenties) … wearing an olive-green \
fine-knit crop cami with a scalloped copper-orange edged neckline and small orange embroidered stars, a star pendant on \
layered silver chains, a red-and-green tartan pleated mini skirt with a studded black belt, a chunky silver chain bracelet. \
Front-camera phone selfie at arm's length, her arm reaching toward the lens, mid-stride, laughing with her mouth open, \
light rain, wet asphalt warehouse lot with roll-up loading-dock doors and yellow bollards, overcast blue-grey dusk sky, \
24mm phone lens, slight motion blur, natural skin texture, 9:16" \
  --model google/nano-banana-2.1 --ref refs/claudia/01-front-neutral.jpg,refs/claudia/05-laugh.jpg,refs/claudia/09-phone-arm.jpg \
  --aspect 9:16 --resolution 2K --max-usd 0.10
```

≈ $0.05. Scored 7/7 → `frames/rain-first.jpg`.

## 2. Clip A — 8 s image-to-video

```sh
claudia generate video "Handheld front-facing phone selfie, she runs forward through light rain holding the phone at \
arm's length, laughing, bangs bouncing, raindrops streaking past the lens, puddles splashing under her steps, the camera \
bobs with each stride, warehouse doors sliding past behind her. Keep her face, hair, copper streaks and outfit exactly as \
in the first frame. Sound: rain on asphalt, her laughter, footsteps splashing, no music." \
  --model fal/kling-3-pro --ref frames/rain-first.jpg --aspect 9:16 --duration 8 --max-usd 1.50
```

≈ $1.34 (8 s × $0.168/s with audio). Review at 0.25×: settling until 0.4 s, a hand melt at 7.5 s → keep 0.5–7.0 s.

## 3. Clip B — continue from A's last clean frame

```sh
ffmpeg -ss 6.9 -i raw/rain-a.mp4 -frames:v 1 -q:v 2 frames/rain-a-last.jpg
claudia generate video "Continuous motion from the first frame, same pace: she keeps running through light rain with the \
phone at arm's length, spins once to show the empty warehouse lot behind her, laughs, slows to a stop and grins at the lens. \
Same face, hair, copper streaks and outfit. Sound: rain, footsteps slowing, breathless laugh, no music." \
  --model fal/kling-3-pro --ref frames/rain-a-last.jpg --aspect 9:16 --duration 7 --max-usd 1.50
```

≈ $1.18. Keep 0.0–6.6 s (tail freeze after 6.6 s). The spin at 3.1–3.6 s showed mild face drift — we hide it with a
0.5× speed ramp *starting* after the spin, and a cut at the end of it.

## 4. Edit

```sh
sh scripts/conform.sh raw/rain-a.mp4 work/rain-a.mp4 30
sh scripts/conform.sh raw/rain-b.mp4 work/rain-b.mp4 30
ffmpeg -ss 0.5 -to 7.0 -i work/rain-a.mp4 -c:v libx264 -crf 18 -c:a aac -b:a 192k work/a.mp4      # 6.5 s
ffmpeg -ss 0.0 -to 6.6 -i work/rain-b.mp4 -c:v libx264 -crf 18 -c:a aac -b:a 192k work/b.mp4      # 6.6 s
ffmpeg -i work/a.mp4 -i work/b.mp4 -filter_complex \
 "[0:v][1:v]xfade=transition=fade:duration=0.3:offset=6.2,format=yuv420p[v];[0:a][1:a]acrossfade=d=0.3[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -crf 18 -c:a aac -b:a 192k -movflags +faststart work/stitched.mp4   # 12.8 s
```

Grade (step 6 of the skill), add a quiet indie bed ducked under the laugh (R8), captions "rain check?" (0.2–1.6 s) and
"never heard of her" (1.6–3.2 s) as PNG cards (R9), then:

```sh
sh scripts/loudnorm.sh work/captioned.mp4 out/rain-0412-vertical.mp4
ffmpeg -i out/rain-0412-vertical.mp4 -vf "crop=1080:1080:0:300,scale=720:720" -an -c:v libx264 -crf 22 -movflags +faststart out/rain-0412-sq.mp4
ffmpeg -ss 1.2 -i out/rain-0412-vertical.mp4 -frames:v 1 -q:v 3 out/rain-0412-poster.jpg
```

## 5. Result

- 12.8 s, 1080×1920, 30 fps, -14.1 LUFS / -1.4 dBTP. Total generation spend ≈ $2.57.
- Drift check: 7/7 on first, middle and last frames.
- Upload notes: TikTok AIGC label on, Reels "AI info" on, Shorts "altered or synthetic content" = yes; music logged as a
  licensed track cleared for business accounts. Caption: `rain check? never heard of her` + platform label.
- Approved by the owner before scheduling.

Why stitch instead of one 13 s generation: long single generations with fast motion are where identity drifts most
(rounder, younger face; extra streaks in the last seconds). Two shorter clips, each starting from an approved frame,
give you two chances to check her and a cut point to hide any bad frames.
