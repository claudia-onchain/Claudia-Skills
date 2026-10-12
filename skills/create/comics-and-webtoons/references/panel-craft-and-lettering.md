# Panel craft and lettering

Read this while scripting (step 2 of the skill) and again while lettering (step 6).

## Story shapes

**Four-panel strip (setup, development, turn, payoff).** The classic Japanese yonkoma structure, kishotenketsu, works
for gag strips and slice-of-life alike:

| Panel | Job | Words |
|---|---|---|
| 1 | Setup: who, where, the normal situation | ≤ 15 |
| 2 | Development: the situation moves | ≤ 15 |
| 3 | Turn: the unexpected element | ≤ 12 |
| 4 | Payoff: the reaction or the punchline, usually the fewest words | ≤ 8 |

Keep the whole strip under about 60 words. If it needs more, it's two strips or a carousel.

**Vertical episode (webtoon).** Built for the thumb:

- **Hook in the first two screens.** A striking image or a question, not a title card and a long establishing shot.
- **One beat per screen** on a phone, roughly. Each panel should answer "why keep scrolling?".
- **Space is time.** Short gaps for quick back-and-forth, long empty gaps for a pause, a time skip or a reveal. A
  reveal panel goes after a long gap, full width.
- **End on a hook:** a question, a reveal or a decision, so the next episode has a reason to exist.

## Shot variety

Same camera every panel is the fastest way to bore a reader. Rotate:

| Shot | Use it for |
|---|---|
| Establishing / wide | the first panel of a scene, any location change |
| Medium (waist up) | dialogue, the default |
| Close-up (face) | reactions, emotion, punchlines |
| Extreme close-up (eyes, hands, a screen) | tension, a detail that matters |
| Over-the-shoulder | conversations between two characters |
| Low / high angle | power, smallness, humour |
| Insert (object only) | a phone screen, a sticker on a laptop, a clock |

Rules: keep the **180° line** (if A is on the left and B on the right, they stay there for the scene). Put the speaker
who talks first on the left, because English balloons read left to right, top to bottom.

## Lettering

Letter after the art, in an editor or with this skill's HTML templates. Never let an image model draw the words.

| Rule | Why |
|---|---|
| Reading order follows balloon placement: left to right, top to bottom | readers follow the balloons, not the characters |
| ≤ 25 words per balloon, ≤ 3 balloons per panel | a panel is a moment, not a paragraph |
| Tails point at the speaker's mouth and stop short of it | clarity on who speaks |
| Balloons never cover faces, hands doing something, or the key prop | the art carries half the joke |
| One font for dialogue, one for captions, one for SFX | consistency reads as craft |
| Mixed case or all caps, but the same for the whole series | |
| Bold for stress, sparingly: one word per balloon at most | |
| Size: 30 px on a 1080 px strip; about 25 px on an 800 px webtoon column; never below 22 px | phones |

Balloon kinds used by the templates:

- **Speech** (round): characters talking.
- **Caption** (square, mono): narration, time and place ("the studio. 7:58 pm.").
- **Mono** (square, accent border): an AI agent, a phone, a screen. Gives a non-human voice its own look.
- **Whisper** (dashed): quiet lines.
- **SFX** (display font, rotated, outlined): sounds. Short, and part of the picture.

Fonts used in the templates, all SIL Open Font License: Comic Neue (dialogue), Bangers (SFX), DM Mono (captions).
Any font you swap in must allow commercial use.

## Prompting panels so lettering fits

Every panel prompt says where the balloons will go, so the model leaves room:

```text
… medium shot, she sits on the right third of the frame, empty wall space in the upper-left third for a speech
balloon, no text, no letters, no speech bubbles, no signs …
```

Generate panels with **no text, no bubbles, no signs**. If a model draws a bubble or gibberish letters anyway, blur or
paint them out before lettering (recipe in [../../image-editing-and-upscaling/SKILL.md](../../image-editing-and-upscaling/SKILL.md)).

## Continuity checklist per panel

- Same outfit, hair, accessories as the last panel of the scene (for Claudia: all five anchors).
- Same time of day and light direction within a scene.
- Props stay where they were (the laptop doesn't swap sides).
- Characters stay on their side of the 180° line.
- Age reads the same: adults stay adults in every style, including simplified or cute ones.
