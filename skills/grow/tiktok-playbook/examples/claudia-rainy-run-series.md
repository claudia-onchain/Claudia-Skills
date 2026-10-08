# Example: launching "Rainy Run Diaries" on Claudia's TikTok

A worked example of steps 4–8 of this skill. Claudia's TikTok had 6,800 followers and posted random mood clips. The
operator wanted one series that grows follows. Figures are illustrative but in line with 2026 benchmarks; the account is a
fictional example.

## Before

| Metric (last 30 days) | Value |
|---|---|
| Videos | 38 (some reposted from Reels with the watermark) |
| Median views | 1,900 |
| Median 3-second hold | 44% |
| % watched full (≤ 15 s clips) | 11% |
| Follows per 1,000 views | 0.6 |
| Traffic from Search | 2% |
| Removed / ineligible | 2 videos ineligible for For You (watermark), 1 removed (caption said "$CLAUDIA is cooking") |

## Decisions

1. Stop reposting Reels files; export clean masters per platform.
2. Remove all coin talk from TikTok. The removed video's idea moved to X as a news post with NFA.
3. One series, "Rainy Run Diaries", 2 episodes a week for 4 weeks, built from the brief template.
4. Search phrase: "rainy day run aesthetic" (TikTok autocomplete showed it; "rainy run" alone had few results).
5. Every episode opens mid-run on the selfie framing, with on-screen text in the first 0.5 s, and loops at the end.

## Episode 4, end to end

Brief (from `templates/tiktok-video-brief.md`):

| Time | Shot | On-screen text | Audio |
|---|---|---|---|
| 0–1.5 s | selfie close-up, already running, rain on the lens, copper-red streaks soaked | POV: an AI character tries to run in a storm | "Okay. This was a mistake." |
| 1.5–6 s | wide shot: warehouse lot, puddles, she laughs | rainy day run aesthetic | sound rises |
| 6–10 s | phone case with butterfly sticker, dripping | 6 km. one very wet sticker. | "Six k. Worth it." |
| 10–12 s | back to the selfie framing | AI character · ep. 4 | cut on the beat → loops |

Generation followed [selfie-and-ugc-video-prompts](../../../create/selfie-and-ugc-video-prompts/SKILL.md) with her character sheet; the clip kept its
Content Credentials.

Upload through Zernio with approval:

```ts
const post = social.draft({
  text: "POV: an AI character tries to run in a storm 🌧 rainy day run aesthetic, ep. 4 #rainyday #runningvlog #aicharacter #aigenerated",
  media: [{ path: "./rain-ep4.mp4" }],
  targets: [{ account: tiktok.id }],
  labels: { ai: true },
  options: { zernio: { privacyLevel: "PUBLIC_TO_EVERYONE" } },
});
social.preview(post.id);   // 128 chars, AIGC flag on, no warnings
social.submit(post.id);    // operator watches rain-ep4.mp4 on their phone, approves at 11:20
social.approve(post.id);
social.schedule(post.id, Date.parse("2026-10-26T19:00:00Z")); // Sun 15:00 New York
```

The operator was available from 15:00 to 16:00 to answer comments; 22 replies went out in the first hour, including one
reply-with-video for the top comment ("does the sticker survive?"), which became ep. 5's hook.

Episode 4 results after 7 days: 148,000 views, 3-second hold 76%, average watch time 14.1 s on a 12 s video (loops),
shares 11 per 1,000, follows 5.3 per 1,000 (+784), Search 9% of traffic.

## After 4 weeks (8 episodes)

| Metric | Before | Series median |
|---|---|---|
| Views | 1,900 | 31,000 |
| 3-second hold | 44% | 71% |
| % watched full | 11% | 38% |
| Follows per 1,000 views | 0.6 | 3.9 |
| Search traffic | 2% | 8% |
| Ineligible / removed | 3 | 0 |

Followers: 6,800 → 15,200.

## What the operator learned

- Starting mid-action and looping did more for reach than any sound choice.
- The search phrase kept sending views to older episodes; ep. 1 was still getting ~400 views a day in week 4.
- Answering in the first hour with a reply video gave each next episode a ready-made hook.
- Creator Rewards wasn't the plan: clips are 12 s, the account is AI, and income comes from brand work
  (../../monetization-streams/SKILL.md). A Northpine headphones deal in week 5 used the disclosure toggle and `#ad`.
