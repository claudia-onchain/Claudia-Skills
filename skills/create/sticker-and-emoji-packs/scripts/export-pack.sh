#!/bin/sh
# export-pack.sh — turn a folder of transparent PNG sticker masters into upload-ready static files for Telegram and
# Discord, and report anything over the size limits.
# Usage: sh export-pack.sh <masters_dir> <out_dir>
#   masters: transparent PNGs, ideally 1024 px or larger, one sticker per file, named like 01-gm.png
#   out_dir/telegram/         longest side exactly 512 px, other side ≤ 512 (Telegram static stickers, PNG)
#   out_dir/telegram-emoji/   exactly 100 x 100 px (Telegram custom emoji, PNG)
#   out_dir/telegram-icon.png 100 x 100 px set icon from the first master (≤ 128 KB)
#   out_dir/discord-emoji/    128 x 128 px PNG (Discord's recommended size; 256 KiB max)
#   out_dir/discord-sticker/  320 x 320 px PNG (Discord server stickers; 512 KiB max)
# Specs checked 2026-10 on core.telegram.org/stickers, the Bot API docs and docs.discord.com. Needs ffmpeg + ffprobe.
set -eu
IN=${1:?usage: export-pack.sh masters_dir out_dir}
OUT=${2:?usage: export-pack.sh masters_dir out_dir}
FF=${FFMPEG:-ffmpeg}
mkdir -p "$OUT/telegram" "$OUT/telegram-emoji" "$OUT/discord-emoji" "$OUT/discord-sticker"
fit() { # src dst box pad(yes|no)
  if [ "$4" = yes ]; then
    VF="format=rgba,scale=$3:$3:force_original_aspect_ratio=decrease:flags=lanczos,pad=$3:$3:(ow-iw)/2:(oh-ih)/2:color=0x00000000"
  else
    VF="format=rgba,scale=$3:$3:force_original_aspect_ratio=decrease:flags=lanczos"
  fi
  "$FF" -hide_banner -loglevel error -y -i "$1" -vf "$VF" -frames:v 1 -pix_fmt rgba "$2"
}
size_ok() { # file max_bytes label
  B=$(wc -c < "$1" | tr -d ' ')
  if [ "$B" -gt "$2" ]; then echo "  OVER  $3 $(basename "$1"): $B bytes > $2"; PROBLEMS=$((PROBLEMS + 1)); fi
}
dims() { ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$1"; }
PROBLEMS=0
COUNT=0
FIRST=""
for SRC in "$IN"/*.png; do
  [ -e "$SRC" ] || { echo "no PNG files in $IN" >&2; exit 2; }
  NAME=$(basename "$SRC" .png)
  [ -n "$FIRST" ] || FIRST=$SRC
  ALPHA=$(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of csv=p=0 "$SRC")
  case "$ALPHA" in *a*) : ;; *) echo "  WARN  $NAME has no alpha channel ($ALPHA): it will upload as a rectangle" ; PROBLEMS=$((PROBLEMS + 1)) ;; esac
  fit "$SRC" "$OUT/telegram/$NAME.png" 512 no
  fit "$SRC" "$OUT/telegram-emoji/$NAME.png" 100 yes
  fit "$SRC" "$OUT/discord-emoji/$NAME.png" 128 yes
  fit "$SRC" "$OUT/discord-sticker/$NAME.png" 320 yes
  size_ok "$OUT/discord-emoji/$NAME.png" 262144 "discord-emoji"
  size_ok "$OUT/discord-sticker/$NAME.png" 524288 "discord-sticker"
  echo "  ok    $NAME  telegram $(dims "$OUT/telegram/$NAME.png") · emoji 100x100 · discord 128x128 · sticker 320x320"
  COUNT=$((COUNT + 1))
done
fit "$FIRST" "$OUT/telegram-icon.png" 100 yes
size_ok "$OUT/telegram-icon.png" 131072 "telegram-icon"
echo "$COUNT sticker(s) exported to $OUT · $PROBLEMS problem(s)"
[ "$COUNT" -le 120 ] || echo "  NOTE  Telegram sticker sets hold up to 120 stickers (emoji sets 200); split the pack"
[ "$PROBLEMS" -eq 0 ] || exit 3
