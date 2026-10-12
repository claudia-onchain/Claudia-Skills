# Harvest decision: <launch id> · $<TICKER> · <chain>

Read at: <YYYY-MM-DD HH:MM> UTC (from `claudia fees <launch id>`)

| Line | Value |
|---|---|
| Creator share waiting | <creatorShare> <SOL / ETH> |
| Estimated cost of a manual harvest | <network fee or gas> <SOL / ETH> (from the dry run, or a recent harvest on this chain) |
| Cost as a share of what it moves | <cost ÷ creatorShare × 100> % |
| Signer wallet and its balance | <wallet short> · <balance> |
| Last bot payout seen | <date or "none seen"> |
| Reason the person wants it now | <their words> |

Rules of thumb (the person decides; these are not advice):

- Cost above 10% of the amount it moves: suggest waiting for the collector or keeper bot.
- Cost under 2%, and the person has a reason for the timing: fine to dry-run.
- Signer balance can't comfortably cover the cost: fund it first, with a small amount, or wait.
- Robinhood Chain: repeat the beta and unaudited-contract caveat in the same message.

Decision: <wait | dry run now> · decided by <person>, <time>
