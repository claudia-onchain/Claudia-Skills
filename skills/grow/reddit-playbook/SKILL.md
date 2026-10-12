---
name: reddit-playbook
description: Runs an AI character's or creator's presence on Reddit the way Reddit's 2026 rules actually work — subreddit research, per-community rules, the 10% self-promotion norm, AI-content and persona disclosure, the Responsible Builder Policy and the closing Data API, Brand Affiliate tags, AMAs, and a manual, human-posted routine that earns trust instead of spam flags. Use when someone wants to post on Reddit, promote a project or newsletter there, find the right subreddits, recover from removed posts or a shadowban, plan an AMA, or asks whether an agent or bot can post on Reddit.
license: MIT
metadata:
  title: "Reddit playbook"
  category: "grow"
  summary: "Join Reddit as a disclosed AI character or its operator: research subreddits, follow the 10% norm, post by hand, never spam."
  level: "intermediate"
  tags: "reddit, subreddits, self-promotion, ai disclosure, community rules, ama, bots, api, moderators"
  time: "1 h setup, 20 min a day"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Reddit playbook

Reddit rewards people who are useful inside a community and punishes anyone who shows up to advertise. This skill sets
up an honest Reddit presence for an AI character or its operator: the right subreddits, each one's rules on file,
disclosure that nobody can miss, and a daily routine where nine of every ten contributions help someone. Everything is
posted by a human, by hand: Reddit's own rules make that the only safe route for an AI persona in 2026.

Facts here were read on Reddit's own policy and help pages ("checked 2026-10"). Reddit updates its changelog often;
re-check the sources in [references/reddit-rules-and-api.md](references/reddit-rules-and-api.md) every quarter.

## When to use this

- Someone wants to share a project, newsletter, tool or character on Reddit without getting banned.
- Posts keep vanishing (AutoModerator, spam filter) or the account looks shadowbanned.
- Choosing which subreddits to join, and reading what each one allows.
- Planning an AMA or a launch post with moderator approval.
- An agent builder asks "can my agent post or reply on Reddit?" (short answer: not as a hidden bot, and the public
  API is closing; see step 2).

Not for: vote manipulation, multiple accounts, buying upvotes or aged accounts, mass DMs, cross-posting the same text
to many subreddits, or scraping Reddit to train a model. Reddit bans those sitewide and this skill does not teach them.

## What you need

- A Reddit account owned by a real adult operator, with a verified email. Decide up front which of two set-ups you use:
  - **Operator account** (recommended): the person posts as themselves and discloses their link to the character.
  - **Character account**: the display name or bio says "AI character", for example `Claudia (AI character) · run by @<operator>`.
    Reddit prohibits "Posing as an individual or organization that does not exist in order to make others believe
    they are engaging with a real entity" (checked 2026-10), so the label is not optional.
- One account per person. A bot account may not double as a personal account under the Responsible Builder Policy.
- The character's bible and voice notes ([claudia-character-bible](../../create/claudia-character-bible/SKILL.md)).
- [templates/subreddit-research.csv](templates/subreddit-research.csv) and
  [templates/reddit-post-templates.md](templates/reddit-post-templates.md).
- Read [references/reddit-rules-and-api.md](references/reddit-rules-and-api.md) once before step 1. It has the rule
  wording, the bot policy, the API timeline, the Contributor Program and the sources.

No `@useclaudia/*` package posts to Reddit. `@useclaudia/social` lists Reddit with no connector ("manual API approval,
bots banned in most crypto subreddits"), so drafts can be written with an agent but a human posts them in the Reddit app.

## Steps

1. **Set up the profile honestly.** Display name and bio say who runs the account and that any character involved is
   AI. Example bio: `I run Claudia, an AI influencer character (AI-generated images and posts). Here as a human,
   answering by hand. useclaudia.xyz`. Turn on two-factor authentication. If Reddit later flags the account as
   automated, verify with a passkey within 7 days or it gets an "App" label and may be restricted (checked 2026-10).

2. **Rule out automation first.** Reddit's Rule 8 article covers "bots, AI agents, and non-human operated accounts"
   and bans apps that "Mask as a human or fail to register as an app" and "unprompted DMs or Chat requests". API access
   needs explicit approval under the Responsible Builder Policy, and Reddit's changelog of 8 October 2026 says new public
   API requests stop on 31 October 2026, unregistered apps start losing access on 12 January 2027, and remaining public
   access ends in March 2027 (checked 2026-10). So: an agent may draft and research, a human posts. No auto-replies, no
   scheduled posting scripts, no DM tools. Training a model on Reddit content needs Reddit's explicit consent.

3. **Shortlist 5–8 subreddits.** Search Reddit for your topic, then open each candidate's sidebar, rules and wiki and
   fill one row of [templates/subreddit-research.csv](templates/subreddit-research.csv) per community: the
   self-promotion rule and the AI-content rule copied word for word, flair requirements, any designated promo thread or
   day, whether links are allowed, and what the top posts of the last month look like. Many creative subreddits ban AI
   images outright; mark those "avoid" rather than testing them. Keep 3–5 where you can genuinely help.

4. **Lurk, then help for two weeks.** Read the top posts of the month in each shortlisted subreddit before posting.
   Then comment where you know the answer: specific, first-line answers, no links
   ([templates/reddit-post-templates.md](templates/reddit-post-templates.md), template 4). Minimum karma and account age
   are set per community with AutoModerator, not sitewide, so a removed post usually means a local threshold; read the
   AutoModerator reply instead of reposting.

5. **Keep promotion at 10% or less.** Count it per community. The 10% rule is not a sitewide Reddit rule any more. Reddit's
   moderator help describes it as a choice: "only 10% of your posting and comment history in the community can be
   self-promotional … the other 90% should be helpful, organic content" (checked 2026-10). Use it as your ceiling in every
   subreddit, count it per community, and follow anything stricter a subreddit sets (promo threads only, mod approval,
   no links). Track it in the `our_last_10_contributions_not_promo` column: under 9 of 10, no promotion that week.

6. **Disclose every time it matters.** When you mention your own project, say so in the post: `Disclosure: I run
   <project>.` When an image, text or voice is AI-generated, say so plainly; Reddit asks for "a tag (or other form of
   indication) disclosing that the content was generated or modified by AI", and AI content that "presents itself as
   human-generated" is prohibited (checked 2026-10). Use flair if the subreddit has an AI flair. Paid or incentivised
   posts also get Reddit's Brand Affiliate tag and a plain `Ad: <brand> paid for this post.` line.

7. **Write native posts, one sub at a time.** Text-first guides, honest questions and useful breakdowns work;
   link drops don't. Use templates 2 and 3, rewrite them for each subreddit, and never post the same text in several
   communities: Reddit's spam rules name "identical or substantially similar content across subreddits", and Reddit is
   testing a 12-hour posting pause for accounts that spread similar content too widely (checked 2026-10). Space
   promotional posts at least a week apart per subreddit. Stay to answer comments for the first two hours.

8. **Ask mods before launches and AMAs.** Message the moderators with template 6 at least a week ahead, wait for a
   written yes, and use the format they ask for. Never offer mods money, products, tokens or allocations: the Moderator
   Code of Conduct forbids moderator actions for payment. For an AMA (template 7): a human answers every question by
   hand, proof is posted from the project's official account, and the post says the character is AI. Giveaways need
   mod approval, clear official rules and a line that Reddit doesn't sponsor them
   ([giveaways-and-contests](../giveaways-and-contests/SKILL.md)).

9. **Review weekly and adjust.** Every Monday, per subreddit: helpful-vs-promo ratio, removed posts and why, comments
   that drew real replies, and any visits or sign-ups from Reddit (UTM-tag links: `utm_source=reddit&utm_medium=social&utm_campaign=<subreddit>`).
   Drop subreddits where nothing you post survives moderation. Coins and tokens: education only, "Not financial
   advice.", no price talk, and many crypto subreddits ban project promotion entirely
   ([crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md)).

A worked example (a fictional agent operator finding four subreddits and running the first month) is in
[examples/juno-first-month-on-reddit.md](examples/juno-first-month-on-reddit.md).

## Templates

- [templates/subreddit-research.csv](templates/subreddit-research.csv) — one row per subreddit: rules quoted, promo
  thread, AI rule, ratio tracker, status.
- [templates/reddit-post-templates.md](templates/reddit-post-templates.md) — disclosure lines, text guide, question
  post, helpful comment, promo-thread entry, message to mods, AMA intro.

Fill-in for a single post:

```text
SUBREDDIT: r/<name> · RULES CHECKED: <date> · FLAIR: <flair>
PROMO RATIO (last 10 here): <n>/10 helpful · THIS POST IS: <helpful | promo>
TITLE (specific, no clickbait): <…>
BODY: <context 2 lines> / <steps or details> / <what didn't work>
LINK: <none | allowed by rule <n>, UTM-tagged>
DISCLOSURE: <"I run <project>" | "AI-generated image" | Brand Affiliate tag + "Ad: <brand>" | none needed>
POSTED BY: <human operator, by hand> · REPLY WINDOW: <first 2 h, who>
```

## Check before you finish

- [ ] Profile says who runs it; any AI character is labelled as AI in the name or bio.
- [ ] Every subreddit you post in has a filled row with its self-promo and AI rules quoted.
- [ ] Promotion is at or under 1 in 10 contributions per community, or stricter where the subreddit says so.
- [ ] Every post about your project discloses it; every AI image or text says it is AI-generated.
- [ ] Paid or incentivised posts carry the Brand Affiliate tag and an "Ad:" line.
- [ ] No identical text posted to more than one subreddit; no link-only posts.
- [ ] Nothing was posted, voted, replied or messaged by a script; a human did each action by hand.
- [ ] AMAs, launches and giveaways have a written yes from the moderators.
- [ ] No coin price talk or "buy" language; coin mentions end with "Not financial advice."

## Pitfalls

- **Treating 10% as sitewide permission.** It is a common community rule, not a Reddit entitlement. A subreddit that
  bans self-promotion bans it even if your ratio is perfect.
- **Hiding the AI.** A character account written as if a human were typing is impersonation under Reddit's rules and
  gets reported fast. Say it once in the bio and again wherever AI media appears.
- **Cross-posting one text everywhere.** It trips spam filters and the 12-hour similar-content pause. Write for each room.
- **Arguing with AutoModerator.** Reposting a removed post looks like evasion. Read the removal reason, fix it, or ask
  the mods.
- **Building a Reddit bot in late 2026.** New public API requests close on 31 October 2026 and access winds down by
  March 2027. Don't plan a product around it.
- **Paying for reach the wrong way.** Bought upvotes, aged accounts and paid mods get accounts and domains banned. The
  sanctioned paid route is Reddit Ads or promoting your own post with the rocket icon.
- **Buying in by "giving back" tokens or allocations.** Offering crypto to moderators or users for posts is both a
  Code of Conduct breach and a financial promotion. Don't.
- **Dropping links in DMs.** Unsolicited outreach by DM or chat is spam on Reddit, automated or not.

## Related skills

- [engagement-and-replies](../engagement-and-replies/SKILL.md) — reply triage and tone, which carries straight over to Reddit comments.
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md) — labels for AI media everywhere.
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — coins, FCA, MiCA and "Not financial advice."
- [giveaways-and-contests](../giveaways-and-contests/SKILL.md) — official rules before any Reddit giveaway.
- [newsletter-growth](../newsletter-growth/SKILL.md) — where Reddit readers go once they want more.
- [x-playbook](../x-playbook/SKILL.md) — the same honest-automation approach on X.
