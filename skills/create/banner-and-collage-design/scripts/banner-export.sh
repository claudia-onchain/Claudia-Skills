#!/bin/sh
# banner-export.sh — export every header size from one 3:1 master (>= 3000x1000 recommended).
# Usage: sh banner-export.sh master-3x1.jpg [out-dir] [name]
# Needs ffmpeg. No network. Writes JPG q3 (site sizes aim for < 250 KB; lower quality with Q=4 if over).
set -eu
IN="${1:?usage: banner-export.sh master-3x1.jpg [out-dir] [name]}"
OUT="${2:-banners-out}"
NAME="${3:-banner}"
Q="${Q:-3}"
FF="${FFMPEG:-ffmpeg}"
command -v "$FF" >/dev/null 2>&1 || { echo "ffmpeg not found (set FFMPEG=/path/to/ffmpeg)" >&2; exit 4; }
[ -f "$IN" ] || { echo "no such file: $IN" >&2; exit 2; }
mkdir -p "$OUT"
run() { "$FF" -loglevel error -y -i "$IN" -vf "$1" -q:v "$Q" "$OUT/$2"; echo "  $OUT/$2"; }
echo "Exporting from $IN"
# normalise to an exact 3:1 first (centre crop), so every size below starts from the same frame
"$FF" -loglevel error -y -i "$IN" -vf "crop='min(iw,ih*3)':'min(ih,iw/3)',scale=3000:1000" -q:v 2 "$OUT/.master.jpg"
IN="$OUT/.master.jpg"
run "scale=2000:667" "$NAME-2000.jpg"            # site hero
run "scale=1200:400" "$NAME-1200.jpg"
run "scale=800:267"  "$NAME-800.jpg"
run "scale=1500:500" "$NAME-x-1500x500.jpg"       # X header (3:1)
run "scale=1584:528,crop=1584:396" "$NAME-linkedin-1584x396.jpg"   # LinkedIn 4:1, centre band
run "scale=1440:480,crop=1200:480" "$NAME-twitch-1200x480.jpg"     # Twitch 5:2, centre
run "scale=720:240,crop=680:240"   "$NAME-discord-680x240.jpg"     # Discord profile banner
rm -f "$OUT/.master.jpg"
for f in "$OUT/$NAME"-2000.jpg "$OUT/$NAME"-1200.jpg "$OUT/$NAME"-800.jpg; do
  s=$(wc -c < "$f" | tr -d ' ')
  [ "$s" -gt 256000 ] && echo "  warning: $f is $s bytes (> 250 KB) — rerun with Q=4" >&2 || true
done
echo "Done. YouTube (2560x1440, safe 1546x423) and Discord server (960x540) need their own 16:9 composition."
