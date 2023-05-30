import { Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import AddFriendButton from '@/components/atoms/AddFriendButton';
import RemoveFriendButton from '@/components/atoms/RemoveFriendButton';
import UserAvatar from '@/components/atoms/UserAvatar';
import useGetMutalFriends from '@/hooks/useGetMutalFriends';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
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
  const mutalFriends = useGetMutalFriends(userId);
  if (!friendData) return null;
  const { firstName, lastName, id } = friendData;
  return (
    <StyledRoot sx={sx} {...rootProps} onClick={() => setShownProfile(userId)}>
      <UserAvatar userId={userId} useLink={false} size={60} mr={1} />
      <Stack spacing={1}>
        <Typography fontWeight={450} variant='subtitle2' lineHeight='1.1rem'>
          {firstName} {lastName}
        </Typography>
        {mutalFriends.length > 0 && (
          <Stack direction='row' pl={0.5}>
            {mutalFriends.slice(0, 2).map((friend, i) => (
              <UserAvatar
                key={friend.id}
                userId={friend.id}
                size={16}
                showBorder={true}
                sx={{
                  zIndex: 10 - i,
                  marginLeft: theme.spacing(-0.5),
                }}
              />
            ))}
            <Typography variant='body2' color={theme.palette.text.secondary} ml={0.5}>
              {mutalFriends.length} mutal friends
            </Typography>
          </Stack>
        )}
        {mode === 'requests' && (
          <Stack direction='row' spacing={1}>
            <AddFriendButton
              friendId={userId}
              showIcon={false}
              sx={{ padding: theme.spacing(1, 4) }}
            />
            <RemoveFriendButton friendId={userId} sx={{ padding: theme.spacing(1, 4) }} />
          </Stack>
        )}
      </Stack>
      {mode === 'suggestions' && (
        <AddFriendButton
          friendId={userId}
          showIcon={false}
          sx={{ marginLeft: 'auto', alignSelf: 'center' }}
        />
      )}
    </StyledRoot>
  );
}
