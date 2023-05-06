import { IChatReference } from './chat';
import { IFriendsMap } from './firend';
import { IPicturesMap } from './picture';
import { IPostsMap } from './post';

export interface IUser extends IUserBasicInfo {
  email: string;
  phoneNumber?: string;
  backgroundPicture?: string;
  biography?: string;
  isDummy?: boolean;
  groups: [];
  intrests: [];
  chatReferences: IChatReference[];
  friends: IFriendsMap;
  posts: IPostsMap;
  pictures: IPicturesMap;
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

export interface IUserBasicInfo {
  profileId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  profilePicture?: string;
}

export interface IServerUserBasicInfo {
  [key: string]: {
    firstName: string;
    middleName?: string;
    lastName: string;
    profilePicture?: string;
  };
}
