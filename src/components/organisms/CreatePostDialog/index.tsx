import { Dialog, Stack, Typography, useTheme } from '@mui/material';

import { DialogCloseIconButton, PostSubmitButton, StyledPostTextField, StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import { db, storage } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import { IBasicUserInfo } from '@/types/user';
import { optimizePhotos } from '@/utils/optimizePhotos';
import { separateUserBasicInfo } from '@/utils/separateUserBasicInfo';
import { uuidv4 } from '@firebase/util';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<CreatePostError[]>([]);

  const [postText, setPostText] = useState('');
  const [postPhotos, setPostPhotos] = useState<File[]>([]);

  const placeholder = `What's on your mind, ${user.firstName}?`;
  const textLines = postText.match(/\n/g)?.length || 0 + 1;
  const isTextLong = postText.length > 85 || textLines > 3;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (postText.length === 0 && postPhotos.length === 0) {
      setErrors((prev) => [
        ...prev,
        { content: 'Post must contain text or photo', sevariety: 'error' },
      ]);
      return;
    }
    const userBasicInfo: IBasicUserInfo = separateUserBasicInfo(user);
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
        postText: postText,
        createdAt: Timestamp.now(),
        exampleReactors: [],
        postPictures: downloadUrls,
        comments: [],
        id: postId,
        owner: userBasicInfo,
        reactions: [],
        shareCount: 0,
      };
      const userDocRef = doc(db, 'users', `${user.profileId}/posts/${postId}`);
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
      <form onSubmit={handleSubmit} style={{ overflow: 'hidden' }}>
        <StyledRoot sx={sx} {...rootProps}>
          <ErrorsFeed errors={errors} setErrors={setErrors} />

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
            <PhotosInput photos={postPhotos} setPhotos={setPostPhotos} setErrors={setErrors} />
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
