import { PopperProps } from '@mui/material';

export interface ChatsListPopperProps extends PopperProps {
  handleClose(): void;
}
