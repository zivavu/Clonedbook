import { IFriendsMap, TFriendStatus } from '@/types/firend';

export default function getFriendshipStatus(userId: string, friendsMap: IFriendsMap) {
  let status: TFriendStatus | null = null;
  for (const key in friendsMap) {
    Object.values(friendsMap[key as TFriendStatus]).forEach((friendship) => {
      if (userId === friendship.friendId) {
        status = friendship.status;
      }
    });
  }
  return status;
}
