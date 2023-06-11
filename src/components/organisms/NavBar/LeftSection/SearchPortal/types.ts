import { PortalProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface SearchPortalProps extends PortalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  searchElement: HTMLDivElement | null;
  userHits: string[];
}
