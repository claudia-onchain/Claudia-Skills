# Motion brief: <series> · <episode or post name>

Fill this in before you animate anything. One row per text element. Times come from `scripts/beat-grid.mjs`.

## Project

| Field | Value |
|---|---|
| Clip | `<work/clip.mp4>` · <length> s · 1080×1920 · <fps> fps |
| Music | `<track file>` · <BPM> BPM · first downbeat at <offset> s (in the edited clip) · licence: <source / log row> |
| Route | <A: HTML layer + animate-layer.sh · B: ASS · C: drawtext · D: editor name> |
| Fonts | <Barlow Condensed 800 / DM Sans 700 / DM Mono 500, or the character's own licensed fonts> |
| Accent | <#hex — one accent colour only> |
| AI visuals? | <yes/no> → on-screen tag `<AI-GENERATED>` and platform AI label |

## Beat grid (paste the first bars)

```text
<output of: node scripts/beat-grid.mjs --bpm <bpm> --offset <s> --beats 16>
```

## Elements

| # | Element | Text (exact) | Words | In (beat → s) | Out (beat → s) | Position | Move | Ease | Notes |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Series label | `<ep. 00 · series>` | <n> | <b> → <s> | <b> → <s> | y=<px> | <fade / up 60> | <0.3> | <> |
| 2 | Title card | `<1–5 words, one accent word>` | <n> | <b> → <s> | <b> → <s> | y=<px> | <up 80> | <0.35> | arrival on a downbeat |
| 3 | Word slams | `<WORD|WORD|TWO WORDS>` | <n> | <b> → <s> | <b> → <s> | y=<px> | pop 125→100 | 0.12 | every <1/2> beats |
| 4 | Lower third | `<Name>` / `<role>` | <n> | <b> → <s> | <b> → <s> | top y=<px>, x=<px> | left 120 | 0.35 | 3–6 s on screen |
| 5 | AI tag | `AI-GENERATED` | 1 | 0 | end | top right | none | — | whole clip if visuals are AI |
| 6 | End card | `<series name / soft question>` | <n> | <b> → <s> | end | centre | fade | 0.4 | last downbeat |

## Checks

- [ ] Every text inside the centred ~900×1400 area; nothing right of x = 960 or below y = 1500.
- [ ] Each element readable: ≥ 0.45 s per word, ≤ 3 words per second for lines.
- [ ] Only one element moves at a time; arrivals land on beats.
- [ ] One accent colour, one display font, one text font.
- [ ] Spelling checked against the script; names and handles exact.
- [ ] No price, return or "buy" wording; no other brand's logo or font look-alike.
- [ ] AI tag on screen (if AI visuals) and platform AI label set at upload.
- [ ] Exported to the master spec and viewed on a phone under the app UI.
- Approved by: <name> · <date>
