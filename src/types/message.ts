import { PictureInChat } from './picture';

export interface Message {
  id: string;
  senderId: string;
  chatId: string;
  text?: string;
  pictures?: PictureInChat[];
  createdAt: number;
}
