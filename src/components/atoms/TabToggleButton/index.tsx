import { Typography } from '@mui/material';

import { StyledToggleButton } from '@/components/organisms/ReactionsModal/styles';
import SelectedButtonUnderline from '../SelectedButtonUnderline';
import { TabToggleButtonProps } from './types';

export default function TabToggleButton({
  value,
  isSelected,
  sx,
  ...rootProps
}: TabToggleButtonProps) {
  return (
    <StyledToggleButton sx={sx} {...rootProps} value={value}>
      <Typography variant='subtitle1' fontWeight='400'>
        {value}
      </Typography>
      {isSelected ? <SelectedButtonUnderline /> : null}
    </StyledToggleButton>
  );
}
