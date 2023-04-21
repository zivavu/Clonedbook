import { Box, GlobalStyles, IconButton, Stack, useTheme } from '@mui/material';

import Icon from '@/components/atoms/Icon/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import PhotosCarousel from './PhotosCarousel';
import PostInfo from './PostInfo';
import { StyledRoot } from './styles';
import { FullPagePhotosDisplayProps } from './types';

export default function FullPagePhotosDisplay({
  sx,
  initialPhoto,
  post,
  setOpen,
  ...rootProps
}: FullPagePhotosDisplayProps) {
  const theme = useTheme();

  if (!post.postPictures) return null;
  return (
    <StyledRoot {...rootProps} sx={sx}>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />

      <Box position='relative'>
        <Stack direction='row' sx={{ position: 'fixed', left: '18px', top: '8px', zIndex: 2 }}>
          <IconButton
            onClick={() => setOpen(false)}
            TouchRippleProps={{ style: { color: 'white' } }}
          >
            <Icon icon='xmark' fontSize='25px' color={theme.palette.common.white} />
          </IconButton>
          <Link href='/' style={{ height: '40px', marginLeft: theme.spacing(1.4) }}>
            <Image src='/facebook-logo.svg' width={40} height={40} alt='Site logo' />
          </Link>
        </Stack>
      </Box>

      <PhotosCarousel post={post} initialPhoto={initialPhoto} />
      <PostInfo post={post}></PostInfo>
    </StyledRoot>
  );
}
