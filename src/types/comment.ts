import { Reaction } from './reaction';

export interface Comment {
  userId: string;
  commentText: string;
  commentResponses?: Comment[];
  reactions?: Reaction[];
}
