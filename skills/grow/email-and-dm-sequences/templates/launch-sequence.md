# Launch sequence (5 emails over 8 days)

For a product, paid tier, course, drop or event launch to people who already opted in to your list. Send only to
subscribers whose consent covers marketing email (see references/consent-and-anti-spam-law.md). Exclude anyone who
bought already, and anyone who opted out of launch emails on the preferences page.

Rules for every email in this file:
- One clear thing per email and one link (repeated at most twice).
- Real deadlines only. If the cart closes Friday, it closes Friday. No fake countdowns, no "only 3 left" unless true.
- No income, return or price claims. Crypto or token anything: education only, "Not financial advice.", and check
  [crypto-marketing-compliance](../../crypto-marketing-compliance/SKILL.md) before sending to UK or EU readers.
- The footer from templates/welcome-sequence.md on every email.

| # | Day | Job | Subject line pattern |
|---|---|---|---|
| 1 | -3 | Tease the problem, no pitch | "the thing I kept getting wrong about <topic>" |
| 2 | 0 | Open: what it is, who it's for, price, deadline | "<product> is open (until <day>)" |
| 3 | +2 | Proof: one concrete example or walkthrough | "what <product> looks like from the inside" |
| 4 | +4 | Objections: FAQ, who should not buy | "is <product> for you? honest answers" |
| 5 | +5 | Last call, 6–12 hours before close | "closes tonight at <time tz>" |

---

## 1. Tease (Day -3)

**Subject:** the thing I kept getting wrong about <topic>
**Preview text:** and what finally worked

Hi {{first_name | fallback: "there"}},

<Short story: the problem, what you tried, what changed. 120–180 words.>

On <day> I'm opening something that packages this up. If you want to hear when it opens, you don't need to do
anything: you'll get one email that day. If you'd rather skip launch emails, click here: <launch opt-out link>.

<sign-off>

## 2. Open (Day 0)

**Subject:** <product> is open (until <day>)
**Preview text:** what it is, who it's for, <price>

Hi {{first_name | fallback: "there"}},

<Product> is open: <link>.

- What it is: <one line>
- Who it's for: <one line>
- What you get: <3 bullets, concrete>
- Price: <price, currency, taxes, refund terms in one line>
- Open until: <day, time, time zone>

<One line in the character's voice.>

<sign-off>

## 3. Proof (Day +2)

**Subject:** what <product> looks like from the inside
**Preview text:** one real example, start to finish

<Walk through one real example or screenshot sequence. Results only if they are typical and documented; otherwise
describe the process, not outcomes. Testimonials only from real customers, with permission, unedited in meaning.>

## 4. Objections (Day +4)

**Subject:** is <product> for you? honest answers
**Preview text:** including who should skip it

<3–5 questions people actually asked, answered plainly. Include "who should not buy this".>

## 5. Last call (Day +5, 6–12 hours before close)

**Subject:** closes tonight at <time tz>
**Preview text:** last email about this, promise

Hi {{first_name | fallback: "there"}},

<Product> closes at <time tz> tonight: <link>. This is the last email about it.

<sign-off>
