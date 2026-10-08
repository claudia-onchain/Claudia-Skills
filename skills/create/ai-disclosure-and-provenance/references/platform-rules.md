# Platform AI-labelling rules (checked 2026-10)

Read this when you need the exact rule for one network or a manual posting path. Sources are listed per section; some
primary pages blocked automated fetching, which is noted. Platforms change these often — re-check before relying on a detail.

## TikTok

- Creators **must** label AI-generated content that shows realistic people, places or events. Misleading AI content
  (e.g. fake endorsements, fake news events) is not allowed even with a label.
- TikTok auto-labels uploads that carry **C2PA Content Credentials** (it was the first platform to do this) and adds its
  own invisible watermark to content made with TikTok AI tools and to uploads that carry C2PA. TikTok reports 1.3B+
  labelled videos.
- AI-written captions/scripts alone don't need the label.
- API: `is_aigc` on the post (set by `@useclaudia/social`). App: More options → "AI-generated content".
- **Crypto:** TikTok removes crypto promotion even in organic posts — no tickers, no buy calls, no return claims, never
  "branded content" for a token. News/education only.
- Sources: newsroom.tiktok.com/more-ways-to-spot-shape-and-understand-ai-content · TikTok Community Guidelines (AIGC).

## Meta (Instagram, Facebook, Threads)

- Label name is **"AI info"** (renamed from "Made with AI" on 2024-07-01). Meta reads C2PA and IPTC metadata to label
  automatically.
- Meta requires people to use its disclosure tool for organic content with **photorealistic video or realistic-sounding
  audio** that was digitally created or altered, "and we may apply penalties".
- API: `is_ai_generated` (set by `@useclaudia/social` on Instagram). App: Advanced settings → AI label.
- Business accounts can only use the Meta Sound Collection for music; Reels with licensed music can't be boosted.
- Crypto ads need Meta's written permission; organic posts must not promise returns. No WhatsApp Business crypto promotion.
- Source: about.fb.com/news/2024/02/labeling-ai-generated-images-on-facebook-instagram-and-threads/

## YouTube (incl. Shorts)

- **Must disclose** realistic altered or synthetic content: making a real person appear to say/do something they didn't,
  altering footage of real events or places, or generating a realistic scene that didn't happen. Claudia's photoreal
  clips fall under "realistic invented scenes".
- **Exempt:** scripts, thumbnails, beauty/colour filters, upscaling, cloning your own voice for voice-over, clearly
  unrealistic content (animation, fantasy). (Covers with an AI face still sit inside a disclosed video.)
- Label appears on the player for sensitive topics, otherwise in the expanded description. YouTube also applies labels
  from its own AI tools, C2PA data and internal detection; from May 2026 it labels undisclosed photoreal AI itself
  (third-party report).
- Repeated non-disclosure → removal or YouTube Partner Program suspension.
- API: `status.containsSyntheticMedia: true` on `videos.insert` / `videos.update` (set by `@useclaudia/social`).
  Studio: Details → "Altered or synthetic content" → Yes.
- Sources: support.google.com/youtube/answer/14328491 · developers.google.com/youtube/v3/docs/videos/insert

## X

- **Synthetic and Manipulated Media policy:** deceptively altered media likely to cause harm may be labelled
  "Manipulated media", have reach limited, or be removed. Labelling your own content doesn't make deceptive content OK.
- **Automation rules:** API-posting accounts must carry the **Automated** account label; no bulk or duplicate posting, no
  unsolicited @mentions/replies; since February 2026 the API only allows replies to posts that mention or quote you.
  One `$cashtag` per API post.
- A post-level "Made with AI" flag (`made_with_ai`) is set by `@useclaudia/social`; X's public documentation of creator
  AI labels was not confirmed on a primary page (help.x.com blocked fetching) — third-party reports from 2026.
- Sources: help.twitter.com/en/rules-and-policies/manipulated-media · X automation rules

## Bluesky, Mastodon, Farcaster, Nostr, Telegram, Discord, LinkedIn

- No native per-post AI field (or none the library uses): `@useclaudia/social` appends `(AI-generated)` text.
- **Mastodon:** tick "This is an automated account" — the bot badge shows on every post; the library uses it as the label.
- **Bluesky:** say AI-generated in the bio; text label on posts.
- **LinkedIn:** text label; LinkedIn also displays C2PA "CR" credentials on images that carry them.

## Pinterest

- `ai_disclosures: ["AI_MODIFIED"]` is sent by `@useclaudia/social`. Pinterest also labels "AI modified" from metadata and
  classifiers.

## Quick matrix

| Network | Auto-detects | Native field | Account flag | Manual UI |
|---|---|---|---|---|
| TikTok | C2PA | `is_aigc` | — | More options → AI-generated content |
| Instagram / Facebook / Threads | C2PA, IPTC | `is_ai_generated` | — | Advanced settings → AI label |
| YouTube | own tools, C2PA, classifier | `containsSyntheticMedia` | — | Studio → Altered or synthetic content |
| X | classifier (policy) | `made_with_ai` | Automated label | — |
| Pinterest | metadata, classifier | `ai_disclosures` | — | — |
| Mastodon | — | — | bot flag | Profile → automated account |
| Others | — | — | — | text `(AI-generated)` |
