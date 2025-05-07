import ActionableLink from '@/components/atoms/Link/ActionableLink';
import ExternalLinkModal from '@/components/common/ExternalLinkModal';
import ArticleIcon from '@mui/icons-material/Article';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LinkIcon from '@mui/icons-material/Link';
import MovieIcon from '@mui/icons-material/Movie';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PublicIcon from '@mui/icons-material/Public';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const YOUTUBE_REGEX = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/g;
const SPOTIFY_REGEX = /https?:\/\/(open\.spotify\.com\/(track|album|playlist|episode|show|artist)\/[\w-]+)/g;
const SOUNDCLOUD_REGEX = /https?:\/\/(soundcloud\.com\/[\w\/-]+)/g;
const DRAWING_REGEX = /\[drawing:([^\]]+)\]/g;
const ICON_REGEX = /:(\w+):/g;
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

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

const funnyIcons = [
  <EmojiEmotionsIcon sx={{ fontSize: 48, color: '#ffb300' }} />,
  <PublicIcon sx={{ fontSize: 48, color: '#1976d2' }} />,
  <MusicNoteIcon sx={{ fontSize: 48, color: '#ab47bc' }} />,
  <MovieIcon sx={{ fontSize: 48, color: '#e53935' }} />,
  <ShoppingCartIcon sx={{ fontSize: 48, color: '#43a047' }} />,
  <SportsSoccerIcon sx={{ fontSize: 48, color: '#1976d2' }} />,
  <ArticleIcon sx={{ fontSize: 48, color: '#6d4c41' }} />,
];

function getDomainIcon(url: string) {
  try {
    const domain = new URL(url).hostname;
    if (domain.includes('spotify')) return <MusicNoteIcon sx={{ fontSize: 48, color: '#1db954' }} />;
    if (domain.includes('youtube')) return <MovieIcon sx={{ fontSize: 48, color: '#e53935' }} />;
    if (domain.includes('olx') || domain.includes('amazon') || domain.includes('allegro')) return <ShoppingCartIcon sx={{ fontSize: 48, color: '#ff9800' }} />;
    if (domain.includes('news')) return <ArticleIcon sx={{ fontSize: 48, color: '#1976d2' }} />;
    if (domain.includes('sport')) return <SportsSoccerIcon sx={{ fontSize: 48, color: '#43a047' }} />;
    if (domain.includes('wikipedia')) return <PublicIcon sx={{ fontSize: 48, color: '#757575' }} />;
    // Add more fun mappings as you wish
    // Otherwise, pick a random funny icon
    return funnyIcons[Math.floor(Math.random() * funnyIcons.length)];
  } catch {
    return funnyIcons[Math.floor(Math.random() * funnyIcons.length)];
  }
}

const LinkPreviewCard = ({ url, onOpenModal }: { url: string, onOpenModal: () => void }) => {
  const [iframeError, setIframeError] = useState(false);
  const [iframeChecked, setIframeChecked] = useState(false);

  // Try to check if iframe will load (hidden)
  useEffect(() => {
    setIframeError(false);
    setIframeChecked(false);
    const test = document.createElement('iframe');
    test.style.display = 'none';
    test.src = url;
    test.onload = () => { setIframeChecked(true); test.remove(); };
    test.onerror = () => { setIframeError(true); setIframeChecked(true); test.remove(); };
    document.body.appendChild(test);
    // Timeout fallback
    const timeout = setTimeout(() => { if (!iframeChecked) { setIframeError(true); setIframeChecked(true); test.remove(); } }, 2500);
    return () => { clearTimeout(timeout); test.remove(); };
  }, [url]);

  const handleClick = (e: React.MouseEvent) => {
    if (iframeError) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      onOpenModal();
    }
  };

  return (
    <Box
      sx={{
        width: 120,
        height: 120,
        borderRadius: 3,
        boxShadow: 2,
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.07) rotate(-2deg)',
          background: 'linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%)',
        },
        border: iframeError ? '2px dashed #e53935' : '2px solid #1976d2',
        outline: iframeError ? '2px solid #e53935' : undefined,
      }}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`Open preview for ${url}`}
      title={iframeError ? 'Open in new tab' : 'Open preview'}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {getDomainIcon(url)}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 0,
            width: '100%',
            textAlign: 'center',
            color: iframeError ? '#e53935' : '#1976d2',
            fontWeight: 500,
            fontSize: 12,
            px: 1,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {url.replace(/^https?:\/\//, '').slice(0, 22)}{url.length > 30 ? '…' : ''}
        </Box>
        {iframeError && (
          <Box sx={{ color: '#e53935', fontSize: 10, mt: 0.5 }}>Open in new tab</Box>
        )}
      </Box>
    </Box>
  );
};

interface SpotifyEmbed {
  url: string;
  html: string;
}

interface TextViewAreaProps {
  text: string;
}

export const TextViewArea: React.FC<TextViewAreaProps> = ({ text }) => {
  const [spotifyEmbeds, setSpotifyEmbeds] = useState<Record<string, SpotifyEmbed>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null);

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

  // Extract all unique links from the text
  const linkMatches = Array.from(text.matchAll(URL_REGEX));
  const uniqueLinks = Array.from(new Set(linkMatches.map(m => m[0])));

  // Parsing and rendering (text only, no inline link previews)
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
          <ActionableLink key={url} href={url}>{url}</ActionableLink>
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

  // Links section rendering
  const linksSection = uniqueLinks.length > 0 && (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ fontWeight: 600, color: '#1976d2', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LinkIcon sx={{ fontSize: 22 }} /> Links
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {uniqueLinks.map(url => (
          <LinkPreviewCard key={url} url={url} onOpenModal={() => { setModalUrl(url); setModalOpen(true); }} />
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <span>{elements}</span>
      {linksSection}
      <ExternalLinkModal open={modalOpen} url={modalUrl} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default TextViewArea;