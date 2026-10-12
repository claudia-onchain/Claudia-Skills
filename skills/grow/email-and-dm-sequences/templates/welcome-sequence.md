# Welcome sequence (5 emails, 10 days)

Trigger: a person confirms their subscription (double opt-in click). Stop the sequence for anyone who unsubscribes,
replies "stop", or buys the thing email 4 mentions. Every email carries the footer at the bottom of this file.

Merge fields below use `{{first_name | fallback: "there"}}` style; rename them to your platform's syntax (beehiiv,
Kit, Substack and others each have their own).

---

## Email 1: Day 0, sent immediately: "here's what you signed up for"

**Subject:** you're in. here's the <lead magnet name>
**Preview text:** plus what lands in your inbox, and how often

Hi {{first_name | fallback: "there"}},

Thanks for signing up. Here's the <lead magnet name> you asked for: <link>.

What happens next: one email every <weekday>, about <the one topic, in plain words>. Nothing else, and you can leave
with one click at the bottom of any email.

Quick favour that helps more than you'd think: reply with one word: what do you want help with right now?
I read every reply.

<sign-off>
<name> (<AI character> is AI-generated; <operator name> runs this list)

---

## Email 2: Day 1: "the best thing I've made"

**Subject:** start with this one
**Preview text:** the post people still email me about

Hi {{first_name | fallback: "there"}},

If you only read one thing from the archive, make it this: <title> (<link>).

Why: <one sentence on the problem it solves>.

Next time: <teaser for email 3>.

<sign-off>

---

## Email 3: Day 3: "who this is from"

**Subject:** who's behind this
**Preview text:** short version: an AI character and a real person

Hi {{first_name | fallback: "there"}},

A straight answer to the question I get most: <AI character> is an AI character. The posts, images and voice are
AI-generated. <operator name> is the human who runs the list, reviews every email before it goes out, and reads your
replies.

What we care about: <2–3 lines on the point of view>.
What we never do: sell your address, send you anything you didn't sign up for, or give financial advice.

<sign-off>

---

## Email 4: Day 6: "one useful thing + one optional offer"

**Subject:** <specific outcome> in <time>
**Preview text:** the 3-step version

Hi {{first_name | fallback: "there"}},

<Three short, useful steps that stand on their own.>

If you want the full version, <product / paid tier / workshop> does that: <link>. <Price> <one honest line on who
it's for and who it isn't for>. No pressure; the free emails stay free.

<sign-off>
<If this is a paid partnership or affiliate link: "Ad: <brand> paid for this mention." / "Affiliate link: I earn a
commission if you buy.">

---

## Email 5: Day 10: "set your preferences"

**Subject:** too much, too little, or just right?
**Preview text:** pick what you want from here

Hi {{first_name | fallback: "there"}},

You've had five emails from me. Tell me what to send next:

- <Link: weekly issue only>
- <Link: weekly issue + launches>
- <Link: unsubscribe, no hard feelings>

<sign-off>

---

## Footer (every email)

```text
You're getting this because you signed up at <where, e.g. useclaudia.xyz/newsletter> on <date merge field>.
<AI character> is an AI character; this email was written with AI and reviewed by <operator name>.
<Legal sender name> · <valid physical postal address: street address, PO box or registered private mailbox>
Unsubscribe in one click: <unsubscribe link> · Manage preferences: <preferences link>
```
