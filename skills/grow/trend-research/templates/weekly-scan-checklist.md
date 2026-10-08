# Weekly trend scan (30 minutes)

Run Monday morning in the audience's main time zone, plus the short X pass twice daily. Log every candidate in
`trend-log.csv` as you go; score at the end, not during.

## 0. Before you start (1 min)
- [ ] Open the brand guardrails (pillars, never-list) and last week's trend log results.
- [ ] Note any news moment: if a tragedy or major event is dominating feeds, pause reactive work for that audience and
      tell the operator.

## 1. TikTok (10 min)
- [ ] Creative Center → Trends → Songs: region = top 2–3 audience countries, 7 days. Note breakout/rising songs and
      whether each is approved for business use.
- [ ] Creative Center → Hashtags: 7 days; note tags whose curve started rising this week.
- [ ] Creative Center → TikTok Videos: watch the first 2 s of the top 10 in the closest industries; write down the hook
      patterns.
- [ ] Operator's phone, brand account For You: 20 min browse earlier in the week; paste the repeat counts here.
- [ ] Search bar suggestions for 3 pillar keywords.

## 2. Instagram + Threads (5 min)
- [ ] Reels audio with the ↗ trending arrow; note use counts.
- [ ] Threads trending topics and 2 relevant Communities.

## 3. YouTube (4 min)
- [ ] Studio → Inspiration / Trends: search trends and breakout topics for the channel.
- [ ] Search autocomplete for 3 pillar keywords.
- [ ] Check which TikTok trends from last week are now showing up in Shorts.

## 4. X (6 min)
- [ ] Explore → Trending / News.
- [ ] Grok Custom Timelines (2–3 niche timelines).
- [ ] Private niche List: what are 50–150 niche accounts riffing on today?
- [ ] Own mentions and quotes: recurring questions.

## 5. Google Trends (3 min)
- [ ] Confirm each spike candidate: real rising demand in the audience's countries, or one viral post?
- [ ] Check "Trending now" for anything that makes a candidate tragedy-adjacent.

## 6. Onchain culture (2 min, read-only)
- [ ] `claudia feed trending --interval 1h --order volume --limit 15 --json`
- [ ] `claudia feed hot --limit 15 --json`
- [ ] `claudia watch thread markets --duration 600 --json`
- [ ] Extract language and memes only. No coins as content.

## 7. Score and gate (in the log)
- [ ] Fit ×2 + velocity + window − effort for each candidate.
- [ ] Ten gates for each; any red = skip with `gate_failed`.
- [ ] Pick at most 3 go-trends for the week; at most 1 per platform per day; reactive ≤ ~30 % of the week.

## 8. Brief and hand off
- [ ] One `trend-brief.md` per go-trend, with audio and labels decided.
- [ ] Send briefs to the operator for approval before any generation spend.

## 9. Close the loop
- [ ] Log 72 h results for last week's trend posts (views vs median, follows per 1,000 views, shares/sends).
- [ ] One-line lesson per trend.
