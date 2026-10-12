---
name: meme-formats
description: Makes on-brand memes and reaction posts for an AI character or brand — picks a format family that still works (caption + reaction, reject/approve, POV, labelled scene, image macro, starter pack, escalation), times it against the trend, generates original reaction images with @useclaudia/media instead of reusing owned frames, sets the text, and runs rights, likeness, punch-down and labelling checks before approval. Use when someone wants a meme, a reaction image, a relatable post, to join a trend or meme format, or asks whether a meme is safe to post from a brand or creator account.
license: MIT
metadata:
  title: "Meme formats"
  category: "create"
  summary: "On-brand memes and reaction posts: formats that last, trend timing, original images, rights and likeness rules, no punching down, labelled."
  level: "intermediate"
  tags: "memes, reaction images, trends, humor, copyright, likeness, punching down, ai label, brand voice"
  uses: "@useclaudia/media, @useclaudia/social, @useclaudia/cli"
  time: "20–40 min per meme"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Meme formats

A good meme from a creator account is a shared truth in a familiar shape, posted while the shape is still fresh, with
the joke on the character or the situation, never on a person. This skill picks the format, checks the trend and the
rights, generates original reaction images of the character so nothing borrowed ends up in a monetised post, sets the
text, and gets a labelled meme past a cold read and an approval before it goes out.

## When to use this

- The account needs lighter, relatable posts between bigger pieces.
- A format is going around and the character has a real angle on it.
- A brand or agent asks "can we post this meme?" and someone needs to say yes, no or "rebuild it".
- Building a bank of reaction images of the character to reuse for months.

Not for: news reactions to tragedies or politics (Claudia never does these), coin hype, or anything featuring a real
person. Text-only jokes may fit [quote-cards-and-text-posts](../quote-cards-and-text-posts/SKILL.md) better.

## What you need

- The character's voice rules and "never" list ([claudia-character-bible](../claudia-character-bible/SKILL.md) for
  Claudia; your own bible otherwise) and the ref pack (`refs/claudia/01-front-neutral.jpg`, `05-laugh.jpg`, …).
- `@useclaudia/cli` with an image provider key (`claudia keys set google` or another), a daily spend cap you're happy
  with, and Chrome for [render-cover.sh](../thumbnails-and-covers/scripts/render-cover.sh) to render the meme template.
- A trend source: [trend-research](../../grow/trend-research/SKILL.md) or the platform's own trend pages.
- [references/format-catalog.md](references/format-catalog.md) and
  [references/rights-and-likeness.md](references/rights-and-likeness.md).
- A second person (or a second agent with a reviewer prompt) for the cold read in step 7.

## Steps

1. **Start from a shared truth.** Write the joke in one plain sentence before picking any format. Good material for an
   AI character: her own habits (`I film everything four times`), creator life (`the shoot plan vs the shoot`), agents
   and tools (`my agent asking if I want to "review anything"`), studio life, fashion, music. The joke is on her or on a
   situation the audience shares. If you need to explain it, it isn't ready.

2. **Pick a format family.** Read [references/format-catalog.md](references/format-catalog.md). The families that keep
   working are structures, not pictures: caption + reaction, reject / approve, labelled scene, expectation / reality,
   POV, image macro, starter pack, escalation, dialogue, native remix. Match the family to the joke (a comparison wants
   reject / approve; a feeling wants caption + reaction) and to the platform (POV and remixes live on TikTok and Reels;
   caption + reaction travels everywhere).

3. **Check the trend and the rights.** Read [references/rights-and-likeness.md](references/rights-and-likeness.md) now.
   - Trend: when did it start, is it still rising, what does it mean, where did it come from? Look up unfamiliar formats
     (Know Your Meme for history, the ADL Hate Symbols database for symbols and phrases). House rule: join while it is
     rising, ideally within 24–72 hours of noticing it; past a week since the peak, skip it or make it evergreen.
   - Rights: rebuild the structure with your own generated images. A famous frame, film still, stock photo or artwork is
     owned, and a creator or brand account using it is commercial use. In-app Stitch, Duet, Remix and the platforms'
     sound and GIF libraries are fine inside those apps.
   - Likeness: no real people. Not a face, a voice, a name in a fake quote or a "looks like" prompt, public figures
     included.
   Fill [templates/meme-brief.md](templates/meme-brief.md).

4. **Run the punch-down test.** Ask: who is the joke on, and do they have less power, reach or safety than the
   character? If the answer is a person, a group, a protected trait, a smaller creator or a community, it's a no. Also
   no: tragedies, wars, elections, deaths, health scares, crises in progress, and anything that mocks how someone looks,
   speaks or earns. Punching up at a faceless situation ("Monday", "the algorithm", "my own agent") is fine. Coin jokes
   that imply price ("moon", "100x", "buy the dip") are price calls, so they're out too.

5. **Generate the reaction images.** Use the identity block and a reaction prompt from the catalog; ask for empty space
   where text goes, and no text in the image:

   ```sh
   claudia generate image "[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob … looking sideways at the camera without turning her head, eyebrows slightly raised, mouth closed in a flat line, holding a coffee cup. White studio, soft daylight from the left, medium close-up, the top third of the frame empty pale grey paper. Cool clean grade, gentle film grain. No text, no logos. Vertical 4:5 frame." \
     --model google/nano-banana-2.1 --aspect 4:5 --resolution 1K --n 4 \
     --ref refs/claudia/01-front-neutral.jpg --max-usd 0.20 --dry-run
   ```

   Then run without `--dry-run`. At 1K a Nano Banana 2.1 image lists at about $0.034 (checked 2026-10), so four options
   cost about $0.14. Pick the one where the expression reads at thumbnail size and the character is on-model (adult, five
   anchors, no logos). Save keepers as a reusable reaction bank (`refs/reactions/side-eye-01.jpg`) and log the prompt in
   your prompt library ([prompt-library-management](../prompt-library-management/SKILL.md)).

6. **Set the text and render.** Copy [templates/meme-card.html](templates/meme-card.html), set the `<body>` class to the
   layout (`caption`, `panels` or `macro`), point `--img1` / `--img2` at your images and write the text:

   ```sh
   sh ../thumbnails-and-covers/scripts/render-cover.sh work/meme-0412.html work/meme-0412-4x5.png 1080 1350
   sh ../thumbnails-and-covers/scripts/render-cover.sh work/meme-0412.html work/meme-0412-1x1.png 1080 1080
   ```

   Text rules: caption layout ≤ 20 words in DM Sans, panels ≤ 8 words each, macro lines ≤ 6 words in Anton (an SIL OFL
   stand-in for Impact, which is a licensed Microsoft font). Lowercase reads casual; caps only for macros. The template
   adds the handle and a small "AI-generated" tag. Read it on a phone; the punchline should land in two seconds.

7. **Label, caption and get a cold read.** Post caption: short, adds a twist or a soft question, not an explanation
   (`which one are you this week?`). 2–4 honest hashtags. Alt text describes the image and gives every word on it:
   `AI-generated image: Claudia side-eyeing a laptop, holding a coffee cup. Text: 'me after my agents ask if I want to
   "review anything"'.` Labels: AI label on, `#ad` if anyone paid, gifted or earns on it, NFA on any coin mention. Then
   show it to someone who hasn't seen it, without context. If they don't get it, or wince, fix it or drop it.

8. **Publish while it's fresh.** Memes go through the same preview and approval as anything else:

   ```ts
   import { createSocial, chainKeys, envKeys } from "@useclaudia/social";
   const social = createSocial({ keys: chainKeys(envKeys()) });
   await social.ready();
   const x = social.accounts().find((a) => a.network === "x")!;
   const post = social.draft({
     text: "which one are you this week?",
     media: [{ path: "work/meme-0412-1x1.png", alt: "AI-generated image: Claudia side-eyeing a laptop, holding a coffee cup. Text: 'me after my agents ask if I want to \"review anything\"'." }],
     targets: [{ account: x.id }],
     labels: { ai: true },
   });
   console.log(JSON.stringify(social.preview(post.id), null, 2));
   social.submit(post.id); // a person approves; schedule inside the trend window
   ```

   Native remixes (Stitch, Duet, Remix) are made and posted in the app by the operator, with the app's AI label on.
   Don't schedule a trend meme for next week: if approval can't happen inside the window, let it go.

9. **Watch the replies and retire the joke.** Check replies in the first two hours. If people read it as mocking someone,
   as real, or as a coin call, take it down, say so plainly and don't argue
   ([crisis-and-reputation](../../grow/crisis-and-reputation/SKILL.md)). Retire a format after it has run its course on
   the account; reuse the reaction images, not the joke.

## Templates

- [templates/meme-brief.md](templates/meme-brief.md) — the brief and a go / no-go table (target, topic, people, images, trend, money, honesty).
- [templates/meme-card.html](templates/meme-card.html) — caption, two-panel and image-macro layouts with handle and AI tag.
- [examples/claudia-meme-batch.md](examples/claudia-meme-batch.md) — six meme ideas, two killed at the checks, four made and posted.

One-line pitch format:

```text
<joke in plain words> · on: <herself | situation | idea> · <format family> · <trend + window or "evergreen"> · <platforms>
```

## Check before you finish

- [ ] The joke is on the character, a shared situation or an idea, and passes the punch-down test.
- [ ] No real person's face, voice or name; no owned frame, stock photo or artwork without a licence you can show.
- [ ] No readable third-party logos; no fake screenshots, headlines or quotes.
- [ ] Trend origin and meaning checked; posting inside the window, or it's evergreen.
- [ ] Image text within the word limits and readable on a phone.
- [ ] AI tag on the image, AI label on the post, alt text with all the words; `#ad` if paid; NFA on any coin mention.
- [ ] A cold read by someone else, and a person's approval before publishing.

## Pitfalls

- **Reusing the famous frame.** It's someone's photo or film still. On an account that earns, that's commercial use.
  Rebuild the structure with the character.
- **"It's just a joke" about a person or group.** If the target has less power than the account, it's punching down.
- **Late to the trend.** A format a week past its peak reads as a brand trying. Skip it or make it evergreen.
- **Meme that could pass as real.** A fake headline, chyron or app screenshot travels without its context. Don't.
- **Joke price calls.** "To the moon" is a price call in any font.
- **Explaining the joke in the caption.** Add a twist or a question, not the punchline again.
- **Unchecked origins.** Some formats and phrases come from hate communities. Look it up first.
- **Over-memeing.** If half the feed is memes, the character becomes a meme page. Keep them a seasoning.

## Related skills

- [trend-research](../../grow/trend-research/SKILL.md) — spotting formats early and reading whether they've peaked.
- [captions-and-hooks](../captions-and-hooks/SKILL.md) — post captions, hashtags and banned phrases.
- [quote-cards-and-text-posts](../quote-cards-and-text-posts/SKILL.md) — text-only jokes and honest screenshot cards.
- [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md) — labels, deepfake rules and provenance.
- [crisis-and-reputation](../../grow/crisis-and-reputation/SKILL.md) — when a joke lands wrong.
- [brand-voice-guidelines](../../grow/brand-voice-guidelines/SKILL.md) — what the character jokes about, and what she never does.
