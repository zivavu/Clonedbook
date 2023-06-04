import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import useGetUsersPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import AddFriendButton from '@/components/atoms/AddFriendButton';
import RemoveFriendButton from '@/components/atoms/RemoveFriendButton';
import UserAvatar from '@/components/atoms/UserAvatar';
import MutalFriendsDisplay from '@/components/molecules/MutalFriendsDisplay';
import { FriendListItemProps } from './types';

export default function FriendListItem({
  userId,
  setShownProfile,
  mode,
  sx,
  ...rootProps
}: FriendListItemProps) {
  const theme = useTheme();
  const friendData = useGetUsersPublicData(userId);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  if (!friendData) return null;
  const { firstName, lastName } = friendData;
  return (
    <StyledRoot sx={sx} {...rootProps} onClick={() => setShownProfile(userId)}>
      <UserAvatar userId={userId} useLink={false} size={isMobile ? 40 : 60} mr={1} />
      <Stack spacing={isMobile ? 0 : 1}>
        <Typography fontWeight={450} variant='subtitle2' lineHeight='1.1rem'>
          {firstName} {lastName}
        </Typography>
        <MutalFriendsDisplay userId={userId} avatarsToShow={isMobile ? 0 : 2} />
        {mode === 'requests' && (
          <Stack direction='row' spacing={1}>
            <AddFriendButton
              friendId={userId}
              showIcon={false}
              sx={{ py: theme.spacing(1), px: isMobile ? 3 : 4 }}
            />
            <RemoveFriendButton
              friendId={userId}
              sx={{ py: theme.spacing(1), px: isMobile ? 3 : 4 }}
            />
          </Stack>
        )}
      </Stack>
      {mode === 'suggestions' && (
        <AddFriendButton
          friendId={userId}
          showIcon={false}
          sx={{
            marginLeft: 'auto',
            alignSelf: 'center',
            py: theme.spacing(1),
            px: 2,
          }}
        />
      )}
    </StyledRoot>
  );
}
