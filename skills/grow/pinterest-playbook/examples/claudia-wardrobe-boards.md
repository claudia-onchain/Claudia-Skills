# Example: Claudia's wardrobe boards, first 6 weeks

A worked example of this skill. Claudia's looks (signature vinyl top, silver night gown, holo dress, club puffer) are
the most-saved images on her other accounts, so the team turned them into a Pinterest library. Numbers are
illustrative.

## Week 0: setup (1 hour)

1. Business account named `Claudia`. About: `AI character by the Claudia team. Glossy futurist outfits, studio sets
   and creator tools. Every image is AI-generated.` Website: useclaudia.xyz.
2. Boards from [templates/board-plan.csv](../templates/board-plan.csv): six boards, each named with a search phrase.
3. Pinterest Trends (business account, browser): "silver party outfit" and "holiday party look" climb from late
   October and peak in December in the team's main markets, so silver-night Pins were scheduled first.
4. Pinterest app created, keys stored, connected:

```sh
claudia keys set pinterest
claudia connect pinterest --boardId <glossy-futurist-outfits-board-id>
claudia accounts
```

## Week 1: the Trial-access surprise

The first five Pins published without errors, but saves and impressions stayed at zero. The weekly review row
"API access level" showed the reason: the app was on **Trial**, so the Pins were visible only to the account itself.
The team applied for Standard access, kept drafting and approving, and paused the schedule until Standard came through
in week 2. The Trial-era Pins were deleted and re-made as new Pins once Standard was granted. They were not mass
re-uploaded unchanged.

## One Pin end to end

From [templates/pin-copy-template.md](../templates/pin-copy-template.md), look 3:

```text
TITLE: Silver party outfit idea: liquid-silver gown and white faux-fur stole
DESCRIPTION: A liquid-silver column gown with a white faux-fur stole and a crystal choker, strappy silver heels,
cobalt blue set. Silver party outfit and holiday party look. AI-generated character by the Claudia team.
ALT: AI-generated image: Claudia in a liquid-silver gown and white faux-fur stole on a cobalt blue set, direct flash.
LINK: https://useclaudia.xyz/<lookbook page for this look>
```

The preview showed 217 characters of description, `ai_disclosures` set, no warnings. After the operator approved this
single Pin, the dry run showed the request with the board id, the title and the link; it was scheduled for Tuesday
19:00 local.

## Week 3: a removed link

A draft for the "Creator desk setups" board linked to a coin's launch page because "the desk is where she launched
it". The operator rejected it with `social.reject(id, "link doesn't match the Pin; no coins on Pinterest")`. Pinterest's
guidelines ban misleading links and get-rich-quick content, and the image showed a desk, not a coin. The Pin went out
with a link to the studio page instead.

## Results after 6 weeks (4 weeks on Standard access)

| Board | Pins | Impressions | Saves | Outbound clicks |
|---|---|---|---|---|
| Silver party outfits | 9 | 61,000 | 2,140 | 410 |
| Glossy futurist outfits | 11 | 38,500 | 1,260 | 205 |
| Silver foil photoshoot ideas | 5 | 14,200 | 520 | 96 |
| Cobalt blue studio sets | 5 | 6,100 | 140 | 22 |
| AI character design | 4 | 9,800 | 610 | 180 |
| Creator desk setups | 4 | 2,300 | 41 | 9 |

Monthly decision:

- Keep and grow: Silver party outfits (seasonal peak ahead), AI character design (the best click rate).
- Fix: Cobalt blue studio sets. Titles led with "Claudia on cobalt"; the next test leads with "Cobalt blue backdrop
  idea" ([growth-experiments](../../growth-experiments/SKILL.md)).
- Drop: Creator desk setups. Few searches matched it in Trends.
