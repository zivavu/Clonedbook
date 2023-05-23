import { BoxProps } from '@mui/material';

import { StyledHorizontalContentDevider } from './styles';

export default function HorizontalContentDevider({ sx, ...rootProps }: BoxProps) {
  return <StyledHorizontalContentDevider sx={sx} {...rootProps}></StyledHorizontalContentDevider>;
}
