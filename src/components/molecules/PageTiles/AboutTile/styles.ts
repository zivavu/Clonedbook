import { ListItemButton, Stack, Typography, styled } from '@mui/material';

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  '&.Mui-selected .MuiTypography-root': {
    color: theme.palette.info.main,
  },
}));

export const StyledContentWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  [theme.breakpoints.down('md').replace('@media', '@container')]: {
    flexDirection: 'column',
  },
}));

export const StyledListContainer = styled(Stack)(({ theme }) => ({
  positin: 'relative',
  width: 'max(25%, 250px)',

  [theme.breakpoints.down('md').replace('@media', '@container')]: {
    width: '100%',
  },
}));

export const SectionRoot = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2, 2),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 550,
  fontSize: theme.typography.subtitle1.fontSize,
  lineHeight: theme.typography.subtitle1.lineHeight,
  paddingBottom: theme.spacing(1),
}));
