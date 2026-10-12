# Metrics and formulas for competitor reads

Read this in steps 3 and 5, and whenever two numbers in the scorecard disagree. Your own reports use the definitions in
[kpi-reporting](../../kpi-reporting/references/metric-definitions.md); this file covers what changes when you can only
see another account's **public** numbers.

## What is public, roughly (checked 2026-10)

Platforms change what they show. Before each run, check that every name in the set shows the same counts; if one hides
a count, drop that metric for the whole set rather than estimating it.

| Platform | Usually public on a post | Usually not public |
|---|---|---|
| TikTok | views, likes, comments, shares, saves (some accounts hide saves and likes) | reach, watch time, follows from post |
| Instagram | likes (unless hidden by the creator), comments; view counts on Reels | reach, shares (sends), saves |
| YouTube | views, likes, comments | engaged views, watch time, swipe-away rate |
| X | views, likes, reposts, quotes, replies, bookmarks | profile visits, follows from post |
| Threads / Bluesky | likes, replies, reposts, quotes | views, reach |
| Telegram channels | view counter, reactions, forwards | reach, who viewed |

## Formulas

| Metric | Formula | Use it for | Watch out |
|---|---|---|---|
| Median views per post | median of views over the sample | reach that is typical, not lucky | needs 10+ posts per name to mean much |
| ER by views (public) | (likes + comments + shares + saves) ÷ views | quality of attention | only add the counts every name shows; say which counts you used |
| Comments per 1,000 views | comments ÷ views × 1,000 | conversation depth | giveaways and "comment X to get Y" posts inflate it: mark them |
| Substantive comment share | comments that are specific to the post and 5+ words ÷ comments read | real interest vs drive-by | read the top 30 under 3 median posts, same for each name |
| Creator reply rate | comments in the top 30 the creator answered ÷ 30 | community care | pinned or hidden comments change the top 30; note it |
| Repeat commenters | names seen under 2+ of the 3 posts ÷ distinct names | loyalty | count, never list handles in a report |
| Mention SoV | name's mentions ÷ all names' mentions, same sources and window | being talked about | ambiguous names (a common first name) need exclusions first |
| Engagement SoV | name's interactions on own posts ÷ set's interactions | performing to followers | bigger accounts win this by size alone; read with ER |
| Posts per week | posts in window ÷ weeks in window | cadence | count replies separately on X |
| Longest gap | longest run of days with no post | consistency | a planned break is not a gap if announced |
| Follower growth | (end − start) ÷ start | momentum | needs two readings; take the first one at the start of the window |

Use medians for everything per-post. Report the sample size next to each median ("median of 18 posts").

## Engagement quality: a quick rubric

Score each name 1–5 on engagement quality from three readings, then average:

| Reading | 1 | 3 | 5 |
|---|---|---|---|
| Comments per 1,000 views vs the set median | under half | about the median | over 2× |
| Substantive comment share | under 20 % | 40–60 % | over 75 % |
| Creator reply rate in top 30 | none | 5–10 replies | 15+ replies, and they are real answers |

## Signs of unusual engagement (note privately, never accuse)

- Follower count jumps by a large step overnight with no viral post or press to explain it.
- Likes high but comments generic ("nice", "great post", single emojis) from accounts with no posts or default avatars.
- Likes or comments far above what the view count would allow.
- The same small group commenting first on every post within minutes (an engagement pod).
- Comments in languages that don't match the account's audience, all posted in the same minute.

Write "unusual: <what you saw>" in the sheet. It lowers your confidence in that name's numbers. It is not a finding
you publish.

## Sample size and fairness

- At least 10 posts per name per platform. Under 10, report the numbers but don't score that criterion.
- Same window for all. If one name posted far less, that is a finding (consistency), not a reason to widen its window.
- Read every post at least 7 days after it went up. Short video keeps collecting views for days.
- Exclude from medians, but keep in the log: paid posts, collab posts (shared metrics), giveaways, and posts over 10×
  the name's median.
