---
name: brand-voice-guidelines
description: Derives a written brand voice guide from an account's existing posts instead of from adjectives — measures the voice with a script (length, case, punctuation, emoji, signature words, openers), reads it for traits, tone dials and vocabulary, writes do/don't pairs and per-platform adjustments (X, Threads, Bluesky, Farcaster, LinkedIn, Instagram, TikTok, Telegram, newsletter), encodes the checkable parts in a voice-rules.json, and gives agents an enforce-voice review they run on every draft (a lint script plus a checklist) before preview and human approval. Use when an AI character, agent, creator or brand needs a voice guide, when drafts "don't sound like us", when onboarding a new writer or agent, or when posts drift across platforms.
license: MIT
metadata:
  title: "Brand voice guidelines"
  category: "grow"
  summary: "Turn your best posts into a voice guide, per-platform rules and a review an agent runs on every draft."
  level: "intermediate"
  tags: "brand voice, tone of voice, style guide, copywriting, consistency, agents, review, per platform"
  uses: "@useclaudia/social"
  time: "2 hours to build, 1 min per draft to review"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Brand voice guidelines

A voice guide written from adjectives ("witty, warm, bold") gives every writer and every agent a different voice.
This skill builds the guide from the posts that already sound right: it measures them, reads them, and writes down
what they do in rules and examples. The checkable rules go into a file that a script enforces; the rest goes into a
short review an agent runs on each draft before a person approves it.

## When to use this

- An AI character, agent, creator or brand has 30+ posts and needs a written voice guide.
- Drafts from an agent or a new writer "don't sound like us", and nobody can say why.
- The account sounds different on X, LinkedIn and Telegram, and not on purpose.
- Before switching an agent to more autonomous drafting ([autonomous-posting-loop](../../build/autonomous-posting-loop/SKILL.md)).
- Building a brand-new voice: write 30 sample posts by hand first, then run this on them.

For positioning, audience and pillars, start with [personal-brand-strategy](../personal-brand-strategy/SKILL.md);
this skill goes deeper on the words. For Claudia, the source of truth stays her
[character bible](../../create/claudia-character-bible/SKILL.md) and its voice reference; this skill's example rules
file encodes them.

## What you need

- 30–100 past posts the owner likes (text only), plus 10 they would never post again. Export as a `.txt` (posts
  separated by `---` lines) or a `.csv` with a `text` column. Use the account's own exports or copy-paste; no scraping.
- Basic numbers per post if available (saves, replies, follows) to weight the best ones.
- Node 20+ for [scripts/voice-check.mjs](scripts/voice-check.mjs) (no dependencies, no network).
- The owner, for 30 minutes in step 8.
- [references/voice-extraction-method.md](references/voice-extraction-method.md) — how to read a corpus for traits,
  dials and vocabulary. Read it before step 3.

## Steps

1. **Collect the corpus.** Pick the 30–100 posts that sound most like the account at its best, weighted toward the
   ones with the most saves, replies or follows. Add a separate file of 10 posts the owner dislikes. Strip AI labels,
   `#ad` and "Not financial advice." lines before measuring; they are rules, not voice.

2. **Measure the fingerprint.**

   ```sh
   node scripts/voice-check.mjs stats posts.txt
   node scripts/voice-check.mjs stats disliked.txt
   ```

   It prints median length, lowercase starts, questions and exclamation marks, emoji share and top emoji, hashtags and
   links per post, ALL-CAPS words, signature words, common word pairs and openers. The gap between the two files is
   the voice: what the good posts do that the bad ones don't.

3. **Read for traits, dials and vocabulary.** Follow
   [references/voice-extraction-method.md](references/voice-extraction-method.md): mark each post for what it does
   (notices a detail, jokes at itself, asks, teaches), then name **three traits**, each with a "this, not that" pair of
   real lines. Set the tone dials (warmth, irony, energy, formality, hype, emoji). List words the voice uses and
   words it never uses.

4. **Write the guide.** Fill [templates/voice-guide.md](templates/voice-guide.md): one-paragraph summary, traits with
   pairs, dials, vocabulary, sentence habits, how it asks for action, how it replies, how it handles disagreement,
   bad news and coin questions, how it says it is AI, and 10 sample lines plus 5 never-lines. Keep it to two pages;
   agents imitate examples better than adjectives.

5. **Set per-platform adjustments.** The voice stays; length, structure and formality move. Fill the table in the
   guide. Starting points (limits from the platform rules in
   [captions-and-hooks](../../create/captions-and-hooks/references/platform-caption-rules.md), checked 2026-10):

   | Platform | Limit | What changes | What never changes |
   |---|---|---|---|
   | X | 280 standard | Shortest; one idea; questions you will answer | Traits, vocabulary, labels |
   | Threads | 500 | A little warmer and chattier; one topic tag | |
   | Bluesky | 300 | Plain, conversational; text `(AI-generated)` label | |
   | Farcaster | — | Builder-facing, more technical, fewer jokes about crypto | |
   | LinkedIn | 3,000 | Proper case, full sentences, the lesson spelled out, no emoji | |
   | Instagram / TikTok captions | 2,200 (TikTok 4,000 in-app) | Short caption, the hook lives on screen | |
   | Telegram | 4,096 | Longer notes, lists, links; community tone | |
   | Newsletter | — | Long form, the "why" behind posts ([newsletter-writing](../../create/newsletter-writing/SKILL.md)) | |

6. **Encode the checkable rules.** Copy [templates/voice-rules.json](templates/voice-rules.json) and fill it from steps
   2–5: banned and avoided phrases, target and max length per platform, emoji count and set, hashtags, exclamation
   marks, ALL-CAPS, lowercase starts, and regex patterns for things like engagement bait, buy calls and model names.
   Claudia's filled file is [examples/claudia-voice-rules.json](examples/claudia-voice-rules.json).

7. **Review every draft for voice.** This is the enforce-voice review. Before any draft goes to preview:

   ```sh
   node scripts/voice-check.mjs lint drafts.txt --rules voice-rules.json --platform x
   ```

   Exit `0` means pass or check, `3` means at least one error (banned phrase, over the limit, a coin without "Not
   financial advice.", a buy call). Then the agent answers the 10 questions in
   [templates/voice-review-checklist.md](templates/voice-review-checklist.md) and writes one line per failed item.
   A failed draft is rewritten, not argued with. Passing drafts go to `social.preview()` and a person approves; the
   review never replaces the human approval.

8. **Calibrate with a blind test.** Mix 10 real posts with 10 agent drafts that passed the review; the owner marks
   which are real. If they can spot drafts easily, find the tell (too long, too polished, the same opener) and add it
   to the guide or the rules. Repeat until the owner gets no more than about 6 of the 10 drafts right.

9. **Version and maintain.** Put a version and date on the guide and the rules file. Re-run `stats` on the last 30
   posts every month; if the fingerprint moved on purpose, update the guide; if it drifted, fix the drafting. Log
   every change in the guide's changelog.

A worked example, building Juno's voice guide from 48 posts and catching three drifting drafts, is in
[examples/juno-voice-guide.md](examples/juno-voice-guide.md).

## Templates

- [templates/voice-guide.md](templates/voice-guide.md) — the two-page guide: summary, traits, dials, vocabulary,
  habits, per-platform table, samples, never-lines, changelog.
- [templates/voice-rules.json](templates/voice-rules.json) — machine-checkable rules for the lint script.
- [templates/voice-review-checklist.md](templates/voice-review-checklist.md) — the enforce-voice review an agent runs
  on each draft, with the output format.
- [scripts/voice-check.mjs](scripts/voice-check.mjs) — `stats` (fingerprint) and `lint` (rules check).

Review output format for an agent:

```text
VOICE REVIEW · draft <n> · <platform> · lint <PASS|CHECK|FIX>
Failed: <item number>: <one line why> …
Rewrite: <the fixed draft, if anything failed>
Ready for preview: <yes|no>
```

## Check before you finish

- [ ] The guide is built from real posts, with every trait backed by a "this, not that" pair of real lines.
- [ ] The rules file parses and the lint runs clean on the 10 best real posts (adjust rules that flag them).
- [ ] The lint fails on the disliked posts for the reasons the owner gives.
- [ ] Per-platform table filled; the never-change column says traits, vocabulary and labels.
- [ ] Banned list covers price promises, buy calls, claims to be human and model names (for AI characters).
- [ ] The review runs before preview, and a person still approves every post.
- [ ] Guide and rules carry a version, a date and a changelog.

## Pitfalls

- **Adjectives instead of examples.** "Witty" means ten things. Show the line.
- **Copying the best post forever.** The fingerprint is a range, not a template. Vary openers or the feed repeats.
- **Measuring labels as voice.** "Not financial advice." and "(AI-generated)" are rules; strip them before `stats`.
- **One voice, one length everywhere.** LinkedIn and X need different shapes of the same voice.
- **Rules that flag the real posts.** If the lint fails your own best post, the rule is wrong, not the post.
- **Letting the review approve.** A passing lint means "ready for a person", not "ready to publish".
- **Imitating a real person's voice.** A guide may learn from the account's own posts only, never clone a specific
  real creator.

## Related skills

- [personal-brand-strategy](../personal-brand-strategy/SKILL.md) — positioning, pillars and the never-list the voice serves.
- [claudia-character-bible](../../create/claudia-character-bible/SKILL.md) — Claudia's voice at the source.
- [captions-and-hooks](../../create/captions-and-hooks/SKILL.md) — hooks and captions written in the voice.
- [engagement-and-replies](../engagement-and-replies/SKILL.md) — the reply side of the voice.
- [agent-persona-and-system-prompt](../../build/agent-persona-and-system-prompt/SKILL.md) — loading the guide into an agent.
- [crypto-marketing-compliance](../crypto-marketing-compliance/SKILL.md) — the coin rules the banned list encodes.
