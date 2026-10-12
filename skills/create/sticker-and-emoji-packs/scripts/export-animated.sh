#!/bin/sh
# export-animated.sh — make animated stickers, emoji and reaction GIFs that fit each platform's limits, trying
# progressively smaller encodes until the file fits.
# Usage: sh export-animated.sh <input> <out_file> <mode> [key_colour]
#   input       a video (mp4/mov/webm) or a PNG sequence pattern like frames/f%03d.png (30 fps assumed)
#   mode        tg-sticker   WEBM VP9, longest side 512, ≤ 3 s, ≤ 30 fps, no audio, ≤ 256 KB  (Telegram video sticker)
#               tg-emoji     WEBM VP9, 100 x 100, ≤ 3 s, ≤ 30 fps, no audio, ≤ 256 KB          (Telegram video emoji)
#               tg-icon      WEBM VP9, 100 x 100, ≤ 3 s, ≤ 32 KB                             (Telegram video set icon)
#               discord-emoji  GIF 128 x 128, transparent, ≤ 256 KiB                         (Discord animated emoji)
#               reaction-gif   GIF 480 px wide, ≤ 4 s, no size target                        (reaction GIF to post)
#   key_colour  optional, e.g. 0x00FF00: remove a flat background colour (for AI video made on a solid backdrop)
# Specs checked 2026-10 on core.telegram.org/stickers, the Bot API docs and docs.discord.com. Needs ffmpeg with
# libvpx-vp9 (ffmpeg -encoders | grep vp9) and ffprobe. Exit 0 ok, 3 could not fit the limit, 2 usage.
set -eu
IN=${1:?usage: export-animated.sh input out_file mode [key_colour]}
OUT=${2:?usage: export-animated.sh input out_file mode [key_colour]}
MODE=${3:?mode: tg-sticker | tg-emoji | tg-icon | discord-emoji | reaction-gif}
KEY=${4:-}
FF=${FFMPEG:-ffmpeg}
case "$IN" in *%*) SRC="-framerate 30 -i $IN" ;; *) SRC="-i $IN" ;; esac
PRE="format=rgba"
[ -z "$KEY" ] || PRE="colorkey=$KEY:0.28:0.08,format=rgba"
bytes() { wc -c < "$1" | tr -d ' '; }

webm() { # box pad max_bytes
  if [ "$2" = yes ]; then
    FIT="scale=$1:$1:force_original_aspect_ratio=decrease:flags=lanczos,pad=$1:$1:(ow-iw)/2:(oh-ih)/2:color=0x00000000"
  else
    FIT="scale=$1:$1:force_original_aspect_ratio=decrease:flags=lanczos"
  fi
  for FPS in 30 24; do
    for CRF in 30 36 42 48 54 60 63; do
      # shellcheck disable=SC2086
      "$FF" -hide_banner -loglevel error -y $SRC -t 2.95 \
        -vf "$PRE,fps=$FPS,$FIT,format=yuva420p" -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf "$CRF" \
        -deadline good -row-mt 1 -auto-alt-ref 0 -an "$OUT"
      B=$(bytes "$OUT")
      if [ "$B" -le "$3" ]; then echo "ok: $OUT · $B bytes · crf $CRF · $FPS fps · $(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$OUT")"; return 0; fi
    done
  done
  echo "could not fit $OUT under $3 bytes (last: $B). Shorten the loop, simplify the motion, or reduce detail." >&2
  return 3
}

gif() { # width max_bytes fps_list duration
  for FPS in $3; do
    for COLOURS in 128 64 32; do
      # shellcheck disable=SC2086
      "$FF" -hide_banner -loglevel error -y $SRC -t "$4" -filter_complex \
        "[0:v]$PRE,fps=$FPS,scale=$1:$1:force_original_aspect_ratio=decrease:flags=lanczos,split[a][b];\
[a]palettegen=max_colors=$COLOURS:reserve_transparent=1:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:alpha_threshold=128" \
        -loop 0 "$OUT"
      B=$(bytes "$OUT")
      if [ "$2" -eq 0 ] || [ "$B" -le "$2" ]; then echo "ok: $OUT · $B bytes · $FPS fps · $COLOURS colours · $(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$OUT")"; return 0; fi
    done
  done
  echo "could not fit $OUT under $2 bytes (last: $B). Use fewer frames or a shorter loop." >&2
  return 3
}

case "$MODE" in
  tg-sticker)    webm 512 no 262144 ;;
  tg-emoji)      webm 100 yes 262144 ;;
  tg-icon)       webm 100 yes 32768 ;;
  discord-emoji) gif 128 262144 "20 15 12 10" 3 ;;
  reaction-gif)  gif 480 0 "15" 4 ;;
  *) echo "unknown mode $MODE" >&2; exit 2 ;;
esac
