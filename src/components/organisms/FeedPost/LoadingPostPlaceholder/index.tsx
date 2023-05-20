import { BoxProps, Stack, useTheme } from '@mui/material';

import { StyledContentWrapper, StyledRoot } from '../styles';
import { StyledHorizontalHole, StyledRoundHole } from './styles';

export default function LoadingPostPlaceholder({ sx, ...rootProps }: BoxProps) {
  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <StyledContentWrapper height={300} position='relative' overflow='hidden'>
        <Stack width='100%' height='100%' pt={1} pb={2} justifyContent='space-between'>
          <Stack direction='row' spacing={2}>
            <StyledRoundHole />
            <Stack spacing={0.5} pt={1}>
              <StyledHorizontalHole width='80px' />
              <StyledHorizontalHole width='100px' />
            </Stack>
          </Stack>
          <Stack direction='row' width='100%' justifyContent='space-around'>
            <StyledHorizontalHole width='70px' />
            <StyledHorizontalHole width='70px' />
            <StyledHorizontalHole width='70px' />
          </Stack>
        </Stack>
      </StyledContentWrapper>
    </StyledRoot>
  );
}
