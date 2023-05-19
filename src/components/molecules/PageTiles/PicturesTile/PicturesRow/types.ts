import { IAccountPicture } from '@/types/picture';
import { IUser } from '@/types/user';
import { StackProps } from '@mui/material';

export interface PicturesRowProps extends StackProps {
  pictures: IAccountPicture[];
  startIndex: number;
  owner: IUser;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}
