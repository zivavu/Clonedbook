import { Stack, useTheme } from '@mui/material';

import { StyledPicturesContainer, StyledRoot } from './styles';

import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import { IPictureWithPlaceholders } from '@/types/picture';
import ManyPicutresDisplay from './ManyPicutresDisplay';
import Picture from './Picture';
import { PicturesDisplayProps, TDisplayMode } from './types';

export default function PicturesDisplay({
  pictures,
  postId,
  sx,
  ...rootProps
}: PicturesDisplayProps) {
  const theme = useTheme();

  const mode: TDisplayMode =
    pictures.length === 1 ? 'single' : pictures.length === 2 ? 'duo' : 'many';
  //undefined as a second slice parameter means that we display all pictures
  const cutIndex = mode === 'single' ? 1 : mode === 'duo' ? 2 : undefined;

  const picturesToDisplay: IPictureWithPlaceholders[] = pictures.slice(0, cutIndex);

  const pictureBorder = `1px solid ${theme.palette.background.paper}`;

  return (
    <StyledRoot sx={sx} {...rootProps}>
      <HorizontalContentDevider sx={{ top: '-1px' }} />

      {mode === 'single' && (
        <StyledPicturesContainer>
          <Picture picture={picturesToDisplay[0]} postId={postId} size='large' />
        </StyledPicturesContainer>
      )}

      {mode === 'duo' && (
        <StyledPicturesContainer>
          <Stack direction='row' width='100%' height='100%' position='relative'>
            <Picture picture={picturesToDisplay[0]} postId={postId} size='medium' />
            <Picture picture={picturesToDisplay[1]} postId={postId} size='medium' />
          </Stack>
        </StyledPicturesContainer>
      )}

      {mode === 'many' && (
        <ManyPicutresDisplay
          pictures={picturesToDisplay}
          pictureBorder={pictureBorder}
          postId={postId}
        />
      )}
      <HorizontalContentDevider sx={{ bottom: '0' }} />
    </StyledRoot>
  );
}
