import { Comment } from './comment';
import { Reaction } from './reaction';
import { BasicUserInfo } from './user';

export interface Post {
  id: string; //Id of the post
  owner: BasicUserInfo;
  postPictures?: string[];
  postText?: string;
  reactions?: Reaction[];
  comments?: Comment[];
}
