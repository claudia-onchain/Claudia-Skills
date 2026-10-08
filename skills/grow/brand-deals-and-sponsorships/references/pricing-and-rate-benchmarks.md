# Pricing and rate benchmarks (2026)

Read this in step 3 when quoting, and once a quarter when updating the rate card. Benchmarks are market ranges
compiled from 2026 industry rate guides ([ContentGrip rate card 2026](https://contentgrip.com/influencer-marketing-rate-card/),
[Socially Powerful cost guide](https://sociallypowerful.com/influencer/marketing/cost),
[LeadDyno influencer pricing 2026](https://www.leaddyno.com/blog/influencer-pricing); checked 2026-10). Rates vary a
lot by niche, country and audience quality — use them as a sanity band, not a price.

## Benchmark bands per deliverable (USD)

| Tier (followers) | Instagram Reel/post | TikTok video | YouTube Short / integration | X post |
|---|---|---|---|---|
| Nano 1k–10k | 20–200 | 20–500 | 50–500 | ~$2 per 1k followers |
| Micro 10k–50k | 200–2,000 | 500–2,000 | 500–2,500 | ~$2 per 1k followers |
| Mid 50k–500k | 2,000–5,000 | 2,000–5,000 | 2,500–10,000 | ~$2 per 1k followers |
| Macro 500k–1M | 5,000–15,000 | 5,000–20,000 | 10,000–25,000 | ~$2 per 1k followers |
| Mega 1M+ | 15,000+ | 20,000+ | 25,000+ | negotiated |

TikTok median rates run roughly 40–50% below Instagram Reel rates in several 2026 reports; YouTube long-form
integrations command the most because they last. Telegram channel posts are commonly priced per 1,000 subscribers or
per view (channel CPMs of a few dollars are typical); Discord announcements per member are lower still.

## The quote formula

```
base       = benchmark band position for the tier (low end if new to brand deals, mid once you have 3+ case studies)
perf_check = median_views_last_10 / 1000 × CPV            # CPV $15–30 per 1,000 views for short video
base_adj   = base nudged toward perf_check (if perf_check < band low → quote band low; if > band high → band high)
production = generation cost on your own keys + editing hours × hourly rate
add_ons    = usage + whitelisting + exclusivity + rush + extra rounds    # each % of base_adj
bundle     = −10–15% if 3+ deliverables
quote      = (Σ base_adj + production) × (1 + Σ add_on %) × (1 − bundle)
```

### Add-on rates

| Add-on | Typical | Notes |
|---|---|---|
| Brand reposts organically, 30 days | +20% | On their own accounts, credited |
| Paid usage / whitelisting / Spark or partnership ads | +30–50% per 30 days | End date in the contract; revoke after |
| Category exclusivity | +15–30% per 30 days | Name the competitors |
| Rush (< 5 working days) | +25% | |
| Extra revision round (beyond 2) | +10% each | |
| Raw files / alternate cuts | +15–25% | No character rights included |
| Perpetual or all-media rights | 2–3× or decline | Never includes generating new content of the character |

### AI influencer specifics

- **Production isn't zero.** Count image/video generation (the operator's own provider costs — check
  `claudia generate models` for prices on the operator's keys), retries for character consistency, editing,
  captioning, and approval rounds. A 20-second AI video can take 3–6 hours of operator time.
- **Brand caution discount?** Some brands worry about AI. Don't discount for it; offer a smaller first deliverable
  instead and let results speak.
- **Character licensing** (the brand wants to use Claudia's likeness in its own ads or generate new content of her)
  is a separate, much larger licence with brand-safety approval rights for the operator. Most operators should decline.

## Negotiation moves

1. Ask the budget first. "What range is set aside?" Anchors stop you underquoting.
2. Quote line items; show the total; keep the floor private.
3. When they're under, remove scope (organic-only, no exclusivity, fewer deliverables), never just the rate.
4. Offer a test package (1 deliverable, 7-day report) with the rate card price; good results justify a bundle.
5. Get it all in the contract; "we'll sort usage later" means unpaid usage.

## Worked quote (Claudia, October 2026)

Claudia: TikTok 38k followers (micro), median views 14k; Instagram 12k (micro), median Reel views 14k; X 21k.

| Line | Calc | Amount |
|---|---|---|
| TikTok video (25 s) | micro band 500–2,000; perf 14 × $25 = $350 → band low $500; strong completion → $900 | $900 |
| Instagram collab Reel | micro band 200–2,000; perf 14 × $25 = $350 → $600 | $600 |
| X post + 3-part thread | 21k × $2 / 1k = $42 → floor $150 for the thread work | $150 |
| Production | generation ≈ $45 on the operator's keys + 5 h × $40 | $245 |
| Subtotal | | $1,895 |
| Spark Ads 30 days on the TikTok | +40% of $900 | $360 |
| Exclusivity: headphones, 30 days, named competitors | +20% of $1,650 (deliverables) | $330 |
| Bundle (3 deliverables) | −10% of $2,585 | −$259 |
| **Quote** | | **$2,326** |
