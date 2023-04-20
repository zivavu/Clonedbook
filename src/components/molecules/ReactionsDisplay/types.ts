import { PossibleReaction, UserReaction } from '@/types/reaction';
import { BasicUserInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface ReactionsDisplayProps extends BoxProps {
  reactions: UserReaction[] | undefined;
  exampleReactors: BasicUserInfo[];
}

export type ReactionsByTypes = {
  //eslint-disable-next-line no-unused-vars
  [key in PossibleReaction]: { count: number; icon: string };
};
