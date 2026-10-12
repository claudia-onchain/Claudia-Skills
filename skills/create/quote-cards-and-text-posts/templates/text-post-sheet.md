# Text post / card sheet

Copy one block per post. Delete the lines that don't apply.

```text
DATE / SLOT:        <YYYY-MM-DD HH:MM tz>
PILLAR:             <pillar>
THE LINE:           <the sentence, ≤ 25 words; read it aloud once>
FORMAT DECISION:    <text post | quote card | post card | list card | text over image | video instead>
WHY NOT VIDEO:      <the idea is a sentence | timely | the words are the point | low budget | other: …>

NETWORKS:
  X (≤ 280):        <text, or text + card>
  Threads (≤ 500):  <text>
  Bluesky (≤ 300):  <text>
  LinkedIn (≤ 3000):<text, first line works alone>
  Instagram:        <card 1080x1350 + caption>
  TikTok photo:     <card 1080x1920 + description, or skip>

CARD:
  template:         <quote-card.html | post-card.html>
  canvas:           <1080x1350 | 1080x1080 | 1600x900 | 1080x1920>
  colours:          ink <hex> on bg <hex> → contrast <n>:1 (node scripts/contrast.mjs …)
  size:             <px on canvas> → <px on screen> (large/normal)
  accent word:      <one word or none>
  image:            <none | path to generated texture/photo + its .json sidecar>

ALT TEXT:           <full card text, word for word, + attribution; "AI-generated image:" first if there is a picture>

SOURCES:            <if the line quotes or cites anyone: exact words, link, permission yes/no>
LABELS:             ai=<true> · ad=<true if paid/gifted/affiliate> · nfa=<true if a coin, price or contract is mentioned>
APPROVED BY:        <name>
```

## Quick checks

- [ ] The line is true, and in the character's voice.
- [ ] Nothing on the card pretends to be another app's interface or another person's post.
- [ ] Contrast ≥ 4.5:1 for normal text (≥ 3:1 for large), checked with the script.
- [ ] Alt text holds the full text.
- [ ] No invented numbers (likes, followers, results).
