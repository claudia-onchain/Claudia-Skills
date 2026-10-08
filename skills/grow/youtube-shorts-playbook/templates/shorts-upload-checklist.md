# Shorts review checklist (Studio, before a private upload goes public)

The agent uploads private. A person opens YouTube Studio → Content → Shorts → the new upload, and ticks every line.
If any line fails, fix it in Studio or reject the post (`social.reject(id, "why")`) and have the agent redo it.

## Video

- [ ] Plays as a Short (vertical or square, ≤ 3 min); the Shorts link opens the Shorts player
- [ ] First second shows the face or motion and the on-screen text; nothing important under the buttons (bottom ~20%, right ~15%)
- [ ] No other platform's watermark; no other creator's footage
- [ ] Audio from the YouTube library / Shorts picker or owned; no copyright claim showing in Checks
- [ ] No real, identifiable person generated or imitated

## Details

- [ ] Title ≤ 100 chars, reads well in the first ~40
- [ ] Description line 2 (or 1 if not an ad): "<Character> is an AI-generated character."
- [ ] ≤ 3 hashtags intended to show; fewer than 15 in total
- [ ] UTM link correct (`utm_source=youtube&utm_medium=shorts&utm_campaign=<series>`)
- [ ] Audience: "No, it's not made for kids"
- [ ] **Altered or synthetic content: Yes** (already set by the API if `labels.ai` was on — confirm)
- [ ] Paid promotion box ticked + `#ad` first line, if paid/gifted/affiliate/own product
- [ ] Related video set (if the series has one)
- [ ] Remix setting chosen (off if a collaborator hasn't agreed to remixes)

## Money check

- [ ] No coin names with buy/sell framing, no price targets, no "I made X%", no giveaways
- [ ] Chart education only, with "Education, not financial advice." in the description
- [ ] Nothing invites UK or EU viewers to buy a cryptoasset

## Publish

- [ ] Visibility set: Public now / Schedule at <date time zone>, at least 3 h after the last upload
- [ ] Logged in the series plan (`reviewed_by`, `visibility`)
- [ ] First 2 hours: comments checked; replies drafted and approved, not automated
