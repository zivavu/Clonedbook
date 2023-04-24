import { IFriend } from './firend';
import { IPicture } from './picture';
import { IPost } from './post';
import { IUser } from './user';

export interface IUserServerData {
  data: IUser;
  friends: IFriend[];
  pictures: IPicture[];
  posts: IPost[];
}
