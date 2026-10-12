# Worked example: one week of Claudia content for under $5

Brief: five vertical moments (studio talk, club spotlight, visor reveal, club flash selfie, silver-foil banner) plus one voiceover, for
TikTok/Reels/Shorts and X. Keys: Google and fal.ai (the person's own). Budget $5.

## 1. Price it

`week.csv` (from [templates/shotlist.csv](../templates/shotlist.csv), edited):

```csv
id,kind,model,prompt,text,aspect,duration_sec,n,resolution
k-studio,image,google/nano-banana-2.1,"Vertical still: Claudia talking to camera in the white studio …",,9:16,,1,
k-club,image,google/nano-banana-2.1,"Vertical still: Claudia in the silver puffer under one spotlight, haze …",,9:16,,1,
k-visor,image,google/nano-banana-2.1,"Vertical still: white studio, cloud gown, orange visor half up …",,9:16,,1,
k-flash,image,google/nano-banana-2.1,"Vertical still: flash selfie at the club, laughing …",,9:16,,1,
banner,image,google/nano-banana-2.1,"Wide still: three takes of her on silver foil, hard flash …",,3:2,,1,2K
v-studio,video,fal/kling-2.6-pro,"She laughs halfway through a sentence, locked-off camera",,9:16,5,,
v-club,video,fal/kling-2.6-pro,"She sways to the beat, the spotlight flaring behind her",,9:16,5,,
v-flash,video,fal/kling-2.6-pro,"She laughs into the phone flash and spins once",,9:16,5,,
```

```sh
$ node scripts/estimate-shotlist.mjs week.csv --budget 5
✓ k-studio   image  google/nano-banana-2.1       $  0.0336  list
✓ k-club     image  google/nano-banana-2.1       $  0.0336  list
✓ k-visor    image  google/nano-banana-2.1       $  0.0336  list
✓ k-flash    image  google/nano-banana-2.1       $  0.0336  list
✓ banner     image  google/nano-banana-2.1       $  0.0504  list
✓ v-studio   video  fal/kling-2.6-pro            $  0.7000  list
✓ v-club     video  fal/kling-2.6-pro            $  0.7000  list
✓ v-flash    video  fal/kling-2.6-pro            $  0.7000  list

Total ≈ $2.29 for 8 shot(s) · budget $5.00
Dry run: nothing was sent, no key was used, nothing was spent. …
```

Headroom left for one re-roll per clip. In the CLI the typed "y" is the approval (it approves the job it just priced); in
apps and agents the approval line applies instead. Limits for the week: `weekly-batch` from [media-limits.json](../templates/media-limits.json).

## 2. Stills first, approve, then animate

```sh
$ claudia generate image "Vertical still: Claudia talking to camera in her silver-foil set …" --model google/nano-banana-2.1 --aspect 9:16 --brand claudia --max-usd 0.10
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
ffmpeg -i v-studio.mp4 -vf "crop=720:720:0:160" -c:v libx264 -crf 22 -pix_fmt yuv420p -an -movflags +faststart v-studio-sq.mp4
ffmpeg -ss 1 -i v-studio.mp4 -frames:v 1 -q:v 3 v-studio-poster.jpg
cp v-studio.mp4.json v-studio-sq.mp4.json
```

## 4. Hand off and tally

Each clip goes to a draft with its sidecar (AI label on; TikTok gets `is_aigc`, YouTube `containsSyntheticMedia`, X
`made_with_ai`). Week's spend from `media.spend()`: `{ today: 0.73, month: 2.36, byProvider: { google: { month: 0.22 }, fal: { month: 2.10 } } }`
— within budget, nothing generated without a yes.
