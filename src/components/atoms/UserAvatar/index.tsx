import { Box, ButtonBase, useTheme } from '@mui/material';

import { useFetchUsersPublicDataQuery } from '@/features/usersPublicDataAPI';
import { IUserBasicInfo } from '@/types/user';
import Image from 'next/image';
import Link from 'next/link';
import { UserAvatarProps, UserImageProps } from './types';

export default function UserAvatar({
  sx,
  size = 40,
  alt,
  src,
  userId,
  useLink = true,
  ...rootProps
}: UserAvatarProps) {
  const { data: userData } = useFetchUsersPublicDataQuery({});
  const user: Omit<IUserBasicInfo, 'id'> | null = userId && userData ? userData[userId] : null;
  const px = `${size}px`;
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.light,
        borderRadius: '50%',
        position: 'relative',
        width: px,
        height: px,
        ...sx,
      }}
      {...rootProps}>
      {useLink && userId ? (
        <ButtonBase
          sx={{
            position: 'relative',
            width: px,
            height: px,
            borderRadius: '50%',
          }}
          LinkComponent={Link}
          focusRipple
          href={`/profile/${userId}`}>
          <UserImage user={user} alt={alt} />
        </ButtonBase>
      ) : (
        <UserImage user={user} alt={alt} />
      )}
    </Box>
  );
}

const UserImage = ({ user, alt }: UserImageProps) => {
  return (
    <Image
      unoptimized
      fill
      src={user?.pictureUrl || '/no-profile-picture-icon.svg'}
      alt={alt || `${user?.firstName} ${user?.lastName}'s Profile Picture`}
      style={{
        borderRadius: '50%',
      }}
    />
  );
};
