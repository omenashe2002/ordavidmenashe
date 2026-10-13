/**
 * Site search. A button in the header (and Ctrl+K or Cmd+K anywhere) opens a search box over the page.
 * The search itself runs in the visitor's browser, on an index made when the site was built (Pagefind), and
 * nothing is loaded until the box is first opened. The page works the same without any of this.
 */
const opener = document.querySelector<HTMLButtonElement>('[data-search-open]');
const key = document.querySelector<HTMLElement>('.search-key');
const isMac = /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);
// The button holds its place in the header from the start (so nothing shifts), and shows once scripts are running.
opener?.closest('.search-item')?.classList.add('is-ready');
if (key) key.textContent = isMac ? '⌘K' : 'Ctrl K';

interface PagefindResult {
  data(): Promise<{
    url: string;
    excerpt: string;
    meta: { title?: string; kind?: string };
    sub_results?: { title: string; url: string; excerpt: string }[];
  }>;
}
interface Pagefind {
  init(): Promise<void>;
  debouncedSearch(query: string, options?: object, wait?: number): Promise<{ results: PagefindResult[] } | null>;
}

const MAX_RESULTS = 8;
let dialog: HTMLDialogElement | undefined;
let input: HTMLInputElement;
let list: HTMLUListElement;
let status: HTMLElement;
let pagefind: Pagefind | undefined;
let failed = false;
let options: HTMLAnchorElement[] = [];
let active = -1;

/** Pagefind marks the matched words in an excerpt with <mark>. Everything else is plain text, never markup. */
function excerptNodes(html: string): Node[] {
  return html.split(/(<mark>|<\/mark>)/).reduce<{ nodes: Node[]; marked: boolean }>(
    (state, part) => {
      if (part === '<mark>') state.marked = true;
      else if (part === '</mark>') state.marked = false;
      else if (part) {
        const text = document.createElement('textarea');
        text.innerHTML = part; // turns &amp; and friends back into characters; the result is used as text only
        state.nodes.push(state.marked ? Object.assign(document.createElement('mark'), { textContent: text.value }) : document.createTextNode(text.value));
      }
      return state;
    },
    { nodes: [], marked: false },
  ).nodes;
}

/**
 * Where a result opens. A match in a heading opens at that heading. A match inside the list of footnotes has no
 * heading of its own, so it opens the page and asks the browser to find the matched word (a "text fragment").
 */
function where(url: string, excerpt: string) {
  if (!url.endsWith('#footnote-label')) return url;
  const word = /<mark>(.*?)<\/mark>/.exec(excerpt)?.[1];
  const base = url.split('#')[0];
  return word ? `${base}#:~:text=${encodeURIComponent(word)}` : base;
}

function setActive(index: number) {
  active = options.length === 0 ? -1 : (index + options.length) % options.length;
  options.forEach((option, i) => {
    option.setAttribute('aria-selected', String(i === active));
    option.parentElement?.classList.toggle('is-active', i === active);
  });
  const current = options[active];
  if (current) {
    input.setAttribute('aria-activedescendant', current.id);
    current.scrollIntoView({ block: 'nearest' });
  } else {
    input.removeAttribute('aria-activedescendant');
  }
}

function say(message: string) {
  status.textContent = message;
}

async function load(): Promise<Pagefind | undefined> {
  if (pagefind || failed) return pagefind;
  try {
    const address = '/pagefind/pagefind.js';
    pagefind = (await import(/* @vite-ignore */ address)) as Pagefind;
    await pagefind.init();
  } catch {
    failed = true;
    pagefind = undefined;
  }
  return pagefind;
}

async function run(query: string) {
  const text = query.trim();
  list.replaceChildren();
  options = [];
  setActive(-1);
  input.setAttribute('aria-expanded', 'false');
  if (text.length < 2) {
    say(text ? 'Keep typing to search.' : 'Type to search writing, videos, and pages.');
    return;
  }
  const engine = await load();
  if (!engine) {
    say('Search is not available right now. Try again later, or use the Writing page.');
    return;
  }
  const search = await engine.debouncedSearch(text, {}, 150);
  if (search === null) return; // a newer search has taken over
  const found = await Promise.all(search.results.slice(0, MAX_RESULTS).map((result) => result.data()));
  if (input.value.trim() !== text) return;
  if (found.length === 0) {
    say(`No results for “${text}”.`);
    return;
  }
  found.forEach((item, index) => {
    const best = item.sub_results?.[0];
    const li = document.createElement('li');
    li.setAttribute('role', 'none');
    const link = document.createElement('a');
    link.id = `search-option-${index}`;
    link.setAttribute('role', 'option');
    link.setAttribute('aria-selected', 'false');
    link.href = where(best?.url ?? item.url, best?.excerpt ?? item.excerpt);
    link.tabIndex = -1;
    const kind = document.createElement('span');
    kind.className = 'search-kind';
    kind.textContent = item.meta.kind ?? 'Page';
    const title = document.createElement('span');
    title.className = 'search-title';
    title.textContent = item.meta.title ?? item.url;
    const excerpt = document.createElement('span');
    excerpt.className = 'search-excerpt';
    excerpt.append(...excerptNodes(best?.excerpt ?? item.excerpt));
    link.append(kind, title, excerpt);
    li.append(link);
    li.addEventListener('pointermove', () => setActive(options.indexOf(link)));
    list.append(li);
    options.push(link);
  });
  input.setAttribute('aria-expanded', 'true');
  setActive(0);
  say(`${found.length} result${found.length === 1 ? '' : 's'} for “${text}”. Use the up and down arrow keys, then Enter.`);
}

function build() {
  if (dialog) return;
  dialog = document.createElement('dialog');
  dialog.className = 'search-dialog';
  dialog.setAttribute('aria-label', 'Search the site');
  dialog.innerHTML =
    '<div class="search-bar" role="search">' +
    '<label class="sr-only" for="search-input">Search the site</label>' +
    '<input id="search-input" class="search-input" type="search" role="combobox" aria-expanded="false" aria-controls="search-results" aria-autocomplete="list" autocomplete="off" spellcheck="false" placeholder="Search writing, videos, and pages">' +
    '<button class="search-close" type="button">Close</button>' +
    '</div>' +
    '<p class="search-status" role="status" aria-live="polite"></p>' +
    '<ul class="search-results" id="search-results" role="listbox" aria-label="Results"></ul>';
  document.body.append(dialog);
  input = dialog.querySelector<HTMLInputElement>('.search-input')!;
  list = dialog.querySelector<HTMLUListElement>('.search-results')!;
  status = dialog.querySelector<HTMLElement>('.search-status')!;

  input.addEventListener('input', () => void run(input.value));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(active + (event.key === 'ArrowDown' ? 1 : -1));
    } else if (event.key === 'Enter') {
      const link = options[active];
      if (link) {
        event.preventDefault();
        location.assign(link.href);
      }
    }
  });
  dialog.querySelector('.search-close')!.addEventListener('click', () => dialog!.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog!.close(); // a click on the dimmed area
  });
  dialog.addEventListener('close', () => {
    input.value = '';
    list.replaceChildren();
    options = [];
    say('');
  });
  say('Type to search writing, videos, and pages.');
}

function open() {
  build();
  if (dialog!.open) return;
  dialog!.showModal();
  input.focus();
  void load(); // starts fetching the index while the visitor types
}

opener?.addEventListener('click', open);
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    if (dialog?.open) dialog.close();
    else open();
  }
});
