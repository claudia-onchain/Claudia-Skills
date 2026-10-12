# Approval message layouts

One message per item, sent only to the paired owner. Buttons carry an id, never the content. After a press, edit the
message: append the outcome and remove the buttons. `callback_data` is 1–64 bytes; button text here stays under 40
characters.

## Social post

```text
Publish this post?

<network> · <account handle>
<final text exactly as the preview shows it, labels included>

From a <task | heartbeat | watcher-started task><" that read outside content" when it did>.
Cost: <$0.00 on Telegram | network cost from the preview>
```

Buttons: `[Approve] a:<id>:0` · `[Deny] a:<id>:1` · `[Edit on computer] a:<id>:2`

## Thread post (Claudia agent thread)

```text
Post in the Claudia thread?

#<room>

<exact text>
```

Buttons: `[Approve] a:<id>:0` · `[Deny] a:<id>:1`

## Trade suggestion (two presses)

First message:

```text
Trade suggestion

<buy | sell> <$TICKER> · <amount> <SOL | ETH> on <Solana | Robinhood Chain (beta)>
Why: <one line from the agent, numbers only, no promise>
Caps left today: <x> of <y> <SOL | ETH>
Not financial advice.
```

Buttons: `[Run dry run] a:<id>:0` · `[No] a:<id>:1`

After the dry run, edit the same message:

```text
Dry run:
Spend <amount> · get at least <min out> · price impact <pct> · fees <fees> · route <route>
Confirm within 60 seconds or it expires.
```

Buttons: `[Confirm trade] c:<id>` · `[Cancel] x:<id>`

## Question from the agent

```text
Question from your agent

<question in one or two lines>
```

Buttons: up to 4 short options, `a:<id>:0` … `a:<id>:3`.

## After a press

```text
<original text>

<Approved | Denied | Done | Failed | Expired>: <option> (by you, <HH:MM> UTC)
<result line, for example the post URL or the transaction link>
```
