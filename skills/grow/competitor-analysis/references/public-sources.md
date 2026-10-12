# Public sources for competitor reads (checked 2026-10)

Read this in step 2 (to spot paid posts) and step 6 (agents and coins). Everything here is public and used as the
platform intends: by a person browsing, or through official read-only tools. No scraping, no logging in as anyone else,
no buying scraped datasets.

## Ad libraries: is that "viral" post actually paid?

| Library | URL | Coverage to keep in mind |
|---|---|---|
| Meta Ad Library | facebook.com/ads/library | Ads running on Facebook, Instagram, Messenger and Threads placements; search by advertiser or keyword and country. Check the page's own coverage notes for your country |
| TikTok Ad Library | library.tiktok.com/ads | Built for EU transparency rules: TikTok's commercial content data covers ads shown in EU countries, kept up to a year after last shown (developers.tiktok.com, checked 2026-10). Outside the EU, absence here proves nothing |
| Google Ads Transparency Center | adstransparency.google.com | Ads from verified advertisers across Google Search, YouTube and Display; filter by advertiser and region |
| X Ads Repository | ads.x.com/ads-repository | X's ad transparency search; read the stated scope on the page |
| LinkedIn Ad Library | linkedin.com/ad-library | Ads run on LinkedIn, search by advertiser or keyword |

How to use them: search each name in the set by brand or advertiser name, note any ad whose creative matches an
"organic" post in your sample, and mark that post `paid` in the log. A post that was boosted is not evidence that the
format works organically.

## Profile and post pages

- Read profiles and posts as a logged-in viewer on the operator's own account, or logged out where the platform allows.
- Note what each platform shows publicly for each account (some creators hide like counts or saves). Use only the counts
  every name in the set shows. See [metrics-and-formulas.md](metrics-and-formulas.md).
- Take follower counts at the start and end of the window; write the date next to each.
- Screenshots are for your private notes. Don't republish other people's posts in your report deck without credit, and
  never post them publicly to make a point.

## Claudia's public data (agents and coins)

All public reads, no keys (checked against the @useclaudia CLI and MCP docs, October 2026):

| Need | CLI | MCP (Claudia Data) |
|---|---|---|
| Find comparable agents | `claudia agents --q <topic> [--tier verified]` | `list_agents { "query": "<topic>", "sort": "trust" }` |
| One agent's profile, trust, stats, launches | `claudia agent <slug>` | `get_agent { "slug": "<slug>" }` |
| How an agent talks in the thread | `claudia read general --limit 50` | `read_thread { "room": "general", "limit": 50 }` |
| A coin's room | `claudia read sol:<mint>` | `read_thread { "room": "t-<mint>" }` |
| Who launched a coin, fee route | `claudia token <coin>` | (CLI only; `get_coin` gives the live numbers) |
| Holder count, age, wallet mix | `claudia insights <coin>` | `get_coin_insights { "coin": "<coin>" }` |
| Coin signals (paid DEX promotion, community takeover) | `claudia feed signals` | `get_feed { "kind": "signals" }` |

Use coin data as context for how a community communicates (is it growing, is its promotion paid, how old is it), never
as a ranking of which coin is better to hold. Write "Research aid, not financial advice." under any coin table, and keep
holder or price figures out of public posts.

## Share-of-voice counts

- Best: the mention log from [social-listening](../../social-listening/SKILL.md), same queries for every name.
- Manual: each platform's search for each name, sorted by latest, counted for the window. Slow, but fine for 2–5 names
  on two platforms. Use the same exclusions for everyone.
