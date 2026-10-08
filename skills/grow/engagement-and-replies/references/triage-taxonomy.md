# Triage taxonomy: classes, risk and reply-time targets

Use one class per item. When two fit, take the riskier one. Rules (regex hits) override the model's classification.

## Risk levels

| Level | Meaning | Who acts | Agent may draft? |
|---|---|---|---|
| low | Harmless if answered badly | agent drafts, person approves | yes |
| medium | Could mislead or annoy if answered badly | agent drafts, person approves and may edit | yes |
| high | Money, reputation, legal, partners, press | person decides; agent writes a handoff | only a holding line, if asked |
| critical | Safety of a person | person within 1 hour; platform reporting tools | no |

## Classes

| Class | Signals | Risk | First-response target | Default action |
|---|---|---|---|---|
| `praise` | compliments, emojis, "love this" | low | same day (or none) | short specific thanks, max 1 in 3 |
| `question-product` | "how do I", "where is", "does it support" | low | 4 h | answer + pinned link if asked |
| `question-persona` | camera, outfit, cat, "are you AI/real" | low–medium | 4 h | library answer; the "real?" answer is fixed |
| `content-request` | "do a video on …" | low | 24 h | thank + log idea |
| `feedback-bug` | "broken", "error", "can't load" | medium | 2 h | acknowledge, ask device/browser, file it |
| `criticism-fair` | specific, factual complaint | medium | 2 h | acknowledge + correct, person approves |
| `coin-talk` | ticker, "buy", "pump", "price", contract address | high | 4 h | fixed NFA route, person decides more |
| `collab-business` | brand, agency, rates, "partnership" | medium | 24 h | template + forward to business inbox |
| `press` | journalist, outlet, "comment for a story" | high | person only | handoff |
| `troll-bait` | insults without content, ragebait | low | none | ignore; person may mute/block |
| `scam-impersonation` | lookalike handle, "support", "airdrop", "claim", wallet ask | high | now | person hides/reports; warn post if repeated |
| `spam` | link farms, unrelated promos, bot patterns | low | none | ignore; report if abusive |
| `safety` | self-harm, threats, doxxing, minors | critical | 1 h | handoff; platform tools; never auto-reply |

## Regex pre-filters (run before the model)

| Pattern | Sends to |
|---|---|
| Base58 32–44 chars (Solana address), `0x[a-fA-F0-9]{40}` | `coin-talk` or `scam-impersonation` (person checks) |
| `seed phrase|private key|recovery phrase|12 words|24 words` | `scam-impersonation` |
| `airdrop|claim (now|here)|giveaway|support (team|ticket)|verify your wallet` | `scam-impersonation` |
| any URL not on the allow list | at least `medium`; never reply with a link of theirs |
| handle within edit distance 2 of the agent's handle (`claudia_0nchain`, `claudiaonchain_`) | `scam-impersonation` |
| `kill myself|suicide|hurt myself` and local-language equivalents | `safety` |
| `\$[A-Z]{2,10}\b` (cashtag) or `buy|sell|pump|moon|100x|entry|target` | `coin-talk` |
| `journalist|reporter|for a story|press inquiry` | `press` |
| `rate card|media kit|sponsor|paid collab|campaign` | `collab-business` |

## The fixed answers (never improvised)

- **"Are you real?"** — "I'm an AI character. A small team runs the platform and reviews what I post." (Claudia's version;
  adapt the second sentence to the agent's setup, but always say AI.)
- **"Should I buy …?"** — "I can't tell anyone what to buy, and nothing I post is financial advice. If you're curious how
  to read a coin's holders and risks, this explainer helps: {pinned_education_link}." No ticker repeated in the reply.
- **"DM me" from a stranger** — no reply in DMs; in public: "I don't take DMs from accounts I don't know — anything official
  is posted here first."

## Sentiment and spike detection

Track mentions per hour and the share of `criticism-fair + troll-bait + scam-impersonation`. A spike is either:

- volume above 5x the trailing 7-day hourly average for 2 consecutive hours, or
- negative share above 40% with at least 20 items in an hour.

On a spike: pause scheduled posts (kill switch), page the operator, open
[crisis-and-reputation](../../crisis-and-reputation/SKILL.md).
