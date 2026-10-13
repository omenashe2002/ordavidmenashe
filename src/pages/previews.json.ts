import { getEntry } from 'astro:content';
import { formatDate, getPosts, STATUS_LABEL } from '../lib/posts';
import { getIssues, issueLabel } from '../lib/issues';

// The short summaries shown when a visitor with a mouse points at a link to another page of this site.
// One small file, listing every page by its address, made while the site is built: /previews.json.
interface Preview {
  title: string;
  description: string;
  label: string;
}

export async function GET() {
  const previews: Record<string, Preview> = {};

  for (const post of await getPosts()) {
    previews[`/writing/${post.id}/`] = {
      title: post.data.title,
      description: post.data.description,
      label: [post.data.status ? STATUS_LABEL[post.data.status] : 'Article', formatDate(post.data.date)].join(' · '),
    };
  }
  const issues = await getIssues();
  for (const issue of issues) {
    previews[`/writing/newsletter/${issue.id}/`] = {
      title: issue.data.title,
      description: issue.data.description,
      label: `${issueLabel(issue, issues)} · ${formatDate(issue.data.date)}`,
    };
  }
  for (const [id, address] of [['about', '/about/'], ['now', '/now/'], ['colophon', '/colophon/']] as const) {
    const page = await getEntry('pages', id);
    if (page) previews[address] = { title: page.data.title, description: page.data.description, label: 'Page' };
  }
  previews['/writing/'] = { title: 'Writing', description: 'Articles and a weekly newsletter on digital assets, DeFi, AI, and law.', label: 'Section' };
  previews['/videos/'] = { title: 'Videos', description: 'Videos on digital assets, AI, and law, picked by Or Menashe.', label: 'Section' };
  previews['/contact/'] = { title: 'Contact', description: 'How to reach Or Menashe.', label: 'Page' };
  previews['/writing/newsletter/'] = { title: 'Weekly newsletter', description: 'A weekly note on digital assets, DeFi, AI, and law.', label: 'Section' };

  return new Response(JSON.stringify(previews), { headers: { 'Content-Type': 'application/json' } });
}
