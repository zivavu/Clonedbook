import { Box, useTheme } from '@mui/material';

import Image from 'next/image';
import { UserAvatarProps } from './types';

export default function UserAvatar({ sx, size = 40, alt, src, ...rootProps }: UserAvatarProps) {
  const px = `${size}px`;
  const theme = useTheme();
  return (
    <Box
      {...rootProps}
      sx={{
        ...sx,
        width: px,
        height: px,
        bgcolor: theme.palette.primary.light,
        position: 'relative',
        borderRadius: '50%',
      }}>
      <Image
        height={size}
        width={size}
        loading='eager'
        src={src || '/no-profile-picture-icon.svg'}
        alt={alt || 'user avatar'}
        style={{
          borderRadius: '50%',
        }}
      />
    </Box>
  );
}
