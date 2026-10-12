# Mini app embed, manifest and ready() starter

Copy into your app, fill `<…>`, and check each limit. Field rules are in
[../references/mini-apps.md](../references/mini-apps.md).

## 1. Embed meta tag (in the page's `<head>`)

The tag's `content` is the embed JSON as a string:

```html
<meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://<your-domain>/embed-3x2.png","button":{"title":"<Open the studio>","action":{"type":"launch_frame","name":"<App name>","url":"https://<your-domain>/","splashImageUrl":"https://<your-domain>/splash-200.png","splashBackgroundColor":"#0a0b0d"}}}' />
```

Checks:

- [ ] `imageUrl` is a 3:2 image (for example 1200 × 800), URL ≤ 1,024 characters.
- [ ] `button.title` ≤ 32 characters and says what happens. Not "Claim".
- [ ] `splashImageUrl` is 200 × 200 px.
- [ ] Any image of the character shows the AI label somewhere on the image or in the app's first screen.

## 2. Manifest at `/.well-known/farcaster.json`

```json
{
  "accountAssociation": {
    "header": "<base64 header from the signing tool>",
    "payload": "<base64 payload naming your domain>",
    "signature": "<base64 signature>"
  },
  "miniapp": {
    "version": "1",
    "name": "<≤ 32 chars>",
    "homeUrl": "https://<your-domain>/",
    "iconUrl": "https://<your-domain>/icon-1024.png",
    "subtitle": "<≤ 30 chars>",
    "description": "<≤ 170 chars, says the character is AI and who runs the app>",
    "tags": ["<≤ 20 chars>", "<tag>"],
    "heroImageUrl": "https://<your-domain>/hero-1200x630.png",
    "webhookUrl": "https://<your-domain>/api/farcaster-webhook"
  }
}
```

Checks:

- [ ] Signed for the account that runs the app (the account association), using Farcaster's developer tools.
- [ ] Icon 1024 × 1024 PNG with no transparency; up to 5 tags of ≤ 20 characters.
- [ ] Webhook verifies the signed events before trusting them.

## 3. Call `ready()`

```js
import { sdk } from "@farcaster/miniapp-sdk";

async function start() {
  // load what the first screen needs, then:
  await sdk.actions.ready();
}
start();
```

## 4. Notification body (server side)

```json
{
  "notificationId": "<unique id, ≤ 128 chars>",
  "title": "<≤ 32 chars>",
  "body": "<≤ 128 chars, no price or return talk>",
  "targetUrl": "https://<your-domain>/<page>",
  "tokens": ["<up to 100 tokens from users who enabled notifications>"]
}
```

Send at most 1 per 30 seconds and 100 a day per token (recommended); one useful notification a week is plenty.
