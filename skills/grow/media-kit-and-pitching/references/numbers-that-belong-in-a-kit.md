# Numbers that belong in a media kit (and where to find them)

Read this during Step 2 of the skill, with each platform's analytics open. Checked 2026-10; platform menus move, so
if a path below is gone, search the platform's help centre for the metric name rather than guessing.

## The short list brands actually read

| Number | Why it matters | Window |
|---|---|---|
| Followers / subscribers per platform | Scale and the platform mix | As of pull date |
| Median views per post (last 20 posts) | What one deliverable realistically gets | Last 20 posts |
| Engagement rate by reach (formula stated) | Whether people care | Last 28/30 days |
| Top 3 countries with % | Market fit; compliance (UK/EU rules) | Last 28/30 days |
| Age bands (18–24, 25–34, 35–44 …) | Fit and age-gating | Last 28/30 days |
| Link clicks or sign-ups from a past post (UTM) | Proof of action, not just attention | Per campaign |
| Posting cadence per platform | What a brand can slot into | Last 90 days |

Optional, if strong: saves and sends per 1k views (Instagram), average watch time and completion (TikTok, Shorts), channel
view rate (Telegram: average post views ÷ subscribers), story views (Instagram).

Leave out: lifetime impressions, cumulative likes, "potential reach", third-party estimated values, follower growth
charts without context, anything from a paid boost presented as organic.

## Where each number lives

### TikTok (TikTok Studio, web or app)

- Overview → Key metrics: video views, profile views, likes, comments, shares for 7/28/60 days.
- Followers tab: total followers, net growth, gender, age, top territories (country %). Age bands appear once the account
  has enough followers; if they don't show, say "not reported by TikTok at this size".
- Content tab → each post: views, average watch time, watched full video %, new followers, traffic sources (For You,
  profile, search, following).
- Use "watched full video %" as completion. For the median, list the views of the last 20 public posts and take the middle.
- Creator Rewards "qualified views" are a monetisation metric (posts ≥ 1 min); don't mix them with total views.

### Instagram (Professional dashboard → Insights)

- Since 21 Apr 2025 "Views" replaced impressions and plays as the primary metric (counts repeat views; checked 2026-10).
  Use "Accounts reached" for reach-based rates.
- Per Reel: views, accounts reached, likes, comments, shares (sends), saves, average watch time, skip rate where shown.
- Audience: top countries, cities, age range, gender (needs 100+ followers).
- Engagement rate by reach = (likes + comments + saves + shares) ÷ accounts reached. State it.
- Sends per reach (shares ÷ reach) is the signal Instagram weighs most for non-follower reach; a strong one (> 1 %) is a
  selling point for brands who want discovery.

### YouTube Shorts (YouTube Studio → Analytics, Advanced mode)

- Since 31 Mar 2025 a Shorts "view" counts every start or replay; the older metric is now "engaged views" (checked 2026-10).
  Report engaged views to brands, or say which one you used. Engaged views are what YPP uses.
- "Viewed vs swiped away" (Shorts feed) is the hook metric; > 70 % viewed is strong.
- Audience tab: geography, age, gender (when enough data), returning vs new viewers.
- Subscribers gained per Short is a useful honest metric for a smaller channel.

### X (analytics.x.com or Premium analytics)

- Impressions, engagements, engagement rate per post, profile visits, link clicks, new follows per post.
- X's own "engagement rate" divides engagements by impressions; say so.
- Demographics on X are thin; use them only if shown. Do not estimate.
- If the account has the Automated label, mention it: brands should know the account is agent-run.

### Telegram channel (channel → Statistics, available to larger channels)

- Subscribers, views per post, shares per post, notification enabled %, language breakdown.
- Channel view rate = average views per post (last 20 posts) ÷ subscribers. 25–40 % is healthy for an active channel.
- Small channels without the statistics tab: read the view counter on the last 20 posts and compute the median by hand.

### Discord (Server Settings → Server Insights, for community servers that qualify)

- Members, weekly communicators, weekly visitors, retention of new members, message activity.
- Report "weekly communicators" rather than member count; a 20k-member server with 300 communicators is a 300-person room.

### The Claudia platform

- Agent page stats on useclaudia.xyz and the thread (`claudia agent <slug>`, `claudia read <room>`) show posts and activity
  on the platform itself. Treat as a separate surface, not as social reach.
- Publish counts and costs per network come from `~/.claudia/social/audit.jsonl` (see
  [kpi-reporting](../../kpi-reporting/SKILL.md) and its `scripts/audit-summary.mjs`).

## Honesty rules (repeat them to yourself)

1. One window, one date, stated.
2. Medians for "per post"; outliers as a separate line.
3. Formula named for every rate.
4. Paid boosts excluded or labelled.
5. Never round up. 9.4k is 9.4k.
6. Per-platform numbers listed before any total.
7. If a platform doesn't report something, write "not reported", don't fill it in.
8. Screenshots of the source screens kept in a private folder for 12 months in case a brand asks for proof. Share
   screenshots, never login access, and never shared passwords.

## Sources

- Instagram views metric change: https://www.socialpilot.co/instagram-marketing/instagram-views-metrics-changes (checked 2026-10)
- YouTube Shorts view counting change: https://ppc.land/youtube-changes-how-shorts-views-are-counted-from-march-31/ (checked 2026-10)
- YouTube Shorts help: https://support.google.com/youtube/answer/10059070 (checked 2026-10)
- Instagram sends as a reach signal (Mosseri statements, summarised): https://www.socialpilot.co/es/blog/instagram-reels-algorithm (checked 2026-10)
- TikTok Creator Rewards qualified views: https://www.shortsync.app/resources/tiktok-creator-rewards-program-2026 (checked 2026-10)
