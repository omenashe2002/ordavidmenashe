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
const LONG_NOTE = 340; // a note longer than this many characters is shortened in the margin until the reader asks for the rest
const SHORT_NOTE = 260; // how many characters of a long note are shown at first

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
  // The note's id is written in the page exactly as it is in the link, so it is used without decoding.
  const source = document.getElementById(ref.getAttribute('href')?.slice(1) ?? '');
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

/** The first `budget` characters of a note, ending at a word, with its italics and links intact. */
function shortened(source: Node, budget: number): DocumentFragment {
  let left = budget;
  const copy = (node: Node): Node | null => {
    if (left <= 0) return null;
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      if (text.length <= left) {
        left -= text.length;
        return node.cloneNode();
      }
      const cut = text.slice(0, left);
      const space = cut.lastIndexOf(' ');
      left = 0;
      return document.createTextNode(`${(space > 20 ? cut.slice(0, space) : cut).trimEnd()}\u2026`);
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return null;
    const clone = node.cloneNode(false);
    for (const child of node.childNodes) {
      const part = copy(child);
      if (part) clone.appendChild(part);
    }
    return clone;
  };
  const fragment = document.createDocumentFragment();
  for (const child of source.childNodes) {
    const part = copy(child);
    if (part) fragment.appendChild(part);
  }
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
    const full = document.createElement('div');
    full.className = 'sidenote-full';
    full.append(copyOfNote(note.source));
    body.append(full);
    if ((full.textContent ?? '').length > LONG_NOTE) {
      // A very long note is cut short, with a button to read the rest, so it cannot push the notes after it far from their text.
      item.classList.add('is-long');
      const short = document.createElement('div');
      short.className = 'sidenote-short';
      short.append(shortened(full, SHORT_NOTE));
      body.prepend(short);
    }
    const back = document.createElement('a');
    back.className = 'sidenote-back';
    back.href = `#${note.ref.id}`;
    back.setAttribute('aria-label', `Back to reference ${note.number}`);
    back.textContent = '\u21a9';
    body.append(back);
    item.append(number, body);
    if (item.classList.contains('is-long')) {
      const more = document.createElement('button');
      more.type = 'button';
      more.className = 'sidenote-more';
      more.textContent = 'Show more';
      more.setAttribute('aria-expanded', 'false');
      item.append(more);
    }
    sidenoteList.append(item);
    note.sidenote = item;
  }
  main.append(sidenoteList);
}

/**
 * Puts each note level with its number. When notes would overlap they are stacked into one block, and the block is
 * centred on where its notes want to be, so no note ends up as far from its number as it would if every one were pushed down.
 */
function layoutSidenotes() {
  layoutQueued = false;
  if (!sidenotesOn || !main || !sidenoteList) return;
  const mainTop = main.getBoundingClientRect().top;
  const all = [...notes.values()].filter((note) => note.sidenote);
  // A note whose number is inside a collapsed block is not shown until the block is opened.
  for (const note of all) note.sidenote!.hidden = note.ref.closest('details:not([open])') !== null;
  const shown = all.filter((note) => !note.sidenote!.hidden);
  const wanted = shown.map((note) => note.ref.getBoundingClientRect().top - mainTop - 3);
  const heights = shown.map((note) => note.sidenote!.offsetHeight);

  interface Block {
    top: number;
    height: number;
    count: number;
    sum: number; // the total of (where each note wants to be, minus its place inside the block)
    members: { index: number; offset: number }[];
  }
  const blocks: Block[] = [];
  shown.forEach((_, index) => {
    let block: Block = { top: Math.max(0, wanted[index]), height: heights[index], count: 1, sum: wanted[index], members: [{ index, offset: 0 }] };
    for (let previous = blocks[blocks.length - 1]; previous && previous.top + previous.height + NOTE_GAP > block.top; previous = blocks[blocks.length - 1]) {
      blocks.pop();
      const shift = previous.height + NOTE_GAP;
      for (const member of block.members) previous.members.push({ index: member.index, offset: member.offset + shift });
      previous.sum += block.sum - shift * block.count;
      previous.count += block.count;
      previous.height = shift + block.height;
      previous.top = Math.max(0, previous.sum / previous.count);
      block = previous;
    }
    blocks.push(block);
  });

  let bottom = 0;
  for (const block of blocks) {
    for (const member of block.members) shown[member.index].sidenote!.style.top = `${Math.round(block.top + member.offset)}px`;
    bottom = Math.max(bottom, block.top + block.height);
  }
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
  const container = ref.closest<HTMLElement>('p, li, blockquote, h2, h3, h4, td, th, dd, dt');
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
  // Inside a list item or table cell it goes inside that item, because only list items may sit directly in a list.
  if (container.matches('li, td, th, dd, dt')) container.append(box);
  else container.after(box);

  const mainBox = main.getBoundingClientRect();
  const refBox = ref.getBoundingClientRect();
  const width = Math.min(main.clientWidth, 34 * parseFloat(getComputedStyle(document.documentElement).fontSize));
  const left = Math.min(Math.max(refBox.left - mainBox.left - width / 2, 0), main.clientWidth - width);
  box.style.width = `${width}px`;
  box.style.left = `${left}px`;
  box.style.top = `${refBox.bottom - mainBox.top + 8}px`;
  boxRef = ref;
  box.focus({ preventScroll: true });
  // Bring the whole box into view, leaving room under it for the reading bar that floats at the bottom of the screen.
  const bar = document.querySelector<HTMLElement>('.reader-tools');
  const reserve = bar ? bar.offsetHeight + 28 : 12;
  const edge = box.getBoundingClientRect();
  const behavior = reduceMotion() ? 'auto' : 'smooth';
  if (edge.bottom > window.innerHeight - reserve) window.scrollBy({ top: Math.min(edge.bottom - (window.innerHeight - reserve), Math.max(edge.top - 12, 0)), behavior });
  else if (edge.top < 12) window.scrollBy({ top: edge.top - 12, behavior });
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
  window.addEventListener('resize', queueLayout); // the margin's own width changes with the window even when the text's does not
  // An open note box would otherwise stay where it was while the text moves under it.
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWidth) closeBox(false);
    lastWidth = window.innerWidth;
  });
  document.fonts?.ready.then(queueLayout);
  window.addEventListener('load', queueLayout);

  // A link to a note in the list (for example one that was shared) opens that note in the margin instead.
  const showTarget = () => {
    if (!sidenotesOn || !location.hash.startsWith('#user-content-fn-')) return;
    const note = [...notes.values()].find((entry) => entry.source.id === location.hash.slice(1));
    if (!note?.sidenote) return;
    note.ref.scrollIntoView({ block: 'center' });
    pulse(note);
  };
  window.addEventListener('hashchange', showTarget);
  showTarget();
}
