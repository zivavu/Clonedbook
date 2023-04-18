import { InChatPicture } from './picture';

export interface Message {
  id: string;
  senderId: string;
  chatId: string;
  text?: string;
  pictures?: InChatPicture[];
  createdAt: Date;
}
