import { IChatReference } from './chat';
import { ICreatedAt } from './createdAt';
import { IUserBasicInfo } from './user';

export interface IFriend {
  connectionId: string;
  friendId: string;
  chatReference: IChatReference;
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
  acceptedAt: ICreatedAt;
}
export interface IFriendConnection {
  id: string;
  usersIds: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
}

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
  [key: string]: ICreatedAt;
}
