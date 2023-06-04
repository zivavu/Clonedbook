import { BoxProps } from '@mui/material';

export interface WriteSomethingTileProps extends BoxProps {
  refetchPostById: (id: string) => Promise<void>;
}
