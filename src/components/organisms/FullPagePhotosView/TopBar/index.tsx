import { IconButton, Stack, useTheme } from '@mui/material';

import Icon from '@/components/atoms/Icon/Icon';
import Link from '@/components/atoms/Link';
import Image from 'next/image';
import { TopBarProps } from './types';

export default function TopBar({ setOpen }: TopBarProps) {
  const theme = useTheme();
  return (
    <>
      <Stack direction='row' sx={{ position: 'fixed', left: '18px', top: '8px', zIndex: 2 }}>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ width: '40px', height: '40px' }}
          TouchRippleProps={{ style: { color: 'white' } }}>
          <Icon icon='xmark' fontSize='24px' color={theme.palette.common.white} />
        </IconButton>
        <Link href='/' style={{ height: '40px', marginLeft: theme.spacing(1) }}>
          <Image unoptimized src='/clonedbook-logo-200.png' width={40} height={40} alt='Site logo' />
        </Link>
      </Stack>
    </>
  );
}
