import { Comment } from './comment';
import { Reaction } from './reaction';
import { BasicUserInfo } from './user';

export interface Post extends PostReference {
  postPictures?: string[];
  postText?: string;
  reactions?: Reaction[];
  comments?: Comment[];
}

export interface PostReference {
  id: string;
  owner: BasicUserInfo;
}
