import { Box, useTheme } from '@mui/material';

import { StyledButtonIcon, StyledRoot, StyledSwitchAreaButton } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import Image from 'next/image';

import { useState } from 'react';
import { PhotosCarouselProps } from './types';

export default function PhotosCarousel({
  post,
  initialPhoto,
  sx,
  ...rootProps
}: PhotosCarouselProps) {
  const theme = useTheme();
  const [currentPictureIndex, setCurrentPicture] = useState(
    post.postPictures?.indexOf(initialPhoto) || 0,
  );
  const [currentPictureUrl, setCurrentPictureUrl] = useState<string | undefined>(initialPhoto);

  const handleSwitchPicture = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      if (currentPictureIndex === 0) {
        setCurrentPicture((post.postPictures?.length || 1) - 1);
        setCurrentPictureUrl(post.postPictures?.[post.postPictures?.length - 1]);
      } else {
        setCurrentPicture(currentPictureIndex - 1);
        setCurrentPictureUrl(post.postPictures?.[currentPictureIndex - 1]);
      }
    }
    if (direction === 'right') {
      if (currentPictureIndex === (post.postPictures?.length || 1) - 1) {
        setCurrentPicture(0);
        setCurrentPictureUrl(post.postPictures?.[0]);
      } else {
        setCurrentPicture(currentPictureIndex + 1);
        setCurrentPictureUrl(post.postPictures?.[currentPictureIndex + 1]);
      }
    }
  };

  const screens = {
    small: `(max-width: ${theme.breakpoints.values.sm}px)`,
    medium: `(max-width: ${theme.breakpoints.values.md}px)`,
    large: `(max-width: ${theme.breakpoints.values.xl}px)`,
  };
  const imageSizes = [
    `${screens.small} 400px`,
    `${screens.medium} 500px`,
    `${screens.large} 600px`,
    `1100px`,
  ].join(', ');

  const isMoreThenOnePicture = (post?.postPictures?.length || 0) > 1 || false;
  if (!post.postPictures) return null;
  return (
    <StyledRoot {...rootProps} sx={sx}>
      <Image
        src={currentPictureUrl || ''}
        fill
        sizes={imageSizes}
        quality={100}
        blurDataURL={currentPictureUrl || ''}
        placeholder='blur'
        style={{ objectFit: 'contain', padding: theme.spacing(0, 16) }}
        alt='Full Size Photo'
      />

      {isMoreThenOnePicture && (
        <Box>
          <StyledSwitchAreaButton
            onClick={() => handleSwitchPicture('left')}
            focusRipple
            sx={{ left: 0 }}
          >
            <StyledButtonIcon className='icon leftIcon'>
              <Icon icon='angle-left' fontSize='25px' />
            </StyledButtonIcon>
          </StyledSwitchAreaButton>
          <StyledSwitchAreaButton onClick={() => handleSwitchPicture('right')} sx={{ right: 0 }}>
            <StyledButtonIcon className='icon rightIcon'>
              <Icon icon='angle-right' fontSize='25px' />
            </StyledButtonIcon>
          </StyledSwitchAreaButton>
        </Box>
      )}
    </StyledRoot>
  );
}
