#!/bin/sh
# render-layer.sh — render an HTML graphics layer (title card, lower third, word card) to a PNG with a transparent
# background, using headless Chrome. No ImageMagick and no ffmpeg freetype needed.
# Usage: sh render-layer.sh <layer.html> <out.png> [width=1080] [height=1920]
# Needs Google Chrome or Chromium. Set CHROME=/path/to/chrome if it isn't found. The network is used only to load
# Google Fonts (put the OFL .ttf files next to the HTML and use @font-face for fully offline renders).
set -eu
HTML=${1:?usage: render-layer.sh layer.html out.png [w] [h]}
OUT=${2:?usage: render-layer.sh layer.html out.png [w] [h]}
W=${3:-1080}
H=${4:-1920}
if [ -z "${CHROME:-}" ]; then
  for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "$(command -v google-chrome 2>/dev/null || true)" "$(command -v chromium 2>/dev/null || true)" "$(command -v chromium-browser 2>/dev/null || true)"; do
    if [ -n "$c" ] && [ -x "$c" ]; then CHROME=$c; break; fi
  done
fi
[ -n "${CHROME:-}" ] || { echo "Chrome/Chromium not found; set CHROME=/path/to/chrome" >&2; exit 4; }
case "$HTML" in /*) URL="file://$HTML" ;; *) URL="file://$(pwd)/$HTML" ;; esac
case "$OUT" in /*) ABS_OUT=$OUT ;; *) ABS_OUT="$(pwd)/$OUT" ;; esac
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --default-background-color=00000000 --window-size="${W},${H}" --virtual-time-budget=4000 \
  --screenshot="$ABS_OUT" "$URL" >/dev/null 2>&1
[ -s "$ABS_OUT" ] || { echo "render failed: $ABS_OUT is empty" >&2; exit 1; }
echo "rendered ${W}x${H} with alpha: $ABS_OUT"
