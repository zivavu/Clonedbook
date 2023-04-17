import { Avatar, useTheme } from '@mui/material';

import { UserAvatarProps } from './types';

export default function UserAvatar({ sx, size, alt, src }: UserAvatarProps) {
  const px = `${size}px` || '40px';
  const theme = useTheme();
  return (
    <Avatar
      src={src || 'https://api.dicebear.com/6.x/lorelei/svg'}
      alt={alt || 'user avatar'}
      sx={{ ...sx, width: px, height: px, bgcolor: theme.palette.primary.light }}
    />
  );
}
