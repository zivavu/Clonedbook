import { IReactionsMap } from '@/types/reaction';
import { BoxProps } from '@mui/material';

export interface ReactionsDisplayProps extends BoxProps {
  reactions: IReactionsMap;
  displayNames?: boolean;
  displayCount?: boolean;
  emotesCount?: number;
  size?: number;
}
