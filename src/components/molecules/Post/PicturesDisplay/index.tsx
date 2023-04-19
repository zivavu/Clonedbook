import { Typography, useTheme } from '@mui/material';

import { StyledDevider, StyledRoot } from './styles';

import Picture from './Picture';
import { DisplayMode, PicturesDisplayProps } from './types';

export default function PicturesDisplay({ pictures, ...rootProps }: PicturesDisplayProps) {
  const theme = useTheme();
  const mode: DisplayMode =
    pictures.length === 1 ? 'single' : pictures.length === 2 ? 'duo' : 'many';

  return (
    <StyledRoot {...rootProps}>
      <StyledDevider sx={{ top: '-1px' }} />
      {mode === 'single' ? <Picture src={pictures[0]} /> : null}
      <StyledDevider sx={{ bottom: '0' }} />
    </StyledRoot>
  );
}
