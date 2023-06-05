import { useAllUsersPublicFriendsQuery } from '@/redux/services/allUsersPublicData';
import { IPublicFriendsMap } from '@/types/firend';

export default function useGetUsersPublicFriends(userId: string | '' | undefined) {
  const { data: friendsData } = useAllUsersPublicFriendsQuery({});
  if (!userId || !friendsData) return null;
  const usersPublicFriends: IPublicFriendsMap | null = userId ? friendsData[userId] : null;
  return usersPublicFriends;
}
