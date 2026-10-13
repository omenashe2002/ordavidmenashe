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
// The gallery frame around the portrait, as on the site: walnut frame, gilt lip, cream mat.
const FRAME = '#46301c';
const LIP = '#c19a4f';
const MAT = '#f2eadb';

const fontFile = (name: string) =>
  fs.readFileSync(path.resolve('node_modules/@fontsource/eb-garamond/files', name));

let cache: { fonts: Parameters<typeof satori>[1]['fonts']; portrait: string; wide: string } | undefined;
async function resources() {
  if (!cache) {
    // .rotate() turns a photo the right way up when it carries a rotation tag, as phone photos do.
    const photo = () => sharp(path.resolve('src/assets/or-menashe.jpg')).rotate();
    const small = await photo().resize(200, 200, { fit: 'cover', position: 'north' }).jpeg({ quality: 88 }).toBuffer();
    // The tall portrait on the general card is blended into the cream mat, as on the Home page.
    const tall = await photo().resize(708, 936, { fit: 'cover', position: 'north' }).jpeg({ quality: 92 }).toBuffer();
    const blended = await sharp({ create: { width: 708, height: 936, channels: 3, background: MAT } })
      .composite([{ input: tall, blend: 'multiply' }])
      .jpeg({ quality: 90 })
      .toBuffer();
    cache = {
      fonts: [
        { name: 'EB Garamond', data: fontFile('eb-garamond-latin-500-normal.woff'), weight: 500, style: 'normal' },
        { name: 'EB Garamond', data: fontFile('eb-garamond-latin-600-normal.woff'), weight: 600, style: 'normal' },
        { name: 'EB Garamond', data: fontFile('eb-garamond-latin-400-italic.woff'), weight: 400, style: 'italic' },
      ],
      portrait: `data:image/jpeg;base64,${small.toString('base64')}`,
      wide: `data:image/jpeg;base64,${blended.toString('base64')}`,
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
          el('div', { display: 'flex', boxSizing: 'border-box', width: 88, height: 88, borderRadius: 44, marginRight: 22, border: `3px solid ${FRAME}` }, [
            el('div', { display: 'flex', boxSizing: 'border-box', flex: 1, borderRadius: 41, border: `1px solid ${LIP}`, padding: 1, background: MAT }, [
              el('img', { width: 78, height: 78, borderRadius: 39, objectFit: 'cover' }, undefined, { src: portrait, width: 78, height: 78 }),
            ]),
          ]),
          el('div', { display: 'flex', flexDirection: 'column' }, [
            el('div', { fontSize: 32, fontWeight: 600, color: INK }, 'Or Menashe'),
            el('div', { fontSize: 26, fontStyle: 'italic', color: MUTED }, 'ordavidmenashe.com'),
          ]),
        ]),
        el('div', { fontSize: 26, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: COPPER }, tags.join('  ·  ')),
      ]),
    ]),
  ]);

  return render(card, fonts);
}

/** Draws a card to a PNG. If the text contains a character the card's font does not have, this throws, so callers can fall back. */
async function render(card: Node, fonts: Parameters<typeof satori>[1]['fonts']): Promise<Buffer> {
  const svg = await satori(card as unknown as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts,
    // satori calls this for any character the loaded fonts lack; stopping here avoids a card full of empty boxes.
    loadAdditionalAsset: async (_language: string, segment: string) => {
      throw new Error(`The card font has no glyph for "${segment}".`);
    },
  });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}

/** The general card, shown when the Home page or any page other than an article is shared: the tagline and the portrait. */
export async function generalCard(): Promise<Buffer> {
  const { fonts, wide } = await resources();
  const abs = (style: Style): Style => ({ position: 'absolute', display: 'flex', ...style });
  const card = el('div', { display: 'flex', position: 'relative', width: WIDTH, height: HEIGHT, background: PAPER, fontFamily: 'EB Garamond' }, [
    el('div', abs({ left: 0, top: 0, width: 14, height: HEIGHT, background: COPPER })),
    el('div', abs({ left: 96, top: 92, fontSize: 32, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: COPPER }), 'Or Menashe'),
    el('div', abs({ left: 96, top: 176, width: 620, fontSize: 96, fontWeight: 500, lineHeight: 1.03, letterSpacing: '-0.014em', color: INK }), 'Law, digital assets, and AI.'),
    el('div', abs({ left: 96, bottom: 84, width: 560, borderTop: '2px solid #ddd5c4', paddingTop: 24, fontSize: 30, fontStyle: 'italic', color: MUTED }), 'ordavidmenashe.com'),
    el('div', abs({ right: 96, top: 66, boxSizing: 'border-box', width: 384, height: 498, border: `8px solid ${FRAME}` }), [
      el('div', { display: 'flex', boxSizing: 'border-box', flex: 1, border: `1px solid ${LIP}`, padding: 6, background: MAT }, [
        el('img', { width: 354, height: 468, objectFit: 'cover' }, undefined, { src: wide, width: 354, height: 468 }),
      ]),
    ]),
  ]);
  return render(card, fonts);
}
