# Severity matrix and detection signals

Use this when a case doesn't fit the four-row table in SKILL.md. Score the three axes, take the **highest**, then apply
the overrides.

## 1. Three axes

| Axis | 1 (low) | 2 | 3 | 4 (high) |
|---|---|---|---|---|
| **Harm** | Embarrassing only | Misleading, low stakes (wrong date) | Could cost people money or expose them to a scam | Physical, sexual, hateful, doxxing, self-harm, or legal exposure |
| **Reach** | < 1,000 views, no reposts | 1k–10k views or a mid-size account reposted it | 10k–100k views, press or large accounts picking it up | > 100k, trending, or mainstream press |
| **Control** | Fixed by editing/deleting our own post | Needs a correction across 2+ channels | Others are copying it (scam pages, quote-posts) | We have lost control (account compromised, key leaked) |

Mapping: highest score 4 → SEV1, 3 → SEV2, 2 → SEV3, 1 → SEV4.

## 2. Overrides (always SEV1)

- Any sign of account compromise: posts nobody drafted (no `draft` line in `audit.jsonl` for a live post), unknown
  sessions, changed email/phone, a developer app you don't recognise with write access.
- Any key, seed phrase, wallet file or API key shown in a post, screenshot, video frame or log shared publicly.
- Posts that ask for deposits, show a QR code to send crypto, or link to a wallet drainer.
- Sexual content involving the character, or anything that could be read as involving a minor (Claudia is always an
  adult; any doubt about age depiction is a SEV1 takedown).
- A regulator, police, or a lawyer's letter.

## 3. Overrides (at least SEV2)

- Wrong contract/mint address, wrong ticker, wrong chain, or a fake partnership/listing claim, live.
- An impersonator account or scam coin using the agent's name that is actively collecting money.
- A deepfake of the character spreading (any reach).
- A platform warning, strike, label or demonetisation notice.
- A post that broke the platform's crypto rules (for example a ticker on TikTok) and is drawing reports.

## 4. Signals an agent can watch automatically

| Signal | How | Threshold to page a person |
|---|---|---|
| Reply sentiment spike | `social.inbox({ since })` every 15 min (mind X read costs: $0.005 per post read, checked 2026-10) | ≥ 5 replies in 15 min containing scam, rug, hacked, fake, wrong, delete, report |
| Unknown publish | `social.on("audit", …)`: a `publish` whose post has no prior `approve` by a known approver | Any → SEV1 |
| Post blocked after publish | `social.on("post", …)` status `partial`/`failed` with `uncertain: true` | Review within 30 min |
| Thread chatter | `claudia watch thread --match "claudia.*(scam|rug|fake|hacked)" --json` | ≥ 3 matches in 10 min |
| Impersonators | Daily search for the name + "official", "airdrop", "giveaway" on each platform | Any new lookalike → SEV2 if collecting money, else SEV3 |
| Coin crash | `claudia watch <mint> --min-usd 5000` on coins the agent launched | Price −50% in 1 h → prepare the crash statement (don't post unprompted) |
| Platform notices | Account email and in-app notifications, checked by a person daily | Any strike → SEV2 |

Agents may switch the kill switch **on** by themselves when a SEV1/SEV2 signal fires. They never switch it **off**.

## 5. Response time targets

| | Acknowledge internally | Kill switch | Holding statement | Correction / fix | Post-mortem |
|---|---|---|---|---|---|
| SEV1 | 5 min | 5 min | 60 min | 24 h | 72 h, public summary |
| SEV2 | 15 min | 15 min | 60–120 min | 24 h | 72 h, public summary |
| SEV3 | 4 h | autonomous posting paused | same day | 48 h | 1 week, internal |
| SEV4 | next review | no | none | when convenient | none |

## 6. Examples

| Case | Harm/Reach/Control | Level |
|---|---|---|
| Claudia's X post gives the wrong CA for a coin; 2,300 views in 14 min | 3 / 2 / 2 | SEV2 |
| A TikTok caption has a typo in a city name | 1 / 1 / 1 | SEV4 |
| Juno's loop posts a chart explainer with a mislabeled axis; a big account quote-posts it mocking it | 2 / 3 / 2 | SEV2 by reach; handled as a correction |
| `@claudia_onchainn` (extra n) runs a "send SOL, get double back" giveaway | 3 / 2 / 3 | SEV2 |
| Claudia's X account posts a drainer link nobody drafted | 4 / any / 4 | SEV1 |
| A sexualised deepfake of Claudia on a forum, 200 views | 4 / 1 / 3 | SEV1 (harm 4) |
