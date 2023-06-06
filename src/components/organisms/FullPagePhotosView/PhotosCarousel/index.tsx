import { Box, useTheme } from '@mui/material';

import {
  StyledButtonIcon,
  StyledPhotosWrapper,
  StyledRoot,
  StyledSwitchAreaButton,
} from './styles';

import Icon from '@/components/atoms/Icon/Icon';

import Image from 'next/image';
import { PhotosCarouselProps } from './types';

export default function PhotosCarousel({
  picturesUrls,
  currentPictureIndex,
  setCurrentPictureIndex,
  setOpen,
  sx,
  ...rootProps
}: PhotosCarouselProps) {
  const theme = useTheme();
  const currentPictureUrl = picturesUrls?.[currentPictureIndex];

  const handleSwitchPicture = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      if (currentPictureIndex === 0) {
        setCurrentPictureIndex((picturesUrls?.length || 1) - 1);
      } else {
        setCurrentPictureIndex(currentPictureIndex - 1);
      }
    }
    if (direction === 'right') {
      if (currentPictureIndex === (picturesUrls?.length || 1) - 1) {
        setCurrentPictureIndex(0);
      } else {
        setCurrentPictureIndex(currentPictureIndex + 1);
      }
    }
  };
  const screens = {
    small: `(max-width: ${theme.breakpoints.values.sm}px)`,
    medium: `(max-width: ${theme.breakpoints.values.md}px)`,
    large: `(max-width: ${theme.breakpoints.values.xl}px)`,
  };
  const imageSizes = [
    `${screens.small} 600px`,
    `${screens.medium} 700px`,
    `${screens.large} 800px`,
    `1100px`,
  ].join(', ');

  const isMoreThenOnePicture = (picturesUrls?.length || 0) > 1 || false;
  if (!picturesUrls) return null;
  return (
    <>
      <StyledRoot {...rootProps} sx={sx}>
        <StyledPhotosWrapper>
          <Box
            position='absolute'
            left={0}
            width='100%'
            height='100%'
            onClick={() => setOpen(false)}
          />
          <Box position='relative' width='100%' height='100%'>
            <Image
              src={currentPictureUrl || ''}
              fill
              sizes={imageSizes}
              quality={100}
              style={{ objectFit: 'contain' }}
              alt='Full Size Photo'
              unoptimized
            />
          </Box>
        </StyledPhotosWrapper>

        {isMoreThenOnePicture && (
          <>
            <StyledSwitchAreaButton
              onClick={() => handleSwitchPicture('left')}
              focusRipple
              sx={{ left: 0 }}>
              <StyledButtonIcon className='icon leftIcon'>
                <Icon icon='angle-left' fontSize='25px' />
              </StyledButtonIcon>
            </StyledSwitchAreaButton>
            <StyledSwitchAreaButton onClick={() => handleSwitchPicture('right')} sx={{ right: 0 }}>
              <StyledButtonIcon className='icon rightIcon'>
                <Icon icon='angle-right' fontSize='25px' />
              </StyledButtonIcon>
            </StyledSwitchAreaButton>
          </>
        )}
      </StyledRoot>
    </>
  );
}
