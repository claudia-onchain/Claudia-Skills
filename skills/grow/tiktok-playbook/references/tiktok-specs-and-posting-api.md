# TikTok specs and the three publishing paths

Read this when exporting video for TikTok, choosing how the agent uploads, or debugging an upload. Checked 2026-10.

## Specs

| Item | Value |
|---|---|
| Aspect / size | 9:16, 1080×1920 (720p minimum) |
| Codec | H.264 MP4 (or MOV), AAC audio |
| Length | up to 10 min recorded in-app; up to 60 min uploaded |
| Recommended | 7–15 s (mood/loop), 20–45 s (story/answer), 61–90 s (tutorial, Creator Rewards length) |
| Caption | 4,000 chars in the app; 2,200 through the Content Posting API; ~100 visible in the feed |
| Hashtags | 3–5 specific |
| Photo Mode | 4–35 images, 9:16 1080×1920, ≤ 20 MB each, JPG/PNG; app or verified-domain API only |
| Cover | pick a frame with her face + 3–5 words of text — see [thumbnails-and-covers](../../../create/thumbnails-and-covers/SKILL.md) |
| Safe zone | keep text out of the bottom ~20% and right ~15% |

## Path 1 — posting service (recommended to start)

Connect the TikTok profile inside Zernio or Buffer, then give the Claudia package the service key.

```sh
claudia keys set zernio            # API key from zernio.com/dashboard/api-keys
claudia connect zernio
claudia accounts --all             # TikTok shows as its own account (via: zernio)
```

- Zernio uploads media to its own storage; TikTok posts default to `SELF_ONLY` unless you pass
  `options.zernio.privacyLevel`. Comments/duet/stitch default off; consent flags are set because a person approved the
  preview in Claudia.
- Buffer needs public media links (the media relay makes 60-minute links).
- Upload-Post's entry plan doesn't include TikTok.
- Cost: the service's plan; TikTok charges nothing per post.

## Path 2 — your own TikTok app

1. developers.tiktok.com → create app → add **Login Kit** and **Content Posting API** (Direct Post) → platform **Desktop**.
2. Redirect URI `http://127.0.0.1:3939/oauth/callback`.
3. Store client key + secret under `tiktok` (`claudia keys set tiktok`), then `claudia connect tiktok`.
4. Until TikTok audits the app, every post is **private (SELF_ONLY)** and the account must be private. Apply for the audit
   with a screen recording of the approval UI (TikTok requires the user to see a preview, choose privacy, and confirm).
5. Videos upload as bytes (`FILE_UPLOAD`). Photo posts need a verified domain — not supported by the package.
6. Options: `options.tiktok = { privacyLevel, allowComment, allowDuet, allowStitch }`. Privacy levels the API accepts:
   `PUBLIC_TO_EVERYONE`, `MUTUAL_FOLLOW_FRIENDS`, `FOLLOWER_OF_CREATOR`, `SELF_ONLY` (the creator's account settings limit
   which are available).
7. TikTok's desktop PKCE uses a hex SHA-256 challenge; the package handles it.

## Path 3 — manual upload with an agent-prepared kit

For important videos, Photo Mode, trending sounds and anything needing in-app editing:

1. The agent exports `ep-04.mp4`, writes the caption, hashtags, cover frame time and the preflight checklist
   (`templates/tiktok-preflight-checklist.md`) into a folder.
2. The operator uploads in the app, sets the AIGC toggle, sound, cover and disclosure, and posts.
3. The agent logs the post URL and time for the weekly review.

## Package rules on TikTok

| Rule | Value |
|---|---|
| Daily cap | 5 videos / 24 h per account |
| AI label | `is_aigc` set from `labels.ai` (default on) |
| Paid | `labels.ad` → `#ad` + `brand_organic_toggle` |
| NFA | auto-added when coin words appear — on TikTok remove the coin talk instead |
| Promises | "100x", "guaranteed returns", "risk-free"… blocked |
| Duplicates | same caption to same account within 24 h blocked |
| Kill switch | `social.killSwitch(true)` stops all uploads and scheduled posts |

## Errors

| Error | Likely cause | Fix |
|---|---|---|
| `unsupported` | photo post via API | post in the app |
| `expired` | token expired | `claudia connect tiktok` again |
| `provider_error` "privacy level" | unaudited app or private account | use SELF_ONLY, or a service |
| `rate_limited` | too many uploads | wait `retryAfterMs` |
| post is private | unaudited app / service default | change "Who can watch" in the app after review |

## Sources (checked 2026-10)

- https://developers.tiktok.com/doc/content-posting-api-reference-direct-post
- https://developers.tiktok.com/doc/content-sharing-guidelines
- https://postfa.st/sizes/tiktok/video and https://postfa.st/sizes/tiktok/carousel
- https://typecount.com/blog/tiktok-caption-character-limit
- @useclaudia/social README → Setup per network → TikTok, Buffer/Zernio/Upload-Post (checked 8 Oct 2026)
