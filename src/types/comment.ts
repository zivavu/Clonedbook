import { UserReaction } from './reaction';
import { BasicUserInfo } from './user';

export interface Comment {
  id: string;
  owner: BasicUserInfo;
  commentText: string;
  commentResponses?: Comment[];
  reactions?: UserReaction[];
}
