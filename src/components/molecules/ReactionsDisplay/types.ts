import { IReactionReference } from '@/types/reaction';
import { IBasicUserInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface ReactionsDisplayProps extends BoxProps {
  reactions: IReactionReference[];
  userReaction: IReactionReference | null;
  exampleReactors?: IBasicUserInfo[] | undefined;
  displayNames?: boolean;
  displayCount?: boolean;
  emotesCount?: number;
  size?: number;
}
