import { Comment } from './comment';
import { CreatedAt } from './createdAt';
import { UserReaction } from './reaction';
import { BasicUserInfo } from './user';

export interface Picture {
  id: string;
  ownerInfo: BasicUserInfo;
  pictureURL: string;
}

export interface InProfilePicture extends Picture {
  reactions: UserReaction[];
  comments: Comment[];
}

export interface InChatPicture extends Picture {
  reaction?: string;
}

export interface PicutreReference {
  id: string;
  ownerId: string;
  createdAt: CreatedAt;
}
