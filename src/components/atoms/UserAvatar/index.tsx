import { Box, ButtonBase, CSSObject, useTheme } from '@mui/material';

import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import UserPreviewPopper from '@/components/molecules/UserPreviewPopper';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { UserAvatarProps, UserImageProps } from './types';
export default function UserAvatar({
  sx,
  size = 40,
  alt,
  userId,
  useLink = true,
  showBorder = false,
  usePopper = true,
  ...rootProps
}: UserAvatarProps) {
  const theme = useTheme();

  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const anchorElRef = useRef<HTMLButtonElement>(null);

  function handleMouseOver() {
    setIsPopperOpen(true);
  }
  function handleMouseOut() {
    setIsPopperOpen(false);
  }

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function startPressTimer() {
    timerRef.current = setTimeout(() => {
      setIsPopperOpen(true);
    }, 400);
  }
  function stopPressTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

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
            onTouchStart={startPressTimer}
            onTouchEnd={stopPressTimer}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
            LinkComponent={Link}
            focusRipple
            href={`/profile/${userId}`}>
            <UserImage user={user} alt={alt} />
          </ButtonBase>
        ) : (
          <UserImage user={user} alt={alt} />
        )}
      </Box>

      {usePopper && userId && (
        <UserPreviewPopper
          open={isPopperOpen}
          userId={userId}
          anchorEl={anchorElRef.current}
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
        />
      )}
    </>
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
