import { useFetchLoggedUserQuery } from '@/features/userAPI';
import { TLocalUserReaction } from '@/types/reaction';
import { useEffect, useState } from 'react';
import ElementInfo from '../ElementInfo';
import FullPagePortal from '../FullPagePortal';
import PhotosCarousel from '../PhotosCarousel';
import { FullPageAccountPicturesViewProps } from './types';

export default function FullPageAccountPicturesView({
  sx,
  initialPhotoIndex,
  userId,
  setOpen,
  pictures,
  ...rootProps
}: FullPageAccountPicturesViewProps) {
  const { data: loggedUser } = useFetchLoggedUserQuery({});

  const [currentPictureIndex, setCurrentPictureIndex] = useState(initialPhotoIndex);
  const currentPicture = pictures[currentPictureIndex];

  const [userReaction, setUserReaction] = useState<TLocalUserReaction>(
    currentPicture?.reactions[loggedUser?.id || ''] || undefined,
  );
  useEffect(() => {
    setUserReaction(currentPicture?.reactions[loggedUser?.id || ''] || undefined);
  }, [currentPicture, loggedUser?.id]);

  return !pictures || !currentPicture ? null : (
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
