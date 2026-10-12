---
name: content-repurposing
description: Turns one long piece (a livestream, podcast episode, long YouTube video, Space or long thread) into 8–12 platform-native assets — a timestamped transcript, a moment log where a human picks the moments, vertical clips with captions, quote cards, a carousel, an X thread and a newsletter — then sequences the release and labels anything AI-made. Use when someone says "repurpose this", "clip this stream", "turn this podcast into posts", "make shorts from my video", or plans a content week around one recording.
license: MIT
metadata:
  title: "Content repurposing: one long piece, a week of posts"
  category: "create"
  summary: "One stream, episode or long video into 8–12 native assets: transcript, human-picked moments, clips, quotes, carousel, newsletter."
  level: "intermediate"
  tags: "repurposing, clips, transcript, podcast, livestream, quote cards, carousel, newsletter, ai label"
  uses: "@useclaudia/social, @useclaudia/media, @useclaudia/cli"
  time: "2–3 h per long piece"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Content repurposing: one long piece, a week of posts

A 60-minute stream or episode holds a week of posts, but only if each piece is rebuilt for where it lands: a vertical
clip that starts on the line, a quote card that reads in one second, a thread that stands alone. This skill gets you a
transcript, a moment log a person picks from, 8–12 native assets, a release order and the right labels, without
inventing quotes or clipping anyone who didn't agree to it.

## When to use this

- A stream, podcast, Space, long video or long thread is finished and you want a week of posts from it.
- An agent offers to "auto-clip" a recording: use this to keep a person on the picks and the labels.
- A series ([content-pillars-and-series](../content-pillars-and-series/SKILL.md)) needs a repeatable weekly pipeline.

Not for: clipping other creators' streams or podcasts without permission, or reposting someone else's work as yours.

## What you need

- The source file (best quality you have, not a platform re-download) and a list of everyone who appears in it.
- Permission from guests and co-hosts to clip them, in writing (a message is fine). Music, game footage or third-party
  video inside the source needs its own clearance.
- `ffmpeg`, and a transcriber that writes timestamps. This skill uses [whisper.cpp](https://github.com/ggml-org/whisper.cpp)
  (open source, runs locally, `whisper-cli`); any editor's transcription that exports SRT works too.
- `@useclaudia/social` or the `claudia` CLI to schedule with approval; `@useclaudia/media` only if you make AI covers or
  B-roll (then those parts get labelled).
- [references/asset-specs.md](references/asset-specs.md) — lengths, ratios and limits per asset and platform (read it in
  step 4). [references/moment-rubric.md](references/moment-rubric.md) — how to score a moment (read it in step 3).

## Steps

1. **Clear rights and consent first.** List every voice and face in the source. Guests and co-hosts agree to being
   clipped (and to clips being cut short, which changes context). Note segments to skip: copyrighted music playing in
   the background, game or film footage, private details someone mentioned, a sponsor read (clip it only with `#ad`).
   Write the skip list at the top of [templates/moment-log.csv](templates/moment-log.csv).

2. **Make a timestamped transcript.** Extract 16 kHz mono audio, then transcribe to text and SRT:

   ```sh
   ffmpeg -i source.mp4 -ar 16000 -ac 1 -c:a pcm_s16le work/source.wav
   ./build/bin/whisper-cli -m models/ggml-large-v3-turbo.bin -f work/source.wav -l auto \
     -otxt -osrt -ml 60 -sow -of work/source
   ```

   `-osrt`/`-otxt` write `work/source.srt` and `.txt`; `-ml 60 -sow` keeps segments short and split on words
   (flags from the whisper.cpp CLI README, checked 2026-10). Fix names, product terms and numbers by hand: wrong names
   are the most common transcript error, and they end up in captions and quotes.

3. **Log moments; a human picks.** An agent may read the transcript and propose 15–25 candidate moments, each with
   start and end timestamps, the first line, the payoff line and a score from the rubric (hook, stands alone, payoff,
   length, risk). A person watches each candidate and picks 6–10. The agent never publishes a pick it made alone.
   Prompt for the agent:

   ```text
   From this transcript (SRT), propose 20 moments for short clips. For each: start, end (≤ 60 s), the exact first line,
   the payoff line, why it stands alone, and a 1–5 score for hook / standalone / payoff / risk per references/moment-rubric.md.
   Quote lines exactly as transcribed. Skip anything in the skip list. Do not invent or merge quotes.
   ```

4. **Map moments to 8–12 assets.** Use [templates/repurposing-plan.md](templates/repurposing-plan.md). A default map
   for a 60-minute source (specs in the reference):

   | Asset | Count | Built from |
   |---|---|---|
   | Vertical clips (TikTok, Reels, Shorts) | 3–5 | the top-scored moments, 20–60 s each |
   | Horizontal highlight or full upload | 0–1 | the full piece, if it isn't on YouTube yet |
   | Quote cards | 2–3 | one-sentence lines that work without sound |
   | Carousel | 1 | a list or framework someone explained (Instagram allows up to 20 slides, checked 2026-10) |
   | X thread | 1 | the argument of the whole piece in 5–8 parts |
   | Newsletter issue | 1 | the full takeaways, links and the best clip |
   | Text post (LinkedIn, Threads, Bluesky) | 1–2 | one idea, rewritten for that network |

   Twelve is a ceiling, not a target. Five strong assets beat twelve weak ones.

5. **Cut clips that start on the line.** Start where the hook is spoken, not at the setup; end on the payoff. Re-encode
   so the cut is frame-accurate, then reframe for 9:16:

   ```sh
   ffmpeg -ss 00:14:32.4 -to 00:15:18.9 -i source.mp4 -c:v libx264 -crf 18 -c:a aac -b:a 192k work/clip03.mp4
   ffmpeg -i work/clip03.mp4 -vf "crop=ih*9/16:ih,scale=1080:1920" -c:a copy work/clip03-v.mp4   # speaker centred
   ```

   Speaker off-centre or two people? Use the blurred-background layout (recipe R4 in
   [../short-form-editing/references/ffmpeg-recipes.md](../short-form-editing/references/ffmpeg-recipes.md)). Add
   captions with [captions-and-hooks](../captions-and-hooks/SKILL.md) (word timings or the SRT segment), then normalise
   with `sh ../short-form-editing/scripts/loudnorm.sh work/clip03-cap.mp4 out/clip03.mp4` (about -14 LUFS).

6. **Write text assets from the transcript.** Quotes are verbatim: trim filler ("um", "you know") but never change
   meaning, merge two sentences from different minutes, or put words in a guest's mouth. Every quote card and thread
   part keeps its timestamp in the plan so anyone can check it. One idea per carousel slide
   ([carousel-design](../carousel-design/SKILL.md)); newsletter structure in [newsletter-writing](../newsletter-writing/SKILL.md);
   quote card layouts in [quote-cards-and-text-posts](../quote-cards-and-text-posts/SKILL.md). Rewrite captions per
   platform; don't paste the TikTok caption on X.

7. **Label what is AI-made.** Clipping a real recording is not AI content. These are:

   | In the asset | Label |
   |---|---|
   | An AI character (Claudia or your agent) on screen or speaking | AI label on every asset, always |
   | AI B-roll, AI cover image, AI voice-over, AI-dubbed audio | platform AI flag (TikTok AIGC, Meta AI info, YouTube altered or synthetic content if realistic) |
   | AI-written caption or thread text from a real transcript | no platform label needed; keep the quotes verbatim |
   | AI-altered speech (words removed or regenerated to change what was said) | don't; re-cut instead |

   `@useclaudia/social` sets the native AI flags when `labels.ai` is on (the default) and adds `(AI-generated)` text
   where no flag exists. Turn it off (`labels: { ai: false }`, or `--no-ai-label` in the CLI) only for an asset with no
   AI-made part. Rules per network: [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md).

8. **Sequence the release.** Publish the long piece first (or link it), then lead with the strongest clip within 24 h,
   then one asset per platform per day for 5–7 days. A default week:

   | Day | Post |
   |---|---|
   | 0 | Full piece live · X thread · newsletter (or day 1) |
   | 1 | Best clip on TikTok, Reels and Shorts |
   | 2 | Carousel (Instagram, LinkedIn) · quote card on X |
   | 3 | Clip 2 · text post on Threads or Bluesky |
   | 4 | Quote card 2 · clip 3 |
   | 5–6 | Remaining clips, each pointing to the full piece |

   Draft each asset with `social.draft()`, `submit()`, a person `approve()`s, then `schedule()` with `tick()` running
   ([posting-schedule](../../grow/posting-schedule/SKILL.md)). The package blocks near-duplicate text to the same account
   within 24 h, so each post gets its own caption.

9. **Review after 7 days.** For each asset: views, follows, saves or shares, and clicks to the full piece. Which
   rubric scores predicted the winners? Note it in the moment log so the next pick is better
   ([kpi-reporting](../../grow/kpi-reporting/SKILL.md)).

## Templates

- [templates/moment-log.csv](templates/moment-log.csv) — skip list, candidate moments with scores, picks and who approved.
- [templates/repurposing-plan.md](templates/repurposing-plan.md) — the asset map, labels and the release calendar.
- [examples/podcast-to-11-assets.md](examples/podcast-to-11-assets.md) — a 58-minute podcast episode turned into
  11 assets, with the moments that were dropped and why.

Quick asset line for any plan:

```text
ASSET: <clip | quote card | carousel | thread | newsletter | text post> · PLATFORM: <…>
SOURCE: <start>–<end> · FIRST LINE: "<exact words>" · PAYOFF: "<exact words>"
AI PARTS: <none | cover | B-roll | voice | character> · LABEL: <platform flag / text> · #ad: <yes/no>
DAY: <n> · APPROVED BY: <name>
```

## Check before you finish

- [ ] Everyone who appears agreed to be clipped; skip-list segments are not in any asset.
- [ ] A person picked every moment; the agent's proposals are marked as proposals in the log.
- [ ] Every quote matches the transcript at its timestamp; nothing merged, nothing reworded in meaning.
- [ ] Clips start on the hook line, have captions inside the safe zone and sit at about -14 LUFS.
- [ ] Each asset has a native caption for its platform; no copy-pasted captions across networks.
- [ ] Assets with AI-made parts carry the AI label; sponsor segments carry `#ad`.
- [ ] Every post went through preview and approval; the calendar spreads them over 5–7 days.

## Pitfalls

- **Auto-clippers deciding.** They pick loud moments, not good ones, and cut mid-thought. Use them to propose only.
- **Clipping out of context.** A 20 s cut can flip what a guest meant. If the clip needs the setup to be fair, include
  it or skip the moment.
- **"Fixing" a quote.** Tightening a line until it says something sharper than what was said is a fake quote.
- **One caption everywhere.** Hashtag blocks on X, "link in bio" on YouTube: rewrite per network.
- **Background music in clips.** A song playing during a stream gets clips muted or claimed. Skip or cut around it
  ([music-and-sound-for-shorts](../music-and-sound-for-shorts/SKILL.md)).
- **Posting all assets on day 0.** They compete with each other and the week goes quiet. Spread them.
- **Forgetting the link back.** Every clip and card should point to the full piece (in the caption, pinned comment or
  description), or the long piece gets nothing from the work.

## Related skills

- [short-form-editing](../short-form-editing/SKILL.md) — reframing, cuts, loudness and exports for the clips.
- [captions-and-hooks](../captions-and-hooks/SKILL.md) — the hook, the burned captions and per-platform post copy.
- [carousel-design](../carousel-design/SKILL.md) — slide layouts for the carousel asset.
- [newsletter-writing](../newsletter-writing/SKILL.md) — the newsletter issue built from the episode.
- [batch-content-production](../batch-content-production/SKILL.md) — running this as a weekly batch.
- [posting-schedule](../../grow/posting-schedule/SKILL.md) — slots, time zones and the `tick()` scheduler.
