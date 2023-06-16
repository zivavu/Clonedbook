import { Stack, useTheme } from '@mui/material';

import Picture from '../Picture';
import { StyledPicturesContainer } from '../styles';
import LastPicture from './LastPicture';
import { Layouts, ManyPicutresDisplayProps } from './types';

export default function ManyPicutresDisplay({
  pictures,
  pictureBorder: border,
  postId,
}: ManyPicutresDisplayProps) {
  const theme = useTheme();

  const layouts: Layouts = {
    //single layout is an array of objects with sx of every picture[i] used in layout
    triple: [
      { width: '100%', borderBottom: border },
      { width: '50%', borderTop: border, borderRight: border },
      { width: '50%', borderTop: border, borderLeft: border },
    ],
    quadruple: [
      { width: '50%', borderBottom: border, borderRight: border },
      { width: '50%', borderBottom: border, borderLeft: border },
      { width: '50%', borderTop: border, borderRight: border },
      { width: '50%', borderTop: border, borderLeft: border },
    ],
    fiveAndMore: [
      { width: '50%', borderBottom: border, borderRight: border },
      { width: '50%', borderBottom: border, borderLeft: border },
      { width: '33.33%', borderTop: border, borderRight: border },
      { width: '33.33%', borderTop: border, borderLeft: border, borderRight: border },
      { width: '33.33%', borderTop: border, borderLeft: border },
    ],
  };

  const usedLayout =
    pictures.length === 3
      ? layouts.triple
      : pictures.length === 4
      ? layouts.quadruple
      : layouts.fiveAndMore;

  return (
    <>
      {pictures.length === 3 && (
        <StyledPicturesContainer
          sx={{
            height: '600px',
            [theme.breakpoints.down('sm')]: {
              height: '400px',
            },
          }}>
          <Stack direction='row' position='relative' width='100%' height='60%'>
            {pictures.slice(0, 1).map((picture) => (
              <Picture key={picture.url} picture={picture} postId={postId} imageSize='medium' />
            ))}
          </Stack>
          <Stack direction='row' position='relative' width='100%' height='40%'>
            {pictures.slice(1, 3).map((picture) => (
              <Picture key={picture.url} picture={picture} postId={postId} imageSize='medium' />
            ))}
          </Stack>
        </StyledPicturesContainer>
      )}

      {pictures.length === 4 && (
        <StyledPicturesContainer
          sx={{
            height: '600px',
            [theme.breakpoints.down('sm')]: {
              height: '400px',
            },
          }}>
          <Stack width='100%' height='50%' direction='row'>
            {pictures.slice(0, 2).map((picture) => (
              <Picture key={picture.url} picture={picture} postId={postId} imageSize='medium' />
            ))}
          </Stack>
          <Stack direction='row' width='100%' height='50%'>
            {pictures.slice(2, 4).map((picture) => (
              <Picture key={picture.url} picture={picture} postId={postId} imageSize='medium' />
            ))}
          </Stack>
        </StyledPicturesContainer>
      )}

      {pictures.length >= 5 && (
        <StyledPicturesContainer
          sx={{
            height: '600px',
            [theme.breakpoints.down('sm')]: {
              height: '400px',
            },
          }}>
          <Stack height='60%' direction='row' position='relative'>
            {pictures.slice(0, 2).map((picture, i) => (
              <Picture
                key={picture.url}
                picture={picture}
                postId={postId}
                imageSize='medium'
                sx={usedLayout[i]}
              />
            ))}
          </Stack>
          <Stack height='40%' direction='row' position='relative'>
            {pictures.slice(2, 4).map((picture, i) => (
              <Picture
                key={picture.url}
                picture={picture}
                postId={postId}
                imageSize='medium'
                sx={usedLayout[2 + i]}
              />
            ))}
            {pictures.slice(4, 5).map((picture) => (
              <LastPicture
                key={picture.url}
                picture={picture}
                postId={postId}
                picturesLength={pictures.length}
                sx={usedLayout[4]}
              />
            ))}
          </Stack>
        </StyledPicturesContainer>
      )}
    </>
  );
}
