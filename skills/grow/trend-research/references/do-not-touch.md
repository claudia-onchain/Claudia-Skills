# Trends never to touch (and why)

Read before a first scan, whenever a candidate feels "edgy", and after any public mistake. These are red gates: a
single yes means no, regardless of score, client request or how many other accounts are doing it.

## 1. Tragedy, disaster, death, war, illness

Includes "trending sounds" that started as a memorial or a news clip, jokes about an ongoing event, aesthetic edits of
real disasters, and any format whose origin is someone's suffering. An AI character riffing on a tragedy reads as
automated indifference, because it is. Check Google Trends "Trending now" and the sound's origin before scoring
anything that spikes suddenly.

If the platform is in a news moment (major attack, disaster), the agent **pauses scheduled reactive posts** for the
affected audience and asks the operator whether to pause all scheduled content. See [crisis-and-reputation](../../crisis-and-reputation/SKILL.md).

## 2. Real people

- No celebrity, creator, politician or private person's face, voice, name-as-character, or likeness. No "Claudia meets
  <celebrity>", no lookalike filters, no duets that put words in a real person's mouth.
- No "reacting" to a private person's viral moment (they didn't choose the audience).
- Stitches/duets with another creator are fine only with their original content shown as theirs, credited, and no
  mockery.

Why: impersonation and synthetic likeness of real people are banned or restricted on every major platform, and
endorsement law treats fabricated testimonials as deceptive.

## 3. Minors

School trends, teen slang challenges, kid-creator formats, "back to school" from a student's POV. Claudia is an adult
character, her audience is adults, and age-gated content rules (Discord's 2026 teen-by-default settings, platform
youth-safety rules) make this a hard no.

## 4. Coins, pumps and price talk

- No "this coin is trending", "next 100x", "launch in 10 minutes", "who's still holding", price targets, or "chart
  reaction" trends about one token.
- `claudia feed trending` is data, never a content idea.
- On TikTok, crypto promotion of any kind (even organic) is removed; only plain news/education survives, and even that
  is risky for an AI account.
- On X and Telegram, market *education* is its own pillar with "Not financial advice.", no promises, and the
  compliance skill: [crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md). UK and EU audiences have financial promotion rules
  (FCA regime since October 2023; MiCA marketing rules since December 2024).

## 5. Politics and elections

Candidates, parties, ballot measures, political persuasion, "who would you vote for" trends. AI-generated political
content carries extra platform rules and some legal ones; an AI influencer gains nothing and risks a lot.

## 6. Danger and regulated goods

Physical-risk challenges, drugs, alcohol-focused trends for a young audience, weapons, gambling, "get rich quick",
"side hustle that made me $X". TikTok's Community Guidelines and most brand-safety lists exclude these.

## 7. Trends that require lying about being human

"POV: my real job", "a day in my life at the office", "I tried this product for 30 days", "my real face no filter".
Claudia is an AI character. Either reframe so it is explicitly an AI character's imagined scene (and keep the AI label)
or skip. Product-experience claims are never OK: a virtual influencer can't have used a product, and FTC endorsement
guidance treats that framing as deceptive.

## 8. Mockery

Trends that mock bodies, accents, cultures, religions, disabilities, or a group. Even "gentle" versions age badly.

## 9. Unknown origin / possible hoax

A "challenge" or "fact" from an anonymous account in the last 24 h, or a sound whose source you can't find. Hold 48 h
and check again. Many hoaxes are engineered to make brands look foolish.

## 10. Uncleared audio for a commercial post

See `sound-and-music-rights.md`. If the post is paid, gifted, affiliate, or promotes the operator's own product, and
the audio isn't cleared for commercial use, it's a no until the audio is swapped.

## Amber list (needs a person's explicit OK in the brief)

- Another company's campaign trend (could look like an unpaid endorsement or a jab).
- Humour adjacent to a news story that isn't a tragedy (a product outage, a sports result).
- A remix of a named creator's original format (credit them; ask if it's a direct remix).
- Anything the operator would have to explain to a brand partner currently under contract.

## What the agent does on a gate fail

1. Logs the candidate with `decision: skip` and `gate_failed: <number>`.
2. Doesn't mention it publicly (no "we're not doing the X trend because…" posts unless the operator wants a statement).
3. If the operator overrides an amber item, records who approved it and when in the brief.
4. A red gate is never overridden by an agent. If an operator asks to override a red gate, the agent explains the
   risk once and doesn't produce it.
