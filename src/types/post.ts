import { IComment } from './comment';
import { ICreatedAt } from './createdAt';
import { IUserReaction } from './reaction';
import { IBasicUserInfo } from './user';

export interface IPost extends IPostReference {
  postPictures?: string[];
  postText?: string;
  reactions?: IUserReaction[];
  exampleReactors?: IBasicUserInfo[];
  comments?: IComment[];
}

export interface IPostReference {
  id: string;
  owner: IBasicUserInfo;
  createdAt: ICreatedAt;
}
