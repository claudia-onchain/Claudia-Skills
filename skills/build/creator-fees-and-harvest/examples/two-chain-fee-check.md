# Worked example: a fee check on two chains

Sam (they/them) runs Pico, a fictional external agent that launched two coins: $FERN on Solana through the agent
route, and $KELP on Robinhood Chain (beta) through Pons V2 with Sam's EVM wallet. Sam asks Pico at month end: "What
have my coins earned, and should I collect?" Amounts, ids and addresses below are illustrative.

## 1. Find the launches

```text
$ claudia fees
  Your launches · 2 found
  │ Coin   │ Chain     │ Launchpad │ Status    │ Launch id        │
  │ $FERN  │ Solana    │ pump      │ confirmed │ <fern-launch-id> │
  │ $KELP  │ Robinhood │ pons      │ confirmed │ <kelp-launch-id> │
  Fees for one: claudia fees <launch id>
```

## 2. Read each one

```text
$ claudia fees <fern-launch-id>
  Fees · launch <fern-launch-id>
  │ What                 │   Earned │  Your 70% │
  │ Creator fees waiting │ 0.0042 SOL │ 0.00294 SOL │
  Collect them: claudia harvest <fern-launch-id>

$ claudia fees <kelp-launch-id>
  Fees · launch <kelp-launch-id>
  │ What                │   Earned │  Your 70% │
  │ FeeSplitter balance │ 0.0125 ETH │ 0.00875 ETH │
  Collect them: claudia harvest <kelp-launch-id>
```

Pico also checks the $KELP splitter on-chain, read-only:

```ts
import { readFeeSplitter } from "@useclaudia/sdk/evm";
import { formatEther } from "viem";

const s = await readFeeSplitter("<kelp splitter 0x…>");
console.log(s.creatorBps, s.platformBps, formatEther(s.distributableNative));
// → 7000 3000 0.0125
```

`creatorBps` is 7000 and `creator` is Sam's EVM address, so the split is what the launch promised.

## 3. The decision

Pico fills in the harvest decision template for each coin.

| | $FERN (Solana) | $KELP (Robinhood Chain) |
|---|---|---|
| Creator share waiting | 0.00294 SOL | 0.00875 ETH |
| Cost of a manual harvest | one network fee from the agent wallet | gas for the harvest transactions, from the EVM wallet |
| Pico's read | Small amount; the collector bot pays it out anyway | Gas is a small share of the amount; fine to dry-run if Sam wants it now |

Pico's reply:

```text
Fees at 18:05 UTC:
- $FERN (Solana): 0.0042 SOL earned, your 70% is 0.00294 SOL. The collector bot pays this out on its own schedule;
  a manual harvest isn't worth a network fee for this amount. I'd wait.
- $KELP (Robinhood Chain, beta): 0.0125 ETH in the FeeSplitter, your 70% is 0.00875 ETH. The keeper bot pays out
  too, but if you want it now I can dry-run the harvest. Your EVM wallet pays the gas. The splitter contracts
  haven't had an external audit yet.
Not financial or tax advice.
```

Sam: "Dry-run $KELP."

## 4. Dry run, confirm, send

```text
$ claudia harvest <kelp-launch-id> --dry-run
  Harvest · launch <kelp-launch-id>
  Transactions  1
  Dry run — built and checked; nothing was signed or sent.
```

Pico shows the harvest confirmation template. Sam says yes and runs it in their own terminal:

```text
$ claudia harvest <kelp-launch-id>
  Send 1 transaction(s) to collect and split the fees (gas from 0x4b1C…9e02)? y
  Harvested · split 70/30 on-chain
  https://robinhoodchain.blockscout.com/tx/<hash>
```

A fresh `claudia fees <kelp-launch-id>` shows the balance gone from the splitter.

## 5. The ledger rows

```csv
date_utc,chain,launch_id,coin,kind,amount_native,creator_share_native,native_symbol,native_usd_price,price_source,fee_or_gas_native,tx_link,note
2026-10-31 18:05,sol,<fern-launch-id>,$FERN,reading,0.0042,0.00294,SOL,<USD per SOL>,<price source 18:05>,0,,waiting for collector
2026-10-31 18:05,hood,<kelp-launch-id>,$KELP,reading,0.0125,0.00875,ETH,<USD per ETH>,<price source 18:05>,0,,FeeSplitter balance
2026-10-31 18:09,hood,<kelp-launch-id>,$KELP,harvest,0.0125,0.00875,ETH,<USD per ETH>,<price source 18:09>,<gas>,https://robinhoodchain.blockscout.com/tx/<hash>,signed by EVM wallet
```

## What Pico did not do

- It did not add `--yes` or run the harvest itself. Sam typed `y`.
- It did not harvest $FERN, because the cost was out of proportion to the amount.
- It did not describe the fees as income Sam "will" keep earning.
