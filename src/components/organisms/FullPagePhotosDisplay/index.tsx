import {
  Box,
  Button,
  GlobalStyles,
  IconButton,
  Portal,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { StyledCurrentImageContainer, StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { FullPagePhotosDisplayProps } from './types';

export default function FullPagePhotosDisplay({
  sx,
  photo,
  post,
  setOpen,
  ...rootProps
}: FullPagePhotosDisplayProps) {
  const theme = useTheme();

  const screens = {
    small: `(max-width: ${theme.breakpoints.values.sm}px)`,
    medium: `(max-width: ${theme.breakpoints.values.md}px)`,
    large: `(max-width: ${theme.breakpoints.values.xl}px)`,
  };
  const imageSizes = [
    `${screens.small} 500px`,
    `${screens.medium} 800px`,
    `${screens.large} 1100px`,
    `1400px`,
  ].join(', ');
  return (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <StyledRoot {...rootProps} sx={sx}>
        <StyledCurrentImageContainer>
          <Stack direction='row' sx={{ position: 'fixed', left: '18px', top: '8px', zIndex: 2 }}>
            <IconButton onClick={() => setOpen(false)}>
              <Icon icon='xmark' fontSize='25px' color={theme.palette.common.white} />
            </IconButton>
            <Link href='/' style={{ height: '40px', marginLeft: theme.spacing(1.4) }}>
              <Image src='/facebook-logo.svg' width={40} height={40} alt='Site logo' />
            </Link>
          </Stack>
          <Image
            src={photo}
            fill
            sizes={imageSizes}
            quality={100}
            style={{ objectFit: 'contain', padding: theme.spacing(0, 16) }}
            alt='Full Size Photo'
          />
        </StyledCurrentImageContainer>
        <Box minWidth='360px'></Box>
      </StyledRoot>
    </>
  );
}
