# Example: Mara Vex's newsletter, the first 12 weeks

Mara Vex is a fictional AI character (analogue synths and night trains; see the character-bible example). Her operator,
Sam, starts a weekly newsletter called "Night Patch" with 0 subscribers, 14,000 TikTok followers and 2,100 on X.
Numbers are illustrative.

## Weeks 0–1: promise, platform, sending

- **Promise:** "Every Sunday: one synth patch you can build in an hour, recorded on a night train, with the settings."
- **Platform:** beehiiv on the $0 plan to start (up to 2,500 subscribers, checked 2026-10), with a plan to move to a
  paid plan for the referral program once the list proves itself. Sam chose it over Substack for referrals and
  paid recommendations later, and over Kit because there's nothing to sell yet.
- **Sending:** `notes@nightpatch.<domain>` with SPF, DKIM and DMARC `p=none`; double opt-in; captcha on the form.
- **Archive:** three issues written before launch so the first visitors see an archive.
- **Label:** sign-up page says "Mara is an AI character. Night Patch is written with AI and reviewed by Sam."

## Week 1: lead magnet

From templates/lead-magnet-brief.md:

| Field | Answer |
|---|---|
| The one problem | "I have a synth and don't know what to patch tonight." |
| Format | 12 patch cards (one page each, settings + 20-second audio clip) |
| Title | "12 night-train patches: settings for a 3-oscillator synth" |
| Consent wording | "Get the 12 patch cards and Night Patch every Sunday. Unsubscribe anytime." |
| Kill rule | landing conversion under 15% after 500 visitors → change the title |

Landing page converted at 22% of visitors in week 2; no change needed.

## Weeks 2–5: sign-up everywhere

- Bio links on TikTok, X and Instagram → magnet page with UTMs.
- One TikTok a week ends with "patch settings are in the newsletter, link in bio" (not every video).
- X: the end of the weekly thread links the magnet.
- Reddit: Sam (as a human, disclosed) posts one text guide a month in a synth subreddit that allows links at 10%.

## Weeks 4–8: recommendations and swaps

- Recommendations turned on; Mara recommends 4 newsletters Sam actually reads (a field-recording letter, a rail
  travel letter, two synth letters). Two recommend back.
- One swap a month via templates/cross-promo-swap.md. Week 6: a field-recording newsletter (about 4,000 readers).
  Each side approved its own blurb. Disclosure line: "Recommendation swap: they're recommending us this month too."

## Weeks 9–12: referrals (after a paid plan upgrade)

Click rate held at about 9% for four weeks, so Sam turned on the referral program:

- 3 referrals: a bonus patch card pack.
- 10 referrals: a monthly live patching session (listen-only audio, Mara's voice labelled AI, Sam hosting).
- 25 referrals: a printed zine of the year's patches, posted.
- Confirmed sign-ups only. Seven referral sign-ups from one IP range in an hour were removed and that referrer's count
  reset, as the program rules said.

## The dashboard at week 12 (templates/growth-dashboard.csv, summed)

| Source | Subscribers | Share |
|---|---|---|
| TikTok bio + weekly CTA | 760 | 40% |
| Recommendations | 410 | 22% |
| Swaps (3) | 300 | 16% |
| X threads | 190 | 10% |
| Referrals | 150 | 8% |
| Reddit guides | 80 | 4% |
| **Total new** | **1,890** | |

- Unsubscribes and cleaned addresses over 12 weeks: 96. Net list: about 1,794.
- Click rate: 8–10% each issue. Complaint rate: under 0.05% every week. Replies: 15–40 per issue.

## What didn't work

- **A giveaway of a used synth** (week 5) brought 600 entries and 140 opted-in subscribers, half of whom unsubscribed
  within three weeks. The newsletter tick-box was optional and separate, which kept it legal; it still wasn't the
  right audience. Not repeated.
- **Paid recommendations** (tested week 10): cost per subscriber was fine, but those readers clicked at 3% versus 9%.
  Paused until the welcome sequence improves.
- **A CTA on every TikTok** in week 3 cut average watch time; back to once a week.
