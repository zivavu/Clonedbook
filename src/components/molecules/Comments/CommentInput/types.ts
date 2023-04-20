import { IBasicUserInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface CommentInputProps extends BoxProps {
  user: IBasicUserInfo;
}
