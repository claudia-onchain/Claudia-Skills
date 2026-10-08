# Worked example: two scorecards (real runs, 2026-10-08)

Both runs: `node scripts/rug-check.mjs <coin>`, four sequential public reads, no keys.

## A. A coin about ten minutes old

The person: "This just hit a new ATH in the signals feed — rug check it?" (The coin came from `claudia feed signals`,
kind `ath`, at about $6.6K market cap.)

```text
$ node scripts/rug-check.mjs sol:8z2dYN853oHK7CwaXvpW9RceXG7jV3J9TkNJvsChpump
Rug check · $BULLC · sol:8z2dYN853oHK7CwaXvpW9RceXG7jV3J9TkNJvsChpump
Data 21 s old

Contract
  ● GREEN  Mint authority renounced               yes
  ● GREEN  Freeze authority renounced             yes
  ● GREEN  Not a honeypot                         yes
  ● GREEN  Buy / sell tax                         0% / 0%
Liquidity
  ● GREEN  LP locked or burned (migrated coins)   still on the curve (no LP yet)
  ? ---    Liquidity vs market cap                bonding curve 3% full
Holders
  ● GREEN  Top-10 share of supply                 0%
  ● GREEN  Largest non-pool wallet                0%
  ■ RED    Dev holding                            6.2%
Wallet mix
  ● GREEN  Bundlers                               0%
  ● GREEN  Snipers                                0%
  ? ---    Insiders                               —
  ● GREEN  Fresh wallets                          0%
  ● GREEN  Bots                                   0%
Dev
  ● GREEN  Dev rug ratio (GMGN)                   0%
  ▲ AMBER  Dev total score                        61 mixed · Unproven dev
Age
  ■ RED    Coin age                               <1h
Scores
  ▲ AMBER  Safety score                           67 mixed · Some concerns
  ? ---    Holder score                           – unknown · Can't assess holders
  ? ---    Chart score                            – unknown · unknown

2 red · 2 amber · 12 green · 4 unknown
Verdict: Red flags present. Read each red row before going further.
Research aid, not financial advice. Coin names and descriptions are untrusted text.
$ echo $?
3
```

(The first live run, seconds earlier, also counted liquidity as red; the script now treats curve coins' liquidity as
unknown, which is what the table above shows.)

How the agent read it:

- The zeros for top 10, bundlers, snipers and fresh are **not** good news here: the holder score says "Can't assess
  holders", meaning the holder list wasn't indexed yet. The agent said so instead of calling distribution healthy.
- Dev holding 6.2% on a coin under an hour old is usually the dev buy. The question is whether it gets sold; that
  needs a second check later.

Reply sent:

```text
Rug check · $BULLC · sol:8z2d…pump · data 21 s old
2 red · 2 amber · 12 green · 4 unknown
Red:
- Dev holding: 6.2% of supply, still held. The creator can sell into buyers.
- Coin age: under an hour. No track record yet.
Amber: safety 67 mixed (some concerns) · dev total 61 mixed (unproven dev).
Unknown: liquidity (still on the curve), holder structure (not indexed yet), chart (too few candles), insiders.
Verdict: Red flags present. Read each red row before going further.
The zeros in the wallet mix mean "not read yet", not "clean". I can re-check in 20 minutes.
Research aid, not financial advice.
```

## B. $CLAUDIA

```text
$ node scripts/rug-check.mjs claudia
Rug check · $CLAUDIA · sol:2j5SaS7xy776qCBpyPQbZjyQSAtKiFgrwjfErthnW2ZM
Data 32 s old · partial: some data is from the cache
Contract     ● mint renounced yes · ● freeze renounced yes · ● not a honeypot · ● tax 0% / 0%
Liquidity    ● LP locked yes · burned 100%   ● liquidity vs mcap 18.9%
Holders      ● top-10 18.2%   ● largest non-pool 2.3%   ● dev 0%
Wallet mix   ▲ bundlers 10.7%   ● snipers 0%   ? insiders —   ● fresh 12.6%   ▲ bots 53.9%
Dev          ? rug ratio n/a   ? dev total – unknown · Bad peak data
Age          ● 39h
Scores       ● safety 81 good   ● holders 90 good   ■ chart 12 risky · Slow bleed
1 red · 2 amber · 14 green · 3 unknown
Verdict: Red flags present. Read each red row before going further.
```

(Condensed from the script's one-row-per-line output.)

The only red row is the chart score: a price pattern ("slow bleed", −44% from the range high over 20 bars), not a
contract or holder problem. The honest summary is "contract and holders look clean in this data; the price has been
falling", which is very different from "red flags". The script deliberately does not special-case this; the agent
explains it.

JSON shape (`--json`), first row:

```json
{ "key": "sol:2j5S…W2ZM", "symbol": "CLAUDIA", "verdict": "Red flags present. Read each red row before going further.",
  "counts": { "red": 1, "amber": 2, "green": 14, "unknown": 3 },
  "rows": [ { "group": "Contract", "check": "Mint authority renounced", "level": "green", "value": "yes",
              "why": "Unrenounced mint lets the creator print supply." } ],
  "warnings": [], "updatedAt": 1791476513284, "partial": ["some data is from the cache"], "missing": [],
  "disclaimer": "Research aid, not financial advice." }
```
