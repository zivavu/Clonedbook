import { BasicUserInfo } from './user';

export interface Friend extends BasicUserInfo {
  connectionId: string; // unique identifier for the connection
  currentUserId: string; // id of the current user
  friendId: string; // id of the friend
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
  createdAt: number; // the timestamp (in milliseconds) when the friend connection was create
}
