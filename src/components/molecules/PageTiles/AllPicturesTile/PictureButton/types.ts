import { IAccountPicture } from '@/types/picture';
import { ButtonBaseProps } from '@mui/material';

export interface PictureButtonProps extends ButtonBaseProps {
  picture: IAccountPicture;
}
