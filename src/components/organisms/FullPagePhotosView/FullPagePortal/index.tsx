import { Box, GlobalStyles, IconButton, Portal, Stack, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { FullPagePortalProps } from './types';

export default function FullPagePortal({
  setOpen,
  children,
  sx,
  ...rootProps
}: FullPagePortalProps) {
  const theme = useTheme();
  return (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Portal>
        <StyledRoot {...rootProps} sx={sx}>
          <Box position='relative'>
            <Stack direction='row' sx={{ position: 'fixed', left: '18px', top: '8px', zIndex: 2 }}>
              <IconButton
                onClick={() => setOpen(false)}
                TouchRippleProps={{ style: { color: 'white' } }}>
                <Icon icon='xmark' fontSize='25px' color={theme.palette.common.white} />
              </IconButton>
              <Link href='/' style={{ height: '40px', marginLeft: theme.spacing(1.4) }}>
                <Image
                  unoptimized
                  src='/facebook-logo.svg'
                  width={40}
                  height={40}
                  alt='Site logo'
                />
              </Link>
            </Stack>
          </Box>
          {children}
        </StyledRoot>
      </Portal>
    </>
  );
}
