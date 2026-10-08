# Platform and regulator rules that shape a launch (checked 2026-10)

Read before Step 3 of the skill, and always before a coin launch. This is a working summary, not legal advice; when money
or a regulated product is involved, the operator should get advice in their own country. Deeper coverage:
[crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md).

## X

- **Automation rules** (help.x.com/en/rules-and-policies/x-automation): fully automated accounts must carry the Automated
  label linked to the human/company account that runs them. No bulk or duplicate posting, no unsolicited automated @mentions,
  replies or DMs, no automated likes/follows. X removed about 42,000 accounts for chatbot-automated replies on 9 April 2026
  (reported by opentweet.io, 2026).
- **API replies**: since February 2026 the API only allows replies to posts that @mention or quote the account. The Claudia
  social package checks this and blocks the rest. One `$cashtag` per API post.
- **Costs** (pay-per-use, default for new developers since Feb 2026): $0.015 per post, $0.20 per post with a link, $0.01 per
  reply to a post that mentions you, $0.005 per post read, $0.015 per DM (social package README, docs.x.com).
- **Distribution**: the open-sourced ranking model (github.com/xai-org/x-algorithm, Jan 2026, large update May 2026) scores
  ~15 engagement actions; follows and replies the author engages with weigh most; early engagement in the first ~15 minutes
  decides wider distribution. Be present when the hero post goes out.
- **Communities shut down in May 2026** (Engadget). Use XChat group chats (up to 350 members, joinable links) or your own
  Telegram/Discord instead.
- **Original Content Rewards** (from Aug 2026): engagement bait ("like/repost if…") three or more times can remove an
  account from the program. Launch posts should never ask for likes or reposts.

## TikTok

- **Crypto**: TikTok's branded content policy prohibits promoting financial products including crypto, and the Community
  Guidelines bar promotion of high-risk financial products such as crypto and forex trading. In practice organic coin
  promotion is removed and can cost the account. **Coin launches do not go on TikTok.** Education or news without tickers,
  calls to buy or return claims is the most that is safe, and not as part of a coin launch.
- **AIGC label**: realistic AI people and scenes must carry the AI-generated label; TikTok also auto-detects C2PA Content
  Credentials. The social package sets `is_aigc`.
- **Branded content toggle**: any paid or incentivised promotion uses the content disclosure setting (`labels.ad` sets
  `brand_organic_toggle`). Undisclosed marketing is ineligible for For You.
- **Own-app posting**: until TikTok audits your developer app, API posts are private (SELF_ONLY). For a public launch, use a
  posting service that has passed review, or post by hand.

## Instagram and Threads

- AI info: Meta requires its disclosure tool for photorealistic video or realistic audio made or altered with AI and may
  penalise missing labels; the package sets `is_ai_generated` on Instagram.
- Paid partnerships use the Paid partnership label. Crypto ads require Meta's written permission; organic posts must not
  promise returns. Default for coin launches: skip.
- Trial Reels: show a Reel to non-followers first (professional public account; checked 2026-10 the help page cites
  thresholds from 200 to 1,000 followers), results after ~24 h, 72 h window, then share to followers manually or
  automatically. Ideal for a series trailer.
- Hashtags: max 5 per post or Reel (since Dec 2025). Collab posts: up to 5 collaborators.
- Threads: 500 characters plus a 10,000-character text attachment.

## YouTube Shorts

- Altered or synthetic content toggle for realistic AI; YouTube auto-labels undisclosed synthetic content (since 27 May 2026).
- Inauthentic content policy (2026 channel-level enforcement) targets mass-produced, templated AI uploads; AI personas on
  finance topics carry extra monetization risk. Keep coin launches off YouTube.
- Unaudited API projects can only upload private videos; use YouTube Studio or a reviewed service for a public premiere.

## Telegram and Discord

- Telegram Bot API limits: about 30 messages/second overall, 1/second per chat, 20/minute per group or channel. A launch
  never needs more than a handful of posts.
- Discord: post launch announcements through a webhook into #announcements; never `@everyone` from automation (the package
  sends `allowed_mentions: { parse: [] }`). AutoMod keyword filters for "airdrop", "claim", "wallet connect", "DM me" stop
  launch-day scam waves.
- Both: scammers impersonate admins during launches. Pin "Admins never DM first" before T-0.

## UK: FCA financial promotions (crypto)

- Since 8 October 2023 promoting qualifying cryptoassets to UK consumers is a regulated financial promotion under s21 FSMA:
  it must be made or approved by an FCA-authorised firm (or a registered cryptoasset business), be fair, clear and not
  misleading, carry the prescribed risk warning ("Don't invest unless you're prepared to lose all the money you invest. This
  is a high-risk investment and you should not expect to be protected if something goes wrong. Take 2 mins to learn more."),
  offer no incentives to invest, and respect a 24-hour cooling-off for first-time investors.
- Communicating an unlawful promotion is a criminal offence (up to 2 years). In February 2026 seven finfluencers were
  sentenced over unauthorised promotions; in April 2026 the FCA joined an international finfluencer week of action
  (40+ warnings, 120 takedown requests). Finfluencer guidance: FG24/1.
- Operational rule for agents: **never invite UK users to buy a coin.** Factual statements that a coin exists, without
  inducement, are the line; when unsure, don't post.
- Sources: fca.org.uk/firms/financial-promotions-cryptoassets, fca.org.uk/publications/finalised-guidance/fg24-1.

## EU: MiCA

- Article 7 marketing communications must be clearly identifiable as marketing, fair, clear and not misleading, consistent
  with the white paper, and carry the statement: "This crypto-asset marketing communication has not been reviewed or approved
  by any competent authority in any Member State of the European Union. The offeror of the crypto-asset is solely
  responsible for the content of this crypto-asset marketing communication." The offeror is liable.
- The CASP transitional period ended EU-wide on 1 July 2026; don't point EU audiences to unauthorised platforms.
- Source: esma.europa.eu interactive single rulebook, MiCA Article 7.

## US: FTC

- Endorsement Guides (16 CFR 255, revised 2023) cover virtual influencers; any paid or incentivised launch partner posts
  need clear `#ad` / Paid partnership disclosure. The Consumer Reviews and Testimonials Rule (16 CFR 465) bans fake or
  AI-generated testimonials and buying fake engagement; civil penalties up to $53,088 per violation.
- An AI character can't claim personal experience it didn't have ("I've used this for months").

## Platforms we don't use for launches

WhatsApp (Meta's WhatsApp Business policy doesn't allow crypto promotion), Reddit (most crypto subreddits ban bots; the API
needs manual approval), Zora (every post mints a coin).
