---
name: quote-cards-and-text-posts
description: Makes text-first posts and graphics — plain text posts, quote cards, list and stat cards, and tweet-style "screenshot" cards of the account's own posts — with brand typography, WCAG contrast checks, per-platform canvas sizes, alt text that carries the full text, AI labels and approval-first publishing through @useclaudia/social. Use when a post is a sentence rather than a scene, when someone asks for a quote card, text graphic, tweet screenshot, text post or "notes app" style card, or when deciding whether an idea should be a text post or a video.
license: MIT
metadata:
  title: "Quote cards and text posts"
  category: "create"
  summary: "Text-first posts and cards: when they beat video, type and contrast that read on a phone, sizes, alt text and honest screenshot cards."
  level: "beginner"
  tags: "quote cards, text posts, typography, contrast, alt text, accessibility, tweet screenshot, threads, x, linkedin"
  uses: "@useclaudia/social, @useclaudia/media, @useclaudia/cli"
  time: "15–30 min per post"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Quote cards and text posts

Some ideas are a sentence. Filming them adds cost and hides the words. This skill decides when a text post or a card
beats video, writes the line in the character's voice, sets it in brand type that passes contrast checks on a phone,
exports the right size for each network, and ships it with alt text, an AI label and a person's approval. It also covers
screenshot-style cards of your own posts, done honestly: your design, your words, real numbers only.

## When to use this

- The idea is a line: a take, a rule of thumb, a joke, a lesson, a question.
- Timely reactions where an hour of production would miss the moment.
- Text-first networks (X, Threads, Bluesky, LinkedIn, Mastodon) and text cards for Instagram or TikTok photo mode.
- Recycling a post that did well on X into a card for Instagram or LinkedIn.
- Deciding whether this week's idea should be a text post, a card, a carousel or a video.

Not for: multi-slide decks ([carousel-design](../carousel-design/SKILL.md)), memes and reaction images
([meme-formats](../meme-formats/SKILL.md)), or covers for video ([thumbnails-and-covers](../thumbnails-and-covers/SKILL.md)).

## What you need

- The character's voice rules ([claudia-character-bible](../claudia-character-bible/references/voice-and-personality.md)
  for Claudia, or your own bible).
- Node ≥ 20 for [scripts/contrast.mjs](scripts/contrast.mjs); Chrome or Chromium for
  [render-cover.sh](../thumbnails-and-covers/scripts/render-cover.sh) (from thumbnails-and-covers) to render the HTML
  templates to PNG.
- Optional: `@useclaudia/cli` with an image provider key for a background picture.
- `@useclaudia/social` (or the `claudia post` command) with the target accounts connected, to publish.
- [references/type-and-contrast.md](references/type-and-contrast.md) for sizes, contrast pairs, alt text and text limits.

## Steps

1. **Decide: text, card or video.** Use this table before writing anything:

   | Pick | When |
   |---|---|
   | **Plain text post** | the network is text-first (X, Threads, Bluesky, LinkedIn, Mastodon); the line is under the limit; you want replies |
   | **Quote / list / stat card** | the line should travel to Instagram, LinkedIn or Pinterest, be saved, or be shared in stories |
   | **Post card** (screenshot-style) | your own post did well on one network and you want it on another |
   | **Text over a picture** | the line needs a mood or the character's face to land |
   | **Video** | the idea needs motion, a demo, a voice, a before/after or a face reacting in time |

   If the only reason for video is "video gets more reach", write the text post first and test it
   ([growth-experiments](../../grow/growth-experiments/SKILL.md)).

2. **Write the line first.** One idea, 25 words or fewer, specific over clever, in the character's voice. Shapes that work
   for Claudia: a deadpan rule (`visor on = do not perceive me`), a specific number from her own week
   (`my agents posted 14 times today and I took one nap`), a contradiction, a soft question. Read it aloud once. Check it
   is true, says nothing about prices, returns or "buy", doesn't dunk on anyone, and doesn't put words in a real
   person's mouth. Fill one block of [templates/text-post-sheet.md](templates/text-post-sheet.md).

3. **Pick the card and set the type.** Copy [templates/quote-card.html](templates/quote-card.html) (quote, one-liner,
   list) or [templates/post-card.html](templates/post-card.html) (your own post as a card). Edit only the `:root` values
   and the text. Sizes at 1080 px wide: one-liners 96–120 px, quotes 64–88 px, post cards 46–60 px, labels 20–28 px,
   nothing else under 40 px. Left-align anything longer than two lines; one accent word per card. Then check contrast:

   ```sh
   node scripts/contrast.mjs "#ece9e2" "#0a0b0d" --px 76 --bold   # 16.24:1, passes AA and AAA
   node scripts/contrast.mjs --palette                             # every Claudia pair, with verdicts
   ```

   The floor is WCAG AA: 4.5:1 for normal text, 3:1 for large text. Rose `#ff6fa5` is fine as text on near-black
   (7.57:1) but fails on off-white (2.15:1), so on light cards it is an underline or a rule, never text.

4. **Add a picture only if it earns it.** A texture or portrait behind text must stay quiet. Generate it without text,
   with the empty area named in the prompt, and keep it dark where the words go:

   ```sh
   claudia generate image "Close-up of crinkled silver foil in deep shadow, hard flash catching a few sparkle highlights in the top right corner, the left two-thirds almost black and empty. Cool clean grade, gentle film grain. No text, no logos. Vertical 4:5 frame." \
     --model fal/flux-2-pro --aspect 4:5 --max-usd 0.06 --dry-run
   ```

   Run it again without `--dry-run` once the request looks right. Set the result as `--img` in the template, keep a
   near-black gradient or box behind the words, and check the lightest pixel behind a letter with the script. Any card
   with a generated picture carries a small "AI-generated" tag and alt text that says so.

5. **Render and check on a phone.**

   ```sh
   sh ../thumbnails-and-covers/scripts/render-cover.sh templates/quote-card.html out/note-12-4x5.png 1080 1350
   sh ../thumbnails-and-covers/scripts/render-cover.sh templates/quote-card.html out/note-12-16x9.png 1600 900
   ```

   Sizes per network are in [references/type-and-contrast.md](references/type-and-contrast.md): 1080×1350 for
   Instagram, Threads and LinkedIn; 1080×1080 as the safe crop anywhere; 1600×900 for X and landscape LinkedIn;
   1080×1920 for stories and TikTok photo mode. Send the PNG to your phone and read it at arm's length in dark and light
   mode. If you squint, cut words before shrinking type. For Instagram's API, convert to JPEG
   (`ffmpeg -i in.png -q:v 2 out.jpg`).

6. **Write the alt text and labels.** Alt text for a text card is the full card text, word for word, plus who said it:
   `Quote card, black background: "the flash did the lighting. I just showed up." — @claudia, AI character.` Cards with
   a generated picture start with "AI-generated image:". Labels: the AI label on every post from an AI character
   (`labels.ai`, on by default in `@useclaudia/social`), `#ad` for anything paid, gifted or affiliate, and "not financial
   advice" on any coin mention ([ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md)).

7. **Keep screenshot cards honest.** A post card shows **your own** post, in **your** design:
   - No platform logos, interface copies or verification badges. The card says the handle, the date and "AI character".
   - No like, repost or view counts unless they are the real, current numbers. Invented social proof is fake engagement.
   - Never make a card of a post someone else didn't write, and never "screenshot" a real person or brand saying
     something. That is impersonation, and it can be defamation.
   - Quoting a real person: their exact words, their name, a link to the source, and their permission when the card is
     promotional. When in doubt, link or embed the original post instead.

8. **Publish with approval.** Text posts and cards go through the same preview → approve flow. Per-network text can
   differ for the same post:

   ```ts
   import { createSocial, chainKeys, envKeys } from "@useclaudia/social";
   const social = createSocial({ keys: chainKeys(envKeys()) });
   await social.ready();
   const acc = (n: string) => social.accounts().find((a) => a.network === n)!;
   const post = social.draft({
     text: "the flash did the lighting. I just showed up.",
     media: [{ path: "out/note-12-4x5.png", alt: 'Quote card, black background: "the flash did the lighting. I just showed up." — @claudia, AI character.' }],
     targets: [
       { account: acc("x").id },
       { account: acc("bluesky").id },
       { account: acc("linkedin").id, text: "the flash did the lighting. I just showed up.\n\nsome days the best production decision is to let one light do the work. what's your one-light setup?" },
     ],
     labels: { ai: true },
   });
   console.log(JSON.stringify(social.preview(post.id), null, 2)); // chars per network, labels added, warnings
   social.submit(post.id);                                         // a person approves before anything goes live
   ```

   One card, one network from the terminal: `claudia post x "the flash did the lighting. I just showed up." --media out/note-12-4x5.png --alt "<alt text>" --dry-run`,
   then the same without `--dry-run` once it reads right. Text-only? Leave out `media`.

9. **Review after a week.** Compare text posts, cards and videos on the same pillar: replies and follows per 1,000
   impressions for text-first networks, saves and shares for cards. Keep the formats that win for each pillar in the
   sheet and note the losers too ([kpi-reporting](../../grow/kpi-reporting/SKILL.md)).

## Templates

- [templates/quote-card.html](templates/quote-card.html) — quote / one-liner / list card in brand type, any canvas size.
- [templates/post-card.html](templates/post-card.html) — your own post as a card, no platform interface, no fake counts.
- [templates/text-post-sheet.md](templates/text-post-sheet.md) — the fill-in sheet: line, format decision, per-network text, card, alt, labels.
- [scripts/contrast.mjs](scripts/contrast.mjs) — WCAG contrast with canvas-to-screen size conversion and the palette check.
- [examples/claudia-text-week.md](examples/claudia-text-week.md) — five text-first posts in one week, with the format decision for each.

One-line format for planning:

```text
<day> · <pillar> · "<line>" · <text | quote card | post card | over picture | video> · <networks> · <why>
```

## Check before you finish

- [ ] The format was chosen on purpose (step 1), not by default.
- [ ] The line is true, one idea, in voice, with no price, return or "buy" language.
- [ ] Contrast passes AA (4.5:1 normal, 3:1 large) and nothing but labels is under 40 px on a 1080 px canvas.
- [ ] The card was read on a phone at arm's length.
- [ ] Alt text holds the full card text; generated pictures are labelled in the alt text and on the card.
- [ ] Post cards show only your own posts, no platform logos or badges, and only real numbers.
- [ ] AI label on; `#ad` if paid or gifted; NFA on any coin mention; a person approved it.

## Pitfalls

- **Text baked into a generated image.** Misspellings are permanent. Generate clean, type in the template.
- **Pale accents on light cards.** Rose on off-white is 2.15:1. Use it as a line, not letters.
- **All caps for a whole sentence.** Slower to read and shouty. Keep caps for one-liners and labels.
- **Fake screenshots.** A "tweet" from someone who never posted it, or a copy of an app's interface with invented likes,
  is impersonation and fake social proof. Draw your own card.
- **Alt text that says "quote card".** Screen-reader users get nothing. Put the words in.
- **Posting the X text everywhere.** LinkedIn readers want one more line of context; Bluesky cuts at 300 graphemes.
  Use per-target `text`.
- **Turning every line into a video.** If the words are the point, video adds cost and hides them.

## Related skills

- [captions-and-hooks](../captions-and-hooks/SKILL.md) — first lines, caption shape, hashtags and banned phrases.
- [carousel-design](../carousel-design/SKILL.md) — when one card becomes a deck.
- [meme-formats](../meme-formats/SKILL.md) — reaction posts and memes with the same honesty rules.
- [thumbnails-and-covers](../thumbnails-and-covers/SKILL.md) — the render script and cover type system.
- [x-playbook](../../grow/x-playbook/SKILL.md) · [threads-playbook](../../grow/threads-playbook/SKILL.md) · [linkedin-playbook](../../grow/linkedin-playbook/SKILL.md)
- [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md) — labels and provenance on every post.
