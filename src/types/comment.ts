import { UserReaction } from './reaction';

export interface Comment {
  id: string;
  ownerId: string;
  commentText: string;
  commentResponses?: Comment[];
  reactions?: UserReaction[];
}
