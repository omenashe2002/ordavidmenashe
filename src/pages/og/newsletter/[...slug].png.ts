import type { APIContext } from 'astro';
import { getIssues, issueLabel, type Issue } from '../../../lib/issues';
import { generalCard, shareCard } from '../../../lib/share-card';

// One share-card picture per newsletter issue, at /og/newsletter/<issue-name>.png.
export async function getStaticPaths() {
  const issues = await getIssues();
  return issues.map((issue) => ({ params: { slug: issue.id }, props: { issue, label: issueLabel(issue, issues) } }));
}

export async function GET({ props }: APIContext) {
  const { issue, label } = props as { issue: Issue; label: string };
  let image: Uint8Array;
  try {
    image = new Uint8Array(await shareCard({ title: issue.data.title, kicker: label, tags: issue.data.tags }));
  } catch (error) {
    console.warn(`The share card for newsletter issue "${issue.id}" could not be drawn, so the general card is used instead. ${(error as Error).message}`);
    image = new Uint8Array(await generalCard());
  }
  return new Response(image, { headers: { 'Content-Type': 'image/png' } });
}
