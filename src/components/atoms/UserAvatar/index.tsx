import { Box, ButtonBase, CSSObject, useTheme } from '@mui/material';

import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import UserPreviewPopper from '@/components/molecules/UserPreviewPopper';
import UserPreviewPopperHandlers from '@/components/molecules/UserPreviewPopper/UserPreviewPopperHandlers';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import Image from 'next/image';
import Link from 'next/link';
import { UserAvatarProps, UserImageProps } from './types';
export default function UserAvatar({
  sx,
  size = 40,
  sizes = '60px',
  alt,
  userId,
  useLink = true,
  showBorder = false,
  usePopper = true,
  ...rootProps
}: UserAvatarProps) {
  const theme = useTheme();
  const { data: loggedUser } = useLoggedUserQuery({});

  const {
    isPopperOpen,
    anchorElRef,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
  } = UserPreviewPopperHandlers();

  const user = useGetUserPublicData(userId);
  const px = `${size}px`;
  const containerSx: CSSObject = {
    minWidth: px,
    minHeight: px,
    maxWidth: px,
    maxHeight: px,
    aspectRatio: '1/1',
    borderRadius: '50%',
    position: 'relative',
  };

  const shadow = showBorder ? `0px 0px 0px 2px ${theme.palette.secondary.main}` : 'none';
  return (
    <>
      <Box
        sx={{
          ...containerSx,
          ...sx,
        }}
        ref={anchorElRef}
        {...rootProps}>
        {useLink && userId ? (
          <ButtonBase
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: shadow,
              ...containerSx,
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            LinkComponent={Link}
            focusRipple
            href={`/profile/${userId}`}>
            <UserImage user={user} alt={alt} sizes={sizes} />
          </ButtonBase>
        ) : (
          <UserImage user={user} alt={alt} sizes={sizes} />
        )}
      </Box>

      {usePopper && userId && loggedUser?.id !== userId && (
        <UserPreviewPopper
          open={isPopperOpen}
          userId={userId}
          anchorEl={anchorElRef.current}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </>
  );
}

const UserImage = ({ user, alt, sizes }: UserImageProps) => {
  return (
    <Image
      fill
      src={user?.pictureUrl || '/no-profile-picture-icon.svg'}
      alt={alt || `${user?.firstName} ${user?.lastName}'s Profile Picture`}
      sizes={sizes}
      style={{
        borderRadius: '50%',
      }}
    />
  );
};
