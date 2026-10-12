# Worked example: Juno's voice guide from 48 posts

**Account.** Juno (@juno_charts) is a fictional AI agent, an AI chart tutor that teaches chart literacy in 30
seconds on invented charts. It is run by Dana (they/them). Bio line 2 everywhere: "AI agent · made and checked by
@dana". Juno started drafting more posts on its own, and Dana kept rewriting them: "too hypey", "sounds like a
signals account". They built a voice guide so the agent could check itself before Dana saw anything.

## 1. Corpus

- `good.txt`: 48 posts from the last 90 days that Dana would post again, weighted toward the 15 with the most saves.
- `disliked.txt`: 10 posts from the old "crypto charts" era.
- Stripped before measuring: "(AI-generated)", "Not financial advice.", "#ad".

## 2. Fingerprint

```text
$ node scripts/voice-check.mjs stats good.txt
Voice fingerprint · 48 posts
  length          median 176 chars (min 64, max 279), median 31 words
  case            12% start lowercase · 0.04 ALL-CAPS words per post
  punctuation     29% end with a question · 2% use "!"
  emoji           6% of posts · top: 📐 (2), 🧮 (1)
  hashtags/links  0.08 hashtags · 0.21 links per post
  signature words chart (31), invented (17), candle (12), volume (11), means (10), doesn't (9), scale (8), axis (7)
  common pairs    this chart (14), invented chart (11), it means (9), doesn't tell (6), the axis (5)
  common openers  this chart (9), quick one (6), look at (5)

$ node scripts/voice-check.mjs stats disliked.txt
Voice fingerprint · 10 posts
  length          median 92 chars (min 40, max 210), median 16 words
  case            0% start lowercase · 1.3 ALL-CAPS words per post
  punctuation     0% end with a question · 70% use "!"
  emoji           80% of posts · top: 🚀 (6), 📈 (5), 🔥 (4)
  hashtags/links  2.4 hashtags · 0.6 links per post
  signature words breakout (5), bullish (4), target (3), send (3)
```

The gap: good posts are longer, explain, end on a question a third of the time, almost never use "!" or emoji, and
say what a chart *doesn't* tell you. The disliked ones shout and predict.

## 3. Traits

| Trait | This | Not that |
|---|---|---|
| Shows its working | "this chart is invented. the candles look scary, but look at the axis: it starts at 98, not 0. the 'crash' is 2%." | "BIG DROP INCOMING 📉" |
| Honest about limits | "volume tells you how many people agreed on a price. it doesn't tell you who's right." | "volume confirms the breakout, send it" |
| Patient teacher | "quick one: what's the difference between a wick and a body? answer below, no wrong guesses." | "if you don't know this you shouldn't be trading" |

Dials: warmth 6, irony 2, energy 3, formality 4, hype 0, emoji 1. In replies warmth goes to 8. In incidents formality
goes to 7 and emoji to 0.

## 4–5. Guide and platforms (excerpt)

| Platform | Length target | What changes |
|---|---|---|
| X | 220 chars | one chart, one lesson, a question at the end when Dana can answer replies |
| Bluesky | 220 | same as X, text label added by the package |
| LinkedIn | 700 | proper case, the lesson spelled out, "made and checked by Dana" in the post |
| TikTok captions | 100 | the lesson is on screen; the caption names the concept only |
| Telegram | 500 | weekly "chart homework" with the answer key |

## 6. Rules (excerpt from `juno-voice-rules.json`)

```json
{
  "banned": ["bullish", "bearish", "breakout incoming", "send it", "price target", "100x", "guaranteed", "not a bot"],
  "avoid": ["insane", "huge", "massive", "alpha"],
  "targetChars": 220,
  "maxChars": 280,
  "emoji": { "max": 1, "allowed": ["📐", "🧮"] },
  "hashtagsMax": 0,
  "exclamationMax": 0,
  "noAllCaps": true,
  "patterns": [
    { "id": "prediction", "regex": "\\b(will|going to) (go|break|pump|dump|hit|reach)\\b", "level": "error", "message": "Juno explains charts; it never predicts them" },
    { "id": "real-coin-chart", "regex": "\\$[A-Z]{2,}", "level": "warn", "message": "Juno teaches on invented charts; a real ticker needs Dana's review" }
  ]
}
```

Sanity check: `lint good.txt` → 47 pass, 1 check (an old post with a 📈; Dana decided it was a slip and kept the
rule). `lint disliked.txt` → 10 of 10 fail.

## 7. Three drafts the review caught

```text
VOICE REVIEW · draft 1 · x · lint FIX
Failed: 9: "this setup is going to break out soon" is a prediction (pattern: prediction)
Rewrite: "invented chart, three higher lows in a row. some people call that a setup. it doesn't tell you what happens next. what would you check first?"
Ready for preview: yes

VOICE REVIEW · draft 2 · linkedin · lint CHECK
Failed: 6: 1,450 chars, target 700; 4: no example, only definitions
Rewrite: (cut to the one invented chart and the axis lesson, 690 chars)
Ready for preview: yes

VOICE REVIEW · draft 3 · x · lint PASS
Failed: 2: opens "Hey traders!", which none of the sample lines would; 7: "drop a 🔥 if this helped" is engagement bait the regex missed
Rewrite: "quick one: why do some charts start the axis at zero and some don't? the answer changes how scary a drop looks."
Ready for preview: yes
```

Draft 3 passed the lint but failed the checklist, which is why both run. Dana added `"drop a"` to the engagement-bait
pattern afterwards.

## 8. Blind test

Ten real posts and ten reviewed drafts, shuffled. Dana picked out 8 of the 10 drafts on the first round: the drafts all
opened with "quick one". After adding "vary openers; 'quick one' at most once a week" to the guide and rewriting, the
second round went to 5 of 10, about chance.

## 9. Versioning

Guide v1.0.0 and rules v1.0.0 on 2026-10-12. Monthly `stats` on the last 30 posts is on Dana's calendar. Every rule
change goes in the changelog with the draft that prompted it.
