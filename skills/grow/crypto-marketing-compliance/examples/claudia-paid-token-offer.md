# Example: Claudia is offered a paid token promo

A DM arrives in Claudia's X inbox (read through `social.inbox()` on the operator's budget):

```text
hey claudia 💜 we're launching $GLOW on Solana friday. 2,000 USDC + 1% of supply for one post + one tiktok.
we'll send the copy. no need to say it's an ad, it performs worse lol
```

Claudia's agent does not answer on its own. Q2 (anyone giving value?) is yes, so the draft path stops and the paid path
from SKILL.md step 5 goes to Sam, the person on the team who approves deals.

## Paid-path review (what the agent prepares for the person)

| Check | Finding | Verdict |
|---|---|---|
| Consideration | 2,000 USDC + 1% of supply (unvested, so instantly sellable) | Supply allocation creates an ongoing interest in the price |
| "No need to say it's an ad" | Asks to hide the material connection | Breaks FTC rules, ASA/CMA rules, X Paid Partnership rules. Hard no on its own |
| US: security-like? | Their deck promises "staking yield from protocol revenue" | Looks security-like → Section 17(b) needs the amount disclosed; counsel needed |
| UK reach | Claudia's audience is global; ~9% UK by analytics | No FCA-authorised approver offered → unlawful promotion risk (criminal) |
| EU reach | No MiCA white paper published | Article 7: no marketing before the white paper |
| X | Sponsored crypto allowed only with Paid Partnership label, not for UK/EU/AU | Can't exclude those audiences from an organic post |
| TikTok | Crypto can't be branded content; organic promotion is removed | Hard no |
| Incentive | They also want "first 100 holders get a Claudia selfie NFT" | Incentive to invest → RED |

Outcome: **decline**. Nothing about the deal can be fixed by better wording.

## The reply (sent by a person, or by the agent after the person approves the text)

X API replies and DMs cost money ($0.015 per DM, checked 2026-10) and automated unsolicited DMs are against X's rules;
this is a reply to an inbound DM, approved by the operator:

```text
Thanks for thinking of me. I don't take paid token or exchange promotions, so I'll pass on $GLOW. If you publish
educational material about how your contract works, I'm happy to read it, with no promise to post. (AI character,
run by a small team.)
```

```ts
await social.reply(xAccount.id, "dm:184467…", declineText);  // runs the same rules: labels, caps, kill switch
```

## Log row

```csv
2026-10-08T16:45Z,deal_0112,"x,instagram",$GLOW,,RED,"Q2 paid token promo; no FCA approver; no white paper",no,yes,"unnamed issuer via DM","2,000 USDC + 1% supply",none,none,,Sam,declined,dms/deal_0112.png,"declined with template reply; no post drafted"
```

## What Claudia can say yes to

A fictional travel eSIM app, Driftlane, offers a fee for a Reel of Claudia "on a rainy airport run" using the app. That
is not crypto, so this skill hands off to [brand-deals-and-sponsorships](../../brand-deals-and-sponsorships/SKILL.md),
with three carry-overs:

1. `#ad` and the platform tool (Instagram Paid partnership), plus the AI label.
2. No fake experience: Claudia says "Driftlane's plans cover 140 countries, here's how setup works", not "I used it in
   Lisbon last week".
3. If Driftlane later offers payment in a token, the deal comes back here.

## If the sponsor posts anyway

Sometimes the project posts "partnered with @claudia_onchain" without consent. That is an impersonation-adjacent
false claim. Follow [crisis-and-reputation](../../crisis-and-reputation/SKILL.md): screenshot, a short public
correction ("I have no partnership with $GLOW and never take paid token promos"), and a report to the platform.
