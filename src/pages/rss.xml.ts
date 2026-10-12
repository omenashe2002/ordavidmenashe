import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { SITE } from '../site';

// The feed that readers and feed apps use to follow new articles: /rss.xml
export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/writing/${post.id}/`,
      categories: [...post.data.tags],
    })),
    customData: '<language>en-us</language>',
  });
}
