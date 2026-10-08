# Example: Juno replaces generic windows with its own after six weeks

Juno is a fictional AI agent (@juno_charts) making chart-literacy explainers and lo-fi desk vlogs; Dana (they/them)
runs it. Juno started with the generic 2026 windows (X Tue/Wed 09:00–11:00, TikTok Tue/Thu 14:00–17:00) in
`America/New_York`. After six weeks: ~4,000 X followers, ~11,000 TikTok, 600 Telegram.

## The data (28 Aug – 8 Oct 2026)

Dana exported post-level analytics, converted every timestamp to `America/New_York` (X exports UTC; TikTok showed
Dana's phone zone, which was New York), and bucketed by 2-hour blocks of the week. Blocks with < 3 posts were dropped.

TikTok (61 videos), median views per video by block, top and bottom:

| Block | Videos | Median views | Median new followers |
|---|---|---|---|
| Sun 19–21 | 6 | 14,800 | 61 |
| Thu 20–22 | 5 | 12,100 | 44 |
| Tue 19–21 | 7 | 9,400 | 31 |
| Tue 14–16 (generic "best") | 9 | 5,200 | 12 |
| Thu 14–16 (generic "best") | 8 | 4,700 | 10 |
| Mon 08–10 | 4 | 2,900 | 4 |

X (138 posts), median impressions and follows:

| Block | Posts | Median impressions | Median follows |
|---|---|---|---|
| Wed 08–10 | 12 | 2,400 | 6 |
| Tue 08–10 | 11 | 2,250 | 5 |
| Sun 18–20 | 9 | 2,100 | 7 |
| Fri 14–16 | 10 | 900 | 1 |

Telegram views peaked for posts sent 12:00–13:00 New York (lunch) and 20:00–21:00.

## What Dana concluded

- The generic TikTok afternoon slots were mid-table. Juno's audience (students and people learning after work) watches
  in the evening, matching Buffer's 2026 finding that TikTok peaks later for many accounts.
- X mornings held up; Sunday evening was a surprise top block for follows.
- Fridays were weak everywhere; Juno now posts one light vlog on Friday and nothing else.

## The new schedule (`schedule-rules.json` excerpt)

```json
{
  "tiktok":   { "tz": "America/New_York", "perDay": 1, "windows": ["19:00-21:00", "20:00-22:00"], "minGapMin": 360 },
  "x":        { "tz": "America/New_York", "perDay": 3, "windows": ["08:00-10:00", "18:00-20:00"], "minGapMin": 120 },
  "telegram": { "tz": "America/New_York", "perDay": 2, "windows": ["12:00-13:00", "20:00-21:00"], "minGapMin": 300 },
  "reactiveShare": 0.2
}
```

70% of posts go in the top blocks, 20% in untested blocks (Sat 10–12 and Mon 19–21 this month), 10% reactive.

## The clock change

Juno's 18% UK audience gets the Telegram lunch post at 17:00 London most of the year, but in the week of 26–31 Oct 2026
London is only 4 h ahead, so it lands at 16:00. Dana left it in `America/New_York` on purpose (82% of members are in the
US) and noted it in the calendar. The planner's output made the shift visible before approval.

## Four weeks later

| | Before (generic) | After (own windows) |
|---|---|---|
| TikTok median views / video | 6,100 | 9,800 |
| TikTok new followers / week | 210 | 330 |
| X median follows / post | 3 | 5 |
| Posts per week | 19 | 17 |

Fewer posts, better placed. Dana logged the change as an experiment (slot move, 4 weeks, TikTok median views as the
metric) per [growth-experiments](../../growth-experiments/SKILL.md), and will re-run the bucketing monthly.
