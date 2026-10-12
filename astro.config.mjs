import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// "site" is the final web address. It is used for the sitemap, RSS feed and share previews.
export default defineConfig({
  site: 'https://ordavidmenashe.com',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  markdown: {
    // Code in articles is colored by the site's own light and dark styles (see global.css).
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
