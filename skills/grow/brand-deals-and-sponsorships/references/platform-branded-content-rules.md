# Platform branded-content rules (checked 2026-10)

Read this in step 2 (is the product allowed?) and step 7 (which toggles to switch on). Platform policies change
often; open the linked policy page before committing to a category you haven't done before.

## Per platform

| Platform | Paid-partnership tool | AI label | Banned or restricted in branded content |
|---|---|---|---|
| TikTok | Content disclosure → "Branded content" (third-party brand) or "Your brand" (own business); API: `brand_content_toggle` / `brand_organic_toggle` | AIGC label (`is_aigc`) for realistic AI; auto-detected via C2PA | **Financial services and products incl. crypto**, lending, forex, "get rich quick", gambling, weapons, adult, many health claims |
| Instagram / Facebook | "Paid partnership" label (Branded content tool), approved brand partner; Partnership ads for paid usage | Meta "AI info" (`is_ai_generated`) — required for photorealistic video/realistic audio | Crypto ads need Meta's written permission; prohibited/restricted content per Branded Content Policies |
| X | Paid partnership label (`paid_partnership` via API); X Ads policies for any boost | `made_with_ai` media flag + account-level Automated label for bots | Financial services and crypto ads restricted by country under X Ads policies |
| YouTube | "Includes paid promotion" (Studio → Details) | Altered or synthetic content toggle (`containsSyntheticMedia`); auto-labelled since 27 May 2026 | Ad-friendly guidelines; AI personas discussing finance can be limited for monetization |
| Threads | Paid partnership label where available | Meta AI info | Meta Branded Content Policies |
| Telegram / Discord | None: put "Ad ·" in the text | Text label | Server/channel rules; Discord bans some categories outright |

Sources: [TikTok branded content policy](https://support.tiktok.com/en/business-and-creator/creator-and-business-accounts/branded-content-on-tiktok) ·
[TikTok Community Guidelines — regulated goods and commercial activities](https://www.tiktok.com/community-guidelines/en/regulated-commercial-activities) ·
[Meta Branded Content Policies (under Other policies)](https://transparency.meta.com/policies/other-policies/) ·
[Meta Advertising Standards (financial products, crypto)](https://transparency.meta.com/policies/) ·
[X paid partnerships policy](https://help.x.com/en/rules-and-policies/paid-partnerships-policy) ·
[YouTube paid product placements](https://support.google.com/youtube/answer/154235) ·
[YouTube altered or synthetic content](https://support.google.com/youtube/answer/14328491).

## TikTok and crypto: the strict one

- TikTok's branded content policy prohibits promoting financial services and products, **including
  cryptocurrency**, as branded content. Its Community Guidelines also bar promotion of high-risk financial products
  and trading schemes, even in organic posts; undisclosed marketing is ineligible for the For You feed.
- A crypto-exchange ad beta exists for FinCEN/FINTRAC-registered firms (US/CA) — that's for the firm's own ads, not
  for creators to do sponsored posts.
- Practical rule for an AI influencer on TikTok: **no sponsored crypto, no tickers, no wallets-as-investment, no
  launchpad promos, ever.** Non-financial brands only. Don't tick "Branded content" on a token promo to make it look
  compliant — that's still banned content.

## `@useclaudia/social` label mapping

`labels: { ai: true, ad: true }` makes the package:

- add `#ad` to the text and set X `paid_partnership` and a TikTok branded-content flag;
- set native AI flags (X `made_with_ai`, YouTube `containsSyntheticMedia`, TikTok `is_aigc`, Instagram
  `is_ai_generated`, Pinterest `AI_MODIFIED`) and add "(AI-generated)" where no flag exists;
- add "Not financial advice." when a coin, token, price or contract address is mentioned, and block price/return
  promises.

Check the preview: for a third-party sponsor on TikTok the flag must be **branded content** (paid partnership),
not "your brand". If the preview shows the wrong one, publish the TikTok post from the app with the correct toggle.
Instagram's Paid partnership label with brand tagging is set in the Instagram app.

## Paid usage (whitelisting) per platform

| Platform | Mechanism | What the creator grants |
|---|---|---|
| TikTok | Spark Ads authorization code (per video, set duration 7/30/60/365 days) | The brand runs your post as an ad from your handle |
| Instagram / Facebook | Partnership ads (ad permissions to the brand partner) | Same, through Meta's partnership ads; revocable in settings |
| X | Brand promotes your post via X Ads with your permission | Same |
| YouTube | Brand runs your video as an ad via Google Ads (link the video) | Same |

Each is paid usage: price it per 30 days, set an end date, and revoke the code or permission when it ends. Never hand
over login credentials for "whitelisting".
