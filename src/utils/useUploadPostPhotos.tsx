import { IPost } from '@/types/post';
import { IUser } from '@/types/user';
import { useState } from 'react';

interface IUseUploadPostPhotos {
  post: IPost;
  photos: File[];
  user: IUser;
}

function useUploadPostPhotos({ post, photos, user }: IUseUploadPostPhotos) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
}
