import { Comment } from './comment';
import { Reaction } from './reaction';

export interface PostedPicture {
  id: string;
  ownerId: string;
  pictureURL: string;
  reactions?: Reaction[];
  comments?: Comment[];
}
