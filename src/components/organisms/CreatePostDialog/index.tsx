import { Dialog, Stack, Typography, useTheme } from '@mui/material';

import { DialogCloseIconButton, PostSubmitButton, StyledPostTextField, StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import { useEffect, useState } from 'react';
import { StyledDevider } from '../FullPagePhotosView/PostInfo/styles';
import ErrorsFeed from './ErrorsFeed';
import PhotosInput from './PhotosInput';
import UserInfo from './UserInfo';
import { CreatePostDialogProps, CreatePostError } from './types';
export default function CreatePostDialog({
  user,
  setIsOpen,
  sx,
  ...rootProps
}: CreatePostDialogProps) {
  const theme = useTheme();

  const [mainErrors, setMainErrors] = useState<CreatePostError[]>([]);

  const [postText, setPostText] = useState('');
  const [postPhotos, setPostPhotos] = useState<File[]>([]);

  const placeholder = `What's on your mind, ${user.firstName}?`;
  const textLines = postText.match(/\n/g)?.length || 0 + 1;
  const isTextLong = postText.length > 85 || textLines > 3;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (postText.length === 0 || postPhotos.length === 0) {
      setMainErrors((prev) => [
        ...prev,
        { content: 'Post must contain text or photo', sevariety: 'error' },
      ]);
      return;
    }
  }
  return (
    <Dialog open onClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit} style={{ overflow: 'hidden' }}>
        <StyledRoot sx={sx} {...rootProps}>
          <ErrorsFeed errors={mainErrors} setErrors={setMainErrors} />

          <Stack p={theme.spacing(2)} position='relative'>
            <Typography textAlign='center' variant='h6' fontWeight='500'>
              Create Post
            </Typography>
            <StyledDevider bottom='0' />
          </Stack>
          <DialogCloseIconButton onClick={() => setIsOpen(false)}>
            <Icon icon='xmark' />
          </DialogCloseIconButton>

          <Stack p={theme.spacing(2)}>
            <UserInfo user={user} />
            <StyledPostTextField
              variant='outlined'
              multiline
              placeholder={placeholder}
              onChange={(e) => setPostText(e.target.value)}
              value={postText}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: isTextLong ? '0.95rem' : '1.5rem',
                },
              }}
            />
            <PhotosInput photos={postPhotos} setPhotos={setPostPhotos} setErrors={setMainErrors} />
            <PostSubmitButton fullWidth variant='contained' type='submit'>
              <Typography fontWeight='400' variant='subtitle1' lineHeight='1.5rem'>
                Post
              </Typography>
            </PostSubmitButton>
          </Stack>
        </StyledRoot>
      </form>
    </Dialog>
  );
}
