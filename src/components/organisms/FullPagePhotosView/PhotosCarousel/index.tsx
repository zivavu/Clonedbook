import { Box, useTheme } from '@mui/material';

import {
  StyledButtonIcon,
  StyledPhotosWrapper,
  StyledRoot,
  StyledSwitchAreaButton,
} from './styles';

import Icon from '@/components/atoms/Icon/Icon';

import Image from 'next/image';
import { KeyboardEvent, useCallback, useEffect } from 'react';
import { PhotosCarouselProps } from './types';

export default function PhotosCarousel({
  pictures,
  currentPictureIndex,
  setCurrentPictureIndex,
  setOpen,
  sx,
  ...rootProps
}: PhotosCarouselProps) {
  const theme = useTheme();
  const screens = {
    small: `(max-width: ${theme.breakpoints.values.sm}px)`,
    medium: `(max-width: ${theme.breakpoints.values.md}px)`,
    large: `(max-width: ${theme.breakpoints.values.xl}px)`,
  };

  const imageSizes = [
    `${screens.small} 700px`,
    `${screens.medium} 900px`,
    `${screens.large} 1100px`,
    `1300px`,
  ].join(', ');

  const currentPicture = pictures?.[currentPictureIndex];
  const handleSwitchPicture = useCallback(
    (direction: 'left' | 'right') => {
      if (direction === 'left') {
        if (currentPictureIndex === 0) {
          setCurrentPictureIndex((pictures?.length || 1) - 1);
        } else {
          setCurrentPictureIndex(currentPictureIndex - 1);
        }
      }
      if (direction === 'right') {
        if (currentPictureIndex === (pictures?.length || 1) - 1) {
          setCurrentPictureIndex(0);
        } else {
          setCurrentPictureIndex(currentPictureIndex + 1);
        }
      }
    },
    [currentPictureIndex, pictures],
  );

  const handleKeyDown = useCallback(
    (e: any) => {
      const ev = e as KeyboardEvent;
      switch (ev.key) {
        case 'ArrowLeft':
          handleSwitchPicture('left');
          break;
        case 'ArrowRight':
          handleSwitchPicture('right');
          break;
        case 'Escape':
          setOpen(false);
          break;
      }
    },
    [handleSwitchPicture],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const isMoreThenOnePicture = (pictures?.length || 0) > 1 || false;
  if (!pictures) return null;
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
          <Box position='relative' width='100%' height='100%' bgcolor={currentPicture.dominantHex}>
            <Image
              key={currentPicture.url}
              src={currentPicture.url || ''}
              blurDataURL={currentPicture.blurDataUrl}
              placeholder='blur'
              fill
              sizes={imageSizes}
              quality={80}
              style={{ objectFit: 'contain' }}
              alt='Full Size Photo'
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
