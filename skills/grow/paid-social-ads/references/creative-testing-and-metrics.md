# Creative testing and metrics

Read in step 4 when planning variants and in step 8 when reading results.

## Test design

- **One variable per round.** Hold the offer, landing page, audience and budget steady; change the hook, the first
  frame, or the format. Write the variable in `templates/ad-creative-matrix.csv`.
- **3–5 variants per ad group.** Fewer and you learn little; more and each gets too little spend to judge.
- **Equal chance.** Same ad group, same start time. Don't judge a variant on its first day.
- **Enough data before deciding.** A practical floor: each variant has spent at least 2× your target cost per result,
  or has 1,000+ landing-page views. Below that, results are mostly noise.
- **Keep a control.** The best variant from the last round stays in the next round so you know if the new ones are
  better or the week was just different.

## What to vary, in order of usual impact

1. The first 1–2 seconds (the hook frame and the on-screen line).
2. The offer framing (what it is in plain words, the price shown or not).
3. Format (video vs carousel vs still).
4. Copy length and the call to action.
5. Music or voice.

## AI creative rules

- Label AI-made media in the platform's tool and say it in the copy. Disclosure is a policy requirement on TikTok and
  is shown by Meta anyway.
- Show the real product. If you sell a pack of 16 wallpapers, the ad shows those wallpapers, not an improved render.
- An AI character presenting a product describes it; she doesn't claim to use it, love it, or have results from it.
- No fake comments, fake reviews, fake "users", fake app screens or fake news layouts.

## The numbers

```text
CPM              = spend ÷ impressions × 1,000            what attention costs
CTR              = link clicks ÷ impressions               does the creative earn a click
CPC              = spend ÷ link clicks
Landing rate     = landing-page views ÷ link clicks        does the page load fast (low = slow page or accidental taps)
Conversion rate  = results ÷ landing-page views            does the page convince
Cost per result  = spend ÷ results                         the number that decides
Frequency        = impressions ÷ reach                     above ~3–4 in a week, people are seeing it too often
```

Reading them together:

| Pattern | Likely cause | Next test |
|---|---|---|
| Low CTR, normal CPM | the hook doesn't stop the scroll | new first frames |
| Good CTR, poor conversion | the page or offer doesn't match the ad | fix the page; match the ad's promise |
| Rising CPM, falling CTR over days | creative fatigue | rotate in the next-best variant |
| Low landing rate | slow page, or clicks from misplaced taps | speed up the page; check placements |
| Good platform conversions, none in your analytics | tracking mismatch or attribution window | check UTMs and the pixel; trust your own sales data |

## Scaling and stopping

- Scale a winner by 20–30% of its budget every few days rather than doubling; big jumps can reset delivery learning.
- Duplicate a winner into a new ad group for a new country instead of widening the original.
- Stop when cost per result stays above your maximum for two weeks despite new creative, or when frequency climbs and
  results drop.
