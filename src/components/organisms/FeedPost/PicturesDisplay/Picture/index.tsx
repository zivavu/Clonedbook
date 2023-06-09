import { ButtonBase, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import FullPagePostPicturesView from '@/components/organisms/FullPagePhotosView/variants/FullPagePostPicturesView';
import Image from 'next/image';
import { useState } from 'react';
import { PictureProps } from './types';

export default function Picture({
  src,
  blurSrc,
  alt,
  size: imageSize,
  quality,
  postId,
  sx,
  children,
  ...rootProps
}: PictureProps) {
  const theme = useTheme();
  const [photoSrc, setPhotoSrc] = useState(src);
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
        `400px`,
      ].join(', ');
      break;
    case 'medium':
      imageSizes = [
        `${screens.small} 200px`,
        `${screens.medium} 300px`,
        `${screens.large} 400px`,
        `600px`,
      ].join(', ');
      break;
    case 'large':
      imageSizes = [
        `${screens.small} 300px`,
        `${screens.medium} 500px`,
        `${screens.large} 700px`,
        `800px`,
      ].join(', ');
      break;
  }
  return (
    <>
      {isFullViewOpen && (
        <FullPagePostPicturesView
          postId={postId}
          initialPhotoUrl={src}
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
            unoptimized
            src={photoSrc}
            blurDataURL={blurSrc}
            alt={alt || "Post's picture"}
            fill
            quality={quality}
            sizes={imageSizes}
            onError={() => {
              setPhotoSrc(`https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800/800`);
            }}
            style={{
              objectFit: 'cover',
            }}
          />
          {children}
        </ButtonBase>
      </StyledRoot>
    </>
  );
}
