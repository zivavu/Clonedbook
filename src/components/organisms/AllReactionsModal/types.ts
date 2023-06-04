import { IReactionsMap } from '@/types/reaction';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface AllReactionsModalProps extends BoxProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  reactions: IReactionsMap;
}
