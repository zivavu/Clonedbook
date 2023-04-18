import { chatPicture } from './chatPicture';

export interface Message {
  id: string;
  senderId: string;
  chatId: string;
  text?: string;
  pictures?: chatPicture[];
  createdAt: number;
}
