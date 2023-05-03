import { IUserBasicInfo } from './user';

export interface IReactionReference {
  userId: string;
  type: TReactionType;
}

export interface IReactionWithBasicInfo extends IReactionReference {
  info: IUserBasicInfo;
}
export interface IReactionsMap {
  [key: string]: TReactionType | null;
}

export type TReactionType = 'angry' | 'like' | 'love' | 'sad' | 'wow' | 'haha' | 'care';
