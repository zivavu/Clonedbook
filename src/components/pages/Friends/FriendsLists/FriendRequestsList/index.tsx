import { useTheme } from '@mui/material';

import useGetFriendRequests from '@/hooks/useGetUsersFriendRequests';
import FriendListItem from '../components/FriendListItem';
import ListHeadingSection from '../components/ListHeadingSection';
import { StyledFriendsList, StyledRoot } from '../styles';
import { FriendListProps } from '../types';

export default function FriendRequestsList({
  setCurrentTab,
  setShownProfile,
  sx,
  ...rootProps
}: FriendListProps) {
  const theme = useTheme();
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
