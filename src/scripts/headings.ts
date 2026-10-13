/**
 * A small link icon beside each heading in an article. It copies the address of that section.
 * Added by script, so without JavaScript the headings are simply headings.
 */
import { announce, copyToClipboard } from './ui';

for (const heading of document.querySelectorAll<HTMLHeadingElement>('.prose :is(h2, h3)[id]')) {
  if (heading.id === 'footnote-label') continue; // the hidden "Footnotes" heading
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'heading-link';
  button.setAttribute('aria-label', `Copy link to this section: ${heading.textContent?.trim() ?? ''}`);
  button.dataset.target = heading.id;
  button.innerHTML =
    '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/></svg>';
  heading.append(button);
}

document.addEventListener('click', async (event) => {
  const button = (event.target as Element | null)?.closest<HTMLButtonElement>('.heading-link');
  if (!button) return;
  const url = new URL(location.href);
  url.hash = button.dataset.target ?? '';
  const copied = await copyToClipboard(url.href);
  // The address bar shows the section too, so the reader can also copy it by hand.
  history.replaceState(null, '', url.href);
  button.classList.add('is-done');
  window.setTimeout(() => button.classList.remove('is-done'), 1800);
  announce(copied ? 'Link to this section copied' : 'The address bar now shows the link to this section');
});
