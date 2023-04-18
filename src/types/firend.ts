import { Chat } from './chat';
import { BasicUserInfo } from './user';

export interface Friend {
  connectionId: string; // unique identifier for the connection
  currentUserId: string; // id of the current user
  friendInfo: BasicUserInfo; // info of the friend
  chat: Chat;
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
  createdAt: Date; // the timestamp (in milliseconds) when the friend connection was create
}
