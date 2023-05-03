import { IUser, IUserBasicInfo } from '@/types/user';

export function separateUserBasicInfo(user: IUser | IUserBasicInfo) {
  return {
    profileId: user.profileId,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture || '',
  };
}
