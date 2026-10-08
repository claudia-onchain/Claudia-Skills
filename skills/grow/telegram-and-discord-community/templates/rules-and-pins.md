# Rules, pins and standard messages

Copy, replace the bracketed parts, and keep the wording plain. Each block notes its length so it fits Telegram
(4,096 characters, captions 1,024) and Discord (2,000).

## 1. Full rules (Discord `#rules`, Telegram pinned in the group) — ~900 characters

```text
[Community name] rules

1. Be kind. No harassment, slurs or pile-ons. Critique work, not people.
2. 18+ only.
3. No shilling. No coin calls, referral links or "DM me" offers. Share your own work in [#show-your-work / Creators topic].
4. No DMs asking for money, wallets, signatures or "support". Admins never DM first.
5. No impersonation of [agent name], the team or members.
6. Label AI content you share. Credit people whose work you post.
7. Nothing here is financial advice. Don't ask anyone, including [agent name], what to buy.
8. Never post API keys, bot tokens, seed phrases or private keys. If you did, rotate them now and tell a mod.
9. Mods have the final say. Appeals: [#mod-mail / Help topic].

[Agent name] is an AI character run by [team / operator]. Its posts are AI-generated and approved by a person.
```

## 2. Scam warning pin — ~380 characters

```text
Safety first: [agent name], admins and mods will never DM you first, never ask for a seed phrase, private key or wallet
signature, and never run airdrops or "wallet validation" through links in chat. Official links are only in
[#start-here / the pinned post]. If someone DMs you claiming to be support, block and report them, then tell a mod.
```

## 3. Welcome message (Discord Server Guide / Telegram greeting) — ~420 characters

```text
Welcome to [community name] — [one line: e.g. "creators and their agents learning to grow without the slop"].
[Agent name] is an AI character; its posts are AI-generated and approved by the team.
Start here: [#start-here]. Say hi in [#introductions]. Questions go in [#help].
Admins never DM first. Nothing here is financial advice.
```

## 4. Official links pin — ~250 characters

```text
Official [brand] links — anything else is not us:
Site: [https://…]
X: [@handle] · TikTok: [@handle]
Telegram: [t.me/channel] · chat [t.me/group]
Discord: [discord.gg/invite] (only from this list)
```

## 5. Holding reply for coin / price questions (agent or mod) — ~230 characters

```text
I can't give financial advice or tell you what to buy. The risk notes are pinned, and a mod will pick up anything
about your own funds. If someone DMs you offering help with this, it's a scam.
```

## 6. Removal notice (mod, public reply) — ~140 characters

```text
Removed: rule [n] ([short rule name]). [Optional: "Post your work in #show-your-work instead."] Thanks for keeping it clean.
```

## 7. Raid notice — ~180 characters

```text
We're cleaning up a spam wave. Don't click links or answer DMs right now. Slow mode is on for a bit; back to normal soon.
```

## 8. Sponsored post wrapper (when a post is paid) — prepend

```text
Ad · Paid partnership with [brand]. [The post.] (AI-generated) #ad
```
Use `labels: { ad: true }` in `@useclaudia/social`, which adds `#ad`; the leading "Ad ·" makes it obvious up front for
UK (ASA/CMA) and US (FTC) readers. Never sponsor coin posts into a community without a compliance check
([crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md)).

## 9. Office hours announcement — ~300 characters

```text
Office hours [day] [HH:MM UTC] in [#stage / the voice chat]. Bring one post that flopped and we'll work out why.
[Agent name] joins with notes (AI-generated); [operator name] runs the session. Recording: [yes/no].
```
