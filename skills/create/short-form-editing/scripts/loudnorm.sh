#!/bin/sh
# loudnorm.sh — two-pass EBU R128 normalisation to -14 LUFS integrated, -1 dBTP true peak (safe on TikTok, Reels, Shorts, X).
# Usage: sh loudnorm.sh <in.(mp4|wav|m4a)> <out> [target_lufs=-14] [true_peak=-1]
# Video (if any) is stream-copied; audio becomes AAC 192k 48 kHz for .mp4/.m4a outputs, PCM for .wav.
set -eu
IN=${1:?usage: loudnorm.sh in out [I] [TP]}
OUT=${2:?usage: loudnorm.sh in out [I] [TP]}
I=${3:--14}
TP=${4:--1}
FF=${FFMPEG:-ffmpeg}
J=$("$FF" -hide_banner -nostats -i "$IN" -af "loudnorm=I=${I}:TP=${TP}:LRA=11:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p')
get() { echo "$J" | grep "\"$1\"" | sed 's/.*: "\(.*\)".*/\1/'; }
MI=$(get input_i); MTP=$(get input_tp); MLRA=$(get input_lra); MTH=$(get input_thresh); OFF=$(get target_offset)
[ -n "$MI" ] || { echo "loudnorm: no audio measured in $IN" >&2; exit 1; }
F="loudnorm=I=${I}:TP=${TP}:LRA=11:measured_I=${MI}:measured_TP=${MTP}:measured_LRA=${MLRA}:measured_thresh=${MTH}:offset=${OFF}:linear=true,aresample=48000"
case "$OUT" in
  *.wav) "$FF" -hide_banner -loglevel error -y -i "$IN" -vn -af "$F" -c:a pcm_s16le "$OUT" ;;
  *)     "$FF" -hide_banner -loglevel error -y -i "$IN" -af "$F" -c:v copy -c:a aac -b:a 192k -movflags +faststart "$OUT" ;;
esac
echo "measured ${MI} LUFS / ${MTP} dBTP -> target ${I} LUFS / ${TP} dBTP: $OUT"
