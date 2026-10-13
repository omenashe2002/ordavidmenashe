# How to update my site

Your site is a set of plain text files on GitHub. When a file changes, Vercel (the service that hosts the site) rebuilds and publishes it, usually within a minute or two. That automatic step is called a build. You can make every change below yourself on github.com, or paste the text to Claude and say "publish this".

Your repository, https://github.com/omenashe2002/ordavidmenashe, is public: anyone can read every file in it, including drafts and the photo. Keep private writing in Google Docs or Notes until you are ready to publish.

## Where things live

| To change | Open this file |
|---|---|
| An article | `src/content/writing/` (one file per article) |
| A video | `src/content/videos/` (one file per video) |
| A weekly newsletter issue | `src/content/newsletter/` (one file per issue) |
| The short introductions on the Videos and Weekly newsletter pages | `src/content/pages/videos.md` and `src/content/pages/newsletter.md` |
| The top of the Home page | `src/content/pages/home.md` |
| The About page | `src/content/pages/about.md` |
| "What I’m working on now" (the Now page) | `src/content/pages/now.md` |
| The Colophon page (how the site is made) | `src/content/pages/colophon.md` |
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
- **featured** (optional): add a new line `featured: true` anywhere between the two lines of three dashes at the top, for example under `draft: false`. If you put it below the dashes it shows up as ordinary text in the article. It shows the article as a large panel under "Selected writing" on the Home page, and on the Writing page when there is other writing too. Up to two featured articles are shown, the most recent first. Delete the line to stop featuring it.
- **kicker** (optional): a new line between the same two lines of dashes, such as `kicker: "Forthcoming in the Fordham Journal"`. It appears at the top of the article and on its large panel if it is featured. Keep it in quotation marks.
- **status**, **draftDate** and **updatedDate** (optional): new lines between the same two lines of dashes. `status: draft` (or `forthcoming`, or `published`) adds a small label beside the dates. It is only a label: it does not hide anything. To keep an article off the site, use `draft: true`. `draftDate: 2026-03-01` adds "Draft of March 1, 2026", and `updatedDate: 2026-11-15` adds "Updated November 15, 2026". Once you add any of these, `date` is shown as "Posted". The dates must make sense together: `draftDate` cannot come after `date`, and `updatedDate` cannot come before it, or the build stops and says so. Search engines are told the same dates.
- **citation**, **pdf** and **ssrn** (optional): every article has a "Cite this" box at the top and "Cite this article" at the end, with a Copy citation button. The site writes the citation for you in Bluebook form (as an unpublished manuscript while `status` is `draft` or `forthcoming`, otherwise as a web page). Check that it is what you want. A forthcoming piece stays an unpublished manuscript in the citation until you give the journal's citation with `citation:`. To replace it, add a line such as `citation: "Or Menashe, Note, *Title of the article*, Fordham J. Corp. & Fin. L. (forthcoming 2027)."` while the piece is forthcoming, and `citation: "Or Menashe, Note, *Title of the article*, 12 Fordham J. Corp. & Fin. L. 1 (2027)."` once the journal has given you the volume and the first page. Put asterisks around anything that should be italic. `pdf: "https://..."` (or a file you uploaded to `public`, such as `pdf: "/my-article.pdf"`) adds a Download PDF link, and `ssrn: "https://ssrn.com/abstract=..."` adds an SSRN link. Without those lines no such links appear. The Print or save as PDF button works on every article: in the window that opens, choose Save as PDF as the printer.

In the text, write `## Heading` (two pound signs, then a space), `*italics*` (asterisks touching the word), `[link text](https://address)`, and start a line with `>` for a quotation. A footnote is `[^1]` in the text plus a line `[^1]: your note` further down. Put a footnote at the end of a sentence, not on a heading. The article *Registered Agents of the DAO* shows headings, italics and footnotes; open its file on GitHub to see how they are written. It has no quotation and no link written as `[link text](https://address)`, so use the examples above for those.

To fold part of an article away behind a title that readers click (for example a section of objections and responses), wrap it like this. The empty lines matter, and the site stops with a message if one is missing:

```
<details open>
<summary>Objections and Responses</summary>

Write the text here, with headings, italics and footnotes as usual.

</details>
```

Take the word `open` out of the first line to start with the block closed. Keep the title on the `<summary>` line to plain words (no asterisks or footnote marks). Links and the contents list open a closed block when they point inside it, and everything is open when the article is printed.

To add a picture to an article: open `public`, click **Add file**, then **Upload files**, and drop in the picture (rename it first, with no spaces, for example `chart.jpg`). In the article write `![A short description of the picture](/chart.jpg)` where it belongs. The description is for people who cannot see the picture.

These happen on their own: the reading time; a small mark after outside links that says where they lead (an arrow for any outside site, scales for a court opinion, a building for a statute or regulation, a page for an SSRN paper or a PDF); a contents list beside the text (above it on a phone, with a Contents button that stays on screen while reading) for any article of about six minutes or more with at least three `##` sections; a thin progress bar, the time left and a Top button for longer pieces; footnotes shown in the right margin on wide screens (and as a small box that opens under the number on narrower ones); a small link icon beside each heading that copies the address of that section; a clean printable version; a "Keep reading" list of other articles at the bottom, chosen by shared topics; the RSS feed; and a link-preview picture with the article's title and your portrait.

If a setting is misspelled, a footnote has no matching note, or a date is impossible, the build stops and says which file and what to fix. The old site stays live.

## Add a video

Do the same in `src/content/videos` with this template. Paste the link from YouTube's Share button after `url:`. The description line is optional: delete the whole line if you do not want one, or replace the sample words with your own, because anything left in that line is published as it stands. Videos appear in a grid, newest first. Nothing loads from YouTube until a visitor clicks play.

```
---
title: "The title of your video"
date: 2026-10-12
url: https://youtu.be/abc123XYZ_0
description: "Optional. One or two sentences shown under the video."
draft: false
---
```

Six explainer videos by other creators are on the page for now (three on digital assets, three on how AI works). They use two extra lines: `credit:`, who made the video and when, which is shown instead of the date, and `group:`, the heading it is listed under. For those six, `date:` only sets the order. When you have your own videos, delete the six files whose `credit:` names someone else, and delete the file `src/content/pages/videos.md` to remove the sentence at the top of the Videos page, or edit only the words under its second line of three dashes. Your own videos need neither extra line. Any video that has a `group:` line is listed under that heading.

## Write the weekly newsletter

Each week's issue is a file in `src/content/newsletter`. It appears on the Writing page under "Weekly newsletter", on its own page, and in the RSS feed. Until the first issue is published, the page says "The first issue is coming soon."

1. Open `src`, then `content`, then `newsletter`, and click `_template.md`. Click the copy icon at the top right of the file (**Copy raw file**).
2. Click `newsletter` in the path at the top to go back to the folder. Click **Add file**, then **Create new file**.
3. Check that the path above the name box reads `ordavidmenashe / src / content / newsletter /`. Type a name for the week, with no spaces, ending in `.md`, for example `2026-10-20.md`. The name becomes the address: `ordavidmenashe.com/writing/newsletter/2026-10-20/`.
4. Click in the big box and paste. Change the `title:`, `date:` and `description:` lines. Delete the sample sentences under the second line of three dashes and write your issue there. The topic line is optional; delete it if the issue has no single topic.
5. Click **Commit changes**, keep "Commit directly to the main branch", and click **Commit changes** again.

Issues are numbered automatically in date order, so the first one is Issue 1. To pick the number yourself, add a line such as `issue: 7`. Headings, italics, links, quotations and footnotes work exactly as in an article. The site and your email service are separate: if you send the issue by email through Buttondown, paste the same text into a new email there. To change the sentence at the top of the newsletter page, open `src/content/pages/newsletter.md` and edit only the sentence below the second line of three dashes.

## Change the words on a page

- **Home, top of the page:** open `home.md`. Between the two lines of dashes: `eyebrow:` is the small line above the headline, `headline:` is the big headline, `buttonText:` and `buttonLink:` are the dark button and where it goes, and `linkText:` and `linkLink:` are the quieter link beside it. Under `credentials:` each background item has a `label:` (small) and a `text:` (larger); copy a pair of lines to add one, or delete a pair to remove one. Keep the words in quotation marks. The sentence under the headline is the text below the second line of dashes.
- **About:** open `about.md` and edit only the text below the second line of dashes. A line that starts with `## ` is a small section label.
- **What I’m working on now (the Now page, with a short preview on About):** open `now.md`. Each line that starts with a dash is one item; add, change or delete lines. The About page shows the first two items and a link to the Now page, which shows them all. Change the month in the `updated:` line each time you refresh the list, because it appears under the list as "Updated October 2026". To hide the preview, the Now page and the footer link, delete `now.md` or delete every item. Write the month in the `updated:` line as words, for example `updated: "November 2026"`; a date such as `2026-11-15` is shown as "November 2026".
- **The short bio on About:** visitors first see only the first paragraph of `about.md`, with a "Read the full bio" button for the rest. To show the whole bio at once, add the line `startShort: false` between the two lines of three dashes at the top of `about.md`. (With JavaScript turned off, the whole bio always shows.)
- **Email, LinkedIn, footer disclaimer and the other lines in `site.ts`:** change only the words between the single quotation marks, and keep both quotation marks and the comma. Do not type a straight apostrophe (') inside the words, as in it's or doesn't. The site reads it as the end of the sentence and the build stops. Type the curly apostrophe instead (it’s, doesn’t), or reword. The LinkedIn address must start with https://; copy it from your browser's address bar while you are on your profile.
- **Your photo** (it has a thin frame wherever it appears): open `src`, then `assets`, click **Add file**, then **Upload files**. GitHub keeps the file's name, so rename the new photo to exactly `or-menashe.jpg` on your computer first, then drop it in. It replaces the old one, and the Home page, About page and link-preview pictures all pick it up. It must be a real JPEG picture. A phone photo saved as HEIC stops the site from publishing, even if you rename the ending, so export it as JPEG first (in Photos or Preview, choose File, then Export). A portrait-shaped picture at least 1000 pixels wide works best. A photo taken on a phone often carries the place and time it was taken inside the file. The website's own copies have that removed, but the file you upload stays in your public repository, and GitHub keeps every earlier version, so replacing it later does not erase it. Before you upload, take a screenshot of the photo and upload that instead, which carries none, or ask Claude to remove it first. If Vercel shows Error after a photo change, the picture is the likely cause.
- **Delete an article or a video:** open the file, click the trash can icon, and commit. Do not delete `home.md`, `about.md`, `site.ts` or the photo. To remove something from those pages, edit the words instead.

## Turn on the newsletter signup

The signup form (on the Writing page, at the end of every article and issue, on the Contact page, and in the footer of the other pages) shows only when `newsletter:` in `site.ts` holds a form address. It is empty now, so no form appears. The form loads nothing from the newsletter service until someone subscribes.

1. Create a free account at buttondown.com and choose a username. As of October 2026 the free plan covers your first 100 subscribers. Past 100 you can keep collecting addresses but cannot send until you add billing and pick a paid plan, which starts at $9 a month. Check their pricing page for the current terms.
2. In Buttondown, open **Settings**, then **Embedding**, and copy the code under **Form**. Find the part that reads `action="https://buttondown.com/api/emails/embed-subscribe/yourname"`.
3. In `site.ts`, put only that address between the single quotation marks after `newsletter:`, so the line reads `newsletter: 'https://buttondown.com/api/emails/embed-subscribe/yourname',`. Click **Commit changes**.
4. Open the Writing page a minute or two later and check that the form appears. If the address does not start with https:// or contains spaces or quotation marks, the site will not publish and the message says so. The site cannot tell whether the username in the address is right. Subscribe once with your own email address and check that the confirmation email arrives. If it does not, compare the address in `site.ts` with the one under Settings, then Embedding in Buttondown.
5. To switch the form off, empty the quotation marks again.

Buttondown asks every new subscriber to confirm their address by email. Every email you send includes an unsubscribe link, so keep it.

## Link previews and search

Every page has a title, a description and a preview picture, so links look right on LinkedIn, Slack, iMessage and X. Each article gets its own picture automatically, and the Home, About and Contact pages share a general one with your portrait. If an article title has Hebrew, an emoji or another unusual symbol, its preview shows the general picture instead. LinkedIn keeps old previews for a while. To refresh one after you change an article, paste its address into LinkedIn's Post Inspector at linkedin.com/post-inspector. The site also lists itself for search engines at `/sitemap-index.xml`.

## If something goes wrong

- **A mistake in a file:** the build stops and the old site stays live. On Vercel, open **Deployments**, click the red one marked Error, and read the red lines under **Build Logs**. They name the file and, for most mistakes, say what to fix. Some wording is technical, so send the red lines to Claude if you are unsure.
- **Undo a change:** on Vercel, open **Deployments**, click the three dots next to the last good version, and click **Instant Rollback** (on the free plan this may only go back one version). After a rollback, Vercel may stop publishing new changes automatically. If a later change does not show up, look on **Deployments** for a banner or a **Promote** button on the newest row, or ask Claude. For anything older than the last good version, ask Claude to restore a save point from **Commits** on GitHub.
- **A change does not show up:** wait two minutes, then refresh with Cmd+Shift+R. On Vercel's **Deployments** page the top row should say Ready.

## Things that go out of date

Use GitHub's search box to find each phrase and check every file it lists.

| Search for | Where it appears | Change it |
|---|---|---|
| third-year | `about.md` and `home.md` | when you graduate |
| expected May 2027 | `about.md` and `home.md` (`credentials:`) | after you graduate |
| a law student at Fordham Law | `about.md` (the `description:` line at the top) and `site.ts` | when you graduate |
| forthcoming | `about.md`, and in `registered-agents-of-the-dao.md` the `kicker:` line, the `status:` line (change it to `published`), the `citation:` line (replace it with the full citation, adding the volume and first page the journal gives you) and the italic first paragraph. A search for the word also lists files under `src/lib` and `src/styles` and the `_template.md` files: leave those alone, and `content.config.ts` too | when the note is published |
| The current draft is on this site | `about.md` | when the note is published, or if you hide, rename or delete the article (the link would break) |
| Senior Notes Editor | `about.md`, `now.md`, and `home.md` (`credentials:`) | when your term as editor ends |
| Wyoming Stable Token Commission | `about.md`, `now.md`, and `home.md` (`credentials:`) | when that role ends |
| DeFi Education Fund | `about.md` and `now.md` | when you start, and again when it ends |
| Fidelity National Financial | `about.md` | next summer |
| Harvey | `about.md` and `home.md` (`credentials:`) | when that role ends |
| Legal IQ | `about.md` | if you stop working on it |
| (not searchable) the `updated:` line in `now.md` | `now.md` | each time you change that list |

## Turn on visitor counts

The site is set up to count visits with Vercel Web Analytics. It uses no cookies, so no cookie banner is needed, and it only counts the live site, not previews. Nothing is counted until you switch it on once:

1. In Vercel, open your project, then the **Analytics** tab, and click **Enable**.
2. Wait for the site to publish again (any change to any file does it), then open the live site once. The first visits show up in the Analytics tab within a few minutes.

On the free plan Vercel counts up to 50,000 events a month, and the free plan is meant for personal, non-commercial sites. If the count ever passes that, Vercel says so in the dashboard and stops recording until the next month.

## Change the Colophon page

The Colophon page (linked from the footer) is the file `src/content/pages/colophon.md`. Edit only the words below the second line of three dashes. It says the site counts visits with Vercel Web Analytics and sends the newsletter through Buttondown. If you decide not to use either, delete that sentence, or the page will say something that is not true.

## Search and link previews

Search (the magnifying glass in the header, or Ctrl+K on Windows and Cmd+K on a Mac) is built each time the site is published, so new articles and pages appear in it by themselves. Nothing about it needs setting up. If you ever see "Search is not available right now", the build could not make the search index; the site itself is unaffected, and publishing again usually fixes it.

When a visitor with a mouse rests on a link to another page of your site inside an article or page, a small card shows that page's title, status and description. These come from each page's own `title:` and `description:` lines, so they stay current without any work.
