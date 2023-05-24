import { Typography, useTheme } from '@mui/material';

import { StyledToggleButton } from '@/components/organisms/ReactionsModal/styles';
import SelectedButtonUnderline from '../SelectedButtonUnderline';
import { TabToggleButtonProps } from './types';

export default function TabToggleButton({
  value,
  isSelected,
  sx,
  ...rootProps
}: TabToggleButtonProps) {
  const theme = useTheme();
  return (
    <StyledToggleButton sx={sx} {...rootProps} value={value}>
      <Typography variant='subtitle1' fontWeight='400'>
        {value}
      </Typography>
      {isSelected ? <SelectedButtonUnderline /> : null}
    </StyledToggleButton>
  );
}
