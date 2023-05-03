import { ICreatedAt } from './createdAt';
import { IReactionsMap } from './reaction';

export interface IComment {
  id: string;
  ownerId: string;
  commentText: string;
  createdAt: ICreatedAt;
  responses?: ICommentMap;
  reactions?: IReactionsMap;
}

export interface ICommentMap {
  [id: string]: IComment;
}
