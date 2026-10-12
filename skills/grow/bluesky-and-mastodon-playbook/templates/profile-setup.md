# Bluesky and Mastodon profile setup

Fill `<…>`, keep the AI statement, and have the operator check each item off.

## 1. Bios

Bluesky (≤ 256 graphemes):

```text
<Name>, an AI character. <what she makes / talks about, ≤ 12 words>. Posts are AI-generated and reviewed by a human
(<operator or team>). I only reply when you mention me. <site>
```

Mastodon (≤ 500 characters) plus the 4 profile rows:

```text
<Name>, an AI character. <what she makes>. Posts are scheduled by <team> and reviewed by a human before they go out.
I reply to mentions; I don't follow or DM first. Generative AI is used for my images and text.
```

| Label | Value |
|---|---|
| Runs on | <your site, e.g. useclaudia.xyz> |
| Operator | <@human@server or team page> |
| AI | All posts and images are AI-generated |
| Not advice | Nothing here is financial advice |

Claudia's Bluesky bio:

```text
Claudia, an AI character. Studio videos, agents and city nights. Posts are AI-generated and reviewed by a human on
the team. I only reply when you mention me. useclaudia.xyz
```

## 2. Mastodon server checklist

| Question | Server A | Server B |
|---|---|---|
| Server address | <…> | <…> |
| Rules allow automated accounts? (quote the rule) | <…> | <…> |
| Rules on AI-generated content (quote) | <…> | <…> |
| CW rules (which topics, images of people?) | <…> | <…> |
| Listed on joinmastodon.org/servers (Covenant)? | <yes/no> | <yes/no> |
| `max_characters` / media / poll limits (`/api/v2/instance`) | <…> | <…> |
| Topic or language fit | <…> | <…> |
| Decision and date | <…> | <…> |

Then: Edit profile → tick "This is an automated account" → save. Run `claudia post mastodon "test" --dry-run` and
check that no "bot flag off" warning appears.

## 3. Bluesky `bot` self-label (one time)

From Bluesky's bot guide. Run it once with the app password, from a folder with `@atproto/api` installed
(`npm i @atproto/api`), with `BLUESKY_HANDLE` and `BLUESKY_APP_PASSWORD` in the environment. It prints nothing secret.

```ts
// label-bot.ts — run with: npx tsx label-bot.ts
import { BskyAgent } from "@atproto/api";

const agent = new BskyAgent({ service: "https://bsky.social" });
await agent.login({ identifier: process.env.BLUESKY_HANDLE!, password: process.env.BLUESKY_APP_PASSWORD! });
await agent.upsertProfile((existing) => ({
  ...existing,
  labels: { $type: "com.atproto.label.defs#selfLabels", values: [{ val: "bot" }] },
}));
console.log("bot self-label set on", process.env.BLUESKY_HANDLE);
```

## 4. Content warning guide

| Situation | CW text | Body starts with |
|---|---|---|
| Server rule requires it | as the rule says | the post |
| Coin, token, market talk | `crypto talk` | the explainer; ends "Not financial advice." |
| Long post or thread | `long: <subject in 5 words>` | the full text |
| Club clip with strobes | `flashing lights` | the caption |
| Spoilers | `spoilers: <title>` | the post |

In the library: `options: { mastodon: { spoilerText: "crypto talk" } }`. Bluesky's post self-labels cover adult and graphic
media, not topics, so on Bluesky say what the post is about in the first line instead.

## 5. Alt-text formula

```text
AI-generated image: <who> <doing what>, <setting>, <one detail that matters>.
```

Claudia example:

```text
AI-generated image: Claudia, black jaw-length bob with a peach-orange streak and a peach star clip, headset mic, in a silver quilted puffer under one spotlight in a dark club.
```

Keep it under 300 characters unless the image holds text that must be read; Mastodon allows up to 1,500.
