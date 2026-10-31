// The designed edition of the paper "Who Pays When the Agent Pays?", with its figures and its interactive simulator.
// The page itself is the file src/papers/who-pays-when-the-agent-pays.html, published as it is at
// /papers/who-pays-when-the-agent-pays/. The only thing added here is the visit counter, which (like the rest of
// the site) is switched on for the live site only, never for previews.
import paper from '../../../papers/who-pays-when-the-agent-pays.html?raw';

const countVisits = process.env.VERCEL_ENV === 'production';
const counter = countVisits
  ? '<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script>\n<script defer src="/_vercel/insights/script.js"></script>\n'
  : '';

export function GET() {
  return new Response(paper.replace('<!--analytics-->\n', counter), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
