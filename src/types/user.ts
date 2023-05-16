import { IChatReference } from './chat';
import { IFriendsMap } from './firend';
import { IPicturesMap } from './picture';

export interface IUser extends IUserBasicInfo {
  email: string;
  phoneNumber?: string;
  backgroundPicture?: string;
  biography?: string;
  isDummy?: boolean;
  groups: [];
  intrests: [];
  chatReferences: IChatReference[];
  links?: string[];
  friends: IFriendsMap;
  pictures: IPicturesMap;
  about: {
    address?: string;
    country?: string;
    hometown?: string;
    city?: string;
    college?: string;
    highSchool?: string;
    relationship?: TRealationshipStatus;
    workplace?: string;
    jobTitle?: string;
    sex: TUserSex;
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

export type TUserSex = 'male' | 'female' | 'other';

export type TRealationshipStatus =
  | ''
  | 'single'
  | 'in a relationship'
  | 'in an open relationship'
  | 'engaged'
  | 'married'
  | "it's complicated"
  | 'widowed'
  | 'separated'
  | 'divorced';
