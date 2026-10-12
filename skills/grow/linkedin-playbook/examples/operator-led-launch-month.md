# Example: an operator-led launch month on LinkedIn

A worked example of this skill. Rae Lindqvist (fictional, they/them) runs a small studio that operates Claudia, an AI
creator character. The goal for the month: get the studio's new "agent posting with approval" feature in front of
brand partners and other builders. Numbers are illustrative.

## Day 0: what Rae did not do

The first idea on the team call was "make Claudia a LinkedIn profile and let her comment on industry posts". Rae
checked [references/linkedin-rules-and-formats.md](../references/linkedin-rules-and-formats.md) and dropped it:

- A profile for Claudia breaks the User Agreement ("create a Member profile for anyone other than yourself (a real
  person)").
- Automated comments break 8.2 item 13 ("create, comment on, like, share, or re-share posts").

## Day 0: setup (1 hour)

1. Rae's headline: `Building Claudia, an AI creator character · agents that ask before they post`.
2. The studio already had a Page. Its About now opens with: `Claudia is an AI character. The platform is run by a
   small team. Posts may be AI-assisted and are reviewed by a person.`
3. Page cover: the silver-foil banner with Claudia in the signature look (white glossy puffed-sleeve top, black bob,
   peach-orange streak, peach star clip, headset mic). Alt text starts "AI-generated image:".
4. Developer app with Share on LinkedIn and OpenID Connect; redirect `https://useclaudia.xyz/relay/oauth/callback`.

```sh
claudia keys set linkedin
claudia connect linkedin
claudia accounts
```

The account showed an expiry date 60 days out. Rae put a reconnect reminder in their calendar for day 53.

## Week 1: the plan

From [templates/linkedin-weekly-plan.csv](../templates/linkedin-weekly-plan.csv):

| Day | Surface | Format | Working title |
|---|---|---|---|
| Mon | Profile | Text | "We cut our AI character from 7 posts a day to 4. Follows per 1,000 views went from 0.2 to 1.9." |
| Tue | Page | Document (10 pages) | "How an agent drafts, a person approves, and a post goes out once" |
| Wed | Profile | Image | Claudia at her desk in the white studio, with the week's approval numbers |
| Thu | Profile | Poll | "Would you let an AI agent post for your brand?" |
| Fri | Page | Video (24 s) | Screen recording of the approval queue, captions burned in |

## Monday: one post end to end

```sh
claudia post linkedin "We cut our AI character from 7 posts a day to 4. Follows per 1,000 views went from 0.2 to 1.9. ..." --dry-run
```

The preview showed 742 characters, `(AI-generated)` appended, no warnings. Rae edited one line to sound like
themselves, approved it, and scheduled it for 08:30 New York. It reached 9,400 impressions and 61 comments. Rae
answered 38 of them by hand before lunch; the agent had drafted a list of points in a private note, nothing more.

## Wednesday: a blocked draft

The agent's first draft for the image post ended with: `Our launch partners' coin is going to 10x after this.` The
preview returned `blocked` (a return promise in coin context). Rae removed the line; the coin wasn't relevant to the
post anyway. The final post talked only about the feature.

## Friday: the Page video

Posted by the Page admin in the LinkedIn app (the package connector posts as a member, not as a Page). Caption:
`New: agents on Claudia can draft posts for 9 networks, and nothing goes out until a person approves it.` Last line:
`Claudia is an AI character. Posts are AI-assisted and reviewed by our team.`

## Results after 4 weeks

| Metric | Week 1 | Week 4 |
|---|---|---|
| Profile posts | 3 | 3 |
| Avg impressions per profile post | 7,100 | 12,800 |
| Comments per 1,000 impressions | 5.9 | 8.4 |
| Page followers (net) | +140 | +410 |
| Partner calls booked from LinkedIn DMs | 1 | 4 |
| Comments answered within 4 h | 70% | 92% |

What Rae kept: build notes with one real number, the Tuesday document, answering comments by hand.
What Rae dropped: the poll (people voted but didn't comment) in favour of a second document every other week.
Day 53: reconnected LinkedIn with `claudia connect linkedin` before the token expired; no scheduled post failed.
