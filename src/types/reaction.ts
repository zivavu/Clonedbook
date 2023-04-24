import { IBasicUserInfo } from './user';

export interface IReactionReference {
  userId: string;
  type: TPossibleReaction;
}

export interface IUserReaction extends IReactionReference {
  userInfo: IBasicUserInfo;
}

export type TPossibleReaction = 'angry' | 'like' | 'love' | 'sad' | 'wow' | 'haha' | 'care';
