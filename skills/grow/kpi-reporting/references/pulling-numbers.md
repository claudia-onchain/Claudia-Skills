# Pulling the numbers, platform by platform

Read this in Step 4 the first time you build a weekly sheet, and whenever a platform moves its export. Paths checked
2026-10; if one has moved, search the platform's help centre for the metric name.

## Order of work (weekly, Monday)

1. `node scripts/audit-summary.mjs --since <Mon> --until <Sun>` → what the agent published, blocked, failed, missed, cost.
2. `claudia accounts` → account list and ids; fix expiring tokens (LinkedIn 60 days, YouTube "Testing" apps 7 days).
3. Per-post metrics from each platform at day 7 → one row per post in the KPI sheet.
4. Site analytics by `utm_campaign` / `utm_content` → sessions and sign-ups into the sheet.
5. Community counts (Telegram, Discord) and thread activity.
6. `node scripts/engagement.mjs kpi.csv --from <Mon> --to <Sun>` → medians and flags.

## The audit log

`@useclaudia/social` writes `~/.claudia/social/audit.jsonl` (or `$CLAUDIA_HOME/social/audit.jsonl`): one JSON line per
draft, approval, publish, failure, connect, refresh and kill-switch change, never secrets. Shapes the scripts rely on:

```json
{"at":"2026-10-01T15:00:02.114Z","event":"published","post":"p_…","account":"acc_…","network":"x","remoteId":"…","url":"https://x.com/…","costUsd":0.215}
{"at":"2026-10-02T15:00:00.000Z","event":"publish_blocked","post":"p_…","account":"acc_…","reason":"…"}
{"at":"2026-10-03T15:00:00.000Z","event":"publish_failed","post":"p_…","account":"acc_…","network":"x","error":"…","uncertain":true}
{"at":"2026-10-04T09:00:00.000Z","event":"schedule_missed","post":"p_…"}
```

Note: on `schedule_missed` lines `at` is the time the post was due (the detail overrides the line time).

Use it for: post counts per network (published lines), API spend (sum of `costUsd`), what the rules blocked and why
(promises, caps, duplicates, link limits, X reply rule, kill switch), and uncertain failures, which a person must check
on the account before `publish(id, { retryUncertain: true })`. The `url` field links each sheet row to the live post.

In code (a host that wants live counts instead of the file):

```ts
social.on("audit", (line) => { if (line.event === "published") counter[line.network] = (counter[line.network] ?? 0) + 1; });
const week = social.posts({ status: "published", limit: 200 });   // post objects with results[].url per account
```

## Platform exports

| Platform | Where | What to export | Note |
|---|---|---|---|
| TikTok | TikTok Studio → Analytics (Overview, Content, Followers); per-post Analytics | Views, likes, comments, shares, saves, avg watch time, watched full video %, new followers, traffic source | Read per post at day 7 |
| Instagram | Professional dashboard → Insights; per-Reel "View insights" | Views, accounts reached, likes, comments, shares, saves, follows, avg watch time | Trial Reels and collab posts flagged in the sheet |
| YouTube | YouTube Studio → Analytics → Advanced mode → Content type: Shorts | Views, engaged views, viewed vs swiped away, avg % viewed, subscribers gained | Export CSV from Advanced mode |
| X | analytics.x.com (or Premium analytics) → Posts | Impressions, engagements, ER, link clicks, profile visits, follows | Export CSV per month; count originals and replies separately |
| Telegram | Channel → View statistics (larger channels); otherwise the eye counter per post | Views, reactions, forwards, subscribers | Small channels: read last 20 posts by hand |
| Discord | Server Settings → Server Insights (eligible community servers) | Members, communicators, visitors, retention | Report communicators |
| Claudia thread | `claudia read <room>`, agent page on useclaudia.xyz | Agent posts, replies received | Separate surface |
| Site | The operator's analytics (GA4 or similar) → Acquisition by campaign | Sessions, sign-ups by utm_campaign/utm_content | Floor, not exact |

## Using APIs for metrics

- Prefer exports and dashboards. They cost nothing per read and carry no automation risk.
- X API post reads are billed ($0.005 per post read, checked 2026-10); reading your own posts' metrics for a weekly
  report (say 60 posts) is about $0.30. Never pull other accounts' data at scale.
- YouTube Data API reads come out of the project's daily quota (10,000 units); `videos.list` with statistics is cheap,
  analytics need the YouTube Analytics API and the channel owner's consent.
- Meta and TikTok insights APIs need app review; for one account, the dashboard is quicker.
- Store any read-only tokens the operator sets up in their key store (`claudia keys set <name>`), never in the sheet.

## Sanity checks before writing anything down

- Sum of per-post views ≈ platform overview views for the week (within 10–15 %; overview includes older posts).
- Follower count at week end matches the profile.
- Post count per network matches the audit summary plus hand-made posts.
- Every sheet row has `ai_label` filled; paid rows have `ad_label = yes`.

Sources: social package README (audit log, costs, caps) in `@useclaudia/social`; X pricing https://postproxy.dev/blog/x-api-pricing-2026 ;
Instagram metrics https://www.socialpilot.co/instagram-marketing/instagram-views-metrics-changes ; YouTube Shorts views
https://ppc.land/youtube-changes-how-shorts-views-are-counted-from-march-31/ (all checked 2026-10).
