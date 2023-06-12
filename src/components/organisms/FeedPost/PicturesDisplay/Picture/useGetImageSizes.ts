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
        `${screens.small} 250px`,
        `${screens.medium} 500px`,
        `${screens.large} 600px`,
        `600px`,
      ].join(', ');
      break;
    case 'medium':
      imageSizes = [
        `${screens.small} 350px`,
        `${screens.medium} 500px`,
        `${screens.large} 600px`,
        `600px`,
      ].join(', ');
      break;
    case 'large':
      imageSizes = [
        `${screens.small} 500px`,
        `${screens.medium} 700px`,
        `${screens.large} 700px`,
        `800px`,
      ].join(', ');
      break;
    case 'xlarge':
      imageSizes = [
        `${screens.small} 700px`,
        `${screens.medium} 800px`,
        `${screens.large} 1000px`,
        `1300px`,
      ].join(', ');
  }
  return imageSizes;
}
