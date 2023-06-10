import { Box, Dialog, Stack, Typography, useTheme } from '@mui/material';

import {
  DialogCloseIconButton,
  PostSubmitButton,
  StyledMainContentStack,
  StyledRoot,
} from './styles';

import { optimizePhotoFilesArr } from '@/common/misc/photoManagment/optimizePhotoFilesArr';
import Icon from '@/components/atoms/Icon/Icon';
import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import { db, storage } from '@/config/firebase.config';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { IPictureWithPlaceholders } from '@/types/picture';
import { IPost } from '@/types/post';
import { uuidv4 } from '@firebase/util';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRef, useState } from 'react';
import PhotosInput from './PhotosInput';
import PostTextInput from './PostTextInput';
import StatusFeed from './StatusFeed';
import UserInfo from './UserInfo';
import { CreatePostDialogProps, CreatePostStatus } from './types';

export default function CreatePostDialog({
  setIsOpen,
  refetchPostById,
  sx,
  ...rootProps
}: CreatePostDialogProps) {
  const { data: loggedUser } = useLoggedUserQuery({});
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<CreatePostStatus[]>([]);

  const [postPhotos, setPostPhotos] = useState<File[]>([]);
  const postTextRef = useRef('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!loggedUser) return;
    if (isLoading) return;
    setIsLoading(true);
    setStatus((prev) => [...prev, { content: 'Creating post...', sevariety: 'info' }]);

    if (postTextRef.current.length === 0 && postPhotos.length === 0) {
      setStatus((prev) => [
        ...prev,
        { content: 'Post must contain text or photo', sevariety: 'error' },
      ]);
      return;
    }
    const postId = uuidv4();
    const pictureUuids = postPhotos.map(() => uuidv4());

    const optimizedPhotos = await optimizePhotoFilesArr(postPhotos);

    const uploadPhotosPromises = optimizedPhotos.map(async (photo, i) => {
      const pictureId = pictureUuids[i];
      const photoRef = ref(storage, `posts/${postId}/${pictureId}`);
      const result = await uploadBytes(photoRef, photo.blob, { contentType: 'image/webp' }).then(
        (res) => {
          if (!res.ref) return;
          return getDownloadURL(res.ref);
        },
      );
      return result;
    });

    try {
      const res = await Promise.allSettled(uploadPhotosPromises);
      const urls = res
        .map((result) => {
          if (result.status === 'rejected') return;
          return result.value as string;
        })
        .filter((url) => url !== undefined) as string[];
      if (urls.length !== optimizedPhotos.length) throw new Error('Not all photos were uploaded');
      const photosData = urls.map(
        (photo, i) =>
          ({
            url: photo,
            blurDataUrl: optimizedPhotos[i].blurUrl,
            dominantHex: optimizedPhotos[i].dominantHex,
          } as IPictureWithPlaceholders),
      );

      const post: IPost = {
        text: postTextRef.current,
        createdAt: Timestamp.now(),
        pictures: photosData,
        comments: {},
        id: postId,
        ownerId: loggedUser.id,
        wallOwnerId: loggedUser.id,
        reactions: {},
        shareCount: 0,
      };
      const postDocRef = doc(db, 'posts', postId);

      await setDoc(postDocRef, post);

      await refetchPostById(postId);
    } catch (err) {
      setStatus((prev) => [
        { content: 'Problem with creating post occurred. Try again', sevariety: 'error' },
        ...prev,
      ]);
    } finally {
      setIsOpen(false);
      setIsLoading(false);
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
            <PostSubmitButton fullWidth variant='contained' type='submit'>
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
