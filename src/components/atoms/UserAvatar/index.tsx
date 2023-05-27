import { Box, ButtonBase, CSSObject } from '@mui/material';

import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import Image from 'next/image';
import Link from 'next/link';
import { UserAvatarProps, UserImageProps } from './types';
export default function UserAvatar({
  sx,
  size = 40,
  alt,
  userId,
  useLink = true,
  ...rootProps
}: UserAvatarProps) {
  const user = useGetUsersPublicData(userId);
  const px = `${size}px`;
  const containerSx: CSSObject = {
    minWidth: px,
    minHeight: px,
    aspectRatio: '1/1',
    borderRadius: '50%',
    position: 'relative',
  };
  return (
    <Box sx={{ ...containerSx, ...sx }} {...rootProps}>
      {useLink && userId ? (
        <ButtonBase
          sx={{ ...containerSx, ...sx }}
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
