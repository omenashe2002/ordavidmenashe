import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TAGS } from './site';

// Every article is a Markdown file in src/content/writing/. The block of settings at the very top of each
// file (between the two lines of dashes) must follow the rules below, or the site will refuse to build
// and say which file and which field needs fixing.
const writing = defineCollection({
  // Files whose names start with an underscore (like _template.md) are never published.
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.enum(TAGS)).min(1),
    draft: z.boolean().default(false), // true = keep it unpublished while you write
  }),
});

export const collections = { writing };
