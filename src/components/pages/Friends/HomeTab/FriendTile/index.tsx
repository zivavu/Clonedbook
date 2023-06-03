import { Stack, Typography, useTheme } from '@mui/material';

import useGetMutalFriends from '@/common/friendsManage/useGetMutalFriends';
import useGetUsersPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import AddFriendButton from '@/components/atoms/AddFriendButton';
import FriendPicture from '@/components/atoms/FriendPicture';
import RemoveFriendButton from '@/components/atoms/RemoveFriendButton';
import UserAvatar from '@/components/atoms/UserAvatar';
import { StyledRoot } from './styles';
import { FriendTileProps } from './types';

export default function FriendTile({ userId, sx, ...rootProps }: FriendTileProps) {
  const theme = useTheme();
  const user = useGetUsersPublicData(userId);
  const mutalFriends = useGetMutalFriends(userId);
  if (!user) return null;
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack
        sx={{
          borderRadius: theme.spacing(1),
          border: `1px solid ${theme.palette.divider}`,
          margin: theme.spacing(1),
        }}>
        <FriendPicture
          friendId={userId}
          sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0, border: 'none' }}
        />
        <Stack p={1.5} bgcolor={theme.palette.background.paper} spacing={1}>
          <Typography variant='subtitle1' fontWeight={600} lineHeight='1rem'>
            {user.firstName} {user.lastName}
          </Typography>
          {mutalFriends.length > 0 && (
            <Stack direction='row' pl={0.5}>
              {mutalFriends.slice(0, 2).map((friend, i) => (
                <UserAvatar
                  key={friend.id}
                  userId={friend.id}
                  size={18}
                  showBorder={true}
                  sx={{
                    zIndex: 2 - i,
                    marginLeft: theme.spacing(-0.5),
                  }}
                />
              ))}
              <Typography variant='body1' color={theme.palette.text.secondary} ml={0.5}>
                {mutalFriends.length} mutal friends
              </Typography>
            </Stack>
          )}
          <AddFriendButton friendId={userId} sx={{ height: '36px' }} showIcon={false} />
          <RemoveFriendButton friendId={userId} sx={{ height: '36px' }} />
        </Stack>
      </Stack>
    </StyledRoot>
  );
}
