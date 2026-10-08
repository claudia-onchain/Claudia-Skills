# Worked example: full sound pass on the 8-second club clip

Clip: Claudia dancing in front of a DJ booth, sunglasses on, blue-violet haze, she raises one arm at ~5.8 s (like the
owner's `club.mp4`). The clip was generated silent. Destinations: TikTok (brand account), Reels (business), Shorts.

## 1. Licence path

Brand account on all three → no trend sounds from the general libraries. We generate our own bed with ElevenLabs Music
(commercial use within its Music Terms; nightlife isn't a restricted sector) and log it. Short is 8 s, so no YouTube
1-minute issue.

## 2. Beat grid

124 BPM → beat = 60/124 = 0.484 s; bar = 1.935 s. The arm-raise at 5.8 s ≈ 3 bars (5.81 s) — we ask for the drop there.

## 3. Generate (estimate first)

```sh
claudia generate music "deep house club groove, 124 BPM, four-on-the-floor kick, offbeat open hats, rolling bassline, \
short filtered chord stabs, big-room reverb as heard from the dancefloor, filtered intro that opens up into a drop at \
5.8 seconds, instrumental" --model elevenlabs/music-v2.5 --duration 10 --dry-run
# Cost ≈ $0.03 (list $0.15/min, checked 2026-10) → run it, 3 variations
for i in 1 2 3; do claudia generate music "…same prompt…" --model elevenlabs/music-v2.5 --duration 10 --max-usd 0.05 --yes; done
claudia generate sfx "muffled club crowd and bass heard from beside the DJ booth, cheering swells, no music melody" --duration 10 --max-usd 0.05
claudia generate sfx "crowd cheer burst as a track drops, indoor club reverb" --duration 3 --max-usd 0.02
```

Variation 2 had the cleanest drop at 5.9 s. Total audio spend ≈ $0.12.

## 4. Mix (tested command shape)

```sh
ffmpeg -i video/club-0415.mp4 -i audio/bed-v2.mp3 -i audio/crowd.mp3 -i audio/cheer.mp3 -filter_complex \
"[1:a]atrim=0:8,afade=t=out:st=7.5:d=0.5,volume=0dB[m];\
[2:a]atrim=0:8,volume=-9dB[c];\
[3:a]adelay=5800|5800,volume=-6dB[h];\
[m][c][h]amix=inputs=3:normalize=0:duration=first[a]" \
-map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart work/club-mix.mp4
sh ../short-form-editing/scripts/loudnorm.sh work/club-mix.mp4 out/club-0415-vertical.mp4
```

Shift the bed so its drop lands on the arm-raise: if the drop is at 5.9 s and the arm-raise at 5.8 s, trim 0.1 s off
the bed's head (`atrim=0.1:8.1,asetpts=PTS-STARTPTS`).

## 5. Checks

- Phone-speaker test: kick audible, crowd bed not masking the hats. Lowered crowd from -6 to -9 dB.
- Loudness after normalising: about -14 LUFS integrated, true peak under -1 dBTP.
- No speech in this clip, so no ducking. If a voice line is added later, use recipe R8.
- Loop: the bed fades on a bar line at 7.5–8.0 s; the clip's first frame matches the last, so it loops cleanly.

## 6. Log rows

```csv
2026-10-08,club-0415,audio/bed-v2.mp3,music,generated,elevenlabs/music-v2.5,Creator plan,https://elevenlabs.io/music-terms,brand+personal,all (within Music Terms),tiktok;reels;shorts,"deep house club groove, 124 BPM ...",~/.claudia/media/library/2026-10/<job>-1.mp3.json,,drop at 5.9 s
2026-10-08,club-0415,audio/crowd.mp3,sfx,generated,elevenlabs/sfx-v2,Creator plan,https://elevenlabs.io/terms-of-use,brand+personal,all,tiktok;reels;shorts,"muffled club crowd ...",~/.claudia/media/library/2026-10/<job>-1.mp3.json,,
```

Caption at upload: `sunglasses indoors, as the DJ intended` + each platform's AI label.
