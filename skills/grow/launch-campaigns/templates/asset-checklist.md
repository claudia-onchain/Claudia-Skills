# Asset checklist (G2) and go/no-go (G4)

## Asset kit — tick at G2

### Video
- [ ] Hero video 9:16, 1080×1920, H.264, ≤ 60 s for launch (15–30 s for agent intros)
- [ ] 1:1 crop of the hero (feeds, Telegram, Discord)
- [ ] Burned-in captions; first frame works as a cover; hook in the first 2 seconds
- [ ] AI label: platform flag set in drafts (`labels.ai: true`) and "AI-generated" in caption or on-screen for realistic scenes
- [ ] No third-party music without a licence (use platform libraries natively or licensed tracks)
- [ ] Trailer 10–20 s (series launches)

### Images
- [ ] 16:9 hero image (X, Telegram link preview)
- [ ] 3:1 banner for profile headers
- [ ] 1:1 card with the one-liner (no more than 12 words on the image)
- [ ] Alt text written for each image (what is shown, not the marketing line)
- [ ] Claudia visuals match the character bible (black jaw-length bob, heavy bangs, copper-red streaks, orange clip, gold
      hoops, star pendant); always an adult; labelled AI-generated

### Words
- [ ] Captions per platform written separately (X ≤ 280 weighted; Threads ≤ 500; Instagram ≤ 2,200 and ≤ 5 hashtags;
      TikTok ≤ 2,200; Telegram ≤ 4,096 or 1,024 as caption; Discord ≤ 2,000)
- [ ] Bio lines updated (AI disclosure, link)
- [ ] Pinned FAQ (what it is, who runs it, it's AI, cost, where to ask, admins never DM first)
- [ ] [coin] Coin FAQ from `references/coin-launch-communications.md` filled with real addresses

### Links and tracking
- [ ] Landing page live (staging OK at G2, production by G4), loads in < 3 s on mobile
- [ ] UTM per platform and per post key: `utm_source`, `utm_medium=social`, `utm_campaign=<slug>`, `utm_content=<key>`
- [ ] Short links resolve to the UTM URL (if used)

### Accounts
- [ ] `claudia accounts` lists every target account; no `expiring` warnings (LinkedIn tokens last 60 days; YouTube testing
      tokens 7 days)
- [ ] X Automated label on; managing account linked
- [ ] Posting service connected for Instagram/Threads/TikTok (or manual posting planned)

G2 approved by `[name]` on `[date]`.

---

## Go / no-go — T-1 hour (G4)

Answer each with yes. Any "no" → move T-0.

| # | Check | Yes/No |
|---|---|---|
| 1 | Scheduled queue matches the calendar (`social.posts({ status: "scheduled" })`, count and times) | |
| 2 | Every scheduled post shows status `scheduled`, none `pending_approval` with "Posting late?" | |
| 3 | Host is running `tick()` every 30 s on an always-on machine; clock in sync (`claudia doctor`) | |
| 4 | Kill switch drill done (on → dry-run publish blocked → off) | |
| 5 | Landing page live in production; UTM links tested from a phone | |
| 6 | Moderator on shift, has the FAQ, the kill-switch command and the correction template | |
| 7 | No platform warnings, locks or rate limits in the last 24 h | |
| 8 | Nothing major happening that makes the launch tone-deaf (news, outage, market event) | |
| 9 | [coin] Mint, symbol, image and metadata re-checked against the brief; review step shows the fee split | |
| 10 | [coin] Wallet disclosure and creator rewards wording ready; no coin posts queued for TikTok/YouTube/LinkedIn/IG | |
| 11 | Spend so far within budget | |

Go decision by `[name]` at `[time]`.
