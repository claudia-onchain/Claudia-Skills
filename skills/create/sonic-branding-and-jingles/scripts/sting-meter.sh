#!/bin/sh
# sting-meter.sh — loudness numbers that mean something for short audio (sonic logos, stings, alerts).
# Integrated loudness is unreliable on 1–2 s files, so this prints the loudest momentary (400 ms) and short-term (3 s)
# values, the integrated value for reference, and the true peak. No network, reads only the file you pass.
# Usage: sh sting-meter.sh <file.(wav|mp3|m4a|mp4)>
set -eu
IN=${1:?usage: sting-meter.sh <audio file>}
FF=${FFMPEG:-ffmpeg}
"$FF" -hide_banner -nostats -i "$IN" -af ebur128=peak=true -f null - 2>&1 | awk -v f="$IN" '
  / M:/ {
    if (match($0, /M: *-?[0-9.]+/)) { m = substr($0, RSTART + 2, RLENGTH - 2) + 0; if (!sm || m > mmax) { mmax = m; sm = 1 } }
    if (match($0, /S: *-?[0-9.]+/)) { s = substr($0, RSTART + 2, RLENGTH - 2) + 0; if (!ss || s > smax) { smax = s; ss = 1 } }
  }
  /^ *I: / { integ = $2 }
  /Peak:/ { tp = $2 }
  END {
    if (!sm) { print "sting-meter: no audio measured in " f > "/dev/stderr"; exit 1 }
    st = (smax <= -100) ? "   n/a (needs 3 s of audio)" : sprintf("%6.1f LUFS", smax)
    printf "%s\n  max momentary  %6.1f LUFS\n  max short-term %s\n  integrated     %6s LUFS (unreliable under ~3 s)\n  true peak      %6s dBTP\n", f, mmax, st, integ, tp
    if (tp + 0 > -1) print "  warning: true peak above -1 dBTP; lower the gain or limit again"
  }'
