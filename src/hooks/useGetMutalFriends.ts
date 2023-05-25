import { useFetchLoggedUserQuery } from '@/features/userAPI';
import useGetUsersPublicFriends from '@/hooks/useFetchUsersPublicFriends';
import getAcceptedFriends from '@/utils/getAcceptedFriends';

export default function useGetMutalFriends(friendId: string) {
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const userFriends = useGetUsersPublicFriends(friendId);
  if (!userFriends || !loggedUser) return [];
  const loggedUserFriends = getAcceptedFriends(loggedUser) || [];
  const mutalFriends =
    Object.values(loggedUserFriends).filter((friend) => {
      return userFriends[friend.id];
    }) || [];
  return mutalFriends;
}
