import { IBasicUserInfo, IUser } from '@/types/user';

export function separateUserBasicInfo(user: IUser | IBasicUserInfo) {
  return {
    profileId: user.profileId,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture || '',
  };
}
