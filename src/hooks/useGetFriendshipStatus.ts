import { useFetchLoggedUserQuery } from '@/features/userAPI';
import { TFriendStatus } from '@/types/firend';

export default function useGetFriendshipStatus(userId: string) {
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  if (!loggedUser) return null;
  const friendsMap = loggedUser.friends || {};
  const friendshipStatus: TFriendStatus | null = friendsMap[userId]?.status || null;
  return friendshipStatus;
}
