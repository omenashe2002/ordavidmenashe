import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TAGS } from './site';
import { checkContentFolder, checkContentPlaces } from './lib/check-content';
import { parseYouTube } from './lib/youtube';

// Stops the build with a plain-English message if an article or video file is named or written in a way
// that would otherwise be skipped silently or published with the wrong date.
checkContentPlaces();
checkContentFolder('src/content/writing');
checkContentFolder('src/content/videos');

// A topic may be typed in any capitalization ("crypto"), and is stored the way it is spelled in src/site.ts.
const findTopic = (value: string) => TAGS.find((tag) => tag.toLowerCase() === value.trim().toLowerCase());
const topic = z
  .string()
  .refine((value) => findTopic(value) !== undefined, {
    error: (issue) => `"${String(issue.input)}" is not a topic on this site. Use only: ${TAGS.join(', ')}.`,
  })
  .transform((value) => findTopic(value)!);

// Every article is a Markdown file in src/content/writing/. The block of settings at the very top of each
// file (between the two lines of dashes) must follow the rules below, or the site will refuse to build
// and say which file and which field needs fixing.
const writing = defineCollection({
  // Files whose names start with an underscore (like _template.md) are never published.
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string({ error: 'Add a title line at the top of the file, for example: title: "My article"' }),
    date: z.coerce.date({ error: 'Add a date line at the top of the file, for example: date: 2026-10-12' }),
    description: z.string({ error: 'Add a description line at the top of the file, for example: description: "One or two sentences."' }),
    tags: z
      .preprocess(
        (value) => (typeof value === 'string' ? value.split(',').map((item) => item.trim()).filter(Boolean) : value), // tags: Law, Crypto
        z
          .array(topic, { error: 'Add a tags line at the top of the file, for example: tags: [Law]' })
          .min(1, { error: 'Add at least one topic, for example: tags: [Law]' }),
      )
      .transform((tags) => [...new Set(tags)]),
    draft: z.boolean({ error: 'draft must be true or false, with no quotation marks' }).default(false), // true = keep it unpublished while you write
    featured: z.boolean({ error: 'featured must be true or false, with no quotation marks' }).default(false), // true = shown as a large panel on the Home page and the Writing page
    kicker: z.string().optional(), // a short line above the title (article page and featured panels), for example: Forthcoming in the Fordham Journal
  }),
});

// Every video is a small Markdown file in src/content/videos/ with the YouTube link in its settings block.
const videos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string({ error: 'Add a title line at the top of the file, for example: title: "My video"' }),
    date: z.coerce.date({ error: 'Add a date line at the top of the file, for example: date: 2026-10-12' }),
    url: z
      .string({ error: 'Add a url line at the top of the file, for example: url: https://youtu.be/abc123XYZ_0' })
      .refine((value) => parseYouTube(value) !== undefined, {
        error: 'That is not a link to a single YouTube video. Copy the address from YouTube\'s Share button, for example: https://youtu.be/abc123XYZ_0',
      }),
    description: z.string().optional(),
    draft: z.boolean({ error: 'draft must be true or false, with no quotation marks' }).default(false),
  }),
});

// Ordinary pages written in Markdown: the About page (about.md) and the top of the Home page (home.md).
// The extra lines are only used by home.md.
const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string().optional(), // the small line above the big headline
    headline: z.string().optional(), // the big headline
    buttonText: z.string().optional(), // the main button
    buttonLink: z.string().optional(),
    linkText: z.string().optional(), // the quieter link beside the button
    linkLink: z.string().optional(),
    credentials: z.array(z.object({ label: z.string(), text: z.string() })).optional(), // the row under the headline
  }),
});

export const collections = { writing, videos, pages };
