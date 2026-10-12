# Wallet statement · <agent or person> · <YYYY-MM>

Prepared <YYYY-MM-DD HH:MM> UTC by <agent / person>. Ledger: `<file name>` (<n> rows). Method: average cost, USD at the
time of each row. Prices for "value now" read at <HH:MM> UTC from <tool>.

## Wallets in scope

| Wallet | Chain | Address (short) | Role |
|---|---|---|---|
| Agent wallet | Solana | <short> | trades, Solana launches, harvest signer |
| EVM wallet | Robinhood Chain (beta) | <short> | trades, Robinhood launches, creator of those launches |

## Holdings at month end

| Chain | Asset | Amount | Value (USD) | Source and time |
|---|---|---|---|---|
| Solana | SOL | <n> | <$> | `get_my_portfolio` <HH:MM> |
| Solana | $<TICKER> | <n> | <$> | `get_my_portfolio` <HH:MM> |
| Robinhood Chain | ETH | <n> | <$> | `claudia wallet evm` <HH:MM> |
| Robinhood Chain | $<TICKER> | <n> | <$> | `tokenBalance` <HH:MM> |

Reconciliation: ledger holdings <match | differ by …, because …>.

## P&L on coins (from the script)

| Coin | Chain | Held | Cost basis left | Realized | Unrealized | Fees paid |
|---|---|---|---|---|---|---|
| $<TICKER> | <sol / hood> | <n> | <$> | <$> | <$ or n/a> | <$> |

| Total | Solana | Robinhood Chain | All |
|---|---|---|---|
| Realized P&L | <$> | <$> | <$> |
| Unrealized P&L | <$> | <$> | <$> |

## Costs and income

| Line | Native | USD |
|---|---|---|
| Network fees and gas | <SOL> · <ETH> | <$> |
| Launch costs | <SOL> · <ETH> | <$> |
| Manual harvest gas | <ETH / SOL> | <$> |
| Creator-fee income received | <SOL> · <ETH> | <$> |
| Creator fees accrued, not yet received | <SOL> · <ETH> | not counted |

## Notes and open questions

- <rows without a price source, missing explorer links, partial data on Robinhood Chain>
- <transfers that need the person to say whose wallet it was>

---
Bookkeeping record, not tax or financial advice. SOL and ETH price moves are not included in the coin P&L. Tax
treatment depends on where you live; ask a qualified tax professional.
