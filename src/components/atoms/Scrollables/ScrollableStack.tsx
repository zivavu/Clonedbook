import { StackProps } from '@mui/material';
import { StyledInvisibleScrollableStack, StyledScrollableStack } from './styles';

export default function ScrollableStack({ children, sx, ...rootProps }: StackProps) {
  return (
    <StyledScrollableStack sx={sx} {...rootProps}>
      {children}
    </StyledScrollableStack>
  );
}
export function InvisibleScrollableStack({ children, sx, ...rootProps }: StackProps) {
  return (
    <StyledInvisibleScrollableStack sx={sx} {...rootProps}>
      {children}
    </StyledInvisibleScrollableStack>
  );
}
