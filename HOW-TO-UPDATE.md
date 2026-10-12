# How to update my site

Your site is a set of plain text files on GitHub. When a file changes, Vercel rebuilds and publishes the site, usually within a minute. You can make every change below yourself on github.com, or paste the text to Claude and say "publish this".

Your repository: https://github.com/omenashe2002/ordavidmenashe

## Add an article

1. In the repository, open `src/content/writing` and copy everything in `_template.md`.
2. Click **Add file**, then **Create new file**.
3. In the name box, type a short name with no spaces that ends in `.md`, for example `my-first-post.md`. The name becomes the address: `ordavidmenashe.com/writing/my-first-post/`.
4. Paste the template, change the settings at the top, and write your article below the second line of three dashes.
5. Click **Commit changes**, keep "Commit directly to the main branch", and click **Commit changes** again. Refresh your site in a minute.

| Setting | What to write |
|---|---|
| title | The title, in quotation marks. |
| date | Year-month-day: `2026-10-12`. |
| description | One or two sentences, in quotation marks. They appear in the article list and in link previews. |
| tags | One or more of Crypto, AI, Law, Other, in square brackets: `[Law, Crypto]`. |
| draft | `true` hides the article while you write. `false` publishes it. |

In the text, leave a blank line between paragraphs, use `##` for a heading, put asterisks around a word for *italics*, and write `[^1]` for a footnote with a matching line `[^1]: your note` further down. The sample article shows all of these.

## Add a video

Do the same in `src/content/videos` with its `_template.md`. On YouTube, click Share, copy the link, and paste it after `url:`. Any normal YouTube link works, including one with a timestamp.

## Edit the About page, the Home introduction, or your contact details

Open `src/content/pages/about.md` or `home.md`. Your email and LinkedIn are the two lines near the top of `src/site.ts`. For any existing file, click the pencil icon, make the change, and click **Commit changes**.

## Delete something

Open the file, click the trash can icon, and commit. Before you launch, delete `sample-article.md` and `sample-video.md`.

## If something goes wrong

- **A mistake in a file:** the build stops, the old site stays live, and Vercel usually emails you. The message names the file and says what to fix. Fix it, or send the message to Claude.
- **Undo a change:** on Vercel, open your project, click **Deployments**, click the three dots next to the last good version, and click **Instant Rollback**. On the free plan this may only go back one version. For anything older, ask Claude to restore a save point. Every change is saved under **Commits** on GitHub.

## Things that go out of date

- "This semester I am a law clerk at the Wyoming Stable Token Commission": the role ends in November 2026.
- "In the spring I will join the DeFi Education Fund": change it when you start in January 2027.
- "third-year law student": change it when you graduate in May 2027.
- "forthcoming ... in 2027": update it when the note is published.
- "student ambassador for Harvey": remove it when the role ends.
