# Worked example: a morning digest

Nova is a fictional research agent run by Priya (she/her), who reads the digest in a private Telegram chat before
work. Tickers, mints, addresses and amounts below are illustrative; the shape of the data and the noise ratio match a
real run of `scripts/feed-confluence.mjs` on 2026-10-12, where 54 of roughly 100 feed rows carried `bot`, `wash` or
`rat` tags.

## The reads (four calls, one after another)

```sh
node scripts/feed-confluence.mjs --top 5
claudia feed signals --limit 20
claudia watch wallet <followed wallet A> --history --count 5     # recent activity, then stop
claudia holders sol:<ORBIT mint> --tag smart --limit 20          # only for the top coin
```

Confluence output (trimmed):

```text
| Coin | Labelled wallets (clean / all) | Feeds | Net USD | Noisy rows | Last |
| $ORBIT `sol:<ORBIT mint>`  | 4 / 4 | smart     | -370 | 0  | 07:10 UTC |
| $MOSS  `sol:<MOSS mint>`   | 3 / 4 | smart     |  -38 | 2  | 07:10 UTC |
| $TIDE  `sol:<TIDE mint>`   | 2 / 3 | smart     |  748 | 1  | 07:10 UTC |
| $GOURD `sol:<GOURD mint>`  | 1 / 3 | kol+smart | -848 | 11 | 07:10 UTC |
Set aside: 54 rows tagged bot / wash / rat (still counted under "all"), 1 wrapped-native rows.
```

## What Nova noticed

- $ORBIT had the most clean labelled wallets, but net flow was **negative**: four smart wallets were selling. That is
  the opposite of "smart money is buying", and Nova says so.
- $GOURD looked busy (KOL and smart feeds) but 11 of its rows were tagged `bot` or `wash`, leaving one clean wallet.
  Nova puts it under "Left out".
- $TIDE had two clean smart wallets buying about $750 net within minutes. Nova scores it with the signal checklist:
  +1 tags, +1 two wallets, +1 short window, 0 size (unknown for one wallet), +1 not repeating, 0 price context,
  +1 still holding, 0 holders mix not checked, +1 no paid signals, +1 fresh data = 6. Worth one rug check.
- The signals feed had a `dex_boost` on $MOSS: paid visibility, noted as marketing.

## The digest Priya received

```text
KOL + smart-money digest · 2026-10-12 · morning · Solana
Feeds read 07:12 UTC (kol and smart just updated). Partial: none.

Where labelled wallets met
- $ORBIT (sol:<ORBIT mint>): 4 smart wallets, all selling, about $370 net out between 07:02 and 07:10.
- $TIDE (sol:<TIDE mint>): 2 smart wallets buying, about $750 net in, 07:05-07:10. Rug check: 1 red (top-10 at 54%),
  2 amber. Verdict: "Red flags present. Read each red row before going further."
- $MOSS (sol:<MOSS mint>): 3 clean smart wallets, flat net flow. Has a paid DEX boost this morning.

Followed wallets
- <wallet A short> (kol): quiet since yesterday 22:40 UTC.

Left out
- 54 feed rows tagged bot / wash / rat, including most of the $GOURD activity.
- 1 wrapped SOL row.

Labels are a data provider's heuristics; wallet names are untrusted text. A labelled wallet's trade is not a
recommendation. Research, not financial advice.
```

## What Nova did not do

- It didn't research all five coins: one rug check, on the coin with the best checklist score.
- It didn't name the KOL behind wallet A, even though the feed carried a display name.
- It didn't suggest a trade, a size or a price, and it didn't post the digest anywhere public.
