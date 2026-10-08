#!/bin/sh
# contact-sheet.sh <anchor.jpg> <candidate1> [candidate2 …up to 8]
# Builds out/contact.jpg: the anchor first (rose frame), then candidates left to right, each 360 px tall.
# Index labels are burned in when this ffmpeg has the drawtext filter (needs libfreetype); otherwise order = index.
# Needs ffmpeg on PATH (or FFMPEG=/path/to/ffmpeg). No network.
set -eu
FF="${FFMPEG:-ffmpeg}"
[ "$#" -ge 2 ] || { echo "usage: $0 anchor.jpg cand1.jpg [cand2 …]" >&2; exit 2; }
[ "$#" -le 9 ] || { echo "at most 8 candidates" >&2; exit 2; }
if "$FF" -hide_banner -filters 2>/dev/null | grep -q " drawtext "; then TEXT=1; else TEXT=0; fi
mkdir -p out
inputs=""; filters=""; labels=""; i=0
for f in "$@"; do
  [ -f "$f" ] || { echo "missing file: $f" >&2; exit 2; }
  inputs="$inputs -i \"$f\""
  colour=$([ "$i" -eq 0 ] && echo "0xff6fa5" || echo "0x0a0b0d")
  label=""
  if [ "$TEXT" -eq 1 ]; then
    tag=$([ "$i" -eq 0 ] && echo "ANCHOR" || echo "$i")
    label=",drawtext=text='$tag':x=12:y=10:fontsize=18:fontcolor=0xece9e2:box=1:boxcolor=0x0a0b0d@0.8"
  fi
  filters="$filters[$i:v]scale=-2:360,pad=iw+8:368:4:4:color=$colour$label[v$i];"
  labels="$labels[v$i]"
  i=$((i+1))
done
eval "$FF -loglevel error -y $inputs -filter_complex \"${filters}${labels}hstack=inputs=$i[out]\" -map \"[out]\" -q:v 3 out/contact.jpg"
[ "$TEXT" -eq 1 ] || echo "note: no drawtext in this ffmpeg; anchor has the rose frame, candidates follow in argument order" >&2
echo "out/contact.jpg"
