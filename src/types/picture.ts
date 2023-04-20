import { IComment } from './comment';
import { ICreatedAt } from './createdAt';
import { IUserReaction } from './reaction';
import { IBasicUserInfo } from './user';

export interface IPicture {
  id: string;
  ownerInfo: IBasicUserInfo;
  pictureURL: string;
}

export interface IInProfilePicture extends IPicture {
  reactions: IUserReaction[];
  comments: IComment[];
}

export interface IInChatPicture extends IPicture {
  reaction?: string;
}

export interface IPicutreReference {
  id: string;
  ownerId: string;
  createdAt: ICreatedAt;
}
