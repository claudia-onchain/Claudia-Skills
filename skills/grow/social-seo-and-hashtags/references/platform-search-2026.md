# How search works on each platform (checked 2026-10)

Read this in step 4 the first time you write for a platform, and each quarter (these rules move). Where a platform has
not said something officially, this file says so instead of repeating SEO-blog folklore. "Checked 2026-10" means the
linked page said this in October 2026.

## TikTok

- **What TikTok says it uses:** its "How TikTok recommends videos" post lists video information "which might include
  details like captions, sounds, and hashtags" among the signals (newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you).
- **On-screen text and spoken words:** TikTok has not published that search reads them. Say and show the keyword
  anyway: viewers who arrive from search need to see at once that the video answers them, and auto captions turn the
  spoken line into text people read.
- **Caption length:** 2,200 characters through the Content Posting API (developers.tiktok.com, checked 2026-10). The
  in-app limit is higher, but anything posted through `@useclaudia/social` or a scheduler is held to the API limit.
- **Creator Search Insights:** launched March 2024 in select regions; type "Creator Search Insights" into the search bar
  to open it. It shows what people search and which searches lack good videos ("content gap"). Availability by region
  varies; if it doesn't open, use the search-bar suggestions.
- **Hashtags:** no official count. 3–5 specific tags is a sensible ceiling; the caption's words do more.
- **Measure:** TikTok Studio → per-video analytics → traffic source "Search".

## Instagram

- **Hashtag cap:** up to **5 hashtags** in a post or Reel. Instagram's @creators account announced it on 18 December
  2025 ("Starting today, Instagram will allow up to 5 hashtags in a reel or post"), rolling out gradually, with the
  reason that fewer, more targeted hashtags work better than many generic ones. Meta's Graph API reference still lists
  30; the app enforces the lower number.
- **Captions are the search text:** Instagram's own creator guidance (2025–2026) says captions tell search what a post
  is about and recommends descriptive, relevant keywords. Head of Instagram Adam Mosseri said in 2025 that hashtags
  don't help reach; they help people understand what a post is about.
- **Caption limit:** 2,200 characters (Meta developer docs).
- **Alt text:** photo and carousel posts take custom alt text (Advanced settings → Write alt text, or Edit → Edit alt
  text on a published post). Meta's API accepts `alt_text` up to 1,000 characters for images only, not Reels or
  Stories (checked 2026-10).
- **Search engines:** since July 2025, public posts from professional accounts of adults can appear in Google and
  other search engines. The account setting "Allow public photos and videos to appear in search engine results"
  controls it. Treat a public professional account's captions as web copy.
- **Measure:** compare per-post views from non-followers before and after keyword work; Instagram does not break out a
  search-only number for every post.

## YouTube (Shorts and long videos)

- **How search ranks:** relevance, engagement and quality. Relevance is "how well the title, tags, description, and
  video content match your search query" (support.google.com/youtube/answer/16090438, checked 2026-10).
- **Hashtags:** "up to three hashtags that are considered most engaging will appear by your video title"; "if a video
  or playlist has more than 60 hashtags, we'll ignore each hashtag on that content" (answer/6390658). Hashtags in the
  title or description link to hashtag pages. Use 1–3.
- **Title:** up to 100 characters; keep the keyword near the start, since long titles are cut off in some views (rule of thumb: first 60).
- **Tags:** listed in YouTube's relevance factors; a few accurate ones (including common misspellings) are enough.
- **Research tools:** YouTube Studio → Analytics → **Trends** (formerly Research, then Inspiration): top searches,
  breakout videos, content gaps, "Searched on YouTube", last 28 days, limited by country and language. The separate
  AI-ideas "Inspiration" tab under Content is being deprecated from August 2026 in favour of Ask Studio
  (answer/15575509, checked 2026-10).
- **Measure:** Analytics → Advanced mode → Traffic source: YouTube search, then open it for the search terms.

## Pinterest

- **Search reads your words.** Put the primary keyword in the Pin title, the first sentence of the description and the
  board name, in natural phrasing.
- **Title:** up to 100 characters.
- **Hashtags:** we found no current official Pinterest guidance recommending hashtags (checked 2026-10). Don't rely on
  them.
- **Alt text:** add it on every Pin; describe the image and label it AI-generated.
- **Pinterest Trends** (trends.pinterest.com): "historic view (up to the last two years) of the top search, save, and
  shopping trends", by region; some features limited to some regions; audience trends cover 90 days, updated daily.
- **Note for API posting:** new Pinterest apps are on Trial access, so API-created Pins are visible only to you until
  the app is upgraded (`@useclaudia/social` network notes).

## X

- **Hashtags:** X's help centre recommends no more than 2 hashtags per post; hashtagged public posts appear in search
  for that tag (help.x.com/en/using-x/how-to-use-hashtags, checked 2026-10).
- **Search is mostly by words and accounts.** Write the topic in plain words in the first line. Articles (Premium) are
  long-form and searchable.
- See [x-playbook](../../x-playbook/SKILL.md) for ranking signals and API costs.

## Threads

- **One topic tag per post.** Tags don't need `#`, can be several words, and the tag's page is the search view for that
  topic. Pick the cluster's primary topic as the tag.
- Every word in a post is searchable; the first line does the work.

## Bluesky and Mastodon

- Hashtags are how people follow topics and how many custom feeds pick posts. Use 1–3, written in CamelCase
  (`#AiArt`) so screen readers say them correctly.
- Mastodon full-text search only covers posts from people who opted in; hashtags are the reliable way to be found there.

## Google and other web search

- Public YouTube videos and (since July 2025) public professional Instagram posts can rank in web search. A clear title
  and first line help in both places. For being cited by AI assistants, see
  [ai-search-visibility](../../ai-search-visibility/SKILL.md).
