import { IComment } from './comment';
import { ICreatedAt } from './createdAt';
import { IReactionReference } from './reaction';
import { IBasicUserInfo } from './user';

export interface IPost extends IPostReference {
  postPictures?: string[];
  postText?: string;
  reactions: IReactionReference[];
  exampleReactors?: IBasicUserInfo[];
  comments: IComment[];
  shareCount: number;
}

export interface IPostReference {
  id: string;
  owner: IBasicUserInfo;
  createdAt: ICreatedAt;
}
