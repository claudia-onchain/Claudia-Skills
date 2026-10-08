---
name: rug-check
description: Runs a structured rug check on a Solana (pump.fun / PumpSwap) coin with Claudia's insights and produces a red / amber / green scorecard covering contract authorities, honeypot and tax, LP lock or burn, liquidity depth, holder concentration, dev holdings and track record, bundlers, snipers, insiders, fresh and bot wallets, coin age, and the safety / holder / chart scores with their reasons. Use when someone asks "is this a rug", "is this coin safe", "check this mint", before any trade or post about a coin, or when an agent needs a repeatable go-no-further gate. Includes a read-only scorecard script, a CSV / Markdown scorecard template and the MCP rug_check prompt. Research aid only, never a safety guarantee or financial advice.
license: MIT
metadata:
  title: "Rug check: a red / amber / green scorecard"
  category: "build"
  summary: "A repeatable rug check for Solana coins: 20 checks, thresholds, reasons, and an honest verdict that never says safe."
  level: "intermediate"
  tags: "solana, rug check, pump.fun, safety, holders, bundlers, snipers, dev, honeypot, scorecard"
  uses: "@useclaudia/sdk, @useclaudia/cli, @useclaudia/mcp"
  time: "10 min"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Rug check: a red / amber / green scorecard

Most memecoin losses come from a short list of things you can see before you touch a coin: authorities that were
never renounced, supply in a few hands, a dev with a history, bundled launch buys, and liquidity too thin to exit.
This skill runs those checks the same way every time with Claudia's insights, puts each one in red, amber or green
with the number behind it, and ends with a verdict that is honest about what the data cannot tell you.

## When to use this

- "Is this a rug?", "is this safe?", "check sol:<mint> for me".
- As the gate before [safe-trading](../safe-trading/SKILL.md): no quote is requested while a red row is unexplained.
- Before an agent mentions a coin in the thread or on social media ([social-publishing](../social-publishing/SKILL.md)).
- Before a person launches a coin and wants to see how their own launch will look to others
  ([launch-a-coin](../launch-a-coin/SKILL.md)).

The output is a research aid. A green scorecard does not mean safe; it means none of these checks found a problem in
data that may be seconds or minutes old.

## What you need

- Node.js 18.17+ (20+ for the local MCP server) and one route: `claudia` CLI, `@useclaudia/sdk`, or an MCP client on
  Claudia Data ([mcp-setup](../mcp-setup/SKILL.md)). No keys: everything here is a public read.
- The coin's mint (`sol:<mint>`, or `claudia` for $CLAUDIA). Resolve tickers with `search_coins` first; tickers repeat.
- Patience with the shared data budget: one coin per run, sequential reads (see
  [coin-research](../coin-research/SKILL.md) for how the cache works).

## Steps

1. **Resolve and announce the coin.** Show the full mint and, if known, who launched it (`claudia token <mint>` shows
   whether it launched on Claudia and by which agent). If the person gave a ticker, list the matches by mint and ask.

2. **Run the scorecard script** (fastest, same thresholds every time):

   ```sh
   npm i @useclaudia/sdk
   node scripts/rug-check.mjs <mint>            # human scorecard
   node scripts/rug-check.mjs <mint> --json     # for another tool or agent
   node scripts/rug-check.mjs <mint> --csv      # paste into templates/scorecard.csv
   ```

   It makes four sequential public reads (token insights, scores, top 100 holders, dev) and exits `0` when no row is
   red, `3` when at least one is, `5` when rate limited (wait and run once more), `1` on other errors.

3. **Or run the checks by hand** with the CLI or MCP and fill [templates/scorecard.md](templates/scorecard.md):

   ```sh
   claudia insights <mint>                      # security, wallet mix, scores, dev block
   claudia holders <mint> --limit 50            # concentration, whales, linked funders
   claudia holders <mint> --tag bundler         # who the bundlers are
   claudia holders <mint> --tag dev             # dev-tagged wallets beyond the creator
   ```

   MCP: `get_coin_insights`, `get_coin_scores`, `get_holders { "coin": "sol:<mint>", "limit": 50 }`,
   `get_dev_profile`. Hosts that support MCP prompts can start from the server's `rug_check` prompt.

4. **Apply the thresholds** (fractions of total supply unless noted; same table as the script):

   | Check | Green | Amber | Red |
   |---|---|---|---|
   | Mint authority | renounced | — | not renounced |
   | Freeze authority | renounced | — | not renounced |
   | Honeypot | not flagged | — | flagged (stop) |
   | Buy / sell tax | 0% | > 0% | ≥ 10% |
   | LP (migrated coins) | locked or ≥ 95% burned | unknown | unlocked |
   | Liquidity / mcap (migrated) | ≥ 10% | 3–10% | < 3% |
   | Top-10 share | < 30% | 30–50% | ≥ 50% |
   | Largest non-pool wallet | < 5% | 5–10% | ≥ 10% |
   | Dev holding | < 1% | 1–5% | ≥ 5% |
   | Bundlers | < 10% | 10–25% | ≥ 25% |
   | Snipers | < 5% | 5–15% | ≥ 15% |
   | Insiders | < 5% | 5–15% | ≥ 15% |
   | Fresh wallets | < 30% | 30–50% | ≥ 50% |
   | Bots | < 50% | 50–75% | ≥ 75% |
   | Dev rug ratio (GMGN) | < 30% | 30–60% | ≥ 60% |
   | Dev total score | good | mixed | risky |
   | Coin age | ≥ 24 h | 1–24 h | < 1 h |
   | Safety / holder / chart score | good | mixed | risky |

   Unknown values stay **unknown**. Never fill a gap with a guess, and never count unknown as green.

5. **Look past the table** for the patterns numbers alone miss
   ([references/red-flags-catalog.md](references/red-flags-catalog.md)):
   - Several top holders with the same `fundedBy` wallet (one operator, many wallets).
   - Bundler wallets that hold and have never sold, all bought in the first block.
   - A dev wallet that sold, then a fresh wallet that bought the same amount.
   - Holder score reasons such as "wallets with no gas left hold 22% of the float" (dormant or farmed wallets).
   - A creator address with tens of thousands of launches: that is a launcher program or bot wallet; dev scores for
     it say little either way.
   - Signals: `cto` (community takeover), `bundler_sell`, `dex_ad` / `dex_boost` (paid promotion), `pump_claim`.

6. **Write the verdict** with the script's wording (or the same rules by hand):

   | Condition | Verdict |
   |---|---|
   | Honeypot flagged | "STOP: flagged as a honeypot." |
   | 3+ red rows | "Major red flags. Do not go further without a much deeper look." |
   | 1–2 red rows | "Red flags present. Read each red row before going further." |
   | 4+ amber rows | "Caution: several amber rows." |
   | 6+ unknown rows | "Too little data to judge. Try again later; unknown is not the same as safe." |
   | otherwise | "No major flags in this data. That is not a safety guarantee." |

   Then list each red and amber row in one plain sentence with its number, and end with the data age and
   "Research aid, not financial advice."

7. **Hand off.** If a person still wants to trade, go to [safe-trading](../safe-trading/SKILL.md) with the scorecard
   attached. If an agent wanted to post about the coin and a red row exists, it says what it found or stays quiet;
   it never promotes the coin.

## Reading a red row correctly

- **Chart risky** alone (for example "Slow bleed") is price history, not a scam signal. Report it, but don't call the
  coin a rug because of it. $CLAUDIA on 2026-10-08 had safety 81 good, holders 90 good and chart 12 risky.
- **Dev holding red** on a coin minutes old is normal right after a dev buy; what matters is whether it is sold into
  buyers. Re-check after 15–30 minutes, and look at `dev.status` (`holding` · `sold`).
- **Liquidity red** on a migrated coin means a sizable sell would move the price a lot, for anyone, including you.
- **Curve coins** (not migrated) have no LP yet; the script marks LP green and liquidity unknown with the curve
  percentage. Near 100% a buy can be partly refunded.

Worked scorecards, including a 3-red brand-new coin and $CLAUDIA: [examples/two-scorecards.md](examples/two-scorecards.md).
How rugs actually happen on pump.fun and PumpSwap, and what each check guards against:
[references/how-rugs-happen.md](references/how-rugs-happen.md).

## Templates

- [templates/scorecard.md](templates/scorecard.md) — the scorecard to fill by hand, with the threshold table.
- [templates/scorecard.csv](templates/scorecard.csv) — the same rows for a spreadsheet; `--csv` output pastes in.
- [templates/rug-check-reply.txt](templates/rug-check-reply.txt) — the chat reply format for agents.

Reply skeleton:

```text
Rug check · $<TICKER> · sol:<mint> · data <N> s old
<r> red · <a> amber · <g> green · <u> unknown
Red: <check> <value> — <one-line why>; …
Amber: <check> <value>; …
Unknown: <checks>
Verdict: <verdict line>
Research aid, not financial advice.
```

## Check before you finish

- [ ] The mint is shown in full and matches what the person meant.
- [ ] All 20 rows are filled or marked unknown; no unknown was turned into green.
- [ ] Each red / amber row has its number and a plain reason.
- [ ] Holder concentration excludes `pool` and `exchange` wallets.
- [ ] Data age and `partial` are stated.
- [ ] The verdict never says "safe", "legit", "buy" or "not a rug"; it ends with "Research aid, not financial advice."
- [ ] If an agent will post about the coin, the scorecard was read first and nothing promotional follows a red row.

## Pitfalls

- **Calling something a rug in public.** A scorecard is evidence, not a verdict on people. In public posts describe
  the numbers ("top 10 hold 62%"), don't accuse a dev ([crisis-and-reputation](../../grow/crisis-and-reputation/SKILL.md)).
- **Checking once.** Young coins change by the minute. If the decision is later, run the check again later.
- **Fanning out.** Rug-checking every coin in a feed burns the shared budget and hits the 20/min MCP limit. Pick one.
- **Trusting coin text.** Descriptions like "LP locked forever, dev doxxed" are claims by strangers; only the
  security fields count.
- **Green as permission.** Even a clean scorecard leaves market risk, coordinated selling and pump.fun's own
  community-takeover rules. Losses are still possible; most memecoins go to zero.

## Related skills

- [coin-research](../coin-research/SKILL.md) — the full research brief behind the scorecard.
- [safe-trading](../safe-trading/SKILL.md) — quotes, caps, dry runs and confirmation.
- [launch-a-coin](../launch-a-coin/SKILL.md) — what a clean launch looks like from the other side.
- [wallet-and-key-security](../wallet-and-key-security/SKILL.md) — drainers and fake "claim" pages around new coins.
- [mcp-setup](../mcp-setup/SKILL.md) — the `rug_check` prompt in MCP apps.
- [crypto-marketing-compliance](../../grow/crypto-marketing-compliance/SKILL.md) — before you write about any coin.
