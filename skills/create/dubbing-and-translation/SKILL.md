---
name: dubbing-and-translation
description: Makes multilingual versions of shorts, explainers and voice-overs — picking languages from audience data, a glossary and cultural check before translating, voice-cloning consent, dubbed audio in the same character voice with @useclaudia/media, lip-sync or cut-around for on-camera speech, subtitles per language, and each platform's own language features (YouTube multi-language audio and auto-dubbing, Meta AI translations) with their labels. Use when someone wants to dub a video, translate a short, add a Spanish or Hindi version, upload a second audio track, add subtitles in other languages, or clone a voice for another language.
license: MIT
metadata:
  title: "Dubbing and translation"
  category: "create"
  summary: "Multilingual shorts and voice-overs: glossary, cultural check, consented voices, dubs, lip-sync, subtitles, platform language tools."
  level: "intermediate"
  tags: "dubbing, translation, localization, subtitles, voice cloning, consent, multi-language audio, lip sync"
  uses: "@useclaudia/media, @useclaudia/cli, @useclaudia/social"
  time: "1–2 h per language for a short, then 20 min each"
  version: "1.0.0"
  updated: "2026-10-12"
---

# Dubbing and translation

A second language can double a video's reach, but a literal translation in a stranger's voice reads as spam. A good
version keeps the same voice, the same timing and the same jokes, made to work for a new audience, and it says
honestly that the voice is synthetic. This skill picks the languages worth doing, translates with a glossary and a
cultural check, produces the dub with a consented voice, fixes the lips or cuts around them, adds subtitles, and uses
each platform's own language features where they exist.

## When to use this

- Analytics show a real audience in another language, or a short did well and you want it in Spanish, Portuguese,
  Hindi or another language.
- A YouTube video needs a second audio track or translated subtitles.
- Someone asks to clone their voice (or a presenter's) to speak another language.
- Deciding whether to rely on YouTube auto-dubbing or Meta AI translations instead of making your own.

Not for: cloning anyone's voice without their explicit, recorded consent, or translating financial content into
markets where it would be a regulated promotion (step 3).

## What you need

- The final edit with separate stems if possible: voice, music and effects. Without a voice-free stem, the original
  voice bleeds under the dub.
- The script or a clean transcript with timestamps
  ([content-repurposing](../content-repurposing/SKILL.md) step 2 shows one way).
- A native or fluent reviewer per language. Machine translation is a draft, never the final.
- `@useclaudia/media` or the `claudia` CLI with an `elevenlabs` key (speech in the character's voice), and `fal` for
  lip-sync.
- [references/platform-language-features.md](references/platform-language-features.md) — what YouTube, Meta and others
  offer and require (read it before step 1 and step 8).

## Steps

1. **Pick languages from data.** Look at viewers by country and language (YouTube Studio audience, Instagram and TikTok
   insights). Start with one or two languages where you already have viewers and a reviewer. Check what the platform
   does on its own first: YouTube auto-dubbing and Meta AI translations may already cover a language (reference), and
   your own version should be clearly better to be worth making.

2. **Lock the source and a glossary.** Freeze the script (no edits after translation starts). Build the glossary in
   [templates/localization-brief.md](templates/localization-brief.md): names and terms never translated
   (`Claudia`, `useclaudia.xyz`, product names, series names), terms with a fixed translation, the character's tone
   rules per language (Claudia is warm, dry and informal: in Spanish use `tú`, not `usted`), and every on-screen text
   element that needs its own version.

3. **Translate, then check culture.** Draft with an LLM or a translator, giving it the glossary, the tone rules and a
   length limit per line (the dub must fit the original timing; many translations run longer than English, so ask for
   lines that can be spoken in the same seconds). Then a reviewer checks: idioms and jokes that don't land (replace,
   don't explain), gestures and visuals that mean something else, numbers, dates and currency formats, names that sound
   wrong, and anything sensitive in that market. Coin or finance content: keep it news or education, translate "not
   financial advice" properly, and don't localise crypto promotion into markets with promotion rules (UK FCA, EU MiCA;
   see [crypto-marketing-compliance](../../grow/crypto-marketing-compliance/SKILL.md)).

4. **Settle voice and consent.** Choose one:

   | Voice | When | Consent |
   |---|---|---|
   | The character's designed voice speaking the new language | AI characters such as Claudia | none needed beyond your provider's terms; it was never a real person's voice |
   | A real person's own voice, cloned | a human creator dubbing themselves | that person's explicit, informed, written consent, covering languages, uses, duration and how to withdraw ([templates/voice-consent-record.md](templates/voice-consent-record.md)) |
   | A different designed voice per language | when the original voice sounds wrong in that language | none; keep it consistent across the series |

   ElevenLabs' use policy bars cloning or synthesising the voice of any living person "without their explicit and
   informed consent", and bars getting around voice verification such as Voice CAPTCHA (checked 2026-10). Never clone a
   guest, a celebrity or a voice "like" someone. Platform auto-dubs that mimic your voice (Meta) are something you opt
   into for your own videos only.

5. **Generate the dubbed lines.** Same engine, voice id and settings as the original, one job per line or sentence so
   timing can be fixed line by line. Model language coverage (ElevenLabs docs, checked 2026-10): Eleven v3 70+ languages,
   Multilingual v2 29, Flash v2.5 32; check your language is listed before you start.

   ```sh
   claudia generate speech "<línea 1 en español>" --model elevenlabs/multilingual-v2 --voice <voice id> --max-usd 0.05
   ```

   Fit each line to its slot in [templates/dub-sheet.csv](templates/dub-sheet.csv): if a line runs long, shorten the
   translation first; change speed only within about ±10% (`ffmpeg -i l03.mp3 -af atempo=1.08 l03-fit.wav`), beyond that
   it sounds rushed. Lay the lines on the music-and-effects stem and master the mix to about -14 LUFS, true peak
   ≤ -1 dBTP. A full-video dub tool (ElevenLabs Dubbing, HeyGen video translation) is an alternative; the package doesn't
   wrap them, so run them in their own apps under the same consent rules.

6. **Fix the lips or cut around them.** Voice-over over B-roll needs nothing. On-camera speech:

   | Shot | Fix |
   |---|---|
   | Generated talking clip, face visible | `fal/lipsync-2` with `refs: [clip, dubbed line]` ($3.00/min) or `fal/veed-lipsync` ($0.40/min) |
   | Avatar explainer | re-render the avatar from the translated script ([avatar-explainer-videos](../avatar-explainer-videos/SKILL.md)) |
   | Real person on camera | their own consented clone plus lip-sync, or cut to B-roll while they speak, or subtitles only |

   ```sh
   claudia generate avatar "lip-sync the dubbed line" --model fal/lipsync-2 --ref out/shot04.mp4,out/es/l04.wav --max-usd 1
   ```

   QA at 0.5×: lips close on p, b and m in the new language, no mouth motion in silence.

7. **Make subtitles per language.** SRT, plain UTF-8, timed to the dub (not the original). About 42 characters per line
   and two lines at most is a common guideline for Latin-script languages; keep line breaks at phrase boundaries. For
   shorts, burn captions in the target language ([captions-and-hooks](../captions-and-hooks/SKILL.md)); for YouTube,
   upload the SRT as a subtitle track so viewers can switch. Translate on-screen text too, or the video is half-dubbed.

8. **Publish with platform language tools.** Read the reference for the current rules, then:
   - **YouTube:** upload your dub as a multi-language audio track (Studio → Languages → Add language → Dub; needs
     Advanced features; audio-only file roughly the same length as the video; delete an existing auto-dub for that
     language first). Add translated titles, descriptions and subtitles on the same page. Or let auto-dubbing run, with
     **Publish manually** on so a person previews each dub; auto-dubs are marked "auto-dubbed".
   - **Instagram and Facebook:** Meta AI translations dub (and optionally lip-sync) Reels in supported languages and
     label them "Translated with Meta AI". Your own dub goes out as a separate Reel.
   - **TikTok, X and others:** no native multi-language audio track for organic posts was confirmed (checked 2026-10):
     post the dubbed version as its own post, with a caption in that language, or on a separate language account.
   - Every dubbed post carries the AI label (synthetic voice); `@useclaudia/social` sets platform flags with
     `labels.ai`. Set the language where the connector supports it: `options.youtube.language`, `options.bluesky.langs`,
     `options.mastodon.language`.

9. **QA with a native speaker and log it.** The reviewer watches the final export, not the script: timing, tone,
   on-screen text, subtitles, labels. Log language, voice, consent record, reviewer and cost in the dub sheet. After a
   week, compare retention and follows from that language with the original before making the next one.

## Templates

- [templates/localization-brief.md](templates/localization-brief.md) — glossary, tone per language, cultural checklist,
  on-screen text list.
- [templates/dub-sheet.csv](templates/dub-sheet.csv) — line-by-line timing, translation, fit and review status.
- [templates/voice-consent-record.md](templates/voice-consent-record.md) — what a real person's voice consent covers.
- [examples/claudia-short-es-pt.md](examples/claudia-short-es-pt.md) — a 28-second Claudia short dubbed into Spanish and
  Brazilian Portuguese, with the joke that had to change.

## Check before you finish

- [ ] Languages chosen from audience data, each with a named fluent reviewer.
- [ ] Glossary applied: names and brand terms untranslated, tone rules kept.
- [ ] Cultural check done; no crypto promotion localised into restricted markets; "not financial advice" translated.
- [ ] Voice is the character's designed voice or a real person's own clone with a written consent record.
- [ ] Same engine, voice id and settings across languages and episodes; mix about -14 LUFS, ≤ -1 dBTP.
- [ ] On-camera speech lip-synced, re-rendered, or cut around; on-screen text translated.
- [ ] Subtitles in SRT (UTF-8) timed to the dub; burned for shorts, uploaded as tracks on YouTube.
- [ ] Every dubbed post carries the AI label; platform auto-dubs reviewed before they go public.

## Pitfalls

- **Translating the transcript, not the script.** Transcription errors become translation errors. Fix the source first.
- **Literal jokes.** A pun that doesn't exist in Spanish is silence. Replace it with a joke that works, or cut it.
- **Stretching audio to fit.** Past about ±10% speed change, voices sound robotic. Rewrite the line shorter.
- **Original voice bleeding under the dub.** Without a clean music-and-effects stem, rebuild the bed from the edit project.
- **Cloning a guest "because it's just a translation".** It is their voice saying new words. Consent first, or subtitles.
- **Auto-dubs on autopilot.** YouTube auto-dubs publish by default for eligible channels unless you turn on manual
  publishing; a mistranslation can only be fixed by correcting the original language and letting it regenerate.
- **Duplicate posts.** The same video in two languages on one account, minutes apart, looks like spam. Space them out.

## Related skills

- [voice-and-lip-sync](../voice-and-lip-sync/SKILL.md) — the voice, its settings and the lip-sync routes.
- [avatar-explainer-videos](../avatar-explainer-videos/SKILL.md) — re-rendering avatar videos in another language.
- [captions-and-hooks](../captions-and-hooks/SKILL.md) — burned captions and per-platform post copy.
- [ai-disclosure-and-provenance](../ai-disclosure-and-provenance/SKILL.md) — labels for synthetic voices.
- [audience-research-and-personas](../../grow/audience-research-and-personas/SKILL.md) — who speaks what in your audience.
- [crypto-marketing-compliance](../../grow/crypto-marketing-compliance/SKILL.md) — finance content across markets.
