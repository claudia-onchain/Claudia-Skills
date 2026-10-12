# Asset specs for repurposed content (checked 2026-10)

Read this in step 4, when you map moments to assets. Limits move; the platform playbooks linked at the end hold the
detail and their own dates. Numbers marked [3P] come from third-party guides, not the platform's own page.

## Vertical clips

| Platform | Ratio and size | Length that works | Hard limit | Notes |
|---|---|---|---|---|
| TikTok | 9:16, 1080×1920 | 20–45 s for a story, 61–90 s for a how-to | 10 min recorded in-app, 60 min uploaded | caption 2,200 chars through the API; AIGC toggle |
| Instagram Reels | 9:16, 1080×1920 | 7–45 s; up to 90 s for a how-I-made-it | 20 min, but reach to non-followers effectively stops at 3 min | business accounts: Meta Sound Collection only |
| YouTube Shorts | 9:16 (or 1:1) | 20–60 s | 3 min | a Short over 1 min with any Content ID claim is blocked worldwide |
| X video | 9:16, 1:1 or 16:9 | 15–45 s | 140 s without Premium | 1 video or up to 4 images per post via the package |

Clip rules that hold everywhere:

- First frame: the speaker mid-sentence on the hook line. No logo sting, no "hey guys".
- Captions burned in, inside the centred ~900×1400 safe area (positions in
  [../../captions-and-hooks/SKILL.md](../../captions-and-hooks/SKILL.md)).
- Audio about -14 LUFS integrated, true peak ≤ -1 dBTP.
- End on the payoff or a clean loop point, not a fade to a call to action.

## Horizontal highlight

- 16:9, 1920×1080 (or 3840×2160 if the source is 4K). 3–8 minutes of the best 3–4 moments in order, with a 10 s
  cold open. If the long piece is already on YouTube, skip this and link to timestamps instead.
- Chapters, thumbnails and disclosure: [../../youtube-long-form-scripts/SKILL.md](../../youtube-long-form-scripts/SKILL.md).

## Quote cards

- 4:5 (1080×1350) for Instagram and LinkedIn, 1:1 or 16:9 for X, 9:16 for Stories.
- One sentence, 8–25 words, the speaker's name and the source ("from Late Desk ep. 41").
- Verbatim. If you must cut words, use an ellipsis and keep the meaning.
- Alt text: the quote in full plus who said it. If the background or portrait is AI-made, start the alt text with
  "AI-generated image:".

## Carousel

- Instagram: up to 20 slides of photos and videos (raised from 10 in 2024; [3P] guides and press, checked 2026-10),
  all slides share one ratio; 4:5 is the safe choice.
- LinkedIn and TikTok photo posts differ: TikTok Photo Mode takes 4–35 images, app or verified-domain API only (the
  package can't post them).
- 6–10 slides: a cover that states the promise, one idea per slide, a recap slide, a last slide pointing to the full piece.

## X thread

- 5–8 parts, each ≤ 280 weighted characters on standard accounts. Part 1 is the hook and stands alone; the link to the
  full piece goes in the last part (link posts cost $0.20 through the API vs $0.015 plain, checked 2026-10).

## Newsletter

- Subject under ~50 characters, preview text that adds to it, 3–5 takeaways with timestamps, the best clip as a
  linked thumbnail, the full piece link above the fold. Detail: [../../newsletter-writing/SKILL.md](../../newsletter-writing/SKILL.md).

## Text posts

| Network | Limit | Shape |
|---|---|---|
| LinkedIn | 3,000 chars | a lesson in 5–8 short lines, link in the post or first comment |
| Threads | 500 | one sharp line plus context |
| Bluesky | 300 graphemes | one line; the package adds `(AI-generated)` when `labels.ai` is on |

## Where the deeper rules live

- [../../../grow/tiktok-playbook/SKILL.md](../../../grow/tiktok-playbook/SKILL.md)
- [../../../grow/instagram-reels-playbook/SKILL.md](../../../grow/instagram-reels-playbook/SKILL.md)
- [../../../grow/youtube-shorts-playbook/SKILL.md](../../../grow/youtube-shorts-playbook/SKILL.md)
- [../../../grow/x-playbook/SKILL.md](../../../grow/x-playbook/SKILL.md)
- [../../captions-and-hooks/references/platform-caption-rules.md](../../captions-and-hooks/references/platform-caption-rules.md)
