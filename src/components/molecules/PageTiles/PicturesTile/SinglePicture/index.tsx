import { Box, ImageListItem, useTheme } from '@mui/material';

import ImageWithGradientLoading from '@/components/atoms/ImageWithGradientLoading';
import { StyledImageButton } from '../styles';
import { SinglePictureProps } from './types';

export default function SinglePicture({
  owner,
  picture,
  handleOpenFullView,
  sx,
  ...rootProps
}: SinglePictureProps) {
  const theme = useTheme();
  return (
    <ImageListItem>
      <StyledImageButton
        key={picture.id}
        focusRipple
        onClick={() => handleOpenFullView(picture)}
        sx={sx}
        {...rootProps}>
        <Box
          border={`1px solid ${theme.palette.secondary.main}`}
          width='100%'
          height='100%'
          position='relative'>
          <ImageWithGradientLoading
            src={picture.image.url}
            blurDataURL={picture.image.blurDataUrl}
            placeholder='blur'
            fill
            sizes='150px'
            style={{
              objectFit: 'cover',
              backgroundColor: picture.image.dominantHex,
            }}
            alt={`${owner.firstName} ${owner.lastName} Picture`}
          />
        </Box>
      </StyledImageButton>
    </ImageListItem>
  );
}
