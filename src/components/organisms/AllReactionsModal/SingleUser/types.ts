import { TReactionsByTypes } from '@/common/misc/userDataManagment/useDeserializeReactions';
import { IReactionWithBasicInfo } from '@/types/reaction';
import { StackProps } from '@mui/material';

export interface SingleUserProps extends StackProps {
  reaction: IReactionWithBasicInfo;
  reactionsByTypes: TReactionsByTypes;
}
