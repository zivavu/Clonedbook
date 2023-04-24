import { BoxProps } from '@mui/material';
import { SelectButtonUnderline } from './styles';

export default function SelectedButtonUnderline({ sx, ...rootProps }: BoxProps) {
  return <SelectButtonUnderline sx={sx} {...rootProps} />;
}
