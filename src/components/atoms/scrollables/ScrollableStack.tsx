import { StackProps } from '@mui/material';
import { StyledInvisibleScrollableStack, StyledScrollableStack } from './styles';

export default function ScrollableStack({ sx, ...rootProps }: StackProps) {
  return <StyledScrollableStack sx={sx} {...rootProps} />;
}
export function InvisibleScrollableStack({ sx, ...rootProps }: StackProps) {
  return <StyledInvisibleScrollableStack sx={sx} {...rootProps} />;
}
