---
name: sticker-and-emoji-packs
description: Makes Telegram sticker packs, Telegram custom emoji, Discord emoji, Discord server stickers and reaction GIFs for an AI character — one consistent style across 12–30 expressions, generated with references and transparent backgrounds, checked for legibility at 100 px, and exported with tested scripts to each platform's exact specs (512 px PNG/WEBP or VP9 WEBM ≤ 3 s and ≤ 256 KB for Telegram, 128 px ≤ 256 KiB emoji and 320 px ≤ 512 KiB stickers for Discord, checked 2026-10), then uploaded and announced with an AI label. Use when someone wants a sticker pack, emoji set, reaction GIFs or animated stickers for a Telegram channel or Discord server.
license: MIT
metadata:
  title: "Sticker and emoji packs"
  category: create
  summary: "Telegram stickers, custom emoji and Discord emoji in one consistent style, exported to exact specs with tested scripts."
  level: intermediate
  tags: "stickers, emoji, telegram, discord, reaction gifs, webm, character consistency, community"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "3–4 h for a 12-sticker pack"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Sticker and emoji packs

A sticker pack puts a character into other people's conversations, which makes it one of the best community tools
there is, as long as every sticker looks like the same character drawn by the same hand. This skill plans a pack in the
character's voice, generates it with a locked style and a style-anchor reference, tests it at the size people will see
it, exports it to each platform's exact format with tested scripts, and uploads it with honest labels.

## When to use this

- A Telegram channel or group wants a sticker pack or custom emoji for its character.
- A Discord server needs custom emoji, server stickers or an animated emoji or two.
- The community wants reaction GIFs of the character to post in replies.
- An existing pack looks inconsistent (different faces, outlines, palettes) and needs a rebuild.

Not for: stickers of real people, other creators' characters or brand logos, or price and "buy" stickers for coins.

## What you need

- The character bible and approved refs ([claudia-character-bible](../claudia-character-bible/SKILL.md) for Claudia;
  a distinct character's own bible otherwise) and the ref pack from
  [character-consistency](../character-consistency/SKILL.md).
- `@useclaudia/media` with an OpenAI key for transparent PNGs (`meta.background: "transparent"`), or the `claudia` CLI
  with a flat-colour backdrop you key out. A video model key only for animated stickers.
- ffmpeg with libvpx-vp9 and ffprobe (`ffmpeg -hide_banner -encoders | grep vp9`) for the export scripts.
- An image editor for words on stickers and cleanup.
- Telegram: the @Stickers mini app. Discord: the Create Expressions permission on the server.
- Read [references/platform-specs.md](references/platform-specs.md) before exporting and before uploading.

## Steps

1. **Plan the pack in the character's voice.** Copy [templates/pack-plan.csv](templates/pack-plan.csv): 12–30 rows,
   one expression each, things the character really says (gm, noted, lol, thinking, one nap). Give each row its Telegram
   emoji (1–20 per sticker), keywords (up to 20, 64 characters in total) and a Discord name (at least 2 characters;
   use `char_word`). Decide formats now: static, video (WEBM) or both; Telegram sets hold one format each, up to 120
   stickers (emoji sets 200). Skip money, rocket and moon stickers and anything that reads as a price call.

2. **Lock one style and one character block.** Pick one style line from
   [templates/sticker-prompts.md](templates/sticker-prompts.md) (bold flat, glossy 3D or emoji head) and use it for
   every sticker. Use the character's short identity block plus "adult proportions, adult face": stylised must not mean
   younger, so no chibi or baby proportions. For Claudia keep all five anchors (bob, heavy bangs, one peach streak,
   peach star clip, headset mic) and visors orange, metal silver.

3. **Make the style anchor first.** Generate the first sticker until it is right, then make it a reference for all the
   others alongside the character refs:

   ```ts
   await media.generate({ kind: "image", model: "openai/gpt-image-2.5-flare", aspect: "1:1",
     refs: ["refs/<char>/01-front.jpg", "refs/<char>/02-34-left.jpg", "masters/01-gm.png"],
     prompt: `${style}\n${characterBlock}\n<expression>. Upper body, centred, fills about 85% of the frame. No text, no logos.`,
     meta: { quality: "high", background: "transparent", format: "png" } });
   ```

   Price runs first (`{ dryRun: true }`). Batch the rest with the loop in the prompts template.

4. **Add words and test at real size.** Set any words ("gm", "noted") in an editor with a licensed font, thick outline
   or rounded box. Then look at every sticker at 100 px and 128 px on light and dark backgrounds:

   ```sh
   ffmpeg -pattern_type glob -i 'masters/*.png' -vf "format=rgba,scale=100:100:force_original_aspect_ratio=decrease,\
   pad=120:120:(ow-iw)/2:(oh-ih)/2:color=white,tile=6x2:color=white" -frames:v 1 check/sheet-100.png
   ```

   Re-roll anything that's off-model, cut off, or unreadable at emoji size. Drop text from the emoji versions if it
   doesn't read.

5. **Export static files to spec.** One command makes every size and flags problems:

   ```sh
   sh scripts/export-pack.sh masters out
   ```

   It writes Telegram stickers (one side exactly 512 px, the other ≤ 512), Telegram emoji and the set icon (100 × 100),
   Discord emoji (128 × 128, ≤ 256 KiB) and Discord stickers (320 × 320, ≤ 512 KiB), and warns when a master has no
   alpha. Exit `3` means something needs fixing (tested 2026-10-12, ffmpeg 8.1).

6. **Export animated stickers and GIFs.** Animate a still with image-to-video on a flat backdrop (prompt in the
   template), then fit each platform's limits:

   ```sh
   sh scripts/export-animated.sh clips/disco.mp4 out/telegram/11-disco.webm tg-sticker 0x00FF00     # VP9, ≤ 3 s, ≤ 30 fps, no audio, ≤ 256 KB
   sh scripts/export-animated.sh clips/disco.mp4 out/telegram-emoji/11-disco.webm tg-emoji 0x00FF00 # 100 × 100
   sh scripts/export-animated.sh clips/disco.mp4 out/discord/char_disco.gif discord-emoji 0x00FF00  # 128 px GIF ≤ 256 KiB
   sh scripts/export-animated.sh clips/disco.mp4 out/reactions/disco.gif reaction-gif                # 480 px, 4 s
   ```

   The script steps the quality down until the file fits. Check the loop point for a jump and the edges for green
   fringe.

7. **Upload to each platform.** Telegram: the @Stickers mini app (`t.me/stickers?startapp`) or its bot (send `/help`
   for the commands); one set per format; emoji and keywords from the CSV; the 100 × 100 icon; send `/adaptive` while
   creating an emoji set if single-colour emoji should follow the text colour. Custom emoji need Telegram Premium to add
   and use. Discord: Server Settings → Emoji (50 static + 50 animated slots unboosted, more with boosts) and Server
   Settings → Stickers; members need Nitro to use animated emoji. Bot-owned packs: see
   [telegram-bot-agent](../../build/telegram-bot-agent/SKILL.md) and [discord-bot-agent](../../build/discord-bot-agent/SKILL.md).

8. **Label it and announce with approval.** Put "AI" in the Telegram set title (for example "Claudia · AI stickers"),
   "AI-generated sticker of <name>" in each Discord sticker description, and say it in the announcement post. A person
   approves the pack and the post before either goes live. Then watch which stickers get used and replace the bottom
   three next month.

## Templates

- [templates/pack-plan.csv](templates/pack-plan.csv) — 12 rows: expression, pose, text, Telegram emoji and keywords,
  Discord name, format, status.
- [templates/sticker-prompts.md](templates/sticker-prompts.md) — style lines, the character block, expression lines,
  library and CLI calls, and the animated-sticker prompt.
- [scripts/export-pack.sh](scripts/export-pack.sh) — masters → Telegram, Telegram emoji, icon, Discord emoji and stickers.
- [scripts/export-animated.sh](scripts/export-animated.sh) — video or frames → Telegram WEBM, emoji, icon, Discord GIF,
  reaction GIF, with optional colour key.
- [examples/claudia-gm-pack.md](examples/claudia-gm-pack.md) — a 12-sticker pack from plan to announcement.

Announcement line:

```text
<one line in the character's voice about the pack> · <t.me/addstickers/short_name or "in the emoji picker now"> · AI-generated
```

## Check before you finish

- [ ] Every sticker passes the character's anchor check and reads as an adult; one style throughout.
- [ ] Legible at 100 px and 128 px on light and dark backgrounds; words spelled right and set in a licensed font.
- [ ] Telegram: one side exactly 512 px (stickers) or 100 × 100 (emoji); WEBM is VP9, ≤ 3 s, ≤ 30 fps, ≤ 256 KB, no
      audio; each set one format; emoji and keywords set.
- [ ] Discord: emoji ≤ 256 KiB at 128 × 128; stickers ≤ 512 KiB at 320 × 320; names valid; slots available.
- [ ] Transparent backgrounds; no green fringe; loops don't jump.
- [ ] No real people, other characters, brand logos, or price, "buy" or moon stickers.
- [ ] "AI" in the set title or descriptions and in the announcement; a person approved it.

## Pitfalls

- **Style drift across the pack.** Each sticker generated from text alone comes out a different artist. Always pass
  the approved first sticker as a reference.
- **Chibi equals child.** Cute styles shrink adult characters into kids. State the adult age and adult proportions;
  reject anything that reads young.
- **Detail that vanishes at 100 px.** Fine hair strands, freckles and small text disappear. Bold shapes, big
  expressions, few colours.
- **Mixed formats in one Telegram set.** Static PNGs and WEBM videos need separate sets.
- **Audio in a video sticker.** Telegram rejects WEBM with an audio stream; the script strips it.
- **Soft halos.** A model's glow becomes a grey ring on dark themes. Hard edge plus a solid border.
- **Logos in props.** Laptops and phones come back with real brand marks. Prompt "plain, no logo" and check.
- **Promising Premium features.** Custom emoji need Telegram Premium to use; animated Discord emoji need Nitro. Say so.

## Related skills

- [character-consistency](../character-consistency/SKILL.md) — ref packs and drift checks.
- [pfp-and-avatar-sets](../pfp-and-avatar-sets/SKILL.md) — matching profile pictures in the same style.
- [meme-formats](../meme-formats/SKILL.md) — reaction images and meme templates.
- [telegram-and-discord-community](../../grow/telegram-and-discord-community/SKILL.md) — running the spaces the pack lives in.
- [product-and-merch-mockups](../product-and-merch-mockups/SKILL.md) — the same art as physical stickers.
- [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md) — labels and content credentials.
