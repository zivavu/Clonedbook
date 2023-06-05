import getAcceptedFriends from '@/common/friendsManage/getAcceptedFriends';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import useGetUsersPublicFriends from '../misc/userDataManagment/useGetUsersPublicFriends';

export default function useGetMutalFriends(friendId: string) {
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const userFriends = useGetUsersPublicFriends(friendId);
  if (!userFriends || !loggedUser) return [];
  const loggedUserFriends = getAcceptedFriends(loggedUser) || [];
  const mutalFriends =
    Object.values(loggedUserFriends)
      .filter((friend) => {
        return userFriends[friend.id];
      })
      .sort((b, a) => b.acceptedAt.seconds - a.acceptedAt.seconds) || [];
  return mutalFriends;
}
