import { useAllUsersBasicInfoQuery } from '@/redux/services/allUsersPublicData';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';

export default function useGetFriendSueggestions() {
  const { data: loggedUser } = useLoggedUserQuery({});
  const { data: users } = useAllUsersBasicInfoQuery({});
  if (!users) return null;
  const peopleYouMayKnow = Object.keys(users).filter(
    (userId) => !loggedUser?.friends[userId] && userId !== loggedUser?.id,
  );
  return peopleYouMayKnow;
}
