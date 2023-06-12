import { ButtonBase, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import FullPagePostPicturesView from '@/components/organisms/FullPagePhotosView/variants/FullPagePostPicturesView';
import Image from 'next/image';
import { useState } from 'react';
import { PictureProps } from './types';
import useGetImageSizes from './useGetImageSizes';

export default function Picture({
  picture,
  size: imageSize,
  postId,
  sx,
  children,
  ...rootProps
}: PictureProps) {
  const theme = useTheme();
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const imageSizes = useGetImageSizes(imageSize);

  const handleClick = () => {
    setIsFullViewOpen(!isFullViewOpen);
  };

  return (
    <>
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
            alt={"Post's picture"}
            fill
            sizes={imageSizes}
            style={{
              objectFit: 'cover',
              backgroundColor: `${picture.dominantHex}`,
            }}
          />
          {children}
        </ButtonBase>
      </StyledRoot>
      {isFullViewOpen && (
        <FullPagePostPicturesView
          postId={postId}
          initialPhotoUrl={picture.url}
          setOpen={setIsFullViewOpen}
        />
      )}
    </>
  );
}
