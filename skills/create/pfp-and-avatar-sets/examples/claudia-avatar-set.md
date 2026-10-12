# Worked example: Claudia's avatar set, v3

**Problem.** An audit found four different Claudia avatars live: a silver-foil half-body on X, an old v1 crop on
TikTok (pre-v2 look, no headset mic), a club shot on Instagram, and a 400 px upload stretched blurry on YouTube.
People asked in replies whether the TikTok account was really her.

## Brief (excerpt)

```yaml
identity:
  name: "Claudia"
  type: "character"
  anchor: "her face, head and shoulders: bob, peach streak in the bangs, star clip, headset mic, freckles"
  never: "v1 look, monogram, text, gold, real-person likeness, badge look-alikes"
design:
  crop: "head and shoulders, face fills ~65% of the circle, eyes ~40% from the top"
  backdrop: "pale grey-white paper (white studio)"
  accent: "peach streak as the colour pop; rose #ff6fa5 only for the launch-day ring"
  style: "photo"
locked: ["face", "crop and eye line", "all five anchors", "photo style"]
allowed_to_change: ["backdrop from her worlds", "one wardrobe look", "thin rose ring for launch days"]
```

## Master

Four candidates from the master prompt (the v2 identity block, Signature top, white studio, 85mm), Nano Banana 2.1 at
2K: about $0.20 in total (checked 2026-10).

| Candidate | 48 px circle | 32 px circle | Notes |
|---|---|---|---|
| A | streak and bob read | still reads | mic thin but visible; chosen |
| B | reads | face too small | camera too far back |
| C | reads | reads | looked about 19; rejected on age |
| D | streak lost | lost | head turned, streak behind the bangs |

Candidate A had a second faint orange strand. One Sunburst edit ("Change only: remove every orange strand except the
one peach-orange panel in the front bangs"), about $0.013, then a local 2x upscale to 2048. Saved as
`claudia-primary-v3-master-2048.png` with the edit log.

## Exports

```sh
sh scripts/export-avatars.sh claudia-primary-v3-master-2048.png claudia-primary-v3 ./avatars
```

```text
ok    X avatar: claudia-primary-v3-x-400.jpg 41210 bytes
ok    Bluesky avatar: claudia-primary-v3-bluesky-1000.jpg 172880 bytes
ok    claudia launch --image: claudia-primary-v3-square-1000.png 1311640 bytes
ok    general 1080 upload: claudia-primary-v3-1080.jpg 236404 bytes
```

## Variants planned

| Variant | Change only | Live | Platforms |
|---|---|---|---|
| `claudia-club-v1` | silver quilted puffer, near-black backdrop with a spotlight glow | Club Diaries week, 7 days | X, Instagram, TikTok |
| `claudia-launch-v1` | thin rose ring at the edge | 48 h around a platform launch | X, Telegram |

Each variant is an edit of the v3 master, so the face and crop stay the same (score each variant against the master anyway). After the end date the register
says to switch back, and the agent's weekly ops check flags any platform still on a variant past `live_until`.

## Register (first rows)

```csv
platform,handle,file_uploaded,version,variant_of,live_from,live_until,sha256,uploaded_by,approved_by,checked_on_phone
x,@claudia_onchain,claudia-primary-v3-x-400.jpg,v3,primary,2026-10-12,open,<sha256>,operator,owner,yes
tiktok,@claudia_onchain,claudia-primary-v3-1080.jpg,v3,primary,2026-10-12,open,<sha256>,operator,owner,yes
youtube,@claudia_onchain,claudia-primary-v3-youtube-800.jpg,v3,primary,2026-10-12,open,<sha256>,operator,owner,yes
```

## Disclosure

Bios kept their line 2, "AI character · run by a small team". Alt text where the platform offers it:
`AI-generated image: Claudia, head and shoulders, black bob with a peach streak in the bangs, star clip and a thin
headset mic, on a pale grey backdrop.`

## Result

One face, one crop, one version on nine platforms, and a dated plan for every variant. Next audit: January.
