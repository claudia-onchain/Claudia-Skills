# Native test tools by platform (checked 2026-10)

What each platform offers for honest split testing of organic content, its limits, and the fallback when there's nothing.
Re-check before planning — these features change several times a year.

## Instagram — Trial Reels

- **What:** a Reel that is shown to non-followers first, not on the profile grid or to followers.
- **Eligibility:** public professional account (creator or business); Instagram's help page mentions a follower minimum
  that has varied by region (200–1,000 reported); the account must be eligible for recommendations. Some sources report up
  to 20 Trial Reels per 24 hours.
- **Timing:** first metrics after about 24 hours; the test window is 72 hours. Then share to followers manually, or turn on
  automatic sharing if it performs well.
- **How to use for A/B:** produce variants A and B from the same edit (only the variable differs), post both as Trial
  Reels within the same hour, compare per-view rates at 72 hours: 3-second hold, average watch %, sends per reach, follows
  per 1,000 views. Share the winner to followers; leave the loser as a trial.
- **Limits:** not a true randomised split (two separate recommendation runs), metrics are coarse, and the AI info label
  must be on for both if the content is realistic AI (it is, for Claudia).
- Sources: https://storrito.com/resources/how-instagram-trial-reels-work-72-hours/, https://help.instagram.com (search
  "trial reels").

## Instagram — other levers

- Hashtags are capped at 5 per post and Reel since December 2025, so hashtag-count tests are moot; test which five.
- Collab posts (up to 5 collaborators) change the audience, so never compare a collab post against a solo post in the same
  test.

## YouTube — Test & Compare

- **What:** concurrent split test of up to **3 thumbnails, 3 titles, or combinations** on long-form videos, in YouTube
  Studio. Viewers are split; the winner is picked on **watch-time share**, not click-through rate. Results usually within
  days, up to about two weeks; YouTube may say the variants "performed the same".
- **Not available for:** Shorts, scheduled livestreams, Premieres, private videos, made-for-kids content (checked 2026-10).
- Sources: https://support.google.com/youtube/answer/13861714,
  https://thumbnailtest.com/news/youtube-releases-title-test-compare/.
- **Shorts fallback:** ABAB by upload slot; primary metric "viewed vs swiped away" and average % viewed from Shorts analytics.
  The package uploads private by default for unaudited Google projects; a person publishes from Studio.

## TikTok

- **Organic:** no native A/B button for organic posts (checked 2026-10). Ads Manager has split testing for paid ads only
  (https://ads.tiktok.com/help/article/split-testing).
- **Fallback:** ABAB by slot with posts that differ only in the variable. Space near-identical variants at least a day
  apart and don't post more than two variants of the same edit: TikTok's For You eligibility rules demote unoriginal or
  duplicated content.
- Primary metrics from TikTok Studio: average watch time, % watched full video, rewatches, shares, follows from the video,
  search traffic share.
- Labels: the AIGC label stays on for every variant of realistic AI content. Crypto: no tickers, buy calls or return claims
  in any variant — TikTok removes crypto promotion even organically (see
  [crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md)).

## X

- **No native organic split test.** Fallback: ABAB by slot. X's ranking weighs early engagement (first ~15 minutes) and
  author-engaged replies, so time-of-day tests are worth running here — but the near-duplicate rule in
  `@useclaudia/social` blocks the same text within 24 hours, so vary the post or space them.
- Costs matter in test design: $0.015 per post and $0.20 per post with a link on the pay-per-use API (checked 2026-10).
  A link-vs-no-link test of 20 posts per arm costs $0.30 + $4.00.
- Don't test engagement bait ("like if…"): X's Original Content Rewards programme removes accounts after repeated
  engagement solicitation.

## Threads

- No split test. Text attachments (up to 10,000 characters) vs. a 500-character post is a testable format variable.

## Telegram channels

- No split test, but channel stats give views per post and shares/forwards. Good for testing post time and post length,
  because Telegram views come mostly from subscribers (low log SD, small samples suffice).
- Bots posting to channels: 20 messages per minute per channel limit (checked 2026-10) — irrelevant for tests, relevant for
  bursts.

## Discord

- Test announcement formats (embed vs plain, thread vs channel) by alternating; measure reactions and replies in the first
  24 hours. Never @everyone for a test.

## UTM tagging for link tests

Every link in a variant carries:

```
utm_source={platform}&utm_medium=social&utm_campaign=exp-{id}&utm_content={variant}
```

Read results in the site analytics, never by asking followers to report back. On useclaudia.xyz links the UTMs survive
redirects; check once with a test click.
