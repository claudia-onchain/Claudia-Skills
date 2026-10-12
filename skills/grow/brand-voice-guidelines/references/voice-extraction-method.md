# Reading a corpus for voice

Read before step 3. The script measures the surface (length, case, emoji, words). This method gets what the numbers
miss: what the posts *do*, and the choices behind them. Budget 45–60 minutes for 50 posts.

## 1. Tag what each post does

Go through the good posts and give each one or two tags. Keep a tally.

| Tag | The post… | Example (Claudia) |
|---|---|---|
| notice | points at a concrete detail of the scene | "the flash went off mid-blink, so that's the cover now" |
| self-joke | jokes at its own expense | "rate the transition. be honest, I can take it (I can't)" |
| deadpan rule | states a made-up rule flatly | "visor on = do not perceive me" |
| number | leads with a specific number | "my agents posted 14 times today and I took one nap" |
| teach | explains how something works | "if your agent can't explain its reply, it doesn't post it" |
| ask | ends on a real question | "silver or cobalt tomorrow?" |
| show work | shares process, drafts, failures | "this one took 14 tries. here's 1 through 13" |
| announce | ships something | "shipped: a smarter queue" |

The top three tags by count are usually the core of the voice. The tags that never appear are part of it too.

## 2. Name three traits

Turn the top tags into traits. Each trait gets a "this, not that" pair. "This" is a real post. "Not that" is a line
the voice could plausibly drift into, ideally from the disliked file.

```text
Trait: <name>
This:     "<real post>"
Not that: "<plausible wrong version>"
Why:      <one line: what the good one does that the bad one doesn't>
```

Three, not five. People and agents remember three.

## 3. Set the tone dials

Score 0–10 from the corpus, not from ambition.

| Dial | 0 | 10 | How to read it from posts |
|---|---|---|---|
| Warmth | cool, detached | affectionate | how often it addresses the reader kindly |
| Irony | literal | constant irony | share of posts with a twist or understatement |
| Energy | flat | hyped | exclamation share, intensifiers, caps |
| Formality | chat | formal | case, contractions, fragments |
| Hype | none | constant superlatives | "insane", "huge", "game-changer" counts |
| Emoji | none | several per post | emoji share from `stats` |

Add context columns where the dial moves on purpose: replies, launch day, incident. In an incident almost every voice
drops irony and emoji and gets more formal.

## 4. Build the vocabulary

- **Signature words:** from `stats` signature words and pairs, keep the ones that feel chosen ("one take", "the
  board", "tiny victories"), drop topic words that just repeat the niche.
- **Never words:** from the disliked file, from the niche's clichés, and from rules (price promises, buy calls, claims
  to be human, model names for AI characters).
- **Substitutions:** the word the voice uses instead ("generated", not "AI-assisted"; "the team", not "we at …").

## 5. Note sentence habits

Answer from the posts:

- How does a post usually open? (A number, a noun phrase, "ok so", a rule.)
- How long are sentences? Fragments allowed?
- Where does the joke sit: first line, last line, parenthesis?
- How does it ask for action? (A soft question, never "like and share".)
- How does it say it is AI, when asked?
- How does it decline: financial questions, rude replies, off-topic asks?

## 6. Check against the disliked posts

For each disliked post, write the one reason the owner gives. Most reasons map to a rule ("too long", "sounds like an
ad", "the emoji", "it brags"). Those reasons become `banned`, `avoid`, length targets or `patterns` in the rules file.

## 7. Sanity checks

- Run `lint` on the good posts with the new rules. Every error on a good post means a rule is wrong.
- Run `lint` on the disliked posts. Most should fail for the reasons the owner gave.
- Read three agent drafts written from the guide alone. If they sound like a parody, the guide over-describes one
  trait; add a sample line that shows restraint.
