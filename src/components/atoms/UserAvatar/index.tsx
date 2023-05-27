import { Box, ButtonBase, CSSObject, useTheme } from '@mui/material';

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
  showBorder = false,
  ...rootProps
}: UserAvatarProps) {
  const theme = useTheme();
  const user = useGetUsersPublicData(userId);
  const px = `${size}px`;
  const containerSx: CSSObject = {
    minWidth: px,
    minHeight: px,
    maxWidth: px,
    aspectRatio: '1/1',
    borderRadius: '50%',
    position: 'relative',
  };

  const shadow = showBorder ? `0px 0px 0px 2px ${theme.palette.secondary.main}` : 'none';
  return (
    <Box sx={{ ...containerSx, ...sx }} {...rootProps}>
      {useLink && userId ? (
        <ButtonBase
          sx={{ boxShadow: shadow, ...containerSx, ...sx }}
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
