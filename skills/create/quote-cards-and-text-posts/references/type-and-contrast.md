# Type, contrast, sizes and alt text for text-first graphics

Read this in step 3 (setting the type) and step 5 (alt text). Contrast thresholds are from WCAG 2.2 (W3C), which is
stable; platform numbers carry a check date.

## Contrast (WCAG 2.2)

| Level | Normal text | Large text (≥ 24 px regular or ≥ 18.7 px bold, as seen on screen) |
|---|---|---|
| AA (our floor) | 4.5:1 | 3:1 |
| AAA (aim for body text) | 7:1 | 4.5:1 |

A 1080 px wide card on a phone about 390 px wide is shown at roughly 0.36 scale, so 54 px on the canvas is about 19 px on
screen (normal text), and 72 px bold is about 26 px (large text). `scripts/contrast.mjs --px <n>` does this conversion.

Claudia palette pairs (computed with `node scripts/contrast.mjs --palette`):

| Text on background | Ratio | Use |
|---|---|---|
| off-white `#ece9e2` on near-black `#0a0b0d` | 16.24:1 | default for everything |
| rose `#ff6fa5` on near-black | 7.57:1 | one accent word, labels |
| peach `#ff9a6b` on near-black | 9.46:1 | rare second accent (hair-colour callbacks only) |
| muted `#80858c` on near-black | 5.30:1 | handles, counters, dates |
| off-white on cobalt `#1f3a8a` | 8.53:1 | cobalt series cards |
| near-black on silver `#c9ccd3` | 12.25:1 | silver series cards |
| off-white on rose fill `#d63a76` | 3.66:1 | large text only (buttons, big numbers) |
| rose on off-white | 2.15:1 | **fails**: use rose as an underline or rule on light cards, never as text |

Text over a photo: there is no single ratio, because the background changes under each letter. Put a near-black gradient
or box (80–90 % opacity) behind the text, then sample the lightest pixel behind a letter and check that colour.

## Type at 1080 px wide

| Card type | Words | Font | Size | Line length |
|---|---|---|---|---|
| One-liner (≤ 8 words) | ≤ 8 | Barlow Condensed 800 uppercase or DM Sans 700 | 96–120 px | 10–16 characters |
| Quote (8–25 words) | 8–25 | DM Sans 700 | 64–88 px | ≤ 21 characters (21ch) |
| Post card (20–45 words) | 20–45 | DM Sans 500 | 46–60 px | ≤ 32 characters |
| List card (3–5 items) | ≤ 40 | DM Sans 500, numbers in Barlow Condensed | 44–52 px | one item per line |
| Label, handle, date | — | DM Mono 500 | 20–28 px | — |
| Script accent (rare) | 1–3 | Great Vibes | 120+ px | for a signature or wordmark, never for sentences |

Rules: sentence case or lowercase for anything longer than six words (all caps slows reading); left-aligned for more
than two lines; line height 1.1–1.3; one accent word per card; nothing under 40 px on the canvas except labels. Fonts
are all SIL Open Font License from Google Fonts; keep the licence with the design files.

## Canvas sizes

| Where | Canvas | Note (checked 2026-10) |
|---|---|---|
| Instagram feed, Threads, LinkedIn feed | 1080×1350 (4:5) | Instagram's grid shows a 3:4 crop; keep text ≥ 88 px from the sides |
| Anywhere, safest crop | 1080×1080 (1:1) | |
| X, LinkedIn, Bluesky landscape | 1600×900 (16:9) | good for wide quote cards with a lot of breathing room |
| Stories, TikTok photo mode | 1080×1920 (9:16) | keep text out of the top ~250 px and bottom ~440 px |

## Alt text

- Text cards: the alt text is the card's full text, word for word, then the attribution:
  `Quote card, black background: "the flash did the lighting. I just showed up." — @claudia, AI character.`
- Cards with a generated image: start with "AI-generated image:" and describe the scene, then give the text.
- Post cards: `Card showing a post by @claudia (AI character), 12 Oct 2026: "<text>".`
- Limits (checked 2026-10): X image descriptions up to 1,000 characters (help.x.com); Instagram API `alt_text` up to
  1,000; `@useclaudia/social` sends `alt` per image to X, Bluesky, Mastodon, LinkedIn and Instagram.

## Text-only posts: platform limits (checked 2026-10)

| Network | Text limit | Note |
|---|---|---|
| X | 280 weighted characters (Premium up to 25,000; the feed shows about 280) | links count as 23 |
| Threads | 500 | |
| Bluesky | 300 graphemes | |
| LinkedIn | 3,000 | the feed truncates long posts behind "see more" |
| Mastodon | 500 (instance default) | |
| Instagram, TikTok | captions only (Instagram 2,200; TikTok 4,000 in-app, video captions via API 2,200) | a text post there needs a card |

Source: `@useclaudia/social` `networks()` defaults and [captions-and-hooks](../../captions-and-hooks/SKILL.md) platform rules.
