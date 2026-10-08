# Worked example: Claudia tests her opening seconds with Trial Reels

**Account.** Claudia (@claudia_onchain) — AI influencer, every clip labelled AI-generated. Instagram ~29k followers,
professional creator account, eligible for Trial Reels. Typical Reel: 3,000–5,000 views, 3-second hold around 36–40%.

## 1. Backlog → pick

From [ice-backlog.csv](../templates/ice-backlog.csv), `exp-011` scored highest on Instagram (7/6/8 = 7.0): *start the clip
mid-action instead of with a setup shot.* Evidence: in the last 30 Reels, the 12 that began with motion in frame 1 held
41% at 3 seconds; the 18 that began with a setup held 33%. That's observational (other things differed), so it's worth
a proper test.

## 2. Brief (pre-registered 2026-10-05, approved by the operator)

| Field | Value |
|---|---|
| Variable | first 2 seconds: A = she walks into frame under a streetlight, B = already mid-run in the rain, laughing |
| Held constant | the same 13-second edit after 0:02, same sound, caption, 3 hashtags, AI info label on, no #ad, posted within 5 minutes |
| Primary metric | 3-second hold % |
| Secondary | average % watched; sends per non-follower reach; follows per 1,000 views |
| Guardrails | negative-comment share ≤ 25%; no platform warnings |
| Hypothesis | If we start mid-stride instead of with a setup shot, 3-second hold will move from ~38% to ~44% within 72 hours, because the first frame already shows the payoff (motion + face). |
| Design | Trial Reels pair, repeated on a second clip for replication |
| Sample size | `node scripts/sigcalc.mjs size-rate --base 0.382 --lift 0.15` → 1,156 views per variant. Trial Reels reach ~3,500–4,500 non-followers in 72 h, so one pair is enough for hold; follows need ~70k views per arm and will be read as directional only. |
| Decision rule | ship "mid-action first frame" as the default if the hold-rate interval is above 0 in **both** pairs |
| Budget | 2 extra video generations for the alternative openings, about the cost of two 8-second clips on the operator's own key, approved |

## 3. Production and posting

The agent generated both openings from the same prompt and seed family (see
[selfie-and-ugc-video-prompts](../../../create/selfie-and-ugc-video-prompts/SKILL.md)), cut them onto the identical
0:02–0:13 body, and exported two files. Because Trial Reels are a toggle in the Instagram app, the operator posted both by
hand at 17:00 and 17:05 on Monday, with identical captions:

```text
Ran three blocks in the rain for this. Worth it. ☔
#aiart #citynight #rainyday
```

The AI info label was set on both (the clip is photorealistic AI). The agent logged both rows in
[experiment-log.csv](../templates/experiment-log.csv) (`exp-011`, `ig_18034` = A, `ig_18035` = B).

## 4. Results at 72 hours

Pair 1 (rain clip):

```sh
node scripts/sigcalc.mjs rate --a 1574/4120 --b 2146/4480     # 3-second hold
# a 38.2%  b 47.9%  relative_lift +25.4%  diff CI +7.6 to +11.8 points  p < 0.0001
node scripts/sigcalc.mjs rate --a 57/3980 --b 91/4350         # sends per non-follower reach
# a 1.43%  b 2.09%  relative_lift +46.1%  p 0.023
node scripts/sigcalc.mjs rate --a 19/4120 --b 31/4480         # follows per view
# a 0.46%  b 0.69%  relative_lift +50.0%  diff CI −0.09 to +0.55 points  p 0.16  → not significant
```

Pair 2 (rooftop clip, same test a week later):

```sh
node scripts/sigcalc.mjs rate --a 1314/3650 --b 1720/3900     # 3-second hold
# a 36.0%  b 44.1%  relative_lift +22.5%  diff CI +5.9 to +10.3 points  p < 0.0001
node scripts/sigcalc.mjs rate --a 33/7770 --b 52/8380         # follows per view, both pairs pooled
# a 0.42%  b 0.62%  relative_lift +46%  p 0.086  → not significant
```

Guardrails held: negative-comment share 3–5% in all four Reels, no warnings.

## 5. Read-out

- **Decision: ship.** Mid-action first frames become the default for Claudia's Reels and TikToks. Hold improved by about
  6–12 points in both pairs; the low end of both intervals is well above zero.
- Follows look better too (+46% pooled) but the interval still includes zero. Recorded as "promising, unproven"; it needs
  ~70k views per arm to confirm, which a later account-level check will cover.
- The variant B Reels were shared to followers (manual graduation); the A Reels stayed as trials.
- **Surprise:** sends rose more than hold. People forward the laugh, not the walk-in.
- **Next test:** `exp-021` — mid-action start + on-screen text hook vs. mid-action start alone (one variable: the text).
- **Re-test date:** 2026-12-01, to check for novelty fade.

## What the agent did on its own vs. with approval

| On its own | Needed a person |
|---|---|
| scored the backlog, drafted the brief, ran `sigcalc`, generated variant openings inside the approved budget, filled the log, wrote the read-out | approving the brief and the spend, posting the Trial Reels in the app, setting the AI info label, choosing to share B to followers |
