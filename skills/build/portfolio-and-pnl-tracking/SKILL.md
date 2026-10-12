---
name: portfolio-and-pnl-tracking
description: Tracks an agent wallet's holdings and profit and loss across Solana (SOL) and Robinhood Chain (ETH, beta) with Claudia's tools — get_my_portfolio and claudia://me/portfolio, claudia status, claudia wallet and wallet evm, the SDK's tokenBalance, getSolBalance and evm.balance, and get_wallet's 7-day view as a cross-check — then keeps a trade ledger with cost basis, network fees, gas, launch costs and creator-fee income, and computes average-cost P&L with an offline script. Use when someone asks "what is my agent holding", "am I up or down", "what did fees and gas cost me", wants a monthly statement, or needs clean records for an accountant. Includes a ledger template and a tax-record caution. Bookkeeping aid only, never tax or financial advice.
license: MIT
metadata:
  title: "Portfolio and P&L tracking"
  category: "build"
  summary: "Know what an agent wallet holds and whether it is up or down, across SOL and ETH, with every fee and gas cost in one ledger."
  level: "intermediate"
  tags: "portfolio, pnl, cost basis, ledger, fees, gas, solana, robinhood chain, records, accounting"
  uses: "@useclaudia/cli, @useclaudia/sdk, @useclaudia/mcp"
  time: "40 min"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Portfolio and P&L tracking

An agent that trades or launches spends SOL and ETH in small pieces: swaps, network fees, gas, launch costs. Without a
ledger nobody knows whether it is up or down. This skill snapshots what the agent's wallets hold, builds one ledger
of every buy, sell, launch cost and creator-fee payout with the USD price at the time, and turns it into a P&L
statement with an offline script. The result is a monthly statement the person can read in two minutes and records
an accountant can work from.

## When to use this

- "What is my agent holding?", "am I up or down this month?", "how much went on fees and gas?".
- Month-end or year-end statements for an agent wallet, a creator wallet, or both.
- Reconciling a balance that doesn't match what the person expected.
- Before raising caps: a person should see the P&L first ([safe-trading](../safe-trading/SKILL.md)).

Not for: deciding what to buy or sell, or calculating tax owed. The statement is a record, not a recommendation.

## What you need

- The wallets in scope. `claudia status` shows the server, agent, both wallets on this machine, caps and today's
  spend. Add any other wallet the person uses (the website wallet, the owner wallet) only if they ask.
- One read route: the CLI, `@useclaudia/sdk`, or an MCP app. `get_my_portfolio` needs sign-in online, or the local
  server (`npx -y @useclaudia/mcp`) where it reads the agent wallet ([mcp-setup](../mcp-setup/SKILL.md)).
- Trade records: the output of each `claudia buy`, `sell`, `launch` and `harvest` (signatures or hashes), the fee ledger
  from [creator-fees-and-harvest](../creator-fees-and-harvest/SKILL.md), and explorer access (Solscan, Blockscout).
- A USD price source for SOL and ETH at each row's time, named in the ledger. Node 20+ for
  [scripts/pnl-from-ledger.mjs](scripts/pnl-from-ledger.mjs) (offline, no dependencies).

## Steps

1. **List the wallets and today's spend.**

   ```sh
   claudia status          # both wallets, caps, spent today
   claudia wallet          # the Solana agent wallet
   claudia wallet evm      # the EVM wallet: address, ETH balance, explorer link
   ```

   `~/.claudia/spend.json` is the daily spend ledger the caps use (buys, dev buys and launch costs per chain, UTC days).
   It is not a P&L record: sells and harvests aren't in it, and it holds no prices.

2. **Snapshot the holdings.** What each tool returns, with units and freshness, is in
   [references/data-sources.md](references/data-sources.md). Read it before you mix numbers from two tools.
   - Solana: `get_my_portfolio` returns `wallet`, `solBalance`, `positions` (`coin`, `amount`, `valueUsd`, largest first)
     and the watchlist. The same data is the `claudia://me/portfolio` resource.
   - Robinhood Chain: there is no portfolio tool yet. Read the ETH balance (`claudia wallet evm`, `evm.balance()` in wei,
     or `evmBalance(address)`) and each coin the ledger says is held with `client.tokenBalance("hood:0x…", owner)`.
   - Prices for the unrealized column: `claudia insights <coin>` or `get_coin` (`priceUsd`). Write down the time.

3. **Build the ledger.** One row per event in [templates/ledger.csv](templates/ledger.csv): `buy`, `sell`, `launch_cost`
   (with the dev buy as its own `buy` row), `fee_income` (payouts actually received), `harvest_gas`, `transfer_in`,
   `transfer_out`. Fill amounts from what left or reached the wallet, confirmed on the explorer, not from the quote:
   a quote's `expectedOut` is an estimate and `minOut` is a floor. Record the signature or hash on every row.

4. **Put fees in the right place.** Rules (detail in
   [references/cost-basis-and-fees.md](references/cost-basis-and-fees.md)):
   - Swap fees inside the price (pump.fun's fee on the curve, a route's fee after migration, a Robinhood launchpad's
     fee) are already in `native_amount`. Note the route; don't add them twice.
   - Network fees, priority fees and gas go in `network_fee_native`. On a buy they add to cost; on a sell they reduce
     proceeds.
   - Launch fees and account rent go in a `launch_cost` row. Harvest gas goes in a `harvest_gas` row.
   - Use the USD price of SOL or ETH at the row's time for `native_usd`, and name the source.

5. **Run the P&L.**

   ```sh
   node scripts/pnl-from-ledger.mjs ledger.csv
   node scripts/pnl-from-ledger.mjs ledger.csv --price sol:<mint>=<USD per token> --price hood:0x<token>=<USD per token>
   node scripts/pnl-from-ledger.mjs ledger.csv --json > pnl.json
   ```

   It uses average cost per coin in USD and prints, per coin, tokens held, average cost, cost basis left, realized
   P&L, fees paid and (with `--price`) value and unrealized P&L, then totals for realized, unrealized, creator-fee
   income, launch costs and fees. It refuses a sell larger than the tokens on the ledger, which usually means a missing
   buy or transfer row.

6. **Reconcile.** Tokens held per the script should match `get_my_portfolio` / `tokenBalance`. If they differ, find the
   missing row on the explorer before you report anything. As a rough cross-check only, `get_wallet { "address":
   "<wallet>" }` gives the data provider's 7-day realized and unrealized P&L; it uses its own prices and window, so it
   won't match the ledger exactly.

7. **Write the statement.** Fill [templates/monthly-statement.md](templates/monthly-statement.md): holdings snapshot,
   realized and unrealized P&L by chain, fees and gas, launch costs, creator-fee income, open questions. Keep SOL and
   ETH amounts in their own columns; convert to USD only with the row's price. A worked month:
   [examples/october-statement.md](examples/october-statement.md).

8. **Keep records, give the tax caution.** Store the ledger, the statement and the explorer links privately
   (not in a public repo or chat). Then tell the person, in plain words, the caution below.

## Tax-record caution (not tax advice)

- Tax rules differ by country and change. This skill keeps records; it doesn't decide what is taxable.
- Examples of how authorities see it (checked 2026-10): the US IRS treats digital assets as property, and selling or
  exchanging them can produce a capital gain or loss
  ([IRS FAQ](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions));
  the UK's HMRC sets out its rules in the
  [Cryptoassets Manual](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual).
- Spending SOL or ETH on a coin can itself be a disposal of that SOL or ETH. The script's USD figures don't include SOL
  or ETH price moves, so an accountant may need the raw rows, not the summary.
- Creator-fee payouts may count as income when received. Keep the `fee_income` rows with their USD price.
- The cost-basis method (average cost, first-in-first-out, or another) may be set by local rules. Ask a qualified tax
  professional which one applies before filing.

## Templates

- [templates/ledger.csv](templates/ledger.csv) — one row per event, every kind the script understands.
- [templates/monthly-statement.md](templates/monthly-statement.md) — the statement the person reads.

## Check before you finish

- [ ] Every wallet in scope is listed, and holdings came from tool calls in this session, with times.
- [ ] Every ledger row has an explorer link, amounts from the wallet's actual change, and a named USD price source.
- [ ] Fees appear once: swap fees inside `native_amount`, network fees and gas in their own column.
- [ ] Script holdings match the wallet's balances, or each difference is explained.
- [ ] SOL and ETH are never added together without converting each at its own price.
- [ ] The tax caution was given, and nothing in the statement reads as tax or financial advice.
- [ ] The ledger is stored privately; no key, seed or secret appears anywhere in it.

## Pitfalls

- **Quotes as fills.** `expectedOut` and `minOut` aren't what you got. Use the explorer.
- **Forgetting dust costs.** Priority fees, rent and gas are small per trade and large per month. Record them.
- **The spend ledger as P&L.** `spend.json` counts spending against caps. It has no sells, harvests or prices.
- **Holder shares vs balances.** Insights show holder shares as fractions in the SDK and percent in MCP; neither is a
  balance. Use `tokenBalance` or the portfolio tool for amounts.
- **Accrued fees as income.** `creatorShare` in a fee reading is waiting, not received. Record `fee_income` on payout.
- **Robinhood Chain coverage.** Insights are deepest on Solana; on Robinhood Chain some prices or holders may be
  `partial`. Say so in the statement.
- **Sharing the ledger.** It maps wallets to a person. Treat it like a bank statement.

## Related skills

- [creator-fees-and-harvest](../creator-fees-and-harvest/SKILL.md) — the fee readings and payouts behind `fee_income`.
- [safe-trading](../safe-trading/SKILL.md) — the trades this ledger records, with caps and confirmations.
- [launch-a-coin](../launch-a-coin/SKILL.md) — what a launch costs and how to record the dev buy.
- [wallet-and-key-security](../wallet-and-key-security/SKILL.md) — keep the agent wallet separate from savings.
- [agent-ops-runbook](../agent-ops-runbook/SKILL.md) — budgets and what to do after a bad week.
- [kpi-reporting](../../grow/kpi-reporting/SKILL.md) — folding the statement into a monthly report.
