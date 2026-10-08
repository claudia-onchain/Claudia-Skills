---
name: ai-disclosure-and-provenance
description: "Labels AI-generated content correctly everywhere it goes and keeps proof of where it came from — per-platform rules (TikTok AIGC label and C2PA auto-labels, Meta \"AI info\", YouTube altered-or-synthetic disclosure and containsSyntheticMedia, X manipulated-media policy and the Automated account label, Bluesky/Mastodon bot flags), how @useclaudia/social adds native flags and \"(AI-generated)\" text automatically, the laws that now apply (EU AI Act Article 50 from 2026-08-02, California SB 942, China's CAC labelling rules), C2PA Content Credentials and Google SynthID (what survives editing and upload, how to inspect), provenance sidecars, character-honesty rules, #ad and \"not financial advice\". Use before publishing any AI image, video, voice or avatar; when setting up an AI character's profiles; when a post was flagged or labelled unexpectedly; or when asked \"do we need to label this?\"."
license: MIT
metadata:
  title: "AI disclosure and provenance"
  category: create
  summary: "Label every AI post the way each platform and law expects, and keep provenance that proves what made it."
  level: beginner
  tags: "ai label, disclosure, c2pa, content credentials, synthid, provenance, eu ai act, compliance, transparency"
  uses: "@useclaudia/social, @useclaudia/media, @useclaudia/cli"
  time: "10 min setup · 1 min per post"
  version: "1.0.0"
  updated: "2026-10-08"
---

# AI disclosure and provenance

Claudia is an AI character and says so — in her bio, on every post, and in the file metadata. That's not only polite:
platforms now auto-detect and penalise undisclosed realistic AI, and the EU AI Act's transparency duties apply from
2 August 2026. This skill sets up the profile labels once, adds the right label to each post, and keeps provenance that
survives your editing workflow.

## When to use this

- Before publishing any AI-generated or AI-altered image, video, voice-over, avatar or music.
- Setting up or auditing an AI character's accounts (bio, account-level automated/bot labels).
- A platform added "AI info" / "AI-generated" / "Manipulated media" on its own and you want to know why.
- Paid partnerships, gifted products or coin mentions in AI content.
- Someone asks "do we really need to label this one?" (yes, in this library: always).

## What you need

- `@useclaudia/social` (labels are applied in `preview()`/`publish()` and can't be turned off) or the CLI
  (`claudia post <network> … --dry-run`).
- The provenance sidecars `@useclaudia/media` writes next to every output (`<file>.json`).
- Optional inspection tools: `c2patool` (Content Authenticity Initiative, open source) and the web verifier at
  contentcredentials.org/verify.
- Read [references/platform-rules.md](references/platform-rules.md) for each platform's exact rule and UI path, and
  [references/laws-and-standards.md](references/laws-and-standards.md) for EU/US/China law and the C2PA/SynthID details.

## Steps

### 1. Adopt the house rule: label everything

Platforms differ on *when* labels are required (mostly "realistic" people, places or events). Claudia's content is
photoreal and features a realistic person, so it's almost always in scope — and a consistent label is simpler than
case-by-case judgement. **Every Claudia post carries an AI label.** Scripts and captions written with AI help don't need
a label by themselves on TikTok or YouTube (checked 2026-10), but the visuals always do.

### 2. Set up the profiles once

| Where | Setting | Text |
|---|---|---|
| Every bio | plain line | "AI-generated character" or "AI creator · always labelled" |
| Website footer + terms | plain line | "Claudia is an AI character. The platform is operated by a small team." |
| X | Settings → Your account → Account information → **Automation** → mark as automated, link the managing account | required for API-posting accounts under X's automation rules |
| Mastodon | Profile → "This is an automated account" | bot flag shows on every post |
| Bluesky | label the account as AI/automated in the bio; `(AI-generated)` text on posts (added automatically) | — |
| Telegram / Discord | channel description says AI-generated | posts get `(AI-generated)` text |
| YouTube channel | About: "AI-generated character" | per-video disclosure still required |

Never claim to be human, never claim affiliation with an AI company, never name the model behind her in public copy.

### 3. Let the library add native flags, then check the preview

`@useclaudia/social` sets `labels.ai` to `true` by default and uses the native flag where one exists (checked 2026-10):

| Network | What it sets |
|---|---|
| X | `made_with_ai` on the post (+ a reminder that the account needs the Automated label) |
| YouTube | `status.containsSyntheticMedia = true` on upload |
| TikTok | `is_aigc = true` (TikTok's AI-generated content label) |
| Instagram | `is_ai_generated = true` |
| Pinterest | `ai_disclosures: ["AI_MODIFIED"]` |
| Mastodon | the account bot flag (else text + a warning) |
| Everywhere else (Telegram, Discord, Bluesky, Farcaster, Nostr, LinkedIn) | text disclosure `(AI-generated)` (`rules.disclosureText`) |

```sh
claudia post x "rain check? never heard of her" --media final/rain-ep1.mp4 --dry-run
# Labels added  X made_with_ai · Automated account label reminder
```

```ts
const p = social.draft({ text: "rain check? never heard of her", media: ["final/rain-ep1.mp4"],
  targets: [{ account: "tiktok-main" }, { account: "ig-main" }, { account: "yt-main" }, { account: "tg-channel" }] });
for (const r of social.preview(p.id)) console.log(r.network, r.labelsAdded, r.warnings);
```

If you post manually in an app, switch the label on yourself: TikTok "AI-generated content" toggle under More options;
Instagram "AI info" / "Add AI label" in Advanced settings; YouTube Studio → Details → "Altered or synthetic content: Yes".

### 4. Add the other labels the content needs

- **Paid, gifted or affiliate:** `labels.ad: true` → `#ad`, X `paid_partnership`, TikTok branded-content toggle. Never mark
  a token promo as branded content on TikTok — TikTok doesn't allow crypto promotion at all.
- **Coins, prices, contract addresses:** "Not financial advice." is added automatically and can't be removed while the
  post talks about a coin. Price/return promises ("100x", "guaranteed") are blocked.
- **UK / EU audiences and crypto:** see [../../grow/crypto-marketing-compliance/SKILL.md](../../grow/crypto-marketing-compliance/SKILL.md)
  (FCA financial-promotion regime; MiCA "clearly marked as marketing").
- **Voice:** a designed AI voice is AI audio — the AI label covers it. Never clone or imitate a real person's voice.

### 5. Keep provenance with the file

Every `@useclaudia/media` output has a sidecar:

```json
{ "jobId": "mj_…", "output": { "path": "…/mj_…-1.mp4", "sha256": "…" },
  "provenance": { "prompt": "…", "model": "fal/kling-3-pro", "provider": "fal", "costUsd": 1.68,
                  "watermark": null, "terms": "https://fal.ai/terms", "at": "2026-10-13T09:58:12Z" } }
```

`watermark` says what the provider embedded: `"SynthID"` for Google outputs (Nano Banana images, Omni/Veo video, Lyria
music), `"C2PA"` for OpenAI images (OpenAI images also carry SynthID, checked 2026-10). Keep the sidecar next to the final
edit and record the chain: source job ids → edit project → export file hash. That log is your provenance even after
platforms strip metadata.

### 6. Know what survives editing and upload

- **C2PA Content Credentials** are a signed manifest inside the file. Re-encoding or saving in a tool without C2PA
  support drops it; Facebook, Instagram, X and WhatsApp strip it on upload, often after reading it for their label
  (checked 2026-10). TikTok reads C2PA to auto-label. Photoshop and Lightroom can attach Content Credentials on export (check
  your version of any video editor before relying on it); most phone editors, CapCut included, don't carry them through.
- **SynthID** is an invisible watermark in the pixels/audio, built to survive common edits (crops, compression); Google's
  SynthID Detector and the Gemini app ("Was this made with Google AI?") check it. It only detects Google's SynthID.
- So: the platform label is the disclosure; metadata is supporting evidence; your sidecar log is the record.

Inspect a file:

```sh
c2patool final/banner-network.png            # manifest summary (exits non-zero if none)
c2patool final/banner-network.png --detailed  # full assertions, signer, ingredients
```

Or upload to contentcredentials.org/verify. For SynthID, use the Gemini app or SynthID Detector.

### 7. Apply the character-honesty rules

1. Claudia is "an AI character" whenever asked. Replies: "yes! all of me. the label's right there."
2. She never fakes real-world events as real: no "I was at <real event> last night", no fake endorsements by real people.
3. No real people's likeness — not as Claudia, not in her scenes (background extras must be anonymous and generic).
4. No fake engagement: no bought followers, bot replies, engagement pods or follow/unfollow — see
   [../../grow/engagement-and-replies/SKILL.md](../../grow/engagement-and-replies/SKILL.md).
5. Thumbnails and covers are part of the post: an AI face on a cover is still AI content.

### 8. Handle a label you didn't add

If a platform labels a post "AI info" or "Made with AI" on its own, that's the system working (it read C2PA/SynthID or
its classifier fired). Don't fight it, don't strip metadata to avoid it. If X labels something "Manipulated media", check
it isn't depicting a real person or real event misleadingly; if it is, delete it.

## Templates

- [templates/disclosure-checklist.md](templates/disclosure-checklist.md) — per-post checklist (60 seconds).
- [templates/label-matrix.csv](templates/label-matrix.csv) — network × content type → label, field, where in the UI.
- [templates/provenance-log.csv](templates/provenance-log.csv) — source jobs → edit → export → post URL.
- [examples/one-clip-five-networks.md](examples/one-clip-five-networks.md) — the rain selfie labelled on TikTok, Reels,
  Shorts, X and Telegram, with previews.

Bio line template:

```text
[what she does, ≤ 8 words] · AI-generated character · [one personal detail]
```

## Check before you finish

- [ ] Bio says AI-generated; X Automated label on; Mastodon bot flag on.
- [ ] `preview()` shows the AI label for every target network (native flag or `(AI-generated)` text).
- [ ] `#ad` for anything paid/gifted/affiliate; NFA present if a coin is mentioned; nothing coin-related on TikTok.
- [ ] No real-person likeness, no fake real-world claims, no impersonation.
- [ ] Sidecar kept with the final file; provenance log row written (job ids → export hash → post URL).
- [ ] A person approved the post after seeing the preview.

## Pitfalls

- **"It's obviously AI."** Platforms and the EU AI Act test what an audience could believe, not intent. Label anyway.
- **Stripping metadata to dodge a label.** Never. It can lead to penalties (Meta says it may apply them; YouTube can remove
  content or suspend YPP for repeated non-disclosure, checked 2026-10).
- **Text label buried after 30 hashtags.** Put `(AI-generated)` where it's seen; the library appends it to the caption.
- **Cross-posting from a download.** A TikTok download carries TikTok's watermark and loses C2PA; post from your own export.
- **Forgetting the voice.** An AI voice-over on real footage still makes the post AI-altered.
- **Model names in public copy.** Disclosure is "AI-generated", not an ad for a vendor; Claudia never names her model.

## Related skills

- [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md) · [../batch-content-production/SKILL.md](../batch-content-production/SKILL.md)
- [../thumbnails-and-covers/SKILL.md](../thumbnails-and-covers/SKILL.md) · [../music-and-sound-for-shorts/SKILL.md](../music-and-sound-for-shorts/SKILL.md)
- [../../grow/crypto-marketing-compliance/SKILL.md](../../grow/crypto-marketing-compliance/SKILL.md) · [../../grow/brand-deals-and-sponsorships/SKILL.md](../../grow/brand-deals-and-sponsorships/SKILL.md)
- [../../build/social-publishing/SKILL.md](../../build/social-publishing/SKILL.md) · [../../build/thread-etiquette-and-trust/SKILL.md](../../build/thread-etiquette-and-trust/SKILL.md)
