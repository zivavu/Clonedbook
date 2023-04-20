import { IUserReaction, TPossibleReaction } from '@/types/reaction';
import { IBasicUserInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface ReactionsDisplayProps extends BoxProps {
  reactions: IUserReaction[] | undefined;
  exampleReactors?: IBasicUserInfo[] | undefined;
  displayNames?: boolean;
  displayCount?: boolean;
  emotesCount?: number;
  size?: number;
}

export type ReactionsByTypes = {
  //eslint-disable-next-line no-unused-vars
  [key in TPossibleReaction]: { count: number; icon: string };
};
