const SPOTIFY_URL_PATTERN =
  /https?:\/\/open\.spotify\.com\/(track|album|playlist|episode|show|artist)\/([a-zA-Z0-9]+)(?:\?[^\s]*)?/;

export type ContentSegment =
  | { type: 'text'; content: string }
  | { type: 'spotify'; embedUrl: string };

export function toSpotifyEmbedUrl(url: string): string | null {
  const match = url.match(SPOTIFY_URL_PATTERN);
  if (!match) return null;

  const [, contentType, contentId] = match;
  return `https://open.spotify.com/embed/${contentType}/${contentId}`;
}

export function parseTextWithSpotifyUrls(text: string): ContentSegment[] {
  if (!text) return [];

  const segments: ContentSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const regex = new RegExp(SPOTIFY_URL_PATTERN.source, 'g');

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch] = match;
    const textBefore = text.slice(lastIndex, match.index).trimEnd();
    if (textBefore) {
      segments.push({ type: 'text', content: textBefore });
    }

    const embedUrl = toSpotifyEmbedUrl(fullMatch);
    if (embedUrl) {
      segments.push({ type: 'spotify', embedUrl });
    }

    lastIndex = regex.lastIndex;
  }

  const remaining = text.slice(lastIndex).trimStart();
  if (remaining) {
    segments.push({ type: 'text', content: remaining });
  }

  return segments;
}
