# Timing, beats and reading speed

Read this before you place any text on the timeline (steps 2 and 3 of the skill).

## Beat math

| BPM | Seconds per beat | Frames per beat at 30 fps | One bar of 4 |
|---|---|---|---|
| 90 | 0.667 | 20 | 2.667 s |
| 100 | 0.600 | 18 | 2.400 s |
| 110 | 0.545 | 16.4 | 2.182 s |
| 118 | 0.508 | 15.3 | 2.034 s |
| 120 | 0.500 | 15 | 2.000 s |
| 128 | 0.469 | 14.1 | 1.875 s |
| 140 | 0.429 | 12.9 | 1.714 s |

Formula: seconds per beat = 60 ÷ BPM. Frame of beat *n* = round((offset + n × 60 ÷ BPM) × fps).

Finding BPM and the first downbeat:

- Generated music: the prompt or the provider's response often states the tempo; ask for it in the prompt ("118 BPM,
  four-on-the-floor"). See [../../music-and-sound-for-shorts/SKILL.md](../../music-and-sound-for-shorts/SKILL.md).
- Licensed tracks: the library page usually lists BPM.
- Unknown: tap along in any tap-tempo tool for 8 bars, then confirm in an editor by placing markers on 4 kicks and
  checking they fall on the grid that `beat-grid.mjs` prints.
- The **offset** is the time of the first downbeat in the edited clip, not in the original track. Measure it after you
  trim the music.

## What lands where

| Event | Put it on | Why |
|---|---|---|
| Title card arrival (end of the move) | a downbeat (beat 1 of a bar) | the eye and ear "click" together |
| Word slams | every beat for ≥ 110 BPM is too fast to read; use every 2 beats | see reading speed |
| Lower third in | the first downbeat after the speaker appears | not over the hook |
| Lower third out | a downbeat 3–6 s later | long enough to read twice |
| Cut between scenes | a beat; the text change on the same beat or one later | never mid-word |
| End card | the last downbeat before the music resolves | the loop restarts clean |

Off-beat accents (the "and" between beats) suit secondary motion: a sparkle, an underline drawing on, a sticker
wobble. Keep the main text on the beat.

## Reading speed

- About 3 words per second is a comfortable reading pace for short on-screen lines (the same rule the captions skill
  uses). A word must stay up for at least 0.4 s to be read at all; 0.6 s is safer.
- Title cards: 1–5 words, on screen 1.5–3 s.
- Lower thirds: name ≤ 24 characters, role ≤ 36, on screen 3–6 s.
- Word slams: one word (or a two-word unit like "AND A") per cue, at least 0.45 s each. At 128 BPM one beat is 0.47 s,
  so one word per beat is the limit; at 140 BPM go to every 2 beats.
- Never put two moving text elements on screen at once. One moves, the other holds.

## Safe zones on 1080×1920

The shared rule from [../../short-form-editing/references/platform-export-specs.md](../../short-form-editing/references/platform-export-specs.md):
keep text in the centred **~900 × 1400** area. In numbers used by this skill's template:

| Element | Position |
|---|---|
| Title card centre line | y = 420–560 (upper-middle, under the top UI) |
| Series label | y ≈ 340–360 |
| Word slams | y = 760–880 (eye line, above the face if the face is low) |
| Lower third | top edge y ≈ 1240, bottom edge above y = 1500, left margin 90 px, nothing right of x = 960 |
| Small AI tag | top-right inside x ≤ 960, y ≈ 250 |

These positions are a cautious union of the TikTok, Reels and Shorts overlays (third-party measurements; no app
publishes official organic numbers, checked 2026-10). Always check on a phone: export a frame and view it under the
app's own UI, or overlay a safe-zone guide in the editor.

## Motion feel

| Parameter | Snappy (club, hype-free energy) | Calm (desk, explainer) |
|---|---|---|
| Ease length | 0.25–0.3 s | 0.4–0.5 s |
| Travel | 60–100 px | 30–60 px, or fade only |
| Easing | ease-out quint | ease-out cubic |
| Scale pop | 125% → 100% | 110% → 100% or none |

Motion that loops forever (pulsing, wobbling) tires the eye; animate in, hold still, animate out.
