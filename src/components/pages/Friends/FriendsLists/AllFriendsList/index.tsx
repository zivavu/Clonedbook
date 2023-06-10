import getAcceptedFriends from '@/common/friendsManage/getAcceptedFriends';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { ListItem, Typography } from '@mui/material';
import FriendListItem from '../components/FriendListItem';
import ListHeadingSection from '../components/ListHeadingSection';
import { StyledFriendsList, StyledRoot } from '../styles';
import { FriendSidebarListProps } from '../types';

export default function AllFriendsSidebarList({
  setCurrentTab,
  setShownProfile,
  sx,
  ...rootProps
}: FriendSidebarListProps) {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  if (!loggedUser) return null;
  const allFriends = getAcceptedFriends(loggedUser);
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <ListHeadingSection heading='All Friends' setCurrentTab={setCurrentTab} />
      <StyledFriendsList>
        {allFriends.map((user) => (
          <FriendListItem
            key={user.id}
            setShownProfile={setShownProfile}
            userId={user.id}
            mode='friends'
          />
        ))}
      </StyledFriendsList>
      {allFriends.length === 0 && (
        <ListItem>
          <Typography variant='subtitle2'>No friend requests</Typography>
        </ListItem>
      )}
    </StyledRoot>
  );
}
