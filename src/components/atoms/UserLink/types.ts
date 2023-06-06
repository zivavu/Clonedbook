import { LinkProps } from '@mui/material';

export interface UserLinkProps extends LinkProps {
  userId: string;
  usePopper?: boolean;
}
