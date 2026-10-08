# Sound and music rights for trend content (checked 2026-10)

Read the first time you plan an audio trend, and before every paid, gifted, affiliate or own-product post. This is a
practical summary, not legal advice; the platform's current terms win.

## Why this matters for an AI influencer

An account like Claudia's is commercial in practice: it promotes its own platform, does brand deals and may post about
launches. The moment a post is commercial, the licence that lets everyday users dance to a chart hit usually stops
applying. Platforms scan audio, even at low volume, and mute, block or demonetise.

## Decision table

| Account type | Post type | Allowed audio |
|---|---|---|
| TikTok personal | Organic, nothing promoted | In-app sound library, including trending sounds, used through "Use this sound" / the in-app picker |
| TikTok personal | Paid, gifted, affiliate, or promoting the operator's own product/platform/launch | Commercial Music Library (CML), original audio, or audio licensed for commercial use |
| TikTok business | Any | CML, original audio, or licensed audio (business accounts are limited to the CML) |
| Instagram (any) | Branded content / paid partnership | Cleared audio only: Meta's licensed library for business, original or licensed audio |
| Instagram business | Organic | Reduced library offered to business accounts |
| YouTube Shorts | Any | Shorts audio picker, YouTube Audio Library, original audio. Claimed music can block the Short in some countries or send revenue to the rights holder |
| X | Any | Only audio you own or have licensed; X has no general music licence for uploads |

## TikTok Commercial Music Library (CML)

- Pre-cleared tracks (1M+, mostly independent artists and production music houses) licensed for commercial use on
  TikTok, in organic posts and ads.
- Mainstream chart hits and most viral trending songs are **not** in it.
- In Creative Center → Songs, tracks show whether they're approved for business use. Check there before you plan.
- A CML track is cleared **for TikTok**. Reposting the same video with that track to Reels or Shorts is not covered.

## Original audio: the safest trend move

Many trends are a *format* (a beat drop on a reveal, a voiceover pattern, a text-on-screen rhythm), not a specific
song. Recreate the format with original audio:

```sh
claudia generate music "warm lofi beat, 92 bpm, soft vinyl crackle, a clear drop at 0:03 for a reveal" --dry-run
claudia generate music "warm lofi beat, 92 bpm, soft vinyl crackle, a clear drop at 0:03 for a reveal"
```

`claudia generate` shows the model, an estimate and today's spend, and asks before spending. A person approves the
spend. Label AI-generated audio (see [ai-disclosure-and-provenance](../../../create/ai-disclosure-and-provenance/SKILL.md)), and keep the generation
record so provenance can be shown later.

Once posted on TikTok, original audio becomes a sound others can use. That is a growth asset: a named sound
("claudia — rooftop drop") that others reuse links back to her.

## Hard nos

- **No sound-alikes of real artists.** Don't prompt "in the voice of <artist>" or "like <song>, same melody". Voice
  clones of real singers and recognisable melodies are infringement and impersonation.
- **No ripping audio** from a TikTok or YouTube video and re-uploading it in an edit. Use the in-app sound.
- **No "speed it up to dodge Content ID".** That's evasion; platforms treat it as such.
- **No uncleared audio in paid posts**, even if the brand says "it's fine". The brand doesn't own the music rights.

## Brief field

Record in every brief: `audio_source: in-app personal | CML: <track> | original: <file> | licensed: <licence ref>`
and `commercial: yes | no`. If `commercial: yes` and `audio_source: in-app personal`, the brief fails.

Sources: TikTok Commercial Music Library and Creative Center (ads.tiktok.com/business/creativecenter); TikTok music
terms for business accounts; Soundstripe, "TikTok music licensing rules for creators and brands" (2026); Hello
Thematic, "Music rules on TikTok, Instagram and YouTube"; YouTube Help, "Music in YouTube Shorts" and Audio Library;
Meta Sound Collection / branded content music guidance. Checked 2026-10.
