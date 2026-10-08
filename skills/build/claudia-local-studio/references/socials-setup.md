# Connecting socials in Claudia Local

Everything uses the person's **own** developer apps and keys. Redirect URIs (replace 3939 if the port changed):
loopback `http://127.0.0.1:3939/oauth/callback`, relay `https://useclaudia.xyz/relay/oauth/callback`. Facts below are
from `@useclaudia/social` 0.2.0, whose connectors were checked against each network's docs on 2026-10-08 (checked 2026-10).

| Network | What to create | Store in Settings as | Redirect | Notes |
|---|---|---|---|---|
| X | developer.x.com project + app on pay-per-use; OAuth 2.0 (Native App = client id only, or Web App = id + secret); Read and write + DMs | `x` | loopback, **exactly** | Turn on the account's Automated label. Costs: ~$0.015/post, $0.20/post with a link, $0.01/reply to a mention, $0.005/post read; inbox reads off by default. Replies only to posts that mention or quote the account; at most one $cashtag per post |
| Telegram | @BotFather → `/newbot`; add the bot to the channel as admin with Post Messages | `telegram` + chat `@channel` or `-100…` | — | topics via `topicId` |
| Discord | Channel → Integrations → Webhooks → New Webhook (post only), or a bot token + channel id (inbox, replies) | `discord` | — | never pings @everyone/roles/users |
| Bluesky | Settings → Privacy and security → App passwords | `bluesky` (handle + app password) | — | never the main password; video needs a verified email |
| Mastodon | enter the instance (app auto-registered, PKCE) or Preferences → Development token | `mastodon` | loopback | tick "This is an automated account" |
| Farcaster | Neynar API key + managed signer approved in the Farcaster app | `neynar`, `neynar-signer` | — | media must be permanent https URLs |
| Nostr | an agent-only `nsec` + relay list (+ optional Blossom server) | `nostr` | — | never a personal key |
| LinkedIn | app tied to a Page you admin; products Share on LinkedIn + Sign In with LinkedIn (OpenID Connect) | `linkedin` (id + secret) | relay | 60-day tokens, no refresh: reconnect when warned |
| YouTube | Google Cloud project, YouTube Data API v3, OAuth consent (External, test user), OAuth client **Desktop app** | `youtube` | loopback (any port works) | uploads private until Google audits; 100 uploads/day bucket; testing-mode refresh tokens expire in 7 days |
| Buffer / Zernio / Upload-Post | connect profiles inside the service; copy its API key | `buffer` / `zernio` / `upload-post` | — | simplest route to Instagram, Facebook, Threads, TikTok, Pinterest |
| Instagram / Facebook / Threads (v2) | Meta app of type Business with the use case; app id + secret | `instagram` / `facebook` / `threads` | relay | Instagram/Threads pull media from a public URL via the media relay; Instagram JPEG only |
| TikTok (v2) | developers.tiktok.com app, Login Kit + Content Posting API (Direct Post), Desktop platform | `tiktok` | loopback | posts private (SELF_ONLY) until TikTok audits the app; no crypto promotion on TikTok at all |
| Pinterest (v2) | developers.pinterest.com app | `pinterest` | relay | Trial access: pins visible only to you |
| WhatsApp, Reddit, Snapchat, Zora | not supported | — | — | policy bans (WhatsApp crypto promos, Zora mints), allowlists, manual approval |

## Rules Claudia Local enforces on every post (can't be switched off)

AI label (native flag where a network has one, else `(AI-generated)`), "Not financial advice." on anything mentioning a
coin, ticker, price or contract address, blocked price/return promises ("100x", "guaranteed", "can't lose", "will hit
$1"…), `#ad` when marked paid, the X reply rule, daily caps per account, near-duplicate block (24 h), link limits
(5/day, X and LinkedIn 3), kill switch, and an audit log.

## Media from a link

Networks that pull from a URL (Instagram, Threads, Buffer) get a short-lived `https://useclaudia.xyz/relay/media/…` link
(15 minutes, video 60, max 60), deleted right after publishing. Limits: jpeg/png/webp/gif/mp4/mov, 200 MB, 30 uploads
an hour. Farcaster and Nostr need permanent URLs instead.

## Compliance reminders

UK: crypto promotions to UK consumers are regulated financial promotions (FCA). EU: MiCA requires fair, clear,
not-misleading marketing marked as marketing. TikTok removes crypto promotion; Meta needs written permission for crypto
ads. See [../../../grow/crypto-marketing-compliance/SKILL.md](../../../grow/crypto-marketing-compliance/SKILL.md).
