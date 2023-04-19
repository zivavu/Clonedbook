import { Box, useTheme } from '@mui/material';

import { StyledDevider, StyledRoot } from './styles';

import { uuidv4 } from '@firebase/util';
import Picture from './Picture';
import { DisplayMode, PictureToDisplay, PicturesDisplayProps, pictureSize } from './types';

export default function PicturesDisplay({ pictures, ...rootProps }: PicturesDisplayProps) {
  const theme = useTheme();
  const mode: DisplayMode =
    pictures.length === 1 ? 'single' : pictures.length === 2 ? 'duo' : 'many';

  //Used in next/image component for image optimization
  function getPictureSizeAndQuality(mode: DisplayMode, i: number, getId?: boolean) {
    let size: pictureSize = 'medium';
    let quality: number = 60;
    const id = getId ? uuidv4() : null;
    if (mode === 'many') {
      if (i < 2) {
        size = 'medium';
        quality = 60;
      } else {
        size = 'small';
        quality = 20;
      }
    }
    return {
      size,
      quality,
      id,
    };
  }

  const cutIndex = mode === 'single' ? 1 : mode === 'duo' ? 2 : 5;
  const picturesToDisplay: PictureToDisplay[] = pictures.slice(0, cutIndex).map((picture) => ({
    src: picture,
  }));

  return (
    <StyledRoot {...rootProps}>
      <StyledDevider sx={{ top: '-1px' }} />
      {mode === 'single' && <Picture src={picturesToDisplay[0].src} size='large' quality={80} />}
      {mode === 'duo' && (
        <>
          <Picture src={picturesToDisplay[0].src} size='medium' quality={70} />
          <Picture src={picturesToDisplay[1].src} size='medium' quality={70} />
        </>
      )}
      {mode === 'many' && (
        <Box>
          {picturesToDisplay.map((picture, i) => {
            const { size, quality, id } = getPictureSizeAndQuality(mode, i, true);
            return <Picture key={id} src={picture.src} quality={quality} size={size}></Picture>;
          })}
        </Box>
      )}
      <StyledDevider sx={{ bottom: '0' }} />
    </StyledRoot>
  );
}
