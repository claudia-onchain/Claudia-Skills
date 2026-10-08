# Launch mechanics: what happens on-chain

Read this when a person asks "what exactly am I signing?", "who can change the split?", "when do I get paid?", or
when explaining why a launch was refused. Sources: Claudia's `docs/FEES.md`, `docs/API.md`, the pump adapter and the
collector in the platform server, and pump.fun's public fee-sharing docs (checked 2026-10).

## The single transaction

| Step | Program | Instruction | Effect |
|---|---|---|---|
| 1 | pump | `create_v2` | Mint + bonding curve; launcher = creator; mint and freeze authority revoked by the program |
| 2 | pump fees | `create_fee_sharing_config` | Moves the coin's creator vault to a `sharing_config` PDA |
| 3 | pump fees | `update_fee_shares_v2` | Sets shareholders creator 7000 bps / platform 3000 bps; callable **once** per sharing config, so the list is locked |
| 4 | pump | buy (optional) | Dev buy on the curve, paid by the launcher |

Why one transaction: if the split were a second transaction, someone could act on the coin between the two, and the
creator could skip step 3. With a lookup table (an Address Lookup Table holding pump's static accounts and current
fee recipients) the four steps fit in one v0 transaction. Without the table every pump.fun plan is refused with
`split_not_atomic` (the platform owner sets `PUMP_LUT_ADDRESS` once; `PUMP_ALLOW_SPLIT_LAYOUT=true` exists for tests
only).

## Who is the creator and who gets the 70%

| Launcher | Creator wallet (signs) | Creator 70% goes to |
|---|---|---|
| A person on the website | their wallet | their wallet |
| External agent (`/api/v1/launch/plan`, CLI, SDK, local MCP) | the agent wallet | the agent wallet |
| A person using "launch with my agent" for a hosted agent | the person signs | the hosted agent's escrow wallet (Claudia-held) |
| AI app via online `prepare_launch` | the signed-in wallet, on `/confirm` | that wallet |

The platform 30% always goes to `88yN3gaazpgvBG1JCrcSK9krNDAbJ9CowhVbdBvxEKVW` (committed in code as
`PLATFORM_FEE_WALLET_SOL`; a server whose treasury secret differs refuses Solana launches with `treasury_mismatch`).

## Confirmation and badges

`POST /api/launch/confirm { id, hashes }` accepts only the plan's own signatures. The coin is marked **confirmed**
(badged "launched on Claudia") only when the on-chain sharing config equals exactly [creator-or-escrow 7000,
platform 3000] with the admin revoked; otherwise **unverified**. A reconciler re-checks submitted launches every 60 s.

## Payouts

Nobody has to claim. The collector bot:

1. reads each confirmed launch's sharing config, curve vault and (for graduated coins) the PumpSwap creator vault;
2. pays a coin only if its config matches the planned route and at least `COLLECTOR_MIN_SOL` (default 0.05 SOL) is
   claimable;
3. runs `transfer_creator_fees_to_pump_v2` (pump AMM, permissionless) for graduated coins, then
   `distribute_creator_fees_v2` (pump, permissionless), which can only pay the on-chain shareholders;
4. repeats every `COLLECTOR_INTERVAL_MIN` (default 180 minutes). The collector wallet only pays network fees.

Because distribution is permissionless, anyone (including the creator) can also call it; payouts never depend on
Claudia being online. Public status: `GET /api/collector/status` (`enabled`, `lastRun`, `nextRunAt`, `lowBalance`,
totals).

## Costs

- Launch fee on pump.fun through Claudia: 0.
- Rent for the new accounts (mint, curve, token accounts, ~1 KB sharing config, volume accumulator): about 0.022 SOL
  (display estimate), plus Solana signature fees and an optional priority fee.
- Dev buy: whatever the launcher chooses, priced on the curve; the plan shows tokens out and % of supply. A dev buy
  larger than the curve's remaining supply is clamped (a warning says so).

## Mayhem mode and CTO

pump.fun's community-takeover process can reset an abandoned coin's fee settings. Coins created in Mayhem mode
(`claudia launch … --mayhem`, `mayhemMode: true`) can't be taken over that way, so their split can't be reset by
pump.fun; the plan's warnings say which applies. pump.fun sets the creator-fee rate and can change it.

## Limits

| Limit | Value |
|---|---|
| Agent launch planning | 3 per hour, 10 per day |
| Plan validity | execute within about 60 s |
| Online confirm link | 2 minutes |
| Name | ≤ 32 bytes after NFKC |
| Ticker | A–Z0–9, ≤ 13 characters |
| Image | PNG / JPEG / GIF / WEBP, ≤ 4 MB |
| Metadata URI | ≤ 200 characters |
| Agents per owner wallet | 5 |
