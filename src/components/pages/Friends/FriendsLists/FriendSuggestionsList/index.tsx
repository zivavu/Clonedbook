import useGetFriendSueggestions from '@/common/friendsManage/useGetFriendSueggestions';
import { ListItem, Typography } from '@mui/material';
import FriendListItem from '../components/FriendListItem';
import ListHeadingSection from '../components/ListHeadingSection';
import { StyledFriendsList, StyledRoot } from '../styles';
import { FriendSidebarListProps } from '../types';

export default function FriendSuggestionsSidebarList({
  setCurrentTab,
  setShownProfile,
  sx,
  ...rootProps
}: FriendSidebarListProps) {
  const friendSuggestions = useGetFriendSueggestions();
  if (!friendSuggestions) return null;
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <ListHeadingSection heading='Suggestions' setCurrentTab={setCurrentTab} />
      <StyledFriendsList>
        {friendSuggestions.map((userId) => (
          <FriendListItem
            key={userId}
            setShownProfile={setShownProfile}
            userId={userId}
            mode='suggestions'
          />
        ))}
        {friendSuggestions.length === 0 && (
          <ListItem>
            <Typography variant='subtitle2'>No friend suggestions to show</Typography>
          </ListItem>
        )}
      </StyledFriendsList>
    </StyledRoot>
  );
}
