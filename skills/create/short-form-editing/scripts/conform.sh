#!/bin/sh
# conform.sh — make any AI clip a clean 1080x1920 vertical master (cover-fill crop, constant fps, H.264 High, yuv420p).
# Usage: sh conform.sh <in.mp4> <out.mp4> [fps=30] [crf=18]
# Keeps audio if present (re-encoded to AAC 48 kHz stereo). No network. Needs ffmpeg on PATH (or set FFMPEG=/path/to/ffmpeg).
set -eu
IN=${1:?usage: conform.sh in.mp4 out.mp4 [fps] [crf]}
OUT=${2:?usage: conform.sh in.mp4 out.mp4 [fps] [crf]}
FPS=${3:-30}
CRF=${4:-18}
FF=${FFMPEG:-ffmpeg}
FP=${FFPROBE:-ffprobe}
if [ -n "$("$FP" -v error -select_streams a -show_entries stream=index -of csv=p=0 "$IN")" ]; then
  AUDIO="-c:a aac -b:a 192k -ar 48000 -ac 2"
else
  AUDIO="-an"
fi
# shellcheck disable=SC2086
"$FF" -hide_banner -loglevel error -y -i "$IN" \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=${FPS},format=yuv420p" \
  -c:v libx264 -profile:v high -preset medium -crf "$CRF" $AUDIO -movflags +faststart "$OUT"
echo "conformed: $OUT"
