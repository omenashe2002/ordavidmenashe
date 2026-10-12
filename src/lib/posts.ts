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

/** Approximate reading time in minutes, at about 220 words a minute. */
export function readingMinutes(body: string | undefined) {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
