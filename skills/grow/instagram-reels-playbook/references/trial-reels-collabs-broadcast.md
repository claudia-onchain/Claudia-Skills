# Trial Reels, collab posts and Broadcast channels (checked 2026-10)

Read this before running a hook test, planning a collab, or opening a broadcast channel.

## Trial Reels

What it is: a Reel shown **only to non-followers** first. It doesn't appear on the grid or in followers' feeds unless it
graduates. Instagram measures how strangers respond for 72 hours.

| Item | Detail |
|---|---|
| Eligibility | Public professional account (Creator or Business). Instagram's help page cites 1,000 followers in most places; some regions/accounts see it from 200 on professional accounts. The account must be eligible for recommendations. |
| Limit | Reported up to 20 Trial Reels per 24 h. Use far fewer (3–6 a week) — each still costs production time and tests need clean comparisons. |
| Metrics | Views, likes, comments, shares/sends, follows, average watch time — available about 24 h after posting |
| Window | 72 h |
| Graduation | **Manual** (you choose "Share to followers") or **Automatic** (Instagram shares it if it performs well within 72 h). API: `trial_params.graduation_strategy` = `MANUAL` or `SS_PERFORMANCE` |
| After graduation | Appears on the grid and to followers; counts become one Reel |

### Test design

- Change one variable per test: hook text, first shot, length, audio or cover. If two things change, the result says nothing.
- 2–3 variants, posted 1–2 h apart in the same daypart. Same caption body and hashtags.
- Decide at 72 h on: sends per 1,000 views (primary), average watch time ÷ length (guardrail ≥ 60%), follows (secondary).
- Minimum sample: ~1,000 views per variant before trusting a difference; under that, call it inconclusive.
- Graduate one winner manually. Delete or archive the others if they are near-duplicates.
- A Trial Reel is still public content: AI label and any `#ad` rules apply exactly as for a normal Reel.

`@useclaudia/social` 0.2 does not expose trial or collaborator parameters for Instagram. Post trials in the app, or through
a posting service that supports trial reels, and record the results in the experiment log.

## Collab posts

| Item | Detail |
|---|---|
| Max co-authors | 5 collaborators + the owner = 6 profiles |
| How | Owner: Tag people → Invite collaborator. Each collaborator must accept. |
| Shared | One post, one set of likes/comments/views, shown on every accepted profile and to each audience |
| Formats | Reels, feed posts, carousels |
| Ownership | The owner can edit the caption; collaborators can remove themselves |
| API | Instagram's API accepts a `collaborators` list (invites); not exposed in `@useclaudia/social` 0.2 |

Partner selection checklist:

- Audience overlap by **theme**, low overlap by **people** (different niches that share a mood: travel, music, desk setups).
- Engagement is real: views per post roughly track follower counts; no sudden follower spikes; comments are specific.
- They are adults; if they are AI, they label it; they haven't run crypto pump promotions.
- Agree on paid status. If money, product, affiliate codes or mutual business interest are involved, both sides mark it
  "Paid partnership" and `#ad` (FTC, ASA/CMA).
- Agree on the caption, the AI line, the posting time and what happens if one side's account gets a strike.

## Broadcast channels

| Item | Detail |
|---|---|
| Who | Public professional accounts in good standing; historically 10k followers, now open in most regions with no minimum |
| Content | Text, photos, videos, voice notes, polls, prompts (questions members answer), reactions, member replies |
| Reach | Every member gets a push notification for each message — overuse leads to mutes and leaves |
| Discovery | Join link on profile, a Story sticker, pinned in the inbox for members |
| API | No publishing API; send in the app |

Cadence that keeps members: 2–3 messages a week, one of them interactive (poll or prompt). Never more than one per day.

What not to send: price talk, coin "alpha", "buy now", affiliate links without `#ad`, or anything that reads like a
financial promotion. A broadcast is a public promotion for legal purposes even though it lives in DMs.

## Sources

- Instagram Help, Trial reels — https://help.instagram.com/ (search "trial reels")
- Meta Instagram Platform changelog (trial reels in Content Publishing API) — https://developers.facebook.com/docs/instagram-platform/changelog
- Postfa.st, Instagram Trial Reels guide — https://postfa.st/blog/instagram-trial-reels
- Storrito, how trial reels work (72 h) — https://storrito.com/resources/how-instagram-trial-reels-work-72-hours/
- Sked Social, collaboration posts 2026 — https://skedsocial.com/blog/instagram-collaboration-feature
- ContentStudio, Instagram broadcast channels — https://contentstudio.io/blog/instagram-broadcast-channels
