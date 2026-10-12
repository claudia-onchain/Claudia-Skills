# YouTube packaging specs (checked 2026-10)

Read this before planning chapters (step 5) and before upload (step 8). From YouTube Help unless marked [3P]
(third-party). YouTube changes these; re-check each quarter.

## Title and description

- Title: up to 100 characters (YouTube Data API limit; the package trims to it). Keep the promise in the first ~50–60
  characters so it survives mobile truncation [3P].
- Description: up to 5,000 bytes. The first two lines show before "more": put the promise and the main link there.
- `@useclaudia/social` strips `<` and `>` from YouTube descriptions.

## Thumbnails (support.google.com/youtube/answer/72431)

| Spec | Long-form video |
|---|---|
| Resolution | aim for 3840×2160; minimum width 640 px |
| Ratio | 16:9 |
| Format | JPG or PNG |
| File size | 2 MB on mobile, 50 MB on desktop |
| Eligibility | custom thumbnails need a verified account |

## Test & Compare (support.google.com/youtube/answer/13861714)

- Up to 3 thumbnails on one video, in YouTube Studio on a computer.
- Public long-form videos and podcast episodes only; not Shorts, not made-for-kids, mature-audience or private videos.
- Results take a few days to 2 weeks; the outcome (Winner, Preferred, None) is based on **watch time share**, not
  click-through rate.
- Title testing has been reported by third parties as rolling out [3P]; it was not confirmed on the Help page.

## Chapters (support.google.com/youtube/answer/9884579)

- Timestamps in the description: the first must be `00:00`, at least three, in ascending order, each chapter at least
  10 seconds.
- Manual chapters replace automatic chapters for that video.
- Unavailable when the channel has active strikes or the content may be inappropriate for some viewers.

```text
00:00 the 30-day rule I set my agents
01:12 week one: why the first posts flopped
03:40 the 3am post that did numbers
06:05 what I stopped approving
09:20 the numbers after 30 days
11:30 what I'd do differently
```

## End screens (support.google.com/youtube/answer/6388789)

- Video at least 25 seconds; elements sit in the last 5–20 seconds.
- Up to four elements on 16:9 videos.
- Not available on videos set as made for kids. Viewers can hide them.

## Altered or synthetic content disclosure (support.google.com/youtube/answer/14328491)

Disclose when the video has realistic content that was made or altered with AI and could be mistaken for real:

- a real person made to appear to say or do something they didn't;
- altered footage of real events or places;
- a realistic scene that didn't happen. A photoreal AI character such as Claudia in a realistic setting falls here:
  disclose.

Exempt: scripts and ideas, thumbnails, colour filters and beauty filters, upscaling, cloning your own voice for
voice-over, and clearly unrealistic content such as animation or fantasy. Repeated non-disclosure can lead to removal or
suspension from the YouTube Partner Program.

How: Studio → Details → **Altered or synthetic content** → Yes. Via API, `status.containsSyntheticMedia: true`, which
`@useclaudia/social` sets when `labels.ai` is on (the default). More:
[../../ai-disclosure-and-provenance/references/platform-rules.md](../../ai-disclosure-and-provenance/references/platform-rules.md).

## Monetisation: inauthentic content (support.google.com/youtube/answer/1311392)

- The policy section was renamed from "repetitious content" to "inauthentic content" on 2025-07-15.
- Not monetisable: content that "looks like it's made with a template", "similar or repetitive content with low
  educational value, commentary, narratives, or minimal variation", and "AI-generated content made with generic or
  unoriginal templates giving the impression of mass production".
- Allowed: shared intros and outros when the bulk differs; series where each video has a distinct storyline; "using AI
  to visualize a unique character and narrative you invented" and "using AI to edit your video scripts".

## Upload through @useclaudia/social

```ts
const v = social.draft({
  text: "<description with chapters, sources and the AI note>",
  media: [{ path: "./out/final-16x9.mp4" }],
  targets: [{ account: youtube.id }],
  labels: { ai: true },                       // sets containsSyntheticMedia
  options: { youtube: { title: "<title ≤ 100 chars>", privacyStatus: "private", tags: ["<tag>", "<tag>"] } },
});
social.submit(v.id);                           // a person approves; the upload stays private until reviewed in Studio
```

Projects that Google hasn't audited can only upload private videos; publish from Studio after review. Setup, quotas and
errors: [../../../grow/youtube-shorts-playbook/references/youtube-api-upload.md](../../../grow/youtube-shorts-playbook/references/youtube-api-upload.md).
