import { useFetchLoggedUserQuery } from '@/features/userAPI';
import useFetchUsersPictures from '@/hooks/useFetchUsersPictures';
import { TLocalUserReaction } from '@/types/reaction';
import { useEffect, useState } from 'react';
import ElementInfo from '../ElementInfo';
import FullPagePortal from '../FullPagePortal';
import PhotosCarousel from '../PhotosCarousel';
import { FullPageAccountPicturesViewProps } from './types';

export default function FullPageAccountPicturesView({
  sx,
  initialPhotoIndex,
  ownerId,
  setOpen,
  ...rootProps
}: FullPageAccountPicturesViewProps) {
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const { isError, isLoading, picturesMap } = useFetchUsersPictures(ownerId);
  const pictures = Object.values(picturesMap)
    .slice(0, 9)
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
  const [currentPictureIndex, setCurrentPictureIndex] = useState(initialPhotoIndex);
  const currentPicture = pictures[currentPictureIndex];

  const [userReaction, setUserReaction] = useState<TLocalUserReaction>(
    currentPicture?.reactions[loggedUser?.id || ''] || undefined,
  );

  useEffect(() => {
    setUserReaction(currentPicture?.reactions[loggedUser?.id || ''] || undefined);
  }, [currentPicture, loggedUser?.id]);

  if (isError || isLoading || !pictures || !currentPicture) return null;
  return (
    <FullPagePortal setOpen={setOpen} sx={sx} {...rootProps}>
      <PhotosCarousel
        picturesUrls={pictures.map((picture) => picture.url)}
        currentPictureIndex={currentPictureIndex}
        setCurrentPictureIndex={setCurrentPictureIndex}
      />
      <ElementInfo
        userReaction={userReaction}
        type='picture'
        setUserReaction={setUserReaction}
        element={currentPicture}></ElementInfo>
    </FullPagePortal>
  );
}
