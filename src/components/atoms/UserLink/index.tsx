import { UserLinkProps } from './types';

import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import UserPreviewPopper from '@/components/molecules/UserPreviewPopper';
import UserPreviewPopperHandlers from '@/components/molecules/UserPreviewPopper/UserPreviewPopperHandlers';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { Box } from '@mui/material';
import Link from '../Link';
export default function UserLink({ userId, usePopper = true, sx, ...rootProps }: UserLinkProps) {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const user = useGetUserBasicInfo(userId);
  const {
    anchorElRef,
    isPopperOpen,
    handleMouseLeave,
    handleMouseEnter,
    handleTouchStart,
    handleTouchEnd,
  } = UserPreviewPopperHandlers();
  if (!user) return null;
  return (
    <>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        display='inline'
        width='fit-content'
        ref={anchorElRef}>
        <Link sx={sx} {...rootProps} href={`/profile/${user.id}`}>
          {user?.firstName} {user?.lastName}
        </Link>
      </Box>
      {usePopper && loggedUser?.id !== userId && (
        <UserPreviewPopper
          open={isPopperOpen}
          placement='top'
          userId={user.id}
          anchorEl={anchorElRef.current}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </>
  );
}
