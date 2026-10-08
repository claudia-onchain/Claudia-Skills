# Reels ranking signals and specs (checked 2026-10)

Read this when planning formats, setting export settings, or diagnosing a Reel that stalled. Numbers move; re-check the
sources below every quarter and update the date.

## What the ranking system weighs

Instagram ranks each surface (Feed, Reels tab, Explore, Stories) with its own models. For Reels shown to **non-followers**,
the public statements from Adam Mosseri and Instagram's "How Instagram ranks" pages point to:

| Signal | What it means | How to move it |
|---|---|---|
| Sends (DM shares) | People forwarding the Reel to a friend | Relatable situations, "this is you" hooks, specific humour |
| Watch time / completion | Average seconds watched, share who finish, rewatches | Short loops (7–15 s), no slow intro, a payoff at the end |
| Likes per reach | Light-weight approval | Less important for non-followers than sends |
| Saves | "I'll come back to this" | How-to carousels and "how I made this" Reels |
| Follows from the Reel | The person wants more | A clear recurring character and series name |
| Originality | Native, first-time content | No watermarks, no reposts, no lightly edited clips |

Mosseri has said sends carry roughly 3–5x the weight of likes for reach to non-followers (reported via SocialPilot, 2026).
His 31 Dec 2025 year-end memo said polished perfection is over and that Instagram will weigh authenticity and provenance
signals more; for an AI character that means: label honestly, keep a recognisable personality, avoid generic "AI glamour".

### Originality and aggregators

- Accounts that mostly repost others' content within a rolling 30 days are classed as aggregators and get less
  recommendation reach on Reels, Explore and Feed (extended to photos and carousels in 2025–26).
- Reposting your own TikTok with the TikTok watermark is treated as low-originality. Export a clean master.
- "Lightly edited" (a border, a speed change, a caption on someone else's clip) does not count as original.

### What is not recommended to non-followers

Per Instagram's Recommendations Guidelines: content that is low quality or watermarked, engagement bait, misleading health
or financial claims, contests that require tagging, and content from accounts with recent violations. Promotion of
regulated financial products and "get rich quick" content is a recommendations risk even when it is allowed on the profile.

## Specs

| Item | Spec |
|---|---|
| Aspect | 9:16, 1080×1920 (upload 1080p; 4K is downscaled) |
| Length | Up to 20 min for eligible accounts (since Dec 2025); recommendation to non-followers effectively ≤ 3 min |
| Codec | H.264 or HEVC, AAC audio 48 kHz, 30 fps (60 fine), moov atom at the start (faststart) |
| Cover | 1080×1920 JPEG; the profile grid crops to 3:4 (1080×1440) from the centre |
| Safe zone | Keep text out of top ~220 px, bottom ~320 px, ~60 px each side (UI buttons, caption) |
| Caption | 2,200 characters; ~125 visible before "more" |
| Hashtags | Max 5 per post/Reel (enforced since Dec 2025) |
| Collaborators | Up to 5 (post appears on 6 profiles) |
| API images | JPEG only via Instagram's content publishing API |
| Alt text | Up to 1,000 characters via the API for images |

`@useclaudia/social` publishes Reels as `media_type: REELS` with `share_to_feed: true`, sets `is_ai_generated` when the AI
label is on, and caps Instagram at 20 posts per account per 24 h.

## Hook patterns that earn sends (for a character account)

1. **POV situation** — "POV: you said you'd be home by 11." Character acts it out.
2. **The tiny confession** — "I'm an AI and I still can't pick a coffee order." Honest, self-aware, sendable.
3. **Place + mood** — "Rooftop, 7:42 pm, the city turning gold." A loop people rewatch.
4. **Two options** — "Rain walk or sunset bedroom? Pick one, I'll post the other tomorrow." Comments + a reason to return.
5. **Behind the prompt** — first 2 s show the finished frame, then the prompt on screen. Saves.

Avoid hooks that state a price, a coin, or a return. They are both a policy risk and weak sends.

## Diagnosing a Reel that stalled

| Symptom (after 48 h) | Likely cause | Fix next time |
|---|---|---|
| < 20% of views from non-followers | Not recommended (originality, eligibility, bait) | Check Account status; remove watermark; drop bait CTA |
| Avg watch < 40% of length | Slow start or too long | Cut first 1 s; trim to the payoff |
| Good watch time, few sends | Not relatable or not specific | Name the situation in the hook text |
| Many likes from followers, no new follows | Fan content, no series hook | Add a recurring series name and a "part 2" that delivers |
| Views drop to near zero for all posts | Possible violation or restriction | Account status; stop posting, read the notice, appeal if wrong |

## Sources

- Instagram Help: How Instagram uses AI and ranking — https://about.instagram.com/blog/announcements/instagram-ranking-explained
- Instagram Recommendations Guidelines — https://help.instagram.com/313829416281232
- SocialPilot, Instagram Reels algorithm 2026 — https://www.socialpilot.co/blog/instagram-reels-algorithm
- Posteverywhere, how the Instagram algorithm works 2026 — https://posteverywhere.ai/blog/how-the-instagram-algorithm-works
- Hashtag cap (Dec 2025) — https://www.blogdumoderateur.com/instagram-limite-hashtags-5-par-publication/
- Meta content publishing API — https://developers.facebook.com/docs/instagram-platform/content-publishing
