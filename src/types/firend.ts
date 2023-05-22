import { IChatReference } from './chat';
import { ITimestamp } from './createdAt';
import { IUserBasicInfo } from './user';

export interface IFriend {
  friendId: string;
  chatReference: IChatReference;
  status: TFriendStatus;
  acceptedAt: ITimestamp;
}

export type TFriendStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';

export interface IFriendWithBasicInfo extends IFriend {
  basicInfo: IUserBasicInfo;
}

export interface IFriendsMap {
  accepted: {
    [key: string]: IFriend;
  };
  pending: {
    [key: string]: IFriend;
  };
  rejected: {
    [key: string]: IFriend;
  };
  blocked: {
    [key: string]: IFriend;
  };
}

export interface IPublicFriendsMap {
  [key: string]: ITimestamp;
}
