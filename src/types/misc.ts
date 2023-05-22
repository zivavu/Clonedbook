import { ICommentMap } from './comment';
import { ITimestamp } from './createdAt';
import { IAccountPicture } from './picture';
import { IPost } from './post';
import { IReactionsMap } from './reaction';

export type TPostOrPictureObj = IPost | IAccountPicture;
export type TPostOrPicture = 'post' | 'picture';

export interface IWallElement {
  id: string;
  ownerId: string;
  //It can be user, page, group, etc.
  wallOwnerId: string;
  createdAt: ITimestamp;
  text?: string;
  reactions: IReactionsMap;
  comments: ICommentMap;
  shareCount: number;
}

export interface IOptionalId {
  id?: string;
}
