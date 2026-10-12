# Cost basis and fees

How the ledger and `scripts/pnl-from-ledger.mjs` treat each kind of row. This is a bookkeeping convention. Local tax
rules may require a different method; an accountant decides that.

## Row kinds

| Kind | `qty_tokens` | `native_amount` | `network_fee_native` | Effect |
|---|---|---|---|---|
| `buy` | Tokens received | SOL / ETH spent on the swap | Network fee, priority fee or gas | Adds tokens; cost += (amount + fee) × `native_usd` |
| `sell` | Tokens sold | SOL / ETH received | Network fee or gas | Proceeds = (amount − fee) × `native_usd`; realized = proceeds − average cost × tokens sold |
| `launch_cost` | 0 | Launch fee and rent, without the dev buy | Network fee or gas | Expense. The dev buy is a separate `buy` row |
| `fee_income` | 0 | Creator fees actually received | 0 | Income, not part of any coin's P&L |
| `harvest_gas` | 0 | 0 | Gas or network fee for a manual harvest | Expense |
| `transfer_in` | Tokens received | The cost you assign (often 0 for airdrops) | 0 | Adds tokens at that cost |
| `transfer_out` | Tokens sent | 0 | Network fee | Removes tokens at average cost, no P&L |
| `other_cost` | 0 | Any other SOL / ETH cost | Fee | Expense |

## Where each fee lives

| Fee | Where it shows up | Ledger column |
|---|---|---|
| pump.fun's protocol and creator fee on the curve | Inside the swap price | Already in `native_amount`; note the route |
| A route's fee after migration (shown in the quote) | Inside the swap | Already in `native_amount` |
| Robinhood launchpad fees | Inside the swap or launch | Already in `native_amount` |
| Coin buy / sell tax (`taxPct` in a quote) | Inside the swap | Already in `native_amount`; note it |
| Solana network fee and priority fee (`--priority-fee`, in SOL) | Separate | `network_fee_native` |
| Robinhood Chain gas (`--priority-fee` is extra gwei) | Separate | `network_fee_native` |
| Token account rent on Solana | Separate (part of what the CLI keeps aside, 0.005 SOL with fees) | `network_fee_native`, or a `launch_cost` row at launch |

The rule: take amounts from the wallet's actual change on the explorer. If the explorer shows the swap amount and the
fee separately, use them as above; then nothing is counted twice.

## Average cost vs first-in-first-out

- **Average cost** (what the script does): every token of a coin carries the same cost, recalculated after each buy.
  Simple, stable, easy to check by hand.
- **First-in-first-out**: the oldest tokens are sold first. Gives different realized P&L when prices moved between
  buys. Some jurisdictions require a specific method or their own pooling rules.

If the person's accountant needs a different method, give them the raw ledger rows; don't adjust the script's output
by hand.

## SOL and ETH themselves

The script measures coins in USD at each row's time. It doesn't track the SOL or ETH the wallet holds, or their own
gains and losses. In many places, spending SOL or ETH on a coin is also a disposal of that SOL or ETH. Keep the
`native_usd` column filled so an accountant can work that out.

## A worked line

Buy 120,000 $MOSS for 0.04 SOL, network fee 0.00005 SOL, SOL at $152:
cost = (0.04 + 0.00005) × 152 = $6.0876, so $0.00005073 per token.
Sell 60,000 for 0.031 SOL, fee 0.00005 SOL, SOL at $148:
proceeds = (0.031 − 0.00005) × 148 = $4.5806; basis = 60,000 × 0.00005073 = $3.0438; realized = $1.54.
