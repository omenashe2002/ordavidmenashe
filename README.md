# ordavidmenashe

The personal website of Or Menashe: long-form writing and occasional videos on crypto, AI, and law.

To add or change anything, read [HOW-TO-UPDATE.md](HOW-TO-UPDATE.md).

## How it is built

- A static site made with [Astro](https://astro.build). There is no database and no server.
- Articles are Markdown files in `src/content/writing/`. Videos are small Markdown files with a YouTube link in `src/content/videos/`. The About page and the Home introduction are in `src/content/pages/`.
- Site-wide settings (name, email, LinkedIn, topics, footer disclaimer) are in `src/site.ts`. Colors and type are in `src/styles/global.css`.
- Hosted on Vercel, which rebuilds and publishes the site whenever the `main` branch changes.

## Running it on your own computer

You need Node.js 22 or newer.

```
npm install
npm run dev
```

Then open the address it prints. `npm run build` makes the finished site in `dist/`.
