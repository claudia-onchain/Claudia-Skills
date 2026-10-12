---
name: ai-search-visibility
description: Helps a creator, brand, agent or coin project get found, described correctly and cited by AI assistants and AI search (ChatGPT search, Claude, Gemini and Google AI Overviews / AI Mode, Perplexity, Copilot) — sometimes called GEO or AEO. Covers what assistants can and cannot be influenced by, crawler access (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Google-Extended and what each controls), one canonical facts page, answer-first page structure, llms.txt as an optional extra, earning real third-party mentions, and measuring mentions with a fixed prompt panel plus Google's and Bing's AI reports. Use when someone asks "why doesn't ChatGPT know us", "how do we show up in AI answers", "should we add llms.txt", when an assistant gets facts about the brand wrong, or when planning a site for AI discovery. Honest that placement can't be bought or guaranteed.
license: MIT
metadata:
  title: "AI search visibility"
  category: "grow"
  summary: "Be findable, quotable and correct in AI assistants: crawler access, one facts page, clear pages, real mentions and a prompt panel."
  level: "intermediate"
  tags: "ai search, geo, aeo, llms.txt, ai overviews, chatgpt search, perplexity, crawlers, structured data, brand facts"
  time: "half a day to set up, 1 h a month"
  version: "1.0.0"
  updated: "2026-10-12"
---

# AI search visibility

More people now ask an assistant before they search. When someone asks "what's a good platform for AI agents that post
on social media?", the assistant answers from what it can crawl, what it was trained on, and what other sites say. You
can't control that answer, and anyone selling a guaranteed placement is selling something that doesn't exist. What you
can do is make sure assistants are allowed to read you, that your own pages state the facts clearly in one place, that
the facts match everywhere, and that real third parties talk about you. Then you measure, month by month, whether the
answers get more accurate.

## When to use this

- "Why doesn't ChatGPT (or Claude, Gemini, Perplexity) mention us?" or "it says we launched in 2024; we didn't."
- Launching a site, a product page, an agent page on useclaudia.xyz or a coin project's site.
- Someone proposes llms.txt, "GEO hacks" or a paid "AI ranking" service and you need a straight answer.
- Monthly brand health check alongside [social-listening](../social-listening/SKILL.md).

Not for: fake reviews, planted "best of" lists, sock-puppet posts on forums, or editing Wikipedia about yourself. Those
break platform rules, and Google's own guidance warns that chasing inauthentic mentions isn't as helpful as it might
seem (checked 2026-10).

## What you need

- Access to the website (or someone who can edit it): robots.txt, the CDN or firewall bot settings, page templates.
- Google Search Console and Bing Webmaster Tools verified for the site.
- Accounts on the assistants you want to measure (ChatGPT, Claude, Gemini, Perplexity, Copilot), used by a person.
- The list of official facts: name, what it is, who runs it, launch date, links, AI disclosure, and (for a coin) the
  chain and contract address. Copy [templates/facts-page.md](templates/facts-page.md).
- A sheet from [templates/prompt-panel.csv](templates/prompt-panel.csv).

## Steps

1. **Set an honest goal.** Write down what you can influence and what you can't. Can: whether crawlers may read you,
   how clearly your pages state facts, whether facts match across the web, whether you are worth citing. Can't: model
   training data already collected, which sources an assistant picks for a given person, answer wording, or timing.
   The goal is "accurate and present when relevant", measured over months, never "ranked #1 in ChatGPT". Read
   [references/how-assistants-find-sources.md](references/how-assistants-find-sources.md) before promising anyone
   anything.

2. **Build a prompt panel.** Write 20–40 prompts real people would ask, in four groups:
   **brand** ("what is Claudia on useclaudia.xyz?"), **category** ("platforms for AI agents that post to social media"),
   **problem** ("how do I make an AI character that looks the same in every image?") and **comparison** ("<you> vs
   <competitor>"). A person runs each prompt in each assistant from a fresh chat, three times (answers vary run to run),
   and logs in [templates/prompt-panel.csv](templates/prompt-panel.csv): mentioned (yes/no), cited with a link
   (yes/no, which URL), facts correct (yes/partly/no), and what was wrong. Don't automate this against the assistants'
   consumer apps; most terms forbid it.

3. **Check crawler access.** Open `https://<site>/robots.txt` and the CDN's bot settings. Each company separates
   **search** crawlers (needed to be cited) from **training** crawlers (your choice) and **user-triggered** fetchers
   (checked 2026-10):

   | Company | Search / citation | Training | User-triggered |
   |---|---|---|---|
   | OpenAI | `OAI-SearchBot` (blocked = not shown in ChatGPT search answers) | `GPTBot` | `ChatGPT-User` |
   | Anthropic | `Claude-SearchBot` | `ClaudeBot` | `Claude-User` |
   | Perplexity | `PerplexityBot` | (not used for training, per Perplexity) | `Perplexity-User` |
   | Google | `Googlebot` (AI Overviews and AI Mode use the normal index) | `Google-Extended` token (Gemini; does not affect Search) | — |
   | Microsoft | `Bingbot` (Bing's AI Performance report counts Copilot citations from the Bing index) | — | — |

   Allow the search crawlers if you want to be cited. Blocking training crawlers is a separate decision and does not
   remove you from search answers. Then check the CDN: many have one-click "block AI bots" switches that block search
   crawlers too. The ready robots.txt is in [templates/robots-ai.txt](templates/robots-ai.txt).

4. **Publish one canonical facts page.** One page (often `/about` or `/press`) that states, in plain sentences near the
   top: what it is, who runs it, when it started, where it lives online (official handles and links), what it is not
   (for an AI character: "Claudia is an AI character, not a real person"), and how to contact you. For a coin: chain,
   contract address, launch date, and the line "Not financial advice." with no price claims. Fill
   [templates/facts-page.md](templates/facts-page.md). Then make every profile bio, README, app-store listing and press
   kit say the same thing in the same words. Inconsistent facts are the most common reason assistants get a brand
   wrong.

5. **Make pages easy to quote.** Assistants cite pages that answer a question directly. For each important page:
   the answer in the first two sentences, one question per heading, short paragraphs, tables for comparisons, a visible
   "updated" date, a named author or owner, and the text in the HTML (not only inside images, video or client-side
   scripts). Add `Organization` (or `Person`) structured data with `sameAs` links to the official profiles, using
   [templates/organization-schema.json](templates/organization-schema.json). Google says structured data isn't
   required for its AI features and no special schema exists for them; it still helps search engines tell your entity
   apart from others with the same name.

6. **Add llms.txt only as a cheap extra.** llms.txt is a proposal (llmstxt.org, September 2024): a Markdown file at
   `/llms.txt` with the site name, a one-line summary and lists of key links. Google Search ignores it (Google's AI
   optimization guide, checked 2026-10), and no assistant company has said it uses llms.txt to choose sources. It can
   still help developer tools and agents that are pointed at your site. If you publish one, keep it short and accurate:
   [templates/llms.txt](templates/llms.txt). Never spend time on it before steps 3–5.

7. **Earn mentions you didn't write.** Assistants lean on what others say. Real routes: get listed in the directories
   and docs your category actually uses, answer questions in communities under your own name and within their rules
   ([reddit-playbook](../reddit-playbook/SKILL.md)), be interviewed, publish original data or tools other people cite,
   collaborate with creators ([collabs-and-cross-promotion](../collabs-and-cross-promotion/SKILL.md)), and keep a press
   page journalists can quote. Paid placements carry `#ad` or "sponsored". Don't edit Wikipedia about yourself (its
   conflict-of-interest rules apply), and don't post fake reviews or seed forum threads with alt accounts.

8. **Measure monthly.** Re-run the prompt panel on the same day each month, same prompts, same method. Add the numbers
   the platforms now give you (checked 2026-10): Google Search Console's **Generative AI performance** report
   (impressions in AI Overviews and AI Mode by page), Bing Webmaster Tools' **AI Performance** report (citations in
   Copilot and Bing AI answers, by page, public preview), and referral visits in site analytics (ChatGPT adds
   `utm_source=chatgpt.com` to links it sends). Track three numbers: mention rate, citation rate and fact accuracy
   across the panel. Details: [references/measuring-ai-visibility.md](references/measuring-ai-visibility.md).

9. **Fix wrong answers at the source.** When an assistant states something false, find where it likely came from (an
   old bio, an outdated article, a directory listing), fix that source or ask its owner to, update the facts page with
   the correct statement and date, and use the assistant's feedback button on the wrong answer. Expect weeks or
   months, not days. If an answer is harmful (for example, it calls a coin "safe" or attributes a scam to you), log it
   and handle it through [crisis-and-reputation](../crisis-and-reputation/SKILL.md).

## Templates

- [templates/prompt-panel.csv](templates/prompt-panel.csv) — prompts by group, three runs per assistant, mention /
  citation / accuracy columns.
- [templates/facts-page.md](templates/facts-page.md) — the canonical facts page, with AI-character and coin sections.
- [templates/robots-ai.txt](templates/robots-ai.txt) — robots.txt that allows search crawlers and makes the training
  choice explicit.
- [templates/organization-schema.json](templates/organization-schema.json) — `Organization` JSON-LD with `sameAs`.
- [templates/llms.txt](templates/llms.txt) — a short llms.txt following the llmstxt.org format.
- [examples/juno-visibility-audit.md](examples/juno-visibility-audit.md) — a fictional agent's first audit, fixes and
  three-month results.

Monthly summary line:

```text
AI visibility · <month> · <n> prompts × <n> assistants × 3 runs
Mentioned <x>% (prev <x>%) · Cited with link <x>% (prev <x>%) · Facts correct <x>% (prev <x>%)
Top wrong fact: "<claim>" — source found: <url or unknown> — fix: <action>
Google AI impressions: <n> · Bing AI citations: <n> · chatgpt.com referrals: <n>
```

## Check before you finish

- [ ] Search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot) are allowed in robots.txt
      and not blocked by the CDN; the training-crawler choice is written down on purpose.
- [ ] One facts page exists, dated, and every official bio and listing matches it word for word on the key facts.
- [ ] Important pages answer in the first two sentences, show an updated date and render their text in HTML.
- [ ] A baseline prompt panel is logged, run by a person, three runs per prompt per assistant.
- [ ] Nothing fake: no planted reviews, sock-puppet posts, self-edited Wikipedia or undisclosed paid mentions.
- [ ] Coin pages state facts only, carry "Not financial advice." and make no price or return claims.
- [ ] The report says plainly that placement in AI answers can't be guaranteed.

## Pitfalls

- **Buying "AI rankings".** No assistant sells organic placement. Services that promise it usually post spam that can
  hurt you.
- **Blocking everything "AI".** One CDN switch can block search crawlers and quietly remove you from cited answers.
- **llms.txt first.** It is the least important step. Crawlable, consistent, quotable pages come first.
- **Chopping pages into fragments.** Google's guidance says there's no need to break content into tiny pieces for AI.
  Write complete pages with clear headings.
- **One-run measurement.** Answers change from run to run and by account. Use three runs and a fixed panel, and read
  trends across months.
- **Treating an assistant's wording as a quote of you.** It isn't. Don't repost AI answers as testimonials.
- **Name collisions.** "Claudia" is a common name. Use a consistent full descriptor ("Claudia, the AI character on
  useclaudia.xyz") so the entity is clear.

## Related skills

- [social-seo-and-hashtags](../social-seo-and-hashtags/SKILL.md) — search inside the social apps.
- [social-listening](../social-listening/SKILL.md) — what people (and assistants) say about you.
- [personal-brand-strategy](../personal-brand-strategy/SKILL.md) — the positioning the facts page states.
- [crisis-and-reputation](../crisis-and-reputation/SKILL.md) — when an answer is harmful.
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md) — saying clearly what is AI.
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — coin pages and claims.
