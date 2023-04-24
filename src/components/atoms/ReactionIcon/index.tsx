import { Box, useTheme } from '@mui/material';

import Image from 'next/image';
import { ReactionIconProps } from './types';

export default function ReactionIcon({
  src,
  alt,
  size = 22,
  showBorder = true,
  zIndex,
  sx,
  ...rootProps
}: ReactionIconProps) {
  const theme = useTheme();
  const imageBorder = showBorder ? `2px solid ${theme.palette.secondary.light}` : 'none';
  return (
    <Box
      {...rootProps}
      sx={{
        ...sx,
        zIndex: zIndex || 0,
        marginRight: `-4px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Image
        width={size}
        height={size}
        src={src}
        priority
        alt={alt || 'reaction icon'}
        style={{
          border: imageBorder,
          borderRadius: '50%',
        }}
      />
    </Box>
  );
}
