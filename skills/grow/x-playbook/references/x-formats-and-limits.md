# X formats, limits and specs

Read this when preparing media or long content for X, or when a post fails for length or file reasons. Checked 2026-10.

## Text

| Item | Limit | Notes |
|---|---|---|
| Standard post | 280 weighted characters | Most emoji and CJK count as 2; the package counts with `countX` |
| URL | 23 characters each | Any length, wrapped in t.co |
| Premium long post | 25,000 characters | Feed shows ~280 before "Show more" — the first line still has to hook |
| Article (Premium) | 25,000 characters, rich formatting, images, video | Indexed by search engines; post in the app |
| Bio | 160 characters | State AI + who runs it |
| Display name | 50 characters | |
| `$cashtag` per API post | 1 | X API rule |
| Hashtags | no hard cap | Use 0–1; piles look spammy |

The Claudia package targets the standard 280 limit. Long posts and Articles are best done by the operator in the app with an
"AI-generated, reviewed by {name}" line.

## Images

- Up to 4 per post. JPG, PNG, WEBP, GIF (animated GIF counts as the only media).
- Feed crops: 16:9 for one image on desktop; 4:5 and 1:1 survive best on mobile. For a single portrait-oriented image use
  4:5 (1080×1350) so faces aren't cropped. Two images: each shows ~7:8.
- Alt text up to 1,000 characters. Always include "AI-generated image:" first.
- Avatar 400×400 (shown as a circle). Header 1500×500 (3:1); some devices crop ~60 px top and bottom.

## Video

| Account | Length | File |
|---|---|---|
| Non-Premium | 140 s (2:20) | up to 512 MB; check the composer — some 2026 reports show longer limits rolling out |
| Premium | up to 4 h on web/iOS (2–4 h at 720p); Android 10 min | larger files |

- MP4 (H.264, AAC). 9:16, 1:1 and 16:9 all play; 1:1 or 4:5 take the most feed space on mobile.
- Captions burned in; most people watch muted.
- Keep vertical TikTok/Reels cuts but trim the outro and any "follow for part 2" lines.
- The Claudia package allows 1 video or up to 4 images per post.

## Threads (multi-post)

- Each part ≤ 280 weighted characters; number parts ("1/") only if it helps readability.
- Part 1 carries the hook and the promise ("Thread ↓" is fine). Put links in the final part.
- The package saves each part as it goes live; a retry resumes after the last live part.
- 4–8 parts is the sweet spot; past 10, completion drops.

## Quote posts

- Quote to add a real opinion or context, never just "this". A quote is not a reply, so it isn't subject to the API reply rule,
  but don't use quoting as a workaround to hit strangers' posts at volume.

## Polls

- Up to 4 options, 25 chars each, 5 min–7 days. Polls are created in the app; good for community questions.

## Spaces

- Live audio, host + up to 2 co-hosts + speakers; recordable. Best for AMAs with the operator present.

## XChat

- Group chats with joinable links (350 members, expanding to 1,000), end-to-end encryption, no ads. Replacement for
  Communities after their May 2026 shutdown.

## Sources

- https://postfa.st/sizes/x/video and https://postfa.st/sizes/x/header (checked 2026-10)
- https://www.socialync.io/blog/x-twitter-articles-strategy-2026
- https://publer.com/docs/posting/create-posts/content-types/platform-specific-formats/twitter-x-long-form-posts
- https://www.engadget.com/social-media/x-is-shutting-down-its-communities-feature-182843958.html
- @useclaudia/social README → Networks and tiers (checked 8 Oct 2026)
