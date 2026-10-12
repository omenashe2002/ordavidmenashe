import fs from 'node:fs';
import path from 'node:path';
import type { APIContext } from 'astro';
import { getPosts, type Post } from '../../lib/posts';
import { shareCard } from '../../lib/share-card';

// One share-card picture per article, at /og/<article-name>.png (see src/lib/share-card.ts).
export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export async function GET({ props }: APIContext) {
  const { post } = props as { post: Post };
  let image: Uint8Array;
  try {
    image = new Uint8Array(await shareCard({ title: post.data.title, kicker: post.data.kicker, tags: post.data.tags }));
  } catch (error) {
    // If a title ever contains something the card cannot draw, share the general card instead of stopping the build.
    console.warn(`Could not draw the share card for "${post.id}", using the general card instead.`, error);
    image = new Uint8Array(fs.readFileSync(path.resolve('public/og.png')));
  }
  return new Response(image, { headers: { 'Content-Type': 'image/png' } });
}
