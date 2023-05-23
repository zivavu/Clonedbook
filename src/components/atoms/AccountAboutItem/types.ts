import { IconName } from '@fortawesome/fontawesome-svg-core';
import { StackProps } from '@mui/material';

export interface AccountAboutItemProps extends IAccountDetail, StackProps {
  iconSize?: number;
}

export interface IAccountDetail {
  label: string;
  value: string | null;
  icon: IconName;
  valueLink?: string;
}
