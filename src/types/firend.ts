import { Chat, ChatReference } from './chat';
import { CreatedAt } from './createdAt';
import { BasicUserInfo } from './user';

export interface Friend {
  connectionId: string; // unique identifier for the connection
  ownerId: string; // id of the current user
  info: BasicUserInfo; // info of the friend
  chatReference: ChatReference;
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
  createdAt: CreatedAt;
}

export interface PublicFriendship {
  connectionId: string; // unique identifier for the connection
  users: BasicUserInfo[];
}
