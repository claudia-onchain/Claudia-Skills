# Threads playbook (checked 2026-10)

Read this when adding Threads to the plan or when Threads posts get no replies.

## Facts

| Item | Detail |
|---|---|
| Users | 500 M monthly (Meta, June 2026) |
| Text | 500 characters per post + optional text attachment up to 10,000 characters (shown on tap) |
| Media | Up to 10 photos/videos in the app; the API allows carousels up to 20 items |
| Links | 1 link attachment per post (link previews) |
| Tags | One topic tag per post works best; Communities (100+, with chats and co-hosts) for interest spaces |
| API | Threads API (your own Meta app) or posting services; `@useclaudia/social` supports text, media, carousels, threads (multi-part), replies |
| Cap in `@useclaudia/social` | 25 posts per account per 24 h |
| AI disclosure | Text "(AI-generated)" added by `@useclaudia/social`; plus Meta's AI label in the app for realistic media |

## What gets distribution on Threads

- **Replies and conversation depth** — posts that start a back-and-forth (questions, light disagreements, "which one").
- **Recency** — Threads is fast; a post's life is ~24 h.
- **Native text** — a reposted Instagram caption with five hashtags reads like an ad.
- **Profile consistency** — the same voice every day. For Claudia: dry, warm, a little self-aware about being AI.

## Formats for a character account

1. **Observation** — "the city is doing that thing where every window is gold and nobody is looking up"
2. **Two-option question** — "rain walk or sunset bedroom for tomorrow's clip? i'll do the losing one too, eventually"
3. **Micro-story thread** (3 parts) — setting → small problem → small twist. Use `thread: [...]` in the draft.
4. **Behind the scenes** — "spent 40 minutes getting the orange clip to stay orange. this is my life now (i'm AI)"
5. **Reply to a peer** — a thoughtful reply to a creator in a nearby niche. Written or approved by the person; never an
   automated reply to strangers.

Avoid: engagement bait ("reply 'yes' for…"), follow trains, posting the same line on Threads and X at the same minute
(near-duplicate rules apply per account, but audiences overlap and notice), and anything about coin prices.

## Example draft (multi-part)

```ts
const t = social.draft({
  text: "got caught in the rain on the way to the rooftop",
  thread: [
    "the plan was golden hour. the sky said: no",
    "so now it's a rain clip. honestly better. posting it tonight",
  ],
  targets: [{ account: th.id }],
  labels: { ai: true },
});
console.log(social.preview(t.id)); // check each part ≤ 500 chars and the disclosure
social.submit(t.id);               // a person approves before publish/schedule
```

If one part fails, a retry continues after the last part that went live (threads resume); nothing is posted twice.

## Cadence

- 1–3 posts a day, at least 2 h apart; one of them a question.
- Reply to replies within the first 2 h (by the person, or agent drafts the person approves; see
  [../../engagement-and-replies/SKILL.md](../../engagement-and-replies/SKILL.md)).
- Cross-post a Reel at most once with a native line.

## Sources

- Meta, new features for 500 million Threads users (June 2026) — https://about.fb.com/news/2026/06/meta-launching-new-features-500-million-monthly-threads-users
- Threads API, posts — https://developers.facebook.com/docs/threads/posts
- Threads Communities — https://techcrunch.com/2025/10/02/threads-takes-on-x-with-new-communities-feature
- Text attachments up to 10,000 characters — https://typecount.com/blog/threads-character-limit
