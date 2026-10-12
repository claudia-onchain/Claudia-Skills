# Carousel specs per platform (checked 2026-10)

Read this in step 1, before you pick a canvas, and again before export. Platforms change these quietly: re-check the
source line under each table every quarter. Where a number could not be confirmed on the platform's own page, it says so.

## Instagram (feed carousel)

| Item | Value | Source / note |
|---|---|---|
| Slides in the app | up to 20 photos or videos | Instagram raised the cap from 10 to 20 in August 2024 (reported by The Verge and others) |
| Slides through the API | up to 10 | Meta Content Publishing docs: "Carousels are limited to 10 images, videos, or a mix" |
| `@useclaudia/social` | 1 image/reel or a 10-item carousel, JPEG only, needs `mediaRelay` | package README; PNG/WebP gets a warning, convert first |
| Aspect ratios | 1:1, 4:5, and 3:4 photos in the app since May 2025 (Mosseri on Threads) | API docs still describe crops based on the first image; schedulers may crop 3:4 to 4:5 |
| Canvas we use | 1080×1350 (4:5) by default; 1080×1440 (3:4) only when posting in the app | all slides in one carousel share the first slide's ratio |
| Profile grid | 3:4 tiles since January 2025; a 4:5 cover loses about 34 px on each side in the grid | keep cover text ≥ 88 px from the left and right edges |
| Alt text | per image; API field `alt_text` (up to 1,000 chars, added 2025-03-24); the package sends `alt` per item | app: Advanced settings → Accessibility → alt text (labels vary by app version), or Edit after posting |
| Caption | 2,200 characters; 3–5 hashtags recommended (30 max) | see [captions-and-hooks](../../captions-and-hooks/SKILL.md) |
| AI label | "AI info"; the package sets `is_ai_generated` | app: Advanced settings → AI label |
| Posting cap (API) | 100 API-published posts per 24 h per account (the docs also mention 50 in one place); a carousel counts as one | the package's own default cap is 20 a day |

Sources: developers.facebook.com/docs/instagram-platform/content-publishing (fetched 2026-10); Mosseri's 3:4 announcement
(May 2025) and the 3:4 grid change (January 2025) as reported by Kapwing and Oktopost; package README.

## TikTok photo mode

| Item | Value | Source / note |
|---|---|---|
| Photos per post | up to 35 | TikTok Content Posting API, photo post reference (`photo_images`, max 35) |
| Title / description | title up to 90, description up to 4,000 (UTF-16 runes) | same page |
| Formats | JPEG or WebP, up to 1080p, 20 MB each | TikTok media transfer guide, "Image restrictions" |
| Canvas we use | 1080×1920 (9:16) | third-party guides agree on 9:16; other ratios are letterboxed or filled |
| Cover | `photo_cover_index` picks it (API); in the app you choose the cover | make slide 1 the cover |
| Music | `auto_add_music` (API, direct post only); in the app you pick a sound | use a sound from TikTok's library, never a ripped track |
| AI label | `is_aigc` (API); app: More options → "AI-generated content" | label every generated slide set |
| Unaudited apps | posts are private (`SELF_ONLY`) until TikTok audits the app | |
| `@useclaudia/social` | **photo posts are not supported** (one video per post) | upload photo posts in the TikTok app |

Safe zone (house convention, matching [captions-and-hooks](../../captions-and-hooks/SKILL.md)): keep text out of the bottom
~420 px (caption, sound, buttons), the right ~150 px (like/comment/share rail) and the top ~250 px. `build-carousel.mjs`
pads the `tiktok` size this way.

Sources: developers.tiktok.com/doc/content-posting-api-reference-photo-post and
developers.tiktok.com/doc/content-posting-api-media-transfer-guide (fetched 2026-10).

## LinkedIn document posts ("PDF carousels")

| Item | Value | Source / note |
|---|---|---|
| File | PDF (also PPT, PPTX, DOC, DOCX; PDF recommended) | LinkedIn Help, answer 97459 |
| Limits | 100 MB and 300 pages | same |
| Page size | one common page size for every page; flatten layered PDFs | same |
| Title | required at upload | same |
| After posting | you can edit the text or delete the post, **not** replace the document | same |
| Viewers | can download the document as a PDF | so nothing private goes in it |
| Animations, video | appear as still images | |
| Canvas we use | 1080×1350 (4:5) pages, 8–15 pages | `build-carousel.mjs` `linkedin` size; Chrome prints `deck.pdf` at that size |
| Links | put the URL in the post text; don't rely on links inside the PDF | |
| `@useclaudia/social` | posts 1–20 images or 1 video to a personal profile, **not documents** | upload document posts in LinkedIn by hand |

Source: linkedin.com/help/linkedin/answer/97459 (fetched 2026-10); package README.

## Other places a carousel can go

| Network | Images per post | Through `@useclaudia/social` | Notes |
|---|---|---|---|
| LinkedIn multi-image | 1–20 | yes, with alt text per image | a grid, not a swipe; documents usually suit step-by-step content better |
| Threads | up to 20 | yes (carousel; alt text only on single images in the current connector) | 500-char text |
| X | 4 | yes (`media` with `alt`, 1,000-char descriptions on X) | split long decks into a thread of 4-image posts, or post 1 cover + link |
| Bluesky | 4 | yes | 300 graphemes |
| Pinterest | 1–5 images | yes | Trial access apps post privately |

Package limits come from `social.networks()`; run it to see the live values.
