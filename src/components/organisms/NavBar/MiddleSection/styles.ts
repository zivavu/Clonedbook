import { ToggleButton, styled } from '@mui/material';
import { StyledContentSection } from '../styles';

export const StyledRoot = styled(StyledContentSection)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  position: 'relative',
  width: 'max(120px, 10%)',
  height: `calc(100% - ${theme.spacing(1)})`,
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(0, 0.5),
  transition: 'height 0.25s ease-in-out',

  '&.Mui-selected': {
    height: `calc(100% - ${theme.spacing(0.4)})`,
    alignSelf: 'flex-end',
    color: theme.palette.info.main,
    backgroundColor: theme.palette.primary.light,
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
  },
}));
