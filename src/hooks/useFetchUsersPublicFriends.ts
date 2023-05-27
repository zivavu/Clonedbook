import { useFetchUsersPublicFriendsQuery } from '@/redux/services/usersPublicFriendsAPI';
import { IPublicFriendsMap } from '@/types/firend';

export default function useGetUsersPublicFriends(userId: string | '' | undefined) {
  const { data: friendsData } = useFetchUsersPublicFriendsQuery({});
  if (!userId || !friendsData) return null;
  const usersPublicFriends: IPublicFriendsMap | null = userId ? friendsData[userId] : null;
  return usersPublicFriends;
}
