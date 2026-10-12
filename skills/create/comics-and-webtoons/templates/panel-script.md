# Panel script: <series> · <strip 00 | episode 00> · "<title>"

Write the whole script before generating a single panel. Every panel row becomes one image prompt and one set of
balloons. Words go in the script, never in the image prompt.

## Header

| Field | Value |
|---|---|
| Format | <4-panel strip 1080×1350 · carousel 1080×1350 × n · webtoon episode 800 wide> |
| Logline (one sentence) | <who wants what, what goes wrong> |
| Structure | <setup / development / turn / payoff — or the episode's hook, beats, end hook> |
| Cast | <character 1 (bible link, ref pack)> · <character 2> · <the agent (voice only, mono balloons)> |
| Look this episode | <outfit per character, locked for every panel> |
| Locations | <location 1 + its establishing reference image> |
| Time / light | <dusk, laptop glow from the left> |
| Style line | <one line, identical in every panel prompt> |
| Word budget | <strip ≤ 60 · episode: ≤ 25 per balloon, ≤ 3 balloons per panel> |

## Panels

Repeat this block per panel. `L/R` = which side of the frame each character is on (keep the 180° line).

```text
PANEL <n>  · <shot: wide / medium / close-up / insert / over-the-shoulder> · <angle: eye / low / high>
SPACE AFTER (webtoon only): <s 120 px | m 360 px | l 900 px>
ACTION: <what we see, present tense, one or two sentences>
CHARACTERS: <name (L, sitting, facing right)> · <name (R, standing)>
EXPRESSION: <name: deadpan, one brow up>
PROPS / CONTINUITY: <laptop with chrome star sticker on the desk, left; mug right>
BALLOON SPACE: <upper-left third empty>
CAPTION: <narration, or —>
<NAME>: <dialogue>
<NAME> (whisper): <dialogue>
AGENT (mono): <what the agent or screen says>
SFX: <BLINK>
```

## Example rows (strip)

```text
PANEL 1 · medium · eye
ACTION: Claudia at her desk at dusk, laptop open, cursor over a calendar. Relaxed.
CHARACTERS: Claudia (R, sitting, facing left toward the laptop)
EXPRESSION: Claudia: easy half-smile
PROPS / CONTINUITY: laptop with chrome star sticker, left; disco ball lamp behind her, right
BALLOON SPACE: upper-left third
CAPTION: 7:58 pm. one post left to schedule.
CLAUDIA: easy. I'll just pick a time.

PANEL 4 · close-up · eye
ACTION: Claudia stares at the screen, wide awake, laptop glow on her face.
CHARACTERS: Claudia (centre)
EXPRESSION: Claudia: deadpan resignation
BALLOON SPACE: top third
AGENT (mono): you, apparently.
```

## Read-through checks

- [ ] Read the script out loud: every balloon in reading order makes sense without the pictures, and the pictures
      carry what the words leave out.
- [ ] The turn (panel 3 or the episode's reveal) is a surprise; the payoff has the fewest words.
- [ ] Shot types vary; no three identical shots in a row.
- [ ] Characters keep their sides; outfits and props don't change inside a scene.
- [ ] Nothing in the dialogue promises prices or returns, names a real person, or mocks another creator.
- [ ] The end card states that the art is AI-generated and who wrote and edited it.
