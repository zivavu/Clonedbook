import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import getAcceptedFriends from '@/utils/getAcceptedFriends';
import FriendListItem from '../components/FriendListItem';
import ListHeadingSection from '../components/ListHeadingSection';
import { StyledFriendsList, StyledRoot } from '../styles';
import { FriendListProps } from '../types';

export default function AllFriendsList({
  setCurrentTab,
  setShownProfile,
  sx,
  ...rootProps
}: FriendListProps) {
  const { data: loggedUser } = useFetchLoggedUserQuery({});
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
    </StyledRoot>
  );
}
