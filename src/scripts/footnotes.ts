/**
 * Footnotes for long articles.
 *
 * Wide screens: each note is also set in the right-hand margin, level with the line that points to it. The list of
 * notes at the end of the article is then hidden on screen (it still prints).
 * Narrower screens: tapping a note number opens the note in a small box beside the text, so the reader keeps their place.
 * Without JavaScript nothing changes: the numbers link to the list of notes at the end, which links back.
 */

const SIDENOTE_QUERY = '(min-width: 75rem)';
const NOTE_GAP = 10; // pixels kept between two notes in the margin
const LONG_NOTE = 9.5; // notes taller than this many lines are shortened until the reader asks for the rest

const main = document.querySelector<HTMLElement>('.article-main');
const refs = [...document.querySelectorAll<HTMLAnchorElement>('.prose a[data-footnote-ref]')];

interface Note {
  number: string;
  ref: HTMLAnchorElement;
  source: HTMLElement; // the note in the list at the end of the article
  sidenote?: HTMLLIElement;
}

const notes = new Map<HTMLAnchorElement, Note>();
for (const ref of refs) {
  const source = document.getElementById(decodeURIComponent(ref.hash.slice(1)));
  if (source) notes.set(ref, { number: ref.textContent?.trim() ?? '', ref, source });
}

/** A copy of a note's content without the "back to the text" arrow, which the box and the margin supply themselves. */
function copyOfNote(source: HTMLElement): DocumentFragment {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('[data-footnote-backref]').forEach((arrow) => arrow.remove());
  clone.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
  const fragment = document.createDocumentFragment();
  fragment.append(...clone.childNodes);
  return fragment;
}

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------
   Notes in the margin (wide screens)
------------------------------------------------------------------- */
let sidenoteList: HTMLOListElement | undefined;
let sidenotesOn = false;
let layoutQueued = false;

function buildSidenotes() {
  if (sidenoteList || !main) return;
  sidenoteList = document.createElement('ol');
  sidenoteList.className = 'sidenotes';
  sidenoteList.setAttribute('aria-label', 'Footnotes');
  for (const note of notes.values()) {
    const item = document.createElement('li');
    item.className = 'sidenote';
    item.id = `sidenote-${note.number}`;
    item.tabIndex = -1;
    const number = document.createElement('span');
    number.className = 'sidenote-num';
    number.textContent = note.number;
    const body = document.createElement('div');
    body.className = 'sidenote-body';
    body.append(copyOfNote(note.source));
    const back = document.createElement('a');
    back.className = 'sidenote-back';
    back.href = `#${note.ref.id}`;
    back.setAttribute('aria-label', `Back to reference ${note.number}`);
    back.textContent = '↩';
    body.append(back);
    item.append(number, body);
    sidenoteList.append(item);
    note.sidenote = item;
  }
  main.append(sidenoteList);
  // A very long note is cut short, with a button to read the rest, so it cannot push the notes after it far from their text.
  for (const note of notes.values()) {
    const body = note.sidenote!.querySelector<HTMLElement>('.sidenote-body')!;
    const lineHeight = parseFloat(getComputedStyle(body).lineHeight) || 20;
    if (body.scrollHeight > lineHeight * LONG_NOTE) {
      note.sidenote!.classList.add('is-long');
      const more = document.createElement('button');
      more.type = 'button';
      more.className = 'sidenote-more';
      more.textContent = 'Show more';
      more.setAttribute('aria-expanded', 'false');
      note.sidenote!.append(more);
    }
  }
}

/** Puts each note level with its number, and moves it down when the note before it would overlap. */
function layoutSidenotes() {
  layoutQueued = false;
  if (!sidenotesOn || !main || !sidenoteList) return;
  const mainTop = main.getBoundingClientRect().top;
  const all = [...notes.values()].filter((note) => note.sidenote);
  const wanted = all.map((note) => note.ref.getBoundingClientRect().top - mainTop);
  const heights = all.map((note) => note.sidenote!.offsetHeight);
  let bottom = -Infinity;
  all.forEach((note, index) => {
    const top = Math.max(wanted[index] - 3, bottom + NOTE_GAP);
    note.sidenote!.style.top = `${top}px`;
    bottom = top + heights[index];
  });
  // Keep the page long enough that the last notes do not hang below the article.
  main.style.minHeight = '';
  if (bottom > main.offsetHeight) main.style.minHeight = `${Math.ceil(bottom)}px`;
}

function queueLayout() {
  if (layoutQueued) return;
  layoutQueued = true;
  requestAnimationFrame(layoutSidenotes);
}

function setSidenotes(on: boolean) {
  if (on === sidenotesOn) return;
  closeBox(false);
  sidenotesOn = on;
  document.documentElement.classList.toggle('has-sidenotes', on);
  if (on) {
    buildSidenotes();
    layoutSidenotes();
  } else if (main) {
    main.style.minHeight = '';
  }
}

function pulse(note: Note) {
  const item = note.sidenote;
  if (!item) return;
  item.classList.add('is-active');
  window.setTimeout(() => item.classList.remove('is-active'), 1600);
}

/* ------------------------------------------------------------------
   The note box (narrower screens, and keyboard users on wide ones)
------------------------------------------------------------------- */
let box: HTMLElement | undefined;
let boxRef: HTMLAnchorElement | undefined;

function closeBox(restoreFocus: boolean) {
  if (!box) return;
  box.remove();
  if (restoreFocus) boxRef?.focus();
  box = undefined;
  boxRef = undefined;
}

function openBox(ref: HTMLAnchorElement) {
  const note = notes.get(ref);
  const container = ref.closest<HTMLElement>('p, li, blockquote, h2, h3, h4, td, dd');
  if (!note || !main || !container) return;
  closeBox(false);

  box = document.createElement('div');
  box.className = 'note-box';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', `Footnote ${note.number}`);
  box.tabIndex = -1;

  const head = document.createElement('div');
  head.className = 'note-box-head';
  const title = document.createElement('span');
  title.textContent = `Note ${note.number}`;
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'note-box-close';
  close.setAttribute('aria-label', 'Close note');
  close.textContent = '×';
  head.append(title, close);

  const body = document.createElement('div');
  body.className = 'note-box-body';
  body.append(copyOfNote(note.source));

  const foot = document.createElement('p');
  foot.className = 'note-box-foot';
  const full = document.createElement('a');
  full.href = ref.hash;
  full.textContent = 'See it in the list of notes';
  foot.append(full);

  box.append(head, body, foot);
  // Placed straight after the paragraph, so keyboard and screen reader users meet it right after the number.
  container.after(box);

  const mainBox = main.getBoundingClientRect();
  const refBox = ref.getBoundingClientRect();
  const width = Math.min(main.clientWidth, 34 * parseFloat(getComputedStyle(document.documentElement).fontSize));
  const left = Math.min(Math.max(refBox.left - mainBox.left - width / 2, 0), main.clientWidth - width);
  box.style.width = `${width}px`;
  box.style.left = `${left}px`;
  box.style.top = `${refBox.bottom - mainBox.top + 8}px`;
  boxRef = ref;
  box.focus({ preventScroll: true });
  box.scrollIntoView({ block: 'nearest', behavior: reduceMotion() ? 'auto' : 'smooth' });
}

/* ------------------------------------------------------------------
   Wiring
------------------------------------------------------------------- */
if (main && notes.size > 0) {
  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    const ref = target?.closest<HTMLAnchorElement>('a[data-footnote-ref]');
    const mouse = event as MouseEvent;
    if (ref && notes.has(ref)) {
      if (mouse.button !== 0 || mouse.metaKey || mouse.ctrlKey || mouse.shiftKey || mouse.altKey) return; // "open in new tab" still works
      event.preventDefault();
      const note = notes.get(ref)!;
      if (sidenotesOn && note.sidenote) {
        if (event.detail === 0) {
          // Keyboard or screen reader: move to the note itself.
          note.sidenote.focus({ preventScroll: true });
          note.sidenote.scrollIntoView({ block: 'nearest', behavior: reduceMotion() ? 'auto' : 'smooth' });
        }
        pulse(note);
      } else if (boxRef === ref) {
        closeBox(true);
      } else {
        openBox(ref);
      }
      return;
    }
    if (target?.closest('.note-box-close')) {
      closeBox(true);
      return;
    }
    const more = target?.closest<HTMLButtonElement>('.sidenote-more');
    if (more) {
      const open = more.parentElement!.classList.toggle('is-open');
      more.textContent = open ? 'Show less' : 'Show more';
      more.setAttribute('aria-expanded', String(open));
      queueLayout();
      return;
    }
    const back = target?.closest<HTMLAnchorElement>('.sidenote-back');
    if (back) {
      // Return to the number in the text without leaving a trail of page addresses.
      event.preventDefault();
      const ref = document.getElementById(back.hash.slice(1));
      ref?.focus();
      ref?.scrollIntoView({ block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' });
      return;
    }
    // A click anywhere else closes an open note.
    if (box && !target?.closest('.note-box')) closeBox(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (box) {
      closeBox(true);
    } else if (sidenotesOn) {
      const item = (document.activeElement as Element | null)?.closest<HTMLElement>('.sidenote');
      if (item) {
        const note = [...notes.values()].find((entry) => entry.sidenote === item);
        note?.ref.focus();
      }
    }
  });

  // Tabbing out of an open note closes it.
  document.addEventListener('focusin', (event) => {
    if (box && !box.contains(event.target as Node) && event.target !== boxRef) closeBox(false);
  });

  // Hovering a number lights up its note in the margin, and the other way round.
  const link = (element: EventTarget | null, on: boolean) => {
    if (!sidenotesOn || !(element instanceof Element)) return;
    const ref = element.closest<HTMLAnchorElement>('a[data-footnote-ref]');
    if (ref && notes.has(ref)) notes.get(ref)!.sidenote?.classList.toggle('is-linked', on);
    const item = element.closest<HTMLElement>('.sidenote');
    if (item) [...notes.values()].find((entry) => entry.sidenote === item)?.ref.classList.toggle('is-linked', on);
  };
  document.addEventListener('mouseover', (event) => link(event.target, true));
  document.addEventListener('mouseout', (event) => link(event.target, false));

  const query = window.matchMedia(SIDENOTE_QUERY);
  setSidenotes(query.matches);
  query.addEventListener('change', (event) => setSidenotes(event.matches));

  // The margin is laid out again whenever the text moves: the window is resized, a font arrives, or a picture loads.
  new ResizeObserver(queueLayout).observe(main);
  document.fonts?.ready.then(queueLayout);
  window.addEventListener('load', queueLayout);

  // A link to a note in the list (for example one that was shared) opens that note in the margin instead.
  const showTarget = () => {
    if (!sidenotesOn || !location.hash.startsWith('#user-content-fn-')) return;
    const note = [...notes.values()].find((entry) => entry.source.id === decodeURIComponent(location.hash.slice(1)));
    if (!note?.sidenote) return;
    note.ref.scrollIntoView({ block: 'center' });
    pulse(note);
  };
  window.addEventListener('hashchange', showTarget);
  showTarget();
}
