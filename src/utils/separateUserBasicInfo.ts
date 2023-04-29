import { IUser } from '@/types/user';

export function separateUserBasicInfo(user: IUser) {
  return {
    profileId: user.profileId,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture || '',
  };
}
