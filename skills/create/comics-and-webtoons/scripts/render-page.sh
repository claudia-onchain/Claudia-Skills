#!/bin/sh
# render-page.sh — render a lettered comic page (strip.html or webtoon.html) to PNG with headless Chrome.
# Usage: sh render-page.sh <page.html> <out.png> <width> <height>
#   strip:   sh render-page.sh templates/strip.html out/strip.png 1080 1350
#   webtoon: sh render-page.sh work/ep01.html out/ep01-full.png 800 <total height printed by the page title>
# Needs Google Chrome or Chromium (CHROME=/path/to/chrome to override). The network is used only for Google Fonts;
# for offline renders put the OFL .ttf files next to the HTML and use @font-face.
set -eu
HTML=${1:?usage: render-page.sh page.html out.png width height}
OUT=${2:?usage: render-page.sh page.html out.png width height}
W=${3:?width missing}
H=${4:?height missing}
if [ -z "${CHROME:-}" ]; then
  for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "$(command -v google-chrome 2>/dev/null || true)" "$(command -v chromium 2>/dev/null || true)" "$(command -v chromium-browser 2>/dev/null || true)"; do
    if [ -n "$c" ] && [ -x "$c" ]; then CHROME=$c; break; fi
  done
fi
[ -n "${CHROME:-}" ] || { echo "Chrome/Chromium not found; set CHROME=/path/to/chrome" >&2; exit 4; }
case "$HTML" in /*) URL="file://$HTML" ;; *) URL="file://$(pwd)/$HTML" ;; esac
case "$OUT" in /*) ABS_OUT=$OUT ;; *) ABS_OUT="$(pwd)/$OUT" ;; esac
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --allow-file-access-from-files --window-size="${W},${H}" --virtual-time-budget=6000 \
  --screenshot="$ABS_OUT" "$URL" >/dev/null 2>&1
[ -s "$ABS_OUT" ] || { echo "render failed: $ABS_OUT is empty" >&2; exit 1; }
echo "rendered ${W}x${H}: $ABS_OUT"
