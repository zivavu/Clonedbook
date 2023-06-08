import { IUser, IUserBasicInfo, TKinship, TPartnerStatus } from '@/types/user';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { StackProps } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';

export interface ITextAccountDetail {
  label: string;
  value: string | null;
  icon: IconName;
  valueLink?: string;
  placeholder?: string;

  //showed when the user is logged in and the value of field is null
  editPlaceholder: string;
}
export interface TextAccountDetailProps<T> extends StackProps {
  userId: string;
  iconSize?: number;
  accountDetail: ITextAccountDetail;
  showPlaceholder?: boolean;

  //allows the text to wrap insead of overflowing and showing ellipsis
  allowWrap?: boolean;

  //prevent edit is used when we don't want to show the edit button, even for the logged in user(for eg. in IntroTile)
  preventEdit?: boolean;

  editHandler: (value: T) => Promise<void>;

  CustomEditComponent?: TCustomEditComponent<T>;
}

type TCustomEditComponent<T> = FC<CustomEditComponentProps<T>>;

export interface CustomEditComponentProps<T> {
  setEditInputValue: Dispatch<SetStateAction<T | undefined>>;
  initialValue?: T;
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
