import { useAllUsersBasicInfoQuery } from '@/redux/services/allUsersPublicDataAPI';
import { IUserBasicInfo } from '@/types/user';

export default function useGetUserPublicData(userId: string | '' | undefined) {
  const { data: userData } = useAllUsersBasicInfoQuery({});
  if (!userId) return null;
  const user: IUserBasicInfo | null =
    userId && userData ? { ...userData[userId], id: userId } : null;
  return user;
}
