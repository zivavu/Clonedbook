import useGetMutalFriends from '@/common/friendsManage/useGetMutalFriends';
import useGetUsersPublicFriends from '@/common/misc/userDataManagment/useGetUsersPublicFriends';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { Stack, Typography, useTheme } from '@mui/material';
import { StyledPageTile, StyledPageTileHeader } from '../styles';
import Friend from './Friend';
import { FriendsTileProps } from './types';

export default function FriendsTile({ user, friendsLimit, sx, ...rootProps }: FriendsTileProps) {
  const theme = useTheme();
  const { data: loggedUser } = useLoggedUserQuery({});
  const publicFriends = useGetUsersPublicFriends(user.id);

  const mutalFriends = useGetMutalFriends(user.id);
  const friendsCount = (publicFriends && Object.entries(publicFriends).length) || 0;

  const friendsArr = publicFriends
    ? Object.entries(publicFriends)
        .map(([id, timestamp]) => {
          return { id, timestamp };
        })
        .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
        .slice(0, friendsLimit)
    : [];
  const rowsCount = friendsArr.length > 8 ? 3 : friendsArr.length > 5 ? 2 : 1;

  if (!publicFriends) return null;
  return (
    <StyledPageTile sx={sx} {...rootProps}>
      <Stack>
        <StyledPageTileHeader sx={{ paddingBottom: 0 }}>Friends</StyledPageTileHeader>
        <Typography pb={1} color={theme.palette.text.secondary} variant='subtitle1'>
          {friendsCount} {loggedUser?.id !== user.id && `${mutalFriends.length} mutual`}
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <>
          {rowsCount >= 1 && (
            <Stack direction='row' spacing={1.3}>
              {friendsArr.slice(0, 3).map((friend) => (
                <Friend key={friend.id} friendId={friend.id} />
              ))}
            </Stack>
          )}
          {rowsCount >= 2 && (
            <Stack direction='row' spacing={1.3}>
              {friendsArr.slice(3, 6).map((friend) => (
                <Friend key={friend.id} friendId={friend.id} />
              ))}
            </Stack>
          )}
          {rowsCount >= 3 && (
            <Stack direction='row' spacing={1.3}>
              {friendsArr.slice(6, 9).map((friend) => (
                <Friend key={friend.id} friendId={friend.id} />
              ))}
            </Stack>
          )}
        </>
      </Stack>
    </StyledPageTile>
  );
}
