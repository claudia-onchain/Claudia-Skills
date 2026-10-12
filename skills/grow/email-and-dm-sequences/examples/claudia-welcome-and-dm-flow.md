# Example: Claudia's welcome series and a comment-to-DM flow

Claudia is an AI character; her newsletter "Studio Notes" goes out every Thursday with one behind-the-scenes look at how
her shorts get made and one tool or skill from the platform. The team member who runs the list is called "the
operator" below. Numbers are illustrative for a list of about 3,000.

## Before: what was wrong

- New sign-ups got the platform's default "Thanks for subscribing" and then the next Thursday issue, up to 6 days later.
- The form said "Join the list" with nothing about what or how often.
- 1,100 of 3,050 subscribers hadn't clicked anything in 120+ days.

## Step 1–2: form and footer

Form copy:

```text
Get my 30-hook pack for AI character shorts, plus Studio Notes: one email every Thursday about how the shorts get
made. Unsubscribe anytime.
[ email ] [ send me the pack ]
Claudia is an AI character. The pack and the emails are made with AI and reviewed by a human.
```

Double opt-in on; the platform stores the form URL and timestamp. Footer on every email:

```text
You're getting this because you signed up at useclaudia.xyz/newsletter.
Claudia is an AI character; this email was written with AI and reviewed by the Claudia team.
<legal sender name> · <postal address>
Unsubscribe in one click · Manage preferences
```

## Step 3: the welcome series (her voice, from templates/welcome-sequence.md)

**Email 1, day 0.** Subject: `you're in. here's the hook pack`

```text
hi {{first_name | fallback: "there"}},

here's the 30-hook pack: <link>. sorted by pillar, studio to club.

what happens next: one email every thursday. one behind-the-scenes, one tool. that's it, and the unsubscribe is at
the bottom of every email.

small favour: reply with one word. what are you making right now? I read every reply (well, the team does, and then
tells me).

claudia
```

**Email 3, day 3.** Subject: `who's behind this`

```text
straight answer to the question I get most: I'm an AI character. the posts, the photos and this voice are
AI-generated. a real team runs the platform, checks every email before it goes out, and reads your replies.

what I never do: sell your address, send stuff you didn't sign up for, or give financial advice.
```

**Email 4, day 6.** Subject: `a 30-second short in 3 steps`. Three steps that stand on their own, then:
`if you want the full walkthrough, the storyboarding skill is on the shelf: <link>. no pressure.`

**Email 5, day 10.** Subject: `too much, too little, or just right?` with three links: weekly, monthly digest,
unsubscribe.

## Step 5: re-engagement for the 1,100

Three emails from templates/re-engagement-sequence.md over 12 days. Subject of email 1: `still want these?`

- 214 clicked "keep me on", 87 picked the monthly digest, 31 unsubscribed.
- 768 did nothing and were removed on day 14.
- Spam complaints during the series: 2 (0.02%).

## Step 6: comment-to-DM on Instagram

Reel caption ends with:

```text
comment HOOKS and I'll DM you the pack (one message, no spam). Claudia is an AI character run by the Claudia team.
```

The one private reply, sent through the account's approved Meta automation within minutes of the comment:

```text
hi! here's the hook pack you asked for: <link>
I'm an AI character; a human on the team reads replies here.
want studio notes every thursday too? <sign-up link> (only if you want it)
```

No second message. 412 people commented HOOKS; 138 followed the sign-up link and confirmed by double opt-in.

## After 30 days

| Metric | Before | After |
|---|---|---|
| Subscribers | 3,050 | 2,661 (768 inactive removed, 31 unsubscribed, 410 new) |
| Click rate on Thursday issue | 2.9% | 6.4% |
| Replies per week | ~4 | ~31 (mostly to welcome email 1) |
| Spam complaint rate | 0.09% | 0.02% |
| Unsubscribes per issue | 0.8% | 0.4% |

Fewer subscribers, more readers. The operator's note: "email 1's one-word reply question did more than anything else;
the replies became next month's topics."
