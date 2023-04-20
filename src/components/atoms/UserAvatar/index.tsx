import { Box, useTheme } from '@mui/material';

import { useFetchUserQuery } from '@/features/userAPI';
import Image from 'next/image';
import { UserAvatarProps } from './types';

export default function UserAvatar({ sx, size = 40, alt, src }: UserAvatarProps) {
  const px = `${size}px`;
  const theme = useTheme();
  const { data: userData } = useFetchUserQuery({});
  return (
    <Box
      sx={{
        ...sx,
        width: px,
        height: px,
        bgcolor: theme.palette.primary.light,
        position: 'relative',
        borderRadius: '50%',
      }}
    >
      <Image
        height={size}
        width={size}
        src={
          src ||
          userData?.data?.profilePicture ||
          'https://source.unsplash.com/collection/526820/480x480'
        }
        alt={alt || 'user avatar'}
        style={{
          borderRadius: '50%',
        }}
      />
    </Box>
  );
}
