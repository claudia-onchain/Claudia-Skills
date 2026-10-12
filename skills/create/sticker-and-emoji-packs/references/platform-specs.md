# Sticker and emoji specs: Telegram and Discord (checked 2026-10)

Read this before exporting (step 5 of the skill) and again before uploading. Sources: core.telegram.org/stickers,
the Telegram Bot API sticker methods, docs.discord.com (emoji and sticker resources) and discord.com/blog's custom
emoji guide. Items marked [3P] come from third-party guides because the platform's own page doesn't state them.

## Telegram

### File formats

| Type | Format | Size on canvas | Length / fps | File size | Notes |
|---|---|---|---|---|---|
| Static sticker | PNG or WEBP | one side **exactly 512 px**, the other ≤ 512 | — | — | transparent background |
| Video sticker | WEBM, **VP9** | one side exactly 512 px, the other ≤ 512 | **≤ 3 s**, **≤ 30 fps** | **≤ 256 KB** | **no audio stream**; loop recommended |
| Animated sticker | TGS (Lottie via the Bodymovin-TG plugin) | 512 × 512 canvas | ≤ 3 s, 60 fps | ≤ 64 KB | must loop; no expressions, masks, layer effects, text layers, 3D layers or time remapping |
| Custom emoji (static or video) | PNG/WEBP or WEBM VP9 | **exactly 100 × 100** | same as stickers | same as stickers | anyone can create; adding and using custom emoji sets needs Telegram Premium |
| Set icon (thumbnail) | same format as the set | 100 × 100 | video/TGS loop ≤ 3 s | static ≤ 128 KB; WEBM or TGS ≤ 32 KB | if omitted, the first sticker is the icon |

Telegram's own tip: "a transparent background, white stroke and black shadow effect will make your sticker stand out."

### Set limits (Bot API)

- A regular sticker set holds up to **120** stickers; a custom emoji set up to **200**.
- Each sticker gets **1–20 emoji**; regular and custom-emoji stickers can also have **0–20 search keywords, 64
  characters in total**.
- A new set via the Bot API starts with 1–50 stickers; the title is 1–64 characters. All stickers in a set share one
  format (static, video or animated).

### Where to make the set

- **@Stickers mini app** (`t.me/stickers?startapp`): create and manage sticker and emoji packs. The @Stickers bot also
  accepts text commands; send it `/help` for the current list.
- **In-app Sticker Editor:** open the sticker panel in any chat and tap (+). Good for quick personal packs.
- **Emoji that follow the text colour:** send `/adaptive` while creating an emoji set, for simple single-colour icons.
- **Bot API** (`createNewStickerSet`, `addStickerToSet`, `setStickerSetThumbnail`) for automated packs owned by a
  user and created through your bot; see [../../../build/telegram-bot-agent/SKILL.md](../../../build/telegram-bot-agent/SKILL.md).
  Animated and video stickers and their thumbnails must be uploaded as files, not by URL.

## Discord

### Emoji

| Item | Spec |
|---|---|
| Formats | JPEG, PNG, GIF, WEBP, AVIF |
| File size | **256 KiB** max (the API rejects larger uploads; the app may compress them) |
| Size | **128 × 128** recommended |
| Name | at least 2 characters (lowercase letters, digits and underscores are the safe choice) |
| Slots per server | 50 static + 50 animated; Boost Level 1: 100 each; Level 2: 150 each; Level 3: 250 each |
| Animated emoji | upload like static ones; members need Nitro to use them |
| Who can upload | members with the Create Expressions permission: Server Settings → Emoji (or the emoji picker, with permission) |
| App emoji | a bot application can own up to 2,000 emoji of its own |

### Stickers (server stickers)

| Item | Spec |
|---|---|
| Formats | PNG, APNG, GIF, or Lottie JSON (Lottie only on verified or partnered servers) |
| File size | **512 KiB** max |
| Size | **320 × 320** px; animated stickers up to 5 s |
| Name | 2–30 characters; description empty or 2–100 characters; suggestion tags up to 200 characters |
| Slots | 5 on an unboosted server, more at each boost level (15 / 30 / 60 per third-party guides) [3P] |
| Upload | Server Settings → Stickers (Create Expressions permission) |

## Reaction GIFs (to post, not to install)

No platform-specific spec applies; these are posted like any image. Practical targets: 480 px wide, 2–4 s, 12–15 fps,
looping, under about 2 MB so they load quickly on mobile.

## Copyright and content (both platforms)

- Only your own character, art and words. No other creators' characters, celebrities, brand logos, sports teams or
  copyrighted memes cut from films or shows.
- Adults only; nothing sexual, hateful or violent; follow each platform's terms.
- Coins: a ticker sticker is fine as branding; no "to the moon", "100x", "buy" or price-target stickers.
- Say it's AI: put "AI-generated" in the Telegram set's title or the announcement post, and in the Discord sticker
  description (emoji have no description field, so say it in the channel post that introduces them).
