import { chatPicture } from './picture';

export interface Message {
  id: string;
  senderId: string;
  chatId: string;
  text?: string;
  pictures?: chatPicture[];
  createdAt: number;
}
