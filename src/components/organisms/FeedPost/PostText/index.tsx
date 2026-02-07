import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';

import ElementTextEditInput from '@/components/molecules/ElementTextEditInput';
import { parseTextWithSpotifyUrls, toSpotifyEmbedUrl } from './spotifyUtils';
import { PostTextAreaProps } from './types';

export default function PostTextArea({
  post,
  refetchPost,
  handleCloseEditMode,
  isInEditMode,
  sx,
  ...rootProps
}: PostTextAreaProps) {
  const { text, pictures, embeds } = post;

  const hasPictures = !!pictures && pictures[0] ? true : false;
  const hasText = !!text ? true : false;

  const contentSegments = useMemo(() => (text ? parseTextWithSpotifyUrls(text) : []), [text]);

  const spotifyUrlsFromText = useMemo(
    () => new Set(contentSegments.filter((s) => s.type === 'spotify').map((s) => s.embedUrl)),
    [contentSegments],
  );

  const spotifyEmbedsFromPost = useMemo(() => {
    const fromEmbeds = (embeds ?? [])
      .filter((e) => e.type === 'spotify')
      .map((e) => toSpotifyEmbedUrl(e.url))
      .filter((url): url is string => url !== null);
    return fromEmbeds.filter((url) => !spotifyUrlsFromText.has(url));
  }, [embeds, spotifyUrlsFromText]);

  const hasContent = hasText || spotifyEmbedsFromPost.length > 0 || contentSegments.length > 0;

  const isTextLong = (text && text.length > 130) || hasPictures ? true : false;
  const typographyProps = isTextLong
    ? { variant: 'body1' as const }
    : { variant: 'h4' as const, fontWeight: '400', lineHeight: '1.7rem' };

  const renderSpotifyEmbed = (embedUrl: string, key: string | number) => (
    <Box
      key={key}
      component='iframe'
      src={embedUrl}
      width='100%'
      height={152}
      frameBorder={0}
      allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
      loading='lazy'
      sx={{
        borderRadius: 2,
        mt: 1,
        mb: 1,
        maxWidth: '100%',
        display: 'block',
      }}
      title='Spotify embed'
    />
  );

  return (
    <Box pt={1} sx={sx} {...rootProps} width='100%'>
      {isInEditMode ? (
        <ElementTextEditInput
          element={post}
          elementType='post'
          handleCloseEditMode={handleCloseEditMode}
          refetchElement={refetchPost}
        />
      ) : (
        hasContent && (
          <Box data-testid='post-text-content'>
            {contentSegments.map((segment, idx) =>
              segment.type === 'text' ? (
                segment.content ? (
                  <Typography
                    key={idx}
                    {...typographyProps}
                    whiteSpace='pre-wrap'
                    component='span'
                    sx={{ display: 'block' }}>
                    {segment.content}
                  </Typography>
                ) : null
              ) : (
                renderSpotifyEmbed(segment.embedUrl, idx)
              ),
            )}
            {spotifyEmbedsFromPost.map((embedUrl, idx) =>
              renderSpotifyEmbed(embedUrl, `embed-${idx}`),
            )}
          </Box>
        )
      )}
    </Box>
  );
}
