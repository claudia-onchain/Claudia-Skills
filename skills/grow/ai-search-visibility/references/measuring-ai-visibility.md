# Measuring AI visibility

Read this in step 8 the first month, and whenever a number jumps. AI answers are noisy, so the method matters more than
any one result.

## The prompt panel

- **Size:** 20–40 prompts. Brand (5–8), category (5–10), problem (5–15), comparison (3–5).
- **Wording:** how a real person would type it. No brand name in category or problem prompts; that is the point of
  them.
- **Assistants:** the ones your audience uses. A typical set: ChatGPT (search on), Claude (web search on), Gemini,
  Google AI Mode, Perplexity, Copilot. Write down the plan or model shown in the app on the day, because answers
  differ by tier.
- **Runs:** three per prompt per assistant, each in a new chat. Logged out or with memory and personalisation off where
  the app allows; note the setting.
- **Same day each month,** same person if possible, same location (answers vary by country).
- **By hand.** A person runs the panel. Automated querying of consumer chat apps is against most of their terms; if you
  need scale, use each company's API with web search where it offers one, and note that API answers can differ from
  the app.

## What to log (per run)

| Column | Values |
|---|---|
| mentioned | yes / no (your name appears at all) |
| position | first, among several, only in a list, not present |
| cited_url | the URL cited for you, or none |
| cited_source_type | own site, social profile, directory, news, forum, docs, other |
| facts_correct | yes / partly / no |
| wrong_fact | the false statement, word for word |
| sentiment | positive / neutral / negative |
| notes | anything odd (outdated info, a competitor named instead) |

## The three numbers

- **Mention rate** = runs with mentioned = yes ÷ all runs (per group; brand prompts should be near 100 %, category
  prompts are the real test).
- **Citation rate** = runs with a cited URL for you ÷ runs where you were mentioned.
- **Fact accuracy** = runs with facts_correct = yes ÷ runs where you were mentioned.

Report each with the previous month's number and the run count. A change of a few points on 60 runs is noise; look for
movement that holds for two or more months.

## Platform reports (checked 2026-10)

| Report | Where | What it shows | Limits |
|---|---|---|---|
| Generative AI performance (Search) | Google Search Console | Impressions in AI Overviews and AI Mode by page, country, device, date; filters "Web: text-based" / "Web: multimodal" | Impressions only; AI traffic is also inside the normal Web totals |
| AI Performance | Bing Webmaster Tools (public preview) | Citations in Copilot and Bing AI answers, cited pages, sampled grounding queries; CSV export | No ranking or click data |
| Referrals | Your site analytics | Visits with `utm_source=chatgpt.com`, and referrers such as perplexity.ai, copilot.microsoft.com, gemini.google.com, claude.ai | Many AI visits arrive without a referrer; treat as a floor |

## Reading the results

- Brand prompts wrong → fix the facts page and the old sources first (step 9).
- Brand prompts right, category prompts absent → you need third-party mentions and pages that answer category
  questions (steps 5 and 7).
- Cited, but always from a directory or old article → your own page isn't the clearest source; rewrite it answer-first.
- Competitor named instead of you for your own product's question → check whether your pages actually answer that
  question in plain words.
