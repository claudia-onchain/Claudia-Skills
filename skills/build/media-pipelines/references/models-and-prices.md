# Models, defaults and price hints (`@useclaudia/media` 0.2.0)

Run `claudia generate models [kind]` or `media.models({ kind })` for the live table on the person's machine; each model
carries `price: { basis, confidence: "list" | "estimate", asOf, url }`. Figures below were printed by the package on
2026-10-08 (checked 2026-10). Model ids are Claudia's (`<provider>/<name>`), not always the provider's own.

## Defaults (first provider with a key wins)

| Kind | Default order |
|---|---|
| image | `google/nano-banana-2.1` → `openai/gpt-image-2.5-flare` → `fal/flux-2-pro` → `byteplus/seedream-4.5` → `runway/gen4-image` |
| video | `google/omni-flash` → `fal/kling-2.6-pro` → `runway/gen4.5` → `byteplus/seedance-1.5-pro` |
| speech | `elevenlabs/multilingual-v2` → `google/gemini-3.8-flash-tts` → `openai/gpt-4o-mini-tts` |
| music | `google/lyria-3.5` → `elevenlabs/music-v1` |
| sfx | `elevenlabs/sfx-v2` |
| avatar | `heygen/avatar-iv` → `fal/omnihuman-1.5` |

## Images

| Model | Price hint |
|---|---|
| `google/nano-banana-2.1` | $0.0336 per 1K image, $0.0504 2K, $0.113 4K (list) |
| `google/nano-banana-2` / `-lite` / `-pro` | $0.067 1K · $0.0336 (1K only) · $0.134 1K/2K, $0.24 4K |
| `openai/gpt-image-2.5-flare` / `-sunburst` | ~$0.013 per 1024² medium image ($0.006 low, $0.053 high) (estimate) |
| `openai/gpt-image-2` | $0.053 per 1024² medium |
| `openai/gpt-image-1.5`, `openai/gpt-image-1-mini` | retiring 2026-12-01 |
| `fal/flux-2-pro` · `fal/flux-dev` · `fal/flux-kontext-pro` | $0.03 first MP + $0.015/MP · $0.025/MP · $0.04/image |
| `byteplus/seedream-4.5` · `-5-flash` · `-5-lite` | $0.04 · $0.018 · $0.035 (`-5-lite` id unverified) |
| `runway/gen4-image` | 5 credits ($0.05) per 720p image |

## Video

| Model | Price hint |
|---|---|
| `google/omni-flash` | ~$0.10 per second at 720p (estimate; length chosen by the model) |
| `google/veo-3.1`, `-fast`, `-lite` | $0.05–0.60/s depending on tier and resolution; **previews shut down 2026-10-22** → use `google/omni-flash` |
| `fal/kling-2.6-pro` | $0.14/s with audio, $0.07 without (list) |
| `fal/kling-3-pro`, `fal/kling-2.5-turbo-pro`, `fal/seedance-2.0`, `fal/seedance-1.5-pro`, `fal/hailuo-2.3`, `fal/wan-2.6` | $0.05–0.68/s across fal video models |
| `runway/gen4.5`, `runway/gen4-turbo`, `runway/aleph2` (edit) | $0.05–0.28/s (1 credit = $0.01) |
| `byteplus/seedance-1.5-pro`, `byteplus/seedance-2.0`, `-fast` | ~$0.05–0.37/s |

OpenAI makes no video here: the Sora / Videos API shut down on 2026-09-24.

## Speech, music, sound, avatars

| Model | Price hint |
|---|---|
| `elevenlabs/multilingual-v2`, `v3`, `flash-v2.5` | $0.04–0.08 per 1,000 characters (own voice ids; premade voices stop 2026-12-31) |
| `google/gemini-3.8-flash-tts`, `-lite-tts` | estimate from token rates |
| `openai/gpt-4o-mini-tts`, `openai/tts-1-hd` | ~$0.015/min; **shut down 2027-01-06** |
| `google/lyria-3.5`, `google/lyria-3-clip` | $0.04–0.08 per song |
| `elevenlabs/music-v1`, `music-v2.5` | $0.15/min |
| `elevenlabs/sfx-v2` | $0.12/min |
| `heygen/avatar-iv` | ~$0.05–0.10/s (estimate; HeyGen shows API rates only in its dashboard); v1/v2 endpoints retire 2026-10-31, package uses v3 |
| `fal/omnihuman-1.5` | $0.16/s of output |
| `fal/lipsync-2`, `fal/veed-lipsync` | per second of video |

## Retired / refused

`google/imagen-4` (shut down 2026-08-17) and `google/gemini-2.5-flash-image` are flagged `retired`; `generate()`
refuses them and names the replacement. `media.checkModels()` asks Google, OpenAI, fal and ElevenLabs which ids still
exist (`{ dryRun: true }` shows the requests only); HeyGen, Runway and BytePlus report `checked: false`.

## Get a key

Google AI Studio `aistudio.google.com/apikey` · OpenAI `platform.openai.com/api-keys` · fal `fal.ai/dashboard/keys` ·
ElevenLabs `elevenlabs.io/app/settings/api-keys` · HeyGen app → Settings → API · Runway `dev.runwayml.com` · BytePlus
console → ModelArk → API keys.
