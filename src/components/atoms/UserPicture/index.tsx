import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import { ButtonBase } from '@mui/material';
import Link from 'next/link';
import ImageWithGradientLoading from '../ImageWithGradientLoading';
import { StyledRoot } from './styles';
import { UserPictureProps } from './types';
import UserPreviewPopperHandlers from '@/components/molecules/UserPreviewPopper/UserPreviewPopperHandlers';
import UserPreviewPopper from '@/components/molecules/UserPreviewPopper';

export default function UserPicture({
  userId,
  usePopper = true,
  sx,
  ...rootProps
}: UserPictureProps) {
  const user = useGetUserPublicData(userId);
  const {
    anchorElRef,
    handleMouseEnter: handleMouseOver,
    isPopperOpen,
    handleMouseOut,
    handleTouchStart,
    handleTouchEnd,
  } = UserPreviewPopperHandlers();
  if (!user) return null;
  return (
    <>
      <StyledRoot
        sx={sx}
        {...rootProps}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={anchorElRef}>
        <ImageWithGradientLoading
          fill
          src={user.pictureUrl || '/no-profile-picture-icon.svg'}
          alt={`${user.firstName} ${user.lastName} Profile picture`}
        />
        <ButtonBase
          LinkComponent={Link}
          href={`/profile/${user.id}`}
          sx={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          focusRipple
        />
      </StyledRoot>
      {usePopper && (
        <UserPreviewPopper
          open={isPopperOpen}
          userId={user.id}
          anchorEl={anchorElRef.current}
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
        />
      )}
    </>
  );
}
