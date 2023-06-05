import { BoxProps } from '@mui/material';

import { StyledVerticalContentDevider } from './styles';

export default function VerticalContentDevider({ sx, ...rootProps }: BoxProps) {
  return <StyledVerticalContentDevider sx={sx} {...rootProps}></StyledVerticalContentDevider>;
}
