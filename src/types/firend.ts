import { IChatReference } from './chat';
import { ICreatedAt } from './createdAt';
import { IBasicUserInfo } from './user';

export interface IFriend {
  connectionId: string; // unique identifier for the connection
  basicInfo: IBasicUserInfo; // info of the friend
  chatReference: IChatReference;
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
  createdAt: ICreatedAt;
}

export interface IFriendConnection {
  id: string; // unique identifier for the connection
  usersIds: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
}
