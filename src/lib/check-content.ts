import fs from 'node:fs';
import path from 'node:path';
import { SITE } from '../site';

/**
 * Checks every file in an article or video folder before the site is built, and stops with a plain-English
 * message when something would otherwise be skipped or published wrongly. The messages name the file.
 */
const DATE_HELP = 'Write the date as year-month-day, for example 2026-10-12.';

function fail(file: string, message: string): never {
  // Astro adds its own full stop after the message, so ours is dropped.
  throw new Error(`Problem in ${path.relative(process.cwd(), file)}\n${message.replace(/\.$/, '')}`);
}

function listFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) return []; // hidden files and templates
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(full) : [full];
  });
}

/** A title like "Why "decentralized" matters" confuses the settings reader; say how to fix it. */
function quotationProblem(value: string): 'double' | 'single' | undefined {
  const text = value.replace(/\s+#.*$/, '').trim();
  if (text.length > 1 && text.startsWith('"') && text.endsWith('"') && /(^|[^\\])"/.test(text.slice(1, -1))) return 'double';
  if (text.length > 1 && text.startsWith("'") && text.endsWith("'") && text.slice(1, -1).replace(/''/g, '').includes("'")) return 'single';
  return undefined;
}

function checkDate(file: string, raw: string) {
  const value = raw.replace(/\s+#.*$/, '').trim().replace(/^["']|["']$/g, '');
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) fail(file, `The date "${value}" is not in the right form. ${DATE_HELP}`);
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const real = new Date(Date.UTC(year, month - 1, day));
  const isRealDay = real.getUTCFullYear() === year && real.getUTCMonth() === month - 1 && real.getUTCDate() === day;
  if (!isRealDay) fail(file, `The date "${value}" is not a real calendar day. ${DATE_HELP}`);
  const thisYear = new Date().getUTCFullYear();
  if (year < 2000 || year > thisYear + 1) fail(file, `The year in the date "${value}" looks like a typo. ${DATE_HELP}`);
}


/** The settings each kind of file understands, in the order they are usually written. */
const KNOWN_SETTINGS: Record<string, string[]> = {
  writing: ['title', 'date', 'description', 'tags', 'draft', 'featured', 'kicker', 'status', 'draftDate', 'updatedDate', 'citation', 'pdf', 'ssrn'],
  newsletter: ['title', 'date', 'description', 'issue', 'tags', 'draft'],
  videos: ['title', 'date', 'url', 'description', 'credit', 'group', 'draft'],
  pages: ['title', 'description', 'startShort', 'updated', 'eyebrow', 'headline', 'buttonText', 'buttonLink', 'linkText', 'linkLink', 'credentials'],
};

/** How many single-letter changes turn one word into another (for "Did you mean ...?"). */
function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const above = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = above;
    }
  }
  return row[b.length];
}

/** A setting the site does not know is ignored without a word, so a typo like "Draft: true" would publish a draft. */
function checkSettingName(file: string, name: string, known: string[]) {
  if (known.includes(name)) return;
  const lower = name.toLowerCase();
  const sameLetters = known.find((setting) => setting.toLowerCase() === lower);
  // The closest setting wins, and a few common wordings are understood too.
  const ALIASES: Record<string, string> = { update: 'updatedDate', updated: 'updatedDate', cite: 'citation', state: 'status', draftdate: 'draftDate' };
  const nearest = known
    .map((setting) => ({ setting, away: distance(setting.toLowerCase(), lower) }))
    .filter((entry) => entry.away <= 2)
    .sort((a, b) => a.away - b.away)[0]?.setting;
  const aliased = ALIASES[lower] && known.includes(ALIASES[lower]) ? ALIASES[lower] : undefined;
  const close = sameLetters ?? aliased ?? nearest;
  const hint =
    sameLetters !== undefined
      ? `Write it exactly like this, with the same small and capital letters: "${sameLetters}". Written differently, the site ignores the line${sameLetters === 'draft' ? ', and the article would be published' : ''}.`
      : close !== undefined
        ? `Did you mean "${close}"? A setting the site does not know is ignored.`
        : `"${name}" is not a setting this site knows. The settings are: ${known.join(', ')}.`;
  fail(file, `Check the setting "${name}" at the top of the file. ${hint}`);
}

/** Footnotes that are used but never written, or written but never used, show up as stray text or vanish. */
function checkFootnotes(file: string, body: string[]) {
  const defined = new Set<string>();
  const used = new Set<string>();
  let fence: string | undefined;
  for (const line of body) {
    const marker = /^\s*(```|~~~)/.exec(line)?.[1];
    if (marker) {
      fence = fence === undefined ? marker : fence === marker ? undefined : fence;
      continue;
    }
    if (fence !== undefined) continue;
    let text = line.replace(/`[^`]*`/g, '');
    const definition = /^\[\^([^\]\s]+)\]:/.exec(text);
    if (definition) {
      defined.add(definition[1]);
      text = text.slice(definition[0].length);
    }
    for (const reference of text.matchAll(/\[\^([^\]\s]+)\]/g)) used.add(reference[1]);
  }
  for (const label of used) {
    if (!defined.has(label)) {
      fail(file, `The footnote [^${label}] is used in the text, but no line starting with [^${label}]: gives its note. Add that line further down, or remove the [^${label}] from the text.`);
    }
  }
  for (const label of defined) {
    if (!used.has(label)) {
      fail(file, `The note [^${label}]: is written, but nothing in the text points to it with [^${label}], so it would not appear. Add [^${label}] where it belongs, or delete the note.`);
    }
  }
}

/** A collapsible block (<details> ... </details>) needs a title line and blank lines around its text, or it shows up broken. */
function checkDetails(file: string, body: string[]) {
  let fence: string | undefined;
  let open = 0;
  body.forEach((line, index) => {
    const marker = /^\s*(```|~~~)/.exec(line)?.[1];
    if (marker) {
      fence = fence === undefined ? marker : fence === marker ? undefined : fence;
      return;
    }
    if (fence !== undefined) return;
    const starts = (line.match(/<details[\s>]/gi) ?? []).length;
    const ends = (line.match(/<\/details>/gi) ?? []).length;
    if (starts > 0 && !body.slice(index, index + 3).some((next) => /<summary>.+<\/summary>/i.test(next))) {
      fail(file, 'A collapsible block starts with <details> but the next line is not a title line like <summary>Objections and Responses</summary>. Without a title line, readers would see nothing to click.');
    }
    // A line with only a > (inside a quotation) counts as empty.
    const empty = (text: string | undefined) => text === undefined || /^\s*(>\s*)*$/.test(text);
    if (/<\/summary>/i.test(line) && !empty(body[index + 1])) {
      fail(file, 'Leave one empty line after the </summary> line of a collapsible block. Without it, the text inside shows its asterisks and pound signs as they are.');
    }
    if (ends > 0 && /<\/details>/i.test(line) && index > 0 && !empty(body[index - 1]) && !/<\/summary>/i.test(body[index - 1])) {
      fail(file, 'Leave one empty line before the </details> line that ends a collapsible block, so the last paragraph inside it is read correctly.');
    }
    if (ends > 0 && /<\/details>/i.test(line) && !empty(body[index + 1]) && !/<\/details>/i.test(body[index + 1])) {
      fail(file, 'Leave one empty line after the </details> line that ends a collapsible block. Without it, the text after the block shows its asterisks, pound signs and footnote marks as they are.');
    }
    open += starts - ends;
    if (open < 0) fail(file, 'There is a </details> line with no <details> line before it. Each collapsible block needs both.');
  });
  if (open > 0) fail(file, 'A collapsible block was opened with <details> but never closed with </details>. Add a line </details> after the last paragraph of the block.');
}

export function checkContentFolder(folder: string) {
  const root = path.resolve(folder);
  if (!fs.existsSync(root)) return;
  for (const file of listFiles(root)) {
    const name = path.basename(file);
    if (!name.endsWith('.md')) {
      const suggestion = name.replace(/\.[^.]*$/, '') + '.md';
      fail(
        file,
        `This file would not be published, because these files must end in .md (lowercase). Rename it, for example to "${suggestion}". Other kinds of files do not belong in this folder (images go in public/images/).`,
      );
    }
    if (path.basename(root) === 'writing' && /^newsletter(\/|\.md$)/i.test(path.relative(root, file).replace(/\\/g, '/'))) {
      fail(file, 'The name "newsletter" is used by the weekly newsletter section, so an article cannot have it. Rename the file, for example "newsletter-notes.md".');
    }
    const lines = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').split(/\r?\n/);
    if (lines[0]?.trim() !== '---') fail(file, 'The first line of the file must be three dashes (---), which open the settings block.');
    const end = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
    if (end === -1) fail(file, 'The settings block at the top is missing its closing line of three dashes (---).');
    const known = KNOWN_SETTINGS[path.basename(root)];
    const written = new Set<string>();
    for (const line of lines.slice(1, end)) {
      // A line that starts with a space is read as part of the line above it, which confuses the whole block.
      const indented = known && /^[ \t]+([A-Za-z]+)\s*:(?:\s|$)/.exec(line)?.[1];
      if (indented && known.some((setting) => setting.toLowerCase() === indented.toLowerCase())) {
        fail(file, `The line starting with "${indented}:" begins with a space. Delete the spaces at the start of the line, so that it starts with the word ${indented}. If you took the # off a line of the template, take off the space after it too.`);
      }
      const name = known && /^([^\s#'"\-[{][^:]*?)\s*:(?:\s|$)/.exec(line)?.[1];
      if (name) checkSettingName(file, name, known);
      // The same setting twice would stop the build with a message only a programmer could read.
      const first = /^([A-Za-z]+)\s*:(?:\s|$)/.exec(line)?.[1];
      if (first) {
        if (written.has(first)) {
          fail(file, `The setting "${first}" is written twice at the top of the file. Keep one ${first} line and delete the other (if you meant to change it, edit the line that is already there).`);
        }
        written.add(first);
      }
      const setting = /^(title|description|date|draftDate|updatedDate|kicker|credit|group|citation|eyebrow|headline|buttonText|buttonLink|linkText|linkLink|updated):\s*(.*)$/.exec(line);
      if (!setting) continue;
      const [, key, value] = setting;
      if (key === 'citation') {
        // The words inside the quotation marks, without any # comment after them. Asterisks make italics, in pairs.
        const words = /^"([^"]*)"|^'([^']*)'/.exec(value.trim());
        const text = words ? (words[1] ?? words[2]) : value.split(/\s#/)[0];
        if (/\*\*/.test(text) || (text.match(/\*/g) ?? []).length % 2 === 1) {
          fail(file, 'The citation has an asterisk without a partner. Put one asterisk before and one after the words that should be in italics, like *this*, and use no other asterisks.');
        }
      }
      if (['date', 'draftDate', 'updatedDate'].includes(key)) checkDate(file, value);
      else if (['credit', 'group', 'citation', 'kicker'].includes(key) && value.trim() === '') {
        fail(file, `The ${key} line is empty. Put the words between quotation marks, or delete the whole ${key} line.`);
      } else if (quotationProblem(value) === 'double') {
        fail(file, `The ${key} has a quotation mark inside its quotation marks. Use curly quotes inside (\u201clike this\u201d), or wrap the whole ${key} in single quotation marks.`);
      } else if (quotationProblem(value) === 'single') {
        fail(file, `The ${key} has an apostrophe inside single quotation marks. Wrap the whole ${key} in double quotation marks instead.`);
      } else if (/^[\u201c\u201d\u2018\u2019]/.test(value)) {
        fail(file, `The ${key} starts with a curly quotation mark. Around the whole ${key}, use straight quotation marks ("like this"); curly ones are only for inside the words.`);
      } else if (value && !/^["'[{|>]/.test(value) && /\s#/.test(value)) {
        fail(file, `The ${key} contains a # sign. In this block everything after a # is treated as a comment and dropped, so the ${key} would be cut short. Wrap the whole ${key} in quotation marks, like this: ${key}: "${value}"`);
      } else if (value && !/^["'[{|>]/.test(value) && /:(\s|$)/.test(value)) {
        fail(file, `The ${key} contains a colon, so it must be wrapped in quotation marks, like this: ${key}: "${value}"`);
      }
    }
    if (['writing', 'newsletter'].includes(path.basename(root))) {
      checkFootnotes(file, lines.slice(end + 1));
      checkDetails(file, lines.slice(end + 1));
    }
  }
}

const CONTENT_FOLDERS = new Set(['writing', 'newsletter', 'videos', 'pages']);
const ALLOWED_TOP_LEVEL_MARKDOWN = new Set(['readme.md', 'how-to-update.md']);

/** Stops the build when an article or video was saved somewhere the site never looks. */
export function checkContentPlaces() {
  const content = path.resolve('src/content');
  if (fs.existsSync(content)) {
    for (const entry of fs.readdirSync(content, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
      if (!entry.isDirectory() || !CONTENT_FOLDERS.has(entry.name)) {
        fail(
          path.join(content, entry.name),
          'This is in the wrong place, so it would never be published. Articles go in src/content/writing, weekly newsletter issues in src/content/newsletter, videos in src/content/videos, and the About and Home text in src/content/pages. Move it, or check the folder name for a typo.',
        );
      }
    }
  }
  for (const folder of [process.cwd(), path.resolve('src')]) {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      if (entry.isFile() && /\.(md|markdown|mdx)$/i.test(entry.name) && !ALLOWED_TOP_LEVEL_MARKDOWN.has(entry.name.toLowerCase())) {
        fail(
          path.join(folder, entry.name),
          'This file is not in an article or video folder, so it would never be published. Articles go in src/content/writing and videos in src/content/videos.',
        );
      }
    }
  }
}

/** Stops the build, in plain words, when the newsletter or LinkedIn address in src/site.ts is not usable. */
export function checkSiteSettings() {
  const web = /^https:\/\/[^\s"'<>]+$/;
  const newsletter = String(SITE.newsletter ?? '').trim();
  if (String(SITE.newsletterName ?? '').trim() === '') {
    fail(path.resolve('src/site.ts'), 'The newsletterName line is empty. Write the name of the newsletter between the quotation marks, for example: newsletterName: \'If Only I Knew\',');
  }
  if (newsletter !== '' && !web.test(newsletter)) {
    fail(
      path.resolve('src/site.ts'),
      'The newsletter address must start with https:// and contain no spaces or quotation marks. Paste only the web address that follows action= in the form code from your newsletter service, or leave the two quotation marks empty to hide the signup form.',
    );
  }
  if (!web.test(String(SITE.linkedin ?? '').trim())) {
    fail(
      path.resolve('src/site.ts'),
      'The LinkedIn address must start with https:// and contain no spaces or quotation marks. Copy it from your browser\'s address bar while you are on your LinkedIn profile.',
    );
  }
}
