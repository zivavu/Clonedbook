import { ITimestamp } from '@/types/createdAt';
import { IUserBasicInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface PostOwnerInfoDisplayProps extends BoxProps {
  owner: IUserBasicInfo | null;
  createdAt: ITimestamp;
}
