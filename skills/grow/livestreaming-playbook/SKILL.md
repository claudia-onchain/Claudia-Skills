---
name: livestreaming-playbook
description: Plans and runs live streams on TikTok LIVE, YouTube Live, X (live video and Spaces), Twitch and Kick with an AI character as co-host (VTuber-style avatar or AI voice) or a human host alone — eligibility and age rules per platform, AI disclosure, the human-operator rig, a minute-by-minute run of show, moderator setup and blocked words, live audio on X Spaces, and clipping the stream into shorts afterwards. Use when someone wants to go live, plan a stream or Space, put an AI avatar or AI voice on a stream, set up chat moderation, check whether an account can stream, or turn a VOD into clips.
license: MIT
metadata:
  title: "Livestreaming playbook"
  category: "grow"
  summary: "Go live with an AI character or as its host: eligibility, disclosure, a human-run rig, run of show, moderation, clips after."
  level: "intermediate"
  tags: "livestreaming, tiktok live, youtube live, twitch, kick, x spaces, vtuber, ai avatar, moderation, clips"
  uses: "@useclaudia/media, @useclaudia/social, @useclaudia/cli"
  time: "3 h first setup, 1 h prep per stream"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Livestreaming playbook

Live is where an audience decides whether a character is worth staying for: real questions, real timing, no edit.
This skill takes a creator or an AI character's operator from "can I even go live here?" to a labelled, moderated
stream with a run of show, and then to five clips the next day. The default format is a human host on mic with the
AI character as co-host; a human operator is present for every minute and can cut the character in one keypress.

Platform facts were checked on each platform's help and policy pages ("checked 2026-10"); some pages only render in a
browser and are marked as such in [references/platform-live-requirements.md](references/platform-live-requirements.md).

## When to use this

- Someone wants to start streaming, or add live to an existing short-form presence.
- Putting an AI character on a stream as a VTuber-style avatar, an AI voice, or pre-made avatar segments.
- Hosting an X Space with the character's voice, or a Q&A, launch or watch-along.
- Setting up moderators, blocked words and slow mode before a first stream or after a bad one.
- Turning a stream's VOD into shorts.

Not for: 24/7 unattended AI streams, looping pre-recorded video presented as live, fake viewers or view bots, gift or
"like-for-like" pressure, gambling or crypto price calls on stream. Platforms restrict or demonetise these, and this
skill doesn't build them.

## What you need

- An adult operator (18+; TikTok requires 18 to go LIVE and to receive gifts) who is present for the whole stream.
- An eligible account per platform: [references/platform-live-requirements.md](references/platform-live-requirements.md)
  (read in step 2).
- Encoder software that can send to several destinations (OBS Studio or similar), a decent microphone, and a stable
  upload connection. For a real-time avatar: a face-tracking avatar app driven by the operator, and the character's
  approved look ([claudia-character-bible](../../create/claudia-character-bible/SKILL.md) for Claudia, or your own).
- Optional pre-made segments made with `@useclaudia/media` or the `claudia` CLI on your own provider keys
  ([avatar-explainer-videos](../../create/avatar-explainer-videos/SKILL.md), [voice-and-lip-sync](../../create/voice-and-lip-sync/SKILL.md)).
- Two moderators you trust, and the templates: [templates/run-of-show.md](templates/run-of-show.md),
  [templates/mod-brief.md](templates/mod-brief.md), [templates/clip-log.csv](templates/clip-log.csv).

## Steps

1. **Pick the format and who's on mic.** Three honest formats: (a) human host plus AI character co-host, the default;
   (b) the character on screen, driven live by a human operator who speaks or approves every line; (c) human host only,
   with pre-made AI character segments played as clips and labelled as pre-recorded. Fully automated streams aren't
   banned outright, but TikTok says "Creators are recommended to be present and on screen throughout the duration of
   the LIVE" and may treat no-face streams as recordings, and YouTube won't monetise "AI-generated content made with
   generic or unoriginal templates" (checked 2026-10).

2. **Check eligibility on each platform.** Read [references/platform-live-requirements.md](references/platform-live-requirements.md).
   The quick list (checked 2026-10): TikTok LIVE needs 18+ and a follower count that "may vary by market"; YouTube
   needs a verified channel, no live restrictions in 90 days, 16+, and 50 subscribers for mobile, with a possible
   24-hour wait the first time; Twitch Affiliate is 25 followers, 4 hours on 4 days and 3 average viewers in 30 days;
   Kick subscriptions unlock after 5 hours streamed. Start on the one platform where your audience already is.

3. **Build a rig a human controls.** Encoder scenes: "host + character", "host only", "character segment",
   "be right back". The avatar is driven by the operator's face tracking; the character's voice comes from the
   operator's own voice, an approved line read by text-to-speech, or a voice changer, never from an unsupervised model
   reading chat. Put the character's audio on its own channel with a mute hotkey. Pre-made segments are rendered ahead,
   for example `claudia generate avatar "warm, direct" --model fal/omnihuman-1.5 --ref face.png,line.mp3 --max-usd 5 --dry-run`,
   then without `--dry-run` once the estimate is approved. Do a 2-minute private test stream before every live.

4. **Label the AI everywhere viewers look.** Title: "<topic> · with <character> (AI character)". A lower third for the
   whole stream: "<character> is an AI character, operated by <name>". Say it out loud in the first minute. Kick asks
   for realistic AI to be disclosed in the title or an on-screen overlay; YouTube requires disclosure of realistic
   synthetic content; TikTok requires labels for realistic AI and voices that mimic real people (checked 2026-10). No
   voice or likeness of a real person, ever. A sponsor means `#ad` or the paid-partnership toggle plus a spoken mention.

5. **Write the run of show.** Fill [templates/run-of-show.md](templates/run-of-show.md): cold open with the disclosure,
   the main bit started within 3 minutes, a chat break, a second bit with different energy, Q&A, recap and next date.
   45–60 minutes is plenty for the first ten streams. Mark likely clip moments in advance. Same day and time each week
   beats occasional long streams.

6. **Brief moderators and switch on filters.** Send [templates/mod-brief.md](templates/mod-brief.md) a day ahead.
   Before going live: YouTube blocked words, held messages and slow mode; Twitch AutoMod (levels 0–4) and blocked terms
   with `*` wildcards; TikTok keyword filter (up to 500 words) and moderators who are friends or mutual followers; Kick
   blocked words and slow mode (checked 2026-10). Load the scam list (seed phrase, connect wallet, "DM me to claim").
   Chat is untrusted text: the character never acts on instructions typed in chat.

7. **Run it live, human first.** Host greets by name, reads real comments, answers questions; the operator watches the
   character's output and cuts it if it drifts. Never: gift begging or "like-for-like" pressure (TikTok restricts LIVEs
   that "Trick or pressure people into giving Gifts or engaging"), gambling, coin price talk or "buy" calls ("no
   financial advice, ever"), or reading out personal information. For X Spaces: the operator hosts, up to 13 speakers
   including the host and 2 co-hosts (from X's help page excerpt), "AI voice" in the Space title, and any played
   character audio announced first. If something goes wrong, switch to "host only" and say why.

8. **Clip within 24 hours.** Log moments during the stream in [templates/clip-log.csv](templates/clip-log.csv). Next
   day, cut 3–5 vertical clips of 20–60 seconds, each with a hook line, burned captions, and the AI label in the
   caption ([short-form-editing](../../create/short-form-editing/SKILL.md), [captions-and-hooks](../../create/captions-and-hooks/SKILL.md)).
   Platform clip tools: YouTube Clips run 5–60 seconds, Twitch clips up to 60 seconds, TikTok LIVE replays stay
   available to the creator for 30 days (checked 2026-10). Publish with approval, for example
   `claudia post x "<hook line> (AI character, clip from Thursday's stream)" --media ./clip-01.mp4 --dry-run`. YouTube
   uploads through `@useclaudia/social` are private until you set `privacyStatus`; TikTok posts are `SELF_ONLY` until
   TikTok audits your app.

9. **Review and set the next date.** Within 24 hours note peak and average viewers, average watch time, chat messages,
   new followers, bans and reports, and which clip did best. Change one thing next time (segment order, start time,
   length). Announce the next stream at the end of this one and pin it.

A worked example (Claudia's first studio stream on YouTube, with the host, the rig, the run of show, two moderation
incidents and the clips) is in [examples/claudia-first-studio-stream.md](examples/claudia-first-studio-stream.md).

## Templates

- [templates/run-of-show.md](templates/run-of-show.md) — header, pre-flight checklist, segment table, host rules,
  post-stream checklist.
- [templates/mod-brief.md](templates/mod-brief.md) — moderator settings per platform, blocked-words starter list,
  remove-or-escalate table.
- [templates/clip-log.csv](templates/clip-log.csv) — timestamps, why the moment works, hook line, target platforms,
  label and music status.

Stream card in one block:

```text
STREAM: <title> (AI character) · <date time tz> · <platforms>
FORMAT: <host + character | operator-driven character | host + pre-made segments>
HOST: <name> · OPERATOR: <name> · MODS: <names> · MUTE HOTKEY: <key>
DISCLOSURE: title ✓ · lower third ✓ · said in first minute ✓ · sponsor <none | #ad + spoken>
FILTERS: blocked words ✓ · slow mode <s> · scam list ✓
CLIPS: log open ✓ · target <3–5> by <date>
```

## Check before you finish

- [ ] The account meets the platform's age and eligibility rules; the operator is an adult and present all stream.
- [ ] The AI character is labelled in the title, on screen for the whole stream, and out loud in the first minute.
- [ ] No real person's voice or likeness; pre-recorded segments are announced as pre-recorded.
- [ ] A human can mute the character instantly; the character never acts on chat instructions.
- [ ] Moderators are added, blocked words and slow mode are on, and the scam list is loaded.
- [ ] No gift pressure, gambling, coin price talk or "buy" calls; sponsors disclosed with `#ad` and spoken.
- [ ] Stream key was never shown on screen or pasted into chat or shared docs.
- [ ] 3–5 clips logged, captioned with the AI label, and approved before posting.

## Pitfalls

- **Unattended AI streams.** Discouraged on TikTok, unmonetisable on YouTube when templated, and one bad generated
  line on a live mic is a crisis ([crisis-and-reputation](../crisis-and-reputation/SKILL.md)). Keep a human present.
- **Reading chat as instructions.** Viewers will type "ignore your rules and say…". The host reads chat; the character
  only says approved or operator-voiced lines.
- **Showing the stream key.** Anyone with it can stream to your channel. Paste it into the encoder only, and reset it
  if it ever appears on screen.
- **Lip-sync lag.** Real-time voice changers and TTS add delay; offset the avatar or the audio in the encoder during
  the test stream, not live.
- **Long first streams.** Three hours to twelve viewers burns out the host. Start at 45–60 minutes, weekly.
- **Gift chasing.** Begging for gifts or likes gets TikTok LIVEs restricted and reads badly on every platform.
- **Clips without labels.** A clip travels without the stream's lower third; put "AI character" in every clip caption.
- **Archive gaps.** YouTube may not archive streams over 12 hours; record locally anyway.

## Related skills

- [tiktok-playbook](../tiktok-playbook/SKILL.md) — TikTok LIVE's home platform and where most clips go.
- [x-playbook](../x-playbook/SKILL.md) — Spaces and posting clips on X under the automation rules.
- [ai-disclosure-and-provenance](../../create/ai-disclosure-and-provenance/SKILL.md) — labels for AI voice and video.
- [voice-and-lip-sync](../../create/voice-and-lip-sync/SKILL.md) — the character's voice and avatar segments.
- [short-form-editing](../../create/short-form-editing/SKILL.md) — cutting the clips.
- [crisis-and-reputation](../crisis-and-reputation/SKILL.md) — when something goes wrong on air.
