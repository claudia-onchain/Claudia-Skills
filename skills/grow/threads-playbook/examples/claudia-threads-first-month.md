# Example: Claudia's first month on Threads

A worked example of this skill. Claudia already posts on X; the team wants Threads to be a place for conversation
rather than a mirror of X. Numbers are illustrative.

## Day 0: setup (45 minutes)

1. Bio: `AI character. Studio creator, agents and city nights. Posts are AI-generated, reviewed by a human. useclaudia.xyz`
2. Profile photo: Claudia's official portrait (black bob, peach-orange streak in the bangs, peach star clip, headset
   mic, freckles), labelled AI by the bio.
3. Route: the team already pays for Buffer, so they connected Threads there instead of building a Meta app.

```sh
claudia keys set buffer
claudia connect buffer
claudia accounts            # → threads @claudia… via buffer (and the other Buffer channels)
```

4. Pinned the intro post from [templates/threads-post-bank.md](../templates/threads-post-bank.md).
5. Picked three topic tags, one per pillar, after checking which had active Communities: an AI art tag for
   show-the-work, a creator tag for community, a nightlife tag for city-nights.

## Rewriting from X

The X thread that did best that week:

```text
1/ I made 41 videos this month. 6 did 80% of the views.
2/ All 6 start with me already mid-sentence.
3/ No "hey guys", no wind-up. The first frame is the point.
4/ Full breakdown: https://useclaudia.xyz/skills
```

The Threads version (one post, one tag, a question, no link):

```text
41 videos this month. 6 of them did 80% of the views, and all 6 start with me already mid-sentence.
no wind-up, no "hey guys". what's the first thing you cut from your videos? #AIart
```

```sh
claudia post threads "41 videos this month. 6 of them did 80% of the views, and all 6 start with me already mid-sentence. no wind-up, no \"hey guys\". what's the first thing you cut from your videos? #AIart" --account <threads-account-id> --dry-run
```

Preview: 186 characters before the label, `(AI-generated)` appended, no warnings. Approved by the operator at 09:40,
published at 10:00. 212 replies over the day; the operator answered 61 by hand in the Threads app.

## Week 2: a blocked post

A drafted community post read: `which coin are you holding into the weekend? mine's going to 10x.` The preview returned
`blocked` (a return promise in coin context). The agent's rewrite moved it to the right pillar and dropped the coin:

```text
weekend question: what's one thing you learned the hard way this month?
```

## Week 3: the club clip

The 14-second club clip is photoreal video of Claudia. The Threads API has no AI-label field, so no posting route can
set one. The operator posted that clip in the Threads app with the AI label, and the scheduled route carried only
images and text that week. The same clip went to Instagram through the package with `is_ai_generated` set.

## Results after 4 weeks

| Metric | Week 1 | Week 4 |
|---|---|---|
| Posts | 14 | 15 |
| Avg replies per post | 18 | 46 |
| Follows per week | 140 | 620 |
| Replies answered within 2 h | 41% | 84% |
| Posts in Communities (with their tag) | 3 | 9 |

What the team kept: questions at the end, one tag per post, answering replies the same evening.
What they dropped: Sunday carousels without a question (lowest replies every week).
Next experiment: moving the evening slot from 20:00 to 22:00 local for two weeks, success = +20% replies on that slot
([growth-experiments](../../growth-experiments/SKILL.md)).
