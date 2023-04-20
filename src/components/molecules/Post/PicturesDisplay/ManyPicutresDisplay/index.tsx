import { Box, BoxProps, Stack, SxProps, Theme, Typography, useTheme } from '@mui/material';

import { uuidv4 } from '@firebase/util';
import Picture from '../Picture';
import { StyledPicturesContainer } from '../styles';
import { pictureSize } from '../types';
import { Layouts, ManyPicutresDisplayProps } from './types';

export default function ManyPicutresDisplay({
  pictures,
  pictureBorder,
  ...rootProps
}: ManyPicutresDisplayProps) {
  const theme = useTheme();
  //Used in next/image component for image optimization
  function getPictureSizeAndQuality(i: number) {
    let size: pictureSize = 'medium';
    let quality: number = 60;
    if (i < 2) {
      size = 'medium';
      quality = 60;
    } else {
      size = 'small';
      quality = 20;
    }
    return {
      size,
      quality,
      id: uuidv4(),
    };
  }

  const layouts: Layouts = {
    //single layout is an array of objects with sx of every picture used in layout
    triple: [
      { width: '100%', borderBottom: pictureBorder },
      { width: '50%', borderTop: pictureBorder, borderRight: pictureBorder },
      { width: '50%', borderTop: pictureBorder, borderLeft: pictureBorder },
    ],
    quadruple: [
      { width: '50%', borderBottom: pictureBorder, borderRight: pictureBorder },
      { width: '50%', borderBottom: pictureBorder, borderLeft: pictureBorder },
      { width: '50%', borderTop: pictureBorder, borderRight: pictureBorder },
      { width: '50%', borderTop: pictureBorder, borderLeft: pictureBorder },
    ],
    fiveAndMore: [
      {
        width: '50%',
        borderBottom: pictureBorder,
        borderRight: pictureBorder,
      },
      { width: '50%', borderBottom: pictureBorder, borderLeft: pictureBorder },
      {
        width: '33.33%',
        borderTop: pictureBorder,
        borderRight: pictureBorder,
      },
      {
        width: '33.33%',
        borderTop: pictureBorder,
        borderLeft: pictureBorder,
        borderRight: pictureBorder,
      },
      {
        width: '33.33%',
        borderTop: pictureBorder,
        borderLeft: pictureBorder,
      },
    ],
  };

  const usedLayout =
    pictures.length === 3
      ? layouts.triple
      : pictures.length === 4
      ? layouts.quadruple
      : layouts.fiveAndMore;

  const picturesToDisplay = pictures.slice(0, 5).map((picture, i) => {
    const { size, quality, id } = getPictureSizeAndQuality(i);
    return <Picture key={id} src={picture.src} quality={quality} size={size} sx={usedLayout[i]} />;
  });

  return (
    <>
      {picturesToDisplay.length >= 5 && (
        <StyledPicturesContainer sx={{ height: '600px' }}>
          <Stack height='55%' direction='row' position='relative'>
            {picturesToDisplay.slice(0, 2)}
          </Stack>
          <Stack height='45%' direction='row' position='relative'>
            {picturesToDisplay.slice(2, 5)}
          </Stack>
        </StyledPicturesContainer>
      )}
      {picturesToDisplay.length === 4 && (
        <StyledPicturesContainer sx={{ height: '600px' }}>
          <Stack width='100%' height='50%' direction='row'>
            {picturesToDisplay.slice(0, 2)}
          </Stack>
          <Stack direction='row' width='100%' height='50%'>
            {picturesToDisplay.slice(2)}
          </Stack>
        </StyledPicturesContainer>
      )}
      {picturesToDisplay.length === 3 && (
        <StyledPicturesContainer sx={{ height: '600px' }}>
          <Stack direction='row' position='relative' width='100%' height='60%'>
            {picturesToDisplay.slice(0, 1)}
          </Stack>
          <Stack direction='row' position='relative' width='100%' height='40%'>
            {picturesToDisplay.slice(1, 3)}
          </Stack>
        </StyledPicturesContainer>
      )}
    </>
  );
}