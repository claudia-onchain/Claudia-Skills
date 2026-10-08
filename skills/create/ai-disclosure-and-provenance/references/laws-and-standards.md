# Laws and provenance standards (checked 2026-10)

Read this when someone asks "is labelling legally required?", when publishing to EU/California/China audiences, or when
you need to explain C2PA and SynthID. This is orientation, not legal advice.

## EU AI Act — Article 50 transparency (applies from 2026-08-02)

| Paragraph | Who | Duty |
|---|---|---|
| 50(1) | providers of systems that interact with people (chatbots, agents) | tell people they're interacting with AI |
| 50(2) | **providers** of generative systems | mark synthetic audio, image, video and text in a machine-readable, detectable way (watermarks/metadata). The Digital Omnibus gives systems already on the market before 2026-08-02 until **2026-12-02** to comply |
| 50(4) | **deployers** (anyone publishing) | clearly disclose **deepfakes** — content that resembles real people, objects, places or events and would falsely appear authentic. Audience-based test; no intent to deceive needed. No extension |

- Artistic, creative, satirical or fictional works get a lighter duty (disclose in a way that doesn't spoil the work) —
  this carve-out is in the Act's text; check the final Commission guidelines.
- The Commission has draft Article 50 guidelines and a Code of Practice on marking and labelling.
- What it means for Claudia: she's a photoreal person who could be taken as real → treat every post as a disclosed
  synthetic work. Agent replies in her voice: the account-level "AI" disclosure + "I'm an AI character" when asked
  covers 50(1).
- Sources: Baker McKenzie "New EU guidance on AI transparency" (connectontech.bakermckenzie.com) · secureprivacy.ai
  Article 50 overview.

## California — SB 942 AI Transparency Act (+ AB 853)

- Operative **2026-08-02** (moved from 2026-01-01 by AB 853, signed 2025-10-13).
- Covered GenAI providers (1M+ monthly users in California) must offer a no-cost detection tool, an optional visible
  ("manifest") disclosure and a mandatory latent (embedded) disclosure in outputs.
- AB 853 adds duties for large online platforms from 2027-01-01 (surface provenance data) and for capture-device makers
  from 2028-01-01.
- For creators: you're not the "covered provider", but don't strip latent disclosures — platforms will be required to
  read them.
- Sources: infobytes.orrick.com (2025-10-17) · cooley.com "State AI laws: where are they now" (2026-04-24).

## China — CAC labelling measures + GB 45438-2025 (since 2025-09-01)

- Explicit labels (visible text/audio cues) **and** implicit labels (metadata) on AI-generated content; labels must
  survive download/export; platforms must detect and label.
- If you distribute in China (Douyin, Xiaohongshu, Bilibili), use the platform's AI label and keep metadata intact.
- Source: loeb.com (2025-03) "China's AI labeling measures and mandatory national standards take effect September 1".

## Other rules that touch AI-influencer posts

- **Advertising disclosure** (FTC in the US, ASA/CMA in the UK, EU UCPD): paid/gifted/affiliate = clear `#ad` at the
  start, not hidden. AI characters aren't exempt.
- **UK crypto promotions** (FCA since 2023-10): financial promotion rules, risk warning, 24-hour cooling-off for
  first-time investors. Agent accounts should not invite UK users to buy a coin.
- **EU MiCA** (since 2024-12-30): crypto marketing must be fair, clear, not misleading, consistent with the white paper,
  clearly marked as marketing.

## C2PA Content Credentials

- An open standard: a cryptographically signed manifest (JUMBF box) inside the file recording origin (e.g. "created by
  an AI model"), edits ("actions"), ingredients (source files) and the signer's certificate.
- Embedded by: OpenAI images (ChatGPT, API), Adobe Firefly and Adobe apps on export, Google Nano Banana Pro/2 images in
  Gemini, Vertex AI and Ads, many camera makers.
- Inspect: `c2patool <file>` (`--detailed`, `--certs`) from opensource.contentauthenticity.org · web verifier at
  contentcredentials.org/verify (verify.contentauthenticity.org) · c2paviewer.com.
- Fragile: re-encoding, screenshots and tools without C2PA support drop it. Facebook, Instagram, X and WhatsApp strip it
  on upload (often after reading it). **Durable Content Credentials** pair the manifest with an invisible watermark and a
  fingerprint pointing to a cloud copy, so it can be recovered after stripping.
- OpenAI offers a provenance check endpoint (`POST /v1/content_provenance_checks`) for its own outputs.

## Google SynthID

- Invisible watermark Google embeds in images (Nano Banana/Gemini), video (Veo, Gemini Omni), audio (Lyria, and Google's
  TTS where stated) and text. Designed to survive common transformations (crop, resize, compression, mild filters).
- Check: **SynthID Detector** portal (announced I/O 2025; highlights watermarked regions) and the Gemini app ("Was this
  made with Google AI?"). It detects Google's SynthID only — absence proves nothing about other vendors.
- `@useclaudia/media` records `watermark: "SynthID"` in sidecars for Google outputs.

## Keeping provenance through an edit

1. Keep every source file's sidecar (`jobId`, model, prompt, cost, watermark, time).
2. Note the edit project and the tools used (CapCut, Resolve, Premiere) — most strip C2PA on export.
3. Hash the export (`shasum -a 256 final.mp4`) and log it with the source job ids.
4. If your editor can sign Content Credentials on export, do it; otherwise the log is your provenance.
5. Post from your own export, not a re-download from another platform.
