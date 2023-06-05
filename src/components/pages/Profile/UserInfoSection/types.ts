import { IUser } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface UserInfoSectionProps extends BoxProps {
  userData: IUser;
  refetchUser: () => void;
}
