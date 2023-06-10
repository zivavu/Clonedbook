import { Stack } from '@mui/material';

import { uuidv4 } from '@firebase/util';
import Picture from '../Picture';
import { StyledPicturesContainer } from '../styles';
import { pictureSize } from '../types';
import LastPicture from './LastPicture';
import { Layouts, ManyPicutresDisplayProps } from './types';

export default function ManyPicutresDisplay({
  pictures,
  pictureBorder,
  postId,
}: ManyPicutresDisplayProps) {
  //Used in next/image component for image optimization
  function getPictureSizeAndQuality(i: number) {
    let size: pictureSize = 'medium';
    let quality: number = 60;
    if (i < 2) {
      size = 'medium';
      quality = 80;
    }
    if (i === 0) {
      size = 'large';
      quality = 90;
    } else {
      size = 'small';
      quality = 50;
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

  const picturesToDisplay = pictures.map((picture, i) => {
    const { size, quality, id } = getPictureSizeAndQuality(i);
    const isLastPicture = pictures.length >= 5 && i === 4;
    //Returns a single picture, or a picture with an overlay if it is the 5th picture
    return !isLastPicture ? (
      <Picture
        key={id}
        picture={picture}
        quality={quality}
        size={size}
        sx={usedLayout[i]}
        postId={postId}
      />
    ) : (
      <LastPicture
        picture={picture}
        key={id}
        picturesLength={pictures.length}
        postId={postId}
        quality={quality}
        size={size}
        sx={usedLayout[i]}
      />
    );
  });

  return (
    <>
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
    </>
  );
}
