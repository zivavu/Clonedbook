import { IComment } from '@/types/comment';
import { IBasicUserInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface CommentsProps extends BoxProps {
  comments: IComment[] | undefined;
}
