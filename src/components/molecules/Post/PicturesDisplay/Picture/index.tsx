import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import Image from 'next/image';
import { PictureProps } from './types';

export default function Picture({ src, alt, sx, ...rootProps }: PictureProps) {
  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Image
        src={src}
        alt={alt || "Post's picture"}
        fill
        style={{
          objectFit: 'cover',
        }}
      ></Image>
    </StyledRoot>
  );
}
