import { IPublicFriendsMap } from './firend';
import { IUser } from './user';

export interface IUserServerData {
  data: IUser;
  publicFriends: IPublicFriendsMap;
}
