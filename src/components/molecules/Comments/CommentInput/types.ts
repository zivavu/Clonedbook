import { IUserBasicInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface CommentInputProps extends BoxProps {
  user: IUserBasicInfo;
}
