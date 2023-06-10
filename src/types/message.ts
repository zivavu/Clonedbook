import { IInChatPicture } from './picture';
import { ITimestamp } from './timestamp';

export interface IMessage {
  id: string;
  senderId: string;
  text?: string;
  pictures?: IInChatPicture[];
  createdAt: ITimestamp;
}
