/**
 * A small preview card (title, status, description) when a visitor with a mouse points at a link to another page of
 * this site. It is shown for links inside articles and pages only, never for outside sites, and never on touch screens.
 * The summaries come from /previews.json, which is fetched only when the first preview is wanted.
 */
interface Preview {
  title: string;
  description: string;
  label: string;
}

const SCOPE = '.prose a[href], .sidenote a[href], .note-box a[href]';
const WAIT = 350; // how long the pointer rests on a link before the card appears
const LEAVE = 180; // how long the card stays when the pointer moves away, so it can be moved onto the card

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let loading: Promise<Record<string, Preview>> | undefined;
  const load = () => (loading ??= fetch('/previews.json').then((response) => (response.ok ? response.json() : {})).catch(() => ({})));

  let card: HTMLElement | undefined;
  let current: HTMLAnchorElement | undefined;
  let showTimer: number | undefined;
  let hideTimer: number | undefined;

  /** The address of a link to another page of this site, as it appears in /previews.json, or undefined. */
  function target(link: HTMLAnchorElement): string | undefined {
    if (link.matches('[data-footnote-ref], [data-footnote-backref], .sidenote-back, .heading-link')) return undefined;
    if (link.origin !== location.origin || link.pathname === location.pathname) return undefined;
    return link.pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');
  }

  function hide() {
    window.clearTimeout(showTimer);
    window.clearTimeout(hideTimer);
    current?.removeAttribute('aria-describedby');
    card?.remove();
    card = undefined;
    current = undefined;
  }

  async function show(link: HTMLAnchorElement) {
    const address = target(link);
    if (!address) return;
    const preview = (await load())[address];
    if (!preview || link !== current) return; // no summary, or the pointer has moved on
    card?.remove();
    card = document.createElement('div');
    card.className = 'link-preview';
    card.id = 'link-preview';
    card.setAttribute('role', 'tooltip');
    const label = document.createElement('p');
    label.className = 'link-preview-label';
    label.textContent = preview.label;
    const title = document.createElement('p');
    title.className = 'link-preview-title';
    title.textContent = preview.title;
    const text = document.createElement('p');
    text.className = 'link-preview-text';
    text.textContent = preview.description;
    card.append(label, title, text);
    document.body.append(card);
    link.setAttribute('aria-describedby', card.id);

    const rect = link.getBoundingClientRect();
    const width = card.offsetWidth;
    const left = Math.min(Math.max(rect.left, 16), document.documentElement.clientWidth - width - 16);
    const below = rect.bottom + card.offsetHeight + 12 < window.innerHeight;
    card.style.left = `${left + window.scrollX}px`;
    card.style.top = `${(below ? rect.bottom + 8 : rect.top - card.offsetHeight - 8) + window.scrollY}px`;
    card.addEventListener('pointerenter', () => window.clearTimeout(hideTimer));
    card.addEventListener('pointerleave', () => (hideTimer = window.setTimeout(hide, LEAVE)));
    requestAnimationFrame(() => card?.classList.add('is-visible'));
  }

  function start(link: HTMLAnchorElement, delay: number) {
    if (link === current) {
      window.clearTimeout(hideTimer);
      return;
    }
    hide();
    if (!target(link)) return;
    current = link;
    showTimer = window.setTimeout(() => show(link), delay);
  }

  document.addEventListener('pointerover', (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(SCOPE);
    if (link) start(link, WAIT);
  });
  document.addEventListener('pointerout', (event) => {
    const from = (event.target as Element | null)?.closest<HTMLAnchorElement>(SCOPE);
    if (from && from === current) {
      window.clearTimeout(showTimer);
      hideTimer = window.setTimeout(hide, LEAVE);
    }
  });
  // Keyboard users get the same card when a link is focused.
  document.addEventListener('focusin', (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(SCOPE);
    if (link?.matches(':focus-visible')) start(link, 0);
  });
  document.addEventListener('focusout', (event) => {
    if ((event.target as Element | null)?.closest(SCOPE) === current) hide();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hide();
  });
  document.addEventListener('pointerdown', hide);
}
