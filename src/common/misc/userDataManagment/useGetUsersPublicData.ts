import { useFetchUsersBasicInfoQuery } from '@/redux/services/usersBasicInfoAPI';
import { IUserBasicInfo } from '@/types/user';

export default function useGetUserPublicData(userId: string | '' | undefined) {
  const { data: userData } = useFetchUsersBasicInfoQuery({});
  if (!userId) return null;
  const user: IUserBasicInfo | null =
    userId && userData ? { ...userData[userId], id: userId } : null;
  return user;
}
