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

export interface chatPicture extends Picture {
  reaction?: string;
}
