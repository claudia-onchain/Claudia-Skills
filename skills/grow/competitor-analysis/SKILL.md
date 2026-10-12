---
name: competitor-analysis
description: Compares 2–5 creators, brands, agents or coin communities side by side — share of voice, formats, posting cadence, engagement quality, positioning and the gaps nobody covers — from public data and official tools only, and ends with a weighted scorecard and three concrete moves. Use when someone asks "how do we stack up against X", "what are similar accounts doing", "why is their account growing faster", before a launch or repositioning, when picking collab partners, or when an agent needs a monthly competitive read. Includes a scorecard (Markdown and CSV), a post-sample log, a positioning map and a worked example. Never a buy/sell comparison of coins.
license: MIT
metadata:
  title: "Competitor analysis"
  category: "grow"
  summary: "Compare 2–5 accounts on voice share, formats, cadence, engagement quality and positioning, then pick three moves."
  level: "intermediate"
  tags: "competitors, benchmarking, share of voice, engagement quality, positioning, scorecard, strategy, research"
  uses: "@useclaudia/cli, @useclaudia/mcp"
  time: "2–3 h first run, 45 min a month after"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Competitor analysis

You can't copy your way to a following, but you can see where the space is crowded and where it is empty. This skill
compares 2–5 accounts on the same dates with the same formulas, scores them on one sheet, and turns the result into
three moves: a format to adapt, a habit to avoid, and a gap to own. Everything comes from public pages, official ad
libraries and Claudia's public data, collected by a person or within each platform's terms.

## When to use this

- "How do we compare with @<account>?" or "why are they growing faster?"
- Before a launch, a repositioning or a new series ([launch-campaigns](../launch-campaigns/SKILL.md),
  [personal-brand-strategy](../personal-brand-strategy/SKILL.md)).
- Picking collab partners: the best partners overlap in audience but not in format
  ([collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md)).
- Comparing agents on useclaudia.xyz, or the social presence of coin communities (content and community only).
- A monthly competitive read for an autonomous agent's operator.

Not for: tracking private individuals, digging into someone's personal life, or judging whether a coin will go up. A
coin comparison here covers how the community communicates, never price, returns or "which to buy".

## What you need

- A list of 2–5 names (accounts, brands, agents or coins) and the platforms that matter (1–3).
- The operator's own logged-in browser or phone for viewing public profiles. No scrapers, no headless browsers, no
  bought "competitor data" built from scraped accounts.
- Share-of-voice counts from [social-listening](../social-listening/SKILL.md) if it runs; otherwise a manual count.
- Metric definitions from [kpi-reporting](../kpi-reporting/references/metric-definitions.md) so the numbers mean the same
  thing as your own reports.
- For agents and coins: `@useclaudia/cli` (`claudia agent`, `claudia token`, `claudia insights`) or an MCP client on
  Claudia Data (`get_agent`, `list_agents`, `read_thread`, `get_coin_insights`). All public reads, no keys.
- A spreadsheet. Copy [templates/post-sample-log.csv](templates/post-sample-log.csv) and
  [templates/competitor-scorecard.csv](templates/competitor-scorecard.csv).

## Steps

1. **Pick the set and say why.** Choose 2–5 names in three roles: **direct** (same audience, same kind of content),
   **aspirational** (where you want to be in 12 months, at most one) and **adjacent** (same audience, different content;
   good collab candidates). Include yourself as row zero. Write one line per name on why it is in the set. Five is the
   ceiling: past that, the sample gets thin and the read gets vague. For agents, `claudia agents --q <topic>` or MCP
   `list_agents { "query": "<topic>", "sort": "trust" }` finds comparable ones.

2. **Fix the window and the sample.** Same dates for everyone: the last 30 days, or the last 20 posts per platform if an
   account posts less than 20 times a month. Read posts at least 7 days old (short video keeps growing for days). Log
   every post in the window in [templates/post-sample-log.csv](templates/post-sample-log.csv): date, platform, format,
   topic, hook (first line or first on-screen words), length, public counts, and the link. Note anything that skews the
   sample: a paid boost (check the ad libraries in [references/public-sources.md](references/public-sources.md)), a
   collab post, a giveaway, a viral outlier more than 10× the median.

3. **Measure share of voice.** Share of voice (SoV) = mentions of one name ÷ mentions of every name in the set, same
   sources, same window. Take mentions from your listening log, or count by hand in each platform's search for the
   window. Report two numbers: **mention SoV** (how much people talk about each) and **engagement SoV** (each name's
   total interactions on its own posts ÷ the set's total). A brand with high engagement SoV but low mention SoV is
   performing to its followers but not being talked about elsewhere. Formulas and pitfalls:
   [references/metrics-and-formulas.md](references/metrics-and-formulas.md).

4. **Map formats and cadence.** From the log, per name: posts per week per platform, format mix (% short video,
   image/carousel, text, long video, live), median length, posting days and hours (in the audience's time zone), and
   recurring series (a named, repeating format). Cadence matters less than consistency: write down the longest gap in
   the window and whether the account kept its series going.

5. **Judge engagement quality, not size.** Use per-post medians, never averages (one viral post wrecks an average).
   For each name compute **ER by views** (where views are public), **comments per 1,000 views**, and then read the top
   30 comments on 3 median posts and score: share of substantive comments (specific to the post, five words or more),
   creator reply rate, questions asked, repeat commenters. Flag patterns that suggest bought or pod engagement (sudden
   follower jumps, generic comments from empty accounts, likes far above views) as "unusual" in the sheet. Never
   accuse anyone publicly. The scoring guide is in [references/metrics-and-formulas.md](references/metrics-and-formulas.md).

6. **Add the agent and coin layer.** For an agent: `claudia agent <slug>` (profile, trust, stats,
   launches) and `claudia read <room>` or MCP `read_thread { "room": "t-<mint>" }` for how it talks in the Claudia
   thread. For a coin community: official X/Telegram cadence and tone, plus `claudia token <coin>` (launching agent) and
   `claudia insights <coin>` for holder count and age as context. Record how each communicates: education vs hype,
   disclosures present or missing, promises made. A community that posts price targets is a cautionary example, not a
   model. Write "Research aid, not financial advice." under any coin table.

7. **Find the positioning gaps.** Plot every name on two axes that matter to the audience (for example
   *education ↔ entertainment* and *polished ↔ raw*) in [templates/positioning-map.md](templates/positioning-map.md).
   Then list: topics every name covers (crowded), topics only one covers (owned), questions that keep appearing in
   their comments with no good answer (open), and formats nobody in the set uses on a platform where the audience is
   (open). Open cells that fit your pillars are the gaps worth taking.

8. **Score and choose three moves.** Fill [templates/competitor-scorecard.md](templates/competitor-scorecard.md): seven
   criteria scored 1–5 against the set, with the evidence for each score. Then write exactly three moves, each with an
   owner and a test: **adapt** one format (rebuilt in your own voice and look, never copied), **avoid** one habit that
   costs them (engagement bait, link spam, undisclosed ads), **own** one gap. Run each as an experiment
   ([growth-experiments](../growth-experiments/SKILL.md)) before it becomes the plan.

9. **Re-run monthly and keep the history.** Same set, same formulas, a new tab per month. Swap a name only when it is
   no longer relevant, and write down why. Trends across three months matter more than one month's ranking.

## Templates

- [templates/competitor-scorecard.md](templates/competitor-scorecard.md) — the one-page scorecard with weights,
  evidence column, positioning summary and the three moves.
- [templates/competitor-scorecard.csv](templates/competitor-scorecard.csv) — the same criteria for a spreadsheet.
- [templates/post-sample-log.csv](templates/post-sample-log.csv) — one row per post in the window.
- [templates/positioning-map.md](templates/positioning-map.md) — the 2×2 map, the gap grid and the comment-question list.
- [examples/claudia-vs-three-agents.md](examples/claudia-vs-three-agents.md) — a full run: Claudia against three
  fictional agent accounts, with the numbers, the scorecard and the three moves.

Quick summary block for a chat reply:

```text
Competitor read · <window> · <platforms> · set: <you>, <A>, <B>, <C>
Mention SoV: you <x>% · A <x>% · B <x>% · C <x>%
Median ER by views: you <x>% · A <x>% · B <x>% · C <x>%
Comments / 1k views: you <x> · A <x> · B <x> · C <x>
Crowded: <topics> · Open: <gaps>
Moves: adapt <format> · avoid <habit> · own <gap>
```

## Check before you finish

- [ ] Every name was measured on the same dates, same platforms and same formulas, with posts at least 7 days old.
- [ ] Medians, not averages; outliers and paid or collab posts are marked in the log.
- [ ] Every score in the scorecard has evidence (a number or a linked post).
- [ ] Data came from public pages, official ad libraries and public Claudia reads. No scraping, no logging into
      anyone else's account, nothing about private individuals.
- [ ] "Unusual" engagement is noted privately, never posted as an accusation.
- [ ] Any coin section talks about communication only and carries "Research aid, not financial advice."
- [ ] Exactly three moves, each with an owner and a test; "adapt" means rebuilt in your own voice, not copied.

## Pitfalls

- **Comparing follower counts.** Followers say little about today. Median views and comments per 1,000 views say more.
- **Comparing a 1M account with a 5K account.** Ratios help, but strategies differ by size. Keep at least one name
  within about 3× your size.
- **Copying the winner's format.** The audience already has that account. Take the principle (a recurring series, a
  question-led hook) and make it yours.
- **Trusting a viral outlier.** One post at 40× the median is luck plus timing. Read the median post.
- **Mixing view definitions.** Instagram, YouTube Shorts, TikTok and X count views differently
  ([kpi-reporting](../kpi-reporting/SKILL.md)); compare within a platform, never a summed total.
- **Treating their paid reach as organic.** Check the ad libraries before concluding a format "works".
- **Public call-outs.** "Their engagement looks bought" in a post is a reputation risk with no upside
  ([crisis-and-reputation](../crisis-and-reputation/SKILL.md)).
- **Turning a coin comparison into a tip.** "Their holders grew 3× faster" in public reads as a buy signal. Keep coin
  numbers in the private sheet.

## Related skills

- [social-listening](../social-listening/SKILL.md) — the mention counts behind share of voice.
- [audience-research-and-personas](../audience-research-and-personas/SKILL.md) — who you are competing for.
- [personal-brand-strategy](../personal-brand-strategy/SKILL.md) — turning a gap into positioning.
- [growth-experiments](../growth-experiments/SKILL.md) — testing the three moves.
- [kpi-reporting](../kpi-reporting/SKILL.md) — metric definitions and your own baseline.
- [collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md) — adjacent names as partners.
