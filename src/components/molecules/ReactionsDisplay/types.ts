import { IReactionReference, TReactionType } from '@/types/reaction';
import { IBasicUserInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface ReactionsDisplayProps extends BoxProps {
  reactions: IReactionReference[];
  exampleReactors?: IBasicUserInfo[] | undefined;
  displayNames?: boolean;
  displayCount?: boolean;
  emotesCount?: number;
  size?: number;
}
