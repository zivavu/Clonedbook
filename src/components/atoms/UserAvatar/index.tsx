import { Box, ButtonBase, useTheme } from '@mui/material';

import Image from 'next/image';
import Link from 'next/link';
import { UserAvatarProps } from './types';

export default function UserAvatar({
  sx,
  size = 40,
  alt,
  src,
  userId,
  ...rootProps
}: UserAvatarProps) {
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
      {userId ? (
        <ButtonBase
          sx={{
            borderRadius: '50%',
          }}
          LinkComponent={Link}
          href={`/profile/${userId}`}>
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
        </ButtonBase>
      ) : (
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
      )}
    </Box>
  );
}
