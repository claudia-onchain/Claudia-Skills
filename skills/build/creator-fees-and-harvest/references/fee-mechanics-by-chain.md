# Fee mechanics by chain

Sources: `@useclaudia/sdk` 0.3.0, `@useclaudia/cli` 0.3.0 and `@useclaudia/mcp` 0.3.0 docs (checked 2026-10). Chain
status changes: run `claudia chains` or `get_chains` before you say a chain is open.

## The common rule

| Item | Value |
|---|---|
| Split | 70% creator, 30% platform: `FEE_SPLIT = { creatorBps: 7000, platformBps: 3000 }` |
| When it is set | In the launch itself. It can't be edited afterwards from Claudia |
| Who has to claim | Nobody. Bots pay out on a schedule; a manual harvest only changes the timing |
| Caps | Harvests don't count against the CLI / MCP spend caps (they spend a network fee or gas, and still ask for "y") |

## Solana (live)

- pump.fun charges a creator fee on every trade. pump.fun sets that rate, not Claudia.
- The launch transaction sets the coin's fee-sharing list to creator 7000 / platform 3000 bps and locks it.
- A collector bot pushes accrued fees out to both wallets on a schedule. The default schedule and payout threshold
  are described in [launch-a-coin](../../launch-a-coin/SKILL.md) under "How fees are paid".
- `claudia harvest <id>` on Solana: the CLI builds the plan with `harvestPlan`, signs it with the agent wallet and
  sends one transaction that distributes the creator fees to every shareholder pro rata. The agent wallet pays the
  network fee. `--dry-run` signs locally to check and sends nothing.
- `planned.plan.split.mechanism` (at launch) describes the mechanism in words.

## Robinhood Chain (beta, chain id 4663, native coin ETH)

| Contract | Address |
|---|---|
| FeeSplitterFactory | `0xe682a076cBa3d36943Bc2608D225AF8690Fc54Ba` |
| SocialVaultFactory | `0x89554B535B08330F1b3c502b07f11f7d198E35a7` |
| ShareSplitterFactory | `0x7f1889C3BfE83A79Bf5A9244Dd2D066f9A4815Eb` |
| Platform treasury | `0x8f50591D3C8C30A2c62437574e8843133Ba77FbC` |

The same values ship in `ROBINHOOD_CONTRACTS`. They are verified on Blockscout.

- Six launchpads: `pons` (Pons V2), `pools`, `flap`, `bags`, `clanker`, `dyor`. Each launch gets its own FeeSplitter
  clone, which splits everything it receives 70/30 and has no setter for the percentages.
- **Clanker** uses Clanker's own fixed reward recipients (70/30) instead of a FeeSplitter.
- A keeper bot harvests and pays out, gas included. Anyone may also send the `harvestPlan` transactions
  (`evm.harvest(id)` or `claudia harvest <id>`); the sender pays the gas.
- If a payment fails, it waits in the splitter and the creator withdraws it.
- **Caveats:** the splitter contracts haven't had an external audit yet, and on some launchpads the launchpad's own
  team can redirect creator fees ([table](https://useclaudia.xyz/docs/robinhood)). Fund the EVM wallet with only what
  you are willing to lose.

## BNB Chain (coming soon)

Same 70/30 rule, planned with the same splitter route. Nothing is deployed yet; calls refuse `bsc` with
`chain_coming_soon`.

## Reading the numbers

`launchFees(id)` / `claudia fees <id>` / `get_launch_fees` return `{ items, at }`. Each item:

| Field | Meaning |
|---|---|
| `label` | What was read, for example `"FeeSplitter balance"` |
| `amount` | Total earned and waiting, in `symbol` |
| `symbol` | `SOL` or `ETH` (or a token symbol when the splitter holds tokens) |
| `creatorShare` | The creator's 70% of `amount`, when it applies |
| `note` | Extra context from the server; quote it as-is |

`at` is the reading time (unix ms). Example reading from the SDK docs:
`[{ label: "FeeSplitter balance", amount: 0.0125, symbol: "ETH", creatorShare: 0.00875 }]`.

`readFeeSplitter(address, { chain?, rpcUrl?, tokens? })` reads the contract directly:
`{ creator, platform, creatorBps, platformBps, distributableNative, distributableTokens }`. `distributableNative` is a
`bigint` in wei: divide by `10n ** 18n` (or use viem's `formatEther`) before you show it. Pass `tokens` to read token
balances held by the splitter as well.

## Why a reading can be zero

- The bots paid out recently. Check incoming transfers to the creator wallet on the explorer.
- The coin has had little or no trading.
- The launch is still `pending` (check `status` in `claudia fees`).
- On a launchpad where the team can redirect fees, they may have. Check the table linked above.

## Errors you may see

| Error | Meaning | Next |
|---|---|---|
| `Launch ids are 8–64 letters, digits, - or _.` | Bad `get_launch_fees` input (often a mint) | `claudia fees` lists your ids |
| `no_wallet` (CLI, exit 4) | No wallet on this machine to look up launches for | `claudia init` or `claudia wallet evm create` |
| `no_evm_wallet` · `viem_missing` (exit 4) | Robinhood harvest without an EVM wallet or viem | `claudia wallet evm create` · `npm i -g viem` |
| `insufficient_eth` · `insufficient_sol` (exit 3) | Not enough for gas or the network fee | Fund the wallet with a small amount |
| `confirmation_required` (exit 3) | No terminal or `--json`, and no `--yes` | The person runs it in a terminal, or passes `--yes` themselves |
| `mixed_chains` | The plan mixed Solana and EVM transactions | Nothing was signed; report it |
| `not_confirmed` · `confirm_timeout` | No receipt in time | Look up the hash before any retry |
