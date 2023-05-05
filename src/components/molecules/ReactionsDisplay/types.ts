import { IReactionsMap, TLocalUserReaction } from '@/types/reaction';
import { BoxProps } from '@mui/material';

export interface ReactionsDisplayProps extends BoxProps {
  reactions: IReactionsMap | undefined;
  userReaction: TLocalUserReaction;
  displayNames?: boolean;
  displayCount?: boolean;
  emotesCount?: number;
  size?: number;
}
