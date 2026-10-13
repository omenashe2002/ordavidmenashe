/** Marks, in a list of links to sections, the section the reader has reached (the last one whose top is above 30% of the screen). */
export function markCurrent(links: HTMLAnchorElement[]) {
  let current = -1;
  links.forEach((link, index) => {
    let id = link.hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      // an address with a broken % sign: use it as it is
    }
    const section = document.getElementById(id);
    // A section that is not on the page right now (for example the list of notes, when the notes are in the margin) cannot be the one being read.
    if (section && section.getClientRects().length > 0 && section.getBoundingClientRect().top <= window.innerHeight * 0.3) current = index;
  });
  links.forEach((link, index) => {
    if (index === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
