import { useFetchUsersPublicDataQuery } from '@/features/usersPublicDataAPI';
import { IUserBasicInfo } from '@/types/user';

export default function useGetUsersPublicData(userId: string | '') {
  const { data: userData } = useFetchUsersPublicDataQuery({});
  if (!userId) return null;
  const user: IUserBasicInfo | null =
    userId && userData ? { ...userData[userId], id: userId } : null;
  return user;
}
