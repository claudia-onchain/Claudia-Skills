# Platform rules for crypto content (checked 2026-10)

Platforms enforce in hours, regulators in months. A post can be lawful and still get the account restricted. This file
lists what each platform allows for an AI influencer account that talks about coins, and what `@useclaudia/social`
already enforces for you.

## TikTok — strictest

Sources: TikTok Community Guidelines (regulated goods; frauds and scams; integrity and authenticity) —
https://www.tiktok.com/community-guidelines · Branded content policy — https://support.tiktok.com/en/business-and-creator/creator-and-business-accounts/branded-content-on-tiktok

- **Branded content**: financial products and services, including cryptocurrency, may not be promoted as branded
  content. Never accept a paid token or exchange promo for TikTok, and never mark one with the branded content toggle.
- **Community Guidelines**: no promotion or trade of high-risk financial products (crypto and forex trading promotion),
  no "get rich quick" or high-return investment schemes, no undisclosed marketing. Undisclosed marketing and engagement
  tricks ("like for like") are also ineligible for the For You feed.
- **Ads**: a beta lets FinCEN/FINTRAC-registered crypto firms advertise in the US and Canada. Not available to creators.
- **AI content**: realistic AI people or scenes need the AIGC label; TikTok also auto-detects C2PA Content
  Credentials. `@useclaudia/social` sets `is_aigc`.
- In April 2026 TikTok shortened the public guidelines page, removing much of the explanatory text; enforcement did not
  loosen. Assume the strict reading.

**What Claudia posts on TikTok:** lifestyle, character content, "how I check a coin for red flags" without naming a
coin, crypto news without tickers. **Never:** tickers, contract addresses, charts of a specific coin, "launch today",
links to buy pages, giveaways tied to tokens.

## Meta: Instagram, Facebook, Threads

Sources: Meta Ad Standards, Cryptocurrency products and services — https://transparency.meta.com/policies/ad-standards/restricted-goods-services/cryptocurrency-products-and-services ·
Branded content policies (Transparency Center → Policies → Other policies) — https://transparency.meta.com/policies/other-policies/

- **Ads** promoting exchanges, trading platforms, wallets with swapping, lending, or staking need Meta's **prior written
  permission** and a recognised regulatory licence.
- **Branded content** (paid partnerships) must use the "Paid partnership" label and follow the same restricted-goods
  rules. Expect crypto branded content to be reviewed or removed.
- **Organic**: no promises of returns, no scams, no "send crypto to receive more". AI info label for photorealistic AI
  media (`is_ai_generated` set by the package).
- **WhatsApp Business**: does not allow crypto promotion; `@useclaudia/social` does not post there.

## X

Sources: X automation rules — https://help.x.com/en/rules-and-policies/x-automation · X financial scam policy —
https://help.x.com/en/rules-and-policies/financial-scam · X ads policy, financial products and services — https://business.x.com/en/help/ads-policies/ads-content-policies/financial-services ·
coverage of the March 2026 paid-partnership change — https://dataconomy.com/2026/03/02/x-lifts-cryptocurrency-and-gambling-bans-for-paid-promotions/

- Crypto talk is allowed organically. Financial scams, fake giveaways, impersonation and manipulated engagement are not.
- Automated accounts need the **Automated** label linked to the managing account.
- API replies only to posts that @mention or quote the account (since Feb 2026); no unsolicited automated replies,
  mentions or DMs. The package enforces the reply rule and **one `$cashtag` per API post**.
- **Paid partnerships (changed 2 Mar 2026):** X removed crypto from its prohibited list for paid promotions (banned
  since June 2024). Sponsored crypto posts are allowed only with X's official **Paid Partnership** label and compliance
  with local law, and the option is **not available in the EU, UK or Australia**. The package sets `paid_partnership`
  when `labels.ad` is true; also write `#ad` and, for US securities-like tokens, the amount paid.
- Ads (X Ads, not organic) for crypto products need X certification per category and country.
- Original Content Rewards: engagement solicitation ("repost to win") three or more times removes the account from the
  program; giveaway-for-reposts is both a policy and an income risk.

## YouTube

Sources: Spam, deceptive practices and scams policy — https://support.google.com/youtube/answer/2801973 · Paid product
placements and endorsements — https://support.google.com/youtube/answer/154235 · Altered or synthetic content disclosure
— https://support.google.com/youtube/answer/14328491

- Tick **"My video contains paid promotion"** in YouTube Studio for any sponsorship, and say it in the video.
- Scams (giveaways, "double your crypto", fake livestreams with famous people) are removed and are the most common
  reason crypto channels are hijacked. Never show a QR code or wallet address asking for deposits.
- Altered/synthetic disclosure toggle for realistic AI content; YouTube auto-labels undisclosed synthetic media since
  27 May 2026. The package sets `containsSyntheticMedia`.
- Monetisation: YouTube's 2026 "inauthentic content" enforcement targets templated, mass-produced AI channels, and 2026
  commentary reports that AI personas giving finance advice are treated as non-advertiser-friendly. An AI character
  talking about coins should expect limited ads; keep finance content educational and human-reviewed.

## Telegram

Sources: Telegram Terms of Service — https://telegram.org/tos · Bot API — https://core.telegram.org/bots/api

- Channels and groups are public broadcast media for regulators: UK and EU rules apply to what is posted there.
- Scams and impersonation are reportable via @notoscam. Fake "official" Claudia channels are common: pin the real
  links.
- Bot limits: about 20 messages per minute per group or channel; the package caps Telegram at 50 posts per 24 h.
- Pin a short disclosure post (AI character, not financial advice, never DMs first, never asks for keys or deposits).

## Discord

Sources: Discord Community Guidelines — https://discord.com/guidelines · Discord policy on financial scams and fraud —
https://discord.com/safety

- Financial scams, fake giveaways and impersonation are banned; servers about crypto are allowed.
- Automation must never ping `@everyone`, roles or users; the package sends with `allowed_mentions: { parse: [] }`.
- Use an announcement channel with posting limited to staff and the bot; add an `#official-links` channel and a rule
  that staff never DM first.
- Server Shop / server subscriptions selling access to "signals" or "calls" is effectively investment advice: don't.

## What `@useclaudia/social` enforces vs what the operator must do

| Concern | Package (can't be turned off) | Operator / agent must still |
|---|---|---|
| AI label | Native flag where it exists, else "(AI-generated)" | Use the platform's in-app AI toggle on manual uploads; label thumbnails and stills too |
| Not financial advice | Added whenever a coin, price, CA or finance word appears | Keep it visible in videos (on-screen and spoken) |
| Price/return promises | Blocks "100x", "guaranteed", "risk-free", "will hit $1", "% daily", "passive income", "will pump/moon/double"… | Catch subtler ones: "next gem", "early", "floor is in", "can only go up" (`phrase-lists.json`) |
| Paid promotion | `labels.ad` → `#ad`, X `paid_partnership`, TikTok toggle | Disclose who paid and the amount; refuse crypto branded content on TikTok; Instagram Paid partnership tool |
| Interests (holding, launch, creator rewards) | Nothing | Write the disclosure into the post |
| UK/EU promotion law | Nothing | Classify every draft with the decision tree; no inducements |
| Replies | X summoned-only rule, caps, duplicates | Never reply "buy" to "should I buy?"; see engagement-and-replies |
| Volume | Daily caps, link caps, near-duplicate block | Keep coin posts to a minority of output |
| Emergencies | `killSwitch(true)` | Decide when to pull it (crisis-and-reputation) |
| Records | `audit.jsonl` | Classification, approver and payment details in the compliance log |
