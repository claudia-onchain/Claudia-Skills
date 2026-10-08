# Worked example: Juno's first $100 a month

Illustrative numbers. Juno is a fictional AI agent (@juno_charts) that explains how to read charts; Dana (they/them) runs
it and is the account holder. Juno's content is education, never trade calls. Not financial advice.

## Starting point

| Platform | Numbers |
|---|---|
| X | 4,100 followers · 38 verified followers · 61k impressions/90 d |
| TikTok | 11,300 followers · 240k views/30 d |
| Telegram | 600 subscribers |
| Coin | $CNDL (Candle Club), launched on the Claudia launchpad; creator rewards land in Juno's agent wallet |
| Costs | X API ~$9/month, generation ~$25/month = $34 |

Dana's question: "Can Juno at least pay for itself?"

## Tracker: what's realistic

- X Original Content Rewards: far off (462 verified followers and ~440k impressions short). $0.
- TikTok Creator Rewards: follower and view numbers pass, but the videos are fully AI-generated (reported ineligible), and
  finance-adjacent content draws extra scrutiny on TikTok. $0.
- YouTube: not active. $0.
- Telegram Ad Platform: under 1,000 subscribers. Not yet.
- Telegram Stars: available now.
- Creator rewards from $CNDL: real but falling. Week 1 receipts were the largest; by week 4 they were a fraction of that.
  Counted as variable, not baseline.

## Chosen streams

1. **Guide: "Read a candlestick chart in 10 minutes"** — a 24-page PDF, $12. Education only: what candles, volume and
   timeframes show, common misreadings, and a page on why no chart predicts price. Sold via a Telegram bot for Stars and on a
   storefront. Product page: "Written and illustrated with AI, reviewed by Dana. Education, not financial advice."
2. **Telegram Stars paid post**: a weekly "chart of the week, annotated" deep dive at 100 Stars. It annotates what happened
   on a past chart; it never says what to buy or where price goes next.
3. **Creator rewards** from $CNDL, reported monthly in Telegram as promised in the launch FAQ.

Declined: an exchange's referral program (sign-up bonus = incentive to invest under UK rules; banned on TikTok; and it
would turn Juno's education into promotion). A "signals group" idea from a follower (regulated activity in many countries;
off-limits).

## Disclosure lines used

```text
Guide post (X):      "My own guide: read a candlestick chart in 10 minutes. AI-written, human-reviewed. Education, not financial advice. <link>"
Paid post (Telegram): "This week's annotated chart is a paid post (100 Stars). It explains a past move; it's not a prediction. Not financial advice."
Monthly rewards post: "October creator rewards for $CNDL: 0.9 SOL to Juno's agent wallet <address>. Spent: X API, video generation. Dev wallet: no sells. Not financial advice."
```

## Month 1 results

| Stream | Actual |
|---|---|
| Guide (31 sales) | $372 gross, $335 net after storefront fees and Stars cuts |
| Paid posts (4 weeks) | ≈ 3,100 Stars, withdrawable after 21 days (~$40 at the benchmark) |
| $CNDL creator rewards | 0.9 SOL (logged at the SOL/USD rate on each receipt date) |
| Costs | $36 |

Juno paid for itself in month 1, mostly from the guide, which is the stream Dana controls. The plan for month 2: a second
guide (volume and liquidity basics), and grow Telegram past 1,000 to switch on the Ad Platform. Creator rewards stay a
"nice when it happens" line.

## Ledger rows (excerpt)

```csv
date_received,platform,stream,description,gross,platform_fee,net,currency,fx_rate_to_reporting,net_reporting,reporting_currency,payout_reference,tx_signature,wallet,period_covered,statement_file,notes
2026-11-02,Storefront,Digital product,Candlestick guide x 19,228,22.8,205.2,USD,1,205.2,USD,PO-11934,,,2026-10-01 to 2026-10-31,2026-11-storefront.csv,
2026-11-04,Claudia launchpad,Creator rewards,$CNDL creator fees,0.31,0,0.31,SOL,149.80,46.44,USD,,example-signature-1,Juno agent wallet,2026-11-04,explorer-2026-11.csv,Valued at receipt
```
