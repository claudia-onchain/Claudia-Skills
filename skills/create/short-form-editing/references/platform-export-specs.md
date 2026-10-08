# Platform export specs for vertical video (checked 2026-10)

Read before exporting. Platforms change limits often; numbers marked [3P] come from third-party guides because the
platform publishes no single spec page. Re-check anything load-bearing before a launch.

## One master that works everywhere

1080×1920 (9:16), H.264 High profile, yuv420p, constant 24 or 30 fps, AAC-LC 48 kHz stereo 128–192 kbps, MP4 with
`+faststart`, loudness about -14 LUFS integrated with true peak ≤ -1 dBTP.

## Per platform

| Platform | Max length | File size | Notes |
|---|---|---|---|
| TikTok | 60 min uploaded; 10 min recorded in-app [3P] | ~72 MB Android, ~287.6 MB iOS, 500 MB web (in-app upload limits) [3P] | 23–60 fps [3P]. Through the API/posting services the caption limit is 2,200 chars (in-app 4,000). |
| Instagram Reels | 20 min (raised from 3 min in late 2025); Reels over ~3 min are reportedly not recommended to non-followers [3P] | 4 GB [3P] | The profile grid crops covers to 3:4 (1080×1440). |
| YouTube Shorts | 3 min (since Oct 2024); vertical or square up to 3 min is detected as a Short automatically, `#Shorts` not required [3P] | 256 GB | Min 720×1280, max 2160×3840 [3P]. A Short over 1 min with any active Content ID claim is blocked worldwide (YouTube Help 15424877). |
| X | 140 s / 512 MB on standard accounts; Premium up to 4 h on web/iOS (2–4 h at 720p), 16 GB; Android 10 min | see length column | help.x.com blocked fetching; figures from search snippets and postfa.st [3P]. |

Practical length targets for Claudia's content: 7–15 s (UGC moments), 20–45 s (storytime/how-to), never over 60 s if
the track might get a Content ID claim on YouTube.

## Safe zones on a 1080×1920 frame [3P — no app publishes official organic numbers]

| App | Keep clear: top | bottom | right |
|---|---|---|---|
| TikTok | ~100 px | ~250–350 px | ~100–164 px |
| Instagram Reels | ~250 px | ~280 px (Meta's ads guide: bottom 35 % ≈ 670 px) | ~100 px |
| YouTube Shorts | ~100 px | ~180 px | ~80 px |
| **Use everywhere** | **centred ~900 × 1400 px area** for faces, captions and text | | |

Put captions in the centre or upper-middle; keep out of the top and bottom 10 %.

## Covers and stills

- Reels cover: upload 1080×1920; the grid shows the centre 1080×1440 (3:4). Keep the face and title inside the centred
  1080×1350 to survive 9:16, 4:5 and 3:4 crops.
- YouTube long-form thumbnail: 1280×720. Shorts thumbnails are picked from a frame in the mobile app.
- Full cover and banner sizes: [../../thumbnails-and-covers/SKILL.md](../../thumbnails-and-covers/SKILL.md) and
  [../../banner-and-collage-design/SKILL.md](../../banner-and-collage-design/SKILL.md).

## Sources (checked 2026-10)

- postiz.com/blog/vertical-video-dimensions · heyorca.com/blog/tiktok-media-specs-best-practices-2026 ·
  recurpost.com/tiktok-scheduler/tiktok-video-sizes · inro.social (Reels 20 min; safe-zone checker) ·
  shortsync.app/resources/youtube-shorts-upload-requirements-2026 · support.google.com/youtube/answer/15424877 ·
  postfa.st/sizes/x/video · hopperhq.com/blog/instagram-reel-size · blitzcutai.com/blog/best-caption-size-tiktok-2026
