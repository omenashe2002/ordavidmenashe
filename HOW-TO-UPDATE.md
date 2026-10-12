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
- **draft**: `true` keeps the article off the website while you write. The file is still visible on GitHub. `false` publishes it.

In the text, write `## Heading` (two pound signs, then a space), `*italics*` (asterisks touching the word), `[link text](https://address)`, and start a line with `>` for a quotation. A footnote is `[^1]` in the text plus a line `[^1]: your note` further down. The sample article shows each one.

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

- **About page and Home introduction:** open `src/content/pages/about.md` or `home.md`, click the pencil icon, edit only the text below the second line of three dashes, and click **Commit changes**.
- **Email and LinkedIn:** the lines that start with `email:` and `linkedin:` in `src/site.ts`. Change only the words between the single quotation marks, and keep both quotation marks and the comma.
- **Delete:** open the file, click the trash can icon, and commit. Before you launch, delete `sample-article.md` and `sample-video.md`.

## If something goes wrong

- **A mistake in a file:** the build stops and the old site stays live. On Vercel, open **Deployments**, click the red one marked Error, and read the red lines under **Build Logs**. They name the file and say what to fix. Send them to Claude if you are unsure.
- **Undo a change:** on Vercel, open **Deployments**, click the three dots next to the last good version, and click **Instant Rollback** (on the free plan this may only go back one version). For anything older, ask Claude to restore a save point from **Commits** on GitHub.

## Things that go out of date

| Phrase | Where | Change it |
|---|---|---|
| "third-year law student" | `about.md` and `home.md` | when you graduate |
| "forthcoming" | `about.md` and `home.md` | when the note is published |
| "This semester I am a law clerk at the Wyoming Stable Token Commission" | `about.md` | when that role ends |
| "In the spring I will join the DeFi Education Fund" | `about.md` | when you start |
| "This past summer, as a law clerk at Fidelity National Financial" | `about.md` | next summer |
| "student ambassador for Harvey" | `about.md` | when that role ends |
| "expected May 2027" | `about.md` | after you graduate |
| "a law student at Fordham Law" | `about.md` (top) and `src/site.ts` | when you graduate |

Use GitHub's search box to find each phrase and check every file it lists.
