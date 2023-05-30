import { IconButton, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import HorizontalContentDevider from '@/components/atoms/ContentDeviders/HorizontalContentDevider';
import Icon from '@/components/atoms/Icon/Icon';
import { ListHeadingSectionProps } from './types';

export default function ListHeadingSection({
  heading,
  setCurrentTab,
  sx,
  ...rootProps
}: ListHeadingSectionProps) {
  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps} direction='row' spacing={1.5}>
      <IconButton onClick={() => setCurrentTab('home')} sx={{ width: '35px', height: '35px' }}>
        <Icon icon='arrow-left' fontSize={18} color={theme.palette.text.secondary} />
      </IconButton>
      <Stack>
        <Typography variant='body2' color={theme.palette.text.secondary}>
          Friends
        </Typography>
        <Typography variant='h3' fontWeight={750} letterSpacing={0.5}>
          {heading}
        </Typography>
        <HorizontalContentDevider bottom={0} />
      </Stack>
    </StyledRoot>
  );
}
