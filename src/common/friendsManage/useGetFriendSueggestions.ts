import { useAllUsersBasicInfoQuery } from '@/redux/services/allUsersPublicDataAPI';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';

export default function useGetFriendSueggestions() {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const { data: users } = useAllUsersBasicInfoQuery({});
  if (!users) return null;
  const peopleYouMayKnow = Object.keys(users)
    .filter((userId) => !loggedUser?.friends[userId] && userId !== loggedUser?.id)
    .slice(0, 20);
  return peopleYouMayKnow;
}
