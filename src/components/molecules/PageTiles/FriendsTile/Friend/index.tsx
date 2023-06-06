import { StyledRoot } from './styles';

import useGetMutalFriends from '@/common/friendsManage/useGetMutalFriends';
import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import UserPicture from '@/components/atoms/UserPicture';
import Link from '@/components/atoms/Link';
import UserPreviewPopperHandlers from '@/components/molecules/UserPreviewPopper/UserPreviewPopperHandlers';
import UserPreviewPopper from '@/components/molecules/UserPreviewPopper';
import { Box, Typography, useTheme } from '@mui/material';
import { FriendProps } from './types';
import UserLink from '@/components/atoms/UserLink';

export default function Friend({ friendId, sx, ...rootProps }: FriendProps) {
  const theme = useTheme();
  const friend = useGetUserPublicData(friendId);
  const mutalFriends = useGetMutalFriends(friendId);

  if (!friend) return null;
  return (
    <>
      <StyledRoot sx={sx} {...rootProps} spacing={0.5}>
        <Box>
          <UserPicture userId={friendId} />
        </Box>
        <Box>
          <UserLink variant='body2' fontWeight={500} userId={friendId}>
            {friend.firstName} {friend.lastName}
          </UserLink>
          <Typography variant='body2' lineHeight='0.7rem' color={theme.palette.text.secondary}>
            {mutalFriends.length} mutal friends
          </Typography>
        </Box>
      </StyledRoot>
    </>
  );
}
