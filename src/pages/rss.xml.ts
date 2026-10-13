import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { getIssues } from '../lib/issues';
import { SITE } from '../site';

// The feed that readers and feed apps use to follow new writing and newsletter issues: /rss.xml
export async function GET(context: APIContext) {
  const [posts, issues] = await Promise.all([getPosts(), getIssues()]);
  const items = [
    ...posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/writing/${post.id}/`,
      categories: [...post.data.tags],
    })),
    ...issues.map((issue) => ({
      title: issue.data.title,
      pubDate: issue.data.date,
      description: issue.data.description,
      link: `/writing/newsletter/${issue.id}/`,
      categories: ['Newsletter', ...issue.data.tags],
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items,
    customData: '<language>en-us</language>',
  });
}
