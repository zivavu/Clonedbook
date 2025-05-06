import React from 'react';

// Regex patterns for embeds and icons
const YOUTUBE_REGEX = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/g;
const SPOTIFY_REGEX = /https?:\/\/(open\.spotify\.com\/(track|album|playlist)\/[\w-]+)/g;
const SOUNDCLOUD_REGEX = /https?:\/\/(soundcloud\.com\/[\w\/-]+)/g;
const DRAWING_REGEX = /\[drawing:([^\]]+)\]/g;
const ICON_REGEX = /:(\w+):/g;

// Helper renderers
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

const renderSpotify = (spotifyPath: string) => (
  <iframe
    key={spotifyPath}
    src={`https://open.spotify.com/embed/${spotifyPath}`}
    width="300"
    height="80"
    frameBorder="0"
    allow="encrypted-media"
    title="Spotify embed"
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

const iconMap: Record<string, string> = {
  music: '🎵',
  art: '🎨',
  video: '🎬',
  smile: '😊',
  // Add more icons as needed
};

const renderIcon = (name: string, idx: number) => (
  <span key={name + idx} style={{ fontSize: '1.2em', margin: '0 2px' }}>{iconMap[name] || `:${name}:`}</span>
);

interface ParsedPostTextProps {
  text: string;
}

export const ParsedPostText: React.FC<ParsedPostTextProps> = ({ text }) => {
  // Split and parse the text
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regexes = [YOUTUBE_REGEX, SPOTIFY_REGEX, SOUNDCLOUD_REGEX, DRAWING_REGEX, ICON_REGEX];
  const globalRegex = new RegExp(
    [YOUTUBE_REGEX.source, SPOTIFY_REGEX.source, SOUNDCLOUD_REGEX.source, DRAWING_REGEX.source, ICON_REGEX.source].join('|'),
    'g'
  );

  let idx = 0;
  while ((match = globalRegex.exec(text))) {
    // Add text before the match
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      // YouTube
      elements.push(renderYouTube(match[1]));
    } else if (match[2]) {
      // Spotify
      elements.push(renderSpotify(match[2]));
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
  // Add any remaining text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return <span>{elements}</span>;
};

export default ParsedPostText; 