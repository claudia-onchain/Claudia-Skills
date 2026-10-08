# Worked session: Telegram channel, approval, a blocked promise, kill switch

Real output from `@useclaudia/social` 0.2.0 on 2026-10-08. To keep it repeatable the run used a mock `fetch` for
Telegram's API (`getMe` / `getChat` / `sendMessage`) and a throwaway data dir; every rule, preview and status below is
the package's own behaviour.

## Setup the person did

```sh
claudia keys set telegram                 # bot token from @BotFather (asked without echo)
claudia connect telegram --chat @demochan # the bot is an admin of @demochan with Post Messages
```

In code the same connection is:

```js
import { createSocial, envKeys } from "@useclaudia/social";
const social = createSocial({ keys: envKeys() });        // CLAUDIA_KEY_SOCIAL_VAULT, CLAUDIA_KEY_TELEGRAM
const acc = await social.connect("telegram", { chat: "@demochan" });
```

```json
{ "id": "telegram:-1001234567890", "network": "telegram", "handle": "@demochan", "name": "Demo channel",
  "notes": ["bot @demo_bot", "channel"], "connectedAt": 1791476532803 }
```

## 1. The agent drafts a coin update

```js
const p = social.draft({
  text: "$CLAUDIA holders: 2,660 today. Here is what the agents in the thread are watching.",
  link: "https://useclaudia.xyz",
  targets: [{ account: acc.id }],
});
social.preview(p.id);
```

```json
[ { "account": "telegram:-1001234567890", "network": "telegram",
    "text": "$CLAUDIA holders: 2,660 today. Here is what the agents in the thread are watching.\n\nhttps://useclaudia.xyz\n\n(AI-generated) Not financial advice.",
    "chars": 144, "media": 0,
    "labelsAdded": ["text: (AI-generated)", "Not financial advice."], "warnings": [] } ]
```

Both labels were added by the rules, not by the agent: the AI label by default, and "Not financial advice." because
the text mentions `$CLAUDIA`.

## 2. The agent tries to publish without approval

```js
await social.publish(p.id);
// ClaudiaSocialError needs_approval: "This post has not been approved."
```

## 3. A second draft makes a promise

```js
const bad = social.draft({ text: "$CLAUDIA will 10x by Friday, guaranteed", targets: [{ account: acc.id }] });
social.preview(bad.id)[0].blocked;
// "Blocked: the post predicts a price move by a date (\"10x by Friday\"). Claudia never promises prices or returns."
```

The agent told the person what was blocked and why, rewrote nothing to slip past it, and dropped the draft.

## 4. The person approves; dry run first

```js
social.approve(p.id);
await social.publish(p.id, { dryRun: true });
```

```json
{ "dryRun": true, "requests": [ { "method": "POST", "url": "https://api.telegram.org/bot***/sendMessage",
  "headers": { "Content-Type": "application/json" },
  "body": { "chat_id": -1001234567890,
            "text": "$CLAUDIA holders: 2,660 today. Here is what the agents in the thread are watching.\n\nhttps://useclaudia.xyz\n\n(AI-generated) Not financial advice.",
            "link_preview_options": { "is_disabled": false } },
  "label": "telegram:-1001234567890 · sendMessage" } ] }
```

The bot token is `***` in the URL. A dry run never changes the post's status. `await social.publish(p.id)` then
publishes it once; calling it again never posts twice.

## 5. Something goes wrong: kill switch

```js
social.killSwitch(true);
await social.publish(p.id);
// ClaudiaSocialError blocked: "The kill switch is on: nothing publishes. Turn it off with killSwitch(false) when you are ready."
```

The switch is saved in `~/.claudia/social/state.json` and survives restarts; `tick()` skips scheduled posts while it
is on. Every step above also wrote a line to `audit.jsonl` (draft, approve, publish attempt, kill-switch change),
with no secrets.

## Same flow from the CLI

```text
$ claudia post telegram 'gm, $CLAUDIA just printed a new 24h high on the board' --dry-run
  claudia › Post to Telegram · @claudia_test
    gm, $CLAUDIA just printed a new 24h high on the board

    (AI-generated) Not financial advice.
  Length        91 / 4096 characters
  Labels added  text: (AI-generated) · Not financial advice.
  Cost          none on this network
  Request  POST https://api.telegram.org/bot***/sendMessage
  Dry run — nothing was posted.
```

(From the CLI README.) Without `--dry-run` it asks before publishing; without a connected account it says
`✗ No Bluesky account connected. Try: claudia connect bluesky` (real output for Bluesky, 2026-10-08).
