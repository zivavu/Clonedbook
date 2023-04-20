import { ChatReference } from './chat';
import { Friend } from './firend';
import { PicutreReference } from './picture';
import { PostReference } from './post';

export interface User extends BasicUserInfo {
  email: string;
  phoneNumber?: string;
  backgroundPicture?: string;
  biography?: string;
  isDummy?: boolean;
  friends: Friend[];
  groups: [];
  intrests: [];
  chatReferences: ChatReference[];
  postReferences: PostReference[];
  picutresReferences: PicutreReference[];
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
  profileId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  profilePicture?: string;
}
