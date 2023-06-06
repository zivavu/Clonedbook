import { IUser, IUserBasicInfo, TKinship, TPartnerStatus } from '@/types/user';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { StackProps } from '@mui/material';

export interface ITextAccountDetail {
  label: string;
  value: string | null;
  icon: IconName;
  valueLink?: string;
  placeholder?: string;
  editPlaceholder: string;
}
export interface TextAccountDetailProps extends StackProps {
  userId: string;
  iconSize?: number;
  accountDetail: ITextAccountDetail;
  showPlaceholder?: boolean;
  allowWrap?: boolean;
  //prevent edit is used when we don't want to show the edit button, even for the logged in user(for eg. in IntroTile)
  preventEdit?: boolean;
}

export interface CategoryProps extends StackProps {
  userData: IUser;
  iconSize?: number;
  showPlaceholder?: boolean;
  allowWrap?: boolean;
  preventEdit?: boolean;
}

export interface FamilyAcountDetailProps extends StackProps {
  label: string;
  user: IUserBasicInfo;
  pictureSize?: number;
}
export interface FamilyMemberProps extends StackProps {
  relativeId: string;
  kinshipType: TKinship | TPartnerStatus;
  pictureSize?: number;
}
