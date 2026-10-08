# Rules, platform policy, costs and errors

Read this before posting about coins on any network, when a preview says `blocked`, or when a publish fails.

## What the package blocks (and the message you'll see)

The promise detector blocks, with a plain reason: "100x", "guaranteed returns", "can't lose", "zero risk" style
claims, "to the moon by Friday", "will hit $1", "easy money", "% daily returns", and in coin context "10x",
"guaranteed", "will pump / moon / double". Real example (2026-10-08):

```json
{ "network": "telegram", "blocked": "Blocked: the post predicts a price move by a date (\"10x by Friday\"). Claudia never promises prices or returns." }
```

Rewrite as a description of facts ("holders went from 900 to 2,660 this week") or drop the post. Never work around
the detector with spelling tricks: that is the behaviour the rule exists to stop, and it breaks network rules too.

## Platform rules worth knowing (checked 8 Oct 2026)

- **X:** automated accounts need the Automated label; no bulk or duplicate posting; no unsolicited @mentions or
  replies; since February 2026 the API only allows replies when the account is summoned (mentioned or quoted). One
  `$cashtag` per API post.
- **TikTok:** removes crypto promotion, including organic posts: no tickers, no calls to buy, no return claims, and
  never mark a token promo as branded content. Education or news only.
- **Meta:** no crypto promotion on WhatsApp Business (not supported here). Instagram / Facebook ads about crypto need
  Meta's written permission; organic posts must not promise returns.
- **UK:** promoting cryptoassets to UK consumers is a regulated financial promotion (FCA, since October 2023): it needs
  approval by an FCA-authorised firm, the prescribed risk warning, and a 24-hour cooling-off for first-time investors.
  An agent account should not invite UK users to buy a coin.
- **EU:** MiCA (in force since 30 December 2024): crypto marketing must be fair, clear, not misleading, consistent
  with the white paper, and marked as marketing. Use `labels.ad` for anything paid or promotional.
- The package enforces a floor, not legal advice. See
  [crypto-marketing-compliance](../../../grow/crypto-marketing-compliance/SKILL.md).

## Costs (the person pays each network directly; checked 8 Oct 2026)

| Network | Cost |
|---|---|
| X (pay-per-use) | $0.015 per post · $0.20 per post with a link · $0.01 per reply to a post that mentions you · $0.005 per post read · $0.015 per DM. Threads count each part. Inbox reads are off by default (`inboxBudget.x.perDay = 0`) |
| YouTube | Google Cloud quota: 100 uploads per project per day; a comment costs 50 of 10,000 daily units |
| Farcaster (Neynar) | 150 credits per cast, 5 per notification read |
| Buffer · Zernio · Upload-Post | Their plans (Upload-Post's entry plan: 10 uploads a month, no TikTok) |
| Telegram, Discord, Bluesky, Mastodon, Nostr, LinkedIn, Meta, TikTok, Pinterest | No per-post charge |

`preview()` shows `costUsd` for X targets.

## Errors (`ClaudiaSocialError`)

| code | When | Next |
|---|---|---|
| `no_key` | A key, app credential or the `social-vault` key is missing | The hint names the key; the person adds it |
| `needs_approval` | `publish()` on a draft or pending post | Get approval |
| `blocked` | A rule (promise, cap, duplicate, link limit, X reply rule) or the kill switch | Read the reason; rewrite or wait |
| `invalid` | Unknown account / post, wrong status, bad file | Fix input |
| `unsupported` | The network can't do it (e.g. replies via a Discord webhook, Instagram without a media relay) | Use another route |
| `expired` | Token rejected or expired (LinkedIn after 60 days) | Reconnect |
| `rate_limited` | Network said slow down (`retryAfterMs`) | Wait; posts are never retried automatically |
| `over_budget` | HTTP 402 from the network | Top up the developer account |
| `provider_error` | Anything else | Read the message |

Per-account failures don't throw: they land in `post.results[i].error` and the post becomes `partial` or `failed`.
`uncertain: true` = the request may have reached the network; check before `publish(id, { retryUncertain: true })`.

## Storage

`<dataDir>/social/` (default `~/.claudia/social/`): `accounts.json` (sealed tokens), `accounts-index.json` (no
secrets), `posts.json`, `state.json` (kill switch), `audit.jsonl`. Files are 0600, written atomically. Claudia Local
passes its own encrypted vault as the token store.
