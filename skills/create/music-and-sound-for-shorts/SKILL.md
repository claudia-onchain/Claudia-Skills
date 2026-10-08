---
name: music-and-sound-for-shorts
description: Picks, generates, licenses and mixes music and sound for short-form video — which music each account type may legally use on TikTok (Commercial Music Library), Instagram (Meta Sound Collection) and YouTube Shorts (Audio Library, Content ID blocks on Shorts over 1 minute); AI music with Lyria and ElevenLabs Music via @useclaudia/media (terms, prompts without artist names, Suno v6 and Udio status); sound effects and ambience beds with ElevenLabs SFX; layered sound design, ducking, beat-synced cuts, -14 LUFS delivery and a licence log. Use when adding music or SFX to a short, when a post gets muted or claimed, when generating a track, or when scoring Claudia's bedroom, club, lounge and rain clips.
license: MIT
metadata:
  title: "Music and sound for shorts"
  category: create
  summary: "Licence-safe music, AI tracks, SFX beds and a clean -14 LUFS mix for every short — with prompts for Claudia's four clip types."
  level: intermediate
  tags: "music, sound design, sfx, licensing, content id, tiktok commercial music library, lyria, elevenlabs music, loudness, ducking"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "15–30 min per short"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Music and sound for shorts

Sound decides whether a short feels like a real moment or a silent AI render. It is also where most takedowns come from:
the wrong track on a brand account gets muted, claimed or removed. This skill gets you a track you are allowed to use, a
believable ambience and SFX layer, and a mix that lands at -14 LUFS — then logs the licence so it can be proven later.

## When to use this

- A short needs music, ambience or SFX (almost all of them do).
- You are deciding between an in-app platform sound, a licensed library track and an AI-generated track.
- A post was muted, blocked or got a Content ID claim.
- You are scoring one of Claudia's recurring clip types (bedroom vlog, club, lounge, rain).

## What you need

- The account type for every destination: **personal/creator** or **business/brand**. Claudia's accounts are brand
  accounts — treat every post as commercial.
- For AI audio: `@useclaudia/media` / `@useclaudia/cli` with `claudia keys set google` (Lyria) and/or
  `claudia keys set elevenlabs` (music + SFX).
- ffmpeg for mixing; `scripts/loudnorm.sh` from [../short-form-editing/SKILL.md](../short-form-editing/SKILL.md).
- [references/licensing-matrix.md](references/licensing-matrix.md) — read it before choosing any track (platform rules
  and AI-music terms, checked 2026-10). [references/music-prompt-bank.md](references/music-prompt-bank.md) — prompts for
  her clip types and 12 more moods.

## Steps

### 1. Pick the licence path from the account type

| Destination + account | Safe sources (checked 2026-10) | Never |
|---|---|---|
| TikTok, business account | the **Commercial Music Library** (≈1M pre-cleared tracks, cleared for use on TikTok only), your own licensed/AI tracks | the general library — not allowed for any commercial use, including organic posts, duets and stitches |
| Instagram/Facebook, business account | **Meta Sound Collection**, your own licensed/AI tracks | the licensed "popular" library (personal/creator use; Reels with it can't be boosted) |
| YouTube Shorts | YouTube Audio Library (no claims), Shorts audio library within its 30/60/90 s limits, your own licensed/AI tracks | any claimable track on a Short **over 1 minute** — any active Content ID claim blocks it worldwide |
| X, Telegram, Discord, site | only what you own or licensed for that use | ripped songs, "no copyright intended" |

In-app library sounds are attached in the app at upload; posting APIs generally can't attach them. If the plan is to
publish through `@useclaudia/social`, bake a licensed or generated track into the file instead.

### 2. Decide: platform sound, library track or AI track

- **Platform sound** when riding a trend sound matters more than control (manual upload step).
- **Licensed library track** (a subscription library whose licence covers brand social channels) when you need a known
  quality bar; save the licence certificate per track.
- **AI track** when you want a bespoke 8–30 s bed that nobody else has and that loops cleanly. Terms differ per tool:
  - **ElevenLabs Music** (`elevenlabs/music-v1`, `elevenlabs/music-v2.5`): trained on licensed data and marketed as
    cleared for commercial use. Its Music Terms bar six sectors (weapons, tobacco, prescription drugs, adult content,
    religious organisations, political advocacy); prompts may not name artists, songs, labels or publishers, or include
    substantial lyrics; outputs may not be unique to you.
  - **Google Lyria** (`google/lyria-3.5`, `google/lyria-3-clip`): every output carries a SynthID watermark. Google has
    published no clear commercial/monetisation terms beyond its general ToS and Gen-AI prohibited-use policy — read
    them and record your decision before using Lyria on monetised or sponsored posts.
  - **Suno v6** (launched 2026-09-09, trained on licensed Warner, BMG and Believe catalogues): Pro/Premier plans grant
    ownership and commercial rights; lower tiers are play-and-share only.
  - **Udio** (licensed "Starstruck" app): a walled garden — no export, no ownership. **Not usable** for shorts.

### 3. Write the music brief

Describe function, not famous people. Template ([templates/music-brief.yaml](templates/music-brief.yaml)):
`genre + era/texture + BPM + key mood + instrumentation + structure + length + "instrumental, no vocals" + mix notes`.

The four core beds for Claudia's clip types (more in the prompt bank):

| Clip | Prompt |
|---|---|
| Bedroom vlog (talking to camera) | `warm lo-fi hip-hop bed, 82 BPM, dusty Rhodes chords, soft vinyl crackle, brushed drums, round sub bass, gentle and unobtrusive, steady loop with no build, leaves room for a voice, instrumental, no vocals` |
| Club / DJ booth | `deep house club groove, 124 BPM, four-on-the-floor kick, offbeat open hats, rolling bassline, short filtered chord stabs without vocals, big-room reverb as heard from the dancefloor, 8-bar build into a drop at 6 seconds, instrumental` |
| Vintage lounge (sunglasses reveal) | `late-70s disco-soul lounge groove, 108 BPM, wah guitar, warm bass, string pad swell, light tambourine, intimate and playful, a small lift on bar 3 for a reveal moment, instrumental, no vocals` |
| Rain selfie (running) | `bright indie-pop run, 140 BPM, jangly clean electric guitars, driving floor-tom beat, airy synth pad, euphoric and a little chaotic, starts immediately at full energy, instrumental, no vocals` |

Never: "in the style of <artist>", song titles, label names, or famous lyric lines (blocked by ElevenLabs terms and a
claim risk everywhere).

### 4. Estimate, then generate

```sh
claudia generate music "warm lo-fi hip-hop bed, 82 BPM, dusty Rhodes chords … instrumental, no vocals" \
  --model google/lyria-3-clip --dry-run                    # $0.04 per 30-second clip (list, checked 2026-10)
claudia generate music "deep house club groove, 124 BPM … instrumental" \
  --model elevenlabs/music-v2.5 --duration 15 --max-usd 0.10   # $0.15/min → ≈ $0.04 for 15 s
claudia generate music "<full song brief with structure>" --model google/lyria-3.5 --max-usd 0.10   # $0.08 per song; length follows the prompt
```

`--duration` sets length for ElevenLabs music (3–600 s) and SFX (0.5–30 s); Lyria 3 Clip is fixed at 30 s and Lyria 3.5
shapes length from the prompt. Package-only options go through the API:

```ts
import { createMedia, envKeys } from "@useclaudia/media";
const media = createMedia({ keys: envKeys(), limits: { perJobUsd: 0.5, perDayUsd: 5, approveAboveUsd: 0.25 } });
const req = { kind: "music" as const, model: "elevenlabs/music-v2.5", durationSec: 15,
  prompt: "late-70s disco-soul lounge groove, 108 BPM, wah guitar, warm bass, string pad swell, instrumental",
  meta: { instrumental: true } };                              // force_instrumental
console.log(media.estimate(req));                            // { usd, basis, confidence }
const job = await media.generate(req);
if (!("dryRun" in job)) console.log((await media.wait(job.id)).outputs[0]?.path);
await media.close();
```

Generate 2–3 variations, pick by ear on a phone speaker, not studio monitors.

### 5. Build the ambience and SFX layer

Silent gaps between AI clips are the biggest "this is fake" tell. Lay a continuous bed, then spot effects:

```sh
claudia generate sfx "steady light rain on wet asphalt in an open lot, close perspective, gentle drips from a metal awning, no thunder" --duration 15
claudia generate sfx "muffled club crowd and bass heard from beside the DJ booth, cheering swells, no music melody" --duration 10
claudia generate sfx "quiet vintage living room tone, faint vinyl crackle, a brass lamp switch click" --duration 8
claudia generate sfx "soft bedroom room tone, distant city traffic through a closed window, a cat purring nearby" --duration 12
```

$0.12 per minute of sound (estimate, checked 2026-10). For seamless beds use the API with `meta: { loop: true }`, and
`meta: { promptInfluence: 0.7 }` when the result wanders from the prompt.

Video models with native audio (Kling 2.6/3, Seedance 2.0, Omni, Veo 3.1 until 2026-10-22) can make the ambience in
the clip itself — prompt the exact sounds and add "no music" so they don't invent a score you can't control.

### 6. Cut to the beat

Beat length = 60 / BPM. At 124 BPM a beat is 0.484 s, a bar 1.935 s: cut every 2 beats (0.97 s) in the hook, every bar
in the body. At 82 BPM (bedroom) a beat is 0.732 s. Land the sunglasses lift, the drop or the spin **on** a downbeat.

### 7. Mix in layers, duck, normalise

| Layer | Level guide (short-term LUFS) | Notes |
|---|---|---|
| Room tone / ambience | -30 to -24 | continuous under every cut; crossfade 0.2 s at clip joins |
| Foley / SFX spots | -22 to -16 | footsteps, lamp click, glass clink; sync to the frame |
| Music | -20 to -16 under speech, -14 to -12 without speech | ducked 8–12 dB when she talks (sidechain, recipe R8 in short-form-editing) |
| Voice | loudest element when present | see [../voice-and-lip-sync/SKILL.md](../voice-and-lip-sync/SKILL.md) |

Final pass: `sh ../short-form-editing/scripts/loudnorm.sh mix.mp4 mix-norm.mp4` → about -14 LUFS integrated, ≤ -1 dBTP
(safe on every platform; YouTube only turns loud audio down — checked 2026-10). End music with a 0.3–0.5 s fade or on
a bar line so a loop restart doesn't click.

### 8. Log every track

One row per asset in [templates/music-licence-log.csv](templates/music-licence-log.csv): source, model or library,
licence/terms URL, account types cleared, platforms used, date, and the `@useclaudia/media` sidecar path (prompt, model,
cost, SynthID/C2PA). When a claim arrives, this row is your dispute.

## Templates

- [templates/music-brief.yaml](templates/music-brief.yaml) — fill-in music brief with the four Claudia beds pre-filled.
- [templates/music-licence-log.csv](templates/music-licence-log.csv) — the licence/provenance log.
- [references/music-prompt-bank.md](references/music-prompt-bank.md) — 16 music prompts + 19 SFX prompts by scene.
- [references/licensing-matrix.md](references/licensing-matrix.md) — platform and tool rules with sources.
- [examples/club-clip-sound-pass.md](examples/club-clip-sound-pass.md) — full sound pass on the 8 s club clip.

## Check before you finish

- [ ] The track is cleared for this **account type** on this **platform** (matrix row recorded in the log).
- [ ] No artist, song, label or lyric references in any music prompt.
- [ ] Shorts over 60 s carry no claimable music.
- [ ] Continuous ambience under every cut; SFX in sync; music ducked under speech.
- [ ] Final mix ≈ -14 LUFS integrated, true peak ≤ -1 dBTP; no clicks at the loop point.
- [ ] Licence log row written with the media sidecar path; AI-generated audio is covered by the post's AI label.
- [ ] Sponsored post? Check the AI music tool's terms allow ads/sponsorships, and add `#ad`.

## Pitfalls

- **Trend sound on a brand account.** Using a general-library hit on a business TikTok is a commercial use — muted or removed.
- **Licensed music + boost.** Instagram Reels with library music can't be boosted; use Meta Sound Collection or your own track.
- **The 61-second Short.** One Content ID claim blocks it everywhere. Trim to 60 s or swap the track.
- **"No copyright intended"** protects nothing.
- **Model-invented music** in native-audio video clips changes from clip to clip and fights your bed — prompt "no music".
- **Stacked loudness.** Normalising each layer to -14 and then summing gives a clipped mix. Normalise the final mix only.
- **Lyria on sponsored posts** without a recorded terms check.
- **Studio monitors.** Most viewers listen on phone speakers: check bass-heavy club mixes there.

## Related skills

- [../short-form-editing/SKILL.md](../short-form-editing/SKILL.md) · [../voice-and-lip-sync/SKILL.md](../voice-and-lip-sync/SKILL.md) · [../storyboarding-shorts/SKILL.md](../storyboarding-shorts/SKILL.md)
- [../selfie-and-ugc-video-prompts/SKILL.md](../selfie-and-ugc-video-prompts/SKILL.md) · [../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md)
- [../../grow/tiktok-playbook/SKILL.md](../../grow/tiktok-playbook/SKILL.md) · [../../grow/instagram-reels-playbook/SKILL.md](../../grow/instagram-reels-playbook/SKILL.md) · [../../grow/youtube-shorts-playbook/SKILL.md](../../grow/youtube-shorts-playbook/SKILL.md)
- [../../grow/brand-deals-and-sponsorships/SKILL.md](../../grow/brand-deals-and-sponsorships/SKILL.md)
