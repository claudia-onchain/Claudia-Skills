# Editor notes: CapCut, DaVinci Resolve, Premiere (checked 2026-10)

Read when a person (not a script) is editing, or when choosing which editor a team should standardise on.

## CapCut

- **Status (US):** legal and in the app stores; since 2026-01-22 operated by TikTok USDS Joint Venture LLC (Oracle,
  Silver Lake and MGX 15 % each, ByteDance 19.9 %) [3P: hooked.so].
- **Good for:** fastest path to word-by-word highlight captions (auto captions with karaoke/highlight styles and caption
  templates), beat-synced cuts, phone editing.
- **Licence trap:** the Materials License splits assets into personal-use and commercial-use. **One personal-only asset
  (template, sticker, effect, font, track) makes the whole export personal-only**, and the built-in music library is not
  cleared for commercial use [3P: autoae.online, artyfile.com — check each asset's in-app licence label]. Claudia's
  account is a brand account: use commercial-labelled assets only, or bring your own licensed fonts and music.
- **Workflow:** import conformed 1080×1920 clips → Auto captions → pick a style, then edit fonts to Barlow Condensed /
  DM Sans if your plan allows custom fonts → Export 1080p, 30 fps, "Recommended" bitrate, no CapCut end screen.
- Turn off the default watermark/end card; AI-label at upload on the platform, not with a CapCut sticker.

## DaVinci Resolve

- **Resolve 20** (announced 2025-04-04) added AI IntelliScript (build a timeline from a script), AI Animated Subtitles
  (word-by-word), Multicam SmartSwitch, IntelliCut and Audio Assistant. **IntelliScript and Animated Subtitles are
  Studio-only.** (blackmagicdesign.com press release)
- **Resolve 21** stable on 2026-06-04: a new Photo page (also in the non-Studio version); Studio-only AI tools include
  CineFocus, UltraSharpen, Motion Deblur, Face Age and Reshaper, IntelliSearch, SlateID and AI Speech Generator
  (script to voice-over). Studio is a one-time $295 with upgrades included. (cgchannel.com)
- **Good for:** colour matching across models (Color page, shot match, scopes), Fairlight loudness metering (set the
  meter to -14 LUFS), batch render presets.
- **Cautions:** never use Face Age/Reshaper to make Claudia look younger. If you use AI Speech Generator for voice-over,
  the voice must be one you are licensed to use (see [../../voice-and-lip-sync/SKILL.md](../../voice-and-lip-sync/SKILL.md)).
- **Vertical timeline:** Project Settings → 1080×1920, "Use vertical resolution"; render with Format MP4, H.264, Quality
  restrict to 12,000–16,000 kb/s, "Network optimization" on (= faststart).

## Adobe Premiere (26.x)

- **26.3 (June 2026):** Generative Extend accepts 360p–4K, any aspect ratio, interlaced footage; one-word-at-a-time
  captions for social; sequences from Firefly Boards [3P: larryjordan.com]. Generative Extend is Firefly-based and went
  GA in April 2025; Adobe describes Firefly as "commercially safe". Caption Translation covers 27 languages.
- **Good for:** extending an AI clip by a second to make room for an L-cut or a caption beat (Generative Extend), teams
  already on Creative Cloud.
- **Caution:** extended frames are generated too — the whole clip is still AI-generated; keep the label. Premiere can
  attach Content Credentials on export; platforms strip most metadata on upload anyway, so label natively too.

## Which one?

| Situation | Pick |
|---|---|
| An agent editing headless, batch | ffmpeg scripts in this skill |
| A person on a phone, personal account, fast captions | CapCut (commercial assets only on brand accounts) |
| Colour-critical, multi-model stitching, loudness metering | DaVinci Resolve (Studio for animated subtitles) |
| Creative Cloud team, needs Generative Extend | Premiere 26.3 |
