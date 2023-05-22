import { Box, ButtonBase, useTheme } from '@mui/material';

import { useFetchUsersPublicDataQuery } from '@/features/usersPublicDataAPI';
import Image from 'next/image';
import Link from 'next/link';
import { UserAvatarProps } from './types';

export default function UserAvatar({
  sx,
  size = 40,
  alt,
  userId,
  useLink = true,
  ...rootProps
}: UserAvatarProps) {
  const { data: userData } = useFetchUsersPublicDataQuery({});
  const user = userId && userData ? userData[userId] : null;
  const px = `${size}px`;
  const theme = useTheme();
  const UserImage = () => (
    <Image
      unoptimized
      height={size}
      width={size}
      src={user?.pictureUrl || '/no-profile-picture-icon.svg'}
      alt={alt || 'user avatar'}
      style={{
        borderRadius: '50%',
      }}
    />
  );

  return (
    <Box
      sx={{
        width: px,
        height: px,
        backgroundColor: theme.palette.primary.light,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        ...sx,
      }}
      {...rootProps}>
      {useLink && userId ? (
        <ButtonBase
          sx={{
            borderRadius: '50%',
          }}
          LinkComponent={Link}
          focusRipple
          href={`/profile/${userId}`}>
          <UserImage />
        </ButtonBase>
      ) : (
        <UserImage />
      )}
    </Box>
  );
}
