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
        <Image src='/facebook-logo.svg' width={40} height={40} alt='Site logo'></Image>
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
            backgroundColor: theme.palette.secondary.main,
          },
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='search' />
            </InputAdornment>
          ),
        }}></TextField>
    </StyledRoot>
  );
}
