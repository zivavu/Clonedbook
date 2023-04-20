import { IUserReaction } from './reaction';
import { IBasicUserInfo } from './user';

export interface IComment {
  id: string;
  owner: IBasicUserInfo;
  commentText: string;
  commentResponses?: IComment[];
  reactions?: IUserReaction[];
}
