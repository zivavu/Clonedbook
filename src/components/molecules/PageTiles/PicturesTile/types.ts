import { IPicture } from '@/types/picture';
import { IUser } from '@/types/user';
import { BoxProps, StackProps } from '@mui/material';

export interface PicturesTileProps extends BoxProps {
  user: IUser;
}

export interface PicturesRowProps extends StackProps {
  pictures: IPicture[];
  user: IUser;
}
