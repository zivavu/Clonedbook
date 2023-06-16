import { useEffect, useState } from 'react';
import ElementInfo from '../../ElementInfo';
import FullPagePhotosWrapper from '../../FullPagePhotosWrapper';
import PhotosCarousel from '../../PhotosCarousel';
import { FullPagePostPicturesViewProps } from './types';

export default function FullPagePostPicturesView({
  post,
  refetchPost,
  initialPhotoUrl,
  setOpen,
  sx,
  ...rootProps
}: FullPagePostPicturesViewProps) {
  const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(0);
  useEffect(() => {
    setCurrentPictureIndex(
      post?.pictures?.findIndex((picture) => picture.url === initialPhotoUrl) || 0,
    );
  }, [initialPhotoUrl, post]);

  if (!post || !post.pictures) return null;
  return (
    <FullPagePhotosWrapper setOpen={setOpen} sx={sx} {...rootProps}>
      <PhotosCarousel
        pictures={post.pictures}
        currentPictureIndex={currentPictureIndex}
        setCurrentPictureIndex={setCurrentPictureIndex}
        setOpen={setOpen}
      />
      <ElementInfo type='post' refetchElement={refetchPost} element={post} />
    </FullPagePhotosWrapper>
  );
}
