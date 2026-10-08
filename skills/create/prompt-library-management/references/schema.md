# Prompt file schema and naming rules

Read this when creating or validating prompt files. The indexer (`scripts/index-prompts.mjs`) understands exactly this
subset of YAML: `key: value`, `key: [a, b]`, `key: {a: 1, b: "x"}`, and block lists (`  - item`, `  - {k: v}`). Keep
front matter in that shape — no multi-line strings, no anchors.

## Fields

| Field | Required | Type / values | Meaning |
|---|---|---|---|
| `id` | yes | `<character>.<family>.<scene>[.<variant>]` | stable, unique; never reused for a different prompt |
| `version` | yes | semver `MAJOR.MINOR.PATCH` | see versioning below |
| `status` | yes | `draft` · `approved` · `deprecated` · `retired` | lifecycle |
| `character` | yes | slug | `claudia`, `mara-vex`, … |
| `identity` | yes | e.g. `CLAUDIA ID v1`, or `none` (no character in frame) | the body must contain `[<identity>]` |
| `pillar` | no | `P1`–`P7` or your own, `none` | from content-pillars-and-series |
| `series` | no | series slug or `none` | |
| `scene` | yes* | world slug from the bible | `her-room-day`, `club-dj-booth`, `vintage-lounge`, `warehouse-rain`, `sunset-bedroom-nyc`, `desk-night`, `travel-*`, `studio-*`, `balcony-night` |
| `look` | yes* | wardrobe look | `signature`, `cosy-black`, `studio`, `night-out`, `travel`, `home`, `mixed` |
| `kind` | yes | `image` · `video` · `speech` · `music` · `sfx` · `avatar` | as in `@useclaudia/media` |
| `model` | yes | package model id, or `midjourney/v7` etc. for manual tools | the model the scores belong to |
| `fallback_models` | no | list | tried-and-OK alternatives (each needs its own scored variant before it's trusted) |
| `first_frame_model` | video | model id | the still model for image-to-video |
| `params` | yes | inline map | `aspect`, `resolution`, `durationSec`, `audio`, `quality`, `crop`, … (no secrets) |
| `refs` | no | list of pack names | `01-front-neutral`, `05-laugh`, `cat-01` — names, not absolute paths |
| `seed` | no | integer or `none` | only meaningful on models that honour seeds |
| `cost_usd` | yes | number or `none` | estimate per run (still + video for video prompts) |
| `scores` | yes | `{drift, runs, pass_rate}` | best 7-point drift score, number of scored runs, share of runs ≥ 6/7 |
| `outputs` | no | list of `{path, sha256}` | from the media sidecar (`output.sha256`); short hashes are fine in examples |
| `tags` | yes | list | format, setting, motion, special handling |
| `created`, `updated` | yes | `YYYY-MM-DD` | |
| `retires` | no | `YYYY-MM-DD` or `none` | the model's shutdown date; the indexer fills it from its table if missing |

\* required when `identity` isn't `none`.

## Body sections

```markdown
## First frame      (video only) the full still prompt, identity block first
## Prompt           the full prompt: identity block → wardrobe → scene → camera/light → motion (video) → audio (video)
## Negative         the negative block, or a note that the model has none (FLUX.2, Nano Banana, GPT Image)
## Notes            why it works, failure points to check, crops, costs, A/B history
```

## Versioning

| Change | Bump | Example |
|---|---|---|
| Wording that doesn't change the look (typo, clearer phrase) | patch | 1.0.0 → 1.0.1 |
| New refs, lens, light, duration, params, an added constraint line | minor | 1.0.1 → 1.1.0 |
| New identity version, different model family, new scene concept | major | 1.1.0 → 2.0.0 |

Commit message: `<id> <version>: <what changed> (<score summary>)`.

## Identity versions

- `_blocks/claudia-id-v1.md` is frozen. A new look = `_blocks/claudia-id-v2.md` with a changelog line ("v2 2027-02-01:
  streaks changed to rose-pink").
- A prompt's `identity` field and body tag must agree; the indexer warns otherwise.
- Keep v1 prompts `approved` until the series that uses them ends; then `deprecated`.

## Naming

- ids: lowercase, `.` between parts, `-` inside parts: `claudia.p3.lounge-sunglasses`, `claudia.banner.network.gpt`.
- File name = `<id>.md`. Folder = character / pillar family.
- Ref pack files: `NN-short-name.jpg` (`01-front-neutral.jpg`); companions `cat-01.jpg`. Never renamed once used.
- Media outputs keep the package's job-based names; the prompt file links them by path + sha256.

## Never in a prompt file

- API keys, tokens, signed URLs, wallet seeds, personal data.
- Real people's names or "looks like <person>"; real people's photos as refs.
- Minor-coded words outside the negative block (the indexer flags them).
- Model names in caption text meant for publishing (Claudia never names her model).
