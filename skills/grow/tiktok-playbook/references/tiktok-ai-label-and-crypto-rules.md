# TikTok rules an AI character must know: AI labels, money and crypto

Read this before the first upload, before any video that touches money, coins, launches, wallets or brands, and after any
removal or "ineligible for For You" notice. Checked 2026-10. TikTok's own pages are the authority; links at the end.

## 1. AI-generated content (AIGC)

What TikTok requires:
- Label content that contains realistic AI-generated or significantly AI-edited people, scenes or audio — anything a viewer
  could mistake for real. An AI character's face and voice qualify every time.
- The label is a transparency notice, not a ban. Unlabelled realistic AI can be labelled by TikTok, removed, or made
  ineligible for For You. Repeated misses can restrict the account.
- Not required on their own: AI-written captions or scripts, AI-suggested hashtags, AI text overlays, colour correction,
  noise removal, auto-captions.
- Never allowed regardless of label: AI likenesses of real private people; AI content of public figures endorsing products or
  making political statements; content that misleads about a real event or crisis; anyone who looks under 18 in a
  sexualised or adult context.

How TikTok detects: C2PA Content Credentials (since January 2025), its own invisible watermark on content made with TikTok
AI tools, and detection models. Over 1.3 billion videos have been labelled through these systems (2026 reports). Viewers
also gained a control in late 2025 to see less AI-generated content in their feed, so an AI account's audience is the
people who chose to watch AI — make the label part of the brand rather than hiding it.

How to label:
- App: More options → AI-generated content → on.
- API: `is_aigc: true` (the Claudia package sets it when `labels.ai` is true, the default).
- On screen: a small "AI character" tag; in the bio: "made with AI".

## 2. Money, finance and crypto

Two TikTok policies overlap:

**Branded content policy.** Content posted in exchange for payment or gifts must use the content disclosure setting, and
some categories can't be promoted as branded content at all. Financial products and services are on that list: crypto and
other digital assets, trading platforms, forex, lending, credit cards, buy-now-pay-later, investment services, "get rich
quick" and pyramid schemes. Disclosing it doesn't make it allowed.

**Community Guidelines — regulated, high-risk and fraudulent content.** TikTok doesn't allow trading, marketing or promotion
of high-risk financial products, including cryptocurrency and forex trading promotion, and removes scams, pyramid schemes
and "get rich quick" pitches. Content that promotes financial products without disclosure is also ineligible for For You.
Crypto ads exist only through a regulated-firm beta (US/Canada firms registered with FinCEN or FINTRAC) — not something a
creator or agent can use.

What this means in practice for an AI character:

| Example | Verdict | Fix |
|---|---|---|
| "$CLAUDIA just hit a new high" | Remove | Don't name coins on TikTok |
| "Launch your own coin on my platform, link in bio" | Remove | Promote the launchpad on X/owned channels only |
| "How I earned 2 SOL in creator fees" | Remove (earnings claim + financial promotion) | Talk about making videos, not money |
| "3 signs a DM 'support agent' is a scam" | OK | Keep it general, no product named |
| "What is a seed phrase? Never screenshot it." | OK | Education, no call to act |
| "What does 'creator fee' mean on a token launch?" | Grey — education with no coin named, no link, no "try it" | Prefer it on YouTube/X; on TikTok keep it abstract |
| Paid post for a wallet app with #ad | Not allowed | Decline financial sponsorships on TikTok |
| Paid post for headphones (Northpine) with disclosure toggle + #ad | OK | Follow [brand-deals-and-sponsorships](../../brand-deals-and-sponsorships/SKILL.md) |

An agent's TikTok filter (apply before drafting): reject the draft if it contains a `$TICKER`, a coin or token name, a
contract or wallet address, the words buy / sell / ape / pump / moon / 100x / profit / returns / earn / passive income /
financial freedom, a price, or a link to a launch or exchange.

## 3. Disclosure of ads and gifts

- Paid, gifted, affiliate or own-brand promotion: content disclosure setting on ("Paid partnership" or "Promotional content"
  label) and `#ad` in the caption. The package's `labels.ad` sets `brand_organic_toggle` (own brand) and adds `#ad`; for a
  third-party brand also set the branded-content option in the app or service.
- UK: ASA/CMA require "Ad" or "#ad" up front; the CMA can fine directly under the DMCC Act (since 6 April 2025).
- US: FTC Endorsement Guides apply to virtual influencers; an AI character must not claim personal use it can't have had.

## 4. Other rules that catch AI accounts

- **Unoriginal content**: re-uploads, watermarked clips from other apps, compilations without changes → ineligible for For You.
- **Engagement tricks**: "like for part 2", follow-for-follow, comment-for-comment → ineligible; repeated → restricted.
- **Impersonation**: the character must not look or sound like a real person; usernames must not mimic brands.
- **Ban evasion**: a new account after a ban is removed along with linked accounts. Use the in-app appeal.
- **Minors**: TikTok LIVE and gifts are 18+; an AI character must always be clearly adult.

## Sources (checked 2026-10)

- TikTok Community Guidelines: https://www.tiktok.com/community-guidelines/en/
- AI-generated content: https://support.tiktok.com/en/using-tiktok/creating-videos/ai-generated-content
- Branded content policy: https://www.tiktok.com/legal/page/global/bc-policy/en
- Cointelegraph — crypto ads/branded content: https://cointelegraph.com/news/crypto-ads-no-longer-allowed-on-tiktok
- Forkast — TikTok bans crypto promotions: https://forkast.news/tiktok-bans-crypto-promotions-amid-fears-young-users/
- Billo — platform AI labelling in 2026: https://billo.app/blog/ai-labeling/
- Cinerads — TikTok AI content policy 2026: https://www.cinerads.com/blog/tiktok-ai-content-policy
- @useclaudia/social README → Rules and compliance (checked 8 Oct 2026)
