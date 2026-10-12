---
name: comics-and-webtoons
description: Makes short comic strips and vertical-scroll webtoon episodes starring a consistent AI character — panel scripts (four-panel setup / development / turn / payoff and scroll-paced episodes), a character sheet plus style-anchor workflow that keeps one face, outfit and drawing style across every panel, text-free panel prompts, lettering with tested HTML templates (speech, caption, agent and whisper balloons, SFX), and exports to 1080×1350 strips or 800×1280 webtoon slices. Use when someone wants a comic, comic strip, four-panel gag, webtoon or manga-style episode, a carousel comic, or wants to tell a character's story in panels.
license: MIT
metadata:
  title: "Comics and webtoons"
  category: create
  summary: "Four-panel strips and vertical webtoon episodes with one consistent character: script, panels, lettering, export."
  level: intermediate
  tags: "comics, webtoon, comic strip, panels, lettering, character consistency, storytelling, vertical scroll"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "2–3 h per strip · 1–2 days per episode"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Comics and webtoons

A comic lets a character do what a 10-second clip can't: tell a joke with timing, carry a story across weeks, and talk
to another character on the page. This skill writes the script first, builds a character sheet and a style anchor so
every panel shows the same person drawn the same way, generates text-free panels, letters them with real fonts, and
exports a feed-ready strip or a sliced webtoon episode, labelled as AI-generated art.

## When to use this

- A weekly four-panel strip for Instagram, X, Threads or Bluesky.
- A carousel comic: one panel per slide, punchline on the last swipe.
- A vertical-scroll episode for a webtoon platform or the character's own site.
- Turning a video series' running joke into a comic spin-off.
- Two characters talking (the character and its AI agent, or two creators in a collab).

Not for: comics about real people, fan comics with other creators' characters, or anything with minors or sexual
content.

## What you need

- The character bible and ref pack ([claudia-character-bible](../claudia-character-bible/SKILL.md),
  [character-consistency](../character-consistency/SKILL.md)); a bible for every other recurring character.
- `@useclaudia/media` or the `claudia` CLI with an image key that accepts several references (Nano Banana up to 14,
  OpenAI images up to 16, per the media docs).
- Google Chrome or Chromium for the lettering templates, and ffmpeg for slicing.
- Licensed fonts: the templates use Comic Neue, Bangers and DM Mono (SIL Open Font License).
- Read [references/panel-craft-and-lettering.md](references/panel-craft-and-lettering.md) while scripting and
  lettering, and [references/formats-and-specs.md](references/formats-and-specs.md) before setting up and exporting.

## Steps

1. **Pick the format first.** A 1080×1350 2×2 strip (one image, safest on every feed), a 1080×1350 carousel (one panel
   per slide), or an 800 px wide webtoon episode sliced into 800×1280 images (WEBTOON CANVAS figures from creator
   guides, checked 2026-10; confirm on the upload screen). Before starting a series on a comic platform, read its
   current rules on AI-generated work.

2. **Write the panel script.** Copy [templates/panel-script.md](templates/panel-script.md). Strip: setup, development,
   turn, payoff, under about 60 words, fewest words in the payoff. Episode: hook in the first two screens, one beat per
   screen, a reason to scroll after every panel, end on a hook. For each panel note the shot, who is left and right,
   the expression, the props, where the balloons will go, and the exact words. Vary shots; keep the 180° line. Read it
   out loud before generating anything.

3. **Make the character sheet.** One sheet per character per style (prompt in
   [templates/panel-prompts.md](templates/panel-prompts.md) stage 1): front, three-quarter, profile and back, plus six
   expressions. Put the style in the style line and keep the identity block intact; for Claudia that is all five
   anchors and "28-year-old woman (adult)". Simplified and cute styles pull characters younger: add "adult proportions
   and an adult face in every view" and reject anything that reads young. Crop the sheet into reference images.

4. **Lock the style with panel 1.** Generate the establishing panel until line, colour, light and location are right.
   It becomes a reference for every other panel, next to the sheet crops. One style line per series, word for word,
   in every prompt.

5. **Generate the rest without text.** Each panel prompt = style line + identity block + outfit + the script's shot +
   "empty space in the <area> for a speech balloon" + "no text, no letters, no speech bubbles, no signs, no logos":

   ```sh
   claudia generate image "<STYLE> <CHAR> <shot>. No text, no speech bubbles." --model google/nano-banana-2.1 \
     --ref refs/<char>/comic-front.png,refs/<char>/comic-34.png,panels/ep01-01.png --aspect 4:5 --resolution 2K --dry-run
   ```

   Batch with the library loop in the template. Three to five refs (sheet crops, the style anchor, the previous panel
   for continuity) beat fourteen. When one detail drifts, fix it with an edit of that panel, not a re-roll. Run the drift
   review from [character-consistency](../character-consistency/SKILL.md) on every panel.

6. **Letter it with real fonts.** Strip:

   ```sh
   cp templates/strip.html work/strip-07/strip.html     # panels next to it as p1.png … p4.png; edit the balloons
   sh scripts/render-page.sh work/strip-07/strip.html out/strip-07.png 1080 1350
   ```

   Balloons read left to right, top to bottom; ≤ 25 words each, ≤ 3 per panel; tails toward the mouth; never over a
   face. Use caption boxes for narration, mono balloons for an agent or a screen, dashed for whispers, the display font
   for SFX. Text at 30 px on a 1080 px strip, about 25 px on an 800 px column, never under 22 px. Keep the header bar
   (series, number, handle) and the small `AI-GENERATED` tag.

7. **Export the episode in slices.** Letter the episode in [templates/webtoon.html](templates/webtoon.html) (gaps set
   the pacing: short for back-and-forth, long for a pause or a reveal), then render it straight to slices:

   ```sh
   sh scripts/render-webtoon.sh work/ep01/ep01.html out/ep01        # 800 x 1280 PNG + JPG slices, total size printed
   sh scripts/slice-tall.sh exports/ep01-full.png out/ep01          # if the episode was assembled in another tool
   ```

   Both were tested on 2026-10-12 (a 4,856 px test episode came out as four slices that stacked back without seams).
   Keep the upload under the platform's size limit (20 MB per WEBTOON CANVAS upload per creator guides [3P]).

8. **Publish with labels and approval.** Alt text that tells the story ("AI-generated four-panel comic: …"), the
   platform AI label, and an end card or series description saying "AI-generated art, written and edited by <name>".
   Credit human work honestly. No price talk in the dialogue, no real people, no dunking on other creators. A person
   approves the final image or slices before anything posts.

## Templates

- [templates/panel-script.md](templates/panel-script.md) — script header, the per-panel block, example rows and the
  read-through checks.
- [templates/panel-prompts.md](templates/panel-prompts.md) — character sheet, style lines, the panel loop, two-character
  panels, fix-by-edit, panel shapes.
- [templates/strip.html](templates/strip.html) — 1080×1350 2×2 strip with header, speech, caption, agent, SFX and AI
  tag, filled with the example strip.
- [templates/webtoon.html](templates/webtoon.html) — 800 px vertical episode with pacing gaps, inset panels and
  floating balloons.
- [scripts/render-page.sh](scripts/render-page.sh) · [scripts/render-webtoon.sh](scripts/render-webtoon.sh) ·
  [scripts/slice-tall.sh](scripts/slice-tall.sh) — HTML → PNG, HTML → slices, tall image → slices.
- [examples/desk-at-dusk-strip-07.md](examples/desk-at-dusk-strip-07.md) — a strip and its webtoon cut, script to post.

Panel line for quick scripting:

```text
P<n> · <shot> · <who L / who R> · <action> · balloons in <area> · <NAME>: "<line>" · SFX: <word or —>
```

## Check before you finish

- [ ] The script reads well out loud; the turn surprises; the payoff has the fewest words.
- [ ] Every panel shows the same character: anchors present, adult in every panel, same outfit and props in a scene.
- [ ] One style line throughout; shots vary; characters keep their sides.
- [ ] No model-drawn text, bubbles, signs or logos left in any panel.
- [ ] Balloons in reading order, inside the panel, off faces, text ≥ 22 px at the final size; spelling checked.
- [ ] Right canvas: 1080×1350 strip, 1080×1350 slides, or 800×1280 slices under the upload limit.
- [ ] AI label, alt text, and an end card or description crediting AI art and the human writer and editor.
- [ ] The platform's current AI rules read before posting a series there; a person approved the post.

## Pitfalls

- **Generating before scripting.** Pretty panels that don't tell a joke. Script, then shoot.
- **Text from the model.** Bubbles with gibberish or misspelled words. Prompt them out, letter by hand.
- **Style drift.** Panel 5 looks like another artist. Always pass the style anchor and repeat the style line verbatim.
- **Teenage drift in simple styles.** Big eyes and small faces read as children. Adult age and proportions in every
  prompt; reject and redo.
- **Same shot four times.** Use wide, medium, close and insert; save repeated framing for deliberate jokes.
- **Walls of text.** If a balloon needs 40 words, the panel needs splitting.
- **Faces under balloons.** Plan balloon space in the prompt, not after.
- **Hiding the AI.** Readers find out; say it in the description and on the end card from episode 1.

## Related skills

- [character-consistency](../character-consistency/SKILL.md) — ref packs, drift review and fix prompts.
- [storyboarding-shorts](../storyboarding-shorts/SKILL.md) — the same beat thinking for video.
- [carousel-design](../carousel-design/SKILL.md) — panel-per-slide comics on Instagram.
- [content-pillars-and-series](../content-pillars-and-series/SKILL.md) — making the strip a weekly series.
- [image-editing-and-upscaling](../image-editing-and-upscaling/SKILL.md) — removing stray text and upscaling panels.
- [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md) — labels and content credentials.
