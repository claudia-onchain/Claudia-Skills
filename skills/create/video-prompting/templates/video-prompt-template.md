# Video prompt template (six slots)

Fill the slots, then wrap them in the model's syntax below. Keep the brackets out of the final prompt.

```text
SHOT ID:        <series>-<ep>-<shot>            e.g. lounge-01-s1
MODEL:          <package id>                     e.g. fal/kling-3-pro
FIRST FRAME:    <path to approved 9:16 still>    LAST FRAME (optional): <path>
DURATION:       <s, valid for the model>         ASPECT: 9:16   RESOLUTION: 720p|1080p
AUDIO:          native | silent (meta.audio=false) | added in edit

1 IDENTITY  Same woman as the first frame: Claudia, 28-year-old woman (adult), glossy black jaw-length bob, heavy straight
            bangs with copper-orange streak panels, small orange hair clip, thin gold hoops, light freckles, warm brown eyes.
            Her face, bob, copper bang streaks and orange clip stay identical throughout.
2 ACTION    0–<a>s: <verb + detail>. <a>–<b>s: <verb + detail>. <b>–<end>s: <verb + detail>.
3 SCENE     <setting string from the bible>
4 CAMERA    <framing>, <camera height>, <ONE move>
5 LIGHT     <source, colour>, <grade/texture>
6 AUDIO     <"line" or no dialogue>; SFX: <…>; Ambient: <…>; no music
NEGATIVE    (Kling/Wan only) teenager, childlike face, extra fingers, warped hands, morphing face, flicker, extra hair streaks, text, logo
```

## Wrappers

**Kling 3 / Kling 2.6 / Wan 2.6 / Runway Gen-4.5** — plain prose in slot order, beats as "0–3s: …".

**Gemini Omni Flash**

```text
An <N>-second vertical clip. <FIRST_FRAME> shows Claudia; keep all character details exactly as in the first frame.
[0-<a>s] <action + camera>
[<a>-<b>s] <action + camera>
[<b>-<N>s] <action + camera>
Scene: <slot 3>. Light: <slot 5>.
Audio: <slot 6>. No music.
```

**Veo 3.1 (until 2026-10-22)**

```text
[00:00-00:0a] <framing + camera>. <slot 1 short>, <action>. <scene>.
[00:0a-00:0b] <action>, <camera>.
[00:0b-00:08] <action>.
Claudia says: "<line>"            (omit if silent)
SFX: <…>
Ambient noise: <…>
No music.
```

**Seedance 2.0** (only with an ingested `asset://` character or when her face is not the subject)

```text
@Image1 is Claudia. Seconds 1-5: <action>. Seconds 6-10: <action>. <scene>. <one camera move>. "<short line>". No music.
```

**Hailuo 2.3** (40–70 words, silent)

```text
<Claudia short ID> <single sentence of action>. <camera>. <light>.
```

## Command

```sh
claudia generate video "<final prompt>" --model <id> --ref <first>[,<last>] --aspect 9:16 --duration <s> \
  [--resolution 720p] [--negative "<…>"] --dry-run
claudia generate video "<final prompt>" --model <id> --ref <first>[,<last>] --aspect 9:16 --duration <s> --max-usd <cap>
```
