import { InputAdornment, TextField } from '@mui/material';

import { StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { LeftSectionProps } from './types';

export default function LeftSection({ sx, classes, ...rootProps }: LeftSectionProps) {
  return (
    <StyledRoot sx={sx} className={classes?.root} {...rootProps}>
      <Link href='/'>
        <Image src='/facebook-logo.svg' width={50} height={50} alt='Site logo'></Image>
      </Link>
      <TextField
        variant='outlined'
        placeholder='Search Facebook'
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='search' />
            </InputAdornment>
          ),
        }}
      ></TextField>
    </StyledRoot>
  );
}
