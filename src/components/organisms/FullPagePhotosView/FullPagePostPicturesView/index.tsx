import useFetchPostData from '@/hooks/useFetchPostData';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import { TLocalUserReaction } from '@/types/reaction';
import { useEffect, useState } from 'react';
import ElementInfo from '../ElementInfo';
import FullPagePortal from '../FullPagePortal';
import PhotosCarousel from '../PhotosCarousel';
import { FullPagePostPicturesViewProps } from './types';

export default function FullPagePostPicturesView({
  sx,
  initialPhoto,
  postId,
  setOpen,
  ...rootProps
}: FullPagePostPicturesViewProps) {
  const { isError, isLoading, postData: post } = useFetchPostData(postId);
  const { data: user } = useFetchLoggedUserQuery({});
  const [userReaction, setUserReaction] = useState<TLocalUserReaction>(
    post?.reactions[user?.id || ''] || undefined,
  );
  const [currentPictureIndex, setCurrentPictureIndex] = useState(
    post?.pictures?.indexOf(initialPhoto) || 0,
  );

  useEffect(() => {
    setUserReaction(post?.reactions[user?.id || ''] || undefined);
    setCurrentPictureIndex(post?.pictures?.indexOf(initialPhoto) || 0);
  }, [post, user?.id, initialPhoto]);

  return isLoading || isError || !post || !post.pictures ? null : (
    <FullPagePortal setOpen={setOpen} sx={sx} {...rootProps}>
      <PhotosCarousel
        picturesUrls={post.pictures}
        currentPictureIndex={currentPictureIndex}
        setCurrentPictureIndex={setCurrentPictureIndex}
      />
      <ElementInfo
        userReaction={userReaction}
        type='post'
        setUserReaction={setUserReaction}
        element={post}></ElementInfo>
    </FullPagePortal>
  );
}
