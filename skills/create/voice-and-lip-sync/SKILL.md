---
name: voice-and-lip-sync
description: Gives an AI character one consistent, designed (never cloned-from-someone-else) voice and puts it in her mouth — ElevenLabs Voice Design prompts, v3 audio tags and stability presets, Gemini TTS style prompts and two-speaker dialogue, scripts written for the ear, loudness mastering to -14 LUFS, and four lip-sync routes (silent clip + speech via Sync lipsync-2 or VEED, still photo + speech via OmniHuman 1.5, HeyGen Avatar IV, or native-audio video models) with consent rules, voice-id deadlines and QA. Use when Claudia (or your character) needs to speak in a short, a voice-over, an avatar video or a reply clip.
license: MIT
metadata:
  title: "Voice and lip-sync"
  category: create
  summary: "Design her voice once, write lines for the ear, master them, and lip-sync them onto clips or stills with the right model."
  level: intermediate
  tags: "voice, tts, elevenlabs, voice design, audio tags, gemini tts, lip sync, omnihuman, heygen, talking head"
  uses: "@useclaudia/media, @useclaudia/cli"
  time: "40 min first voice · 5 min per line"
  version: "1.0.0"
  updated: "2026-10-08"
---

# Voice and lip-sync

Claudia's face is consistent because of a ref pack; her voice is consistent because of **one designed voice id** used
for every line, then synced onto silent clips. Native video audio gives her a slightly different voice every generation —
fine for a laugh, wrong for a series. This skill covers designing the voice, writing and directing lines, mastering, and
choosing the lip-sync route per shot.

## When to use this

- First time Claudia (or your character) speaks: design and lock the voice.
- Any talking-to-camera short, storytime, voice-over, reply video or avatar explainer.
- A clip's lips and words don't match, or her voice changed between episodes.

## What you need

- An ElevenLabs account and key (`claudia keys set elevenlabs`); Voice Design needs a paid tier (Starter and up,
  checked 2026-10). Optional: `google` key for Gemini TTS, `fal` for lip-sync/OmniHuman, `heygen` for Avatar IV.
- Silent clips or approved stills of her ([../selfie-and-ugc-video-prompts/SKILL.md](../selfie-and-ugc-video-prompts/SKILL.md)).
- `ffmpeg` for loudness and muxing.
- [references/tts-directing.md](references/tts-directing.md) — tags, settings and script rules (read before writing lines).
- [references/lip-sync-models.md](references/lip-sync-models.md) — model limits, prices, failure modes (read before syncing).

## Steps

### 1. Rules before anything is recorded

- **Design, don't clone.** Claudia's voice is generated from a text description. Never clone, imitate or "sound like"
  a real person — no celebrities, creators, politicians, friends. ElevenLabs' policy bans copying a voice without consent
  and deceiving people about whether a voice is AI; celebrity and other high-risk voices are blocked (checked 2026-10).
- **Cloning is only for your own voice.** A Professional Voice Clone requires the Voice Captcha (you read a prompt aloud
  in a time limit and it must match the samples). Don't try to get around it — that can mean a permanent ban.
- **Own your voice ids.** ElevenLabs' legacy premade voices were deprecated on 2026-02-28 (old ids are redirected to
  replacements, so the sound changes), and the package notes that premade voices stop working on 2026-12-31. Use a voice
  you designed and saved in your account.
- **Label it.** Synthetic voice on a synthetic character is AI content on every platform; the post carries the AI label
  ([../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md)).

### 2. Design Claudia's voice (once)

In ElevenLabs → Voices → Voice Design (or its text-to-voice API: a 20–1000 character description returns 3 previews;
`loudness` −1…1, `seed`, `guidance_scale` 0–100, checked 2026-10). The package doesn't wrap Voice Design — do it in the
ElevenLabs app or API, then use the saved id everywhere.

```text
A woman in her late twenties with a soft, low-mid pitched voice and a smile in it. Relaxed, unhurried pacing with a light
New York lilt, never a caricature. Warm and a little dry, as if telling a close friend something funny late at night.
Clear consonants, laughs easily and lightly, drops to a near-whisper for asides. Close-mic, intimate, studio-clean
recording with no background noise, no music.
```

Preview text (use the same for all three previews so you compare voices, not lines):

```text
ok so — I tried to film this four times. [laughs] And the cat walked in. All four times. Anyway, hi. I run this place now.
```

Pick with [templates/voice-design-brief.md](templates/voice-design-brief.md) (age read, warmth, clarity on a phone
speaker, laugh quality, no accent caricature). Save it, note the voice id and the design seed, and add it to her brand kit:

```ts
const kit = media.brands.get("claudia")!;
media.brands.save({ ...kit, voice: { provider: "elevenlabs", voiceId: "<your designed voice id>" } });
```

Speech and avatar jobs on ElevenLabs then use it automatically with `brand: "claudia"`.

### 3. Write lines for the ear

- One thought per sentence, 6–14 words. Contractions. Her voice: lowercase energy, dry twist at the end.
- Numbers and symbols as words: "$1,000" → "a thousand dollars", "3am" → "three a m", "MCP" → "M C P".
- Pauses: commas, em dashes and ellipses work on every model; `<break time="0.5s"/>` (max 3 s) on Multilingual v2 and
  Flash v2.5. Too many breaks destabilise the output.
- Direction with **audio tags** on v3 (and v4): put the tag where the delivery changes — `[laughs]`, `[whispers]`,
  `[sighs]`, `[curious]`, `[mischievously]`, `[clears throat]`. Tags work better or worse depending on the voice; test
  them on hers.
- Never script financial advice, price talk or claims to be human.

```text
[mischievously] storytime. My agent scheduled a post for three a m… [laughs] and it did numbers.
[whispers] I'm not sharing the credit.
```

### 4. Pick the model and settings

| Use | Package id | Price (checked 2026-10) | Notes |
|---|---|---|---|
| Expressive lines with tags | `elevenlabs/v3` | $0.08 / 1K chars | most expressive; stability presets Creative / Natural / Robust — use Natural for a series, Creative for big laughs |
| Steady narration, long VO | `elevenlabs/multilingual-v2` (default) | $0.08 / 1K chars | consistent, supports `<break>`; no audio tags |
| Fast drafts, replies | `elevenlabs/flash-v2.5` | $0.04 / 1K chars | low latency, slightly flatter |
| Style-prompted TTS, 2 speakers | `google/gemini-3.8-flash-tts` | $0.50/1M input + $9/1M audio tokens (until 2026-12-31) | `meta.style` steers delivery; 30 prebuilt voices; multi-speaker up to 2 prebuilt voices |

ElevenLabs **v4 / v4 Turbo** shipped on 2026-09-28 (same tag style, ~10 s instant clones) but is not in the package's
model table yet. Use v3 here, or add a row to `src/models.ts` after checking v4's model id and price on ElevenLabs.

### 5. Generate the line

```sh
claudia generate speech "[mischievously] storytime. My agent scheduled a post for three a m… [laughs] and it did numbers." \
  --model elevenlabs/v3 --voice <voice id> --dry-run
claudia generate speech "<same text>" --model elevenlabs/v3 --voice <voice id> --max-usd 0.05
```

With settings (package API; the CLI has no meta flag):

```ts
const line = await media.generate({
  kind: "speech", model: "elevenlabs/v3", brand: "claudia",
  text: "[mischievously] storytime. My agent scheduled a post for three a m… [laughs] and it did numbers.",
  meta: { voiceSettings: { stability: 0.5, similarity_boost: 0.8, use_speaker_boost: true } }, // 0.5 = Natural on v3
});
```

Gemini TTS alternative (prebuilt voice, style prompt; generate 3 and pick):

```ts
await media.generate({ kind: "speech", model: "google/gemini-3.8-flash-tts", voice: "Leda",
  text: "storytime. my agent scheduled a post for three a m, and it did numbers.",
  meta: { style: "a woman in her late twenties, warm and amused, relaxed pace, a smile in the voice, quiet aside at the end" } });
```

A Gemini prebuilt voice will not match the ElevenLabs design — pick one engine per series.

### 6. Master it

```sh
ffmpeg -i line.mp3 -af "silenceremove=start_periods=1:start_threshold=-50dB,loudnorm=I=-14:TP=-1:LRA=11" -ar 48000 line.wav
ffmpeg -i line.wav -af ebur128=peak=true -f null - 2>&1 | tail -12   # confirm ≈ -14 LUFS, true peak ≤ -1 dBTP
```

-14 LUFS integrated and ≤ -1 dBTP is safe on every platform (checked 2026-10). When music goes under it, mix the voice
there and the music 12–18 dB lower ([../music-and-sound-for-shorts/SKILL.md](../music-and-sound-for-shorts/SKILL.md)).

### 7. Choose the lip-sync route

| Route | Package id + refs | Price (checked 2026-10) | Best for | Weak at |
|---|---|---|---|---|
| **A. Silent clip + line** | `fal/lipsync-2`, refs `[video, audio]` | $3.00 / min | talking-to-camera UGC with real motion | needs a visible mouth with some motion in the source; many cuts fail |
| A (cheaper) | `fal/veed-lipsync`, `[video, audio]` | $0.40 / min | drafts, short replies | less detail on teeth |
| **B. Still + line** | `fal/omnihuman-1.5`, refs `[face image, audio]` | $0.16 / s | a talking portrait from one approved still, ~30 s max per job | busy backgrounds, hands |
| **C. Avatar** | `heygen/avatar-iv`, photo ref or `meta.avatarId`, voice required | ~$0.05–0.10 / s (estimate) | explainers up to 180 s | UGC energy; custom motion prompts double the cost |
| **D. Native** | Kling 3 / Wan 2.6 / Omni with a quoted line | in the video price | one-off laughs and reactions | voice changes per generation |

**Route A recipe (best for Claudia's vlogs):** generate the clip **silent but talking** — the prompt says "she talks to
the camera" so the mouth moves; lip-sync re-times it to the line. The clip must be at least as long as the line.

```sh
claudia generate avatar "lip-sync her line" --model fal/lipsync-2 --ref out/room-07-silent.mp4,out/line.wav --max-usd 1.00
```

**Route B recipe:** the prompt describes emotion, gesture and camera — not the words.

```sh
claudia generate avatar "medium close-up, she smiles knowingly, small head tilts, one slow blink, relaxed shoulders, \
static camera, warm lamp light" --model fal/omnihuman-1.5 --ref frames/lounge-closeup.jpg,out/line.wav --max-usd 2.50
```

### 8. QA the sync

- Watch at 0.5× on the plosives (p, b, m): lips must close.
- Check the first and last 0.5 s for mouth movement without sound (trim it).
- Score the face with the 7-point drift check — lip-sync can soften freckles and blur teeth.
- Mux if the model returned video without your mastered audio:

```sh
ffmpeg -i synced.mp4 -i line.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart final.mp4
```

## Templates

- [templates/voice-design-brief.md](templates/voice-design-brief.md) — voice design prompt, preview script, selection rubric.
- [templates/tts-script-template.md](templates/tts-script-template.md) — line sheet with tags, pronunciations and settings.
- [templates/voice-settings.json](templates/voice-settings.json) — the locked settings for her series voice.
- [examples/claudia-voice-session.md](examples/claudia-voice-session.md) — design → five lines → lip-sync, with costs and fixes.

## Check before you finish

- [ ] The voice is designed (or your own verified clone) — no real person imitated; voice id saved in your account and the brand kit.
- [ ] Line written for the ear; numbers spelled out; no financial advice or "I'm human" claims.
- [ ] Same engine, voice id and settings as the rest of the series.
- [ ] Mastered to ≈ -14 LUFS, ≤ -1 dBTP; no leading/trailing silence.
- [ ] Lips close on p/b/m; no mouth motion without sound; face still scores ≥ 6/7.
- [ ] Post carries the AI label; voice provenance (model, voice id) logged with the asset.

## Pitfalls

- **Tag soup.** More than one tag per sentence makes v3 erratic. One tag where the mood changes.
- **Robust preset with tags.** Robust barely reacts to tags; use Natural or Creative when you need them.
- **Short source clip.** Lip-sync can't stretch a 6 s clip to an 8 s line — generate the clip longer than the line.
- **Mixing engines.** An ElevenLabs Claudia and a Gemini Claudia in the same series sound like two people.
- **Premade voice ids in old scripts.** They silently changed sound after 2026-02-28 and stop working 2026-12-31.
- **Voice "inspired by" someone.** Even without cloning, describing a real person's voice is impersonation. Describe
  qualities (pitch, pace, warmth), never people.

## Related skills

- [../selfie-and-ugc-video-prompts/SKILL.md](../selfie-and-ugc-video-prompts/SKILL.md) · [../video-prompting/SKILL.md](../video-prompting/SKILL.md)
- [../music-and-sound-for-shorts/SKILL.md](../music-and-sound-for-shorts/SKILL.md) · [../short-form-editing/SKILL.md](../short-form-editing/SKILL.md)
- [../claudia-character-bible/SKILL.md](../claudia-character-bible/SKILL.md) · [../ai-disclosure-and-provenance/SKILL.md](../ai-disclosure-and-provenance/SKILL.md)
- [../../build/media-pipelines/SKILL.md](../../build/media-pipelines/SKILL.md)
