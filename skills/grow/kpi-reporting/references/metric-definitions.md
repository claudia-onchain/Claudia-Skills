# Metric definitions by platform

Read this in Step 2 and whenever a number looks off. Paste the definitions you use into each report's footer.
Checked 2026-10; platforms rename metrics often, so confirm the label in the current dashboard.

## Cross-platform formulas (the ones this skill uses)

| Metric | Formula | Notes |
|---|---|---|
| Interactions | likes + comments + shares + saves | Reactions count as likes on Telegram; reposts count as shares on X |
| ER by reach | interactions ÷ reach | Default for short video. Where reach isn't reported, use views and label it "ER by views" |
| ER by views | interactions ÷ views | TikTok, Shorts |
| ER by impressions | engagements ÷ impressions | X's own definition (engagements include clicks, profile clicks, expands) |
| ER by followers | interactions ÷ followers at post time | For comparison with old reports or brand requests only |
| Sends per reach | shares ÷ reach | Instagram "shares" are mostly DM sends; > 1 % is strong |
| Saves per 1k views | saves ÷ views × 1000 | Usefulness signal; strong for how-tos |
| Follows per 1k views | follows from the post ÷ views × 1000 | Best single "did this build the account" metric |
| Completion | viewers who watched to the end ÷ viewers | TikTok "watched full video"; for others, avg watch time ÷ length as a proxy |
| Viewed vs swiped away | Shorts feed: viewed ÷ (viewed + swiped) | Hook quality. > 70 % strong |
| Follower growth rate | (followers end − followers start) ÷ followers start | Per week or month |
| CTR | link clicks ÷ views (impressions on X) | Only on posts with a link |
| Conversion | UTM sign-ups ÷ UTM sessions (or ÷ link clicks) | State which denominator |
| Cost per sign-up | (API + generation + ad spend) ÷ sign-ups | Spend from audit summary and receipts |
| Channel view rate | median views per post ÷ subscribers | Telegram channels; 25–40 % healthy |
| Active members | members who posted or reacted in period | Discord/Telegram groups |

## TikTok

- **Video views**: times the video started playing, including replays.
- **Qualified views**: Creator Rewards metric (posts ≥ 1 min, rules decided by TikTok); not comparable to views.
- **Watched full video %**: completion.
- **Average watch time**: seconds; divide by length for a completion proxy.
- **Traffic source**: For You, Following, Profile, Search, Sound. Search share rising = keywords working.
- **New followers** per video: available per post in TikTok Studio.

## Instagram

- **Views**: times content was played or displayed, including repeats (primary metric since 21 Apr 2025; replaced
  impressions and plays).
- **Accounts reached**: unique accounts that saw it at least once. Use for ER by reach.
- **Shares**: sends via DM and shares to Stories. Use for sends per reach.
- **Saves**, **likes**, **comments**, **follows** (per post), **skip rate** (Reels, where shown).
- **Trial Reels**: show to non-followers first; report their metrics in a separate block until they're shared to
  followers.
- **Collab posts**: metrics are shared across up to 6 profiles; report them once, marked "collab", and don't add them
  to each partner's totals.

## YouTube Shorts

- **Views**: since 31 Mar 2025, every start or replay.
- **Engaged views**: the older, stricter count; used for YPP. Report this to brands.
- **Viewed vs swiped away**: Shorts feed hook metric.
- **Average percentage viewed**, **subscribers gained**, **returning viewers**.

## X

- **Impressions**: times the post was on screen.
- **Engagements**: all clicks and interactions (likes, reposts, replies, link clicks, profile clicks, media expands).
- **Engagement rate**: engagements ÷ impressions (X definition).
- **Link clicks**, **profile visits**, **new follows** per post.
- **Verified Home Timeline impressions**: X Original Content Rewards basis; not the same as all impressions.
- Replies made by the account inflate post counts; count originals and replies separately.

## Telegram

- **Views** per post (eye counter), **reactions**, **forwards** (shares), **subscribers**, **notifications enabled %**
  (statistics tab for larger channels). Groups: **active members** from admin statistics.

## Discord

- **Members**, **weekly communicators** (sent a message or joined voice), **weekly visitors**, **new member retention**
  (Server Insights for eligible community servers). Report communicators, not members.

## Claudia platform

- Thread posts and replies by the agent (`claudia read <room>`), agent page views where shown, sign-ups and activations
  on useclaudia.xyz by UTM. Keep separate from social metrics.

## Words not to use in reports

"Reach" for impressions, "views" for impressions, "engagement" without a formula, "viral" without a multiple of median,
"organic" for boosted posts, "total audience" for summed followers.

Sources: Instagram views https://www.socialpilot.co/instagram-marketing/instagram-views-metrics-changes ;
YouTube Shorts views https://ppc.land/youtube-changes-how-shorts-views-are-counted-from-march-31/ ;
Shorts help https://support.google.com/youtube/answer/10059070 ; X automation and analytics https://help.x.com/en/rules-and-policies/x-automation ;
TikTok Creator Rewards https://www.shortsync.app/resources/tiktok-creator-rewards-program-2026 (all checked 2026-10).
