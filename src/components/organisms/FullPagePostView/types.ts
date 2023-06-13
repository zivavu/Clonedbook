import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPagePostViewProps extends BoxProps {
  postId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetchPost: () => Promise<void> | void;
}
