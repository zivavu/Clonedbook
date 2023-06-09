import { BoxProps } from '@mui/material';

export interface UserPictureProps extends BoxProps {
  userId: string;
  usePopper?: boolean;

  //used for next/image optimization
  sizes?: string;
}
