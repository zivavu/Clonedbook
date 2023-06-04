import { StackProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPagePhotosWrapperProps extends StackProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
