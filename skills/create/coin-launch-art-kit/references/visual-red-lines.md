# Visual red lines for coin art

Read before making the launch card and announcement visuals (steps 5–8). Images make claims just like words do: a
rising chart is a price claim, an exchange logo is a listing claim, a famous face is an endorsement claim. Regulators
and platforms judge the whole post, image included. Background and law: [crypto-marketing-compliance](../../../grow/crypto-marketing-compliance/SKILL.md).

## Never on any asset

| Element | Why it fails |
|---|---|
| Prices, market caps, "$0.00…" figures, percentages | Price claim; dated the moment it posts |
| Rising charts, green candles, arrows up | Implies the price will rise |
| Multipliers ("100x", "10x"), "moon", rockets, lambos, money piles, gold bars | Return promise in picture form |
| Exchange or wallet logos, "listing soon", "partnered with" | Implies listings or partnerships that may not exist |
| Real people, celebrities, other creators' characters | Impersonation and false endorsement |
| Other projects' logos, brand mascots, sports teams | Trademark; pump.fun can remove the coin |
| Countdown to "pump", "last chance", "don't miss" | Pressure tactics |
| Fake screenshots of gains, wallets or tweets | Deceptive |
| Charity claims without a real, verifiable charity arrangement | Misleading |

## Allowed

- The mascot or object, the name, the ticker (launch card only), the palette, the chain's name as plain text in copy.
- A neutral "now live on <launchpad>" line in the post copy, with the contract address.
- "AI-generated" on the art's alt text and in the post.

## The launch card helper

`launchCardPrompt({ name, symbol, chain?, launchpad?, idea? })` from `@useclaudia/media` writes: "Launch announcement
card for the coin <name> ($<SYMBOL>) on <chain> (<launchpad>). … Bold, clean composition with the ticker $<SYMBOL> as
the only text; no prices, charts going up, or promises." Keep that sentence when you add to the prompt.

## Words in the brand kit's banned list

Suggested: `guaranteed`, `100x`, `moon`, `lambo`, `to the moon`, `profit`, `returns`. A prompt with any of them is
blocked before it is sent (`blocked`).

## Review questions (all must be "no")

1. Could anyone read a price direction, a return or a multiplier into this image?
2. Does it show or suggest an exchange, wallet, partner, person or brand that hasn't agreed to be here?
3. Is there any text other than the name or ticker?
4. Would it mislead someone in the UK or EU who sees it out of context?
5. Is anything paid or gifted without `#ad`?
