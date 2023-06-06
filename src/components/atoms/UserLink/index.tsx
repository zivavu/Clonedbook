import { UserLinkProps } from './types';

import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import Link from '../Link';
import UserPreviewPopperHandlers from '@/components/molecules/UserPreviewPopper/UserPreviewPopperHandlers';
import UserPreviewPopper from '@/components/molecules/UserPreviewPopper';
import { Box } from '@mui/material';
export default function UserLink({ userId, usePopper = true, sx, ...rootProps }: UserLinkProps) {
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
      <Box
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        display='inline'
        ref={anchorElRef}>
        <Link sx={sx} {...rootProps} href={`/profile/${user.id}`}>
          {user?.firstName} {user?.lastName}
        </Link>
      </Box>
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
