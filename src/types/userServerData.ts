import { Friend, PublicFriendship } from './firend';
import { Picture } from './picture';
import { Post } from './post';
import { BasicUserInfo, User } from './user';

export interface UserServerData {
  data: User;
  public: BasicUserInfo;
  friends: Friend[];
  friendConnections: PublicFriendship[];
  pictures: Picture[];
  posts: Post[];
}
