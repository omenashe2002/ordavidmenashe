import fs from 'node:fs';
import path from 'node:path';

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
    for (const line of lines.slice(1, end)) {
      const setting = /^(title|description|date):\s*(.*)$/.exec(line);
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
