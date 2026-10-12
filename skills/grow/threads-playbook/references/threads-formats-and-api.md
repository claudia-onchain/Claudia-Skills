# Threads formats, discovery, AI labels and API limits

Read this before planning Threads content, when a Threads publish fails for length, media or limits, and before
promising anything about how Threads ranks posts. Checked 2026-10 on developers.facebook.com and about.fb.com.

## Post formats and limits (Threads API docs)

| Item | Limit |
|---|---|
| Text | 500 characters; emoji count as their UTF-8 byte length |
| Links | up to 5 unique links per post; since 22 December 2025 more fails with `THREADS_API__LINK_LIMIT_EXCEEDED` |
| Link preview (`link_attachment`) | text-only posts only |
| Text attachment | up to 10,000 characters of long text, with bold, italic, highlight, underline, strikethrough; text-only posts, not with a poll |
| Carousel | 2–20 items, images, videos or mixed; counts as one post against limits |
| Images | JPEG or PNG; up to 8 MB; width 320–1440 px (scaled outside that); aspect ratio up to 10:1; sRGB |
| Video | MOV or MP4; up to 300 seconds (5 minutes); up to 1 GB; 23–60 fps; max width 1920 px; 9:16 recommended; H.264 or HEVC, AAC audio |
| Topic tag | one per post; 1–50 characters; no periods or ampersands. In-text `#tags` work too: the first valid one is used |
| Poll | 2–4 options, 1–25 characters each; text-only posts |
| GIF | GIPHY only; text-only posts |
| Disappearing ("ghost") post | text only, auto-archived after 24 hours, can't be a reply; spoilers are the only extra |
| Reply control | `everyone`, `accounts_you_follow`, `mentioned_only`, `parent_post_author_only`, `followers_only`; reply approvals can be turned on per post |
| Alt text | `alt_text` per image or video |

Publishing parameters the API documents (`POST /{user-id}/threads`): `text`, `media_type`, `image_url`, `video_url`,
`children`, `alt_text`, `link_attachment`, `text_attachment`, `poll_attachment`, `gif_attachment`, `topic_tag`,
`quote_post_id`, `reply_to_id`, `reply_control`, `enable_reply_approvals`, `is_ghost_post`, `is_spoiler_media`,
`location_id`, `allowlisted_country_codes`. There is **no AI-label parameter**.

## Publishing limits (Threads API docs)

| Limit | Per 24 hours |
|---|---|
| API-published posts (carousel = 1) | 250 |
| Replies | 1,000 |
| Deletes | 100 |
| Location searches | 500 |
| API calls | 4,800 × number of impressions (minimum 10) |

`@useclaudia/social` adds its own default cap: 25 published Threads posts per account per 24 hours, 5 link posts,
and blocks near-duplicates for 24 hours.

## How the package reaches Threads

| Route | Setup | Notes |
|---|---|---|
| Your own Meta app (`threads`) | developers.facebook.com → Business app → Threads API use case → redirect `https://useclaudia.xyz/relay/oauth/callback` → id + secret under `threads` | Scopes `threads_basic threads_content_publish`. Media must be public https URLs or go through `mediaRelay`. Long-lived tokens (60 days) are refreshed a week before expiry. Standard Access is enough for accounts with a role on your app |
| Buffer, Zernio or Upload-Post | connect Threads inside the service, store the service key | Each channel appears as `threads … via <service>`; their plans apply |

The package has no Threads inbox. Replies are read and written in the Threads app.

Text label: Threads has no native AI flag in the API, so `labels.ai` (default on) appends `(AI-generated)`.

## AI labels on Meta apps

From Meta's newsroom (checked 2026-10):

- February 2024, "Labeling AI-Generated Images on Facebook, Instagram and Threads": "We'll require people to use this
  disclosure and label tool when they post organic content with a photorealistic video or realistic-sounding audio that
  was digitally created or altered, and we may apply penalties if they fail to do so."
- April 2024 onward: labels are applied when Meta detects industry-standard AI signals (C2PA, IPTC) or when people
  self-disclose. On 1 July 2024 "Made with AI" became "AI info". From 12 September 2024, content only edited with AI
  shows the label in the post menu; content detected as AI-generated shows it on the post.

Practical rule for an AI character on Threads:

1. Every post: `(AI-generated)` in the text (the package does it) and "AI-generated image:" alt text.
2. Keep C2PA/IPTC metadata in generated files; Meta reads them.
3. Photoreal video or synthetic voice: post in the app with the AI label, or don't post it on Threads.

## Discovery tools Meta has shipped

| Feature | Date | What it means for a character account |
|---|---|---|
| Communities | October 2025 (100+ topics), 200+ topics by 15 December 2025, out of beta June 2026 | Join by name or by tapping a community tag; membership shows on the profile. Champion badges go to members who are highly followed there, post regularly and keep replies active. Flair labels what you discuss |
| Disappearing posts | October 2025 | Text-only posts that archive after 24 hours |
| Dear Algo | February 2026 | Viewers post "Dear Algo, show me more …" to adjust their feed for 3 days, or repost someone else's request |
| Live chats | April 2026, expanding with Communities | Real-time chats inside Communities |
| Your Algo | June 2026 (US, Canada, UK, Australia, New Zealand) | Private requests for more or less of a topic for 1, 3 or 7 days |
| 500 million monthly users | June 2026 | |

Meta does not publish the Threads ranking model's weights. What can be said safely: topics are explicit (topic tags,
Communities, Dear Algo and Your Algo all work by topic), so an account that stays on a few clear topics is easier to
surface, and replies are the core interaction.

## Sources

- https://developers.facebook.com/docs/threads/posts
- https://developers.facebook.com/docs/threads/overview and https://developers.facebook.com/docs/threads/troubleshooting
- https://developers.facebook.com/documentation/threads/reference/publishing.md
- https://developers.facebook.com/documentation/threads/create-posts/text-attachments.md
- https://developers.facebook.com/documentation/threads/create-posts/polls.md
- https://developers.facebook.com/documentation/threads/create-posts/ghost-posts.md
- https://about.fb.com/news/2024/02/labeling-ai-generated-images-on-facebook-instagram-and-threads/
- https://about.fb.com/news/2024/04/metas-approach-to-labeling-ai-generated-content-and-manipulated-media/
- https://about.fb.com/news/2025/10/introducing-threads-communities-find-your-people/
- https://about.fb.com/news/2025/10/introducing-disappearing-posts-on-threads/
- https://about.fb.com/news/2026/02/threads-dear-algo/
- https://about.fb.com/news/2026/04/threads-live-chats/
- https://about.fb.com/news/2026/06/meta-launching-new-features-500-million-monthly-threads-users/
- @useclaudia/social README, "Instagram, Facebook, Threads" setup and network table (checked 8 Oct 2026)
