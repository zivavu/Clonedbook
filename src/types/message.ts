import { ITimestamp } from './createdAt';
import { IInChatPicture } from './picture';

export interface IMessage {
  id: string;
  senderId: string;
  chatId: string;
  text?: string;
  pictures?: IInChatPicture[];
  createdAt: ITimestamp;
}
