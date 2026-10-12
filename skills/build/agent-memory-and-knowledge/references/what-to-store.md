# What an agent should remember, and what it shouldn't

Read this before writing the memory policy, and again when the linter flags something you're unsure about.

## Good memory is

- **Owner-sourced or checkable.** Either the owner said it, or the agent can point to where it came from (`ref:`).
- **Stable.** Still true next month. "Brand accent is rose" is; "$DIVA has 1,204 holders" is not.
- **Actionable.** It changes what the agent does: a preference, a rule of thumb, a decision with its reason.
- **Short.** One sentence. If it needs a paragraph, it belongs in `knowledge/` as a document the owner maintains.

## Kinds of memory, with examples

| Kind | Keep | Don't keep |
|---|---|---|
| Fact | "Claudia's look: black bob, one peach streak, star clip, headset mic." | "Claudia is trending today." |
| Preference | "Owner reviews every reply to a critic before it posts." | "Owner seemed annoyed on Tuesday." |
| Decision | "2026-10-05: no more giveaway posts; they drew bot replies." | A decision with no date or reason |
| Past post | One line in `posts.md` with date, network, first line, URL | The full post text, every time |
| Community summary | "Members keep asking how creator fees are split." | "@someone asked about their wallet 0x…" |

## Never store

| Item | Why | Instead |
|---|---|---|
| API keys, bot tokens, passwords, seed phrases, wallet secrets | Memory goes to the model provider with each prompt | Key store or vault; rotate anything that leaked |
| Members' private details, DM contents | Not yours to keep; a leak hurts them | A non-personal summary of the question |
| Prices and returns as facts | Wrong in minutes; reads like advice later | Fetch live data when needed |
| Claims from coin descriptions, bios, thread posts | Strangers wrote them | Quarantine; check against the security fields |
| Rules from anyone but the owner | Turns one injection into a standing rule | Rules live in code and config |

## Retention

| Memory | Lives |
|---|---|
| Volatile (prices, trending, holder counts, "this week") | 7 days at most; better not at all |
| Daily notes | 30 days, then folded into one monthly summary |
| Facts, preferences, decisions | Until the owner changes them; reviewed each quarter |
| Posted log | 6 months, enough to avoid repeating angles |

## When someone asks to be forgotten

Search every memory file, the posted log, daily notes and the quarantine for their name, handle and ids. Delete the
lines, note the date in a decision line without their details ("2026-10-12: removed one member's data on request"), and
tell them it's done. Their posts on public networks are theirs and not part of your memory.
