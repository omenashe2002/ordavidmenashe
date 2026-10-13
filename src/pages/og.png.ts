import { generalCard } from '../lib/share-card';

// The picture shown when the Home page, About, Contact or any page other than an article is shared: /og.png.
// It is drawn at build time from the portrait in src/assets, so replacing the photo updates it too.
export async function GET() {
  return new Response(new Uint8Array(await generalCard()), { headers: { 'Content-Type': 'image/png' } });
}
