import { optimizePhotoFilesArr } from '@/common/misc/photoManagment/optimizePhotoFilesArr';
import { db, storage } from '@/config/firebase.config';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { IPictureWithPlaceholders } from '@/types/picture';
import { IPost } from '@/types/post';
import { uuidv4 } from '@firebase/util';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';

export interface ICreatePostStatus {
  content: string;
  sevariety: 'error' | 'warning' | 'info' | 'success';
  id?: string;
}
interface ICreatePost {
  postText: string;
  postPhotos: File[];
  refetchPostById: (id: string) => Promise<void>;
}

export default function useCreateNewPost() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<ICreatePostStatus[]>([]);
  const { data: loggedUser } = useGetLoggedUserQuery({});

  async function createPost({ postPhotos, postText, refetchPostById }: ICreatePost) {
    if (!loggedUser) return;

    // Clear previous status
    setStatus([]);

    // Create a unique ID for this upload process
    const toastId = uuidv4();

    // Set initial status
    setStatus([{ id: toastId, content: 'Uploading...', sevariety: 'info' }]);
    setIsLoading(true);

    if (postText.length === 0 && postPhotos.length === 0) {
      setStatus([
        { id: toastId, content: 'Post must contain text or photo', sevariety: 'warning' },
      ]);
      setIsLoading(false);
      return;
    }

    const postId = uuidv4();
    const pictureUuids = postPhotos.map(() => uuidv4());

    const optimizedPhotos = await optimizePhotoFilesArr(postPhotos);

    const uploadPhotosPromises = optimizedPhotos.map(async (photo, i) => {
      const pictureId = pictureUuids[i];
      const photoRef = ref(storage, `posts/${postId}/${pictureId}`);
      const res = await uploadBytes(photoRef, photo.blob, { contentType: 'image/webp' }).then(
        (res) => {
          if (!res.ref) return;
          return getDownloadURL(res.ref);
        },
      );
      return res;
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
          }) as IPictureWithPlaceholders,
      );

      const post: IPost = {
        id: postId,
        text: postText,
        pictures: photosData,
        createdAt: Timestamp.now(),
        comments: {},
        ownerId: loggedUser.id,
        wallOwnerId: loggedUser.id,
        elementType: 'post',
        reactions: {},
        shareCount: 0,
      };
      const postDocRef = doc(db, 'posts', postId);

      await setDoc(postDocRef, post);

      // Update status to success
      setStatus([{ id: toastId, content: 'Post created successfully!', sevariety: 'success' }]);

      await refetchPostById(postId);
    } catch (err) {
      // Update status to error
      setStatus([
        {
          id: toastId,
          content: 'Problem with creating post occurred. Try again',
          sevariety: 'error',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, status, setStatus, createPost };
}
