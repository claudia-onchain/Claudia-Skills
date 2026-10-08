# Example: Claudia · Week 40 (2026-09-29 to 2026-10-05)

Built from `templates/kpi-sheet.csv` (the sample rows are this week). Numbers are illustrative but computed with the
scripts exactly as shown; Northpine is a fictional sponsor. This was the launch week of the skills library on
useclaudia.xyz, so the north star is UTM sign-ups.

## How the agent built it

```sh
node scripts/audit-summary.mjs --since 2026-09-29 --until 2026-10-05
node scripts/engagement.mjs templates/kpi-sheet.csv --from 2026-09-29 --to 2026-10-05
```

Audit summary (abridged):

```text
Drafts 19 · approved 17 · rejected 2 · scheduled 14 · kill switch on 0×
network      published  cost USD  blocked  failed (uncertain)  missed  replies  replies blocked
discord              1     0.000        0               0 (0)       0        0                0
telegram             1     0.000        0               0 (0)       0        3                0
x                    3     0.490        1               0 (0)       1       11                2
Blocked, by reason:
     1  price promise: "will 10x"
```

What the agent noted from it: one X draft was blocked for a return promise (it mentioned a coin; the draft was
rewritten as an education post); two X replies were blocked by the reply rule because the posts didn't mention
@claudia_onchain; one scheduled X post was missed while the laptop slept and went back for approval ("Posting late?"),
and the operator re-approved it the next morning. TikTok, Instagram and YouTube posts were made in the apps by the
operator, so they don't appear in the audit log; the agent added them by hand. The Discord announcement went out
through a webhook and isn't in the sheet because Server Insights isn't available for this server yet.

Engagement script output:

```text
platform    posts  med views  ER/reach  ER/followers  sends/reach  follows/1k  CTR    completion
tiktok          4      12.3k      8.2%          2.1%         0.7%        7.48   2.3%       45.5%   (+1 paid)
instagram       2      15.1k      8.3%         11.0%         1.5%        7.96      —           —
x               2       8.6k      3.2%          1.5%         0.3%        3.09   2.1%           —   (+1 paid)
youtube         1      14.8k      3.1%         14.6%         0.2%        3.85      —           —
telegram        1        880      6.8%          2.5%         2.2%           —   7.3%           —

Flags (1):
  [outlier-high] tiktok tt-0930-rain: 96.4k views = 7.8x median; report separately, don't fold into averages
```

The agent noticed the TikTok median (12.3k) still includes the 96.4k outlier because there were only 4 organic posts;
with the outlier removed the median of the other three is 11.8k. It reports 11.8k and names the outlier, and notes
that 4-post medians are noisy. Instagram "ER by followers" of 11 % is inflated by the collab post's reach; the report
uses ER by reach.

## The report (as sent to the operator for review)

### Headline

**UTM sign-ups: 82** (4-week median 23, target 30–40). Launch week for the skills library: the X thread and the TikTok
how-to did the work; the viral rain video brought views but few clicks.

### Scoreboard (organic, paid excluded)

| Platform | Posts | Median views | ER by reach | Follows / 1k views | CTR | vs last week |
|---|---|---|---|---|---|---|
| TikTok | 4 (+1 outlier noted) | 11.8k without outlier (12.3k with) | 8.2 % | 7.5 | 2.3 % (1 link post) | +6 % |
| Instagram | 2 | 15.1k (collab post 21.4k inside) | 8.3 % | 8.0 | — | +31 % |
| X | 2 originals (+11 replies) | 8.6k impressions | 3.2 % | 3.1 | 2.1 % | +12 % |
| YouTube Shorts | 1 | 6.9k engaged views (14.8k views) | 3.1 % | 3.9 | — | first Short |
| Telegram | 1 | 880 views (37 % channel view rate) | 6.8 % | — | 7.3 % | flat |

Followers at week end: TikTok 42,450 (+1,640), X 18,830 (+80), Instagram 9,390 (+180).
Outlier (not in medians): TikTok "rain run, no umbrella", 96.4k views, 1,120 follows, 0 link clicks.
Paid: Northpine TikTok and X post, both #ad with branded content / paid-partnership labels on; 10.2k views and 4.1k
impressions; 265 clicks to Northpine's page (their UTM); reported to Northpine separately.

### What worked

1. X thread "six skills I use every day" (link in part 6 only): 14.2k impressions, 301 link clicks, 42 sign-ups. A
   numbered promise plus a visible result in each part.
2. TikTok how-to "install a skill in 60 seconds": lowest views of the week (9.1k) but 212 clicks and 31 sign-ups, and
   118 saves (13 per 1k views, the best this month). Usefulness beats vibe for the north star.

### What didn't

1. The viral rain loop: great for followers (1,120) but no CTA and 13 seconds long; zero clicks. Next time, pin a
   comment pointing to the series and the bio.
2. The Instagram room talk (Trial Reel): 8.7k views after graduating, 0.8 % sends per reach; the hook was a slow start.

### Action and attribution

- Link clicks 577 (organic) · UTM sessions 540 · UTM sign-ups 82 (15 % of sessions)
- Unattributed sign-ups (direct/search) in the same week: 47. "How did you hear?" answers: TikTok 41 %, X 33 %,
  friend 14 %, other 12 %. TikTok is under-credited by last-click UTMs, as expected with bio links.
- Best placement: `thread-part-6` (42 sign-ups).

### Flags and fixes

| Flag | Post | Fix | Owner | Done |
|---|---|---|---|---|
| outlier-high | tt-0930-rain | Reported separately; study the first 2 s for next rain loop | agent | yes |
| blocked: return promise | X draft | Rewritten as education post; no coin mention | agent + operator | yes |
| missed schedule | X 2026-10-02 | Re-approved; host now runs `tick()` from Claudia Local, not the laptop | operator | yes |

### Spend

| Item | USD |
|---|---|
| Social API (audit `costUsd`: 3 X posts incl. a 6-part thread, 2 with links) | 0.49 |
| X replies (11 × $0.01, billed by X, not in audit `costUsd`) | 0.11 |
| Media generation (own provider keys) | 41.80 |
| Ads / boosts | 0.00 |
| Total | 42.40 |
| Cost per UTM sign-up | 0.52 |

### Next week

1. Add a pinned comment with the series name to every rain-loop TikTok → follows to sign-ups (CTR).
2. Two more 60-second how-tos (TikTok + Shorts), one per new skill → saves per 1k and sign-ups.
3. Test a faster first second on Instagram room talks through Trial Reels (hook A/B in
   [growth-experiments](../../growth-experiments/SKILL.md)) → sends per reach.

Definitions as in the template footer. All content AI-generated and labelled on-platform.
