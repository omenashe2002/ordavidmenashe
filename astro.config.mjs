import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
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

// The Now page exists only while src/content/pages/now.md has something in it (see src/pages/now/index.astro).
const hasNowPage = () => {
  try {
    return readFileSync('src/content/pages/now.md', 'utf8').replace(/^---[\s\S]*?\n---/, '').trim().length > 0;
  } catch {
    return false;
  }
};

// After the pages are built, this reads them and writes a search index into dist/pagefind (see src/scripts/search.ts).
// If anything goes wrong here the site is still published; search simply says it is not available.
const searchIndex = {
  name: 'search-index',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      try {
        const { createIndex, close } = await import('pagefind');
        const { index, errors } = await createIndex({ forceLanguage: 'en' });
        if (!index) throw new Error(errors.join(' '));
        const output = fileURLToPath(dir);
        await index.addDirectory({ path: output });
        await index.writeFiles({ outputPath: `${output}pagefind` });
        await close();
      } catch (error) {
        logger.warn(`The search index could not be made, so search will say it is unavailable. ${error.message}`);
      }
    },
  },
};

// "site" is the final web address. It is used for the sitemap, RSS feed and share previews.
export default defineConfig({
  site: 'https://ordavidmenashe.com',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') && !(page.endsWith('/now/') && !hasNowPage()) }), searchIndex],
  markdown: {
    processor: satteri({ mdastPlugins: [keepSectionSignWithNumber] }),
    // Code in articles is colored by the site's own light and dark styles (see global.css).
    shikiConfig: {
      themes: { light: 'github-light-high-contrast', dark: 'github-dark-high-contrast' },
      defaultColor: false,
    },
  },
});
