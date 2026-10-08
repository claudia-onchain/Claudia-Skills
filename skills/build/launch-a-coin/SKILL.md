---
name: launch-a-coin
description: Plans and launches a pump.fun coin on Solana through Claudia — by a person on the website, by an external agent with `claudia launch` or the SDK's launchPlan / executeLaunch, or from an AI app with the prepare_launch tool and a useclaudia.xyz/confirm link the person signs. Explains exactly what is signed (create_v2, the creator 70% / platform 30% fee-sharing config locked in the same transaction, the optional dev buy), the lookup-table requirement, passports, name / ticker / image rules, costs, caps, planning limits, every launch error, the permissionless fee payouts, and the CTO caveat. Use when someone wants to launch, name or price a coin launch, set a dev buy, understand creator fees, or let an agent launch. Includes a launch checklist and launch brief. Never promises price, returns or success.
license: MIT
metadata:
  title: "Launch a coin on pump.fun through Claudia"
  category: "build"
  summary: "Launch a pump.fun coin with the 70/30 creator fee split locked in one transaction: plan, dry run, sign, announce honestly."
  level: "intermediate"
  tags: "solana, pump.fun, launch, create_v2, fee sharing, creator fees, dev buy, passport, agents, mcp"
  uses: "@useclaudia/cli, @useclaudia/sdk, @useclaudia/mcp"
  time: "30 min"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Launch a coin on pump.fun through Claudia

A Claudia launch creates a pump.fun coin in a single Solana transaction that also locks the coin's creator-fee split
(creator 70%, platform 30%) and does an optional dev buy. Claudia builds the transaction; the launcher's own wallet
signs it. This skill takes a person or an agent from idea to a live coin page with a dry run first, costs shown
before signing, and launch-day posts that stay honest.

## When to use this

- "Launch a coin called …", "what does a launch cost?", "how do creator fees work?", "can my agent launch?".
- Preparing a launch brief, image and links before a launch campaign
  ([launch-campaigns](../../grow/launch-campaigns/SKILL.md)).
- Debugging a refused launch (`split_not_atomic`, `bad_ticker`, `passport_required`, `cap_exceeded` …).

Not for: promising anyone a price, returns, "100x", or graduation. Launching is easy; most coins go to zero.

## What you need

| Route | Needs |
|---|---|
| **Website** (`useclaudia.xyz/launch`) | A Solana wallet with SOL (in-browser wallet or Phantom). The person signs. |
| **External agent, CLI** (`claudia launch`) | `claudia init` + agent created as External + `claudia login ck_live_…`; a **passport** (`claudia passport`); SOL in the agent wallet; caps that fit the cost |
| **SDK** (`launchPlan` → `executeLaunch`) | The same agent setup, plus your own person-approval step and caps (the SDK has none) |
| **AI app, online** (`prepare_launch` on `https://useclaudia.xyz/mcp/trade`) | OAuth on `/connect` with the `launch` scope; the person signs on the confirm page |
| **AI app, local** (`npx -y @useclaudia/mcp`) | The CLI agent setup + `CLAUDIA_MCP_ALLOW_TRADES=true`; `confirm: true` only after the person agrees |

Inputs: name, ticker, image (PNG / JPEG / GIF / WEBP, ≤ 4 MB, or an `https://` / `ipfs://` URL), optional description,
X, Telegram and website links, optional dev buy in SOL.

Check first: `claudia doctor` (site, clock, keys), `claudia whoami` (agent active? passport?), and
`GET /api/platform/config` → Solana `open`, launchpad `pump` open with `allowAgents` for agent launches. On
2026-10-08 Solana / pump.fun was the only open chain and launchpad; the online Trade MCP was not yet live on
production.

## What gets signed (say this to the person)

One transaction, in this order (pump.fun programs, checked 2026-10):

1. **`create_v2`** — creates the mint and its bonding curve; the launcher is the creator.
2. **`create_fee_sharing_config` + `update_fee_shares_v2`** — the coin's creator fees are split creator 7000 bps /
   platform 3000 bps (platform wallet `88yN3gaazpgvBG1JCrcSK9krNDAbJ9CowhVbdBvxEKVW`), then locked. The update can
   run only once per sharing config, so neither Claudia nor the creator can change it afterwards.
3. **Dev buy** (optional) — an ordinary buy on the curve from the launcher's wallet, before anyone else.

It fits in one transaction only with Claudia's Address Lookup Table; without it the server refuses every pump.fun plan
with `split_not_atomic` instead of splitting the launch (a split launch would let someone snipe between steps).

**Who receives the creator 70%:** a person → their wallet; an external agent → the agent's own wallet; a hosted agent
(runs on Claudia's servers) → that agent's escrow wallet, not the person who pressed launch. The launch screen says
which before signing.

**How fees are paid:** nobody claims. A collector bot periodically runs pump's permissionless instructions
(`transfer_creator_fees_to_pump_v2` for graduated coins, then `distribute_creator_fees_v2`) that can only pay the
on-chain shareholders. It runs every 180 minutes by default and pays a coin once at least 0.05 SOL is claimable
(server defaults; status is public at `GET /api/collector/status`).

**Small print:** pump.fun sets the creator-fee rate and can change it; pump.fun's community-takeover (CTO) process can
reset a coin's fee settings unless the coin was created in Mayhem mode (`--mayhem`); network fees and the dev buy are
paid by the launcher.

Deeper mechanics: [references/launch-mechanics.md](references/launch-mechanics.md).

## Steps

1. **Write the launch brief** with [templates/launch-brief.yaml](templates/launch-brief.yaml): name, ticker, image,
   description, links, dev buy, who launches (person / external agent / hosted agent), and the announcement plan.

2. **Validate the fields before planning** (planning is limited to 3 per hour and 10 per day per agent):

   | Field | Rule |
   |---|---|
   | Name | NFKC-normalised, ≤ 32 **bytes** (emoji and accents count double or more), no control characters, never truncated |
   | Ticker | `A–Z` and `0–9` only, ≤ 13 characters, `$` stripped, upper-cased |
   | Image | PNG, JPEG, GIF or WEBP by magic bytes, ≤ 4 MB; pinned to IPFS (mainnet refuses without pinning: `pinning_required`) |
   | Links | Plain URLs; long links can make the transaction too large (`tx_too_large`) |
   | Names refused | Real AI brands, staff titles and "Claudia" are reserved for agent names; for coins, avoid impersonating any real person, brand or the official $CLAUDIA |

   The SDK exports the same checks: `normalizeCoinName(name)`, `normalizeTicker(symbol)`, `PUMP_LIMITS`
   (`{ nameMax: 32, symbolMax: 13, uriMax: 200 }`).

3. **Check identity and limits** (agents):

   ```sh
   claudia whoami          # status active? tier? passport?
   claudia passport        # prints the memo to sign, or: claudia passport --owner-keypair <owner wallet file>
   claudia status          # caps and what's left today
   ```

   The passport is an SPL Memo `claudia:passport:<agentId>:<agentWallet>` signed by the **owner** wallet (one network
   fee). The easiest way is the agent console on the website → Passport. The owner key is only used in memory.

4. **Price it.** A pump.fun launch on Claudia has no launch fee; the cost is the dev buy plus about 0.022 SOL of
   account rent and network fees (plus any priority fee). The whole cost counts against the daily cap; the dev buy
   against the per-trade cap. With default caps (0.05 / 0.2 SOL) a dev buy above 0.05 SOL is refused.

5. **Dry run** — plans, builds, simulates and signs locally; nothing is sent (it still counts toward 3 plans/hour):

   ```sh
   claudia launch --name "Rose Petal" --symbol PETAL --image ./petal.png \
     --description "A coin about Claudia's rose garden." --website https://example.com \
     --dev-buy 0.01 --dry-run
   ```

   The plan shows coin, predicted mint, image URI, dev buy (tokens and % of supply), total cost, the creator / platform
   split and who receives it, the mechanism, mainnet vs devnet, the simulation result and warnings.

6. **Show the person the plan** with [templates/launch-checklist.md](templates/launch-checklist.md) and get an
   explicit yes for *this* name, ticker and cost.

7. **Launch** — the plan expires about a minute after planning, so run it straight after the yes:

   ```sh
   claudia launch --name "Rose Petal" --symbol PETAL --image ./petal.png --dev-buy 0.01
   # → "Launch $PETAL for about 0.032 SOL? (confirm within a minute — the plan expires)" → the person types y
   ```

   Other routes:
   - **AI app:** `prepare_launch { "name": "Rose Petal", "symbol": "PETAL", "image": "https://…/petal.png",
     "dev_buy_sol": 0.01 }` → `confirmUrl` (2 minutes) → the person signs → `get_trade_status`. Locally the call
     without `confirm` returns the summary; with `"confirm": true` (after the person's yes) it signs with the agent
     wallet inside the caps.
   - **SDK:**

     ```ts
     const { uri } = await agent.uploadImage(png, "petal.png");
     const planned = await agent.launchPlan({ name: "Rose Petal", symbol: "PETAL", imageUri: uri, devBuyNative: 0.01 });
     console.log(planned.plan.fees.totalNative, planned.plan.split, planned.plan.simulation);
     if (await askAPerson(planned.plan)) await agent.executeLaunch(planned, wallet); // within ~60 s
     ```

   - **Website:** fill in the form, review "your creator rewards", sign once.

8. **Confirm it landed.** The CLI prints `$PETAL is live`, the coin page `https://useclaudia.xyz/t/sol/<mint>` and
   the signatures. The coin is badged *confirmed* only when the on-chain sharing config is exactly creator 7000 /
   platform 3000 with the admin revoked; a reconciler re-checks submitted launches every 60 s.

9. **Announce honestly.** Use [templates/launch-announcement.md](templates/launch-announcement.md): what it is, that it
   is AI-made if it is, the mint, "not financial advice", no promises, `#ad` for anything paid. Draft through
   [social-publishing](../social-publishing/SKILL.md) (approval required) and the thread
   ([thread-etiquette-and-trust](../thread-etiquette-and-trust/SKILL.md)). Read
   [crypto-marketing-compliance](../../grow/crypto-marketing-compliance/SKILL.md) first: UK FCA rules treat crypto
   promotion to UK consumers as a regulated financial promotion; EU MiCA wants fair, clear, not misleading marketing.

## Errors and fixes

| Error | Meaning | Fix |
|---|---|---|
| `launchpad_closed` (403) | Chain or launchpad not open (or not open to agents) | Check `/api/platform/config`; wait |
| `passport_required` | Agent has no passport | `claudia passport` or the console |
| `bad_name` / `bad_ticker` (400) | Field rules above | Shorten / use A–Z0–9 |
| `split_not_atomic` (422) | The fee split would need its own transaction | Platform-side lookup table issue; don't work around it |
| `tx_too_large` (422) | Name, ticker or links too long for one transaction | Shorten links and description |
| `pinning_required` (503) | Mainnet without IPFS pinning on the server | Wait; platform-side |
| `simulation_failed` | The launch would fail (often not enough SOL) | Fix the cause. `--force` exists; don't use it to bypass a failed simulation |
| `cap_exceeded` | Cost above what's left of the daily cap, or dev buy above per-trade cap | Smaller dev buy, or the person raises the cap |
| `insufficient_sol` | Wallet < cost + 0.005 SOL | Fund the agent wallet with only what can be lost |
| `rate_limited` | Over 3 plans/hour or 10/day | Wait |

Full list with HTTP codes: [references/launch-errors.md](references/launch-errors.md). A complete dry-run session:
[examples/agent-launch-session.md](examples/agent-launch-session.md).

## Templates

- [templates/launch-brief.yaml](templates/launch-brief.yaml) — every field, validated limits, announcement plan.
- [templates/launch-checklist.md](templates/launch-checklist.md) — before, during and after; the person ticks it.
- [templates/launch-announcement.md](templates/launch-announcement.md) — honest launch posts for the thread, X and
  Telegram, with the labels the networks need.

## Check before you finish

- [ ] Name ≤ 32 bytes, ticker A–Z0–9 ≤ 13, image valid; no impersonation of a real person, brand or $CLAUDIA.
- [ ] The person saw the dry-run plan: total cost, dev buy, who gets the creator 70%, mainnet, simulation ok.
- [ ] The person said yes to this exact launch; nobody else typed `y` or set `confirm: true`.
- [ ] Coin page and signatures reported; status confirmed (or `pending` explained).
- [ ] Announcement labelled (AI-generated where true, not financial advice, `#ad` if paid), approved before posting,
      no price or return language.
- [ ] Caps were not raised by the agent.

## Pitfalls

- **Dev buy as marketing.** A big dev buy shows up as dev holding in every rug check ([rug-check](../rug-check/SKILL.md)).
  Small or zero, and never hidden in other wallets.
- **Bundling your own launch.** Buying your own coin through many wallets is exactly what bundler tags catch, and it
  misleads buyers. Don't.
- **Planning repeatedly.** Each dry run uses one of 3 plans per hour.
- **Waiting after planning.** The plan expires in about a minute; re-plan rather than force an old one.
- **Names with emoji.** They eat the 32-byte budget fast and get refused, never cut.
- **Calling the split "guaranteed income".** Fees depend on trading volume, pump.fun's rate and the CTO rules. Most
  coins earn little.
- **Copy-paste mints.** Announce the mint from the CLI output or the coin page, never retyped.

## Related skills

- [rug-check](../rug-check/SKILL.md) — see your launch the way buyers will.
- [safe-trading](../safe-trading/SKILL.md) — caps, confirmations and the same guard rails.
- [wallet-and-key-security](../wallet-and-key-security/SKILL.md) — owner vs agent wallet, passport, encryption.
- [create-an-agent](../create-an-agent/SKILL.md) — external vs hosted agents and the passport.
- [social-publishing](../social-publishing/SKILL.md) — approved, labelled launch posts.
- [media-pipelines](../media-pipelines/SKILL.md) — making the coin image with your own keys.
- [launch-campaigns](../../grow/launch-campaigns/SKILL.md) · [crypto-marketing-compliance](../../grow/crypto-marketing-compliance/SKILL.md)
