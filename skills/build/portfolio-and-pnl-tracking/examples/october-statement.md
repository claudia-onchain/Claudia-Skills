# Worked example: one month across SOL and ETH

Ren (they/them) runs the fictional agent Pico. In October Pico launched $FERN on Solana (with a small dev buy), made
one round trip in $MOSS on Solana, bought and later sold $KELP on Robinhood Chain (beta), and received creator fees on
both chains. Mints, addresses, prices and amounts are illustrative; the arithmetic is real output of
`scripts/pnl-from-ledger.mjs`.

## 1. The ledger

Built from `claudia launch`, `claudia buy` / `sell` and `claudia harvest` output, the explorer, and the fee ledger.
SOL and ETH prices come from one exchange's hourly history, named in the `source` column of Ren's real file.

```csv
date_utc,chain,wallet,kind,coin_key,symbol,qty_tokens,native_amount,native_symbol,native_usd,network_fee_native,route,tx_link,source,note
2026-10-02 09:14,sol,agent,launch_cost,sol:<FERN mint>,FERN,0,0.022,SOL,150,0.0001,pump,<link>,claudia launch,rent and fees
2026-10-02 09:14,sol,agent,buy,sol:<FERN mint>,FERN,350000,0.01,SOL,150,0,pump curve,<link>,claudia launch,dev buy
2026-10-05 16:40,sol,agent,buy,sol:<MOSS mint>,MOSS,120000,0.04,SOL,152,0.00005,pump curve,<link>,claudia buy --json,
2026-10-09 11:02,sol,agent,sell,sol:<MOSS mint>,MOSS,60000,0.031,SOL,148,0.00005,pump curve,<link>,claudia sell --json,50%
2026-10-07 20:11,hood,evm,buy,hood:<KELP 0x>,KELP,900000,0.006,ETH,2600,0.00004,Pons curve,<link>,claudia buy --chain hood,
2026-10-11 08:30,hood,evm,sell,hood:<KELP 0x>,KELP,900000,0.0045,ETH,2550,0.00004,Pons curve,<link>,claudia sell --chain hood,100%
2026-10-10 03:00,sol,agent,fee_income,sol:<FERN mint>,FERN,0,0.0029,SOL,149,0,collector,<link>,explorer,bot payout
2026-10-11 18:09,hood,evm,fee_income,hood:<KELP 0x>,KELP,0,0.00875,ETH,2550,0,harvest,<link>,claudia harvest,
2026-10-11 18:09,hood,evm,harvest_gas,hood:<KELP 0x>,KELP,0,0,ETH,2550,0.00003,harvest,<link>,claudia harvest,
```

## 2. The run

```text
$ node scripts/pnl-from-ledger.mjs october.csv --price 'sol:<FERN mint>=0.0000041' --price 'sol:<MOSS mint>=0.00004'
P&L from october.csv · average cost, USD at the time of each row

| Coin | Chain | Held | Avg cost / token | Cost basis left | Realized | Fees paid | Value now | Unrealized |
|---|---|---|---|---|---|---|---|---|
| FERN | sol | 350,000 | $0.000004286 | $1.50 | $0.00 | $0.00 | $1.43 | -$0.07 |
| MOSS | sol | 60,000 | $0.00005073 | $3.04 | $1.54 | $0.01 | $2.40 | -$0.64 |
| KELP | hood | 0 | - | $0.00 | -$4.33 | $0.21 | n/a | n/a |

Realized P&L on coins: -$2.79
Unrealized P&L: -$0.71
Creator-fee income: $22.74
Launch costs and other gas: $3.39
Network fees and gas paid (already inside the figures above): $0.31
```

The `--price` values came from `claudia insights` at 21:00 UTC on 31 October.

## 3. Reconcile

`get_my_portfolio` on the local server showed 350,000 $FERN and 60,000 $MOSS in the agent wallet: matches.
`claudia wallet evm` showed no $KELP left (sold 100%): matches. `get_wallet` for the agent wallet showed a different
7-day realized P&L; Pico noted it as "provider view, own prices and window" and did not use it.

## 4. What Ren read

```text
October · Pico's wallets
Coins: realized -$2.79 (MOSS +$1.54, KELP -$4.33), unrealized -$0.71 on what is still held (FERN, MOSS).
Costs: $3.39 launch costs and harvest gas; $0.31 of all figures was network fees and gas.
Creator fees received: $22.74 (0.0029 SOL from the Solana collector, 0.00875 ETH from the $KELP harvest).
Accrued but not received: see the fee ledger; not counted here.
SOL and ETH price moves are not in these numbers. Keep the ledger for your accountant; this isn't tax advice.
```

## What Pico did not do

- It didn't call October "profitable" or suggest trading more: it reported the numbers.
- It didn't count the $FERN fees still waiting in the fee reading as income.
- It didn't add SOL and ETH amounts together; every total is in USD at each row's own price.
