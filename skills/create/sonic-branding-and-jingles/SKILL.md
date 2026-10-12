---
name: sonic-branding-and-jingles
description: Builds a sonic identity for a creator, character or agent — a 1–3 second sonic logo, intro and outro stings, a notification sound and a loopable bed — from a sonic brief and a hummable motif, with AI music and sound-effect generation through @useclaudia/media, licensing and ownership checks (tool terms, human authorship, sound marks), loudness targets per destination, an asset kit and a placement map. Use when someone wants a jingle, sonic logo, audio signature, intro sting, podcast intro, stream alert sound, or a recurring sound for Claudia or their own character.
license: MIT
metadata:
  title: "Sonic branding and jingles"
  category: "create"
  summary: "A sonic logo, stings and a recurring audio signature: brief, motif, AI generation, rights, loudness, an asset kit and where to use it."
  level: "intermediate"
  tags: "sonic branding, sonic logo, jingle, audio identity, intro sting, sfx, ai music, loudness, licensing"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "2–3 h for a first kit"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Sonic branding and jingles

People recognise a sound faster than a logo, and they hear it with the phone in their pocket. A sonic identity is a
short motif that is yours, a few versions of it cut for different moments, and the discipline to use them the same way
every time. This skill writes the brief, designs a motif a person can hum, uses AI for candidates and textures, checks
that you can actually use and own the result, masters it for each destination and decides where it plays.

## When to use this

- A character, creator or agent needs a recognisable sound: a sonic logo, intro and outro stings, an alert sound.
- A podcast, stream or YouTube series needs an intro that isn't a stock jingle everyone else uses.
- An existing jingle came from a tool whose terms don't allow your use, or it sounds like someone else's logo.

Not for: imitating a famous sonic logo, a known song or an artist's style; or soundtracks for full videos (see
[music-and-sound-for-shorts](../music-and-sound-for-shorts/SKILL.md)).

## What you need

- The character or brand bible: personality, palette, worlds ([claudia-character-bible](../claudia-character-bible/SKILL.md)
  for Claudia).
- `@useclaudia/media` or the `claudia` CLI with `elevenlabs` (music and SFX) and optionally `google` (Lyria) keys.
- A simple DAW (GarageBand, Logic, Reaper, Ableton or any editor that does MIDI and fades) and `ffmpeg`;
  [scripts/sting-meter.sh](scripts/sting-meter.sh) measures short stings (POSIX sh, no network).
- [references/rights-and-ownership.md](references/rights-and-ownership.md) — tool terms, copyright and sound marks (read
  it before step 5). [references/loudness-and-delivery.md](references/loudness-and-delivery.md) — targets and export
  settings per destination (read it before step 6).

## Steps

1. **Write the sonic brief.** Fill [templates/sonic-brief.yaml](templates/sonic-brief.yaml): three personality words,
   what the sound must never be, the worlds it lives in, and every touchpoint with its length:

   | Asset | Length | Job |
   |---|---|---|
   | Sonic logo | 1–3 s | the signature; ends a video, marks a reveal |
   | Intro sting | 3–6 s | opens a long video, podcast or stream segment |
   | Outro sting | 4–10 s | closes, carries an end card |
   | Transition | 0.5–1.5 s | chapter changes, before/after cuts |
   | Notification / alert | 0.3–1 s | stream alerts, app or bot sounds |
   | Bed loop | 15–30 s | under talk segments, "starting soon" screens |

2. **Design the motif before generating.** Three to five notes, inside one octave, with one memorable interval or
   rhythm, playable on anything (synth, piano, whistle, a hum). Write it down as notes and rhythm, play it in the DAW
   and hum it the next day: if you can't remember it, nobody else will. Pick one signature timbre (a bell synth, a
   plucked guitar, a vocal "mm") and one texture from the brand world (a camera flash, vinyl crackle, a shimmer). A
   human-written motif also matters for ownership (step 5).

3. **Generate candidates with AI.** Use generation for options, arrangements around the motif, and the
   texture layer. Prompts describe sound and function; never name artists, songs, labels or existing jingles.

   ```sh
   claudia generate sfx "bright camera flash pop followed by a short glittering shimmer, clean, no music" --duration 1.5 --dry-run
   claudia generate sfx "short airy chime notification, two soft bell notes rising, clean, no reverb tail" --duration 0.8 --max-usd 0.05
   claudia generate music "a 4-second disco-house intro sting, 124 BPM, filtered chord stab, punchy kick, bright bell synth \
     playing a short rising four-note motif then one note down, ends on a clean hit, instrumental, no vocals" \
     --model elevenlabs/music-v2.5 --duration 4 --max-usd 0.05
   ```

   ElevenLabs music takes 3–600 s and SFX 0.5–30 s; music is $0.15 per minute and SFX about $0.12 per minute (list and
   estimate, checked 2026-10), so a dozen candidates cost cents. For a seamless bed use the library with
   `meta: { loop: true }` on SFX, and `meta: { instrumental: true }` on ElevenLabs music. Models won't reliably play an
   exact note sequence; treat outputs as sketches and textures.

4. **Pick and refine by ear.** Shortlist 3 candidates. Test each on a phone speaker, laptop speakers and earbuds; at
   low volume; under a voice at speaking level; and in mono. Play them to five people without context and ask the next
   day which they remember. Then finish in the DAW: play the motif yourself (MIDI or a real instrument) over or instead
   of the AI melody, keep the AI texture if it helps, trim to length, add a short fade (5–20 ms in, a natural tail out),
   and make sure the logo ends cleanly so it can sit under a cut.

5. **Clear the rights.** Before the sound becomes the brand, read the reference and record each decision in
   [templates/sonic-asset-kit.csv](templates/sonic-asset-kit.csv):
   - The tool's terms allow commercial and advertising use on your plan. ElevenLabs Music terms bar prompts naming
     artists, songs or labels and note outputs may not be unique to you; Lyria has no clear published commercial terms
     (see [music-and-sound-for-shorts](../music-and-sound-for-shorts/SKILL.md) licensing matrix, checked 2026-10).
   - Ownership: the US Copyright Office's 2025 report says purely AI-generated material isn't protected and prompts alone
     aren't enough, while human-authored parts and creative arrangements can be. Your human-written motif and
     arrangement are what you can own.
   - No accidental soundalike: compare against well-known sonic logos in your space and against your own playlist. If
     anyone says "that sounds like…", change the motif.
   - A sound mark (trademark) is possible for distinctive, arbitrary sounds; commonplace sounds need proof of acquired
     distinctiveness. Ask a trademark lawyer before relying on it.

6. **Master for each destination.** Make one 48 kHz, 24-bit WAV master per asset, then deliverables. Mixed into social
   video, the programme lands around -14 LUFS integrated with true peak ≤ -1 dBTP; podcasts for Apple Podcasts sit around
   -16 LKFS ±1 with true peak ≤ -1 dBFS (Apple, checked 2026-10). Integrated loudness isn't meaningful on a 1–2 s sting,
   so match stings by momentary and short-term loudness to the programme they sit in, and cap the true peak:

   ```sh
   sh scripts/sting-meter.sh logo.wav            # max momentary, short-term (3 s+), integrated, true peak
   ffmpeg -i logo.wav -af "volume=-3dB,alimiter=limit=0.84:level=false" -ar 48000 -c:a pcm_s24le logo-master.wav
   ```

   The limiter caps sample peaks at about -1.5 dBFS to leave room for inter-sample peaks; measure again and confirm the
   true peak reads -1 dBTP or lower.

   Longer assets (beds, outros over 5 s): `sh ../short-form-editing/scripts/loudnorm.sh bed.wav bed-14.wav -14 -1`, or
   `-16 -1` for podcast delivery. Check each asset in mono: a stereo-wide shimmer can vanish on a phone speaker.

7. **Build the asset kit.** Name files so anyone can find the right one: `<brand>_<asset>_<length>s_<variant>_<lufs>.wav`
   (for example `claudia_logo_1.8s_main_short.wav`). Keep the WAV master, an MP3 and an AAC/M4A deliverable, the DAW
   project, the media sidecars (prompt, model, cost, watermark) and the rights notes together. Add each asset to your
   prompt library ([prompt-library-management](../prompt-library-management/SKILL.md)) so the prompts that made the
   textures are reproducible.

8. **Place it the same way every time.** Write a placement map in the kit and keep to it:

   | Where | Asset | Rule |
   |---|---|---|
   | Shorts and Reels | sonic logo at the end, or on the reveal | never before the hook: the first second belongs to the hook |
   | Long YouTube videos | intro sting after the 30 s hook, logo on the end card | 6 s max; skip it entirely if retention dips there |
   | Podcast | intro sting, then talk; outro under credits | under 10 s before anyone speaks |
   | Livestream | bed on "starting soon" and breaks; alert sound for follows and tips | alerts quiet enough to talk over |
   | Avatar explainers | logo on the last card | under the final line, not after a silence |
   | Bots and apps | notification sound | one sound, one meaning |

   Use the same sound for the same moment. Using the logo everywhere makes it noise.

9. **Label and log.** AI-generated audio is covered by the post's AI label; keep Lyria's SynthID and the sidecars
   intact. Log each asset's source, terms, plan tier and date in the kit. Review the kit every quarter: tool terms
   change, and so does your audience.

## Templates

- [templates/sonic-brief.yaml](templates/sonic-brief.yaml) — personality, never-list, motif, touchpoints, prompts.
- [templates/sonic-asset-kit.csv](templates/sonic-asset-kit.csv) — every asset with length, loudness, source, terms and use.
- [examples/claudia-sonic-kit.md](examples/claudia-sonic-kit.md) — Claudia's sonic logo, stings and alert from brief to
  placement, including the candidate that sounded too familiar.

Prompt shape for any sting:

```text
<length>-second <genre/texture> <asset: sonic logo | intro sting | transition | notification>, <BPM if rhythmic>,
<signature timbre> playing <motif description, not a song>, <brand texture>, <how it ends: clean hit | short tail>,
instrumental, no vocals, no artist or song references
```

## Check before you finish

- [ ] The motif is human-written, 3–5 notes, and five people remembered it the next day.
- [ ] No prompt names an artist, song, label or existing jingle; nobody hears a soundalike.
- [ ] Tool terms allow your use (commercial, ads, sponsored posts) on your plan; decision logged per asset.
- [ ] Each asset has a WAV master plus deliverables, true peak ≤ -1 dBTP, checked in mono and on a phone speaker.
- [ ] Beds and long stings normalised for their destination (-14 LUFS video, -16 LKFS podcast).
- [ ] A placement map exists; no sting before the hook in short-form.
- [ ] Sidecars and watermarks kept; posts with AI audio carry the AI label.

## Pitfalls

- **Starting in the generator.** Without a motif you get twenty nice sounds and no identity.
- **Too long.** A 6-second logo at the start of a 20-second short costs the hook. Cut a 1–2 s version.
- **"Sounds like" prompts.** Naming a famous logo or artist breaks tool terms and invites a dispute.
- **Assuming you own AI output.** Without human authorship there may be nothing to protect, and the same sound may be
  generated for someone else.
- **Normalising a 1 s sting to -14 LUFS integrated.** The measurement isn't meaningful at that length; it ends up far too
  loud or too quiet. Match by ear and momentary loudness.
- **Stereo tricks.** Wide, phasey shimmers collapse on phone speakers. Check in mono.
- **One sound for everything.** If the logo plays on every cut, viewers learn to ignore it.

## Related skills

- [music-and-sound-for-shorts](../music-and-sound-for-shorts/SKILL.md) — licensing matrix, beds and the full mix.
- [voice-and-lip-sync](../voice-and-lip-sync/SKILL.md) — the voice the logo sits next to.
- [youtube-long-form-scripts](../youtube-long-form-scripts/SKILL.md) — where the intro sting goes in a long video.
- [livestreaming-playbook](../../grow/livestreaming-playbook/SKILL.md) — alerts and beds on stream.
- [brand-voice-guidelines](../../grow/brand-voice-guidelines/SKILL.md) — the written side of the same identity.
- [personal-brand-strategy](../../grow/personal-brand-strategy/SKILL.md) — what the brand should feel like.
