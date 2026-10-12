# Worked example: "Desk at Dusk" strip 07 and its webtoon cut

Claudia's "Desk at Dusk" video series gets a comic spin-off: a weekly 4-panel strip for Instagram, X and Threads, and
the same story expanded into a short vertical episode as a test for a webtoon series. The joke: she asks her scheduling
agent for the best posting time and it says 3:12 am.

## 1. Script (templates/panel-script.md)

Logline: Claudia thinks the last post of the day is easy; her agent disagrees. Structure: setup, development, turn,
payoff. 31 words in total.

| Panel | Shot | Action | Words |
|---|---|---|---|
| 1 | medium, eye level | Claudia at her desk at dusk, laptop open, relaxed | CAPTION: 7:58 pm. one post left to schedule. · CLAUDIA: easy. I'll just pick a time. |
| 2 | insert | the laptop screen glowing, one calendar slot lit | AGENT (mono): 41 slots analysed. best time: 3:12 am. |
| 3 | close-up | Claudia, eyes wide | CLAUDIA: 3 am?? who is awake at 3 am · SFX: BLINK |
| 4 | close-up, darker | same framing, the room now dark, she is still there, deadpan | AGENT (mono): you, apparently. |

Panel 4 repeats panel 3's framing on purpose: the only change is the light, which sells the time jump without a caption.
The agent speaks in mono balloons with the rose border, so a non-human voice looks different from hers.

## 2. Character sheet and style anchor

- Style line: "A clean digital comic illustration, confident ink line art, flat colours with one soft shadow tone,
  muted palette with a single rose-pink accent, gentle film grain."
- Character sheet from `templates/panel-prompts.md` stage 1 with Claudia's short identity block and the Studio look
  (cropped white puffed-sleeve shirt with a star pin). Rejected once: the simplified style made her look about 16.
  Fixed by adding "adult proportions and an adult face in every view" and "28-year-old woman (adult)" before the style
  line. The approved sheet was cropped into four reference images.
- Panel 1 became the style anchor after two rolls (roll 1 put a fruit logo on the laptop; the prompt now says "plain
  laptop, no logo, chrome star sticker on the lid").

## 3. Panels 2–4

Generated with the stage 3 loop: refs = `comic-front.png`, `comic-34.png`, panel 1. Panel 4 was an **edit** of panel 3
("Keep everything identical. Only change: the room is dark now, the laptop screen is the only light, her expression is
deadpan.") so the framing matches exactly. Panel 2's screen had gibberish letters; the prompt was changed to "no
readable text on the screen, only shapes" and the result had none.

Drift review (from [../../character-consistency/SKILL.md](../../character-consistency/SKILL.md)): all four panels kept
the bob, the single peach streak, the star clip and the headset mic. Panel 3's freckles were faint; acceptable at this
size.

## 4. Lettering and render

```sh
cp templates/strip.html work/strip-07/strip.html     # the template's sample text is this strip
for i in 1 2 3 4; do cp "panels/strip07-0$i.png" "work/strip-07/p$i.png"; done
sh scripts/render-page.sh work/strip-07/strip.html out/strip-07.png 1080 1350
```

The template rendered on 2026-10-12 with placeholder panels: header bar, 2 × 2 grid, caption box, three balloon types
and the BLINK effect all placed as in the script. One fix came out of that test: a balloon placed at `left:30%`,
`width:64%` overflowed the panel until the template switched balloons to `box-sizing: border-box`.

Reading-order check: in panel 1 the caption sits top-left and Claudia's balloon lower-right, next to her mouth, so the
caption reads first. In panel 3 the SFX sits low-right, after the balloon.

## 5. The webtoon cut

The same four beats, expanded for the scroll: an establishing panel of the studio at dusk, the desk, the agent's line
floating in a 360 px gap (it arrives like a notification), an inset close-up of her eyes with BLINK, then a 900 px empty
gap (the night passing) before the dark final panel and a whispered "...me. I'm awake."

```sh
cp templates/webtoon.html work/ep01/ep01.html        # panels ep01-01.png … ep01-04.png next to it
sh scripts/render-webtoon.sh work/ep01/ep01.html out/ep01
```

Test render on 2026-10-12 with placeholder panels (two 1:1, two 2:3):

```text
episode height 4856px → 4 slices of 800x1280
140K	total JPG size
```

Stacked back together, the four slices joined without seams. 140 KB is far under the 20 MB per-upload budget [3P];
real art will be heavier, and the script prints the total each time.

## 6. Post

- Instagram / Threads / X: the single 1080 × 1350 image. Alt text: "AI-generated four-panel comic: Claudia asks her
  scheduling agent for the best posting time; it answers 3:12 am, and in the last panel she is still awake in the
  dark." Caption in her voice: `my agent's scheduling advice, illustrated. what's the latest you've posted something?`
  Platform AI label on.
- Webtoon test: kept as a private draft until the operator had read the platform's current rules on AI-generated work.
  The end card says "AI-generated art · written and edited by the Claudia team".

Approved by the operator before each post.
