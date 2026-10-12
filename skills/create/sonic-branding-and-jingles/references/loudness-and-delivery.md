# Loudness and delivery for sonic assets (checked 2026-10)

Read this before step 6. Targets are for the **programme** the asset sits in; a sting is mixed to sit right inside it.

## Targets by destination

| Destination | Programme target | True peak | Source |
|---|---|---|---|
| Short-form video (TikTok, Reels, Shorts, X) | about -14 LUFS integrated | ≤ -1 dBTP | the library's mixing standard ([../../short-form-editing/SKILL.md](../../short-form-editing/SKILL.md)); platforms turn louder audio down |
| YouTube long-form | about -14 LUFS integrated | ≤ -1 dBTP | same; YouTube only turns loud audio down |
| Podcasts (Apple Podcasts) | -16 LKFS ±1 dB | ≤ -1 dBFS | podcasters.apple.com/support/893-audio-requirements |
| Livestream alerts | match the voice level by ear; a few dB under it for frequent alerts | ≤ -1 dBTP | craft rule |

## Why short stings need different measuring

- Integrated loudness (ITU-R BS.1770) is gated over 400 ms blocks and meant for whole programmes; on a 1–2 s file it
  swings with tiny edits and can't be compared with a 10-minute video.
- **Momentary** loudness (400 ms window) is the useful number for a sting; **short-term** (3 s window) for anything
  3 s or longer. `scripts/sting-meter.sh` prints both plus true peak.
- Practical match: put the sting in a test edit with real speech at about -14 LUFS, and set the sting's max momentary
  within about 2 dB of the speech's typical momentary level. Then trust your ears on a phone speaker.

## Export set per asset

| File | Spec | Use |
|---|---|---|
| Master | WAV, 48 kHz, 24-bit, stereo (or mono if it has no width) | the source of truth; never re-encode from an MP3 |
| Video deliverable | WAV 48 kHz 24-bit or AAC 256 kbps | editors and video exports |
| Podcast deliverable | MP3 128–256 kbps stereo or AAC, 44.1/48 kHz | podcast intros and outros |
| Web and app | MP3 128 kbps or AAC/M4A, mono if the device speaker is mono | notifications, bots, site |
| Stems | WAV per layer (motif, texture, drums) | remixes, seasonal versions |

```sh
ffmpeg -i claudia_logo_master.wav -c:a libmp3lame -b:a 192k claudia_logo.mp3
ffmpeg -i claudia_logo_master.wav -c:a aac -b:a 256k claudia_logo.m4a
ffmpeg -i claudia_logo_master.wav -ac 1 claudia_logo_mono-check.wav   # listen: does anything disappear?
```

## Edges

- Start: 5–20 ms fade-in to avoid a click; no silence before the first transient (editors place by the file start).
- End: a natural tail, or a 30–80 ms fade if it must stop hard. Leave no more than 100 ms of silence.
- Sample rate: deliver 48 kHz for video. Converting 44.1 to 48 at the last step can add a tiny shift in length; render
  at 48 kHz from the DAW.

## Mixing a sting into a programme

- Duck music and beds 8–12 dB while the sting plays if both are present (recipe R8 in
  [../../short-form-editing/references/ffmpeg-recipes.md](../../short-form-editing/references/ffmpeg-recipes.md)).
- Normalise the final programme once, not each layer: per-layer normalisation sums to a clipped mix.
- Run the final check: about -14 LUFS (or -16 LKFS for podcasts), true peak ≤ -1 dBTP.
