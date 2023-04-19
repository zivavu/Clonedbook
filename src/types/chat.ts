import { Message } from './message';

//This object is created both for sender and receiver users
export interface Chat extends ChatReference {
  messages: Message[];
}

export interface ChatReference {
  id: string;
  users: string[];
}
