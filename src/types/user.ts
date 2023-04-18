import { Chat } from './chat';
import { PostedPicture } from './postedPicture';
import { Post } from './post';

export interface User extends BasicUserInfo {
  id: string;
  email: string;
  phoneNumber?: string;
  backgroundPicture?: string;
  biography?: string;
  isDummy?: boolean;
  friends: [];
  groups: [];
  intrests: [];
  liked: [];
  chats: Chat[];
  posts: Array<Post>;
  pictures: Array<PostedPicture>;
  about: {
    address?: string;
    country?: string;
    hometown?: string;
    city?: string;
    college?: string;
    highSchool?: string;
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

export interface BasicUserInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  profilePicture?: string;
  nickname?: string;
}
