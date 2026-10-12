# How to update my site

Your site is a set of plain text files on GitHub. When a file changes, Vercel rebuilds and publishes the site, usually within a minute. You can make every change below yourself on github.com, or paste the text to Claude and say "publish this".

Your repository, https://github.com/omenashe2002/ordavidmenashe, is public: anyone can read every file in it, including drafts. Keep private writing in Google Docs or Notes until you are ready to publish.

## Add an article

1. In the repository, open `src`, then `content`, then `writing`. Click **Add file**, then **Create new file**.
2. Check that the path above the name box reads `ordavidmenashe / src / content / writing /`. Type a short name with no spaces that ends in `.md`, for example `my-first-post.md`. The name becomes the address: `ordavidmenashe.com/writing/my-first-post/`.
3. Copy the template below (hover over it and click the copy icon) and paste it into the big box. Change the settings, and write your article under the second line of three dashes.
4. Click **Commit changes**, keep "Commit directly to the main branch", and click **Commit changes** again. Refresh your site in a minute.

```
---
title: "The title of your article"
date: 2026-10-12
description: "One or two sentences. They appear in the article list and in link previews."
tags: [Law]
draft: false
---

Write your article here. Leave a blank line between paragraphs.
```

- **title** and **description**: in quotation marks. If the text itself contains quotation marks, use curly ones (“like this”) inside.
- **date**: year-month-day. It is only the date shown. A later date does not delay publishing.
- **tags**: one or more of Crypto, AI, Law, Other, in square brackets: `[Law, Crypto]`.
- **featured** (optional): add the line `featured: true` to show the article as a large panel under "Selected writing" on the Home page, and on the Writing page when there is other writing too. Up to two featured articles are shown, the most recent first. Delete the line to stop featuring it.
- **kicker** (optional): a short line above the title, such as `kicker: "Forthcoming in the Fordham Journal"`. It appears at the top of the article and on its large panel if it is featured. Keep it in quotation marks.
- **draft**: `true` keeps the article off the website while you write. The file is still visible on GitHub. `false` publishes it.

A few things happen on their own: the reading time; a contents list beside the text (above it, on a phone) for any article of about six minutes or more with at least three `## Heading` sections; and a "Keep reading" list of other articles at the bottom, chosen by shared topics.

In the text, write `## Heading` (two pound signs, then a space), `*italics*` (asterisks touching the word), `[link text](https://address)`, and start a line with `>` for a quotation. A footnote is `[^1]` in the text plus a line `[^1]: your note` further down. Put a footnote at the end of a sentence, not on a heading, because its number would stick to the heading words in the contents list. The article *Registered Agents of the DAO* shows each of these.

## Add a video

Do the same in `src/content/videos` with this template. Paste the link from YouTube's Share button after `url:`.

```
---
title: "The title of your video"
date: 2026-10-12
url: https://youtu.be/abc123XYZ_0
description: "Optional. One or two sentences shown under the video."
draft: false
---
```

## Edit or delete something

- **About page:** open `src/content/pages/about.md`, click the pencil icon, edit only the text below the second line of three dashes, and click **Commit changes**. A line that starts with `## ` is a small section label. The photo on this page is the same `or-menashe.jpg` described below.
- **"What I'm working on now" (About page):** open `src/content/pages/now.md`. Each line that starts with a dash is one item; add, change or delete lines. Change the month in the `updated:` line when you refresh the list, because it appears under the list as "Updated October 2026".
- **Top of the Home page:** open `src/content/pages/home.md` and click the pencil icon. Between the two lines of dashes: `eyebrow:` is the small line above the headline, `headline:` is the big headline, `buttonText:` and `buttonLink:` are the dark button and where it goes, and `linkText:` and `linkLink:` are the quieter link beside it. Under `credentials:` each background item has a `label:` (small) and a `text:` (larger); copy a pair of lines to add one, or delete a pair to remove one. Change only the words between quotation marks. The sentence under the headline is the text below the second line of dashes.
- **Your photo:** open `src`, then `assets`, click **Add file**, then **Upload files**, and drop in a new photo named exactly `or-menashe.jpg`. It replaces the old one. A portrait-shaped JPEG at least 1000 pixels wide works best. Remember the repository is public, so the photo is public too.
- **Email and LinkedIn:** the lines that start with `email:` and `linkedin:` in `src/site.ts`. Change only the words between the single quotation marks, and keep both quotation marks and the comma.
- **Newsletter signup:** see "Turn on the newsletter signup" below.
- **Delete:** open the file, click the trash can icon, and commit.

## Turn on the newsletter signup

The Contact page shows a signup form only when `newsletter:` in `src/site.ts` holds a form address. It is empty now, so no form appears. The form is a plain form that sends the reader to the newsletter service, so it loads nothing from them until someone subscribes.

1. Create a free account at buttondown.com and choose a username. As of October 2026 the free plan covers your first 100 subscribers. Past 100 you can keep collecting addresses but cannot send until you add billing and pick a paid plan, which starts at $9 a month. Check their pricing page for the current terms.
2. In Buttondown, open **Settings**, then **Embedding**, and copy the code under **Form**. Find the part that reads `action="https://buttondown.com/api/emails/embed-subscribe/yourname"`.
3. In `src/site.ts`, put only that address between the single quotation marks after `newsletter:`, so the line reads `newsletter: 'https://buttondown.com/api/emails/embed-subscribe/yourname',`. Click **Commit changes**.
4. To switch the form off, empty the quotation marks again.

Buttondown asks every new subscriber to confirm their address by email. Every email you send includes an unsubscribe link, so keep it.

## If something goes wrong

- **A mistake in a file:** the build stops and the old site stays live. On Vercel, open **Deployments**, click the red one marked Error, and read the red lines under **Build Logs**. They name the file and say what to fix. Send them to Claude if you are unsure.
- **Undo a change:** on Vercel, open **Deployments**, click the three dots next to the last good version, and click **Instant Rollback** (on the free plan this may only go back one version). For anything older, ask Claude to restore a save point from **Commits** on GitHub.

## Things that go out of date

| Phrase | Where | Change it |
|---|---|---|
| "third-year law student" | `about.md` and `home.md` | when you graduate |
| "J.D. expected May 2027" | `home.md` (the `credentials:` list) | after you graduate |
| "forthcoming" | `about.md`, and the `kicker:` line of the featured article | when the note is published |
| "This semester I am a law clerk at the Wyoming Stable Token Commission" | `about.md`, `now.md`, and `home.md` (`credentials:`) | when that role ends |
| "In the spring I will join the DeFi Education Fund" | `about.md` and `now.md` | when you start |
| "Updated October 2026" | the `updated:` line in `now.md` | each time you change that list |
| "This past summer, as a law clerk at Fidelity National Financial" | `about.md` | next summer |
| "student ambassador for Harvey" | `about.md`, and `home.md` (`credentials:`) | when that role ends |
| "expected May 2027" | `about.md` | after you graduate |
| "a law student at Fordham Law" | `about.md` (top) and `src/site.ts` | when you graduate |

Use GitHub's search box to find each phrase and check every file it lists.
