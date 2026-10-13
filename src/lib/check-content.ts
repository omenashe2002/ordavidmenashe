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
  writing: ['title', 'date', 'description', 'tags', 'draft', 'featured', 'kicker'],
  videos: ['title', 'date', 'url', 'description', 'draft'],
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
  const sameLetters = known.find((setting) => setting === lower);
  const close = sameLetters ?? known.find((setting) => distance(setting, lower) <= 2);
  const hint =
    sameLetters !== undefined
      ? `Settings must be written in small letters: "${sameLetters}". With capital letters the site ignores the line${sameLetters === 'draft' ? ', and the article would be published' : ''}.`
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
    const lines = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').split(/\r?\n/);
    if (lines[0]?.trim() !== '---') fail(file, 'The first line of the file must be three dashes (---), which open the settings block.');
    const end = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
    if (end === -1) fail(file, 'The settings block at the top is missing its closing line of three dashes (---).');
    const known = KNOWN_SETTINGS[path.basename(root)];
    for (const line of lines.slice(1, end)) {
      const name = known && /^([^\s#'"\-[{][^:]*?)\s*:(?:\s|$)/.exec(line)?.[1];
      if (name) checkSettingName(file, name, known);
      const setting = /^(title|description|date|kicker):\s*(.*)$/.exec(line);
      if (!setting) continue;
      const [, key, value] = setting;
      if (key === 'date') checkDate(file, value);
      else if (quotationProblem(value) === 'double') {
        fail(file, `The ${key} has a quotation mark inside its quotation marks. Use curly quotes inside (\u201clike this\u201d), or wrap the whole ${key} in single quotation marks.`);
      } else if (quotationProblem(value) === 'single') {
        fail(file, `The ${key} has an apostrophe inside single quotation marks. Wrap the whole ${key} in double quotation marks instead.`);
      } else if (value && !/^["'[{|>]/.test(value) && /:(\s|$)/.test(value)) {
        fail(file, `The ${key} contains a colon, so it must be wrapped in quotation marks, like this: ${key}: "${value}"`);
      }
    }
    if (path.basename(root) === 'writing') checkFootnotes(file, lines.slice(end + 1));
  }
}

const CONTENT_FOLDERS = new Set(['writing', 'videos', 'pages']);
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
          'This is in the wrong place, so it would never be published. Articles go in src/content/writing, videos in src/content/videos, and the About and Home text in src/content/pages. Move it, or check the folder name for a typo.',
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
