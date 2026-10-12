# Worked example: "Claudia · gm pack" for Telegram and Discord

Claudia's Telegram channel and Discord server wanted reactions in her voice. The pack: 12 stickers (11 static, 1
video), the same 12 as Telegram custom emoji, 10 of them as Discord emoji, and 3 as Discord server stickers. One style,
one character block, one approval pass.

## 1. Plan

`templates/pack-plan.csv` filled as shipped: gm, mic check, lol, noted, hmm, shipping, one nap, visor, oops, yes, disco
(video), nfa. Every expression is something she actually says (her voice guide), nothing about prices, no money or
rocket emoji. Text on four stickers: "gm", "mic check", "noted", "not financial advice", set in DM Sans Bold in an
off-white rounded box.

## 2. Style anchor

STYLE A (bold flat) from `templates/sticker-prompts.md`, outfit fixed to the Studio look (cropped white puffed-sleeve
shirt with a star pin). The first generation ("gm, waving") took three rolls:

| Roll | Problem | Fix |
|---|---|---|
| 1 | big-eyed, round face: read as a teenager | added "adult proportions, adult face" and "28-year-old woman" (it was in, but the style pulled younger); dropped "cute" from the style line |
| 2 | streak spread into orange highlights all over | "one peach-orange streak in the bangs" moved to the front of the block |
| 3 | approved | became `masters/01-gm.png` and the style reference for every other sticker |

## 3. Batch

Eleven more generations with the loop from the prompts template: refs = two character refs + `01-gm.png`, transparent
PNG, `quality: "high"`. Two re-rolls: "shipping" drew a laptop with a fruit logo (prompted "plain laptop, no logo,
chrome star sticker on the lid"), and "visor" came back with a blue visor (her visors are always orange).

Contact sheet at real size before export, to judge legibility at 100 px:

```sh
ffmpeg -pattern_type glob -i 'masters/*.png' -vf "format=rgba,scale=100:100:force_original_aspect_ratio=decrease,\
pad=120:120:(ow-iw)/2:(oh-ih)/2:color=white,tile=6x2:color=white" -frames:v 1 check/sheet-100.png
```

(Tested 2026-10-12: the 6 × 2 tile gives one 720 × 240 sheet for up to 12 stickers. Look at it on a phone at 100% zoom; make a dark-background
version with `color=0x17181c` too, since many people use dark mode.)

At 100 px "not financial advice" was unreadable, so the Telegram **emoji** version of `12-nfa` shows only the wink and
finger-to-lips; the text stays on the 512 px sticker.

## 4. Export

```sh
sh scripts/export-pack.sh masters out
```

Run on 2026-10-12 against stand-in masters (one with no alpha on purpose) to show what the report looks like:

```text
  ok    01-gm  telegram 512x366 · emoji 100x100 · discord 128x128 · sticker 320x320
  ok    02-hi  telegram 512x512 · emoji 100x100 · discord 128x128 · sticker 320x320
  WARN  03-noalpha has no alpha channel (rgb24): it will upload as a rectangle
  ok    03-noalpha  telegram 384x512 · emoji 100x100 · discord 128x128 · sticker 320x320
3 sticker(s) exported to packout · 1 problem(s)
```

A wide sticker comes out 512 × 366 (one side exactly 512, the other under: valid for Telegram). The real pack exported
clean.

The disco sticker was animated from its still (image-to-video on a flat green backdrop, 5 s), then:

```sh
sh scripts/export-animated.sh clips/disco.mp4 out/telegram/11-disco.webm tg-sticker 0x00FF00
sh scripts/export-animated.sh clips/disco.mp4 out/telegram-emoji/11-disco.webm tg-emoji 0x00FF00
sh scripts/export-animated.sh clips/disco.mp4 out/discord/claudia_disco.gif discord-emoji 0x00FF00
```

Stand-in runs on 2026-10-12 for size reference: a 3 s 512 px loop came out at 103,959 bytes (crf 30, 30 fps, under the
256 KB cap on the first try), the 100 px emoji at 21,321 bytes, the keyed green-screen test at 46,314 bytes, and a
128 px Discord GIF at 73,797 bytes. Green fringe on the keyed edges was cleaned by regenerating with a background
colour far from her palette; if fringing stays, key a magenta backdrop instead.

## 5. Upload

**Telegram:** @Stickers mini app → new sticker set "Claudia · AI stickers", short link `claudia_gm`. Uploaded the 11
static PNGs, then created a separate **video** set for the disco loop (one format per set). Emoji per sticker from the
CSV (`👋 ☀️` for gm, and so on), keywords from the CSV (each under 64 characters in total). Custom emoji set made the
same way with the 100 × 100 files; the announcement post says using custom emoji needs Telegram Premium.

**Discord:** Server Settings → Emoji: 10 static PNGs named `claudia_gm`, `claudia_lol`… (the server is unboosted: 50
static slots, 10 used). Animated `claudia_disco` uploaded in the animated section; the announcement notes members need
Nitro to use animated emoji. Server Settings → Stickers: gm, noted, nfa at 320 × 320, description
"AI-generated sticker of Claudia" on each.

## 6. Announce

Telegram channel post (her voice, AI label in the text since the channel has no native label):

```text
made you a sticker pack. gm, noted, one nap, and a very serious "not financial advice"
t.me/addstickers/claudia_gm · AI-generated art of an AI character, obviously
```

Approved by the operator before posting. Pinned in the Discord #announcements channel with the same text.
