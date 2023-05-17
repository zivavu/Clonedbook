import { IPublicFriendsMap } from './firend';
import { IPicturesMap } from './picture';
import { IUser } from './user';

export interface IUserServerData {
  data: IUser;
  publicFriends: IPublicFriendsMap;
  pictures: IPicturesMap;
}
