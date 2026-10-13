import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

// Keeps a legal citation together: a section sign is never left alone at the end of a line ("§ 12", "§§ 5, 12").
const keepSectionSignWithNumber = {
  name: 'keep-section-sign-with-number',
  text(node, ctx) {
    const value = node.value.replace(/(§+) /g, '$1\u00A0');
    if (value !== node.value) ctx.replaceNode(node, { type: 'text', value });
  },
};

// "site" is the final web address. It is used for the sitemap, RSS feed and share previews.
export default defineConfig({
  site: 'https://ordavidmenashe.com',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  markdown: {
    processor: satteri({ mdastPlugins: [keepSectionSignWithNumber] }),
    // Code in articles is colored by the site's own light and dark styles (see global.css).
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
