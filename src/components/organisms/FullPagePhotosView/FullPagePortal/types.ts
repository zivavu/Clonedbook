import { StackProps } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface FullPagePortalProps extends StackProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  //Designed to take PhotosCarousel and ElementInfo as children
  children: ReactNode;
}
