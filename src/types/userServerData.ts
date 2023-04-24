import { IFriend } from './firend';
import { IUser } from './user';

export interface IUserServerData {
  data: IUser;
  friends: IFriend[];
}
