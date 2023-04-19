import { Avatar, useTheme } from '@mui/material';

import { useFetchUserQuery } from '@/features/userAPI';
import { UserAvatarProps } from './types';

export default function UserAvatar({ sx, size, alt, src }: UserAvatarProps) {
  const px = `${size}px` || '40px';
  const theme = useTheme();
  const { data: userData } = useFetchUserQuery({});
  return (
    <Avatar
      src={src || userData?.data?.profilePicture || ''}
      alt={alt || 'user avatar'}
      sx={{ ...sx, width: px, height: px, bgcolor: theme.palette.primary.light }}
    />
  );
}
