import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import useGetFriendshipStatus from '@/common/friendsManage/useGetFriendshipStatus';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import UserAvatar from '@/components/atoms/UserAvatar';
import UserPreviewPopper from '@/components/molecules/UserPreviewPopper';
import UserPreviewPopperHandlers from '@/components/molecules/UserPreviewPopper/UserPreviewPopperHandlers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FriendListItemProps } from './types';

export default function FriendListItem({ userId, sx, ...rootProps }: FriendListItemProps) {
  const theme = useTheme();
  const router = useRouter();

  const user = useGetUserBasicInfo(userId);
  const friendshipStatus = useGetFriendshipStatus(userId);

  if (!user || !user.firstName || !user.lastName) return null;
  const {
    anchorElRef,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchEnd,
    handleTouchStart,
    isPopperOpen,
  } = UserPreviewPopperHandlers(600);
  return (
    <>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={anchorElRef}>
        <StyledRoot
          data-testid={`search-result-link-${userId}`}
          sx={sx}
          {...rootProps}
          LinkComponent={Link}
          //@ts-expect-error
          href={`/profile/${userId}`}>
          <Stack direction='row' spacing={1.5}>
            <UserAvatar userId={userId} useLink={false} usePopper={false} size={36} />
            <Stack>
              <Typography>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant='body2' lineHeight={1.1} color={theme.palette.text.secondary}>
                {friendshipStatus === 'accepted'
                  ? 'Friends'
                  : friendshipStatus === 'req_received'
                    ? 'Friend request received'
                    : 'User'}
              </Typography>
            </Stack>
          </Stack>
        </StyledRoot>
      </Box>
      <UserPreviewPopper
        open={isPopperOpen}
        userId={userId}
        anchorEl={anchorElRef.current}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </>
  );
}
