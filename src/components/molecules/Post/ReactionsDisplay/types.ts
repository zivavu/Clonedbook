import { PossibleReaction, UserReaction } from '@/types/reaction';
import { BoxProps } from '@mui/material';

export interface ReactionsDisplayProps extends BoxProps {
  reactions: UserReaction[] | undefined;
}

export type ReactionsByTypes = {
  [key in PossibleReaction]: { count: number; icon: string };
};
