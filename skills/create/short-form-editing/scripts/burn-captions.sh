#!/bin/sh
# burn-captions.sh — burn an .ass caption file (word-by-word or line captions) into a vertical master.
# Usage: sh burn-captions.sh <in.mp4> <captions.ass> <out.mp4> [fonts_dir=./fonts]
# Needs an ffmpeg built with libass (the "subtitles" filter). Many slim builds (including some Homebrew core builds)
# don't have it — this script checks first and tells you what to do instead.
# Fonts: put the licensed .ttf files the .ass file names (e.g. Barlow Condensed ExtraBold, DM Sans — both SIL OFL) in fonts_dir.
set -eu
IN=${1:?usage: burn-captions.sh in.mp4 captions.ass out.mp4 [fonts_dir]}
ASS=${2:?usage: burn-captions.sh in.mp4 captions.ass out.mp4 [fonts_dir]}
OUT=${3:?usage: burn-captions.sh in.mp4 captions.ass out.mp4 [fonts_dir]}
FONTS=${4:-./fonts}
FF=${FFMPEG:-ffmpeg}
if ! "$FF" -hide_banner -filters 2>/dev/null | grep -qE " subtitles "; then
  echo "This ffmpeg has no 'subtitles' filter (built without libass)." >&2
  echo "Options: install an ffmpeg build with libass + freetype (Linux distro packages and most static builds have it)," >&2
  echo "or burn captions in CapCut / DaVinci Resolve / Premiere, or overlay pre-rendered PNG caption cards (see references/ffmpeg-recipes.md)." >&2
  exit 4
fi
"$FF" -hide_banner -loglevel error -y -i "$IN" \
  -vf "subtitles=filename='${ASS}':fontsdir='${FONTS}',format=yuv420p" \
  -c:v libx264 -profile:v high -preset medium -crf 18 -c:a copy -movflags +faststart "$OUT"
echo "captions burned: $OUT"
