import { ICommentMap } from './comment';
import { IAccountPicture } from './picture';
import { IPost } from './post';
import { IReactionsMap } from './reaction';
import { ITimestamp } from './timestamp';

export type TPostOrPictureObj = IPost | IAccountPicture;
export type TElementType = 'post' | 'accountPicture' | 'backgroundPicture';

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
