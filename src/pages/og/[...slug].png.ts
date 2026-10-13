import type { APIContext } from 'astro';
import { getPosts, type Post } from '../../lib/posts';
import { generalCard, shareCard } from '../../lib/share-card';

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
    // If a title has a character the card font cannot draw (Hebrew, an emoji, an unusual symbol), share the general
    // card instead of a card full of empty boxes, and never stop the build.
    console.warn(`The share card for "${post.id}" could not be drawn, so the general card is used instead. ${(error as Error).message}`);
    image = new Uint8Array(await generalCard());
  }
  return new Response(image, { headers: { 'Content-Type': 'image/png' } });
}
