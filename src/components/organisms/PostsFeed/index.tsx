import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { PostsFeedProps } from './types';

export default function PostsFeed({ ...rootProps }: PostsFeedProps) {
	const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Typography>PostsFeed</Typography>
    </StyledRoot>
  );
}
  
