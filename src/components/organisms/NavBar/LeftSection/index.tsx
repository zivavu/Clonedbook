import { InputAdornment, TextField, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { LeftSectionProps } from './types';

export default function LeftSection({ sx, classes, ...rootProps }: LeftSectionProps) {
  const theme = useTheme();
  return (
    <StyledRoot sx={sx} className={classes?.root} {...rootProps}>
      <Link href='/' style={{ height: '40px', paddingRight: theme.spacing(1) }}>
        <Image unoptimized src='/facebook-logo.svg' width={40} height={40} alt='Site logo'></Image>
      </Link>
      <TextField
        variant='outlined'
        placeholder='Search Facebook'
        size='small'
        InputProps={{
          sx: {
            fontSize: '1rem',
            borderRadius: '50px',
            width: '240px',
            color: theme.palette.text.secondary,
            fontWeight: 350,
            backgroundColor:
              theme.palette.mode === 'light'
                ? theme.palette.secondary.main
                : theme.palette.secondary.light,
          },
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='search' fontSize={16} color={theme.palette.text.secondary} />
            </InputAdornment>
          ),
        }}></TextField>
    </StyledRoot>
  );
}
