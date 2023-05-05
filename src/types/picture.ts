import { ICommentMap } from './comment';
import { ICreatedAt } from './createdAt';
import { IReactionsMap, TReactionType } from './reaction';

export interface IPicture {
  id: string;
  ownerId: string;
  pictureURL: string;
  createdAt: ICreatedAt;
}

export interface IInProfilePicture extends IPicture {
  reactions: IReactionsMap;
  comments: ICommentMap;
  shareCount: number;
}

export interface IInChatPicture extends IPicture {
  reaction?: TReactionType;
}
