import { useTheme } from '@mui/material';
import { TPictureSize } from '../types';

export default function useGetImageSizes(size: TPictureSize) {
  const theme = useTheme();
  let imageSizes;
  const screens = {
    small: `(max-width: ${theme.breakpoints.values.sm}px)`,
    medium: `(max-width: ${theme.breakpoints.values.md}px)`,
    large: `(max-width: ${theme.breakpoints.values.xl}px)`,
  };

  switch (size) {
    case 'small':
      imageSizes = [
        `${screens.small} 200px`,
        `${screens.medium} 300px`,
        `${screens.large} 400px`,
        `400px`,
      ].join(', ');
      break;
    case 'medium':
      imageSizes = [
        `${screens.small} 350px`,
        `${screens.medium} 500px`,
        `${screens.large} 600px`,
        `700px`,
      ].join(', ');
      break;
    case 'large':
      imageSizes = [
        `${screens.small} 500px`,
        `${screens.medium} 500px`,
        `${screens.large} 700px`,
        `800px`,
      ].join(', ');
      break;
  }
  return imageSizes;
}
