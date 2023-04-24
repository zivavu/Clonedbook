import { IBasicUserInfo } from './user';

export interface IReactionReference {
  userId: string;
  type: TReactionType;
}

export interface IUserReaction extends IReactionReference {
  userInfo: IBasicUserInfo;
}

export type TReactionType = 'angry' | 'like' | 'love' | 'sad' | 'wow' | 'haha' | 'care';
