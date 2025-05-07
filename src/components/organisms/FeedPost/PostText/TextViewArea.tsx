import ActionableLink from '@/components/atoms/Link/ActionableLink';
import ExternalLinkModal from '@/components/common/ExternalLinkModal';
import LinkIcon from '@mui/icons-material/Link';
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

const LinkPreviewCard = ({ url, onOpenModal }: { url: string, onOpenModal: () => void }) => {
  const [iframeError, setIframeError] = useState(false);

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 3,
        overflow: 'hidden',
        width: 400,
        my: 2,
        boxShadow: 3,
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': {
          boxShadow: 8,
          transform: 'translateY(-2px) scale(1.02)',
        },
        position: 'relative',
        background: '#fff',
      }}
      onClick={onOpenModal}
      tabIndex={0}
      role="button"
      aria-label={`Open preview for ${url}`}
    >
      {!iframeError ? (
        <Box sx={{ position: 'relative', width: '100%', height: 225, background: '#f5f5f5' }}>
          <iframe
            src={url}
            width="100%"
            height="225"
            style={{ border: 'none', borderRadius: 0 }}
            title="Link preview"
            sandbox="allow-scripts allow-same-origin allow-popups"
            loading="lazy"
            onError={() => setIframeError(true)}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.2s',
              pointerEvents: 'none',
              '&:hover': { opacity: 1 },
            }}
            className="preview-card-overlay"
          >
            <Box
              sx={{
                bgcolor: 'rgba(0,0,0,0.55)',
                color: '#fff',
                px: 3,
                py: 1,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: 18,
                boxShadow: 2,
              }}
            >
              Open Preview
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ width: '100%', height: 225, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
          <span style={{ color: '#888', fontStyle: 'italic' }}>Preview unavailable</span>
        </Box>
      )}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 320, color: '#333', fontWeight: 500 }}>
          {url}
        </span>
        <Box
          sx={{
            bgcolor: '#1976d2',
            color: '#fff',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            fontWeight: 600,
            fontSize: 14,
            boxShadow: 1,
            ml: 2,
            transition: 'background 0.2s',
            '&:hover': { bgcolor: '#1565c0' },
            pointerEvents: 'none',
          }}
        >
          ↗
        </Box>
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
          <Box
            key={url}
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
                transform: 'scale(1.04)',
              },
            }}
            onClick={() => { setModalUrl(url); setModalOpen(true); }}
            tabIndex={0}
            role="button"
            aria-label={`Open preview for ${url}`}
          >
            <LinkIcon sx={{ fontSize: 48, color: '#1976d2' }} />
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 0,
                width: '100%',
                textAlign: 'center',
                color: '#1976d2',
                fontWeight: 500,
                fontSize: 12,
                px: 1,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
              title={url}
            >
              {url.replace(/^https?:\/\//, '').slice(0, 22)}{url.length > 30 ? '…' : ''}
            </Box>
          </Box>
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