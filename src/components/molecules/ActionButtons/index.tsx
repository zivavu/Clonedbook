import { Typography, useTheme } from '@mui/material';

import { StyledActionButton, StyledActionIcon, StyledRoot } from './styles';

import { ActionButtonsProps } from './types';

export default function ActionButtons({ sx, ...rootProps }: ActionButtonsProps) {
  const theme = useTheme();
  return (
    <StyledRoot {...rootProps} sx={sx}>
      <StyledActionButton value='like'>
        <StyledActionIcon icon={['far', 'thumbs-up']} />
        <Typography variant='subtitle2' fontWeight='500'>
          Like
        </Typography>
      </StyledActionButton>
      <StyledActionButton value='comment' sx={{ mr: theme.spacing(0.3), ml: theme.spacing(0.3) }}>
        <StyledActionIcon icon={['far', 'comment']} />
        <Typography variant='subtitle2' fontWeight='500'>
          Comment
        </Typography>
      </StyledActionButton>
      <StyledActionButton value='share'>
        <StyledActionIcon icon={['far', 'share-square']} />
        <Typography variant='subtitle2' fontWeight='500'>
          Share
        </Typography>
      </StyledActionButton>
    </StyledRoot>
  );
}
