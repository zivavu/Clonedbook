import { IChatReference } from './chat';
import { ITimestamp } from './timestamp';
import { IUserBasicInfo } from './user';

export interface IFriend {
  id: string;
  chatReference: IChatReference;
  status: TFriendStatus;
  acceptedAt: ITimestamp;
}

export type TFriendStatus = 'accepted' | 'req_sent' | 'req_received';

export interface IFriendWithBasicInfo extends IFriend {
  basicInfo: IUserBasicInfo;
}

export interface IFriendsMap {
  [key: string]: IFriend;
}

export interface IPublicFriend {
  id: string;
  timestamp: ITimestamp;
}
export interface IPublicFriendsMap {
  [key: string]: ITimestamp;
}
