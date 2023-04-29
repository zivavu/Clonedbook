import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
  darken,
  lighten,
  useTheme,
} from '@mui/material';

import {
  DialogCloseIconButton,
  PostSubmitButton,
  StyledErrorAlert,
  StyledErrorsStack,
  StyledPostTextField,
  StyledRoot,
} from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import { StyledTextContent } from '@/components/molecules/Comments/Comment/styles';
import { useFetchUserQuery } from '@/features/userAPI';
import { useEffect, useState } from 'react';
import { StyledDevider } from '../FullPagePhotosView/PostInfo/styles';
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

  const [errors, setErrors] = useState<CreatePostError[]>([]);

  const [postText, setPostText] = useState('');
  const [postPhotos, setPostPhotos] = useState<File[]>([]);

  useEffect(() => {
    let errorTimeout: ReturnType<typeof setTimeout>;
    if (errors.length > 0) {
      errorTimeout = setTimeout(() => {
        setErrors([]);
      }, 2500);
    }
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [errors]);

  const placeholder = `What's on your mind, ${user.firstName}?`;
  const isTextLong = postText.length > 85;

  return (
    <Dialog open onClose={() => setIsOpen(false)}>
      <StyledRoot sx={sx} {...rootProps}>
        {errors.length > 0 && (
          <StyledErrorsStack spacing={1}>
            {errors.map((error, i) => (
              <StyledErrorAlert key={error.content + i} severity={error.sevariety} variant='filled'>
                <Typography>{error.content}</Typography>
              </StyledErrorAlert>
            ))}
          </StyledErrorsStack>
        )}

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
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: isTextLong ? '0.95rem' : '1.5rem',
              },
            }}
          />
          <PhotosInput photos={postPhotos} setPhotos={setPostPhotos} setErrors={setErrors} />
          <PostSubmitButton fullWidth variant='contained'>
            <Typography fontWeight='400' variant='subtitle1' lineHeight='1.5rem'>
              Post
            </Typography>
          </PostSubmitButton>
        </Stack>
      </StyledRoot>
    </Dialog>
  );
}
