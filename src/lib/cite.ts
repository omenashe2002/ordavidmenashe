/**
 * The citation shown in the "Cite this" box. It is built from the article's settings in Bluebook style, or taken
 * from the article's own `citation:` line when there is one. A piece of text is either plain or italic.
 */
import { SITE } from '../site';

export interface CitePiece {
  text: string;
  italic?: boolean;
}

const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

/** "Oct. 12, 2026": the Bluebook's abbreviations for months. Dates are read as UTC so they never shift by a day. */
export function bluebookDate(date: Date) {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

/** Splits text on *asterisks*: the words between a pair become italic. */
function withItalics(text: string): CitePiece[] {
  return text
    .split(/\*([^*]+)\*/)
    .map((part, index) => ({ text: part, italic: index % 2 === 1 }))
    .filter((piece) => piece.text !== '');
}

interface CiteSource {
  title: string;
  date: Date;
  status?: 'draft' | 'forthcoming' | 'published';
  draftDate?: Date;
  citation?: string;
}

/** The citation as pieces of text, ready to show or copy. `url` is the full address of the page. */
export function citationPieces(source: CiteSource, url: string): CitePiece[] {
  if (source.citation) return withItalics(source.citation);
  const author = `${SITE.name}, `;
  // A draft or forthcoming piece is cited as an unpublished manuscript, dated by the draft.
  if (source.status === 'draft' || source.status === 'forthcoming') {
    return [
      { text: author },
      { text: source.title, italic: true },
      { text: ` (${bluebookDate(source.draftDate ?? source.date)}) (unpublished manuscript), ${url}.` },
    ];
  }
  // Anything else is cited as a page on this website.
  return [
    { text: author },
    { text: source.title, italic: true },
    { text: `, ${new URL(url).hostname} (${bluebookDate(source.date)}), ${url}.` },
  ];
}

export const citationText = (pieces: CitePiece[]) => pieces.map((piece) => piece.text).join('');
