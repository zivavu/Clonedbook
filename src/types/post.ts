import { ICommentMap } from './comment';
import { ICreatedAt } from './createdAt';
import { IReactionsMap } from './reaction';
import { IUserBasicInfo } from './user';

export interface IPost extends IPostReference {
  postPictures?: string[];
  postText?: string;
  reactions: IReactionsMap;
  comments: ICommentMap;
  shareCount: number;
}

export interface IPostReference {
  id: string;
  owner: IUserBasicInfo;
  //It can be user, page, group, etc.
  wallOwnerId?: string;
  createdAt: ICreatedAt;
}
export interface IPostsMap {
  [key: string]: IPost;
}
