import { Comment } from './comment';
import { Reaction } from './reaction';

export interface Post {
  id: string;
  ownerId: string;
  postPictures?: string[];
  postText?: string;
  reactions?: Reaction[];
  comments?: Comment[];
}
