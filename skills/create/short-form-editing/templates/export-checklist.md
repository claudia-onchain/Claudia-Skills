# Export checklist — <series>-<episode>

Fill one per short. An agent ticks the technical rows; a person ticks the approval row.

## Picture
- [ ] 1080×1920, yuv420p, one frame rate (24 / 30): `ffprobe -v error -show_entries stream=width,height,r_frame_rate,pix_fmt -of compact master.mp4`
- [ ] No settling frames at the start; no morph/freeze at the end (checked frame sheet R1)
- [ ] Every shot ≥ 6/7 on the drift check; no age doubt; hands, teeth, eyes clean
- [ ] No readable third-party logos or garbled text (blurred with R12 or cut)
- [ ] Grade matches across shots (skin tone consistent, no green neon)

## Sound
- [ ] Ambience bed under every shot (no dead silence between clips)
- [ ] Music ducked under speech (R8); speech intelligible on a phone speaker
- [ ] Integrated loudness ≈ -14 LUFS, true peak ≤ -1 dBTP (`ebur128=peak=true`)
- [ ] Music/SFX licence recorded: source, licence type, account type it's cleared for: ______________________

## Text
- [ ] Captions inside the centred ~900×1400 safe area; nothing in the bottom ~320 px or right ~120 px
- [ ] Fonts licensed for commercial use (Barlow Condensed, DM Sans, DM Mono are SIL OFL)
- [ ] Spelling checked; no price/return promises; coin mentions carry "not financial advice"

## Files
- [ ] `<name>-vertical.mp4` (TikTok / Reels / Shorts)
- [ ] `<name>-x.mp4` (≤ 140 s, ≤ 512 MB)
- [ ] `<name>-sq.mp4` (1:1 face crop, silent) and `<name>-poster.jpg`
- [ ] Provenance sidecars copied; edit note added

## Disclosure and approval
- [ ] AI label set per platform at upload (TikTok AIGC, YouTube altered/synthetic, Meta AI info, X made-with-AI where offered)
- [ ] `#ad` present if paid or gifted
- [ ] Approved by: ____________  on: ____________
