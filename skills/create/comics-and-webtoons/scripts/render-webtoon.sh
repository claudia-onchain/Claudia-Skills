#!/bin/sh
# render-webtoon.sh — render a lettered webtoon.html episode straight to 800 x 1280 slices with headless Chrome.
# Usage: sh render-webtoon.sh <episode.html> <out_dir> [slice_height=1280] [width=800]
#   Measures the episode's total height (the page reports it in its <title>), then renders one viewport per slice by
#   shifting the column with ?y=<offset>. Slices are numbered 001.png, 002.png, … in reading order. The last slice is
#   cropped to the real end of the episode.
# Needs Google Chrome or Chromium (CHROME=/path/to/chrome to override) and ffmpeg (for the last-slice crop and a JPG
# copy of each slice: WEBTOON CANVAS takes JPG or PNG). Network only for Google Fonts.
set -eu
HTML=${1:?usage: render-webtoon.sh episode.html out_dir [slice_height] [width]}
OUT=${2:?usage: render-webtoon.sh episode.html out_dir [slice_height] [width]}
SH=${3:-1280}
W=${4:-800}
FF=${FFMPEG:-ffmpeg}
if [ -z "${CHROME:-}" ]; then
  for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "$(command -v google-chrome 2>/dev/null || true)" "$(command -v chromium 2>/dev/null || true)" "$(command -v chromium-browser 2>/dev/null || true)"; do
    if [ -n "$c" ] && [ -x "$c" ]; then CHROME=$c; break; fi
  done
fi
[ -n "${CHROME:-}" ] || { echo "Chrome/Chromium not found; set CHROME=/path/to/chrome" >&2; exit 4; }
case "$HTML" in /*) URL="file://$HTML" ;; *) URL="file://$(pwd)/$HTML" ;; esac
mkdir -p "$OUT"
case "$OUT" in /*) ABS_OUT=$OUT ;; *) ABS_OUT="$(pwd)/$OUT" ;; esac
CH() { "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --allow-file-access-from-files \
  --virtual-time-budget=8000 "$@" 2>/dev/null; }
TOTAL=$(CH --window-size="${W},${SH}" --dump-dom "$URL" | sed -n 's:.*<title>\([0-9][0-9]*\)</title>.*:\1:p' | head -1)
[ -n "$TOTAL" ] || { echo "could not read the episode height (is the <script> at the end of the page intact?)" >&2; exit 1; }
N=$(( (TOTAL + SH - 1) / SH ))
echo "episode height ${TOTAL}px → ${N} slices of ${W}x${SH}"
i=0
while [ "$i" -lt "$N" ]; do
  Y=$((i * SH))
  F=$(printf "%s/%03d.png" "$ABS_OUT" $((i + 1)))
  CH --window-size="${W},${SH}" --screenshot="$F" "${URL}?y=${Y}" >/dev/null
  [ -s "$F" ] || { echo "render failed at slice $((i + 1))" >&2; exit 1; }
  i=$((i + 1))
done
LAST_H=$((TOTAL - (N - 1) * SH))
if [ "$LAST_H" -lt "$SH" ]; then
  L=$(printf "%s/%03d.png" "$ABS_OUT" "$N")
  "$FF" -hide_banner -loglevel error -y -i "$L" -vf "crop=${W}:${LAST_H}:0:0" "$L.tmp.png" && mv "$L.tmp.png" "$L"
fi
for P in "$ABS_OUT"/[0-9][0-9][0-9].png; do
  "$FF" -hide_banner -loglevel error -y -i "$P" -q:v 2 "${P%.png}.jpg"
done
du -ch "$ABS_OUT"/*.jpg | tail -1 | sed 's/total/total JPG size/'
echo "slices: $ABS_OUT/001…$(printf %03d "$N") (.png and .jpg)"
