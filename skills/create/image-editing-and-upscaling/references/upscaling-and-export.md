# Upscaling and export

Read this in step 7, before making an image bigger or exporting it for a platform.

## How big does it need to be?

Work out the destination first; most social uses need far fewer pixels than people think.

| Destination | Pixels needed | Usual source is enough? |
|---|---|---|
| X / Instagram / TikTok avatar | 400–1080 square | Yes, a 1K image is plenty |
| Avatar master for every platform | 2048 square | Upscale a 1K once |
| X header | 1500×500 | Outpaint a 16:9 2K, then crop |
| YouTube channel art | 2560×1440 | Re-render at 2K/4K or upscale 2x |
| Instagram feed portrait | 1080×1350 | Yes |
| 9:16 cover | 1080×1920 | Yes at 2K |
| A4 print at 300 dpi | 2480×3508 | Upscale 2–4x, check at 100% |

Specs per platform: [banner-and-collage-design](../../banner-and-collage-design/SKILL.md) and
[pfp-and-avatar-sets](../../pfp-and-avatar-sets/SKILL.md).

## Route 1: local upscaler (pixels only)

A local super-resolution model sharpens and enlarges without inventing new objects. No provider account is involved
and nothing leaves the machine.

- **Real-ESRGAN ncnn** (BSD-3-Clause, github.com/xinntao/Real-ESRGAN): portable binaries for macOS, Windows and Linux.

  ```sh
  realesrgan-ncnn-vulkan -i in.png -o out-4x.png -n realesrgan-x4plus           # photos and renders
  realesrgan-ncnn-vulkan -i in.png -o out-4x.png -n realesrgan-x4plus-anime     # flat illustration, stickers
  ffmpeg -i out-4x.png -vf "scale=2048:2048:flags=lanczos" master-2048.png       # exact final size
  ```

- **Upscayl**: a desktop app that wraps the same family of models, for people who prefer a window to a terminal.

Watch for: waxy skin, over-sharpened hair edges, halo lines around high-contrast edges. If faces go waxy, upscale 2x
instead of 4x, or blend the upscale with a lanczos-resized copy in an editor.

## Route 2: re-render at 4K

```sh
claudia generate image "Reproduce image 1 exactly at higher resolution. Same face, freckles, hair, outfit, pose, \
background, light and grain. Do not add, remove or restyle anything." \
  --model google/nano-banana-2.1 --ref ./final-1k.png --aspect 1:1 --resolution 4K --max-usd 0.15
```

$0.113 per 4K image on Nano Banana 2.1 (checked 2026-10). This is a new generation: it adds real detail but can change
small things. Compare side by side at 100%: eyes, freckle pattern, the streak, hands, any lettering. Reject it if
identity moved.

## Route 3: regenerate larger

If you are still choosing the composition, generate at 2K or 4K from the start (`--resolution 2K`). Upscaling a 1K
draft you then edit three times costs more drift than starting bigger.

## Downscaling and export

- Downscale with lanczos: `ffmpeg -i master.png -vf "scale=400:400:flags=lanczos" avatar-x-400.jpg`.
- JPEG for photos (`-q:v 3`, about 90% quality), PNG for flat art and anything with transparency.
- Keep sRGB. Name files `<asset>-<platform>-<WxH>.<ext>`.
- Check the file-size cap for the destination (X avatar 2 MB; a coin image through `claudia launch` 4 MB).

## What happens to provenance

| Step | C2PA (OpenAI images) | SynthID (Google) | Sidecar |
|---|---|---|---|
| Edit through `@useclaudia/media` | New manifest on the new OpenAI output | New watermark on the new Google output | New sidecar for the new job |
| ffmpeg crop / pad / scale / overlay | Dropped | Built to survive common edits; not guaranteed | None; log it |
| Local upscaler | Dropped | Not guaranteed after heavy resampling | None; log it |
| Platform upload | Several platforms strip it | Survives in many cases | — |

So the edit log is the provenance that always survives. Inspect what is left with `c2patool <file>`; check Google
outputs with Google's SynthID tools. Details: [ai-disclosure-and-provenance](../../ai-disclosure-and-provenance/SKILL.md).
