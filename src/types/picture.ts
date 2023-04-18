import { Comment } from './comment';
import { Reaction } from './reaction';
import { BasicUserInfo } from './user';

export interface Picture {
  id: string;
  ownerInfo: BasicUserInfo;
  pictureURL: string;
}

export interface ProfilePicture extends Picture {
  reactions: Reaction[];
  comments: Comment[];
}

export interface PictureInChat extends Picture {
  reaction?: string;
}

export interface PicutreReference {
  id: string;
  ownerId: string;
}
