import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../site';

export type Issue = CollectionEntry<'newsletter'>;

/** All published newsletter issues, newest first. Drafts are left out. */
export async function getIssues(): Promise<Issue[]> {
  const issues = await getCollection('newsletter', ({ data }) => !data.draft);
  return issues.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );
}

/**
 * An issue's number: the "issue:" line if the file has one, otherwise its place in date order (the first issue is 1).
 * A welcome post (issue: 0) is not counted, so the first weekly issue is still Issue 1.
 */
export function issueNumber(issue: Issue, all: Issue[]): number {
  if (issue.data.issue !== undefined) return issue.data.issue;
  const oldestFirst = all.filter((other) => other.data.issue !== 0).reverse();
  return oldestFirst.findIndex((other) => other.id === issue.id) + 1;
}

/** "If Only I Knew \u00b7 Issue 3", or "If Only I Knew \u00b7 Welcome" for a welcome post (the name comes from src/site.ts) */
export function issueLabel(issue: Issue, all: Issue[]): string {
  const number = issueNumber(issue, all);
  return `${SITE.newsletterName} \u00b7 ${number === 0 ? 'Welcome' : `Issue ${number}`}`;
}
