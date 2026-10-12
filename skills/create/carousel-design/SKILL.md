---
name: carousel-design
description: Designs swipe carousels for Instagram, TikTok photo mode and LinkedIn document (PDF) posts — spine and slide count, a hook slide that earns the swipe, per-platform sizes and limits, slide art generated with @useclaudia/media, text layout with brand type and safe zones, PNG/JPEG/PDF export, alt text, AI labels and approval-first publishing. Use when someone wants a carousel, slide post, swipe post, photo-mode post or LinkedIn PDF carousel, or needs to turn a thread, tutorial or list into slides for an AI character or brand.
license: MIT
metadata:
  title: "Carousel design"
  category: "create"
  summary: "Swipe carousels for Instagram, TikTok photo mode and LinkedIn PDFs: hook slide, sizes, generated art, layout and export."
  level: "intermediate"
  tags: "carousel, instagram, tiktok photo mode, linkedin, pdf, slides, hook, layout, export, alt text"
  uses: "@useclaudia/media, @useclaudia/social, @useclaudia/cli"
  time: "60–90 min per carousel"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Carousel design

A carousel is a short deck people swipe on their phone: one hook slide that earns the swipe, a handful of slides that
each say one thing, and a last slide that pays off the promise. This skill takes an idea to finished slides for
Instagram, TikTok photo mode and LinkedIn documents, with art generated on your own keys, text set in brand type, files
exported in the format each platform takes, and every post labelled and approved before it goes out.

## When to use this

- Turning a list, tutorial, thread, story or before/after into a swipe post.
- A weekly series that needs the same look every time ("Desk at Dusk", "what my agents did this week").
- Repurposing one idea for Instagram (4:5), TikTok photo mode (9:16) and LinkedIn (PDF) in one session.
- An existing carousel gets swipes on slide 1 and nothing after: fix the hook and the spine.

Not for: a single image (use [thumbnails-and-covers](../thumbnails-and-covers/SKILL.md)), a casual photo dump (use
[photo-dumps-and-grid-aesthetics](../photo-dumps-and-grid-aesthetics/SKILL.md)), or text-only graphics (use
[quote-cards-and-text-posts](../quote-cards-and-text-posts/SKILL.md)).

## What you need

- The idea in one sentence and the content: the points, numbers or steps you will put on the slides.
- `@useclaudia/cli` (the `claudia` command, which includes `@useclaudia/media`) and at least one image provider key
  (`claudia keys set google`, or `openai`, `fal`, `byteplus`). Keys stay in your key store or `CLAUDIA_KEY_*`; never
  print or paste them.
- For Claudia: the identity block and ref pack from [claudia-character-bible](../claudia-character-bible/SKILL.md) and
  [character-consistency](../character-consistency/SKILL.md) (`refs/claudia/01-front-neutral.jpg`, …). For your own
  character, its bible and refs.
- Node ≥ 20 and Google Chrome or Chromium for [scripts/build-carousel.mjs](scripts/build-carousel.mjs) (renders PNG
  slides and the PDF). ffmpeg (any build) to convert PNG to JPEG for Instagram.
- To publish through code: `@useclaudia/social` with the Instagram or LinkedIn account connected, and `mediaRelay` set
  for Instagram. TikTok photo posts and LinkedIn documents are uploaded by hand in the apps.
- [references/platform-specs.md](references/platform-specs.md) and [references/slide-patterns.md](references/slide-patterns.md).

## Steps

1. **Pick the platform and canvas.** Read [references/platform-specs.md](references/platform-specs.md) now. Defaults
   (checked 2026-10):

   | Platform | Canvas | Slides | How it gets posted |
   |---|---|---|---|
   | Instagram | 1080×1350 (4:5) `ig-4x5`; 1080×1440 (3:4) `ig-3x4` only when posting in the app | 6–10 (app max 20, API max 10) | `@useclaudia/social` (JPEG) or the app |
   | TikTok photo mode | 1080×1920 (9:16) `tiktok` | 6–12 (max 35) | TikTok app; the package has no photo posts |
   | LinkedIn document | 1080×1350 pages `linkedin`, one page size | 8–15 (max 300 pages, 100 MB) | LinkedIn, by hand, with a document title |

   One idea can ship to all three: write the copy once, then build one `slides.json` per size.

2. **Write the spine before any art.** Choose one of the seven spines in
   [references/slide-patterns.md](references/slide-patterns.md) (numbered list, step-by-step, before/after, myth/fact,
   story, framework, lookbook) and fill [templates/carousel-brief.yaml](templates/carousel-brief.yaml). Write one line
   per slide. Check: one idea per slide, the last content slide pays off the hook, a picture or big number around
   slide 4–5 to re-hook, and a final slide with a real question or a reason to save. Cut any slide you can't defend.

3. **Make the hook slide earn the swipe.** 4–9 words, one accent word, readable in a second. Use a formula from the
   reference: specific number + result (`my agents posted 31 times. 6 did the work`), the mistake, before/after tease,
   save-worthy promise, contradiction or question with stakes. Add a swipe cue (the script prints `1 / 8 →`). The hook
   is also the grid tile, so keep text ≥ 88 px from the left and right edges (Instagram's 3:4 grid trims a 4:5 cover).
   Never promise what the deck doesn't deliver, and no income, price or "guaranteed" claims.

4. **Generate the slide art.** Generate images with no text in them and with empty space where the words will go.
   Picture slides are usually the hook, one mid-deck re-hook and sometimes the last slide; the rest can be text on the
   brand background. Dry run first, then a capped run:

   ```sh
   claudia generate image "[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob … at her desk at dusk, laptop with a chrome star sticker, warm lamp and cool window light, looking at the screen with a small dry smile. Medium shot from the left, her face in the upper third, the lower 40% of the frame dark, empty desk surface for text. Cool clean grade, lifted blacks, gentle film grain, chrome highlights. No text, no logos. Vertical 4:5 frame." \
     --model google/nano-banana-2.1 --aspect 4:5 --resolution 2K \
     --ref refs/claudia/01-front-neutral.jpg,refs/claudia/09-phone-selfie.jpg --dry-run
   # same command with --max-usd 0.10 instead of --dry-run; it shows the estimate and asks before spending
   ```

   - Aspect per canvas: `4:5` for Instagram and LinkedIn, `9:16` for TikTok, `2:3` for a 3:4 Instagram slide (the
     layout crops it). The package accepts 1:1, 16:9, 9:16, 4:5, 3:2, 2:3 (checked 2026-10).
   - Paste the same grade line into every prompt so slides match. For a set of 4+ matching images, try
     `byteplus/seedream-4.5`; for exact brand colours, `fal/flux-2-pro` with HEX values (see
     [image-prompting-fundamentals](../image-prompting-fundamentals/SKILL.md) step 4).
   - Price check: Nano Banana 2.1 at 2K is about $0.05 an image (list price, checked 2026-10), so three picture slides
     plus a few retries stay under $0.50. Set `--max-usd` on every run.
   - Review each image against the character bible checklist (age reads late twenties, the five anchors, no readable
     logos, no real people). Copy the keepers from `~/.claudia/media/library/YYYY-MM/` into `art/` and keep the
     `.json` sidecars next to the originals.

5. **Lay out the text.** Copy [templates/slides.json](templates/slides.json), set `size`, fill each slide, and run:

   ```sh
   node scripts/build-carousel.mjs work/slides.json work/out           # writes slide-NN.html, deck.html, alt-text.txt, prints checks
   node scripts/build-carousel.mjs work/slides.json work/out --render  # also slide-NN.png and deck.pdf through Chrome
   ```

   The layout uses Barlow Condensed 800 for titles, DM Sans for body and DM Mono for labels (all SIL OFL), off-white
   `#ece9e2` on near-black `#0a0b0d` with one rose `#ff6fa5` accent word per slide (`*word*` in the JSON), a bottom
   gradient behind text on photos, an `AI-generated` tag on every picture slide, and platform safe zones (TikTok keeps
   text out of the bottom ~420 px and right ~150 px). The checks warn on long slides (> 14 words on the hook, > 45 on
   others), more than one accent, missing alt text, alt text that doesn't say "AI-generated" on picture slides, and
   slide counts over the platform limit. Sizes and contrast rules: [references/slide-patterns.md](references/slide-patterns.md).

6. **Render and export.** Open every PNG on a phone (AirDrop or a private chat to yourself) at arm's length before you
   export: if a line needs a squint, shorten it. Then:

   ```sh
   # Instagram through the API takes JPEG only
   for f in work/out/slide-*.png; do ffmpeg -loglevel error -y -i "$f" -q:v 2 "${f%.png}.jpg"; done
   # TikTok: upload the 1080x1920 PNG or JPEG files in order. LinkedIn: upload work/out/deck.pdf
   ```

   Check the PDF has one page per slide at one page size, and that nothing in it is private (viewers can download it).

7. **Write the caption, alt text and labels.** Caption line 1 restates or twists the hook; then one line of context,
   a soft question, 3–5 honest hashtags (see [captions-and-hooks](../captions-and-hooks/SKILL.md)). Use
   `alt-text.txt` from the build: picture slides start with "AI-generated image:" and describe the scene, text slides
   repeat the slide text. Labels: AI label on (Instagram "AI info", TikTok "AI-generated content", text label on
   LinkedIn), `#ad` and the paid-partnership toggle if anything is paid, gifted or affiliate, and "not financial
   advice" on any coin mention (see [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md)).

8. **Publish with approval.** Instagram (up to 10 slides) and LinkedIn multi-image posts can go through
   `@useclaudia/social`; the preview shows labels, warnings and anything blocked, and a person approves:

   ```ts
   import { readFileSync } from "node:fs";
   import { createSocial, chainKeys, envKeys } from "@useclaudia/social";

   const social = createSocial({
     keys: chainKeys(envKeys()),
     mediaRelay: { url: "https://useclaudia.xyz/relay/media", token: async () => loadClaudiaToken() }, // your `claudia login` token, from your key store
   });
   await social.ready();
   const ig = social.accounts().find((a) => a.network === "instagram");
   if (!ig) throw new Error("Connect Instagram first");
   const alts = readFileSync("work/out/alt-text.txt", "utf8").trim().split("\n").map((l) => l.replace(/^\d+\.\s*/, ""));
   const post = social.draft({
     text: "my agents posted 31 times this week. 6 did the work. which one would you try first? #aicharacter #contentstrategy #creatortips",
     media: alts.map((alt, i) => ({ path: `work/out/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt })),
     targets: [{ account: ig.id }],
     labels: { ai: true },
   });
   console.log(JSON.stringify(social.preview(post.id), null, 2)); // read warnings: JPEG only, 10 items max, labels added
   social.submit(post.id);                                         // pending_approval; a person approves in your UI
   ```

   TikTok photo mode and LinkedIn documents: the operator uploads the files in the app, pastes the approved caption,
   switches on the AI label (TikTok: More options → AI-generated content) and adds the document title on LinkedIn.
   Schedule for when the audience is awake ([posting-schedule](../../grow/posting-schedule/SKILL.md)).

9. **Review the swipe after 48 hours.** For each carousel note reach, saves, shares, follows and comments, and, where
   the platform shows it, how far people swiped. Keep a row per carousel in your KPI sheet
   ([kpi-reporting](../../grow/kpi-reporting/SKILL.md)). If reach is fine but saves are low, the middle slides are thin;
   if reach is low, test a new hook formula next time, one variable at a time.

## Templates

- [templates/carousel-brief.yaml](templates/carousel-brief.yaml) — the brief: spine, platforms, hook, slide lines, art, copy, approval.
- [templates/slides.json](templates/slides.json) — input for `build-carousel.mjs` (hook, point, cta slides with alt text).
- [scripts/build-carousel.mjs](scripts/build-carousel.mjs) — slides JSON → HTML, PNG slides and a PDF, with checks.
- [examples/agents-week-carousel.md](examples/agents-week-carousel.md) — one idea shipped as an 8-slide Instagram
  carousel, a 9-slide TikTok photo post and a 10-page LinkedIn document.

Slide line format for the brief:

```text
<n>  <hook | point | picture | payoff | cta>: <title ≤ 8 words> — <body ≤ 30 words or "none"> — <image: yes/no>
```

## Check before you finish

- [ ] Every slide says one thing; the hook's promise is paid off on a named slide.
- [ ] Hook slide: 4–9 words, one accent, readable on a phone, text clear of the grid crop and app UI.
- [ ] Canvas and slide count match the platform (Instagram API 10, app 20; TikTok 35; LinkedIn one page size).
- [ ] Generated images have no baked-in text, no readable third-party logos, no real people, and the character is
      on-model (adult, five anchors).
- [ ] Every picture slide carries the small "AI-generated" tag; alt text exists for every slide.
- [ ] Caption has the AI label, `#ad` when anything is paid, gifted or affiliate, and "not financial advice" on any coin
      mention; no engagement bait.
- [ ] Instagram files are JPEG; the LinkedIn PDF has a title, one page per slide and nothing private.
- [ ] A person approved the slides and caption before anything was published.

## Pitfalls

- **Text in the generated image.** Models misspell, and a carousel is all text. Generate clean art; set type in the layout.
- **A wall of words.** If a slide needs a squint at arm's length, split it. 45 words is a ceiling, not a target.
- **Mixed ratios.** Instagram crops every slide to the first one's ratio. Build each platform's deck at its own size.
- **Posting 3:4 through a scheduler.** The API path may crop 3:4 to 4:5. Use 4:5 for anything published by code.
- **PNG to Instagram's API.** It takes JPEG only; the package warns and the post fails. Convert first.
- **Expecting the package to post TikTok photos or LinkedIn PDFs.** It does neither; plan a manual upload.
- **A cover that dies in the grid.** Check the hook slide as a small 3:4 tile next to your last three posts.
- **Bait endings.** "Comment GUIDE and I'll DM you" invites automated DMs and reads as spam. Ask a real question.

## Related skills

- [captions-and-hooks](../captions-and-hooks/SKILL.md) — hook formulas, caption shape, hashtags and labels.
- [image-prompting-fundamentals](../image-prompting-fundamentals/SKILL.md) — model choice, dialects, the estimate → dry run → capped run loop.
- [quote-cards-and-text-posts](../quote-cards-and-text-posts/SKILL.md) — type, contrast and text-only slides.
- [photo-dumps-and-grid-aesthetics](../photo-dumps-and-grid-aesthetics/SKILL.md) — how carousels sit in the 3:4 grid.
- [instagram-reels-playbook](../../grow/instagram-reels-playbook/SKILL.md) · [tiktok-playbook](../../grow/tiktok-playbook/SKILL.md) · [linkedin-playbook](../../grow/linkedin-playbook/SKILL.md)
- [social-publishing](../../build/social-publishing/SKILL.md) — the publishing package in depth.
