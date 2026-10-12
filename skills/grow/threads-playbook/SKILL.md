---
name: threads-playbook
description: Runs an AI character or agent account on Meta's Threads. Covers an honest profile, Meta's AI-label rules (the Threads API has no AI flag, so the label goes in the text), topic tags and Communities, Dear Algo and Your Algo, formats and limits (500 characters, 10,000-character text attachments, 20-item carousels, 5-minute video, polls, disappearing posts), API publishing limits, and approval-first posting with @useclaudia/social through your own Meta app or a posting service. Use when someone wants to start, grow or automate a Threads account for an AI character, plan a Threads week, adapt X or Instagram content for Threads, join Threads Communities, or check whether a Threads workflow follows Meta's rules.
license: MIT
metadata:
  title: "Threads playbook for AI characters"
  category: "grow"
  summary: "Grow an AI character on Threads: conversation-first posts, topic tags and Communities, labelled AI, approval-first posting."
  level: "intermediate"
  tags: "threads, meta, topic tags, communities, conversation, ai label, automation, growth"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "45 min setup, 20 min a day"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Threads playbook for AI characters

Threads rewards conversation more than broadcasting: a clear topic, a line people want to answer, and an account that
answers back. This skill sets up a Threads account for an AI character so it is clearly labelled and tagged into the
right topics and Communities. It posts at a pace a person can review, and every post goes through preview and human
approval before it publishes, once.

Facts here were read on Meta's developer docs and newsroom in October 2026 ("checked 2026-10"). Threads ships features
monthly; re-check [references/threads-formats-and-api.md](references/threads-formats-and-api.md) every quarter.

## When to use this

- Launching a Threads account for an AI character (for example Claudia) or an agent on useclaudia.xyz.
- Adapting the character's X posts or Instagram captions for Threads without copy-pasting them.
- Automating Threads posting with approval, through your own Meta app or a posting service.
- Picking topic tags and Communities, or planning a Threads week.

Not for: auto-replying to strangers, follow-for-follow, buying followers, or running several accounts that boost each
other. Meta treats those as spam and inauthentic behaviour.

## What you need

- A Threads account for the character, run by a real adult operator, with two-factor authentication on.
- One posting route:
  - **Your own Meta app** (Business type, Threads API use case, redirect `https://useclaudia.xyz/relay/oauth/callback`),
    key name `threads` (app id and secret). Threads pulls media from a public URL, so give https URLs or set the
    package's `mediaRelay`.
  - **Or a posting service** you already use (Buffer, Zernio or Upload-Post), key name `buffer`, `zernio` or
    `upload-post`. Each connected Threads profile shows up as its own account.
- `@useclaudia/social`, or `@useclaudia/cli` with `@useclaudia/social` installed, and a `social-vault` key.
- The character bible ([claudia-character-bible](../../create/claudia-character-bible/SKILL.md)) and 3–4 pillars.

## Steps

1. **Set up the profile honestly.** Bio states what the account is, that it is AI, and who runs it:
   `AI character. Studio creator, agents and city nights. Posts are AI-generated, reviewed by a human. useclaudia.xyz`.
   Profile photo: the character's face, labelled AI in the bio. Pin an intro post (template 1 in
   [templates/threads-post-bank.md](templates/threads-post-bank.md)).

2. **Learn how Threads surfaces posts.** Read the reference. Meta doesn't publish Threads ranking weights, but it has
   shipped these discovery tools (checked 2026-10):
   - **Topic tags:** one topic per post, 1–50 characters. They place the post in a topic's feed and, where one
     exists, a Community (200+ topics by December 2025; Communities graduated from beta in June 2026).
   - **Dear Algo and Your Algo:** viewers can ask the feed for more or less of a topic, publicly ("Dear Algo", lasts
     3 days) or privately (Your Algo, 1, 3 or 7 days). A character that stays on 3–4 clear topics is easy to ask for.
   - **Replies:** Threads is built around conversation. A post people answer, and that the account answers back,
     keeps showing up.

3. **Pick formats and a weekly mix.** Specs in the reference. Default for a character posting 2–3 times a day:

   | Format | Per week | Notes |
   |---|---|---|
   | Text post with a question (≤ 500 chars, leave room for the AI line) | 8–10 | One idea, one topic tag |
   | Image or carousel (2–20 items) | 4–5 | Alt text always; the character's looks and worlds |
   | Short video (≤ 5 min, 9:16) | 1–2 | Captions burned in; see step 5 on photoreal video |
   | Text attachment (long text, ≤ 10,000 chars) | 0–1 | A weekly write-up; text-only posts only |
   | Poll (2–4 options, 25 chars each) | 1 | Text-only posts; share the result |
   | Disappearing post (24 h, text only) | 0–2 | Live moments ("on set now"); made in the app |

4. **Write for Threads, not for X.** Conversational, first person, lower-case friendly, one idea. Open with the
   interesting part; end with a question the account will answer. One topic tag that matches the pillar (search it first
   to see whether a Community exists for it), never a pile. Rewrite X threads into one post or a carousel; drop "RT" and
   "link in bio" language. Up to 5 links per post, but one is plenty. Hooks:
   [captions-and-hooks](../../create/captions-and-hooks/SKILL.md).

5. **Label AI the way Meta asks.** Meta labels AI content with "AI info" across Facebook, Instagram and Threads, and
   requires people to disclose "photorealistic video or realistic-sounding audio that was digitally created or
   altered", with penalties possible if they don't. The Threads publishing API has no AI field (checked 2026-10), so the
   package appends `(AI-generated)` to every Threads post. Alt text on every image starts with "AI-generated image:".
   For photoreal video or the character's voice, post in the Threads app and add the AI label there if the composer
   offers it. If it doesn't, keep that clip for Instagram, where the package sets `is_ai_generated`.

6. **Connect Threads and preview.**

   ```sh
   npm i -g @useclaudia/cli @useclaudia/social
   claudia keys set threads            # JSON {"clientId":"<meta app id>","clientSecret":"<secret>"}
   claudia connect threads             # browser sign-in through the relay redirect
   claudia accounts
   claudia post threads "silver foil, one flash, zero retakes. what's the one shot you'd never redo? #AIart" --dry-run
   ```

   Using a posting service instead: `claudia keys set buffer`, `claudia connect buffer`; the Threads channel shows up
   in `claudia accounts` as `threads … via buffer`, and `claudia post threads "…" --account <id>` picks it.
   The dry run shows the final text with `(AI-generated)`, the length against 500 and any warnings. Without `--dry-run` it previews again, asks for "y", and publishes once.

7. **Schedule a week with approval.** Fill [templates/threads-weekly-plan.csv](templates/threads-weekly-plan.csv), then:

   ```ts
   import { createSocial, chainKeys, envKeys } from "@useclaudia/social";

   const social = createSocial({ keys: chainKeys(envKeys()) }); // CLAUDIA_KEY_THREADS, CLAUDIA_KEY_SOCIAL_VAULT
   await social.ready();
   const th = social.accounts().find((a) => a.network === "threads");
   if (!th) throw new Error("Connect Threads first: claudia connect threads");

   const post = social.draft({
     text: "four looks, one bob. which one is actually me? #AIart",
     media: [
       { path: "https://<your-cdn>/claudia/look-signature.jpg", alt: "AI-generated image: Claudia in a white glossy puffed-sleeve top on a silver-foil set." },
       { path: "https://<your-cdn>/claudia/look-holo.jpg", alt: "AI-generated image: Claudia in a holographic bell-sleeve dress and tiny orange sunglasses, cobalt studio." },
     ],
     targets: [{ account: th.id }],
     labels: { ai: true },
   });
   console.log(social.preview(post.id)); // check text, chars, labelsAdded, warnings
   social.submit(post.id);               // a person approves in your UI, then approve() + schedule(); tick() every 30 s
   ```

   The package caps Threads at 25 posts per account per 24 hours (Meta's API allows 250). Two to four is the right
   pace for a character; the rest of the day is for replies.

8. **Reply by hand and join Communities.** The package can't read a Threads inbox, so the operator answers replies in
   the app: questions first, then thoughtful takes, then thanks. Join the 2–3 Communities that match the pillars and
   post there with their topic tag. Community Champion badges go to members who are highly followed there, post
   regularly and keep replies active; that only happens by actually talking. Never auto-reply, and never reply to
   strangers in bulk ([engagement-and-replies](../engagement-and-replies/SKILL.md)).

9. **Review weekly.** Every Monday, from Threads Insights: top 3 posts by replies and follows, the topic tags that
   brought them, the bottom 3 and why. Keep one experiment running (topic tag A vs B, morning vs evening) with
   [growth-experiments](../growth-experiments/SKILL.md).

A worked first month for Claudia, including a rewrite from X and a blocked post, is in
[examples/claudia-threads-first-month.md](examples/claudia-threads-first-month.md).

## Templates

- [templates/threads-post-bank.md](templates/threads-post-bank.md): intro post, 24 post lines in Claudia's voice by
  pillar with a topic tag each, carousel and poll skeletons, and an X-to-Threads rewrite guide.
- [templates/threads-weekly-plan.csv](templates/threads-weekly-plan.csv): 14 slots over 7 days, with format, pillar,
  topic tag, route and approval columns.

Quick fill-in for one post:

```text
PILLAR: <show-the-work | city-nights | agents-and-tools | community>
LINE (≤ 470 chars, leave room for "(AI-generated)"): <…>
QUESTION (one, you will answer it): <…>
TOPIC TAG (one, matches a Community): #<tag>
MEDIA: <https url or none> · ALT: "AI-generated image: <scene>"
ROUTE: threads (own Meta app) | buffer | zernio | upload-post · SLOT: <day time tz> · APPROVED BY: <name>
```

## Check before you finish

- [ ] Bio says the account is an AI character and who runs it; the intro post is pinned.
- [ ] Every post went through preview and human approval; `(AI-generated)` is in each post's text.
- [ ] Every image has "AI-generated image:" alt text; photoreal video or voice went out with Meta's AI label or not
      at all on Threads.
- [ ] One topic tag per post, matching a pillar; no hashtag piles, no unrelated trending tags.
- [ ] No automated replies, follows or likes; replies answered by a person in the app.
- [ ] Paid or gifted posts carry `#ad` (`labels.ad`) and say who paid.
- [ ] No price targets or return promises; coin mentions are education with "Not financial advice."

## Pitfalls

- **Copy-pasting X.** Numbered 280-character fragments and "RT" read as reposted content. Rewrite for Threads.
- **Using up all 500 characters.** The `(AI-generated)` line is appended after your text; leave about 20 characters.
- **Several topic tags.** Only the first valid tag counts, and the rest look like spam. One per post.
- **Local media paths with your own Meta app.** Threads fetches media from a public URL. Use https URLs or set
  `mediaRelay`; otherwise the publish fails with `unsupported`.
- **Photoreal clips through the API.** There is no AI flag in the Threads API. Post those in the app with the label.
- **Posting at the API maximum.** 250 posts a day is a technical limit, not a target. Volume without replies sinks.
- **Treating Communities as ad space.** Post what the Community is about; promotion belongs on the profile.

## Related skills

- [x-playbook](../x-playbook/SKILL.md): the real-time sibling; share pillars, never identical text.
- [instagram-reels-playbook](../instagram-reels-playbook/SKILL.md): where photoreal video gets Meta's native AI flag.
- [engagement-and-replies](../engagement-and-replies/SKILL.md): reply triage and tone.
- [posting-schedule](../posting-schedule/SKILL.md): slots, time zones and the `schedule()`/`tick()` loop.
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md): Meta "AI info" and house labels.
- [social-publishing](../../build/social-publishing/SKILL.md): connectors, posting services and the media relay.
