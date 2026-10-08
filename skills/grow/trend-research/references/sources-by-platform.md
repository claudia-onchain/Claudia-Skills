# Trend sources by platform (checked 2026-10)

Read this the first time you run a scan, and again whenever a surface looks different (platforms move these tabs
around often; YouTube rolled out a new Studio layout from July 2026, so tabs differ by channel and country).

Rule for agents: use official tools and the operator's own logged-in browsing. No scraping, no headless bots
scrolling For You, no buying "trend data" built from scraped accounts. If a tool needs a login, the operator logs in
and exports or pastes what the agent needs.

---

## TikTok

**TikTok Creative Center** — ads.tiktok.com/business/creativecenter (TikTok for Business login; no ad spend needed).

| Section | What it shows | How to use it |
|---|---|---|
| Trends → Hashtags | Top hashtags by region and 7/30/120-day window, with a trend curve | Look for curves that started rising in the last 7 days. Ignore evergreen giants (#fyp-type tags). |
| Trends → Songs | Popular and "breakout" songs by region; whether a track is approved for business use | Breakout + rising = early. Check the commercial-use marker before planning a branded post. |
| Trends → Creators | Rising creators by region and follower band | Format inspiration only; never copy a creator's signature bit without credit. |
| Trends → TikTok Videos | Top videos by region/industry and window | Watch the first 2 seconds of the top 10: that's the hook pattern of the week. |
| Top Ads / Keyword Insights | Ads and the phrases they use | Useful for wording and CTA patterns, not for organic trends. |

Filters that matter: **region** (set it to the audience's top 2–3 countries, not "All"), **time window** (7 days for
reactive work), **industry** (Tech & Electronics, Apparel & Accessories, Travel are the closest to Claudia's world).

**In-app (operator's phone):**
- For You browsing for 20–30 minutes on the brand account; count repeats. A sound or format seen 3+ times in 30 minutes
  is live in that account's niche.
- The sound page ("Use this sound" → view count of videos using it). A sound with a few thousand videos that is
  climbing daily is early; one with millions is peak or past it.
- The search bar's suggestions and the "Others searched for" panel show what people are searching right now; good for
  search-led captions (TikTok search is a real discovery channel in 2026).
- TikTok Studio analytics → "Viewers also watched" style insights where available.

**TikTok-specific caution:** anything crypto beyond plain news/education is removed or restricted on TikTok (branded
content policy bans financial products including crypto; Community Guidelines restrict promotion of high-risk
financial products). A "crypto trend" on TikTok is never a go. See [crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md).

---

## Instagram Reels and Threads

- **Trending audio:** in the Reels audio picker and on Reels themselves, a small upward arrow (↗) next to the audio
  name marks trending audio. Tap the audio to see how many Reels use it. Under ~10–20k Reels and rising = early.
- **Professional dashboard → "Trends"/inspiration surfaces** where available in the region; and the Edits app's
  inspiration feeds. Availability varies by region.
- **Explore and Reels feed** browsing on the brand account (same repeat-counting method as TikTok).
- **Threads:** the search tab's trending topics and Threads Communities (100+ interest communities in 2026). Good for
  conversation trends (prompts, "describe your job badly") that work as text posts.
- Instagram trends usually trail TikTok by a few days; a TikTok trend that is rising today is often a good Reels trend
  for next week.

Notes: hashtags are capped at 5 per post and Reel (since December 2025), so trend hashtags compete with evergreen ones;
pick 3–5 precise tags. Sends (DM shares) are the strongest reach signal to non-followers, so prefer trends people want
to send to a friend.

---

## YouTube Shorts

- **YouTube Studio → Inspiration** (formerly Research; may show as "Trends" or "Research" in the 2026 layout): search
  trends for the channel's audience, "breakout" topics, and generated idea suggestions with outlines. Treat generated
  ideas as prompts to think, not content to publish.
- **Shorts feed** on the brand account; the audio page from any Short shows how many Shorts use that sound; "Save music"
  to a sounds folder from the Shorts UI.
- **YouTube search autocomplete** on the topic: what people type now.
- Shorts trends often lag TikTok by roughly 3–7 days (rule of thumb), and Shorts reward search-friendly titles more than
  TikTok does.

---

## X

- **Explore → Trending / For you / News:** topics, with post counts. A count alone means little; open it and check
  whether accounts in the niche are posting about it.
- **Grok Custom Timelines** (2026): interest-based timelines that Grok assembles around a topic (for example "AI agents",
  "creator economy", "Solana culture"). The operator sets 2–3 up on the brand account and checks them twice daily.
- **Lists:** a private list of 50–150 accounts in the niche (other AI characters, creators, builders, onchain culture
  accounts). The single best early-signal source on X.
- **Own mentions and quote posts:** what people are already asking the account about.
- X Communities were shut down in May 2026; don't plan around them. Group conversation moved to XChat group chats and
  Custom Timelines.

X topics live hours to about a day. The X API charges per post read ($0.005 per post read, checked 2026-10), so an
agent should not "read the timeline" through the API to find trends; the operator browses or uses Lists.

---

## Google Trends

- trends.google.com → **Explore**: compare 2–5 terms, set the country and "Past 7 days" for reactive checks, "Past 12
  months" for seasonality.
- **Trending now**: live rising searches by country, with related news. Useful to confirm a TikTok/X spike is real
  demand and not one viral post, and to spot when a topic is news about a tragedy (gate it out).
- **YouTube Search** filter in Explore shows video search demand specifically.

---

## Onchain culture (Claudia platform, read-only)

```sh
claudia feed trending --interval 1h --order volume --limit 15   # coins with volume on the board (Solana)
claudia feed hot --limit 15                                       # what's hot right now
claudia feed signals --limit 10                                   # market signals
claudia watch launches --claudia-only --duration 900              # new coins launched on Claudia, 15 min
claudia watch thread markets --duration 600                       # the agent thread's markets room, 10 min
claudia rooms                                                     # list thread rooms
```

Add `--json` to any of these to save results for the scan log. Every screen says how old the data is.

What to extract: **language and memes** (a name pattern everyone is riffing on, a joke the agents keep making in the
thread, a format like "rate my launch banner"). What not to extract: coins to talk about. Posting "this one is
trending" is promotion, triggers NFA and promise rules, and is banned outright on TikTok. If a cultural moment is tied
to one specific coin, it fails the coin gate; talk about the culture in general or skip it.

---

## Weekly time budget

| Surface | Minutes |
|---|---|
| TikTok Creative Center + For You | 10 |
| Instagram trending audio + Threads | 5 |
| YouTube Inspiration + search | 4 |
| X Explore, Custom Timelines, List | 6 |
| Google Trends confirmations | 3 |
| `claudia feed` / thread pass | 2 |
| **Total** | **30** |

Sources: TikTok Creative Center (ads.tiktok.com/business/creativecenter); TikTok branded content policy and Community
Guidelines (tiktok.com/community-guidelines); YouTube Studio Inspiration updates (socialmediatoday.com, 2025–2026;
support.google.com/youtube); Instagram hashtag cap (December 2025 rollout, reported by later.com and
blogdumoderateur.com); X Communities shutdown (engadget.com, 2026); X API pricing (docs.x.com, postproxy.dev, 2026);
Google Trends (trends.google.com). All checked 2026-10.
