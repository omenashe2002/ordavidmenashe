/**
 * When an article is printed, each outside link is followed by its address (see the print styles in global.css).
 * A link whose visible words already are the address is marked here, so the address is not printed twice.
 */
const plain = (value: string) => value.trim().replace(/^https?:\/\//i, '').replace(/\/$/, '').toLowerCase();

for (const link of document.querySelectorAll<HTMLAnchorElement>('.prose a[href^="http"]')) {
  const shown = plain(link.textContent ?? '');
  if (shown && !/\s/.test(shown) && shown.includes('.') && plain(link.href).startsWith(shown)) link.dataset.bareUrl = '';
}
