import { Box, Stack, useTheme } from '@mui/material';

import { StyledDevider, StyledPicturesContainer, StyledRoot } from './styles';

import ManyPicutresDisplay from './ManyPicutresDisplay';
import Picture from './Picture';
import { DisplayMode, PictureToDisplay, PicturesDisplayProps, pictureSize } from './types';

export default function PicturesDisplay({ pictures, ...rootProps }: PicturesDisplayProps) {
  const theme = useTheme();
  const mode: DisplayMode =
    pictures.length === 1 ? 'single' : pictures.length === 2 ? 'duo' : 'many';

  const cutIndex = mode === 'single' ? 1 : mode === 'duo' ? 2 : 5;
  const picturesToDisplay: PictureToDisplay[] = pictures.slice(0, cutIndex).map((picture) => ({
    src: picture,
  }));

  const pictureBorder = `1px solid ${theme.palette.secondary.light}`;

  return (
    <StyledRoot {...rootProps}>
      <StyledDevider sx={{ top: '-1px' }} />

      {mode === 'single' && (
        <StyledPicturesContainer>
          <Picture src={picturesToDisplay[0].src} size='large' quality={80} />
        </StyledPicturesContainer>
      )}

      {mode === 'duo' && (
        <StyledPicturesContainer>
          <Stack direction='row' width='100%' height='100%' position='relative'>
            <Picture
              src={picturesToDisplay[0].src}
              size='medium'
              quality={70}
              sx={{ borderRight: `1px solid ${theme.palette.secondary.light}` }}
            />
            <Picture
              src={picturesToDisplay[1].src}
              size='medium'
              quality={70}
              sx={{ borderLeft: `1px solid ${theme.palette.secondary.light}` }}
            />
          </Stack>
        </StyledPicturesContainer>
      )}
      {mode === 'many' && (
        <ManyPicutresDisplay pictures={picturesToDisplay} pictureBorder={pictureBorder} />
      )}
      <StyledDevider sx={{ bottom: '0' }} />
    </StyledRoot>
  );
}
