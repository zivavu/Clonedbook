import { Comment } from './comment';
import { CreatedAt } from './createdAt';
import { UserReaction } from './reaction';
import { BasicUserInfo } from './user';

export interface Post extends PostReference {
  postPictures?: string[];
  postText?: string;
  reactions?: UserReaction[];
  exampleReactors?: BasicUserInfo[];
  comments?: Comment[];
}

export interface PostReference {
  id: string;
  owner: BasicUserInfo;
  createdAt: CreatedAt;
}
