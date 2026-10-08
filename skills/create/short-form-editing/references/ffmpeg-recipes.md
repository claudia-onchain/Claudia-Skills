# ffmpeg recipes for AI shorts (R1–R12)

Every recipe below was run on 2026-10-08 with ffmpeg 8.1 (macOS) against the owner's reference clips (`rain.mp4`,
`room.mp4`, `lounge.mp4`) and checked with `ffprobe`. Recipes that need libass/freetype are marked; the test build had
neither, so those two are written to the documented filter syntax and guarded in `scripts/burn-captions.sh`.

Conventions: inputs are already conformed (`scripts/conform.sh` → 1080×1920, one fps, yuv420p). `-crf 18` for masters,
`20–22` for previews. Always end with `-movflags +faststart` for web playback.

**zsh users:** write shell variables as `${var}` inside filter strings — zsh treats `$var:l` as a modifier and breaks
`offset=$off:linear=true` (this bit us in testing). Quote optional maps as `-map "0:a?"` — an unquoted `?` is a glob in zsh.

## R1 — Frame sheet for review

```sh
ffmpeg -i clip.mp4 -vf "fps=4,scale=270:-2,tile=8x2" -frames:v 1 sheet.jpg     # 16 frames = first 4 s at 4 fps
ffmpeg -i clip.mp4 -vf "fps=1,scale=240:-2,tile=8x2" -frames:v 1 sheet-1fps.jpg # whole 16 s clip, 1 per second
```

## R2 — Stitch two generations with a crossfade

Clip A 0–7 s, clip B 0–7 s, 0.3 s fade starting at 6.7 s → 13.7 s total (tested).

```sh
ffmpeg -i a.mp4 -i b.mp4 -filter_complex \
 "[0:v][1:v]xfade=transition=fade:duration=0.3:offset=6.7,format=yuv420p[v]" \
 -map "[v]" -c:v libx264 -crf 18 -preset medium -movflags +faststart stitched.mp4
```

`offset` = length of A minus the fade duration. Other transitions that suit UGC: `smoothleft` (fake whip), `fadeblack`
(scene change), `circleopen` (avoid — looks like a template). With audio on both, add
`[0:a][1:a]acrossfade=d=0.3[a]` and `-map "[a]"`.

## R3 — Speed ramp (normal → slow-mo → fast)

0–2 s at 1×, 2–3 s at 0.5× (becomes 2 s), 3–5 s at 1.5× (becomes 1.33 s) → 5.33 s (tested).

```sh
ffmpeg -i in.mp4 -filter_complex \
 "[0:v]trim=0:2,setpts=PTS-STARTPTS[p1];[0:v]trim=2:3,setpts=2.0*(PTS-STARTPTS)[p2];\
[0:v]trim=3:5,setpts=(PTS-STARTPTS)/1.5[p3];[p1][p2][p3]concat=n=3:v=1:a=0,fps=30[v]" \
 -map "[v]" -c:v libx264 -crf 18 ramp.mp4
```

Smoother slow-mo on 24/30 fps sources: add `minterpolate=fps=60:mi_mode=mci` to the slow segment only (slow to render,
can warp hands — check the result).

## R4 — 16:9 clip inside 9:16 over a blurred copy

```sh
ffmpeg -i wide.mp4 -filter_complex \
 "[0:v]split[bg][fg];[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=40,eq=brightness=-0.08[b];\
[fg]scale=1080:-2[f];[b][f]overlay=(W-w)/2:(H-h)/2,setsar=1,format=yuv420p[v]" \
 -map "[v]" -c:v libx264 -crf 20 vertical.mp4
```

## R5 — Punch-in for jump cuts, plus deflicker

```sh
ffmpeg -i in.mp4 -vf "deflicker=mode=pm:size=5,crop=iw/1.15:ih/1.15,scale=1080:1920,setsar=1" -c:v libx264 -crf 18 punch.mp4
```

`crop` without x/y centres the crop. Shift it with `crop=iw/1.15:ih/1.15:(iw-ow)/2:(ih-oh)/2-60` to keep her eyes on the
upper third.

## R6 — L-cut (A's audio carries 0.6 s over B's picture)

Picture cuts at 4.0 s; A's sound runs to 4.6 s and fades; B's sound joins at 4.6 s (tested, 8 s output).

```sh
ffmpeg -i a.mp4 -i b.mp4 -i a.wav -i b.wav -filter_complex \
 "[0:v]trim=0:4,setpts=PTS-STARTPTS[v0];[1:v]trim=0:4,setpts=PTS-STARTPTS[v1];[v0][v1]concat=n=2:v=1:a=0[v];\
[2:a]atrim=0:4.6,afade=t=out:st=4.3:d=0.3,asetpts=PTS-STARTPTS[a0];\
[3:a]atrim=0.6:4,afade=t=in:st=0:d=0.2,asetpts=PTS-STARTPTS,adelay=4600|4600[a1];\
[a0][a1]amix=inputs=2:normalize=0:duration=longest[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -crf 20 -c:a aac -movflags +faststart lcut.mp4
```

J-cut: the mirror image — start B's audio (`adelay`) 0.5 s *before* the picture cut and fade A's out earlier.

## R7 — Seamless loop

Crossfade the clip's last 0.5 s into its first 0.5 s; the output starts at 0.5 s, so playback wraps invisibly
(14.1 s in → 13.6 s out, tested).

```sh
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 in.mp4)
ffmpeg -i in.mp4 -filter_complex \
 "[0:v]split[x][y];[x]trim=start=0.5,setpts=PTS-STARTPTS[main];[y]trim=0:0.5,setpts=PTS-STARTPTS[head];\
[main][head]xfade=transition=fade:duration=0.5:offset=$(echo "${D} - 1.0" | bc),format=yuv420p[v]" \
 -map "[v]" -c:v libx264 -crf 18 loop.mp4
```

## R8 — Duck music under voice

Voice starts at 1.0 s; music drops ~8:1 when she talks.

```sh
ffmpeg -i music.wav -i voice.wav -filter_complex \
 "[1:a]adelay=1000|1000,apad=whole_dur=14,asplit=2[vo][sc];\
[0:a][sc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=350:makeup=1[duck];\
[duck][vo]amix=inputs=2:duration=first:normalize=0[mix]" -map "[mix]" -c:a pcm_s16le mix.wav
```

Then `sh scripts/loudnorm.sh mix.wav mix-norm.wav` and mux:
`ffmpeg -i video.mp4 -i mix-norm.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart out.mp4`.

## R9 — Caption cards without libass: overlay PNGs

Design each caption card in any tool (Figma, Canva, Resolve's Fusion title exported as PNG with alpha), 900 px wide max.
Overlay with timing and a quick fade-in (tested with a generated card):

```sh
ffmpeg -i in.mp4 -loop 1 -i card-01.png -filter_complex \
 "[1:v]format=rgba,fade=t=in:st=0.2:d=0.15:alpha=1[c];\
[0:v][c]overlay=x=(W-w)/2:y=1180:enable='between(t,0.2,2.5)':shortest=1,format=yuv420p[v]" \
 -map "[v]" -map "0:a?" -c:v libx264 -crf 18 -c:a copy captioned.mp4
```

y = 1180 keeps a 180 px card above the bottom 560 px of UI on every app. Chain more cards with more `-loop 1 -i` inputs
and `overlay` steps.

**With libass** (check `ffmpeg -filters | grep subtitles`): `-vf "subtitles=filename=captions.ass:fontsdir=fonts"` —
see `scripts/burn-captions.sh` and the ASS template in `../captions-and-hooks/templates/`.
**With freetype** (`drawtext`): `-vf "drawtext=fontfile=fonts/BarlowCondensed-ExtraBold.ttf:text='RAIN CHECK?':fontsize=96:fontcolor=0xECE9E2:x=(w-text_w)/2:y=420:enable='lt(t,2)'"`.

## R10 — Per-platform exports from the master

```sh
# TikTok / Reels / Shorts: same file works everywhere
ffmpeg -i master.mp4 -c:v libx264 -profile:v high -preset slow -crf 18 -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart name-vertical.mp4
# X: cap the bitrate and the length (140 s on standard accounts)
ffmpeg -i master.mp4 -c:v libx264 -profile:v high -level 4.1 -preset slow -crf 20 -maxrate 12M -bufsize 24M \
  -pix_fmt yuv420p -r 30 -c:a aac -b:a 128k -ar 48000 -t 140 -movflags +faststart name-x.mp4
# Site loop (silent, small): 720x1280, CRF 24, no audio
ffmpeg -i master.mp4 -vf "scale=720:1280" -c:v libx264 -crf 24 -preset slow -an -movflags +faststart name-web.mp4
```

## R11 — Trim settling and tail morph; grab the last clean frame

```sh
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 a.mp4)
ffmpeg -ss 0.5 -to $(echo "${D} - 0.7" | bc) -i a.mp4 -c:v libx264 -crf 18 -an -movflags +faststart a-trim.mp4
ffmpeg -sseof -0.6 -i a.mp4 -frames:v 1 -q:v 2 a-last.jpg      # first frame for the next image-to-video generation
```

## R12 — Blur a garbled sign or logo region

Region x=700, y=100, 300×200, for the first 3 s:

```sh
ffmpeg -i in.mp4 -filter_complex \
 "[0:v]split[m][r];[r]crop=300:200:700:100,boxblur=20:2[b];[m][b]overlay=700:100:enable='lt(t,3)',format=yuv420p[v]" \
 -map "[v]" -map "0:a?" -c:v libx264 -crf 18 -c:a copy clean.mp4
```

## Measure, don't guess

```sh
ffmpeg -hide_banner -nostats -i out.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I:|Peak:)" | tail -2
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,pix_fmt:format=duration,size -of compact out.mp4
```
