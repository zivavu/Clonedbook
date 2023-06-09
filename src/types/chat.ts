import { IMessage } from './message';

//This object is created both for sender and receiver users
export interface IChat extends IChatReference {
  messages: IMessage[];
}

export interface IChatReference {
  id: string;
}
