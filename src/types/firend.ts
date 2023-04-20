import { IChatReference } from './chat';
import { ICreatedAt } from './createdAt';
import { IBasicUserInfo } from './user';

export interface IFriend {
  connectionId: string; // unique identifier for the connection
  ownerId: string; // id of the current user
  info: IBasicUserInfo; // info of the friend
  chatReference: IChatReference;
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
  createdAt: ICreatedAt;
}

export interface IPublicFriendship {
  connectionId: string; // unique identifier for the connection
  usersIds: string[];
}
