# Worked example: migrating video prompts off Veo 3.1 before 2026-10-22

Google shuts down the Veo 3.1 previews (`google/veo-3.1`, `-fast`, `-lite`) on **2026-10-22**; the replacement is Gemini
Omni Flash (`google/omni-flash`, model `gemini-omni-1.1-flash`, GA 2026-08-27 — checked 2026-10). On 2026-10-08 the
agent ran the indexer over the library.

## 1. Find affected prompts

```text
$ node scripts/index-prompts.mjs prompts --warn-days 45 > index.csv
! prompts/claudia/p1-bedroom/claudia.p1.room-vlog.veo.md: google/veo-3.1-fast retires 2026-10-22 (in 14 days) — make a variant on its replacement
! prompts/claudia/p2-club/claudia.p2.dj-booth.veo.md: google/veo-3.1-fast retires 2026-10-22 (in 14 days) — make a variant on its replacement
! prompts/claudia/p4-city/claudia.p4.rain-selfie.veo.md: google/veo-3.1 retires 2026-10-22 (in 14 days) — make a variant on its replacement
! prompts/claudia/banners/claudia.banner.network-loop.veo.md: google/veo-3.1-lite retires 2026-10-22 (in 14 days) — make a variant on its replacement
42 prompt(s) indexed · 4 warning(s)
```

## 2. What changes between Veo and Omni prompts

| Veo 3.1 habit | Omni Flash equivalent |
|---|---|
| `durationSec: 8` fixed (4/6/8 s) | the model picks 3–10 s; write the length and timed beats in the prompt |
| `meta.refMode: "reference"` with up to 3 asset refs | refs tagged in the prompt as `<IMAGE_REF_0>`…; give each one job ("<IMAGE_REF_0> is her face") |
| first frame via `refs[0]` | through `@useclaudia/media` still `refs[0]` (sent as the first frame); in Google's own prompt syntax `<FIRST_FRAME>` / `<LAST_FRAME>` |
| audio: dialogue in quotes, `SFX:`, `Ambient noise:` lines | same idea; ask for "no music, just room tone" explicitly or Omni may add music |
| re-run on drift | re-anchor: "keep all character details exactly as in <IMAGE_REF_0>" — identity drifts after ~4 conversational edits |

## 3. Migrate one: `claudia.p1.room-vlog.veo` 1.2.0 → `claudia.p1.room-vlog` 2.0.0

Before (Veo):

```text
Handheld front-camera selfie vlog. The woman from the reference images talks to camera in her bedroom and laughs. 8 seconds.
Ambient noise: quiet room tone.
```

After (Omni): the timed version now in `examples/library/claudia.p1.room-vlog.md` — beats `[0-3s] [3-6s] [6-10s]`, the
re-anchor line, "Natural room tone only, no music." Major version because the model family changed.

## 4. Re-score

| Prompt | Veo pass rate | Omni runs | Omni pass rate | Decision |
|---|---|---|---|---|
| room-vlog | 0.75 | 4 | 0.75 | approved 2.0.0 |
| dj-booth | 0.60 | 3 | 0.33 | kept on `fal/kling-2.6-pro` instead (already approved there) |
| rain-selfie | 0.67 | 3 | 0.67 | approved, but Kling 3 Pro variant stays primary (0.8) |
| network-loop | 0.80 | 3 | 1.00 | approved 2.0.0 |

Cost of the migration: 13 runs ≈ $12.40 (Omni ~$0.10/s estimate).

## 5. Retire the old files

```sh
sed -i '' 's/^status: approved/status: deprecated/' prompts/claudia/*/*.veo.md   # now
# after 2026-10-22:
git mv prompts/claudia/p1-bedroom/claudia.p1.room-vlog.veo.md prompts/_retired/
```

The `.veo` files stay in `_retired/` so the outputs they produced still point at the text that made them.
