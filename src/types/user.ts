import { Picture } from './picture';
import { Post } from './post';

export interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  backgroundPicture?: string;
  biography?: string;
  profilePicture?: string;
  dummy?: boolean;
  friends: [];
  groups: [];
  intrests: [];
  liked: [];
  messages: [];
  posts: Array<Post>;
  pictures: Array<Picture>;
  about: {
    address?: string;
    country?: string;
    hometown?: string;
    city?: string;
    college?: string;
    highSchool?: string;
    hometwon?: string;
    relationship?:
      | ''
      | 'single'
      | 'in a relationship'
      | 'engaged'
      | 'married'
      | "it's complicated"
      | 'open relationship'
      | 'widowed'
      | 'separated'
      | 'divorced'
      | 'in a civil union'
      | 'in a domestic partnership';
    workplace?: string;
  };
}
