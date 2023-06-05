import { useFetchLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useFetchUsersBasicInfoQuery } from '@/redux/services/usersBasicInfoAPI';

export default function useGetFriendSueggestions() {
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const { data: users } = useFetchUsersBasicInfoQuery({});
  if (!users) return null;
  const peopleYouMayKnow = Object.keys(users).filter((userId) => !loggedUser?.friends[userId]);
  return peopleYouMayKnow;
}
