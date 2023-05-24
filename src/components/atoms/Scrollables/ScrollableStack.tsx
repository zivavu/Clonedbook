import { StackProps } from '@mui/material';
import { StyledScrollableStack } from './styles';

export default function ScrollableStack({ children, sx, ...rootProps }: StackProps) {
  return (
    <StyledScrollableStack sx={sx} {...rootProps}>
      {children}
    </StyledScrollableStack>
  );
}
