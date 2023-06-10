import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';

export default function useGetFriendRequests() {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const friendRequests = Object.entries(loggedUser?.friends || {}).filter(
    ([, friend]) => friend.status === 'req_received',
  );
  return friendRequests;
}
