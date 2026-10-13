/**
 * Collapsible blocks in an article (<details>): a link to something inside a closed block opens it first, the margin
 * notes are laid out again when a block opens or closes, and every block is opened for printing.
 */
function openAround(target: Element | null) {
  let opened = false;
  for (let block = target?.closest('details:not([open])'); block; block = block.parentElement?.closest('details:not([open])') ?? null) {
    block.setAttribute('open', '');
    opened = true;
  }
  return opened;
}

function showHashTarget() {
  if (!location.hash) return;
  let id = location.hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch {
    // an address with a broken % sign: use it as it is
  }
  const target = document.getElementById(id);
  if (openAround(target)) target?.scrollIntoView({ block: 'start' });
}
window.addEventListener('hashchange', showHashTarget);
showHashTarget();

// Opening or closing a block moves the text under it, so the notes in the margin are placed again.
document.addEventListener('toggle', () => window.dispatchEvent(new Event('resize')), true);

// On paper everything is open.
const closedBeforePrint: Element[] = [];
window.addEventListener('beforeprint', () => {
  for (const block of document.querySelectorAll('.prose details:not([open])')) {
    block.setAttribute('open', '');
    closedBeforePrint.push(block);
  }
});
window.addEventListener('afterprint', () => {
  for (const block of closedBeforePrint.splice(0)) block.removeAttribute('open');
});
