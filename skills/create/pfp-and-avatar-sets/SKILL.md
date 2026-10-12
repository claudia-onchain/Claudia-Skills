---
name: pfp-and-avatar-sets
description: Designs profile pictures and avatar sets that read as one identity everywhere — for AI characters, agents, creators and coins — with a circle-first composition that still works at 32 px, a 2048 px square master, exports per platform (X 400×400 under 2 MB, YouTube 800×800, Bluesky under 1,000,000 bytes, a 1000 px coin image), small-size circle previews, rules for which variants are allowed (seasonal, event, launch) and which parts stay locked, and an avatar register. Use when making or refreshing a pfp, avatar, profile picture or channel icon, giving an agent or coin a face, building a matching set across X, Instagram, TikTok, YouTube, Telegram, Discord, Bluesky or Farcaster, or when avatars have drifted apart across platforms.
license: MIT
metadata:
  title: "PFP and avatar sets"
  category: "create"
  summary: "One recognisable face or mark on every platform: circle-first design, a 2048 master, exact exports, and variants that don't break identity."
  level: "beginner"
  tags: "pfp, avatar, profile picture, identity, branding, export sizes, coins, agents, consistency"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "45 min for a set, 10 min per variant"
  version: "1.0.0"
  updated: "2026-10-12"
---

# PFP and avatar sets

The avatar is the most-seen image an account has: it sits next to every post, reply and notification, usually at 32
to 48 pixels inside a circle. This skill makes one master that survives that size, exports it exactly for each
platform, and adds variants under rules that keep the identity intact, so people recognise the same character, agent,
creator or coin wherever they meet it.

## When to use this

- A new AI character, agent, creator account or coin needs its first avatar.
- The same account shows different faces or crops on different platforms.
- A seasonal, event or launch variant is planned and must not confuse followers.
- An agent has no face yet and needs a mark that reads as "it" at 32 px.
- The current avatar is blurry, off-centre in the circle, or unreadable small.

Not for: avatars that copy a real person, a celebrity, another creator's character, a brand logo or a platform's
verification badge. Those are impersonation and get accounts suspended.

## What you need

- The identity source: the character bible (for Claudia, [claudia-character-bible](../claudia-character-bible/SKILL.md)
  and its v2 identity block), the agent's persona, or the coin's name, ticker and idea.
- `@useclaudia/media` or `claudia generate` with an image key, and a brand kit with approved refs if the subject is a
  character ([character-consistency](../character-consistency/SKILL.md)).
- `ffmpeg` and `ffprobe` for [scripts/export-avatars.sh](scripts/export-avatars.sh).
- [references/avatar-specs.md](references/avatar-specs.md) — sizes and limits per platform with sources (checked
  2026-10). Read it before exporting.
- [templates/avatar-set-brief.yaml](templates/avatar-set-brief.yaml) to fill in first.

## Steps

1. **Pick the identity anchor.** Decide what the avatar must show, in one line, before any prompt:
   - Character or creator: the face, same crop everywhere. For Claudia: her face with the bob, the peach streak in the
     bangs, the star clip and the headset mic. Never a monogram.
   - Agent without a face: one simple mark (an object, a glyph, a mascot head) in one accent colour.
   - Coin: the token image, and the coin's X and Telegram use the same image.
   Write it in the brief with the colours, background and what is locked.

2. **Design for the circle at 48 px.** Most platforms show personal avatars as circles. Compose a square where:
   - The face or mark fills about 60–70% of the circle's width; nothing important within 15% of the corners.
   - Eyes sit a little above centre (about 40% from the top) for a head-and-shoulders crop.
   - The background is one flat or softly lit colour that contrasts with hair and skin; no scenery, no text.
   - One accent only. For Claudia: near-black or warm off-white backdrop, the peach streak is the colour pop.

3. **Generate the master square.** 1:1, 2K, brand kit on, the identity block pasted word for word. Claudia:

   ```sh
   claudia generate image "[CLAUDIA ID v2] Claudia, a 28-year-old woman (adult, late twenties) with a glossy jet-black \
   jaw-length blunt bob and heavy straight bangs; one peach-orange streak panel through the front bangs on one side, \
   the rest jet-black; a small peach star-shaped hair clip at the side; a thin headset microphone along her cheek; \
   light freckles across the nose and cheeks; grey-green eyes; straight dark brows; glossy coral lips; a cool, direct \
   gaze; natural skin texture with visible pores. Head-and-shoulders portrait, face centred, eyes slightly above \
   centre, looking into the lens, white glossy vinyl top with a high ruched neck, seamless pale grey-white paper \
   backdrop, soft daylight from one side, 85mm lens, clean editorial film grade. No text, no logos." \
     --model google/nano-banana-2.1 --aspect 1:1 --resolution 2K --n 4 --max-usd 0.30
   ```

   Four candidates at 2K cost about 4 × $0.0504 (checked 2026-10). Prompt blocks for agents, creators and coin marks
   are in [templates/avatar-prompts.md](templates/avatar-prompts.md).

4. **Score small, fix, then lock the master.** Run the export script on each candidate and look at the 48 px and 32 px
   circles first. Pick the one you can still recognise. Fix defects by editing, not rerolling
   ([image-editing-and-upscaling](../image-editing-and-upscaling/SKILL.md)); upscale to 2048 if needed. Save it as
   `<name>-primary-v1-master-2048.png` with its provenance sidecar or edit log.

5. **Export every size with the script.**

   ```sh
   sh scripts/export-avatars.sh claudia-primary-v3.png claudia-primary-v3 ./avatars
   ```

   It writes the 2048 master, a 1080 JPG (Instagram, Threads, TikTok, LinkedIn, Telegram, Discord, Farcaster), YouTube
   800, X 400, Bluesky 1000 JPG, a 1000 px PNG for coin uploads, and circle previews at 400/96/48/32, then checks the
   files against the caps it knows (X 2 MB, Bluesky 1,000,000 bytes, `claudia launch --image` 4 MB).

6. **Define the variant rules.** Variants keep the account fresh without breaking recognition. Write in the brief:

   | Locked (never changes) | Allowed to change |
   |---|---|
   | Face or mark, crop, framing, eye line | Backdrop colour (from the palette) |
   | The signature anchors (for Claudia all five) | Outfit from the wardrobe, one look |
   | The one accent colour | A seasonal prop that stays outside the face |
   | Style (photo vs illustration) | A thin event ring or badge at the circle edge |

   One variant live at a time, for a set period (an event week, a launch, a season), then back to the primary. Never
   change avatar and display name in the same week. Template prompts for variants are in
   [templates/avatar-prompts.md](templates/avatar-prompts.md).

7. **Set up coin and agent avatars.** A coin's avatar is its token image; make it with
   [coin-launch-art-kit](../coin-launch-art-kit/SKILL.md) and use the same file on the coin's X and Telegram. An agent
   that launched a coin keeps its own avatar; the coin gets its own mark, so nobody mistakes the agent for the token.

8. **Upload, label and register.** Upload the exported file per platform (not a screenshot), check it in the app on a
   phone in light and dark mode, and record each upload in [templates/avatar-register.csv](templates/avatar-register.csv):
   platform, file, version, date, who approved. The bio carries the AI disclosure
   ([ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md)); where a platform lets you add alt text
   to profile images, start it with "AI-generated image:".

9. **Audit the set every quarter.** Open every profile side by side. Same version everywhere, or a planned variant
   with an end date? Any platform still on an old crop? Update the register.

A full worked set for Claudia (primary, two variants, nine platforms, register) is in
[examples/claudia-avatar-set.md](examples/claudia-avatar-set.md).

## Templates

- [templates/avatar-set-brief.yaml](templates/avatar-set-brief.yaml) — identity anchor, locked and allowed parts,
  variants with dates, platforms.
- [templates/avatar-prompts.md](templates/avatar-prompts.md) — master prompts for a character, a faceless agent, a
  creator illustration and a coin mark, plus variant edit prompts.
- [templates/avatar-register.csv](templates/avatar-register.csv) — what is live where, since when, approved by whom.
- [scripts/export-avatars.sh](scripts/export-avatars.sh) — all sizes, circle previews and size checks from one master.

## Check before you finish

- [ ] Recognisable in the 32 px circle preview; nothing important cut by the circle.
- [ ] Same primary version (or one dated variant) on every platform in the register.
- [ ] Locked parts unchanged in every variant; for Claudia all five anchors visible and she reads as 28.
- [ ] Files match each platform's limits (X under 2 MB, Bluesky under 1,000,000 bytes, launch image under 4 MB).
- [ ] No real person, celebrity, other creator's character, brand logo or badge look-alike.
- [ ] Bio carries the AI disclosure; profile alt text, where offered, says "AI-generated image:".
- [ ] Master, sidecar or edit log, and exports are saved together.

## Pitfalls

- **Full-body shots as avatars.** At 48 px they are a smudge. Head and shoulders, face large.
- **Text in the avatar.** Unreadable at small sizes and models misspell it. Put the name in the display name.
- **Corners carrying the design.** The circle crops them away.
- **A different avatar per platform.** People recognise a face once. Use one master everywhere.
- **Variants that drift.** A new hairstyle "for autumn" is a new character. Change backdrop or outfit, not anchors.
- **Badge mimicry.** A blue check, a coloured ring that looks like a platform's verification mark, or an exchange logo
  invites reports and impersonation flags.
- **Using a screenshot.** Re-compressing a downloaded avatar degrades it. Always upload from the master exports.

## Related skills

- [claudia-character-bible](../claudia-character-bible/SKILL.md) — her identity block, palette and never list.
- [character-consistency](../character-consistency/SKILL.md) — refs and drift scoring for the master.
- [image-editing-and-upscaling](../image-editing-and-upscaling/SKILL.md) — fixing and upscaling the chosen candidate.
- [banner-and-collage-design](../banner-and-collage-design/SKILL.md) — the header that sits next to the avatar.
- [coin-launch-art-kit](../coin-launch-art-kit/SKILL.md) — token images that double as the coin's avatar.
- [personal-brand-strategy](../../grow/personal-brand-strategy/SKILL.md) — bios, handles and cross-platform consistency.
