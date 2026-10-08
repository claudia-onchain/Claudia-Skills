# How TikTok distributes videos in 2026

Read this when planning hooks, lengths and captions, or when diagnosing a video that stalled. Checked 2026-10.

## The distribution loop

1. A new video is shown to a small test batch (a few hundred people), drawn mostly from people likely to enjoy that topic,
   not only followers.
2. If the batch watches long, rewatches, shares, saves and comments above what's typical for similar videos, it gets a
   larger batch. This repeats in waves.
3. Early velocity — roughly the first hour — decides whether the first waves expand.
4. Videos can resurface days or weeks later through search and topical interest.

## Signals by weight (2026 analyses; TikTok doesn't publish weights)

| Signal | Weight | How to raise it |
|---|---|---|
| Average watch time and % watched to the end | highest | Hook in 0–2 s, cut dead air, keep promises early |
| Rewatches / loops | high | End on a frame that flows into the start |
| Shares (sends to friends) | high | Relatable "this is so you" moments, useful tips |
| Saves | high | Checklists, tutorials, "save for later" value (no need to ask) |
| Comments (and creator replies) | medium | One clear question; reply within the hour; reply-with-video |
| Likes | lower | Follows from the above |
| Follows from the video | medium | Series with a name and a next episode |
| "Not interested", skips in < 1 s, reports | negative | Don't bait; match the hook to the content |

Length guidance: retention matters more than length. A 12 s clip watched fully beats a 60 s clip abandoned at 5 s, but a
60 s video held at 80% gets wider distribution than a 15 s clip at 95%. Creator Rewards only pays on videos over 1 minute,
which tempts padding — don't pad.

## Benchmarks to judge a video (TikTok Studio)

| Metric | Weak | OK | Strong |
|---|---|---|---|
| 3-second hold (viewers still watching at 3 s) | < 50% | 50–70% | > 70% |
| % watched full video (≤ 20 s clips) | < 15% | 15–35% | > 35% |
| Average watch time vs length | < 40% | 40–70% | > 70% (loops push past 100%) |
| Shares per 1,000 views | < 2 | 2–8 | > 8 |
| Saves per 1,000 views | < 3 | 3–10 | > 10 |
| Follows per 1,000 views | < 1 | 1–4 | > 4 |

These are working benchmarks from 2026 creator analytics write-ups, not TikTok figures; compare to the account's own median.

## Search (TikTok SEO)

TikTok is a search engine for many under-35s. It reads:
- caption text (the first 100 visible chars matter most),
- on-screen text (OCR),
- spoken words (speech recognition) and auto-captions,
- hashtags, sound name, and comments.

Process:
1. Type the topic into TikTok search; note the autocomplete suggestions and the "Others searched for" box.
2. Pick one phrase a viewer would type ("rainy day aesthetic", "AI influencer how", "how to make AI videos consistent").
3. Put it in the first line of the caption, as on-screen text in the first 3 s, and in the voice line.
4. Check TikTok Studio → video → "Search terms" a week later; reuse winners in the series.

Hashtags: 3–5 specific tags. `#fyp` and `#viral` add nothing measurable. Always include an AI disclosure tag.

## What gets a video held back

- Unlabelled realistic AI, unoriginal uploads, watermarks from other apps.
- Undisclosed ads; financial promotion (removed, not just held back).
- Engagement bait; misleading hooks with high early skip rates.
- Low image quality (under 720p), letterboxed horizontal video.
- Text in the bottom ~20% or right ~15% covered by UI.

## Timing

Sprout Social's 2026 analysis (≈2B engagements, Nov 2025–Feb 2026): TikTok best Tue and Thu 14:00–17:00 local; Buffer's
2026 data (7.1M TikTok videos) shows strong evenings too. Pick the audience's time zone from TikTok Studio → Followers →
activity, then test two slots for two weeks each (../../growth-experiments/SKILL.md).

## Sources (checked 2026-10)

- https://blog.hootsuite.com/tiktok-algorithm/
- https://www.eclincher.com/articles/how-the-tiktok-algorithm-works-in-2026
- https://www.opus.pro/blog/tiktoks-new-algorithm-2026
- https://sproutsocial.com/insights/best-times-to-post-on-social-media/
- https://buffer.com/resources/best-time-to-post-on-social-media
- TikTok For You eligibility: https://www.tiktok.com/community-guidelines/en/fyf-standards
