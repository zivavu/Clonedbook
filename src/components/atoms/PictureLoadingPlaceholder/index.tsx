import { BoxProps } from '@mui/material';
import { StyledGradient1, StyledGradient2 } from './styles';

export default function PictureLoadingPlaceholder({ sx, ...rootProps }: BoxProps) {
  return (
    <>
      <StyledGradient1 sx={sx} {...rootProps} />
      <StyledGradient2 sx={sx} {...rootProps} />
    </>
  );
}
