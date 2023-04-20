import { Box, Stack, Typography, useTheme } from '@mui/material';

import { uuidv4 } from '@firebase/util';
import Picture from '../Picture';
import { StyledPicturesContainer } from '../styles';
import { pictureSize } from '../types';
import { Layouts, ManyPicutresDisplayProps } from './types';

export default function ManyPicutresDisplay({ pictures, pictureBorder }: ManyPicutresDisplayProps) {
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
  console.log(pictures);

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

  const picturesToDisplay = pictures.map((picture, i) => {
    const { size, quality, id } = getPictureSizeAndQuality(i);
    //if there are more than 5 pictures and we are on the 5th picture we want to display a box with number of pictures left
    const isShowMorePicture = pictures.length >= 5 && i === 4;

    return !isShowMorePicture ? (
      <Picture key={id} src={picture.src} quality={quality} size={size} sx={usedLayout[i]} />
    ) : (
      <Box sx={{ ...usedLayout[i], position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            zIndex: '1',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            height: '100%',
          }}
        >
          <Typography
            variant='h4'
            color={theme.palette.common.white}
            sx={{
              position: 'absolute',
              fontWeight: '400',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            +{pictures.length - 4}
          </Typography>
        </Box>
        <Picture key={id} src={picture.src} quality={quality} size={size}></Picture>
      </Box>
    );
  });
  return (
    <>
      {picturesToDisplay.length >= 5 && (
        <StyledPicturesContainer sx={{ height: '600px' }}>
          <Stack height='60%' direction='row' position='relative'>
            {picturesToDisplay.slice(0, 2)}
          </Stack>
          <Stack height='40%' direction='row' position='relative'>
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
