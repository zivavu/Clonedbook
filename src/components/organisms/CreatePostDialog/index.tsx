import { Box, Dialog, Stack, Typography, useTheme } from '@mui/material';

import {
  DialogCloseIconButton,
  PostSubmitButton,
  StyledMainContentStack,
  StyledRoot,
} from './styles';

import HorizontalContentDevider from '@/components/atoms/ContentDeviders/HorizontalContentDevider';
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
    if (isLoading) return;
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
    const picturesIds: string[] = [];

    const optimizedPhotosBlobs = await optimizePhotos(postPhotos);
    const uploadPhotosPromises = optimizedPhotosBlobs.map((photo) => {
      const pictureId = uuidv4();
      picturesIds.push(pictureId);
      const photoRef = ref(storage, `posts/${postId}/${pictureId}`);
      return uploadBytes(photoRef, photo, { contentType: 'image/webp' });
    });
    try {
      const results = await Promise.allSettled(uploadPhotosPromises);
      const getDownloadUrlsPromises = results.map((result) => {
        if (result.status === 'rejected') return;
        return getDownloadURL(result.value.ref);
      });
      const urlsResults = await Promise.allSettled(getDownloadUrlsPromises);
      const downloadUrls = urlsResults
        .map((result) => {
          if (result.status === 'rejected') return;
          return result.value as string;
        })
        .filter((url) => url !== undefined) as string[];

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

      const postDocRef = doc(db, 'posts', postId);
      await setDoc(postDocRef, post);
    } catch (err) {
      try {
        const picturesRefs = picturesIds.map((id) => ref(storage, `posts/${postId}/${id}`));
        const deletePromises = picturesRefs.map((id) => deleteObject(id));
        await Promise.allSettled(deletePromises);
      } catch {
        setErrors((prev) => [
          ...prev,
          { content: 'Problem with deleting photos occurred', sevariety: 'error' },
        ]);
      }
      setErrors((prev) => [
        { content: 'Problem with creating post occurred. Try again', sevariety: 'error' },
        ...prev,
      ]);
    } finally {
      if (!errors[0]) setErrors([{ content: 'Post created successfully', sevariety: 'success' }]);
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);
      setIsLoading(false);
    }
  }

  return (
    <Dialog open onClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
        <StyledRoot sx={sx} {...rootProps}>
          <ErrorsFeed errors={errors} setErrors={setErrors} />

          <Stack p={theme.spacing(2)} position='relative'>
            <Typography textAlign='center' variant='h4' fontWeight='500'>
              Create Post
            </Typography>
            <HorizontalContentDevider bottom='0' />
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
