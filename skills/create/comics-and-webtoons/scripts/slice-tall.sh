#!/bin/sh
# slice-tall.sh — cut one tall episode image (exported from Clip Studio, Krita, Photoshop or a canvas tool) into
# fixed-height slices for vertical-scroll comic uploads, scaling to the target width first.
# Usage: sh slice-tall.sh <tall.png|jpg> <out_dir> [width=800] [slice_height=1280]
# Writes 001.jpg, 002.jpg, … (quality 2 ≈ high) and prints the total size. Needs ffmpeg + ffprobe.
set -eu
IN=${1:?usage: slice-tall.sh tall.png out_dir [width] [slice_height]}
OUT=${2:?usage: slice-tall.sh tall.png out_dir [width] [slice_height]}
W=${3:-800}
SH=${4:-1280}
FF=${FFMPEG:-ffmpeg}
mkdir -p "$OUT"
"$FF" -hide_banner -loglevel error -y -i "$IN" -vf "scale=${W}:-2:flags=lanczos" "$OUT/.scaled.png"
H=$(ffprobe -v error -show_entries stream=height -of csv=p=0 "$OUT/.scaled.png")
N=$(( (H + SH - 1) / SH ))
i=0
while [ "$i" -lt "$N" ]; do
  Y=$((i * SH))
  CH=$SH
  [ $((Y + CH)) -le "$H" ] || CH=$((H - Y))
  "$FF" -hide_banner -loglevel error -y -i "$OUT/.scaled.png" -vf "crop=${W}:${CH}:0:${Y}" -q:v 2 "$(printf "%s/%03d.jpg" "$OUT" $((i + 1)))"
  i=$((i + 1))
done
rm -f "$OUT/.scaled.png"
echo "${H}px tall at ${W}px wide → ${N} slices in $OUT"
du -ch "$OUT"/*.jpg | tail -1 | sed 's/total/total size/'
