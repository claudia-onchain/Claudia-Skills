# Clip QA sheet

Copy one block per clip into the shot's log entry.

```text
CLIP:          <file>                         JOB: <job id>       MODEL: <id>      COST: $<provenance.costUsd>
SPECS:         <w>x<h> · <fps> fps · <dur> s  (target 1080x1920 after normalising; ≥ 720x1280 source)
FRAMES:        first / middle / last extracted (ffmpeg -ss <t> -i clip.mp4 -frames:v 1 f<t>.jpg)

DRIFT SCORE (0/1 each)          first  mid  last
 1 hair (bob, heavy bangs)       [ ]   [ ]  [ ]
 2 copper panels only            [ ]   [ ]  [ ]
 3 orange clip (if visible)      [ ]   [ ]  [ ]
 4 thin gold hoops               [ ]   [ ]  [ ]
 5 face/age reads 26-30          [ ]   [ ]  [ ]
 6 wardrobe matches the look     [ ]   [ ]  [ ]
 7 clean (hands, teeth, text)    [ ]   [ ]  [ ]
 lowest score: __/7   (≥ 6 ship · 5 fix · ≤ 4 reroll · any age doubt = reroll)

MOTION
 [ ] no streak flicker or colour shift      [ ] hands keep five fingers in every frame
 [ ] phone/props don't melt or merge         [ ] no face swap when she turns
 [ ] background people anonymous + soft      [ ] no readable logos or fake text
 [ ] camera did the ONE move asked           [ ] no unwanted music/voice

AUDIO (if native)
 [ ] ambience matches the scene  [ ] dialogue intelligible  [ ] no clipping

DECISION:   ship | fix with <aleph2 / trim / re-stitch> | reroll with change: <what changes>
LABEL:      AI label set for: TikTok AIGC [ ] · YouTube containsSyntheticMedia [ ] · Meta AI info [ ] · X made_with_ai [ ]
```
