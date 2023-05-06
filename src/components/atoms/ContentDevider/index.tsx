import { BoxProps } from '@mui/material';

import { StyledContentDevider } from './styles';

export default function ContentDevider({ sx, ...rootProps }: BoxProps) {
  return <StyledContentDevider sx={sx} {...rootProps}></StyledContentDevider>;
}
