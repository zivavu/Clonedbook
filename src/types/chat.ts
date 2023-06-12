import { IMessage } from './message';

//This object is created both for sender and receiver users
export interface IChat {
  id: string;
  messages: IMessage[];
  users: string[];

  chatEmoji?: string;

  //Hex color of chat theme
  chatColor?: string;
}
