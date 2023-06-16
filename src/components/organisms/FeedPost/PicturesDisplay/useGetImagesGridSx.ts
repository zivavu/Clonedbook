import { CSSObject, useTheme } from '@mui/material';

export default function useGetImagesGridSx(picturesCount: number): CSSObject {
  const theme = useTheme();

  const smallGridSize: CSSObject = {
    height: '560px',
    [theme.breakpoints.down('sm')]: {
      height: '420px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '350px',
    },
  };
  const bigGridSize: CSSObject = {
    height: '680px',
    [theme.breakpoints.down('sm')]: {
      height: '500px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '400px',
    },
  };

  switch (picturesCount) {
    case 1:
      return {
        gridTemplateRows: '100% !important',
        gridTemplateColumns: '100% !important',
        ...smallGridSize,
      };
    case 2:
      return {
        gridTemplateRows: '100% !important',
        gridTemplateColumns: '1fr 1fr !important',
        ...smallGridSize,
      };
    case 3:
      return {
        gridTemplateRows: '0.5fr 0.5fr !important',
        gridTemplateColumns: '1fr 1fr !important',
        ...bigGridSize,
      };
    case 4:
      return {
        gridTemplateRows: '50% 50% !important',
        gridTemplateColumns: '50% 50% !important',
        ...bigGridSize,
      };
    case 5:
      return {
        gridTemplateRows: '0.6fr 0.4fr !important',
        gridTemplateColumns: 'repeat(6, 1fr) !important',
        ...bigGridSize,
      };
    default:
      return {
        gridTemplateRows: '0.6fr 0.4fr !important',
        gridTemplateColumns: 'repeat(6, 1fr) !important',
        ...bigGridSize,
      };
  }
}
