import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { ErrorsFeedProps } from './types';

export default function ErrorsFeed({ sx, ...rootProps }: ErrorsFeedProps) {
	const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Typography>ErrorsFeed</Typography>
    </StyledRoot>
  );
}
  
