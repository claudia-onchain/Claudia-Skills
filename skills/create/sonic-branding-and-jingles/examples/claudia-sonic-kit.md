# Example: Claudia's sonic kit

Claudia is an AI character who lives in a glossy studio world (white paper, silver foil, a cobalt backdrop, the club)
and loves house and disco edits. Her operator builds a sonic kit for shorts, her long videos, her avatar explainers and
stream alerts. All numbers are from this example.

## Step 1: brief (excerpt)

```yaml
personality: ["warm", "dry", "glossy"]
never: ["casino win sounds", "cheesy radio jingle", "rocket or 'to the moon' whooshes", "any famous sonic logo"]
worlds:
  - "white studio: a camera flash pop, paper rustle"
  - "the club: a muffled four-on-the-floor kick through a wall"
  - "silver foil: a crinkle, a glitter shimmer"
```

## Step 2: the motif

- Notes: **E5 – G#5 – B5 – A5** (E major: a quick rising arpeggio, then one step down, like a wink).
- Rhythm: three 1/16 notes, then A5 held for a 1/4 note at 124 BPM: about 0.85 s.
- Timbre: a bright bell synth with a short decay. Texture: a camera flash pop and a disco-ball shimmer.
- Written and played by the operator on a MIDI keyboard in GarageBand; the project is saved with the date.
- Hum test: 4 of 5 people hummed it back the next day (the fifth remembered "the flash thing").

## Step 3: candidates

```sh
claudia generate sfx "bright camera flash pop followed by a short glittering shimmer, clean, no music" --duration 1.5 --max-usd 0.05
claudia generate sfx "soft disco-ball shimmer, tiny glitter sparkles panning slowly, clean, no music" --duration 2 --max-usd 0.05
claudia generate music "a 4-second disco-house intro sting, 124 BPM, filtered chord stab, punchy kick, bright bell synth \
  playing a short rising motif then one note down, ends on a clean hit, instrumental, no vocals" \
  --model elevenlabs/music-v2.5 --duration 4 --max-usd 0.05
claudia generate sfx "short airy two-note chime, soft bell, rising, clean, no reverb tail" --duration 0.8 --max-usd 0.05
```

| Batch | Count | Seconds | Cost |
|---|---|---|---|
| SFX textures and alerts | 12 | ~20 s | ~$0.04 |
| Music stings (4–6 s) | 6 | ~30 s | ~$0.08 |
| Bed loop (music 30 s + an SFX shimmer loop with `meta: { loop: true }`) | 3 | ~70 s | ~$0.16 |
| **Total** | 21 | | **~$0.28** |

## Step 4: picking, and the one that sounded familiar

- The strongest alert candidate was a three-note rising chime. Two of five listeners said "that's my phone's message
  sound". Dropped, even though nobody could name the exact source.
- The music stings had good drums and chord stabs, but none played her motif cleanly. The operator kept the drums and
  the filtered chord from one sting, muted its melody, and played the E–G#–B–A motif on top.
- Final logo (1.8 s): flash pop → motif on the bell synth → a soft shimmer tail. Intro sting (4.5 s): kick and chord
  stab from the AI sting, motif on top, a filter sweep into a clean hit. Alert (0.6 s): the first two notes of the
  motif, E–G#, on the same bell.

## Step 5: rights

- ElevenLabs music and SFX on the operator's paid plan; terms page saved with the date; no artist or song in any prompt.
- No Lyria output used in the kit (no clear published commercial terms at the time).
- Human authorship: the motif and the arrangement are the operator's; the AI layers are texture and drums.
- Soundalike check against ten well-known tech and media sonic logos: no shared first three notes and rhythm.
- Sound mark: parked until the logo has been in use for six months; then a trademark lawyer reviews it.

## Step 6: mastering (sting-meter output)

```text
claudia_logo_1.8s_main.wav
  max momentary   -13.2 LUFS
  max short-term    n/a (needs 3 s of audio)
  integrated      -14.9 LUFS (unreliable under ~3 s)
  true peak        -1.4 dBTP
```

Placed in a test edit with her voice-over at -14 LUFS, the logo sat right after one 1 dB trim. The 30 s bed was
normalised with `loudnorm.sh bed.wav bed-14.wav -14 -1`, and a -16 version for the podcast feed she guests on.

## Step 7: kit

```text
claudia_logo_1.8s_main.wav / .mp3 / .m4a
claudia_intro_4.5s_main.wav
claudia_outro_8s_main.wav
claudia_transition_0.9s_flash.wav
claudia_alert_0.6s_main.wav
claudia_bed_30s_loop_-14.wav · claudia_bed_30s_loop_-16.wav
stems/ (motif, chord, drums, flash, shimmer) · project/claudia-sonic.band · sidecars/*.json · rights.md
```

## Step 8: placement map

| Where | Asset | Rule |
|---|---|---|
| Shorts and Reels | logo on the last beat, or on the visor reveal | never in the first 2 s |
| Long YouTube videos | intro sting at the end of the 30 s hook; logo on the end card | skip the sting if retention dips there |
| Avatar explainers | logo under her last line | not after silence |
| Stream | bed on "starting soon"; alert for follows | alert at least 6 dB under her voice |
| Telegram bot | the 0.6 s alert for announcements only | one sound, one meaning |

Posts using the kit carry the usual AI label (her voice and visuals are AI-generated, and so are the audio textures).
The kit is reviewed every quarter.
