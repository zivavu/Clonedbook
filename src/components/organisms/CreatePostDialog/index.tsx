import { Box, Dialog, Stack, Typography, useTheme } from '@mui/material';

import {
  DialogCloseIconButton,
  PostSubmitButton,
  StyledMainContentStack,
  StyledRoot,
} from './styles';

import ContentDevider from '@/components/atoms/ContentDevider';
import Icon from '@/components/atoms/Icon/Icon';
import { db, storage } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import { IUserBasicInfo } from '@/types/user';
import { optimizePhotos } from '@/utils/optimizePhotos';
import { separateUserBasicInfo } from '@/utils/separateUserBasicInfo';
import { uuidv4 } from '@firebase/util';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRef, useState } from 'react';
import ErrorsFeed from './ErrorsFeed';
import PhotosInput from './PhotosInput';
import PostTextInput from './PostTextInput';
import UserInfo from './UserInfo';
import { CreatePostDialogProps, CreatePostError } from './types';

export default function CreatePostDialog({
  user,
  setIsOpen,
  sx,
  ...rootProps
}: CreatePostDialogProps) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<CreatePostError[]>([]);

  const [postPhotos, setPostPhotos] = useState<File[]>([]);
  const postTextRef = useRef('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (postTextRef.current.length === 0 && postPhotos.length === 0) {
      setErrors((prev) => [
        ...prev,
        { content: 'Post must contain text or photo', sevariety: 'error' },
      ]);
      return;
    }
    const userBasicInfo: IUserBasicInfo = separateUserBasicInfo(user);
    const postId = uuidv4();
    const downloadUrls: string[] = [];

    const optimizedPhotosBlobs = await optimizePhotos(postPhotos);
    const uploadPhotosPromises = optimizedPhotosBlobs.map((photo) => {
      const photoRef = ref(storage, `posts/${postId}/${uuidv4()}`);
      return uploadBytes(photoRef, photo, { contentType: 'image/webp' });
    });
    try {
      await Promise.allSettled(uploadPhotosPromises).then((results) => {
        results.forEach(async (result) => {
          if (result.status === 'fulfilled') {
            const downloadUrl = await getDownloadURL(result.value.ref);
            downloadUrls.push(downloadUrl);
          }
        });
      });
      const post: IPost = {
        text: postTextRef.current,
        createdAt: Timestamp.now(),
        pictures: downloadUrls,
        comments: {},
        id: postId,
        ownerId: userBasicInfo.id,
        wallOwnerId: userBasicInfo.id,
        reactions: {},
        shareCount: 0,
      };

      const userDocRef = doc(db, 'users', `${user.id}/posts/${postId}`);
      const postDocRef = doc(db, 'posts', postId);
      await setDoc(userDocRef, post);
      await setDoc(postDocRef, post);
    } catch (err) {
      const deleteRef = ref(storage, `posts/${postId}`);
      await deleteObject(deleteRef);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }
  return (
    <Dialog open onClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
        <StyledRoot sx={sx} {...rootProps}>
          <ErrorsFeed errors={errors} setErrors={setErrors} />

          <Stack p={theme.spacing(2)} position='relative'>
            <Typography textAlign='center' variant='h6' fontWeight='500'>
              Create Post
            </Typography>
            <ContentDevider bottom='0' />
          </Stack>
          <DialogCloseIconButton onClick={() => setIsOpen(false)}>
            <Icon icon='xmark' />
          </DialogCloseIconButton>

          <UserInfo user={user} />
          <StyledMainContentStack>
            <PostTextInput user={user} postPhotos={postPhotos} postTextRef={postTextRef} />
            <PhotosInput photos={postPhotos} setPhotos={setPostPhotos} setErrors={setErrors} />
          </StyledMainContentStack>
          <Box p={2}>
            <PostSubmitButton fullWidth variant='contained' type='submit'>
              <Typography fontWeight='400' variant='subtitle1' lineHeight='1.5rem'>
                Post
              </Typography>
            </PostSubmitButton>
          </Box>
        </StyledRoot>
      </form>
    </Dialog>
  );
}
