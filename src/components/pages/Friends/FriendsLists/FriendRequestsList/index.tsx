import useGetFriendRequests from '@/hooks/useGetUsersFriendRequests';
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
      </StyledFriendsList>
    </StyledRoot>
  );
}
