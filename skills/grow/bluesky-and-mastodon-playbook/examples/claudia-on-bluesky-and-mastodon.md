# Example: Claudia's first month on Bluesky and Mastodon

A worked example of this skill. The team wants Claudia in the open-network crowd: artists, developers and people
who left bigger networks. Numbers are illustrative; server names below are placeholders except where stated.

## Week 0: choosing the Mastodon server (40 minutes)

The operator filled the server checklist from [templates/profile-setup.md](../templates/profile-setup.md) for two
candidates:

| Question | Big general server (mastodon.social) | Art-focused server (`<art.example>`) |
|---|---|---|
| Automated accounts | not banned in its rules | "no bots" in rule 4 |
| AI content | "use of generative AI must be disclosed" | "no AI-generated images" |
| CW rules | sensitive media must be marked | CW all images of people |
| Covenant | yes | yes |
| Decision | **chosen** | rejected: the rules exclude Claudia |

The art server would have been the better audience, but its rules exclude Claudia. Joining anyway would have meant a
suspension and lost followers. Claudia went to the general server, and the team follows art hashtags instead.

## Week 0: setup

```sh
claudia connect bluesky --handle claudia.useclaudia.xyz --appPassword <app-password>
claudia connect mastodon --instance mastodon.social
claudia accounts
```

- Mastodon: "This is an automated account" ticked. The dry run no longer warned about the bot flag.
- Bluesky: domain handle set through the app's handle settings; `bot` self-label added with the one-time script.
- Both bios from the template; Mastodon profile rows for operator, AI, and "Not advice".

## A cross-post, both ways

One draft, two texts:

- Bluesky (64 graphemes): `same prompt, four lighting setups. which one is actually me?`
- Mastodon (unlisted): `same prompt, four lighting setups. which one is actually me? #AIArt #PortraitPhotography`

Alt text on all four images: `AI-generated image: Claudia, black bob with a peach-orange streak and a peach star
clip, headset mic, lit from <left | above | behind | ring light> against a white studio backdrop.`

Preview: Bluesky text with `(AI-generated)` appended; Mastodon text unchanged, because the bot flag carries the label.
Approved and scheduled for 12:00 New York.

## Week 2: the crypto explainer

On Mastodon it went out unlisted with `spoilerText: "crypto talk"`; the body ended "Not financial advice." (added by the
package because it mentions a token). On Bluesky the first line said what it was:
`plain-words explainer, no tickers: what a creator fee is and who gets it.`

## Week 3: a mention, answered properly

A Bluesky user mentioned Claudia asking how she keeps her face consistent. The inbox picked it up:

```ts
const items = await social.inbox({ since: Date.now() - 12 * 3600_000 });
// → { network: "bluesky", kind: "mention", from: "@someone.bsky.social", text: "@claudia.useclaudia.xyz how do you keep your face the same?", … }
```

Drafted reply, approved by the operator, sent with `social.reply(m.account, m.id, …)`:

```text
one reference sheet, four angles, and the same star clip every time. the long version is pinned on my profile.
```

The agent also proposed liking the user's latest post. The operator declined: liking by script isn't opt-in.

## Results after 4 weeks

| Metric | Bluesky | Mastodon |
|---|---|---|
| Posts | 34 | 31 (6 public, 25 unlisted) |
| Followers | 0 → 1,180 | 0 → 640 |
| Avg reposts/boosts per post | 9 | 7 |
| Mentions answered (approved) | 92% | 95% |
| Alt-text coverage | 100% | 100% |
| Reports or moderator notes | 0 | 0 |

Biggest single source of Bluesky followers: being added (after the operator asked once, by hand) to a creative-AI
starter pack in week 3. On Mastodon, the `#AIArt` hashtag and boosts from two artists drove most follows.
