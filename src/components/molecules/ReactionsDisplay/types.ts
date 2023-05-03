import { IReactionsMap, TReactionType } from '@/types/reaction';
import { BoxProps } from '@mui/material';

export interface ReactionsDisplayProps extends BoxProps {
  reactions: IReactionsMap;
  userReaction: TReactionType | null;
  displayNames?: boolean;
  displayCount?: boolean;
  emotesCount?: number;
  size?: number;
}
