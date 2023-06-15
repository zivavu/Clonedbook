import useGetMutualFriends from '@/common/friendsManage/useGetMutualFriends';
import useGetUsersPublicFriends from '@/common/misc/userDataManagment/useGetUsersPublicFriends';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { Stack, Typography, useTheme } from '@mui/material';
import { StyledImageListContainer, StyledPageTile, StyledPageTileHeader } from '../styles';
import Friend from './Friend';
import { FriendsTileProps } from './types';

export default function FriendsTile({ user, sx, ...rootProps }: FriendsTileProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const publicFriends = useGetUsersPublicFriends(user.id);

  const mutualFriends = useGetMutualFriends(user.id);
  const friendsCount = (publicFriends && Object.entries(publicFriends).length) || 0;

  const friendsArr = publicFriends
    ? Object.entries(publicFriends)
        .map(([id, timestamp]) => {
          return { id, timestamp };
        })
        .filter((friend) => friend.id !== loggedUser?.id)
        .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
        .slice(0, 9)
    : [];

  if (!publicFriends) return null;
  return (
    <StyledPageTile sx={sx} {...rootProps}>
      <Stack>
        <StyledPageTileHeader sx={{ paddingBottom: 0 }}>Friends</StyledPageTileHeader>
        <Typography color={theme.palette.text.secondary} variant='subtitle1'>
          {friendsCount} {loggedUser?.id !== user.id && `(${mutualFriends.length} mutual)`}
        </Typography>
      </Stack>
      <StyledImageListContainer gap={8}>
        {friendsArr.map((friend) => {
          return <Friend key={friend.id} friendId={friend.id} />;
        })}
      </StyledImageListContainer>
    </StyledPageTile>
  );
}
