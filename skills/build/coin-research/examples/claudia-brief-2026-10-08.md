# Worked example: a brief for $CLAUDIA (real output, 2026-10-08)

The person asked: "Give me a quick read on $CLAUDIA — who holds it and does anything look off?"

## 1. Health check

```text
$ claudia doctor
  ✓ Site                  https://useclaudia.xyz · HTTP 200
  ✓ Insights              GMGN data on · cache hit rate 60% · queue 0
  ! MCP data              https://useclaudia.xyz/mcp/data · not live on this server yet
```

The online MCP server wasn't live, so the agent used the CLI (it could also run `npx -y @useclaudia/mcp --server data`).

## 2. One overview call

```text
$ claudia insights claudia
  claudia › $CLAUDIA · Claudia · 2j5Sa…nW2ZM
  Price    $0.0003287 · mcap $311K · liquidity $59.5K · ATH $0.001355
  Holders  2,660 · 8 KOL · 147 smart
  Age      2d · Pump.fun · migrated

  │ 1h     │ -27.4% │ $88.7K │   513 │   464 │  -$6,976 │
  │ 24h    │ -38.9% │  $1.3M │ 7,779 │ 8,103 │    -$16K │

  Top 10   18.2%      Dev      0%         Snipers  0%         Bundlers 10.7%
  Insiders —          Fresh    12.4%      Bots     53.8%

  Safety    ██████████░░  81  No red flags found
            -8.1  Creator has launched 171,280 tokens
            -3.5  12.3% of analysed traders are flagged as trap wallets
            -2.7  Logo is shared with 3 other tokens
            -2.1  53.8% of analysed traders are bots
  Holders   ███████████░  90  Healthy holders
              -5  Risk-tagged wallets hold 19.2% of the float
              -5  Wallets with no gas left hold 22.6% of the float
  Chart     █░░░░░░░░░░░  12  Slow bleed
             -15  Trending down over the last 20 bars, -43.7%
  Dev       ░░░░░░░░░░░░  –  Bad peak data

  Mint renounced ✓ yes · Freeze renounced ✓ yes · Honeypot ✓ no · LP locked ✓ yes · Burned 100%
  updated 15s ago · from GMGN · some data is from the cache
```

## 3. One holders call

```text
$ claudia holders claudia --limit 8
  │ 1 │ Fe7b…ohFr │ ≈ pool            │  9.9% │ $31.7K │
  │ 2 │ 49KB…DbTw │ ● whale           │  2.3% │ $7,406 │
  │ 3 │ 7Yxs…sgS4 │ ● whale ○ fresh   │  2.1% │ $6,751 │
  │ 7 │ BSsy…knLQ │ ≡ bundler ● whale │  1.8% │ $5,750 │
```

Rank 1 is the AMM pool (`pool`), not a holder. The largest real wallet holds 2.3%.

## 4. The brief the agent wrote

```text
$CLAUDIA (2j5S…W2ZM) · data ~15 s old, partly from the cache · 2026-10-08
Market: mcap $311K, liquidity $59.5K (19% of mcap), 2,660 holders, 2 days old, migrated to PumpSwap.
Flow: down 27% over 1h and 39% over 24h; sells slightly outnumber buys.
Wallet mix: top-10 18.2% of supply (largest non-pool wallet 2.3%), dev 0%, bundlers 10.7%, snipers 0%,
fresh 12.4%, bots 53.8%.
Scores: safety 81 good (biggest deduction: the creator wallet has launched 171,280 coins — a launcher address);
holders 90 good (risk-tagged wallets hold 19% of the float); chart 12 risky, "slow bleed" over 20 bars;
dev score withheld (GMGN peak data error).
Security: mint and freeze renounced, not a honeypot, LP locked, 100% burned, no tax.
Unknown: insider share, dev conduct score.
Research, not financial advice.
```

What made it a good answer: two reads, the pool excluded, both good and bad scores reported with reasons, the
withheld dev score called "unknown", the data age stated, no recommendation.

The same in one command: `node scripts/research-coin.mjs claudia` prints this structure as Markdown.
