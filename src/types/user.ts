import { IChatReference } from './chat';
import { ITimestamp } from './createdAt';
import { IFriendsMap, IPublicFriendsMap } from './firend';

export interface IUser extends IUserBasicInfo {
  backgroundPicture?: string;
  backgroundPictureId?: string;
  profilePictureId?: string;
  isDummy?: boolean;
  groups: Object;
  chatReferences: IChatReference[];
  friends: IFriendsMap;
  contact: IContactInfo;
  about: {
    intrests: string[];
    bio?: string;
    address?: string;
    country?: string;
    hometown?: string;
    city?: string;
    college?: string;
    highSchool?: string;
    workplace?: string;
    jobTitle?: string;
    relationship?: IRelationship;
    birthDate?: ITimestamp;
    relatives: IRealativesMap;
    sex: TUserSex;
  };
}

export interface IUserBasicInfo {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  pictureUrl?: string;
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

export interface IRealativesMap {
  [key: string]: TKinship;
}

export type TKinship = 'parent' | 'sibling' | 'child' | 'cousin';
export type TPartnerStatus = 'engaged' | 'married' | 'in relation';

export type TUserSex = 'male' | 'female' | 'other';

export type TRealationshipStatus = 'single' | "it's complicated" | TPartnerStatus | null;
