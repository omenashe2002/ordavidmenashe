import { defineConfig } from 'astro/config';

// "site" is the final web address. It is used for the sitemap, RSS feed and share previews.
export default defineConfig({
  site: 'https://ordavidmenashe.com',
  markdown: {
    // Code in articles is colored by the site's own light and dark styles (see global.css).
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
