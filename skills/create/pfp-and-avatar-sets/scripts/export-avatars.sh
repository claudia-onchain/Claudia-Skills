#!/bin/sh
# Export one square avatar master to every platform size, plus circle previews at small sizes.
# Usage: sh scripts/export-avatars.sh <master.png> <name> [outdir]
#   <master.png>  square image, 1024 px or larger (2048 recommended)
#   <name>        file prefix, e.g. claudia-primary-v3
#   [outdir]      default ./avatars
# Needs ffmpeg and ffprobe. No network. Writes only inside outdir.
set -eu

if [ "$#" -lt 2 ]; then
  echo "usage: sh export-avatars.sh <master.png> <name> [outdir]" >&2
  exit 1
fi
src=$1
name=$2
out=${3:-./avatars}
command -v ffmpeg >/dev/null 2>&1 || { echo "ffmpeg not found" >&2; exit 1; }
[ -f "$src" ] || { echo "no such file: $src" >&2; exit 1; }

dims=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$src")
w=${dims%,*}
h=${dims#*,}
if [ "$w" != "$h" ]; then
  echo "master is ${w}x${h}; it must be square. Crop it first." >&2
  exit 2
fi
if [ "$w" -lt 1024 ]; then
  echo "warning: master is ${w}px; upscale to 2048 before exporting (see image-editing-and-upscaling)" >&2
fi

mkdir -p "$out"
ff() { ffmpeg -loglevel error -y "$@"; }

# Square exports. Platforms crop to a circle themselves; upload the square.
ff -i "$src" -vf "scale=2048:2048:flags=lanczos" "$out/$name-master-2048.png"
ff -i "$src" -vf "scale=1080:1080:flags=lanczos" -q:v 3 "$out/$name-1080.jpg"          # Instagram, Threads, TikTok, LinkedIn, Telegram, Discord, Farcaster
ff -i "$src" -vf "scale=800:800:flags=lanczos" -q:v 3 "$out/$name-youtube-800.jpg"       # YouTube (800x800 recommended)
ff -i "$src" -vf "scale=400:400:flags=lanczos" -q:v 3 "$out/$name-x-400.jpg"             # X (400x400 recommended, 2 MB max)
ff -i "$src" -vf "scale=1000:1000:flags=lanczos" -q:v 4 "$out/$name-bluesky-1000.jpg"    # Bluesky (PNG/JPEG, 1,000,000 bytes max)
ff -i "$src" -vf "scale=1000:1000:flags=lanczos" "$out/$name-square-1000.png"            # coin image / launchpad upload

# Circle previews: how it reads in a feed, a reply and a notification.
for s in 400 96 48 32; do
  ff -i "$src" -vf "scale=$s:$s:flags=lanczos,format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='if(lte(hypot(X-W/2,Y-H/2),W/2),255,0)'" \
    "$out/$name-preview-circle-$s.png"
done

# Size checks against the caps we know.
size() { wc -c < "$1" | tr -d ' '; }
check() { # file, max bytes, label
  b=$(size "$1")
  if [ "$b" -gt "$2" ]; then echo "OVER  $3: $(basename "$1") is $b bytes (max $2)"; else echo "ok    $3: $(basename "$1") $b bytes"; fi
}
check "$out/$name-x-400.jpg" 2000000 "X avatar"
check "$out/$name-bluesky-1000.jpg" 1000000 "Bluesky avatar"
check "$out/$name-square-1000.png" 4000000 "claudia launch --image"
check "$out/$name-1080.jpg" 2000000 "general 1080 upload"

echo "done: $out"
echo "next: open $name-preview-circle-48.png and -32.png. Can you still tell who it is?"
