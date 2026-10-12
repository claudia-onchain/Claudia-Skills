#!/bin/sh
# animate-layer.sh — put a full-frame transparent PNG layer (from render-layer.sh) on a video with an eased slide + fade
# in, a hold, and an eased slide + fade out. Works with any ffmpeg (no freetype, no libass): only overlay + fade.
# Usage: sh animate-layer.sh <in.mp4> <layer.png> <out.mp4> <start_s> <end_s> [from=left|right|up|down|none] [offset_px=120] [ease_s=0.35]
#   start_s / end_s  when the layer is fully gone before and after (the move happens inside this window)
#   from             direction the layer arrives from; it leaves the same way
#   offset_px        how far it travels (60–160 px reads as "slide", more reads as "fly")
#   ease_s           length of the in and out moves (0.25–0.4 s feels snappy; put the end of the move on a beat)
# Chain it for several layers: the output of one run is the input of the next.
set -eu
IN=${1:?usage: animate-layer.sh in.mp4 layer.png out.mp4 start end [from] [offset] [ease]}
LAYER=${2:?layer png missing}
OUT=${3:?out path missing}
S=${4:?start seconds missing}
E=${5:?end seconds missing}
FROM=${6:-left}
OFF=${7:-120}
D=${8:-0.35}
FF=${FFMPEG:-ffmpeg}
FPS=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$IN")
# progress in (0→1) and out (0→1), cubic ease: arrive fast and settle, leave slowly then fast
PIN="clip((t-$S)/$D,0,1)"
POUT="clip((t-($E-$D))/$D,0,1)"
MOVE="(-$OFF*pow(1-$PIN,3) - $OFF*pow($POUT,3))"
case "$FROM" in
  left)  X="$MOVE";      Y="0" ;;
  right) X="-1*$MOVE";   Y="0" ;;
  up)    X="0";          Y="$MOVE" ;;
  down)  X="0";          Y="-1*$MOVE" ;;
  none)  X="0";          Y="0" ;;
  *) echo "from must be left, right, up, down or none" >&2; exit 2 ;;
esac
FO=$(echo "$E - $D" | bc)
"$FF" -hide_banner -loglevel error -y -i "$IN" -loop 1 -framerate "$FPS" -i "$LAYER" -filter_complex \
  "[1:v]format=rgba,fade=t=in:st=$S:d=$D:alpha=1,fade=t=out:st=$FO:d=$D:alpha=1[l];\
[0:v][l]overlay=x='$X':y='$Y':enable='between(t,$S,$E)':shortest=1:eval=frame,format=yuv420p[v]" \
  -map "[v]" -map "0:a?" -c:v libx264 -profile:v high -preset medium -crf 18 -c:a copy -movflags +faststart "$OUT"
echo "layer on from ${S}s to ${E}s ($FROM, ${OFF}px, ${D}s ease): $OUT"
