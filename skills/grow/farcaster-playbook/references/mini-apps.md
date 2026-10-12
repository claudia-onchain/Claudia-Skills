# Farcaster mini apps (formerly Frames)

Read this before sharing, building or embedding a mini app, and before any mini app asks a user's wallet to sign.
Checked 2026-10 against miniapps.farcaster.xyz (specification and getting started).

## What a mini app is

A web app that runs inside a Farcaster client. A cast that links to a page with an `fc:miniapp` meta tag shows a 3:2
image and a button; tapping the button opens the app in the client. Web mini apps render at 424 × 695 px; on mobile
they take the device size. The legacy `fc:frame` tag still works for older apps.

## Embed (the `fc:miniapp` meta tag)

| Field | Rule |
|---|---|
| `version` | `"1"` |
| `imageUrl` | up to 1,024 characters; 3:2 aspect ratio |
| `button.title` | up to 32 characters |
| `button.action.type` | `launch_frame` or `view_token` |
| `button.action.url` | up to 1,024 characters; defaults to the page URL |
| `button.action.name` | required |
| `splashImageUrl` | 200 × 200 px |
| `splashBackgroundColor` | hex colour |

## Manifest (`/.well-known/farcaster.json`)

Requires `accountAssociation` (base64 `header`, `payload`, `signature`, proving which Farcaster account owns the
domain) and a `miniapp` object (`frame` for legacy apps):

| Field | Rule |
|---|---|
| `version` | `"1"` |
| `name` | up to 32 characters |
| `homeUrl`, `iconUrl` | up to 1,024 characters; icon 1024 × 1024 PNG, no alpha |
| `subtitle` / `tagline` | up to 30 characters |
| `description` | up to 170 characters |
| `screenshotUrls` | up to 3, portrait 1284 × 2778 |
| `tags` | up to 5, each up to 20 characters |
| `heroImageUrl`, `ogImageUrl` | 1200 × 630 |
| `ogTitle` / `ogDescription` | 30 / 100 characters |
| `webhookUrl` | receives `miniapp_added`, `miniapp_removed`, `notifications_enabled`, `notifications_disabled` |

## SDK

```sh
npm install @farcaster/miniapp-sdk
```

```js
import { sdk } from "@farcaster/miniapp-sdk";
// after the app has loaded and can be shown:
await sdk.actions.ready(); // without this, users see an endless loading screen
```

Test with Developer Mode: farcaster.xyz/~/settings/developer-tools → turn on "Developer Mode" (desktop recommended),
which adds tools to preview the app and audit its manifest and embed.

## Wallets

- Solana: `getSolanaProvider` (experimental).
- Ethereum: `getEthereumProvider` returns an EIP-1193 provider.

House rules for any mini app linked to an AI character:

1. Every transaction is shown to the user with amount, asset, network and recipient, and confirmed in their wallet.
   The agent never signs for a user.
2. Cap amounts in the app; no "max" buttons for first-time users.
3. No returns, yields or price talk on the button or image. Button titles say what happens: "Open studio",
   "View token", not "Claim".
4. If the app touches a coin launch or trade, the flow follows [safe-trading](../../../build/safe-trading/SKILL.md)
   and [launch-a-coin](../../../build/launch-a-coin/SKILL.md).

## Notifications

- Only to users who added the app and enabled notifications; the client gives your server a token and a
  `notificationUrl`.
- `title` up to 32 characters, `body` up to 128, `targetUrl` up to 1,024 and on the app's own domain.
- Up to 100 tokens per request; the client deduplicates on (FID, `notificationId`) for 24 hours.
- Recommended rate limits per token: 1 notification per 30 seconds, 100 per day. For a character's app, one useful
  notification a week is a better target.

## Sources

- https://miniapps.farcaster.xyz/docs/specification
- https://miniapps.farcaster.xyz/docs/getting-started
- https://www.npmjs.com/package/@farcaster/miniapp-sdk
