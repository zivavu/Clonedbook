import { Box, Dialog, Stack, Typography, useTheme } from '@mui/material';

import {
  DialogCloseIconButton,
  PostSubmitButton,
  StyledMainContentStack,
  StyledRoot,
} from './styles';

import useCreateNewPost from '@/common/firebase/posts/useCreateNewPost';
import Icon from '@/components/atoms/Icon/Icon';
import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useRef, useState } from 'react';
import PhotosInput from './PhotosInput';
import PostTextInput from './PostTextInput';
import StatusFeed from './StatusFeed';
import UserInfo from './UserInfo';
import { CreatePostDialogProps } from './types';

export default function CreatePostDialog({
  setIsOpen,
  refetchPostById,
  sx,
  ...rootProps
}: CreatePostDialogProps) {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const theme = useTheme();

  const [postPhotos, setPostPhotos] = useState<File[]>([]);
  const postTextRef = useRef('');

  const { createPost, isLoading, status, setStatus } = useCreateNewPost();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!loggedUser || isLoading) return;
    await createPost({
      postPhotos: postPhotos,
      postText: postTextRef.current,
      refetchPostById: refetchPostById,
    });
    if (status.every((status) => status.sevariety !== 'error')) {
      setIsOpen(false);
    }
  }

  if (!loggedUser) return null;
  return (
    <Dialog open onClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
        <StyledRoot sx={sx} {...rootProps}>
          <StatusFeed status={status} setStatus={setStatus} />

          <Stack p={theme.spacing(2)} position='relative'>
            <Typography textAlign='center' variant='h4' fontWeight='500'>
              Create Post
            </Typography>
            <HorizontalContentDevider bottom='0' />
          </Stack>
          <DialogCloseIconButton onClick={() => setIsOpen(false)}>
            <Icon icon='xmark' />
          </DialogCloseIconButton>

          <UserInfo user={loggedUser} />
          <StyledMainContentStack>
            <PostTextInput user={loggedUser} postPhotos={postPhotos} postTextRef={postTextRef} />
            <PhotosInput photos={postPhotos} setPhotos={setPostPhotos} setErrors={setStatus} />
          </StyledMainContentStack>
          <Box p={2}>
            <PostSubmitButton fullWidth variant='contained' type='submit' disabled={isLoading}>
              <Typography fontWeight='400' variant='subtitle1' lineHeight='1.5rem'>
                {isLoading ? 'Loading...' : 'Post'}
              </Typography>
            </PostSubmitButton>
          </Box>
        </StyledRoot>
      </form>
    </Dialog>
  );
}
