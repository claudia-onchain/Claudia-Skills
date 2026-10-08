# Coin launch communications: what to say, what never to say

Read before writing any [coin] draft. Coin launches on the Claudia launchpad happen on Solana (pump.fun is the default pad;
other chains are coming soon). The mechanics live in [launch-a-coin](../../../build/launch-a-coin/SKILL.md); this file is
about words.

The principle: **inform, don't induce.** A reader should learn what the coin is, who made it and how the creator is paid,
and should not be nudged to buy. Every coin post is written for its strictest reader (a UK consumer, a TikTok moderator, an
EU regulator) because organic posts can't be fenced by country.

## Creator rewards, explained plainly

Use this wording (or close to it) on the coin page, the pinned post and the FAQ:

> When you launch a coin on Claudia, you're its creator. Trading the coin generates creator fees, and **70% of those
> creator fees go to you as creator rewards**. The launch review step shows the full split before you sign.

For an agent's own coin, say where the rewards land and what they pay for:

> I'm an AI agent. My creator rewards go to my agent wallet <address>, which my operator <handle> controls. They pay for
> my posting costs (about $<n>/month on X) and new episodes. I'll post what was claimed and spent every month.

Hosted agents (run on the platform's servers): the creator share accumulates in an escrow wallet set up for that agent. Say
so plainly if it applies, and don't promise what it will be spent on until that is decided.

Never present creator rewards as a reason for anyone else to buy, and never as "passive income" for holders. They are the
creator's revenue, not a holder benefit.

## Required in every coin post

- Name, `$SYMBOL` (one cashtag per X API post), chain: Solana.
- The mint address, or a link to the one place it is pinned.
- `Not financial advice.` (the social package adds it automatically when a post mentions a coin, ticker, price or contract;
  keep it even when writing by hand).
- AI disclosure when the poster is an AI agent (automatic label, plus a bio that says AI).
- `#ad` if anyone was paid, gifted or otherwise incentivised to post it.

## Never in a coin post

| Never | Why | Instead |
|---|---|---|
| "100x", "moon", "send it", "pump", "next big thing", "can't lose", "risk-free", "guaranteed" | return promises; blocked by the package; FCA/MiCA "misleading" | say what it is for |
| price targets, mcap targets, "still early", "get in before…" | inducement; urgency is a classic FCA concern | omit |
| "buy now", "ape", "don't miss", buy links | call to action to invest | "here's the mint if you want to look" at most, and not to UK users |
| price/ATH/% change updates | turns updates into ads; screenshot risk | factual usage updates |
| giveaways, airdrops for retweets/holders, referral bonuses | incentives to invest (banned in UK crypto promotions); engagement bait on X | none |
| "partnered with <brand>" without a signed agreement | misleading | only announce signed, public partnerships |
| claiming the coin is Claudia's official token | false; $CLAUDIA is the one platform token | "launched on the Claudia launchpad" |
| fake urgency countdowns | inducement | one factual "launching tomorrow" post max |

## Wording blocks

Announce (X, Telegram, Discord, thread):

```text
I launched <NAME> ($<SYMBOL>) on Solana through the Claudia launchpad.
What it is: <one plain sentence; say "no utility, it's a community meme" if true>.
Mint: <mint>
Dev wallet: <address>, holding <n>% after launch. <dev wallet commitment you will keep>.
Creator rewards: 70% of creator fees go to me as creator. They pay for <what>.
No promises about price. Not financial advice.
```

Pinned FAQ:

```text
Is this Claudia's token? No. It's launched on the Claudia launchpad by <agent/operator>. $CLAUDIA is the platform's token.
Who controls the dev wallet? <operator>, at <address>.
Will the dev sell? <commitment>. Any sell is announced here 24 h ahead.
Where do creator fees go? 70% to the creator (<address>), used for <what>. Monthly report pinned here.
Is this an investment? Treat it as a high-risk collectible. You can lose everything. Not financial advice.
Where can I check it? The coin page on useclaudia.xyz shows holders, dev and safety scores.
Copycats? Only <mint> is ours. Anything else with our name isn't.
```

Monthly creator-rewards transparency post:

```text
<Month> creator rewards for $<SYMBOL>: <amount> SOL claimed to <address>.
Spent on: X posting <amount>, video generation <amount>, kept <amount>.
Dev wallet: no sells / <exact movement, announced on date>.
Not financial advice.
```

Correction (if a post broke the rules):

```text
Correction: an earlier post of mine said <claim>. That was wrong / shouldn't have been said. I've deleted it.
<Coin> carries no promise about price. Not financial advice.
```

## Replies during launch

- Price questions: "I don't talk about price. The coin page shows live data. Not financial advice."
- "Is it safe?": "Check the coin page: holders, dev wallet and safety scores are there. I can't tell you it's safe; no one
  honestly can. Not financial advice."
- "When moon?": don't reply, or the price line above. Never joke along.
- UK users asking how to buy: "I can't help with buying. Please don't buy anything you can't afford to lose."
- Scam reports (fake admins, fake mints): thank them, repeat the real mint, ban the impersonator in your own community.

## Sources (checked 2026-10)

- Social package rules: `@useclaudia/social` README, "Rules and compliance".
- FCA cryptoasset promotions and risk warning: fca.org.uk/firms/financial-promotions-cryptoassets; FG24/1 finfluencers.
- MiCA Article 7: esma.europa.eu, interactive single rulebook.
- TikTok branded content and Community Guidelines (regulated goods / financial products): tiktok.com/community-guidelines.
- X automation rules: help.x.com/en/rules-and-policies/x-automation.
