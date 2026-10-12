---
name: photo-dumps-and-grid-aesthetics
description: Plans and generates Instagram photo dumps and a coherent profile grid for an AI character — picks one colour story from the character's palette, writes a shot list mixing portraits, details and places, generates a matching set with @useclaudia/media, sequences the frames, previews the 3:4 grid with pinned posts and average colours, and posts with honest captions, alt text and AI labels. Use when someone asks for a photo dump, a "week in pictures", a carousel of candids, a feed or grid aesthetic, a grid plan, or wants their profile to look like one world.
license: MIT
metadata:
  title: "Photo dumps and grid aesthetics"
  category: "create"
  summary: "Photo dumps that feel like one week and a grid that looks like one world: colour stories, shot lists, coherent sets, grid preview."
  level: "intermediate"
  tags: "photo dump, instagram grid, feed aesthetic, colour story, palette, sequencing, carousel, grid preview"
  uses: "@useclaudia/media, @useclaudia/social, @useclaudia/cli"
  time: "90 min per dump, 30 min per grid plan"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Photo dumps and grid aesthetics

A photo dump is a casual-looking carousel that feels like a week in someone's life; a grid is what a new visitor sees
before deciding to follow. For an AI character both are designed: one colour story, a shot list that mixes her face with
details and places, a set generated to match, an order that keeps people swiping, and a grid preview before anything
posts. This skill does all of that with Claudia's palette (or your character's), and keeps the dump honest: labelled,
no real places or events presented as visited, no real people.

## When to use this

- Weekly or monthly dumps ("cobalt week", "studio days", "club weekend").
- The profile grid looks random and new visitors don't follow.
- Planning the next nine posts so the grid reads as one world.
- After a style change: fading the old look out of the top rows.

Not for: structured how-to decks ([carousel-design](../carousel-design/SKILL.md)) or outfit sets with credits
([fashion-lookbooks](../fashion-lookbooks/SKILL.md)).

## What you need

- The character bible: looks, worlds, palette and grade ([claudia-character-bible](../claudia-character-bible/SKILL.md)),
  plus the ref pack from [character-consistency](../character-consistency/SKILL.md).
- `@useclaudia/cli` or `@useclaudia/media` with image provider keys (Google for Nano Banana, fal for FLUX.2, BytePlus
  for Seedream, as you like) and spend limits set.
- Node ≥ 20 for [scripts/grid-preview.mjs](scripts/grid-preview.mjs); ffmpeg for its `--colors` readout; Chrome for
  `--render`.
- Your last 6–9 posted images (your own files, or saved from your own account) for the grid preview.
- [references/colour-stories.md](references/colour-stories.md) and
  [references/sequencing-and-grid.md](references/sequencing-and-grid.md).

## Steps

1. **Decide what the dump is about.** One sentence: "a week in the cobalt studio", "the shoot day that went sideways",
   "club weekend". It's a story inside the character's world, so keep it honest: no real venue, landmark, event or date
   presented as somewhere she went, no real people, no real brands in frame. A label alone doesn't make "my weekend at
   <real festival>" OK; it invites people to believe a real event happened.

2. **Pick one colour story.** Read [references/colour-stories.md](references/colour-stories.md). Choose one of the five
   (cobalt week, foil night, white paper, club, desk at dusk) or define your own: two dominant colours, one accent, one
   grade line. For Claudia the grade line is always `cool clean grade, lifted blacks, gentle film grain, chrome
   highlights`. One story per dump; the next dump can change it.

3. **Write the shot list.** Copy [templates/dump-shot-list.yaml](templates/dump-shot-list.yaml). 6–10 frames; at least
   a third not her face (details, objects, the room, the light); one optional 3–5 second clip; one look and one world
   per portrait. Choose a camera feel and use it for every frame ("phone photo with on-camera flash, slightly
   off-centre, a little motion blur" or "clean studio frame"). Mixed camera feels read as stock.

4. **Generate a coherent set.** Portraits with the identity refs; detail frames without the character's style line.
   Price the whole set first, then generate under caps (a person approves anything above the threshold):

   ```ts
   import { readFileSync } from "node:fs";
   import { createMedia, envKeys } from "@useclaudia/media";

   const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 0.2, perDayUsd: 3, approveAboveUsd: 0.1 } });
   const ID = readFileSync("prompts/claudia-id-v2.txt", "utf8").trim(); // the [CLAUDIA ID v2] block, word for word
   const GRADE = "Phone photo with on-camera flash, slightly off-centre. Cool clean grade, lifted blacks, gentle film grain, chrome highlights. No text, no readable logos. Vertical 4:5 frame.";
   const refs = ["refs/claudia/01-front-neutral.jpg", "refs/claudia/05-laugh.jpg"];
   const shots = [
     { model: "google/nano-banana-2.1", refs, prompt: `${ID} She wears a holographic bell-sleeve mini dress and tiny orange oval sunglasses, laughing on a deep cobalt-blue paper backdrop and carpet, direct flash. Medium shot, her face in the centre third. ${GRADE}` },
     { model: "fal/flux-2-pro", prompt: `A small peach star-shaped hair clip on a deep cobalt carpet next to one white patent platform boot, top-down, direct flash. ${GRADE}` },
     { model: "fal/flux-2-pro", prompt: `The corner of a deep cobalt-blue paper backdrop, a silver light stand, a coiled thin headset microphone on the floor, empty room. ${GRADE}` },
   ];
   const req = (s: (typeof shots)[number]) => ({ kind: "image", model: s.model, prompt: s.prompt, aspect: "4:5", refs: s.refs, ...(s.model.startsWith("google/") ? { resolution: "2K" } : {}) }) as const;
   console.log("set estimate $", shots.reduce((t, s) => t + media.estimate(req(s)).usd, 0).toFixed(2));
   const ids: string[] = [];
   for (const s of shots) { const j = await media.generate(req(s)); if (!("dryRun" in j)) ids.push(j.id); }
   for (const id of ids) { const done = await media.wait(id); console.log(done.status, done.outputs[0]?.path); }
   await media.close();
   ```

   - Don't pass `brand: "claudia"` on detail frames: the brand style line describes her and would put her in every shot.
   - For 4–10 frames that must match closely, `byteplus/seedream-4.5` (sequential batches, refs) is worth a test; for
     exact palette colours on objects, `fal/flux-2-pro` takes HEX values (see
     [image-prompting-fundamentals](../image-prompting-fundamentals/SKILL.md)). Prices at list (checked 2026-10):
     Nano Banana 2.1 2K about $0.05, FLUX.2 pro about $0.03 for the first megapixel, Seedream 4.5 $0.04.
   - The clip: a 5-second image-to-video from one portrait ([video-prompting](../video-prompting/SKILL.md)).
   - CLI equivalent per frame: `claudia generate image "<prompt>" --model <id> --aspect 4:5 --max-usd 0.10`.

5. **Cull and sequence.** Review every frame: character on-model (adult, five anchors), no readable logos, no real
   people, the colour story holds, no near-duplicates. Then order them with
   [references/sequencing-and-grid.md](references/sequencing-and-grid.md): slide 1 is the grid tile and the hook (face
   centred for the 3:4 crop), slide 2 is a surprise, alternate person / detail / place, move light to dark or dark to
   light, end quiet or funny. Cut to the frames that earn their place: eight good frames beat fourteen fine ones.

6. **Preview the grid.** Put the new tile on top of your last posts and look at it the way a visitor will:

   ```sh
   node scripts/grid-preview.mjs work/grid.html --list work/grid-plan.txt --pinned 3 --colors --render work/grid.png
   ```

   `grid-plan.txt` lists images newest first (planned tiles, then your last 6–9 posts). Check: the row reads as one
   colour story, no more than two very dark or very light tiles touch, no more than two face close-ups touch, at most one
   text-heavy tile per row, and the pinned three explain the account. For the next nine posts, fill
   [templates/grid-plan.csv](templates/grid-plan.csv) and preview the whole block. Instagram's grid reorder (broad
   rollout reported in June 2026) can fix a drift after posting; use it sparingly, since regulars notice.

7. **Write the caption, alt text and labels.** Caption: one lowercase line in voice that matches the story, no claims
   about real places or events (`cobalt week, in nine frames. which one's the cover?`). 2–4 honest hashtags including
   `#aicharacter`. Alt text per frame, starting "AI-generated image:" and describing what's in it. AI label on; `#ad`
   and the paid-partnership label if anything in frame was paid for, gifted or is an affiliate link.

8. **Publish with approval.** Up to 10 JPEG frames can go through `@useclaudia/social` (convert first:
   `ffmpeg -i in.png -q:v 2 out.jpg`); more than 10, or a dump with a clip you'd rather order by hand, is posted in the
   Instagram app by the operator with the AI label switched on.

   ```ts
   // `social` and the connected `instagram` account as in carousel-design step 8; `frames` = your ordered keepers
   const post = social.draft({
     text: "cobalt week, in nine frames. which one's the cover? #aicharacter #cobaltblue",
     media: frames.map((f) => ({ path: f.jpg, alt: f.alt })), // ≤ 10 items, alt per frame
     targets: [{ account: instagram.id }],
     labels: { ai: true },
   });
   console.log(social.preview(post.id)); // warnings: JPEG only, 10 max; labels added
   social.submit(post.id);               // a person approves before it posts
   ```

9. **Review the grid monthly.** Once a month, render the top 12 tiles of the live profile with `grid-preview.mjs`.
   Note which tiles new followers mention or which posts brought the most profile visits, and adjust the next block's
   stories. Track follows from profile visits in [kpi-reporting](../../grow/kpi-reporting/SKILL.md).

## Templates

- [templates/dump-shot-list.yaml](templates/dump-shot-list.yaml) — story, grade, camera feel, shot list, honesty checks, caption, labels.
- [templates/grid-plan.csv](templates/grid-plan.csv) — a nine-tile block: slot, format, story, subject, tone, cover, pinned, status.
- [scripts/grid-preview.mjs](scripts/grid-preview.mjs) — 3-column 3:4 grid preview with pinned tiles, average colours and a PNG render.
- [examples/cobalt-week-dump.md](examples/cobalt-week-dump.md) — a nine-frame "cobalt week" dump and the grid block around it.

Shot line for quick planning:

```text
<n> · <portrait | detail | place | object | clip> · <idea> · <look> · <world> · <model> · <aspect>
```

## Check before you finish

- [ ] One colour story and one grade line across every frame; at least a third of frames are not her face.
- [ ] Every portrait is on-model (adult, five anchors); no near-duplicates; no readable logos; no real people.
- [ ] No real venue, landmark, event or date presented as visited.
- [ ] Slide 1 works as the 3:4 grid tile; the grid preview passes the row checks.
- [ ] Alt text on every frame starting "AI-generated image:"; AI label on; `#ad` if anything is paid, gifted or affiliate.
- [ ] Spend stayed under the set budget; keepers copied with their `.json` provenance sidecars.
- [ ] A person approved the dump before it was posted.

## Pitfalls

- **Two stories in one dump.** Foil frames next to white-paper frames read as two posts glued together.
- **All face, no world.** Nine portraits in a row is a headshot sheet, not a dump. Details carry the story.
- **The brand kit on object shots.** Its style line describes her, so she appears in the flower vase. Leave `brand` off.
- **Fake real life.** "Paris this weekend" with generated frames is the kind of thing that turns into a deepfake story.
  Keep dumps in her worlds.
- **Phone logos in mirror shots.** Ask for "a plain silver phone with no logo", and check every reflection.
- **Planning a perfect pattern.** Each new post shifts every tile; plan rows, not checkerboards.
- **PNG through the API.** Instagram's API takes JPEG only; the package warns and the post fails.

## Related skills

- [claudia-character-bible](../claudia-character-bible/SKILL.md) — palette, looks and worlds the stories come from.
- [carousel-design](../carousel-design/SKILL.md) — structured decks and the same export and publishing path.
- [lifestyle-scene-prompts](../lifestyle-scene-prompts/SKILL.md) — scene prompts for places and candids.
- [batch-content-production](../batch-content-production/SKILL.md) — generating a month of frames in one session.
- [instagram-reels-playbook](../../grow/instagram-reels-playbook/SKILL.md) — the Instagram side: covers, Reels and the grid.
- [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md) — labels and keeping provenance with the files.
