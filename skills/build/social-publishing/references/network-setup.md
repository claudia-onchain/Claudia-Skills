# Network setup, portal by portal

Read this when connecting a network for the first time or when a connection fails. Steps were checked against each
network's docs on 8 October 2026 (from `@useclaudia/social` 0.2.0, `social.networks()` returns the same list with
setup text). Key names are what the KeyProvider is asked for; in the CLI store them with `claudia keys set <name>`,
in code pass them through `staticKeys` / `envKeys` (`CLAUDIA_KEY_<NAME>`), in Claudia Local use Settings → Keys.
OAuth app credentials can be JSON `{"clientId":"…","clientSecret":"…"}` or `clientId:clientSecret`.

## Redirect URIs

| Kind | URI | Networks |
|---|---|---|
| Loopback | `http://127.0.0.1:3939/oauth/callback` (Claudia Local; another port if you run it elsewhere; the CLI uses 3939 unless `--port`) | X (must match exactly; use 127.0.0.1, not localhost), YouTube (Desktop clients accept any loopback port), TikTok (Desktop), Mastodon |
| Relay | `https://useclaudia.xyz/relay/oauth/callback` | LinkedIn, Instagram, Facebook, Threads, Pinterest (portals that demand https) |

The relay is a static page that reads `code` and `state` in the browser and forwards to
`http://127.0.0.1:<port>/oauth/callback`, taking the port from the state (`<random>.<port>`). It stores and logs
nothing; the code is useless without the client secret / PKCE verifier on the person's machine. Keep the CLI or
Claudia Local running while signing in; if the browser says "refused to connect", start the app and reload the tab
within a few minutes.

## Direct networks

**X** — developer.x.com → project + app on the pay-per-use plan → User authentication settings → OAuth 2.0 ("Native
App" = public client, id only; "Web App, Automated App or Bot" = confidential, id + secret), permissions Read and
write and Direct message → callback `http://127.0.0.1:3939/oauth/callback` → store under `x` → turn on the account's
**Automated** label. Scopes: `tweet.read tweet.write users.read offline.access media.write dm.read dm.write`. Access
tokens last 2 h and refresh automatically. Text 280 weighted characters, 4 images or 1 video, threads yes, replies
only when mentioned.

**Telegram** — @BotFather → `/newbot` → token under `telegram` → add the bot to the channel or group as an admin
with Post Messages → `connect("telegram", { chat: "@yourchannel" })` (or the numeric `-100…` id; `topicId` for forum
topics). 4096 characters (captions 1024), up to 10 media.

**Discord** — Channel settings → Integrations → Webhooks → New Webhook → Copy URL → `connect("discord", { webhookUrl })`
(or store the URL under `discord`). Webhooks post (and create forum posts with `forum: "1"`) but can't read or reply.
For inbox and replies: a bot (Reset Token, Message Content intent; Send Messages, Attach Files, Read Message History)
and `{ token, channelId }`. Claudia never pings @everyone, roles or users. 2000 characters, 10 files up to 20 MiB.

**Bluesky** — Settings → Privacy and security → App passwords → Add → `connect("bluesky", { handle, appPassword })`.
300 graphemes, 4 images or 1 video (video needs a verified email).

**Mastodon** — `connect("mastodon", { instance: "mastodon.social" })` registers a small app named "Claudia" on the
instance and signs in with PKCE, no portal needed; or Preferences → Development with scopes `read:accounts
read:notifications write:statuses write:media` and `{ instance, accessToken }`. Tick "This is an automated account".
500 characters, 4 media.

**Farcaster (Neynar)** — Neynar account → API key under `neynar` → create a managed signer, approve it in the
Farcaster app → signer UUID under `neynar-signer`. 320 bytes, 2 embeds; media as permanent https links.

**Nostr** — a key made for the agent (`nostrKeygen()`), never a personal one → `nostr` → relays
(`relays: "wss://relay.damus.io,wss://nos.lol"`) → optional `blossom` server for images. Signed locally (BIP-340);
counts as published when at least one relay answers OK.

**LinkedIn (profile)** — linkedin.com/developers → app tied to a Page you admin → products Share on LinkedIn + Sign In
with LinkedIn using OpenID Connect → redirect `https://useclaudia.xyz/relay/oauth/callback` → id + secret under
`linkedin`. Scopes `openid profile w_member_social`. Tokens last 60 days with no refresh: an `expiring` event fires
daily in the last week; reconnect. 3000 characters, 1–20 images or 1 video.

**YouTube** — Google Cloud Console → project → enable YouTube Data API v3 → OAuth consent screen (External, add
yourself as a test user) → Credentials → OAuth client ID → Desktop app → id + secret under `youtube`. Uploads are
`private` by default (unaudited projects can only upload private videos), `containsSyntheticMedia` set from the AI
label. 100 uploads/day per project; refresh tokens of "Testing" apps expire after 7 days.

## Posting services (simplest route to Instagram, Facebook, Threads, TikTok, Pinterest)

Connect the profiles inside the service, then give Claudia the service key; each channel appears as its own account
(`via: "buffer"`).

- **Buffer** — publish.buffer.com/settings/api → `buffer`. No upload endpoint: media must be public links, so local
  files go through the media relay (60-minute links for Buffer). Pinterest needs `options.buffer.boardId`.
- **Zernio** — zernio.com/dashboard/api-keys → `zernio`. Media goes to Zernio storage. TikTok posts are `SELF_ONLY`
  unless `options.zernio.privacyLevel` is set.
- **Upload-Post** — dashboard key → `upload-post`. Direct uploads. Facebook needs `pageId`, Pinterest `boardId`; X
  links stripped without their add-on.

## v2 direct (the person's own reviewed app)

- **Instagram / Facebook / Threads** — developers.facebook.com → Business app → the use case → redirect
  `https://useclaudia.xyz/relay/oauth/callback` → id + secret under `instagram` / `facebook` / `threads`. Instagram
  and Threads pull media from a URL (set `mediaRelay`); Instagram takes JPEG only. Tokens 60 days, refreshed a week
  early.
- **TikTok** — developers.tiktok.com → Login Kit + Content Posting API (Direct Post), Desktop platform, redirect
  `http://127.0.0.1:3939/oauth/callback` → key + secret under `tiktok`. Until audited, posts are private
  (SELF_ONLY) and the account must be private. Video only.
- **Pinterest** — developers.pinterest.com → redirect via the relay → `pinterest`. Trial access = pins visible only to
  you.

## Not supported, on purpose

WhatsApp (Meta bans crypto promotion on WhatsApp Business), Zora (every post mints a coin), Reddit (manual approval;
most crypto subreddits ban bots), Snapchat (allowlist), Lemon8 / Weibo / Douyin (no public API or a mainland-China
identity).

## Media relay (for URL-pull networks)

```ts
createSocial({ keys, mediaRelay: { url: "https://useclaudia.xyz/relay/media", token: async () => accessToken,
  sign: async ({ method, path, body }) => signHeaders(method, path, body), ttlMin: 15 } });
```

`POST /relay/media?ttl=<1–60>` with the file (jpeg, png, webp, gif, mp4, mov; 200 MB; 30 uploads an hour per token)
→ `201 { id, url, expiresAt, bytes, mime }`; deleted right after publishing. With an agent key, the signature covers
the path **with** the query and the exact multipart bytes; DELETE signs an empty body.
