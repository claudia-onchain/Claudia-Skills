# Directing TTS: tags, settings, script rules (checked 2026-10)

## ElevenLabs v3 (package `elevenlabs/v3`, remote `eleven_v3`) and v4

**Audio tags** — square brackets, placed where the delivery changes. Families:

| Family | Tags that work on most voices |
|---|---|
| Emotion | `[curious]` `[excited]` `[sarcastic]` `[mischievously]` `[tired]` `[crying]` (use rarely) |
| Delivery | `[whispers]` `[softly]` `[shouts]` (avoid on phones) `[slowly]` |
| Reactions | `[laughs]` `[giggles]` `[sighs]` `[clears throat]` `[exhales]` |
| Sound | `[applause]` `[phone buzzing]` `[light rain]` — v4 also takes scene audio like this |

v4 accepts freer direction (`[said angrily in French accent]`); v3 likes short tags. Tags are voice-dependent: a soft
designed voice may not "shout". Test each tag on Claudia's voice once and keep a list of the ones that work.

**Stability presets (v3):** Creative (most expressive, can hallucinate), Natural (closest to the designed voice, follows
tags), Robust (very consistent, ignores most tags, similar to v2). For a series: Natural. Big laughs: Creative, then
pick the best of three. In the API these are set through `voice_settings.stability` (0 = Creative, 0.5 = Natural,
1 = Robust is the common mapping — if a request returns 422, check ElevenLabs' current docs).

**Other settings** (`meta.voiceSettings` in the package): `similarity_boost` 0.75–0.85 keeps the designed timbre;
`style` 0–0.3 (higher = more exaggerated, slower); `use_speaker_boost: true` for phone speakers.

## ElevenLabs Multilingual v2 / Flash v2.5

- No audio tags. Use punctuation for rhythm and `<break time="0.6s"/>` for pauses (max 3 s each; a few per line).
- Stability slider 0–1 (default 0.5): lower = more emotional range, higher = flatter and steadier.
- Flash v2.5 is half the price and much faster — use it for drafts and reply clips.

## Gemini TTS (package `google/gemini-3.8-flash-tts`, `-lite-tts`)

- The text is read verbatim; delivery comes from the **style** (`meta.style` → `speech_metadata.style`), e.g.
  "warm and amused, relaxed pace, a smile in the voice, quiet aside at the end".
- Inline tags in angle brackets: `<short pause>`, `<cough>`.
- 30 prebuilt voices plus an extended library; Voice Design and Voice Replication exist on Google's side (cap 200 voices
  per project). **Multi-speaker:** up to 2 speakers per request, prebuilt voices only — send through
  `meta.providerOptions` following Google's speech-generation docs; custom voices must be generated one turn at a time.
- Output: 24 kHz mono 16-bit WAV. Resample to 48 kHz for video (`-ar 48000`).
- Pricing until 2026-12-31: $0.50 per 1M input tokens + $9 per 1M audio tokens (25 tokens/s); doubles afterwards.

## Script rules (all engines)

1. 6–14 words per sentence; one idea each.
2. Spell out: numbers ("fourteen"), times ("three a m"), currency, acronyms ("M C P", "A P I"), tickers ("dollar sign
   Claudia" → better: avoid tickers in speech entirely).
3. Hard words: IPA between slashes on ElevenLabs where supported, or respell ("Santorini" → "San-toh-ree-nee").
4. Put the punchline last; let the laugh tag follow it, not precede it.
5. Read it aloud yourself. If you run out of breath, the model will rush.
6. Keep a pronunciation list in the prompt library ([../../prompt-library-management/SKILL.md](../../prompt-library-management/SKILL.md)).

## Policy notes (ElevenLabs use policy, checked 2026-10)

- No voice copying without consent or legal right; no deceiving people about AI voices; no impersonating political
  candidates or officials (even with their authorisation); no election misinformation; no financial scams.
- Businesses must tell users they are talking to AI.
- Financial, legal or medical output should be reviewed by a qualified professional — Claudia avoids these topics in voice.
