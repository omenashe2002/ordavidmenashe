import type { MarkdownHeading } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { TAGS } from '../site';

export type Post = CollectionEntry<'writing'>;

/** All published articles, newest first. Drafts are left out. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );
}

/** The part of a topic's web address: "Crypto" becomes "crypto". */
export const tagSlug = (tag: string) => tag.toLowerCase();

/** Only topics that at least one published article uses, in the order listed in src/site.ts. */
export function tagsInUse(posts: Post[]) {
  return TAGS.filter((tag) => posts.some((post) => post.data.tags.includes(tag)));
}

/** "October 12, 2026". Dates are read as UTC so they never shift by a day. */
export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/** The label shown for an article's status setting. */
export const STATUS_LABEL = { draft: 'Draft', forthcoming: 'Forthcoming', published: 'Published' } as const;
export type Status = keyof typeof STATUS_LABEL;

/** Approximate reading time in minutes, at about 220 words a minute. */
export function readingMinutes(body: string | undefined) {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Up to `limit` other articles to read next: the ones sharing the most topics first, then the most recent. */
export function relatedPosts(current: Post, all: Post[], limit = 3): Post[] {
  const shared = (post: Post) => post.data.tags.filter((tag) => current.data.tags.includes(tag)).length;
  return all
    .filter((post) => post.id !== current.id)
    .sort((a, b) => shared(b) - shared(a) || b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, limit);
}

export interface TocItem {
  slug: string;
  text: string;
  children: { slug: string; text: string }[];
}

/** The headings of an article as a two-level outline: "##" headings with their "###" headings underneath. */
export function tableOfContents(headings: MarkdownHeading[]): TocItem[] {
  const items: TocItem[] = [];
  for (const heading of headings) {
    if (heading.depth === 2) items.push({ slug: heading.slug, text: heading.text, children: [] });
    else if (heading.depth === 3 && items.length > 0) items[items.length - 1].children.push({ slug: heading.slug, text: heading.text });
  }
  return items;
}

/** Search results cut long titles off, so a very long one is shortened to the part before its colon for the browser tab. */
export function shortTabTitle(title: string): string | undefined {
  const [beforeColon] = title.split(':');
  return title.length > 60 && beforeColon.length >= 12 && beforeColon !== title ? beforeColon.trim() : undefined;
}
