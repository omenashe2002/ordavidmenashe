import { getCollection, type CollectionEntry } from 'astro:content';

export type Issue = CollectionEntry<'newsletter'>;

/** All published newsletter issues, newest first. Drafts are left out. */
export async function getIssues(): Promise<Issue[]> {
  const issues = await getCollection('newsletter', ({ data }) => !data.draft);
  return issues.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );
}

/** An issue's number: the "issue:" line if the file has one, otherwise its place in date order (the first issue is 1). */
export function issueNumber(issue: Issue, all: Issue[]): number {
  if (issue.data.issue) return issue.data.issue;
  const oldestFirst = [...all].reverse();
  return oldestFirst.findIndex((other) => other.id === issue.id) + 1;
}

/** "Weekly newsletter, issue 3" */
export function issueLabel(issue: Issue, all: Issue[]): string {
  return `Weekly newsletter \u00b7 Issue ${issueNumber(issue, all)}`;
}
