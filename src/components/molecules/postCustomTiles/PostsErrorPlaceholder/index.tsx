import { BoxProps, Typography, useTheme } from '@mui/material';

import { StyledContentWrapper, StyledRoot } from '../../../organisms/FeedPost/styles';
import { StyledIcon, StyledIconContainer } from '../styles';

export default function PostsErrorPlaceholder({ sx, ...rootProps }: BoxProps) {
  const theme = useTheme();
  return (
    <StyledRoot height={220} position='relative' sx={sx} {...rootProps}>
      <StyledContentWrapper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        spacing={1}>
        <StyledIconContainer
          sx={{
            backgroundColor: theme.palette.error.dark,
          }}>
          <StyledIcon icon='sad-cry' />
        </StyledIconContainer>
        <Typography variant='h3' fontWeight={600} lineHeight={1}>
          {'There was an error loading posts.'}
        </Typography>
        <Typography variant='h3' fontWeight={600} lineHeight={1}>
          {'Please try again, or open an issue on github.'}
        </Typography>
      </StyledContentWrapper>
    </StyledRoot>
  );
}
