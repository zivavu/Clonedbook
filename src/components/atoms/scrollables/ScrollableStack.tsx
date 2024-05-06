import { StackProps } from '@mui/material';
import { StyledNoBarScrollableStack, StyledScrollableStack } from './styles';

export default function ScrollableStack({ sx, ...rootProps }: StackProps) {
  return <StyledScrollableStack sx={sx} {...rootProps} />;
}
export function NoBarScrollableStack({ sx, ...rootProps }: StackProps) {
  return <StyledNoBarScrollableStack sx={sx} {...rootProps} />;
}
