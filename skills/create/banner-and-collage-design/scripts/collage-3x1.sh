#!/bin/sh
# collage-3x1.sh — assemble 8 tiles into a 3000x1000 collage with 6 px near-black gutters.
# Usage: sh collage-3x1.sh A B C D E F G H out.jpg
#   A santorini (top-left)    B wine wink (bottom-left)   C airplane window (tall)   D centre close-up (hero, tall)
#   E trading screen (top)    F balcony (bottom)          G mirror selfie (top-right) H cat on bed (bottom-right)
# Tiles are scaled to cover their cell and centre-cropped, so frame faces near the middle of each tile.
set -eu
[ "$#" -eq 9 ] || { echo "usage: collage-3x1.sh A B C D E F G H out.jpg" >&2; exit 2; }
FF="${FFMPEG:-ffmpeg}"
command -v "$FF" >/dev/null 2>&1 || { echo "ffmpeg not found (set FFMPEG=/path/to/ffmpeg)" >&2; exit 4; }
cell() { echo "scale=$1:$2:force_original_aspect_ratio=increase,crop=$1:$2"; }
"$FF" -loglevel error -y -i "$1" -i "$2" -i "$3" -i "$4" -i "$5" -i "$6" -i "$7" -i "$8" -filter_complex "\
[0]$(cell 594 494)[a];[1]$(cell 594 494)[b];[2]$(cell 444 994)[c];[3]$(cell 894 994)[d];\
[4]$(cell 594 494)[e];[5]$(cell 594 494)[f];[6]$(cell 444 594)[g];[7]$(cell 444 394)[h];\
[a][b][c][d][e][f][g][h]xstack=inputs=8:layout=3_3|3_503|603_3|1053_3|1953_3|1953_503|2553_3|2553_603:fill=0x0a0b0d,\
pad=3000:1000:0:0:0x0a0b0d" -q:v 2 "$9"
echo "wrote $9 (3000x1000). Next: overlay the wordmark PNG, then sh banner-export.sh $9"
