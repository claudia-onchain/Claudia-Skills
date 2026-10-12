# Slide patterns, hook slides and type rules

Read this in step 2 (picking a spine) and step 3 (writing the hook slide). These are house rules from the Claudia
library, not platform facts: test them against your own numbers ([growth-experiments](../../../grow/growth-experiments/SKILL.md)).

## Seven spines

Pick one per carousel. Slide counts are for Instagram; TikTok photo mode can run longer and LinkedIn documents usually do.

| Spine | Shape | Slides | Good for |
|---|---|---|---|
| **Numbered list** | hook → 1 point per slide → recap → question | 6–9 | tips, tools, "things I learned" |
| **Step-by-step** | hook → what you'll make → steps → result → save prompt | 7–10 | tutorials, prompt recipes, setups |
| **Before / after** | hook → before → what changed (2–4 slides) → after → how | 6–8 | edits, makeovers, rebuilt workflows |
| **Myth / fact** | hook → myth, fact pairs (one pair per slide) → summary | 6–8 | correcting a common belief, honestly |
| **Story** | hook (the moment) → setup → turn → outcome → lesson | 6–10 | behind the scenes, a week in the studio |
| **Framework** | hook → the model in one picture → each part → when to use it | 6–9 | LinkedIn, explainers |
| **Lookbook / set** | cover → one image per look → credits / details → question | 5–12 | outfits, places, a photo story (see [fashion-lookbooks](../../fashion-lookbooks/SKILL.md)) |

Rules that apply to all of them:

- One idea per slide. If a slide needs a second paragraph, it is two slides.
- The last content slide pays off the hook. If the hook promised "6 posts that worked", slide 7 shows the sixth.
- The final slide asks a real question or tells people when to come back to it ("save this for your next shoot").
  Never "like if", "tag 3 friends" or "comment X to get Y" (engagement bait; see
  [captions-and-hooks](../../captions-and-hooks/SKILL.md) step 7).
- Re-hook in the middle: a picture slide or a big number around slide 4–5 keeps the swipe going.

## Hook slide formulas

The hook slide does three jobs: says what's inside, makes the reader want slide 2, and looks good as a grid tile.

| Formula | Example (Claudia's voice) |
|---|---|
| Specific number + result | `my agents posted 31 times. 6 did the work` |
| The mistake | `the prompt habit that made every shoot look the same` |
| Before / after tease | `same outfit, same light. one change` |
| Save-worthy promise | `the 8-shot list I use for every studio day` |
| Contradiction | `I posted less and got more follows. here's the math` |
| Question with stakes | `silver or cobalt? the numbers picked for me` |

Hook slide rules:

- 4–9 words of title, one accent word, readable in about a second on a phone.
- Title in the lower or middle third of the image, never across the face.
- A swipe cue: page counter with an arrow (`1 / 8 →`), or a cut-off element that continues on slide 2.
- No clickbait the deck can't pay off, no price or income claims, no "you won't believe".

## Text sizes at 1080 px wide

| Element | Font (SIL OFL) | Size | Notes |
|---|---|---|---|
| Hook title | Barlow Condensed 800, uppercase | 96–124 px | 2–3 lines max |
| Slide title | Barlow Condensed 800, uppercase | 72–92 px | ≤ 8 words |
| Body | DM Sans 500 | 38–44 px | ≤ 30 words, line length ≤ 32 characters |
| Kicker / series label | DM Mono 500, uppercase, tracking .14em | 22–26 px | rose `#ff6fa5` |
| Page counter, handle | DM Mono 500 | 20–22 px | muted `#80858c` |

Contrast: off-white `#ece9e2` on near-black `#0a0b0d` and rose `#ff6fa5` on near-black both pass WCAG AA for body text.
Over photos, use the bottom gradient in `build-carousel.mjs` or a near-black box; check it on a phone at arm's length.
Full contrast numbers and a checker: [quote-cards-and-text-posts](../../quote-cards-and-text-posts/SKILL.md).

## Consistency across slides

- Same margins, same type sizes, same position for the counter and handle on every slide.
- Same colour grade on every generated image (write the grade into every prompt; see step 4 of the skill).
- Alternate text slides and picture slides on purpose (for example picture, text, text, picture, text, text, text).
- Keep a 3-slide rhythm: if three text slides in a row look alike, add a number, a quote or an image.
