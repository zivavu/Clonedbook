import { IFriend, IPublicFriendship } from './firend';
import { IPicture } from './picture';
import { IPost } from './post';
import { IBasicUserInfo, IUser } from './user';

export interface IUserServerData {
  data: IUser;
  public: IBasicUserInfo;
  friends: IFriend[];
  friendConnections: IPublicFriendship[];
  pictures: IPicture[];
  posts: IPost[];
}
