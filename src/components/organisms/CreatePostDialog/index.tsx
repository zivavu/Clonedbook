import { Box, Dialog, Stack, Typography, useTheme } from '@mui/material';

import {
  DialogCloseIconButton,
  PostSubmitButton,
  StyledMainContentStack,
  StyledRoot,
} from './styles';

import { blurPhotoFile } from '@/common/misc/blurPhotoFIle';
import { optimizePhotoFilesArr } from '@/common/misc/optimizePhotoFilesArr';
import { separateUserBasicInfo } from '@/common/misc/userDataManagment/separateUserBasicInfo';
import Icon from '@/components/atoms/Icon/Icon';
import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import { db, storage } from '@/config/firebase.config';
import { IPictureUrls } from '@/types/picture';
import { IPost } from '@/types/post';
import { IUserBasicInfo } from '@/types/user';
import { uuidv4 } from '@firebase/util';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRef, useState } from 'react';
import ErrorsFeed from './ErrorsFeed';
import PhotosInput from './PhotosInput';
import PostTextInput from './PostTextInput';
import UserInfo from './UserInfo';
import { CreatePostDialogProps, CreatePostError } from './types';

export default function CreatePostDialog({
  user,
  setIsOpen,
  refetchPostById,
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
    const pictureUuids = postPhotos.map(() => uuidv4());

    const optimizedPhotosBlobs = await optimizePhotoFilesArr(postPhotos);
    const blurredPhotosBlobs = await Promise.all(postPhotos.map((photo) => blurPhotoFile(photo)));

    const uploadPhotosPromises = optimizedPhotosBlobs.map(async (photo, i) => {
      const pictureId = pictureUuids[i];
      const photoRef = ref(storage, `posts/${postId}/${pictureId}`);
      const result = await uploadBytes(photoRef, photo, { contentType: 'image/webp' }).then(
        (res) => {
          if (!res.ref) return;
          return getDownloadURL(res.ref);
        },
      );
      return result;
    });

    const uploadBlurredPhotosPromises = blurredPhotosBlobs.map(async (photo, i) => {
      const pictureId = pictureUuids[i];
      const photoRef = ref(storage, `posts/${postId}/${pictureId}-blurred`);
      const result = await uploadBytes(photoRef, photo, { contentType: 'image/webp' }).then(
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

      const blurredRes = await Promise.allSettled(uploadBlurredPhotosPromises);
      const blurredUrls = blurredRes
        .map((result) => {
          if (result.status === 'rejected') return;
          return result.value as string;
        })
        .filter((url) => url !== undefined) as string[];
      if (urls.length !== blurredUrls.length)
        throw new Error('Problem with uploading photos occurred');

      const picturesUrls: IPictureUrls[] = urls.map((url, i) => {
        return {
          url,
          blurUrl: blurredUrls[i],
        };
      });
      const post: IPost = {
        text: postTextRef.current,
        createdAt: Timestamp.now(),
        pictures: picturesUrls,
        comments: {},
        id: postId,
        ownerId: userBasicInfo.id,
        wallOwnerId: userBasicInfo.id,
        reactions: {},
        shareCount: 0,
      };
      const postDocRef = doc(db, 'posts', postId);

      await setDoc(postDocRef, post);

      await refetchPostById(postId);
    } catch (err) {
      setErrors((prev) => [
        { content: 'Problem with creating post occurred. Try again', sevariety: 'error' },
        ...prev,
      ]);
    } finally {
      setIsOpen(false);
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
