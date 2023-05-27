import { ButtonBase } from '@mui/material';

import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import Image from 'next/image';
import Link from 'next/link';
import { StyledRoot } from './styles';
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
  return (
    <StyledRoot
      sx={{
        width: px,
        height: px,
        ...sx,
      }}
      {...rootProps}>
      {useLink && userId ? (
        <ButtonBase
          sx={{
            position: 'relative',
            borderRadius: '50%',
            width: px,
            height: px,
          }}
          LinkComponent={Link}
          focusRipple
          href={`/profile/${userId}`}>
          <UserImage user={user} alt={alt} />
        </ButtonBase>
      ) : (
        <UserImage user={user} alt={alt} />
      )}
    </StyledRoot>
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
