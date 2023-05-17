import { IUser, IUserBasicInfo } from '@/types/user';

export function separateUserBasicInfo(user: IUser | IUserBasicInfo) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    picture: user.picture || '',
  } as IUserBasicInfo;
}
