/** Marks, in a list of links to sections, the section the reader has reached (the last one whose top is above 30% of the screen). */
export function markCurrent(links: HTMLAnchorElement[]) {
  let current = -1;
  links.forEach((link, index) => {
    const section = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.3) current = index;
  });
  links.forEach((link, index) => {
    if (index === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
