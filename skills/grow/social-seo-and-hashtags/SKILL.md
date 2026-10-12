---
name: social-seo-and-hashtags
description: Makes posts findable through search inside TikTok, Instagram, YouTube, Pinterest, X, Threads and Bluesky — keyword research from in-app search and official trend tools, a keyword map, where each platform reads words (spoken line, on-screen text, caption, title, description, alt text, profile), the 2026 hashtag rules (Instagram's 5-tag cap, YouTube's 3-shown / 60-max rule, X's two-tag guidance, one Threads topic tag) and how to measure search traffic. Use when posts get views from For You but nobody finds them later, when writing titles, captions, alt text or hashtags for search, when someone asks "how many hashtags", or when planning evergreen how-to content. Includes a keyword map template, a per-post SEO checklist and a worked example.
license: MIT
metadata:
  title: "Social SEO and hashtags"
  category: "grow"
  summary: "Get found in in-app search: research keywords, map them to posts, place them where platforms read, and use hashtags the 2026 way."
  level: "beginner"
  tags: "social seo, hashtags, keywords, search, alt text, tiktok, instagram, youtube, pinterest, captions"
  uses: "@useclaudia/social"
  time: "1 h to build the map, 5 min per post"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Social SEO and hashtags

Feeds show a post for a few days; search keeps finding it for months. People type "how to make an ai character" into
TikTok and YouTube the way they used to type it into Google, and the posts that answer in plain words, in the places
the platform reads, keep getting found. This skill builds a keyword map from what people actually search, places one
keyword per post where it counts, uses hashtags the way each platform says to in 2026, and checks whether search
traffic grows.

## When to use this

- Posts do well for 48 hours and then stop; search traffic in analytics is near zero.
- Writing a title, caption, description, alt text or hashtag set and wanting it to be found.
- "How many hashtags should we use?" (the answer changed on Instagram in December 2025).
- Planning evergreen content: how-tos, explainers, "what is …" posts that should rank for months.
- Setting up a new profile so the name and bio say what the account is about.

Not for: keyword stuffing, hijacking trending tags that have nothing to do with the post, or tagging other creators to
borrow their reach. Platforms down-rank all three, and they read as spam.

## What you need

- The operator's logged-in apps (TikTok, Instagram, YouTube, Pinterest, X) to read search suggestions. No scrapers or
  keyword tools that scrape the apps.
- YouTube Studio (Analytics → Trends), Pinterest Trends (trends.pinterest.com), Google Trends; TikTok Creator Search
  Insights where it is available in your region.
- The audience's own words: comments, questions and survey answers from
  [audience-research-and-personas](../audience-research-and-personas/SKILL.md).
- The content plan or pillars ([content-pillars-and-series](../../create/content-pillars-and-series/SKILL.md)).
- A copy of [templates/keyword-map.csv](templates/keyword-map.csv) and
  [templates/post-seo-checklist.md](templates/post-seo-checklist.md).
- Optional: `@useclaudia/social` to set titles, tags and alt text in the draft so the preview shows them.

## Steps

1. **Collect the words people use.** Write 20–40 seed phrases in the audience's words, not yours. Pull them from
   comments ("what app is this", "how do you keep her face the same"), DMs, survey answers and the questions your
   competitors' comments keep asking ([competitor-analysis](../competitor-analysis/SKILL.md)). Prefer phrases with a
   clear intent: how-to ("how to make an ai influencer"), what-is ("what is an ai agent"), comparison ("x vs y"), or
   inspiration ("ai character outfit ideas").

2. **Expand them with in-app search.** For each seed, type it slowly into each platform's search bar and record the
   suggestions, the "others searched for" or related searches, and what the top results look like (format, length,
   age). Then check the official tools: YouTube Studio → Analytics → **Trends** (top searches, "Searched on YouTube",
   content gaps, last 28 days), Pinterest Trends (up to two years of search trends by region), Google Trends for the
   wider picture. Where and how to use each one: [references/keyword-research-sources.md](references/keyword-research-sources.md).
   A suggestion that appears on two or more platforms is a strong candidate.

3. **Build the keyword map.** Group the phrases into clusters (one topic, several phrasings) in
   [templates/keyword-map.csv](templates/keyword-map.csv). Each cluster gets one **primary keyword** (the most common
   natural phrasing), 2–4 **secondary** phrasings, an intent, the platforms where it shows up, and the pillar it belongs
   to. Then assign **one primary keyword per post**. Two posts chasing the same primary keyword in the same month
   compete with each other; give the second one a secondary phrasing.

4. **Put the keyword where it is read.** Same keyword, said and shown plainly, in every layer the platform offers:
   - **Spoken** in the first 3 seconds of a video ("here's how I make an AI character in three steps").
   - **On-screen text** in the hook ("HOW I MAKE AN AI CHARACTER").
   - **Caption first line** or **title**, in natural words, near the start (YouTube judges relevance by how well the
     title, tags, description and video content match the search, checked 2026-10).
   - **Description** with one or two secondary phrasings in full sentences (YouTube, Pinterest).
   - **Alt text** on images (step 6).
   - **Cover text** that repeats the hook, so the search results grid shows what the post answers.
   Write for a person first. If a sentence reads like a list of keywords, rewrite it. Per-platform detail:
   [references/platform-search-2026.md](references/platform-search-2026.md).

5. **Choose hashtags by the 2026 rules.** Hashtags are labels now, not reach levers. Use few, specific, true ones
   (checked 2026-10):

   | Platform | Rule | Use |
   |---|---|---|
   | Instagram | up to **5 hashtags** per post or Reel (since 18 Dec 2025) | 3–5: topic, community, `#aicharacter` |
   | TikTok | no official count | 3–5 specific tags; caption words do the search work |
   | YouTube | up to 3 shown by the title; **over 60 = all ignored** | 1–3 in the description |
   | X | help centre: no more than **2** per post | 0–1 |
   | Threads | one topic tag per post | the cluster's primary topic |
   | Pinterest | no current official guidance recommends them | skip; use keywords in title and description |
   | Bluesky, Mastodon | tags power search and custom feeds | 1–3, CamelCase for readability (`#AiArt`) |

   Never use unrelated trending tags, other creators' names, or `#fyp`-style blocks. One honest identity tag
   (`#aicharacter`, `#aiart`) helps the right people find an AI account and doubles as disclosure.

6. **Write alt text that helps.** Describe what is in the image in one or two sentences, put the keyword in only if it
   is true to the image, and start with the AI label: `AI-generated image: Claudia at her desk at dusk, a laptop with
   a chrome star sticker, writing a prompt for a new character.` On Instagram, add alt text to photo and carousel posts
   under Advanced settings → Write alt text before sharing, or Edit → Edit alt text afterwards (Meta's API documents alt text for images only, not Reels, checked 2026-10).
   With `@useclaudia/social`, pass it in the draft: `media: [{ path, alt }]`.

7. **Make the profile findable.** The profile name and bio should contain the one or two phrases people would search to
   find this kind of account ("AI character · studio creator"), plus the AI disclosure. Keep the handle the same across
   platforms ([personal-brand-strategy](../personal-brand-strategy/SKILL.md)). Pin or playlist the best answer to each
   primary keyword so a profile visitor finds it.

8. **Draft with the keyword fields set.** When posting through `@useclaudia/social`, set titles and tags per network in
   `options` so the preview shows exactly what ships:

   ```ts
   const post = social.draft({
     text: "How I make an AI character in 3 steps: the face, the rules, the approvals. #aicharacter #shorts",
     media: [{ path: "./how-i-make-claudia.mp4" }],
     targets: [{ account: yt.id }],
     options: {
       youtube: { title: "How I make an AI character (3 steps)", tags: ["ai character", "ai influencer", "how to make an ai character"], shorts: true },
     },
   });
   console.log(social.preview(post.id)); // check title length, labels and warnings before approval
   ```

   YouTube uploads stay `private` unless `privacyStatus` says otherwise; a person approves before anything publishes.

9. **Measure and refresh monthly.** Track the share of views from search per platform: TikTok traffic
   source "Search", YouTube traffic source "YouTube search" (and its search-terms list), Pinterest impressions over time
   in Pinterest Analytics. Compare the 4 weeks after you start mapping keywords with the 4 weeks before. Each month, mark
   which primary keywords brought search views, retire the ones that didn't after three posts, and add new phrases from
   comments. Log it next to your KPIs ([kpi-reporting](../kpi-reporting/SKILL.md)).

## Templates

- [templates/keyword-map.csv](templates/keyword-map.csv) — clusters, primary and secondary keywords, intent,
  platforms, pillar, assigned posts and results.
- [templates/post-seo-checklist.md](templates/post-seo-checklist.md) — the per-post pass: spoken, on-screen, caption,
  title, description, alt text, hashtags, label.
- [examples/claudia-keyword-map.md](examples/claudia-keyword-map.md) — Claudia's map for one month, with three posts
  written against it and the search numbers four weeks later.

Per-post fill-in:

```text
PRIMARY KEYWORD: <phrase>          SECONDARY: <phrase>, <phrase>
SPOKEN (first 3 s): "<line containing the primary keyword>"
ON-SCREEN HOOK: <≤ 6 words containing it>
CAPTION LINE 1 / TITLE: <natural sentence with it near the start>
DESCRIPTION: <1–2 sentences with a secondary phrasing>
ALT TEXT: AI-generated image: <what is in the image>
HASHTAGS (<platform rule>): <#topic> <#community> <#aicharacter>
AI LABEL: platform flag on · text label where no flag exists
```

## Check before you finish

- [ ] Every keyword came from real searches or the audience's own words, and each post has exactly one primary keyword.
- [ ] The keyword is spoken, shown and written in natural sentences; nothing reads like a keyword list.
- [ ] Hashtag counts follow each platform's 2026 rule (Instagram ≤ 5, YouTube 1–3, X ≤ 2, one Threads topic).
- [ ] No unrelated trending tags, no other creators' names or handles used as tags.
- [ ] Every image has alt text that starts "AI-generated image:" and describes what is actually there.
- [ ] AI labels are on (platform flag plus text where needed); paid posts carry `#ad` or the paid-partnership label.
- [ ] A baseline of search-sourced views was written down before the change, so next month has something to compare.

## Pitfalls

- **Hashtag piles.** Thirty tags is no longer allowed on Instagram and reads as spam everywhere. Pick five or fewer.
- **Writing for the algorithm.** "AI influencer AI character AI model AI girl" in a caption is stuffing. Platforms can
  tell; viewers can too.
- **Keyword in the caption only.** If the video never says or shows it, the post doesn't deliver on the search.
- **Chasing huge head terms.** "AI" is unwinnable; "how to keep an ai character's face consistent" is not.
- **Misleading keywords.** Ranking for a phrase the post doesn't answer (a tool it doesn't show, a result it doesn't
  deliver) gets swiped away and teaches the platform the post is a poor match.
- **Ignoring dates.** Search results favour fresh answers for fast-moving topics. Refresh evergreen posts each quarter
  with a new version rather than editing old captions repeatedly.
- **Coin keywords.** "Next 100x coin" and similar searches attract the wrong audience and promise-shaped captions. Keep
  coin content to news and education ([crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md)).

## Related skills

- [captions-and-hooks](../../create/captions-and-hooks/SKILL.md) — the hook and caption that carry the keyword.
- [trend-research](../trend-research/SKILL.md) — what is rising now, as opposed to what people search all year.
- [audience-research-and-personas](../audience-research-and-personas/SKILL.md) — the audience's own words.
- [ai-search-visibility](../ai-search-visibility/SKILL.md) — being found by AI assistants, outside the apps.
- [youtube-shorts-playbook](../youtube-shorts-playbook/SKILL.md) — titles and descriptions for Shorts.
- [kpi-reporting](../kpi-reporting/SKILL.md) — logging search traffic next to the other KPIs.
