import { useFetchAllUsersBasicInfoQuery } from '@/redux/services/allUsersPublicData';
import { useFetchLoggedUserQuery } from '@/redux/services/loggedUserAPI';

export default function useGetFriendSueggestions() {
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const { data: users } = useFetchAllUsersBasicInfoQuery({});
  if (!users) return null;
  const peopleYouMayKnow = Object.keys(users).filter((userId) => !loggedUser?.friends[userId]);
  return peopleYouMayKnow;
}
