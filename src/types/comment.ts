import { IReactionsMap } from './reaction';
import { ITimestamp } from './timestamp';

export interface IComment {
  id: string;
  ownerId: string;
  commentText: string;
  createdAt: ITimestamp;
  responses?: ICommentMap;
  reactions?: IReactionsMap;
}

export interface ICommentMap {
  [id: string]: IComment;
}
