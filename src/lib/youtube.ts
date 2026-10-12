/** Turns "1m30s", "90s" or "90" (as in a YouTube link's t= part) into seconds. */
function parseStart(value: string | null): number | undefined {
  if (!value) return undefined;
  const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/.exec(value.trim());
  if (!match) return undefined;
  const seconds = Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
  return seconds > 0 ? seconds : undefined;
}

/**
 * Finds the video in any normal way of writing a YouTube link: youtu.be/ID, youtube.com/watch?v=ID,
 * /shorts/ID, /embed/ID, /live/ID, with or without extra parts such as ?si=... or &t=1m30s.
 * Returns undefined when the text is not a link to a single YouTube video.
 */
export function parseYouTube(input: string): { id: string; start?: number } | undefined {
  let url: URL;
  const text = input.trim();
  try {
    // A link pasted without the "https://" part still works.
    url = new URL(/^(www\.|m\.)?(youtube\.com|youtu\.be)\//.test(text) ? `https://${text}` : text);
  } catch {
    return undefined;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return undefined;
  const host = url.hostname.replace(/^(www|m|music)\./, '');
  let id: string | undefined | null;
  if (host === 'youtu.be') {
    id = url.pathname.slice(1).split('/')[0];
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    id = url.pathname === '/watch' ? url.searchParams.get('v') : /^\/(embed|shorts|live|v)\/([^/?]+)/.exec(url.pathname)?.[2];
  }
  if (!id || !/^[\w-]{11}$/.test(id)) return undefined;
  return { id, start: parseStart(url.searchParams.get('t') ?? url.searchParams.get('start')) };
}

/** The ordinary YouTube page for the video (used when JavaScript is off, and for "Watch on YouTube"). */
export function watchUrl(id: string, start?: number) {
  return `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ''}`;
}

/** The privacy-friendly embedded player. It is only loaded after a visitor clicks play. */
export function embedUrl(id: string, start?: number) {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${start ? `&start=${start}` : ''}`;
}
