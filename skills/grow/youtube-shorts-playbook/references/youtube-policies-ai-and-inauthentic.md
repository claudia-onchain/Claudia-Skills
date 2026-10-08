# YouTube policies for AI characters: synthetic disclosure, inauthentic content, finance, scams (checked 2026-10)

Read this before the first upload of a new channel, before applying for YPP, and whenever a Short touches money.

## Altered or synthetic content disclosure

**Must disclose** (Studio → Details → "Altered or synthetic content" → Yes; API `status.containsSyntheticMedia: true`):

- A realistic-looking person who doesn't exist, or a real person's face/voice replaced.
- A synthetic voice that sounds real (Claudia's generated voice notes, lip-synced clips).
- Altered footage of real places or events (a real skyline set on fire, a fake storm over a real city).
- Realistic generated scenes a viewer could mistake for real footage.

**No disclosure needed on its own**: AI help with scripts, captions, titles, ideas; clearly unrealistic content
(cartoon, obvious fantasy); colour correction, background blur, beauty filters; a generic TTS voice that doesn't
imitate a person.

What happens:

- The label shows in the description ("Altered or synthetic content"); for sensitive topics (health, news, elections,
  finance) it shows on the player itself.
- Since 27 May 2026 YouTube applies the label automatically when it detects synthetic media (SynthID, C2PA) and the creator
  didn't. Repeated non-disclosure can lead to removal, strikes or YPP suspension.
- YouTube's own generators (Dream Screen, Veo in Shorts, Reimagine) add SynthID and labels automatically.

For Claudia: every Short is "Yes". Add the description line too, because embeds and some surfaces don't show the label.

## Impersonation and likeness

- Never generate a real, identifiable person (celebrity, creator, politician) in a Claudia or Juno Short. YouTube's privacy
  complaint process lets people request removal of AI content that simulates them, and the likeness-detection tool for
  partners flags it.
- Claudia herself is an original character; don't let her be confused with a real influencer (no copied looks, names or
  catchphrases).

## Inauthentic content (YPP)

YouTube renamed "repetitious content" to **inauthentic content** on 15 July 2025 and enforces it at **channel** level in
2026. A January 2026 wave removed or demonetized channels with ~35 M combined subscribers built on synthetic narration,
templated thumbnails and stock footage. Patterns flagged in 2026 enforcement summaries:

- AI voiceover without on-screen human commentary or creative input.
- Compilations of unmodified clips; news-reader channels reading articles verbatim.
- "Faceless Shorts farms" uploading 10+ near-identical Shorts a day.
- Videos that differ only by a word or a background (template churn).
- Sudden topic pivots that look like algorithm-chasing.
- (Reported in July 2026 policy commentary) AI personas presenting health, finance or legal advice.

What a defensible AI-character channel has:

| Signal | Claudia example |
|---|---|
| Consistent character with a personality | Same look, same dry-warm voice, recurring places and a cat |
| Varied, authored structure | Three series with different shapes; each Short has a scene, not just a template |
| Human creative direction | Storyboards and edit choices by a person; documented in the production log |
| Honest disclosure | Synthetic toggle + description line on every Short |
| Sustainable cadence | 4–6 a week, not 30 |

Keep a short production log (who decided the idea, the edit, the approval) — it is the evidence if a reviewer asks.

## Finance, crypto and scams

- **Spam, deceptive practices and scams policy**: no giveaways that ask for crypto, no "send X get 2X", no promises of
  returns, no links to phishing/drainer sites, no fake live streams of exchanges or founders. Channels get terminated, often
  after one strike for scams.
- **Advertiser-friendly guidelines**: promoting get-rich-quick schemes, unregulated investments or "guaranteed" profits
  gets limited or no ads.
- **AI persona + finance**: treat as non-monetizable and high risk. Juno-style chart *literacy* ("why patterns fail",
  "what a candle shows") is the limit; no coin names with buy/sell framing, no price targets, no "I made X%".
- **Law** still applies on YouTube: UK FCA financial promotion rules for cryptoassets, EU MiCA marketing rules, US FTC
  disclosure. See [../../crypto-marketing-compliance/SKILL.md](../../crypto-marketing-compliance/SKILL.md).
- `@useclaudia/social` adds "Not financial advice." when text mentions a coin, ticker, price or contract address, and
  blocks promise phrases. It is a floor, not a defence.

## Paid promotion

Studio → Details → "Paid promotion" → tick "My video contains paid promotion like a product placement, sponsorship or
endorsement" (shows "Includes paid promotion" on the video). Add `#ad` / "Ad" in the first description line for UK/US
rules. An AI character can't claim to have used a product; describe the real relationship ("Northpine sponsored this
Short; Claudia is AI-generated").

## Sources

- YouTube Help, disclosing altered or synthetic content — https://support.google.com/youtube/answer/14328491
- YouTube blog, "How we're helping creators disclose altered or synthetic content" — https://blog.youtube/news-and-events/disclosing-ai-generated-content/
- YouTube Partner Program policies, inauthentic content — https://support.google.com/youtube/answer/1311392
- AIR Media-Tech, YouTube monetization policy changes 2026 timeline — https://air.io/en/monetization/youtube-monetization-policy-changes-2026-a-complete-dated-timeline
- Logie.ai, YouTube AI slop crackdown 2026 — https://logie.ai/news/youtube-ai-slop-crackdown-2026-monetization/
- Spam, deceptive practices and scams policies — https://support.google.com/youtube/answer/2801973
- Paid product placements and endorsements — https://support.google.com/youtube/answer/154235
