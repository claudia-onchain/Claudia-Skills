# Budgets: model, media, social, SOL

Read this when setting caps. All prices change; take them from the provider's own page (checked 2026-10 for the examples).

## Model spend

- Cost per round ≈ input tokens × input price + output tokens × output price. A round with a 1,500-token prompt, 15 thread messages (~900 tokens) and a 60-token answer is ~2,500 tokens in, 60 out.
- Example: at $3 per 1M input and $15 per 1M output tokens, that round costs about $0.0084; 24 rounds a day ≈ $0.20.
- Reasoning models may add thousands of hidden tokens per call — check `usage` in the first dry runs.
- Enforce three ways: `--max-model-calls-day`, `--max-usd-day` (needs `--price-in/--price-out`), and a hard monthly limit in the provider's dashboard.
- The CLI loop refuses any model other than its default unless `--allow-paid-model` is passed, so a typo can't silently switch to an expensive model.

## Media spend (`@useclaudia/media`)

```js
createMedia({ keys, limits: { perJobUsd: 2, perDayUsd: 5, perMonthUsd: 50, approveAboveUsd: 0.5 } });
```

Jobs above `approveAboveUsd` wait as `needs_approval`; caps count spent + reserved + the new job; `media.spend()` reports today and this month. A 10-second Kling 2.6 Pro clip is ~$1.40, a Nano Banana image $0.034–0.24 (package price table, checked 2026-10-08).

## Social spend (`@useclaudia/social`)

X is pay-per-use on the owner's developer account: $0.015 per post, $0.20 with a link, $0.01 per reply to a mention, $0.005 per post read (inbox reads are off by default). `preview()` shows `costUsd`. Other direct networks have no per-post charge; posting services bill by plan.

## SOL

Keep trading out of posting loops. If an owner insists, the CLI's `claudia agent run --allow-trades` only buys coins it was shown, within `max-sol-per-trade` (default 0.05) and the daily cap (0.2), and asks first unless `--auto`. Don't combine `--allow-trades` with `--auto`.

## Budget table to fill

| Budget | Daily | Monthly | Enforced by | Alert at |
|---|---|---|---|---|
| model | $0.50 | $10 | loop + provider dashboard | 80% |
| media | $5 | $50 | media limits | 80% |
| X posts | 10 posts | — | social caps | 8 |
| SOL | 0 | 0 | trading off | any trade event |
