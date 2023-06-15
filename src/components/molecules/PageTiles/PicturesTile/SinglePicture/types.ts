import { IAccountPicture } from '@/types/picture';
import { IUser } from '@/types/user';
import { BoxProps, ButtonBaseProps } from '@mui/material';

export interface SinglePictureProps extends ButtonBaseProps {
  owner: IUser;
  picture: IAccountPicture;
  handleOpenFullView: (picture: IAccountPicture) => void;
}
