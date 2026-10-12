# Motion recipes: ffmpeg, editors and AI video

Read this when you build the type for a short (step 4 of the skill). Pick one route per project and stay on it; mixing
an editor's titles with ffmpeg layers on the same clip makes timing changes painful.

| Route | Best for | Needs |
|---|---|---|
| A. HTML layer + `animate-layer.sh` | title cards, lower thirds, end cards, AI tags; agents without a GUI | Chrome, any ffmpeg |
| B. ASS file (word slams, captions) | word-per-beat kinetic type, karaoke highlight | ffmpeg with libass, or an editor that imports `.ass` |
| C. ffmpeg `drawtext` | one-line labels, counters, quick fades | ffmpeg with freetype (and harfbuzz in recent builds) |
| D. Editor (CapCut, Resolve, Premiere, After Effects) | anything with keyframes, masks, tracking | the editor and its licences |
| E. AI video background | moving backdrops behind the type | a video model; text added afterwards with A–D |

Check what your ffmpeg can do first:

```sh
ffmpeg -hide_banner -filters | grep -E " (drawtext|subtitles|overlay|xfade) "
```

`overlay` and `xfade` are in every build. `drawtext` needs `--enable-libfreetype`; `subtitles` (ASS) needs libass. Slim
builds, such as the ffmpeg 8.1 on this library's test machine, have neither. Route A works on any build.

## A. HTML layer + overlay (tested 2026-10-12, ffmpeg 8.1, Chrome headless)

```sh
sh scripts/render-layer.sh "templates/title-card.html?only=title" work/title.png      # 1080x1920 RGBA
sh scripts/render-layer.sh "templates/title-card.html?only=l3"    work/l3.png
sh scripts/animate-layer.sh work/clip.mp4 work/title.png work/s1.mp4 0.07 4.84 up 80 0.35
sh scripts/animate-layer.sh work/s1.mp4   work/l3.png    work/s2.mp4 4.14 10.94 left 120 0.35
```

What `animate-layer.sh` does: loops the PNG at the clip's frame rate, fades its alpha in over `ease_s`, moves it with a
cubic ease-out (`-offset * (1 - p)^3`), holds, then reverses. The whole layer moves, so render each element that needs
its own timing as its own PNG (`?only=` in the template).

Variations by editing the script's `MOVE` line:

| Feel | Expression for the in-move (p = progress 0→1) |
|---|---|
| Ease-out cubic (default) | `-OFF*pow(1-p,3)` |
| Ease-out quint (snappier) | `-OFF*pow(1-p,5)` |
| Linear (mechanical, for tickers) | `-OFF*(1-p)` |
| Overshoot (playful) | `-OFF*pow(1-p,3) + 18*sin(PI*p)*(1-p)` |

## B. ASS word slams (needs libass to burn)

`node scripts/beat-grid.mjs --bpm <bpm> --offset <s> --words "WORD|WORD|TWO WORDS" --every 1 --out work/words.ass`
writes one word per beat, each popping from 125% to 100% in 120 ms. Burn it with
`sh ../short-form-editing/scripts/burn-captions.sh in.mp4 work/words.ass out.mp4 fonts/`. ASS override tags that are
useful for kinetic type:

| Tag | Effect | Example |
|---|---|---|
| `\fad(in,out)` | alpha fade in ms | `\fad(80,60)` |
| `\t(t1,t2,tags)` | animate tags between ms offsets | `\t(0,120,\fscx100\fscy100)` |
| `\move(x1,y1,x2,y2,t1,t2)` | slide | `\move(540,900,540,820,0,150)` |
| `\fscx` `\fscy` | scale % | pop from `\fscx125\fscy125` |
| `\frz` | rotation | `\frz-4` for a tilted sticker word |
| `\c&HBBGGRR&` | colour (BGR order) | rose `#ff6fa5` = `\c&HA56FFF&` |
| `\blur` | soft edge | `\blur2` on glows |

No libass: import the `.ass` into an editor that reads it, or render each word as its own HTML layer and use route A
with `from=none` and a 0.08 s ease (a hard pop).

## C. drawtext (syntax from the ffmpeg-filters manual; not run here because the test build has no freetype)

Centred title that fades in from 0.2 s to 0.5 s and is gone at 2.5 s:

```sh
ffmpeg -i in.mp4 -vf "drawtext=fontfile=fonts/BarlowCondensed-ExtraBold.ttf:text='DESK AT DUSK':fontsize=132:\
fontcolor=0xECE9E2:borderw=5:bordercolor=0x0A0B0D:x=(w-text_w)/2:y=420:\
alpha='if(lt(t,0.2),0,if(lt(t,0.5),(t-0.2)/0.3,1))':enable='between(t,0.2,2.5)'" -c:a copy out.mp4
```

Slide up 60 px while fading (put the arrival on a beat at 0.5 s): `y='420+60*pow(1-clip((t-0.2)/0.3,0,1),3)'`.
Boxed label: add `box=1:boxcolor=0x0A0B0D@0.86:boxborderw=24`. Long text: `textfile=label.txt` avoids quoting trouble
with apostrophes and colons. Keep every number in drawtext expressions in seconds, and escape commas inside
expressions with `\,` if you don't wrap the value in single quotes.

## D. Editors (checked 2026-10)

- **CapCut:** text templates and auto-captions are quick. Read the licence and US-availability notes in
  [../../short-form-editing/references/editor-notes.md](../../short-form-editing/references/editor-notes.md) before using
  its built-in effects or templates in commercial or sponsored posts.
- **DaVinci Resolve:** Text+ in the Edit page, keyframes in the Inspector, Fusion for anything procedural. Set the
  timeline to 1080×1920 before adding titles so positions don't rescale.
- **Premiere / After Effects:** Essential Graphics templates (`.mogrt`) keep a series look consistent across editors.
- In any editor: build the lower third once, save it as a preset or template, and reuse it. A series look comes from
  repetition, not from new animation every week.

## E. AI video as the moving background

Video models still garble text: letters morph between frames and spelling drifts. Use them for what they are good at,
then add the type with A–D.

- Prompt for a **clean area** where the text will sit: "empty negative space in the upper third, no text, no signs, no
  logos". Generate at 9:16.
- Good backgrounds: slow push-in on a silver-foil backdrop, rose light sweeping across chrome, a blurred club spotlight,
  a disco-ball sparkle loop. 5 s is enough; loop it with a crossfade
  ([../../short-form-editing/references/ffmpeg-recipes.md](../../short-form-editing/references/ffmpeg-recipes.md) R7).
- Price it before you run it: `claudia generate video "<prompt>" --aspect 9:16 --duration 5 --dry-run` shows the model,
  the estimate and today's spend. Text rendered by the model itself is never the final title.
- The finished post is AI-generated media: label it on the platform and keep the provenance sidecar.
