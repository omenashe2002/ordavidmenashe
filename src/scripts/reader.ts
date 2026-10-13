/**
 * Reading aids for a long article: a thin progress bar at the top, the time left to read, a small bar with a
 * button back to the top, and (on narrow screens) a button that opens the list of sections without leaving the place.
 * The page works the same without any of this.
 */
import './ui';
import { markCurrent } from './toc';

const tools = document.querySelector<HTMLElement>('[data-reader-tools]');
const bar = document.querySelector<HTMLElement>('.reading-progress');
const body = document.querySelector<HTMLElement>('.article-body');
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (tools && bar && body) {
  const minutes = Number(tools.dataset.minutes) || 1;
  const timeLeft = tools.querySelector<HTMLElement>('[data-time-left]');
  let queued = false;
  let lastLabel = '';

  const label = (left: number) => {
    if (left <= 0) return 'Finished';
    if (left >= 60) {
      const hours = Math.floor(left / 60);
      const rest = left % 60;
      return `${hours} hr${rest ? ` ${rest} min` : ''} left`;
    }
    return `${left} min left`;
  };

  const update = () => {
    queued = false;
    const top = body.getBoundingClientRect().top + window.scrollY;
    const end = top + body.offsetHeight - window.innerHeight;
    const progress = end > top ? Math.min(1, Math.max(0, (window.scrollY - top) / (end - top))) : 0;
    bar.style.setProperty('--progress', progress.toFixed(4));
    const text = label(Math.ceil(minutes * (1 - progress)));
    if (timeLeft && text !== lastLabel) {
      timeLeft.textContent = text;
      lastLabel = text;
    }
    // The bar and the buttons appear once the first screen has been read.
    tools.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    bar.classList.toggle('is-visible', window.scrollY > 4);
  };
  const queue = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  update();

  tools.querySelector('[data-back-to-top]')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
    // Keyboard users continue from the top of the article rather than from a button that has just faded away.
    const heading = document.querySelector<HTMLElement>('h1');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  });

  // The list of sections, opened from the button, as a sheet that keeps the reader's place behind it.
  const open = tools.querySelector<HTMLButtonElement>('[data-open-contents]');
  const source = document.querySelector('.toc-inline nav');
  if (open && source && typeof HTMLDialogElement !== 'undefined') {
    const sheet = document.createElement('dialog');
    sheet.className = 'toc-sheet';
    sheet.setAttribute('aria-label', 'Contents');
    const head = document.createElement('div');
    head.className = 'toc-sheet-head';
    const title = document.createElement('span');
    title.textContent = 'Contents';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'toc-sheet-close';
    close.textContent = 'Close';
    head.append(title, close);
    const list = source.cloneNode(true) as HTMLElement;
    list.removeAttribute('aria-label');
    list.classList.add('toc', 'toc-sheet-list');
    sheet.append(head, list);
    document.body.append(sheet);

    const links = [...sheet.querySelectorAll<HTMLAnchorElement>('a')];
    open.addEventListener('click', () => {
      markCurrent(links);
      sheet.showModal();
      sheet.querySelector<HTMLElement>('[aria-current="location"]')?.scrollIntoView({ block: 'center' });
    });
    close.addEventListener('click', () => sheet.close());
    // Choosing a section closes the sheet; the link then takes the reader there.
    sheet.addEventListener('click', (event) => {
      const target = event.target as Element;
      if (target.closest('a')) sheet.close();
      else if (target === sheet) sheet.close(); // a click on the dimmed area
    });
  } else {
    open?.remove();
  }
}
