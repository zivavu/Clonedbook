import useGetFriendRequests from '@/common/friendsManage/useGetUsersFriendRequests';
import { ListItem, Typography } from '@mui/material';
import FriendListItem from '../components/FriendListItem';
import ListHeadingSection from '../components/ListHeadingSection';
import { StyledFriendsList, StyledRoot } from '../styles';
import { FriendSidebarListProps } from '../types';

export default function FriendRequestsSidebarList({
  setCurrentTab,
  setShownProfile,
  sx,
  ...rootProps
}: FriendSidebarListProps) {
  const friendRequests = useGetFriendRequests();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <ListHeadingSection heading='Friend Requests' setCurrentTab={setCurrentTab} />
      <StyledFriendsList>
        {friendRequests.map(([userId]) => (
          <FriendListItem
            key={userId}
            setShownProfile={setShownProfile}
            userId={userId}
            mode='requests'
          />
        ))}
        {friendRequests.length === 0 && (
          <ListItem>
            <Typography variant='subtitle2'>No friend requests</Typography>
          </ListItem>
        )}
      </StyledFriendsList>
    </StyledRoot>
  );
}
