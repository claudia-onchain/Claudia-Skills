# UTM conventions and the limits of attribution

Read this in Step 3 before tagging a campaign, and before writing any sentence in a report that says one platform
"drove" sign-ups. Checked 2026-10.

## The five parameters (plus one)

| Parameter | Our rule | Examples |
|---|---|---|
| `utm_source` | The surface the link sits on | `x`, `tiktok`, `instagram`, `threads`, `youtube`, `telegram`, `discord`, `bluesky`, `farcaster`, `claudia-thread`, `partner`, `newsletter` |
| `utm_medium` | How it was delivered | `social` (post), `social-paid` (boosted/ad), `bio` (link in bio), `story`, `community` (Telegram/Discord), `dm` (only replies to people who asked), `email`, `referral`, `affiliate`, `qr` |
| `utm_campaign` | `YYYY-MM-name` | `2026-10-skills-launch`, `2026-11-northpine-fold` |
| `utm_content` | Post or variant | `claudia-rain-run-v2`, `thread-part-6`, `hook-b` |
| `utm_term` | Rarely; keyword or audience segment | `search-agent-skills` |
| `utm_id` | Optional campaign id that matches the sheet | `c2026-10-01` |

Google Analytics 4 reads all of these (plus `utm_source_platform`, `utm_creative_format`, `utm_marketing_tactic`).
Most analytics tools treat values as case-sensitive: `TikTok` and `tiktok` become two sources. Lowercase always.

Rules:
- Lowercase, hyphens, no spaces or underscores (`scripts/utm.mjs` normalises and validates).
- Never put personal data (handles of real people, emails, user ids) in a parameter.
- One link per placement, so each `utm_content` maps to one row in the KPI sheet.
- Tag links to your own properties only, unless a partner asks for their own UTMs (use theirs).
- Bio links: `utm_medium=bio`, `utm_content=<what the bio currently promotes>`; change `utm_content` when the bio
  changes so the sheet can tell periods apart.
- Link shorteners: fine for readability on Telegram/Discord; keep the full tagged URL in the sheet. On X, every URL
  counts as 23 characters anyway.

## Building links

```sh
node scripts/utm.mjs --url https://useclaudia.xyz/skills --source x --medium social \
  --campaign 2026-10-skills-launch --content thread-part-6
node scripts/utm.mjs --csv templates/utm-plan.csv > utm-plan.filled.csv
```

## What attribution can and can't see

1. **Last click only.** UTMs record the link that was clicked. Someone who watched three TikToks, then searched
   "useclaudia" and signed up shows as direct/organic search. TikTok and Instagram bios hide most of the journey.
2. **In-app browsers** (TikTok, Instagram, X) often drop cookies when the person later opens the site in their real
   browser. Sign-ups get split across sessions.
3. **Dark social.** DM shares and group chats arrive with no referrer. A spike in "direct" traffic right after a post
   with high sends is likely that post.
4. **View-through** (saw it, didn't click, came back later) is invisible without platform conversion APIs.
5. **Ad blockers and privacy settings** remove a share of sessions entirely; treat counts as a floor.

How to report honestly:
- Say "UTM-attributed sign-ups" not "sign-ups from TikTok".
- Show the unattributed share: "212 sign-ups, 131 with a UTM (62 %); the rest direct/search".
- Add a "how did you hear about us?" field on sign-up (one optional dropdown). Report it next to UTM data; the two
  disagree usefully.
- For brand recaps, give clicks and UTM conversions, plus promo-code redemptions if the brand tracks them.
- Don't credit a post with conversions that happened before it went live, or more than 7 days after (state the window).

## Incrementality without a lab

- **Holdout weeks**: pause links on one platform for a week and see whether direct sign-ups drop.
- **Geo or time splits**: post the CTA only in the evening window on alternate days.
- **Unique codes**: a code per platform (CLAUDIA-TT, CLAUDIA-X) for offers; codes survive app browser loss.
These are tests; run them through [growth-experiments](../../growth-experiments/SKILL.md).

Sources: Google Analytics campaign URL parameters https://support.google.com/analytics/answer/10917952 (checked 2026-10);
X link counting https://www.socialync.io/blog/x-twitter-articles-strategy-2026 (checked 2026-10).
