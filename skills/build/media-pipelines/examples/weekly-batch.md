# Worked example: one week of Claudia content for under $5

Brief: five vertical moments (bedroom talk, DJ set, lounge sunglasses, rain run, sunset banner) plus one voiceover, for
TikTok/Reels/Shorts and X. Keys: Google and fal.ai (the person's own). Budget $5.

## 1. Price it

`week.csv` (from [templates/shotlist.csv](../templates/shotlist.csv), edited):

```csv
id,kind,model,prompt,text,aspect,duration_sec,n,resolution
k-room,image,google/nano-banana-2.1,"Vertical still: Claudia talking to camera in her sunset bedroom …",,9:16,,1,
k-club,image,google/nano-banana-2.1,"Vertical still: Claudia in oversized sunglasses at a DJ set, club lights …",,9:16,,1,
k-lounge,image,google/nano-banana-2.1,"Vertical still: lamp-lit vintage lounge, sunglasses half off …",,9:16,,1,
k-rain,image,google/nano-banana-2.1,"Vertical still: running selfie in light rain, warehouse lot at dusk …",,9:16,,1,
banner,image,google/nano-banana-2.1,"Wide still: on a bed by a sunset window, city skyline …",,3:2,,1,2K
v-room,video,fal/kling-2.6-pro,"She laughs halfway through a sentence, slight handheld sway",,9:16,5,,
v-club,video,fal/kling-2.6-pro,"She dances to the beat, lights strobing, sunglasses on",,9:16,5,,
v-rain,video,fal/kling-2.6-pro,"She runs toward the camera laughing, rain streaks",,9:16,5,,
```

```sh
$ node scripts/estimate-shotlist.mjs week.csv --budget 5
✓ k-room     image  google/nano-banana-2.1       $  0.0336  list
✓ k-club     image  google/nano-banana-2.1       $  0.0336  list
✓ k-lounge   image  google/nano-banana-2.1       $  0.0336  list
✓ k-rain     image  google/nano-banana-2.1       $  0.0336  list
✓ banner     image  google/nano-banana-2.1       $  0.0504  list
✓ v-room     video  fal/kling-2.6-pro            $  0.7000  list
✓ v-club     video  fal/kling-2.6-pro            $  0.7000  list
✓ v-rain     video  fal/kling-2.6-pro            $  0.7000  list

Total ≈ $2.29 for 8 shot(s) · budget $5.00
Dry run: nothing was sent, no key was used, nothing was spent. …
```

Headroom left for one re-roll per clip. In the CLI the typed "y" is the approval (it approves the job it just priced); in
apps and agents the approval line applies instead. Limits for the week: `weekly-batch` from [media-limits.json](../templates/media-limits.json).

## 2. Stills first, approve, then animate

```sh
$ claudia generate image "Vertical still: Claudia talking to camera in her sunset bedroom …" --model google/nano-banana-2.1 --aspect 9:16 --brand claudia --max-usd 0.10
  Cost      ≈ $0.0336 · list
  Generate for about $0.0336 on your own key? [y/N] y
  ✓ Done · google · google/nano-banana-2.1
  ~/.claudia/media/library/2026-10/mj_…-1.png
  · image/png · 1.4 MB · 768×1376 · sha256 3f1c…   (a .json provenance sidecar sits next to it)
```

The person rejects `k-club` (hands looked wrong) and re-rolls it once (+$0.034). Then:

```sh
$ claudia generate video "She laughs halfway through a sentence, slight handheld sway" --model fal/kling-2.6-pro --aspect 9:16 --duration 5 --ref ~/.claudia/media/library/2026-10/mj_…-1.png --max-usd 1
  Cost      ≈ $0.70 · list
  Generate for about $0.70 on your own key? [y/N] y
  ██████████░░░░░░░░ running
  ✓ Done · fal · fal/kling-2.6-pro
  ~/.claudia/media/library/2026-10/mj_…-1.mp4
  · video/mp4 · 6.2 MB · 720×1280 · 5 s · sha256 9ab0…
```

## 3. Post-process

```sh
ffmpeg -i v-room.mp4 -vf "crop=720:720:0:160" -c:v libx264 -crf 22 -pix_fmt yuv420p -an -movflags +faststart v-room-sq.mp4
ffmpeg -ss 1 -i v-room.mp4 -frames:v 1 -q:v 3 v-room-poster.jpg
cp v-room.mp4.json v-room-sq.mp4.json
```

## 4. Hand off and tally

Each clip goes to a draft with its sidecar (AI label on; TikTok gets `is_aigc`, YouTube `containsSyntheticMedia`, X
`made_with_ai`). Week's spend from `media.spend()`: `{ today: 0.73, month: 2.36, byProvider: { google: { month: 0.22 }, fal: { month: 2.10 } } }`
— within budget, nothing generated without a yes.
