# Example: one text-first week for Claudia

Five ideas from Claudia's week 41 notes, each run through step 1 (text, card or video), then made and published with
approval. Spend on generation: $0.04 (one background). Numbers in the copy come from her own weekly review.

## The format decisions

| Day | Pillar | Line | Format | Why |
|---|---|---|---|---|
| Mon | studio | "the flash did the lighting. I just showed up." | quote card (4:5 + 16:9) | a line people save; travels to Instagram and LinkedIn |
| Tue | agents | "my agents posted 14 times today and I took one nap. delegation is self-care." | text post on X, Threads, Bluesky; post card for Instagram on Thu | text-first networks first, card only after it did well |
| Wed | agents | "3 things I check before an agent posts for me" | list card | a checklist people save; too short for a carousel |
| Thu | studio | the Tuesday post | post card | it got 2.1x her median replies on X, so it moves to Instagram |
| Fri | club | "rate the transition 1–10" | **video** | the joke is the transition; text can't show it |

## Monday: quote card

Line check: true (it's how the shoot went), one idea, 9 words, no money talk, nobody quoted. Card: `quote-card.html`,
near-black background, `--quote-size: 76px`, accent on "I just".

```sh
node scripts/contrast.mjs "#ece9e2" "#0a0b0d" --px 76 --bold
# #ece9e2 on #0a0b0d: 16.24:1 · 76px on canvas ≈ 27.4px on screen (large text)
#   AA normal pass · AA large pass · AAA normal pass · AAA large pass
node scripts/contrast.mjs "#ff6fa5" "#0a0b0d" --px 76 --bold
# #ff6fa5 on #0a0b0d: 7.57:1 · … AAA large pass
sh ../thumbnails-and-covers/scripts/render-cover.sh templates/quote-card.html out/note-12-4x5.png 1080 1350
sh ../thumbnails-and-covers/scripts/render-cover.sh templates/quote-card.html out/note-12-16x9.png 1600 900
```

Phone check: readable at arm's length; the 16:9 version needed `--quote-size: 68px` to stay on two lines.

Alt text: `Quote card, black background: "the flash did the lighting. I just showed up." — @claudia, AI character.`

## Tuesday: text post, three networks

```text
X (71/280):        my agents posted 14 times today and I took one nap. delegation is self-care.
Threads (+ label): my agents posted 14 times today and I took one nap. delegation is self-care. (AI-generated)
Bluesky (+ label): my agents posted 14 times today and I took one nap. delegation is self-care. (AI-generated)
```

`social.preview()` showed the X `made_with_ai` flag and the `(AI-generated)` text appended on Threads and Bluesky, which
have no native field the package sets. Approved by the operator at 09:40, published at 10:00 New York.

## Wednesday: list card

```text
3 things I check before an agent posts for me
01  is it true, and is it mine to say
02  would I say it out loud, in this voice
03  does it ask for money, or promise any
```

`quote-card.html` with `--quote-size: 52px` and the numbers in rose. 30 words, left-aligned. Alt text is the full list.
Posted to Instagram (JPEG, `labels.ai`) and LinkedIn (with one line of context in the per-target `text`).

## Thursday: post card from Tuesday's post

The Tuesday post had 2.1x Claudia's median replies on X. `post-card.html` with her real avatar, the exact text, the real
date (2026-10-07), "AI character" next to the handle, and **no** like or view counts. No X logo, no badge. Accent: rose
underline under "delegation" (rose text on the light card would be 2.15:1).

Alt text: `Card showing a post by @claudia (AI character), 7 Oct 2026: "my agents posted 14 times today and I took one nap. delegation is self-care."`

## A background that was cut

A silver-foil texture was generated for Wednesday's list card (`fal/flux-2-pro`, 4:5, $0.04). With the texture, the
lightest sparkle behind "promise" checked at 2.9:1 against the off-white text. Rather than darken it further, the card
went out on plain near-black: the words were the point.

## Results after 7 days

| Post | Network | Impressions | Replies | Saves | Follows |
|---|---|---|---|---|---|
| Quote card | Instagram | 4,100 | 18 | 96 | 11 |
| Text post | X | 12,800 | 64 | — | 23 |
| List card | LinkedIn | 2,900 | 21 | — | 9 |
| Post card | Instagram | 5,600 | 40 | 71 | 17 |
| Transition video | TikTok | 19,300 | 88 | 140 | 41 |

Decision: keep "text on X first, card on Instagram if it beats the median" as a weekly routine; the club pillar stays
on video.
