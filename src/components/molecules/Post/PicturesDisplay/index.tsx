import { Box, Stack, useTheme } from '@mui/material';

import { StyledDevider, StyledRoot } from './styles';

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

  return (
    <StyledRoot {...rootProps}>
      <StyledDevider sx={{ top: '-1px' }} />
      {mode === 'single' && <Picture src={picturesToDisplay[0].src} size='large' quality={80} />}
      {mode === 'duo' && (
        <Stack direction='row' width='100%' height='100%' position='relative'>
          <Picture src={picturesToDisplay[0].src} size='medium' quality={70} />
          <Picture src={picturesToDisplay[1].src} size='medium' quality={70} />
        </Stack>
      )}
      {mode === 'many' && <ManyPicutresDisplay pictures={picturesToDisplay} />}
      <StyledDevider sx={{ bottom: '0' }} />
    </StyledRoot>
  );
}
