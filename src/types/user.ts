import { IChatReference } from './chat';
import { IFriend } from './firend';
import { IPicutreReference } from './picture';
import { IPostReference } from './post';

export interface IUser extends IBasicUserInfo {
  email: string;
  phoneNumber?: string;
  backgroundPicture?: string;
  biography?: string;
  isDummy?: boolean;
  friends: IFriend[];
  groups: [];
  intrests: [];
  chatReferences: IChatReference[];
  postReferences: IPostReference[];
  picutresReferences: IPicutreReference[];
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

export interface IBasicUserInfo {
  profileId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  profilePicture?: string;
}
