import { getCollection, type CollectionEntry } from 'astro:content';

export type Video = CollectionEntry<'videos'>;

/** All published videos, newest first. Drafts are left out. */
export async function getVideos(): Promise<Video[]> {
  const videos = await getCollection('videos', ({ data }) => !data.draft);
  return videos.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );
}
