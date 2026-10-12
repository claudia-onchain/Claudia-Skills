# How assistants find and cite sources (checked 2026-10)

Read this in step 1, before promising anyone results, and whenever someone pitches a new "GEO" tactic. Only what the
companies themselves publish is stated as fact here. Everything else is labelled as a working assumption.

## Two ways an assistant "knows" you

1. **Training data.** What a model learned before its cutoff. You can't add to it after the fact, and you can't see
   it. Blocking training crawlers affects future training only.
2. **Live retrieval.** When an assistant searches the web for an answer, it fetches pages through a search index or
   its own crawler and cites them. This is the part you can influence, and it is why the search crawlers matter.

## What each company says

### Google (AI Overviews, AI Mode)

- "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations
  necessary." A page needs to be indexed and eligible to show a snippet. "You don't need to create new machine readable
  files, AI text files, or markup to appear in these features."
  (developers.google.com/search/docs/appearance/ai-features)
- Google's guide "Optimizing your website for generative AI features on Google Search" (May 2026, updated July 2026)
  says optimizing for generative AI is still SEO, lists "AEO/GEO hacks" to ignore (chunking content, llms.txt,
  inauthentic mentions), and says there is no requirement to break content into tiny pieces.
  (developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- Structured data "isn't required for generative AI search, and there's no special schema.org markup you need to add";
  it is still recommended for rich results.
- **Controls:** `nosnippet`, `data-nosnippet`, `max-snippet` or `noindex` limit what is shown. Search Console also has a
  **Search generative AI** setting (Include, Exclude, Inherit) covering AI Overviews, AI Mode and Discover generative
  features, rolled out to all sites by 31 August 2026; Google says it isn't a ranking signal for the rest of Search.
- **Google-Extended** is a robots.txt token for Gemini training and grounding. It "does not impact a site's inclusion in
  Google Search" and is not a ranking signal.

### OpenAI (ChatGPT search)

- `OAI-SearchBot`: crawls for search. Sites that opt out "will not be shown in ChatGPT search answers" (they can still
  appear as plain navigational links). OpenAI recommends allowing it.
- `GPTBot`: training. Disallowing it signals content shouldn't be used to train foundation models.
- `ChatGPT-User`: fetches a page when a user asks; not used for automatic crawling or to decide search inclusion.
- Settings are independent; robots.txt changes take about 24 hours. (developers.openai.com/api/docs/bots)
- OpenAI says ChatGPT ranks results by multiple factors meant to surface relevant, reliable information, that placement
  is not guaranteed, and that referral links carry `utm_source=chatgpt.com`. It publishes no detailed ranking criteria.

### Anthropic (Claude)

- `ClaudeBot`: training. Blocking it excludes the site's future material from training datasets.
- `Claude-SearchBot`: indexes to improve search results; blocking it "may reduce your site's visibility and accuracy in
  user search results".
- `Claude-User`: fetches pages when Claude users ask questions; blocking it may reduce visibility for user-directed web
  search.
- The bots honour robots.txt, including `Crawl-delay`. Anthropic advises against IP blocking.
  (support.claude.com, "Does Anthropic crawl data from the web…", updated April 2026)

### Perplexity

- `PerplexityBot`: surfaces and links websites in Perplexity search results; not used to crawl for foundation models.
  Perplexity recommends allowing it.
- `Perplexity-User`: user-initiated fetches; "generally ignores robots.txt rules" because a user asked.
  (docs.perplexity.ai/guides/bots)
- Perplexity answers from real-time web search with numbered citations. It publishes no citation-selection criteria.

### Microsoft (Copilot, Bing)

- Bing Webmaster Tools' **AI Performance** report (public preview since 10 February 2026) shows citations in Microsoft
  Copilot, Bing AI summaries and some partner integrations: total citations, cited pages, sampled grounding queries.
  No ranking or click data. Bing recommends IndexNow to keep content fresh across search and AI experiences.
- Microsoft 365 Copilot sends its web queries to the Bing search service (learn.microsoft.com).

## What nobody has confirmed

- That any assistant reads `llms.txt` to choose or rank sources. (Google says Search ignores it.)
- That Wikipedia, Wikidata, Reddit or any single site is weighted specially by an assistant. They are often cited, but
  no company has published weights. Treat "get on Wikipedia" advice with care; it is only appropriate when the subject
  is notable by Wikipedia's own standards, and never written by you.
- Any fixed "AI ranking factor" list. Sellers of such lists are guessing.

## Working assumptions (reasonable, not guaranteed)

- Pages that state a fact plainly and early are easier to quote than pages that bury it.
- Consistent facts across many independent sources are more likely to be repeated correctly than a single claim.
- Fresh, dated pages win on fast-moving topics.
- Content in images, video or client-side scripts is less likely to be read than text in the HTML.
