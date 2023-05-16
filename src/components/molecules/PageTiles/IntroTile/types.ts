import { IUser } from '@/types/user';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { BoxProps } from '@mui/material';

export interface IntroTileProps extends BoxProps {
  user: IUser;
}

export interface IDetail {
  label: string;
  value: string | null;
  icon: IconName;
}
