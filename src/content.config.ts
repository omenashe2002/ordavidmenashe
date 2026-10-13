import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TAGS } from './site';
import { checkContentFolder, checkContentPlaces, checkSiteSettings } from './lib/check-content';
import { parseYouTube } from './lib/youtube';

// Stops the build with a plain-English message if an article or video file is named or written in a way
// that would otherwise be skipped silently or published with the wrong date.
checkContentPlaces();
checkSiteSettings();
checkContentFolder('src/content/writing');
checkContentFolder('src/content/videos');
checkContentFolder('src/content/newsletter');

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
// The optional status lines: whether the piece is a draft, forthcoming, or published, and when each stage happened.
const STATUSES = ['draft', 'forthcoming', 'published'] as const;
const optionalDate = (name: string) =>
  z.coerce.date({ error: `${name} must be a date written as year-month-day, for example: ${name}: 2026-03-01` }).optional();
const webAddress = (name: string) =>
  z
    .string({ error: `${name} must be a web address in quotation marks, for example: ${name}: "https://example.com/file.pdf"` })
    .trim()
    .refine((value) => /^https:\/\/[^\s"'<>]+$/.test(value) || /^\/[^\s"'<>]+$/.test(value), {
      error: `${name} must be a full web address starting with https:// (or a file in public/ starting with a slash, such as /my-article.pdf), with no spaces.`,
    })
    .optional();

const writing = defineCollection({
  // Files whose names start with an underscore (like _template.md) are never published.
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/writing' }),
  schema: z
    .object({
      title: z
        .string({ error: 'Add a title line at the top of the file, for example: title: "My article"' })
        .trim()
        .min(1, { error: 'The title line is empty. Write the title between the quotation marks.' }),
      date: z.coerce.date({ error: 'Add a date line at the top of the file, for example: date: 2026-10-12' }),
      description: z
        .string({ error: 'Add a description line at the top of the file, for example: description: "One or two sentences."' })
        .trim()
        .min(1, { error: 'The description line is empty. Write one or two sentences between the quotation marks.' }),
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
      status: z
        .preprocess((value) => (typeof value === 'string' ? value.trim().toLowerCase() : value), z.enum(STATUSES, { error: `status must be one of: ${STATUSES.join(', ')}` }))
        .optional(), // shows a small label (Draft, Forthcoming, Published) beside the dates
      draftDate: optionalDate('draftDate'), // when the draft was written, shown as "Draft of March 1, 2026"
      updatedDate: optionalDate('updatedDate'), // when the piece was last revised, shown as "Updated ..."
      citation: z.string().trim().min(1, { error: 'The citation line is empty. Write the full citation between quotation marks, or delete the line.' }).optional(), // replaces the automatic citation; *asterisks* make italics
      pdf: webAddress('pdf'), // adds a "Download PDF" link
      ssrn: webAddress('ssrn'), // adds an "SSRN" link
    })
    // Each date is checked against the others, so a page never shows dates that contradict each other.
    .refine((data) => !data.draftDate || data.draftDate <= data.date, {
      path: ['draftDate'],
      error: 'draftDate is after date. The draft must be written before the date the piece is posted (date).',
    })
    .refine((data) => !data.updatedDate || data.updatedDate >= data.date, {
      path: ['updatedDate'],
      error: 'updatedDate is before date. A revision cannot come before the date the piece was posted (date).',
    }),
});

// Every weekly newsletter issue is a Markdown file in src/content/newsletter/. It is shown under Writing, in its own
// section, and has the same settings as an article, plus an optional issue number (otherwise issues are counted by date).
const newsletter = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/newsletter' }),
  schema: z.object({
    title: z
      .string({ error: 'Add a title line at the top of the file, for example: title: "This week: stablecoins"' })
      .trim()
      .min(1, { error: 'The title line is empty. Write the title between the quotation marks.' }),
    date: z.coerce.date({ error: 'Add a date line at the top of the file, for example: date: 2026-10-20' }),
    description: z
      .string({ error: 'Add a description line at the top of the file, for example: description: "One sentence on this issue."' })
      .trim()
      .min(1, { error: 'The description line is empty. Write one sentence between the quotation marks.' }),
    issue: z.coerce.number({ error: 'issue must be a number, for example: issue: 3' }).int().positive().optional(),
    tags: z
      .preprocess(
        (value) => (typeof value === 'string' ? value.split(',').map((item) => item.trim()).filter(Boolean) : value),
        z.array(topic, { error: 'tags must be a list of topics in square brackets, for example: tags: [Law]' }),
      )
      .default([])
      .transform((tags) => [...new Set(tags)]),
    draft: z.boolean({ error: 'draft must be true or false, with no quotation marks' }).default(false),
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
    credit: z.string().optional(), // for a video by someone else: who made it and when, shown instead of the date
    group: z.string().optional(), // a heading to list the video under on the Videos page
    draft: z.boolean({ error: 'draft must be true or false, with no quotation marks' }).default(false),
  }),
});

// Ordinary pages written in Markdown: the About page (about.md) and the top of the Home page (home.md).
// The extra lines are only used by home.md (and "updated" by now.md).
const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/pages' }),
  // strictObject: a misspelled setting (such as "buttonlink") stops the build instead of being ignored.
  schema: z.strictObject({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.string().optional(), // now.md only: the month shown as "Updated ..."
    eyebrow: z.string().optional(), // the small line above the big headline
    headline: z.string().optional(), // the big headline
    buttonText: z.string().optional(), // the main button
    buttonLink: z.string().optional(),
    linkText: z.string().optional(), // the quieter link beside the button
    linkLink: z.string().optional(),
    credentials: z.array(z.object({ label: z.string(), text: z.string() })).optional(), // the row under the headline
  }),
});

export const collections = { writing, newsletter, videos, pages };
