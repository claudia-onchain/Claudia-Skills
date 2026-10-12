# Example: a 28-second Claudia short in Spanish and Brazilian Portuguese

The source: Claudia's talking-to-camera short "the 3am post" (28 s, 9:16), her designed ElevenLabs voice, lip-synced
from a silent talking clip with `fal/lipsync-2`. Analytics for the last 90 days: 11% of views from Mexico, Argentina
and Colombia, 7% from Brazil. Her operator picks Latin American Spanish (`es-419`) and Brazilian Portuguese (`pt-BR`),
with two fluent reviewers (Lucía and Rafael). All figures are from this example.

## Step 2: glossary (excerpt)

| Source | es-419 | pt-BR | Rule |
|---|---|---|---|
| Claudia | Claudia | Claudia | never translated |
| my agents | mis agentes | meus agentes | fixed |
| useclaudia.xyz | — | — | on screen only |
| tone | `tú`, informal | `você`, informal | short lines, dry |

## Step 3: the line that had to change

Source: "storytime. my agent scheduled a post for three a m… and it did numbers."

| | Literal draft | Reviewer note | Final |
|---|---|---|---|
| es-419 | "…y hizo números." | "'hizo números' means doing arithmetic here, the joke dies" | "storytime. mi agente programó un post para las tres de la mañana… y la rompió." |
| pt-BR | "…e fez números." | "same problem; 'bombou' is how people say it went viral" | "storytime. meu agente agendou um post pras três da manhã… e bombou." |

"storytime" stays in English: both reviewers said it is common on Spanish- and Portuguese-language TikTok and fits her
voice. On-screen hook text was translated too: `my agent > me` became `mi agente > yo` and `meu agente > eu`.

## Step 4: voice

Claudia's voice is a designed voice, not a clone of anyone, so no consent record is needed. Same voice id, same
settings, `elevenlabs/multilingual-v2` (Spanish and Portuguese are both in its 29 languages, checked 2026-10).

## Step 5: generate and fit

```sh
claudia generate speech "storytime. mi agente programó un post para las tres de la mañana… y la rompió." \
  --model elevenlabs/multilingual-v2 --voice <her voice id> --max-usd 0.05
```

| Line | Slot | es-419 | pt-BR | Fix |
|---|---|---|---|---|
| L01 | 4.2 s | 4.6 s | 4.4 s | es: dropped "un" → "programó post" sounded wrong, so atempo 1.08 instead; pt: atempo 1.05 |
| L02 | 3.1 s | 3.0 s | 3.3 s | pt: "pras" instead of "para as", now 3.1 s |
| L03 | 5.0 s | 5.9 s | 5.6 s | both rewritten shorter; no speed change |

Mix on the original music-and-effects stem; -14 LUFS, -1 dBTP.

## Step 6: lips

The short is on camera the whole time, so each language got its own lip-sync pass on the original silent talking clip:

```sh
claudia generate avatar "lip-sync" --model fal/lipsync-2 --ref out/3am-silent.mp4,out/es/3am-es.wav --max-usd 2
```

28 s at $3.00/min = $1.40 per language. QA at 0.5×: the Portuguese "bombou" needed the b to close; it did on the
first pass. Spanish passed after one re-run (a mouth flutter in a pause, fixed by trimming the pause).

## Step 7: subtitles

Burned word-by-word captions in each language, timed to the dubbed audio, centred at y = 1180.

## Step 8: publishing

- **YouTube:** the original Short stays; Spanish and Portuguese dubs uploaded as audio tracks in Studio → Languages
  (the channel has Advanced features). The existing Portuguese auto-dub was deleted first. Translated titles added.
- **Instagram:** Meta AI translations would also cover Spanish and Portuguese, but would clone her synthetic voice
  differently from her series voice; the operator kept the original Reel without Meta translation and posted the
  Spanish version as its own Reel three days later.
- **TikTok:** separate posts, 3 and 5 days after the original, captions in each language, AIGC on.

```ts
social.draft({
  text: "storytime: mi agente programó un post para las 3am… y la rompió. ¿dejarías que el tuyo publique solo?",
  media: [{ path: "./out/es/3am-es-final.mp4", alt: "Video generado con IA: Claudia habla a cámara en su estudio blanco." }],
  targets: [{ account: tiktok.id }],
  labels: { ai: true },
});
```

## Step 9: after a week

| Version | Views | Follows | Note |
|---|---|---|---|
| Original (en) | 52,000 | 410 | |
| TikTok es-419 | 23,500 | 260 | comments asked for more in Spanish |
| TikTok pt-BR | 9,800 | 95 | reviewer: the hook text was too long on screen |
| YouTube audio tracks | es 1,900 plays, pt 700 plays | — | small, but at a near-zero extra cost per video |

Spend: voice $0.04, lip-sync $4.20 (three runs). Decision: Spanish for every talking short from now on; Portuguese
only for the best performer each week.
