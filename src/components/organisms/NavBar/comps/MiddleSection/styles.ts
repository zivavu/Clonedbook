import { Box, ToggleButton, keyframes, styled } from '@mui/material';
import { StyledContentSection } from '../../styles';

export const StyledRoot = styled(StyledContentSection)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledIconButton = styled(ToggleButton)(({ theme }) => ({
  position: 'relative',
  width: 'max(120px, 10%)',
  height: `calc(100% - ${theme.spacing(1)})`,
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(0, 0.5),

  '&.Mui-selected': {
    height: `calc(100% - ${theme.spacing(0.5)})`,
    alignSelf: 'flex-end',
    color: theme.palette.info.main,
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
  },
}));

export const SelectedButtonUnderline = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '3px',
  bottom: '0',
  left: '0',
  backgroundColor: theme.palette.info.main,
  animation: `${slidein} 0.15s ease-out`,
}));

const slidein = keyframes`
from {
	  height: 0;
	  width: 0;
	  left: 50%;
}
to {
	  height: 3px;
	  width: 100%;
	  left: 0;
}`;
