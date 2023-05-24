import { BoxProps } from '@mui/material';
import { StyledScrollableBox } from './styles';

export default function ScrollableBox({ children, sx, ...rootProps }: BoxProps) {
  return (
    <StyledScrollableBox sx={sx} {...rootProps}>
      {children}
    </StyledScrollableBox>
  );
}
