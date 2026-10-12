# Platform language features (checked 2026-10)

Read this before choosing languages (step 1) and before publishing (step 8). Sources are the platforms' own help and
newsroom pages unless marked [3P]. These features change month to month; re-check before relying on a detail.

## YouTube: multi-language audio (your own dubs)

Source: support.google.com/youtube/answer/13338784

- Available to creators with access to **Advanced features**.
- Studio on a computer → **Languages** → pick the video → **Add language** → **Add** next to "Dub" → select the file →
  **Publish**. To replace a track, delete it under "Audio" for that language and upload again.
- The file is audio-only, in a supported format, and "roughly the same length as your video".
- A track may be removed if its copyrighted content differs from the original audio (don't add new music to a dub).
- If an automatic dub exists for that language, delete it before uploading your own.
- Viewers pick the audio track in the player settings; YouTube can play their preferred language by default.

## YouTube: automatic dubbing

Source: support.google.com/youtube/answer/15569972

- On by default for eligible creators; others can turn it on through early access in Studio (Advanced settings).
- Not available for videos over 120 minutes, with little or no speech, in an unsupported original language, with
  speech too fast to dub, or with copyright claims.
- English originals can be dubbed into Arabic, Bengali, Dutch, French, German, Hebrew, Hindi, Indonesian, Italian,
  Japanese, Korean, Malayalam, Polish, Portuguese, Punjabi, Russian, Spanish, Tamil, Telugu and Ukrainian. Most other
  original languages dub into English only (exceptions include Hindi, Korean, Portuguese and Spanish). Check the
  Languages page per video for the current list.
- Some languages support **expressive speech** (keeps the original pitch and intonation), not always used.
- Review first: Studio app → Settings → Automatic dubbing → **Publish manually**. Preview, publish, unpublish and delete
  are in Studio on a computer. Auto-dubs can't be edited; fix the original language setting and the dub regenerates.
  A deleted dub can't be republished.
- **Experimental lip sync**: early access for select channels and qualifying videos; tick "Allow experimental lip sync"
  after "Allow automatic dubbing" in Advanced settings.
- Viewers see "auto-dubbed" in the description and can switch tracks.

## YouTube: subtitles, titles and descriptions

- Subtitle uploads accept SubRip (`.srt`), SubViewer (`.sbv`), WebVTT (`.vtt`), TTML and others. SRT must be plain
  UTF-8 and has no styling (support.google.com/youtube/answer/2734698).
- Translated titles and descriptions go on the same Languages page.
- `@useclaudia/social` sets `snippet.defaultLanguage` from `options.youtube.language`; it doesn't upload extra audio
  tracks or subtitle files. Do those in Studio.

## Meta (Instagram and Facebook): Meta AI translations

Source: about.fb.com/news/2025/10/discover-reels-around-world-meta-ai-translation (updates to 2026-07-14)

- Translates and dubs Reels with a voice that mimics the creator's; **lip sync is optional**.
- Instagram: English, Hindi, Portuguese, Spanish, Bengali, Tamil, Telugu, Marathi, Kannada, plus French, German,
  Italian, Japanese and Korean (added 2026-07-14).
- Facebook: English, Hindi, Portuguese, Spanish, Bengali, Tamil, Telugu, Marathi, Kannada; Arabic, Bahasa Indonesian,
  French, Thai and Vietnamese announced as "soon" (2026-06-04).
- Who: Facebook creators with 1,000+ followers; all public Instagram accounts; only where Meta AI is available.
- Every translated Reel is labelled **"Translated with Meta AI"**; viewers can pick "Don't translate".
- The voice is a synthetic copy of the creator's voice: opt in only for your own Reels, and only if you are fine with
  that. For an AI character, it copies the character's synthetic voice.

## TikTok

- TikTok translates captions and on-screen text for viewers [3P]. An AI dubbing tool was announced for advertisers in
  TikTok's Symphony suite [3P, 2024]. No native multi-language audio track for organic posts was confirmed on TikTok's
  own pages (checked 2026-10).
- Practical path: a separate post per language with a native caption, spaced apart, or a separate language account.

## X, Threads, Bluesky, Mastodon, LinkedIn, Telegram

- No multi-language audio tracks. Post the dubbed file as its own post with a caption in that language.
- Set the post language where the connector supports it: `options.bluesky.langs` (default `["en"]`),
  `options.mastodon.language`.

## Voice consent rules worth quoting

- ElevenLabs use policy (elevenlabs.io/use-policy): no "cloning, synthesizing, or impersonating the voice, identity, or
  likeness of any living individual without their explicit and informed consent or other valid authorization"; no
  circumventing "voice verification systems such as Voice CAPTCHA"; disclose AI where not doing so would materially
  mislead; don't remove watermarks or provenance signals to evade detection.
- ElevenLabs Dubbing API (`POST /v1/dubbing`) has a `disable_voice_cloning` option that uses similar library voices
  instead of clones, and a `watermark` option for video output. The package doesn't wrap it.

## ElevenLabs model language coverage (elevenlabs.io/docs/models)

| Model | Languages | Characters per request |
|---|---|---|
| Eleven v3 (`elevenlabs/v3`) | 70+ | 5,000 |
| Multilingual v2 (`elevenlabs/multilingual-v2`) | 29 | 10,000 |
| Flash v2.5 (`elevenlabs/flash-v2.5`) | 32 | 40,000 |
| Eleven v4 | 90+ | 10,000 (not in the package's model table yet) |
