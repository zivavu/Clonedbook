import { Message } from './message';

//This object is created both for sender and receiver user
export interface Chat {
  id: string;
  sender: string;
  receiver: string;
  messages: Message[];
}
