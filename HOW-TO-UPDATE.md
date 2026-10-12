# How to update my site

Your site is a set of plain text files on GitHub. When a file changes, Vercel rebuilds and publishes the site, usually within a minute or two. You can make every change below yourself on github.com, or paste the text to Claude and say "publish this".

Your repository, https://github.com/omenashe2002/ordavidmenashe, is public: anyone can read every file in it, including drafts and the photo. Keep private writing in Google Docs or Notes until you are ready to publish.

## Where things live

| To change | Open this file |
|---|---|
| An article | `src/content/writing/` (one file per article) |
| A video | `src/content/videos/` (one file per video) |
| The top of the Home page | `src/content/pages/home.md` |
| The About page | `src/content/pages/about.md` |
| "What I'm working on now" | `src/content/pages/now.md` |
| Email, LinkedIn, newsletter signup, topics, footer disclaimer | `src/site.ts` |
| Your photo | `src/assets/or-menashe.jpg` |

To edit a file: open it on GitHub, click the pencil icon, change it, click **Commit changes**, keep "Commit directly to the main branch", and click **Commit changes** again. Change only the words, not the punctuation around them. Colons, dashes, brackets and quotation marks matter.

## Add an article

1. In the repository, open `src`, then `content`, then `writing`. Click **Add file**, then **Create new file**.
2. Check that the path above the name box reads `ordavidmenashe / src / content / writing /`. Type a short name with no spaces that ends in `.md`, for example `my-first-post.md`. The name becomes the address: `ordavidmenashe.com/writing/my-first-post/`.
3. Copy the template below (hover over it and click the copy icon) and paste it into the big box. Change the settings, and write your article under the second line of three dashes.
4. Click **Commit changes**, keep "Commit directly to the main branch", and click **Commit changes** again. Refresh your site in a minute or two.

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
- **draft**: `true` keeps the article off the website while you write. The file is still visible on GitHub. `false` publishes it.
- **featured** (optional): add the line `featured: true` to show the article as a large panel under "Selected writing" on the Home page, and on the Writing page when there is other writing too. Up to two featured articles are shown, the most recent first. Delete the line to stop featuring it.
- **kicker** (optional): a short line above the title, such as `kicker: "Forthcoming in the Fordham Journal"`. It appears at the top of the article and on its large panel if it is featured. Keep it in quotation marks.

In the text, write `## Heading` (two pound signs, then a space), `*italics*` (asterisks touching the word), `[link text](https://address)`, and start a line with `>` for a quotation. A footnote is `[^1]` in the text plus a line `[^1]: your note` further down. Put a footnote at the end of a sentence, not on a heading. The article *Registered Agents of the DAO* shows each of these.

These happen on their own: the reading time; a contents list beside the text (above it, on a phone) for any article of about six minutes or more with at least three `##` sections; a "Keep reading" list of other articles at the bottom, chosen by shared topics; the RSS feed; and a link-preview picture with the article's title and your portrait.

If a setting is misspelled, a footnote has no matching note, or a date is impossible, the build stops and says which file and what to fix. The old site stays live.

## Add a video

Do the same in `src/content/videos` with this template. Paste the link from YouTube's Share button after `url:`. Videos appear in a grid, newest first. Nothing loads from YouTube until a visitor clicks play.

```
---
title: "The title of your video"
date: 2026-10-12
url: https://youtu.be/abc123XYZ_0
description: "Optional. One or two sentences shown under the video."
draft: false
---
```

## Change the words on a page

- **Home, top of the page:** open `home.md`. Between the two lines of dashes: `eyebrow:` is the small line above the headline, `headline:` is the big headline, `buttonText:` and `buttonLink:` are the dark button and where it goes, and `linkText:` and `linkLink:` are the quieter link beside it. Under `credentials:` each background item has a `label:` (small) and a `text:` (larger); copy a pair of lines to add one, or delete a pair to remove one. Keep the words in quotation marks. The sentence under the headline is the text below the second line of dashes.
- **About:** open `about.md` and edit only the text below the second line of dashes. A line that starts with `## ` is a small section label.
- **What I'm working on now (on the About page):** open `now.md`. Each line that starts with a dash is one item; add, change or delete lines. Change the month in the `updated:` line each time you refresh the list, because it appears under the list as "Updated October 2026". To hide the panel, delete `now.md` or delete every item.
- **Email and LinkedIn:** the lines that start with `email:` and `linkedin:` in `site.ts`. Change only the words between the single quotation marks, and keep both quotation marks and the comma.
- **Your photo:** open `src`, then `assets`, click **Add file**, then **Upload files**, and drop in a new photo named exactly `or-menashe.jpg`. It replaces the old one. A portrait-shaped JPEG at least 1000 pixels wide works best. A photo taken on a phone often carries the place and time it was taken inside the file, and that stays visible on GitHub. Upload a screenshot of the photo instead, which carries none, or ask Claude to remove it.
- **Delete anything:** open the file, click the trash can icon, and commit.

## Turn on the newsletter signup

The Contact page shows a signup form only when `newsletter:` in `site.ts` holds a form address. It is empty now, so no form appears. The form loads nothing from the newsletter service until someone subscribes.

1. Create a free account at buttondown.com and choose a username. As of October 2026 the free plan covers your first 100 subscribers. Past 100 you can keep collecting addresses but cannot send until you add billing and pick a paid plan, which starts at $9 a month. Check their pricing page for the current terms.
2. In Buttondown, open **Settings**, then **Embedding**, and copy the code under **Form**. Find the part that reads `action="https://buttondown.com/api/emails/embed-subscribe/yourname"`.
3. In `site.ts`, put only that address between the single quotation marks after `newsletter:`, so the line reads `newsletter: 'https://buttondown.com/api/emails/embed-subscribe/yourname',`. Click **Commit changes**.
4. Open the Contact page a minute or two later and check that the form appears. If the address is wrong, the build stops and says so, and the old site stays live.
5. To switch the form off, empty the quotation marks again.

Buttondown asks every new subscriber to confirm their address by email. Every email you send includes an unsubscribe link, so keep it.

## Link previews and search

Every page has a title, a description and a preview picture, so links look right on LinkedIn, Slack, iMessage and X. Each article gets its own picture automatically. LinkedIn keeps old previews for a while. To refresh one after you change an article, paste its address into LinkedIn's Post Inspector at linkedin.com/post-inspector. The site also lists itself for search engines at `/sitemap-index.xml`.

## If something goes wrong

- **A mistake in a file:** the build stops and the old site stays live. On Vercel, open **Deployments**, click the red one marked Error, and read the red lines under **Build Logs**. They name the file and say what to fix. Send them to Claude if you are unsure.
- **Undo a change:** on Vercel, open **Deployments**, click the three dots next to the last good version, and click **Instant Rollback** (on the free plan this may only go back one version). For anything older, ask Claude to restore a save point from **Commits** on GitHub.
- **A change does not show up:** wait two minutes, then refresh with Cmd+Shift+R. On Vercel's **Deployments** page the top row should say Ready.

## Things that go out of date

Use GitHub's search box to find each phrase and check every file it lists.

| Phrase | Where | Change it |
|---|---|---|
| "third-year law student" | `about.md` and `home.md` | when you graduate |
| "J.D. expected May 2027" | `home.md` (the `credentials:` list) | after you graduate |
| "expected May 2027" | `about.md` | after you graduate |
| "a law student at Fordham Law" | `about.md` (top) and `site.ts` | when you graduate |
| "forthcoming" | `about.md`, the `kicker:` line of the featured article, and the italic first paragraph of `registered-agents-of-the-dao.md` | when the note is published |
| "The current draft is on this site" | `about.md` | when the note is published, or if you hide, rename or delete the article (the link would break) |
| "Senior Notes Editor" | `about.md`, `now.md`, and `home.md` (`credentials:`) | when your term as editor ends |
| "This semester I am a law clerk at the Wyoming Stable Token Commission" | `about.md`, `now.md`, and `home.md` (`credentials:`) | when that role ends |
| "In the spring I will join the DeFi Education Fund" | `about.md` and `now.md` | when you start |
| "This past summer, as a law clerk at Fidelity National Financial" | `about.md` | next summer |
| "student ambassador for Harvey" | `about.md` and `home.md` (`credentials:`) | when that role ends |
| "Updated October 2026" | the `updated:` line in `now.md` | each time you change that list |
