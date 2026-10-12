---
name: creator-fees-and-harvest
description: Checks and collects the creator fees a Claudia launch earns, split 70% creator / 30% platform on Solana (pump.fun fee sharing) and Robinhood Chain (beta, one FeeSplitter per launch). Covers claudia fees and claudia harvest, the SDK's launchesBy, launchFees, harvestPlan, evm.fees, evm.harvest and readFeeSplitter, the get_launch_fees MCP tool, the collector and keeper bots that pay out without anyone claiming, when a manual harvest is worth its network fee or gas, and a fee ledger. Use when someone asks "how much have my coins earned", "how do I claim creator fees", "what is the FeeSplitter", wants to harvest now, or needs fee records for their books. Every harvest is dry-run first and sent only after a person says yes. Not financial or tax advice.
license: MIT
metadata:
  title: "Creator fees and harvest"
  category: "build"
  summary: "Read what your launches earned, harvest only when it is worth the fee, and keep a clean 70/30 fee ledger on Solana and Robinhood Chain."
  level: "intermediate"
  tags: "creator fees, harvest, feesplitter, 70/30, solana, robinhood chain, pump.fun, launches, ledger, onchain"
  uses: "@useclaudia/cli, @useclaudia/sdk, @useclaudia/mcp"
  time: "20 min"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Creator fees and harvest

Every coin launched through Claudia pays a creator fee on its trades, and that fee is split 70% to the creator and
30% to the platform, set in the launch itself. This skill finds a person's launches, reads what each has earned,
decides whether a manual harvest is worth its network fee or gas, runs it as a dry run first, and records every
reading and payout in a ledger the person can hand to whoever does their books.

## When to use this

- "How much have my coins earned?", "where are my creator fees?", "how do I claim?".
- Someone wants their fees now instead of waiting for the bots that pay out on a schedule.
- Checking that a Robinhood Chain launch's FeeSplitter really splits 70/30 and who it pays.
- Month-end or year-end: building a record of fee income for the person's accountant.

Not for: launching a coin (that is [launch-a-coin](../launch-a-coin/SKILL.md), which also explains the Solana
fee-sharing instructions signed at launch) or trading the coin ([safe-trading](../safe-trading/SKILL.md)).

## What you need

| Task | Needs |
|---|---|
| List launches, read fees | Nothing for `claudia fees <launch id>`, `launchFees` or `get_launch_fees`. `claudia fees` with no id needs a wallet on this machine (`claudia init`, or `claudia wallet evm create`) so it knows whose launches to list |
| Harvest on Solana | The CLI agent setup (`claudia init`, `claudia login ck_live_…`); the agent wallet signs and pays the network fee |
| Harvest on Robinhood Chain (beta) | An EVM wallet (`claudia wallet evm create`) with a little ETH for gas, and `viem` installed next to the CLI (`npm i -g viem`) |
| SDK reads and harvests | `npm i @useclaudia/sdk` (plus `viem` for `@useclaudia/sdk/evm`); your own confirm step, because the SDK has no caps or prompts |
| Records | [templates/fee-ledger.csv](templates/fee-ledger.csv) and somewhere private to keep it |

## How the split works (say this plainly)

- **The rule:** `FEE_SPLIT = { creatorBps: 7000, platformBps: 3000 }` on every chain. It is set at launch and can't be
  edited afterwards from Claudia.
- **Solana:** the launch transaction sets the coin's pump.fun fee-sharing list to creator 7000 / platform 3000 bps and
  locks it. A collector bot pushes accrued fees out to both wallets on a schedule. Nobody has to claim.
- **Robinhood Chain (beta):** each launch gets its own FeeSplitter clone from the FeeSplitterFactory
  (`0xe682a076cBa3d36943Bc2608D225AF8690Fc54Ba`, chain 4663). It splits everything it receives 70/30 and has no setter
  for the percentages. Clanker launches use Clanker's own fixed reward recipients (70/30) instead. A keeper bot
  harvests and pays out, gas included. If a payment fails, it waits in the splitter and the creator withdraws it.
- **Caveats to repeat every time:** Robinhood Chain support is beta, the splitter contracts haven't had an external
  audit yet, and on some launchpads the launchpad's own team can redirect creator fees (table on
  [useclaudia.xyz/docs/robinhood](https://useclaudia.xyz/docs/robinhood)). Fees depend on trading volume; most coins
  earn little.

Per-chain detail, contract addresses and what each reading means:
[references/fee-mechanics-by-chain.md](references/fee-mechanics-by-chain.md). Read it before you explain a reading
to the person or answer "why is my fee zero?".

## Steps

1. **Find the launch ids.** Every fee and harvest call takes a launch id, not a mint.

   ```sh
   claudia fees                    # your launches from the Solana and EVM wallets on this machine
   claudia fees --chain hood       # only the EVM wallet's launches
   claudia fees --json             # { creators, launches: [{ id, chain, launchpad, symbol, status, token, … }] }
   ```

   SDK: `await client.launchesBy([solAddress, evmAddress])` (up to 8 creator addresses). The id is also printed at
   launch time. Launch ids are 8–64 letters, digits, `-` or `_`.

2. **Read what one launch has earned.** Public reads, nothing signed:

   ```sh
   claudia fees <launch id>        # What · Earned · Your 70% · Note
   ```

   - SDK: `const f = await client.launchFees(id)` returns `{ items: [{ label, amount, symbol, creatorShare?, note? }], at }`.
     On Robinhood Chain `await evm.fees(id)` gives the same reading.
   - MCP: `get_launch_fees { "launch_id": "<launch id>" }` (Online Data or the local server).
   - On-chain check for a Robinhood launch: `await readFeeSplitter("<splitter 0x…>")` from `@useclaudia/sdk/evm`
     returns `creator`, `platform`, `creatorBps`, `platformBps`, `distributableNative` and `distributableTokens`.
     `creatorBps` should read `7000`. If it doesn't, stop and tell the person.

   Report the reading with its `at` time and units (SOL or ETH), and log it (step 7).

3. **Decide whether to harvest at all.** The bots already pay out, so a manual harvest only buys timing. Use
   [templates/harvest-decision.md](templates/harvest-decision.md): compare the creator share waiting against the
   network fee (Solana) or gas (Robinhood Chain) the harvest costs. If the fee would eat a large part of the amount,
   say so and recommend waiting. A harvest is never urgent.

4. **Dry run the harvest.**

   ```sh
   claudia harvest <launch id> --dry-run
   ```

   It prints the plan's notes and transaction count. On Solana it builds and signs locally to check the transaction;
   on Robinhood Chain it builds and checks without signing. Nothing is sent. "Nothing to collect right now." means
   there is no harvest to run; stop there.

   SDK: `const plan = await client.harvestPlan(id)` returns `{ txs, notes }` (unsigned; `harvestPlan` is never retried
   automatically). Show `notes` and `txs.length` to the person.

5. **Ask, then send.** Show the person [templates/harvest-confirmation.md](templates/harvest-confirmation.md): launch,
   chain, amount waiting, the signer wallet, the fee or gas it pays, and that Robinhood Chain is beta and unaudited.
   Only after an explicit yes:

   ```sh
   claudia harvest <launch id>     # shows the summary, then asks: "Send 1 transaction(s) to …?" → the person types y
   ```

   - Solana: the agent wallet signs one transaction that pays every shareholder pro rata, and pays the network fee.
   - Robinhood Chain: the EVM wallet sends the transactions in order and pays the gas; the result is split 70/30
     on-chain. The CLI refuses a plan that mixes Solana and EVM transactions (`mixed_chains`).
   - The agent never adds `--yes` on its own. Without a terminal or with `--json`, the command exits 3 with
     `confirmation_required` unless the person passed `--yes`.
   - SDK on Robinhood Chain: `const { hashes } = await evm.harvest(id)` after your own confirm step. On Solana:
     `signTransactions(plan, wallet)` then `sendAndConfirm(signed, rpcUrl)`, also behind your own confirm.

6. **Verify it landed.** The CLI prints the explorer links (Solscan for Solana, Blockscout for Robinhood Chain). Run
   `claudia fees <launch id>` again; the waiting amount should drop. On Robinhood Chain, read the splitter again with
   `readFeeSplitter`. If a send failed with `not_confirmed` or `confirm_timeout`, look the hash up on the explorer
   before you try again, so nothing is sent twice.

7. **Record it.** One row per fee reading and one per harvest in [templates/fee-ledger.csv](templates/fee-ledger.csv):
   date (UTC), chain, launch id, coin, kind (`reading` · `harvest` · `bot_payout`), creator amount, native price in USD
   at that time and where it came from, fee or gas paid, transaction link. Bot payouts show up as incoming transfers
   in the creator wallet; record them from the explorer the same way. Keep the ledger private.

8. **Automate the reading, not the sending.** A scheduled read keeps the ledger current without moving money:

   ```sh
   node scripts/fees-snapshot.mjs <launch id> [<launch id> …]          # CSV rows to stdout
   node scripts/fees-snapshot.mjs <launch id> >> fees-$(date -u +%Y).csv
   ```

   The script makes public reads only (`launchFees`), one id at a time, and never signs. Harvests stay manual and
   confirmed. For watchers and schedulers see [alerts-and-watchers](../alerts-and-watchers/SKILL.md) and
   [automation-and-webhooks](../automation-and-webhooks/SKILL.md).

A full session on both chains, with a harvest the agent advised against:
[examples/two-chain-fee-check.md](examples/two-chain-fee-check.md).

## Templates

- [templates/fee-ledger.csv](templates/fee-ledger.csv) — readings, harvests and bot payouts in one sheet.
- [templates/harvest-decision.md](templates/harvest-decision.md) — is a manual harvest worth its fee right now?
- [templates/harvest-confirmation.md](templates/harvest-confirmation.md) — what the person sees before saying yes.

Chat reply for a fee check:

```text
Fees · $<TICKER> · launch <id> · <chain> · read <HH:MM> UTC
Earned: <amount> <SOL|ETH> · your 70%: <creatorShare> <SOL|ETH>
<note from the reading, if any>
Payouts run on their own (collector / keeper bot). A manual harvest now would cost about <fee> <SOL|ETH>.
<Robinhood Chain: beta, splitter contracts not externally audited yet.>
Not financial or tax advice.
```

## Check before you finish

- [ ] Every number came from a call in this session, with its time and unit (SOL or ETH, never mixed).
- [ ] The person heard the 70/30 rule, that bots pay out on their own, and (Robinhood Chain) the beta and audit caveat.
- [ ] Any harvest was dry-run first, shown with its fee or gas, and sent only after the person's own yes.
- [ ] Explorer links were reported, and a failed send was looked up before any retry.
- [ ] The ledger has a row for each reading and harvest, with the USD price source.
- [ ] Nothing in the reply promises future fees or income, and nothing calls fees a return on the coin.

## Pitfalls

- **Harvesting dust.** A harvest that costs more than a large share of what it moves is a loss. Let the bots do it.
- **Harvest loops.** Never put `claudia harvest --yes` in a cron job. Read on a schedule; send by hand.
- **Mint instead of launch id.** `claudia fees <mint>` fails the id check. List launches first.
- **Expecting a "claim" button for Solana.** The locked fee-sharing list pays both wallets; the person's share
  arrives in the creator wallet (for an external agent, the agent's own wallet).
- **Forgetting who the creator is.** Robinhood launches use the `0x` wallet that launched as creator; the Solana agent
  route uses the agent wallet. Fees go to that wallet, not to the owner's main wallet.
- **Treating `creatorShare` as income already received.** It is accrued, not paid. Record payouts when they land.
- **Tax shortcuts.** Fee income and later sales may both be taxable where the person lives. Point them to a qualified
  tax professional ([portfolio-and-pnl-tracking](../portfolio-and-pnl-tracking/SKILL.md) has the record-keeping side).

## Related skills

- [launch-a-coin](../launch-a-coin/SKILL.md) — the launch that sets the split, and the Solana payout mechanics.
- [portfolio-and-pnl-tracking](../portfolio-and-pnl-tracking/SKILL.md) — fee income inside the full P&L ledger.
- [wallet-and-key-security](../wallet-and-key-security/SKILL.md) — the creator wallet that receives the 70%.
- [alerts-and-watchers](../alerts-and-watchers/SKILL.md) — a scheduled fee snapshot with a notification.
- [cli-power-user](../cli-power-user/SKILL.md) — `--json`, exit codes and scripting `claudia fees`.
- [monetization-streams](../../grow/monetization-streams/SKILL.md) — where creator fees fit among other income.
