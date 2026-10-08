# Shorts ranking signals and specs (checked 2026-10)

Read this when choosing lengths and formats, exporting, or diagnosing a Short that stopped after its first test audience.

## How a Short gets distributed

YouTube describes Shorts recommendations as audience-first: the system looks for viewers likely to enjoy the Short, based
on what they watched and skipped. In practice creators and analytics tools observe a three-stage funnel:

1. **Test audience** — a small batch of viewers in the Shorts feed (some subscribers, many not).
2. **Expansion waves** — if the batch chose to watch and kept watching, larger and broader batches follow.
3. **Long tail** — strong Shorts keep getting served for weeks; a Short can "wake up" later when a topic trends.

The signals that decide each step:

| Signal | Where to see it | What moves it |
|---|---|---|
| Viewed vs swiped away | Analytics → Shorts → "Viewed vs swiped away" | First frame + on-screen text; no intro |
| Average percentage viewed | Analytics → Engagement | Tight edit; payoff early; loops |
| Rewatches (>100% viewed) | Average percentage viewed above 100% | Short loops with a satisfying cut |
| Engaged views | Analytics → Overview (Shorts) | Overall quality; it's the count YPP uses for Shorts views since 2025 |
| Likes, comments, shares, subscribes | Engagement tab | A question or a series promise |
| Related video clicks | Shorts → Related video | Linking a long video that continues the Short |

Satisfaction surveys and "Not interested" taps count against a Short.

## Specs

| Item | Spec |
|---|---|
| Aspect | 9:16 vertical (1080×1920) or 1:1 square; YouTube decides "Short" from the file |
| Length | Up to 3 minutes (since Oct 2024). Sweet spot 15–40 s |
| Codec | H.264, AAC 48 kHz, 30 or 60 fps, faststart |
| Title | 100 characters; ~40 visible in the feed |
| Description | 5,000 bytes |
| Hashtags | First 3 show above the title; more than 15 → all ignored |
| Thumbnail | Pick a frame in the mobile upload flow (custom thumbnails for Shorts are limited); make frame 1 work as a cover |
| Safe zone | Keep text out of the bottom ~20% and the right ~15% (buttons, channel name, description) |
| Music | Use the Shorts sound picker / YouTube Audio Library; Shorts > 1 min with claimed music can be blocked |
| Related video | One long video (or Short) per Short; set in the app or Studio |
| Remix | Others can remix (sound, green screen, cut, Reimagine with Veo); remixes credit back. Per-video setting |

## Lengths that work

| Length | Use | Target average % viewed |
|---|---|---|
| 6–12 s | mood loops (Claudia's rooftop, lounge) | 100%+ (rewatches) |
| 15–30 s | a mini scene with a twist | 85% |
| 30–60 s | a how-it-was-made or a 3-beat story | 65–75% |
| 60–180 s | only when every beat holds (a tutorial with on-screen steps) | 50%+ |

A 30 s Short at 85% completion usually outruns a 60 s Short at 50% (vidIQ/Social Champ 2026 observations).

## Cross-posting from TikTok/Reels

Fine when it is the channel's own original content. Remove watermarks (export from the editor, not from the app), change
the on-screen text to fit YouTube's safe zone, and write a YouTube-native title. Don't upload the same file twice to one
channel; don't upload other creators' clips.

## Diagnosing

| After 48 h | Likely cause | Next time |
|---|---|---|
| Viewed < 60% | First frame doesn't stop the scroll | Start on the face mid-action; add 3–6 words of text |
| Viewed fine, avg % < 50% | Middle drags | Cut 20–30%; move the twist earlier |
| Good numbers, tiny views | Test audience too small (new channel) or topic mismatch | Keep cadence 4–6/week; stay in 2–3 series |
| Views stop at once on all Shorts | Possible policy issue | Studio → Monetization/Policy; check emails; stop uploading until clear |

## Sources

- YouTube Help, Shorts recommendations and analytics — https://support.google.com/youtube/answer/10059070
- OutlierKit, the Shorts algorithm in YouTube's words (2026) — https://outlierkit.com/resources/youtube-shorts-algorithm/
- Social Champ, YouTube Shorts algorithm 2026 — https://www.socialchamp.com/blog/youtube-shorts-algorithm/
- vidIQ, Shorts monetization 2026 (engaged views) — https://vidiq.com/blog/post/youtube-shorts-monetization/
- Hashtag rules — https://support.google.com/youtube/answer/6390658
- YouTube blog, Reimagine remix tool — https://blog.youtube/news-and-events/reimagine-new-ai-powered-remix-tool-youtube-shorts/
