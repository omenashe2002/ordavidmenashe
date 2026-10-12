import fs from 'node:fs';
import path from 'node:path';

/**
 * Checks every file in src/content/writing/ before the site is built, and stops with a plain-English
 * message when something would otherwise be skipped or published wrongly. The messages name the file.
 */
const FOLDER = path.resolve('src/content/writing');
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

export function checkArticleFiles() {
  if (!fs.existsSync(FOLDER)) return;
  for (const file of listFiles(FOLDER)) {
    const name = path.basename(file);
    if (!name.endsWith('.md')) {
      const suggestion = name.replace(/\.[^.]*$/, '') + '.md';
      fail(
        file,
        `This file would not be published, because article files must end in .md (lowercase). Rename it, for example to "${suggestion}". Images do not belong in this folder; put them in public/images/.`,
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
      else if (value && !/^["'[{|>]/.test(value) && /:(\s|$)/.test(value)) {
        fail(file, `The ${key} contains a colon, so it must be wrapped in quotation marks, like this: ${key}: "${value}"`);
      }
    }
  }
}
