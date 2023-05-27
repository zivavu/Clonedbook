import { IPicturesMap } from '@/types/picture';
import { IUser } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface BackgroundPictureProps extends BoxProps {
  userData: IUser;
  picturesMap: IPicturesMap | undefined;
}
