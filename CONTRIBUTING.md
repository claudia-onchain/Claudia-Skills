# Contributing

Thanks for helping Claudia's library grow. A good skill is one an agent can follow from top to bottom and end up with
real, safe output, and one a person can read in five minutes and trust.

## Where things go

```
skills/<category>/<slug>/
  SKILL.md            required
  references/*.md     deeper material, loaded only when a step says so ("read references/x.md when …")
  templates/*         copy-paste prompt / caption / calendar / brief templates (md, json, csv, yaml)
  examples/*.md       worked examples
  scripts/*           optional helpers: Node ≥ 20 or POSIX sh, no network unless the skill says so, no secrets
```

Categories: `create` (content creation and AI generation), `grow` (influencer growth, marketing, business), `build`
(agents, the Claudia platform, packages, onchain ops). The folder name is the skill's `name`.

## SKILL.md format

It follows the [Agent Skills specification](https://agentskills.io/specification), plus a fixed `metadata` block the
website reads.

```markdown
---
name: captions-and-hooks
description: Writes scroll-stopping first lines and captions for short vertical videos, with the AI label built in. Use when a clip needs a hook, an on-screen line or a caption for TikTok, Reels or Shorts.
license: MIT
metadata:
  title: "Captions and hooks"
  category: create
  summary: "First lines that stop the scroll and captions that keep the promise."
  level: beginner
  tags: "captions, hooks, short-form"
  uses: "@useclaudia/social"
  time: "20 min"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Captions and hooks

Two or three sentences: the outcome.

## When to use this
## What you need
## Steps
## Templates
## Check before you finish
## Pitfalls
## Related skills
```

Rules the validator enforces:

- `name`: 1–64 characters, lowercase letters, digits and single hyphens, no leading or trailing hyphen, equal to the
  folder name, and no reserved words (`anthropic`, `claude`).
- `description`: what the skill does **and** when to use it, third person, 1–1024 characters, no XML tags. This is what
  agents match on. Put the key trigger words in the first 200 characters: some apps show or keep only the start (older
  claude.ai help pages list a 200-character cap; the current docs allow 1024, checked 2026-10).
- `license: MIT`.
- `metadata` is a flat map of **strings**. Quote values that YAML would read as something else (`"1.0.0"`,
  `"2026-10-08"`, `"true"`). Lists are comma-separated strings (`tags`, `uses`). Required: `title`, `category` (equal to
  the folder), `summary` (≤ 140 characters), `level` (`beginner` | `intermediate` | `advanced`), `tags`, `time`,
  `version` (semver), `updated` (`YYYY-MM-DD`). Optional: `uses`.
- The body has a `# Title` and the seven `##` sections above, in that order.
- At least one file in `templates/` or `examples/`.
- Every relative link resolves. Link other skills by path: `../../grow/posting-schedule/SKILL.md`.
- The body stays under about 450 lines (warning). Push depth into `references/` and say when to read each file.

## Checklist before you open a pull request

- [ ] `node scripts/validate.mjs` passes with no errors (and you read the warnings).
- [ ] Steps are numbered, concrete and current: real commands, real prompts, real numbers with a date
      ("checked 2026-10") next to anything that changes (limits, prices, model names, platform rules).
- [ ] Platform facts are verified against the platform's own docs, not memory.
- [ ] Commands for `@useclaudia/sdk`, `cli`, `media`, `social` and `mcp` match their READMEs.
- [ ] Templates are filled in enough to copy, with clear `<placeholders>` and no filler text.
- [ ] "Check before you finish" says how the agent knows it's done, and that it's safe.
- [ ] Related skills link to skills that exist.

## Safety rules (every skill)

- **Keys:** users bring their own keys. Never ask an agent to print, paste, log or commit a secret. Keys live in the
  environment or the OS keychain. The validator rejects anything that looks like a live key.
- **Label AI content**, always: captions, alt text, profile bios where the platform asks.
- **Adults only.** Characters are adults, always.
- **No impersonation** of real people, no fake reviews or testimonials.
- **No fake engagement:** no bot farms, bought followers, follow-unfollow, engagement pods or comment spam. Respect each
  platform's automation rules and rate limits.
- **Money and crypto:** "not financial advice"; no price or return promises; `#ad` (or the platform's paid-partnership
  label) on paid promotion; take care with UK FCA financial-promotion rules and EU MiCA for crypto. Solana is listed first
  wherever chains are listed.
- **A human approves** before anything publishes, sends, signs or spends money.
- **Wording:** never call AI models "free". Neutral pronouns for users; Claudia is "she". Claudia never names the model
  she runs on.
- Scripts make no network calls unless the skill says so, and never read files outside the working directory without
  asking.
- Original work only: no lorem ipsum, no copied text or images from other sites.

## Building

```sh
node scripts/validate.mjs [slug …]   # --strict turns warnings into errors, --complete requires all 54 assigned skills
node scripts/build.mjs               # index.json + dist/ zips + README tables
```

`index.json` and the README tables are generated; edit the skills, then rebuild. `dist/` is not committed.

By contributing you agree that your work is released under the [MIT License](LICENSE).
