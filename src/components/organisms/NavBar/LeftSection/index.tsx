import { Button, InputAdornment, TextField } from '@mui/material';

import { StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import { generateUsersAndPostToDb } from '@/utils/generateRandomUsers';
import Image from 'next/image';
import Link from 'next/link';
import { LeftSectionProps } from './types';

export default function LeftSection({ sx, classes, ...rootProps }: LeftSectionProps) {
  return (
    <StyledRoot sx={sx} className={classes?.root} {...rootProps}>
      <Link href='/'>
        <Image src='/facebook-logo.svg' width={50} height={50} alt='Site logo'></Image>
      </Link>
      <Button onClick={() => generateUsersAndPostToDb(100, 100)}>DO IT</Button>
      <TextField
        variant='outlined'
        placeholder='Search Facebook'
        size='small'
        InputProps={{
          sx: {
            borderRadius: '50px',
          },
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
