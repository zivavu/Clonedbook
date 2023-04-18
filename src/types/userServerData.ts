import { Friend } from './firend';
import { Picture } from './picture';
import { Post } from './post';
import { User } from './user';

export interface UserServerData {
  user: User;
  friends: Friend[];
  pictures: Picture[];
  posts: Post[];
}
