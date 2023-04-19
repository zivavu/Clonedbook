import { Box, BoxProps, Stack, SxProps, Theme, Typography, useTheme } from '@mui/material';

import { uuidv4 } from '@firebase/util';
import Picture from '../Picture';
import { pictureSize } from '../types';
import { Layouts, ManyPicutresDisplayProps } from './types';

export default function ManyPicutresDisplay({ pictures, ...rootProps }: ManyPicutresDisplayProps) {
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
  const layouts = {
    triple: [{ width: '100%' }, { width: '50%' }, { width: '50%' }],
    quadruple: [{ width: '50%' }, { width: '50%' }, { width: '50%' }, { width: '50%' }],
    fiveAndMore: [
      { width: '50%' },
      { width: '50%' },
      { width: '33.3%' },
      { width: '33.3%' },
      { width: '33.3%' },
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
    return (
      <Picture key={id} src={picture.src} quality={quality} size={size} sx={{ ...usedLayout[i] }} />
    );
  });
  return (
    <>
      {picturesToDisplay.length >= 5 && (
        <Stack width='100%' height='100%' position='relative'>
          <Stack height='70%' direction='row' position='relative'>
            {picturesToDisplay.slice(0, 2)}
          </Stack>
          <Stack height='30%' direction='row' position='relative'>
            {picturesToDisplay.slice(3)}
          </Stack>
        </Stack>
      )}
      {picturesToDisplay.length === 4 && (
        <Stack width='100%' height='100%' position='relative'>
          <Stack width='100%' height='50%' direction='row'>
            {picturesToDisplay.slice(0, 2)}
          </Stack>
          <Stack direction='row' width='100%' height='50%'>
            {picturesToDisplay.slice(2)}
          </Stack>
        </Stack>
      )}
      {console.log(picturesToDisplay.length, picturesToDisplay?.slice(1, 2))}
      {picturesToDisplay.length === 3 && (
        <Stack width='100%' height='100%' position='relative'>
          <Stack direction='row' position='relative' width='100%' height='60%'>
            {picturesToDisplay.slice(0, 1)}
          </Stack>
          <Stack direction='row' position='relative' width='100%' height='40%'>
            {picturesToDisplay.slice(1, 3)}
          </Stack>
        </Stack>
      )}
    </>
  );
}
