# How the scores are built

Read this before you explain a score to a person, or when two scores seem to contradict each other (a coin can have
a good safety score and a risky chart score at the same time: they measure different things). All scores are 0–100
with a `grade` (`good` · `mixed` · `risky` · `unknown`), a `title`, a one-line `summary` and `reasons[]`, each
`{ label, points, field }`. Ported from GMGN's published analysis skills into the Claudia server (checked 2026-10).

## Safety (`scores.safety`)

Three weighted sections: contract 0.45, holders 0.35, price action 0.20, capped by GMGN's own rug label when it has
one. Each deduction names the field it read. A missing field never counts as a pass; it lowers `confidence`
(`sufficient` · `low` · `insufficient`).

| Value | Grade | Title |
|---|---|---|
| ≥ 80 | good | No red flags found |
| 60–79 | mixed | Some concerns |
| 40–59 | risky | Serious concerns |
| < 40 | risky | Major red flags (or "Can't sell" on a hard stop such as a honeypot) |
| any, confidence insufficient | unknown | Too little data |

Typical deductions: creator launched a very large number of coins, logo shared with other coins, bundler / bot /
trap-wallet shares among analysed traders, down a lot from the recent high, fewer than 24 candles.

## Holders (`scores.holders` + `breakdown`)

Reads the top 100 holders. All shares are of the **tradeable float** (supply minus burned minus DEX-held), not of
total supply.

| Rating | Band | Triggered by |
|---|---|---|
| Normal | 80–100 (good) | none of the flags below |
| Light | 60–79 (mixed) | exactly one caution flag |
| Caution | 40–59 (mixed) | two or more caution flags |
| Not recommended | 0–39 (risky) | any of: rat traders > 5%, largest wallet > 10%, dev's tokens routed to a top-100 wallet |
| Cannot assess | unknown | tradeable float < 2%, or no holders yet |

Caution flags: dev still holds > 1%; airdropped (zero-cost) wallets > 20%; risk-tagged wallets > 35%; linked wallets
(same funder within minutes) > 15%; the contract holds > 10% of itself. "Wallets with no gas left" (zero SOL)
holding a large share is also called out.

## Chart (`scores.chart` + `pattern`)

A candle-pattern read over recent bars: trend over 20 bars, short vs long moving average, distance from the range
high, volume trend, candle range. `pattern` names it (for example "Slow bleed"). Fewer than ~24 candles → unknown.
A chart score describes what happened; it says nothing about what happens next.

## Dev (`dev.conduct`, `dev.power`, `dev.total`)

- **conduct**: will this dev dump on holders? Past sells, how fast, how much they pulled out versus put in.
- **power**: has this dev ever built anything that lasted? Graduations, peak market caps, live coins.
- **total**: the combination. Bands used by the server: ≥ 75 strong, 50–74 mixed, 30–49 weak, < 30 worst; system /
  launcher-bot wallets are always risky.
- `unknown` titles such as "Bad peak data" (GMGN reported an impossible peak) or "No history" mean the score was
  withheld. Say exactly that.

## Talking about scores

Say: "Safety 81 (good): no red flags found; the biggest deduction is the creator's 171,280 earlier launches."
Don't say: "Safety is good, so it's safe to buy." Scores describe the data at `updatedAt`. They can change within
minutes on a young coin, and none of them is a recommendation.
