import { useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import Image from 'next/image';
import { PictureProps } from './types';

export default function Picture({
  src,
  alt,
  size: imageSize,
  quality,
  sx,
  ...rootProps
}: PictureProps) {
  const theme = useTheme();
  let imageSizes;
  const breakpoints = theme.breakpoints.values;

  const screens = {
    small: `(max-width: ${theme.breakpoints.values.sm}px)`,
    medium: `(max-width: ${theme.breakpoints.values.md}px)`,
    large: `(max-width: ${theme.breakpoints.values.xl + 1000}px)`,
  };
  switch (imageSize) {
    case 'small':
      imageSizes = [
        `${screens.small} 100px`,
        `${screens.medium} 200px`,
        `${screens.large} 300px`,
        `400px`,
      ].join(',');
      break;
    case 'medium':
      imageSizes = [
        `${screens.small} 300px`,
        `${screens.medium} 500px`,
        `${screens.large} 600px`,
        `800px`,
      ].join(', ');
      break;
    case 'large':
      imageSizes = [
        `${screens.small} 400px`,
        `${screens.medium} 600px`,
        `${screens.large} 800px`,
        `1000px`,
      ].join(', ');
      break;
  }
  console.log(imageSizes);
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Image
        src={src}
        alt={alt || "Post's picture"}
        fill
        quality={quality}
        sizes={imageSizes}
        style={{
          objectFit: 'cover',
        }}
      ></Image>
    </StyledRoot>
  );
}
