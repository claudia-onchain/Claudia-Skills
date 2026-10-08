# Worked example: the rain selfie, labelled on five networks

Asset: `final/w42-rain-ep1.mp4` — 12 s, 9:16, made from a Nano Banana 2.1 still (SynthID) animated with Kling 3 Pro,
edited in CapCut, captions burned in. Caption: "rain check? never heard of her".

## 1. Provenance before posting

```sh
shasum -a 256 final/w42-rain-ep1.mp4
# 4f1c…e90a  final/w42-rain-ep1.mp4
c2patool final/w42-rain-ep1.mp4
# Error: No claim found   ← expected: the CapCut export has no Content Credentials
```

Logged in `provenance-log.csv`: source jobs `mj_7Q…a3` (still, watermark SynthID) and `mj_8B…b2` (video, no watermark
recorded) → CapCut → export hash `4f1c…e90a`. Sidecars copied into `final/w42-rain-ep1.sources/`.

## 2. Draft and preview

```ts
const post = social.draft({
  text: "rain check? never heard of her",
  media: ["final/w42-rain-ep1.mp4"],
  targets: [
    { account: "tiktok-main" },
    { account: "ig-main" },
    { account: "yt-main", text: "rain check? never heard of her" },
    { account: "x-main" },
    { account: "tg-channel" },
  ],
  options: { youtube: { title: "rain check? never heard of her", shorts: true, privacyStatus: "public" } },
});
console.table(social.preview(post.id).map((r) => ({ network: r.network, labels: r.labelsAdded.join(" · "), warnings: r.warnings.join(" · ") })));
```

```text
network    labels                                   warnings
tiktok     is_aigc                                  —
instagram  is_ai_generated                          —
youtube    containsSyntheticMedia                   —
x          made_with_ai                             Account needs the Automated label (Settings → Account information → Automation)
telegram   text: (AI-generated)                     —
```

The X warning was already handled (the label is on), so the agent noted it and moved on. No NFA: no coin mentioned.
No `#ad`: nothing paid.

## 3. What the audience sees

- TikTok: "AI-generated" tag under the username.
- Instagram: "AI info" under the handle.
- YouTube: "Altered or synthetic content" in the expanded description (shown on the player for sensitive topics).
- X: the post's AI marker plus the account's "Automated" badge.
- Telegram: "rain check? never heard of her\n\n(AI-generated)".

## 4. A comment asks "is she real?"

Reply drafted in her voice and approved: "nope, AI character! all of me. the label's right there 🖤"

## 5. One week later

Instagram had also added its own "AI info" label to a separate carousel made with a Nano Banana Pro still that carried
C2PA — expected; it matches what we declared. Nothing to fix.
