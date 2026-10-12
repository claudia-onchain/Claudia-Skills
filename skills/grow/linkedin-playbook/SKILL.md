---
name: linkedin-playbook
description: Runs LinkedIn for an AI character or agent brand within LinkedIn's real-identity rules. The human operator posts from their own profile, the brand gets a LinkedIn Page, and the character is never given a member profile. Covers formats and limits (posts, documents, polls, video, articles), what LinkedIn says its feed ranks, Content Credentials and AI labels, the no-bots rules for comments and likes, the 60-day token, and approval-first posting with @useclaudia/social or the claudia CLI. Use when someone wants to promote an AI character, agent or creator studio on LinkedIn, plan a LinkedIn content week, post build notes or launch updates for a professional audience, or check whether a LinkedIn automation idea breaks the User Agreement.
license: MIT
metadata:
  title: "LinkedIn playbook for AI characters and their operators"
  category: "grow"
  summary: "Grow an AI brand on LinkedIn the allowed way: operator profile plus a Page, real formats, labelled AI, approval-first posting."
  level: "intermediate"
  tags: "linkedin, b2b, operator, company page, documents, ai disclosure, content credentials, automation rules, growth"
  uses: "@useclaudia/social, @useclaudia/cli"
  time: "1 h setup, 30 min a week"
  version: "1.0.0"
  updated: "2026-10-12"
---

# LinkedIn playbook for AI characters and their operators

LinkedIn is where partners, brands, hiring managers and builders decide whether an AI project is serious. It is also
the one big network where an AI character cannot have its own member profile: LinkedIn requires a real person behind
every profile. This skill sets up the two allowed surfaces, the operator's own profile and a LinkedIn Page for the
brand. It plans a week of posts LinkedIn's feed can rank, and runs every post through preview and human approval.

Facts here were read on LinkedIn's own help, legal and API pages in October 2026 ("checked 2026-10"). LinkedIn
changes formats and API versions often; re-check the sources in the references every quarter.

## When to use this

- An AI character or agent (for example Claudia, or your own agent on useclaudia.xyz) needs a professional audience:
  partners, sponsors, press, other builders.
- The operator wants to post build notes, launch updates or lessons learned under their own name.
- Someone proposes "a LinkedIn profile for the character", AI comment tools, or an engagement pod. All three break
  LinkedIn's rules; this skill explains what to do instead.
- Planning a LinkedIn week, a document post or a launch announcement.

Not for: fake profiles, automated comments, likes, connection requests or messages, or scraping. LinkedIn bans all of
them in its User Agreement, and this skill does not teach them.

## What you need

- The operator's own LinkedIn account, in their real name (the User Agreement allows only one account per person).
- A LinkedIn Page for the brand or product (for example the Claudia platform). The person who creates a Page becomes
  its admin.
- For API posting: a LinkedIn developer app with **Share on LinkedIn** and **Sign In with LinkedIn using OpenID
  Connect**, and the redirect URL `https://useclaudia.xyz/relay/oauth/callback`. Key name `linkedin` (client id and
  secret) plus `social-vault`, from the environment (`CLAUDIA_KEY_LINKEDIN`, `CLAUDIA_KEY_SOCIAL_VAULT`) or
  `claudia keys set`. Never print or commit them.
- `@useclaudia/social` (library) or `@useclaudia/cli` with `@useclaudia/social` installed.
- The character bible ([claudia-character-bible](../../create/claudia-character-bible/SKILL.md)) for any image of the
  character, and 3–4 content pillars ([content-pillars-and-series](../../create/content-pillars-and-series/SKILL.md)).

## Steps

1. **Pick the right surface.** Read [references/linkedin-rules-and-formats.md](references/linkedin-rules-and-formats.md)
   first. LinkedIn's User Agreement (effective 3 November 2025) says members must not "create a Member profile for
   anyone other than yourself (a real person)", and its Professional Community Policies say "We don't allow fake
   profiles or entities" (checked 2026-10). So:

   | Surface | Who speaks | Use it for |
   |---|---|---|
   | Operator's profile | The human, first person | Build notes, numbers, lessons, launches, hiring |
   | LinkedIn Page | The brand (the character can appear in its content) | Product news, the character's work, events |
   | Member profile for the character | Never | Breaks the identity rules; the account can be restricted |

2. **Set up both surfaces honestly.** Operator headline: what they build, plus the character by name, for example
   `Building Claudia, an AI creator character · agents and creator tools`. Page tagline and About: say the character is
   AI and who runs it: `Claudia is an AI character. The platform is run by a small team. Posts may be AI-assisted and
   are reviewed by a person.` Use the character's look only on the Page and in posts, never as the operator's photo.

3. **Learn what the feed rewards.** LinkedIn's own help page says relevance comes from three signal groups: identity
   (who the viewer is), content (how often a post is viewed or engaged with, and "how constructive or professional the
   conversation is") and activity (what the viewer reacted to, commented on and spends time viewing). It also says the
   feed tapers "low-quality and unsafe content" (checked 2026-10). What follows: write for one professional audience,
   earn real comments, make posts worth reading to the end. LinkedIn bans the shortcuts: "Don't do things to
   artificially increase engagement", including agreeing in advance to like or re-share each other's posts (pods).

4. **Choose formats and a weekly mix.** Specs are in the reference. Default mix for an operator profile plus a Page:

   | Format | Per week | Surface | Notes |
   |---|---|---|---|
   | Text post with a strong first line (≤ 3,000 chars) | 2 | Profile | Build notes, numbers, one lesson each |
   | Image or multi-image post (up to 20 images) | 1 | Profile or Page | Character images labelled AI, alt text always |
   | Document post (PDF, ≤ 100 MB, ≤ 300 pages) | 1 | Page or profile | A 6–10 page guide; posted in the app |
   | Short video (3 s to 15 min) | 0–1 | Page | Captions burned in; reuse vertical cuts |
   | Poll (2–4 options) | 0–1 | Profile | Only when you will share the result |
   | Article or newsletter issue (≤ 125,000 chars) | 0–1 a month | Profile | Long write-ups; posted in the app |

   A post can carry a link or an image, not both (LinkedIn help, checked 2026-10). Put the link in the text of a
   text-only post, or in the document's last page.

5. **Write posts that start conversations.** Hook in the first line, because the feed shows only the start before
   "see more". One idea per post, a specific number or decision, and a closing question you will answer. Write in the
   operator's voice, not the character's: `We let our AI character post 4 times a day for a month. Follows went down.
   Here is what we changed.` Every image of the character carries alt text that starts "AI-generated image:", and keep
   the C2PA Content Credentials from your generator in the file, because LinkedIn shows a C2PA icon on images and video
   that carry them. Use [templates/linkedin-post-templates.md](templates/linkedin-post-templates.md) for the five
   standard post shapes.

6. **Connect LinkedIn and preview.** The package's LinkedIn connector posts to the operator's personal profile:

   ```sh
   npm i -g @useclaudia/cli @useclaudia/social
   claudia keys set linkedin           # JSON {"clientId":"<id>","clientSecret":"<secret>"}
   claudia connect linkedin            # browser sign-in; comes back through the relay redirect
   claudia accounts                    # confirm the LinkedIn account is listed
   claudia post linkedin "We let our AI character post 4 times a day for a month. Follows went down. Here is what we changed." --dry-run
   ```

   The dry run shows the final text with the `(AI-generated)` line, the length against 3,000, and any warnings. Run it
   again without `--dry-run`; it previews, asks for "y", and publishes once. Page posts, documents, polls and articles
   are made by a Page admin in the LinkedIn app: the package connector does not post as a Page.

7. **Schedule the week with approval.** Fill [templates/linkedin-weekly-plan.csv](templates/linkedin-weekly-plan.csv),
   then draft the profile posts with the library:

   ```ts
   import { createSocial, chainKeys, envKeys } from "@useclaudia/social";

   const social = createSocial({ keys: chainKeys(envKeys()) }); // CLAUDIA_KEY_LINKEDIN, CLAUDIA_KEY_SOCIAL_VAULT
   await social.ready();
   const li = social.accounts().find((a) => a.network === "linkedin");
   if (!li) throw new Error("Connect LinkedIn first: claudia connect linkedin");

   const post = social.draft({
     text: "We let our AI character post 4 times a day for a month. Follows went down.\n\nWhat we changed: ...",
     media: [{ path: "./studio-desk.jpg", alt: "AI-generated image: Claudia, black bob with a peach-orange streak and a peach star clip, headset mic, at a desk in a white studio." }],
     targets: [{ account: li.id }],
     options: { linkedin: { visibility: "PUBLIC" } },
     labels: { ai: true },
   });
   console.log(social.preview(post.id)); // final text, chars, labelsAdded, warnings
   social.submit(post.id);               // the operator approves in your UI, then:
   // social.approve(post.id); social.schedule(post.id, Date.parse("2026-10-13T13:30:00Z")); tick() every 30 s
   ```

   The package caps LinkedIn at 5 posts and 3 link posts per account per 24 hours; 3–5 posts a week is plenty.

8. **Answer comments by hand.** The LinkedIn connector has no inbox and no replies, and LinkedIn's User Agreement bans
   bots that "create, comment on, like, share, or re-share posts". The operator reads comments in the app and answers
   the real ones within the first hours. The agent may draft reply ideas in a private note; a person types and sends
   them. No AI comment tools on other people's posts, no automated connection requests or messages.

9. **Review weekly and renew the token.** Every Monday fill the review block at the end of the weekly plan: top post by
   comments per 1,000 impressions, follower change on the profile and the Page, one experiment for next week
   ([growth-experiments](../growth-experiments/SKILL.md)). LinkedIn access tokens last 60 days and self-serve apps get
   no refresh token: previews warn in the last week and `tick()` emits an `expiring` account event. Reconnect with
   `claudia connect linkedin` before it lapses.

A full month run end to end, including a blocked post and the token renewal, is in
[examples/operator-led-launch-month.md](examples/operator-led-launch-month.md).

## Templates

- [templates/linkedin-post-templates.md](templates/linkedin-post-templates.md): build note, lesson-with-numbers,
  document post outline, poll, Page announcement, plus the comment-reply guide for the operator.
- [templates/linkedin-weekly-plan.csv](templates/linkedin-weekly-plan.csv): a week of profile and Page slots with
  surface, format, pillar, label and approval columns, and the Monday review rows.

Quick fill-in for one profile post:

```text
SURFACE: profile (operator) | page (brand, posted in the app)
FIRST LINE (one number or decision, ≤ 120 chars): <…>
BODY (one idea, short paragraphs, ≤ 1,300 chars): <…>
CLOSE (a question the operator will answer today): <…>
MEDIA: <file or none> · ALT: "AI-generated image: <scene>" · LINK: <url or none; never with an image>
LABELS: ai=true · ad=<true if paid or gifted> · APPROVED BY: <name> · SLOT: <day time tz>
```

## Check before you finish

- [ ] No member profile exists for the character; the operator posts as themselves and the brand posts as a Page.
- [ ] Page About and the operator's headline say the character is AI and who runs it.
- [ ] Every agent-drafted post went through preview and a human approval; the `(AI-generated)` line is present.
- [ ] Every image of the character has "AI-generated image:" alt text and keeps its Content Credentials.
- [ ] No automated comments, likes, reposts, connection requests or messages; no pods or comment-for-comment groups.
- [ ] Paid or gifted posts say so in the first lines with `#ad` (`labels.ad`).
- [ ] Coin or token mentions are news or education only, with "Not financial advice." and no return promises.
- [ ] The LinkedIn token's expiry date is in the operator's calendar.

## Pitfalls

- **A profile for the character.** It breaks the real-name rule and can get the account restricted. Use a Page.
- **AI comment tools.** Automated comments are "inauthentic engagement" under User Agreement 8.2, and generic AI
  comments read as spam in a professional feed. The operator comments by hand.
- **Pods and "comment YES for the PDF".** LinkedIn's policies forbid agreeing in advance to engage with each other's
  posts. Earn comments with a real question instead.
- **Link plus image.** LinkedIn takes one or the other. Pick the image and put the link in the first comment by hand,
  or post the link alone.
- **Pasting X threads.** Numbered 280-character fragments read wrong here. Rewrite as one post with short paragraphs.
- **Letting the token lapse.** After 60 days without a reconnect, scheduled posts fail with `expired`.
- **Crypto hype for a professional audience.** One price call costs more trust here than anywhere else. Keep coins to
  plain-words education ([crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md)).

## Related skills

- [personal-brand-strategy](../personal-brand-strategy/SKILL.md): positioning the operator and the character together.
- [posting-schedule](../posting-schedule/SKILL.md): slots, time zones and the `schedule()`/`tick()` loop.
- [carousel-design](../../create/carousel-design/SKILL.md): designing the pages of a document post.
- [media-kit-and-pitching](../media-kit-and-pitching/SKILL.md): turning LinkedIn reach into partner conversations.
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md): labels and Content Credentials.
- [social-publishing](../../build/social-publishing/SKILL.md): the publishing package in depth.
