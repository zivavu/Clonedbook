import { Typography, styled } from '@mui/material';

export const StyledTextDetailValue = styled(Typography)(({}) => ({
  overflow: 'hidden',
  wordBreak: 'keep-all',
  textOverflow: 'ellipsis',
}));
