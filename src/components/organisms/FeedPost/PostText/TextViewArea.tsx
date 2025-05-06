import React, { useEffect, useState } from 'react';

const YOUTUBE_REGEX = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/g;
const SPOTIFY_REGEX = /https?:\/\/(open\.spotify\.com\/(track|album|playlist|episode|show|artist)\/[\w-]+)/g;
const SOUNDCLOUD_REGEX = /https?:\/\/(soundcloud\.com\/[\w\/-]+)/g;
const DRAWING_REGEX = /\[drawing:([^\]]+)\]/g;
const ICON_REGEX = /:(\w+):/g;

const iconMap: Record<string, string> = {
  music: '🎵',
  art: '🎨',
  video: '🎬',
  smile: '😊',
};

const renderYouTube = (id: string) => (
  <iframe
    key={id}
    width="300"
    height="169"
    src={`https://www.youtube.com/embed/${id}`}
    title="YouTube video"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    style={{ margin: '8px 0' }}
  />
);

const renderSoundCloud = (path: string) => (
  <iframe
    key={path}
    width="300"
    height="120"
    scrolling="no"
    frameBorder="no"
    allow="autoplay"
    src={`https://w.soundcloud.com/player/?url=https%3A//${path}`}
    title="SoundCloud embed"
    style={{ margin: '8px 0' }}
  />
);

const renderDrawing = (dataUrl: string) => (
  <img
    key={dataUrl}
    src={dataUrl}
    alt="Drawing"
    style={{ maxWidth: '300px', margin: '8px 0', border: '1px solid #ccc', borderRadius: 4 }}
  />
);

const renderIcon = (name: string, idx: number) => (
  <span key={name + idx} style={{ fontSize: '1.2em', margin: '0 2px' }}>{iconMap[name] || `:${name}:`}</span>
);

interface SpotifyEmbed {
  url: string;
  html: string;
}

interface TextViewAreaProps {
  text: string;
}

export const TextViewArea: React.FC<TextViewAreaProps> = ({ text }) => {
  const [spotifyEmbeds, setSpotifyEmbeds] = useState<Record<string, SpotifyEmbed>>({});

  useEffect(() => {
    // Find all Spotify links
    const matches = Array.from(text.matchAll(SPOTIFY_REGEX));
    const uniqueLinks = Array.from(new Set(matches.map(m => m[0])));
    if (uniqueLinks.length === 0) return;

    uniqueLinks.forEach(async (url) => {
      if (spotifyEmbeds[url]) return;
      try {
        const oEmbedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
        const res = await fetch(oEmbedUrl);
        const data = await res.json();
        setSpotifyEmbeds(prev => ({ ...prev, [url]: { url, html: data.html } }));
      } catch (e) {
        // fallback: do nothing
      }
    });
    // eslint-disable-next-line
  }, [text]);

  // Parsing and rendering
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  const globalRegex = new RegExp(
    [YOUTUBE_REGEX.source, SPOTIFY_REGEX.source, SOUNDCLOUD_REGEX.source, DRAWING_REGEX.source, ICON_REGEX.source].join('|'),
    'g'
  );
  let match: RegExpExecArray | null;
  let idx = 0;
  while ((match = globalRegex.exec(text))) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      // YouTube
      elements.push(renderYouTube(match[1]));
    } else if (match[2]) {
      // Spotify
      const url = match[0];
      if (spotifyEmbeds[url]) {
        elements.push(
          <span key={url} dangerouslySetInnerHTML={{ __html: spotifyEmbeds[url].html }} />
        );
      } else {
        elements.push(
          <a key={url} href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        );
      }
    } else if (match[3]) {
      // SoundCloud
      elements.push(renderSoundCloud(match[3]));
    } else if (match[4]) {
      // Drawing
      elements.push(renderDrawing(match[4]));
    } else if (match[5]) {
      // Icon
      elements.push(renderIcon(match[5], idx++));
    }
    lastIndex = globalRegex.lastIndex;
  }
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return <span>{elements}</span>;
};

export default TextViewArea; 