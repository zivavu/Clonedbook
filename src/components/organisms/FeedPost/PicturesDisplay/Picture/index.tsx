import { ButtonBase, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import FullPagePostPicturesView from '@/components/organisms/FullPagePhotosView/variants/FullPagePostPicturesView';
import Image from 'next/image';
import { useState } from 'react';
import { PictureProps } from './types';

export default function Picture({
  picture,
  alt,
  size: imageSize,
  quality,
  postId,
  sx,
  children,
  ...rootProps
}: PictureProps) {
  const theme = useTheme();
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const handleClick = () => {
    setIsFullViewOpen(!isFullViewOpen);
  };

  let imageSizes;
  const screens = {
    small: `(max-width: ${theme.breakpoints.values.sm}px)`,
    medium: `(max-width: ${theme.breakpoints.values.md}px)`,
    large: `(max-width: ${theme.breakpoints.values.xl}px)`,
  };

  switch (imageSize) {
    case 'small':
      imageSizes = [
        `${screens.small} 100px`,
        `${screens.medium} 200px`,
        `${screens.large} 200px`,
        `700px`,
      ].join(', ');
      break;
    case 'medium':
      imageSizes = [
        `${screens.small} 200px`,
        `${screens.medium} 400px`,
        `${screens.large} 600px`,
        `800px`,
      ].join(', ');
      break;
    case 'large':
      imageSizes = [
        `${screens.small} 300px`,
        `${screens.medium} 500px`,
        `${screens.large} 700px`,
        `1000px`,
      ].join(', ');
      break;
  }
  return (
    <>
      {isFullViewOpen && (
        <FullPagePostPicturesView
          postId={postId}
          initialPhotoUrl={picture.url}
          setOpen={setIsFullViewOpen}
        />
      )}
      <StyledRoot sx={sx} {...rootProps}>
        <ButtonBase
          onClick={() => handleClick()}
          focusRipple
          sx={{
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            pointerEvents: 'all',
            position: 'relative',
          }}>
          <Image
            src={picture.url}
            blurDataURL={picture.blurDataUrl}
            placeholder='blur'
            alt={alt || "Post's picture"}
            fill
            quality={quality}
            sizes={imageSizes}
            style={{
              objectFit: 'cover',
              backgroundColor: `${picture.dominantHex}`,
            }}
          />
          {children}
        </ButtonBase>
      </StyledRoot>
    </>
  );
}
