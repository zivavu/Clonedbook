import { Avatar, Badge, Box, Icon, Typography, useTheme } from '@mui/material';

import Image from 'next/image';
import { ReactionIconProps } from './types';

export default function ReactionIcon({ src, alt, size = 22, zIndex }: ReactionIconProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
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
        alt={alt || 'reaction icon'}
        style={{
          border: `2px solid ${theme.palette.secondary.light}`,
          borderRadius: '50%',
        }}
      />
    </Box>
  );
}
