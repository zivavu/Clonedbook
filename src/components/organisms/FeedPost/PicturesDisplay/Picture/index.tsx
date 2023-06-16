import { ButtonBase } from '@mui/material';

import { StyledRoot } from './styles';

import Image from 'next/image';
import { PictureProps } from './types';
import useGetImageSizes from './useGetImageSizes';

export default function Picture({
  picture,
  imageSize,
  handleClick,
  children,
  sx,
  ...rootProps
}: PictureProps) {
  const imageSizes = useGetImageSizes(imageSize);

  return (
    <>
      <StyledRoot sx={sx} {...rootProps}>
        <ButtonBase
          onClick={() => handleClick(picture)}
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
    </>
  );
}
