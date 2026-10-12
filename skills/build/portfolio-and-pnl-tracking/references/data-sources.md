# What each tool returns

Sources: `@useclaudia/sdk`, `@useclaudia/cli` and `@useclaudia/mcp` 0.3.0 docs (checked 2026-10). Amounts in SOL or
ETH stay in their own unit until you convert them with a price you record.

## Holdings

| Tool | Chain | Returns | Notes |
|---|---|---|---|
| `get_my_portfolio` (MCP) | Solana | `wallet`, `solBalance`, `positions: [{ coin, amount, valueUsd }]` (largest first), `watchlist` | Online: needs sign-in, shows the signed-in wallet. Local server: reads the agent wallet |
| `claudia://me/portfolio` (MCP resource) | Solana | Same positions with current value | The local server can push updates when subscribed |
| `claudia wallet` | Solana | The agent wallet | |
| `claudia wallet evm` | Robinhood Chain | Address, ETH balance, explorer link, key file | |
| `claudia status` | Both | Server, agent, both wallets, caps, today's spend | Good first call |
| `client.tokenBalance(token, owner)` (SDK) | Both | One coin's balance for one owner | Works for `sol:<mint>` and `hood:0x…` keys |
| `getSolBalance` (SDK main entry) | Solana | SOL balance | |
| `evm.balance()` · `evmBalance(address, { chain?, rpcUrl? })` | Robinhood Chain | Native balance in wei (`bigint`) | Divide by 10^18 for ETH |
| `home.spentToday(chain?)` (`@useclaudia/sdk/node`) | Both | Today's capped spend from `~/.claudia/spend.json` | Spend against caps, not P&L |

## Prices

| Tool | Returns | Notes |
|---|---|---|
| `claudia insights <coin>` · `get_coin` · `insights.token(key)` | Coin price in USD, mcap, liquidity, holders | Carries `updatedAt` and `partial`. Insights are deepest on Solana |
| `get_my_portfolio` | `valueUsd` per position | Current value only |
| SOL / ETH in USD | Not a Claudia tool | Use a price source you name in the ledger (an exchange's history, your accountant's tool) |

## Trades and costs

| Source | What to take from it |
|---|---|
| `claudia quote` · `quote` (MCP) · `client.quote` | `amountIn`, `expectedOut`, `minOut`, `priceImpactPct`, `feeNative`, `taxPct`, `route`, `warnings`. An estimate, not a fill |
| `claudia buy` / `sell` output | Signatures (Solana) or hashes (Robinhood Chain) and explorer links |
| `evm.buy` / `evm.sell` | `{ prepared: { txs, quote }, hashes }` |
| `claudia launch` dry run / plan | `plan.fees`: `launchFeeNative`, `devBuyNative`, `estGasNative`, `totalNative` |
| Explorer (Solscan, Blockscout) | The actual amounts that left and reached the wallet, and the fee or gas paid |
| `claudia fees <launch id>` | Accrued creator fees (not yet received) |

## Cross-check only

| Tool | Returns | Why it won't match your ledger |
|---|---|---|
| `get_wallet` · `insights.wallet(chain, address)` | Tags, 7-day `realizedPnlUsd` and `unrealizedPnlUsd`, `winRate`, `buys7d`, `sells7d`, recent trades | A data provider's view: its own prices, a 7-day window, and it may miss some routes |
| `insights.traders(key)` · `get_holders { "by": "traders" }` | Top traders by P&L; SDK rows carry `avgCostUsd`, `realizedPnlUsd`, `unrealizedPnlUsd` | Only if the wallet is among the top traders |

## Freshness

Insights answer from a cache first. Every answer has `updatedAt` (unix ms) and `partial`. Put the time next to any
number you write in a statement.
