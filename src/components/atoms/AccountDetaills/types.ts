import { IUser, IUserBasicInfo, TKinship, TPartnerStatus } from '@/types/user';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { StackProps } from '@mui/material';

export interface ITextAccountDetail {
  label: string;
  value: string | null;
  icon: IconName;
  valueLink?: string;
  placeholder?: string;
}
export interface TextAccountDetailProps extends StackProps {
  iconSize?: number;
  accountDetail: ITextAccountDetail;
  showPlaceholder?: boolean;
}

export interface CategoryProps extends StackProps {
  userData: IUser;
  iconSize?: number;
  showPlaceholder?: boolean;
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
