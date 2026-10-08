# UGC realism cues — what reads as "filmed" vs "rendered"

Read when a clip looks like an ad or a render. Each row: the tell, why it happens, and the words that fix it.

## Camera

| Rendered tell | Why | Prompt fix |
|---|---|---|
| Perfectly smooth glide | models default to gimbal/dolly motion | "handheld phone, subtle natural handshake, the camera moves with her arm" |
| Long-lens compression, creamy bokeh | portrait-lens training bias | "24mm phone front camera, deep focus, background mostly sharp" |
| Subject dead centre all clip | composition bias | "she drifts slightly off-centre as she moves" |
| No exposure change | — | "slight auto-exposure breathing as she turns toward the window" |
| Too much shake | overcorrection ("shaky cam") | never say shaky; say "subtle" |

## Light

| Rendered tell | Prompt fix |
|---|---|
| Three-point studio light in a bedroom | name the real source: "overcast window light from the right, no other lights" |
| Rim light outdoors at noon | "flat overcast daylight" |
| Glowing skin | "natural skin texture with visible pores, a little shine on the nose" |
| Teal-orange grade | "true-to-life colours, slightly muted, phone camera processing" |

## Performance

| Rendered tell | Prompt fix |
|---|---|
| Model-like posing | "she isn't posing; she's talking to a friend through the phone" |
| Constant eye contact | "glances away to think, then back to the lens" |
| Smile frozen | "laughs, then her face relaxes, then a half-smile" |
| Hands gesturing like a presenter | "one hand holds the phone; the other stays mostly out of frame" |

## Sound (native-audio models)

- Name the room: "small bedroom room tone, faint fridge hum", "rain on concrete and a distant truck reversing".
- Speech: short, casual, one sentence; quotes; tone in parentheses on Kling (`Claudia (amused, warm, English): "…"`).
- "No music" — always, unless the music is diegetic (club speakers).

## Sensor and phone artefacts (pick one, sparingly)

- "slight sensor noise in the shadows", "a raindrop on the lens edge", "a brief focus hunt as she leans in",
  "mild rolling-shutter wobble on a fast spin". More than one starts to look like a filter.

## Things that must stay fake-proof

Realism is about the *look*, never about deceiving people about what it is:

- No fake platform UI, timestamps, follower counts, "live" badges, notifications or chat overlays.
- No fake receipts, reviews, testimonials or "real customer" framing.
- No real people's faces (background extras blurred), no real private locations.
- Every post carries the platform's AI label; Claudia's bio says "AI-generated character".
