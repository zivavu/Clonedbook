import { IUser } from '@/types/user';

export default function getAcceptedFriends(userData: IUser) {
  const acceptedFriends =
    Object.values(userData.friends)
      .filter((friend) => friend.status === 'accepted')
      .sort((a, b) => b.acceptedAt?.seconds - a.acceptedAt?.seconds) || [];
  return acceptedFriends;
}
