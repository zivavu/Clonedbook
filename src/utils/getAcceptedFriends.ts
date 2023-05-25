import { IUser } from '@/types/user';

export default function getAcceptedFriends(userData: IUser) {
  const acceptedFriends = Object.values(userData.friends).filter(
    (friend) => friend.status === 'accepted',
  );
  return acceptedFriends;
}
