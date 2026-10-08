# Example: Juno's 9× spike that wasn't growth

Juno (@juno_charts) is a fictional AI agent that makes chart-literacy explainers; Dana runs it (they/them). Numbers
are illustrative. This shows Step 5 (flags) turning into a decision instead of a celebration.

## What happened

Tuesday 2026-10-13, Juno's X post "How to read a volume bar in 20 seconds (no, it's not a buy signal)" showed
37,400 impressions by Wednesday morning. Juno's X median is 4,100. The post had a chart image, no link, no ticker.

Juno's daily metrics pull (once a day, own account, from the X analytics export) produced this row:

```csv
date,platform,account,post_id,post_url,format,pillar,length_s,is_paid,ad_label,ai_label,followers_at_post,impressions,views,engaged_views,reach,likes,comments,shares,saves,profile_visits,follows_gained,link_clicks,utm_campaign,signups,avg_watch_s,completion_rate,viewed_vs_swiped,cost_usd,notes
2026-10-13,x,@juno_charts,x-1013-volume,https://x.com/juno_charts/status/0000000000000000301,post,chart-literacy,,no,no,yes,4120,37400,,,,1460,402,38,12,95,0,,,,,,,0.015,"spike"
```

`engagement.mjs` flagged it three times:

```text
[outlier-high] x x-1013-volume: 37.4k views = 9.1x median; report separately, don't fold into averages
[er-spike] x x-1013-volume: ER 5.1% vs median 1.6%; read the comments for brigading or giveaway spam
[views-no-follows] x x-1013-volume: high views, zero follows: reach without fit, or non-human traffic
```

## How the agent investigated (no extra API spend)

1. **Read the replies in the app**, not via the API (X bills reads; Juno's inbox budget on X is 0/day). 402 comments:
   about 300 were near-identical "send me the signal group" and "DM me for 100x calls" replies from new accounts.
   The rest were real questions.
2. **Checked follows and profile visits**: 0 follows, 95 profile visits. Real interest from a 9× spike would bring
   dozens of follows at Juno's usual 3 per 1k impressions (~110 expected).
3. **Checked the quote posts**: a large "signals" account had quote-posted it with "this is why you need my paid
   group", sending its audience and its reply bots.
4. **Checked Juno's own behaviour in the audit log**: one post, no replies sent, nothing blocked. Juno did nothing
   that would explain the spike.

## Decision (Dana approved each step)

- **Report it as an outlier, not as growth.** Weekly report line: "x-1013-volume: 37.4k impressions (9.1× median)
  from a quote by a signals account; ~300 spam replies; 0 follows. Excluded from medians; no change to strategy."
- **Hide or report the spam replies** in the app (X allows authors to hide replies). Dana did this by hand; Juno did not
  automate hiding or blocking.
- **Do not reply to the quote post.** The X reply rule would allow it only if Juno was mentioned, and replying would
  amplify a signals account Juno doesn't want to be associated with.
- **Pin a clarifying reply under the post** (Dana wrote it, Juno drafted): "Juno doesn't run a signals group or DMs
  for calls. Anyone offering '100x' in these replies isn't us. Chart literacy only, not financial advice." Drafted
  through `@useclaudia/social`, which added the AI label and "Not financial advice." automatically; preview checked,
  approved, published once.
- **Watch for follow-on**: next day, check the account for impersonation (handles like @juno_chartz) and report any
  through X's impersonation form. See [crisis-and-reputation](../../crisis-and-reputation/SKILL.md).

## What the KPI sheet looks like afterwards

The row stays (never delete data), with `notes` = "spike from signals-account quote; ~300 spam replies hidden; excluded
from medians". Juno's weekly X median stays at 4.1k; the monthly report counts the post under "Outliers".

## The lesson Dana wrote into the KPI tree

"Impressions without follows are not reach that fits. A spike only counts toward the drivers if follows per 1k views
stay within half of the median."
