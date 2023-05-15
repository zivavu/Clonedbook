import { Box, GlobalStyles, IconButton, Portal, Stack, useTheme } from '@mui/material';

import Icon from '@/components/atoms/Icon/Icon';
import { useFetchUserQuery } from '@/features/userAPI';
import useFetchPostData from '@/hooks/useFetchPostData';
import { TLocalUserReaction } from '@/types/reaction';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PhotosCarousel from './PhotosCarousel';
import PostInfo from './PostInfo';
import { StyledRoot } from './styles';
import { FullPagePhotosViewProps } from './types';

export default function FullPagePhotosView({
  sx,
  initialPhoto,
  postId,
  setOpen,

  ...rootProps
}: FullPagePhotosViewProps) {
  const theme = useTheme();
  const { isError, isLoading, postData: post } = useFetchPostData(postId);
  const { data: user } = useFetchUserQuery({});
  const [userReaction, setUserReaction] = useState<TLocalUserReaction>(
    post?.reactions[user?.profileId || ''] || undefined,
  );
  useEffect(() => {
    setUserReaction(post?.reactions[user?.profileId || ''] || undefined);
  }, [post, user?.profileId]);

  return isLoading || isError || !post || !post.postPictures ? null : (
    <Portal>
      <StyledRoot {...rootProps} sx={sx}>
        <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
        <Box position='relative'>
          <Stack direction='row' sx={{ position: 'fixed', left: '18px', top: '8px', zIndex: 2 }}>
            <IconButton
              onClick={() => setOpen(false)}
              TouchRippleProps={{ style: { color: 'white' } }}>
              <Icon icon='xmark' fontSize='25px' color={theme.palette.common.white} />
            </IconButton>
            <Link href='/' style={{ height: '40px', marginLeft: theme.spacing(1.4) }}>
              <Image unoptimized src='/facebook-logo.svg' width={40} height={40} alt='Site logo' />
            </Link>
          </Stack>
        </Box>

        <PhotosCarousel post={post} initialPhoto={initialPhoto} />
        <PostInfo
          userReaction={userReaction}
          setUserReaction={setUserReaction}
          post={post}></PostInfo>
      </StyledRoot>
    </Portal>
  );
}
