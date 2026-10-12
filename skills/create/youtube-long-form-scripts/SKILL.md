---
name: youtube-long-form-scripts
description: Plans and scripts 6–15 minute YouTube videos title-and-thumbnail first — the promise, a 30-second hook that pays it off, a retention structure with re-hooks every 60–90 seconds, chapters that meet YouTube's rules, a two-column A/V script, a B-roll list with AI generation prompts and costs, and the altered-or-synthetic-content disclosure. Use when writing a YouTube video script, outlining a long-form video, fixing a video that loses viewers early, planning chapters or B-roll, or making a long-form video with an AI character or AI footage.
license: MIT
metadata:
  title: "YouTube long-form scripts (6–15 minutes)"
  category: "create"
  summary: "Title and thumbnail first, then a hook, retention beats, chapters, an A/V script and a labelled AI B-roll list for 6–15 minute videos."
  level: "intermediate"
  tags: "youtube, long-form, scripting, hook, retention, chapters, b-roll, thumbnails, ai disclosure"
  uses: "@useclaudia/media, @useclaudia/social, @useclaudia/cli"
  time: "3–5 h per video script"
  version: "1.0.0"
  updated: "2026-10-12"
---

# YouTube long-form scripts (6–15 minutes)

A long-form video is won or lost before the script: the title and thumbnail make a promise, and the first 30 seconds
either keep it or lose the viewer. This skill plans the package first, then writes a script built to hold attention
for 6–15 minutes, with chapters that YouTube accepts, a B-roll list where every AI shot is priced and labelled, and the
disclosure YouTube asks for when anything realistic was generated.

## When to use this

- Writing a new 6–15 minute video: explainer, story, tutorial, build log, review or a character's vlog.
- A published video loses most viewers in the first minute, or the retention graph has a cliff mid-video.
- Planning B-roll, especially AI-generated footage, or a video starring an AI character such as Claudia.
- Turning a Short that worked into a long video on the same idea.

Not for: Shorts (see [youtube-shorts-playbook](../../grow/youtube-shorts-playbook/SKILL.md)), or channels that mass-produce
near-identical AI videos. YouTube does not monetise templated, mass-produced content (step 9).

## What you need

- A topic and a channel (with a verified account for custom thumbnails; chapters and multi-language features need
  YouTube's Advanced features).
- The character's voice rules if a character presents
  ([claudia-character-bible](../claudia-character-bible/SKILL.md)).
- For AI B-roll and voice: `@useclaudia/media` or the `claudia` CLI with your own provider keys, and spend caps set.
- [references/retention-patterns.md](references/retention-patterns.md) — hook types, re-hooks and where viewers leave
  (read it before step 3). [references/youtube-packaging-specs.md](references/youtube-packaging-specs.md) — title,
  thumbnail, chapter, end screen and disclosure rules with dates (read it before step 5 and step 8).

## Steps

1. **Package first: title and thumbnail.** Before any script, write 10 titles and 3 thumbnail concepts for the idea.
   A title states a specific promise (a result, a number, a tension) in about 50–60 characters (100 is the hard limit,
   and mobile truncates long titles). The thumbnail shows one subject, one emotion and at most 3–4 words that add to the
   title rather than repeat it. If no title is strong, change the idea, not the wording. Keep 3 thumbnail options for
   YouTube's Test & Compare (up to 3 thumbnails on a public long-form video, desktop Studio, winner by watch time share,
   checked 2026-10; title tests are reported by third parties, so check your own Studio).
   Sheet: [templates/title-thumbnail-sheet.md](templates/title-thumbnail-sheet.md). Thumbnail craft:
   [thumbnails-and-covers](../thumbnails-and-covers/SKILL.md).

2. **Write the hook (first 30 seconds).** The first 5–10 seconds confirm the title's promise in different words and show
   it (a result, the thing breaking, the before/after). Then stakes (why it matters to the viewer), then a one-line
   roadmap ("three mistakes, and the fix that worked"). No intro sting, no "before we start, subscribe", no channel
   recap. Write three hooks and read each aloud; keep the one that sounds like the person, not like an ad.

3. **Outline the retention structure.** Build the body as 3–6 chapters, each a mini-promise with its own payoff. Every
   60–90 seconds, re-hook: a new question, a reveal, a change of location or format. Put the strongest chapter second,
   not last. Use "but" and "so" between beats, not "and then". Length budget at about 150 spoken words per minute:

   | Runtime | Words | Hook | Chapters | Re-hooks |
   |---|---|---|---|---|
   | 6 min | ~900 | 30 s | 3 | 4 |
   | 10 min | ~1,500 | 30 s | 4–5 | 6–7 |
   | 15 min | ~2,250 | 30–45 s | 5–6 | 9–10 |

   If the idea runs out at 7 minutes, make a 7-minute video. Padding shows up as a slope in the retention graph.

4. **Draft the script in two columns.** Use [templates/long-form-script.md](templates/long-form-script.md): time, what is
   said (A), what is on screen (V), and a B-roll id. Write for the ear: one idea per sentence, contractions, numbers
   spoken as words in the voice-over column. Mark every on-screen claim that needs a source and add the source to the
   description notes. A character presenting keeps their voice: Claudia stays lowercase-leaning and dry, never names the
   model that makes her, never gives financial advice.

5. **Plan chapters YouTube will accept.** Timestamps in the description, the first at `00:00`, at least three, in
   ascending order, each chapter at least 10 seconds (YouTube Help, checked 2026-10). Chapter titles are searchable
   promises ("why the first post failed"), not labels ("part 2"). Chapters are unavailable on channels with active
   strikes. Write the final timestamps after the edit locks.

6. **Build the B-roll list.** Every V-column cut gets a row in [templates/broll-list.csv](templates/broll-list.csv):
   source (owned footage, screen recording, licensed stock, AI-generated), duration, and for AI shots the prompt,
   model and estimate. Price before you generate:

   ```sh
   claudia generate video "slow dolly-in on a desk at dusk, laptop glow, chrome star sticker, no people, no readable text" \
     --aspect 16:9 --duration 5 --model fal/kling-2.6-pro --dry-run
   claudia generate models video        # models, prices and which have your key
   ```

   Batch the approved rows through the package with caps and approval on:

   ```ts
   import { createMedia, envKeys } from "@useclaudia/media";
   const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 2, perDayUsd: 15, approveAboveUsd: 0.5 } });
   for (const row of approvedRows) {
     const job = await media.generate({ kind: "video", model: row.model, prompt: row.prompt, aspect: "16:9", durationSec: row.sec });
     if (!("dryRun" in job) && job.status === "needs_approval") console.log("needs a person:", job.id, row.id);
   }
   ```

   Silent B-roll: pass `meta: { audio: false }` on fal models (cheaper; Kling 2.6 Pro is $0.07/s silent vs $0.14/s with
   audio, checked 2026-10). Never prompt real people, brands or logos. Prompt craft:
   [video-prompting](../video-prompting/SKILL.md).

7. **Record or generate the voice.** A human reads the A column, or the character's designed voice does
   ([voice-and-lip-sync](../voice-and-lip-sync/SKILL.md)). Generate long voice-over in sections of one chapter each so a
   bad line is cheap to redo, keep one engine and one voice id for the whole video, and master to about -14 LUFS with a
   true peak at or below -1 dBTP. A talking AI presenter: [avatar-explainer-videos](../avatar-explainer-videos/SKILL.md).

8. **Package, disclose and upload.** Description: the promise in the first two lines, chapters, sources, links, and a
   plain AI note when AI was used ("Claudia is an AI character. Visuals and voice are AI-generated."). Tick **Altered or
   synthetic content** when anything realistic was generated: a photoreal AI character, a realistic scene that didn't
   happen, or altered real footage. Scripts, thumbnails and clearly unrealistic animation
   are exempt (details in the reference). Upload through `@useclaudia/social`, which sets `containsSyntheticMedia` when
   `labels.ai` is on and uploads as `private` by default; a person reviews in Studio, adds the thumbnail, end screen
   (last 5–20 s, video at least 25 s), then publishes and starts the Test & Compare thumbnails. Paid placement inside the video:
   tick paid promotion and say it in the video ([brand-deals-and-sponsorships](../../grow/brand-deals-and-sponsorships/SKILL.md)).

9. **Review retention; fix the next script.** After 48 hours and again after 7 days, open the audience retention
   report. Note the drop in the first 30 s (hook), every cliff (a beat that didn't pay off) and every bump (rewatched:
   do more of that). Write three lines into the next script's brief. Keep each video's concept distinct: YouTube's
   monetisation policy excludes "AI-generated content made with generic or unoriginal templates giving the impression of
   mass production" and allows "using AI to visualize a unique character and narrative you invented" (YouTube Help,
   checked 2026-10).

## Templates

- [templates/title-thumbnail-sheet.md](templates/title-thumbnail-sheet.md) — 10 titles, 3 thumbnail concepts, the promise test.
- [templates/long-form-script.md](templates/long-form-script.md) — two-column A/V script with hook, chapters and re-hooks.
- [templates/broll-list.csv](templates/broll-list.csv) — every cut with source, prompt, model, estimate, label.
- [examples/claudia-agents-30-days.md](examples/claudia-agents-30-days.md) — a 12-minute Claudia video from title to
  B-roll list and disclosure.

Hook skeleton:

```text
0:00  PROOF   <show the result or the problem on screen, said in one line>
0:06  PROMISE "<the title's promise in new words>"
0:12  STAKES  "<why the viewer should care: what it costs them not to know>"
0:22  MAP     "<three things / the mistake and the fix / the test and the result>"
0:30  first chapter starts with its own question
```

## Check before you finish

- [ ] The title and thumbnail were chosen before the script, and the first 10 seconds pay off their promise.
- [ ] Re-hooks every 60–90 s; no chapter without a payoff; runtime matches the content, not a target.
- [ ] Chapters: `00:00` first, at least three, ascending, each ≥ 10 s, titles that promise something.
- [ ] Every B-roll row has a source; every AI row has a prompt, model, estimate and approval; no real people or logos.
- [ ] Voice uses one engine and one voice id; mastered to about -14 LUFS, true peak ≤ -1 dBTP.
- [ ] Altered or synthetic content ticked when anything realistic was generated; AI note in the description.
- [ ] Sponsor segments disclosed in Studio and out loud; no price or return promises anywhere.
- [ ] A person reviewed the private upload in Studio before it went public.

## Pitfalls

- **Scripting before packaging.** A good script with no clickable promise gets no impressions to retain.
- **The slow intro.** "Hey everyone, welcome back" costs the viewers who decide in the first seconds.
- **Bait and switch.** A thumbnail the video never delivers lifts clicks and sinks retention and trust.
- **B-roll as wallpaper.** Generic AI shots behind every line feel like filler. Each shot should show what is said.
- **Mixing voice engines** between chapters: the presenter sounds like two people.
- **Forgetting the disclosure** on a photoreal AI presenter. YouTube can label it for you and penalise repeated
  non-disclosure.
- **Templated series.** Same structure, same stock AI shots, new topic every day reads as mass-produced to YouTube.

## Related skills

- [thumbnails-and-covers](../thumbnails-and-covers/SKILL.md) — the thumbnail that carries the promise.
- [video-prompting](../video-prompting/SKILL.md) — prompts for the AI B-roll rows.
- [voice-and-lip-sync](../voice-and-lip-sync/SKILL.md) — the narrator's voice and mastering.
- [avatar-explainer-videos](../avatar-explainer-videos/SKILL.md) — an AI presenter on camera.
- [content-repurposing](../content-repurposing/SKILL.md) — turning the finished video into clips and posts.
- [youtube-shorts-playbook](../../grow/youtube-shorts-playbook/SKILL.md) — the Shorts side of the same channel.
