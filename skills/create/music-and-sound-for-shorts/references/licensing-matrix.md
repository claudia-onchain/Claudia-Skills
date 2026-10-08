# Music licensing matrix (checked 2026-10)

Read before choosing any track. This is a working summary, not legal advice; the platform's own terms and your
licence certificate win. Re-check before a paid campaign.

## Platforms

### TikTok
- Business accounts only see the **Commercial Music Library (CML)** in the sound picker: about 1M pre-cleared tracks,
  included at no extra cost for businesses, cleared **for use on TikTok only** (not for re-posting the file elsewhere).
- Businesses may not use the general music library for anything commercial — organic posts, duets, stitches, ads and
  branded content included.
- Sources: ads.tiktok.com/help/article/commercial-music-library · tiktok.com/legal/page/global/commercial-music-library-user-terms/en

### Instagram / Facebook
- Business accounts are limited to the **Meta Sound Collection** (licence-included tracks; ~14k per third-party counts);
  the big licensed library is for personal/creator accounts.
- Reels that use licensed library music can't be boosted as ads.
- Sources: help.instagram.com/329208821595430 (search snippet) · foximusic.com Reels copyright guide [3P]

### YouTube Shorts
- Shorts can be up to 3 minutes. Most Shorts audio-library songs can be used for up to 90 s; some only 60 or 30 s.
- **A Short longer than 1 minute with any active Content ID claim is blocked globally** — it can't be played,
  recommended or monetised.
- YouTube Audio Library tracks don't trigger claims.
- Source: support.google.com/youtube/answer/15424877

### X, Telegram, Discord, websites
- No platform library. Use only music you own, generated under terms that allow it, or licensed for that channel.

## AI music tools

| Tool | Status / terms | Use for Claudia's brand posts? |
|---|---|---|
| ElevenLabs Music (`elevenlabs/music-v1`, `-v2.5`) | Trained on licensed data (Merlin, Kobalt deals); marketed as cleared for commercial use. Music Terms bar six sectors: weapons, tobacco, prescription drugs, adult content, religious organisations, political advocacy. No artist/song/label/publisher names or substantial lyrics in prompts. Output may not be unique. A third-party claim that self-serve plans exclude film/TV/games is **unconfirmed** on the terms page. (elevenlabs.io/music-terms) | Yes, within the terms; log the plan tier |
| Google Lyria 3.5 / 3 Clip (`google/lyria-*`) | SynthID watermark on all output. Lyria 3 Pro (2026-03-26) makes up to 3-minute tracks. **No clear published commercial/monetisation terms** beyond Google's ToS and Gen-AI prohibited-use policy. (musicbusinessworldwide.com) | Only after someone reads the current terms and records the decision; avoid on sponsored posts until then |
| Suno v6 / v6-wild / v6-mini (2026-09-09) | Trained on licensed Warner, BMG, Believe catalogues; old models retired. Pro/Premier: you own the output and get commercial rights; the entry tier is play-and-share only. (thenextweb.com) | Yes on Pro/Premier; keep the plan receipt |
| Udio "Starstruck" | Licensed walled garden after UMG/Warner settlements: no export, no ownership, watermarked/fingerprinted. (musicbusinessworldwide.com) | **No** |
| Video-model native audio (Kling, Seedance, Omni, Veo) | Part of the generated clip; music it invents is inconsistent and its similarity to existing songs is unknown | Prompt "no music"; keep ambience/SFX only |

## Fonts on screen (same logic)

Captions and covers use fonts too: Barlow Condensed, DM Sans and DM Mono are SIL Open Font License (commercial use
allowed). Editor-bundled fonts (CapCut templates) may be personal-use only — see
[../../short-form-editing/references/editor-notes.md](../../short-form-editing/references/editor-notes.md).

## Decision rule

1. Brand account? → only CML (TikTok) / Meta Sound Collection (IG) / YouTube Audio Library, or your own licensed/AI track.
2. Publishing by API? → bake the track into the file (library sounds can't be attached by most APIs).
3. Short over 60 s on YouTube? → zero claimable music.
4. Paid or sponsored? → the tool/library licence must cover advertising; add `#ad`.
5. Log it.
