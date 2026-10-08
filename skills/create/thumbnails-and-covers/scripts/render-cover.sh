#!/bin/sh
# render-cover.sh — render an HTML cover/thumbnail template to PNG with headless Chrome (no ImageMagick, no ffmpeg freetype).
# Usage: sh render-cover.sh <cover.html> <out.png> [width=1280] [height=720]
# Needs Google Chrome or Chromium. Set CHROME=/path/to/chrome if it isn't found. Network is used only to load Google Fonts
# (or put the OFL .ttf files next to the template and use @font-face for fully offline renders).
set -eu
HTML=${1:?usage: render-cover.sh cover.html out.png [w] [h]}
OUT=${2:?usage: render-cover.sh cover.html out.png [w] [h]}
W=${3:-1280}
H=${4:-720}
if [ -z "${CHROME:-}" ]; then
  for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "$(command -v google-chrome 2>/dev/null || true)" "$(command -v chromium 2>/dev/null || true)" "$(command -v chromium-browser 2>/dev/null || true)"; do
    if [ -n "$c" ] && [ -x "$c" ]; then CHROME=$c; break; fi
  done
fi
[ -n "${CHROME:-}" ] || { echo "Chrome/Chromium not found; set CHROME=/path/to/chrome" >&2; exit 4; }
case "$HTML" in /*) URL="file://$HTML" ;; *) URL="file://$(pwd)/$HTML" ;; esac
case "$OUT" in /*) ABS_OUT=$OUT ;; *) ABS_OUT="$(pwd)/$OUT" ;; esac
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size="${W},${H}" --virtual-time-budget=4000 --screenshot="$ABS_OUT" "$URL" >/dev/null 2>&1
[ -s "$ABS_OUT" ] || { echo "render failed: $ABS_OUT is empty" >&2; exit 1; }
echo "rendered ${W}x${H}: $ABS_OUT"
