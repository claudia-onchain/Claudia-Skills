# Example: "my agents posted 31 times" — one idea, three carousels

A worked run of the skill for Claudia's weekly "Desk at Dusk" series, week 41. Budget cap for art: $0.60. Numbers in the
slides are the account's own (from the weekly review), not claims about anyone else.

## 1. Platform and canvas

| Platform | Size | Slides | Posting path |
|---|---|---|---|
| Instagram | `ig-4x5` 1080×1350 | 8 | `@useclaudia/social`, JPEG |
| TikTok photo mode | `tiktok` 1080×1920 | 9 (hook split into two slides) | TikTok app, by the operator |
| LinkedIn document | `linkedin` 1080×1350 | 10 (adds a "how I measured it" page and a framework page) | LinkedIn app, by the operator |

## 2. Spine: numbered list

```text
1  hook: my agents posted 31 times. *6* did the work — none — image: yes
2  point: the six had one thing in common — they showed the work, not the result — image: no
3  point: 01 show the desk — in-progress shots got 2.4x the saves of finished ones — image: no
4  picture: the desk at dusk — none — image: yes (re-hook)
5  point: 02 end on a question I answer — replied-to questions → most follows per 1,000 views — image: no
6  point: 03 one idea per post — the two-idea posts were the bottom three — image: no
7  payoff: next week: 4 posts, not 31 — fewer, better, answered — image: no
8  cta: which one would you try first? — I'll answer every reply tonight — image: no
```

Check: slide 7 pays off "6 did the work" (the three habits behind the six, and the plan). Slide 4 re-hooks with an image.

## 3. Hook

Formula: specific number + result. `my agents posted 31 times. *6* did the work` (8 words, one accent). Grid check: text
starts 88 px from the left edge, so the 3:4 tile keeps every letter.

## 4. Art (2 images, Nano Banana 2.1, 2K, 4:5)

```sh
claudia generate image "[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black jaw-length blunt bob and heavy straight bangs; one peach-orange streak panel through the front bangs on one side, the rest jet-black; a small peach star-shaped hair clip at the side; a thin headset microphone along her cheek; light freckles across the nose and cheeks; grey-green eyes; straight dark brows; glossy coral lips; a cool, direct gaze; natural skin texture with visible pores. She wears a cropped white puffed-sleeve shirt with a star pin and sits at a white desk at dusk, laptop open with a chrome star sticker, looking at the screen with a small dry smile. Medium shot from the left at eye level, 50mm, her face in the upper third, the lower 40% of the frame in soft shadow with an empty desk surface. Cool clean grade, lifted blacks, gentle film grain, chrome highlights. No text, no logos. Vertical 4:5 frame." \
  --model google/nano-banana-2.1 --aspect 4:5 --resolution 2K \
  --ref refs/claudia/01-front-neutral.jpg,refs/claudia/05-laugh.jpg --max-usd 0.10
```

- Run 1: mic missing. Added "the thin headset microphone clearly visible along her left cheek". Run 2: kept.
- Slide 4 (desk only, no face): same grade line, "a white desk at dusk, a laptop with a chrome star sticker, a mug, a
  film camera, a sticky note with no writing, window light turning blue", 4:5. One run, kept.
- TikTok versions: the same two prompts at `--aspect 9:16`, face in the upper third, lower half dark.
- Spend: 4 images × ~$0.05 + 1 retry = about $0.25, under the cap.

## 5. Layout (`work/w41-ig/slides.json`, first and fifth slides shown)

```json
{
  "size": "ig-4x5",
  "series": "desk at dusk · week 41",
  "handle": "@claudia",
  "slides": [
    { "type": "hook", "title": "my agents posted 31 times. *6* did the work", "image": "art/w41-desk-claudia.jpg", "imagePos": "40% 25%",
      "alt": "AI-generated image: Claudia, black bob with a peach streak and a headset mic, smiling at a laptop with a chrome star sticker at dusk. Text: 'my agents posted 31 times. 6 did the work'." },
    { "type": "point", "n": 2, "title": "end on a *question* I answer", "body": "Posts where I answered the replies brought the most follows per 1,000 views.",
      "alt": "Text slide 5: '02 end on a question I answer'. Posts where I answered the replies brought the most follows per 1,000 views." }
  ]
}
```

```sh
node scripts/build-carousel.mjs work/w41-ig/slides.json work/w41-ig/out --render
# Instagram 4:5 (in-app 20 slides, API 10): 8 slides at 1080x1350 → …/w41-ig/out
#   check  slide 3: 47 words (aim for ≤ 45 on a point slide)
```

Slide 3 was cut from 47 to 31 words ("in-progress shots got 2.4x the saves of finished ones. people like the mess."),
then re-rendered. Phone check at arm's length: all eight readable; the counter on slide 1 shows `1 / 8 →`.

## 6. Export

- Instagram: the eight PNGs → JPEG with ffmpeg (`-q:v 2`), 8 files, 300–700 KB each.
- TikTok: nine 1080×1920 PNGs from `work/w41-tt/out`, uploaded in order in the app, slide 1 as cover.
- LinkedIn: `work/w41-li/out/deck.pdf`, 10 pages, one page size (810×1012.5 pt = 1080×1350 px), 2.1 MB.

## 7. Copy and labels

```text
Instagram: my agents posted 31 times this week. 6 did the work. which one would you try first? #aicharacter #contentstrategy #creatortips
           (AI info label on via is_ai_generated; alt text per slide from alt-text.txt)
TikTok:    title "31 posts, 6 that worked" · description "the three habits behind the six. which one would you try first? #aicharacter #contenttips"
           (More options → AI-generated content: on)
LinkedIn:  document title "31 posts, 6 that worked: what my agents' week taught me"
           post text: "I'm an AI character and my agents post for me. This week 6 of 31 posts did most of the work. Three habits explain it. (AI-generated)"
```

No coin mentions, nothing paid or gifted, so no `#ad` and no NFA line.

## 8. Publish

The Instagram draft went through `social.preview()`: 8 media, `labelsAdded: ["Instagram is_ai_generated"]`, no warnings,
then `submit()`. The operator approved it in the dashboard and scheduled it for Tuesday 18:00 New York. The TikTok and
LinkedIn uploads were done by the operator the same evening from the exported files.

## 9. Review (48 hours later)

| Platform | Reach | Saves | Shares | Follows | Note |
|---|---|---|---|---|---|
| Instagram | 6,900 | 212 | 41 | 58 | most swipes dropped after slide 6 |
| TikTok | 11,400 | 380 | 66 | 94 | the split hook held |
| LinkedIn | 3,100 | — | 12 | 27 | the framework page drew most comments |

Decision for week 42: keep the numbered spine, move the payoff one slide earlier on Instagram, and test a "mistake"
hook against the "number" hook (one variable).
