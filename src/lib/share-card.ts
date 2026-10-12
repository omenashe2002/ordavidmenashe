import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

/**
 * Draws the picture shown when a link to an article is shared (LinkedIn, Slack, iMessage, X):
 * the article's title in EB Garamond on the site's paper color, with the portrait and web address.
 * It runs while the site is being built, so every article gets its own card without any extra work.
 */
const WIDTH = 1200;
const HEIGHT = 630;
const INK = '#1d1b17';
const MUTED = '#5c564b';
const COPPER = '#964a1c';
const PAPER = '#faf6ee';

const fontFile = (name: string) =>
  fs.readFileSync(path.resolve('node_modules/@fontsource/eb-garamond/files', name));

let cache: { fonts: Parameters<typeof satori>[1]['fonts']; portrait: string } | undefined;
async function resources() {
  if (!cache) {
    const portrait = await sharp(path.resolve('src/assets/or-menashe.jpg'))
      .resize(200, 200, { fit: 'cover', position: 'north' })
      .jpeg({ quality: 88 })
      .toBuffer();
    cache = {
      fonts: [
        { name: 'EB Garamond', data: fontFile('eb-garamond-latin-500-normal.woff'), weight: 500, style: 'normal' },
        { name: 'EB Garamond', data: fontFile('eb-garamond-latin-600-normal.woff'), weight: 600, style: 'normal' },
        { name: 'EB Garamond', data: fontFile('eb-garamond-latin-400-italic.woff'), weight: 400, style: 'italic' },
      ],
      portrait: `data:image/jpeg;base64,${portrait.toString('base64')}`,
    };
  }
  return cache;
}

type Style = Record<string, string | number>;
type Node = { type: string; props: { style?: Style; children?: Node[] | string; [key: string]: unknown } };
const el = (type: string, style: Style, children?: Node[] | string, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

/** Longer titles are set smaller so they always fit on the card. */
function titleSize(title: string) {
  if (title.length <= 36) return 92;
  if (title.length <= 70) return 76;
  if (title.length <= 110) return 64;
  return 54;
}

export async function shareCard(options: { title: string; kicker?: string; tags: readonly string[] }): Promise<Buffer> {
  const { fonts, portrait } = await resources();
  const { title, kicker, tags } = options;

  const card = el('div', { display: 'flex', width: WIDTH, height: HEIGHT, background: PAPER, fontFamily: 'EB Garamond' }, [
    el('div', { width: 14, height: HEIGHT, background: COPPER }),
    el('div', { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, padding: '76px 96px 68px 82px' }, [
      el(
        'div',
        { fontSize: 28, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: COPPER, lineHeight: 1.3, maxWidth: 1000 },
        kicker ?? 'Writing',
      ),
      el('div', { fontSize: titleSize(title), fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.012em', color: INK, maxWidth: 1000, lineClamp: 5 }, title),
      el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid #ddd5c4', paddingTop: 24 }, [
        el('div', { display: 'flex', alignItems: 'center' }, [
          el('img', { width: 76, height: 76, borderRadius: 38, marginRight: 22, objectFit: 'cover' }, undefined, { src: portrait, width: 76, height: 76 }),
          el('div', { display: 'flex', flexDirection: 'column' }, [
            el('div', { fontSize: 32, fontWeight: 600, color: INK }, 'Or Menashe'),
            el('div', { fontSize: 26, fontStyle: 'italic', color: MUTED }, 'ordavidmenashe.com'),
          ]),
        ]),
        el('div', { fontSize: 26, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: COPPER }, tags.join('  ·  ')),
      ]),
    ]),
  ]);

  const svg = await satori(card as unknown as Parameters<typeof satori>[0], { width: WIDTH, height: HEIGHT, fonts });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
