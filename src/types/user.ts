import { IFriendsMap, IPublicFriendsMap } from './firend';
import { ITimestamp } from './timestamp';

export interface IUser extends IUserBasicInfo {
  backgroundPicture?: string;
  backgroundPictureId?: string;
  profilePictureId?: string;
  isDummy?: boolean;
  groups: {};
  friends: IFriendsMap;
  contact: IContactInfo;
  about: IUserStringAbout & IUserCustomAbout;
}

export interface IUserBasicInfo {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  pictureUrl?: string;
}

export interface IUserStringAbout {
  bio?: string;
  address?: string;
  country?: string;
  hometown?: string;
  city?: string;
  college?: string;
  highSchool?: string;
  workplace?: string;
  jobTitle?: string;
  sex: TUserSex;
}
export type TUserAboutField = keyof IUserStringAbout;

export interface IUserCustomAbout {
  intrests: string[];
  relationship?: IRelationship;
  birthDate?: ITimestamp;
  relatives: IRealativesMap;
}

export interface IRelationship {
  status: TRealationshipStatus;
  partnerId?: string;
}

export interface IServerUserBasicInfo {
  [key: string]: {
    firstName: string;
    middleName?: string;
    lastName: string;
    pictureUrl?: string;
  };
}

export interface IServerUserPublicFriends {
  [key: string]: IPublicFriendsMap;
}

export interface IContactInfo {
  email: string;
  phoneNumber: string;
}
export type TUserContactField = keyof IContactInfo;

export interface IRealativesMap {
  [key: string]: TKinship;
}

export type TKinship = 'parent' | 'sibling' | 'child' | 'cousin';
export type TPartnerStatus = 'engaged' | 'married' | 'in relation';

export type TUserSex = 'male' | 'female' | 'other';

export type TRealationshipStatus = 'single' | "it's complicated" | TPartnerStatus | null;
