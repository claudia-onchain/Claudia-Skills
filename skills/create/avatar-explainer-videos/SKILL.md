---
name: avatar-explainer-videos
description: Makes talking-avatar explainer videos with HeyGen Avatar IV or OmniHuman through the @useclaudia/media avatar kind — when an avatar is the right format, scripts written for a face, voice choice, photo framing, the HeyGen v3 request fields (aspect, motion prompt, captions, expressiveness), a dry run and spend cap, lip-sync and drift QA, captions and cutaways, and AI labels on every platform. Use when someone wants an AI presenter, a talking-head explainer, a product walkthrough with an avatar, a "Claudia explains" video, or a HeyGen video made through code.
license: MIT
metadata:
  title: "Avatar explainer videos"
  category: "create"
  summary: "Script, voice, framing, render, lip-sync QA, captions and labels for talking-avatar explainers made with HeyGen or OmniHuman."
  level: "intermediate"
  tags: "avatar, heygen, omnihuman, talking head, explainer, lip sync, captions, ai disclosure"
  uses: "@useclaudia/media, @useclaudia/cli, @useclaudia/social"
  time: "1–2 h per 60–120 s video"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Avatar explainer videos

A talking avatar is the fastest way to put a face on an explanation: a script, a voice and one approved image become a
presenter. It is also the easiest format to get subtly wrong: a mouth that doesn't close on "p", a face that drifts,
a voice that changes between videos, or a viewer who thinks a real person said it. This skill takes one explainer from
script to labelled post, with the right route, a priced dry run, and a QA pass before anyone sees it.

## When to use this

- An explainer, walkthrough, announcement or weekly recap where a presenter helps and real filming isn't practical.
- Claudia (or your own AI character) explaining something on camera.
- A HeyGen video made from code or an agent, inside spend caps and approval.

Not for: making any real person appear to say something. Avatars of real people need that person's own recorded
consent (HeyGen calls these digital twins, step 3). Never use a photo of someone else, a celebrity or a creator.

## What you need

- `@useclaudia/media` (library) for HeyGen with a script; the `claudia` CLI also works for OmniHuman and lip-sync.
  Keys: `heygen` and/or `fal`, plus `elevenlabs` for a designed voice (`claudia keys set heygen|fal|elevenlabs`).
- An approved face image (for Claudia, a still from her ref pack, see
  [claudia-character-bible](../claudia-character-bible/SKILL.md)) or a HeyGen avatar look id.
- The character's voice id and settings ([voice-and-lip-sync](../voice-and-lip-sync/SKILL.md)).
- [references/avatar-routes-and-limits.md](references/avatar-routes-and-limits.md) — the HeyGen v3 fields, OmniHuman
  and lip-sync limits and prices (read it in step 3).

## Steps

1. **Decide if an avatar fits.** Good fits: explaining a concept, a feature tour over screen recordings, a recap, a
   welcome video. Poor fits: emotional stories, fast comedy, anything where the face must react to something live. Keep
   explainers 45–120 s for social and up to a few minutes on YouTube; a long talking head with no cutaways loses people.

2. **Write the script for a face.** About 130–150 words per minute; one idea per sentence; the point in the first
   sentence. Spell out what the voice must say ("M C P", "two hundred"), and keep on-screen text in a separate column so
   the avatar doesn't read URLs aloud. HeyGen takes up to 5,000 characters of script per request (checked 2026-10). Use
   [templates/avatar-script.md](templates/avatar-script.md). Claudia's scripts stay in her voice: warm, dry, says
   she is an AI character when it matters, never names the model that makes her, no financial advice.

3. **Pick the route and the voice.** Read the reference, then choose:

   | Route | Package call | Voice | Best for |
   |---|---|---|---|
   | **A. HeyGen photo avatar** | `heygen/avatar-iv`, face image in `refs`, `text` + `voice` | a HeyGen voice id, or your own audio as a public https URL | 30 s–3 min explainers from one still |
   | **B. HeyGen stock or custom look** | `heygen/avatar-iv`, `meta.avatarId` | the look's default voice or a HeyGen voice | presenters that aren't your character |
   | **C. OmniHuman** | `fal/omnihuman-1.5`, `refs: [face, audio]` | any audio you made, e.g. her ElevenLabs voice | the character's exact series voice, short segments (~30 s per job) |
   | **D. Lip-sync onto a clip** | `fal/lipsync-2` or `fal/veed-lipsync`, `refs: [video, audio]` | any audio | a generated talking clip with real motion |

   Claudia's series voice is an ElevenLabs design, so routes C and D keep her voice exact; route A needs that audio at a
   public URL. Custom HeyGen avatars of a real human (digital twins) require that person's own consent recording through
   HeyGen's flow; photo avatars of a fictional character don't use it, but still never upload a real person's face.

4. **Frame the image for the output.** Match the image to the output ratio: 9:16 for Shorts, Reels and TikTok, 16:9 for
   YouTube, 4:5 for feeds. Chest-up, face frontal (within about 30°), eyes open, mouth closed or relaxed, even light, plain
   background, no hands near the face, no sunglasses. Leave headroom above and space below the chin for captions in the
   safe zone. HeyGen input images must be under 2K and outputs come back at 25 fps (checked 2026-10). Make the still with
   [photoreal-portrait-prompts](../photoreal-portrait-prompts/SKILL.md) and check all five Claudia anchors are visible.

5. **Render with a dry run first.** Route A through the library, with caps and approval:

   ```ts
   import { createMedia, envKeys } from "@useclaudia/media";
   const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 15, perDayUsd: 30, approveAboveUsd: 2 } });
   const req = {
     kind: "avatar", model: "heygen/avatar-iv",
     refs: ["refs/claudia/studio-front-9x16.jpg"],
     text: "<script>", voice: "<HeyGen voice id>",
     aspect: "9:16", resolution: "1080p",
     prompt: "small head tilts, one slow blink, relaxed shoulders, a light smile at the end",  // sent as motion_prompt
     meta: { title: "claudia-explains-approvals", providerOptions: { expressiveness: "medium" } },
   } as const;
   console.log(media.estimate(req));                    // HeyGen is an estimate (upper end ~$0.10/s)
   const dry = await media.generate(req, { dryRun: true }); // exact request, key shown as ***
   const job = await media.generate(req);               // above $2 → needs_approval; a person calls media.approve(id)
   ```

   `prompt` becomes HeyGen's `motion_prompt`: it works for photo avatars, but HeyGen rejects it for video avatars on
   the default Avatar IV engine, so leave `prompt` out with `meta.avatarId`. Route C from the CLI:

   ```sh
   claudia generate speech "<segment 1 text>" --model elevenlabs/multilingual-v2 --voice <voice id> --max-usd 0.10
   claudia generate avatar "medium close-up, warm, small nods, static camera, soft studio light" \
     --model fal/omnihuman-1.5 --ref refs/claudia/studio-front.jpg,out/seg1.wav --max-usd 6
   ```

   The CLI sends its text as `prompt`, not as a script, so a HeyGen job with a script goes through the library.

6. **QA the lip-sync and the face.** Watch at 0.5× with [templates/avatar-qa-checklist.md](templates/avatar-qa-checklist.md):
   lips close on p, b and m; no mouth movement in silence; teeth not smeared; blinks natural; eyes on the lens; hands
   and shoulders not warping; audio in sync within one frame. For Claudia, score the drift check (peach streak, star
   clip, headset mic, freckles, age read). Fix by re-rendering the segment, not by hiding it with a filter.

7. **Add captions and cutaways.** Burn captions with [captions-and-hooks](../captions-and-hooks/SKILL.md), from the
   script you already have. Alternatively ask HeyGen to burn its own with `providerOptions: { caption: { style:
   "default" } }`; the package saves only the video file, so HeyGen's SRT sidecar isn't downloaded. Cut away every 5–10
   s to a screen recording, diagram or B-roll: it explains better and covers small artefacts. Mix any music 12–18 dB
   under the voice and finish at about -14 LUFS.

8. **Label, approve and publish.** On screen for the first 2–3 s: a small `AI avatar` tag. Caption: say it is an AI
   character or AI avatar. Platform flags: YouTube altered or synthetic content (photoreal presenter), TikTok AIGC,
   Instagram AI info, `(AI-generated)` text elsewhere; `@useclaudia/social` sets these when `labels.ai` is on. Never
   imply a real person or brand endorsed anything. Draft, submit, a person approves, then schedule
   ([social-publishing](../../build/social-publishing/SKILL.md)).

## Templates

- [templates/avatar-script.md](templates/avatar-script.md) — script sheet with said / on-screen columns, segments and
  pronunciations.
- [templates/avatar-qa-checklist.md](templates/avatar-qa-checklist.md) — the lip-sync, drift and label checks.
- [examples/claudia-90s-explainer.md](examples/claudia-90s-explainer.md) — a 90-second "how approvals work" explainer
  in two routes, with costs, a failed take and the fix.

Segment line for a long script:

```text
SEG <n> · <start>–<end> · ROUTE <A|B|C|D> · VOICE <engine + id> · FRAME <9:16 chest-up, studio front>
SAYS: "<words, numbers spelled out>"
ON SCREEN: <caption keywords, cutaway id> · MOTION: "<emotion, gesture, camera — never the words>"
```

## Check before you finish

- [ ] No real person's face or voice without their own recorded consent; Claudia's or your character's image only.
- [ ] Script in the character's voice, numbers spelled out, no financial advice, no claim to be human.
- [ ] Same voice engine and voice id as the rest of the series.
- [ ] Dry run read; job inside `perJobUsd`; anything above `approveAboveUsd` approved by a person, not the agent.
- [ ] Lips close on p/b/m, no motion in silence, character anchors intact, audio in sync.
- [ ] Captions inside the safe zone; cutaways every 5–10 s; mix about -14 LUFS.
- [ ] `AI avatar` on screen, AI wording in the caption, platform AI flag set; post approved before publishing.

## Pitfalls

- **A real person's photo "just for testing".** That is an unconsented avatar of a real person. Use your character.
- **Motion prompt on a video avatar.** HeyGen rejects `motion_prompt` for video avatars on Avatar IV; drop `prompt`.
- **Brand kit voice with HeyGen.** A kit voice on ElevenLabs isn't sent to HeyGen; pass a HeyGen voice id or audio URL.
- **Audio file path to HeyGen.** HeyGen needs audio as a public https URL; a local path fails with `invalid`.
- **One long take.** A 3-minute uncut talking head shows every artefact and loses viewers. Segment and cut away.
- **Sunglasses, hands, hair over the mouth** in the source image: the model guesses, and it shows.
- **Old HeyGen endpoints.** v1/v2 video endpoints retire after 2026-10-31; the package uses v3.

## Related skills

- [voice-and-lip-sync](../voice-and-lip-sync/SKILL.md) — designing the voice and the lip-sync routes in depth.
- [character-consistency](../character-consistency/SKILL.md) — ref packs and the drift check.
- [captions-and-hooks](../captions-and-hooks/SKILL.md) — the hook and burned captions.
- [youtube-long-form-scripts](../youtube-long-form-scripts/SKILL.md) — longer videos with an avatar presenter.
- [dubbing-and-translation](../dubbing-and-translation/SKILL.md) — the same explainer in other languages.
- [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md) — labels per network.
