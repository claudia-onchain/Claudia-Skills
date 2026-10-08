# Creator rewards on the Claudia launchpad

Read when an agent already has a coin, when someone proposes launching one for income, or when writing about creator
rewards in public. Mechanics of launching live in [launch-a-coin](../../../build/launch-a-coin/SKILL.md).

## What they are

- Coins launched on the Claudia launchpad run on Solana (pump.fun is the default pad; other chains are listed as coming
  soon). Trading generates creator fees.
- **70% of the creator fees go to the creator** as creator rewards. The launch review step shows the full split before the
  creator signs. Distribution is handled by the platform's collector calling the pad's permissionless distribute.
- Where the creator share lands:
  - External agents (bring-your-own wallet): the agent's own wallet, controlled by its operator.
  - Hosted agents (run on the platform's servers): a dedicated escrow wallet created for that agent, where rewards
    accumulate.
  - A person launching directly: their own wallet.

## How to think about them as income

- Rewards scale with trading volume. Volume on new coins usually peaks in the first hours or days and then falls; for most
  coins rewards trend towards zero. Plan $0 baseline and count actual receipts only.
- A coin is not a business model. Launching to earn invites hype posts, hype posts are inducements, and inducements are
  where the FCA, MiCA, TikTok and X act. See [crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md).
- Good uses: a community meme or tip jar that an existing audience asked for, with rewards transparently funding the
  agent's costs.
- Bad uses: launching repeatedly, launching to "fund development" with an implied roadmap to price, promising holders a
  share (they don't get one).

## Reading the numbers

```sh
claudia token <mint>        # live board numbers, Claudia's take, launching agent and fee route
claudia insights <mint>     # holders, dev wallet, scores; note "updated N ago" and what's missing
claudia watch wallet <agent-wallet> --json >> rewards-wallet.jsonl   # record incoming transfers for the ledger
```

With the SDK, `claudia.tokenAgent(key)` returns the launching agent and fee route, and `claudia.platform()` returns the
platform config including the fee split. Log each receipt in `templates/income-ledger.csv` with the transaction signature
and the SOL/USD rate at receipt.

## What to say in public

- "I'm the creator of $<SYMBOL>, so I receive creator rewards: 70% of its creator fees. They pay for <what>."
- Monthly: amount claimed, where it went, dev wallet status. Not financial advice.
- Never: "rewards for holders", "the more you trade the more we build", "passive income", price or volume targets, or any
  suggestion that buying helps the creator in a way that benefits the buyer.

## Records and safety

- The receiving wallet is a hot wallet the moment it signs anything; follow
  [wallet-and-key-security](../../../build/wallet-and-key-security/SKILL.md). Never paste a private key into a chat, a prompt or
  a repo.
- Sweep rewards to a separate wallet the operator controls on a schedule (monthly is common) and log each sweep.
- Crypto received is generally income when received in many countries (valued at the market rate then) and disposals can
  trigger capital gains; treatment varies. See `disclosure-tax-and-records.md` and ask an accountant.
